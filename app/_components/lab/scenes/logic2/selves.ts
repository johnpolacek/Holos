// Logic figure: views of the self. Three lives drawn as rods along time, side by side.
// Closed individualism: each rod is one self, marked from birth to death. Empty
// individualism: each rod parts into separate moments, a new self each. Open
// individualism: the moments rejoin and one thread runs through every life. Holos: a
// person stands on each rod, each a self between its own birth and death, and the one thread is the
// experiencer. Stops tween only plain state.

import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, show, V } from "../../tourScenes3d";
import { setup, tube, xyz } from "./decoherence-util";

const L = 9; // length of a life
const N = 9; // moments per life
const RAD = 0.26;
const GAP = 0.24; // extra space between moments when cut apart
const LIVES = [-2.6, 0, 2.6]; // z of each life, back to front
const TH = V(0, 0.2, 0.2); // the thread rides along each rod's upper front edge

export function selves(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { cut: 0, thread: 0 };

  // Each life: a rod of moments, end discs at birth and death, and a span marked below it.
  const rodMat = kit.surface(0.1);
  const discMat = kit.surface(0.35);
  const segLen = L / N;
  const lives = LIVES.map((z) => {
    const moments = Array.from({ length: N }, (_, i) => {
      const g = new THREE.CylinderGeometry(RAD, RAD, segLen, 28, 1);
      g.rotateZ(Math.PI / 2);
      const m = new THREE.Mesh(g, rodMat);
      m.position.set(-L / 2 + segLen * (i + 0.5), 0, z);
      scene.add(m);
      return m;
    });
    const ends = [-1, 1].map((s) => {
      const g = new THREE.CylinderGeometry(RAD * 1.6, RAD * 1.6, 0.08, 32, 1);
      g.rotateZ(Math.PI / 2);
      const d = new THREE.Mesh(g, discMat);
      d.position.set((s * L) / 2 + s * 0.04, 0, z);
      scene.add(d);
      return d;
    });
    // A dimension line on the ground in front of the rod: one span, birth to death.
    const y = -0.55;
    const zz = z + 0.75;
    const span = segments(
      [
        V(-L / 2, y, zz),
        V(L / 2, y, zz),
        V(-L / 2, y - 0.18, zz),
        V(-L / 2, y + 0.18, zz),
        V(L / 2, y - 0.18, zz),
        V(L / 2, y + 0.18, zz),
      ],
      kit.ink
    );
    scene.add(span);
    return { z, moments, ends, span };
  });

  // One thread through every life: along the back life, over to the middle one, back
  // along it, over to the front one, and along it.
  const [za, zb, zc] = LIVES;
  const e = L / 2;
  const ty = TH.y;
  const tz = TH.z;
  const bend = (x: number, z0: number, z1: number) => {
    const s = Math.sign(x);
    return [
      V(x, ty, z0 + tz),
      V(x + s * 0.55, ty + 0.15, z0 + tz + 0.35),
      V(x + s * 0.9, ty + 0.25, (z0 + z1) / 2 + tz),
      V(x + s * 0.55, ty + 0.15, z1 + tz - 0.35),
      V(x, ty, z1 + tz),
    ];
  };
  const run = (x0: number, x1: number, z: number) =>
    Array.from({ length: 7 }, (_, i) => V(x0 + ((x1 - x0) * i) / 6, ty, z + tz));
  const threadPts = [
    V(-e - 0.6, ty, za + tz),
    ...run(-e, e, za).slice(0, -1),
    ...bend(e, za, zb),
    ...run(e, -e, zb).slice(1, -1),
    ...bend(-e, zb, zc),
    ...run(-e, e, zc).slice(1),
    V(e + 0.6, ty, zc + tz),
  ];
  const thread = tube(threadPts, 0.034, kit.ink, 360, 8);
  thread.draw(0);
  scene.add(thread.mesh);

  // Holos: a person stands on each life, a self of their own.
  const people = [
    { x: -2.6, z: za, s: 0.62 },
    { x: 1.2, z: zb, s: 0.58 },
    { x: -0.6, z: zc, s: 0.66 },
  ].map(({ x, z, s }) => {
    const holder = new THREE.Group();
    const p = makePerson(kit, 0.1);
    p.group.scale.setScalar(s);
    holder.add(p.group);
    holder.position.set(x, RAD - 0.02, z - 0.05);
    holder.visible = false;
    scene.add(holder);
    return { holder, top: V(x, RAD + 1.8 * s, z) };
  });

  const front = lives[2];
  const labels: Label3D[] = [
    { id: "birth", text: "BIRTH", at: V(-e, -0.55, front.z + 0.75), dx: -20, dy: 50 },
    { id: "death", text: "DEATH", at: V(e, -0.55, front.z + 0.75), dx: 20, dy: 50 },
    { id: "one", text: "ONE SELF", at: V(1.5, -0.55, front.z + 0.75), dx: 30, dy: 60 },
    {
      id: "moment",
      text: "A NEW SELF EACH MOMENT",
      at: V(-e + segLen * 2.5 + GAP * (2 - (N - 1) / 2), -RAD, zc + 0.2),
      dx: -30,
      dy: 80,
    },
    {
      id: "subject",
      text: "ONE SUBJECT IN EVERYONE",
      at: V(e + 0.9, ty + 0.25, (za + zb) / 2 + tz),
      dx: 40,
      dy: -70,
    },
    { id: "self", text: "A SELF", at: people[2].top, dx: -90, dy: -40 },
    {
      id: "experiencer",
      text: "THE EXPERIENCER",
      at: V(e + 0.9, ty + 0.25, (za + zb) / 2 + tz),
      dx: 40,
      dy: -80,
    },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.06 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.3, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const life of lives) {
        life.moments.forEach((m, i) => {
          m.position.x = -L / 2 + segLen * (i + 0.5) + st.cut * GAP * (i - (N - 1) / 2);
        });
      }
      thread.draw(st.thread);
    },
    stops: [
      // 1 · Closed: three lives engrave in, each one self from birth to death.
      (tl, t, c) => {
        tl.addLabel("closed", t);
        tl.fromTo(
          kit.clip,
          { constant: -e - 1.2 },
          { constant: e + 1.4, duration: 2.2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.3);
        tl.fromTo(c.rig.target, { x: -1.2, y: 0, z: 0 }, { ...xyz(home), duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3.5, 4.5, 13)) },
          { ...xyz(view(0.6, 5.6, 14)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { birth: 1, death: 1 }, t + 2.2);
        lab(tl, c, { one: 1 }, t + 2.9);
      },
      // 2 · Empty: each life parts into moments, a new self in each.
      (tl, t, c) => {
        tl.addLabel("empty", t);
        lab(tl, c, none, t);
        tl.set(st, { thread: 0 }, t);
        tl.set(
          people.map((p) => p.holder),
          { visible: false },
          t
        );
        for (const life of lives) {
          tl.set([life.span, ...life.ends], { visible: false }, t + 0.6);
        }
        cam(tl, c, V(0, 0.2, 0.3), view(-1, 7, 15.2), t, 2.2, EASE);
        tl.fromTo(st, { cut: 0 }, { cut: 1, duration: 1.5, ease: "power2.inOut" }, t + 0.8);
        lab(tl, c, { moment: 1 }, t + 2.4);
      },
      // 3 · Open: the moments rejoin, and one thread runs through every life.
      (tl, t, c) => {
        tl.addLabel("open", t);
        lab(tl, c, none, t);
        tl.set(st, { cut: 1 }, t);
        cam(tl, c, home, view(0.6, 6.2, 14), t, 2.4, EASE);
        tl.to(st, { cut: 0, duration: 1.1, ease: "power2.inOut" }, t + 0.3);
        tl.fromTo(st, { thread: 0 }, { thread: 1, duration: 2.6, ease: "power1.inOut" }, t + 1.3);
        lab(tl, c, { subject: 1 }, t + 3.6);
      },
      // 4 · Holos: a person on each life, each a self between its own ends. The one thread
      // is the experiencer.
      (tl, t, c) => {
        tl.addLabel("holos", t);
        lab(tl, c, none, t);
        tl.set(st, { cut: 0, thread: 1 }, t);
        cam(tl, c, V(0, 0.5, 0.2), view(1.2, 5, 14.4), t, 2.4, EASE);
        people.forEach((p, i) => show(tl, p.holder, t + 0.5 + i * 0.3, 0.7));
        for (const life of lives) tl.set(life.ends, { visible: true }, t + 1.6);
        lab(tl, c, { self: 1 }, t + 2.2);
        lab(tl, c, { experiencer: 1 }, t + 3);
      },
    ],
  };
}
