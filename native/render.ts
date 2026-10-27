// The clockwork research station on starhermit:scene, ported from the
// browser build's three.js renderer (src/render.js before the port): the
// riveted deck, the eight octagonal room pads with brass rims and lamp posts,
// the slatted corridors, decorative gears and pipes, the capsule pawns with
// winding keys, the selection ring and legal-target rings, drifting brass dust,
// the authored camera that glides to the focused room (or the whole-station
// overview) and fits the part of the window the HUD leaves. It renders from
// rules snapshots and never changes rules state.
//
// What changed from three.js, and why:
// - The EffectComposer chain (GTAO, UnrealBloom, the grade ShaderPass, SMAA /
//   FXAA / MSAA) is renderer.ao / bloom / grade / antialias; adaptive
//   resolution, the pixel-ratio cap, render scale and the frame-rate readout
//   are the runtime's.
// - Light intensities are three.js r185's divided by π (the engine's convention).
// - The shadow camera's fitted box is the light's shadow distance.
// - Procedural canvas textures paint on an OffscreenCanvas (starhermit:canvas).
// - Transparent pawn shells write depth (three.js's default for transparent
//   materials; the engine writes none for blended ones unless asked).
// - The camera fit reads the HUD's rails from the screens' layout (setInsets)
//   instead of the DOM; nothing is drawn behind the menus (the browser build
//   tore the renderer down there).
import {
  ACESFilmicToneMapping, AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry, CanvasTexture, CapsuleGeometry, Color,
  CylinderGeometry, DirectionalLight, Fog, Group, HemisphereLight, Matrix4, Mesh, MeshBasicMaterial, MeshLambertMaterial,
  MeshPhysicalMaterial, MeshStandardMaterial, PMREMGenerator, PerspectiveCamera, Points, PointsMaterial, Quaternion, Raycaster,
  RepeatWrapping, RoomEnvironment, SRGBColorSpace, SphereGeometry, TorusGeometry, Vector3, mergeGeometries, pointerToNdc,
  renderer, scene,
} from "starhermit:scene";
import type { Material, Texture } from "starhermit:scene";
import { OffscreenCanvas, type OffscreenCanvasRenderingContext2D } from "starhermit:canvas";
import { STATION_ROOMS } from "../src/rules.js";
import { THEMES } from "../src/content.js";
import { rand01, smoothstep, clamp } from "../src/util.js";
import { MOTE_MAX, type Look } from "./quality.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
const PI = Math.PI;

/** Room anchor positions on the station deck (authored layout). */
export const ROOM_POS: Record<string, [number, number]> = {
  core: [0, 0], workshop: [-4.2, 0], observatory: [4.2, 0],
  foundry: [-6.4, 4.2], gallery: [-1.5, 4.2], aviary: [5.6, 4.2],
  cistern: [-4.2, 8.4], greenhouse: [1.8, 8.4],
};
const PAWN_COLORS = [0xff6b6b, 0x6bd5ff, 0xffd166, 0x9d6bff, 0x6bffb8, 0xff9de2, 0xc0ff6b, 0xffa26b, 0x8f9dff, 0x6bffe3, 0xe2ff6b, 0xbfbfbf];
// Color-vision-safe palette (Okabe-Ito).
const PAWN_COLORS_CVD = [0xe69f00, 0x56b4e9, 0x009e73, 0xf0e442, 0x0072b2, 0xd55e00, 0xcc79a7, 0x999999, 0x66cc99, 0xaa4499, 0xddcc77, 0x882255];
const CAM_FRAME = { dist: 14, height: 12, lookY: 0, fov: 42 };
const MENU_BG = 0x0d0f16;

