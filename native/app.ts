// The controller: the browser build's src/main.js App without its DOM — the
// screen state machine (title, mode select, setup sheet, tutorials, Journey,
// Practice, Challenges, hosted lobby, settings, help), the session lifecycle
// (countdown, active ↔ paused, results, progression), tutorial gating,
// hints and undo, hosted councils (src/hosted.js against server.js), and the
// HUD state (caption, toasts, announcements, the focused move target).
// native/screens.ts draws it every frame with starhermit:ui; native/main.ts
// routes input to it. Rules state changes only through SoloSession commands
// (solo) or server.js (hosted).
//
// Timers (the automata's think delay, the countdown, the caption, toasts, the
// achievement chime) run on the game clock (`clock`, advanced in fixed steps
// by main.ts), not setTimeout: they pause while the window is suspended and
// are deterministic in checks.
import { clipboard, preferences } from "starhermit:engine";
import { requestSignIn } from "starhermit:platform";
import * as ui from "starhermit:ui";
import { legalActions } from "../src/rules.js";
import { SoloSession, setSessionTimers } from "../src/session.js";
import { THEMES, JOURNEY, TUTORIALS, dailyStage, practiceStage, challengeStage } from "../src/content.js";
import { CouncilClient } from "../src/hosted.js";
import { logText, roomName, rejectText, hintText } from "../src/labels.js";
import { shStrings, fmt } from "../src/platform-i18n.js";
import { T } from "./i18n.ts";
import * as render from "./render.ts";
import * as audio from "./audio.ts";
import * as platform from "./platform.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export type Screen = "title" | "modes" | "setup" | "tutorials" | "journey" | "practice" | "challenges" | "hosted" | "settings" | "help" | "game";
export type Modal = "pause" | "help" | "results" | null;
export type Toast = { text: string; until: number };
export interface ResultsMeta { board: "loading" | platform.BoardRow[] | null | undefined; lbLine: string | null }

export const app = {
  screen: "title" as Screen,
  screenData: null as Any,
  /** The fixed step a screen or dialog opened on: its opening key must not act on it. */
  openedAt: 0,
  modal: null as Modal,
  helpFrom: "title" as "title" | "pause",
  phase: "menu" as "menu" | "countdown" | "active" | "paused" | "results",
  session: null as SoloSession | null,
  council: null as CouncilClient | null,
  /** The hosted lobby while one is open (the council before its round starts). */
  lobby: null as CouncilClient | null,
  lobbyBusy: false,
  stage: null as Any,
  assists: true,
  tutorial: null as null | { def: Any; step: number; humanActed: boolean },
  caption: null as null | { text: string; until: number },
  toasts: [] as Toast[],
  focusIndex: 0,
  drawer: null as null | "left" | "right",
  overview: false,
  result: null as Any,
  fresh: [] as string[],
  meta: { board: undefined, lbLine: null } as ResultsMeta,
  forms: {} as Record<string, Any>,
};

// ------------------------------------------------------------------ the game clock
export const clock = { ms: 0, frame: 0 };
type Timer = { id: number; at: number; fn: () => void; tag: string };
let timers: Timer[] = [];
let timerId = 0;
export function after(ms: number, fn: () => void, tag = "session"): number {
  timers.push({ id: ++timerId, at: clock.ms + ms, fn, tag });
  return timerId;
}
function clearTimer(id: number): void { timers = timers.filter((t) => t.id !== id); }
function clearTimers(tag: string): void { timers = timers.filter((t) => t.tag !== tag); }
// The automata's think delay runs on the game clock.
setSessionTimers({ set: (fn: () => void, ms: number) => after(ms, fn, "ai"), clear: (h: number) => clearTimer(h) });
/** Per fixed step: due timers, expired toasts and the caption. */
export function tick(stepMs: number): void {
  clock.ms += stepMs;
  clock.frame += 1;
  const due = timers.filter((t) => t.at <= clock.ms);
  if (due.length) {
    timers = timers.filter((t) => t.at > clock.ms);
    for (const t of due) t.fn();
  }
  if (app.toasts.length) app.toasts = app.toasts.filter((t) => t.until > clock.ms);
  if (app.caption && app.caption.until <= clock.ms) app.caption = null;
}

