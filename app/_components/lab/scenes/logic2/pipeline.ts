// Logic figure: the Holos relation as a pipeline. A state S passes through a ring, C, and
// fans out into every branch physical law produces. A frame, O, stands across the
// branches: where a branch holds an integrated system, an aperture opens there and the
// branch beyond becomes a lived history. Every branch passes on, so nothing is selected
// or erased. Last, the order of reading: C ⊛ O left to right is O ∘ C right to left.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { arrow, setup, tube, xyz } from "./decoherence-util";

const SX = -6.2; // the state
const CX = -3.4; // the Creation ring
const OX = 2.2; // the Observation frame
const END = 5.8; // where the branches leave the picture
const LEAVES = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]; // z of each branch
const OBSERVED = [0, 3, 4]; // branches that hold an integrated system
const SYS_X = 0.9; // where those systems sit

export function pipeline(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { stub: 0, grow: 0, hist: 0 };

  // S: a small lattice of joined points, any informational state.
  const state = new THREE.Group();
  const nodeMat = kit.surface(0.25);
  const ball = new THREE.SphereGeometry(0.075, 12, 10);
  const pts: THREE.Vector3[] = [];
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      for (let k = -1; k <= 1; k++) {
        const p = V(i * 0.28, j * 0.28, k * 0.28);
        pts.push(p);
        const m = new THREE.Mesh(ball, nodeMat);
        m.position.copy(p);
        state.add(m);
      }
  const bonds: THREE.Vector3[] = [];
  for (const a of pts)
    for (const b of pts)
      if (a.x <= b.x && a.distanceTo(b) > 0.27 && a.distanceTo(b) < 0.29) bonds.push(a, b);
  state.add(segments(bonds, kit.ink));
  state.position.set(SX, 0, 0);
  state.rotation.set(0.3, 0.5, 0);
  scene.add(state);

  // C: a ring the state passes through.
  const gate = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.07, 12, 64), kit.surface(0.15));
  ring.rotation.y = Math.PI / 2;
  gate.add(ring);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.35, 10), kit.surface(0.2));
  post.position.y = -1.03;
  gate.add(post);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.5), kit.surface(0.1));
  foot.position.y = -1.2;
  gate.add(foot);
  gate.position.set(CX, 0, 0);
  gate.visible = false;
  scene.add(gate);

  // The stub from the state into the ring.
  const stub = tube([V(SX + 0.45, 0, 0), V(CX - 0.4, 0, 0), V(CX, 0, 0)], 0.045, kit.ink, 32, 8);
  stub.draw(0);
  scene.add(stub.mesh);

  // The branches: a trunk, two forks, then three branches from each fork.
  const branchMat = kit.surface(0.12);
  const forkX = -1.9;
  const splitX = -0.4;
  const trunk = tube(
    [V(CX, 0, 0), V((CX + forkX) / 2, 0, 0), V(forkX, 0, 0)],
    0.05,
    branchMat,
    24,
    8
  );
  const forks = [-1.5, 1.5].map((z) =>
    tube(
      [V(forkX, 0, 0), V((forkX + splitX) / 2, 0, z * 0.6), V(splitX, 0, z)],
      0.045,
      branchMat,
      32,
      8
    )
  );
  const leaves = LEAVES.map((z) => {
    const from = z < 0 ? -1.5 : 1.5;
    return tube(
      [V(splitX, 0, from), V(splitX + 0.6, 0, (from + z) / 2), V(splitX + 1.2, 0, z), V(END, 0, z)],
      0.04,
      branchMat,
      72,
      8
    );
  });
  for (const b of [trunk, ...forks, ...leaves]) {
    b.draw(0);
    scene.add(b.mesh);
  }

  // Integrated systems on three branches: a small knot of joined nodes.
  const systems = OBSERVED.map((i) => {
    const g = new THREE.Group();
    const geo = new THREE.IcosahedronGeometry(0.26, 0);
    g.add(new THREE.Mesh(geo, kit.surface(0.3)));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), kit.ink));
    g.position.set(SYS_X, 0, LEAVES[i]);
    g.visible = false;
    scene.add(g);
    return g;
  });

  // O: a frame across every branch. Apertures open only where a branch holds a system.
  const frame = new THREE.Group();
  const H = 1.1;
  const W = 3.2;
  frame.add(
    line([V(0, -H, -W), V(0, H, -W), V(0, H, W), V(0, -H, W)], kit.ink, true),
    line(
      [
        V(0, -H - 0.1, -W - 0.1),
        V(0, H + 0.1, -W - 0.1),
        V(0, H + 0.1, W + 0.1),
        V(0, -H - 0.1, W + 0.1),
      ],
      kit.soft,
      true
    )
  );
  frame.position.x = OX;
  frame.visible = false;
  scene.add(frame);
  const irises = OBSERVED.map((i) => {
    const iris = makeIris(kit, 0.17);
    iris.group.position.set(OX, 0, LEAVES[i]);
    iris.group.rotation.y = Math.PI / 2;
    iris.group.visible = false;
    scene.add(iris.group);
    return iris;
  });

  // Lived reality: beyond the frame, each observed branch becomes a history.
  const histories = OBSERVED.map((i) => {
    const h = tube(
      [V(OX + 0.1, 0, LEAVES[i]), V((OX + END) / 2, 0, LEAVES[i]), V(END, 0, LEAVES[i])],
      0.085,
      kit.ink,
      40,
      10
    );
    h.draw(0);
    scene.add(h.mesh);
    return h;
  });

  // Reading order: an arrow under the pipeline, pointing back toward the state.
  const back = arrow(V(END - 0.4, -1.75, 3.4), V(SX + 0.6, -1.75, 3.4), kit.ink, 0.025, 0.3);
  back.visible = false;
  scene.add(back);

  const labels: Label3D[] = [
    { id: "s", text: "S", at: V(SX, 0.5, 0), dx: -20, dy: -46, italic: true },
    { id: "c", text: "C", at: V(CX, 0.9, 0), dx: 0, dy: -40, italic: true },
    { id: "branches", text: "EVERY BRANCH", at: V(END - 0.6, 0, LEAVES[5]), dx: 20, dy: 46 },
    { id: "o", text: "O", at: V(OX, H, 0), dx: 0, dy: -40, italic: true },
    { id: "system", text: "AN INTEGRATED SYSTEM", at: V(SYS_X, 0.26, LEAVES[0]), dx: -40, dy: -50 },
    {
      id: "history",
      text: "ONE HISTORY PER OBSERVER",
      at: V(END - 0.8, 0.08, LEAVES[3]),
      dx: 10,
      dy: -60,
    },
    { id: "rs", text: "R(S)", at: V(END, 0.08, LEAVES[4]), dx: 30, dy: 30, italic: true },
    { id: "compose", text: "C ⊛ O", at: V((CX + OX) / 2, 0.05, 0), dx: 0, dy: -90, italic: true },
    { id: "order", text: "READ RIGHT TO LEFT, O ∘ C", at: V(0, -1.75, 3.4), dx: 0, dy: 40 },
  ];

  // Phones see the pipeline from further along its length, so it recedes in depth.
  const view = (x: number, y: number, z: number) =>
    narrow ? V(x * 1.1 - 1.5, y * 1.25 + 1, z * 1.3) : V(x, y, z);
  const whole = V(-0.2, 0, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      stub.draw(st.stub);
      trunk.draw(Math.min(st.grow, 1));
      for (const f of forks) f.draw(Math.min(Math.max(st.grow - 1, 0), 1));
      for (const l of leaves) l.draw(Math.min(Math.max(st.grow - 2, 0), 1));
      for (const h of histories) h.draw(st.hist);
    },
    stops: [
      // 1 · A state: the lattice engraves in.
      (tl, t, c) => {
        tl.addLabel("state", t);
        tl.fromTo(
          kit.clip,
          { constant: SX - 0.8 },
          { constant: SX + 0.8, duration: 1.4, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.5);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(SX, 0, 0)) },
          { ...xyz(V(SX + 0.4, 0, 0)), duration: 2.4, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(1.5, 1.6, 4.4)) },
          { ...xyz(view(1.6, 2.2, 6)), duration: 2.4, ease: EASE },
          t
        );
        tl.fromTo(state.rotation, { y: 0.5 }, { y: 1.4, duration: 3.2, ease: "sine.inOut" }, t);
        lab(tl, c, { s: 1 }, t + 1.2);
      },
      // 2 · Creation: through the ring, the state fans out into every branch.
      (tl, t, c) => {
        tl.addLabel("creation", t);
        show(tl, gate, t + 0.2, 0.7);
        cam(tl, c, V(-1.8, 0, 0), view(-4, 5.2, 10.5), t, 2.6, EASE);
        tl.fromTo(st, { stub: 0 }, { stub: 1, duration: 0.8, ease: "none" }, t + 0.8);
        tl.fromTo(st, { grow: 0 }, { grow: 3, duration: 2.4, ease: "power1.inOut" }, t + 1.6);
        lab(tl, c, { c: 1 }, t + 1);
        lab(tl, c, { branches: 1 }, t + 3.8);
      },
      // 3 · Observation: systems on some branches, and apertures open there in the frame.
      (tl, t, c) => {
        tl.addLabel("observation", t);
        lab(tl, c, { branches: 0, s: 0 }, t);
        cam(tl, c, V(1.6, 0, 0), view(-5.6, 4.4, 8.6), t, 2.4, EASE);
        systems.forEach((g, i) => {
          show(tl, g, t + 0.4 + i * 0.25, 0.6);
        });
        lab(tl, c, { system: 1 }, t + 1.4);
        show(tl, frame, t + 1.6, 0);
        irises.forEach((iris, i) => {
          show(tl, iris.group, t + 2.2 + i * 0.2, 0.6);
        });
        lab(tl, c, { o: 1 }, t + 2.2);
      },
      // 4 · Lived reality: each observed branch beyond the frame becomes a history.
      (tl, t, c) => {
        tl.addLabel("lived", t);
        lab(tl, c, { system: 0 }, t);
        cam(tl, c, V(3.2, 0, 0), view(-5.2, 4, 8.2), t, 2.4, EASE);
        tl.fromTo(st, { hist: 0 }, { hist: 1, duration: 1.8, ease: "power1.inOut" }, t + 0.6);
        lab(tl, c, { history: 1 }, t + 2.2);
        lab(tl, c, { rs: 1 }, t + 2.8);
      },
      // 5 · Reading order: the whole pipeline, and an arrow reading it back.
      (tl, t, c) => {
        tl.addLabel("order", t);
        lab(tl, c, { history: 0 }, t);
        cam(tl, c, whole, view(-4.6, 7, 14.5), t, 2.6, EASE);
        lab(tl, c, { s: 1, c: 1, o: 1, rs: 1 }, t + 1);
        lab(tl, c, { compose: 1 }, t + 1.8);
        show(tl, back, t + 2.4, 0.6);
        lab(tl, c, { order: 1 }, t + 3);
      },
    ],
  };
}
