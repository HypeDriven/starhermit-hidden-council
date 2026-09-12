'use strict';
// Session module: solo/hosted game driver, persistence, achievements,
// server-time sync. No DOM/THREE knowledge beyond callbacks.

import { createInitialState, applyCommand, legalActions, aiCommand, scoreBreakdown, playerWon, stateHash, serialize, deserialize, RULES_VERSION } from './rules.js';
import { CONTENT_VERSION } from './content.js';
import { hashStr } from './util.js';

// ---------------------------------------------------------------------------
// Persistence: versioned + checksummed save document
// ---------------------------------------------------------------------------

const SAVE_KEY = 'hidden-council-save';
const SETTINGS_KEY = 'hidden-council-settings';

export const ACHIEVEMENTS = [
  { key: 'first_completion', name: 'First Winding', desc: 'Finish your first session.' },
  { key: 'mechanic_mastery', name: 'Full Council', desc: 'Use every action type across your games.' },
  { key: 'streak_three', name: 'Steady Hands', desc: 'Win three sessions in a row.' },
  { key: 'hard_milestone', name: 'Grand Chime', desc: 'Complete a difficulty-5 journey stage.' },
  { key: 'long_haul', name: 'Keeper of Hours', desc: 'Complete 25 sessions over your career.' },
];

function checksum(obj) {
  return hashStr(JSON.stringify(obj));
}

/** The versioned+checksummed envelope the local cache and the cloud slot share. */
export function saveChecksum(data) {
  return checksum(data);
}

export function wrapSave(data) {
  return { v: 1, data, sum: checksum(data) };
}

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    const doc = JSON.parse(raw);
    if (doc.v !== 1 || checksum(doc.data) !== doc.sum) return defaultSave();
    return doc.data;
  } catch (e) { return defaultSave(); }
}

function defaultSave() {
  return {
    profile: { name: 'Guest ' + Math.floor(Math.random() * 900 + 100) },
    journey: {}, // stageId -> {score, won}
    sessions: 0,
    wins: 0,
    streak: 0,
    bestStreak: 0,
    actionsUsed: [],
    achievements: {},
    tutorialDone: {},
  };
}

export function storeSave(data) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(wrapSave(data))); } catch (e) { /* full/blocked */ }
}

// Merge two snapshots: keep the one with strictly more progress; otherwise
// preserve both fields per-key (conflict-safe union for maps, max for scalars).
export function mergeSaves(a, b) {
  const out = defaultSave();
  out.profile = a.profile && a.profile.name ? a.profile : b.profile;
  out.journey = Object.assign({}, b.journey, a.journey);
  for (const k of Object.keys(b.journey)) {
    if (a.journey[k] && b.journey[k]) out.journey[k] = a.journey[k].score >= b.journey[k].score ? a.journey[k] : b.journey[k];
  }
  out.sessions = Math.max(a.sessions || 0, b.sessions || 0);
  out.wins = Math.max(a.wins || 0, b.wins || 0);
  out.streak = Math.max(a.streak || 0, b.streak || 0);
  out.bestStreak = Math.max(a.bestStreak || 0, b.bestStreak || 0);
  out.actionsUsed = Array.from(new Set([].concat(a.actionsUsed || [], b.actionsUsed || [])));
  out.achievements = Object.assign({}, b.achievements, a.achievements);
  out.tutorialDone = Object.assign({}, b.tutorialDone, a.tutorialDone);
  return out;
}

export function loadSettings() {
  const def = {
    music: 0.6, effects: 0.8, ambience: 0.5, voice: 0.7,
    tier: 'auto', theme: 'brass-dawn',
    largeText: false, highContrast: false, cvdPalette: false, reducedMotion: false,
    leftHanded: false, holdToConfirm: false, hints: true, camera: 'default',
  };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return def;
    return Object.assign(def, JSON.parse(raw));
  } catch (e) { return def; }
}

export function storeSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (e) {}
}

// Idempotent achievement unlock; returns list of newly unlocked keys.
export function unlockAchievements(save, keys) {
  const fresh = [];
  for (const k of keys) {
    if (!save.achievements[k]) {
      save.achievements[k] = Date.now();
      fresh.push(k);
    }
  }
  return fresh;
}