// Small deterministic PRNG for procedural textures.
function prng(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
type Ctx2D = OffscreenCanvasRenderingContext2D;
function canvasTexture(size: number, paint: (g: Ctx2D, n: number) => void, repeat?: [number, number]): Texture | null {
  try {
    const c = new OffscreenCanvas(size, size);
    paint(c.getContext("2d"), size);
    const tex = new CanvasTexture(c);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 4;
    if (repeat) { tex.wrapS = tex.wrapT = RepeatWrapping; tex.repeat.set(repeat[0], repeat[1]); }
    return tex;
  } catch (e) { console.warn(`texture: ${String(e)}`); return null; }
}
// Riveted deck plates: panel seams, rivets, grime (greyscale; tinted by the material colour), authored at 256 px.
function deckTexture(size: number): Texture | null {
  return canvasTexture(size, (g, n) => {
    g.scale(n / 256, n / 256); n = 256;
    const r = prng(11);
    g.fillStyle = "#c8c8c8"; g.fillRect(0, 0, n, n);
    for (let i = 0; i < 2600; i++) { const v = Math.floor(170 + r() * 70); g.fillStyle = `rgba(${v},${v},${v},0.35)`; g.fillRect(r() * n, r() * n, 1 + r() * 3, 1 + r() * 2); }
    g.strokeStyle = "rgba(40,40,40,0.9)"; g.lineWidth = 3;
    const plates: [number, number, number, number][] = [[0, 0, 128, 128], [128, 0, 128, 128], [0, 128, 256, 128]];
    for (const [x, y, w, h] of plates) g.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
    for (const [x, y, w, h] of plates) {
      for (const [px, py] of [[x + 9, y + 9], [x + w - 9, y + 9], [x + 9, y + h - 9], [x + w - 9, y + h - 9]] as [number, number][]) {
        g.fillStyle = "rgba(60,60,60,0.9)"; g.beginPath(); g.arc(px, py + 1, 3.4, 0, 7); g.fill();
        g.fillStyle = "rgba(240,240,240,0.95)"; g.beginPath(); g.arc(px - 0.6, py - 0.4, 2.4, 0, 7); g.fill();
      }
    }
  }, [5, 4]);
}
// Room pads: turned-brass rings with an engraved dial.
function padTexture(size: number): Texture | null {
  return canvasTexture(size, (g, n) => {
    g.scale(n / 256, n / 256); n = 256;
    const r = prng(23), c = n / 2;
    g.fillStyle = "#d0d0d0"; g.fillRect(0, 0, n, n);
    for (let i = 0; i < 120; i++) { const v = Math.floor(170 + r() * 80); g.strokeStyle = `rgba(${v},${v},${v},0.5)`; g.lineWidth = 1; g.beginPath(); g.arc(c, c, r() * c, 0, 7); g.stroke(); }
    g.strokeStyle = "rgba(70,70,70,0.85)";
    for (const rad of [c * 0.92, c * 0.3]) { g.lineWidth = 3; g.beginPath(); g.arc(c, c, rad, 0, 7); g.stroke(); }
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * PI * 2, l = i % 6 === 0 ? 0.78 : 0.85;
      g.lineWidth = i % 6 === 0 ? 3 : 1.5;
      g.beginPath(); g.moveTo(c + Math.cos(a) * c * l, c + Math.sin(a) * c * l); g.lineTo(c + Math.cos(a) * c * 0.9, c + Math.sin(a) * c * 0.9); g.stroke();
    }
  });
}
// Corridor grating: cross slats.
function grateTexture(size: number): Texture | null {
  return canvasTexture(size, (g, n) => {
    g.scale(n / 64, n / 64); n = 64;
    g.fillStyle = "#e0e0e0"; g.fillRect(0, 0, n, n);
    g.fillStyle = "rgba(50,50,50,0.85)";
    for (let y = 4; y < n; y += 16) g.fillRect(0, y, n, 5);
    g.fillStyle = "rgba(255,255,255,0.6)";
    for (let y = 9; y < n; y += 16) g.fillRect(0, y, n, 1);
  }, [1, 6]);
}
function moteTexture(): Texture | null {
  return canvasTexture(32, (g, n) => {
    const grd = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    grd.addColorStop(0, "rgba(255,255,255,1)"); grd.addColorStop(0.35, "rgba(255,255,255,0.45)"); grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd; g.fillRect(0, 0, n, n);
  });
}
const hex = (c: Color): string => "#" + c.getHex().toString(16).padStart(6, "0");

// ------------------------------------------------------------------ state
type Theme = (typeof THEMES)[number];
type Pawn = { group: Group; body: Mesh; key: Mesh; target: Vector3; id: string; index: number; bob: number };
let look: Look | null = null;
let theme: Theme = THEMES[0];
let visualSeed = 1;
let reducedMotion = false;
let cvd = false;
let active = false;
let time = 0;
let envTex: Texture | null = null;
let bgTex: Texture | null = null;
let envGroup: Group | null = null;
let envTextures: Texture[] = [];
let detailMats: { mat: Any; map: Texture | null }[] = [];
let lampMat: Any = null;
let gears: Mesh[] = [];
const roomMeshes = new Map<string, Mesh>();
const pawns = new Map<string, Pawn>();
let selected: string | null = null;
let focusRoom = "core";
let overview = false;
let assetKey = "";
let insets = { l: 0, r: 0 };
let aspect = 16 / 9;

