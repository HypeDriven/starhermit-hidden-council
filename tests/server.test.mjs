// server.js, the game's server script, under a fake platform host: score
// posting on practice sessions (range-checked to the high-score board) and the
// hosted council referee (seats from the room, roles dealt from its own seed,
// per-seat views that hide other roles, commands bound to the sender's seat,
// automata and leavers played by the AI, the vote deadline, the recorded
// result). Run: node --test tests/server.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ScriptSession, declarations, invoke } from './fake-platform.mjs';
import { legalActions } from '../src/rules.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

test('declarations: 4 Hz ticks; the boards match leaderboards.json; the RULES block is current', () => {
  const d = declarations();
  assert.equal(d.tickRateHz, 4);
  assert.deepEqual(d.BOARDS, JSON.parse(readFileSync(ROOT + 'leaderboards.json', 'utf8')));
  execFileSync(process.execPath, ['tools/build-server.mjs', '--check'], { cwd: ROOT, stdio: 'pipe' });
});

test('score posting: a valid total reaches the high-score board, bad ones do not', () => {
  for (const [score, ok] of [[321, true], [0, true], [100000, true], [100001, false], [-1, false], [12.5, false], ['9', false]]) {
    const s = new ScriptSession({ players: [{ id: 'u1', name: 'Ada' }] });
    s.create();
    const out = s.send('u1', { type: 'result', scores: { 'high-score': score } });
    assert.ok(out.ok);
    assert.deepEqual(s.last('u1', 'result-ack').accepted, ok ? ['high-score'] : []);
    assert.deepEqual(s.scores, ok ? [{ 'high-score': { u1: score } }] : [{}]);
    assert.equal(s.result.kind, 'finished');
  }
  assert.equal(invoke('onPlayerMessage', { now: 1, random: 0, message: { from: 'u', data: { type: 'nope' } }, sessionState: { mode: 'score' } }).ok, false);
});

function council({ humans = ['a', 'b'], automata = 2, random = 0.3 } = {}) {
  const s = new ScriptSession({
    players: humans.map((id) => ({ id, name: id.toUpperCase() })),
    room: { roomId: 'r', metadata: { mode: 'council', automata }, roster: humans.map((id, i) => ({ userId: id, name: id.toUpperCase(), team: 0, slot: i, ai: false })) },
    random,
  });
  s.create();
  return s;
}

test('council: seats are the roster then the automata (at least four), each human gets its own view', () => {
  const s = council({ humans: ['a'], automata: 1 });
  assert.deepEqual(s.state.seats.map((x) => [x.name, x.ai]), [['A', false], ['Automaton 1', true], ['Automaton 2', true], ['Automaton 3', true]]);
  const m = s.last('a');
  assert.equal(m.you, 'p0');
  assert.equal(m.state.players.length, 4);
  assert.equal(m.state.seed, undefined, 'the seed never leaves the script');
  assert.equal(m.state.seen, undefined);
  assert.equal(m.state.log.at(-1).text, 'The session begins.');
});

test('council views: others look like crew; a saboteur sees the other saboteurs; cooldowns are private', () => {
  for (let r = 0; r < 12; r++) {
    const humans = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const s = council({ humans, automata: 0, random: r / 12 });
    const truth = s.state.state.players.map((p) => p.role);
    assert.equal(truth.filter((x) => x === 'saboteur').length, 2);
    humans.forEach((u, i) => {
      const v = s.last(u).state;
      for (const [j, p] of v.players.entries()) {
        if (j === i) assert.equal(p.role, truth[j]);
        else if (truth[i] === 'saboteur') assert.equal(p.role, truth[j]);
        else assert.equal(p.role, 'crew');
      }
      assert.ok(Object.keys(v.cooldowns).every((k) => k === 'p' + i));
    });
  }
});

test('council commands: bound to the sender\'s seat; unseated and malformed senders refused', () => {
  const s = council();
  const tick = s.state.state.tick;
  const out = s.send('b', { type: 'act', action: { type: 'wait', player: 'p0' } });
  assert.ok(out.ok);
  assert.equal(s.state.state.tick, tick + 1);
  assert.match(s.state.state.log.at(-1).text, /^B waited\.$/);
  assert.equal(s.send('zz', { type: 'act', action: { type: 'wait' } }).ok, false);
  assert.equal(s.send('a', { type: 'act', action: { type: 'fly' } }).ok, false);
  assert.equal(s.send('a', { type: 'act', action: { type: 'move', room: 7 } }).ok, false);
  // An illegal but shaped command still costs its tick and tells the sender why.
  const before = s.state.state.tick;
  s.send('a', { type: 'act', action: { type: 'move', room: 'greenhouse' } });
  assert.equal(s.state.state.tick, before + 1);
  assert.equal(s.last('a', 'rejected').reason, 'not_linked');
});

test('council: a whole round to its recorded result, the humans acting from their own views', () => {
  const s = council();
  for (let i = 0; i < 4000 && !s.result; i++) {
    s.tick(250);
    for (const u of ['a', 'b']) {
      const m = s.last(u);
      if (!m || m.over || i % 3) continue;
      const acts = legalActions(m.state, m.you);
      if (!acts.length) continue;
      const pick = acts.find((x) => x.type === 'vote' && x.choice === 'skip') || acts.find((x) => x.type === 'task') || acts.find((x) => x.type === 'report') || acts[i % acts.length];
      const { type, room, task, target, body, choice } = pick;
      s.send(u, { type: 'act', action: { type, room, task, target, body, choice } });
    }
  }
  assert.ok(s.result, 'the round ended');
  assert.equal(s.result.kind, 'finished');
  assert.ok(['crew', 'saboteurs'].includes(s.result.winner));
  assert.equal(s.result.seats.length, 4);
  for (const seat of s.result.seats) assert.equal(seat.won, seat.role === (s.result.winner === 'crew' ? 'crew' : 'saboteur'));
  const final = s.last('a');
  assert.ok(final.over && final.over.recorded);
  assert.deepEqual(final.state.players.map((p) => p.role), s.state.state.players.map((p) => p.role), 'roles revealed at the end');
});

test('council: a leaver is played by the AI; when every human left the round ends abandoned', () => {
  const s = council();
  s.presence.b.left = true;
  s.tick(250);
  assert.equal(s.state.state.players[1].ai, true);
  s.presence.a.left = true;
  s.tick(250);
  assert.equal(s.result.kind, 'abandoned');
});

test('council: an offline player is played by the AI after 30 s, and votes skip 60 s into a council', () => {
  const s = council();
  s.presence.b.online = false;
  s.tick(250);
  assert.equal(s.state.state.players[1].ai, false);
  for (let i = 0; i < 125; i++) s.tick(250);
  assert.equal(s.state.state.players[1].ai, true);
  s.presence.b.online = true;
  s.tick(250);
  assert.equal(s.state.state.players[1].ai, false);
  // A council the humans never vote in.
  const ss = s.state;
  ss.state.phase = 'meeting';
  ss.state.meeting = { reason: 'emergency', by: 'p2', votes: {} };
  ss.meetingAt = s.now;
  for (let i = 0; i < 260 && ss.state.phase === 'meeting'; i++) s.tick(250);
  assert.notEqual(s.state.state.phase, 'meeting');
});