// ---------------------------------------------------------------------------
// Server time sync
// ---------------------------------------------------------------------------

export async function syncServerTime(token) {
  try {
    const t0 = Date.now();
    const headers = token ? { authorization: `Bearer ${token}` } : {};
    const res = await fetch('/api/v1/time', { headers, cache: 'no-store' });
    if (!res.ok) throw new Error(String(res.status));
    const body = await res.json();
    const t1 = Date.now();
    const serverNow = typeof body.now === 'number' ? body.now : body.serverTime;
    if (typeof serverNow === 'number') {
      return { offset: serverNow - Math.round((t0 + t1) / 2), rtt: t1 - t0, ok: true };
    }
  } catch (e) { /* offline: local clock */ }
  return { offset: 0, rtt: 0, ok: false };
}

// ---------------------------------------------------------------------------
// Solo session driver
// ---------------------------------------------------------------------------

export class SoloSession {
  // hooks: {onState(state, events), onReject(cmd, reason), onEnd(result), aiDelayMs}
  constructor(stage, hooks) {
    this.stage = stage;
    this.hooks = hooks;
    this.humanId = 'p0';
    this.cmdCounter = 0;
    this.undoStack = [];
    this.state = createInitialState(Object.assign({}, stage.config, { sessionId: stage.id + '-' + stage.seed.toString(36) }));
    this.initialConfig = Object.assign({}, stage.config, { sessionId: this.state.sessionId });
    this.commands = [];
    this.paused = false;
    this.over = false;
    this.aiTimer = null;
    this.practice = !!stage.practice;
  }

  legal() { return legalActions(this.state, this.humanId); }

  makeCmd(fields) {
    return Object.assign({ id: 'c' + this.state.tick + '-' + this.cmdCounter++, player: this.humanId }, fields);
  }

  act(fields) {
    if (this.over || this.paused) return { ok: false, reason: 'not_active' };
    const cmd = this.makeCmd(fields);
    return this.commit(cmd);
  }

  commit(cmd) {
    const res = applyCommand(this.state, cmd);
    if (!res.ok) {
      this.hooks.onReject && this.hooks.onReject(cmd, res.reason);
      this.state = res.state || this.state;
      return { ok: false, reason: res.reason };
    }
    this.undoStack.push({ state: this.state, commands: this.commands.slice() });
    if (this.undoStack.length > 40) this.undoStack.shift();
    this.commands.push(cmd);
    this.state = res.state;
    this.hooks.onState && this.hooks.onState(this.state, this.newEvents());
    if (this.state.phase === 'over') this.finish();
    else this.scheduleAi();
    return { ok: true };
  }

  newEvents() {
    return this.state.log.slice(-4);
  }

  undo() {
    if (!this.practice) return { ok: false, reason: 'undo_not_allowed' };
    const prev = this.undoStack.pop();
    if (!prev) return { ok: false, reason: 'nothing_to_undo' };
    this.stopAi();
    this.state = prev.state;
    this.commands = prev.commands;
    this.over = this.state.phase === 'over';
    this.hooks.onState && this.hooks.onState(this.state, [{ kind: 'undo', text: 'Undone.' }]);
    return { ok: true };
  }

  scheduleAi() {
    if (this.over || this.paused) return;
    this.stopAi();
    const delay = this.hooks.aiDelayMs != null ? this.hooks.aiDelayMs : 500;
    this.aiTimer = setTimeout(() => this.stepAi(), delay);
  }

  // One AI step. With instant=true, loops until the human can act again
  // (used by skip/fast-forward — settles to the exact deterministic end state).
  stepAi(instant) {
    if (this.over || this.paused) return;
    let guard = 0;
    do {
      const st = this.state;
      if (st.phase === 'over') break;
      let actor = null;
      if (st.phase === 'meeting') {
        for (const p of st.players) {
          if (p.ai && p.alive && !(p.id in st.meeting.votes)) { actor = p; break; }
        }
        if (!actor) break; // waiting on the human's vote
      } else {
        const alive = st.players.filter((p) => p.ai && p.alive);
        if (alive.length) actor = alive[st.tick % alive.length];
      }
      if (!actor) break;
      const cmd = aiCommand(st, actor.id, 'ai-' + st.tick + '-' + actor.id + '-' + this.cmdCounter++);
      if (!cmd) break;
      const res = applyCommand(st, cmd);
      if (!res.state) { if (++guard > 50) break; continue; } // rejected before any effect
      this.state = res.state;
      this.commands.push(cmd);
      if (!res.ok) { if (++guard > 50) break; continue; }
    } while (instant && ++guard < 2000);
    this.hooks.onState && this.hooks.onState(this.state, this.newEvents());
    if (this.state.phase === 'over') { this.finish(); return; }
    if (!instant) this.scheduleAi();
  }

