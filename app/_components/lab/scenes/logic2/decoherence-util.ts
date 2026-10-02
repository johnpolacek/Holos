// Small shared pieces for the decoherence, born, and pipeline figures: a kit with
// two-sided flat ink, tubes that draw along their length, rods between two points,
// a seeded random, and plain-object copies of vectors for tweens.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { V } from "../../tourScenes3d";

export function setup(normal = V(0, -1, 0)) {
  const kit = makeKit();
  kit.clip.normal.copy(normal);
  kit.ink.side = THREE.DoubleSide;
  kit.soft.side = THREE.DoubleSide;
  return { kit, scene: new THREE.Scene() };
}

// A tube along points, drawable along its length with draw(fraction).
export function tube(pts: THREE.Vector3[], r: number, m: THREE.Material, seg = 64, radial = 8) {
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, radial, false);
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

export const xyz = (v: THREE.Vector3) => ({ x: v.x, y: v.y, z: v.z });

// An arrow: a shaft and a cone head, pointing from a to b.
export function arrow(
  a: THREE.Vector3,
  b: THREE.Vector3,
  m: THREE.Material,
  r = 0.03,
  head = 0.22
) {
  const g = new THREE.Group();
  const dir = b.clone().sub(a);
  const len = dir.length();
  dir.normalize();
  const shaft = rod(r, m);
  shaft.place(a, a.clone().addScaledVector(dir, len - head));
  g.add(shaft.mesh);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(r * 3.2, head, 14), m);
  cone.position.copy(b).addScaledVector(dir, -head / 2);
  cone.quaternion.setFromUnitVectors(UP, dir);
  g.add(cone);
  return g;
}
