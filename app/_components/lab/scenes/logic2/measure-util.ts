// Shared pieces for the measure, criticality, and calibration figures: boxes, ink tubes
// that draw along their length, rods, arrowheads, and small timeline helpers. Copied from
// the fingerprints util so these files stand alone. Stops only tween the state they expose.

import type gsap from "gsap";
import * as THREE from "three";
import { type Kit, makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type StopCtx, segments, V } from "../../tourScenes3d";

export { EASE };

export function setup(normal = V(0, -1, 0)) {
  const kit = makeKit();
  kit.clip.normal.copy(normal);
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

// A tube along points, drawable along its length with draw(fraction).
export function tube(pts: THREE.Vector3[], r: number, m: THREE.Material, seg = 120, radial = 6) {
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  const geo = new THREE.TubeGeometry(curve, seg, r, radial, false);
  const mesh = new THREE.Mesh(geo, m);
  const draw = (f: number) => {
    geo.setDrawRange(0, Math.round(Math.min(Math.max(f, 0), 1) * seg) * radial * 6);
  };
  return { mesh, draw };
}

// A cylinder rod between two points; place() moves it each frame.
const UP = V(0, 1, 0);
export function rod(r: number, m: THREE.Material, radial = 8) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, radial, 1), m);
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

// A small ink arrowhead at p pointing along dir.
export function arrowHead(kit: Kit, p: THREE.Vector3, dir: THREE.Vector3, size = 0.14) {
  const cone = new THREE.Mesh(new THREE.ConeGeometry(size * 0.45, size, 12), kit.ink);
  cone.position.copy(p);
  cone.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
  return cone;
}

// An upright engraved plate. Plot coordinates run 0..w across and 0..h up, on the front
// face (z = 0). The slab stands proud of the ground so its thickness reads in the hatching.
export function makePlate(kit: Kit, w: number, h: number, opts: { grid?: boolean } = {}) {
  const group = new THREE.Group();
  const pad = 0.55;
  const D = 0.28;
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(w + pad * 2, h + pad * 2, D),
    kit.surface(-0.35)
  );
  slab.position.set(w / 2, h / 2, -D / 2);
  group.add(slab);
  // An engraved inner border.
  const b = 0.18;
  group.add(
    segments(
      [
        V(-pad + b, -pad + b, 0.003),
        V(w + pad - b, -pad + b, 0.003),
        V(w + pad - b, -pad + b, 0.003),
        V(w + pad - b, h + pad - b, 0.003),
        V(w + pad - b, h + pad - b, 0.003),
        V(-pad + b, h + pad - b, 0.003),
        V(-pad + b, h + pad - b, 0.003),
        V(-pad + b, -pad + b, 0.003),
      ],
      kit.soft
    )
  );
  if (opts.grid !== false) {
    const grid: THREE.Vector3[] = [];
    for (let x = w / 6; x < w - 0.01; x += w / 6) grid.push(V(x, 0, 0.002), V(x, h, 0.002));
    for (let y = h / 4; y < h - 0.01; y += h / 4) grid.push(V(0, y, 0.002), V(w, y, 0.002));
    group.add(segments(grid, kit.soft));
  }
  // Axes: ink tubes with arrowheads, raised a hair off the face.
  const ax = tube([V(0, 0, 0.03), V(w + 0.15, 0, 0.03)], 0.028, kit.ink, 2);
  const ay = tube([V(0, 0, 0.03), V(0, h + 0.15, 0.03)], 0.028, kit.ink, 2);
  group.add(ax.mesh, ay.mesh);
  group.add(arrowHead(kit, V(w + 0.2, 0, 0.03), V(1, 0, 0)));
  group.add(arrowHead(kit, V(0, h + 0.2, 0.03), V(0, 1, 0)));
  // A plot point on the face.
  const P = (x: number, y: number, z = 0.05) => V(x, y, z);
  return { group, P, slab };
}

// A flat ink disc lying on the plate face, for plot points.
export function dot(kit: Kit, r = 0.07, m: THREE.Material = kit.ink) {
  const geo = new THREE.CylinderGeometry(r, r, 0.05, 18);
  geo.rotateX(Math.PI / 2);
  return new THREE.Mesh(geo, m);
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

// A logistic step from lo to hi centred on c with width s.
export const sig = (x: number, c: number, s: number) => 1 / (1 + Math.exp(-(x - c) / s));

// Sample a function into plot points.
export function sample(f: (x: number) => number, x0: number, x1: number, n = 80, z = 0.05) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return V(x, f(x), z);
  });
}
