// Rules and content: the deterministic rules engine (legal actions, resolution,
// meetings, terminal states, scoring, serialization, replay, AI legality,
// fuzzing) and the content (40 Journey stages, themes, tutorials, dailies,
// the offline validator). The browser build's tests/run.js rules section,
// unchanged in substance. Run: node --test tests/rules.test.mjs
import { test } from 'node:test';
import assert from 'node:assert';
import * as rules from '../src/rules.js';
import * as content from '../src/content.js';
import { hashStr } from '../src/util.js';

const CFG = { seed: 12345, playerCount: 6, saboteurCount: 1, taskCount: 6 };

// ---------------------------------------------------------- rules unit --

test('initial state is serializable and has players/tasks', () => {
  const s = rules.createInitialState(CFG);
  assert.strictEqual(s.players.length, 6);
  assert.strictEqual(s.tasks.length, 6);
  assert.strictEqual(s.players.filter((p) => p.role === 'saboteur').length, 1);
  JSON.parse(JSON.stringify(s));
});

test('legalActions: crew has moves, wait, no eliminate', () => {
  const s = rules.createInitialState(CFG);
  const crew = s.players.find((p) => p.role === 'crew');
  const acts = rules.legalActions(s, crew.id);
  assert(acts.some((a) => a.type === 'move'));
  assert(acts.some((a) => a.type === 'wait'));
  assert(!acts.some((a) => a.type === 'eliminate'));
});

test('move: valid linked room applies, unlinked rejected not_linked', () => {
  let s = rules.createInitialState(CFG);
  const p = s.players[0];
  const room = rules.STATION_ROOMS.find((r) => r.id === p.room);
  const okRes = rules.applyCommand(s, { id: 'a', type: 'move', player: p.id, room: room.links[0] });
  assert(okRes.ok, JSON.stringify(okRes));
  s = okRes.state;
  assert.strictEqual(s.players[0].room, room.links[0]);
  const badRoom = rules.STATION_ROOMS.find((r) => r.id !== s.players[0].room && !rules.roomsLinked(s.players[0].room, r.id));
  const bad = rules.applyCommand(s, { id: 'b', type: 'move', player: p.id, room: badRoom.id });
  assert(!bad.ok && bad.reason === 'not_linked');
});

test('move: bogus room rejected bad_room', () => {
  const s = rules.createInitialState(CFG);
  const r = rules.applyCommand(s, { id: 'x', type: 'move', player: 'p1', room: 'nowhere' });
  assert(!r.ok && r.reason === 'bad_room');
});

test('task: completes in-room task; wrong_room and task_done rejected', () => {
  let s = rules.createInitialState(CFG);
  const crew = s.players.find((p) => p.role === 'crew');
  const t = s.tasks[0];
  crew.room = t.room; // stage the situation directly
  const r1 = rules.applyCommand(s, { id: 't1', type: 'task', player: crew.id, task: t.id });
  assert(r1.ok);
  s = r1.state;
  assert(s.tasks[0].done);
  const r2 = rules.applyCommand(s, { id: 't2', type: 'task', player: crew.id, task: t.id });
  assert(!r2.ok && r2.reason === 'task_done');
  const t2 = s.tasks.find((x) => !x.done && x.room !== s.players.find((p) => p.id === crew.id).room);
  if (t2) {
    const r3 = rules.applyCommand(s, { id: 't3', type: 'task', player: crew.id, task: t2.id });
    assert(!r3.ok && r3.reason === 'wrong_room');
  }
});

test('task: saboteur rejected not_crew', () => {
  const s = rules.createInitialState(CFG);
  const sab = s.players.find((p) => p.role === 'saboteur');
  const r = rules.applyCommand(s, { id: 'q', type: 'task', player: sab.id, task: s.tasks[0].id });
  assert(!r.ok && r.reason === 'not_crew');
});

