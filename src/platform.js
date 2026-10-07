'use strict';
// StarHermit platform adapter over the shared SDK (starhermit-sdk.js, loaded
// before bundle.js as window.StarHermit). The SDK reads the launch token
// (#game_token= or the #access_token= sign-in return), strips it, renews it,
// and owns every platform REST call this adapter makes: profile/avatar, the
// cloud-save slot game:<slug>, the per-player settings KV, key bindings, the
// invite link and the read-only leaderboard. Hosted realtime rooms (net.js)
// go through api(), an authenticated passthrough on the SDK's current token.
// Without a token every method is a no-op and nothing touches the network.

export class Platform {
  /** sdk: a StarHermit instance (tests pass one built with SDK.create()). */
  constructor(sdk) {
    this.sh = sdk || (typeof window !== 'undefined' ? window.StarHermit : null) || null;
    if (this.sh) this.sh.init();
    this.nickname = null;              // resolved async from the profile route
    this.avatar = null;                // object URL of the account avatar
    this.syncStatus = this.hosted ? 'synced' : 'offline';   // offline | saving | synced
    this.onSync = null;                // fn(status) — sync status display hook
    this.onAuth = null;                // fn(signedIn, reason) — sign-out after a refused renewal ('expired')
    if (this.sh) {
      this.sh.on('saved', (ok) => this._setSync(ok ? 'synced' : 'offline'));
      this.sh.on('auth', (a) => {
        if (!a.signedIn) { this.nickname = null; this.avatar = null; this.syncStatus = 'offline'; }
        this.onAuth?.(a.signedIn, a.reason);
      });
      if (this.hosted && typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('pagehide', () => this.flush());
        document.addEventListener('visibilitychange', () => { if (document.hidden) this.flush(); });
      }
    }
  }

  /** Current launch token (renewed by the SDK), or null. */
  get token() { return this.sh && this.sh.token || null; }
  get sub() { return this.sh && this.sh.userId ? String(this.sh.userId) : null; }
  get gameSlug() { return this.sh && this.sh.slug || null; }

  /** True when a platform launch token is in memory. */
  get hosted() { return !!(this.sh && this.sh.signedIn); }

  /** True on <id>.starhermit.com without a token: offer "Sign in with StarHermit". */
  canSignIn() { return !!(this.sh && this.sh.canSignIn()); }
  signIn() { return !!(this.sh && this.sh.signIn()); }