const camera = new PerspectiveCamera(CAM_FRAME.fov, 16 / 9, 0.1, 200);
const keyLight = new DirectionalLight(0xffd9a0, 2.4 / PI);
const fillLight = new HemisphereLight(0x4a5a8a, 0x1a1420, 0.9 / PI);
const rimLight = new DirectionalLight(0xffb54d, 0.5 / PI);
const raycaster = new Raycaster();
const LAYER_GAME = 1;
raycaster.layers.set(LAYER_GAME);

const marker = new Mesh(new TorusGeometry(0.55, 0.06, 8, 24), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
const previews = new Group();
let moteGeo: BufferGeometry | null = null;
let moteMat: PointsMaterial | null = null;
let motes: Points | null = null;
let moteSeeds: Float32Array | null = null;

let built = false;
function build(): void {
  built = true;
  renderer.camera = camera;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  keyLight.target.position.set(0, 0, 4);
  keyLight.position.set(6, 12, 8);
  keyLight.shadow.bias = -0.0006;
  keyLight.shadow.normalBias = 0.02;
  keyLight.shadow.distance = 32;
  rimLight.position.set(-5, 6, -8);
  scene.add(keyLight, keyLight.target, fillLight, rimLight);
  marker.rotation.x = PI / 2;
  marker.visible = false;
  scene.add(marker, previews);
  // Drifting brass-dust motes: additive, never pickable.
  const pos = new Float32Array(MOTE_MAX * 3);
  const r = prng(visualSeed || 1);
  moteSeeds = new Float32Array(MOTE_MAX * 2);
  for (let i = 0; i < MOTE_MAX; i++) {
    pos[i * 3] = r() * 22 - 11; pos[i * 3 + 1] = 0.3 + r() * 3.4; pos[i * 3 + 2] = r() * 18 - 5;
    moteSeeds[i * 2] = r() * PI * 2; moteSeeds[i * 2 + 1] = 0.05 + r() * 0.12;
  }
  moteGeo = new BufferGeometry();
  moteGeo.setAttribute("position", new BufferAttribute(pos, 3));
  moteMat = new PointsMaterial({ color: theme.accent, size: 0.09, map: moteTexture() ?? undefined, transparent: true, opacity: 0.75, depthWrite: false, blending: AdditiveBlending, sizeAttenuation: true });
  motes = new Points(moteGeo, moteMat);
  motes.frustumCulled = false;
  scene.add(motes);
  applyTheme();
  setActive(false);
}

// ------------------------------------------------------------------ theme and look
/** The visual theme by id (THEMES in src/content.js). */
export function setTheme(id: string): void {
  const t = THEMES.find((x: Theme) => x.id === id) || THEMES[0];
  if (t === theme && bgTex) return;
  theme = t;
  if (built) applyTheme();
}
function applyTheme(): void {
  const t = theme;
  // Background: a soft radial glow of the theme sky.
  const sky = new Color(t.sky);
  const lift = sky.clone().lerp(new Color(t.accent), 0.12).offsetHSL(0, 0, 0.05);
  const dark = sky.clone().multiplyScalar(0.7);
  if (bgTex) bgTex.dispose();
  bgTex = canvasTexture(128, (g, n) => {
    const grd = g.createRadialGradient(n / 2, n * 0.42, 0, n / 2, n / 2, n * 0.72);
    grd.addColorStop(0, hex(lift)); grd.addColorStop(1, hex(dark));
    g.fillStyle = grd; g.fillRect(0, 0, n, n);
  });
  scene.fog = new Fog(t.sky, 34, 80);
  keyLight.color.set(t.key);
  fillLight.color.set(t.fill);
  fillLight.groundColor.set(t.sky);
  rimLight.color.set(t.accent);
  if (lampMat) { lampMat.emissive.set(t.key); lampMat.color.set(t.key); }
  if (moteMat) moteMat.color.set(t.accent);
  for (const m of previews.children as Mesh[]) (m.material as MeshBasicMaterial).color.set(t.accent);
  if (envGroup) rebuildEnvironment();
  applyBackground();
}
function applyBackground(): void { scene.background = active ? (bgTex ?? new Color(theme.sky)) : new Color(MENU_BG); }

function surfaceMat(p: Any): Any {
  if (look?.budget.material === "lambert") {
    const m = new MeshLambertMaterial({ color: p.color });
    if (p.emissive != null) { m.emissive.set(p.emissive); m.emissiveIntensity = p.emissiveIntensity ?? 1; }
    if (p.bumpScale != null) m.bumpScale = p.bumpScale;
    return m;
  }
  return new MeshStandardMaterial(p);
}
/** Round-geometry segment count for the budget (authored count × LOD multiplier, at least `min`). */
function seg(n: number, min = 6): number { return Math.max(min, Math.round(n * (look?.budget.segments ?? 1))); }

function disposeTree(g: Group): void {
  g.traverse((o: Any) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: Material) => m.dispose());
  });
}
function rebuildEnvironment(): void {
  if (envGroup) { scene.remove(envGroup); disposeTree(envGroup); for (const t of envTextures) t.dispose(); }
  roomMeshes.clear();
  gears = [];
  buildEnvironment();
  applyDetail();
}

