// The look per graphics level: the browser build's four presets and their
// 60 FPS budgets (src/gfx.js before the port: TABLE and BUDGETS) keyed by the
// runtime's quality tier (frame().quality), with the dust motes scaled within
// the tier by the level (frame().levelIndex) as the browser build scaled them
// by its hardware level (≤ 4×). The runtime owns what the old Settings ›
// Graphics panel did besides: Auto and the level choice, render scale and the
// pixel-ratio cap, adaptive resolution, the frame-rate limit and readout.
// The per-effect overrides of the old panel are gone with it.
import type { QualityTier } from "starhermit:engine";
import type { AntialiasMode } from "starhermit:scene";

export interface Budget {
  /** Station surfaces: Lambert on Low, Standard above; pawn shells clear-coated Physical where "physical". */
  material: "lambert" | "standard" | "physical";
  /** Procedural deck texture size (pads ≤ 512, gratings ¼). */
  texture: number;
  /** Decorative gears around the deck (plain detail shows at most 8). */
  gears: number;
  /** Round-geometry LOD multiplier (gears, lamps, rims, pipes, pawns). */
  segments: number;
  /** Dust motes at the tier's floor level. */
  motes: number;
  /** Frosted rails and overlays over the 3D view. */
  hudBlur: boolean;
  bloomRes: number;
  aoRes: number;
}
export interface Look {
  preset: QualityTier;
  shadows: 0 | 1024 | 2048 | 4096;
  ao: "off" | "on" | "high";
  bloom: boolean;
  grade: boolean;
  antialias: AntialiasMode;
  reflections: boolean;
  particles: "off" | "low" | "high";
  detailed: boolean;
  budget: Budget;
}

const TABLE: Record<QualityTier, Omit<Look, "preset" | "budget">> = {
  low: { shadows: 0, ao: "off", bloom: false, grade: false, antialias: "msaa", reflections: false, particles: "off", detailed: false },
  balanced: { shadows: 1024, ao: "off", bloom: true, grade: true, antialias: "fxaa", reflections: true, particles: "low", detailed: true },
  high: { shadows: 2048, ao: "on", bloom: true, grade: true, antialias: "smaa", reflections: true, particles: "high", detailed: true },
  ultra: { shadows: 4096, ao: "high", bloom: true, grade: true, antialias: "msaa", reflections: true, particles: "high", detailed: true },
};
export const BUDGETS: Record<QualityTier, Budget> = {
  low: { material: "lambert", texture: 128, gears: 6, segments: 0.5, motes: 240, hudBlur: false, bloomRes: 0.5, aoRes: 0.5 },
  balanced: { material: "standard", texture: 256, gears: 10, segments: 0.75, motes: 480, hudBlur: false, bloomRes: 0.5, aoRes: 0.5 },
  high: { material: "physical", texture: 512, gears: 14, segments: 1, motes: 520, hudBlur: true, bloomRes: 0.5, aoRes: 0.5 },
  ultra: { material: "physical", texture: 1024, gears: 20, segments: 1.5, motes: 800, hudBlur: true, bloomRes: 1, aoRes: 1 },
};
/** The most motes any look draws (the geometry's size). */
export const MOTE_MAX = 3200;
/** The first level index of each tier. */
const TIER_FLOOR: Record<QualityTier, number> = { low: 0, balanced: 2, high: 4, ultra: 7 };

/** The look for a quality tier at a level index (0 … 9). */
export function lookFor(preset: QualityTier, levelIndex: number): Look {
  // Levels are about 1.64× apart in GPU throughput; motes grow at most 4× within a tier.
  const k = Math.min(4, Math.pow(1.64, Math.max(0, levelIndex - TIER_FLOOR[preset])));
  const b = BUDGETS[preset];
  const look = { preset, ...TABLE[preset], budget: { ...b, motes: Math.min(MOTE_MAX, Math.round(b.motes * k)) } };
  // Dust motes "low" drew a third of the budget.
  if (look.particles === "low") look.budget.motes = Math.round(look.budget.motes / 3);
  return look;
}
