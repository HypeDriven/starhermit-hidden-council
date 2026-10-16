'use strict';
// UI module: semantic DOM shell over/beside the canvas — screens, focus,
// live regions, settings, accessibility mirror. No rules mutation; the UI
// issues commands through the session only.

import { THEMES, TUTORIALS, JOURNEY } from './content.js';
import { formatScore } from './util.js';
import { PRESETS, CATEGORIES, resolve, presetTier, choosePreset, describe } from './gfx.js';
import { gfxStrings, gfxLocale, fmt, shStrings } from './i18n-gfx.js';
import { T, L, bindText, relabel } from './i18n.js';

export class UI {
  constructor(root, app) {
    this.root = root;
    this.app = app; // {startMode, session hooks, settings, save, audio}
    this.focusMemory = null;
    this.build();
    // Language change: bound text re-renders itself (i18n.relabel); refresh the
    // parts computed from live state. Screens, the session and the room stay.
    document.addEventListener('hc-language', () => {
      relabel();
      if (this._hudArgs && !this.hud.hidden) this.updateHud(...this._hudArgs);
      if (this._lobbySnap && this.lobbyEl && this.lobbyEl.isConnected) this.updateLobby(this._lobbySnap);
    });
  }

  /** Text may be a string or a deferred message (L(...) / function): messages follow the language. */
  el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) bindText(e, text);
    return e;
  }

  /** Set an attribute (aria-label, title…) that follows the language when given a message. */
  attr(node, name, value) { bindText(node, value, name); return node; }

  button(label, cls, onClick) {
    const b = this.el('button', 'btn ' + (cls || ''), label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  build() {
    this.root.innerHTML = '';
    this.root.className = 'hc-root';

    this.canvasWrap = this.el('div', 'hc-canvas-wrap');
    this.canvas = this.el('canvas', 'hc-canvas');
    this.attr(this.canvas, 'aria-label', L('Clockwork research station playfield'));
    this.canvasWrap.appendChild(this.canvas);

    // Live regions.
    this.live = this.el('div', 'sr-only');
    this.live.setAttribute('aria-live', 'polite');
    this.live.setAttribute('role', 'status');

    this.screenLayer = this.el('div', 'hc-screens');
    this.hud = this.el('div', 'hc-hud');
    this.hud.hidden = true;

    // Account toast (invite link copied, signed out) — visible on any screen.
    this.toastEl = this.el('div', 'hc-toast');
    this.toastEl.setAttribute('role', 'status');
    this.toastEl.hidden = true;

    this.root.append(this.canvasWrap, this.hud, this.screenLayer, this.live, this.toastEl);
    this.buildHud();
  }

  announce(text) { this.live.textContent = ''; this.live.textContent = typeof text === 'function' ? text() : text; }

  // ------------------------------------------------------------------ HUD --

  buildHud() {
    this.hud.innerHTML = '';
    this.hudLeft = this.el('aside', 'hc-rail hc-rail-left');
    this.attr(this.hudLeft, 'aria-label', L('Objective and progress'));
    this.hudRight = this.el('aside', 'hc-rail hc-rail-right');
    this.attr(this.hudRight, 'aria-label', L('Actions'));
    this.hudTop = this.el('header', 'hc-topbar');

    this.objectiveEl = this.el('h2', 'hc-objective', L('Objective'));
    this.progressEl = this.el('div', 'hc-progress');
    this.logEl = this.el('ol', 'hc-log');
    this.attr(this.logEl, 'aria-label', L('Station log'));
    this.hudLeft.append(this.objectiveEl, this.progressEl, this.logEl);

    this.actorEl = this.el('div', 'hc-actor');
    this.actorEl.setAttribute('aria-live', 'polite');
    this.actionsEl = this.el('div', 'hc-actions');
    this.hudRight.append(this.actorEl, this.actionsEl);

    const pauseBtn = this.button(L('⏸ Pause'), 'hc-pause', () => this.app.pauseGame());
    pauseBtn.setAttribute('aria-keyshortcuts', 'Escape');
    // Compact layouts: labelled 44px drawer controls (CSS shows them only there).
    const drawerBtn = (label, rail, other) => {
      const b = this.button(label, 'hc-drawer-toggle', () => {
        const open = rail.classList.toggle('open');
        other.classList.remove('open');
        b.setAttribute('aria-expanded', String(open));
      });
      b.setAttribute('aria-expanded', 'false');
      return b;
    };
    this.drawerLeftBtn = drawerBtn(L('☰ Log'), this.hudLeft, this.hudRight);
    this.drawerRightBtn = drawerBtn(L('Actions ▸'), this.hudRight, this.hudLeft);
    const mapBtn = this.button(L('⌖ Map'), 'hc-map', () => {
      const r = this.app.renderer;
      if (!r) return;
      const on = r.toggleOverview();
      mapBtn.setAttribute('aria-pressed', String(on));
    });
    mapBtn.setAttribute('aria-pressed', 'false');
    this.attr(mapBtn, 'title', L('Toggle station overview / room view'));
    this.hudTop.append(pauseBtn, mapBtn, this.drawerLeftBtn, this.el('span', 'hc-caption'), this.drawerRightBtn);
    this.captionEl = this.hudTop.querySelector('.hc-caption');

    this.hud.append(this.hudTop, this.hudLeft, this.hudRight);
  }

  showHud(on) { this.hud.hidden = !on; }

  updateHud(state, legal, stage) {
    this._hudArgs = [state, legal, stage];
    bindText(this.objectiveEl, stage ? stageTitle(stage) : 'Hidden Council');
    const tasksDone = state.tasks.filter((t) => t.done).length;
    const alive = state.players.filter((p) => p.alive).length;
    let txt = T('Tasks {done}/{total} · {alive} aboard · tick {tick}', { done: tasksDone, total: state.tasks.length, alive, tick: state.tick });
    if (state.goals.timeLimit != null) txt += ' · ' + T('{n} ticks left', { n: Math.max(0, state.goals.timeLimit - state.elapsedTicks) });
    if (state.goals.moveLimit != null) {
      let mv = 0; for (const k of Object.keys(state.moveCounts)) mv += state.moveCounts[k];
      txt += ' · ' + T('{n} moves left', { n: Math.max(0, state.goals.moveLimit - mv) });
    }
    this.progressEl.textContent = txt;

    this.actorEl.textContent = state.phase === 'meeting'
      ? T('Council in session — cast your vote')
      : state.phase === 'over' ? T('Session over') : T('Your move');

    // Actions: DOM equivalents of canvas targets.
    this.actionsEl.innerHTML = '';
    const acts = legal || [];
    const addBtn = (label, fn, key) => {
      const b = this.button(label, 'hc-action', fn);
      if (key) b.setAttribute('aria-keyshortcuts', key);
      this.actionsEl.appendChild(b);
    };
    for (const a of acts) {
      if (a.type === 'move') {
        const room = a.room;
        addBtn(T('Go: {room}', { room: roomName(room) }), () => this.app.humanAct({ type: 'move', room }));
      } else if (a.type === 'task') {
        addBtn(T('Do: {task}', { task: taskLabel(state, a.task) }), () => this.app.humanAct({ type: 'task', task: a.task }));
      } else if (a.type === 'report') {
        addBtn(T('⚠ Report incident'), () => this.app.humanAct({ type: 'report', body: a.body }));
      } else if (a.type === 'eliminate') {
        addBtn(T('Eliminate {name}', { name: playerName(state, a.target) }), () => this.app.humanAct({ type: 'eliminate', target: a.target }));
      } else if (a.type === 'call') {
        addBtn(T('Ring the chime'), () => this.app.humanAct({ type: 'call' }));
      } else if (a.type === 'vote') {
        addBtn(a.choice === 'skip' ? T('Vote: skip') : T('Vote: {name}', { name: playerName(state, a.choice) }), () => this.app.humanAct({ type: 'vote', choice: a.choice }));
      }
    }
    if (acts.some((a) => a.type === 'wait')) addBtn(T('Wait'), () => this.app.humanAct({ type: 'wait' }), this.app.keyLabel ? this.app.keyLabel('wait') : 'Space');
    const keyOf = (a) => this.app.keyLabel ? this.app.keyLabel(a) : '';
    if (this.app.session && this.app.session.practice) addBtn(T('↩ Undo ({key})', { key: keyOf('undo') }), () => this.app.undo(), keyOf('undo'));
    addBtn(T('💡 Hint ({key})', { key: keyOf('hint') }), () => this.app.hint(), keyOf('hint'));

    this.logEl.innerHTML = '';
    for (const e of state.log.slice(-7)) {
      const li = this.el('li', 'hc-log-' + e.kind, logText(e));
      this.logEl.appendChild(li);
    }
  }

  toast(text) {
    bindText(this.toastEl, text);
    this.toastEl.hidden = false;
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => { this.toastEl.hidden = true; }, 3500);
  }

  inviteFriend() {
    const T = shStrings();
    const link = this.app.platform.inviteLink();
    if (!link) return;
    const done = (ok) => { this.toast(ok ? T.copied : fmt(T.copyFailed, { link })); this.announce(ok ? T.copied : T.copyFailed.replace('{link}', '')); };
    try { navigator.clipboard.writeText(link).then(() => done(true), () => done(false)); } catch (e) { done(false); }
  }

  caption(text) {
    bindText(this.captionEl, text);
    clearTimeout(this._capT);
    this._capT = setTimeout(() => { this.captionEl.textContent = ''; }, 2500);
  }

  // --------------------------------------------------------------- screens --

  showScreen(node, restoreFocus) {
    if (restoreFocus !== false) this.focusMemory = document.activeElement;
    this.screenLayer.innerHTML = '';
    if (node) {
      this.screenLayer.appendChild(node);
      this.screenLayer.hidden = false;
      const f = node.querySelector('button, [tabindex], input, select');
      if (f) f.focus();
    } else {
      this.screenLayer.hidden = true;
      if (this.focusMemory && this.focusMemory.focus) this.focusMemory.focus();
      this.focusMemory = null;
    }
  }

  screen(titleText) {
    const s = this.el('section', 'hc-screen');
    s.setAttribute('role', 'dialog');
    this.attr(s, 'aria-label', titleText);
    const h = this.el('h1', 'hc-title', titleText);
    s.appendChild(h);
    return s;
  }

  titleScreen(save, settings) {
    const s = this.screen('Hidden Council');
    s.classList.add('hc-screen-title');
    s.appendChild(this.el('p', 'hc-tagline', L('A clockwork station. A hidden hand. A council of gears.')));
    const play = this.button(L('▶ Play'), 'hc-play', () => this.app.showModeSelect());
    s.appendChild(play);
    const row = this.el('div', 'hc-row');
    row.append(
      this.button(L('Daily Chime'), '', () => this.app.startDaily()),
      this.button(L('Journey'), '', () => this.showScreen(this.journeyScreen(save))),
      this.button(L('Help'), '', () => this.showScreen(this.helpScreen())),
    );
    // Hosted Play needs StarHermit realtime rooms: shown only when signed in.
    if (this.app.platform && this.app.platform.hosted) {
      row.insertBefore(this.button(L('Hosted Play'), '', () => this.showScreen(this.hostedScreen())), row.lastChild);
    }
    s.appendChild(row);
    const prof = this.el('div', 'hc-profile');
    if (this.app.platform && this.app.platform.hosted) {
      // Hosted: the name comes from the platform profile, not a free-text box.
      if (this.app.platform.avatar) {
        const img = this.el('img', 'hc-avatar');
        img.src = this.app.platform.avatar;
        img.alt = '';
        prof.appendChild(img);
      }
      prof.append(
        this.el('label', '', L('Tinkerer:')), document.createTextNode(' '),
        this.el('strong', '', () => this.app.platform.displayName || '…'),
        this.el('span', 'hc-muted', () => ' · ' + T('{sessions} sessions · streak {streak}', { sessions: save.sessions, streak: save.streak })),
        this.el('span', 'hc-sync', () => this.app.platform.syncLine()),
      );
    } else {
      const name = this.el('input', 'hc-name');
      name.value = save.profile.name;
      name.maxLength = 24;
      this.attr(name, 'aria-label', L('Display name'));
      name.addEventListener('change', () => { save.profile.name = name.value.trim() || save.profile.name; this.app.persistSave(); });
      prof.append(this.el('label', '', L('Tinkerer:')), document.createTextNode(' '), name, this.el('span', 'hc-muted', () => ' · ' + T('{sessions} sessions · streak {streak}', { sessions: save.sessions, streak: save.streak })));
    }
    s.appendChild(prof);
    const settingsBtn = this.button(L('⚙ Settings'), 'hc-subtle', () => this.showScreen(this.settingsScreen()));
    s.appendChild(settingsBtn);
    const plat = this.app.platform;
    if (plat && (plat.hosted || plat.canSignIn())) {
      const acct = this.el('div', 'hc-row hc-account');
      if (plat.hosted) {
        const inv = this.button(() => shStrings().invite, 'hc-subtle', () => this.inviteFriend());
        inv.id = 'hc-invite';
        acct.appendChild(inv);
      } else {
        const sin = this.button(() => shStrings().signIn, 'hc-subtle', () => plat.signIn());
        sin.id = 'hc-signin';
        acct.appendChild(sin);
      }
      s.appendChild(acct);
    }
    return s;
  }

  /**
   * Launch token could not be renewed (or StarHermit needs the updated terms
   * accepted): offer the way back to StarHermit.
   */
  sessionExpiredScreen(reason) {
    const terms = reason === 'terms';
    const s = this.screen(terms ? L('Accept the updated terms') : () => shStrings().expiredTitle);
    s.classList.add('hc-screen-expired');
    s.appendChild(this.el('p', 'hc-expired-body', terms
      ? L('StarHermit needs you to accept its updated terms before you can keep playing online. Head back to StarHermit to review them — progress keeps saving on this device.')
      : () => shStrings().expiredBody));
    const row = this.el('div', 'hc-row');
    const back = this.button(() => shStrings().relaunch, 'hc-play', () => {
      if (!this.app.platform.relaunch()) this.toast(() => shStrings().relaunchFailed);
    });
    back.id = 'hc-relaunch';
    row.append(back, this.button(() => shStrings().offline, 'hc-subtle', () => this.app.showTitle()));
    s.appendChild(row);
    return s;
  }

  modeSelectScreen() {
    const s = this.screen(L('Choose Your Session'));
    const modes = [
      [L('Tutorial'), L('Learn one rule at a time.'), () => this.showScreen(this.tutorialScreen())],
      [L('Journey'), L('40 staged councils, growing pressure.'), () => this.showScreen(this.journeyScreen(this.app.save))],
      [L('Daily Chime'), L('One shared seed per UTC day.'), () => this.app.startDaily()],
      [L('Practice'), L('Any difficulty. Undo allowed. Unranked.'), () => this.showScreen(this.practiceScreen())],
      [L('Challenge'), L('Constrained goals: beat the clock, sure-footed.'), () => this.showScreen(this.challengeScreen())],
    ];
    if (this.app.platform && this.app.platform.hosted) {
      modes.push([L('Hosted Play'), L('Create or join a room with others.'), () => this.showScreen(this.hostedScreen())]);
    }
    for (const [name, desc, fn] of modes) {
      const b = this.button(name, 'hc-mode', fn);
      const d = this.el('div', 'hc-muted', desc);
      const wrap = this.el('div', 'hc-mode-wrap');
      wrap.append(b, d);
      s.appendChild(wrap);
    }
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showTitle()));
    return s;
  }

  // Mode setup sheet: rules, duration, players, assists, ranked flag.
  setupScreen(stage, onStart) {
    const s = this.screen(() => stageTitle(stage));
    const facts = this.el('ul', 'hc-facts');
    const sab = stage.config.saboteurCount;
    const items = [
      [L('Rules'), () => stage.mechanics.map(mechanicName).join(', ')],
      [L('Expected length'), L('~{n} minutes', { n: Math.max(3, Math.round(stage.par / 8)) })],
      [L('Players'), sab > 1 ? L('{n} ({s} saboteurs)', { n: stage.config.playerCount, s: sab }) : L('{n} ({s} saboteur)', { n: stage.config.playerCount, s: sab })],
      [L('Par'), L('{n} ticks', { n: stage.par })],
      [L('Difficulty'), '★'.repeat(stage.difficulty)],
      [L('Ranked'), stage.ranked
        ? ((this.app.platform && this.app.platform.hosted) ? L('Yes — shown on the read-only platform board') : L('Yes'))
        : L('No')],    ];
    for (const [k, v] of items) {
      const li = this.el('li');
      li.append(this.el('span', '', k), document.createTextNode(': '), this.el('strong', '', v));
      facts.appendChild(li);
    }
    s.appendChild(facts);
    const assists = this.el('label', 'hc-check');
    const cb = this.el('input');
    cb.type = 'checkbox'; cb.checked = true;
    assists.append(cb, document.createTextNode(' '), this.el('span', '', L('Assists (hints + target preview)')));
    s.appendChild(assists);
    const go = this.button(L('Begin'), 'hc-play', () => onStart(!!cb.checked));
    s.appendChild(go);
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  tutorialScreen() {
    const s = this.screen(L('Tutorial Lessons'));
    for (const t of TUTORIALS) {
      const done = this.app.save.tutorialDone[t.id];
      s.appendChild(this.button(() => (done ? '✓ ' : '') + T(t.title), 'hc-mode', () => this.app.startTutorial(t)));
    }
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  journeyScreen(save) {
    const s = this.screen(L('Journey'));
    const grid = this.el('div', 'hc-journey');
    for (const st of JOURNEY) {
      const rec = save.journey[st.id];
      const b = this.button(
        (st.index + 1) + (st.mastery ? ' ◆' : '') + (rec ? (rec.won ? ' ✓' : ' ·' + formatScore(rec.score)) : ''),
        'hc-stage' + (rec && rec.won ? ' won' : ''),
        () => this.showScreen(this.setupScreen(st, (assists) => this.app.startStage(st, assists)))
      );
      this.attr(b, 'title', L('{name} — difficulty {d}', { name: L(st.name), d: st.difficulty }));
      grid.appendChild(b);
    }
    s.appendChild(grid);
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  practiceScreen() {
    const s = this.screen(L('Practice'));
    s.appendChild(this.el('p', 'hc-muted', L('Unranked. Restart and undo are available.')));
    for (let d = 1; d <= 5; d++) {
      s.appendChild(this.button(L('Difficulty {d}', { d }), 'hc-mode', () => this.app.startPractice(d)));
    }
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  challengeScreen() {
    const s = this.screen(L('Challenges'));
    s.appendChild(this.button(L('Beat the Clock — 55 ticks'), 'hc-mode', () => this.app.startChallenge('clock-tower')));
    s.appendChild(this.button(L('Short Fuse — 40 ticks'), 'hc-mode', () => this.app.startChallenge('short-fuse')));
    s.appendChild(this.button(L('Sure-Footed — 46 moves max'), 'hc-mode', () => this.app.startChallenge('sure-footed')));
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  hostedScreen() {
    const s = this.screen(L('Hosted Play'));
    s.appendChild(this.el('p', 'hc-muted', L('Create a council or quick-join an open one. The room is routed by StarHermit; the tab that creates it runs the station.')));
    s.appendChild(this.button(L('Create Room'), 'hc-mode', () => this.app.hostedCreate()));
    s.appendChild(this.button(L('Quick Join'), 'hc-mode', () => this.app.hostedQuickJoin()));
    this.lobbyEl = this.el('div', 'hc-lobby');
    this._lobbySnap = null;
    s.appendChild(this.lobbyEl);
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  updateLobby(snapshot) {
    if (!this.lobbyEl) return;
    this._lobbySnap = snapshot;
    this.lobbyEl.innerHTML = '';
    this.lobbyEl.appendChild(this.el('h2', '', L('Room {code}', { code: snapshot.code })));
    const ul = this.el('ul');
    for (const seat of snapshot.seats) {
      ul.appendChild(this.el('li', '', () => seat.name + (seat.ai ? ' (' + T('automaton') + ')' : '') + (seat.ready ? ' — ' + T('ready') : '') + (seat.id === snapshot.you || seat.you ? ' ← ' + T('you') : '')));
    }
    this.lobbyEl.appendChild(ul);
    const net = this.app.net;
    if (net) {
      // Platform rooms: only the host adds automata / starts; anyone may leave.
      if (net.isHost) {
        this.lobbyEl.append(
          this.button(L('Add Automaton'), '', () => this.app.hostedAddAi()),
          this.button(L('Start'), 'hc-play', () => this.app.hostedStart()),
        );
      } else {
        this.lobbyEl.appendChild(this.button(L('Ready'), '', () => this.app.hostedReady()));
      }
      this.lobbyEl.appendChild(this.button(L('Leave Room'), 'hc-subtle', () => this.app.hostedLeave()));
    } else {
      this.lobbyEl.append(
        this.button(L('Add Automaton'), '', () => this.app.hostedAddAi()),
        this.button(L('Ready'), '', () => this.app.hostedReady()),
        this.button(L('Start'), 'hc-play', () => this.app.hostedStart()),
      );
    }
  }

  pauseScreen() {
    const s = this.screen(L('Paused'));
    s.appendChild(this.button(L('▶ Resume'), 'hc-play', () => this.app.resumeGame()));
    s.appendChild(this.settingsBlock());
    s.appendChild(this.button(L('Help'), '', () => this.showScreen(this.helpScreen(true))));
    s.appendChild(this.button(L('Leave Session'), 'hc-subtle', () => this.app.leaveGame()));
    return s;
  }

  settingsBlock() {
    const wrap = this.el('div', 'hc-settings');
    const st = this.app.settings;
    const slider = (label, key) => {
      const l = this.el('label', 'hc-slider');
      l.append(this.el('span', '', label), document.createTextNode(' '));
      const inp = this.el('input');
      inp.type = 'range'; inp.min = 0; inp.max = 1; inp.step = 0.05; inp.value = st[key];
      this.attr(inp, 'aria-label', label);
      inp.addEventListener('input', () => { st[key] = Number(inp.value); this.app.applySettings(); });
      l.appendChild(inp);
      return l;
    };
    wrap.append(slider(L('Music'), 'music'), slider(L('Effects'), 'effects'), slider(L('Ambience'), 'ambience'), slider(L('Voice'), 'voice'));

    const theme = this.el('select');
    this.attr(theme, 'aria-label', L('Visual theme'));
    for (const t of THEMES) { const o = this.el('option', '', L(t.name)); o.value = t.id; theme.appendChild(o); }
    theme.value = st.theme;
    theme.addEventListener('change', () => { st.theme = theme.value; this.app.applySettings(); });
    const thl = this.el('label', 'hc-slider');
    thl.append(this.el('span', '', L('Theme')), document.createTextNode(' '));
    thl.appendChild(theme);
    wrap.appendChild(thl);

    const toggle = (label, key) => {
      const l = this.el('label', 'hc-check');
      const cb = this.el('input');
      cb.type = 'checkbox'; cb.checked = !!st[key];
      cb.addEventListener('change', () => { st[key] = cb.checked; this.app.applySettings(); });
      l.append(cb, document.createTextNode(' '), this.el('span', '', label));
      return l;
    };
    wrap.append(
      toggle(L('Larger text'), 'largeText'), toggle(L('High contrast'), 'highContrast'),
      toggle(L('Color-vision-safe palette'), 'cvdPalette'), toggle(L('Reduced motion'), 'reducedMotion'),
      toggle(L('Left-handed controls'), 'leftHanded'), toggle(L('Hold to confirm'), 'holdToConfirm'),
      toggle(L('Hints'), 'hints'),
    );
    wrap.appendChild(this.graphicsSection());
    return wrap;
  }

  // Graphics section: preset, render scale, per-effect overrides, adaptive
  // resolution, frame-rate readout and a cost summary. Applies live.
  graphicsSection() {
    const app = this.app;
    const st = app.settings;
    if (!st.graphics || typeof st.graphics !== 'object') st.graphics = {};
    const sec = this.el('section', 'hc-gfx');
    sec.id = 'hc-gfx';
    const h = this.el('h2', 'hc-gfx-title', () => gfxStrings().graphics);
    h.id = 'hc-gfx-title';
    sec.setAttribute('aria-labelledby', h.id);
    // The Graphics rows live in their own box: a language change redraws only
    // the box, so the shared Sound / frame-rate / Language / Report sections
    // that game-options.js mounts in this section survive.
    const box = this.el('div', 'hc-gfx-box');
    sec.append(h, box);
    const info = () => app.gpuInfo();
    let refresh = () => {};
    let refreshSummary = () => {};

    const build = () => {
      const G = gfxStrings();
      sec.lang = gfxLocale();
      box.textContent = '';
      const row = (labelText, control, extra) => {
        const l = this.el('label', 'hc-slider', labelText + ' ');
        if (extra) { const b = this.el('span', 'hc-gfx-range'); b.append(control, extra); l.appendChild(b); } else l.appendChild(control);
        control.setAttribute('aria-label', labelText);
        box.appendChild(l);
        return l;
      };
      const commit = () => { app.applySettings(); refresh(); };

      const preset = this.el('select');
      preset.id = 'hc-gfx-preset';
      preset.dataset.gfx = 'preset';
      for (const p of ['auto'].concat(PRESETS)) { const o = this.el('option'); o.value = p; preset.appendChild(o); }
      preset.addEventListener('change', () => { st.graphics = choosePreset(st.graphics, preset.value); commit(); });
      row(G.quality, preset);

      const scale = this.el('input');
      scale.type = 'range'; scale.min = 50; scale.max = 200; scale.step = 10;
      scale.id = 'hc-gfx-scale';
      scale.dataset.gfx = 'render_scale';
      const scaleOut = this.el('output', 'hc-gfx-val');
      scaleOut.setAttribute('for', scale.id);
      scale.addEventListener('input', () => { st.graphics.render_scale = Number(scale.value) / 100; commit(); });
      row(G.renderScale, scale, scaleOut);

      const cats = {};
      for (const [cat, tiers] of Object.entries(CATEGORIES)) {
        const sel = this.el('select');
        sel.id = 'hc-gfx-' + cat;
        sel.dataset.gfxCat = cat;
        for (const t of ['preset'].concat(tiers)) { const o = this.el('option'); o.value = t; o.textContent = G.tiers[t] || t; sel.appendChild(o); }
        sel.addEventListener('change', () => {
          if (sel.value === 'preset') delete st.graphics[cat]; else st.graphics[cat] = sel.value;
          commit();
        });
        row(G.cats[cat], sel);
        cats[cat] = sel;
      }

      const check = (labelText, id, get, set) => {
        const l = this.el('label', 'hc-check');
        const cb = this.el('input');
        cb.type = 'checkbox'; cb.id = id; cb.checked = get();
        cb.addEventListener('change', () => { set(cb.checked); commit(); });
        l.append(cb, document.createTextNode(' ' + labelText));
        box.appendChild(l);
        return cb;
      };
      const adaptive = check(G.adaptive, 'hc-gfx-adaptive', () => st.graphics.adaptive !== false, (v) => { st.graphics.adaptive = v; });
      const fps = check(G.showFps, 'hc-gfx-fps', () => !!st.graphics.show_fps, (v) => { st.graphics.show_fps = v; });

      const summary = this.el('p', 'hc-muted hc-gfx-summary');
      summary.id = 'hc-gfx-summary';
      summary.setAttribute('aria-live', 'polite');
      const note = this.el('p', 'hc-gfx-note', G.postFailed);
      note.id = 'hc-gfx-note';
      note.hidden = true;
      box.append(summary, note);

      refresh = () => {
        const { detected } = info();
        const g = st.graphics;
        const r = resolve(g, detected);
        preset.value = PRESETS.includes(g.preset) ? g.preset : 'auto';
        preset.options[0].textContent = fmt(G.auto, { tier: G.presets[detected] });
        for (let i = 1; i < preset.options.length; i++) preset.options[i].textContent = G.presets[preset.options[i].value];
        const pct = Math.round((Number(g.render_scale) || 1) * 100);
        scale.value = pct;
        scaleOut.textContent = pct + '%';
        for (const [cat, sel] of Object.entries(cats)) {
          sel.options[0].textContent = fmt(G.fromPreset, { tier: G.tiers[presetTier(r.preset, cat)] });
          sel.value = CATEGORIES[cat].includes(g[cat]) ? g[cat] : 'preset';
        }
        adaptive.checked = g.adaptive !== false;
        fps.checked = !!g.show_fps;
        refreshSummary();
      };
      refreshSummary = () => {
        const { gpu, detected } = info();
        const r = resolve(st.graphics, detected);
        const live = app.renderer && app.renderer.graphicsInfo ? app.renderer.graphicsInfo() : null;
        const px = live ? live.pixels : [
          Math.round(window.innerWidth * Math.min(window.devicePixelRatio || 1, r.cap) * r.scale),
          Math.round(window.innerHeight * Math.min(window.devicePixelRatio || 1, r.cap) * r.scale),
        ];
        summary.textContent = gpu + ' · ' + describe(live ? live.resolved : r, px, G.sum);
        summary.dataset.preset = r.preset;
        note.hidden = !(live && live.postFailed);
      };
      refresh();
    };
    build();
    const onLanguage = () => {
      if (!sec.isConnected) { document.removeEventListener('hc-language', onLanguage); return; }
      const focusedId = box.contains(document.activeElement) ? document.activeElement.id : null;
      build();
      if (focusedId) { const f = document.getElementById(focusedId); if (f) f.focus(); }
    };
    document.addEventListener('hc-language', onLanguage);
    // Keep the summary current (post-chain failures, adaptive scale) while visible.
    const timer = setInterval(() => { if (!sec.isConnected) { clearInterval(timer); return; } refreshSummary(); }, 1000);
    return sec;
  }

  settingsScreen() {
    const s = this.screen(L('Settings'));
    s.appendChild(this.settingsBlock());
    s.appendChild(this.button(L('Replay Tutorials'), '', () => this.showScreen(this.tutorialScreen())));
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => this.app.showTitle()));
    return s;
  }

  resultsScreen(result, stage, freshAchievements, meta) {
    // Victory is judged against the seat's own allegiance, not always the crew.
    const won = result.playerWon != null ? !!result.playerWon : result.winner === 'crew';
    const s = this.screen(won ? L('The Station Turns Again') : L('The Gears Fall Silent'));
    s.setAttribute('aria-live', 'assertive');
    // Decorative results illustration; the screen reads identically without it.
    const hero = this.el('img', 'hc-hero-img');
    hero.src = './assets/council-chamber.webp';
    hero.alt = '';
    hero.setAttribute('aria-hidden', 'true');
    hero.decoding = 'async';
    hero.addEventListener('error', () => { hero.remove(); });
    s.appendChild(hero);
    const side = result.winner === 'crew' ? L('Crew victory') : L('Saboteur victory');
    s.appendChild(this.el('p', 'hc-headline', () => T('{side} — {reason}', { side, reason: reasonText(result.winReason) })
      + (result.playerRole ? ' · ' + (result.playerRole === 'saboteur' ? T('you played a saboteur') : T('you played loyal crew')) : '')));

    const table = this.el('table', 'hc-score');
    table.appendChild(this.el('caption', '', L('Score breakdown')));
    for (const [k, v] of Object.entries(result.score.parts)) {
      const tr = this.el('tr');
      tr.append(this.el('td', '', SCORE_PARTS[k] || k), this.el('td', '', formatScore(v)));
      table.appendChild(tr);
    }
    const tr = this.el('tr', 'hc-total');
    tr.append(this.el('td', '', L('Total')), this.el('td', '', formatScore(result.score.total)));
    table.appendChild(tr);
    s.appendChild(table);

    if (freshAchievements && freshAchievements.length) {
      const ul = this.el('ul', 'hc-achievements');
      for (const k of freshAchievements) ul.appendChild(this.el('li', '', () => '🏅 ' + achievementName(k)));
      s.appendChild(ul);
    }
    if (meta && meta.lbLine) {
      const line = this.el('p', 'hc-muted', meta.lbLine);
      line.id = 'results-lb';
      line.setAttribute('role', 'status');
      s.appendChild(line);
    }
    if (meta && meta.leaderboard === 'loading') {
      s.appendChild(this.el('p', 'hc-muted', L('Loading the global board…')));
    } else if (meta && meta.leaderboard && !meta.leaderboard.leaderboardId) {
      s.appendChild(this.el('p', 'hc-muted', L('No platform leaderboard for this game — your personal bests travel with your save.')));
    } else if (meta && meta.leaderboard) {
      s.appendChild(this.el('h2', '', L('Global board')));
      const ol = this.el('ol', 'hc-board');
      for (const e of meta.leaderboard.entries) {
        ol.appendChild(this.el('li', e.you ? 'hc-you' : '',
          () => `${e.rank != null ? e.rank + '. ' : ''}${e.name} — ${formatScore(e.score)}${e.you ? ' (' + T('you') + ')' : ''}`));
      }
      if (!meta.leaderboard.entries.length) ol.appendChild(this.el('li', '', L('No entries yet.')));
      s.appendChild(ol);
    } else if (meta && meta.leaderboard === null) {
      s.appendChild(this.el('p', 'hc-muted', L('Global board unavailable (offline).')));
    }

    s.append(
      this.button(L('↻ Retry'), 'hc-mode', () => this.app.retry()),
      this.button(L('Next Stage'), 'hc-play', () => this.app.nextStage()),
      this.button(L('Copy Replay Hash: {hash}', { hash: result.hash.toString(16) }), 'hc-subtle', () => this.copyText(result.hash.toString(16))),
      this.button(L('← Title'), 'hc-subtle', () => this.app.leaveGame()),
    );
    return s;
  }

  // Clipboard with a legacy fallback; always acknowledges through the caption.
  copyText(text) {
    const done = (ok) => { this.caption(ok ? T('Copied: {text}', { text }) : T('Copy failed — {text}', { text })); this.announce(ok ? T('Copied to clipboard') : T('Copy failed')); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => done(true), () => done(false));
        return;
      }
    } catch (e) { /* fall through */ }
    done(false);
  }

  helpScreen(inGame) {
    const s = this.screen(L('How to Play'));
    const k = (a) => (this.app.keyLabel ? this.app.keyLabel(a) : a);
    const cards = [
      [L('Move'), L('Click a glowing room, press arrow keys to browse, Enter to go. Linked rooms only.')],
      [L('Tasks'), L('Stand in a room with an unfinished task and choose its action. Finish every task to win as crew.')],
      [L('Incidents'), L('Find a silenced tinkerer? Report it (⚠) to convene the council.')],
      [L('Voting'), L('During a council, vote to eject a suspect or skip. Majority decides.')],
      [L('Keys'), L('{commit} confirm · {pause} pause/cancel · {undo} undo (practice) · {hint} hint · {camera} camera reset · {wait} wait',
        { commit: k('commit'), pause: k('pause'), undo: k('undo'), hint: k('hint'), camera: k('camera'), wait: k('wait') })],
    ];
    for (const [t, d] of cards) {
      const c = this.el('div', 'hc-card');
      c.append(this.el('h3', '', t), this.el('p', '', d));
      s.appendChild(c);
    }
    s.appendChild(this.button(L('← Back'), 'hc-subtle', () => { this.showScreen(null); if (!inGame) this.app.showTitle(); else this.app.showPause(); }));
    return s;
  }
}

const ROOM_NAMES = {
  core: 'Pendulum Core', workshop: 'Gearwright Workshop', observatory: 'Starlens Observatory',
  foundry: 'Brass Foundry', gallery: 'Chronicle Gallery', aviary: 'Windup Aviary',
  cistern: 'Mainspring Cistern', greenhouse: 'Copper Greenhouse',
};

/** Localized room name (the English names are translation keys). */
export function roomName(id) {
  return ROOM_NAMES[id] ? T(ROOM_NAMES[id]) : id;
}

function playerName(state, id) {
  const p = state.players.find((x) => x.id === id);
  return p ? p.name : id;
}

function taskLabel(state, id) {
  const t = state.tasks.find((x) => x.id === id);
  return t ? T(t.label) : id;
}

function reasonText(r) {
  switch (r) {
    case 'tasks_complete': return T('all tasks complete');
    case 'saboteurs_ejected': return T('saboteurs voted out');
    case 'parity': return T('the council was overrun');
    case 'time_limit': return T('the clock ran out');
    case 'move_limit': return T('too many moves spent');
    default: return r || T('session ended');
  }
}

const SCORE_PARTS = {
  tasks: L('Tasks'), votes: L('Votes'), eliminations: L('Eliminations'),
  survival: L('Survival'), time: L('Time'), winBonus: L('Win bonus'),
};

const MECHANICS = {
  move: L('move'), task: L('task'), report: L('report'), vote: L('vote'), call: L('call'), pressure: L('pressure'),
};
function mechanicName(m) { return MECHANICS[m] ? MECHANICS[m]() : m; }

const ACHIEVEMENT_NAMES = {
  first_completion: L('First Winding'), mechanic_mastery: L('Full Council'), streak_three: L('Steady Hands'),
  hard_milestone: L('Grand Chime'), long_haul: L('Keeper of Hours'),
};
function achievementName(key) { return ACHIEVEMENT_NAMES[key] ? ACHIEVEMENT_NAMES[key]() : key.replace(/_/g, ' '); }

const CHALLENGE_NAMES = { 'clock-tower': L('Beat the Clock'), 'short-fuse': L('Short Fuse'), 'sure-footed': L('Sure-Footed') };

/** Localized title of a stage (journey/daily/practice/challenge/tutorial/hosted). */
export function stageTitle(stage) {
  const id = stage.id || '';
  if (id.startsWith('daily-')) return T('Daily Chime {date}', { date: String(stage.name || '').slice(-10) });
  if (id.startsWith('practice-')) return T('Practice (Difficulty {d})', { d: stage.difficulty });
  if (id.startsWith('challenge-')) {
    const n = CHALLENGE_NAMES[id.slice('challenge-'.length)];
    return T('Challenge: {name}', { name: n ? n() : T('Challenge') });
  }
  if (id.startsWith('tut-')) {
    const tut = TUTORIALS.find((t) => t.id === id);
    return T('Tutorial: {title}', { title: tut ? T(tut.title) : '' });
  }
  if (id === 'hosted') return T('Hosted Council');
  return stage.name ? T(stage.name) : 'Hidden Council';
}

// Station log lines come from the rules engine in English (they travel in the
// shared state); render the known shapes in the current language.
const ROOM_BY_NAME = Object.fromEntries(Object.entries(ROOM_NAMES).map(([id, n]) => [n, id]));
export const LOG_FIXED = [
  'The station clock ran out. The saboteurs prevail.', 'Too many wasted motions. The saboteurs prevail.',
  'Every task is complete. The crew restores the station.', 'All saboteurs have been voted out. The crew prevails.',
  'The saboteurs hold the council. The station falls silent.', 'No one was ejected.',
  'The session begins.', 'While you were away:',
];
const LOG_PATTERNS = [
  [/^(.+) moved to (.+)\.$/, (m) => T('{name} moved to {room}.', { name: m[1], room: ROOM_BY_NAME[m[2]] ? T(m[2]) : m[2] })],
  [/^(.+) completed: (.+)\.$/, (m) => T('{name} completed: {task}.', { name: m[1], task: T(m[2]) })],
  [/^Something went quiet in the (.+)\.$/, (m) => T('Something went quiet in the {room}.', { room: ROOM_BY_NAME[m[1]] ? T(m[1]) : m[1] })],
  [/^An incident was reported by (.+)\.$/, (m) => T('An incident was reported by {name}.', { name: m[1] })],
  [/^An emergency chime was rung by (.+)\.$/, (m) => T('An emergency chime was rung by {name}.', { name: m[1] })],
  [/^(.+) was ejected from the station\. A saboteur is unmasked\.$/, (m) => T('{name} was ejected from the station. A saboteur is unmasked.', { name: m[1] })],
  [/^(.+) was ejected from the station\. They were loyal crew\.$/, (m) => T('{name} was ejected from the station. They were loyal crew.', { name: m[1] })],
  [/^(.+) voted\.$/, (m) => T('{name} voted.', { name: m[1] })],
  [/^(.+) waited\.$/, (m) => T('{name} waited.', { name: m[1] })],
];
export function logText(e) {
  const text = String(e && e.text || '');
  if (LOG_FIXED.includes(text)) return T(text);
  for (const [re, fn] of LOG_PATTERNS) { const m = re.exec(text); if (m) return fn(m); }
  return T(text);
}