/** One merged mesh per gear (body, teeth, hub): one draw call. */
function makeGear(radius: number, teeth: number, thick: number, mat: Material): Mesh {
  const parts: BufferGeometry[] = [new CylinderGeometry(radius, radius, thick, seg(24, 8))];
  const m = new Matrix4(), q = new Quaternion(), up = new Vector3(0, 1, 0), one = new Vector3(1, 1, 1);
  for (let i = 0; i < teeth; i++) {
    const tooth = new BoxGeometry(radius * 0.28, thick, radius * 0.24);
    const a = (i / teeth) * PI * 2;
    tooth.applyMatrix4(m.compose(new Vector3(Math.cos(a) * radius * 1.08, 0, Math.sin(a) * radius * 1.08), q.setFromAxisAngle(up, -a), one));
    parts.push(tooth);
  }
  parts.push(new CylinderGeometry(radius * 0.25, radius * 0.25, thick * 1.6, seg(12)));
  const geo = mergeGeometries(parts.map((p) => (p.index ? p.toNonIndexed() : p)), false) ?? parts[0]!;
  for (const g of parts) if (g !== geo) g.dispose();
  return new Mesh(geo, mat);
}

function buildEnvironment(): void {
  const t = theme, b = look!.budget;
  const group = new Group();
  const tex = { deck: deckTexture(b.texture), pad: padTexture(Math.min(512, b.texture)), grate: grateTexture(Math.max(32, b.texture / 4)) };
  envTextures = [tex.deck, tex.pad, tex.grate].filter((x): x is Texture => !!x);
  detailMats = [];
  const detailed = (mat: Any, map: Texture | null): Any => { detailMats.push({ mat, map }); return mat; };

  const deck = new Mesh(new BoxGeometry(22, 0.4, 18), detailed(surfaceMat({ color: t.floor, roughness: 0.78, metalness: 0.4, bumpScale: 1.2 }), tex.deck));
  deck.position.set(0, -0.2, 4);
  deck.receiveShadow = true;
  group.add(deck);

  lampMat = surfaceMat({ color: t.key, emissive: t.key, emissiveIntensity: 1.8, roughness: 0.3 });
  const postMat = surfaceMat({ color: 0x5a4632, roughness: 0.4, metalness: 0.85 });
  const lampGeo = new SphereGeometry(0.12, seg(16), seg(12, 4));
  const cageGeo = new TorusGeometry(0.14, 0.018, seg(6, 4), seg(16));
  const postGeo = new CylinderGeometry(0.035, 0.05, 1.0, seg(8, 5));
  const rimGeo = new TorusGeometry(1.75, 0.07, seg(8, 4), seg(32, 16));
  const rimMat = surfaceMat({ color: t.accent, roughness: 0.3, metalness: 0.85, emissive: t.accent, emissiveIntensity: 0.12 });
  const padGeo = new CylinderGeometry(1.7, 1.9, 0.35, 8);
  const padColor = new Color(t.floor).offsetHSL(0, 0.05, 0.09);

  for (const room of STATION_ROOMS) {
    const [x, z] = ROOM_POS[room.id]!;
    const pad = new Mesh(padGeo, detailed(surfaceMat({ color: padColor, roughness: 0.5, metalness: 0.6, bumpScale: 0.8 }), tex.pad));
    pad.position.set(x, 0.18, z);
    pad.receiveShadow = true; pad.castShadow = true;
    pad.userData.roomId = room.id;
    pad.layers.enable(LAYER_GAME);
    group.add(pad);
    roomMeshes.set(room.id, pad);
    const rim = new Mesh(rimGeo, rimMat);
    rim.rotation.x = PI / 2;
    rim.position.set(x, 0.36, z);
    rim.castShadow = true;
    group.add(rim);
    // Lamp post at the back edge of the pad (away from the camera, so it never hides pawns).
    const lx = x + 1.25, lz = z - 1.3;
    const post = new Mesh(postGeo, postMat);
    post.position.set(lx, 0.85, lz);
    post.castShadow = true;
    const bulb = new Mesh(lampGeo, lampMat);
    bulb.position.set(lx, 1.42, lz);
    const cage = new Mesh(cageGeo, postMat);
    cage.position.copy(bulb.position);
    cage.rotation.x = PI / 2;
    group.add(post, bulb, cage);
  }

  // Corridors between linked rooms.
  const corMat = detailed(surfaceMat({ color: t.accent, roughness: 0.42, metalness: 0.75, bumpScale: 0.6 }), tex.grate);
  const seen = new Set<string>();
  for (const room of STATION_ROOMS) {
    const [x1, z1] = ROOM_POS[room.id]!;
    for (const link of room.links) {
      const k = [room.id, link].sort().join("|");
      if (seen.has(k)) continue;
      seen.add(k);
      const [x2, z2] = ROOM_POS[link]!;
      const dx = x2 - x1, dz = z2 - z1;
      const cor = new Mesh(new BoxGeometry(0.9, 0.14, Math.hypot(dx, dz) - 3.0), corMat);
      cor.position.set((x1 + x2) / 2, 0.12, (z1 + z2) / 2);
      cor.rotation.y = Math.atan2(dx, dz);
      cor.receiveShadow = true;
      group.add(cor);
    }
  }

  // Decorative gears (deterministic placement from the visual seed); the budget sets how many.
  const gearMat = surfaceMat({ color: 0x8a6a3a, roughness: 0.3, metalness: 0.9 });
  for (let i = 0; i < b.gears; i++) {
    const teeth = 8 + Math.floor(rand01(visualSeed, i) * 6);
    const r = 0.4 + rand01(visualSeed, 50 + i) * 0.7;
    const gear = makeGear(r, teeth, 0.12, gearMat);
    const edge = i % 4;
    const gx = edge === 0 ? -10 : edge === 1 ? 10 : (rand01(visualSeed, 100 + i) * 20 - 10);
    const gz = edge < 2 ? rand01(visualSeed, 200 + i) * 16 - 4 : (edge === 2 ? -3 : 12);
    gear.position.set(gx, 0.6 + rand01(visualSeed, 300 + i) * 1.6, gz);
    gear.rotation.x = PI / 2;
    gear.userData.spin = (rand01(visualSeed, 400 + i) - 0.5) * 1.6;
    // Plain detail shows at most the first 8 gears.
    gear.userData.detailOnly = i >= 8;
    gear.castShadow = true;
    gears.push(gear);
    group.add(gear);
  }

  // Pipes around the rim.
  const pipeMat = surfaceMat({ color: 0x6a5a4a, roughness: 0.4, metalness: 0.85 });
  const pipeGeo = new CylinderGeometry(0.12, 0.12, 16, seg(12));
  for (let i = 0; i < 6; i++) {
    const pipe = new Mesh(pipeGeo, pipeMat);
    pipe.rotation.z = PI / 2;
    pipe.position.set(0, 0.3 + i * 0.28, -4.2 - (i % 2) * 0.3);
    group.add(pipe);
  }
  group.visible = active;
  envGroup = group;
  scene.add(group);
}

