'use strict';
// Hidden Council — pure deterministic rules engine.
// No DOM, no THREE. Serializable state, seeded RNG via src/util.js.

import { hashStr, rand01 } from './util.js';

export const RULES_VERSION = 1;

// ---------------------------------------------------------------------------
// Stable stringify / hashing (replay verification)
// ---------------------------------------------------------------------------

export function stableStringify(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(stableStringify).join(',') + ']';
  const keys = Object.keys(v).sort();
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(v[k])).join(',') + '}';
}

export function stateHash(state) {
  // Exclude volatile/non-semantic fields from the hash input.
  const copy = Object.assign({}, state);
  return hashStr(stableStringify(copy)) >>> 0;
}

// ---------------------------------------------------------------------------
// Station layout (shared by all content; rooms are part of the ruleset)
// ---------------------------------------------------------------------------

export const STATION_ROOMS = [
  { id: 'core', name: 'Pendulum Core', links: ['workshop', 'observatory'] },
  { id: 'workshop', name: 'Gearwright Workshop', links: ['core', 'foundry', 'gallery'] },
  { id: 'observatory', name: 'Starlens Observatory', links: ['core', 'aviary'] },
  { id: 'foundry', name: 'Brass Foundry', links: ['workshop', 'cistern'] },
  { id: 'gallery', name: 'Chronicle Gallery', links: ['workshop', 'greenhouse'] },
  { id: 'aviary', name: 'Windup Aviary', links: ['observatory', 'greenhouse'] },
  { id: 'cistern', name: 'Mainspring Cistern', links: ['foundry', 'greenhouse'] },
  { id: 'greenhouse', name: 'Copper Greenhouse', links: ['gallery', 'aviary', 'cistern'] },
];

function roomIndex(id) {
  for (let i = 0; i < STATION_ROOMS.length; i++) if (STATION_ROOMS[i].id === id) return i;
  return -1;
}

export function roomsLinked(a, b) {
  const r = STATION_ROOMS[roomIndex(a)];
  return !!r && r.links.indexOf(b) >= 0;
}

