// The game's data and the StarHermit platform, on the runtime's modules:
// - progress is the browser build's save document (src/session.js:
//   profile, journey bests, sessions, wins, streaks, actions used,
//   achievements, lessons) as the game's save (starhermit:storage `saves`,
//   schema 1) on the device and, signed in, in the account's cloud slot; two
//   devices' copies merge as the browser build merged them (mergeSaves: best
//   score per stage, larger counts, unions). The slot the browser build wrote
//   (the JS SDK's saveJSON of its {v, data, sum} envelope, key game:<slug>)
//   shows as foreign: it is checked, merged in and replaced once;
// - the game's own options (visual theme, colour-vision palette,
//   left-handed rails, hold to confirm, hints) are `settings` (game.<key>,
//   synced with the account); the browser build's account settings (its
//   whole settings object, patched key by key, and the language helper's
//   ui.language) are migrated where the game still has the option, then
//   removed. Volumes, graphics, language, larger text, high contrast and
//   reduced motion are the runtime's Options;
// - the player, the invite link, the platform's clock (the Daily Chime's
//   UTC day), a finished ranked round's total posted through server.js (a
//   practice session whose socket carries { type: 'result', scores }, as the
//   JS SDK's submitScores did; the script range-checks it) with the rank and
//   the board's top ten;
// - hosted councils: realtime rooms for the lobby and the session the
//   platform binds to a started room, refereed by server.js (`roomsAdapter`
//   gives src/hosted.js that surface).
import type { JsonValue } from "starhermit:engine";
import {
  connectGame, inviteLink as fetchInviteLink, leaderboards, onPlayerChange, player, rooms, serverNow, serverTime, sessions,
  type GameSocket, type Leaderboard, type Room, type RoomSocket,
} from "starhermit:platform";
import { saves, settings as store } from "starhermit:storage";
import { SETTING_DEFAULTS, checkSetting, defaultSave, mergeSaves, normalizeSave, saveChecksum, unwrapSave } from "../src/session.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Save = any;
const SCHEMA = 1;

// --- the save ------------------------------------------------------------------------
let current: Save = defaultSave();
let lastSavedAt = 0;
let adoptHook: (() => void) | null = null;
/** fn() when the account's copy (another device, the browser build) was merged in. */
export function onAdopt(fn: () => void): void { adoptHook = fn; }
/** The live save document (the app changes it in place, then calls saveDoc). */
export function doc(): Save { return current; }
export function saveDoc(): void {
  try { saves.save(current as JsonValue, { schema: SCHEMA }); }
  catch (e) { console.warn(`save: ${String(e)}`); }
}
function replaceDoc(next: Save): void {
  for (const k of Object.keys(current)) delete current[k];
  Object.assign(current, next);
}
/** Merges another copy into the device's (and saves); whether anything changed. */
function adopt(other: Save): boolean {
  if (!other) return false;
  const next = mergeSaves(current, normalizeSave(other));
  if (saveChecksum(next) === saveChecksum(current)) return false;
  replaceDoc(JSON.parse(JSON.stringify(next)));
  saveDoc();
  adoptHook?.();
  return true;
}
saves.onConflict((local, remote) => ({ merged: mergeSaves(normalizeSave(local?.data), normalizeSave(remote.data)) as JsonValue }));
saves.onStatus((_status, state) => {
  if (state === "foreign") { migrateForeign(); return; }
  // The account's save replaced the device's (another device saved last): merge it in.
  const cur = saves.load();
  if (cur && cur.savedAt !== lastSavedAt) {
    lastSavedAt = cur.savedAt;
    adopt(cur.data);
  }
});
/** The browser build's envelope text ({v: 1, data, sum}) as a save, or null. */
export function readForeign(text: string | null): Save | null {
  if (!text) return null;
  try { return unwrapSave(JSON.parse(text)); } catch { return null; }
}
/** The browser build's cloud save: merged in, saved over it once. */
function migrateForeign(): void {
  const old = saves.foreign();
  if (!old) return;
  adopt(readForeign(old.text ?? null));
  try { saves.save(current as JsonValue, { schema: SCHEMA, replaceForeign: true }); }
  catch (e) { console.warn(`save migration: ${String(e)}`); }
}
/** The title's sync badge: offline (a guest) | saving | synced. */
export function syncState(): "offline" | "saving" | "synced" {
  if (!player()) return "offline";
  const st = saves.state();
  if (st === "error" || st === "read-blocked") return "offline";
  if (st === "loading" || st === "uploading" || st === "foreign" || saves.status() === "pending") return "saving";
  return "synced";
}
export function flush(): void { void saves.flush().catch(() => undefined); }

