'use strict';
// StarHermit platform adapter. Hosted mode activates only when a launch token
// was read from the URL: fragment #game_token=<jwt> (read once, then stripped
// via history.replaceState; query ?token=/&launch=/&launch_token= remain as
// local-dev fallbacks). The JWT payload (base64url decode, no verify) carries
// sub (user id) and game_scope (this game's slug — never hard-coded here).
// The token lives in memory only and is re-minted every 45 min via
// POST /api/v1/games/{slug}/launch-token. REST calls carry
// `Authorization: Bearer`; the realtime transport uses ?access_token=.
// Cloud save is a mirror of the checksummed local save doc: localStorage stays
// the offline cache, the platform slot is remote-preferred on conflict.

// ---------------------------------------------------------------------------
// Minimal ZIP writer/reader (stored entries only, no compression).
// Cloud saves travel as ONE zip+base64 slot; saves are small JSON.
// ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function zipStore(name, dataBytes) {
  const enc = new TextEncoder();
  const nameB = enc.encode(name);
  const crc = crc32(dataBytes);
  const out = [];
  const u16 = (v) => out.push(v & 0xff, (v >> 8) & 0xff);
  const u32 = (v) => out.push(v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >>> 24) & 0xff);
  u32(0x04034b50); u16(20); u16(0); u16(0); u16(0); u16(0);
  u32(crc); u32(dataBytes.length); u32(dataBytes.length);
  u16(nameB.length); u16(0);
  const local = out.length;
  const head = new Uint8Array(out);
  const cd = [];
  const c16 = (v) => cd.push(v & 0xff, (v >> 8) & 0xff);
  const c32 = (v) => cd.push(v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >>> 24) & 0xff);
  c32(0x02014b50); c16(20); c16(20); c16(0); c16(0); c16(0); c16(0);
  c32(crc); c32(dataBytes.length); c32(dataBytes.length);
  c16(nameB.length); c16(0); c16(0); c16(0); c16(0); c32(0); c32(0); // attrs + local-header offset
  const cdHead = new Uint8Array(cd);
  const cdOff = head.length + nameB.length + dataBytes.length;
  const parts = [head, nameB, dataBytes, cdHead, nameB];
  const eocd = [];
  const e32 = (v) => eocd.push(v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >>> 24) & 0xff);
  const e16 = (v) => eocd.push(v & 0xff, (v >> 8) & 0xff);
  e32(0x06054b50); e16(0); e16(0); e16(1); e16(1);
  e32(cdHead.length + nameB.length); e32(cdOff); e16(0);
  parts.push(new Uint8Array(eocd));
  const total = parts.reduce((n, p) => n + p.length, 0);
  const buf = new Uint8Array(total);
  let o = 0;
  for (const p of parts) { buf.set(p, o); o += p.length; }
  return buf;
}
function unzipFirstEntry(zipBytes) {
  // Stored single-entry reader: scan local headers for compression 0.
  const dv = new DataView(zipBytes.buffer, zipBytes.byteOffset, zipBytes.byteLength);
  let off = 0;
  while (off + 30 <= zipBytes.length && dv.getUint32(off, true) === 0x04034b50) {
    const method = dv.getUint16(off + 8, true);
    const size = dv.getUint32(off + 18, true);
    const nameLen = dv.getUint16(off + 26, true);
    const extraLen = dv.getUint16(off + 28, true);
    const dataOff = off + 30 + nameLen + extraLen;
    if (method !== 0) throw new Error('unsupported zip entry');
    return zipBytes.slice(dataOff, dataOff + size);
  }
  throw new Error('bad zip');
}
function bytesToBase64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000)
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
function base64ToBytes(b64) {
  const s = atob(b64);
  const b = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
  return b;
}

// ---------------------------------------------------------------------------
// Launch token
// ---------------------------------------------------------------------------

/** Read the launch token once, then strip it from the URL. Returns null offline. */
function readLaunchToken() {
  if (typeof location === 'undefined' || typeof history === 'undefined') return null;
  if (location.hash.length > 1) {
    try {
      const params = new URLSearchParams(location.hash.slice(1));
      const token = params.get('game_token');
      if (token) {
        params.delete('game_token');
        params.delete('session_id');
        const rest = params.toString();
        history.replaceState(null, '', location.pathname + location.search + (rest ? `#${rest}` : ''));
        return token;
      }
    } catch (e) { /* malformed fragment; fall through to query */ }
  }
  // Local-dev fallbacks only — the platform always delivers the fragment.
  try {
    const q = new URLSearchParams(location.search);
    const token = q.get('token') ?? q.get('launch') ?? q.get('launch_token');
    if (token) history.replaceState(null, '', location.pathname + location.hash);
    return token;
  } catch (e) {
    return null;
  }
}

