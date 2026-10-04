// Overview figure, Consciousness: a relay, not one whole. A row of stations passes a token
// forward, one way, each step handing on and never hearing back. A shelf of notes runs
// beside the row: each station leaves a note, later stations read it, none rewrites it. A
// loop forms over the row for one word, then breaks, and the next word starts fresh.
// Beside it, a ring whose parts act on one another both ways, kept as one working whole:
// how a system built differently could be. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { arrow, rod, setup, tube, xyz } from "../logic2/decoherence-util";

const N = 6;
const X0 = -4;
const DX = 1.4;
const RING = V(0, 0, -4.2);

export function csOneWay(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { pass: 0, notes: 0, loop: 0, broken: 0, ring: 0 };

  const bench = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.12, 2.4), kit.surface(0.04));
  bench.position.set(X0 + (DX * (N - 1)) / 2, -0.06, 0.3);
  scene.add(bench);

  // Stations in a row, with one-way arrows between them.
  const xs = Array.from({ length: N }, (_, i) => X0 + i * DX);
  for (const x of xs) {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.6, 24), kit.surface(0.12));
    s.position.set(x, 0.3, 0);
    scene.add(s);
  }
  for (let i = 0; i < N - 1; i++)
    scene.add(arrow(V(xs[i] + 0.38, 0.45, 0), V(xs[i + 1] - 0.38, 0.45, 0), kit.ink, 0.02, 0.16));
  const token = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), kit.ink);
  token.visible = false;
  scene.add(token);

  // Notes: a shelf behind the row; each station leaves one, later ones read it.
  const shelf = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(DX * (N - 1) + 1, 0.06, 0.5),
    kit.surface(0.1)
  );
  board.position.set(X0 + (DX * (N - 1)) / 2, 1.3, -0.9);
  shelf.add(board);
  const writes: THREE.Vector3[] = [];
  const reads: THREE.Vector3[] = [];
  xs.forEach((x, i) => {
    const card = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.03), kit.surface(0.2));
    card.position.set(x, 1.5, -0.9);
    shelf.add(card);
    writes.push(V(x, 0.6, -0.1), V(x, 1.35, -0.85));
    for (let j = i + 1; j < Math.min(N, i + 3); j++)
      reads.push(V(x + 0.2, 1.55, -0.88), V(xs[j], 0.62, -0.05));
  });
  shelf.add(segments(writes, kit.ink));
  const readLines = segments(reads, kit.soft);
  shelf.add(readLines);
  shelf.visible = false;
  scene.add(shelf);

  // One word's loop over the row, and the cut that ends it.
  const loopPts = [
    V(xs[N - 1], 0.65, 0.2),
    V(xs[N - 1] + 0.3, 1.6, 0.6),
    V((xs[0] + xs[N - 1]) / 2, 2.6, 0.9),
    V(xs[0] - 0.3, 1.6, 0.6),
    V(xs[0], 0.65, 0.2),
  ];
  const loop = tube(loopPts, 0.035, kit.ink, 120, 8);
  loop.draw(0);
  scene.add(loop.mesh);
  const cut = segments(
    [
      V(xs[0] - 0.55, 1.15, 0.25),
      V(xs[0] - 0.25, 1.45, 0.55),
      V(xs[0] - 0.25, 1.15, 0.25),
      V(xs[0] - 0.55, 1.45, 0.55),
    ],
    kit.ink
  );
  cut.visible = false;
  scene.add(cut);

  // A ring of parts, all acting on one another, as one whole.
  const ringG = new THREE.Group();
  const RN = 7;
  const pts = Array.from({ length: RN }, (_, i) => {
    const a = (i / RN) * Math.PI * 2;
    return V(Math.cos(a) * 1.3, 0.6, Math.sin(a) * 1.3);
  });
  for (const p of pts) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), kit.surface(0.3));
    m.position.copy(p);
    ringG.add(m);
  }
  pts.forEach((a, i) => {
    pts.forEach((b, j) => {
      if (j > i) {
        const rd = rod(0.015, kit.surface(0.2), 6);
        rd.place(a, b);
        ringG.add(rd.mesh);
      }
    });
  });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.12, 64), kit.surface(0.04));
  base.position.y = -0.06;
  ringG.add(base);
  ringG.add(
    segments(
      circlePts(1.55, 64).flatMap((p, i, a) => [
        V(p.x, 0.02, p.y),
        V(a[(i + 1) % a.length].x, 0.02, a[(i + 1) % a.length].y),
      ]),
      kit.soft
    )
  );
  ringG.position.copy(RING);
  ringG.visible = false;
  scene.add(ringG);

  const labels: Label3D[] = [
    { id: "pass", text: "EACH STEP HANDS ON, NEVER BACK", at: V(xs[3], 0.5, 0), dx: 40, dy: 60 },
    {
      id: "notes",
      text: "NOTES, READ BUT NEVER REWRITTEN",
      at: V(xs[N - 1], 1.65, -0.9),
      dx: 50,
      dy: -40,
    },
    { id: "loop", text: "ONE WORD'S LOOP, THEN IT ENDS", at: V(xs[2], 2.4, 0.6), dx: 40, dy: -50 },
    { id: "relay", text: "A RELAY OF SEPARATE STEPS", at: V(xs[0], 0.6, 0), dx: -50, dy: 60 },
    {
      id: "whole",
      text: "ONE WHOLE, BUILT DIFFERENTLY",
      at: V(RING.x + 1.3, 0.8, RING.z),
      dx: 60,
      dy: -50,
    },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.7 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const row = V(X0 + (DX * (N - 1)) / 2, 0.8, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      token.visible = st.pass > 0.01 && st.pass < 0.99;
      const u = st.pass * (N - 1);
      token.position.set(X0 + u * DX, 0.75, 0);
      shelf.visible = st.notes > 0.5;
      loop.draw(st.loop * (1 - 0.1 * st.broken));
      cut.visible = st.broken > 0.5;
      ringG.visible = st.ring > 0.5;
    },
    stops: [
      // 1 · One way: the row engraves in, and a token passes station to station.
      (tl, t, c) => {
        tl.addLabel("oneway", t);
        tl.fromTo(
          kit.clip,
          { constant: X0 - 1 },
          { constant: xs[N - 1] + 1, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(X0, 0.6, 0)) },
          { ...xyz(row), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2, 2.6, 6)) },
          { ...xyz(view(0.4, 5.4, 9.4)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(st, { pass: 0 }, { pass: 1, duration: 2.4, ease: "none" }, t + 2);
        lab(tl, c, { pass: 1 }, t + 2.6);
      },
      // 2 · Notes: a shelf of notes, each read by later stations and never rewritten.
      (tl, t, c) => {
        tl.addLabel("notes", t);
        lab(tl, c, { pass: 0 }, t);
        cam(tl, c, V(row.x, 1, -0.4), view(0.6, 4.6, 8.8), t, 2.2, EASE);
        tl.set(st, { notes: 1 }, t + 0.8);
        show(tl, shelf, t + 0.8, 0);
        lab(tl, c, { notes: 1 }, t + 1.6);
      },
      // 3 · A loop that ends: a loop forms over the row for one word, then breaks.
      (tl, t, c) => {
        tl.addLabel("loop", t);
        lab(tl, c, { notes: 0 }, t);
        cam(tl, c, V(row.x, 1.3, 0.3), view(-0.6, 4.4, 10), t, 2.2, EASE);
        tl.fromTo(
          st,
          { loop: 0, broken: 0 },
          { loop: 1, duration: 1.6, ease: "power1.inOut" },
          t + 0.6
        );
        tl.to(st, { broken: 1, duration: 0.3 }, t + 2.4);
        lab(tl, c, { loop: 1 }, t + 2.6);
      },
      // 4 · Not one whole: the relay beside a ring whose parts all act on one another.
      (tl, t, c) => {
        tl.addLabel("whole", t);
        lab(tl, c, none, t);
        tl.set(st, { ring: 1 }, t + 0.4);
        cam(tl, c, V(row.x, 0.6, -2), view(0.4, 7.6, 10.4), t, 2.6, EASE);
        lab(tl, c, { relay: 1 }, t + 1.6);
        lab(tl, c, { whole: 1 }, t + 2.2);
      },
    ],
  };
}