// Deterministic BFS path; ties broken by room order in STATION_ROOMS.
export function shortestPath(from, to) {
  if (from === to) return [from];
  const prev = {};
  const queue = [from];
  prev[from] = null;
  while (queue.length) {
    const cur = queue.shift();
    const room = STATION_ROOMS[roomIndex(cur)];
    for (const next of room.links) {
      if (!(next in prev)) {
        prev[next] = cur;
        if (next === to) {
          const path = [to];
          let p = cur;
          while (p) { path.unshift(p); p = prev[p]; }
          return path;
        }
        queue.push(next);
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const PLAYER_NAMES = ['Alder', 'Blythe', 'Corin', 'Dessa', 'Emmet', 'Farra', 'Gosse', 'Hilde', 'Ivo', 'Juniper', 'Kett', 'Lumen'];

const TASK_LABELS = [
  'Wind the mainspring', 'Polish the starlens', 'Balance the escapement', 'Refill the oil globes',
  'Sort chronicle plates', 'Tune the whistle pipes', 'Feed the windup finches', 'Bleed the steam valves',
  'Align the pendulum', 'Patch the bellows', 'Chart the brass tides', 'Rewind the dumbwaiter',
];

export function createInitialState(config) {
  const seed = (config.seed >>> 0) || 1;
  const playerCount = config.playerCount != null ? config.playerCount : 6;
  // 0 saboteurs is a legitimate configuration (tutorials); only fill in when unset.
  const saboteurCount = config.saboteurCount != null ? config.saboteurCount : 1;
  const taskCount = config.taskCount != null ? config.taskCount : 8;
  const meetingsPerPlayer = config.meetingsPerPlayer != null ? config.meetingsPerPlayer : 1;

  // Deterministic role assignment from seed.
  const order = [];
  for (let i = 0; i < playerCount; i++) order.push(i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand01(seed, 1000 + i) * (i + 1));
    const t = order[i]; order[i] = order[j]; order[j] = t;
  }
  const saboteurs = {};
  for (let i = 0; i < saboteurCount; i++) saboteurs[order[i]] = true;

  const players = [];
  for (let i = 0; i < playerCount; i++) {
    players.push({
      id: 'p' + i,
      name: config.names && config.names[i] ? config.names[i] : PLAYER_NAMES[i],
      role: saboteurs[i] ? 'saboteur' : 'crew',
      ai: i !== 0,
      alive: true,
      room: STATION_ROOMS[i % STATION_ROOMS.length].id,
    });
  }

  // Tasks: deterministic rooms + labels from seed.
  const tasks = [];
  for (let i = 0; i < taskCount; i++) {
    const ri = Math.floor(rand01(seed, 2000 + i) * STATION_ROOMS.length);
    const li = Math.floor(rand01(seed, 3000 + i) * TASK_LABELS.length);
    tasks.push({ id: 't' + i, room: STATION_ROOMS[ri].id, label: TASK_LABELS[(li + i) % TASK_LABELS.length], done: false, doneBy: null });
  }

  // Every player starts with the same allowance of emergency chimes.
  const meetingsLeft = {};
  for (const p of players) meetingsLeft[p.id] = meetingsPerPlayer;

  return {
    v: RULES_VERSION,
    seed,
    sessionId: config.sessionId || ('s' + seed.toString(36)),
    tick: 0,
    elapsedTicks: 0,
    phase: 'play', // play | meeting | over
    players,
    tasks,
    bodies: [], // {id, player, room, reported}
    meeting: null, // {reason, by, votes:{voter:choice}}
    meetingsLeft, // playerId -> remaining emergency meetings
    cooldowns: {}, // saboteurId -> tick when eliminate is ready
    elimCooldown: config.elimCooldown != null ? config.elimCooldown : 8,
    goals: {
      timeLimit: config.timeLimit || null,
      moveLimit: config.moveLimit || null,
      par: config.par || Math.max(30, taskCount * 6 + playerCount * 4),
    },
    moveCounts: {},
    invalidTotal: 0,
    invalidBy: {},
    stats: { tasksBy: {}, correctVotes: {}, eliminations: {} },
    winner: null,
    winReason: null,
    seen: [],
    log: [],
    startedAt: config.startedAt || 0,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getPlayer(state, id) {
  for (const p of state.players) if (p.id === id) return p;
  return null;
}

export function alivePlayers(state) { return state.players.filter((p) => p.alive); }
export function aliveCrew(state) { return state.players.filter((p) => p.alive && p.role === 'crew'); }
export function aliveSaboteurs(state) { return state.players.filter((p) => p.alive && p.role === 'saboteur'); }
export function tasksRemaining(state) { return state.tasks.filter((t) => !t.done).length; }

function bumpInvalid(state, playerId) {
  state.invalidTotal += 1;
  state.invalidBy[playerId] = (state.invalidBy[playerId] || 0) + 1;
}

function logEvent(state, kind, text) {
  state.log.push({ tick: state.tick, kind, text });
}

// ---------------------------------------------------------------------------
// Legal actions
// ---------------------------------------------------------------------------

// Returns array of action descriptors:
// {type:'move', room} | {type:'task', task} | {type:'eliminate', target} |
// {type:'report', body} | {type:'call'} | {type:'vote', choice} | {type:'wait'}
export function legalActions(state, actorId) {
  if (state.phase === 'over') return [];
  const p = getPlayer(state, actorId);
  if (!p || !p.alive) return [];
  const out = [];

  if (state.phase === 'meeting') {
    if (state.meeting && !(actorId in state.meeting.votes)) {
      for (const q of alivePlayers(state)) out.push({ type: 'vote', choice: q.id });
      out.push({ type: 'vote', choice: 'skip' });
    }
    return out;
  }

  // phase === 'play'
  const room = STATION_ROOMS[roomIndex(p.room)];
  for (const link of room.links) out.push({ type: 'move', room: link });

  if (p.role === 'crew') {
    for (const t of state.tasks) {
      if (!t.done && t.room === p.room) out.push({ type: 'task', task: t.id });
    }
  } else {
    const ready = (state.cooldowns[p.id] || 0) <= state.tick;
    if (ready) {
      const others = alivePlayers(state).filter((q) => q.id !== p.id && q.room === p.room);
      const witnesses = others.filter((q) => q.role !== 'saboteur');
      for (const q of others) {
        // May only eliminate when no living crew witness besides the target.
        if (q.role === 'crew' && witnesses.length === 1) out.push({ type: 'eliminate', target: q.id });
      }
    }
  }

  for (const b of state.bodies) {
    if (!b.reported && b.room === p.room) { out.push({ type: 'report', body: b.id }); break; }
  }

  if ((state.meetingsLeft[p.id] || 0) > 0) out.push({ type: 'call' });

  out.push({ type: 'wait' });
  return out;
}

export function isLegal(state, actorId, cmd) {
  const acts = legalActions(state, actorId);
  for (const a of acts) {
    if (a.type !== cmd.type) continue;
    if (a.type === 'move' && a.room === cmd.room) return true;
    if (a.type === 'task' && a.task === cmd.task) return true;
    if (a.type === 'eliminate' && a.target === cmd.target) return true;
    if (a.type === 'report' && a.body === cmd.body) return true;
    if (a.type === 'vote' && a.choice === cmd.choice) return true;
    if (a.type === 'call' || a.type === 'wait') return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Terminal checks
// ---------------------------------------------------------------------------

function checkTerminal(state) {
  if (state.phase === 'over') return;
  const sab = aliveSaboteurs(state).length;
  const crew = aliveCrew(state).length;

  if (state.goals.timeLimit != null && state.elapsedTicks > state.goals.timeLimit) {
    state.phase = 'over'; state.winner = 'saboteurs'; state.winReason = 'time_limit';
    logEvent(state, 'end', 'The station clock ran out. The saboteurs prevail.');
    return;
  }
  if (state.goals.moveLimit != null) {
    let total = 0;
    for (const k of Object.keys(state.moveCounts)) total += state.moveCounts[k];
    if (total > state.goals.moveLimit) {
      state.phase = 'over'; state.winner = 'saboteurs'; state.winReason = 'move_limit';
      logEvent(state, 'end', 'Too many wasted motions. The saboteurs prevail.');
      return;
    }
  }
  if (tasksRemaining(state) === 0) {
    state.phase = 'over'; state.winner = 'crew'; state.winReason = 'tasks_complete';
    logEvent(state, 'end', 'Every task is complete. The crew restores the station.');
    return;
  }
  // A session configured without saboteurs (tutorials) is won by finishing
  // tasks, not by starting with nobody to eject.
  const hadSaboteurs = state.players.some((p) => p.role === 'saboteur');
  if (hadSaboteurs && sab === 0) {
    state.phase = 'over'; state.winner = 'crew'; state.winReason = 'saboteurs_ejected';
    logEvent(state, 'end', 'All saboteurs have been voted out. The crew prevails.');
    return;
  }
  if (sab >= crew) {
    state.phase = 'over'; state.winner = 'saboteurs'; state.winReason = 'parity';
    logEvent(state, 'end', 'The saboteurs hold the council. The station falls silent.');
  }
}

// ---------------------------------------------------------------------------
// Command application
// ---------------------------------------------------------------------------

// cmd: {id, type, player, ...}. Returns {ok:true, state} or {ok:false, reason}.
// Never throws on malformed input.
export function applyCommand(prevState, cmd) {
  const state = JSON.parse(JSON.stringify(prevState));
  try {
    if (!cmd || typeof cmd !== 'object') return { ok: false, reason: 'malformed_command' };
    if (typeof cmd.id !== 'string' || cmd.id.length === 0 || cmd.id.length > 64) return { ok: false, reason: 'bad_command_id' };
    if (typeof cmd.type !== 'string') return { ok: false, reason: 'missing_type' };
    if (typeof cmd.player !== 'string') return { ok: false, reason: 'missing_player' };

    if (state.seen.indexOf(cmd.id) >= 0) return { ok: false, reason: 'duplicate_command' };

    const p = getPlayer(state, cmd.player);
    if (!p) return { ok: false, reason: 'unknown_player' };

    if (state.phase === 'over') return { ok: false, reason: 'game_over' };
    if (!p.alive) return { ok: false, reason: 'player_dead' };

    // Every non-duplicate command consumes a tick, valid or not.
    state.tick += 1;
    state.seen.push(cmd.id);
    if (state.phase === 'play') state.elapsedTicks += 1;

    const fail = (reason) => { bumpInvalid(state, cmd.player); return { ok: false, reason, state }; };

    if (state.phase === 'meeting') {
      if (cmd.type !== 'vote') return fail('phase_locked');
      if (!state.meeting) return fail('no_meeting');
      if (cmd.player in state.meeting.votes) return fail('already_voted');
      const choice = cmd.choice;
      if (choice !== 'skip' && !(getPlayer(state, choice) && getPlayer(state, choice).alive)) return fail('bad_vote_target');
      state.meeting.votes[cmd.player] = choice;
      logEvent(state, 'vote', p.name + ' voted.');
      if (Object.keys(state.meeting.votes).length >= alivePlayers(state).length) resolveMeeting(state);
      checkTerminal(state);
      return { ok: true, state };
    }

    // phase === 'play'
    switch (cmd.type) {
      case 'move': {
        if (typeof cmd.room !== 'string' || roomIndex(cmd.room) < 0) return fail('bad_room');
        if (!roomsLinked(p.room, cmd.room)) return fail('not_linked');
        state.moveCounts[p.id] = (state.moveCounts[p.id] || 0) + 1;
        p.room = cmd.room;
        logEvent(state, 'move', p.name + ' moved to ' + STATION_ROOMS[roomIndex(cmd.room)].name + '.');
        break;
      }
      case 'task': {
        if (p.role !== 'crew') return fail('not_crew');
        const t = state.tasks.filter((x) => x.id === cmd.task)[0];
        if (!t) return fail('bad_task');
        if (t.done) return fail('task_done');
        if (t.room !== p.room) return fail('wrong_room');
        t.done = true;
        t.doneBy = p.id;
        state.stats.tasksBy[p.id] = (state.stats.tasksBy[p.id] || 0) + 1;
        logEvent(state, 'task', p.name + ' completed: ' + t.label + '.');
        break;
      }
      case 'eliminate': {
        if (p.role !== 'saboteur') return fail('not_saboteur');
        if ((state.cooldowns[p.id] || 0) > state.tick) return fail('cooldown');
        const q = getPlayer(state, cmd.target);
        if (!q || !q.alive) return fail('bad_target');
        if (q.room !== p.room) return fail('wrong_room');
        if (q.role !== 'crew') return fail('bad_target');
        const crewHere = alivePlayers(state).filter((x) => x.room === p.room && x.role === 'crew');
        if (crewHere.length !== 1) return fail('witnessed');
        q.alive = false;
        state.bodies.push({ id: 'b' + state.bodies.length, player: q.id, room: q.room, reported: false });
        state.cooldowns[p.id] = state.tick + state.elimCooldown;
        state.stats.eliminations[p.id] = (state.stats.eliminations[p.id] || 0) + 1;
        // The log is public: it must not name the saboteur.
        logEvent(state, 'eliminate', 'Something went quiet in the ' + STATION_ROOMS[roomIndex(q.room)].name + '.');
        break;
      }
      case 'report': {
        const b = state.bodies.filter((x) => x.id === cmd.body)[0];
        if (!b) return fail('bad_body');
        if (b.reported) return fail('already_reported');
        if (b.room !== p.room) return fail('wrong_room');
        b.reported = true;
        // Public suspicion: everyone else standing in the room of the incident.
        state.suspicion = state.suspicion || {};
        for (const q of alivePlayers(state)) {
          if (q.id !== p.id && q.room === b.room) state.suspicion[q.id] = (state.suspicion[q.id] || 0) + 1;
        }
        startMeeting(state, 'report', p.id);
        break;
      }
      case 'call': {
        if ((state.meetingsLeft[p.id] || 0) <= 0) return fail('no_meetings_left');
        state.meetingsLeft[p.id] -= 1;
        startMeeting(state, 'emergency', p.id);
        break;
      }
      case 'wait': {
        logEvent(state, 'wait', p.name + ' waited.');
        break;
      }
      default:
        return fail('unknown_type');
    }

    checkTerminal(state);
    return { ok: true, state };
  } catch (e) {
    return { ok: false, reason: 'internal_error' };
  }
}

function startMeeting(state, reason, by) {
  state.phase = 'meeting';
  state.meeting = { reason, by, votes: {} };
  const bp = getPlayer(state, by);
  logEvent(state, 'meeting', (reason === 'report' ? 'An incident was reported by ' : 'An emergency chime was rung by ') + (bp ? bp.name : by) + '.');
}

function resolveMeeting(state) {
  const tally = {};
  for (const voter of Object.keys(state.meeting.votes)) {
    const c = state.meeting.votes[voter];
    tally[c] = (tally[c] || 0) + 1;
  }
  let best = null, bestN = 0, tie = false;
  for (const c of Object.keys(tally).sort()) {
    if (tally[c] > bestN) { best = c; bestN = tally[c]; tie = false; }
    else if (tally[c] === bestN) tie = true;
  }
  const total = Object.keys(state.meeting.votes).length;
  let ejected = null;
  if (best && best !== 'skip' && !tie && bestN > total / 2) {
    const q = getPlayer(state, best);
    if (q && q.alive) {
      q.alive = false;
      ejected = q;
      state.bodies.push({ id: 'b' + state.bodies.length, player: q.id, room: q.room, reported: true });
      // Record correct votes (crew who voted for an ejected saboteur).
      for (const voter of Object.keys(state.meeting.votes)) {
        const vp = getPlayer(state, voter);
        if (vp && vp.role === 'crew' && state.meeting.votes[voter] === q.id && q.role === 'saboteur') {
          state.stats.correctVotes[voter] = (state.stats.correctVotes[voter] || 0) + 1;
        }
      }
      logEvent(state, 'eject', q.name + ' was ejected from the station. ' + (q.role === 'saboteur' ? 'A saboteur is unmasked.' : 'They were loyal crew.'));
    }
  } else {
    logEvent(state, 'eject', 'No one was ejected.');
  }
  state.phase = 'play';
  state.meeting = null;
}

// ---------------------------------------------------------------------------
// Deterministic AI
// ---------------------------------------------------------------------------

function aiRand(state, playerId, salt) {
  return rand01(state.seed ^ hashStr(playerId), (state.tick + 1) * 131 + salt * 17);
}

// Returns one legal command for the AI actor, deterministic from state.
export function aiCommand(state, playerId, cmdId) {
  const acts = legalActions(state, playerId);
  if (!acts.length) return null;
  const p = getPlayer(state, playerId);

  if (state.phase === 'meeting') {
    const votes = acts.filter((a) => a.type === 'vote' && a.choice !== 'skip');
    const r = aiRand(state, playerId, 7);
    let choice = 'skip';
    if (p.role === 'saboteur') {
      const crew = votes.filter((a) => getPlayer(state, a.choice).role === 'crew');
      if (crew.length) choice = crew[Math.floor(r * crew.length)].choice;
    } else {
      // Crew votes on public suspicion (who was at the incident), else usually skips.
      const sus = state.suspicion || {};
      let bestChoice = null, bestN = 0;
      for (const a of votes) {
        const n = sus[a.choice] || 0;
        if (n > bestN) { bestN = n; bestChoice = a.choice; }
      }
      if (bestChoice && r > 0.25) choice = bestChoice;
      else if (votes.length && r > 0.9) choice = votes[Math.floor(r * 1000) % votes.length].choice;
    }
    return { id: cmdId, type: 'vote', player: playerId, choice };
  }

  // Report a body in the current room.
  const rep = acts.filter((a) => a.type === 'report')[0];
  if (rep) return { id: cmdId, type: 'report', player: playerId, body: rep.body };

  if (p.role === 'saboteur') {
    const elim = acts.filter((a) => a.type === 'eliminate');
    if (elim.length && aiRand(state, playerId, 3) > 0.55) {
      return { id: cmdId, type: 'eliminate', player: playerId, target: elim[0].target };
    }
  } else {
    const task = acts.filter((a) => a.type === 'task')[0];
    if (task) return { id: cmdId, type: 'task', player: playerId, task: task.task };
  }

  // Move toward nearest undone task (crew) or wander toward players (saboteur).
  const moves = acts.filter((a) => a.type === 'move');
  if (!moves.length) return { id: cmdId, type: 'wait', player: playerId };
  let targetRoom = null;
  if (p.role === 'crew') {
    let bestPath = null;
    for (const t of state.tasks) {
      if (t.done) continue;
      const path = shortestPath(p.room, t.room);
      if (path && (!bestPath || path.length < bestPath.length)) bestPath = path;
    }
    if (bestPath && bestPath.length > 1) targetRoom = bestPath[1];
  } else {
    let bestPath = null;
    for (const q of aliveCrew(state)) {
      const path = shortestPath(p.room, q.room);
      if (path && (!bestPath || path.length < bestPath.length)) bestPath = path;
    }
    if (bestPath && bestPath.length > 1 && aiRand(state, playerId, 5) > 0.2) targetRoom = bestPath[1];
  }
  if (!targetRoom || !moves.some((m) => m.room === targetRoom)) {
    targetRoom = moves[Math.floor(aiRand(state, playerId, 11) * moves.length)].room;
  }
  return { id: cmdId, type: 'move', player: playerId, room: targetRoom };
}

// Run a full headless game: human seat is also driven by AI. Returns final state.
export function simulate(config, maxCommands) {
  let state = createInitialState(config);
  const limit = maxCommands || 2000;
  let n = 0;
  while (state.phase !== 'over' && n < limit) {
    if (state.phase === 'meeting') {
      for (const pl of alivePlayers(state)) {
        if (state.phase !== 'meeting') break;
        if (!(pl.id in state.meeting.votes)) {
          const cmd = aiCommand(state, pl.id, 'sim' + n++);
          const res = applyCommand(state, cmd);
          // Hard rejections (duplicate id, game over) carry no state.
          state = res.state || state;
        }
      }
    } else {
      // Round-robin over alive players.
      const roster = alivePlayers(state);
      const pl = roster[n % roster.length];
      const cmd = aiCommand(state, pl.id, 'sim' + n++);
      const res = applyCommand(state, cmd);
      state = res.state || state;
      n++;
    }
  }
  return state;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

// Did this player's side win? The human seat can be dealt either role, so
// victory must be read against that player's allegiance, not against 'crew'.
export function playerWon(state, playerId) {
  const p = getPlayer(state, playerId);
  if (!p || !state.winner) return false;
  return state.winner === (p.role === 'saboteur' ? 'saboteurs' : 'crew');
}

export function scoreBreakdown(state, playerId) {
  const p = getPlayer(state, playerId);
  const tasks = (state.stats.tasksBy[playerId] || 0) * 10;
  const votes = (state.stats.correctVotes[playerId] || 0) * 25;
  const eliminations = (state.stats.eliminations[playerId] || 0) * 30;
  const survival = p && p.alive && state.winner ? 50 : 0;
  const par = state.goals.par || 60;
  const time = Math.max(0, (par * 2 - state.elapsedTicks)) | 0;
  const winBonus = state.winner && p && ((state.winner === 'crew' && p.role === 'crew') || (state.winner === 'saboteurs' && p.role === 'saboteur')) ? 100 : 0;
  const parts = { tasks, votes, eliminations, survival, time, winBonus };
  let total = 0;
  for (const k of Object.keys(parts)) total += parts[k];
  return { total: total | 0, parts };
}

// Tie-break ordering: objective completion, fewer invalid actions,
// lower elapsed time, then stable session id. Returns negative if a<b.
export function compareResults(a, b) {
  const objA = a.objective ? 1 : 0, objB = b.objective ? 1 : 0;
  if (objA !== objB) return objB - objA;
  if (a.invalidTotal !== b.invalidTotal) return a.invalidTotal - b.invalidTotal;
  if (a.elapsedTicks !== b.elapsedTicks) return a.elapsedTicks - b.elapsedTicks;
  return a.sessionId < b.sessionId ? -1 : (a.sessionId > b.sessionId ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Serialization / migration / replay
// ---------------------------------------------------------------------------

export function serialize(state) {
  return JSON.stringify(state);
}

export function deserialize(json) {
  const s = JSON.parse(json);
  if (typeof s.v !== 'number') throw new Error('bad save version');
  let v = s.v;
  while (v < RULES_VERSION) {
    // v0 -> v1 migration: fill fields introduced in v1.
    if (v === 0) {
      s.meetingsLeft = s.meetingsLeft || {};
      s.moveCounts = s.moveCounts || {};
      s.invalidBy = s.invalidBy || {};
      v = 1;
    }
  }
  s.v = RULES_VERSION;
  return s;
}

// Replay a command list from a config; returns {state, hashes, ok, failures}.
export function replay(config, commands) {
  let state = createInitialState(config);
  const hashes = [stateHash(state)];
  const failures = [];
  let ok = true;
  for (const cmd of commands) {
    const res = applyCommand(state, cmd);
    if (!res.ok) { ok = false; failures.push({ id: cmd && cmd.id, reason: res.reason }); }
    state = res.state || state;
    hashes.push(stateHash(state));
  }
  return { state, hashes, ok, failures };
}
