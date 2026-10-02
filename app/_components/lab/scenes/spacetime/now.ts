// Spacetime figure 2: no universal now, and the block. Time runs along the loaf, left to
// right, out of the Big Bang. Two flashes, A and B, go off at the same time for one
// observer: his now is a flat slice through both. A second observer passes him at that
// moment, moving. Her now is tilted, so A has already happened for her and B has not.
// Every tilt is someone's now, so no slice is the true one, and the whole loaf is the
// block. Stops tween only plain state, so they fast-forward.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, segments, show, V } from "../../tourScenes3d";
import { growTube, makeFlash, rod, tube } from "./util";

const L = 15; // the loaf runs from the Big Bang at x = 0 to x = L
const HY = 2.2;
const HZ = 2.2;
const NOW = 7.5; // his now
const YA = 1.5; // the histories that flash at A and B
const SPEED = 0.45; // her speed, as a slope; her now tilts by the same slope
const FAN = [-0.75, -0.25, 0.25, 0.75];

// A slice through (x0, 0, 0) tilted by slope v: every point with x = x0 + v·y.
function slicePts(x0: number, v: number) {
  return [
    V(x0 - v * HY, -HY, -HZ),
    V(x0 + v * HY, HY, -HZ),
    V(x0 + v * HY, HY, HZ),
    V(x0 - v * HY, -HY, HZ),
  ];
}

