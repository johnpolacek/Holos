// Logic figure, the Threshold: three regions of integration. An axis carries Φ. Well below
// the threshold a loose set of parts has no aperture; well above it a joined system has an
// open one; in the narrow twilight between, a half-joined system has only the outline of
// one, no exact fact either way. Then a second rail of conditions (wiring, development, an
// anesthetic) moves a slider, and integration follows, climbing from near zero across one
// stretch: integration is a result, not a dial. Last, a grid of randomly open pipes: water
// first crosses at a point the grid itself fixes, as the twilight's place is fixed by
// structure. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { rng, rod, setup, tube, xyz } from "../logic2/decoherence-util";

const A = 4.6; // half length of the axis
const TW0 = 0.5; // the twilight on the Φ axis
const TW1 = 1.5;
const SYS = [-3, 1, 3.4]; // below, twilight, above
const SZ = -1.4; // systems stand behind the axis
const CZ = 1.6; // the conditions rail, in front
const GZ = -8; // the pipe grid, far behind
const GN = 9; // grid nodes per side
const GS = 0.62;

const phiAt = (u: number) => -A + (2 * A) / (1 + Math.exp(-(u - 0.6) * 1.5));

export function threshold(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { below: 0, above: 0, mid: 0, slide: -A, cond: 0, p: 0, flow: 0 };

  // The Φ axis, with its twilight band.
  const axis = new THREE.Mesh(new THREE.BoxGeometry(2 * A, 0.14, 0.5), kit.surface(0.06));
  axis.position.y = -0.07;
  scene.add(axis);
  const band = new THREE.Mesh(new THREE.BoxGeometry(TW1 - TW0, 0.02, 0.5), kit.surface(0.55));
  band.position.set((TW0 + TW1) / 2, 0.01, 0);
  scene.add(band);
  const ticks: THREE.Vector3[] = [];
  for (let x = -A; x <= A + 0.01; x += 0.5) ticks.push(V(x, 0.003, 0.25), V(x, 0.003, 0.12));
  scene.add(segments(ticks, kit.ink));
  const pointer = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.32, 3), kit.surface(0.4));
  pointer.rotation.x = Math.PI;
  pointer.position.y = 0.3;
  pointer.visible = false;
  scene.add(pointer);

  // Three systems: the same six parts, loose, half joined, and fully joined.
  const parts = [
    V(0, 0.45, 0),
    V(0.45, 0.8, 0.15),
    V(-0.4, 0.9, -0.1),
    V(0.1, 1.3, 0.2),
    V(0.4, 0.3, -0.35),
    V(-0.35, 0.35, 0.3),
  ];
  const pairs: [number, number][] = [];
  parts.forEach((a, i) => {
    parts.forEach((b, j) => {
      if (j > i && a.distanceTo(b) < 0.85) pairs.push([i, j]);
    });
  });
  const system = (x: number, joined: number) => {
    const g = new THREE.Group();
    for (const p of parts) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), kit.surface(0.3));
      m.position.copy(p);
      g.add(m);
    }
    const n = Math.round(pairs.length * joined);
    g.add(
      segments(
        pairs.slice(0, n).flatMap(([i, j]) => [parts[i], parts[j]]),
        kit.ink
      )
    );
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8), kit.surface(0.2));
    stem.position.y = 0.15;
    g.add(stem);
    g.position.set(x, 0, SZ);
    g.scale.setScalar(1.7);
    scene.add(g);
    return g;
  };
  system(SYS[0], 0);
  system(SYS[1], 0.5);
  system(SYS[2], 1);

  // Above each: no aperture, the outline of one, an open one.
  const closed = makeIris(kit, 0.32);
  closed.setOpen(0);
  closed.group.position.set(SYS[0], 3.2, SZ);
  const open = makeIris(kit, 0.32);
  open.setOpen(1);
  open.group.position.set(SYS[2], 3.2, SZ);
  const ghost = new THREE.Group();
  ghost.add(line(circlePts(0.32, 48), kit.soft, true), line(circlePts(0.7, 48), kit.soft, true));
  ghost.add(
    line(
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.26;
        return V(Math.cos(a) * 0.15, Math.sin(a) * 0.15, 0);
      }),
      kit.soft,
      true
    )
  );
  ghost.position.set(SYS[1], 3.2, SZ);
  for (const g of [closed.group, open.group, ghost]) {
    g.visible = false;
    scene.add(g);
  }

  // Conditions: a second rail with a slider. Its hatched stretch is where integration climbs.
  const condRail = new THREE.Group();
  const cr = new THREE.Mesh(new THREE.BoxGeometry(2 * A, 0.1, 0.36), kit.surface(0.1));
  cr.position.y = -0.05;
  condRail.add(cr);
  const stretch = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.02, 0.36), kit.surface(0.55));
  stretch.position.set(0.6, 0.01, 0);
  condRail.add(stretch);
  const knob = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.5), kit.surface(0.2));
  knob.position.y = 0.15;
  condRail.add(knob);
  condRail.position.z = CZ;
  condRail.visible = false;
  scene.add(condRail);
  const link = rod(0.015, kit.ink, 6);
  link.mesh.visible = false;
  scene.add(link.mesh);

  // The pipe grid: random openings, and the first path water finds across.
  const grid = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(GN * GS + 0.6, 0.1, GN * GS + 0.6),
    kit.surface(0.04)
  );
  board.position.y = -0.05;
  grid.add(board);
  const r = rng(41);
  const node = (i: number, j: number) => V((i - (GN - 1) / 2) * GS, 0.06, (j - (GN - 1) / 2) * GS);
  type Edge = { a: number; b: number; r: number; mesh: THREE.Mesh };
  const edges: Edge[] = [];
  const pipeMat = kit.surface(0.25);
  for (let i = 0; i < GN; i++)
    for (let j = 0; j < GN; j++) {
      for (const [di, dj] of [
        [1, 0],
        [0, 1],
      ]) {
        if (i + di >= GN || j + dj >= GN) continue;
        const pr = rod(0.045, pipeMat, 8);
        pr.place(node(i, j), node(i + di, j + dj));
        pr.mesh.visible = false;
        grid.add(pr.mesh);
        edges.push({ a: i * GN + j, b: (i + di) * GN + (j + dj), r: r(), mesh: pr.mesh });
      }
    }
  // The lowest opening level at which the left edge joins the right, and the path then.
  const parent = Array.from({ length: GN * GN }, (_, i) => i);
  const find = (x: number): number => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const sorted = [...edges].sort((x, y) => x.r - y.r);
  let pc = 1;
  for (const e of sorted) {
    parent[find(e.a)] = find(e.b);
    const lefts = Array.from({ length: GN }, (_, j) => find(j));
    if (
      Array.from({ length: GN }, (_, j) => find((GN - 1) * GN + j)).some((x) => lefts.includes(x))
    ) {
      pc = e.r;
      break;
    }
  }
  const adj = new Map<number, number[]>();
  for (const e of edges)
    if (e.r <= pc) {
      adj.set(e.a, [...(adj.get(e.a) ?? []), e.b]);
      adj.set(e.b, [...(adj.get(e.b) ?? []), e.a]);
    }
  const prev = new Map<number, number>();
  const queue = Array.from({ length: GN }, (_, j) => j);
  for (const q of queue) prev.set(q, -1);
  let end = -1;
  while (queue.length) {
    const x = queue.shift() as number;
    if (Math.floor(x / GN) === GN - 1) {
      end = x;
      break;
    }
    for (const y of adj.get(x) ?? [])
      if (!prev.has(y)) {
        prev.set(y, x);
        queue.push(y);
      }
  }
  const path: THREE.Vector3[] = [];
  for (let x = end; x !== -1; x = prev.get(x) ?? -1)
    path.unshift(node(Math.floor(x / GN), x % GN).setY(0.12));
  const water = tube(
    [path[0].clone().add(V(-0.5, 0, 0)), ...path, path[path.length - 1].clone().add(V(0.5, 0, 0))],
    0.07,
    kit.ink,
    160,
    8
  );
  water.draw(0);
  grid.add(water.mesh);
  grid.position.z = GZ;
  grid.visible = false;
  scene.add(grid);

  const labels: Label3D[] = [
    { id: "phi", text: "Φ", at: V(A, 0.1, 0), dx: 26, dy: -10, italic: true },
    { id: "below", text: "WELL BELOW", at: V(SYS[0], 0.05, 0.25), dx: 0, dy: 50 },
    { id: "above", text: "WELL ABOVE", at: V(SYS[2], 0.05, 0.25), dx: 0, dy: 50 },
    { id: "none", text: "NO POINT OF VIEW", at: V(SYS[0], 3.65, SZ), dx: -30, dy: -40 },
    { id: "opens", text: "AN APERTURE OPENS", at: V(SYS[2], 3.65, SZ), dx: 40, dy: -40 },
    { id: "twilight", text: "THE TWILIGHT", at: V((TW0 + TW1) / 2, 0.05, 0.25), dx: 0, dy: 50 },
    { id: "nofact", text: "NO EXACT FACT", at: V(SYS[1], 3.9, SZ), dx: 0, dy: -40 },
    {
      id: "cond",
      text: "WIRING, DEVELOPMENT, AN ANESTHETIC",
      at: V(-A + 0.5, 0.1, CZ + 0.2),
      dx: 60,
      dy: 50,
    },
    { id: "climbs", text: "WHERE IT CLIMBS", at: V(0.6, 0.05, CZ + 0.2), dx: 70, dy: 50 },
    {
      id: "grid",
      text: "RANDOMLY OPEN PIPES",
      at: node(0, GN - 1).add(V(0, 0, GZ + 0.3)),
      dx: -40,
      dy: 50,
    },
    {
      id: "cross",
      text: "WHERE WATER FIRST CROSSES",
      at: path[Math.floor(path.length / 2)].clone().add(V(0, 0, GZ)),
      dx: 60,
      dy: -80,
    },
  ];

  const k = narrow ? 1.75 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0.2, 1.5, -0.4);
  const gridAt = V(0, 0, GZ);

  return {
    scene,
    kit,
    labels,
    update: () => {
      closed.group.visible = st.below > 0.5;
      open.group.visible = st.above > 0.5;
      ghost.visible = st.mid > 0.5;
      knob.position.x = st.slide;
      const phi = phiAt(st.slide);
      pointer.position.x = st.cond > 0.5 ? phi : pointer.position.x;
      link.mesh.visible = st.cond > 0.5;
      if (link.mesh.visible) link.place(V(st.slide, 0.3, CZ), V(phi, 0.15, 0.2));
      for (const e of edges) e.mesh.visible = e.r < st.p;
      water.draw(st.flow);
    },
    stops: [
      // 1 · Three regions: the axis and the systems engrave in; the ends are clear.
      (tl, t, c) => {
        tl.addLabel("regions", t);
        tl.fromTo(
          kit.clip,
          { constant: -A - 1 },
          { constant: A + 1, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-2.5, 0.8, -0.4)) },
          { ...xyz(home), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3, 2.5, 7)) },
          { ...xyz(view(0, 3.4, 10.4)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { phi: 1 }, t + 1.8);
        tl.set(st, { below: 1 }, t + 2.2);
        lab(tl, c, { below: 1, none: 1 }, t + 2.4);
        tl.set(st, { above: 1 }, t + 3);
        lab(tl, c, { above: 1, opens: 1 }, t + 3.2);
      },
      // 2 · The twilight: between them, only the outline of an aperture.
      (tl, t, c) => {
        tl.addLabel("twilight", t);
        lab(tl, c, { none: 0, opens: 0 }, t);
        cam(tl, c, V(0.8, 1.6, -0.6), view(0.4, 2.8, 8.6), t, 2.4, EASE);
        tl.set(st, { mid: 1 }, t + 0.8);
        lab(tl, c, { twilight: 1 }, t + 1);
        lab(tl, c, { nofact: 1 }, t + 1.6);
      },
      // 3 · A result, not a dial: conditions move a slider; integration follows and climbs.
      (tl, t, c) => {
        tl.addLabel("result", t);
        lab(tl, c, { nofact: 0, below: 0, above: 0, twilight: 0 }, t);
        cam(tl, c, V(0, 1, 0.4), view(0, 4.4, 10.6), t, 2.4, EASE);
        show(tl, condRail, t + 0.4, 0);
        tl.set(pointer, { visible: true }, t + 0.4);
        tl.set(st, { cond: 1, slide: -A + 0.3 }, t + 0.4);
        lab(tl, c, { cond: 1 }, t + 0.8);
        tl.to(st, { slide: A - 0.3, duration: 3.2, ease: "sine.inOut" }, t + 1.2);
        lab(tl, c, { climbs: 1, cond: 0 }, t + 2.4);
      },
      // 4 · Fixed by structure: pipes open at random until water first finds a way across.
      (tl, t, c) => {
        tl.addLabel("grid", t);
        lab(tl, c, { cond: 0, climbs: 0, twilight: 0, phi: 0 }, t);
        show(tl, grid, t, 0);
        cam(tl, c, gridAt, view(0.4, 6.2, 6.4), t, 2.6, EASE);
        tl.fromTo(st, { p: 0 }, { p: pc, duration: 2.2, ease: "power1.in" }, t + 1.2);
        lab(tl, c, { grid: 1 }, t + 1.6);
        tl.fromTo(st, { flow: 0 }, { flow: 1, duration: 1.4, ease: "power1.inOut" }, t + 3.5);
        lab(tl, c, { cross: 1 }, t + 4.4);
      },
    ],
  };
}