/** Decode a JWT payload segment (base64url) without verifying the signature. */
function decodeJwtPayload(token) {
  try {
    const seg = token.split('.')[1];
    const b64 = seg.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const claims = JSON.parse(json);
    return claims && typeof claims === 'object' ? claims : null;
  } catch (e) {
    return null;
  }
}

// Exported for tests.
export const _zip = { zipStore, unzipFirstEntry, bytesToBase64, base64ToBytes, decodeJwtPayload };

const REFRESH_MS = 45 * 60 * 1000;   // re-mint 15 min before the 60 min expiry
const RETRY_MS = 60 * 1000;
const CLOUD_DEBOUNCE_MS = 2000;

export class Platform {
  constructor() {
    // Hosted identity + cloud state (all in-memory; nothing persisted).
    this.token = readLaunchToken();
    this.claims = this.token ? decodeJwtPayload(this.token) : null;
    this.sub = typeof this.claims?.sub === 'string' ? this.claims.sub : null;
    this.gameSlug = typeof this.claims?.game_scope === 'string' ? this.claims.game_scope : null;
    this.nickname = null;              // resolved async from the profile route
    this.syncStatus = 'offline';       // offline | saving | synced
    this.onSync = null;                // fn(status) — sync status display hook
    this._profileCache = new Map();
    this._cloudTimer = null;
    this._refreshTimer = null;
    if (this.token) {
      this._scheduleRefresh(REFRESH_MS);
      this._installCloudFlush();
    }
  }

  /** True when a platform launch token is in memory. */
  get hosted() { return !!this.token; }

  /** Display name: profile nickname, else "Player " + id8. Null when anonymous. */
  get displayName() {
    if (this.nickname) return this.nickname;
    return this.sub ? 'Player ' + this.sub.slice(0, 8) : null;
  }

  /** Title-screen identity line; '' offline. */
  accountLine() {
    if (!this.hosted) return '';
    return `Playing as ${this.displayName ?? '…'} · ${this.syncLine()}`;
  }

  /** Small sync badge text for the profile slot. */
  syncLine() {
    const sync = { saving: 'saving…', synced: 'synced', offline: 'offline' }[this.syncStatus] ?? 'offline';
    return `cloud save ${sync}`;
  }

  _setSync(status) {
    if (this.syncStatus === status) return;
    this.syncStatus = status;
    this.onSync?.(status);
  }

  // --- hosted API ------------------------------------------------------------

  /** Fetch a platform API path with the launch token. Throws when offline. */
  async api(path, opts = {}) {
    if (!this.token) throw new Error('offline');
    const headers = Object.assign({}, opts.headers || {});
    headers.authorization = `Bearer ${this.token}`;
    if (opts.body && !headers['content-type']) headers['content-type'] = 'application/json';
    return fetch(path, Object.assign({}, opts, { headers }));
  }

  _scheduleRefresh(delayMs) {
    if (typeof setTimeout === 'undefined') return;
    clearTimeout(this._refreshTimer);
    this._refreshTimer = setTimeout(() => this.refreshToken(), delayMs);
    this._refreshTimer.unref?.();
  }

  /** Re-mint the scoped launch token; failures retry in ~60 s. */
  async refreshToken() {
    if (!this.token || !this.gameSlug) return;
    try {
      const res = await this.api(`/api/v1/games/${encodeURIComponent(this.gameSlug)}/launch-token`, { method: 'POST' });
      if (!res.ok) throw new Error(String(res.status));
      const body = await res.json();
      if (body && typeof body.token === 'string' && body.token) this.token = body.token;
      this._scheduleRefresh(REFRESH_MS);
    } catch (e) {
      this._scheduleRefresh(RETRY_MS);
    }
  }

  /**
   * Resolve a user id to a display nickname (cached). Never returns usernames;
   * falls back to "Player " + id8. Anonymous/offline callers get the fallback.
   */
  async profileFor(userId) {
    if (this._profileCache.has(userId)) return this._profileCache.get(userId);
    let rec = null;
    if (this.token) {
      try {
        const res = await this.api(`/api/v1/users/${encodeURIComponent(userId)}/profile`);
        if (res.ok) rec = await res.json();
      } catch (e) { /* offline; fall back below */ }
    }
    const nick = rec && typeof rec.nickname === 'string' && rec.nickname.trim()
      ? rec.nickname.trim()
      : `Player ${String(userId).slice(0, 8)}`;
    this._profileCache.set(userId, nick);
    return nick;
  }

