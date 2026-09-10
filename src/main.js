'use strict';
// Hidden Council — client bootstrap and application glue.
// State machine: boot → title → mode-select → preparing → countdown →
// active ↔ paused → resolving → results → progression.

import { StationRenderer, ROOM_POS, LAYER_GAME } from './render.js';
import { UI } from './ui.js';
import { AudioEngine } from './audio.js';
import {
  SoloSession, loadSave, storeSave, loadSettings, storeSettings, syncServerTime, ACHIEVEMENTS,
} from './session.js';
import { legalActions, STATION_ROOMS } from './rules.js';
import { THEMES, dailyStage, practiceStage, challengeStage, JOURNEY } from './content.js';

class App {
  constructor(root) {
    this.phase = 'boot';
    this.save = loadSave();
    this.settings = loadSettings();
    this.ui = new UI(root, this);
    this.audio = new AudioEngine(this.settings);
    this.audio.caption = (t) => this.ui.caption(t);
    this.renderer = null;
    this.session = null;
    this.stage = null;
    this.serverOffset = 0;
    this.ws = null;
    this.focusIndex = 0;

    this.applyAccessibilityClasses();
    this.bindGlobalInput();
    this.bindLifecycle();

    syncServerTime().then((r) => { this.serverOffset = r.offset; });

    if (this.webglAvailable()) this.phase = 'title';
    this.showTitle();
  }

