'use strict';
// StarHermit realtime rooms client (host-routed). Lobby/matchmaking is REST
// (create / quick-join / open / result / leave / mine); the transport is
// ws(s)://<host>/ws/v1/realtime?roomId=<id>&access_token=<t>. The platform
// prefixes every routed binary frame with a 16-byte sender participant id
// (stripped here); guest frames reach the host only, host frames reach
// everyone. 8 KB/frame binary cap, 30 msg/s guest cap; JSON text control
// frames stay <=4 KB (guests: ready/chat only).
//
// The game's EXISTING hosted JSON messages ride the channel unchanged: guests
// send their {type:'command'} messages as binary JSON, the host runs the same
// SoloSession rules engine server.js uses (browser-side) and broadcasts
// {type:'started'|'state'|'snapshot'|'results'} as binary JSON (state logs are
// trimmed for transport — the UI only renders the tail). Lobby snapshots are
// small text JSON. Roles trust model is unchanged from server.js: the full
// state travels to every seat.

import { SoloSession } from './session.js';

const SENDER_PREFIX = 16;          // bytes, platform participant id prefix
const MAX_BINARY_FRAME = 8192;     // 8 KB cap per binary frame
const MAX_TEXT_FRAME = 4096;       // JSON control frames stay <=4 KB
const GUEST_INPUT_INTERVAL = 40;   // <=30 msg/s
const TRANSPORT_LOG_TAIL = 16;     // state.log entries carried over the wire
const MAX_SEATS = 12;
const MIN_SEATS_TO_START = 4;

function trimStateForWire(state) {
  if (!state || !Array.isArray(state.log) || state.log.length <= TRANSPORT_LOG_TAIL) return state;
  return Object.assign({}, state, { log: state.log.slice(-TRANSPORT_LOG_TAIL) });
}

function encodeGameMsg(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  if (bytes.byteLength > MAX_BINARY_FRAME) return null;
  return bytes;
}

function participantIdHex(bytes) {
  let s = '';
  for (const b of bytes) s += b.toString(16).padStart(2, '0');
  return s;
}

export class RoomsClient {
  /**
   * hooks: { onMessage(msg)   — game messages, same shapes as the legacy
   *                             server.js protocol (room/started/state/
   *                             snapshot/results/host_left/error),
   *         onCaption(text)    — short status lines for the HUD caption,
   *         onAuthorityState(state, events)   — host only: the authority
   *                             advanced (drives the host UI directly),
   *         onAuthorityReject(reason)         — host only: authority reject }
   */
  constructor(platform, hooks) {
    this.platform = platform;      // provides token, gameSlug, sub, displayName, profileFor
    this.hooks = hooks || {};
    this.ws = null;
    this.connected = false;
    this.room = null;              // platform room id
    this.isHost = false;
    this.myParticipantId = null;   // learned from roster pushes
    this.seats = [];               // [{id, name, ai, ready, userId?, participantId?}]
    this.sim = null;               // host-side SoloSession authority
    this._reconnects = 0;
    this._lastInputAt = 0;
    this._hostParticipantId = null;  // guest: participant id of the room host
  }

  get active() { return !!this.room; }
  get inGame() { return !!this.sim; }
  get myName() { return this.platform.displayName || 'Player'; }

  _caption(text) { this.hooks.onCaption?.(text); }

  _api(path, opts) { return this.platform.api(path, opts); }

  _emit(msg) { this.hooks.onMessage?.(msg); }

  // --- lobby (REST) ----------------------------------------------------------

