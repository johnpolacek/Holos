// Building blocks shared by the interpretations, minds, and measure figures: blocks that
// grow from their base, rods between two points, ghost spheres for states held at once,
// and a few timeline helpers. Everything builds geometry up front; stops only tween state.

import type gsap from "gsap";
import * as THREE from "three";
import { type Kit, makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { circlePts, line, type StopCtx, V } from "../../tourScenes3d";

export { EASE };

export function setup() {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
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

// A cylinder resting on y = 0.
export function drum(kit: Kit, r: number, h: number, m: Mat = 0, seg = 48) {
  const g = new THREE.CylinderGeometry(r, r, h, seg);
  g.translate(0, h / 2, 0);
  return new THREE.Mesh(g, mat(kit, m));
}

export function ball(kit: Kit, r: number, m: Mat = 0) {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), mat(kit, m));
}

// A cylinder rod between two points.
const UP = V(0, 1, 0);
export function rod(a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, dir.length(), 8, 1), m);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(UP, dir.normalize());
  return mesh;
}

// A sphere drawn only as soft meridians and parallels: a state held, not yet a result.
export function ghost(kit: Kit, r: number, m: THREE.Material = kit.soft) {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI;
    g.add(
      line(
        circlePts(r, 40).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        m,
        true
      )
    );
  }
  for (const lat of [-0.6, 0, 0.6]) {
    g.add(
      line(
        circlePts(r * Math.cos(lat), 40).map((p) => V(p.x, r * Math.sin(lat), p.y)),
        m,
        true
      )
    );
  }
  return g;
}

export const xyz = (v: THREE.Vector3) => ({ x: v.x, y: v.y, z: v.z });

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

// Grow an object from nothing, from any start.
export function grow(
  tl: gsap.core.Timeline,
  obj: THREE.Object3D,
  at: number,
  duration = 1,
  axis: "y" | "all" = "all",
  ease = "back.out(1.4)"
) {
  tl.set(obj, { visible: true }, at);
  const from = axis === "all" ? { x: 0.001, y: 0.001, z: 0.001 } : { x: 1, y: 0.001, z: 1 };
  tl.fromTo(obj.scale, from, { x: 1, y: 1, z: 1, duration, ease }, at);
}

// Shrink an object away and hide it.
export function shrink(tl: gsap.core.Timeline, obj: THREE.Object3D, at: number, duration = 0.6) {
  tl.to(obj.scale, { x: 0.001, y: 0.001, z: 0.001, duration, ease: "power2.in" }, at);
  tl.set(obj, { visible: false }, at + duration);
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
