'use strict';
// Hidden Council — test runner. Plain node, no dependencies.
// Run: node tests/run.js

const assert = require('assert');

let passed = 0, failed = 0;
const failures = [];
function test(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => { passed++; console.log('  ok  ' + name); })
    .catch((e) => { failed++; failures.push(name + ': ' + (e && e.message)); console.log('FAIL  ' + name + ' — ' + (e && e.message)); });
}

async function main() {
  const rules = await import('../src/rules.js');
  const content = await import('../src/content.js');
  const { hashStr } = await import('../src/util.js');

  const CFG = { seed: 12345, playerCount: 6, saboteurCount: 1, taskCount: 6 };

  // ---------------------------------------------------------- rules unit --

  await test('initial state is serializable and has players/tasks', () => {
    const s = rules.createInitialState(CFG);
    assert.strictEqual(s.players.length, 6);
    assert.strictEqual(s.tasks.length, 6);
    assert.strictEqual(s.players.filter((p) => p.role === 'saboteur').length, 1);
    JSON.parse(JSON.stringify(s));
  });

  await test('legalActions: crew has moves, wait, no eliminate', () => {
    const s = rules.createInitialState(CFG);
    const crew = s.players.find((p) => p.role === 'crew');
    const acts = rules.legalActions(s, crew.id);
    assert(acts.some((a) => a.type === 'move'));
    assert(acts.some((a) => a.type === 'wait'));
    assert(!acts.some((a) => a.type === 'eliminate'));
  });

  await test('move: valid linked room applies, unlinked rejected not_linked', () => {
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

  await test('move: bogus room rejected bad_room', () => {
    const s = rules.createInitialState(CFG);
    const r = rules.applyCommand(s, { id: 'x', type: 'move', player: 'p1', room: 'nowhere' });
    assert(!r.ok && r.reason === 'bad_room');
  });

  await test('task: completes in-room task; wrong_room and task_done rejected', () => {
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

  await test('task: saboteur rejected not_crew', () => {
    const s = rules.createInitialState(CFG);
    const sab = s.players.find((p) => p.role === 'saboteur');
    const r = rules.applyCommand(s, { id: 'q', type: 'task', player: sab.id, task: s.tasks[0].id });
    assert(!r.ok && r.reason === 'not_crew');
  });

  await test('eliminate: requires saboteur, same room, no witness; cooldown enforced', () => {
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

  await test('report + vote flow: meeting, majority ejects saboteur, crew wins', () => {
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

  await test('duplicate command id rejected idempotently', () => {
    let s = rules.createInitialState(CFG);
    const p = s.players[0];
    const room = rules.STATION_ROOMS.find((r) => r.id === p.room);
    const r1 = rules.applyCommand(s, { id: 'dup', type: 'move', player: p.id, room: room.links[0] });
    assert(r1.ok);
    const r2 = rules.applyCommand(r1.state, { id: 'dup', type: 'move', player: p.id, room: room.links[0] });
    assert(!r2.ok && r2.reason === 'duplicate_command');
  });

  await test('terminal: tasks complete -> crew win', () => {
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

  await test('terminal: parity -> saboteurs win', () => {
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

  await test('terminal: time limit -> saboteurs win', () => {
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

  await test('scoring: components sum to total, integers', () => {
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

  await test('tie-breaking order: objective, invalids, time, session id', () => {
    const base = { objective: true, invalidTotal: 0, elapsedTicks: 10, sessionId: 'a' };
    assert(rules.compareResults(base, Object.assign({}, base, { objective: false })) < 0);
    assert(rules.compareResults(base, Object.assign({}, base, { invalidTotal: 1 })) < 0);
    assert(rules.compareResults(base, Object.assign({}, base, { elapsedTicks: 11 })) < 0);
    assert(rules.compareResults(base, Object.assign({}, base, { sessionId: 'b' })) < 0);
    assert.strictEqual(rules.compareResults(base, Object.assign({}, base)), 0);
  });

  await test('serialization round-trip + v0 migration', () => {
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

  await test('deterministic replay: same seed+commands -> identical hashes', () => {
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

  await test('full simulation terminates with a winner', () => {
    const end = rules.simulate(CFG, 3000);
    assert.strictEqual(end.phase, 'over');
    assert(end.winner === 'crew' || end.winner === 'saboteurs');
    assert(end.winReason);
    assert(Number.isFinite(end.tick));
  });

  await test('fuzz: malformed commands never throw, never NaN', () => {
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

  await test('AI commands are always legal', () => {
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

  await test('content: 40 journey stages with required fields', () => {
    assert.strictEqual(content.JOURNEY.length, 40);
    for (const st of content.JOURNEY) {
      assert(st.id && st.seed >>> 0 && st.goals && st.par > 0 && st.difficulty >= 1 && st.difficulty <= 5);
      assert(st.theme && content.THEMES.some((t) => t.id === st.theme));
    }
  });

  await test('content: 5 themes, tutorials, daily deterministic per UTC day', () => {
    assert.strictEqual(content.THEMES.length, 5);
    assert(content.TUTORIALS.length >= 3);
    const d = new Date(Date.UTC(2026, 0, 15));
    const a = content.dailyStage(d), b = content.dailyStage(new Date(Date.UTC(2026, 0, 15, 23, 59)));
    assert.strictEqual(a.seed, b.seed);
    const c = content.dailyStage(new Date(Date.UTC(2026, 0, 16)));
    assert.notStrictEqual(a.seed, c.seed);
  });

  await test('content validator: all journey stages + dailies pass', () => {
    const report = content.validateAll();
    const bad = report.filter((r) => !r.ok);
    assert.strictEqual(bad.length, 0, bad.map((b) => b.id + ': ' + b.problems.join(',')).join(' | '));
    for (const r of report) assert(r.ticks > 0 && r.ticks <= 3000, r.id + ' out of bounds');
  });

  await test('content validator: rejects defective stages', () => {
    const bad = content.validateStage({ id: 'x', seed: 0, config: null, goals: null, par: 0, difficulty: 9 });
    assert(!bad.ok);
    assert(bad.problems.length >= 3);
  });

  // ---------------------------------------------------------- server --

  const { server, ready } = require('../server.js');
  await ready;
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const base = 'http://127.0.0.1:' + port;

  await test('server: GET /api/v1/time returns epoch ms', async () => {
    const r = await fetch(base + '/api/v1/time');
    const b = await r.json();
    assert.strictEqual(r.status, 200);
    assert(Math.abs(b.now - Date.now()) < 5000);
  });

  await test('server: static index.html served', async () => {
    const r = await fetch(base + '/');
    const t = await r.text();
    assert.strictEqual(r.status, 200);
    assert(t.includes('Hidden Council'));
  });

  await test('server: structured JSON error for unknown endpoint', async () => {
    const r = await fetch(base + '/api/v1/nope');
    const b = await r.json();
    assert.strictEqual(r.status, 404);
    assert.strictEqual(typeof b.error, 'string');
  });

  const validScore = {
    name: 'Tester', score: 500, seed: 12345, rulesVersion: rules.RULES_VERSION,
    contentVersion: content.CONTENT_VERSION, assists: false, durationMs: 60000, daily: true,
  };

  await test('server: score submit + leaderboard', async () => {
    const r = await fetch(base + '/api/v1/scores', { method: 'POST', body: JSON.stringify(validScore) });
    assert.strictEqual(r.status, 200);
    const g = await (await fetch(base + '/leaderboard-x')).json(); // 404 static miss shape check
    assert.strictEqual(typeof g.error, 'string');
    const lb = await (await fetch(base + '/api/v1/leaderboard?scope=global')).json();
    assert(lb.entries.some((e) => e.name === 'Tester' && e.score === 500));
    const dl = await (await fetch(base + '/api/v1/leaderboard?scope=daily')).json();
    assert(dl.entries.some((e) => e.name === 'Tester'));
  });

  await test('server: leaderboard rejects impossible/stale/bad scores', async () => {
    const cases = [
      Object.assign({}, validScore, { score: 99999999 }),
      Object.assign({}, validScore, { rulesVersion: 0 }),
      Object.assign({}, validScore, { durationMs: 5 }),
      Object.assign({}, validScore, { name: '' }),
      Object.assign({}, validScore, { score: -3 }),
    ];
    for (const c of cases) {
      const r = await fetch(base + '/api/v1/scores', { method: 'POST', body: JSON.stringify(c) });
      assert.strictEqual(r.status, 422, JSON.stringify(c));
      const b = await r.json();
      assert(b.error);
    }
  });

  await test('server: achievements idempotent', async () => {
    const post = () => fetch(base + '/api/v1/achievements', { method: 'POST', body: JSON.stringify({ profile: 't', key: 'first_completion' }) }).then((r) => r.json());
    const a = await post();
    assert(a.ok && a.fresh === true);
    const b = await post();
    assert(b.ok && b.fresh === false);
    const bad = await fetch(base + '/api/v1/achievements', { method: 'POST', body: JSON.stringify({ profile: 't', key: 'BAD KEY!' }) });
    assert.strictEqual(bad.status, 422);
  });

  await test('server: ws lobby create/join/ready/start over raw protocol', async () => {
    const ws = await connectWs(base.replace('http', 'ws') + '/ws');
    const msgs = [];
    ws.onMessage((m) => msgs.push(m));
    ws.send({ type: 'create', name: 'Host' });
    await waitFor(() => msgs.some((m) => m.type === 'room'));
    const snap = msgs.filter((m) => m.type === 'room').pop();
    assert(snap.code);
    ws.send({ type: 'addAi' }); ws.send({ type: 'addAi' }); ws.send({ type: 'addAi' });
    await waitFor(() => msgs.filter((m) => m.type === 'room').pop().seats.length >= 4);
    ws.send({ type: 'ready', ready: true });
    await waitFor(() => msgs.filter((m) => m.type === 'room').pop().seats.every((s) => s.ready));
    ws.send({ type: 'start' });
    await waitFor(() => msgs.some((m) => m.type === 'started'), 4000);
    const started = msgs.find((m) => m.type === 'started');
    assert(started.state && started.state.players.length === 4);
    // Send an authoritative command from our seat (p0).
    const p0 = started.state.players[0];
    const room = rules.STATION_ROOMS.find((r) => r.id === p0.room);
    ws.send({ type: 'command', command: { id: 'cli-1', type: 'move', player: 'p0', room: room.links[0] } });
    await waitFor(() => msgs.some((m) => m.type === 'state' && m.state.players[0].room === room.links[0]), 4000);
    // Identity mismatch is rejected.
    ws.send({ type: 'command', command: { id: 'cli-2', type: 'move', player: 'p1', room } });
    await waitFor(() => msgs.some((m) => m.type === 'rejected' || (m.type === 'error' && m.error === 'identity_mismatch')), 2000);
    ws.close();
  });

  server.close();

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed) {
    for (const f of failures) console.log('  - ' + f);
    process.exit(1);
  }
}

// Minimal WS test client (matches server framing).
function connectWs(url) {
  const crypto = require('crypto');
  const net = require('net');
  const u = new URL(url);
  const key = crypto.randomBytes(16).toString('base64');
  return new Promise((resolve, reject) => {
    const sock = net.connect(Number(u.port), u.hostname, () => {
      sock.write(
        'GET ' + u.pathname + ' HTTP/1.1\r\nHost: ' + u.host + '\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n' +
        'Sec-WebSocket-Key: ' + key + '\r\nSec-WebSocket-Version: 13\r\n\r\n'
      );
    });
    let handshook = false;
    let buf = Buffer.alloc(0);
    const listeners = [];
    const client = {
      onMessage(fn) { listeners.push(fn); },
      send(obj) {
        const payload = Buffer.from(JSON.stringify(obj));
        const mask = crypto.randomBytes(4);
        let header;
        if (payload.length < 126) header = Buffer.from([0x81, 0x80 | payload.length]);
        else { header = Buffer.alloc(4); header[0] = 0x81; header[1] = 0x80 | 126; header.writeUInt16BE(payload.length, 2); }
        const masked = Buffer.alloc(payload.length);
        for (let i = 0; i < payload.length; i++) masked[i] = payload[i] ^ mask[i & 3];
        sock.write(Buffer.concat([header, mask, masked]));
      },
      close() { sock.destroy(); },
    };
    sock.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      if (!handshook) {
        const idx = buf.indexOf('\r\n\r\n');
        if (idx < 0) return;
        handshook = true;
        buf = buf.slice(idx + 4);
        resolve(client);
      }
      for (;;) {
        if (buf.length < 2) break;
        let len = buf[1] & 0x7f, off = 2;
        if (len === 126) { if (buf.length < 4) break; len = buf.readUInt16BE(2); off = 4; }
        else if (len === 127) { if (buf.length < 10) break; len = Number(buf.readBigUInt64BE(2)); off = 10; }
        if (buf.length < off + len) break;
        const payload = buf.slice(off, off + len).toString('utf8');
        buf = buf.slice(off + len);
        if ((buf[0] & 0x0f) === 0x8) { sock.destroy(); break; }
        try { const m = JSON.parse(payload); listeners.forEach((f) => f(m)); } catch (e) {}
      }
    });
    sock.on('error', reject);
  });
}

function waitFor(cond, timeoutMs) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const iv = setInterval(() => {
      if (cond()) { clearInterval(iv); resolve(); }
      else if (Date.now() - t0 > (timeoutMs || 3000)) { clearInterval(iv); reject(new Error('waitFor timeout')); }
    }, 20);
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
