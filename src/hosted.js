'use strict';
// Hosted councils: a StarHermit realtime room for the lobby, the game's server
// script (server.js) for the round.
//
// The host creates a room (one team, up to 12 seats) and opens it for
// quick-join; guests quick-join. The room's roster seats the humans; the host
// adds automata (a count in the room's metadata, sent to the guests as a
// lobby event). When the host starts the room the platform binds a session to
// it and server.js referees the round: every client opens that session's game
// socket, sends its commands ({ type: 'act', action }) and receives its own
// view of the station ({ type: 'council', … }: its role, the seats, the log
// tail). The script decides and records the result; a room that starts
// without a bound session is unavailable (never played without the referee).
//
// `platform` is the adapter native/platform.ts provides (and the node tests
// fake): { userId, createRoom, openRoom, updateRoom, quickJoin, startRoom,
// leaveRoom, connectRoom(roomId, handlers), connectGame(sessionId, handlers) }.

import { legalActions } from './rules.js';

export const MAX_SEATS = 12;
export const MIN_SEATS = 4;

export class CouncilClient {
  constructor(platform, hooks, info) {
    this.platform = platform;
    this.hooks = hooks || {};
    this.roomId = info.roomId;
    this.isHost = !!info.host;
    this.revision = info.revision ?? 0;
    this.metadata = info.metadata && typeof info.metadata === 'object' ? { ...info.metadata } : { mode: 'council', automata: 0 };
    this.joinCode = info.joinCode || null;
    this.automata = Number(this.metadata.automata) || 0;
    this.players = [];             // lobby: [{ name, you, host }]
    this.sessionId = null;
    this.phase = 'lobby';          // lobby | starting | playing | over | closed
    this.state = null;             // the script's view of the station
    this.you = null;               // our player id (p<n>)
    this.seats = [];
    this.visual = 1;
    this.over = null;
    this.logTotal = 0;
    this._room = null;
    this._game = null;
    if (info.gameSessionId) this._pending = info.gameSessionId;
  }

  _emit(name, ...args) { const fn = this.hooks[name]; if (fn) fn(...args); }

  /** Host: create a room and open it for quick-join. */
  static async create(platform, hooks) {
    const res = await platform.createRoom({ teamCount: 1, seatsPerTeam: MAX_SEATS, metadata: { mode: 'council', automata: 0 } });
    if (!res.ok) return { ok: false, error: res.error || 'rooms-unavailable' };
    const room = res.data;
    const client = new CouncilClient(platform, hooks, { roomId: room.roomId, host: true, revision: room.revision, metadata: room.metadata, joinCode: room.joinCode });
    await platform.openRoom(room.roomId);
    client.connect();
    return { ok: true, client };
  }

  /** Guest: quick-join an open council of this game (no-open-rooms when there is none). */
  static async join(platform, hooks) {
    const res = await platform.quickJoin();
    if (!res.ok) return { ok: false, error: res.status === 404 ? 'no-open-rooms' : (res.error || 'rooms-unavailable') };
    const room = res.data;
    const client = new CouncilClient(platform, hooks, { roomId: room.roomId, host: false, metadata: room.metadata, gameSessionId: room.gameSessionId });
    client.connect();
    return { ok: true, client };
  }

  connect() {
    if (this._room) return;
    this._room = this.platform.connectRoom(this.roomId, {
      onRoster: (room) => this._onRoster(room),
      onEvent: (kind, fields) => { if (kind === 'lobby' && fields && typeof fields.automata === 'number') { this.automata = fields.automata; this._emit('onLobby', this); } },
      onAuthLost: () => this._emit('onAuthLost'),
      onUnavailable: (code) => { if (!this.sessionId) this._close(code); },
    });
    if (this._pending) this._bind(this._pending);
  }

  /** The seats the lobby lists: the humans, then the automata. */
  lobbySeats() {
    const list = this.players.map((p) => ({ name: p.name, ai: false, you: p.you, host: p.host }));
    for (let i = 0; i < this.automata && list.length < MAX_SEATS; i++) list.push({ name: 'Automaton ' + (i + 1), ai: true, you: false, host: false });
    return list;
  }

  _onRoster(room) {
    if (room.gameSessionId && !this.sessionId) this._bind(room.gameSessionId);
    else if (room.status === 'playing' && !room.gameSessionId && !this.sessionId) { this._close('no-session'); return; }
    else if (room.status === 'closed' && !this.sessionId) { this._close('closed'); return; }
    const me = this.platform.userId;
    this.players = [...room.participants].filter((p) => !p.isAi).sort((a, b) => a.slot - b.slot)
      .map((p) => ({ name: p.displayName || p.username || 'Player', you: !!me && p.userId === me, host: !!p.isHost }));
    const host = room.participants.find((p) => p.isHost);
    if (host && me) this.isHost = host.userId === me;
    if (this.isHost && this.phase === 'lobby') this._room?.sendEvent?.('lobby', { automata: this.automata });
    this._emit('onLobby', this);
  }