function applyDetail(): void {
  const on = !!look?.detailed;
  for (const d of detailMats) {
    d.mat.map = on ? d.map : null;
    d.mat.bumpMap = on ? d.map : null;
    d.mat.needsUpdate = true;
  }
  for (const g of gears) g.visible = on || !g.userData.detailOnly;
}

/** The look for the frame's graphics level; cheap when nothing changed. */
export function applyLook(next: Look): void {
  if (look && JSON.stringify(look) === JSON.stringify(next)) return;
  look = next;
  if (!built) build();
  const b = next.budget;
  const assets = [b.material, b.texture, b.gears, b.segments].join("|");
  if (assets !== assetKey) {
    const first = !assetKey;
    assetKey = assets;
    rebuildEnvironment();
    if (!first) rebuildPawns();
  }
  applyDetail();
  const shadows = next.shadows > 0;
  renderer.shadowMap.enabled = shadows;
  keyLight.castShadow = shadows;
  if (shadows) keyLight.shadow.mapSize = next.shadows;
  // Image-based lighting from a neutral room environment.
  if (next.reflections && !envTex) {
    try { envTex = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(renderer), 0.04).texture; } catch (e) { console.warn(`environment: ${String(e)}`); }
  }
  scene.environment = next.reflections ? envTex : null;
  scene.environmentIntensity = 0.22;
  fillLight.intensity = (next.reflections ? 0.7 : 0.9) / PI;
  if (motes && moteGeo) { motes.visible = active && next.particles !== "off"; moteGeo.setDrawRange(0, b.motes); }
  // Post: GTAO contact darkening, bloom limited to lamps and highlights (threshold 0.9),
  // the colour grade (gentle S-curve, saturation, warm/cool split, black lift) with vignette.
  renderer.ao = next.ao === "off" ? null : {
    blendIntensity: 0.75, radius: 0.6, distanceExponent: 1.4, thickness: 1.2, scale: 1.0,
    samples: next.ao === "high" ? 16 : 8, resolution: b.aoRes,
    denoise: { lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: next.ao === "high" ? 6 : 4, rings: 2, samples: next.ao === "high" ? 16 : 8, radiusExponent: 2 },
  };
  renderer.bloom = next.bloom ? { strength: 0.32, radius: 0.3, threshold: 0.9, resolution: b.bloomRes } : null;
  renderer.grade = next.grade ? {
    // the old shader: s-curve mixed in at 0.22, saturation 1.1, cool shadows / warm highlights, slight black lift
    space: "display", contrast: 0.12, saturation: 1.1,
    shadows: [0.97, 1.0, 1.08], highlights: [1.05, 1.0, 0.94], split: [0.15, 0.8],
    vignette: { amount: 0.28, inner: 0.38, outer: 0.9 },
  } : null;
  renderer.antialias = next.antialias;
}

