// Small shared pieces for the spacetime figures.

import * as THREE from "three";
import type { Kit } from "../../engrave3d";
import { circlePts, line, V } from "../../tourScenes3d";

// A tube through points, revealed along its length with `growTube`.
export function tube(pts: THREE.Vector3[], r: number, mat: THREE.Material, seg = 4) {
  const n = Math.max(8, pts.length * seg);
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n, r, 6, false);
  return new THREE.Mesh(geo, mat);
}

// TubeGeometry indexes ring by ring from the start, so a draw range grows it.
export function growTube(mesh: THREE.Mesh, p: number) {
  const g = mesh.geometry as THREE.TubeGeometry;
  const { tubularSegments, radialSegments } = g.parameters;
  g.setDrawRange(
    0,
    Math.round(THREE.MathUtils.clamp(p, 0, 1) * tubularSegments) * radialSegments * 6
  );
}

// A straight tube from a to b.
export function rod(a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) {
  return tube([a, a.clone().lerp(b, 0.5), b], r, mat, 6);
}

// A flat ink ring lying in the xz plane whose radius changes without changing its weight.
export function makeRing(mat: THREE.Material, n = 96, w = 0.04) {
  const pos = new Float32Array((n + 1) * 2 * 3);
  const idx: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  const mat2 = mat;
  const mesh = new THREE.Mesh(geo, mat2);
  const setRadius = (r: number) => {
    const inner = Math.max(r - w, 0);
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2;
      const c = Math.cos(t);
      const s = Math.sin(t);
      pos.set([c * inner, 0, s * inner, c * r, 0, s * r], i * 6);
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeBoundingSphere();
  };
  setRadius(0.001);
  return { mesh, setRadius };
}

// A small engraved star: an octahedron body with a few inked rays.
export function makeStar(kit: Kit, r = 0.18) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.OctahedronGeometry(r), kit.surface()));
  return g;
}

// A flash: a burst of short ink rays around a point, in the plane facing +z.
export function makeFlash(kit: Kit, r = 0.3) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r * 0.32, 14, 10), kit.ink));
  const pairs: THREE.Vector3[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const d = V(Math.cos(a), Math.sin(a), 0);
    pairs.push(
      d.clone().multiplyScalar(r * 0.55),
      d.clone().multiplyScalar(r * (i % 2 ? 0.85 : 1.1))
    );
  }
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pairs), kit.ink));
  return g;
}

// A horizontal circle of points at height y.
export function ringAt(r: number, y: number, n = 64) {
  return circlePts(r, n).map((p) => V(p.x, y, p.y));
}

export function loop(pts: THREE.Vector3[], mat: THREE.Material) {
  return line(pts, mat, true);
}

// A dashed path through several points, its dashes in order so a draw range grows it.
export function dashedPath(pts: THREE.Vector3[], mat: THREE.Material, dash = 0.08) {
  const pairs: THREE.Vector3[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = a.distanceTo(b);
    for (let d = 0; d < len; d += dash * 2) {
      pairs.push(a.clone().lerp(b, d / len), a.clone().lerp(b, Math.min(d + dash, len) / len));
    }
  }
  return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pairs), mat);
}

// The point a fraction f of the way along a polyline, by length.
export function pathAt(pts: THREE.Vector3[], f: number, out = new THREE.Vector3()) {
  const lens = pts.slice(1).map((p, i) => p.distanceTo(pts[i]));
  let d = THREE.MathUtils.clamp(f, 0, 1) * lens.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1)
      return out.copy(pts[i]).lerp(pts[i + 1], Math.min(d / lens[i], 1));
    d -= lens[i];
  }
  return out.copy(pts[pts.length - 1]);
}
