// Hosted councils end to end over a fake platform running server.js: the host
// creates and opens a room, a guest quick-joins, the host adds an automaton
// (the room's metadata, announced to the guest) and starts it; both clients
// receive their own views from the script, act from them, and get the
// script's result. No client is the authority. Run: node --test tests/hosted.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CouncilClient } from '../src/hosted.js';
import { fakePlatform, flush } from './fake-platform.mjs';

function recorder() {
  const ev = { starts: 0, states: 0, over: null, rejects: [], unavailable: [], events: [] };
  return {
    ev,
    hooks: {
      onStart: () => { ev.starts++; },
      onState: (s, events) => { ev.states++; ev.events.push(...events); },
      onOver: (r) => { ev.over = r; },
      onReject: (r) => ev.rejects.push(r),
      onUnavailable: (c) => ev.unavailable.push(c),
    },
  };
}

test('a hosted council from the lobby to the script\'s result', async () => {
  const fp = fakePlatform();
  const h = recorder(), g = recorder();
  const made = await CouncilClient.create(fp.adapter('ua', 'Ann'), h.hooks);
  assert.ok(made.ok);
  const host = made.client;
  const joined = await CouncilClient.join(fp.adapter('ub', 'Bo'), g.hooks);
  assert.ok(joined.ok);
  const guest = joined.client;
  await flush();
  assert.deepEqual(host.lobbySeats().map((s) => [s.name, s.you]), [['Ann', true], ['Bo', false]]);
  assert.equal(guest.isHost, false);
  assert.deepEqual((await host.start()), { ok: false, error: 'too-few' });
  assert.ok((await host.addAutomaton()).ok);
  assert.ok((await host.addAutomaton()).ok);
  await flush();
  assert.equal(guest.automata, 2, 'the guest hears the lobby event');
  assert.equal(fp.room.metadata.automata, 2);
  assert.ok((await host.start()).ok);
  await flush(); await flush();
  assert.equal(h.ev.starts, 1);
  assert.equal(g.ev.starts, 1);
  assert.equal(host.you, 'p0');
  assert.equal(guest.you, 'p1');
  // A command the view says is illegal never leaves the client.
  assert.equal(host.act({ type: 'move', room: 'greenhouse' }).ok, false);
  for (let i = 0; i < 4000 && !(h.ev.over && g.ev.over); i++) {
    fp.tick(250);
    await flush();
    if (i % 3 === 0) for (const c of [host, guest]) {
      const acts = c.legal();
      const pick = acts.find((x) => x.type === 'vote' && x.choice === 'skip') || acts.find((x) => x.type === 'task') || acts.find((x) => x.type === 'wait');
      if (pick) { const { type, room, task, target, body, choice } = pick; assert.ok(c.act({ type, room, task, target, body, choice }).ok); }
    }
    await flush();
  }
  assert.ok(h.ev.over && g.ev.over, 'both seats saw the result');
  assert.ok(fp.room.result, 'the script recorded it');
  assert.equal(h.ev.over.seats.length, 4);
  assert.equal(h.ev.over.seats.filter((s) => s.you).length, 1);
  assert.equal(typeof h.ev.over.score.total, 'number');
  assert.ok(h.ev.events.some((e) => e.kind === 'move'), 'log events reach the client for sounds');
  assert.equal(fp.room.status, 'closed');
});

test('quick join with no open room is honest', async () => {
  const fp = fakePlatform();
  const r = await CouncilClient.join(fp.adapter('ub', 'Bo'), recorder().hooks);
  assert.deepEqual(r, { ok: false, error: 'no-open-rooms' });
});

test('a room that starts without the script\'s session is unavailable (never played unrefereed)', async () => {
  const fp = fakePlatform();
  const rec = recorder();
  const host = (await CouncilClient.create(fp.adapter('ua', 'Ann'), rec.hooks)).client;
  await flush();
  host._onRoster({ status: 'playing', gameSessionId: null, participants: [] });
  assert.deepEqual(rec.ev.unavailable, ['no-session']);
  assert.equal(host.phase, 'closed');
});
