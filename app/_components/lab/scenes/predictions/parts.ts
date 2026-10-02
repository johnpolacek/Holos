// Small shared builders for the predictions figures: boxes, rods, tubes, flat plots, and
// the strike that marks a rejected view. Everything is built up front and revealed by
// visibility, scale, or tone, so stops stay plain-state tweens.

import type gsap from "gsap";
import * as THREE from "three";
import type { Kit } from "../../engrave3d";
import { circlePts, line, V } from "../../tourScenes3d";

export function box(
  parent: THREE.Object3D,
  mat: THREE.Material,
  w: number,
  h: number,
  d: number,
  x = 0,
  y = 0,
  z = 0
) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

// A cylinder from a to b.
export function rod(a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material, seg = 10) {
  const len = a.distanceTo(b);
  const g = new THREE.CylinderGeometry(r, r, len, seg);
  g.translate(0, len / 2, 0);
  const m = new THREE.Mesh(g, mat);
  m.position.copy(a);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
  return m;
}

export function tube(pts: THREE.Vector3[], r: number, mat: THREE.Material, seg = 64) {
  return new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, 8, false),
    mat
  );
}

export function sphere(r: number, mat: THREE.Material, p = V(0, 0, 0)) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), mat);
  m.position.copy(p);
  return m;
}

// A cone arrowhead at `tip`, pointing along `dir`.
export function head(tip: THREE.Vector3, dir: THREE.Vector3, mat: THREE.Material, s = 0.12) {
  const g = new THREE.ConeGeometry(s * 0.45, s * 1.4, 12);
  g.translate(0, -s * 0.7, 0);
  const m = new THREE.Mesh(g, mat);
  m.position.copy(tip);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
  return m;
}

// An ink arrow from a to b, drawn as a thin rod with a head.
export function arrow(a: THREE.Vector3, b: THREE.Vector3, kit: Kit, r = 0.025) {
  const g = new THREE.Group();
  const dir = b.clone().sub(a);
  const s = r * 6;
  g.add(rod(a, b.clone().addScaledVector(dir.clone().normalize(), -s * 0.9), r, kit.ink, 6));
  g.add(head(b, dir, kit.ink, s));
  return g;
}

// A flat ring lying in the xz plane.
export function flatRing(r: number, mat: THREE.Material, y = 0, n = 96) {
  return line(
    circlePts(r, n).map((p) => V(p.x, y, p.y)),
    mat,
    true
  );
}

// A sigmoid from x0 to x1 rising from y0 to y1, centered at xc with steepness k, in the xy plane.
export function sigmoid(
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  xc: number,
  k: number,
  z = 0,
  n = 60
) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return V(x, y0 + (y1 - y0) / (1 + Math.exp(-k * (x - xc))), z);
  });
}

// An X made of two ink bars, for a view the commitment rules out. Hidden until struck.
export function strike(kit: Kit, size = 1, r = 0.05) {
  const g = new THREE.Group();
  const s = size / 2;
  g.add(rod(V(-s, -s, 0), V(s, s, 0), r, kit.ink, 6));
  g.add(rod(V(-s, s, 0), V(s, -s, 0), r, kit.ink, 6));
  g.visible = false;
  return g;
}

// Pops an object in with its scale, from any starting state.
export function pop(tl: gsap.core.Timeline, obj: THREE.Object3D, at: number, dur = 0.7) {
  tl.set(obj, { visible: true }, at);
  tl.fromTo(
    obj.scale,
    { x: 0.01, y: 0.01, z: 0.01 },
    { x: 1, y: 1, z: 1, duration: dur, ease: "back.out(1.4)" },
    at
  );
}

// Grows an object up from its base (scale y), from any starting state.
export function rise(tl: gsap.core.Timeline, obj: THREE.Object3D, at: number, dur = 0.9) {
  tl.set(obj, { visible: true }, at);
  tl.fromTo(obj.scale, { y: 0.01 }, { y: 1, duration: dur, ease: "power2.out" }, at);
}

export function tone(
  tl: gsap.core.Timeline,
  mat: THREE.ShaderMaterial,
  value: number,
  at: number,
  dur = 1.2
) {
  tl.to(mat.uniforms.tone, { value, duration: dur, ease: "power1.inOut" }, at);
}

// A line whose visible length is set by a 0..1 draw value (positions are copied in).
export function drawable(pts: THREE.Vector3[], mat: THREE.Material) {
  const g = new THREE.BufferGeometry().setFromPoints(pts);
  const l = new THREE.Line(g, mat);
  const set = (t: number) => {
    g.setDrawRange(0, Math.max(0, Math.round(t * pts.length)));
  };
  set(0);
  return { line: l, set };
}

// A tube that grows along its path with a 0..1 draw value, using the index draw range.
export function growTube(pts: THREE.Vector3[], r: number, mat: THREE.Material, seg = 80) {
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, 8, false);
  const m = new THREE.Mesh(geo, mat);
  const per = (geo.index?.count ?? 0) / seg;
  const set = (t: number) => {
    geo.setDrawRange(0, Math.round(Math.max(0, Math.min(1, t)) * seg) * per);
  };
  set(0);
  return { mesh: m, set };
}

// A point along a polyline path at fraction t, by arc length.
export function along(path: THREE.CatmullRomCurve3, t: number, out: THREE.Vector3) {
  return path.getPointAt(Math.max(0, Math.min(1, t)), out);
}
