// Figure on the Logic page: the Born rule as weighted branches.
// Two branches leave a measurement. Each amplitude is drawn as a side, and its weight as
// the square on that side: 70 and 30. Doors stand on the squares, one per branch, and you
// stand before them not knowing which you are behind. Then many repeated trials as a
// branching tree: counted leaf by leaf, most leaves land in the even bins. Weighted, the
// tree's thickness runs to records near 70%, and strange records thin to nothing. Last, a
// ruler: two stretches with the same number of points, whose lengths are the weights.
// Stops tween only `st`, the rig, labels, visibility, and the clip plane.

import type gsap from "gsap";
import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, show, V } from "../../tourScenes3d";
import { setup, tube, xyz } from "./decoherence-util";

const P = 0.7; // the weight of outcome A
const S = 2.4; // amplitude scale: a side of S·|amplitude|
const TX = 17; // the tree
const RX = 34; // the ruler
const DEPTH = 6;
const TOP = 5.3;
const DY = 0.74;
const LEAF_GAP = 0.15;
const BIN_GAP = 1.3;

const choose = (n: number, k: number) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};

export function born(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { branch: 0, amp: 0, sq: 0, tree: 0, drop: 0, weigh: 0, dots: 0 };

  // ---------- Two branches, amplitudes as sides, weights as squares ----------
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), kit.surface(0.1));
  orb.position.set(0, 0.32, 2.3);
  orb.visible = false;
  scene.add(orb);
  const sides = [Math.sqrt(P) * S, Math.sqrt(1 - P) * S];
  const lefts = [-3.3, 0.9];
  const squares = sides.map((side, i) => {
    const x0 = lefts[i];
    const cx = x0 + side / 2;
    const path = tube(
      [orb.position.clone(), V((cx + orb.position.x) / 2, 0.22, 1.2), V(cx, 0.08, 0.02)],
      0.05,
      kit.surface(0),
      40
    );
    path.draw(0);
    scene.add(path.mesh);
    // The amplitude: an ink side along the front edge.
    const ag = new THREE.CylinderGeometry(0.045, 0.045, side, 10);
    ag.rotateZ(Math.PI / 2);
    ag.translate(side / 2, 0, 0);
    const amp = new THREE.Mesh(ag, kit.ink);
    amp.position.set(x0, 0.12, 0);
    amp.scale.x = 0.001;
    amp.visible = false;
    scene.add(amp);
    // The weight: the square swept back from that side.
    const sg = new THREE.BoxGeometry(side, 0.1, side);
    sg.translate(side / 2, 0.05, -side / 2);
    const sq = new THREE.Mesh(sg, kit.surface(-0.6));
    sq.position.set(x0, 0, 0);
    sq.scale.z = 0.001;
    sq.visible = false;
    scene.add(sq);
    // A door on the square's back edge.
    const door = new THREE.Group();
    const frameMat = kit.surface(0.15);
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.3, 0.16), frameMat);
      post.position.set(s * 0.56, 1.15, 0);
      door.add(post);
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.14, 0.16), frameMat);
    lintel.position.y = 2.36;
    door.add(lintel);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1, 2.28, 0.06), kit.surface(0.55));
    panel.position.y = 1.14;
    door.add(panel);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), kit.surface(0));
    knob.position.set(0.34, 1.1, 0.07);
    door.add(knob);
    door.position.set(cx, 0.1, -side + 0.1);
    door.visible = false;
    scene.add(door);
    return { side, x0, cx, path, amp, sq, door };
  });
  const you = makePerson(kit, 0.1);
  you.group.rotation.y = Math.PI;
  you.group.position.set(-0.2, 0, 3.4);
  you.group.visible = false;
  scene.add(you.group);

  // ---------- Repeated trials: a branching tree, counted and weighed ----------
  type Node = { pos: THREE.Vector3; depth: number; a: number; w: number; parent: number };
  const nodes: Node[] = [];
  const leafX = (i: number) => TX + (i - (2 ** DEPTH - 1) / 2) * LEAF_GAP;
  const build = (lo: number, hi: number, depth: number, a: number, w: number, parent: number) => {
    const me = nodes.length;
    nodes.push({ pos: V(leafX((lo + hi - 1) / 2), TOP - depth * DY, 0), depth, a, w, parent });
    if (depth === DEPTH) return;
    const mid = (lo + hi) / 2;
    // Left is outcome B, right is outcome A, so records with more A sit to the right.
    build(lo, mid, depth + 1, a, w * (1 - P), me);
    build(mid, hi, depth + 1, a + 1, w * P, me);
  };
  build(0, 2 ** DEPTH, 0, 0, 1, -1);

  const treeMat = kit.surface(0);
  const rodGeo = new THREE.CylinderGeometry(1, 1, 1, 8, 1);
  const UP = V(0, 1, 0);
  const rods = nodes
    .filter((n) => n.parent >= 0)
    .map((n) => {
      const a = nodes[n.parent].pos;
      const dir = n.pos.clone().sub(a);
      const len = dir.length();
      const mesh = new THREE.Mesh(rodGeo, treeMat);
      mesh.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, a, dir, len, n, r: 0.13 * Math.sqrt(n.w) };
    });
  const rootCap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), kit.surface(0.1));
  rootCap.position.copy(nodes[0].pos);
  rootCap.visible = false;
  scene.add(rootCap);

  // Leaves fall into bins by how many A's their record holds.
  const binX = (k: number) => TX + (k - DEPTH / 2) * BIN_GAP;
  const binWeight = Array.from(
    { length: DEPTH + 1 },
    (_, k) => choose(DEPTH, k) * P ** k * (1 - P) ** (DEPTH - k)
  );
  const filled = new Array(DEPTH + 1).fill(0);
  const ballGeo = new THREE.SphereGeometry(0.065, 12, 8);
  const ballMat = kit.surface(-0.5);
  const leaves = nodes
    .filter((n) => n.depth === DEPTH)
    .map((n, i) => {
      const j = filled[n.a]++;
      const m = new THREE.Mesh(ballGeo, ballMat);
      m.visible = false;
      scene.add(m);
      return { m, from: n.pos.clone(), to: V(binX(n.a), 0.07, 0.9 + j * 0.16), order: i };
    });
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(BIN_GAP * (DEPTH + 1), 0.06, 4.2),
    kit.surface(0.05)
  );
  floor.position.set(TX, -0.04, 2.7);
  floor.visible = false;
  scene.add(floor);
  const strips = binWeight.map((w, k) => {
    const len = Math.max(w * 11, 0.02);
    const g = new THREE.BoxGeometry(0.42, 0.1, len);
    g.translate(0, 0.05, len / 2);
    const m = new THREE.Mesh(g, kit.surface(-0.6));
    m.position.set(binX(k), 0, 0.8);
    m.scale.z = 0.001;
    m.visible = false;
    scene.add(m);
    return { m, len };
  });

  // ---------- Points and lengths: a ruler ----------
  const RL = 10;
  const ruler = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.BoxGeometry(RL + 0.4, 0.22, 0.9), kit.surface(0.35));
  bar.position.y = 0.11;
  ruler.add(bar);
  const split = -RL / 2 + RL * P;
  const stretches = [
    { x0: -RL / 2, x1: split },
    { x0: split, x1: RL / 2 },
  ].map(({ x0, x1 }) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0 - 0.06, 0.12, 0.6), kit.surface(-0.6));
    m.position.set((x0 + x1) / 2, 0.28, 0);
    ruler.add(m);
    // Dimension line above, with end ticks.
    const dim = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0 - 0.1, 0.025, 0.025), kit.ink);
    dim.add(shaft);
    for (const x of [x0 - (x0 + x1) / 2 + 0.05, x1 - (x0 + x1) / 2 - 0.05]) {
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.28, 0.025), kit.ink);
      tick.position.x = x;
      dim.add(tick);
    }
    dim.position.set((x0 + x1) / 2, 0.95, 0);
    dim.visible = false;
    ruler.add(dim);
    return { x0, x1, dim };
  });
  // The same number of points on each stretch: counting cannot tell them apart.
  const N = 24;
  const dotGeo = new THREE.SphereGeometry(0.045, 10, 8);
  const dots = stretches.flatMap(({ x0, x1 }) =>
    Array.from({ length: N }, (_, i) => {
      const m = new THREE.Mesh(dotGeo, kit.ink);
      m.position.set(x0 + ((i + 0.5) / N) * (x1 - x0), 0.36, 0.05);
      m.scale.setScalar(0.001);
      ruler.add(m);
      return m;
    })
  );
  ruler.position.set(RX, 0, 0);
  scene.add(ruler);

  const strange = leaves.find((l) => nodes.find((n) => n.pos.equals(l.from))?.a === 0);
  const labels: Label3D[] = [
    { id: "amp", text: "AMPLITUDE", at: V(lefts[0] + 0.5, 0.12, 0), dx: -30, dy: 60 },
    {
      id: "wa",
      text: "WEIGHT 70%",
      at: V(squares[0].cx, 0.1, -sides[0] / 2),
      dx: -40,
      dy: -70,
    },
    {
      id: "wb",
      text: "WEIGHT 30%",
      at: V(squares[1].cx, 0.1, -sides[1] / 2),
      dx: 60,
      dy: -60,
    },
    { id: "you", text: "YOU, NOT YET LOOKING", at: V(-0.2, 1.75, 3.4), dx: 80, dy: 40 },
    {
      id: "behind",
      text: "AN OBSERVER BEHIND EACH",
      at: V(squares[0].cx, 2.4, -sides[0] + 0.1),
      dx: 0,
      dy: -40,
    },
    { id: "trials", text: "REPEATED TRIALS", at: nodes[0].pos, dx: -90, dy: -30 },
    { id: "even", text: "MOSTLY EVEN", at: V(binX(3), 0.1, 0.9 + 19 * 0.16), dx: -70, dy: 50 },
    {
      id: "near",
      text: "MOST WEIGHT NEAR 70%",
      at: V(binX(4), 0.1, 0.8 + strips[4].len),
      dx: 50,
      dy: 60,
    },
    {
      id: "strange",
      text: "STRANGE RECORDS",
      at: strange?.to ?? V(binX(0), 0, 1),
      dx: -50,
      dy: 60,
    },
    {
      id: "point",
      text: "AN OBSERVER, A POINT",
      at: dots[N + 4].getWorldPosition(V(0, 0, 0)),
      dx: 30,
      dy: -90,
    },
    {
      id: "la",
      text: "70%, A LENGTH",
      at: V(RX + (stretches[0].x0 + split) / 2, 0.95, 0),
      dx: 0,
      dy: -40,
    },
    { id: "lb", text: "30%", at: V(RX + (split + RL / 2) / 2, 0.95, 0), dx: 0, dy: -40 },
  ];
  // Ruler children have no world matrix yet; place the point label by hand.
  labels[9].at = V(RX + dots[N + 4].position.x, 0.36, 0.05);

  const k = narrow ? 1.1 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const s of squares) {
        s.path.draw(st.branch);
        s.amp.scale.x = Math.max(st.amp, 0.001);
        s.sq.scale.z = Math.max(st.sq, 0.001);
      }
      // The tree grows level by level; weighed, each branch's thickness follows its weight.
      for (const r of rods) {
        const f = THREE.MathUtils.clamp(st.tree * DEPTH - (r.n.depth - 1), 0, 1);
        r.mesh.visible = f > 0;
        const rad = THREE.MathUtils.lerp(0.022, Math.max(r.r, 0.004), st.weigh);
        r.mesh.position.copy(r.a).addScaledVector(r.dir, f / 2);
        r.mesh.scale.set(rad, r.len * f, rad);
      }
      const spread = 1.6;
      for (const l of leaves) {
        const p = THREE.MathUtils.clamp(st.drop * (1 + spread) - (l.order / 63) * spread, 0, 1);
        l.m.visible = st.tree >= 1 && st.weigh < 1;
        tmp.copy(l.from).lerp(l.to, p);
        tmp.y += Math.sin(Math.PI * p) * 0.5;
        l.m.position.copy(tmp);
        l.m.scale.setScalar(Math.max(1 - st.weigh, 0.001));
      }
      for (const s of strips) {
        s.m.visible = st.weigh > 0;
        s.m.scale.z = Math.max(st.weigh, 0.001);
      }
      dots.forEach((d, i) => {
        const p = THREE.MathUtils.clamp(st.dots * 2 - (i % N) / N, 0, 1);
        d.scale.setScalar(Math.max(p, 0.001));
      });
    },
    stops: [
      // 1 · Two branches. Each amplitude is a side; its weight is the square on it.
      (tl, t, c) => {
        tl.addLabel("squares", t);
        tl.set(kit.clip, { constant: 100 }, t);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 1.5 },
          { x: -0.3, y: 0.2, z: -0.4, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3, 3, 7)) },
          { ...xyz(view(0.6, 6.4, 8.2)), duration: 3, ease: EASE },
          t
        );
        show(tl, orb, t + 0.4, 0.6);
        tl.fromTo(st, { branch: 0 }, { branch: 1, duration: 1.2, ease: "power1.inOut" }, t + 0.8);
        tl.set(
          squares.map((s) => s.amp),
          { visible: true },
          t + 1.8
        );
        tl.fromTo(st, { amp: 0 }, { amp: 1, duration: 0.9, ease: "power2.out" }, t + 1.8);
        lab(tl, c, { amp: 1 }, t + 2.2);
        tl.set(
          squares.map((s) => s.sq),
          { visible: true },
          t + 3
        );
        tl.fromTo(st, { sq: 0 }, { sq: 1, duration: 1.4, ease: "power2.inOut" }, t + 3);
        lab(tl, c, { wa: 1, wb: 1 }, t + 4.2);
      },
      // 2 · Behind the doors: one per branch, and you before them, not knowing which.
      (tl, t, c) => {
        tl.addLabel("doors", t);
        lab(tl, c, { amp: 0, wa: 0, wb: 0 }, t);
        tl.set(st, { branch: 1, amp: 1, sq: 1 }, t);
        cam(tl, c, V(-0.4, 1.3, -0.6), view(2.6, 1.9, 8.2), t, 2.6, EASE);
        squares.forEach((s, i) => {
          tl.set(s.door, { visible: true }, t + 0.8 + i * 0.3);
          tl.fromTo(
            s.door.scale,
            { y: 0.001 },
            { y: 1, duration: 1, ease: "power2.out" },
            t + 0.8 + i * 0.3
          );
        });
        show(tl, you.group, t + 2, 0.7);
        lab(tl, c, { behind: 1 }, t + 2.6);
        lab(tl, c, { you: 1 }, t + 3.4);
      },
      // 3 · Counting: many trials as a tree. Counted one by one, most leaves sit near even.
      (tl, t, c) => {
        tl.addLabel("counting", t);
        lab(tl, c, { behind: 0, you: 0 }, t);
        cam(tl, c, V(TX, 2, 1.2), view(0, 5.2, 13.5), t, 3, EASE);
        tl.set([rootCap, floor], { visible: true }, t + 1.2);
        tl.fromTo(st, { tree: 0 }, { tree: 1, duration: 2.2, ease: "none" }, t + 1.2);
        lab(tl, c, { trials: 1 }, t + 1.8);
        tl.fromTo(st, { drop: 0 }, { drop: 1, duration: 2.4, ease: "power1.inOut" }, t + 3.6);
        lab(tl, c, { even: 1 }, t + 5.6);
      },
      // 4 · Weight: thickness follows weight. Nearly all of it runs to records near 70%;
      // strange records thin to almost nothing.
      (tl, t, c) => {
        tl.addLabel("weight", t);
        lab(tl, c, { trials: 0, even: 0 }, t);
        tl.set(st, { tree: 1, drop: 1 }, t);
        cam(tl, c, V(TX + 0.6, 2, 1.2), view(1.6, 5.6, 13), t, 2.4, EASE);
        tl.fromTo(st, { weigh: 0 }, { weigh: 1, duration: 2.4, ease: "power1.inOut" }, t + 0.8);
        lab(tl, c, { near: 1 }, t + 3.2);
        lab(tl, c, { strange: 1 }, t + 4);
      },
      // 5 · Points and lengths: the same number of points on each stretch; the weights
      // are the lengths.
      (tl, t, c) => {
        tl.addLabel("lengths", t);
        lab(tl, c, { near: 0, strange: 0 }, t);
        tl.set(st, { weigh: 1 }, t);
        cam(tl, c, V(RX, 0.4, 0), view(-1.4, 4.2, 12), t, 3, EASE);
        tl.fromTo(
          kit.clip,
          { constant: RX - 5.6 },
          { constant: RX + 5.6, duration: 2, ease: "power1.inOut" },
          t + 1
        );
        tl.fromTo(st, { dots: 0 }, { dots: 1, duration: 1.6, ease: "none" }, t + 2.8);
        lab(tl, c, { point: 1 }, t + 3.8);
        tl.set(
          stretches.map((s) => s.dim),
          { visible: true },
          t + 4.4
        );
        lab(tl, c, { la: 1, lb: 1 }, t + 4.6);
        tl.set(kit.clip, { constant: 100 }, t + 5);
      },
    ],
  };
}