// --- the game's options ------------------------------------------------------------------
export interface Options { theme: string; cvdPalette: boolean; leftHanded: boolean; holdToConfirm: boolean; hints: boolean }
export const options: Options = { ...SETTING_DEFAULTS } as Options;
type Key = keyof Options;
const KEYS = Object.keys(SETTING_DEFAULTS) as Key[];
const optionListeners = new Set<() => void>();
export function onOptionsChange(fn: () => void): void { optionListeners.add(fn); }
function optionsChanged(): void { for (const fn of optionListeners) fn(); }
function readOption(key: Key): void {
  let v: JsonValue | undefined;
  try { v = store.get(key); } catch { return; }
  const ok = checkSetting(key, v);
  if (ok !== undefined) (options as unknown as Record<string, unknown>)[key] = ok;
}
/** Changes one of the game's options (device and account). */
export function setOption<K extends Key>(key: K, value: Options[K]): void {
  if (options[key] === value) return;
  options[key] = value;
  try { store.set(key, value as JsonValue); } catch (e) { console.warn(`option ${key}: ${String(e)}`); }
  optionsChanged();
}
/** The browser build's account settings: options this game still has are adopted (unless set since), every key removed. */
function importLegacy(): void {
  const keys = store.legacyKeys();
  if (!keys) return;
  let changed = false;
  for (const key of keys) {
    let value: JsonValue | undefined;
    try { value = store.legacy(key); } catch { continue; }
    if ((KEYS as string[]).includes(key)) {
      const v = checkSetting(key, value);
      if (v !== undefined && store.get(key) === undefined) {
        try { store.set(key, v as JsonValue); (options as unknown as Record<string, unknown>)[key] = v; changed = true; } catch { /* keep */ }
      }
    }
    try { store.removeLegacy(key); } catch { /* not removable */ }
  }
  if (changed) optionsChanged();
}

/** Reads the device's save and the game's options (from onStart). */
export function initPlatform(): void {
  const cur = saves.load();
  lastSavedAt = cur?.savedAt ?? 0;
  replaceDoc(normalizeSave(cur?.data ?? null));
  for (const key of KEYS) readOption(key);
  store.onChange((key) => {
    if (!(KEYS as string[]).includes(key)) return;
    readOption(key as Key);
    optionsChanged();
  });
  store.onLegacy(importLegacy);
  importLegacy();
  if (saves.state() === "foreign") migrateForeign();
  refreshPlayer();
  void serverTime().catch(() => undefined);
}

// --- the player and the clock -----------------------------------------------------------
export function signedIn(): boolean { return !!player(); }
export function displayName(): string { return player()?.displayName ?? ""; }
export function userId(): string | null { return player()?.userId ?? null; }
let invite: string | null = null;
/** The invite link, fetched ahead so a button press can copy it at once. */
export function inviteLink(): string | null { return player() ? invite : null; }
const playerListeners = new Set<() => void>();
export function onPlayer(fn: () => void): void { playerListeners.add(fn); }
function refreshPlayer(): void {
  invite = null;
  board = null;
  for (const fn of playerListeners) fn();
  if (!player()) return;
  fetchInviteLink().then((u) => { invite = u; }, () => { invite = null; });
}
onPlayerChange(() => refreshPlayer());