// ------------------------------------------------------------------ infrastructure
export function options(): platform.Options { return platform.options; }
export function save(): Any { return platform.doc(); }
export function persist(): void { platform.saveDoc(); }
export function reducedMotion(): boolean { return preferences().reducedMotion; }
export function announce(msg: string, assertive = false): void {
  if (!msg) return;
  try { ui.announce(String(msg).slice(0, 500), { politeness: assertive ? "assertive" : "polite" }); } catch { /* none */ }
}
export function caption(text: string): void { app.caption = { text, until: clock.ms + 2500 }; }
export function toast(text: string): void {
  app.toasts.push({ text, until: clock.ms + 3500 });
  if (app.toasts.length > 3) app.toasts.shift();
}
audio.onCaption((key) => caption(T(key)));
export function cue(kind: audio.Cue, seed = 1): void { audio.event(kind, seed); }

/** The theme's id for a stage (Settings › Theme; "auto" follows the stage). */
function themeFor(stage: Any): string {
  const t = platform.options.theme;
  return t === "auto" ? (stage?.theme || THEMES[0].id) : t;
}
/** Theme and palette on the scene (App.applySettings). */
export function applySettings(): void {
  render.setPalette(platform.options.cvdPalette);
  if (app.stage) render.setTheme(themeFor(app.stage));
  if (app.phase !== "menu") refreshTargets();
}

export function go(screen: Screen, data: Any = null): void {
  app.screen = screen;
  app.screenData = data;
  app.forms = {};
  app.openedAt = clock.frame;
  ui.setFocus(null);
}
export function formState<V>(key: string, init: () => V): V {
  if (!app.forms[key]) app.forms[key] = init();
  return app.forms[key] as V;
}
function openModal(m: Modal): void { app.modal = m; app.openedAt = clock.frame; ui.setFocus(null); }
export function fresh(): boolean { return clock.frame !== app.openedAt; }

// ------------------------------------------------------------------ the session in play
/** The station state the player sees (solo: the session's; hosted: server.js's view). */
export function state(): Any { return app.council ? app.council.state : app.session?.state ?? null; }
export function myId(): string { return app.council ? app.council.you || "p0" : app.session?.humanId || "p0"; }
export function legal(): Any[] {
  if (app.council) return app.council.legal();
  return app.session ? app.session.legal() : [];
}
export function inSession(): boolean { return !!(app.session || app.council); }
export function practice(): boolean { return !!app.session?.practice; }

// ------------------------------------------------------------------ screens
export function showTitle(): void {
  teardown();
  app.phase = "menu";
  app.modal = null;
  go("title");
  announce(T("A clockwork station. A hidden hand. A council of gears."));
}
export function showModeSelect(): void { if (!inSession()) { app.phase = "menu"; go("modes"); } }
export function showSetup(stage: Any, run: (assists: boolean) => void): void { go("setup", { stage, run }); }
export function showScreen(screen: Screen): void { go(screen); }
export function showHelp(from: "title" | "pause"): void {
  app.helpFrom = from;
  if (from === "pause") openModal("help"); else go("help");
}
export function closeHelp(): void {
  if (app.modal === "help") openModal("pause"); else showTitle();
}

function teardown(): void {
  clearTimers("session");
  clearTimers("ai");
  if (app.session) { app.session.pause(); app.session = null; }
  if (app.council) { app.council.leave(); app.council = null; }
  if (app.lobby) { app.lobby.leave(); app.lobby = null; }
  app.tutorial = null;
  app.drawer = null;
  app.overview = false;
  app.result = null;
  app.focusIndex = 0;
  render.endSession();
}

// ------------------------------------------------------------------ sessions
export function startStage(stage: Any, assists: boolean): void {
  const tut = app.tutorial;
  teardown();
  app.tutorial = tut && tut.def.id === stage.id ? tut : null;
  app.stage = stage;
  app.assists = assists;
  app.session = new SoloSession(stage, {
    aiDelayMs: reducedMotion() ? 200 : 450,
    // Tutorial lessons wait for the required human action before the crew
    // (and the task clock) moves on, so a lesson can never auto-complete.
    aiGate: () => !app.tutorial || app.tutorial.step >= app.tutorial.def.steps.length || app.tutorial.humanActed,
    onState: (s: Any, events: Any[]) => onState(s, events),
    onReject: (_cmd: Any, reason: string) => onReject(reason),
    onEnd: (result: Any) => onEnd(result),
  });
  app.modal = null;
  render.beginSession(stage.seed, themeFor(stage));
  go("game");
  countdown();
}