  /** Host: create a council room and open it for quick-join. */
  async createRoom() {
    const res = await this._api('/api/v1/realtime/rooms', {
      method: 'POST',
      body: JSON.stringify({
        teamCount: 1,
        seatsPerTeam: MAX_SEATS,
        aiPlayers: 0,
        metadata: { gameSlug: this.platform.gameSlug, mode: 'council' },
      }),
    });
    if (!res.ok) throw new Error('rooms-unavailable');
    const room = await res.json();
    this.room = room?.id ?? room?.roomId ?? null;
    if (!this.room) throw new Error('rooms-unavailable');
    this.isHost = true;
    this.seats = [{ id: 'seat:host', name: this.myName, ai: false, ready: true, userId: this.platform.sub, participantId: this.myParticipantId || undefined }];
    await this._api(`/api/v1/realtime/rooms/${encodeURIComponent(this.room)}/open`, { method: 'POST' })
      .catch((e) => { /* open is best-effort; create still seated us */ });
    await this._connectWs();
    this._broadcastRoom();
  }

  /** Guest: quick-join any open council for this game (404 = none open). */
  async quickJoin() {
    const res = await this._api('/api/v1/realtime/rooms/quick-join', {
      method: 'POST',
      body: JSON.stringify({ gameSlug: this.platform.gameSlug, seats: 1 }),
    });
    if (res.status === 404) {
      this._caption('No open councils — create one and others can quick-join.');
      return false;
    }
    if (!res.ok) throw new Error('rooms-unavailable');
    const room = await res.json();
    this.room = room?.roomId ?? room?.id ?? room?.room?.id ?? null;
    if (!this.room) throw new Error('rooms-unavailable');
    this.isHost = false;
    this.seats = [];
    await this._connectWs();
    this._sendControl({ op: 'ready' });   // guests: ready/chat only
    return true;
  }

  /** Friends list (used by the lobby if invites are offered later). */
  async friends() {
    try {
      const res = await this._api('/api/v1/me/friends');
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : (data?.friends ?? []);
    } catch (e) {
      return [];
    }
  }

  // --- transport ---------------------------------------------------------------

