'use strict';
// Hidden Council — authoritative server. No external dependencies.
// Static files + REST (/api/v1/*) + realtime rooms over a hand-rolled RFC6455
// WebSocket layer. Rules come from src/rules.js via dynamic ESM import.

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 8090;
const ROOT = __dirname;
// Tests point HC_SCORES_FILE at a scratch path so runs don't rewrite repo data.
const SCORES_FILE = process.env.HC_SCORES_FILE || path.join(ROOT, 'scores.json');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.opus': 'audio/ogg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
};

let rules = null; // loaded async in init()
let util = null;
const ready = Promise.all([
  import('./src/rules.js').then((m) => { rules = m; }),
  import('./src/util.js').then((m) => { util = m; }),
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' });
  res.end(body);
}

function sendError(res, code, msg) { sendJson(res, code, { error: msg }); }

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > (limit || 16384)) { reject(new Error('payload too large')); req.destroy(); return; }
      data += c;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// Leaderboards + achievements (in-memory, optional JSON persistence)
// ---------------------------------------------------------------------------

const MAX_REASONABLE_SCORE = 5000;
const board = { global: [], daily: new Map() }; // daily: dayKey -> []
const achieved = new Map(); // profile -> Set of keys

function loadScores() {
  try {
    const data = JSON.parse(fs.readFileSync(SCORES_FILE, 'utf8'));
    if (Array.isArray(data.global)) board.global = data.global;
    if (data.daily) for (const k of Object.keys(data.daily)) board.daily.set(k, data.daily[k]);
  } catch (e) { /* no file yet */ }
}

function saveScores() {
  try {
    const daily = {};
    for (const [k, v] of board.daily) daily[k] = v;
    fs.writeFileSync(SCORES_FILE, JSON.stringify({ global: board.global, daily }));
  } catch (e) { /* persistence is optional */ }
}

function submitScore(entry) {
  const errs = [];
  if (!entry || typeof entry !== 'object') return ['bad payload'];
  if (typeof entry.name !== 'string' || !entry.name.trim() || entry.name.length > 24) errs.push('bad name');
  if (!Number.isInteger(entry.score) || entry.score < 0) errs.push('bad score');
  if (entry.score > MAX_REASONABLE_SCORE) errs.push('impossible score');
  if (!Number.isInteger(entry.seed)) errs.push('bad seed');
  if (entry.rulesVersion !== rules.RULES_VERSION) errs.push('stale rules version');
  if (!Number.isInteger(entry.contentVersion) || entry.contentVersion < 1) errs.push('stale content version');
  if (!Number.isFinite(entry.durationMs) || entry.durationMs < 1000 || entry.durationMs > 6 * 3600e3) errs.push('bad duration');
  if (errs.length) return errs;

  const rec = {
    name: entry.name.trim(), score: entry.score, seed: entry.seed,
    rulesVersion: entry.rulesVersion, contentVersion: entry.contentVersion,
    assists: !!entry.assists, durationMs: Math.round(entry.durationMs), at: Date.now(),
  };
  board.global.push(rec);
  board.global.sort((a, b) => b.score - a.score || a.durationMs - b.durationMs);
  board.global.length = Math.min(board.global.length, 100);
  const dayKey = String(Math.floor(Date.now() / 86400000));
  if (entry.daily) {
    const list = board.daily.get(dayKey) || [];
    list.push(rec);
    list.sort((a, b) => b.score - a.score || a.durationMs - b.durationMs);
    board.daily.set(dayKey, list.slice(0, 100));
  }
  saveScores();
  return null;
}

// ---------------------------------------------------------------------------
// Minimal WebSocket framing (text JSON frames only)
// ---------------------------------------------------------------------------

const WS_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

function wsAccept(key) {
  return crypto.createHash('sha1').update(key + WS_GUID).digest('base64');
}

function wsEncode(str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.from([0x81, len]);
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81; header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81; header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  return Buffer.concat([header, payload]);
}

