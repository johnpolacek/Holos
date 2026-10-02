// Figure: Holos among the quantum interpretations, drawn as a map.
// At the center of a round table, a small system holds two states at once: the
// measurement problem. Each interpretation's answer stands on a pedestal around it.
// Copenhagen shuts the lid on the question. The two collapse views keep one result,
// one by size and one by a conscious aperture. Many-Worlds keeps every branch, Bohmian
// mechanics one particle riding a wave that still forks. Holos keeps the same branches
// as Many-Worlds and marks the lived ones. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { type Built3D, cam, type Label3D, lab, line, makeIris, V } from "../../tourScenes3d";
import {
  ball,
  block,
  drum,
  EASE,
  frame,
  ghost,
  grow,
  hidden,
  rod,
  setup,
  tone,
} from "./interpretations-util";

const R = 4.2; // pedestals' distance from the center
const P = 0.25; // pedestal top
const UP = V(0, 1, 0);
const deg = THREE.MathUtils.degToRad;

// The fork every no-collapse answer shares: a trunk, two branches, four tips.
function fork() {
  const n = (x: number, y: number) => V(x, P + y, 0);
  const root = n(0, 0);
  const knot = n(0, 0.55);
  const mid = [n(-0.42, 1.0), n(0.42, 1.0)];
  const tips = [n(-0.66, 1.45), n(-0.18, 1.45), n(0.18, 1.45), n(0.66, 1.45)];
  const segs: [THREE.Vector3, THREE.Vector3, number[]][] = [
    [root, knot, [0, 1, 2, 3]],
    [knot, mid[0], [0, 1]],
    [knot, mid[1], [2, 3]],
    [mid[0], tips[0], [0]],
    [mid[0], tips[1], [1]],
    [mid[1], tips[2], [2]],
    [mid[1], tips[3], [3]],
  ];
  return { segs, tips, joints: [knot, ...mid] };
}