  /** Host: one more automaton seat (kept in the room's metadata for the script). */
  async addAutomaton() {
    if (!this.isHost || this.phase !== 'lobby') return { ok: false, error: 'not-host' };
    if (this.lobbySeats().length >= MAX_SEATS) return { ok: false, error: 'full' };
    this.automata += 1;
    const res = await this.platform.updateRoom(this.roomId, { metadata: { ...this.metadata, automata: this.automata } }, this.revision);
    if (!res.ok) { this.automata -= 1; return { ok: false, error: res.error || 'update-failed' }; }
    this.revision = res.data.revision;
    this.metadata = { ...this.metadata, automata: this.automata };
    this._room?.sendEvent?.('lobby', { automata: this.automata });
    this._emit('onLobby', this);
    return { ok: true };
  }

  /** Host: start the room; the platform binds server.js's session to it. */
  async start() {
    if (!this.isHost) return { ok: false, error: 'not-host' };
    if (this.lobbySeats().length < MIN_SEATS) return { ok: false, error: 'too-few' };
    if (this.phase !== 'lobby') return { ok: true };
    this.phase = 'starting';
    const res = await this.platform.startRoom(this.roomId);
    if (!res.ok) { this.phase = 'lobby'; return { ok: false, error: res.error || 'could-not-start' }; }
    if (!res.data.gameSessionId) { this._close('no-session'); return { ok: false, error: 'no-session' }; }
    this._bind(res.data.gameSessionId);
    return { ok: true };
  }

  _bind(sessionId) {
    if (this._game) return;
    this.sessionId = sessionId;
    this.phase = 'playing';
    this._game = this.platform.connectGame(sessionId, {
      onOpen: () => this._game && this._game.send({ type: 'sync' }),
      onMessage: (data) => this._onGame(data),
      onError: (message) => this._emit('onReject', String(message || 'rejected')),
      onAuthLost: () => this._emit('onAuthLost'),
      onUnavailable: (code) => { if (!this.over) this._close(code); },
    });
  }

  _onGame(msg) {
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'rejected') { this._emit('onReject', String(msg.reason || 'rejected')); return; }
    if (msg.type !== 'council' || !msg.state || !Array.isArray(msg.state.players)) return;
    const first = !this.state;
    const prevTotal = this.logTotal;
    this.state = msg.state;
    this.you = msg.you;
    this.seats = Array.isArray(msg.seats) ? msg.seats : [];
    this.visual = Number(msg.visual) || 1;
    this.logTotal = Number(msg.logTotal) || 0;
    const fresh = first ? [] : msg.state.log.slice(-Math.max(0, Math.min(msg.state.log.length, this.logTotal - prevTotal)));
    if (first) this._emit('onStart', this);
    this._emit('onState', this.state, fresh);
    if (msg.over && !this.over) {
      this.over = msg.over;
      this.phase = 'over';
      this._emit('onOver', this.result());
    }
  }

  /** The legal actions of our seat in the current view. */
  legal() { return this.state && this.you && !this.over ? legalActions(this.state, this.you) : []; }

  /** Sends our action to the script (checked against our view first). */
  act(fields) {
    if (!this._game || !this.state || this.over) return { ok: false, reason: 'not_connected' };
    const ok = this.legal().some((a) => a.type === fields.type && ['room', 'task', 'target', 'body', 'choice'].every((k) => a[k] === fields[k]));
    if (!ok) return { ok: false, reason: 'not_a_legal_target' };
    if (!this._game.send({ type: 'act', action: fields })) return { ok: false, reason: 'not_connected' };
    return { ok: true };
  }

  /** Our seat's result in the shape the results screen reads (as SoloSession.result()). */
  result() {
    const o = this.over;
    if (!o) return null;
    const i = this.seats.findIndex((s) => s.playerId === this.you);
    const seat = o.seats[i] || o.seats[0];
    return {
      winner: o.winner, winReason: o.reason, playerRole: seat.role, playerWon: !!seat.won, score: seat.score,
      hash: 0, ticks: o.ticks, elapsed: o.elapsedTicks, hosted: true, recorded: !!o.recorded,
      seats: o.seats.map((s, j) => ({ name: s.name, ai: s.ai, role: s.role, won: s.won, total: s.score.total, you: j === i })),
    };
  }

  _close(code) {
    if (this.phase === 'closed') return;
    this.phase = 'closed';
    this._shut();
    this._emit('onUnavailable', code);
  }

  _shut() {
    try { this._game?.close(); } catch { /* gone */ }
    try { this._room?.close(); } catch { /* gone */ }
    this._game = null;
    this._room = null;
  }

  /** Leaves the room (a seat in play is played by the script's AI from then on). */
  leave() {
    this.phase = 'closed';
    this._shut();
    this.platform.leaveRoom(this.roomId).catch(() => {});
  }
}
