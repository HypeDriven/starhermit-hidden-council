'use strict';
// UI module: semantic DOM shell over/beside the canvas — screens, focus,
// live regions, settings, accessibility mirror. No rules mutation; the UI
// issues commands through the session only.

import { THEMES, TUTORIALS, JOURNEY } from './content.js';
import { formatScore } from './util.js';

export class UI {
  constructor(root, app) {
    this.root = root;
    this.app = app; // {startMode, session hooks, settings, save, audio}
    this.focusMemory = null;
    this.build();
  }

  el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

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
    this.canvas.setAttribute('aria-label', 'Clockwork research station playfield');
    this.canvasWrap.appendChild(this.canvas);

    // Live regions.
    this.live = this.el('div', 'sr-only');
    this.live.setAttribute('aria-live', 'polite');
    this.live.setAttribute('role', 'status');

    this.screenLayer = this.el('div', 'hc-screens');
    this.hud = this.el('div', 'hc-hud');
    this.hud.hidden = true;

    this.root.append(this.canvasWrap, this.hud, this.screenLayer, this.live);
    this.buildHud();
  }

  announce(text) { this.live.textContent = ''; this.live.textContent = text; }

  // ------------------------------------------------------------------ HUD --

  buildHud() {
    this.hud.innerHTML = '';
    this.hudLeft = this.el('aside', 'hc-rail hc-rail-left');
    this.hudLeft.setAttribute('aria-label', 'Objective and progress');
    this.hudRight = this.el('aside', 'hc-rail hc-rail-right');
    this.hudRight.setAttribute('aria-label', 'Actions');
    this.hudTop = this.el('header', 'hc-topbar');

    this.objectiveEl = this.el('h2', 'hc-objective', 'Objective');
    this.progressEl = this.el('div', 'hc-progress');
    this.logEl = this.el('ol', 'hc-log');
    this.logEl.setAttribute('aria-label', 'Station log');
    this.hudLeft.append(this.objectiveEl, this.progressEl, this.logEl);

    this.actorEl = this.el('div', 'hc-actor');
    this.actorEl.setAttribute('aria-live', 'polite');
    this.actionsEl = this.el('div', 'hc-actions');
    this.hudRight.append(this.actorEl, this.actionsEl);

    const pauseBtn = this.button('⏸ Pause', 'hc-pause', () => this.app.pauseGame());
    pauseBtn.setAttribute('aria-keyshortcuts', 'Escape');
    this.hudTop.append(pauseBtn, this.el('span', 'hc-caption'));
    this.captionEl = this.hudTop.querySelector('.hc-caption');

    this.hud.append(this.hudTop, this.hudLeft, this.hudRight);
  }

  showHud(on) { this.hud.hidden = !on; }

  updateHud(state, legal, stage) {
    this.objectiveEl.textContent = stage ? stage.name : 'Hidden Council';
    const tasksDone = state.tasks.filter((t) => t.done).length;
    const alive = state.players.filter((p) => p.alive).length;
    let txt = `Tasks ${tasksDone}/${state.tasks.length} · ${alive} aboard · tick ${state.tick}`;
    if (state.goals.timeLimit != null) txt += ` · ${Math.max(0, state.goals.timeLimit - state.elapsedTicks)} ticks left`;
    if (state.goals.moveLimit != null) {
      let mv = 0; for (const k of Object.keys(state.moveCounts)) mv += state.moveCounts[k];
      txt += ` · ${Math.max(0, state.goals.moveLimit - mv)} moves left`;
    }
    this.progressEl.textContent = txt;

    this.actorEl.textContent = state.phase === 'meeting'
      ? 'Council in session — cast your vote'
      : state.phase === 'over' ? 'Session over' : 'Your move';

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
        addBtn('Go: ' + roomName(room), () => this.app.humanAct({ type: 'move', room }));
      } else if (a.type === 'task') {
        addBtn('Do: ' + taskLabel(state, a.task), () => this.app.humanAct({ type: 'task', task: a.task }));
      } else if (a.type === 'report') {
        addBtn('⚠ Report incident', () => this.app.humanAct({ type: 'report', body: a.body }));
      } else if (a.type === 'eliminate') {
        addBtn('Eliminate ' + playerName(state, a.target), () => this.app.humanAct({ type: 'eliminate', target: a.target }));
      } else if (a.type === 'call') {
        addBtn('Ring the chime', () => this.app.humanAct({ type: 'call' }));
      } else if (a.type === 'vote') {
        addBtn(a.choice === 'skip' ? 'Vote: skip' : 'Vote: ' + playerName(state, a.choice), () => this.app.humanAct({ type: 'vote', choice: a.choice }));
      }
    }
    if (acts.some((a) => a.type === 'wait')) addBtn('Wait', () => this.app.humanAct({ type: 'wait' }), 'Space');
    if (this.app.session && this.app.session.practice) addBtn('↩ Undo (U)', () => this.app.undo(), 'u');
    addBtn('💡 Hint (H)', () => this.app.hint(), 'h');

    this.logEl.innerHTML = '';
    for (const e of state.log.slice(-7)) {
      const li = this.el('li', 'hc-log-' + e.kind, e.text);
      this.logEl.appendChild(li);
    }
  }

  caption(text) {
    this.captionEl.textContent = text;
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
    s.setAttribute('aria-label', titleText);
    const h = this.el('h1', 'hc-title', titleText);
    s.appendChild(h);
    return s;
  }

  titleScreen(save, settings) {
    const s = this.screen('Hidden Council');
    s.classList.add('hc-screen-title');
    s.appendChild(this.el('p', 'hc-tagline', 'A clockwork station. A hidden hand. A council of gears.'));
    const play = this.button('▶ Play', 'hc-play', () => this.app.showModeSelect());
    s.appendChild(play);
    const row = this.el('div', 'hc-row');
    row.append(
      this.button('Daily Chime', '', () => this.app.startDaily()),
      this.button('Journey', '', () => this.showScreen(this.journeyScreen(save))),
      this.button('Hosted Play', '', () => this.showScreen(this.hostedScreen())),
      this.button('Help', '', () => this.showScreen(this.helpScreen())),
    );
    s.appendChild(row);
    const prof = this.el('div', 'hc-profile');
    const name = this.el('input', 'hc-name');
    name.value = save.profile.name;
    name.maxLength = 24;
    name.setAttribute('aria-label', 'Display name');
    name.addEventListener('change', () => { save.profile.name = name.value.trim() || save.profile.name; this.app.persistSave(); });
    prof.append(this.el('label', '', 'Tinkerer: '), name, this.el('span', 'hc-muted', ` · ${save.sessions} sessions · streak ${save.streak}`));
    s.appendChild(prof);
    const settingsBtn = this.button('⚙ Settings', 'hc-subtle', () => this.showScreen(this.settingsScreen()));
    s.appendChild(settingsBtn);
    return s;
  }

  modeSelectScreen() {
    const s = this.screen('Choose Your Session');
    const modes = [
      ['Tutorial', 'Learn one rule at a time.', () => this.showScreen(this.tutorialScreen())],
      ['Journey', '40 staged councils, growing pressure.', () => this.showScreen(this.journeyScreen(this.app.save))],
      ['Daily Chime', 'One shared seed per UTC day. Ranked.', () => this.app.startDaily()],
      ['Practice', 'Any difficulty. Undo allowed. Unranked.', () => this.showScreen(this.practiceScreen())],
      ['Challenge', 'Constrained goals: beat the clock, sure-footed.', () => this.showScreen(this.challengeScreen())],
      ['Hosted Play', 'Create or join a room with others.', () => this.showScreen(this.hostedScreen())],
    ];
    for (const [name, desc, fn] of modes) {
      const b = this.button(name, 'hc-mode', fn);
      const d = this.el('div', 'hc-muted', desc);
      const wrap = this.el('div', 'hc-mode-wrap');
      wrap.append(b, d);
      s.appendChild(wrap);
    }
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showTitle()));
    return s;
  }

  // Mode setup sheet: rules, duration, players, assists, ranked flag.
  setupScreen(stage, onStart) {
    const s = this.screen(stage.name);
    const facts = this.el('ul', 'hc-facts');
    const items = [
      ['Rules', stage.mechanics.join(', ')],
      ['Expected length', '~' + Math.max(3, Math.round(stage.par / 8)) + ' minutes'],
      ['Players', stage.config.playerCount + ' (' + stage.config.saboteurCount + ' saboteur' + (stage.config.saboteurCount > 1 ? 's' : '') + ')'],
      ['Par', stage.par + ' ticks'],
      ['Difficulty', '★'.repeat(stage.difficulty)],
      ['Ranked', stage.ranked ? 'Yes' : 'No'],
    ];
    for (const [k, v] of items) {
      const li = this.el('li', '', k + ': ');
      li.appendChild(this.el('strong', '', v));
      facts.appendChild(li);
    }
    s.appendChild(facts);
    const assists = this.el('label', 'hc-check');
    const cb = this.el('input');
    cb.type = 'checkbox'; cb.checked = true;
    assists.append(cb, document.createTextNode(' Assists (hints + target preview)'));
    s.appendChild(assists);
    const go = this.button('Begin', 'hc-play', () => onStart(!!cb.checked));
    s.appendChild(go);
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  tutorialScreen() {
    const s = this.screen('Tutorial Lessons');
    for (const t of TUTORIALS) {
      const done = this.app.save.tutorialDone[t.id];
      s.appendChild(this.button((done ? '✓ ' : '') + t.title, 'hc-mode', () => this.app.startTutorial(t)));
    }
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  journeyScreen(save) {
    const s = this.screen('Journey');
    const grid = this.el('div', 'hc-journey');
    for (const st of JOURNEY) {
      const rec = save.journey[st.id];
      const b = this.button(
        (st.index + 1) + (st.mastery ? ' ◆' : '') + (rec ? (rec.won ? ' ✓' : ' ·' + formatScore(rec.score)) : ''),
        'hc-stage' + (rec && rec.won ? ' won' : ''),
        () => this.showScreen(this.setupScreen(st, (assists) => this.app.startStage(st, assists)))
      );
      b.title = st.name + ' — difficulty ' + st.difficulty;
      grid.appendChild(b);
    }
    s.appendChild(grid);
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  practiceScreen() {
    const s = this.screen('Practice');
    s.appendChild(this.el('p', 'hc-muted', 'Unranked. Restart and undo are available.'));
    for (let d = 1; d <= 5; d++) {
      s.appendChild(this.button('Difficulty ' + d, 'hc-mode', () => this.app.startPractice(d)));
    }
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  challengeScreen() {
    const s = this.screen('Challenges');
    s.appendChild(this.button('Beat the Clock — 55 ticks', 'hc-mode', () => this.app.startChallenge('clock-tower')));
    s.appendChild(this.button('Short Fuse — 40 ticks', 'hc-mode', () => this.app.startChallenge('short-fuse')));
    s.appendChild(this.button('Sure-Footed — 46 moves max', 'hc-mode', () => this.app.startChallenge('sure-footed')));
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  hostedScreen() {
    const s = this.screen('Hosted Play');
    s.appendChild(this.el('p', 'hc-muted', 'Create a private room or quick-join. Works when served by server.js.'));
    s.appendChild(this.button('Create Room', 'hc-mode', () => this.app.hostedCreate()));
    s.appendChild(this.button('Quick Join', 'hc-mode', () => this.app.hostedQuickJoin()));
    const row = this.el('div', 'hc-row');
    const code = this.el('input', 'hc-name');
    code.placeholder = 'ROOM CODE'; code.maxLength = 6;
    code.setAttribute('aria-label', 'Room code');
    row.append(code, this.button('Join', '', () => this.app.hostedJoin(code.value)));
    s.appendChild(row);
    this.lobbyEl = this.el('div', 'hc-lobby');
    s.appendChild(this.lobbyEl);
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showModeSelect()));
    return s;
  }

  updateLobby(snapshot) {
    if (!this.lobbyEl) return;
    this.lobbyEl.innerHTML = '';
    this.lobbyEl.appendChild(this.el('h2', '', 'Room ' + snapshot.code));
    const ul = this.el('ul');
    for (const seat of snapshot.seats) {
      ul.appendChild(this.el('li', '', `${seat.name}${seat.ai ? ' (automaton)' : ''}${seat.ready ? ' — ready' : ''}${seat.id === snapshot.you ? ' ← you' : ''}`));
    }
    this.lobbyEl.appendChild(ul);
    this.lobbyEl.append(
      this.button('Add Automaton', '', () => this.app.hostedAddAi()),
      this.button('Ready', '', () => this.app.hostedReady()),
      this.button('Start', 'hc-play', () => this.app.hostedStart()),
    );
  }

  pauseScreen() {
    const s = this.screen('Paused');
    s.appendChild(this.button('▶ Resume', 'hc-play', () => this.app.resumeGame()));
    s.appendChild(this.settingsBlock());
    s.appendChild(this.button('Help', '', () => this.showScreen(this.helpScreen(true))));
    s.appendChild(this.button('Leave Session', 'hc-subtle', () => this.app.leaveGame()));
    return s;
  }

  settingsBlock() {
    const wrap = this.el('div', 'hc-settings');
    const st = this.app.settings;
    const slider = (label, key) => {
      const l = this.el('label', 'hc-slider', label + ' ');
      const inp = this.el('input');
      inp.type = 'range'; inp.min = 0; inp.max = 1; inp.step = 0.05; inp.value = st[key];
      inp.setAttribute('aria-label', label);
      inp.addEventListener('input', () => { st[key] = Number(inp.value); this.app.applySettings(); });
      l.appendChild(inp);
      return l;
    };
    wrap.append(slider('Music', 'music'), slider('Effects', 'effects'), slider('Ambience', 'ambience'), slider('Voice', 'voice'));

    const tier = this.el('select');
    tier.setAttribute('aria-label', 'Graphics tier');
    for (const t of ['auto', 'low', 'medium', 'high']) {
      const o = this.el('option', '', t); o.value = t; tier.appendChild(o);
    }
    tier.value = st.tier;
    tier.addEventListener('change', () => { st.tier = tier.value; this.app.applySettings(); });
    const tl = this.el('label', 'hc-slider', 'Graphics ');
    tl.appendChild(tier);
    wrap.appendChild(tl);

    const theme = this.el('select');
    theme.setAttribute('aria-label', 'Visual theme');
    for (const t of THEMES) { const o = this.el('option', '', t.name); o.value = t.id; theme.appendChild(o); }
    theme.value = st.theme;
    theme.addEventListener('change', () => { st.theme = theme.value; this.app.applySettings(); });
    const thl = this.el('label', 'hc-slider', 'Theme ');
    thl.appendChild(theme);
    wrap.appendChild(thl);

    const toggle = (label, key) => {
      const l = this.el('label', 'hc-check');
      const cb = this.el('input');
      cb.type = 'checkbox'; cb.checked = !!st[key];
      cb.addEventListener('change', () => { st[key] = cb.checked; this.app.applySettings(); });
      l.append(cb, document.createTextNode(' ' + label));
      return l;
    };
    wrap.append(
      toggle('Larger text', 'largeText'), toggle('High contrast', 'highContrast'),
      toggle('Color-vision-safe palette', 'cvdPalette'), toggle('Reduced motion', 'reducedMotion'),
      toggle('Left-handed controls', 'leftHanded'), toggle('Hold to confirm', 'holdToConfirm'),
      toggle('Hints', 'hints'),
    );
    return wrap;
  }

  settingsScreen() {
    const s = this.screen('Settings');
    s.appendChild(this.settingsBlock());
    s.appendChild(this.button('Replay Tutorials', '', () => this.showScreen(this.tutorialScreen())));
    s.appendChild(this.button('← Back', 'hc-subtle', () => this.app.showTitle()));
    return s;
  }

  resultsScreen(result, stage, freshAchievements, meta) {
    // Victory is judged against the seat's own allegiance, not always the crew.
    const won = result.playerWon != null ? !!result.playerWon : result.winner === 'crew';
    const s = this.screen(won ? 'The Station Turns Again' : 'The Gears Fall Silent');
    s.setAttribute('aria-live', 'assertive');
    // Decorative results illustration; the screen reads identically without it.
    const hero = this.el('img', 'hc-hero-img');
    hero.src = './assets/council-chamber.webp';
    hero.alt = '';
    hero.setAttribute('aria-hidden', 'true');
    hero.decoding = 'async';
    hero.addEventListener('error', () => { hero.remove(); });
    s.appendChild(hero);
    const side = result.winner === 'crew' ? 'Crew victory' : 'Saboteur victory';
    s.appendChild(this.el('p', 'hc-headline', side + ' — ' + reasonText(result.winReason)
      + (result.playerRole ? ' · you played ' + (result.playerRole === 'saboteur' ? 'a saboteur' : 'loyal crew') : '')));

    const table = this.el('table', 'hc-score');
    table.appendChild(this.el('caption', '', 'Score breakdown'));
    for (const [k, v] of Object.entries(result.score.parts)) {
      const tr = this.el('tr');
      tr.append(this.el('td', '', k), this.el('td', '', formatScore(v)));
      table.appendChild(tr);
    }
    const tr = this.el('tr', 'hc-total');
    tr.append(this.el('td', '', 'Total'), this.el('td', '', formatScore(result.score.total)));
    table.appendChild(tr);
    s.appendChild(table);

    if (freshAchievements && freshAchievements.length) {
      const ul = this.el('ul', 'hc-achievements');
      for (const k of freshAchievements) ul.appendChild(this.el('li', '', '🏅 ' + k.replace(/_/g, ' ')));
      s.appendChild(ul);
    }
    if (meta && meta.leaderboardError) s.appendChild(this.el('p', 'hc-muted', 'Leaderboard: ' + meta.leaderboardError));

    s.append(
      this.button('↻ Retry', 'hc-mode', () => this.app.retry()),
      this.button('Next Stage', 'hc-play', () => this.app.nextStage()),
      this.button('Copy Replay Hash: ' + result.hash.toString(16), 'hc-subtle', () => this.copyText(result.hash.toString(16))),
      this.button('← Title', 'hc-subtle', () => this.app.leaveGame()),
    );
    return s;
  }

  // Clipboard with a legacy fallback; always acknowledges through the caption.
  copyText(text) {
    const done = (ok) => { this.caption(ok ? 'Copied: ' + text : 'Copy failed — ' + text); this.announce(ok ? 'Copied to clipboard' : 'Copy failed'); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => done(true), () => done(false));
        return;
      }
    } catch (e) { /* fall through */ }
    done(false);
  }

  helpScreen(inGame) {
    const s = this.screen('How to Play');
    const cards = [
      ['Move', 'Click a glowing room, press arrow keys to browse, Enter to go. Linked rooms only.'],
      ['Tasks', 'Stand in a room with an unfinished task and choose its action. Finish every task to win as crew.'],
      ['Incidents', 'Find a silenced tinkerer? Report it (⚠) to convene the council.'],
      ['Voting', 'During a council, vote to eject a suspect or skip. Majority decides.'],
      ['Keys', 'Enter confirm · Esc pause/cancel · U undo (practice) · H hint · C camera reset'],
    ];
    for (const [t, d] of cards) {
      const c = this.el('div', 'hc-card');
      c.append(this.el('h3', '', t), this.el('p', '', d));
      s.appendChild(c);
    }
    s.appendChild(this.button('← Back', 'hc-subtle', () => { this.showScreen(null); if (!inGame) this.app.showTitle(); else this.app.showPause(); }));
    return s;
  }
}

export function roomName(id) {
  const names = {
    core: 'Pendulum Core', workshop: 'Gearwright Workshop', observatory: 'Starlens Observatory',
    foundry: 'Brass Foundry', gallery: 'Chronicle Gallery', aviary: 'Windup Aviary',
    cistern: 'Mainspring Cistern', greenhouse: 'Copper Greenhouse',
  };
  return names[id] || id;
}

function playerName(state, id) {
  const p = state.players.find((x) => x.id === id);
  return p ? p.name : id;
}

function taskLabel(state, id) {
  const t = state.tasks.find((x) => x.id === id);
  return t ? t.label : id;
}

function reasonText(r) {
  return {
    tasks_complete: 'all tasks complete', saboteurs_ejected: 'saboteurs voted out',
    parity: 'the council was overrun', time_limit: 'the clock ran out', move_limit: 'too many moves spent',
  }[r] || r || 'session ended';
}