function countdown(): void {
  app.phase = "countdown";
  announce(T("Session starting"));
  onState(app.session!.state, []);
  let n = 3;
  const step = (): void => {
    if (app.phase !== "countdown") return;
    if (n > 0) {
      caption(String(n));
      cue("tick", n);
      n--;
      after(reducedMotion() ? 250 : 600, step);
    } else {
      app.phase = "active";
      cue("start", app.stage ? app.stage.seed : 1);
      announce(T("Go. {goal}", { goal: app.stage.tutorialText || T("Complete the station tasks.") }));
      app.session?.scheduleAi();
    }
  };
  step();
}

export function startTutorial(tut: Any): void {
  const stage = {
    id: tut.id, name: "Tutorial: " + tut.title, seed: tut.seed,
    config: { seed: tut.seed, playerCount: tut.playerCount, saboteurCount: tut.saboteurCount, taskCount: tut.taskCount },
    goals: { tasks: tut.taskCount }, par: 60, difficulty: 1, mechanics: [tut.rule],
    theme: THEMES[0].id, practice: true,
  };
  app.tutorial = { def: tut, step: 0, humanActed: false };
  startStage(stage, true);
}
export function startDaily(): void { startStage(dailyStage(new Date(platform.nowMs())), true); }
export function startPractice(d: number): void { startStage(practiceStage(d), true); }
export function startChallenge(kind: string): void { startStage(challengeStage(kind), true); }
export function retry(): void {
  if (app.council || app.stage?.id === "hosted") { showTitle(); go("hosted"); return; }
  if (app.stage) {
    if (app.stage.id?.startsWith("tut-")) { const t = TUTORIALS.find((x: Any) => x.id === app.stage.id); if (t) { startTutorial(t); return; } }
    startStage(app.stage, app.assists);
  }
}
export function nextStage(): void {
  const st = app.stage;
  if (st && st.id && st.id.startsWith("journey-")) {
    const next = JOURNEY[st.index + 1];
    if (next) { teardown(); app.phase = "menu"; app.modal = null; showSetup(next, (a) => startStage(next, a)); return; }
  }
  teardown();
  app.phase = "menu";
  app.modal = null;
  go("modes");
}

export function pauseGame(): void {
  if (app.phase !== "active") return;
  app.phase = "paused";
  app.session?.pause();
  openModal("pause");
  announce(T("Paused"));
}
export function resumeGame(): void {
  if (app.phase !== "paused") return;
  app.phase = "active";
  app.session?.resume();
  app.modal = null;
  announce(T("Resumed"));
}
export function leaveGame(): void { showTitle(); }

// ------------------------------------------------------------------ state flow
const SOUND: Record<string, audio.Cue | null> = { move: "move", task: "task", meeting: "meeting", eject: "eject", eliminate: "eliminate", vote: "vote", end: null, wait: null };
function refreshTargets(): void {
  const s = state();
  if (!s) return;
  const acts = legal();
  render.select(myId());
  render.showLegalTargets(platform.options.hints && app.assists ? acts.filter((a) => a.type === "move").map((a) => a.room) : []);
}
function onState(s: Any, events: Any[]): void {
  render.syncState(s);
  const me = s.players.find((p: Any) => p.id === myId());
  if (me && me.room !== render.focusedRoom() && !app.overview) render.placeCamera(me.room, false);
  refreshTargets();
  for (const e of events) {
    if (!e || !e.kind) continue;
    const snd = SOUND[e.kind];
    if (snd) cue(snd, s.tick + (s.seed || 0));
    if (["meeting", "eject", "eliminate", "end"].includes(e.kind)) announce(logText(e));
  }
  if (app.tutorial) checkTutorialStep();
}

function checkTutorialStep(): void {
  const tut = app.tutorial;
  if (!tut || !app.session) return;
  const steps = tut.def.steps;
  if (tut.step >= steps.length) return;
  const last = app.session.commands.filter((c: Any) => c.player === app.session!.humanId).pop();
  if (last && last.type === steps[tut.step].expect) {
    tut.step++;
    tut.humanActed = false;
    cue("ack", 5); // 'task' captions "Task complete", which misleads here
    if (tut.step >= steps.length) {
      save().tutorialDone[tut.def.id] = true;
      persist();
      announce(T("Lesson complete: {title}", { title: T(tut.def.title) }));
      caption(T("Lesson complete! Keep playing or leave."));
    } else announce(T(steps[tut.step].text));
  } else announce(T(steps[tut.step].text));
}
/** The current lesson step's text (the HUD shows it over the station), or null. */
export function tutorialText(): string | null {
  const tut = app.tutorial;
  if (!tut) return null;
  const step = tut.def.steps[tut.step];
  return step ? T(step.text) : T("Lesson complete! Keep playing or leave.");
}