test('eliminate: requires saboteur, same room, no witness; cooldown enforced', () => {
  let s = rules.createInitialState(CFG);
  const sab = s.players.find((p) => p.role === 'saboteur');
  const crew = s.players.find((p) => p.role === 'crew');
  // Isolate: move everyone else away.
  for (const p of s.players) if (p !== sab && p !== crew) p.room = 'foundry';
  sab.room = 'core'; crew.room = 'core';
  const crewAsSab = rules.applyCommand(s, { id: 'e0', type: 'eliminate', player: crew.id, target: sab.id });
  assert(!crewAsSab.ok && crewAsSab.reason === 'not_saboteur');
  const r = rules.applyCommand(s, { id: 'e1', type: 'eliminate', player: sab.id, target: crew.id });
  assert(r.ok, JSON.stringify(r));
  s = r.state;
  assert(!s.players.find((p) => p.id === crew.id).alive);
  assert.strictEqual(s.bodies.length, 1);
  // Cooldown: another isolated target immediately after must fail.
  const c2 = s.players.find((p) => p.alive && p.role === 'crew');
  c2.room = 'core';
  const r2 = rules.applyCommand(s, { id: 'e2', type: 'eliminate', player: sab.id, target: c2.id });
  assert(!r2.ok && (r2.reason === 'cooldown' || r2.reason === 'witnessed'));
});

test('report + vote flow: meeting, majority ejects saboteur, crew wins', () => {
  let s = rules.createInitialState(CFG);
  const sab = s.players.find((p) => p.role === 'saboteur');
  const crew = s.players.filter((p) => p.role === 'crew');
  // Force a body in core and a reporter there.
  s.bodies.push({ id: 'b0', player: 'ghost', room: 'core', reported: false });
  crew[0].room = 'core';
  let n = 0;
  const r = rules.applyCommand(s, { id: 'r' + n++, type: 'report', player: crew[0].id, body: 'b0' });
  assert(r.ok);
  s = r.state;
  assert.strictEqual(s.phase, 'meeting');
  // Non-vote command during meeting is rejected.
  const locked = rules.applyCommand(s, { id: 'r' + n++, type: 'move', player: crew[1].id, room: 'core' });
  assert(!locked.ok && locked.reason === 'phase_locked');
  // Majority of alive players vote the saboteur out.
  const alive = rules.alivePlayers(s);
  let votes = 0;
  for (const p of alive) {
    if (s.phase !== 'meeting') break;
    const need = Math.floor(alive.length / 2) + 1;
    const choice = votes < need ? sab.id : 'skip';
    const rv = rules.applyCommand(s, { id: 'r' + n++, type: 'vote', player: p.id, choice });
    assert(rv.ok, p.id + ' ' + JSON.stringify(rv));
    if (choice === sab.id) votes++;
    s = rv.state;
  }
  // With the only saboteur ejected the game ends immediately.
  assert.strictEqual(s.phase, 'over');
  assert(!s.players.find((p) => p.id === sab.id).alive);
  assert.strictEqual(s.winner, 'crew');
  assert.strictEqual(s.winReason, 'saboteurs_ejected');
  assert.strictEqual(s.phase, 'over');
  // Commands after the end are rejected.
  const after = rules.applyCommand(s, { id: 'r' + n++, type: 'wait', player: crew[0].id });
  assert(!after.ok && after.reason === 'game_over');
});