  /** Load the signed-in player's profile into displayName. Never /api/v1/me. */
  async fetchProfile() {
    if (!this.sub) return null;
    this.nickname = await this.profileFor(this.sub);
    return this.nickname;
  }

  /** Read-only platform leaderboard (clients can never submit scores). */
  async fetchPlatformLeaderboard({ page = 0, pageSize = 10, friendsOnly = false } = {}) {
    if (!this.token || !this.gameSlug) return null;
    try {
      const g = await this.api(`/api/v1/games/${encodeURIComponent(this.gameSlug)}`);
      if (!g.ok) return null;
      const info = await g.json();
      const leaderboardId = info?.leaderboardId ?? null;
      const base = { me: info?.me ?? null, leaderboardId, entries: [] };
      if (!leaderboardId) return base;   // no board: caller shows local records only
      const qs = `?friendsOnly=${friendsOnly ? 'true' : ''}&page=${page}&pageSize=${pageSize}`;
      const e = await this.api(`/api/v1/leaderboards/${encodeURIComponent(leaderboardId)}/entries${qs}`);
      if (!e.ok) return base;
      const data = await e.json();
      const rows = Array.isArray(data) ? data : (data?.entries ?? []);
      base.entries = [];
      for (const r of rows) {
        const userId = r?.userId ?? r?.playerId ?? null;
        base.entries.push({
          userId,
          name: userId ? await this.profileFor(userId) : (r?.name ?? 'Player'),
          score: r?.score ?? 0,
          rank: r?.rank ?? null,
          you: !!userId && userId === this.sub,
        });
      }
      if (base.me == null && !Array.isArray(data)) base.me = data?.me ?? null;
      return base;
    } catch (e) {
      return null;   // offline / unreachable: caller shows local records only
    }
  }

  // --- cloud save (mirror of the checksummed local save doc) -------------------

  _installCloudFlush() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const flush = () => {
      if (!this._cloudTimer) return;
      clearTimeout(this._cloudTimer);
      this._cloudTimer = null;
      this._pushCloudSave(true);
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); });
  }

  _queueCloudSave() {
    if (!this.token || !this.gameSlug) return;
    this._setSync('saving');
    clearTimeout(this._cloudTimer);
    this._cloudTimer = setTimeout(() => {
      this._cloudTimer = null;
      this._pushCloudSave(false);
    }, CLOUD_DEBOUNCE_MS);
    this._cloudTimer.unref?.();
  }

  async _pushCloudSave(keepalive) {
    if (!this.token || !this.gameSlug || !this._saveDoc) return;
    try {
      const json = new TextEncoder().encode(JSON.stringify(this._saveDoc));
      const zip = zipStore('save.json', json);
      const res = await fetch(`/api/v1/me/cloud-saves/${encodeURIComponent(this.gameSlug)}`, {
        method: 'PUT',
        headers: { authorization: `Bearer ${this.token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ dataBase64: bytesToBase64(zip) }),
        keepalive,
      });
      this._setSync(res.ok ? 'synced' : 'offline');
    } catch (e) {
      this._setSync('offline');
    }
  }

  /**
   * Load the remote save slot. The remote doc wins on conflict (validated by
   * the envelope's own checksum); the caller merges and re-pushes. Returns the
   * raw envelope ({v, data, sum}) or null when there is none / unreachable.
   */
  async cloudLoad() {
    if (!this.token || !this.gameSlug) return null;
    const res = await this.api(`/api/v1/me/cloud-saves/${encodeURIComponent(this.gameSlug)}`);
    if (res.status === 404) { this._setSync('synced'); return null; }
    if (!res.ok) throw new Error(String(res.status));
    const zipBytes = new Uint8Array(await res.arrayBuffer());
    const doc = JSON.parse(new TextDecoder().decode(unzipFirstEntry(zipBytes)));
    if (!doc || doc.v !== 1 || typeof doc.sum !== 'number' || !doc.data) throw new Error('bad save doc');
    this._setSync('synced');
    return doc;
  }

  /**
   * Mirror the local save doc to the cloud slot. Called after every local
   * persist; debounced ~2 s, flushed on pagehide/visibilitychange.
   */
  syncSave(doc) {
    if (!this.hosted) return;
    this._saveDoc = doc;
    this._queueCloudSave();
  }

  /** Boot handshake for hosted mode: profile first, then the remote save doc. */
  async initHosted() {
    if (!this.hosted) return null;
    try { await this.fetchProfile(); } catch (e) { /* nickname falls back to Player id8 */ }
    try { return await this.cloudLoad(); } catch (e) { return null; /* local doc stays authoritative */ }
  }
}