export function onReject(reason: string): void {
  cue("reject", 3);
  const msg = T("Cannot do that: {reason}", { reason: rejectText(reason) });
  caption(msg);
  announce(msg);
}

/** The player's action (buttons, keys, taps); commands only while active. */
export function humanAct(fields: Any): void {
  if (!inSession() || app.phase !== "active") return;
  if (app.tutorial) app.tutorial.humanActed = true;
  cue("ack", 1);
  if (app.council) {
    const r = app.council.act(fields);
    if (!r.ok) onReject(r.reason ?? "rejected");
    return;
  }
  app.session!.act(fields);
}
export function undo(): void {
  if (!app.session || app.phase !== "active") return;
  const r = app.session.undo();
  if (!r.ok) onReject(r.reason ?? "rejected");
  else cue("undo", 4);
}
export function hint(): void {
  if (!inSession() || app.phase !== "active") return;
  const text = hintText(legal());
  if (!text) { caption(T("No actions right now.")); return; }
  caption(text);
  announce(text);
  cue("hint", 2);
}
/** Arrow keys: cycle the legal move targets (the camera follows); `commit` moves there at once. */
export function cycleTarget(dir: -1 | 1, commit: boolean): void {
  if (app.phase !== "active") return;
  const moves = legal().filter((a) => a.type === "move");
  if (!moves.length) return;
  app.focusIndex = (app.focusIndex + dir + moves.length) % moves.length;
  const room = moves[app.focusIndex].room;
  render.showLegalTargets([room]);
  render.placeCamera(room, false);
  app.overview = false;
  caption(T("Target: {room}", { room: roomName(room) }));
  cue("ack", app.focusIndex);
  if (commit) humanAct({ type: "move", room });
}
export function commitTarget(): void {
  const moves = legal().filter((a) => a.type === "move");
  if (moves.length) humanAct({ type: "move", room: moves[app.focusIndex % moves.length].room });
}
export function toggleMap(): void {
  app.overview = render.toggleOverview();
}
export function resetCamera(): void { app.overview = false; render.resetCamera(); }
/** A tap or click on the station: a room moves there, a pawn votes or eliminates. */
export function tapStation(x: number, y: number): void {
  if (!inSession() || app.phase !== "active") return;
  const hit = render.pick(x, y);
  if (!hit) return;
  const acts = legal();
  if (hit.kind === "room") {
    if (acts.some((a) => a.type === "move" && a.room === hit.id)) humanAct({ type: "move", room: hit.id });
    else onReject("not_a_legal_target");
  } else {
    if (acts.some((a) => a.type === "vote" && a.choice === hit.id)) humanAct({ type: "vote", choice: hit.id });
    else if (acts.some((a) => a.type === "eliminate" && a.target === hit.id)) humanAct({ type: "eliminate", target: hit.id });
    else onReject("not_a_legal_target");
  }
}

// ------------------------------------------------------------------ results
function onEnd(result: Any): void {
  app.phase = "results";
  app.result = result;
  const won = !!result.playerWon;
  app.fresh = [];
  app.meta = { board: undefined, lbLine: null };
  if (app.session && !app.council) {
    app.fresh = app.session.recordCompletion(save());
    persist();
    if (platform.signedIn()) {
      // On the platform: Journey, Daily and Challenge rounds post their total
      // through server.js (high-score board); Tutorial and Practice post nothing.
      const ranked = /^(journey|daily|challenge)-/.test(app.stage.id || "");
      app.meta = { board: "loading", lbLine: ranked ? shStrings().lbPosting : null };
      const session = app.session;
      const posted = ranked ? platform.postScore(result.score.total) : Promise.resolve(null);
      void posted.then((r) => platform.topTen().then((board) => {
        if (app.phase !== "results" || app.session !== session) return;
        const S = shStrings();
        app.meta = { board, lbLine: r ? (!r.posted ? S.lbNotPosted : r.rank ? fmt(S.lbRank, { rank: r.rank }) : S.lbPosted) : null };
      }));
    }
  }
  cue(won ? "win" : "lose", 9);
  if (app.fresh.length) after(700, () => cue("achievement", 11));
  openModal("results");
  announce(won ? T("The Station Turns Again") : T("The Gears Fall Silent"), true);
}
export function copyHash(): void {
  const text = (app.result?.hash ?? 0).toString(16);
  try { clipboard.writeText(text); caption(T("Copied: {text}", { text })); announce(T("Copied to clipboard")); }
  catch { caption(T("Copy failed — {text}", { text })); announce(T("Copy failed")); }
}