test('emergency chime: allowance granted, spent, then refused', () => {
  let s = rules.createInitialState(CFG);
  const p = s.players[0];
  assert(rules.legalActions(s, p.id).some((a) => a.type === 'call'), 'call must be offered while an allowance remains');
  const r = rules.applyCommand(s, { id: 'm1', type: 'call', player: p.id });
  assert(r.ok, JSON.stringify(r));
  s = r.state;
  assert.strictEqual(s.phase, 'meeting');
  assert.strictEqual(s.meetingsLeft[p.id], 0);
  // Resolve the meeting by voting to skip, then the chime is spent.
  let n = 0;
  for (const q of rules.alivePlayers(s)) {
    if (s.phase !== 'meeting') break;
    s = rules.applyCommand(s, { id: 'v' + n++, type: 'vote', player: q.id, choice: 'skip' }).state;
  }
  assert.strictEqual(s.phase, 'play');
  assert(!rules.legalActions(s, p.id).some((a) => a.type === 'call'));
  const again = rules.applyCommand(s, { id: 'm2', type: 'call', player: p.id });
  assert(!again.ok && again.reason === 'no_meetings_left');
});

test('no-saboteur config (tutorials) is honoured and does not end instantly', () => {
  let s = rules.createInitialState(Object.assign({}, CFG, { playerCount: 4, saboteurCount: 0, taskCount: 3 }));
  assert.strictEqual(s.players.filter((p) => p.role === 'saboteur').length, 0);
  const r = rules.applyCommand(s, { id: 'w0', type: 'wait', player: 'p0' });
  assert(r.ok);
  assert.strictEqual(r.state.phase, 'play');
  assert.strictEqual(r.state.winner, null);
});

test('playerWon reads the seat\'s own allegiance', () => {
  const s = rules.createInitialState(CFG);
  const sab = s.players.find((p) => p.role === 'saboteur');
  const crew = s.players.find((p) => p.role === 'crew');
  s.winner = 'saboteurs';
  assert.strictEqual(rules.playerWon(s, sab.id), true);
  assert.strictEqual(rules.playerWon(s, crew.id), false);
  s.winner = 'crew';
  assert.strictEqual(rules.playerWon(s, sab.id), false);
  assert.strictEqual(rules.playerWon(s, crew.id), true);
});

test('duplicate command id rejected idempotently', () => {
  let s = rules.createInitialState(CFG);
  const p = s.players[0];
  const room = rules.STATION_ROOMS.find((r) => r.id === p.room);
  const r1 = rules.applyCommand(s, { id: 'dup', type: 'move', player: p.id, room: room.links[0] });
  assert(r1.ok);
  const r2 = rules.applyCommand(r1.state, { id: 'dup', type: 'move', player: p.id, room: room.links[0] });
  assert(!r2.ok && r2.reason === 'duplicate_command');
});

test('terminal: tasks complete -> crew win', () => {
  let s = rules.createInitialState(CFG);
  const crew = s.players.find((p) => p.role === 'crew');
  for (const t of s.tasks.slice(0, -1)) { t.done = true; t.doneBy = crew.id; }
  const last = s.tasks[s.tasks.length - 1];
  crew.room = last.room;
  const r = rules.applyCommand(s, { id: 'z', type: 'task', player: crew.id, task: last.id });
  assert(r.ok);
  assert.strictEqual(r.state.winner, 'crew');
  assert.strictEqual(r.state.winReason, 'tasks_complete');
});

test('terminal: parity -> saboteurs win', () => {
  let s = rules.createInitialState(Object.assign({}, CFG, { saboteurCount: 2 }));
  const sabs = s.players.filter((p) => p.role === 'saboteur');
  const crews = s.players.filter((p) => p.role === 'crew');
  // 2 sab vs 2 crew remaining => eliminate one crew -> parity 2v2.
  const dead = crews.slice(2);
  for (const d of dead) { d.alive = false; }
  const sab = sabs[0];
  const victim = crews[0];
  for (const p of s.players) if (p !== sab && p !== victim && p.alive) p.room = 'foundry';
  sab.room = 'core'; victim.room = 'core';
  const r = rules.applyCommand(s, { id: 'p1', type: 'eliminate', player: sab.id, target: victim.id });
  assert(r.ok);
  assert.strictEqual(r.state.winner, 'saboteurs');
  assert.strictEqual(r.state.winReason, 'parity');
});

