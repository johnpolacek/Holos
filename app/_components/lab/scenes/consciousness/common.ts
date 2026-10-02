// Shared pieces for the Consciousness figures: a seeded random, an engraved brain, small
// node networks with travelling pulses, and a draw-in helper.

import type gsap from "gsap";
import * as THREE from "three";
import type { Kit } from "../../engrave3d";
import { V } from "../../tourScenes3d";

// A small seeded random so every build lays out the same way.
export function seeded(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// Sweep the clip plane across the figure so it engraves in.
export function drawIn(
  tl: gsap.core.Timeline,
  kit: Kit,
  from: number,
  to: number,
  at: number,
  duration = 2.2
) {
  tl.fromTo(kit.clip, { constant: from }, { constant: to, duration, ease: "power1.inOut" }, at);
}

// Brain proportions: long front to back (x), a little narrower side to side (z).
export const BRAIN = V(1.3, 0.9, 1);

// The brain's surface point in a unit direction, before folding. Front is +x.
export function brainPoint(dir: THREE.Vector3, lift = 1) {
  return V(dir.x * BRAIN.x * lift, dir.y * BRAIN.y * lift, dir.z * BRAIN.z * lift);
}

// An engraved brain: a folded ellipsoid whose sharp valleys ink in as sulci, a midline
// fissure, a cerebellum behind, and a brainstem below.
export function makeBrain(kit: Kit, tone = 0) {
  const group = new THREE.Group();
  const geo = new THREE.SphereGeometry(1, 160, 120);
  const p = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    // Folds: the valleys of a warped sine are sharp creases, so the renderer inks them.
    const w = Math.sin(7.5 * v.x + 2.2 * Math.sin(5.5 * v.y + 3.1 * v.z));
    const u = Math.sin(6.5 * v.y + 2.4 * Math.sin(6 * v.z - 2 * v.x));
    const fold = 0.028 * (1 - Math.abs(w)) + 0.02 * (1 - Math.abs(u));
    // The midline fissure along the top.
    const fissure = 0.16 * Math.exp(-((v.z / 0.05) ** 2)) * smooth(-0.1, 0.4, v.y);
    // A flatter underside.
    const under = v.y < 0 ? 1 - 0.25 * v.y * v.y : 1;
    const r = (1 + fold - fissure) * under;
    p.setXYZ(i, v.x * BRAIN.x * r, v.y * BRAIN.y * r, v.z * BRAIN.z * r);
  }
  geo.computeVertexNormals();
  const mat = kit.surface(tone);
  const cortex = new THREE.Mesh(geo, mat);
  group.add(cortex);
  const cere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 20), kit.surface(tone + 0.15));
  cere.scale.set(1.1, 0.7, 1.6);
  cere.position.set(-0.95, -0.55, 0);
  group.add(cere);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.8, 16), kit.surface(tone));
  stem.position.set(-0.45, -0.95, 0);
  stem.rotation.z = -0.35;
  group.add(stem);
  return { group, mat, cortex };
}

// Points spread over the brain's near face, for activity and mapping.
export function brainSites(n: number, seed = 3, minZ = 0.05) {
  const rand = seeded(seed);
  const out: THREE.Vector3[] = [];
  let guard = 0;
  while (out.length < n && guard++ < n * 50) {
    const d = V(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    if (d.lengthSq() > 1 || d.lengthSq() < 0.05) continue;
    d.normalize();
    if (d.z < minZ || d.y < -0.35) continue;
    // Keep sites apart.
    const p = brainPoint(d, 1.05);
    if (out.some((q) => q.distanceTo(p) < 0.17)) continue;
    out.push(p);
  }
  return out;
}

// A dot that rides along one link: `t` 0 at a, 1 at b.
export function pulseOn(a: THREE.Vector3, b: THREE.Vector3, t: number, out: THREE.Object3D) {
  out.position.copy(a).lerp(b, t);
}

// A small ink sphere, reused for pulses and activity.
export function dot(kit: Kit, r = 0.05) {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), kit.ink);
}

// Reveal a share of a LineSegments object's pairs.
export function growSegments(obj: THREE.LineSegments, share: number) {
  const n = obj.geometry.attributes.position.count / 2;
  obj.geometry.setDrawRange(0, Math.round(Math.min(Math.max(share, 0), 1) * n) * 2);
}

// Reveal a share of a Line object's points.
export function growLine(obj: THREE.Line, share: number) {
  const n = obj.geometry.attributes.position.count;
  obj.geometry.setDrawRange(0, Math.round(Math.min(Math.max(share, 0), 1) * n));
}

// A tone uniform on a surface material, for tweening light and dark.
export const toneOf = (m: THREE.Material) => (m as THREE.ShaderMaterial).uniforms.tone;
