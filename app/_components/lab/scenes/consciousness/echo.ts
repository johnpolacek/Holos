// Consciousness figure 3: pulse and echo. A magnetic coil taps the brain over and over.
// Awake, the echo spreads wide and keeps changing, and the trace beside it is rich. Not
// conscious, it stays a local blip and the trace is one simple wave. A ruler below marks
// the published cutoff that separates the two in people.
// Stops tween only `st`, the rig, labels, and visibility; the tapping is an ambient loop.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, segments, V } from "../../tourScenes3d";
import { brainPoint, brainSites, dot, drawIn, makeBrain, seeded } from "./common";

const CYCLE = 3.2; // seconds between taps
const BX = 3.05; // the trace board's centre
const BW = 2.3;
const BH = 1.3;
const RX0 = 1.9; // the ruler's ends
const RX1 = 4.2;
const RY = -1.25;
const CUT = 0.31;

// The trace for one tap, u from 0 to 1 across the board.
function trace(u: number, awake: boolean) {
  if (u < 0.05) return 0;
  const t = u - 0.05;
  if (awake) {
    const env = Math.exp(-t * 2.4);
    return (
      env *
      (0.34 * Math.sin(t * 46) + 0.22 * Math.sin(t * 83 + 1) + 0.16 * Math.sin(t * 131 + 2.1)) *
      Math.min(t * 30, 1)
    );
  }
  return 0.42 * Math.exp(-(((t - 0.07) / 0.05) ** 2)) - 0.18 * Math.exp(-(((t - 0.2) / 0.07) ** 2));
}

