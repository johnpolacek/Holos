// Shared building blocks for the Logic page figures: blocks that grow from their base,
// tubes that draw along their length, rods between two points, and a seeded random.
// Everything here builds geometry up front; stops only tween the state it exposes.

import type gsap from "gsap";
import * as THREE from "three";
import { type Kit, makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type StopCtx, V } from "../../tourScenes3d";

export { EASE };

export function setup(normal = V(0, -1, 0)) {
  const kit = makeKit();
  kit.clip.normal.copy(normal);
  // Flat ink shapes are seen from both sides in these figures.
  kit.ink.side = THREE.DoubleSide;
  kit.soft.side = THREE.DoubleSide;
  return { kit, scene: new THREE.Scene() };
}

export type Mat = THREE.Material | number;
const mat = (kit: Kit, m: Mat) => (typeof m === "number" ? kit.surface(m) : m);

// A box resting on y = 0, so scale.y grows it up from its base.
export function block(kit: Kit, w: number, h: number, d: number, m: Mat = 0) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(0, h / 2, 0);
  return new THREE.Mesh(g, mat(kit, m));
}

// A centered box.
export function box(kit: Kit, w: number, h: number, d: number, m: Mat = 0) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(kit, m));
}

// A flat ring (or ring sector) lying on y = 0 with height h, growing up from its base.
export function annulus(
  kit: Kit,
  r0: number,
  r1: number,
  h: number,
  m: Mat = 0,
  start = 0,
  sweep = Math.PI * 2
) {
  const shape = new THREE.Shape();
  const n = Math.max(8, Math.round((sweep / (Math.PI * 2)) * 96));
  for (let i = 0; i <= n; i++) {
    const a = start + (sweep * i) / n;
    const p = [Math.cos(a) * r1, Math.sin(a) * r1] as const;
    if (i === 0) shape.moveTo(...p);
    else shape.lineTo(...p);
  }
  for (let i = n; i >= 0; i--) {
    const a = start + (sweep * i) / n;
    shape.lineTo(Math.cos(a) * r0, Math.sin(a) * r0);
  }
  if (r0 <= 0) shape.lineTo(0, 0);
  const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: 4 });
  g.rotateX(-Math.PI / 2);
  return new THREE.Mesh(g, mat(kit, m));
}

// A tube along points, drawable along its length with draw(fraction).
export function tube(pts: THREE.Vector3[], r: number, m: THREE.Material, seg = 96, radial = 8) {
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, radial, false);
  const mesh = new THREE.Mesh(geo, m);
  const draw = (f: number) => {
    geo.setDrawRange(0, Math.round(Math.min(Math.max(f, 0), 1) * seg) * radial * 6);
  };
  return { mesh, draw };
}

// A polyline drawable along its length.
export function polyline(pts: THREE.Vector3[], m: THREE.Material) {
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const obj = new THREE.Line(geo, m);
  const draw = (f: number) => {
    geo.setDrawRange(0, Math.round(Math.min(Math.max(f, 0), 1) * (pts.length - 1)) + 1);
  };
  return { obj, draw };
}

// A cylinder rod between two points; place() moves it each frame.
const UP = V(0, 1, 0);
export function rod(r: number, m: THREE.Material, radial = 8) {
  const g = new THREE.CylinderGeometry(r, r, 1, radial, 1);
  const mesh = new THREE.Mesh(g, m);
  const dir = new THREE.Vector3();
  const place = (a: THREE.Vector3, b: THREE.Vector3) => {
    dir.subVectors(b, a);
    const len = dir.length();
    mesh.visible = len > 1e-4;
    if (!mesh.visible) return;
    mesh.position.copy(a).addScaledVector(dir, 0.5);
    mesh.scale.set(1, len, 1);
    mesh.quaternion.setFromUnitVectors(UP, dir.normalize());
  };
  return { mesh, place };
}

// The area under a curve in the xy plane as a slab of depth d, front face at z = d/2.
export function areaSlab(kit: Kit, pts: THREE.Vector3[], base: number, d: number, m: Mat = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(pts[0].x, base);
  for (const p of pts) shape.lineTo(p.x, p.y);
  shape.lineTo(pts[pts.length - 1].x, base);
  shape.lineTo(pts[0].x, base);
  const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false, curveSegments: 2 });
  g.translate(0, 0, -d / 2);
  return new THREE.Mesh(g, mat(kit, m));
}

// The first stop sets the camera outright, so a replay starts from the same place.
export function frame(
  tl: gsap.core.Timeline,
  c: StopCtx,
  from: { t: THREE.Vector3; o: THREE.Vector3 },
  to: { t: THREE.Vector3; o: THREE.Vector3 },
  at: number,
  duration = 3
) {
  tl.fromTo(c.rig.target, { ...xyz(from.t) }, { ...xyz(to.t), duration, ease: EASE }, at);
  tl.fromTo(c.rig.offset, { ...xyz(from.o) }, { ...xyz(to.o), duration, ease: EASE }, at);
}
const xyz = (v: THREE.Vector3) => ({ x: v.x, y: v.y, z: v.z });

// Grow an object from nothing along one axis (or all), from any start.
export function grow(
  tl: gsap.core.Timeline,
  obj: THREE.Object3D,
  at: number,
  duration = 1,
  axis: "x" | "y" | "z" | "all" = "y",
  ease = "power2.out"
) {
  tl.set(obj, { visible: true }, at);
  const from = axis === "all" ? { x: 0.001, y: 0.001, z: 0.001 } : { [axis]: 0.001 };
  const to = axis === "all" ? { x: 1, y: 1, z: 1 } : { [axis]: 1 };
  tl.fromTo(obj.scale, from, { ...to, duration, ease }, at);
}

export function tone(
  tl: gsap.core.Timeline,
  m: THREE.Material,
  value: number,
  at: number,
  duration = 1.2
) {
  const u = (m as THREE.ShaderMaterial).uniforms.tone;
  tl.to(u, { value, duration, ease: "power1.inOut" }, at);
}

export function hidden<T extends THREE.Object3D>(o: T) {
  o.visible = false;
  return o;
}

// A small seeded random, so every build lays out the same.
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
};
