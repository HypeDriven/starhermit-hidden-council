'use strict';
// Hidden Council — client bootstrap and application glue.
// State machine: boot → title → mode-select → preparing → countdown →
// active ↔ paused → resolving → results → progression.

import { StationRenderer, ROOM_POS, LAYER_GAME, gpuName } from './render.js';
import { detectLevel, presetForLevel } from './gfx.js';
import { UI } from './ui.js';
import { AudioEngine } from './audio.js';
import {
  SoloSession, loadSave, storeSave, loadSettings, storeSettings, syncServerTime, mergeSaves, saveChecksum, ACHIEVEMENTS,
} from './session.js';
import { Platform } from './platform.js';
import { RoomsClient } from './net.js';
import { legalActions, STATION_ROOMS } from './rules.js';
import { shStrings, fmt } from './i18n-gfx.js';
import { T, L } from './i18n.js';
import { logText, roomName } from './ui.js';
import { THEMES, dailyStage, practiceStage, challengeStage, JOURNEY } from './content.js';

const DEFAULT_BINDINGS = {
  pause: ['Escape'], undo: ['KeyU'], hint: ['KeyH'], camera: ['KeyC'], wait: ['Space'],
  commit: ['Enter', 'NumpadEnter'], prevTarget: ['ArrowLeft', 'ArrowUp'], nextTarget: ['ArrowRight', 'ArrowDown'],
};

class App {
  constructor(root) {
    this.phase = 'boot';
    this.platform = new Platform();
    this.save = loadSave();
    this.settings = loadSettings();
    this.ui = new UI(root, this);
    this.audio = new AudioEngine(this.settings);
    this.audio.caption = (t) => this.ui.caption(T(t)); // sound captions are translation keys
    this.renderer = null;
    this.session = null;
    this.stage = null;
    this.serverOffset = 0;
    this.net = null;         // RoomsClient while a platform room is active
    this.hostedSeatId = null;
    this.focusIndex = 0;
    // Keyboard bindings: defaults mirror the control.* lines in starhermit.txt;
    // StarHermit.loadBindings applies the player's platform overrides.
    this.bindings = JSON.parse(JSON.stringify(DEFAULT_BINDINGS));
    this.platform.loadBindings(DEFAULT_BINDINGS).then((b) => { this.bindings = b; });
    this.platform.onAuth = (signedIn, reason) => {
      if (!signedIn && reason === 'expired') { this.showSessionExpired(); return; }
      if (!signedIn) this.ui.toast(() => shStrings().signedOut);
      if (this.phase === 'title') this.showTitle();
    };

    this.applyAccessibilityClasses();
    this.bindGlobalInput();
    this.bindLifecycle();

    syncServerTime(this.platform.hosted ? this.platform.token : null).then((r) => { this.serverOffset = r.offset; });

    if (this.platform.hosted) this.initHosted();

    if (this.webglAvailable()) this.phase = 'title';
    this.showTitle();
  }

  /** Boot handshake for hosted mode: remote save wins on conflict. */
  initHosted() {
    this.platform.onSync = () => { if (this.phase === 'title') this.showTitle(); };
    // Cloud-save conflict (another device saved first): merge both sides — best
    // score per stage, larger session/win/streak counts, union of achievements,
    // lessons and actions used — keep the running session, and save again.
    this.platform.onConflict((remote) => {
      if (remote) this.save = mergeSaves(remote.data, this.save);
      this.persistSave();
      if (this.phase === 'title') this.showTitle();
    });
    return this.platform.initHosted().then((remoteDoc) => {
      if (remoteDoc) {
        this.save = mergeSaves(remoteDoc.data, loadSave());
      }
      if (this.platform.displayName) this.save.profile.name = this.platform.displayName;
      this.persistSave();   // rewrite the local cache (+ cloud mirror when merged)
      if (this.phase === 'title') this.showTitle();
    }).then(() => this.platform.getSettings()).then((remote) => {
      // Platform settings KV wins over the local defaults when signed in.
      if (remote && typeof remote === 'object' && Object.keys(remote).length) {
        Object.assign(this.settings, remote);
        this.applySettings(false);
        if (this.phase === 'title') this.showTitle();
      }
    });
  }