// ------------------------------------------------------------------ account
export function copyInvite(): void {
  const link = platform.inviteLink();
  if (!link) return;
  const S = shStrings();
  try { clipboard.writeText(link); toast(S.copied); announce(S.copied); } catch { toast(fmt(S.copyFailed, { link })); }
}
export function signIn(): void { void requestSignIn().catch(() => undefined); }
export function setProfileName(name: string): void {
  const n = name.trim().slice(0, 24);
  if (!n || n === save().profile.name) return;
  save().profile.name = n;
  persist();
}

// ------------------------------------------------------------------ hosted councils
function councilHooks(): Any {
  return {
    onLobby: () => { /* screens read the lobby each frame */ },
    onStart: (c: CouncilClient) => beginCouncil(c),
    onState: (s: Any, events: Any[]) => { if (app.council) onState(s, events); },
    onOver: (result: Any) => { if (app.council) onEnd(result); },
    onReject: (reason: string) => onReject(reason),
    onAuthLost: () => { toast(shStrings().signedOut); showTitle(); },
    onUnavailable: () => {
      if (app.phase === "results") return;
      toast(T("The council room is no longer available. Your progress on this device is safe."));
      app.lobby = null; app.council = null;
      showTitle();
    },
  };
}
export async function hostedCreate(): Promise<void> {
  if (!platform.signedIn() || app.lobby || app.lobbyBusy) return;
  app.lobbyBusy = true;
  const r = await CouncilClient.create(platform.roomsAdapter, councilHooks());
  app.lobbyBusy = false;
  if (!r.ok) { caption(T("Could not create a room — try again.")); return; }
  app.lobby = r.client ?? null;
}
export async function hostedQuickJoin(): Promise<void> {
  if (!platform.signedIn() || app.lobby || app.lobbyBusy) return;
  app.lobbyBusy = true;
  const r = await CouncilClient.join(platform.roomsAdapter, councilHooks());
  app.lobbyBusy = false;
  if (!r.ok) {
    caption(r.error === "no-open-rooms" ? T("No open councils — create one and others can quick-join.") : T("Quick join failed — try again."));
    return;
  }
  app.lobby = r.client ?? null;
}
export async function hostedAddAi(): Promise<void> {
  if (!app.lobby) return;
  const r = await app.lobby.addAutomaton();
  if (!r.ok && r.error === "full") caption(T("The council is full."));
}
export async function hostedStart(): Promise<void> {
  if (!app.lobby) return;
  const r = await app.lobby.start();
  if (!r.ok && r.error === "too-few") caption(T("Need at least {n} seats to convene the council.", { n: 4 }));
  else if (!r.ok && r.error !== "no-session") caption(T("Could not create a room — try again."));
}
export function hostedLeave(): void {
  if (app.lobby) { app.lobby.leave(); app.lobby = null; }
}
function beginCouncil(c: CouncilClient): void {
  clearTimers("session");
  app.lobby = null;
  app.council = c;
  app.session = null;
  app.tutorial = null;
  app.assists = true;
  const s = c.state;
  app.stage = { id: "hosted", name: "Hosted Council", seed: c.visual, config: s, goals: { tasks: s.tasks.length }, par: 80, difficulty: 3, theme: THEMES[c.visual % THEMES.length].id };
  render.beginSession(c.visual, themeFor(app.stage));
  app.modal = null;
  go("game");
  app.phase = "active";
  announce(T("The session begins."));
}

/** The window was hidden: a solo session pauses (never a hosted seat). */
export function onSuspend(): void { if (app.phase === "active" && !app.council) pauseGame(); }
/** The scripted play paths and tests read the station through this. */
export function debugLegal(): Any[] { const s = state(); return s ? legalActions(s, myId()) : []; }
