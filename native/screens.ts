// Every screen, dialog and the in-session HUD on starhermit:ui, drawn each
// frame from the app's state (the browser build's DOM screens in src/ui.js
// and the layout rules of src/styles.css). Layout follows the old style
// sheet's breakpoints: both rails beside the station on wide windows (1024
// logical px and up; 220 px rails when short); labelled drawers toggled from
// the top bar on compact windows; on phones held upright the status panel
// under the top bar and the action tray in the thumb zone, its buttons two
// up. Menus are a centred card over the dim backdrop (the title over the key
// art); Pause, Help in play and the results are dialogs over the station.
import { frame, openMenu } from "starhermit:engine";
import { bindingLabel } from "starhermit:input";
import * as ui from "starhermit:ui";
import { THEMES, TUTORIALS, JOURNEY } from "../src/content.js";
import { stageTitle, mechanicName, logText, roomName, playerName, taskLabel, reasonText, scorePartName, achievementName } from "../src/labels.js";
import { shStrings } from "../src/platform-i18n.js";
import { T } from "./i18n.ts";
import * as render from "./render.ts";
import * as platform from "./platform.ts";
import * as A from "./app.ts";
import { app } from "./app.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

// ------------------------------------------------------------------ viewport and helpers
let VW = 1280, VH = 720, SCALE = 1;
function measureViewport(): void {
  const f = frame();
  SCALE = ui.preferences().scale || 1;
  const sa = f.safeArea;
  VW = Math.max(1, (f.width - sa.left - sa.right) / SCALE);
  VH = Math.max(1, (f.height - sa.top - sa.bottom) / SCALE);
}
const wide = (): boolean => VW >= 1024;
const phone = (): boolean => VW <= 700 && VH > VW;
const shortLandscape = (): boolean => VH <= 500 && VW > VH;
let hudBlur = false;
export function setHudBlur(v: boolean): void { hudBlur = v; }

function lbl(text: string, cls = "text"): void { ui.style(cls).label(text); }
function para(text: string, width: number, cls = "text"): void { ui.style(cls).paragraph(text, Math.max(40, width)); }
function heading(text: string, cls = "h2"): void { ui.style(cls).heading(text); }
/** A heading that wraps when it is wider than `w` (long titles, long translations, phones). */
function title(text: string, w: number, cls = "title"): void {
  if (textWidth(text, [cls], "label") <= w) ui.style(cls).heading(text);
  else ui.style(cls).paragraph(text, Math.max(40, w));
}
function textWidth(text: string, style: string[], kind: "button" | "label" = "button"): number {
  return ui.measureText(text, { kind, style }).width / SCALE;
}
type Item = { label: string; cls?: string; run: () => void; id?: string; full?: boolean; opts?: ui.ButtonOptions };
/** Buttons wrapped into rows that fit `width` (rows do not flex-wrap); `grow` stretches each row's buttons. */
function buttonRows(id: string, items: Item[], width: number, { justify = "start" as ui.Align, grow = false, gap = 10 } = {}): void {
  const rows: Item[][] = [];
  let cur: Item[] = [], used = 0;
  for (const it of items) {
    const w = textWidth(it.label, [it.cls || "btn"]);
    if (cur.length && (it.full || used + gap + w > width)) { rows.push(cur); cur = []; used = 0; }
    used += (cur.length ? gap : 0) + w;
    cur.push(it);
    if (it.full) { rows.push(cur); cur = []; used = 0; }
  }
  if (cur.length) rows.push(cur);
  ui.column(`${id}-rows`, () => {
    rows.forEach((row, ri) => ui.row(`${id}-r${ri}`, () => {
      const each = grow || row.some((r) => r.full) ? (width - gap * (row.length - 1)) / row.length : 0;
      for (const it of row) {
        const style = each ? ui.style(it.cls || "btn", { width: each }) : ui.style(it.cls || "btn");
        if ((it.id ? style.id(it.id) : style).button(it.label, it.opts ?? {})) it.run();
      }
    }, { spacing: gap, justify, width }));
  }, { spacing: gap, width });
}
/** A full-width button whose label wraps (long translated mode and action names). */
function wideButton(id: string, label: string, width: number, cls: string, run: () => void, size = 16, opts: ui.ButtonOptions = {}): void {
  const pad = cls === "btn-action" ? 30 : 38;
  const fits = textWidth(label, [cls]) <= width;
  const pressed = fits
    ? ui.id(id).style(cls, { width }).button(label, opts)
    : ui.id(id).style(cls, { width }).button(label, { ...opts, content: () => ui.paragraph(label, Math.max(40, width - pad), { size }) });
  if (pressed) run();
}

