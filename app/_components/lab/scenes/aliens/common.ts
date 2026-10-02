// Shared pieces for the Aliens figures: seeded randomness, star crosses, an engraved spiral
// galaxy, a star body, expanding rings, tubes that draw along their length, and a ruler beam.

import * as THREE from "three";
import type { Kit } from "../../engrave3d";
import { circlePts, line, segments, V } from "../../tourScenes3d";

// A small seeded generator, so every build lays out the same stars.
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each star is a small three-armed cross, so it reads from any angle.
export function crosses(points: THREE.Vector3[], size: number, mat: THREE.Material) {
  const pairs: THREE.Vector3[] = [];
  const s = size / 2;
  for (const p of points) {
    pairs.push(V(p.x - s, p.y, p.z), V(p.x + s, p.y, p.z));
    pairs.push(V(p.x, p.y - s, p.z), V(p.x, p.y + s, p.z));
    pairs.push(V(p.x, p.y, p.z - s), V(p.x, p.y, p.z + s));
  }
  return segments(pairs, mat);
}

// A two-armed spiral galaxy lying in the xz plane. Faint stars are soft, bright ones ink.
export function makeGalaxy(
  kit: Kit,
  { radius = 6, count = 1400, seed = 7, size = 0.07, core = true } = {}
) {
  const r = rng(seed);
  const group = new THREE.Group();
  const stars: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const arm = i % 2;
    const t = r() ** 0.7;
    const rad = 0.5 + t * radius;
    const ang = arm * Math.PI + t * 4.2 + (r() - 0.5) * (0.9 - t * 0.4);
    const spread = 0.35 + t * 0.6;
    stars.push(
      V(
        Math.cos(ang) * rad + (r() - 0.5) * spread,
        (r() - 0.5) * 0.35 * (1.1 - t),
        Math.sin(ang) * rad + (r() - 0.5) * spread
      )
    );
  }
  const bright = stars.filter((_, i) => i % 7 === 0);
  const faint = stars.filter((_, i) => i % 7 !== 0);
  group.add(crosses(faint, size, kit.soft));
  group.add(crosses(bright, size * 1.6, kit.ink));
  if (core) {
    const bulge = new THREE.Mesh(new THREE.SphereGeometry(0.75, 28, 18), kit.surface(-0.6));
    bulge.scale.y = 0.45;
    group.add(bulge);
  }
  return { group, stars, bright };
}

// A star: a clean sphere with short ink rays around its rim, facing +z.
export function makeStar(kit: Kit, r = 0.4, rays = 12) {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.SphereGeometry(r, 32, 20), kit.surface(-0.8)));
  const pairs: THREE.Vector3[] = [];
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    pairs.push(V(c * r * 1.3, s * r * 1.3, 0), V(c * r * 1.75, s * r * 1.75, 0));
  }
  group.add(segments(pairs, kit.ink));
  return group;
}

// Rings that keep spreading from a point in the xy plane: radio leaking out.
export function makeRings(kit: Kit, n = 4, maxR = 3, mat?: THREE.Material) {
  const group = new THREE.Group();
  const loops = Array.from({ length: n }, () => {
    const l = line(circlePts(1, 72), mat ?? kit.ink, true);
    group.add(l);
    return l;
  });
  // phase in 0..1 per second-ish loop; strength 0 hides every ring.
  const set = (time: number, strength: number, speed = 0.35) => {
    loops.forEach((l, i) => {
      const f = (time * speed + i / n) % 1;
      const s = 0.2 + f * maxR;
      l.scale.set(s, s, s);
      l.visible = strength > 0.01 && f < strength;
    });
  };
  return { group, set };
}

// A tube along a path that can draw in from its start: setDraw(0..1).
export function drawTube(points: THREE.Vector3[], r: number, mat: THREE.Material, segs = 160) {
  const radial = 8;
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segs, r, radial);
  const mesh = new THREE.Mesh(geo, mat);
  const setDraw = (f: number) => {
    geo.setDrawRange(0, Math.round(Math.min(Math.max(f, 0), 1) * segs) * radial * 6);
  };
  return { mesh, setDraw };
}

// A long flat beam along +x from x0 to x1, with tick marks along its front face.
export function makeBeam(
  kit: Kit,
  x0: number,
  x1: number,
  { h = 0.3, d = 0.9, tone = 0.25, tick = 0.5 } = {}
) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, h, d), kit.surface(tone));
  body.position.set((x0 + x1) / 2, -h / 2, 0);
  group.add(body);
  if (tick > 0) {
    const ticks: THREE.Vector3[] = [];
    for (let x = x0 + tick; x < x1 - 1e-3; x += tick)
      ticks.push(V(x, -h * 0.2, d / 2 + 0.005), V(x, -h * 0.75, d / 2 + 0.005));
    group.add(segments(ticks, kit.ink));
  }
  return { group, body };
}

// A wire globe of meridians and parallels, soft with an ink equator.
export function makeGlobe(kit: Kit, r: number, meridians = 10, ink = kit.ink) {
  const group = new THREE.Group();
  for (let i = 0; i < meridians; i++) {
    const a = (i / meridians) * Math.PI;
    group.add(
      line(
        circlePts(r, 64).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        kit.soft,
        true
      )
    );
  }
  for (const lat of [-0.9, -0.45, 0, 0.45, 0.9]) {
    const y = r * Math.sin(lat);
    const rr = r * Math.cos(lat);
    group.add(
      line(
        circlePts(rr, 64).map((p) => V(p.x, y, p.y)),
        lat === 0 ? ink : kit.soft,
        true
      )
    );
  }
  return group;
}