  webglAvailable() {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (gl && this.gpu == null) {
        // One-time GPU probe for the Graphics panel's Auto preset.
        this.gpu = gpuName(gl);
        const mobile = (navigator.maxTouchPoints > 0 && matchMedia('(pointer: coarse)').matches) || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
        // StarHermit hardware level (gpu-level.js): renderer string + device facts (cores, memory, screen).
        let sys = { mobile, webgl2: !!(typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext) };
        try {
          const G = globalThis.StarHermitGpu;
          if (G) { const d = G.detectSystem(); sys = { ...sys, mobile: mobile || d.mobile, touch: d.touch, screen: d.screen, cores: d.cores, memoryGb: d.memoryGb, astc: d.astc }; }
        } catch (e) { /* defaults */ }
        this.gpuLevel = detectLevel(this.gpu, sys);
        this.gpuPreset = presetForLevel(this.gpuLevel);
      }
      return !!gl;
    } catch (e) { return false; }
  }

  /** GPU name + Auto preset for the Graphics panel (probed once). */
  gpuInfo() {
    if (this.gpu == null) this.webglAvailable();
    return { gpu: this.gpu || 'unknown GPU', level: this.gpuLevel, detected: this.gpuPreset || 'balanced' };
  }

  persistSave() {
    storeSave(this.save);
    this.platform.syncSave({ v: 1, data: this.save, sum: saveChecksum(this.save) });
  }

  /** True while an authoritative hosted (platform room) session is live. */
  hostedActive() {
    return !!(this.net && this.net.inGame);
  }

  // ------------------------------------------------------------- screens --

  showTitle() {
    this.phase = 'title';
    this.ui.showHud(false);
    this.teardownRenderer();
    this.ui.showScreen(this.ui.titleScreen(this.save, this.settings));
  }

  /**
   * The launch token died (renewal refused, or a realtime reconnect could not
   * renew it) — or StarHermit needs the updated terms accepted (reason
   * 'terms'): end any hosted room and show the expiry screen with Back to
   * StarHermit (relaunch) / Keep playing offline. Idempotent — the SDK's auth
   * event and the rooms client's onAuthLost / onTermsRequired can both arrive.
   */
  showSessionExpired(reason) {
    const wasHosted = !!this.net;
    if (wasHosted) {
      this.hostedSession = false;
      if (this.session) { this.session.pause(); this.session = null; }
      this.net.leave();
      this.net = null;
    }
    if (this.phase === 'expired') return;
    if (!wasHosted && !['boot', 'title', 'mode-select'].includes(this.phase)) {
      // A solo session keeps running locally; tell the player without interrupting.
      this.ui.toast(reason === 'terms' ? L('Accept the updated terms') : () => shStrings().expiredTitle);
      return;
    }
    this.phase = 'expired';
    this.ui.showHud(false);
    this.teardownRenderer();
    this.ui.showScreen(this.ui.sessionExpiredScreen(reason));
  }

  /** The room is gone (closed, expired or ended elsewhere): stop and say so. */
  showRoomUnavailable() {
    if (this.net) { this.net = null; }
    this.hostedSession = false;
    if (this.session) { this.session.pause(); this.session = null; }
    this.ui.toast(L('The council room is no longer available. Your progress on this device is safe.'));
    this.showTitle();
  }

  showModeSelect() {
    this.phase = 'mode-select';
    this.ui.showScreen(this.ui.modeSelectScreen());
  }

  showPause() {
    this.ui.showScreen(this.ui.pauseScreen());
  }

  // ------------------------------------------------------------ sessions --

  startStage(stage, assists) {
    this.stage = stage;
    this.assists = assists;
    this.phase = 'preparing';
    this.ui.showScreen(null);

    this.session = new SoloSession(stage, {
      aiDelayMs: this.settings.reducedMotion ? 200 : 450,
      // Tutorial lessons wait for the required human action before the crew
      // (and the task clock) moves on, so a lesson can never auto-complete.
      aiGate: () => !this.tutorial || this.tutorial.step >= this.tutorial.def.steps.length || !!this.tutorial.humanActed,
      onState: (state, events) => this.onState(state, events),
      onReject: (cmd, reason) => this.onReject(reason),
      onEnd: (result) => this.onEnd(result),
    });

    if (!this.webglAvailable()) {
      // Clear compatibility message; DOM UI still fully playable.
      this.ui.showScreen(this.compatScreen());
      return;
    }
    this.buildRenderer(stage);
    this.countdown();
  }

  compatScreen() {
    const s = this.ui.screen(L('Compatibility Notice'));
    s.appendChild(this.ui.el('p', '', L('WebGL is unavailable in this browser. The 3D station cannot be shown, but your progress is safe. You can still play using the action buttons.')));
    s.appendChild(this.ui.button(L('Continue (2D controls)'), 'hc-play', () => this.countdown()));
    s.appendChild(this.ui.button(L('← Title'), 'hc-subtle', () => this.showTitle()));
    return s;
  }

  buildRenderer(stage) {
    this.teardownRenderer();
    this.renderer = new StationRenderer(this.ui.canvas, {
      seed: stage.seed, theme: this.settings.theme === 'auto' ? stage.theme : this.settings.theme,
      reducedMotion: this.settings.reducedMotion, cvd: this.settings.cvdPalette,
      graphics: this.settings.graphics, gpu: this.gpuInfo().gpu, level: this.gpuInfo().level, detected: this.gpuInfo().detected,
    });
    if (this.renderer.failed) { this.renderer = null; return; }
    this.renderer.syncState(this.session.state);
    this.bindCanvasInput();
  }

  teardownRenderer() {
    if (this.renderer) { this.renderer.dispose(); this.renderer = null; }
  }

  countdown() {
    this.phase = 'countdown';
    this.ui.showHud(true);
    this.ui.announce(T('Session starting'));
    this.onState(this.session.state, []);
    let n = 3;
    const step = () => {
      if (this.phase !== 'countdown') return;
      if (n > 0) {
        this.ui.caption(String(n));
        this.audio.event('tick', n);
        n--;
        this._cdTimer = setTimeout(step, this.settings.reducedMotion ? 250 : 600);
      } else {
        this.phase = 'active';
        this.audio.event('start', this.stage ? this.stage.seed : 1);
        this.ui.announce(T('Go. {goal}', { goal: this.stage.tutorialText || T('Complete the station tasks.') }));
        this.session.scheduleAi();
      }
    };
    step();
  }

  // Tutorial interstitial: present each step, require the player to act.
  startTutorial(tut) {
    const stage = {
      id: tut.id, name: 'Tutorial: ' + tut.title, seed: tut.seed,   // display title: ui.stageTitle
      config: { seed: tut.seed, playerCount: tut.playerCount, saboteurCount: tut.saboteurCount, taskCount: tut.taskCount },
      goals: { tasks: tut.taskCount }, par: 60, difficulty: 1, mechanics: [tut.rule],
      theme: THEMES[0].id, practice: true,
    };
    this.tutorial = { def: tut, step: 0 };
    this.pendingStepText = tut.steps[0].text;
    this.startStage(stage, true);
  }

  startDaily() { this.startStage(dailyStage(new Date(Date.now() + this.serverOffset)), true); }
  startPractice(d) { this.startStage(practiceStage(d), true); }
  startChallenge(kind) { this.startStage(challengeStage(kind), true); }

  retry() { if (this.stage) this.startStage(this.stage, this.assists); }

  nextStage() {
    if (this.stage && this.stage.id && this.stage.id.startsWith('journey-')) {
      const next = JOURNEY[this.stage.index + 1];
      if (next) { this.ui.showScreen(this.ui.setupScreen(next, (a) => this.startStage(next, a))); return; }
    }
    this.showModeSelect();
  }

  pauseGame() {
    if (this.phase !== 'active') return;
    this.phase = 'paused';
    if (this.session) this.session.pause();
    this.showPause();
    this.ui.announce(T('Paused'));
  }

  resumeGame() {
    this.phase = 'active';
    if (this.session) this.session.resume();
    this.ui.showScreen(null);
    this.ui.announce(T('Resumed'));
  }

  leaveGame() {
    this.hostedSession = false;
    if (this.session) { this.session.pause(); this.session = null; }
    if (this.net) { this.net.leave(); this.net = null; }
    this.showTitle();
  }

  // ---------------------------------------------------------- state flow --

  onState(state, events) {
    if (this.renderer) {
      this.renderer.syncState(state);
      const myId = this.session ? this.session.humanId : 'p0';
      const me = state.players.find((p) => p.id === myId);
      if (me && me.room !== this.renderer.focusRoom) this.renderer.placeCamera(me.room, false);
      const legal = this.session ? this.session.legal() : [];
      this.renderer.select(myId);
      this.renderer.showLegalTargets(this.settings.hints && this.assists ? legal.filter((a) => a.type === 'move').map((a) => a.room) : []);
    }
    if (this.session) this.ui.updateHud(state, this.session.legal(), this.stage);

    for (const e of events) {
      if (!e || !e.kind) continue;
      const map = { move: 'move', task: 'task', meeting: 'meeting', eject: 'eject', eliminate: 'eliminate', vote: 'vote', end: null, wait: null };
      const snd = map[e.kind];
      if (snd) this.audio.event(snd, state.seed + state.tick);
      if (['meeting', 'eject', 'eliminate', 'end'].includes(e.kind)) this.ui.announce(logText(e));
    }

    if (this.tutorial) this.checkTutorialStep();
  }

  checkTutorialStep() {
    const tut = this.tutorial;
    if (!tut) return;
    const steps = tut.def.steps;
    if (tut.step >= steps.length) return;
    const last = this.session.commands.filter((c) => c.player === this.session.humanId).pop();
    if (last && last.type === steps[tut.step].expect) {
      tut.step++;
      tut.humanActed = false;
      this.audio.event('ack', 5); // 'task' captions "Task complete", which misleads here
      if (tut.step >= steps.length) {
        this.save.tutorialDone[tut.def.id] = true;
        this.persistSave();
        this.ui.announce(T('Lesson complete: {title}', { title: T(tut.def.title) }));
        this.ui.caption(L('Lesson complete! Keep playing or leave.'));
      } else {
        this.ui.announce(T(steps[tut.step].text));
      }
    } else {
      this.ui.announce(T(steps[tut.step].text));
    }
  }

  onReject(reason) {
    this.audio.event('reject', 3);
    const msg = L('Cannot do that: {reason}', { reason: () => rejectText(reason) });
    this.ui.caption(msg);
    this.ui.announce(msg);
  }

  humanAct(fields) {
    if (!this.session || this.phase !== 'active') return;
    if (this.tutorial) this.tutorial.humanActed = true;
    this.audio.event('ack', 1);
    if (this.net && this.net.connected) {
      // Hosted on-platform: the host applies locally and broadcasts; guests
      // send their existing command message to the host (binary JSON).
      if (this.net.isHost) this.session.act(fields);
      else this.net.sendCommand(this.session.makeCmd(fields));
      return;
    }
    this.session.act(fields);
  }

  undo() {
    if (!this.session) return;
    const r = this.session.undo();
    if (!r.ok) this.onReject(r.reason);
    else this.audio.event('undo', 4);
  }

  hint() {
    if (!this.session) return;
    const acts = this.session.legal();
    if (!acts.length) { this.ui.caption(L('No actions right now.')); return; }
    const pri = acts.find((a) => a.type === 'report') || acts.find((a) => a.type === 'task') || acts.find((a) => a.type === 'vote') || acts[0];
    const text = {
      move: L('Try moving toward a room with unfinished work.'),
      task: L('A task is ready here — complete it.'),
      report: L('Report the incident to convene the council.'),
      vote: L('Weigh the log and cast your vote.'),
      eliminate: L('An opportunity…'),
      call: L('You can ring the emergency chime.'),
      wait: L('Waiting lets the station tick forward.'),
    }[pri.type];
    this.ui.caption(L('Hint: {text}', { text }));
    this.ui.announce(T('Hint: {text}', { text }));
    this.audio.event('hint', 2);
  }

  onEnd(result) {
    this.phase = 'resolving';
    const won = !!result.playerWon;
    if (this.session && !this.hostedSession) {
      const fresh = this.session.recordCompletion(this.save);
      this.persistSave();
      if (this.platform.hosted) {
        // On-platform: Journey, Daily and Challenge rounds post their total
        // through the score script (high-score board); Tutorial and Practice
        // post nothing. The global board renders once it resolves.
        this.phase = 'results';
        this.audio.event(won ? 'win' : 'lose', 9);
        if (fresh && fresh.length) setTimeout(() => this.audio.event('achievement', 11), 700);
        const ranked = /^(journey|daily|challenge)-/.test(this.stage.id || '');
        const session = this.session;
        this.ui.showScreen(this.ui.resultsScreen(result, this.stage, fresh,
          { leaderboard: 'loading', lbLine: ranked ? () => shStrings().lbPosting : null }));
        const posted = ranked ? this.platform.submitScore(result.score.total) : Promise.resolve(null);
        posted.then((r) => this.platform.fetchPlatformLeaderboard().then((lb) => {
          if (this.phase !== 'results' || this.session !== session) return;
          const meta = lb && lb.entries && lb.entries.length ? { leaderboard: lb } : { leaderboard: null };
          if (r) meta.lbLine = () => { const S = shStrings(); return !r.posted ? S.lbNotPosted : r.rank ? fmt(S.lbRank, { rank: r.rank }) : S.lbPosted; };
          this.ui.showScreen(this.ui.resultsScreen(result, this.stage, [], meta));
        }));
        return;
      }
      // Standalone: results, bests and achievements stay on this device.
      this.phase = 'results';
      this.audio.event(won ? 'win' : 'lose', 9);
      if (fresh && fresh.length) setTimeout(() => this.audio.event('achievement', 11), 700);
      this.ui.showScreen(this.ui.resultsScreen(result, this.stage, fresh, {}));
    } else {
      this.phase = 'results';
      this.audio.event(won ? 'win' : 'lose', 9);
      this.ui.showScreen(this.ui.resultsScreen(result, this.stage, [], {}));
    }
  }

  // ------------------------------------------------------------- hosted --

  /** Platform-room message handler: same message shapes as the dev server. */
  onHostedMessage(msg) {
    if (!msg || typeof msg.type !== 'string') return;
    if (msg.type === 'room') {
      if (msg.you) this.hostedSeatId = msg.you; // remember which seat is ours
      this.ui.updateLobby(msg);
    }
    if (msg.type === 'started') {
      this.stage = { id: 'hosted', name: 'Hosted Council', seed: msg.state.seed, config: msg.state, goals: { tasks: msg.state.tasks.length }, par: 80, difficulty: 3, theme: this.settings.theme };
      this.hostedSession = true;
      if (this.net && this.net.isHost && this.net.sim) {
        // The host's UI session IS the authority running in this tab.
        this.session = this.net.sim;
      } else {
        this.session = new SoloSession({ id: 'hosted', seed: msg.state.seed, config: { seed: msg.state.seed, playerCount: msg.state.players.length, saboteurCount: 1, taskCount: msg.state.tasks.length } }, {
          onState: (s, e) => this.onState(s, e), onReject: (reason) => this.onReject(reason), onEnd: (result) => this.onEnd(result),
        });
        this.session.stopAi();
      }
      // Our seat is rarely p0 in a hosted room: commands must carry our own
      // player id or the authority rejects them as identity_mismatch.
      const mine = (msg.seats || []).find((s) => s.you)
        || (msg.seats || []).find((s) => s.id === this.hostedSeatId);
      this.session.humanId = mine && mine.playerId ? mine.playerId : 'p0';
      this.ui.showScreen(null);
      this.buildRenderer(this.stage);
      this.phase = 'active';
      this.ui.showHud(true);
      this.applyHostedState(msg.state, ['The session begins.']);
    }
    if (msg.type === 'state') this.applyHostedState(msg.state, []);
    if (msg.type === 'snapshot') {
      this.applyHostedState(msg.state, msg.away && msg.away.length ? ['While you were away:'].concat(msg.away) : []);   // rendered via ui.logText
    }
    if (msg.type === 'rejected') this.onReject(msg.reason);
    if (msg.type === 'results') {
      this.applyHostedState(msg.state, []);
      // The host's authority session reports through its own hooks; make sure
      // the results screen still opens for every seat.
      if (this.phase !== 'results' && this.session) this.onEnd(this.session.result());
    }
    if (msg.type === 'host_left') {
      this.ui.caption(L('The host left — the session has ended.'));
      this.leaveGame();
    }
    if (msg.type === 'error') this.ui.caption(L('Server: {error}', { error: () => serverErrorText(msg.error) }));
  }

  _makeNet() {
    return new RoomsClient(this.platform, {
      onMessage: (msg) => this.onHostedMessage(msg),
      onCaption: (text) => this.ui.caption(text),   // net.js passes deferred messages
      onAuthorityState: (state, events) => {
        if (this.session && this.net && this.session === this.net.sim) this.onState(state, events);
      },
      onAuthorityReject: (reason) => this.onReject(reason),
      onAuthLost: () => this.showSessionExpired(),
      // Reconnect needs the updated StarHermit terms accepted: same as auth loss,
      // with the terms message on the Back to StarHermit screen.
      onTermsRequired: () => this.showSessionExpired('terms'),
      // The room is gone: the reconnect loop has ended; say so visibly.
      onUnavailable: () => this.showRoomUnavailable(),
    });
  }

  applyHostedState(state, notes) {
    if (!this.session) return;
    // The host's session is the live authority; never overwrite it with the
    // trimmed wire copy.
    if (!(this.net && this.net.isHost && this.session === this.net.sim)) this.session.state = state;
    this.onState(this.session.state, notes.map((t) => ({ kind: 'meeting', text: t })));
    if (this.session.state.phase === 'over' && this.phase !== 'results') this.session.finish();
  }

  // Hosted play exists only on-platform (StarHermit realtime rooms); the UI
  // hides it without a launch token.
  hostedCreate() {
    if (!this.platform.hosted) return;
    this.net = this._makeNet();
    this.net.createRoom().catch(() => {
      this.ui.caption(L('Could not create a room — try again.'));
      this.net = null;
    });
  }

  hostedQuickJoin() {
    if (!this.platform.hosted) return;
    this.net = this._makeNet();
    this.net.quickJoin().then((ok) => { if (!ok) this.net = null; }).catch(() => {
      this.ui.caption(L('Quick join failed — try again.'));
      this.net = null;
    });
  }

  hostedAddAi() {
    if (this.net && this.net.isHost) this.net.addAi();
  }

  hostedReady() {
    if (this.net) this.net.setReady();
  }

  hostedStart() {
    if (this.net && this.net.isHost) this.net.start();
  }

  hostedLeave() {
    if (this.net) {
      this.net.leave();
      this.net = null;
      this.ui.showScreen(this.ui.hostedScreen());
    }
  }

  // --------------------------------------------------------------- input --

  bindCanvasInput() {
    const c = this.ui.canvas;
    let downX = 0, downY = 0, downT = 0, captured = false;
    c.style.touchAction = 'none';
    c.addEventListener('pointerdown', (e) => {
      downX = e.clientX; downY = e.clientY; downT = performance.now();
      captured = true;
      try { c.setPointerCapture(e.pointerId); } catch (err) {}
    });
    c.addEventListener('pointerup', (e) => {
      if (!captured) return;
      captured = false;
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      const dt = performance.now() - downT;
      if (dist < 12 && dt < 500) this.handleTap(e);
      // Drags beyond threshold are camera gestures; safe cancel, no commit.
    });
    c.addEventListener('pointercancel', () => { captured = false; });
  }

  handleTap(e) {
    if (!this.renderer || !this.session || this.phase !== 'active') return;
    const r = this.ui.canvas.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    const hit = this.renderer.pick(nx, ny);
    if (!hit) return;
    const legal = this.session.legal();
    if (hit.kind === 'room') {
      const act = legal.find((a) => a.type === 'move' && a.room === hit.id);
      if (act) this.humanAct({ type: 'move', room: hit.id });
      else this.onReject('not_a_legal_target');
    } else if (hit.kind === 'pawn') {
      const v = legal.find((a) => a.type === 'vote' && a.choice === hit.id);
      const el = legal.find((a) => a.type === 'eliminate' && a.target === hit.id);
      if (v) this.humanAct({ type: 'vote', choice: hit.id });
      else if (el) this.humanAct({ type: 'eliminate', target: hit.id });
      else this.onReject('not_a_legal_target');
    }
  }

  /** Action bound to a KeyboardEvent.code, or null. */
  actionFor(code) {
    for (const a of Object.keys(this.bindings)) if (this.bindings[a].includes(code)) return a;
    return null;
  }

  /** Short label of the first key bound to an action (for button hints). */
  keyLabel(action) {
    const c = (this.bindings[action] || [])[0] || '';
    if (/^Key[A-Z]$/.test(c)) return c.slice(3);
    if (/^Digit\d$/.test(c)) return c.slice(5);
    return c.replace(/^Arrow/, '');
  }

  bindGlobalInput() {
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
      const act = this.actionFor(e.code);
      if (act === 'pause') {
        if (this.phase === 'active') { this.pauseGame(); e.preventDefault(); }
        else if (this.phase === 'paused') { this.resumeGame(); e.preventDefault(); }
        return;
      }
      if (this.phase !== 'active') return;
      if (act === 'undo') { this.undo(); e.preventDefault(); }
      if (act === 'hint') { this.hint(); e.preventDefault(); }
      if (act === 'camera') { if (this.renderer) this.renderer.resetCamera(); e.preventDefault(); }
      if (act === 'wait') { this.humanAct({ type: 'wait' }); e.preventDefault(); }
      if (act === 'prevTarget' || act === 'nextTarget') {
        // Cycle among legal move targets; Commit (or Shift + next target) moves.
        const legal = this.session ? this.session.legal().filter((a) => a.type === 'move') : [];
        if (legal.length) {
          this.focusIndex = (this.focusIndex + (act === 'prevTarget' ? -1 : 1) + legal.length) % legal.length;
          const room = legal[this.focusIndex].room;
          if (this.renderer) { this.renderer.showLegalTargets([room]); this.renderer.placeCamera(room, false); }
          this.ui.caption(L('Target: {room}', { room: () => roomName(room) }));
          this.audio.event('ack', this.focusIndex);
          if (act === 'nextTarget' && e.shiftKey) this.humanAct({ type: 'move', room });
        }
        e.preventDefault();
      }
      if (act === 'commit') {
        const legal = this.session ? this.session.legal().filter((a) => a.type === 'move') : [];
        if (legal.length) { this.humanAct({ type: 'move', room: legal[this.focusIndex % legal.length].room }); e.preventDefault(); }
      }
    });
  }

  bindLifecycle() {
    document.addEventListener('visibilitychange', () => {
      const hidden = document.hidden;
      if (this.renderer) this.renderer.setHidden(hidden);
      this.audio.setMuted(hidden);
      // Backgrounding pauses solo simulation (never an authoritative hosted seat).
      if (hidden && this.phase === 'active' && !this.hostedActive()) this.pauseGame();
    });
    window.addEventListener('resize', () => { if (this.renderer) this.renderer.resize(); });
    window.addEventListener('orientationchange', () => setTimeout(() => { if (this.renderer) this.renderer.resize(); }, 120));
  }

  // ------------------------------------------------------------ settings --

  applyAccessibilityClasses() {
    const b = document.body;
    b.classList.toggle('hc-large-text', !!this.settings.largeText);
    b.classList.toggle('hc-high-contrast', !!this.settings.highContrast);
    b.classList.toggle('hc-left-handed', !!this.settings.leftHanded);
    b.classList.toggle('hc-reduced-motion', !!this.settings.reducedMotion);
    // Stable hook for tests/tools: the resolved graphics preset.
    const g = this.settings.graphics || {};
    b.dataset.gfxPreset = g.preset && g.preset !== 'auto' ? g.preset : 'auto-' + this.gpuInfo().detected;
  }

  applySettings(mirror = true) {
    storeSettings(this.settings);
    if (mirror && this.platform.hosted) {   // per-player settings KV (debounced: sliders fire per tick)
      clearTimeout(this._kvTimer);
      this._kvTimer = setTimeout(() => this.platform.patchSettings(this.settings), 600);
    }
    this.applyAccessibilityClasses();
    for (const bus of ['music', 'effects', 'ambience', 'voice']) this.audio.setVolume(bus, this.settings[bus]);
    if (this.renderer) {
      this.renderer.cvd = !!this.settings.cvdPalette;
      this.renderer.reducedMotion = !!this.settings.reducedMotion;
      this.renderer.setTheme(this.settings.theme === 'auto' ? (this.stage ? this.stage.theme : THEMES[0].id) : this.settings.theme);
      this.renderer.setGraphics(this.settings.graphics);
    }
  }
}