  _wsUrl() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    return `${proto}://${location.host}/ws/v1/realtime?roomId=${encodeURIComponent(this.room)}&access_token=${encodeURIComponent(this.platform.token)}`;
  }

  _connectWs() {
    if (this.ws && this.ws.readyState <= 1) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this._wsUrl());
      ws.binaryType = 'arraybuffer';
      const fail = () => reject(new Error('connect-failed'));
      ws.onerror = fail;
      ws.onclose = () => {
        const was = this.connected;
        this.connected = false;
        if (was && this.room) this._scheduleReconnect();
      };
      ws.onopen = () => {
        this.connected = true;
        this._reconnects = 0;
        this.ws = ws;
        if (!this.isHost) this._sendControl({ op: 'ready' });
        resolve();
      };
      ws.onmessage = (e) => this._onMessage(e);
    });
  }

  _scheduleReconnect() {
    if (this._reconnects >= 5) {
      this._emit({ type: 'error', error: 'connection lost' });
      return;
    }
    const delay = Math.min(8000, 500 * 2 ** this._reconnects++);
    this._caption('Reconnecting…');
    setTimeout(() => {
      this._api('/api/v1/realtime/rooms/mine')
        .then(async (res) => {
          if (!res.ok) throw new Error(String(res.status));
          const m = await res.json();
          const rid = m?.roomId ?? m?.id ?? m?.room?.id ?? null;
          if (!rid) throw new Error('not-in-room');
          this.room = rid;
          await this._connectWs();
          this._caption('Reconnected.');
          if (this.isHost && this.sim) this._broadcastState();   // catch guests up
        })
        .catch((e) => this._scheduleReconnect());
    }, delay);
  }

  _sendControl(obj) {
    const text = JSON.stringify(obj);
    if (text.length > MAX_TEXT_FRAME) return;
    if (this.ws?.readyState === 1) this.ws.send(text);
  }

  _sendGameMsg(obj) {
    const bytes = encodeGameMsg(obj);
    if (!bytes) { this._caption('Message too large for the room channel.'); return; }
    if (this.ws?.readyState === 1) this.ws.send(bytes);
  }

  /** Guest: send an existing game command message to the host (binary JSON). */
  sendCommand(cmd) {
    if (this.isHost) return;
    const now = Date.now();
    if (now - this._lastInputAt < GUEST_INPUT_INTERVAL) return;   // <=30 msg/s
    this._lastInputAt = now;
    this._sendGameMsg({ type: 'command', command: cmd });
  }

  leave() {
    const room = this.room;
    this._stopSim();
    this.seats = [];
    this._hostParticipantId = null;
    this.room = null;
    this.isHost = false;
    try { this.ws?.close(); } catch (e) { /* already closed */ }
    this.ws = null;
    this.connected = false;
    if (room) {
      this._api(`/api/v1/realtime/rooms/${encodeURIComponent(room)}/leave`, { method: 'POST' })
        .catch((e) => { /* the room TTL releases the seat anyway */ });
    }
  }

  // --- lobby actions -------------------------------------------------------------

  /** Host: add an automaton seat (the host's SoloSession drives its AI). */
  addAi() {
    if (!this.isHost || this.sim) return;
    if (this.seats.length >= MAX_SEATS) { this._caption('The council is full.'); return; }
    const n = this.seats.filter((s) => s.ai).length + 1;
    this.seats.push({ id: 'ai:' + n, name: 'Automaton ' + n, ai: true, ready: true });
    this._broadcastRoom();
  }

  /** Guest: announce readiness (also re-sent by the Ready button). */
  setReady() {
    if (!this.isHost) this._sendControl({ op: 'ready' });
  }

  /** Host: begin the authoritative session once the council has enough seats. */
  start() {
    if (!this.isHost || this.sim) return;
    if (this.seats.length < MIN_SEATS_TO_START) {
      this._caption('Need at least ' + MIN_SEATS_TO_START + ' seats to convene the council.');
      return;
    }
    const seed = (Math.random() * 2 ** 31) >>> 0;
    const names = this.seats.map((s) => s.name);
    const hooks = this.hooks;
    this.sim = new SoloSession(
      { id: 'hosted', seed, config: { seed, playerCount: this.seats.length, saboteurCount: 1, taskCount: 8, names } },
      {
        aiDelayMs: 450,
        onState: (s, e) => { this._broadcastState(); hooks.onAuthorityState?.(s, e); },
        onReject: (cmd, reason) => hooks.onAuthorityReject?.(reason),
        onEnd: (result) => this._finish(result),
      },
    );
    // Seat flags: human seats are the host + guests; automata run the built-in AI.
    this.sim.state.players.forEach((p, i) => { p.ai = !!this.seats[i].ai; });
    this.sim.humanId = 'p0';   // the host always sits p0
    // The platform routes host frames to everyone else; the host consumes its
    // own 'started' locally through the same guest code path.
    const started = { type: 'started', state: trimStateForWire(this.sim.state), seats: this._startedSeats() };
    this._sendGameMsg(started);
    this._onGuestGameMsg(started);
  }

  _startedSeats() {
    return this.seats.map((s, i) => ({
      id: s.id, name: s.name, ai: !!s.ai, playerId: 'p' + i,
      userId: s.userId, participantId: s.participantId,
    }));
  }

  _broadcastRoom() {
    // Seats only exist while their participant is connected (roster-driven),
    // so a listed seat is ready; the Ready button is a courtesy re-announce.
    const snap = {
      type: 'room',
      code: String(this.room || '').slice(0, 6).toUpperCase(),
      roomId: this.room,
      seats: this.seats.map((s) => ({ id: s.id, name: s.name, ai: !!s.ai, ready: true })),
      you: this.isHost ? 'seat:host' : this._mySeatId(),
    };
    this._sendControl(snap);
    this._emit(snap);
  }

  _mySeatId() {
    const sub = this.platform.sub;
    const seat = this.seats.find((s) => s.userId && sub && s.userId === sub)
      || this.seats.find((s) => s.participantId && this.myParticipantId && s.participantId === this.myParticipantId);
    return seat ? seat.id : null;
  }

  _broadcastState() {
    if (!this.sim) return;
    this._sendGameMsg({ type: 'state', state: trimStateForWire(this.sim.state) });
  }

  _finish(result) {
    const sim = this.sim;
    if (!sim) return;
    this._stopSim();
    const msg = { type: 'results', state: trimStateForWire(sim.state), result };
    this._sendGameMsg(msg);
    if (this.isHost) this._onGuestGameMsg(msg);   // local path, same as guests
    if (this.room) {
      this._api(`/api/v1/realtime/rooms/${encodeURIComponent(this.room)}/result`, {
        method: 'POST',
        body: JSON.stringify({ result: { winner: result?.winner ?? null, score: result?.score?.total ?? null } }),
      }).catch((e) => { /* the broadcast already delivered the outcome */ });
    }
  }

  _stopSim() {
    if (this.sim) { this.sim.stopAi(); this.sim = null; }
  }

  /** Host: apply a guest command authoritatively; a rejection is answered with
   *  a silent state refresh (host frames reach everyone, so a targeted
   *  'rejected' would leak information, e.g. not_saboteur). */
  _applyGuestCommand(cmd) {
    if (!this.sim || !cmd || typeof cmd !== 'object') return;
    const res = this.sim.commit(cmd);
    if (!res.ok) this._broadcastState();
  }

  // --- receive -------------------------------------------------------------------

  _onMessage(e) {
    if (typeof e.data === 'string') return this._onControl(e.data);
    const buf = new Uint8Array(e.data);
    if (buf.byteLength <= SENDER_PREFIX) return;
    const sender = participantIdHex(buf.slice(0, SENDER_PREFIX));
    const payload = buf.slice(SENDER_PREFIX);
    if (payload.byteLength > MAX_BINARY_FRAME) return;
    let msg;
    try { msg = JSON.parse(new TextDecoder().decode(payload)); } catch (err) { return; }
    if (!msg || typeof msg !== 'object') return;
    if (this.isHost) this._onHostGameMsg(sender, msg);
    else this._onGuestGameMsg(msg);
  }

  _onGuestGameMsg(msg) {
    if (msg.type === 'started') this._resolveYou(msg);
    if (msg.type === 'room') this._resolveYou(msg);
    this._emit(msg);
  }

  /** Tag our own seat (you:true) so the app's existing seat lookup works. */
  _resolveYou(msg) {
    const sub = this.platform.sub;
    const seats = Array.isArray(msg.seats) ? msg.seats : [];
    const mine = seats.find((s) => s.userId && sub && s.userId === sub)
      || seats.find((s) => s.participantId && this.myParticipantId && s.participantId === this.myParticipantId);
    for (const s of seats) s.you = !!(mine && s === mine);
    if (mine) msg.you = mine.id;
  }

  _onHostGameMsg(sender, msg) {
    if (msg.type === 'command' && msg.command) this._applyGuestCommand(msg.command);
  }

  _onControl(text) {
    if (text.length > MAX_TEXT_FRAME) return;
    let msg;
    try { msg = JSON.parse(text); } catch (e) { return; }
    if (!msg || typeof msg !== 'object') return;
    if (typeof msg.op === 'string') return this._onOp(msg);
    const list = msg.participants ?? msg.roster ?? msg.members ?? (Array.isArray(msg) ? msg : null);
    if (Array.isArray(list)) this._onRoster(list);
    if (typeof msg.type === 'string') {
      // Host lobby snapshots reach guests as text; host already emitted locally.
      if (msg.type === 'room' && !this.isHost) this._onGuestGameMsg(msg);
      else if (msg.type === 'error') this._emit(msg);
    }
  }

  _onOp(msg) {
    switch (msg.op) {
      case 'ready':
        if (this.isHost) {
          // A guest re-announced itself (join or reconnect): catch a running
          // game up; otherwise refresh the lobby snapshot it may have missed.
          if (this.sim) {
            this._sendGameMsg({ type: 'snapshot', state: trimStateForWire(this.sim.state), away: [] });
          } else {
            this._broadcastRoom();
          }
        }
        break;
      case 'chat': {  // host relays chat to everyone with attribution
        const clean = String(msg.text ?? '').slice(0, 200).trim();
        if (!clean) return;
        if (this.isHost) this._sendControl({ op: 'chat', from: 'Councillor', text: clean });
        this._emit({ type: 'chat', from: 'Councillor', text: clean });
        break;
      }
      case 'error':
        this._emit({ type: 'error', error: msg.error || 'room error' });
        break;
      default:
        break;
    }
  }

  /** Roster/presence pushes (platform shape, parsed defensively). */
  async _onRoster(list) {
    const entries = list.filter((p) => p && typeof p === 'object');
    // Learn our own participant id (self flag or userId match).
    const sub = this.platform.sub;
    const self = entries.find((p) => p.you || p.self)
      || entries.find((p) => (p.userId ?? p.user_id) && sub && (p.userId ?? p.user_id) === sub);
    if (self) {
      const pid = self.participantId ?? self.id ?? null;
      if (pid != null) this.myParticipantId = String(pid);
    }
    if (!this.isHost) {
      // Track the host's participant id (explicit flag when the platform
      // provides one; otherwise the first non-self participant we saw — the
      // host created the room, so they are always present before we join).
      if (!this._hostParticipantId) {
        const hostEntry = entries.find((p) => p.host || p.isHost);
        if (hostEntry) this._hostParticipantId = String(hostEntry.participantId ?? hostEntry.id ?? '');
        else {
          const other = entries.find((p) => {
            const pid = String(p.participantId ?? p.id ?? '');
            const uid = (p.userId ?? p.user_id) != null ? String(p.userId ?? p.user_id) : null;
            return pid && pid !== this.myParticipantId && !(uid && sub && uid === sub);
          });
          if (other) this._hostParticipantId = String(other.participantId ?? other.id ?? '');
        }
      }
      if (this._hostParticipantId && !entries.some((p) => String(p.participantId ?? p.id ?? '') === this._hostParticipantId)) {
        this._emit({ type: 'host_left' });
        this.leave();
      }
      return;
    }
    // Host: mirror platform participants onto lobby seats (drop disconnected).
    if (this.myParticipantId) {
      const hostSeat = this.seats.find((s) => s.id === 'seat:host');
      if (hostSeat) hostSeat.participantId = this.myParticipantId;
    }
    const seen = new Set();
    for (const p of entries) {
      const pid = String(p.participantId ?? p.id ?? '');
      if (!pid) continue;
      const userId = (p.userId ?? p.user_id) != null ? String(p.userId ?? p.user_id) : null;
      if (userId && sub && userId === sub) { this.myParticipantId = pid; continue; }  // that's us
      seen.add(pid);
      let seat = this.seats.find((s) => s.participantId === pid);
      if (!seat) {
        const nick = (p.nickname ?? p.name ?? p.displayName) || null;
        seat = {
          id: 'seat:' + pid,
          name: nick || (userId ? `Player ${userId.slice(0, 8)}` : 'Councillor ' + (this.seats.length + 1)),
          ai: false, ready: true,
          userId: userId || undefined,
          participantId: pid,
        };
        this.seats.push(seat);
        if (userId) {
          // Upgrade to the platform nickname when the profile resolves.
          this.platform.profileFor(userId).then((nickResolved) => {
            if (nickResolved && seat.name !== nickResolved) { seat.name = nickResolved; if (!this.sim) this._broadcastRoom(); }
          }).catch((e) => { /* keep the placeholder name */ });
        }
      }
    }
    const before = this.seats.length;
    this.seats = this.seats.filter((s) => s.ai || s.id === 'seat:host' || seen.has(s.participantId));
    if (!this.sim && before !== this.seats.length) this._broadcastRoom();
  }
}