// Stateful per-socket frame parser. Calls onMessage(string) / onClose().
function wsParser(onMessage, onClose, onPong) {
  let buf = Buffer.alloc(0);
  let fragments = [];
  return (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    for (;;) {
      if (buf.length < 2) return;
      const fin = (buf[0] & 0x80) !== 0;
      const opcode = buf[0] & 0x0f;
      const masked = (buf[1] & 0x80) !== 0;
      let len = buf[1] & 0x7f;
      let off = 2;
      if (len === 126) {
        if (buf.length < 4) return;
        len = buf.readUInt16BE(2); off = 4;
      } else if (len === 127) {
        if (buf.length < 10) return;
        len = Number(buf.readBigUInt64BE(2)); off = 10;
        if (len > 1 << 20) { onClose(); return; }
      }
      const maskLen = masked ? 4 : 0;
      if (buf.length < off + maskLen + len) return;
      let payload = buf.slice(off + maskLen, off + maskLen + len);
      if (masked) {
        const mask = buf.slice(off, off + 4);
        const out = Buffer.alloc(len);
        for (let i = 0; i < len; i++) out[i] = payload[i] ^ mask[i & 3];
        payload = out;
      }
      buf = buf.slice(off + maskLen + len);
      if (opcode === 0x8) { onClose(); return; }
      if (opcode === 0x9) continue; // ping -> caller may pong; handled by onPong hook
      if (opcode === 0xA) { if (onPong) onPong(); continue; }
      if (opcode === 0x1 || opcode === 0x0) {
        fragments.push(payload);
        if (fin) {
          onMessage(Buffer.concat(fragments).toString('utf8'));
          fragments = [];
        }
      }
    }
  };
}

// ---------------------------------------------------------------------------
// Realtime rooms
// ---------------------------------------------------------------------------

const rooms = new Map(); // code -> room
let nextClientId = 1;

function makeRoomCode() {
  let code;
  do { code = crypto.randomBytes(3).toString('hex').toUpperCase(); } while (rooms.has(code));
  return code;
}

function roomSnapshot(room, forClient) {
  return {
    type: 'room',
    code: room.code,
    phase: room.phase,
    seats: room.seats.map((s) => ({ id: s.id, name: s.name, ai: s.ai, ready: s.ready, connected: !!s.client })),
    you: forClient ? forClient.seatId : null,
  };
}

function broadcast(room, obj, except) {
  const msg = wsEncode(JSON.stringify(obj));
  for (const seat of room.seats) {
    if (seat.client && seat.client !== except) {
      try { seat.client.socket.write(msg); } catch (e) { /* dropped */ }
    }
  }
}

function awaySummary(room, seat) {
  const events = room.awayLog.filter((e) => e.tick > (seat.lastTick || 0)).slice(-8);
  return events.map((e) => e.text);
}

function roomLog(room, tick, text) {
  room.awayLog.push({ tick, text });
  if (room.awayLog.length > 200) room.awayLog.shift();
}

function startRoomGame(room) {
  const cfg = room.config;
  const names = room.seats.map((s) => s.name);
  room.state = rules.createInitialState({
    seed: cfg.seed, playerCount: room.seats.length,
    saboteurCount: cfg.saboteurCount, taskCount: cfg.taskCount, names,
  });
  // Map seats to player ids in order.
  room.seats.forEach((s, i) => { s.playerId = 'p' + i; s.lastTick = 0; });
  room.phase = 'playing';
  room.awayLog = [];
  roomLog(room, 0, 'The council session begins.');
  broadcast(room, { type: 'started', state: room.state, seats: room.seats.map((s) => ({ id: s.id, name: s.name, playerId: s.playerId, ai: s.ai })) });
  runRoomAi(room);
}

// AI seats act on a short timer while the room is playing.
function runRoomAi(room) {
  if (room.phase !== 'playing') return;
  const state = room.state;
  if (state.phase === 'over') { finishRoom(room); return; }
  let acted = false;
  if (state.phase === 'meeting') {
    for (const seat of room.seats) {
      if (!seat.ai) continue;
      const p = state.players.find((x) => x.id === seat.playerId);
      if (!p || !p.alive || seat.playerId in state.meeting.votes) continue;
      const cmd = rules.aiCommand(state, seat.playerId, 'srv-' + room.code + '-' + state.tick + '-' + seat.playerId);
      if (cmd) { applyRoomCommand(room, seat, cmd); acted = true; }
    }
  } else {
    for (const seat of room.seats) {
      if (!seat.ai) continue;
      const p = state.players.find((x) => x.id === seat.playerId);
      if (!p || !p.alive) continue;
      if (util.rand01(state.seed, state.tick + room.seats.indexOf(seat) * 31) < 0.5) continue; // pace AI
      const cmd = rules.aiCommand(state, seat.playerId, 'srv-' + room.code + '-' + state.tick + '-' + seat.playerId);
      if (cmd) { applyRoomCommand(room, seat, cmd); acted = true; break; }
    }
  }
  if (room.state.phase === 'over') { finishRoom(room); return; }
  room.aiTimer = setTimeout(() => runRoomAi(room), acted ? 700 : 1200);
}

function applyRoomCommand(room, seat, cmd) {
  // Authoritative validation: identity, membership, duplicate id, legality.
  if (!seat || seat.playerId !== cmd.player) return { ok: false, reason: 'identity_mismatch' };
  const res = rules.applyCommand(room.state, cmd);
  if (!res.ok) return res;
  room.state = res.state;
  seat.lastTick = room.state.tick;
  const last = room.state.log[room.state.log.length - 1];
  if (last) roomLog(room, last.tick, last.text);
  broadcast(room, { type: 'state', state: room.state });
  return { ok: true };
}

