'use strict';
// Graphics quality model: presets, per-category overrides, hardware-level detection, per-preset budgets and a
// cost summary. Pure (no three.js, no DOM) so the settings panel, the renderer
// and the unit tests agree on what a setting means.

export const PRESETS = ['low', 'balanced', 'high', 'ultra'];

// Category → allowed tiers, cheapest first.
export const CATEGORIES = {
  shadows: ['off', 'low', 'medium', 'high'],
  ao: ['off', 'on', 'high'],
  bloom: ['off', 'on'],
  grade: ['off', 'on'],
  antialias: ['off', 'fxaa', 'smaa', 'msaa'],
  reflections: ['off', 'on'],
  particles: ['off', 'low', 'high'],
  detail: ['plain', 'detailed'],
};

// Each preset is a row of tiers plus a render scale (multiplies the device
// pixel ratio) and a pixel-ratio cap so Low stays as cheap as the old renderer.
const TABLE = {
  low: { scale: 1, cap: 1, shadows: 'off', ao: 'off', bloom: 'off', grade: 'off', antialias: 'msaa', reflections: 'off', particles: 'off', detail: 'plain' },
  balanced: { scale: 1, cap: 1.5, shadows: 'low', ao: 'off', bloom: 'on', grade: 'on', antialias: 'fxaa', reflections: 'on', particles: 'low', detail: 'detailed' },
  high: { scale: 1, cap: 2, shadows: 'medium', ao: 'on', bloom: 'on', grade: 'on', antialias: 'smaa', reflections: 'on', particles: 'high', detail: 'detailed' },
  ultra: { scale: 1.25, cap: 2, shadows: 'high', ao: 'high', bloom: 'on', grade: 'on', antialias: 'msaa', reflections: 'on', particles: 'high', detail: 'detailed' },
};

export const SHADOW_MAP = { off: 0, low: 1024, medium: 2048, high: 4096 };
export const PARTICLE_COUNT = { off: 0, low: 160, high: 520 };

// Auto picks the preset from the StarHermit hardware level (0 = Galaxy S20 / Intel UHD or weaker, 20 = RTX
// 5090; gpu-level.js → window.StarHermitGpu, a classic script loaded before the bundle): Low from 0, Balanced
// from 4, High from 10, Ultra from 17. Phones, tablets and ≤ 4 GB machines are capped at level 9 (Balanced).
export const LEVELS = { low: 0, balanced: 4, high: 10, ultra: 17 };

const gpuApi = () => globalThis.StarHermitGpu;

/** Hardware level 0–20 for an unmasked renderer string plus StarHermitGpu.detectSystem() facts. */
export function detectLevel(gpu, system) {
  const G = gpuApi();
  if (!G) return LEVELS.balanced;
  return G.detectLevel({ webgl: true, webgl2: true, ...(system || {}), gpu: String(gpu || '') });
}

/** The preset Auto starts from for a hardware level. */
export function presetForLevel(level) {
  const G = gpuApi();
  return G ? G.presetForLevel(level, LEVELS) : PRESETS.filter((p) => LEVELS[p] <= level).pop() || 'low';
}

/** Best preset for this GPU (the hardware level already caps phones/tablets at Balanced). */
export function detectPreset(gpu, system) {
  return presetForLevel(detectLevel(gpu, system));
}

/** Auto choice for a GPU; `mobile` caps phones/tablets at Balanced through the hardware level. */
export function autoPreset(gpu, mobile) {
  return detectPreset(gpu, { mobile: !!mobile });
}

/*
 * Per-preset asset and effect budget. Each preset is tuned to hold 60 FPS on the weakest GPU Auto gives
 * it (Low → level 0, Balanced → 4, High → 10, Ultra → 17; measured with tests/gfx-bench.mjs). Gameplay is
 * identical on every preset — only visuals change.
 *   hudBlur    frosted (CSS backdrop-filter) side rails and overlays over the live 3D view — re-composited
 *              every frame the scene moves, so only High/Ultra get it
 *   material   station surfaces 'lambert' | 'standard'; pawns: lacquered 'physical' (clearcoat) on High+
 *   texture    procedural deck/pad texture size in px (Surface detail: detailed; grating is ¼)
 *   gears      decorative gears around the deck (each gear is one merged mesh)
 *   segments   round-geometry LOD multiplier (gears, pipes, lamps, rims, pawns; min 6)
 *   motes      drifting dust motes at the floor level (Dust motes: low draws a third)
 *   bloomRes / aoRes  bloom and GTAO resolution as a fraction of the frame
 */
