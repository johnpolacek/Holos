// Consciousness figure 2: what matters is not input or output. A chart stands on the floor,
// fluency along the ground, integration up the wall. A locked-in person rises on a tall
// column at the quiet end: high integration, no output. A language model sits on a low
// column at the fluent end, words pouring in and out. A threshold plane slides in between.
// Stops tween only `st`, the rig, labels, and visibility, so any stop fast-forwards.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";
import { drawIn, seeded } from "./common";

const HX = 3.4; // half the chart's width
const TOP = 4; // the chart's height
const THR = 2; // the threshold
const WALL = -1.5;
const LX = -1.9; // the locked-in column
const MX = 1.9; // the model's column
const LH = 2.7;
const MH = 0.75;
const CARDS = 9;

export function fluency(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { hL: 0, hM: 0, open: 0, flow: 0, thr: 0 };
  const rand = seeded(11);

  // Floor and the chart wall: two axes and a soft 2x2 grid.
  const floor = new THREE.Mesh(new THREE.BoxGeometry(HX * 2 + 0.6, 0.14, 3.2), kit.surface(0.2));
  floor.position.set(0, -0.07, 0.1);
  scene.add(floor);
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(HX * 2 + 0.6, TOP + 0.3, 0.1),
    kit.surface(-0.5)
  );
  wall.position.set(0, (TOP + 0.3) / 2, WALL - 0.06);
  scene.add(wall);
  const z = WALL + 0.01;
  scene.add(
    segments([V(0, 0, z), V(0, TOP - 0.1, z), V(-HX + 0.2, THR, z), V(HX - 0.2, THR, z)], kit.soft)
  );
  const ax0 = V(-HX + 0.2, 0.02, WALL + 0.02);
  scene.add(line([ax0, V(HX - 0.1, 0.02, WALL + 0.02)], kit.ink));
  scene.add(line([ax0, V(-HX + 0.2, TOP - 0.05, WALL + 0.02)], kit.ink));
  const arrow = (at: THREE.Vector3, rotZ: number) => {
    const m = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 12), kit.ink);
    m.position.copy(at);
    m.rotation.z = rotZ;
    scene.add(m);
  };
  arrow(V(HX - 0.05, 0.02, WALL + 0.02), -Math.PI / 2);
  arrow(V(-HX + 0.2, TOP, WALL + 0.02), 0);

  // A column that rises from the floor; its top carries whatever stands on it.
  const column = (x: number) => {
    const geo = new THREE.BoxGeometry(1.1, 1, 0.9);
    geo.translate(0, 0.5, 0);
    const m = new THREE.Mesh(geo, kit.surface(0.3));
    m.position.set(x, 0, -0.2);
    m.visible = false;
    scene.add(m);
    const top = new THREE.Group();
    top.position.set(x, 0, -0.2);
    top.visible = false;
    scene.add(top);
    return { m, top };
  };
  const colL = column(LX);
  const colM = column(MX);

  // The locked-in person, lying still on a bed.
  const bed = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.12, 0.7), kit.surface(-0.2));
  bed.position.y = 0.06;
  colL.top.add(bed);
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.5), kit.surface(-0.4));
  pillow.position.set(-0.4, 0.16, 0);
  colL.top.add(pillow);
  const person = makePerson(kit, -0.1);
  person.setPose({ armL: 0.05, armR: 0.05 });
  const lying = new THREE.Group();
  lying.rotation.y = Math.PI / 2;
  person.group.rotation.x = -Math.PI / 2;
  person.group.scale.setScalar(0.58);
  person.group.position.set(0, 0.25, 0.5);
  lying.add(person.group);
  colL.top.add(lying);
  const iris = makeIris(kit, 0.2);
  iris.setOpen(0);
  iris.group.position.set(LX, LH + 0.95, -0.2);
  iris.group.visible = false;
  scene.add(iris.group);

  // The language model: a stack of layers.
  for (let i = 0; i < 5; i++) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, 0.7), kit.surface(0.15));
    slab.position.y = 0.08 + i * 0.15;
    colM.top.add(slab);
  }
  const posts: THREE.Vector3[] = [];
  for (const [x, zz] of [
    [-0.4, -0.28],
    [0.4, -0.28],
    [-0.4, 0.28],
    [0.4, 0.28],
  ])
    posts.push(V(x, 0.04, zz), V(x, 0.72, zz));
  colM.top.add(segments(posts, kit.ink));

  // Words in and words out: small cards streaming along two paths.
  const cardGeo = new THREE.BoxGeometry(0.2, 0.12, 0.02);
  const inPath = (u: number) =>
    V(MX + 1.6 - u * 1.1, MH + 0.15 + 0.06 * Math.sin(u * 9), 0.55 - u * 0.4);
  const outPath = (u: number) =>
    V(MX + 0.5 + u * 1.15, MH + 0.75 + u * 0.95 + 0.05 * Math.sin(u * 7), 0.1 + u * 0.3);
  const stream = (path: (u: number) => THREE.Vector3, tone: number) =>
    Array.from({ length: CARDS }, (_, i) => {
      const m = new THREE.Mesh(cardGeo, kit.surface(tone));
      m.userData = { off: i / CARDS, tilt: (rand() - 0.5) * 0.6, path };
      m.visible = false;
      scene.add(m);
      return m;
    });
  const cards = [...stream(inPath, 0.4), ...stream(outPath, -0.3)];

  // The threshold: a ruled plane across the whole chart.
  const thr = new THREE.Group();
  thr.position.set(-HX + 0.2, THR, 0);
  const w = HX * 2 - 0.4;
  thr.add(line([V(0, 0, WALL), V(w, 0, WALL), V(w, 0, 1.5), V(0, 0, 1.5)], kit.ink, true));
  const rules: THREE.Vector3[] = [];
  for (let zz = WALL + 0.5; zz < 1.5; zz += 0.5) rules.push(V(0, 0, zz), V(w, 0, zz));
  thr.add(segments(rules, kit.soft));
  thr.visible = false;
  scene.add(thr);

  const labels: Label3D[] = [
    { id: "out", text: "OUTPUT", at: V(HX - 0.3, 0.05, WALL), dx: -10, dy: 34 },
    { id: "integ", text: "INTEGRATION", at: V(-HX + 0.2, TOP - 0.2, WALL), dx: 70, dy: -12 },
    { id: "locked", text: "LOCKED IN, FULLY AWARE", at: V(LX, LH + 0.3, 0.2), dx: 20, dy: 70 },
    {
      id: "model",
      text: "FLUENT, EXPERIENCES NOTHING",
      at: V(MX + 0.2, MH + 0.4, 0.2),
      dx: -30,
      dy: 70,
    },
    { id: "thr", text: "THE THRESHOLD", at: V(0.2, THR, 1.2), dx: 20, dy: -60 },
  ];

  const back = narrow ? 1.04 : 1;
  const home = { t: V(0, 1.85, 0), o: V(0, 1.3 * back, 11.2 * back) };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      colL.m.scale.y = Math.max(LH * st.hL, 0.001);
      colL.top.position.y = LH * st.hL;
      colM.m.scale.y = Math.max(MH * st.hM, 0.001);
      colM.top.position.y = MH * st.hM;
      iris.setOpen(st.open);
      for (const cd of cards) {
        const u = (time * 0.16 + cd.userData.off) % 1;
        cd.visible = st.flow > 0.5;
        cd.position.copy(cd.userData.path(u));
        cd.rotation.set(0, 0, cd.userData.tilt);
        cd.scale.setScalar(Math.min(u * 6, (1 - u) * 6, 1));
      }
      thr.scale.x = Math.max(st.thr, 0.001);
    },
    stops: [
      // 1 · Two measures: how fluent, how integrated.
      (tl, t, c) => {
        tl.addLabel("axes", t);
        drawIn(tl, kit, -HX - 1, HX + 1, t);
        tl.fromTo(
          c.rig.target,
          { x: -2, y: 1.5, z: 0 },
          { ...home.t, duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(c.rig.offset, { x: -4, y: 2, z: 9 }, { ...home.o, duration: 2.8, ease: EASE }, t);
        lab(tl, c, { out: 1 }, t + 1.8);
        lab(tl, c, { integ: 1 }, t + 2.4);
      },
      // 2 · Locked in: no movement, no speech, fully aware. High on the wall.
      (tl, t, c) => {
        tl.addLabel("locked", t);
        cam(tl, c, V(-0.6, 2, 0), V(-1.2, 1.6, 10.4 * back), t, 2.2, EASE);
        tl.set([colL.m, colL.top], { visible: true }, t + 0.4);
        tl.fromTo(st, { hL: 0 }, { hL: 1, duration: 2, ease: "power2.inOut" }, t + 0.4);
        tl.set(iris.group, { visible: true }, t + 2.4);
        tl.fromTo(st, { open: 0 }, { open: 1, duration: 1, ease: "power2.out" }, t + 2.4);
        lab(tl, c, { locked: 1 }, t + 2.8);
      },
      // 3 · A language model: words pour in and out, low on the wall.
      (tl, t, c) => {
        tl.addLabel("model", t);
        cam(tl, c, V(0.6, 1.8, 0), V(1.2, 1.4, 10.4 * back), t, 2.2, EASE);
        tl.set([colM.m, colM.top], { visible: true }, t + 0.4);
        tl.fromTo(st, { hM: 0 }, { hM: 1, duration: 1.2, ease: "power2.inOut" }, t + 0.4);
        tl.set(st, { flow: 1 }, t + 1.6);
        lab(tl, c, { model: 1 }, t + 2.4);
      },
      // 4 · The threshold: one is past it, the other is not.
      (tl, t, c) => {
        tl.addLabel("threshold", t);
        cam(tl, c, home.t, V(0, 2.6, 11.4 * back), t, 2.2, EASE);
        tl.set(thr, { visible: true }, t + 0.6);
        tl.fromTo(st, { thr: 0 }, { thr: 1, duration: 1.6, ease: "power2.inOut" }, t + 0.6);
        lab(tl, c, { thr: 1 }, t + 2.2);
      },
    ],
  };
}