// Content heights from last frame (vertical centring of short screens).
const heights = new Map<string, number>();
/** A dimmed, scrolling screen with a centred card (old .hc-screens > .hc-screen). */
function screen(id: string, build: (w: number) => void, { maxW = 560, cls = "screen", label = "" } = {}): void {
  const tight = phone() || shortLandscape();
  const padX = tight ? 18 : 32;
  const w = Math.min(maxW + 2 * padX, VW * 0.92, VW - 16);
  const contentH = heights.get(id) ?? 0;
  const top = Math.max(12, (VH - contentH) / 2);
  const scrollTo = A.clock.frame - app.openedAt < 3 ? { top: 0 } : undefined;
  const panel = tight && cls === "screen" ? "screen-tight" : cls;
  ui.scrollArea(`${id}-scroll`, { width: VW, height: VH }, () => {
    ui.column(`${id}-outer`, () => {
      const r = ui.id(`${id}-panel`).column(label || id, () => build(w - 2 * padX - 2), {
        width: w, spacing: 10, style: panel,
        padding: tight ? { top: 18, bottom: 18, start: padX, end: padX } : { top: 28, bottom: 28, start: padX, end: padX },
      });
      heights.set(id, r.height / SCALE);
    }, { width: VW, align: "center", padding: { top, bottom: 12 }, style: hudBlur && app.screen === "game" ? "screen-dim-blur" : "screen-dim", height: Math.max(VH, contentH + top + 12) });
  }, scrollTo ? { scrollTo } : {});
}
/** A modal card over the station: a scrolling body and a pinned footer. */
function card(id: string, label: string, width: number, body: (w: number) => void, footer: ((w: number) => void) | null, onClose: (() => void) | null): void {
  const w = Math.min(width, VW - 24) - 48;
  const maxBody = VH * 0.88 - 140;
  const bodyH = heights.get(id) ?? 0;
  const open = ui.id(id).dialog(label, "", true, () => {
    ui.column(`${id}-col`, () => {
      const inner = (): void => {
        const r = ui.column(`${id}-body`, () => body(w - 14), { width: w - 14, spacing: 8 });
        heights.set(id, r.height / SCALE);
      };
      if (bodyH > maxBody) ui.scrollArea(`${id}-scroll`, { width: w, height: maxBody }, inner, A.clock.frame - app.openedAt < 3 ? { scrollTo: { top: 0 } } : {});
      else inner();
      if (footer) footer(w);
    }, { width: w, spacing: 10 });
  });
  // A dialog closes on the Escape that opened it unless the close on its opening frame is ignored.
  if (!open && onClose && A.fresh()) onClose();
}
function key(action: string): string {
  try { return bindingLabel(action) || "—"; } catch { return "—"; }
}
const back = (): string => T("← Back");

// ------------------------------------------------------------------ title
function titleScreen(): void {
  const S = shStrings();
  const d = A.save();
  const hc = ui.preferences().highContrast;
  screen("title", (w) => {
    title("Hidden Council", w);
    para(T("A clockwork station. A hidden hand. A council of gears."), w, "tagline");
    if (ui.id("play").style("btn-play").button(T("▶ Play"))) { A.cue("ack"); A.showModeSelect(); }
    const row: Item[] = [
      { id: "t-daily", label: T("Daily Chime"), run: () => A.startDaily() },
      { id: "t-journey", label: T("Journey"), run: () => A.showScreen("journey") },
    ];
    // Hosted Play needs StarHermit realtime rooms: shown only when signed in.
    if (platform.signedIn()) row.push({ id: "t-hosted", label: T("Hosted Play"), run: () => A.showScreen("hosted") });
    row.push({ id: "t-help", label: T("Help"), run: () => A.showHelp("title") });
    buttonRows("title-row", row, w);
    const stats = " · " + T("{sessions} sessions · streak {streak}", { sessions: d.sessions, streak: d.streak });
    if (platform.signedIn()) {
      // Signed in: the name is the platform's, with the cloud-save badge.
      const sync = platform.syncState();
      const badge = sync === "saving" ? T("cloud save saving…") : sync === "synced" ? T("cloud save synced") : T("cloud save offline");
      ui.column("profile", () => {
        ui.row("profile-name", () => { lbl(T("Tinkerer:"), "text"); lbl(platform.displayName() || "…", "strong"); }, { spacing: 6, align: "center" });
        para(stats.slice(3), w, "muted");
        ui.row("profile-sync", () => lbl(badge, "sync"), {});
      }, { spacing: 4, padding: { top: 8 } });
    } else {
      const f = A.formState("profile", () => ({ name: d.profile.name }));
      ui.row("profile", () => {
        lbl(T("Tinkerer:"), "text");
        const fieldW = Math.min(220, w - textWidth(T("Tinkerer:"), ["text"], "label") - 12);
        ui.id("name-field").column(T("Display name"), () => {
          const n = ui.textField("profile-name", f.name, { maxChars: 24, width: fieldW });
          if (n !== f.name) { f.name = n; A.setProfileName(n); }
        });
      }, { spacing: 8, align: "center", padding: { top: 8 } });
      para(stats.slice(3), w, "muted");
    }
    const acct: Item[] = [{ id: "t-settings", label: T("⚙ Settings"), cls: "btn-subtle", run: () => A.showScreen("settings") }];
    if (platform.signedIn()) { if (platform.inviteLink()) acct.push({ id: "t-invite", label: S.invite, cls: "btn-subtle", run: () => A.copyInvite() }); }
    else acct.push({ id: "t-signin", label: S.signIn, cls: "btn-subtle", run: () => A.signIn() });
    buttonRows("title-acct", acct, w);
  }, { cls: hc ? "screen" : "screen-title", label: "Hidden Council" });
}