  /** Display name: profile nickname, else "Player " + id prefix. Null when anonymous. */
  get displayName() {
    if (this.nickname) return this.nickname;
    return this.sub ? 'Player ' + this.sub.slice(0, 6) : null;
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

  /** Raw authenticated fetch (realtime rooms in net.js). Throws when offline. */
  async api(path, opts = {}) {
    if (!this.token) throw new Error('offline');
    const headers = Object.assign({}, opts.headers || {});
    headers.authorization = `Bearer ${this.token}`;
    if (opts.body && !headers['content-type']) headers['content-type'] = 'application/json';
    return fetch((this.sh.base || '') + path, Object.assign({}, opts, { headers }));
  }

  /** Realtime-room socket URL with the current token. */
  realtimeSocketUrl(roomId) { return this.sh.realtime.socketUrl(roomId); }

  /**
   * Call before reopening a realtime socket: resolves 'renewed' (rebuild the
   * URL from the current token), 'retry' (renewal failed transiently — back
   * off, do not reopen the old URL) or 'relaunch' (token dead; signed out).
   */
  renewForReconnect() {
    return this.sh && this.sh.renewForReconnect ? this.sh.renewForReconnect() : Promise.resolve('relaunch');
  }

  /** Back to the launcher / sign-in for a fresh token. Call from a click. */
  relaunch() { return !!(this.sh && this.sh.relaunch && this.sh.relaunch()); }

  /** Re-mint the launch token now (the SDK also does this on its own schedule). */
  refreshToken() { return this.sh ? this.sh.refresh() : Promise.resolve(null); }

  /** Resolve a user id to a display nickname (cached; never a username). */
  async profileFor(userId) {
    const p = this.sh ? await this.sh.profile(userId) : null;
    return p ? p.displayName : `Player ${String(userId).slice(0, 6)}`;
  }

  /** Load the signed-in player's nickname and avatar. Never /api/v1/me. */
  async fetchProfile() {
    if (!this.sub) return null;
    this.nickname = await this.profileFor(this.sub);
    this.sh.avatarUrl().then((url) => { if (url) { this.avatar = url; this.onSync?.(this.syncStatus); } });
    return this.nickname;
  }

  /**
   * Post a finished round's total to the platform leaderboard through the
   * game's score script (StarHermit.submitScores). Resolves { posted, rank }:
   * rank on the high-score board, or null.
   */
  async submitScore(total) {
    if (!this.hosted || typeof this.sh.submitScores !== 'function') return { posted: false, rank: null };
    const keys = await this.sh.submitScores({ 'high-score': total });
    if (!keys.includes('high-score')) return { posted: false, rank: null };
    try {
      const r = await this.sh.leaderboard('high-score', { pageSize: 100 });
      const me = ((r && r.items) || []).find((i) => String(i.userId) === this.sub);
      return { posted: true, rank: me ? me.rank : null };
    } catch (e) { return { posted: true, rank: null }; }
  }

  /** Platform leaderboard read (the first board: high-score). */
  async fetchPlatformLeaderboard({ page = 1, pageSize = 10, scope } = {}) {
    if (!this.hosted) return null;
    try {
      const data = await this.sh.leaderboard(null, { page, pageSize, scope });
      const base = { me: null, leaderboardId: data.board ? data.board.id : null, entries: [] };
      for (const r of data.items || []) {
        const userId = r?.userId ?? null;
        base.entries.push({
          userId,
          name: userId ? await this.profileFor(userId) : (r?.name ?? 'Player'),
          score: r?.score ?? 0,
          rank: r?.rank ?? null,
          you: !!userId && userId === this.sub,
        });
        if (userId && userId === this.sub) base.me = r;
      }
      return base;
    } catch (e) {
      return null;   // unreachable: caller shows local records only
    }
  }

  // --- cloud save (mirror of the checksummed local save doc) -------------------

  /**
   * Load the remote save slot. Returns the raw envelope ({v, data, sum}) or
   * null when there is none / it is invalid / unreachable.
   */
  async cloudLoad() {
    if (!this.hosted) return null;
    const doc = await this.sh.loadJSON();
    if (!doc || doc.v !== 1 || typeof doc.sum !== 'number' || !doc.data) return null;
    this._setSync('synced');
    return doc;
  }

  /** Mirror the local save doc to the cloud slot (debounced ~2 s, flushed on pagehide). */
  syncSave(doc) {
    if (!this.hosted) return;
    this._setSync('saving');
    this.sh.saveJSON(doc);
  }

  flush() { return this.hosted ? this.sh.flushSave(true) : Promise.resolve(false); }

  /** Boot handshake for hosted mode: profile first, then the remote save doc. */
  async initHosted() {
    if (!this.hosted) return null;
    try { await this.fetchProfile(); } catch (e) { /* nickname falls back to Player id */ }
    try { return await this.cloudLoad(); } catch (e) { return null; }
  }

  // --- settings KV, key bindings, invite link -----------------------------------

  getSettings() { return this.hosted ? this.sh.getSettings() : Promise.resolve({}); }
  patchSettings(obj) { if (this.hosted) this.sh.patchSettings(obj); }
  loadBindings(defaults) {
    return this.hosted ? this.sh.loadBindings(defaults) : Promise.resolve(JSON.parse(JSON.stringify(defaults)));
  }
  inviteLink() { return this.hosted ? this.sh.inviteLink() : null; }
}
