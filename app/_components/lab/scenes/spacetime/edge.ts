// Infinity figure 1: where infinity marks an edge, and where it closes a picture.
// A gravity well plunges toward a black hole's center; one inked profile shoots down it
// and the engraving stops where the description breaks. Then a railway: parallel rails
// run to one point on the horizon, the point at infinity. Last, an endless line bends
// and closes into a loop once that one point is added. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  dashed,
  type Label3D,
  lab,
  line,
  segments,
  V,
} from "../../tourScenes3d";
import { growTube, tube } from "./util";

// The well: depth falls as 1/r toward the center.
const WELL = 4.2;
const R0 = 0.17; // the engraving stops here: the description breaks
const depth = (r: number) => 0.25 - 1 / r;
// The railway, set off to one side of the well.
const RX = 40;
const FAR = 160;
const GAUGE = 1.1;
// The endless line, set off further.
const LX = 80;
const LOOP_R = 2.2;
const SPAN = 70; // how far each end of the drawn line runs before bending

export function edge(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, 1, 0);
  const scene = new THREE.Scene();
  const st = { curve: 0, broken: 0, dot: 0, bend: 0, close: 0 };

  // ---------- The well ----------
  const profile: THREE.Vector2[] = [];
  for (let i = 0; i <= 80; i++) {
    const r = R0 * (WELL / R0) ** (i / 80);
    profile.push(new THREE.Vector2(r, depth(r)));
  }
  const well = new THREE.Mesh(new THREE.LatheGeometry(profile, 96), kit.surface(-0.2));
  scene.add(well);
  // Engraved rings and meridians on the well, lifted a hair so they read.
  const grid = new THREE.Group();
  for (const r of [0.24, 0.32, 0.45, 0.65, 1, 1.6, 2.6, WELL]) {
    grid.add(
      line(
        circlePts(r * 1.004, 96).map((p) => V(p.x, depth(r) + 0.003, p.y)),
        r === WELL ? kit.ink : kit.soft,
        true
      )
    );
  }
  const merid: THREE.Vector3[] = [];
  for (let k = 0; k < 24; k++) {
    const a = (k / 24) * Math.PI * 2;
    for (let i = 0; i < 40; i++) {
      const r1 = R0 * (WELL / R0) ** (i / 40);
      const r2 = R0 * (WELL / R0) ** ((i + 1) / 40);
      merid.push(
        V(Math.cos(a) * r1 * 1.004, depth(r1), Math.sin(a) * r1 * 1.004),
        V(Math.cos(a) * r2 * 1.004, depth(r2), Math.sin(a) * r2 * 1.004)
      );
    }
  }
  grid.add(segments(merid, kit.soft));
  scene.add(grid);
  // The break: an inked lip at the bottom, and dashes plunging on past it.
  const lip = line(
    circlePts(R0 * 1.01, 48).map((p) => V(p.x, depth(R0), p.y)),
    kit.ink,
    true
  );
  scene.add(lip);
  // One profile, inked: the curve shooting toward infinity. Built from the rim inward.
  const ang = -Math.PI * 0.32;
  const dir = V(Math.cos(ang), 0, Math.sin(ang));
  const curvePts = Array.from({ length: 60 }, (_, i) => {
    const r = WELL * (R0 / WELL) ** (i / 59);
    return dir
      .clone()
      .multiplyScalar(r * 1.01)
      .setY(depth(r) + 0.01);
  });
  const curve = tube(curvePts, 0.035, kit.ink, 6);
  growTube(curve, 0);
  scene.add(curve);
  const bottom = depth(R0);
  const beyond = new THREE.Group();
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2;
    const p = V(Math.cos(a) * R0 * 0.8, bottom, Math.sin(a) * R0 * 0.8);
    beyond.add(dashed(p, V(p.x * 0.3, bottom - 3.5, p.z * 0.3), kit.soft, 0.1));
  }
  beyond.add(dashed(V(0, bottom, 0), V(0, bottom - 4, 0), kit.ink, 0.1));
  beyond.visible = false;
  scene.add(beyond);

  // ---------- The railway ----------
  const sleepers: THREE.BufferGeometry[] = [];
  for (let z = 2; z > -FAR; z -= 1.1) {
    const g = new THREE.BoxGeometry(GAUGE + 1.1, 0.1, 0.32);
    g.translate(RX, 0.05, z);
    sleepers.push(g);
  }
  const ties = new THREE.Mesh(mergeGeometries(sleepers), kit.surface(0.15));
  scene.add(ties);
  const rails = [-1, 1].map((s) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, FAR + 2), kit.surface(-0.4));
    m.position.set(RX + (s * GAUGE) / 2, 0.17, -FAR / 2 + 1);
    scene.add(m);
    return m;
  });
  // The ground: a few furrows either side, and the horizon far off.
  const ground: THREE.Vector3[] = [];
  for (const x of [-9, -6, -3.5, 3.5, 6, 9]) ground.push(V(RX + x, 0, 2), V(RX + x, 0, -FAR));
  scene.add(segments(ground, kit.soft));
  scene.add(line([V(RX - 140, 0, -FAR), V(RX + 140, 0, -FAR)], kit.ink));
  // The point at infinity, where the rails meet.
  const vp = V(RX, 0.17, -FAR);
  const point = new THREE.Group();
  point.add(new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), kit.ink));
  point.add(new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.18, 8, 48), kit.ink));
  point.position.copy(vp);
  point.visible = false;
  scene.add(point);

  // ---------- The endless line that closes ----------
  // Points along the line run from far left to far right. Bent, the same points lie on a
  // circle: the far ends crowd toward its top, the one point that closes it.
  const N = 400;
  const ribbonPos = new Float32Array(N * 2 * 3);
  const idx: number[] = [];
  for (let i = 0; i < N - 1; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const ribbonGeo = new THREE.BufferGeometry();
  ribbonGeo.setAttribute("position", new THREE.BufferAttribute(ribbonPos, 3));
  ribbonGeo.setIndex(idx);
  const ribbon = new THREE.Mesh(ribbonGeo, kit.ink);
  scene.add(ribbon);
  const centre = V(LX, LOOP_R, 0);
  const lineAt = (s: number, b: number, out: THREE.Vector3) => {
    // s in (-1, 1). Straight: x = tan(s·π/2) scaled, clipped to SPAN. Bent: a circle with
    // its bottom at the origin, s = ±1 at the top.
    const x = THREE.MathUtils.clamp(Math.tan((s * Math.PI) / 2) * LOOP_R, -SPAN, SPAN);
    const th = s * Math.PI;
    const cx = Math.sin(th) * LOOP_R;
    const cy = LOOP_R - Math.cos(th) * LOOP_R;
    return out.set(LX + x + (cx - x) * b, cy * b, 0);
  };
  const pts = Array.from({ length: N }, () => new THREE.Vector3());
  const setBend = (b: number) => {
    for (let i = 0; i < N; i++) lineAt(-0.995 + (1.99 * i) / (N - 1), b, pts[i]);
    for (let i = 0; i < N; i++) {
      const a = pts[Math.max(i - 1, 0)];
      const c = pts[Math.min(i + 1, N - 1)];
      const tx = c.x - a.x;
      const ty = c.y - a.y;
      const l = Math.hypot(tx, ty) || 1;
      const nx = (-ty / l) * 0.035;
      const ny = (tx / l) * 0.035;
      ribbonPos.set([pts[i].x + nx, pts[i].y + ny, 0, pts[i].x - nx, pts[i].y - ny, 0], i * 6);
    }
    ribbonGeo.attributes.position.needsUpdate = true;
    ribbonGeo.computeBoundingSphere();
  };
  setBend(0);
  // Ticks along the line, so its points can be followed as it bends.
  const ticks = Array.from({ length: 13 }, (_, i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), kit.surface());
    scene.add(m);
    return { m, s: -0.9 + (1.8 * i) / 12 };
  });
  const closer = new THREE.Group();
  closer.add(new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 12), kit.ink));
  closer.add(new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 40), kit.ink));
  closer.position.set(LX, LOOP_R * 2, 0);
  closer.visible = false;
  scene.add(closer);

  const labels: Label3D[] = [
    { id: "inf", text: "INFINITE DENSITY", at: V(0, bottom, 0), dx: 110, dy: 20 },
    { id: "breaks", text: "THE DESCRIPTION BREAKS", at: V(0, bottom - 1.6, 0), dx: -120, dy: 20 },
    { id: "par", text: "PARALLEL RAILS", at: V(RX + GAUGE / 2, 0.24, -6), dx: 90, dy: -40 },
    { id: "meet", text: "A POINT AT INFINITY", at: vp, dx: 0, dy: -60 },
    { id: "endless", text: "AN ENDLESS LINE", at: V(LX - 4, 0, 0), dx: -30, dy: 50 },
    { id: "one", text: "ONE POINT CLOSES IT", at: V(LX, LOOP_R * 2 + 0.2, 0), dx: 0, dy: -45 },
  ];
  if (narrow) {
    for (const l of labels) {
      if (l.id === "inf") l.dx = 70;
      if (l.id === "breaks") l.dx = -70;
      if (l.id === "par") l.dx = 50;
    }
  }

  const k = narrow ? 1.2 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: () => {
      growTube(curve, st.curve);
      beyond.visible = st.broken > 0.01;
      beyond.scale.set(1, Math.max(st.broken, 0.001), 1);
      beyond.position.y = bottom * (1 - Math.max(st.broken, 0.001));
      setBend(st.bend);
      for (const t of ticks) t.m.position.copy(lineAt(t.s, st.bend, tmp));
      closer.visible = st.close > 0.01;
      closer.scale.setScalar(Math.max(st.close, 0.001));
      point.visible = st.dot > 0.01;
      point.scale.setScalar(Math.max(st.dot, 0.001));
    },
    stops: [
      // 1 · The well engraves in from its rim, plunging toward the center.
      (tl: gsap.core.Timeline, t, c) => {
        tl.addLabel("well", t);
        tl.fromTo(
          kit.clip,
          { constant: -0.5 },
          { constant: 40, duration: 3, ease: "power1.in" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 0 },
          { x: 0, y: -1.6, z: 0, duration: 3.4, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-3, 9, 8) },
          { ...view(2, 4.2, 10.5), duration: 3.4, ease: EASE },
          t
        );
        lab(tl, c, { inf: 1 }, t + 3);
      },
      // 2 · One profile shoots down toward infinity, and the engraving stops: it breaks.
      (tl, t, c) => {
        tl.addLabel("breaks", t);
        lab(tl, c, { inf: 0 }, t);
        cam(tl, c, V(0, -2.6, 0), view(3.5, 2.2, 10), t, 2.4, EASE);
        tl.fromTo(st, { curve: 0 }, { curve: 1, duration: 2.2, ease: "power2.in" }, t + 0.8);
        tl.fromTo(st, { broken: 0 }, { broken: 1, duration: 1.4, ease: "power1.out" }, t + 3);
        lab(tl, c, { inf: 1 }, t + 3);
        lab(tl, c, { breaks: 1 }, t + 3.8);
      },
      // 3 · Geometry shows the other side: parallel rails run off toward the horizon.
      (tl, t, c) => {
        tl.addLabel("rails", t);
        lab(tl, c, { inf: 0, breaks: 0 }, t);
        cam(tl, c, V(RX, 0.4, -12), view(4.5, 3.4, 15), t, 3.2, EASE);
        cam(tl, c, V(RX, 1.6, -30), V(0, 0.4, 32), t + 3.2, 2.6, EASE);
        lab(tl, c, { par: 1 }, t + 2.6);
      },
      // 4 · They meet at one point: the point at infinity.
      (tl, t, c) => {
        tl.addLabel("point", t);
        tl.to(c.rig.target, { x: RX, y: 1.6, z: -30, duration: 0.01 }, t);
        tl.to(c.rig.offset, { x: 0, y: 0.4, z: 32, duration: 0.01 }, t);
        lab(tl, c, { par: 0 }, t);
        tl.fromTo(st, { dot: 0 }, { dot: 1, duration: 0.9, ease: "back.out(2)" }, t + 0.8);
        lab(tl, c, { meet: 1 }, t + 1.4);
      },
      // 5 · An endless line, and one point added: it closes into a loop.
      (tl, t, c) => {
        tl.addLabel("closed", t);
        lab(tl, c, { meet: 0 }, t);
        cam(tl, c, V(LX, LOOP_R, 0), view(0, 1.5, 14), t, 2.4, EASE);
        lab(tl, c, { endless: 1 }, t + 1.6);
        lab(tl, c, { endless: 0 }, t + 2.8);
        tl.fromTo(st, { bend: 0 }, { bend: 1, duration: 3, ease: "power2.inOut" }, t + 2.8);
        tl.fromTo(st, { close: 0 }, { close: 1, duration: 0.8, ease: "back.out(2)" }, t + 5.8);
        lab(tl, c, { one: 1 }, t + 6.2);
      },
    ],
  };
}