/** Now in ms by the platform's clock when it has answered, else the device's. */
export function nowMs(): number {
  try { return serverNow() ?? Date.now(); } catch { return Date.now(); }
}

// --- the StarHermit high-score board ------------------------------------------------------
let board: Leaderboard | null = null;
async function highScoreBoard(): Promise<Leaderboard | null> {
  if (board) return board;
  const list = await leaderboards.list();
  board = list.find((b) => b.key === "high-score") ?? null;
  return board;
}
export interface BoardRow { rank: number; name: string; score: number; you: boolean }
export interface Posted { posted: boolean; rank: number | null }

/** Signed in only: posts a finished ranked round's total through server.js; never rejects. */
export async function postScore(total: number): Promise<Posted> {
  const me = player();
  if (!me) return { posted: false, rank: null };
  const score = Math.max(0, Math.round(total));
  let accepted: string[] = [];
  try {
    const sessionId = await sessions.practice();
    accepted = await new Promise<string[]>((resolve) => {
      const socket = connectGame(sessionId);
      let done = false;
      const finish = (v: string[]): void => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        socket.close();
        resolve(v);
      };
      const timer = setTimeout(() => finish([]), 15000);
      socket.on("open", () => { socket.sendCommand({ type: "result", scores: { "high-score": score } }); });
      socket.on("game", (data) => {
        const d = data as { type?: string; accepted?: string[] } | null;
        if (d && d.type === "result-ack") finish(Array.isArray(d.accepted) ? d.accepted : []);
      });
      socket.on("error", () => finish([]));
      socket.on("stopped", () => finish([]));
      socket.on("abandoned", () => finish([]));
    });
  } catch { return { posted: false, rank: null }; }
  if (!accepted.includes("high-score")) return { posted: false, rank: null };
  try {
    const b = await highScoreBoard();
    if (!b) return { posted: true, rank: null };
    const r = await leaderboards.entries(b.id, { pageSize: 100 });
    const mine = r.items.find((e) => e.userId === me.userId);
    return { posted: true, rank: mine ? mine.rank : null };
  } catch { return { posted: true, rank: null }; }
}
/** The board's top ten (null when it cannot be read: offline). */
export async function topTen(): Promise<BoardRow[] | null> {
  try {
    const b = await highScoreBoard();
    if (!b) return [];
    const me = player()?.userId ?? null;
    const r = await leaderboards.entries(b.id, { pageSize: 10 });
    return r.items.map((e) => ({ rank: e.rank, name: e.displayName || e.username, score: e.score, you: !!me && e.userId === me }));
  } catch { return null; }
}

// --- hosted councils: realtime rooms ------------------------------------------------------
type Res = { ok: boolean; status: number; data?: Record<string, unknown> & { roomId?: string }; error?: string };
const errRes = (e: unknown): Res => {
  const pe = e as { status?: number; kind?: string; message?: string };
  return { ok: false, status: pe?.status ?? (pe?.kind === "not-found" ? 404 : 0), error: pe?.kind || pe?.message || "network" };
};
const roomData = (room: Room): Res["data"] => ({ roomId: room.id, revision: room.revision, metadata: room.metadata as Record<string, unknown>, joinCode: room.joinCode, gameSessionId: room.gameSessionId });
async function call(fn: () => Promise<Res["data"] | void>): Promise<Res> {
  if (!player()) return { ok: false, status: 0, error: "signed-out" };
  try { const data = await fn(); return { ok: true, status: 200, data: data || {} }; } catch (e) { return errRes(e); }
}
interface RoomHandlers {
  onRoster?: (room: Room) => void;
  onEvent?: (kind: string, fields: Record<string, unknown>) => void;
  onAuthLost?: () => void;
  onUnavailable?: (code: string) => void;
}
interface GameHandlers {
  onOpen?: () => void;
  onMessage?: (data: unknown) => void;
  onError?: (message: string) => void;
  onAuthLost?: () => void;
  onUnavailable?: (code: string) => void;
}
function stopped(h: { onAuthLost?: () => void; onUnavailable?: (code: string) => void }, reason: string): void {
  if (reason === "signed-out" || reason === "terms-required") h.onAuthLost?.();
  else if (reason !== "closed") h.onUnavailable?.(reason);
}