function modesScreen(): void {
  screen("modes", (w) => {
    title(T("Choose Your Session"), w);
    const modes: [string, string, string, () => void][] = [
      ["m-tutorial", T("Tutorial"), T("Learn one rule at a time."), () => A.showScreen("tutorials")],
      ["m-journey", T("Journey"), T("40 staged councils, growing pressure."), () => A.showScreen("journey")],
      ["m-daily", T("Daily Chime"), T("One shared seed per UTC day."), () => A.startDaily()],
      ["m-practice", T("Practice"), T("Any difficulty. Undo allowed. Unranked."), () => A.showScreen("practice")],
      ["m-challenge", T("Challenge"), T("Constrained goals: beat the clock, sure-footed."), () => A.showScreen("challenges")],
    ];
    if (platform.signedIn()) modes.push(["m-hosted", T("Hosted Play"), T("Create or join a room with others."), () => A.showScreen("hosted")]);
    for (const [id, name, desc, run] of modes) {
      ui.column(`${id}-wrap`, () => {
        wideButton(id, name, w, "btn-mode", () => { A.cue("ack"); run(); });
        para(desc, w - 4, "muted");
      }, { spacing: 2, width: w });
    }
    buttonRows("modes-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.showTitle() }], w);
  }, { label: T("Choose Your Session") });
}

function setupScreen(): void {
  const { stage, run } = app.screenData || {};
  if (!stage) { A.showModeSelect(); return; }
  const f = A.formState("setup", () => ({ assists: true }));
  const sab = stage.config.saboteurCount;
  screen("setup", (w) => {
    title(stageTitle(stage), w);
    const facts: [string, string][] = [
      [T("Rules"), stage.mechanics.map(mechanicName).join(", ")],
      [T("Expected length"), T("~{n} minutes", { n: Math.max(3, Math.round(stage.par / 8)) })],
      [T("Players"), sab > 1 ? T("{n} ({s} saboteurs)", { n: stage.config.playerCount, s: sab }) : T("{n} ({s} saboteur)", { n: stage.config.playerCount, s: sab })],
      [T("Par"), T("{n} ticks", { n: stage.par })],
      [T("Difficulty"), "★".repeat(stage.difficulty)],
      [T("Ranked"), stage.ranked ? (platform.signedIn() ? T("Yes — shown on the read-only platform board") : T("Yes")) : T("No")],
    ];
    ui.id("facts").column(T("Rules"), () => {
      for (const [k, v] of facts) {
        const kw = textWidth(k + ":", ["fact-key"], "label");
        ui.row(`fact-${k}`, () => { lbl(k + ":", "fact-key"); para(v, w - kw - 10, "strong"); }, { spacing: 6, width: w });
      }
    }, { spacing: 4, width: w });
    const a = ui.checkbox(T("Assists (hints + target preview)"), f.assists);
    if (a !== f.assists) { f.assists = a; A.cue("ack"); }
    if (ui.id("begin").style("btn-play").button(T("Begin"))) run(f.assists);
    buttonRows("setup-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.showModeSelect() }], w);
  }, { label: stageTitle(stage) });
}

function tutorialsScreen(): void {
  screen("tutorials", (w) => {
    title(T("Tutorial Lessons"), w);
    for (const t of TUTORIALS) {
      const done = A.save().tutorialDone[t.id];
      wideButton(`tut-${t.id}`, (done ? "✓ " : "") + T(t.title), w, "btn-mode", () => A.startTutorial(t));
    }
    buttonRows("tut-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.showModeSelect() }], w);
  }, { label: T("Tutorial Lessons") });
}

function journeyScreen(): void {
  const d = A.save();
  screen("journey", (w) => {
    title(T("Journey"), w);
    const gap = 8;
    const cols = Math.max(4, Math.floor((w + gap) / (64 + gap)));
    const cell = (w - gap * (cols - 1)) / cols;
    ui.grid(T("Journey"), () => {
      for (const st of JOURNEY) {
        const rec = d.journey[st.id];
        const face = (st.index + 1) + (st.mastery ? " ◆" : "") + (rec ? (rec.won ? " ✓" : " ·" + Math.round(rec.score)) : "");
        const name = T("{name} — difficulty {d}", { name: T(st.name), d: st.difficulty });
        const hit = ui.id(`stage-${st.id}`).style(rec && rec.won ? "btn-stage-won" : "btn-stage", { width: cell, height: Math.max(56, cell) }).button(name, {
          tooltip: name,
          content: () => ui.label(face, { size: 15.2 }),
        });
        if (hit) { A.cue("ack"); A.showSetup(st, (assists: boolean) => A.startStage(st, assists)); }
      }
    }, { columns: cols, gap, width: w });
    buttonRows("journey-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.showModeSelect() }], w);
  }, { maxW: 560, label: T("Journey") });
}

function practiceScreen(): void {
  screen("practice", (w) => {
    title(T("Practice"), w);
    para(T("Unranked. Restart and undo are available."), w, "muted");
    for (let d = 1; d <= 5; d++) wideButton(`practice-${d}`, T("Difficulty {d}", { d }), w, "btn-mode", () => A.startPractice(d));
    buttonRows("practice-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.showModeSelect() }], w);
  }, { label: T("Practice") });
}

function challengesScreen(): void {
  screen("challenges", (w) => {
    title(T("Challenges"), w);
    wideButton("ch-clock", T("Beat the Clock — 55 ticks"), w, "btn-mode", () => A.startChallenge("clock-tower"));
    wideButton("ch-fuse", T("Short Fuse — 40 ticks"), w, "btn-mode", () => A.startChallenge("short-fuse"));
    wideButton("ch-sure", T("Sure-Footed — 46 moves max"), w, "btn-mode", () => A.startChallenge("sure-footed"));
    buttonRows("ch-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.showModeSelect() }], w);
  }, { label: T("Challenges") });
}

function hostedScreen(): void {
  screen("hosted", (w) => {
    title(T("Hosted Play"), w);
    para(T("Create a council or quick-join an open one. StarHermit seats the room; the game's server referees the round."), w, "muted");
    const lobby = app.lobby;
    if (!platform.signedIn()) para(T("Sign in to StarHermit to play with others."), w, "text");
    else if (!lobby) {
      wideButton("h-create", T("Create Room"), w, "btn-mode", () => void A.hostedCreate(), 16, { disabled: app.lobbyBusy });
      wideButton("h-join", T("Quick Join"), w, "btn-mode", () => void A.hostedQuickJoin(), 16, { disabled: app.lobbyBusy });
    } else {
      heading(T("Room {code}", { code: lobby.joinCode || String(lobby.roomId).slice(0, 6).toUpperCase() }), "h2");
      ui.id("seats").column(T("Room {code}", { code: "" }), () => {
        lobby.lobbySeats().forEach((s, i) => {
          const text = s.name + (s.ai ? " (" + T("automaton") + ")" : "") + " — " + T("ready") + (s.you ? " ← " + T("you") : "");
          para(text, w, s.you ? "you" : "text");
          void i;
        });
      }, { spacing: 2, width: w });
      const items: Item[] = [];
      if (lobby.phase === "lobby" && lobby.isHost) {
        items.push({ id: "h-ai", label: T("Add Automaton"), run: () => void A.hostedAddAi() });
        items.push({ id: "h-start", label: T("Start"), cls: "btn-play", run: () => void A.hostedStart() });
      } else if (lobby.phase === "lobby") {
        items.push({ id: "h-ready", label: T("Ready"), run: () => A.caption(T("ready")) });
      } else para(T("Session starting"), w, "accent");
      items.push({ id: "h-leave", label: T("Leave Room"), cls: "btn-subtle", run: () => A.hostedLeave() });
      buttonRows("h-actions", items, w);
    }
    buttonRows("h-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => { A.hostedLeave(); A.showModeSelect(); } }], w);
  }, { label: T("Hosted Play") });
}

/** The game's own options (the old Settings block without what the runtime's Options do now). */
function settingsBlock(w: number): void {
  const o = A.options();
  lbl(T("Theme"), "fact-key");
  const ti = ui.id("set-theme").select(T("Visual theme"), Math.max(0, THEMES.findIndex((t: Any) => t.id === o.theme)), THEMES.map((t: Any) => T(t.name)));
  if (THEMES[ti] && THEMES[ti].id !== o.theme) { platform.setOption("theme", THEMES[ti].id); A.applySettings(); }
  const toggle = (label: string, k: "cvdPalette" | "leftHanded" | "holdToConfirm" | "hints"): void => {
    const v = ui.checkbox(label, o[k]);
    if (v !== o[k]) { A.cue("ack"); platform.setOption(k, v); A.applySettings(); }
  };
  toggle(T("Color-vision-safe palette"), "cvdPalette");
  toggle(T("Left-handed controls"), "leftHanded");
  toggle(T("Hold to confirm"), "holdToConfirm");
  toggle(T("Hints"), "hints");
  para(T("Sound volumes, graphics quality, frame rate, controls, language, larger text, high contrast and reduced motion are in the StarHermit Options (F1)."), w, "small");
  buttonRows("set-sh", [{ id: "sh-options", label: T("StarHermit Options"), run: () => openMenu() }], w);
}
function settingsScreen(): void {
  screen("settings", (w) => {
    title(T("Settings"), w);
    settingsBlock(w);
    buttonRows("settings-foot", [
      { id: "replay-tut", label: T("Replay Tutorials"), run: () => A.showScreen("tutorials") },
      { id: "back", label: back(), cls: "btn-subtle", run: () => A.showTitle() },
    ], w);
  }, { label: T("Settings") });
}

function helpBody(w: number): void {
  const cards: [string, string][] = [
    [T("Move"), T("Click a glowing room, press arrow keys to browse, Enter to go. Linked rooms only.")],
    [T("Tasks"), T("Stand in a room with an unfinished task and choose its action. Finish every task to win as crew.")],
    [T("Incidents"), T("Find a silenced tinkerer? Report it (⚠) to convene the council.")],
    [T("Voting"), T("During a council, vote to eject a suspect or skip. Majority decides.")],
    [T("Keys"), T("{commit} confirm · {pause} pause/cancel · {undo} undo (practice) · {hint} hint · {camera} camera reset · {wait} wait",
      { commit: key("commit"), pause: key("pause"), undo: key("undo"), hint: key("hint"), camera: key("camera"), wait: key("wait") })],
  ];
  for (const [t, d] of cards) {
    ui.column(`help-${t}`, () => { heading(t, "h3"); para(d, w - 28, "muted"); }, { style: "card", width: w, spacing: 4 });
  }
}
function helpScreen(): void {
  screen("help", (w) => {
    title(T("How to Play"), w);
    helpBody(w);
    buttonRows("help-back", [{ id: "back", label: back(), cls: "btn-subtle", run: () => A.closeHelp() }], w);
  }, { label: T("How to Play") });
}

// ------------------------------------------------------------------ the in-session HUD
const hud = { top: 0 };
function actionItems(): { id: string; label: string; run: () => void }[] {
  const s = A.state();
  const acts = A.legal();
  const out: { id: string; label: string; run: () => void }[] = [];
  for (const a of acts) {
    if (a.type === "move") out.push({ id: "move:" + a.room, label: T("Go: {room}", { room: roomName(a.room) }), run: () => A.humanAct({ type: "move", room: a.room }) });
    else if (a.type === "task") out.push({ id: "task:" + a.task, label: T("Do: {task}", { task: taskLabel(s, a.task) }), run: () => A.humanAct({ type: "task", task: a.task }) });
    else if (a.type === "report") out.push({ id: "report:" + a.body, label: T("⚠ Report incident"), run: () => A.humanAct({ type: "report", body: a.body }) });
    else if (a.type === "eliminate") out.push({ id: "eliminate:" + a.target, label: T("Eliminate {name}", { name: playerName(s, a.target) }), run: () => A.humanAct({ type: "eliminate", target: a.target }) });
    else if (a.type === "call") out.push({ id: "call", label: T("Ring the chime"), run: () => A.humanAct({ type: "call" }) });
    else if (a.type === "vote") out.push({ id: "vote:" + a.choice, label: a.choice === "skip" ? T("Vote: skip") : T("Vote: {name}", { name: playerName(s, a.choice) }), run: () => A.humanAct({ type: "vote", choice: a.choice }) });
  }
  if (acts.some((a) => a.type === "wait")) out.push({ id: "wait", label: T("Wait"), run: () => A.humanAct({ type: "wait" }) });
  if (A.practice()) out.push({ id: "undo", label: T("↩ Undo ({key})", { key: key("undo") }), run: () => A.undo() });
  out.push({ id: "hint", label: T("💡 Hint ({key})", { key: key("hint") }), run: () => A.hint() });
  return out;
}
function actorLine(): string {
  const s = A.state();
  return s.phase === "meeting" ? T("Council in session — cast your vote") : s.phase === "over" ? T("Session over") : T("Your move");
}
function progressLine(): string {
  const s = A.state();
  const done = s.tasks.filter((t: Any) => t.done).length;
  const alive = s.players.filter((p: Any) => p.alive).length;
  let txt = T("Tasks {done}/{total} · {alive} aboard · tick {tick}", { done, total: s.tasks.length, alive, tick: s.tick });
  if (s.goals.timeLimit != null) txt += " · " + T("{n} ticks left", { n: Math.max(0, s.goals.timeLimit - s.elapsedTicks) });
  if (s.goals.moveLimit != null) {
    let mv = 0; for (const k of Object.keys(s.moveCounts)) mv += s.moveCounts[k];
    txt += " · " + T("{n} moves left", { n: Math.max(0, s.goals.moveLimit - mv) });
  }
  return txt;
}
const LOG_CLS: Record<string, string> = { task: "log-good", end: "log-good", eliminate: "log-bad", eject: "log-bad" };
/** The left rail: objective, progress, the lesson's step, the last seven log lines. */
function statusRail(w: number, lines = 7): void {
  title(app.stage ? stageTitle(app.stage) : "Hidden Council", w, "objective");
  para(progressLine(), w, "progress");
  const tut = A.tutorialText();
  if (tut) para(tut, w, "accent");
  ui.id("log").column(T("Station log"), () => {
    for (const [i, e] of A.state().log.slice(-lines).entries()) {
      ui.column(`log-${i}`, () => para(logText(e), w, LOG_CLS[e.kind] ?? "log-line"), { style: "log-row", width: w });
    }
  }, { spacing: 0, width: w });
}
/** The right rail: whose move, then one button per legal action (wrapped labels). */
function actionRail(w: number, cols = 1): void {
  para(actorLine(), w, "actor");
  const items = actionItems();
  const gap = 6;
  const bw = cols > 1 ? (w - gap) / 2 : w;
  ui.id("actions").column(T("Actions"), () => {
    for (let i = 0; i < items.length; i += cols) {
      ui.row(`act-row-${i}`, () => {
        for (const it of items.slice(i, i + cols)) wideButton(it.id, it.label, bw, "btn-action", it.run, 14.7);
      }, { spacing: gap, width: w });
    }
  }, { spacing: gap, width: w });
}
function topBar(): void {
  const short = shortLandscape();
  const r = ui.place("hud-top", "top-start", () => {
    const inner = VW - 24;
    ui.row("hud-row", () => {
      if (ui.id("pause").style("btn-top").button(T("⏸ Pause"))) A.pauseGame();
      // ⌖ draws as a missing glyph on the 1.22.0 web runtime: the map emoji instead.
      if (ui.id("map").style("btn-top").button(T("⌖ Map").replace("⌖", "🗺️"), { selected: app.overview, tooltip: T("Toggle station overview / room view") })) A.toggleMap();
      const drawers = !wide() && !phone();
      const cw = Math.max(40, inner - 260 - (drawers ? 260 : 0));
      ui.column("cap", () => { if (app.caption) para(app.caption.text, cw, "caption"); }, { width: cw, style: "topbar-caption" });
      if (drawers) {
        if (ui.id("drawer-left").style("btn-top").button(T("☰ Log"), { selected: app.drawer === "left" })) app.drawer = app.drawer === "left" ? null : "left";
        if (ui.id("drawer-right").style("btn-top").button(T("Actions ▸"), { selected: app.drawer === "right" })) app.drawer = app.drawer === "right" ? null : "right";
      }
    }, { spacing: 14, align: "center", width: inner });
  }, { padding: short ? { top: 4, start: 12, end: 12 } : { top: 8, start: 12, end: 12 }, width: VW });
  hud.top = (r.y + r.height) / SCALE;
}
function rails(): void {
  const left = A.options().leftHanded;
  const top = hud.top + 6;
  const railCls = ui.preferences().highContrast ? "rail-hc" : hudBlur ? "rail-blur" : "rail";
  const pad = shortLandscape() ? 8 : 14;
  const f = frame();
  if (phone()) {
    // Portrait phone: the status panel under the top bar, the action tray in the thumb zone.
    const w = VW - 16;
    ui.place("rail-status", { anchor: "top", y: top }, () => {
      ui.scrollArea("status-scroll", { width: w - 2 * pad, height: VH * 0.24 - 2 * pad }, () => ui.id("status-c").column(T("Objective and progress"), () => statusRail(w - 2 * pad - 12, 4), { spacing: 4, width: w - 2 * pad - 12 }), { scrollTo: { top: Infinity } });
    }, { style: railCls, width: w, padding: pad });
    ui.place("rail-actions", { anchor: "bottom", y: 8 }, () => {
      const items = actionItems().length;
      const need = 40 + Math.ceil(items / 2) * 56;
      ui.scrollArea("tray-scroll", { width: w - 2 * pad, height: Math.min(VH * 0.38, need) - 2 * pad }, () => ui.id("tray-c").column(T("Actions"), () => actionRail(w - 2 * pad - 12, 2), { spacing: 6, width: w - 2 * pad - 12 }));
    }, { style: railCls, width: w, padding: pad });
    render.setInsets(0, 0);
    return;
  }
  const short = shortLandscape();
  const h = Math.max(120, VH - top - (short ? 8 : 16));
  const railBox = (id: string, name: string, w: number, anchor: "top-start" | "top-end", build: (iw: number) => void): ui.Rect => ui.place(id, { anchor, x: 12, y: top }, () => {
    ui.scrollArea(`${id}-scroll`, { width: w - 2 * pad, height: h - 2 * pad }, () => ui.id(`${id}-c`).column(name, () => build(w - 2 * pad - 12), { spacing: 6, width: w - 2 * pad - 12 }));
  }, { style: railCls, width: w, height: h, padding: pad });
  if (wide()) {
    const lw = short ? 220 : 240, rw = short ? 220 : 260;
    const l = railBox("rail-left", T("Objective and progress"), lw, left ? "top-end" : "top-start", (iw) => statusRail(iw));
    const r = railBox("rail-right", T("Actions"), rw, left ? "top-start" : "top-end", (iw) => actionRail(iw));
    render.setInsets((left ? r : l).width / f.width, (left ? l : r).width / f.width);
    return;
  }
  render.setInsets(0, 0);
  if (!app.drawer) return;
  const w = Math.min(short ? 220 : 240, VW * 0.84);
  const isLeft = app.drawer === "left";
  railBox(`drawer-${app.drawer}`, isLeft ? T("Objective and progress") : T("Actions"), w, isLeft !== left ? "top-start" : "top-end", (iw) => (isLeft ? statusRail(iw) : actionRail(iw)));
}
function gameHud(): void {
  if (!A.inSession() || !A.state()) { A.showTitle(); return; }
  topBar();
  rails();
}

// ------------------------------------------------------------------ dialogs
function pauseDialog(): void {
  card("pause", T("Paused"), 520, (w) => {
    title(T("Paused"), w);
    if (ui.id("resume").style("btn-play").button(T("▶ Resume"))) A.resumeGame();
    settingsBlock(w);
    buttonRows("pause-foot", [
      { id: "p-help", label: T("Help"), run: () => A.showHelp("pause") },
      { id: "leave", label: T("Leave Session"), cls: "btn-subtle", run: () => A.leaveGame() },
    ], w);
  }, null, () => A.resumeGame());
}
function helpDialog(): void {
  card("help-d", T("How to Play"), 620, (w) => { title(T("How to Play"), w); helpBody(w); },
    (w) => buttonRows("help-d-back", [{ id: "help-back", label: back(), cls: "btn-subtle", run: () => A.closeHelp() }], w), () => A.closeHelp());
}
function resultsDialog(): void {
  const result = app.result;
  if (!result) return;
  const won = result.playerWon != null ? !!result.playerWon : result.winner === "crew";
  const headline = won ? T("The Station Turns Again") : T("The Gears Fall Silent");
  card("results", headline, 600, (w) => {
    title(headline, w);
    // Decorative illustration; the screen reads identically without it.
    if (VH >= 520) ui.column("hero", () => { /* the illustration is the box's background */ }, { width: w, height: Math.min(VH * 0.26, w * 0.38, 210), style: "hero-img" });
    const side = result.winner === "crew" ? T("Crew victory") : result.winner ? T("Saboteur victory") : T("Session over");
    para(T("{side} — {reason}", { side, reason: reasonText(result.winReason) })
      + (result.playerRole ? " · " + (result.playerRole === "saboteur" ? T("you played a saboteur") : T("you played loyal crew")) : ""), w, "headline");
    const tw = Math.min(w, 320);
    lbl(T("Score breakdown"), "muted");
    ui.grid(T("Score breakdown"), () => {
      for (const [k, v] of Object.entries(result.score.parts as Record<string, number>)) {
        lbl(scorePartName(k), "text");
        ui.style("text", { text: { align: "end" } }).label(String(Math.round(Math.max(0, v))));
      }
      ui.gridRow("score-row").style("total").label(T("Total"));
      ui.style("total", { text: { align: "end" } }).label(String(Math.round(Math.max(0, result.score.total))));
    }, { columns: [{ fr: 1 }, { width: "auto", align: "end" }], gap: { row: 8, column: 14 }, width: tw, rowStyle: "score-row" });
    if (result.seats) {
      lbl(T("The council"), "muted");
      for (const s of result.seats as Any[]) {
        para(`${s.name}${s.ai ? " (" + T("automaton") + ")" : ""} — ${s.role === "saboteur" ? T("saboteur") : T("crew")} · ${s.total}${s.won ? " ✓" : ""}`, w, s.you ? "you" : "text");
      }
    }
    for (const k of app.fresh) lbl("🏅 " + achievementName(k), "ach");
    if (app.meta.lbLine) para(app.meta.lbLine, w, "muted");
    const board = app.meta.board;
    if (board === "loading") para(T("Loading the global board…"), w, "muted");
    else if (board === null) para(T("Global board unavailable (offline)."), w, "muted");
    else if (Array.isArray(board)) {
      heading(T("Global board"), "h2");
      if (!board.length) para(T("No entries yet."), w, "text");
      for (const e of board) para(`${e.rank}. ${e.name} — ${Math.round(e.score)}${e.you ? " (" + T("you") + ")" : ""}`, w, e.you ? "you" : "text");
    }
  }, (w) => {
    const items: Item[] = [
      { id: "retry", label: T("↻ Retry"), cls: "btn-mode", run: () => A.retry() },
      { id: "next", label: T("Next Stage"), cls: "btn-play", run: () => A.nextStage() },
    ];
    if (result.hash) items.push({ id: "hash", label: T("Copy Replay Hash: {hash}", { hash: result.hash.toString(16) }), cls: "btn-subtle", run: () => A.copyHash() });
    items.push({ id: "to-title", label: T("← Title"), cls: "btn-subtle", run: () => A.leaveGame() });
    buttonRows("results-foot", items, w);
  }, null);
}

// ------------------------------------------------------------------ toasts
function toasts(): void {
  if (!app.toasts.length) return;
  ui.place("toasts", { anchor: "bottom", y: 16 }, () => {
    for (const t of app.toasts) {
      const max = Math.min(VW - 32, 560);
      ui.column(`toast-${t.until}`, () => para(t.text, Math.min(max - 34, textWidth(t.text, ["accent"], "label") + 2), "accent"), { style: "toast" });
    }
  }, { spacing: 6, align: "center" });
}

// ------------------------------------------------------------------ the frame
export function drawScreens(): void {
  measureViewport();
  switch (app.screen) {
    case "title": titleScreen(); break;
    case "modes": modesScreen(); break;
    case "setup": setupScreen(); break;
    case "tutorials": tutorialsScreen(); break;
    case "journey": journeyScreen(); break;
    case "practice": practiceScreen(); break;
    case "challenges": challengesScreen(); break;
    case "hosted": hostedScreen(); break;
    case "settings": settingsScreen(); break;
    case "help": helpScreen(); break;
    case "game": gameHud(); break;
  }
  if (app.screen === "game") {
    if (app.modal === "pause") pauseDialog();
    else if (app.modal === "help") helpDialog();
    else if (app.modal === "results") resultsDialog();
  }
  toasts();
}