function finishRoom(room) {
  room.phase = 'results';
  if (room.aiTimer) clearTimeout(room.aiTimer);
  const results = room.seats.map((s) => ({
    playerId: s.playerId, name: s.name, ai: s.ai,
    score: rules.scoreBreakdown(room.state, s.playerId),
  }));
  broadcast(room, { type: 'results', winner: room.state.winner, winReason: room.state.winReason, results, state: room.state });
}

function handleWsMessage(client, text) {
  let msg;
  try { msg = JSON.parse(text); } catch (e) { return sendWs(client, { type: 'error', error: 'bad_json' }); }
  if (!msg || typeof msg.type !== 'string') return sendWs(client, { type: 'error', error: 'bad_message' });

  switch (msg.type) {
    case 'create': {
      const room = {
        code: makeRoomCode(), phase: 'lobby', seats: [], awayLog: [],
        config: {
          seed: (crypto.randomBytes(4).readUInt32BE(0) >>> 0),
          saboteurCount: 1, taskCount: 8,
        },
      };
      rooms.set(room.code, room);
      joinRoom(client, room, msg);
      return;
    }
    case 'join': {
      const room = rooms.get(String(msg.code || '').toUpperCase());
      if (!room) return sendWs(client, { type: 'error', error: 'room_not_found' });
      if (room.phase !== 'lobby') {
        // Reconnect: find a disconnected human seat by name.
        const seat = room.seats.find((s) => !s.ai && s.name === msg.name);
        if (!seat) return sendWs(client, { type: 'error', error: 'game_in_progress' });
        seat.client = client; client.seatId = seat.id; client.room = room;
        sendWs(client, Object.assign(roomSnapshot(room, { seatId: seat.id }), { phase: room.phase }));
        sendWs(client, { type: 'snapshot', state: room.state, away: awaySummary(room, seat) });
        return;
      }
      joinRoom(client, room, msg);
      return;
    }
    case 'quickjoin': {
      let target = null;
      for (const room of rooms.values()) {
        if (room.phase === 'lobby' && room.seats.filter((s) => !s.ai).length < 6) { target = room; break; }
      }
      if (!target) {
        target = { code: makeRoomCode(), phase: 'lobby', seats: [], awayLog: [], config: { seed: (crypto.randomBytes(4).readUInt32BE(0) >>> 0), saboteurCount: 1, taskCount: 8 } };
        rooms.set(target.code, target);
      }
      joinRoom(client, target, msg);
      return;
    }
    case 'addAi': {
      const room = client.room;
      if (!room || room.phase !== 'lobby') return sendWs(client, { type: 'error', error: 'not_in_lobby' });
      if (room.seats.length >= 12) return sendWs(client, { type: 'error', error: 'room_full' });
      room.seats.push({ id: 'seat' + room.seats.length, name: 'Automaton ' + (room.seats.filter((s) => s.ai).length + 1), ai: true, ready: true, client: null });
      broadcast(room, roomSnapshot(room));
      return;
    }
    case 'ready': {
      const room = client.room;
      if (!room || room.phase !== 'lobby') return;
      const seat = room.seats.find((s) => s.id === client.seatId);
      if (seat) seat.ready = !!msg.ready;
      broadcast(room, roomSnapshot(room));
      return;
    }
    case 'start': {
      const room = client.room;
      if (!room || room.phase !== 'lobby') return sendWs(client, { type: 'error', error: 'not_in_lobby' });
      if (room.seats.length < 4) return sendWs(client, { type: 'error', error: 'need_4_players' });
      if (room.seats.some((s) => !s.ready)) return sendWs(client, { type: 'error', error: 'not_all_ready' });
      startRoomGame(room);
      return;
    }
    case 'command': {
      const room = client.room;
      if (!room || room.phase !== 'playing') return sendWs(client, { type: 'error', error: 'not_playing' });
      const seat = room.seats.find((s) => s.id === client.seatId);
      if (!seat) return sendWs(client, { type: 'error', error: 'no_seat' });
      const cmd = msg.command;
      if (!cmd || cmd.player !== seat.playerId) return sendWs(client, { type: 'error', error: 'identity_mismatch' });
      const res = applyRoomCommand(room, seat, cmd);
      if (!res.ok) sendWs(client, { type: 'rejected', id: cmd.id, reason: res.reason });
      if (room.state.phase === 'over') finishRoom(room);
      return;
    }
    default:
      sendWs(client, { type: 'error', error: 'unknown_type' });
  }
}