export function setReducedMotion(v: boolean): void { reducedMotion = v; }
export function setPalette(colourSafe: boolean): void {
  if (cvd === colourSafe) return;
  cvd = colourSafe;
  for (const p of pawns.values()) {
    const m = p.body.material as Any;
    m.color.set(pawnColor(p.index));
  }
}

/** Shows the station (a session is on) or the plain menu backdrop. */
export function setActive(on: boolean): void {
  active = on;
  if (envGroup) envGroup.visible = on;
  for (const p of pawns.values()) p.group.visible = on;
  previews.visible = on;
  marker.visible = on && !!selected;
  if (motes) motes.visible = on && !!look && look.particles !== "off";
  if (built) applyBackground();
}

/** A new session's station: visual seed (gear layout), theme. */
export function beginSession(seed: number, themeId: string): void {
  visualSeed = seed || 1;
  clearPawns();
  setTheme(themeId);
  if (look) rebuildEnvironment();
  setActive(true);
  placeCamera("core", true);
}
export function endSession(): void {
  clearPawns();
  showLegalTargets([]);
  selected = null;
  setActive(false);
}

// ------------------------------------------------------------------ pawns
function pawnColor(i: number): number { return (cvd ? PAWN_COLORS_CVD : PAWN_COLORS)[i % PAWN_COLORS.length]!; }
function pawnShellMat(color: number): Any {
  const kind = look?.budget.material ?? "standard";
  const common = { color, transparent: true, depthWrite: true };
  if (kind === "physical") return new MeshPhysicalMaterial({ ...common, roughness: 0.38, metalness: 0.15, clearcoat: 0.6, clearcoatRoughness: 0.2, envMapIntensity: 0.6 });
  if (kind === "standard") return new MeshStandardMaterial({ ...common, roughness: 0.38, metalness: 0.15, envMapIntensity: 0.6 });
  return new MeshLambertMaterial(common);
}
function makePawn(index: number, id: string): Pawn {
  const group = new Group();
  const body = new Mesh(new CapsuleGeometry(0.22, 0.4, seg(6, 3), seg(14, 8)), pawnShellMat(pawnColor(index)));
  body.castShadow = true;
  body.layers.enable(LAYER_GAME);
  body.userData.playerId = id;
  group.add(body);
  // The clockwork winding key on the head.
  const key = new Mesh(new TorusGeometry(0.12, 0.035, seg(8, 4), seg(16)), surfaceMat({ color: 0xd9c27a, roughness: 0.25, metalness: 0.95 }));
  key.position.y = 0.62;
  key.castShadow = true;
  group.add(key);
  group.visible = active;
  return { group, body, key, target: new Vector3(), id, index, bob: index * 1.7 };
}
function clearPawns(): void {
  for (const p of pawns.values()) { scene.remove(p.group); disposeTree(p.group); }
  pawns.clear();
}
// A budget change rebuilds the pawns' meshes in place (positions, opacity kept).
function rebuildPawns(): void {
  for (const pawn of pawns.values()) {
    const fresh = makePawn(pawn.index, pawn.id);
    (fresh.body.material as Any).opacity = (pawn.body.material as Any).opacity;
    fresh.body.rotation.z = pawn.body.rotation.z;
    fresh.body.position.y = pawn.body.position.y;
    fresh.group.position.copy(pawn.group.position);
    fresh.target.copy(pawn.target);
    scene.remove(pawn.group);
    disposeTree(pawn.group);
    Object.assign(pawn, fresh);
    scene.add(pawn.group);
  }
}
/** The pawns where the state puts them (alive standing, out lying faded). */
export function syncState(state: Any): void {
  const seen = new Set<string>();
  state.players.forEach((p: Any, i: number) => {
    seen.add(p.id);
    let pawn = pawns.get(p.id);
    if (!pawn) {
      pawn = makePawn(i, p.id);
      pawns.set(p.id, pawn);
      scene.add(pawn.group);
      const [x, z] = ROOM_POS[p.room]!;
      pawn.group.position.set(x, 0.4, z);
    }
    const [x, z] = ROOM_POS[p.room]!;
    const slot = state.players.filter((q: Any) => q.alive && q.room === p.room).indexOf(p);
    const a = (slot / 7) * PI * 2;
    pawn.target.set(x + Math.cos(a) * 0.8, p.alive ? 0.4 : 0.12, z + Math.sin(a) * 0.8);
    (pawn.body.material as Any).opacity = p.alive ? 1 : 0.35;
    pawn.body.rotation.z = p.alive ? 0 : PI / 2;
  });
  for (const [id, pawn] of pawns) if (!seen.has(id)) { scene.remove(pawn.group); disposeTree(pawn.group); pawns.delete(id); }
}