export function echo(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { coil: 0, run: 0, awake: 1 };
  const rand = seeded(5);

  const brain = makeBrain(kit, 0);
  scene.add(brain.group);

  // The coil: a figure-eight of two loops on a handle, resting just above the scalp.
  const tapDir = V(0.25, 1, 0.45).normalize();
  const tapAt = brainPoint(tapDir, 1.02);
  const coil = new THREE.Group();
  for (const s of [-1, 1]) {
    const loop = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 10, 40), kit.surface(0.25));
    loop.rotation.x = Math.PI / 2;
    loop.position.x = s * 0.27;
    coil.add(loop);
  }
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.9, 12), kit.surface(0.4));
  handle.rotation.x = Math.PI / 2;
  handle.position.set(0, 0.02, -0.6);
  coil.add(handle);
  const coilRest = tapAt.clone().addScaledVector(tapDir, 0.22);
  const coilAway = tapAt.clone().addScaledVector(tapDir, 2.6);
  scene.add(coil);
  coil.quaternion.setFromUnitVectors(V(0, 1, 0), tapDir);

  // Sites on the brain's near face: the echo lights them.
  const sites = brainSites(78, 9).map((p) => {
    const d = p.distanceTo(tapAt);
    const m = dot(kit, 0.045);
    m.position.copy(p);
    m.visible = false;
    scene.add(m);
    return {
      m,
      d,
      delay: 0.05 + d * 0.11 + rand() * 0.06,
      f: 7 + rand() * 9,
      ph: rand(),
      life: 0.3 + rand() * 0.25,
    };
  });

  // The trace board.
  const board = new THREE.Group();
  board.position.set(BX, 0.2, 0.3);
  board.rotation.y = -0.18;
  scene.add(board);
  const panel = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.2, BH + 0.2, 0.06), kit.surface(-0.5));
  panel.position.z = -0.04;
  board.add(panel);
  board.add(line([V(-BW / 2, 0, 0.01), V(BW / 2, 0, 0.01)], kit.soft));
  board.add(line([V(-BW / 2, -BH / 2, 0.01), V(-BW / 2, BH / 2, 0.01)], kit.soft));
  const NPTS = 160;
  const traceGeo = new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: NPTS }, (_, i) => V(-BW / 2 + (i / (NPTS - 1)) * BW, 0, 0.015))
  );
  const traceLine = new THREE.Line(traceGeo, kit.ink);
  board.add(traceLine);

  // The ruler: the echo's score, with the published cutoff marked.
  const ruler = new THREE.Group();
  ruler.visible = false;
  scene.add(ruler);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(RX1 - RX0, 0.08, 0.14), kit.surface(-0.3));
  bar.position.set((RX0 + RX1) / 2, RY, 0.3);
  ruler.add(bar);
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i <= 10; i++) {
    const x = RX0 + (i / 10) * (RX1 - RX0);
    ticks.push(V(x, RY + 0.04, 0.38), V(x, RY + (i % 5 === 0 ? 0.2 : 0.12), 0.38));
  }
  ruler.add(segments(ticks, kit.ink));
  const cutX = RX0 + CUT * (RX1 - RX0);
  const cut = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.55, 0.035), kit.ink);
  cut.position.set(cutX, RY + 0.12, 0.38);
  ruler.add(cut);
  const marker = (x: number, tone: number) => {
    const m = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 4), kit.surface(tone));
    m.rotation.z = Math.PI;
    m.position.set(x, RY + 0.32, 0.3);
    ruler.add(m);
    return m;
  };
  const awakeX = RX0 + 0.55 * (RX1 - RX0);
  const asleepX = RX0 + 0.14 * (RX1 - RX0);
  marker(awakeX, -0.4);
  marker(asleepX, 0.7);

  const labels: Label3D[] = [
    { id: "coil", text: "A MAGNETIC PULSE", at: coilRest, dx: -110, dy: -40 },
    {
      id: "trace",
      text: "THE ECHO, MEASURED",
      at: V(BX + 0.6, 0.2 + BH / 2 + 0.1, 0.3),
      dx: 10,
      dy: -60,
    },
    { id: "rich", text: "RICH AND WIDESPREAD", at: V(-0.6, -0.2, 0.9), dx: -40, dy: 80 },
    { id: "local", text: "LOCAL, SIMPLE", at: tapAt, dx: -120, dy: -40 },
    { id: "cut", text: "PUBLISHED CUTOFF 0.31", at: V(cutX, RY - 0.15, 0.38), dx: 0, dy: 44 },
    { id: "yes", text: "CONSCIOUS", at: V(awakeX, RY + 0.45, 0.3), dx: 40, dy: -36 },
    { id: "no", text: "NOT", at: V(asleepX, RY + 0.45, 0.3), dx: -30, dy: -36 },
  ];

  const back = narrow ? 1.02 : 1;
  const home = { t: V(1.25, 0.15, 0), o: V(0, 0.9 * back, 8.6 * back) };
  const v = new THREE.Vector3();
  const pos = traceGeo.attributes.position;

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const phase = st.run > 0.5 ? (time % CYCLE) / CYCLE : 0;
      const awake = st.awake > 0.5;
      // The coil drops in, then taps at the start of every cycle.
      const tap = st.run > 0.5 ? Math.exp(-((phase / 0.025) ** 2)) : 0;
      v.copy(coilAway)
        .lerp(coilRest, st.coil)
        .addScaledVector(tapDir, -0.1 * tap);
      coil.position.copy(v);
      for (const s of sites) {
        let on = false;
        let size = 1;
        if (st.run > 0.5) {
          if (awake) {
            const t = phase - s.delay;
            on = t > 0 && t < s.life && (t * s.f + s.ph) % 1 < 0.45;
            size = 1 - (0.5 * t) / s.life;
          } else {
            const t = phase - 0.03 - s.d * 0.08;
            on = s.d < 0.5 && t > 0 && t < 0.1;
          }
        }
        s.m.visible = on;
        s.m.scale.setScalar(size);
      }
      // The trace draws across the board through each cycle.
      for (let i = 0; i < NPTS; i++) pos.setY(i, trace(i / (NPTS - 1), awake) * BH);
      pos.needsUpdate = true;
      traceGeo.setDrawRange(0, st.run > 0.5 ? Math.max(2, Math.round(phase * 1.6 * NPTS)) : 0);
    },
    stops: [
      // 1 · A coil above the scalp, and a board for the echo.
      (tl, t, c) => {
        tl.addLabel("tap", t);
        drawIn(tl, kit, -2, 4.8, t);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0.3, z: 0 },
          { ...home.t, duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(c.rig.offset, { x: -3, y: 2, z: 7 }, { ...home.o, duration: 2.8, ease: EASE }, t);
        tl.fromTo(st, { coil: 0 }, { coil: 1, duration: 1.6, ease: "power2.out" }, t + 1.2);
        lab(tl, c, { coil: 1 }, t + 2.6);
        lab(tl, c, { trace: 1 }, t + 3.2);
      },
      // 2 · Awake: the echo is rich and widespread.
      (tl, t, c) => {
        tl.addLabel("awake", t);
        lab(tl, c, { coil: 0, trace: 0 }, t);
        cam(tl, c, V(0.9, 0.2, 0), V(-0.8, 1.6, 7.6 * back), t, 2, EASE);
        tl.set(st, { run: 1, awake: 1 }, t + 0.4);
        lab(tl, c, { rich: 1 }, t + 1.8);
      },
      // 3 · Not conscious: a local blip.
      (tl, t, c) => {
        tl.addLabel("asleep", t);
        lab(tl, c, { rich: 0 }, t);
        tl.set(st, { run: 1, awake: 0 }, t + 0.3);
        cam(tl, c, V(0.9, 0.3, 0), V(0.6, 1.9, 7.6 * back), t, 2, EASE);
        lab(tl, c, { local: 1 }, t + 1.8);
      },
      // 4 · A cutoff on the echo separates the two.
      (tl, t, c) => {
        tl.addLabel("cutoff", t);
        lab(tl, c, { local: 0 }, t);
        tl.set(st, { run: 1, awake: 1 }, t + 0.3);
        cam(tl, c, V(1.3, -0.25, 0), V(0, 0.8 * back, 9 * back), t, 2.2, EASE);
        tl.set(ruler, { visible: true }, t + 1);
        lab(tl, c, { cut: 1 }, t + 2);
        lab(tl, c, { yes: 1, no: 1 }, t + 2.8);
      },
    ],
  };
}
