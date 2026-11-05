// The look per graphics level. The engine-owned effects (shadows and their
// map size, ambient occlusion, bloom, the grade, anti-aliasing) are the
// level's own (levelSettings(): the same table every StarHermit game reads).
// The game's art (materials, the deck texture, gears, round-geometry LOD,
// reflections, dust motes, detail, the frosted HUD) is the browser build's
// four presets and their 60 FPS budgets (src/gfx.js before the port: TABLE
// and BUDGETS) keyed by the level's quality tier, with the dust motes scaled
// by the level's particle budget against the tier's anchor level (quantum,
// molecular, terrestrial, galactic), at most 4×. The runtime owns what the old Settings ›
// Graphics panel did besides: Auto and the level choice, render scale and the
// pixel-ratio cap, adaptive resolution, the frame-rate limit and readout.
// The per-effect overrides of the old panel are gone with it.
import { levelSettings, type GraphicsLevel, type LevelSettings, type QualityTier } from "starhermit:engine";
import type { AntialiasMode } from "starhermit:scene";

export interface Budget {
  /** Station surfaces: Lambert on Low, Standard above; pawn shells clear-coated Physical where "physical". */
  material: "lambert" | "standard" | "physical";
  /** Procedural deck texture size (pads ≤ 512, gratings ¼), within the level's largest texture. */
  texture: number;
  /** Decorative gears around the deck (plain detail shows at most 8). */
  gears: number;
  /** Round-geometry LOD multiplier (gears, lamps, rims, pipes, pawns). */
  segments: number;
  /** Dust motes at the tier's floor level. */
  motes: number;
  /** Frosted rails and overlays over the 3D view. */
  hudBlur: boolean;
}
export interface Look {
  preset: QualityTier;
  /** The level's key-light shadow map size, 0 when the level draws no shadows. */
  shadows: number;
  /** The level's ambient occlusion (null: off). */
  ao: { resolution: number; samples: number; denoiseSamples: number } | null;
  /** The level's bloom resolution (null: off). */
  bloom: number | null;
  grade: boolean;
  antialias: AntialiasMode;
  reflections: boolean;
  particles: "off" | "low" | "high";
  detailed: boolean;
  budget: Budget;
}

type Art = Pick<Look, "reflections" | "particles" | "detailed">;
const ART: Record<QualityTier, Art> = {
  low: { reflections: false, particles: "off", detailed: false },
  balanced: { reflections: true, particles: "low", detailed: true },
  high: { reflections: true, particles: "high", detailed: true },
  ultra: { reflections: true, particles: "high", detailed: true },
};
export const BUDGETS: Record<QualityTier, Budget> = {
  low: { material: "lambert", texture: 128, gears: 6, segments: 0.5, motes: 240, hudBlur: false },
  balanced: { material: "standard", texture: 256, gears: 10, segments: 0.75, motes: 480, hudBlur: false },
  high: { material: "physical", texture: 512, gears: 14, segments: 1, motes: 520, hudBlur: true },
  ultra: { material: "physical", texture: 1024, gears: 20, segments: 1.5, motes: 800, hudBlur: true },
};
/** The most motes any look draws (the geometry's size). */
export const MOTE_MAX = 3200;
/** The level whose settings are each tier's preset. */
const ANCHOR: Record<QualityTier, GraphicsLevel> = { low: "quantum", balanced: "molecular", high: "terrestrial", ultra: "galactic" };

/** The look for a graphics level (the frame's by default). */
export function lookFor(s: LevelSettings = levelSettings()): Look {
  const preset = s.quality;
  // Motes grow with the level's particle budget above the tier's anchor, at most 4×.
  const k = Math.min(4, s.particles / levelSettings(ANCHOR[preset]).particles);
  const b = BUDGETS[preset];
  const look: Look = {
    preset, ...ART[preset],
    shadows: s.shadows ? s.shadowMapSize : 0,
    ao: s.ao && { resolution: s.ao.resolution, samples: s.ao.samples, denoiseSamples: s.ao.denoiseSamples },
    bloom: s.bloom ? s.bloom.resolution : null,
    grade: s.grade,
    antialias: s.antialias,
    budget: { ...b, texture: Math.min(b.texture, s.maxTextureSize), motes: Math.min(MOTE_MAX, Math.round(b.motes * k)) },
  };
  // Dust motes "low" drew a third of the budget.
  if (look.particles === "low") look.budget.motes = Math.round(look.budget.motes / 3);
  return look;
}
