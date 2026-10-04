// Logic figure: the edge of chaos. A rail runs from too orderly, a lattice of aligned bars,
// to too chaotic, a jumble, with a critical point between. Markers slide on it: waking
// near the point, anesthesia, generalized seizures, and disorders of consciousness away
// from it, psychedelics closer. A board behind plots avalanches, cascade size against how
// often, as a straight line on log-log axes. Last, a row of oscillators that sway at
// their own pace locks into one rhythm, as in a seizure. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, segments, show, V } from "../../tourScenes3d";
import { rng, setup, xyz } from "./decoherence-util";

const L = 5; // half length of the rail
const N_OSC = 11;

export function criticality(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { waking: -1.2, psy: -1.2, away: 0, plot: 0, lock: 0 };

  // The rail, with a notch at the critical point.
  const rail = new THREE.Mesh(new THREE.BoxGeometry(L * 2, 0.16, 0.6), kit.surface(0.08));
  rail.position.y = -0.08;
  scene.add(rail);
  const notch = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.3, 3), kit.surface(0.3));
  notch.rotation.x = Math.PI;
  notch.position.set(0, -0.32, 0);
  scene.add(notch);
  const ticks: THREE.Vector3[] = [];
  for (let i = -L; i <= L; i += 0.5) ticks.push(V(i, 0.002, 0.3), V(i, 0.002, i === 0 ? 0.0 : 0.2));
  scene.add(segments(ticks, kit.ink));
  scene.add(segments([V(0, 0, 0), V(0, 1.7, 0)], kit.soft));

  // Too orderly: a lattice of aligned bars. Too chaotic: a jumble.
  const order = new THREE.Group();
  const barGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.9, 8);
  const barMat = kit.surface(0.2);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 3; j++) {
      const b = new THREE.Mesh(barGeo, barMat);
      b.position.set(i * 0.22, 0.45, (j - 1) * 0.22);
      order.add(b);
    }
  order.position.set(-L - 1.1, 0, 0);
  scene.add(order);
  const chaos = new THREE.Group();
  const rand = rng(11);
  for (let i = 0; i < 12; i++) {
    const b = new THREE.Mesh(barGeo, barMat);
    b.position.set((rand() - 0.5) * 0.7, 0.35 + rand() * 0.3, (rand() - 0.5) * 0.7);
    b.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    chaos.add(b);
  }
  chaos.position.set(L + 1.1, 0, 0);
  scene.add(chaos);
  for (const x of [-L - 0.8, L + 0.8]) {
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 1.2), kit.surface(0.1));
    base.position.set(x, -0.04, 0);
    scene.add(base);
  }

  // Markers that slide on the rail.
  const puck = (tone: number) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 28), kit.surface(tone));
    m.position.y = 0.07;
    scene.add(m);
    return m;
  };
  const waking = puck(0.05);
  const psy = puck(0.3);
  const away = [
    { m: puck(0.45), x: -4.2, z: -0.05 }, // generalized seizure
    { m: puck(0.45), x: -3.1, z: 0.05 }, // anesthesia
    { m: puck(0.45), x: -2.2, z: 0 }, // disorders of consciousness
  ];
  psy.visible = false;
  for (const a of away) a.m.visible = false;

  // Avalanches: a board behind the rail with log-log axes and a straight fall.
  const board = new THREE.Group();
  const BW = 3.6;
  const BH = 2.4;
  const panel = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, 0.08), kit.surface(-0.6));
  board.add(panel);
  const z = 0.05;
  const ax = -BW / 2 + 0.35;
  const ay = -BH / 2 + 0.35;
  board.add(line([V(ax, BH / 2 - 0.25, z), V(ax, ay, z), V(BW / 2 - 0.25, ay, z)], kit.ink));
  const grid: THREE.Vector3[] = [];
  for (let i = 1; i <= 4; i++) {
    const gx = ax + (i * (BW - 0.6)) / 4.4;
    const gy = ay + (i * (BH - 0.6)) / 4.4;
    grid.push(V(gx, ay, z), V(gx, BH / 2 - 0.25, z), V(ax, gy, z), V(BW / 2 - 0.25, gy, z));
  }
  board.add(segments(grid, kit.soft));
  const fall = line(
    [V(ax + 0.1, BH / 2 - 0.4, z + 0.01), V(BW / 2 - 0.35, ay + 0.15, z + 0.01)],
    kit.ink
  );
  board.add(fall);
  const dots = new THREE.Group();
  const pr = rng(5);
  for (let i = 0; i < 12; i++) {
    const u = (i + 0.5) / 12;
    const p = V(
      ax + 0.1 + u * (BW - 0.8),
      BH / 2 - 0.4 - u * (BH - 0.95) + (pr() - 0.5) * 0.12,
      z + 0.02
    );
    const d = new THREE.Mesh(new THREE.CircleGeometry(0.045, 16), kit.ink);
    d.position.copy(p);
    dots.add(d);
  }
  board.add(dots);
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.4, 0.1), kit.surface(0.2));
  legs.position.y = -BH / 2 - 0.7;
  board.add(legs);
  board.position.set(1.2, 2.1 + 0.7, -2.2);
  board.visible = false;
  scene.add(board);

  // One rhythm: a row of oscillators on a bar in front of the rail.
  const OX = -3;
  const OZ = 2.3;
  const bar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.4), kit.surface(0.1));
  bar.position.set(OX, 0.06, OZ);
  bar.visible = false;
  scene.add(bar);
  const phases = Array.from({ length: N_OSC }, () => rand() * Math.PI * 2);
  const speeds = Array.from({ length: N_OSC }, () => 2 + rand() * 1.6);
  const oscs = phases.map((_, i) => {
    const pivot = new THREE.Group();
    pivot.position.set(OX - 1.6 + (i * 3.2) / (N_OSC - 1), 0.12, OZ);
    const rodM = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.8, 8),
      kit.surface(0.15)
    );
    rodM.position.y = 0.4;
    pivot.add(rodM);
    const bob = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 10), kit.surface(0.35));
    bob.position.y = 0.82;
    pivot.add(bob);
    pivot.visible = false;
    scene.add(pivot);
    return pivot;
  });

  const labels: Label3D[] = [
    { id: "order", text: "TOO ORDERLY", at: V(-L - 0.8, 0.95, 0), dx: 0, dy: -40 },
    { id: "chaos", text: "TOO CHAOTIC", at: V(L + 1.1, 0.75, 0), dx: 0, dy: -50 },
    { id: "point", text: "CRITICAL POINT", at: V(0, 1.7, 0), dx: 0, dy: -30 },
    { id: "waking", text: "WAKING", at: V(-0.6, 0.14, 0.2), dx: -20, dy: 60 },
    { id: "seizure", text: "SEIZURE", at: V(-4.2, 0.14, 0.2), dx: -10, dy: 80 },
    { id: "anesthesia", text: "ANESTHESIA", at: V(-3.1, 0.14, 0.2), dx: 0, dy: 50 },
    { id: "doc", text: "DISORDERS OF CONSCIOUSNESS", at: V(-2.2, 0.14, 0.2), dx: 20, dy: 110 },
    { id: "psy", text: "PSYCHEDELICS", at: V(-0.25, 0.14, -0.2), dx: 40, dy: -60 },
    {
      id: "size",
      text: "CASCADE SIZE",
      at: V(1.2, 2.1 + 0.7 - BH / 2 + 0.35, -2.15),
      dx: 30,
      dy: 40,
    },
    { id: "often", text: "HOW OFTEN", at: V(1.2 + ax, 2.8 + 0.6, -2.15), dx: -50, dy: -10 },
    { id: "law", text: "A POWER LAW", at: V(1.2 + 0.3, 2.8 + 0.05, -2.15), dx: 60, dy: -60 },
    { id: "rhythm", text: "EVERY PART, ONE RHYTHM", at: V(OX + 1.6, 1, OZ), dx: 60, dy: -60 },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.85 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.6, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      waking.position.x = st.waking;
      psy.position.x = st.psy;
      psy.position.z = -0.12;
      for (const a of away) {
        a.m.position.x = THREE.MathUtils.lerp(st.waking, a.x, st.away);
        a.m.position.z = a.z;
      }
      oscs.forEach((o, i) => {
        const own = Math.sin(time * speeds[i] + phases[i]);
        const one = Math.sin(time * 2.6);
        o.rotation.z = 0.45 * THREE.MathUtils.lerp(own, one, st.lock);
      });
    },
    stops: [
      // 1 · Order and chaos: the rail engraves in, from the lattice to the jumble.
      (tl, t, c) => {
        tl.addLabel("rail", t);
        tl.fromTo(
          kit.clip,
          { constant: -L - 2 },
          { constant: L + 2, duration: 2.2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.3);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-3, 0.5, 0)) },
          { ...xyz(home), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2, 2.5, 7)) },
          { ...xyz(view(0, 4.4, 14.5)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { order: 1, chaos: 1 }, t + 2);
        lab(tl, c, { point: 1 }, t + 2.8);
      },
      // 2 · Waking: a marker slides in and settles near the point.
      (tl, t, c) => {
        tl.addLabel("waking", t);
        cam(tl, c, V(-0.4, 0.4, 0), view(0.4, 3, 7.8), t, 2.4, EASE);
        tl.fromTo(
          st,
          { waking: -L + 0.4 },
          { waking: -0.6, duration: 1.8, ease: "power2.out" },
          t + 0.5
        );
        lab(tl, c, { waking: 1 }, t + 2.2);
      },
      // 3 · Away and closer: three markers drift away, one moves closer.
      (tl, t, c) => {
        tl.addLabel("away", t);
        lab(tl, c, { point: 0 }, t);
        cam(tl, c, V(-2, 0.4, 0.4), view(0.6, 4.6, 11.5), t, 2.4, EASE);
        for (const a of away) tl.set(a.m, { visible: true }, t + 0.4);
        tl.fromTo(st, { away: 0 }, { away: 1, duration: 1.8, ease: "power2.inOut" }, t + 0.4);
        lab(tl, c, { seizure: 1, anesthesia: 1, doc: 1 }, t + 2.2);
        tl.set(psy, { visible: true }, t + 2.4);
        tl.fromTo(st, { psy: -0.6 }, { psy: -0.25, duration: 1, ease: "power2.inOut" }, t + 2.4);
        lab(tl, c, { psy: 1 }, t + 3.2);
      },
      // 4 · Avalanches: the board rises behind, and the cascades fall on one line.
      (tl, t, c) => {
        tl.addLabel("avalanches", t);
        lab(tl, c, { seizure: 0, anesthesia: 0, doc: 0, psy: 0, waking: 0, order: 0, chaos: 0 }, t);
        cam(tl, c, V(1.2, 2.2, -1.4), view(0.2, 1.6, 7.6), t, 2.6, EASE);
        show(tl, board, t + 0.6, 0.8);
        lab(tl, c, { size: 1, often: 1 }, t + 1.8);
        lab(tl, c, { law: 1 }, t + 2.6);
      },
      // 5 · One rhythm: oscillators sway apart, then lock into a single beat.
      (tl, t, c) => {
        tl.addLabel("rhythm", t);
        lab(tl, c, none, t);
        cam(tl, c, V(OX, 0.6, OZ), view(0.4, 2.4, 6.4), t, 2.6, EASE);
        show(tl, bar, t + 0.4, 0);
        oscs.forEach((o, i) => {
          show(tl, o, t + 0.5 + i * 0.06, 0.4);
        });
        tl.fromTo(st, { lock: 0 }, { lock: 1, duration: 2, ease: "power2.inOut" }, t + 2.2);
        lab(tl, c, { rhythm: 1 }, t + 3.4);
      },
    ],
  };
}