test('terminal: time limit -> saboteurs win', () => {
  let s = rules.createInitialState(Object.assign({}, CFG, { timeLimit: 3 }));
  const p = s.players[0];
  let n = 0;
  for (let i = 0; i < 5 && s.phase !== 'over'; i++) {
    const r = rules.applyCommand(s, { id: 'w' + n++, type: 'wait', player: p.id });
    s = r.state;
  }
  assert.strictEqual(s.winner, 'saboteurs');
  assert.strictEqual(s.winReason, 'time_limit');
});

test('scoring: components sum to total, integers', () => {
  const s = rules.createInitialState(CFG);
  const crew = s.players.find((p) => p.role === 'crew');
  s.stats.tasksBy[crew.id] = 2;
  s.stats.correctVotes[crew.id] = 1;
  const b = rules.scoreBreakdown(s, crew.id);
  assert(Number.isInteger(b.total));
  assert.strictEqual(b.parts.tasks, 20);
  assert.strictEqual(b.parts.votes, 25);
  assert.strictEqual(b.total, Object.values(b.parts).reduce((a, v) => a + v, 0));
});

test('tie-breaking order: objective, invalids, time, session id', () => {
  const base = { objective: true, invalidTotal: 0, elapsedTicks: 10, sessionId: 'a' };
  assert(rules.compareResults(base, Object.assign({}, base, { objective: false })) < 0);
  assert(rules.compareResults(base, Object.assign({}, base, { invalidTotal: 1 })) < 0);
  assert(rules.compareResults(base, Object.assign({}, base, { elapsedTicks: 11 })) < 0);
  assert(rules.compareResults(base, Object.assign({}, base, { sessionId: 'b' })) < 0);
  assert.strictEqual(rules.compareResults(base, Object.assign({}, base)), 0);
});

test('serialization round-trip + v0 migration', () => {
  const s = rules.createInitialState(CFG);
  const back = rules.deserialize(rules.serialize(s));
  assert.deepStrictEqual(back, s);
  const old = JSON.parse(rules.serialize(s));
  old.v = 0;
  delete old.meetingsLeft; delete old.moveCounts; delete old.invalidBy;
  const mig = rules.deserialize(JSON.stringify(old));
  assert.strictEqual(mig.v, rules.RULES_VERSION);
  assert(mig.meetingsLeft && mig.moveCounts && mig.invalidBy);
});

test('deterministic replay: same seed+commands -> identical hashes', () => {
  const cmds = [];
  let s = rules.createInitialState(CFG);
  for (let i = 0; i < 40; i++) {
    const p = rules.alivePlayers(s)[i % rules.alivePlayers(s).length];
    const acts = rules.legalActions(s, p.id);
    const a = acts[i % acts.length];
    cmds.push(Object.assign({ id: 'rep' + i, player: p.id }, a));
    const r = rules.applyCommand(s, cmds[cmds.length - 1]);
    s = r.state;
    if (s.phase === 'over') break;
  }
  const run1 = rules.replay(CFG, cmds);
  const run2 = rules.replay(CFG, cmds);
  assert.deepStrictEqual(run1.hashes, run2.hashes);
  assert.strictEqual(rules.stateHash(run1.state), rules.stateHash(run2.state));
});

test('full simulation terminates with a winner', () => {
  const end = rules.simulate(CFG, 3000);
  assert.strictEqual(end.phase, 'over');
  assert(end.winner === 'crew' || end.winner === 'saboteurs');
  assert(end.winReason);
  assert(Number.isFinite(end.tick));
});