/** Player-facing text for a rules rejection reason (stable snake_case ids). */
function rejectText(reason) {
  const map = {
    not_a_legal_target: L('not a legal target'), phase_locked: L('only votes count during a council'),
    no_meeting: L('no council is in session'), already_voted: L('you already voted'),
    bad_vote_target: L('that vote is not possible'), already_reported: L('that incident was already reported'),
    bad_body: L('there is nothing to report here'), bad_room: L('that room does not exist'),
    bad_target: L('that target is not possible'), bad_task: L('that task is not here'),
    cooldown: L('still on cooldown'), no_meetings_left: L('no emergency chimes left'),
    not_crew: L('only the crew can do that'), not_linked: L('that room is not connected'),
    not_saboteur: L('only a saboteur can do that'), task_done: L('that task is already done'),
    unknown_type: L('unknown action'), witnessed: L('someone would see it'), wrong_room: L('you are in the wrong room'),
    game_over: L('the session is over'), player_dead: L('you are out of the session'),
    not_active: L('the session is not running'), undo_not_allowed: L('undo is only available in practice'),
    nothing_to_undo: L('nothing to undo'), duplicate_command: L('that action was already sent'),
  };
  return map[reason] ? map[reason]() : String(reason || '').replace(/_/g, ' ');
}

/** Room-channel error text. */
function serverErrorText(error) {
  if (error === 'connection lost') return T('connection lost');
  if (error === 'room error') return T('room error');
  return String(error || '');
}

const root = document.getElementById('app') || document.body.appendChild(document.createElement('div'));
window.__hiddenCouncil = new App(root);