  webglAvailable() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch (e) { return false; }
  }

  persistSave() { storeSave(this.save); }

  // ------------------------------------------------------------- screens --

  showTitle() {
    this.phase = 'title';
    this.ui.showHud(false);
    this.teardownRenderer();
    this.ui.showScreen(this.ui.titleScreen(this.save, this.settings));
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
    const s = this.ui.screen('Compatibility Notice');
    s.appendChild(this.ui.el('p', '', 'WebGL is unavailable in this browser. The 3D station cannot be shown, but your progress is safe. You can still play using the action buttons.'));
    s.appendChild(this.ui.button('Continue (2D controls)', 'hc-play', () => this.countdown()));
    s.appendChild(this.ui.button('← Title', 'hc-subtle', () => this.showTitle()));
    return s;
  }

  buildRenderer(stage) {
    this.teardownRenderer();
    this.renderer = new StationRenderer(this.ui.canvas, {
      seed: stage.seed, theme: this.settings.theme === 'auto' ? stage.theme : this.settings.theme,
      reducedMotion: this.settings.reducedMotion, cvd: this.settings.cvdPalette,
      tier: this.settings.tier === 'auto' ? 'medium' : this.settings.tier,
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
    this.ui.announce('Session starting');
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
        this.ui.announce('Go. ' + (this.stage.tutorialText || 'Complete the station tasks.'));
        this.session.scheduleAi();
      }
    };
    step();
  }

  // Tutorial interstitial: present each step, require the player to act.
  startTutorial(tut) {
    const stage = {
      id: tut.id, name: 'Tutorial: ' + tut.title, seed: tut.seed,
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
    this.ui.announce('Paused');
  }

  resumeGame() {
    this.phase = 'active';
    if (this.session) this.session.resume();
    this.ui.showScreen(null);
    this.ui.announce('Resumed');
  }

  leaveGame() {
    if (this.session) { this.session.pause(); this.session = null; }
    if (this.ws) { try { this.ws.close(); } catch (e) {} this.ws = null; }
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
      if (['meeting', 'eject', 'eliminate', 'end'].includes(e.kind)) this.ui.announce(e.text);
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
      this.audio.event('ack', 5); // 'task' captions "Task complete", which misleads here
      if (tut.step >= steps.length) {
        this.save.tutorialDone[tut.def.id] = true;
        this.persistSave();
        this.ui.announce('Lesson complete: ' + tut.def.title);
        this.ui.caption('Lesson complete! Keep playing or leave.');
      } else {
        this.ui.announce(steps[tut.step].text);
      }
    } else {
      this.ui.announce(steps[tut.step].text);
    }
  }

  onReject(reason) {
    this.audio.event('reject', 3);
    const msg = 'Cannot do that: ' + reason.replace(/_/g, ' ');
    this.ui.caption(msg);
    this.ui.announce(msg);
  }

  humanAct(fields) {
    if (!this.session || this.phase !== 'active') return;
    this.audio.event('ack', 1);
    if (this.ws && this.ws.readyState === 1) {
      // Hosted: send to authoritative server.
      const cmd = this.session.makeCmd(fields);
      this.ws.send(JSON.stringify({ type: 'command', command: cmd }));
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
    if (!acts.length) { this.ui.caption('No actions right now.'); return; }
    const pri = acts.find((a) => a.type === 'report') || acts.find((a) => a.type === 'task') || acts.find((a) => a.type === 'vote') || acts[0];
    const text = {
      move: 'Try moving toward a room with unfinished work.',
      task: 'A task is ready here — complete it.',
      report: 'Report the incident to convene the council.',
      vote: 'Weigh the log and cast your vote.',
      eliminate: 'An opportunity…',
      call: 'You can ring the emergency chime.',
      wait: 'Waiting lets the station tick forward.',
    }[pri.type];
    this.ui.caption('Hint: ' + text);
    this.ui.announce('Hint: ' + text);
    this.audio.event('hint', 2);
  }

  onEnd(result) {
    this.phase = 'resolving';
    const won = !!result.playerWon;
    if (this.session && !this.ws) {
      const fresh = this.session.recordCompletion(this.save);
      this.persistSave();
      this.submitScore(result, (err) => {
        this.phase = 'results';
        this.audio.event(won ? 'win' : 'lose', 9);
        if (fresh && fresh.length) setTimeout(() => this.audio.event('achievement', 11), 700);
        this.ui.showScreen(this.ui.resultsScreen(result, this.stage, fresh, { leaderboardError: err }));
      });
    } else {
      this.phase = 'results';
      this.audio.event(won ? 'win' : 'lose', 9);
      this.ui.showScreen(this.ui.resultsScreen(result, this.stage, [], {}));
    }
  }

  submitScore(result, done) {
    if (this.stage && this.stage.practice) return done(null);
    try {
      fetch('/api/v1/scores', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: this.save.profile.name, score: result.score.total, seed: result.seed | 0,
          rulesVersion: result.rulesVersion, contentVersion: result.contentVersion,
          assists: !!this.assists, durationMs: Math.max(1000, result.elapsed * 600),
          daily: !!(this.stage && this.stage.id.startsWith('daily-')),
        }),
      }).then((r) => r.json()).then((b) => done(b && b.error ? b.error : null)).catch(() => done('offline'));
    } catch (e) { done('offline'); }
  }

  // ------------------------------------------------------------- hosted --

  hostedConnect(onOpen) {
    if (this.ws && this.ws.readyState === 1) return onOpen();
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    try {
      this.ws = new WebSocket(proto + '://' + location.host + '/ws');
    } catch (e) {
      this.ui.caption('Hosted play requires server.js');
      return;
    }
    this.ws.onopen = onOpen;
    this.ws.onerror = () => this.ui.caption('Connection failed — is server.js running?');
    this.ws.onmessage = (ev) => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch (e) { return; }
      if (msg.type === 'room') {
        if (msg.you) this.hostedSeatId = msg.you; // remember which seat is ours
        this.ui.updateLobby(msg);
      }
      if (msg.type === 'started') {
        this.stage = { id: 'hosted', name: 'Hosted Council', seed: msg.state.seed, config: msg.state, goals: { tasks: msg.state.tasks.length }, par: 80, difficulty: 3, theme: this.settings.theme };
        this.session = new SoloSession({ id: 'hosted', seed: msg.state.seed, config: { seed: msg.state.seed, playerCount: msg.state.players.length, saboteurCount: 1, taskCount: msg.state.tasks.length } }, {
          onState: (s, e) => this.onState(s, e), onReject: (reason) => this.onReject(reason), onEnd: (result) => this.onEnd(result),
        });
        this.session.stopAi();
        // Our seat is rarely p0 in a hosted room: commands must carry our own
        // player id or the server rejects them as identity_mismatch.
        const mine = (msg.seats || []).find((s) => s.id === this.hostedSeatId);
        this.session.humanId = mine && mine.playerId ? mine.playerId : 'p0';
        this.ui.showScreen(null);
        this.buildRenderer(this.stage);
        this.phase = 'active';
        this.ui.showHud(true);
        this.applyHostedState(msg.state, ['The session begins.']);
      }
      if (msg.type === 'state') this.applyHostedState(msg.state, []);
      if (msg.type === 'snapshot') {
        this.applyHostedState(msg.state, msg.away && msg.away.length ? ['While you were away:'].concat(msg.away) : []);
      }
      if (msg.type === 'rejected') this.onReject(msg.reason);
      if (msg.type === 'results') {
        this.applyHostedState(msg.state, []);
      }
      if (msg.type === 'error') this.ui.caption('Server: ' + msg.error);
    };
  }

  applyHostedState(state, notes) {
    if (!this.session) return;
    this.session.state = state;
    this.onState(state, notes.map((t) => ({ kind: 'meeting', text: t })));
    if (state.phase === 'over' && this.phase !== 'results') this.session.finish();
  }

  hostedCreate() { this.hostedConnect(() => this.ws.send(JSON.stringify({ type: 'create', name: this.save.profile.name }))); }
  hostedQuickJoin() { this.hostedConnect(() => this.ws.send(JSON.stringify({ type: 'quickjoin', name: this.save.profile.name }))); }
  hostedJoin(code) { this.hostedConnect(() => this.ws.send(JSON.stringify({ type: 'join', code, name: this.save.profile.name }))); }
  hostedAddAi() { if (this.ws) this.ws.send(JSON.stringify({ type: 'addAi' })); }
  hostedReady() { if (this.ws) this.ws.send(JSON.stringify({ type: 'ready', ready: true })); }
  hostedStart() { if (this.ws) this.ws.send(JSON.stringify({ type: 'start' })); }

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

  bindGlobalInput() {
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
      if (e.key === 'Escape') {
        if (this.phase === 'active') { this.pauseGame(); e.preventDefault(); }
        else if (this.phase === 'paused') { this.resumeGame(); e.preventDefault(); }
        return;
      }
      if (this.phase !== 'active') return;
      if (e.key === 'u' || e.key === 'U') { this.undo(); e.preventDefault(); }
      if (e.key === 'h' || e.key === 'H') { this.hint(); e.preventDefault(); }
      if (e.key === 'c' || e.key === 'C') { if (this.renderer) this.renderer.resetCamera(); e.preventDefault(); }
      if (e.key === ' ' || e.key === 'Enter') {
        // Confirm first priority action (task/report > wait) via keyboard.
        if (e.key === ' ') { this.humanAct({ type: 'wait' }); e.preventDefault(); }
      }
      if (e.key.startsWith('Arrow')) {
        // Cycle among legal move targets; Enter commits.
        const legal = this.session ? this.session.legal().filter((a) => a.type === 'move') : [];
        if (legal.length) {
          this.focusIndex = (this.focusIndex + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1) + legal.length) % legal.length;
          const room = legal[this.focusIndex].room;
          if (this.renderer) { this.renderer.showLegalTargets([room]); this.renderer.placeCamera(room, false); }
          this.ui.caption('Target: ' + room);
          this.audio.event('ack', this.focusIndex);
          if (e.key === 'ArrowDown' && e.shiftKey) this.humanAct({ type: 'move', room });
        }
        e.preventDefault();
      }
      if (e.key === 'Enter') {
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
      // Backgrounding pauses solo simulation.
      if (hidden && this.phase === 'active' && !this.ws) this.pauseGame();
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
  }

  applySettings() {
    storeSettings(this.settings);
    this.applyAccessibilityClasses();
    for (const bus of ['music', 'effects', 'ambience', 'voice']) this.audio.setVolume(bus, this.settings[bus]);
    if (this.renderer) {
      this.renderer.cvd = !!this.settings.cvdPalette;
      this.renderer.reducedMotion = !!this.settings.reducedMotion;
      this.renderer.setTheme(this.settings.theme === 'auto' ? (this.stage ? this.stage.theme : THEMES[0].id) : this.settings.theme);
      this.renderer.setQuality(this.settings.tier === 'auto' ? 'medium' : this.settings.tier);
    }
  }
}

const root = document.getElementById('app') || document.body.appendChild(document.createElement('div'));
window.__hiddenCouncil = new App(root);