/** src/hosted.js's platform surface. No client posts a result: server.js returns it. */
export const roomsAdapter = {
  get userId(): string | null { return player()?.userId ?? null; },
  createRoom(config: { teamCount: number; seatsPerTeam: number; metadata: JsonValue }): Promise<Res> {
    return call(async () => roomData(await rooms.create({ teamCount: config.teamCount, seatsPerTeam: config.seatsPerTeam, metadata: config.metadata, backfillAiPlayers: false })));
  },
  openRoom(roomId: string): Promise<Res> { return call(async () => roomData(await rooms.open(roomId))); },
  updateRoom(roomId: string, changes: { metadata: JsonValue }, revision: number): Promise<Res> {
    return call(async () => roomData(await rooms.update(roomId, changes, revision)));
  },
  async quickJoin(): Promise<Res> {
    if (!player()) return { ok: false, status: 0, error: "signed-out" };
    try {
      const room = await rooms.quickJoin();
      return room ? { ok: true, status: 200, data: roomData(room) } : { ok: false, status: 404, error: "not-found" };
    } catch (e) { return errRes(e); }
  },
  startRoom(roomId: string): Promise<Res> { return call(async () => roomData(await rooms.start(roomId))); },
  leaveRoom(roomId: string): Promise<Res> { return call(async () => { await rooms.leave(roomId); }); },
  /** The room's socket for the lobby: its roster and the host's lobby events. */
  connectRoom(roomId: string, h: RoomHandlers): { sendEvent(kind: string, fields: Record<string, JsonValue>): boolean; close(): void } {
    let socket: RoomSocket | null = null;
    try { socket = rooms.connect(roomId); } catch { queueMicrotask(() => h.onUnavailable?.("connect")); }
    if (socket) {
      socket.on("roster", (room) => h.onRoster?.(room));
      socket.on("control", (_from, kind, frame) => {
        if (kind !== "event" || !frame || typeof frame !== "object" || Array.isArray(frame)) return;
        const f = frame as Record<string, unknown>;
        h.onEvent?.(String(f.game ?? f.kind ?? f.event ?? ""), f);
      });
      socket.on("stopped", (reason) => stopped(h, reason));
    }
    return {
      sendEvent(kind: string, fields: Record<string, JsonValue>): boolean { try { return !!socket && socket.sendEvent(kind, { ...fields, game: kind }); } catch { return false; } },
      close(): void { try { socket?.close(); } catch { /* gone */ } socket = null; },
    };
  },
  /** The bound session's game socket: commands to server.js, its broadcasts back. */
  connectGame(sessionId: string, h: GameHandlers): { send(data: JsonValue): boolean; close(): void } {
    let socket: GameSocket | null = null;
    try { socket = connectGame(sessionId); } catch { queueMicrotask(() => h.onUnavailable?.("connect")); }
    if (socket) {
      socket.on("open", () => h.onOpen?.());
      socket.on("game", (data) => h.onMessage?.(data));
      socket.on("error", (message) => h.onError?.(message));
      socket.on("stopped", (reason) => stopped(h, reason));
      socket.on("abandoned", (reason) => h.onUnavailable?.(`abandoned:${reason}`));
    }
    return {
      send(data: JsonValue): boolean { try { return !!socket && socket.state === "open" && socket.sendCommand(data); } catch { return false; } },
      close(): void { try { socket?.close(); } catch { /* gone */ } socket = null; },
    };
  },
};
