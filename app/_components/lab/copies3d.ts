// Figure Ω3: why this one, and which copy. A crowd on a round floor; a ring hops from
// person to person looking for the one that is "me", then every person opens at once.
// Then one person steps into a copier and two step out, and both are lit.
// Stops tween only plain state, so any stop fast-forwards.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "./engrave3d";
import { EASE, makePerson, STAND } from "./figures3d";
import { type Built3D, cam, circlePts, type Label3D, lab, line, makeIris, V } from "./tourScenes3d";

const SPOTS = [
  [-2.6, -1.6],
  [0, -2.1],
  [2.6, -1.5],
  [-3.1, 0.6],
  [-1.1, 0.1],
  [1.2, 0.3],
  [3.2, 0.7],
  [-1.8, 2.3],
  [1.9, 2.4],
] as const;
const CHOSEN = 4;

export function copies(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { hop: 0, crowd: 1, walk: 0, out: 0, open: SPOTS.map(() => 0), openCopies: [0, 0] };

  const floor = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 0.14, 72), kit.surface(0.15));
  floor.position.y = -0.07;
  scene.add(floor);

  // An iris above each head: an aperture where that self is lived.
  const person = (x: number, z: number, turn = 0) => {
    const p = makePerson(kit, 0.05);
    p.setPose({
      ...STAND,
      armL: 0.14 + Math.sin(x * 3.1) * 0.05,
      armR: 0.14 + Math.cos(z * 2.7) * 0.05,
    });
    p.group.position.set(x, 0, z);
    p.group.rotation.y = turn;
    scene.add(p.group);
    const iris = makeIris(kit, 0.09);
    iris.setOpen(0);
    iris.group.position.set(x, 2.05, z + 0.05);
    iris.group.visible = false;
    scene.add(iris.group);
    return { p, iris };
  };
  const crowd = SPOTS.map(([x, z], i) => person(x, z, Math.sin(i * 2.1) * 0.5));

  // The ring that looks for "this one".
  const ring = line(
    circlePts(0.55, 64).map((p) => V(p.x, 0.02, p.y)),
    kit.ink,
    true
  );
  scene.add(ring);
  const hopOrder = [0, 6, 2, 7, 3, 8, CHOSEN];

  // The copier: a booth with an entry and two exits.
  const booth = new THREE.Group();
  booth.position.set(0, 0, -0.4);
  const bmat = kit.surface(0.3);
  for (const [w, h, d, x, y, z] of [
    [1.6, 2.4, 0.1, 0, 1.2, -0.8],
    [0.1, 2.4, 1.6, -0.8, 1.2, 0],
    [0.1, 2.4, 1.6, 0.8, 1.2, 0],
    [1.8, 0.14, 1.8, 0, 2.45, 0],
  ] as const) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bmat);
    m.position.set(x, y, z);
    booth.add(m);
  }
  booth.visible = false;
  scene.add(booth);
  const you = person(0, 3, 0);
  you.p.group.visible = false;
  const copyL = person(-2.2, 1.2, 0.3);
  const copyR = person(2.2, 1.2, -0.3);
  copyL.p.group.visible = false;
  copyR.p.group.visible = false;

  const labels: Label3D[] = [
    { id: "this", text: "WHY THIS ONE?", at: V(0, 2.2, 0), dx: 0, dy: -50 },
    { id: "each", text: "THE ONE EXPERIENCER IS EACH", at: V(3.2, 2.3, 0.7), dx: 40, dy: -60 },
    { id: "copier", text: "A COPIER", at: V(0.8, 2.5, -0.4), dx: 90, dy: -40 },
    { id: "youL", text: "YOU", at: V(-2.2, 2.25, 1.4), dx: -40, dy: -40 },
    { id: "youR", text: "YOU", at: V(2.2, 2.25, 1.4), dx: 40, dy: -40 },
  ];

  const back = narrow ? 1.15 : 1;
  const wide = { t: V(0, 1, 0), o: V(0, 5 * back, 12 * back) };
  const tmp = new THREE.Vector3();

  const openIris = (
    tl: gsap.core.Timeline,
    iris: { group: THREE.Group },
    obj: number[],
    i: number,
    at: number
  ) => {
    tl.set(iris.group, { visible: true }, at);
    tl.to(obj, { [i]: 0.85, duration: 0.8, ease: "back.out(2)" }, at);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      // The ring glides between people along the hop order.
      const f = Math.min(st.hop, hopOrder.length - 1);
      const a = SPOTS[hopOrder[Math.floor(f)]];
      const b = SPOTS[hopOrder[Math.min(Math.ceil(f), hopOrder.length - 1)]];
      const u = f - Math.floor(f);
      ring.position.set(a[0] + (b[0] - a[0]) * u, 0, a[1] + (b[1] - a[1]) * u);
      ring.visible = st.crowd > 0.5;
      crowd.forEach((c, i) => {
        c.p.group.visible = st.crowd > 0.5;
        c.iris.group.visible = st.crowd > 0.5 && st.open[i] > 0;
        c.iris.setOpen(st.open[i]);
      });
      // You walk into the booth; the copies step out of it to either side.
      you.p.group.visible = st.crowd <= 0.5 && st.out < 0.5;
      you.p.group.position.z = 3 - st.walk * 3.2;
      tmp.set(0, 0, -0.2);
      for (const [cp, side, i] of [
        [copyL, -1, 0],
        [copyR, 1, 1],
      ] as const) {
        cp.p.group.visible = st.out > 0.5;
        cp.p.group.position.set(tmp.x + side * 2.2 * st.out, 0, -0.2 + 1.6 * st.out);
        cp.iris.group.position.set(cp.p.group.position.x, 2.05, cp.p.group.position.z + 0.05);
        cp.iris.group.visible = st.out > 0.5 && st.openCopies[i] > 0;
        cp.iris.setOpen(st.openCopies[i]);
      }
    },
    stops: [
      // 1 · Of billions of people, why is this one me? The ring looks for an answer.
      (tl, t, c) => {
        tl.addLabel("crowd", t);
        tl.fromTo(
          kit.clip,
          { constant: -0.2 },
          { constant: 2.6, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0.5, z: 0 },
          { ...wide.t, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 6, y: 1.5, z: 8 },
          { ...wide.o, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          st,
          { hop: 0 },
          { hop: hopOrder.length - 1, duration: 3.4, ease: "power1.inOut" },
          t + 1.6
        );
        lab(tl, c, { this: 1 }, t + 4.4);
      },
      // 2 · Nothing chose this one. The one experiencer is each of them.
      (tl, t, c) => {
        tl.addLabel("each", t);
        lab(tl, c, { this: 0 }, t);
        cam(tl, c, wide.t, V(-3 * back, 3.5 * back, 11 * back), t, 2.2, EASE);
        crowd.forEach((p, i) => {
          openIris(tl, p.iris, st.open, i, t + 1 + i * 0.12);
        });
        lab(tl, c, { each: 1 }, t + 2.6);
      },
      // 3 · A machine makes perfect copies. You step in.
      (tl, t, c) => {
        tl.addLabel("copier", t);
        lab(tl, c, { each: 0 }, t);
        tl.set(st, { crowd: 0 }, t + 0.5);
        tl.set(booth, { visible: true }, t + 0.5);
        tl.fromTo(
          booth.scale,
          { x: 0.01, y: 0.01, z: 0.01 },
          { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.4)" },
          t + 0.5
        );
        cam(tl, c, V(0, 1.1, 0.4), V(3 * back, 2.6 * back, 9.5 * back), t, 2, EASE);
        tl.to(st, { walk: 1, duration: 2.2, ease: "power1.inOut" }, t + 1.6);
        lab(tl, c, { copier: 1 }, t + 1.6);
      },
      // 4 · Two step out. Which is you? Both.
      (tl, t, c) => {
        tl.addLabel("both", t);
        lab(tl, c, { copier: 0 }, t);
        cam(tl, c, V(0, 1.1, 0.4), V(0, 2.4 * back, 10 * back), t, 1.8, EASE);
        tl.to(st, { out: 1, duration: 1.8, ease: "power2.out" }, t + 0.6);
        openIris(tl, copyL.iris, st.openCopies, 0, t + 2.4);
        openIris(tl, copyR.iris, st.openCopies, 1, t + 2.6);
        lab(tl, c, { youL: 1, youR: 1 }, t + 3);
      },
    ],
  };
}