test('fuzz: malformed commands never throw, never NaN', () => {
  let s = rules.createInitialState(CFG);
  const junk = [
    null, undefined, 42, 'string', [], {},
    { id: 5, type: 'move', player: 'p0' },
    { id: 'a', type: null, player: 'p0' },
    { id: 'a', type: 'move', player: 9 },
    { id: 'a', type: 'nonsense', player: 'p0' },
    { id: 'a', type: 'move', player: 'nobody' },
    { id: 'a', type: 'vote', player: 'p0', choice: 'p9' },
    { id: 'a', type: 'eliminate', player: 'p0', target: NaN },
    { id: 'a', type: 'task', player: 'p0', task: { evil: 1 } },
    { id: 'a'.repeat(200), type: 'wait', player: 'p0' },
  ];
  for (let i = 0; i < 500; i++) {
    const j = junk[i % junk.length];
    const cmd = typeof j === 'object' && j && !Array.isArray(j)
      ? Object.assign({}, j, { id: 'fz' + i })
      : j;
    const r = rules.applyCommand(s, cmd);
    assert(r && typeof r.ok === 'boolean');
    if (r.state) s = r.state;
    assert(Number.isFinite(s.tick));
    assert(!Number.isNaN(s.elapsedTicks));
  }
});

test('AI commands are always legal', () => {
  let s = rules.createInitialState(CFG);
  for (let i = 0; i < 120 && s.phase !== 'over'; i++) {
    const p = rules.alivePlayers(s)[i % rules.alivePlayers(s).length];
    const cmd = rules.aiCommand(s, p.id, 'ai' + i);
    if (!cmd) continue;
    const r = rules.applyCommand(s, cmd);
    assert(r.ok, 'AI produced illegal command: ' + JSON.stringify(cmd) + ' -> ' + r.reason);
    s = r.state;
  }
});

// ---------------------------------------------------------- content --

test('content: 40 journey stages with required fields', () => {
  assert.strictEqual(content.JOURNEY.length, 40);
  for (const st of content.JOURNEY) {
    assert(st.id && st.seed >>> 0 && st.goals && st.par > 0 && st.difficulty >= 1 && st.difficulty <= 5);
    assert(st.theme && content.THEMES.some((t) => t.id === st.theme));
  }
});

test('content: stage goal limits reach the rules config', () => {
  const limited = content.JOURNEY.filter((st) => st.goals.timeLimit != null || st.goals.moveLimit != null);
  assert(limited.length > 0, 'expected pressure stages');
  for (const st of limited) {
    assert.strictEqual(st.config.timeLimit ?? null, st.goals.timeLimit ?? null, st.id + ' time limit');
    assert.strictEqual(st.config.moveLimit ?? null, st.goals.moveLimit ?? null, st.id + ' move limit');
    const s = rules.createInitialState(st.config);
    assert.strictEqual(s.goals.timeLimit ?? null, st.goals.timeLimit ?? null, st.id + ' state time limit');
    assert.strictEqual(s.goals.moveLimit ?? null, st.goals.moveLimit ?? null, st.id + ' state move limit');
  }
});

test('content: 5 themes, tutorials, daily deterministic per UTC day', () => {
  assert.strictEqual(content.THEMES.length, 5);
  assert(content.TUTORIALS.length >= 3);
  const d = new Date(Date.UTC(2026, 0, 15));
  const a = content.dailyStage(d), b = content.dailyStage(new Date(Date.UTC(2026, 0, 15, 23, 59)));
  assert.strictEqual(a.seed, b.seed);
  const c = content.dailyStage(new Date(Date.UTC(2026, 0, 16)));
  assert.notStrictEqual(a.seed, c.seed);
});

test('content validator: all journey stages + dailies pass', () => {
  const report = content.validateAll();
  const bad = report.filter((r) => !r.ok);
  assert.strictEqual(bad.length, 0, bad.map((b) => b.id + ': ' + b.problems.join(',')).join(' | '));
  for (const r of report) assert(r.ticks > 0 && r.ticks <= 3000, r.id + ' out of bounds');
});

test('content validator: rejects defective stages', () => {
  const bad = content.validateStage({ id: 'x', seed: 0, config: null, goals: null, par: 0, difficulty: 9 });
  assert(!bad.ok);
  assert(bad.problems.length >= 3);
});