export function noNow(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { his: 0, hers: 0 };

  // Histories: A's and B's inked, a few other galaxies soft. All start at the Big Bang.
  const wobble = (y0: number, z0: number, ph: number) =>
    Array.from({ length: 31 }, (_, i) => {
      const x = (L * i) / 30;
      return V(x, y0 + 0.12 * Math.sin(x * 0.5 + ph), z0 + 0.1 * Math.cos(x * 0.4 + ph));
    });
  const flat = (y0: number) => Array.from({ length: 31 }, (_, i) => V((L * i) / 30, y0, 0));
  scene.add(tube(flat(YA), 0.075, kit.surface(0)));
  scene.add(tube(flat(-YA), 0.075, kit.surface(0)));
  for (const [y, z, ph] of [
    [0.9, -1.6, 0.3],
    [-0.6, -1.3, 1.8],
    [1.7, 1.5, 2.6],
    [-1.6, 1.4, 4.1],
    [0.2, 1.9, 5.2],
    [-1.9, -1.9, 0.9],
  ]) {
    scene.add(line(wobble(y, z, ph), kit.soft));
  }

  // The two flashes, at his now.
  const flashA = makeFlash(kit, 0.36);
  flashA.position.set(NOW, YA, 0);
  const flashB = makeFlash(kit, 0.36);
  flashB.position.set(NOW, -YA, 0);
  flashA.visible = false;
  flashB.visible = false;
  scene.add(flashA, flashB);

  // The two observers, who pass each other at his now.
  const him = tube([V(3, 0, 0), V(NOW, 0, 0), V(12, 0, 0)], 0.06, kit.ink, 10);
  const her = tube(
    [V(3, SPEED * (3 - NOW), 0), V(NOW, 0, 0), V(12, SPEED * (12 - NOW), 0)],
    0.06,
    kit.ink,
    10
  );
  growTube(him, 1);
  growTube(her, 0);
  scene.add(him, her);
  const meet = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), kit.surface());
  meet.position.set(NOW, 0, 0);
  scene.add(meet);

  // Their nows: flat slices across space, inked.
  const sliceOf = (x0: number, v: number) => {
    const g = new THREE.Group();
    const pts = slicePts(x0, v);
    for (let i = 0; i < 4; i++) g.add(rod(pts[i], pts[(i + 1) % 4], 0.03, kit.ink));
    const rulings: THREE.Vector3[] = [];
    for (let s = -HZ + 0.4; s < HZ - 0.01; s += 0.4) {
      rulings.push(V(x0 - v * HY, -HY, s), V(x0 + v * HY, HY, s));
    }
    for (let y = -HY + 0.4; y < HY - 0.01; y += 0.4) {
      rulings.push(V(x0 + v * y, y, -HZ), V(x0 + v * y, y, HZ));
    }
    g.add(segments(rulings, kit.soft));
    return g;
  };
  const hisNow = sliceOf(NOW, 0);
  const herNow = sliceOf(NOW, SPEED);
  hisNow.visible = false;
  herNow.visible = false;
  scene.add(hisNow, herNow);
  // Where her now crosses A's and B's histories.
  const mark = (x: number, y: number) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 6, 32), kit.ink);
    m.position.set(x, y, 0);
    m.visible = false;
    scene.add(m);
    return m;
  };
  const markA = mark(NOW + SPEED * YA, YA);
  const markB = mark(NOW - SPEED * YA, -YA);

  // Every other tilt, all through the same meeting point.
  const fan = new THREE.Group();
  for (const v of FAN) {
    const g = new THREE.Group();
    g.add(line(slicePts(NOW, v), kit.soft, true));
    fan.add(g);
  }
  fan.visible = false;
  scene.add(fan);

  // The whole block: a frame, the Big Bang plate at its edge, and slices all along it.
  const block = new THREE.Group();
  const end = (x: number) => [V(x, -HY, -HZ), V(x, HY, -HZ), V(x, HY, HZ), V(x, -HY, HZ)];
  block.add(line(end(L), kit.ink, true));
  block.add(
    segments(
      end(0).flatMap((p) => [p, V(L, p.y, p.z)]),
      kit.ink
    )
  );
  const loafSlices: THREE.Vector3[] = [];
  for (const [x, v] of [
    [2.2, 0],
    [3.8, -0.4],
    [5.2, 0.3],
    [10, -0.3],
    [11.6, 0.45],
    [13.2, 0],
  ]) {
    const p = slicePts(x, v);
    loafSlices.push(p[0], p[1], p[1], p[2], p[2], p[3], p[3], p[0]);
  }
  block.add(segments(loafSlices, kit.soft));
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.16, HY * 2, HZ * 2), kit.surface(0.62));
  plate.position.x = -0.08;
  block.add(plate);
  const axisY = -HY - 0.5;
  block.add(line([V(0.5, axisY, HZ), V(L - 0.2, axisY, HZ)], kit.ink));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 12), kit.ink);
  head.rotation.z = -Math.PI / 2;
  head.position.set(L - 0.1, axisY, HZ);
  block.add(head);
  block.visible = false;
  scene.add(block);

  const labels: Label3D[] = [
    { id: "a", text: "FLASH A", at: V(NOW, YA + 0.25, 0), dx: -30, dy: -50 },
    { id: "b", text: "FLASH B", at: V(NOW, -YA - 0.25, 0), dx: -30, dy: 50 },
    { id: "him", text: "ONE OBSERVER", at: V(4.2, 0, 0), dx: -40, dy: -55 },
    { id: "his", text: "HIS NOW", at: V(NOW, HY, -HZ), dx: 0, dy: -30 },
    { id: "her", text: "ANOTHER, MOVING", at: V(4, SPEED * (4 - NOW), 0), dx: -30, dy: 60 },
    { id: "hers", text: "HER NOW", at: V(NOW + SPEED * HY, HY, HZ), dx: 60, dy: -30 },
    { id: "done", text: "A, ALREADY", at: V(NOW + SPEED * YA, YA, 0), dx: 90, dy: -20 },
    { id: "yet", text: "B, NOT YET", at: V(NOW - SPEED * YA, -YA, 0), dx: -80, dy: 40 },
    { id: "none", text: "NO UNIVERSAL NOW", at: V(NOW + 0.75 * HY, HY, 0), dx: 70, dy: -40 },
    { id: "bang", text: "THE BIG BANG", at: V(0, -HY, HZ), dx: -20, dy: 45 },
    { id: "time", text: "TIME", at: V(L - 1.2, axisY, HZ), dx: 0, dy: 34 },
    { id: "block", text: "THE BLOCK", at: V(L - 2.5, HY, -HZ), dx: 40, dy: -40 },
  ];
  if (narrow) {
    for (const l of labels) {
      if (l.id === "him") l.dx = 10;
      if (l.id === "her") l.dx = 10;
      if (l.id === "done") l.dx = 50;
    }
  }

  const k = narrow ? 1.05 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const mid = V(NOW, 0, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      growTube(her, st.hers);
    },
    stops: [
      // 1 · One observer: two flashes at the same time, his now a flat slice through both.
      (tl: gsap.core.Timeline, t, c) => {
        tl.addLabel("same", t);
        tl.fromTo(
          kit.clip,
          { constant: 2 },
          { constant: 40, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.fromTo(c.rig.target, { x: 4, y: 0, z: 0 }, { ...mid, duration: 3.2, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...view(-6, 2, 10) },
          { ...view(3, 4.6, 11.5), duration: 3.2, ease: EASE },
          t
        );
        show(tl, flashA, t + 1.6, 0.7);
        show(tl, flashB, t + 1.6, 0.7);
        lab(tl, c, { a: 1, b: 1 }, t + 1.8);
        lab(tl, c, { him: 1 }, t + 2.6);
        tl.set(hisNow, { visible: true }, t + 3.4);
        tl.fromTo(hisNow.scale, { y: 0.01 }, { y: 1, duration: 0.8, ease: "power2.out" }, t + 3.4);
        lab(tl, c, { his: 1 }, t + 4);
      },
      // 2 · Another observer passes, moving. Her now tilts: A has happened, B has not.
      (tl, t, c) => {
        tl.addLabel("tilted", t);
        lab(tl, c, { a: 0, b: 0, him: 0 }, t);
        cam(tl, c, mid, view(1.5, 3.6, 12), t, 2.2, EASE);
        tl.fromTo(st, { hers: 0 }, { hers: 1, duration: 1.6, ease: "none" }, t + 0.6);
        lab(tl, c, { her: 1 }, t + 1.6);
        tl.set(herNow, { visible: true }, t + 2.4);
        tl.fromTo(herNow.scale, { y: 0.01 }, { y: 1, duration: 0.8, ease: "power2.out" }, t + 2.4);
        lab(tl, c, { hers: 1 }, t + 3);
        tl.set([markA, markB], { visible: true }, t + 3.6);
        lab(tl, c, { done: 1, yet: 1 }, t + 3.8);
      },
      // 3 · Every tilt is someone's now. No slice is the true one.
      (tl, t, c) => {
        tl.addLabel("fan", t);
        lab(tl, c, { his: 0, hers: 0, her: 0, done: 0, yet: 0 }, t);
        tl.set([markA, markB], { visible: false }, t + 0.4);
        cam(tl, c, mid, view(6, 4.5, 11), t, 2.4, EASE);
        tl.set(fan, { visible: true }, t + 1.2);
        tl.fromTo(fan.scale, { y: 0.01 }, { y: 1, duration: 1, ease: "power2.out" }, t + 1.2);
        lab(tl, c, { none: 1 }, t + 2.4);
      },
      // 4 · The block: every moment one whole, the Big Bang its edge.
      (tl, t, c) => {
        tl.addLabel("block", t);
        lab(tl, c, { none: 0 }, t);
        tl.set(block, { visible: true }, t + 0.6);
        cam(tl, c, V(L / 2, -0.3, 0), view(5, 6.5, 22), t, 3, EASE);
        lab(tl, c, { bang: 1, time: 1 }, t + 2.4);
        lab(tl, c, { block: 1 }, t + 3.2);
        cam(tl, c, null, view(-4, 5, 22.5), t + 4.4, 5, "sine.inOut");
      },
    ],
  };
}