// ------------------------------------------------------------------ selection / previews
export function select(playerId: string | null): void {
  selected = playerId && pawns.has(playerId) ? playerId : null;
  marker.visible = active && !!selected;
}
let previewKey = "";
export function showLegalTargets(rooms: string[]): void {
  const key = rooms.join(",") + theme.id;
  if (key === previewKey) return;
  previewKey = key;
  while (previews.children.length) {
    const m = previews.children[0] as Mesh;
    previews.remove(m);
    m.geometry.dispose();
    (m.material as Material).dispose();
  }
  for (const roomId of rooms) {
    const [x, z] = ROOM_POS[roomId]!;
    const g = new Mesh(new TorusGeometry(0.4, 0.05, 8, 20), new MeshBasicMaterial({ color: theme.accent, transparent: true, opacity: 0.75 }));
    g.rotation.x = PI / 2;
    g.position.set(x, 0.42, z);
    previews.add(g);
  }
}

// ------------------------------------------------------------------ picking
/** The pawn or room under a window pixel ({kind, id}), else null. */
export function pick(x: number, y: number): { kind: "pawn" | "room"; id: string } | null {
  if (!active) return null;
  raycaster.setFromCamera(pointerToNdc(x, y), camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  for (const h of hits) {
    const o = h.object as Any;
    if (o.userData.playerId) return { kind: "pawn", id: o.userData.playerId };
    if (o.userData.roomId) return { kind: "room", id: o.userData.roomId };
  }
  return null;
}

// ------------------------------------------------------------------ camera
let camAnim: { from: Vector3; to: Vector3; fromLook: Vector3; toLook: Vector3; t: number; dur: number } | null = null;
let camLook = new Vector3(0, 0, 2.5);
/** The rails' share of the window width (left, right; a rail wider than 40 % is ignored, as the old fit did). */
export function setInsets(l: number, r: number): void {
  const n = { l: l < 0.4 ? l : 0, r: r < 0.4 ? r : 0 };
  if (Math.abs(n.l - insets.l) + Math.abs(n.r - insets.r) < 0.004) return;
  insets = n;
  refit();
}
// Distance multiplier so a region `halfW` wide / `halfD` deep fits the HUD-free part of the window.
function fitScale(halfW: number, halfD: number): number {
  const tanV = Math.tan((CAM_FRAME.fov * PI / 180) / 2);
  const freeW = Math.max(0.4, 1 - insets.l - insets.r - 0.04), freeH = 0.82;
  // the authored pose is ~48° down; ground depth foreshortens by sin(tilt)
  const base = Math.hypot(CAM_FRAME.height, CAM_FRAME.dist * 0.55);
  const needW = halfW / (tanV * aspect * freeW);
  const needD = halfD * 0.72 / (tanV * freeH);
  return Math.max(1, needW / base, needD / base);
}
function moveCamera(pos: Vector3, lookAt: Vector3, snap: boolean): void {
  if (snap || reducedMotion) {
    camera.position.copy(pos);
    camera.lookAt(lookAt);
    camAnim = null;
    camLook = lookAt.clone();
  } else {
    camAnim = { from: camera.position.clone(), to: pos, fromLook: camLook.clone(), toLook: lookAt, t: 0, dur: 0.7 };
  }
}
// The rails overlap the view; the fit only widens the frame (as the browser build did).
function lookX(x: number): number { return x; }
export function placeCamera(roomId: string, snap = false): void {
  const [x, z] = ROOM_POS[roomId] || [0, 0];
  focusRoom = roomId;
  overview = false;
  const lookAt = new Vector3(lookX(x * 0.55), CAM_FRAME.lookY, z * 0.55 + 2.5);
  // the focused room plus its neighbours stay inside the free window
  const k = fitScale(6.2, 4.2);
  moveCamera(new Vector3(lookAt.x, CAM_FRAME.height * k, lookAt.z + CAM_FRAME.dist * 0.55 * k), lookAt, snap);
}
export function focusedRoom(): string { return focusRoom; }
function placeOverview(snap: boolean): void {
  overview = true;
  const lookAt = new Vector3(lookX(-0.3), CAM_FRAME.lookY, 4.4);
  const k = fitScale(8.4, 6.2) * 1.05;
  moveCamera(new Vector3(lookAt.x, CAM_FRAME.height * k, lookAt.z + CAM_FRAME.dist * 0.55 * k), lookAt, snap);
}
/** Whole-station overview ↔ room view (the Map control); whether the overview is on. */
export function toggleOverview(): boolean {
  if (overview) placeCamera(focusRoom || "core", false); else placeOverview(false);
  return overview;
}
export function isOverview(): boolean { return overview; }
export function resetCamera(): void { placeCamera(focusRoom || "core", false); }
function refit(): void { if (overview) placeOverview(true); else placeCamera(focusRoom || "core", true); }

// ------------------------------------------------------------------ the frame
/** Per frame: the camera's aspect, the glide, pawns, gears, lamps and motes. */
export function update(dtRaw: number, width: number, height: number, paused: boolean): void {
  if (!look) return;
  const dt = Math.min(0.1, Math.max(0, dtRaw || 0));
  if (width > 0 && height > 0) {
    const a = width / height;
    if (Math.abs(a - aspect) > 1e-4) { aspect = a; camera.aspect = a; camera.updateProjectionMatrix(); refit(); }
  }
  if (!active || paused) return;
  time += dt;
  if (camAnim) {
    camAnim.t += dt / camAnim.dur;
    const k = smoothstep(clamp(camAnim.t, 0, 1));
    camera.position.copy(camAnim.from).lerp(camAnim.to, k);
    camLook = camAnim.fromLook.clone().lerp(camAnim.toLook, k);
    camera.lookAt(camLook);
    if (camAnim.t >= 1) camAnim = null;
  }
  // Pawn motion: lift on selection, ease toward targets.
  for (const pawn of pawns.values()) {
    pawn.group.position.lerp(pawn.target, reducedMotion ? 1 : Math.min(1, dt * 6));
    const lift = selected === pawn.id ? 0.22 : 0;
    pawn.body.position.y += ((lift + (reducedMotion ? 0 : Math.sin(time * 2 + pawn.bob) * 0.02)) - pawn.body.position.y) * 0.2;
    if (!reducedMotion) pawn.key.rotation.y += dt * 2;
  }
  const sp = selected ? pawns.get(selected) : null;
  if (sp) {
    marker.position.set(sp.group.position.x, 0.05, sp.group.position.z);
    (marker.material as MeshBasicMaterial).opacity = 0.6 + (reducedMotion ? 0.2 : Math.sin(time * 4) * 0.25);
  }
  if (!reducedMotion) {
    for (const g of gears) if (g.visible) g.rotation.z += (g.userData.spin as number) * dt;
    // Lamp shimmer and drifting motes.
    if (lampMat) lampMat.emissiveIntensity = 1.8 + Math.sin(time * 3.1) * 0.18 + Math.sin(time * 7.3) * 0.08;
    if (motes && motes.visible && moteGeo && moteSeeds) {
      const p = moteGeo.attributes.position as BufferAttribute;
      const arr = p.array as Float32Array, sd = moteSeeds, n = look.budget.motes;
      for (let i = 0; i < n; i++) {
        let y = arr[i * 3 + 1]! + sd[i * 2 + 1]! * dt;
        if (y > 3.8) y = 0.3;
        arr[i * 3 + 1] = y;
        arr[i * 3]! += Math.sin(time * 0.6 + sd[i * 2]!) * 0.06 * dt;
      }
      p.clearUpdateRanges(); p.addUpdateRange(0, n * 3);
      p.needsUpdate = true;
    }
  }
}
