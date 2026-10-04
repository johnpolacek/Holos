// Shared pieces for the Predictions figures thresholded, testA, testB, and checkC: a gauge
// with a twilight band, a soft ghost iris, an engraved network that joins up, a plot board,
// and the plate swap that engraves one plate in at a time.

import type gsap from "gsap";
import * as THREE from "three";
import type { Kit } from "../../engrave3d";
import { circlePts, lab, line, segments, type StopCtx, V } from "../../tourScenes3d";

export { arrow, rng, rod, setup, tube, xyz } from "../logic2/decoherence-util";

// A dial gauge facing +z. Values run 0 to 1 across the half dial; a hatched band marks
// the twilight around `cut`.
export function makeGauge(kit: Kit, R = 0.7, cut = 0.6, band = 0.12) {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.CircleGeometry(R, 48, 0, Math.PI), kit.surface()));
  const ang = (v: number) => Math.PI - v * Math.PI;
  const bandMesh = new THREE.Mesh(
    new THREE.RingGeometry(R * 0.66, R * 0.98, 12, 1, ang(cut + band / 2), band * Math.PI),
    kit.surface(0.85)
  );
  bandMesh.position.z = 0.006;
  group.add(bandMesh);
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i <= 10; i++) {
    const a = ang(i / 10);
    ticks.push(
      V(Math.cos(a) * R * 0.86, Math.sin(a) * R * 0.86, 0.01),
      V(Math.cos(a) * R, Math.sin(a) * R, 0.01)
    );
  }
  group.add(segments(ticks, kit.ink));
  group.add(
    line(
      Array.from({ length: 49 }, (_, i) => {
        const a = (i / 48) * Math.PI;
        return V(Math.cos(a) * R, Math.sin(a) * R, 0.012);
      }),
      kit.ink
    )
  );
  const needleGeo = new THREE.BoxGeometry(R * 0.82, 0.03 * (R / 0.7), 0.03);
  needleGeo.translate(R * 0.41, 0, 0);
  const needle = new THREE.Mesh(needleGeo, kit.ink);
  needle.position.z = 0.03;
  group.add(needle);
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(R * 0.085, R * 0.085, 0.06, 16),
    kit.surface()
  );
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.03;
  group.add(hub);
  const base = new THREE.Mesh(new THREE.BoxGeometry(R * 2.3, R * 0.14, 0.3), kit.surface());
  base.position.y = -R * 0.07;
  group.add(base);
  const setValue = (v: number) => {
    needle.rotation.z = ang(v);
  };
  setValue(0);
  // Local point on the dial face at value v, radius fraction f.
  const at = (v: number, f = 0.82) =>
    V(Math.cos(ang(v)) * R * f, Math.sin(ang(v)) * R * f, 0.02);
  return { group, setValue, at };
}

// The iris in soft outline only: neither open nor closed (the twilight).
export function makeGhostIris(kit: Kit, R = 0.55) {
  const group = new THREE.Group();
  group.add(line(circlePts(R), kit.soft, true));
  group.add(line(circlePts(R * 2.2), kit.soft, true));
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 + 0.26;
    return V(Math.cos(a) * R * 0.45, Math.sin(a) * R * 0.45, 0);
  });
  group.add(line(hex, kit.soft, true));
  return group;
}

// A small engraved network: nodes on a loose ball, a few separate pairs, and a joined set
// of links in both directions. `join(f)` swaps the separate links for the joined ones.
export function makeNetwork(kit: Kit, r = 1, n = 9, seed = 3, nodeR = 0.13) {
  const group = new THREE.Group();
  const pos: THREE.Vector3[] = [];
  // Golden-angle points on a ball, squashed a little, seeded jitter for life.
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const rr = Math.sqrt(1 - y * y);
    const a = i * 2.39996;
    pos.push(
      V(
        Math.cos(a) * rr * r + (rand() - 0.5) * 0.15 * r,
        y * r * 0.85,
        Math.sin(a) * rr * r * 0.8
      )
    );
  }
  const mat = kit.surface(0);
  const nodes = pos.map((p) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(nodeR, 16, 12), mat);
    m.position.copy(p);
    group.add(m);
    return m;
  });
  const sepPairs: THREE.Vector3[] = [];
  for (let i = 0; i + 1 < n; i += 2) sepPairs.push(pos[i], pos[i + 1]);
  const sep = segments(sepPairs, kit.ink);
  group.add(sep);
  const joinPairs: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      if (pos[i].distanceTo(pos[j]) < r * 1.35) joinPairs.push(pos[i], pos[j]);
    }
  const joined = segments(joinPairs, kit.ink);
  joined.visible = false;
  group.add(joined);
  const join = (f: number) => {
    sep.visible = f < 0.5;
    joined.visible = f >= 0.5;
  };
  return { group, nodes, pos, join, mat };
}

// A flat board facing +z with an L of axes. `pt(u, v)` maps 0..1 plot units to local space.
export function makeBoard(kit: Kit, w = 3, h = 2, tone = -0.4) {
  const group = new THREE.Group();
  const slab = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), kit.surface(tone));
  slab.position.z = -0.04;
  group.add(slab);
  const m = 0.22;
  const x0 = -w / 2 + m;
  const y0 = -h / 2 + m;
  const pw = w - 2 * m;
  const ph = h - 2 * m;
  const pt = (u: number, v: number, z = 0.01) => V(x0 + u * pw, y0 + v * ph, z);
  group.add(line([pt(0, 1.02), pt(0, 0), pt(1.02, 0)], kit.ink));
  return { group, pt, pw, ph };
}

// Logistic step with steepness k, centered at c.
export const sig = (x: number, k: number, c = 0.5) => 1 / (1 + Math.exp(-k * (x - c)));

// A curve that draws along its length with draw(f).
export function drawLine(points: THREE.Vector3[], mat: THREE.Material) {
  const l = line(points, mat);
  const n = points.length;
  const draw = (f: number) => {
    l.geometry.setDrawRange(0, Math.max(0, Math.round(Math.min(Math.max(f, 0), 1) * n)));
    l.visible = f > 0;
  };
  draw(0);
  return { line: l, draw };
}

// Engrave one plate in: hide the others, then sweep the clip plane across it.
export function plateIn(
  tl: gsap.core.Timeline,
  c: StopCtx,
  kit: Kit,
  plates: THREE.Object3D[],
  i: number,
  t: number,
  none: Record<string, number>,
  from = -7,
  to = 7,
  d = 0.5
) {
  lab(tl, c, none, t);
  plates.forEach((p, j) => {
    tl.set(p, { visible: j === i }, t + d);
  });
  tl.fromTo(kit.clip, { constant: from }, { constant: to, duration: 1.6, ease: "power1.inOut" }, t + d);
  tl.set(kit.clip, { constant: 100 }, t + d + 1.65);
}
