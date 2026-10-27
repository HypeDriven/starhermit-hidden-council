// Hidden Council on the StarHermit engine: the entry module (starhermit.txt
// engine.entry), played natively by the StarHermit client and in browsers by
// the engine's web runtime. The rules, AI, content, session driver and save
// shapes are the browser build's (src/rules.js, src/content.js,
// src/session.js), unchanged in behaviour; hosted councils are refereed by
// server.js (src/hosted.js); the screens and HUD are starhermit:ui
// (screens.ts), the station starhermit:scene (render.ts), the controller
// app.ts, saves and the platform platform.ts.
import { frame, onFixedUpdate, onPreferencesChange, onQuit, onRender, onResume, onStart, onSuspend, onUpdate, preferences, setFixedRate } from "starhermit:engine";
import { isKeyDown, onAction, onPointerButton, onTouch } from "starhermit:input";
import { onSessionEnded } from "starhermit:platform";
import * as ui from "starhermit:ui";
import { shStrings } from "../src/platform-i18n.js";
import { initLanguage } from "./i18n.ts";
import * as render from "./render.ts";
import * as audio from "./audio.ts";
import * as platform from "./platform.ts";
import { lookFor } from "./quality.ts";
import { initStyles } from "./style.ts";
import { drawScreens, setHudBlur } from "./screens.ts";
import * as A from "./app.ts";
import { app } from "./app.ts";

const STEP_MS = 1000 / 60;

onStart(() => {
  setFixedRate(60);
  initLanguage();
  initStyles();
  platform.initPlatform();
  platform.onOptionsChange(() => A.applySettings());
  render.setReducedMotion(preferences().reducedMotion);
  applyLook();
  render.setPalette(platform.options.cvdPalette);
  audio.loadSfx();
  A.showTitle();
});
onPreferencesChange((p) => render.setReducedMotion(p.reducedMotion));
onSessionEnded(() => A.toast(shStrings().signedOut));

let hidden = false;
onSuspend(() => {
  hidden = true;
  audio.setSuspended(true);
  A.onSuspend();
  platform.flush();
});
onResume(() => { hidden = false; audio.setSuspended(false); });
onQuit(() => platform.flush());

// ------------------------------------------------------------------ keys and pads
function inPlay(): boolean {
  return app.screen === "game" && !app.modal && A.inSession() && !ui.capturingKeys();
}
onAction((e) => {
  if (!e.pressed || ui.capturingKeys()) return;
  if (app.screen === "game" && app.modal === "pause" && e.action === "pause" && A.fresh()) { A.resumeGame(); return; }
  if (!inPlay()) return;
  switch (e.action) {
    case "pause": if (A.fresh()) A.pauseGame(); return;
    case "undo": A.undo(); return;
    case "hint": A.hint(); return;
    case "camera": A.resetCamera(); return;
    // Space, Enter and South on a focused button are the button's.
    case "wait": if (!ui.focused()) A.humanAct({ type: "wait" }); return;
    case "commit": if (!ui.focused()) A.commitTarget(); return;
    case "prev_target":
    case "next_target": {
      ui.setFocus(null);
      const shift = isKeyDown("ShiftLeft") || isKeyDown("ShiftRight");
      A.cycleTarget(e.action === "prev_target" ? -1 : 1, e.action === "next_target" && shift);
      return;
    }
    default:
  }
});

// ------------------------------------------------------------------ taps and clicks on the station
// A tap or click picks a room or pawn; a drag past 12 px or a press held past
// 500 ms commits nothing (the old canvas gesture rule). Presses are decided
// after the frame's UI is built, so one over a widget (ui.pointerOver) is the
// widget's.
type Press = { x: number; y: number; t: number; overUi: boolean };
let press: Press | null = null;
const pending: { kind: "down" | "up"; x: number; y: number }[] = [];
let lastTouch = -1e9;
onPointerButton((e) => {
  if (e.button !== 0 || A.clock.ms - lastTouch < 600) return;
  pending.push({ kind: e.pressed ? "down" : "up", x: e.x, y: e.y });
});
onTouch((e) => {
  if (!e.primary || e.control) return;
  lastTouch = A.clock.ms;
  if (e.phase === "start") pending.push({ kind: "down", x: e.x, y: e.y });
  else if (e.phase === "end") pending.push({ kind: "up", x: e.x, y: e.y });
  else if (e.phase === "cancel") press = null;
});
function handlePointer(): void {
  const scale = frame().scale || 1;
  while (pending.length) {
    const p = pending.shift()!;
    if (p.kind === "down") { press = { x: p.x, y: p.y, t: A.clock.ms, overUi: ui.pointerOver() }; continue; }
    const d = press;
    press = null;
    if (!d || d.overUi || !inPlay()) continue;
    if (Math.hypot(p.x - d.x, p.y - d.y) >= 12 * scale || A.clock.ms - d.t >= 500) continue;
    A.tapStation(p.x, p.y);
  }
}

// ------------------------------------------------------------------ frame
let lookKey = "";
function applyLook(): void {
  const f = frame();
  const key = `${f.quality}:${f.levelIndex}`;
  if (key === lookKey) return;
  lookKey = key;
  const look = lookFor(f.quality, f.levelIndex);
  setHudBlur(look.budget.hudBlur);
  render.applyLook(look);
}
onFixedUpdate(() => {
  if (hidden) return;
  A.tick(STEP_MS);
});
let frameDt = 0;
onUpdate((dt) => {
  frameDt = dt;
  applyLook();
  audio.update();
});
onRender(() => {
  drawScreens();
  handlePointer();
  const f = frame();
  render.update(frameDt, f.width, f.height, hidden || app.phase === "paused");
});