function joinRoom(client, room, msg) {
  if (room.seats.length >= 12) return sendWs(client, { type: 'error', error: 'room_full' });
  const seat = { id: 'seat' + room.seats.length, name: String(msg.name || 'Guest').slice(0, 24), ai: false, ready: false, client };
  room.seats.push(seat);
  client.seatId = seat.id;
  client.room = room;
  broadcast(room, roomSnapshot(room));
  sendWs(client, roomSnapshot(room, { seatId: seat.id }));
}

function sendWs(client, obj) {
  try { client.socket.write(wsEncode(JSON.stringify(obj))); } catch (e) { /* dropped */ }
}

function attachWebSocket(server) {
  // Upgraded sockets are detached from the HTTP server's connection tracking,
  // so server.close() would otherwise never finish shutting down.
  const sockets = new Set();
  server.on('close', () => {
    for (const s of sockets) { try { s.destroy(); } catch (e) { /* already gone */ } }
    sockets.clear();
  });
  server.on('upgrade', (req, socket) => {
    if (!req.url.startsWith('/ws')) { socket.destroy(); return; }
    const key = req.headers['sec-websocket-key'];
    if (!key) { socket.destroy(); return; }
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      'Sec-WebSocket-Accept: ' + wsAccept(key) + '\r\n\r\n'
    );
    socket.setNoDelay(true);
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
    const client = { id: nextClientId++, socket, room: null, seatId: null };
    const close = () => { try { socket.destroy(); } catch (e) {} };
    const parse = wsParser(
      (text) => { try { handleWsMessage(client, text); } catch (e) { sendWs(client, { type: 'error', error: 'internal' }); } },
      close
    );
    socket.on('data', parse);
    socket.on('close', () => {
      if (client.room) {
        const room = client.room;
        const seat = room.seats.find((s) => s.id === client.seatId);
        if (seat) { seat.client = null; seat.ready = false; }
        // Drop rooms nobody is connected to, so their AI timer stops ticking.
        if (!room.seats.some((s) => s.client)) {
          if (room.aiTimer) { clearTimeout(room.aiTimer); room.aiTimer = null; }
          room.phase = 'closed';
          rooms.delete(room.code);
          return;
        }
        broadcast(room, roomSnapshot(room));
      }
    });
    socket.on('error', () => {});
    sendWs(client, { type: 'hello', id: client.id });
  });
}

// ---------------------------------------------------------------------------
// HTTP layer
// ---------------------------------------------------------------------------

const server = http.createServer(async (req, res) => {
  await ready;
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;

  try {
    if (p === '/api/v1/time') {
      return sendJson(res, 200, { now: Date.now() });
    }
    if (p === '/api/v1/leaderboard') {
      const scope = url.searchParams.get('scope') || 'global';
      if (scope === 'daily') {
        const dayKey = String(Math.floor(Date.now() / 86400000));
        return sendJson(res, 200, { scope, entries: board.daily.get(dayKey) || [] });
      }
      return sendJson(res, 200, { scope: 'global', entries: board.global.slice(0, 50) });
    }
    if (p === '/api/v1/scores' && req.method === 'POST') {
      const body = await readBody(req);
      let entry;
      try { entry = JSON.parse(body); } catch (e) { return sendError(res, 400, 'bad json'); }
      const errs = submitScore(entry);
      if (errs) return sendError(res, 422, errs.join('; '));
      return sendJson(res, 200, { ok: true });
    }
    if (p === '/api/v1/achievements' && req.method === 'POST') {
      const body = await readBody(req);
      let a;
      try { a = JSON.parse(body); } catch (e) { return sendError(res, 400, 'bad json'); }
      if (!a || typeof a.key !== 'string' || !/^[a-z0-9_]+$/.test(a.key)) return sendError(res, 422, 'bad key');
      const who = String(a.profile || 'guest');
      const set = achieved.get(who) || new Set();
      const fresh = !set.has(a.key);
      set.add(a.key); // idempotent
      achieved.set(who, set);
      return sendJson(res, 200, { ok: true, fresh });
    }
    if (p.startsWith('/api/')) return sendError(res, 404, 'unknown endpoint');

    // Static files.
    let rel = p === '/' ? '/index.html' : p;
    if (rel.includes('..')) return sendError(res, 403, 'forbidden');
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) return sendError(res, 403, 'forbidden');
    fs.readFile(file, (err, data) => {
      if (err) return sendError(res, 404, 'not found');
      res.writeHead(200, { 'content-type': CONTENT_TYPES[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  } catch (e) {
    sendError(res, 500, 'internal error');
  }
});

attachWebSocket(server);
loadScores();

if (require.main === module) {
  ready.then(() => {
    server.listen(PORT, () => console.log(`Hidden Council listening on http://localhost:${PORT}`));
  });
}

module.exports = { server, ready };