export function interpretations(narrow = false): Built3D {
  const { kit, scene } = setup();
  const st = { eye: 0, holos: [0, 0], bohm: 0 };

  // The table, and the problem at its center.
  const table = drum(kit, 5.5, 0.2, 0.15, 96);
  table.position.y = -0.2;
  scene.add(table);
  scene.add(drum(kit, 0.75, 0.9, 0));
  const pair = new THREE.Group();
  for (const x of [-0.36, 0.36]) {
    const g = ghost(kit, 0.27, kit.ink);
    g.position.x = x;
    pair.add(g);
  }
  pair.position.y = 0.9 + 0.3;
  scene.add(pair);

  // Six pedestals on spokes. Each station's local +z faces out from the center.
  const angles = { cop: -30, obj: -90, con: -150, bohm: 150, mwi: 90, holos: 30 };
  const place = (d: number) => V(Math.sin(deg(d)) * R, 0, Math.cos(deg(d)) * R);
  const world = (d: number, local: THREE.Vector3) =>
    local.clone().applyAxisAngle(UP, deg(d)).add(place(d));
  const station = (d: number) => {
    const g = new THREE.Group();
    g.position.copy(place(d));
    g.rotation.y = deg(d);
    g.add(drum(kit, 0.95, P, 0.05));
    scene.add(g);
    const dir = V(Math.sin(deg(d)), 0, Math.cos(deg(d)));
    scene.add(
      line([dir.clone().multiplyScalar(0.95), dir.clone().multiplyScalar(R - 1)], kit.soft)
    );
    const emblem = hidden(new THREE.Group());
    g.add(emblem);
    return emblem;
  };

  // Copenhagen: a box over the two states, its lid shut on the question.
  const cop = station(angles.cop);
  const boxMat = kit.surface(0.3);
  cop.add(block(kit, 1.1, 0.08, 0.9, boxMat));
  for (const z of [-0.42, 0.42]) {
    const w = block(kit, 1.1, 0.45, 0.06, boxMat);
    w.position.set(0, 0.08 + P, z);
    cop.add(w);
  }
  for (const x of [-0.52, 0.52]) {
    const w = block(kit, 0.06, 0.45, 0.78, boxMat);
    w.position.set(x, 0.08 + P, 0);
    cop.add(w);
  }
  cop.children[0].position.y = P;
  for (const x of [-0.22, 0.22]) {
    const g = ghost(kit, 0.15, kit.ink);
    g.position.set(x, P + 0.3, 0);
    cop.add(g);
  }
  const lid = new THREE.Group();
  lid.position.set(0, P + 0.53, -0.46);
  const lidGeo = new THREE.BoxGeometry(1.16, 0.06, 0.96);
  lidGeo.translate(0, 0.03, 0.48);
  lid.add(new THREE.Mesh(lidGeo, kit.surface(0.6)));
  lid.rotation.x = -1.9;
  cop.add(lid);

  // Objective collapse: a large object, two states becoming one on their own.
  const obj = station(angles.obj);
  const objGhosts = [-0.42, 0.42].map((x) => {
    const g = ghost(kit, 0.36, kit.ink);
    g.position.set(x, P + 0.36, 0);
    obj.add(g);
    return g;
  });
  const objBall = hidden(ball(kit, 0.36, 0.15));
  objBall.position.copy(objGhosts[0].position);
  obj.add(objBall);

  // Consciousness collapse: a small system, and an aperture whose look leaves one result.
  const con = station(angles.con);
  const conGhosts = [-0.6, -0.1].map((x) => {
    const g = ghost(kit, 0.2, kit.ink);
    g.position.set(x, P + 0.2, 0.15);
    con.add(g);
    return g;
  });
  const conBall = hidden(ball(kit, 0.2, 0.15));
  conBall.position.copy(conGhosts[1].position);
  con.add(conBall);
  const eyePost = rod(V(0.55, P, -0.1), V(0.55, P + 0.62, -0.1), 0.03, kit.surface(0.2));
  con.add(eyePost);
  const eye = makeIris(kit, 0.14);
  eye.group.position.set(0.55, P + 0.8, -0.1);
  eye.group.rotation.y = -0.25;
  eye.setOpen(0);
  con.add(eye.group);

  // The fork, built three ways.
  const F = fork();
  const tree = (m: (tips: number[]) => THREE.Material, r = 0.045) => {
    const g = new THREE.Group();
    for (const [a, b, tips] of F.segs) g.add(rod(a, b, r, m(tips)));
    for (const j of F.joints) {
      const k = ball(kit, r * 1.15, m([0, 1, 2, 3]));
      k.position.copy(j);
      g.add(k);
    }
    return g;
  };

  // Many-Worlds: every branch, every result.
  const mwi = station(angles.mwi);
  const mwiMat = kit.surface(0.1);
  mwi.add(tree(() => mwiMat));
  for (const p of F.tips) {
    const b = ball(kit, 0.11, mwiMat);
    b.position.copy(p);
    mwi.add(b);
  }

  // Bohmian mechanics: the guiding wave forks as before, but one particle rides it.
  const bohm = station(angles.bohm);
  for (const [a, b] of F.segs) {
    const dir = b.clone().sub(a);
    const side = V(-dir.y, dir.x, 0).normalize();
    for (const off of [-0.05, 0.05]) {
      const pts = Array.from({ length: 25 }, (_, i) => {
        const f = i / 24;
        return a
          .clone()
          .lerp(b, f)
          .addScaledVector(side, off + 0.035 * Math.sin(f * Math.PI * 4));
      });
      bohm.add(line(pts, kit.soft));
    }
  }
  const ridePath = new THREE.CatmullRomCurve3(
    [F.segs[0][0], F.segs[0][1], F.segs[1][1], F.segs[4][1]],
    false,
    "catmullrom",
    0.1
  );
  const rider = ball(kit, 0.1, 0.15);
  bohm.add(rider);

  // Holos: the same branches; the ones that hold an aperture are lived.
  const holos = station(angles.holos);
  const livedTips = [0, 2];
  const livedMat = kit.surface(0.1);
  const unlivedMat = kit.surface(0.1);
  const isLived = (tips: number[]) => tips.some((t) => livedTips.includes(t));
  holos.add(tree((tips) => (isLived(tips) ? livedMat : unlivedMat)));
  F.tips.forEach((p, i) => {
    const b = ball(kit, 0.11, isLived([i]) ? livedMat : unlivedMat);
    b.position.copy(p);
    holos.add(b);
  });
  const irises = livedTips.map((i) => {
    const iris = makeIris(kit, 0.06);
    iris.group.position.copy(F.tips[i]).add(V(0, 0.2, 0.05));
    iris.setOpen(0);
    iris.group.visible = false;
    holos.add(iris.group);
    return iris;
  });

  const emblems = { cop, obj, con, bohm, mwi, holos };
  const top = (d: number, y: number) => world(d, V(0, y, 0));
  const s = narrow ? 0.6 : 1;
  const labels: Label3D[] = [
    { id: "pair", text: "TWO STATES AT ONCE", at: V(0.36, 1.45, 0), dx: 110 * s, dy: -50 },
    { id: "problem", text: "THE MEASUREMENT PROBLEM", at: V(0, 0.9, 0.75), dx: 0, dy: 60 },
    { id: "cop", text: "COPENHAGEN", at: top(angles.cop, 0.9), dx: -110 * s, dy: -40 },
    { id: "obj", text: "OBJECTIVE COLLAPSE", at: top(angles.obj, 1.0), dx: 0, dy: -60 },
    { id: "con", text: "CONSCIOUSNESS COLLAPSE", at: top(angles.con, 1.1), dx: 0, dy: -60 },
    { id: "one", text: "ONE RESULT", at: world(angles.obj, V(-0.42, 0.62, 0)), dx: -20, dy: 80 },
    { id: "bohm", text: "BOHMIAN MECHANICS", at: top(angles.bohm, 1.8), dx: 0, dy: -50 },
    { id: "mwi", text: "MANY-WORLDS", at: top(angles.mwi, 1.8), dx: 0, dy: -50 },
    { id: "holos", text: "HOLOS", at: top(angles.holos, 1.95), dx: 0, dy: -50 },
    {
      id: "lived",
      text: "LIVED",
      at: world(angles.holos, F.tips[2].clone().add(V(0, 0.2, 0))),
      dx: 70 * s,
      dy: -30,
    },
  ];

  // Look in at one or two stations from outside the ring, so the center stands behind.
  const pairView = (a: number, b: number, dist: number) => {
    const m = deg((a + b) / 2);
    const out = V(Math.sin(m), 0, Math.cos(m));
    const near = Math.abs(a - b) > 0 ? R * Math.cos(deg(Math.abs(a - b) / 2)) : R;
    return {
      t: out
        .clone()
        .multiplyScalar(near)
        .add(V(0, 0.8, 0)),
      o: out.multiplyScalar(dist).add(V(0, dist * 0.42, 0)),
    };
  };
  const k = narrow ? 1.08 : 1;
  const wide = { t: V(0, 0, 0.4), o: V(0, 9.5, 12.5).multiplyScalar(narrow ? 1.12 : 1) };
  const v1 = pairView(angles.cop, angles.cop, 6 * k);
  const v3 = pairView(angles.obj, angles.con, 8.4 * k);
  const v4 = pairView(angles.bohm, angles.mwi, 8.4 * k);
  const v5 = pairView(angles.holos, angles.mwi, 8.4 * k);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      pair.rotation.y = time * 0.5;
      eye.setOpen(st.eye);
      irises.forEach((iris, i) => {
        iris.setOpen(st.holos[i]);
      });
      rider.visible = st.bohm > 0.5;
      ridePath.getPoint((time * 0.22) % 1, rider.position);
    },
    stops: [
      // 1 · Two states at once at the center, and the ring of answers waiting.
      (tl, t, c) => {
        tl.addLabel("problem", t);
        tl.fromTo(kit.clip, { constant: -0.3 }, { constant: 2.6, duration: 2, ease: "none" }, t);
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        frame(
          tl,
          c,
          { t: V(0, 1, 0), o: V(2.5, 0.6, 4.4) },
          { t: V(0, 1.1, 0), o: V(0, 1.4, narrow ? 5.6 : 4.8) },
          t,
          2.6
        );
        lab(tl, c, { pair: 1 }, t + 2.2);
        cam(tl, c, wide.t, wide.o, t + 4, 2.8, EASE);
        lab(tl, c, { pair: 0 }, t + 4);
        lab(tl, c, { problem: 1 }, t + 5.8);
      },
      // 2 · Copenhagen: the lid comes down on the question.
      (tl, t, c) => {
        tl.addLabel("copenhagen", t);
        lab(tl, c, { pair: 0, problem: 0 }, t);
        cam(tl, c, v1.t, v1.o, t, 2.4, EASE);
        grow(tl, cop, t + 1);
        tl.fromTo(lid.rotation, { x: -1.9 }, { x: 0, duration: 1.2, ease: "bounce.out" }, t + 2.4);
        lab(tl, c, { cop: 1 }, t + 2.6);
      },
      // 3 · Collapse: size alone, or a conscious look, leaves one result.
      (tl, t, c) => {
        tl.addLabel("collapse", t);
        lab(tl, c, { cop: 0 }, t);
        cam(tl, c, v3.t, v3.o, t, 2.6, EASE);
        grow(tl, obj, t + 1);
        grow(tl, con, t + 1.2);
        lab(tl, c, { obj: 1, con: 1 }, t + 2);
        // The large one collapses on its own.
        grow(tl, objBall, t + 2.8, 0.7, "all", "power2.out");
        tl.fromTo(
          objGhosts[1].scale,
          { x: 1, y: 1, z: 1 },
          { x: 0.001, y: 0.001, z: 0.001, duration: 0.7 },
          t + 2.8
        );
        lab(tl, c, { one: 1 }, t + 3.4);
        // The small one waits for the aperture.
        tl.fromTo(st, { eye: 0 }, { eye: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 3.8);
        grow(tl, conBall, t + 4.6, 0.7, "all", "power2.out");
        tl.fromTo(
          conGhosts[0].scale,
          { x: 1, y: 1, z: 1 },
          { x: 0.001, y: 0.001, z: 0.001, duration: 0.7 },
          t + 4.6
        );
      },
      // 4 · No collapse: every branch kept, or one particle guided along a forking wave.
      (tl, t, c) => {
        tl.addLabel("branches", t);
        lab(tl, c, { obj: 0, con: 0, one: 0 }, t);
        cam(tl, c, v4.t, v4.o, t, 2.8, EASE);
        grow(tl, mwi, t + 1.2, 1.2);
        lab(tl, c, { mwi: 1 }, t + 2.2);
        grow(tl, bohm, t + 2.4, 1.2);
        tl.fromTo(st, { bohm: 0 }, { bohm: 1, duration: 0.1 }, t + 3.4);
        lab(tl, c, { bohm: 1 }, t + 3.6);
      },
      // 5 · Holos: the same branches, and which of them are lived.
      (tl, t, c) => {
        tl.addLabel("holos", t);
        lab(tl, c, { bohm: 0 }, t);
        cam(tl, c, v5.t, v5.o, t, 2.6, EASE);
        grow(tl, holos, t + 1, 1.2);
        lab(tl, c, { holos: 1 }, t + 2);
        irises.forEach((iris, i) => {
          tl.set(iris.group, { visible: true }, t + 2.6 + i * 0.4);
          tl.to(st.holos, { [i]: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 2.6 + i * 0.4);
        });
        tone(tl, livedMat, -0.85, t + 3.4, 1.4);
        tone(tl, unlivedMat, 0.9, t + 3.4, 1.4);
        lab(tl, c, { lived: 1 }, t + 4.2);
        if (narrow) lab(tl, c, { mwi: 0, lived: 0 }, t + 6.4);
        else lab(tl, c, { lived: 0 }, t + 6.4);
        cam(tl, c, wide.t, wide.o, t + 6.4, 3.2, EASE);
        // Pulling back, every answer turns to face the reader.
        for (const [key, e] of Object.entries(emblems)) {
          tl.to(
            e.rotation,
            { y: -deg(angles[key as keyof typeof angles]), duration: 2.6, ease: EASE },
            t + 6.8
          );
        }
        if (!narrow) lab(tl, c, { cop: 1, obj: 1, con: 1, bohm: 1 }, t + 8.6);
      },
    ],
  };
}
