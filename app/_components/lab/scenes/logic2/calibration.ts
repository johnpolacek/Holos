// Logic figure: calibrating the threshold. A board stands for every candidate measure and
// threshold. Four anchor cases cross it as bands, each wide alone; together they overlap in
// one narrow region. Held-out cases, named in advance, are pegged onto it as the test.
// Then a plot board behind shows the two ways to fail: integration climbing smoothly with
// a wide twilight, which leaves the core standing, and experience scattered with no
// relation to integration, which brings it down. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { rng, setup, xyz } from "./decoherence-util";

const B = 3; // half size of the board
const BANDS = [
  { id: "anesthesia", text: "ANESTHESIA", deg: 12, off: 0.08 },
  { id: "development", text: "DEVELOPMENT", deg: 58, off: -0.06 },
  { id: "split", text: "SPLIT BRAIN", deg: 104, off: 0.05 },
  { id: "minimal", text: "MINIMAL SYSTEMS", deg: 148, off: -0.04 },
];
const BAND_W = 0.95;

export function calibration(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { smooth: 0, cloud: 0 };

  // The board, with a fine grid and two axes.
  const board = new THREE.Mesh(new THREE.BoxGeometry(B * 2, 0.16, B * 2), kit.surface(0.02));
  board.position.y = -0.08;
  scene.add(board);
  const grid: THREE.Vector3[] = [];
  for (let i = -B + 0.5; i < B; i += 0.5)
    grid.push(V(i, 0.002, -B), V(i, 0.002, B), V(-B, 0.002, i), V(B, 0.002, i));
  scene.add(segments(grid, kit.soft));
  scene.add(line([V(-B, 0.004, B + 0.35), V(B, 0.004, B + 0.35)], kit.ink));
  scene.add(line([V(-B - 0.35, 0.004, B), V(-B - 0.35, 0.004, -B)], kit.ink));

  // Anchor cases: hatched bands crossing the board.
  const bands = BANDS.map((b, i) => {
    const a = (b.deg * Math.PI) / 180;
    const len = (B * 2) / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(Math.min(len, 8.4), 0.03, BAND_W),
      kit.surface(0.42 + i * 0.03)
    );
    m.rotation.y = a;
    const n = V(-Math.sin(a), 0, -Math.cos(a));
    m.position.copy(n.multiplyScalar(b.off)).setY(0.02 + i * 0.012);
    m.visible = false;
    scene.add(m);
    const end = V(Math.cos(a) * B * 0.92, 0.05, -Math.sin(a) * B * 0.92);
    return { mesh: m, end };
  });

  // Where all four fit: a ring around the overlap.
  const fit = new THREE.Group();
  fit.add(
    line(
      circlePts(0.5, 64).map((p) => V(p.x, 0.09, p.y)),
      kit.ink,
      true
    )
  );
  fit.add(
    line(
      circlePts(0.58, 64).map((p) => V(p.x, 0.09, p.y)),
      kit.ink,
      true
    )
  );
  fit.visible = false;
  scene.add(fit);

  // Held-out cases: small flagged pegs set into the region.
  const pegs = [V(-0.18, 0, 0.12), V(0.2, 0, -0.08), V(0.02, 0, 0.26)].map((p) => {
    const g = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.7, 8), kit.surface(0.2));
    stem.position.y = 0.35;
    g.add(stem);
    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.015), kit.surface(0.5));
    flag.position.set(0.15, 0.62, 0);
    g.add(flag);
    g.position.copy(p);
    g.visible = false;
    scene.add(g);
    return g;
  });

  // The plot board behind: experience against integration.
  const PW = 4.4;
  const PH = 2.8;
  const plot = new THREE.Group();
  plot.add(new THREE.Mesh(new THREE.BoxGeometry(PW, PH, 0.08), kit.surface(-0.6)));
  const z = 0.05;
  const ax = -PW / 2 + 0.4;
  const ay = -PH / 2 + 0.35;
  const top = PH / 2 - 0.25;
  const right = PW / 2 - 0.25;
  plot.add(line([V(ax, top, z), V(ax, ay, z), V(right, ay, z)], kit.ink));
  const smooth = new THREE.Group();
  // A wide twilight: a hatched band across the middle of the climb.
  const tw = new THREE.Mesh(new THREE.PlaneGeometry(2.2, PH - 0.7), kit.surface(0.3));
  tw.position.set((ax + right) / 2, (ay + top) / 2, z + 0.005);
  smooth.add(tw);
  smooth.add(
    line([V(ax + 0.1, ay + 0.1, z + 0.02), V(right - 0.15, top - 0.15, z + 0.02)], kit.ink)
  );
  smooth.visible = false;
  plot.add(smooth);
  const cloud = new THREE.Group();
  const r = rng(23);
  for (let i = 0; i < 34; i++) {
    const d = new THREE.Mesh(new THREE.CircleGeometry(0.045, 14), kit.ink);
    d.position.set(
      ax + 0.2 + r() * (right - ax - 0.4),
      ay + 0.2 + r() * (top - ay - 0.4),
      z + 0.02
    );
    cloud.add(d);
  }
  cloud.visible = false;
  plot.add(cloud);
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.3, 0.1), kit.surface(0.2));
  legs.position.y = -PH / 2 - 0.65;
  plot.add(legs);
  const PZ = -B - 1.4;
  plot.position.set(0, PH / 2 + 1.3, PZ);
  plot.visible = false;
  scene.add(plot);

  const labels: Label3D[] = [
    ...BANDS.map((b, i) => ({
      id: b.id,
      text: b.text,
      at: bands[i].end,
      dx: [70, 50, -40, -60][i],
      dy: [-10, -40, -50, -20][i],
    })),
    { id: "measure", text: "CANDIDATE MEASURE", at: V(0, 0, B + 0.35), dx: 0, dy: 40 },
    { id: "thr", text: "THRESHOLD", at: V(-B - 0.35, 0, 0.6), dx: -70, dy: 20 },
    { id: "fit", text: "WHERE ALL FOUR FIT", at: V(0.45, 0.09, 0.3), dx: 90, dy: 70 },
    { id: "held", text: "HELD OUT, NAMED IN ADVANCE", at: V(0.35, 0.6, -0.08), dx: 90, dy: -70 },
    { id: "integ", text: "INTEGRATION", at: V(0, PH / 2 + 1.3 + ay, PZ), dx: 0, dy: 34 },
    { id: "exp", text: "EXPERIENCE", at: V(ax, PH / 2 + 1.3 + top - 0.3, PZ), dx: -60, dy: 0 },
    {
      id: "climb",
      text: "A SMOOTH CLIMB, A WIDE TWILIGHT",
      at: V((ax + right) / 2 - 1.1, PH / 2 + 1.3 + top - 0.35, PZ),
      dx: -30,
      dy: -40,
    },
    {
      id: "stands",
      text: "THE CORE STANDS",
      at: V(right - 0.3, PH / 2 + 1.3 + ay, PZ),
      dx: -40,
      dy: 44,
    },
    {
      id: "none",
      text: "NO TRACKING",
      at: V(ax + 0.7, PH / 2 + 1.3 + top - 0.3, PZ),
      dx: -20,
      dy: -40,
    },
    {
      id: "falls",
      text: "TEST A LOSES, AND THE CORE WITH IT",
      at: V(right - 0.3, PH / 2 + 1.3 + ay, PZ),
      dx: -60,
      dy: 44,
    },
  ];
  const ids = labels.map((l) => l.id);
  const none = Object.fromEntries(ids.map((id) => [id, 0]));

  const k = narrow ? 1.7 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const plotAt = V(0, PH / 2 + 1.1, PZ);

  return {
    scene,
    kit,
    labels,
    update: () => {
      smooth.visible = st.smooth > 0.5 && st.cloud < 0.5;
      cloud.visible = st.cloud > 0.5;
    },
    stops: [
      // 1 · Anchor cases: the board engraves in, and four bands cross it one by one.
      (tl, t, c) => {
        tl.addLabel("anchors", t);
        tl.fromTo(
          kit.clip,
          { constant: -B - 1 },
          { constant: B + 1, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-1, 0, 0)) },
          { ...xyz(V(0, 0, 0.3)), duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3, 5, 7)) },
          { ...xyz(view(0.4, 8.6, 8.4)), duration: 2.8, ease: EASE },
          t
        );
        lab(tl, c, { measure: 1, thr: 1 }, t + 1.6);
        bands.forEach((b, i) => {
          show(tl, b.mesh, t + 2 + i * 0.55, 0);
          lab(tl, c, { [BANDS[i].id]: 1 }, t + 2.1 + i * 0.55);
        });
      },
      // 2 · One narrow band: closer, and a ring marks where all four overlap.
      (tl, t, c) => {
        tl.addLabel("narrow", t);
        lab(tl, c, { measure: 0, thr: 0 }, t);
        cam(tl, c, V(0, 0, 0), view(0.6, 4.6, 4.2), t, 2.4, EASE);
        show(tl, fit, t + 1.2, 0.6);
        lab(tl, c, { fit: 1 }, t + 1.8);
      },
      // 3 · Held out: flagged cases, named in advance, are pegged in as the test.
      (tl, t, c) => {
        tl.addLabel("held", t);
        lab(tl, c, Object.fromEntries(BANDS.map((b) => [b.id, 0])), t);
        cam(tl, c, V(0, 0.3, 0), view(1.4, 3, 4.4), t, 2.2, EASE);
        pegs.forEach((p, i) => {
          show(tl, p, t + 0.8 + i * 0.35, 0.5);
        });
        lab(tl, c, { held: 1 }, t + 2);
      },
      // 4 · No transition: the plot board rises behind, with a smooth climb and a wide twilight.
      (tl, t, c) => {
        tl.addLabel("smooth", t);
        lab(tl, c, none, t);
        show(tl, plot, t + 0.2, 0);
        cam(tl, c, plotAt, view(0, 1.2, 7.4), t, 2.6, EASE);
        tl.set(st, { smooth: 1, cloud: 0 }, t + 1.4);
        lab(tl, c, { integ: 1, exp: 1 }, t + 1.6);
        lab(tl, c, { climb: 1 }, t + 2.2);
        lab(tl, c, { stands: 1, integ: 0 }, t + 2.8);
      },
      // 5 · No tracking: the climb gives way to a scatter with no relation at all.
      (tl, t, c) => {
        tl.addLabel("cloud", t);
        lab(tl, c, { climb: 0, stands: 0 }, t);
        cam(tl, c, plotAt, view(-0.6, 1.4, 7.4), t, 2.2, EASE);
        tl.set(st, { cloud: 1 }, t + 0.8);
        lab(tl, c, { none: 1 }, t + 1.2);
        lab(tl, c, { falls: 1, integ: 0 }, t + 2);
      },
    ],
  };
}