  // Fast-forward: settle all pending AI motion to the deterministic end state.
  skipToEnd() {
    this.stopAi();
    let guard = 0;
    while (this.state.phase !== 'over' && guard++ < 4000) {
      const st = this.state;
      let actor = null;
      if (st.phase === 'meeting') {
        for (const p of st.players) if (p.alive && !(p.id in st.meeting.votes)) { actor = p; break; }
      } else {
        const alive = st.players.filter((p) => p.alive);
        actor = alive[guard % alive.length];
      }
      if (!actor) break;
      const cmd = aiCommand(st, actor.id, 'ff-' + guard + '-' + actor.id);
      if (!cmd) break;
      const res = applyCommand(st, cmd);
      if (!res.state) continue; // rejected before any effect; state unchanged
      this.state = res.state;
      this.commands.push(cmd);
    }
    this.hooks.onState && this.hooks.onState(this.state, this.newEvents());
    if (this.state.phase === 'over') this.finish();
  }

  pause() { this.paused = true; this.stopAi(); }
  resume() { this.paused = false; if (!this.over) this.scheduleAi(); }
  stopAi() { if (this.aiTimer) { clearTimeout(this.aiTimer); this.aiTimer = null; } }

  result() {
    const score = scoreBreakdown(this.state, this.humanId);
    const me = this.state.players.find((p) => p.id === this.humanId);
    return {
      winner: this.state.winner,
      winReason: this.state.winReason,
      playerRole: me ? me.role : 'crew',
      playerWon: playerWon(this.state, this.humanId),
      score,
      hash: stateHash(this.state),
      ticks: this.state.tick,
      elapsed: this.state.elapsedTicks,
      invalidTotal: this.state.invalidTotal,
      sessionId: this.state.sessionId,
      seed: this.stage.seed,
      rulesVersion: RULES_VERSION,
      contentVersion: CONTENT_VERSION,
    };
  }

  finish() {
    this.over = true;
    this.stopAi();
    this.hooks.onEnd && this.hooks.onEnd(this.result());
  }

  // Record completion into the save document; returns newly unlocked achievements.
  recordCompletion(save) {
    const res = this.result();
    save.sessions += 1;
    const humanWon = res.playerWon; // the human seat can be dealt either role
    if (humanWon) { save.wins += 1; save.streak += 1; } else { save.streak = 0; }
    save.bestStreak = Math.max(save.bestStreak, save.streak);
    for (const c of this.commands) if (c.player === this.humanId) save.actionsUsed.push(c.type);
    save.actionsUsed = Array.from(new Set(save.actionsUsed));
    if (this.stage.id && this.stage.id.startsWith('journey-')) {
      const prev = save.journey[this.stage.id];
      if (!prev || res.score.total > prev.score) save.journey[this.stage.id] = { score: res.score.total, won: humanWon };
    }
    const keys = ['first_completion'];
    if (save.actionsUsed.length >= 5) keys.push('mechanic_mastery');
    if (save.streak >= 3) keys.push('streak_three');
    if (humanWon && this.stage.difficulty >= 5) keys.push('hard_milestone');
    if (save.sessions >= 25) keys.push('long_haul');
    return unlockAchievements(save, keys);
  }

  exportReplay() {
    return {
      schema: 1, rulesVersion: RULES_VERSION, contentVersion: CONTENT_VERSION,
      seed: this.stage.seed, config: this.initialConfig,
      initialHash: stateHash(createInitialState(this.initialConfig)),
      commands: this.commands, finalHash: stateHash(this.state),
    };
  }
}