export const BUDGETS = {
  low: { hudBlur: false, material: 'lambert', texture: 128, gears: 6, segments: 0.5, motes: 240, bloomRes: 0.5, aoRes: 0.5 },
  balanced: { hudBlur: false, material: 'standard', texture: 256, gears: 10, segments: 0.75, motes: 480, bloomRes: 0.5, aoRes: 0.5 },
  high: { hudBlur: true, material: 'physical', texture: 512, gears: 14, segments: 1, motes: 520, bloomRes: 0.5, aoRes: 0.5 },
  ultra: { hudBlur: true, material: 'physical', texture: 1024, gears: 20, segments: 1.5, motes: 800, bloomRes: 1, aoRes: 1 },
};
export const MOTE_MAX = 2400;
const MOTE_SHARE = { off: 0, low: 1 / 3, high: 1 };

/** A preset's concrete budget for a hardware level and Dust motes tier (counts scale ≤ 4× within the preset). */
export function budgetFor(preset, level, particles) {
  const b = { ...(BUDGETS[preset] || BUDGETS.balanced) };
  const G = gpuApi(), floor = LEVELS[preset] || 0;
  const lv = Math.max(Number.isFinite(level) ? level : floor, floor);
  const k = G ? G.scaleBudget(1, lv, floor) : 1;
  b.motes = Math.min(MOTE_MAX, Math.round(b.motes * k * (MOTE_SHARE[particles] ?? 1)));
  return b;
}

/**
 * Resolve saved settings into concrete tiers.
 * `saved`: { preset: 'auto'|preset, render_scale, adaptive, show_fps, <category>: 'preset'|tier }.
 */
export function resolve(saved, detected, level) {
  const s = saved || {};
  const auto = !PRESETS.includes(s.preset);
  const preset = auto ? (PRESETS.includes(detected) ? detected : 'balanced') : s.preset;
  const row = TABLE[preset];
  const out = {
    preset, auto,
    scale: row.scale * clamp(Number(s.render_scale) || 1, 0.5, 2),
    cap: row.cap,
  };
  for (const [cat, tiers] of Object.entries(CATEGORIES)) out[cat] = tiers.includes(s[cat]) ? s[cat] : row[cat];
  out.level = Number.isFinite(level) ? level : LEVELS[preset];
  out.budget = budgetFor(preset, out.level, out.particles);
  out.adaptive = s.adaptive !== false;
  out.showFps = !!s.show_fps;
  // The post chain runs only when something needs it; otherwise the canvas MSAA is used.
  out.post = out.ao !== 'off' || out.bloom === 'on' || out.grade === 'on' || out.antialias === 'fxaa' || out.antialias === 'smaa';
  return out;
}

/** Choosing a preset clears every per-category override (keeps scale/adaptive/fps). */
export function choosePreset(saved, preset) {
  const s = saved || {};
  const out = { preset: preset === 'auto' || PRESETS.includes(preset) ? preset : 'auto' };
  for (const k of ['render_scale', 'adaptive', 'show_fps']) if (k in s) out[k] = s[k];
  return out;
}

/** The preset's own tier for a category (for "From preset (…)" labels). */
export function presetTier(preset, cat) {
  return TABLE[preset] ? TABLE[preset][cat] : undefined;
}

const WORDS = {
  noShadows: 'no shadows', shadows: '{n}² shadows', ao: 'ambient occlusion', aoFull: 'full ambient occlusion',
  bloom: 'bloom', reflections: 'reflections', motes: '{n} motes', noAa: 'no anti-aliasing', px: '{w}×{h} px',
};

/** Cost summary; `words` optionally localizes it (same keys as WORDS). */
export function describe(r, pixels, words) {
  const w = Object.assign({}, WORDS, words);
  const f = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k]);
  const parts = [
    r.shadows === 'off' ? w.noShadows : f(w.shadows, { n: SHADOW_MAP[r.shadows] }),
    r.ao === 'off' ? null : r.ao === 'high' ? w.aoFull : w.ao,
    r.bloom === 'on' ? w.bloom : null,
    r.reflections === 'on' ? w.reflections : null,
    r.particles === 'off' ? null : f(w.motes, { n: r.budget ? r.budget.motes : PARTICLE_COUNT[r.particles] }),
    r.antialias === 'off' ? w.noAa : r.antialias.toUpperCase(),
    pixels ? f(w.px, { w: pixels[0], h: pixels[1] }) : null,
  ];
  return parts.filter(Boolean).join(' · ');
}

function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
