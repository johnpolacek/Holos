// The Kernel's sweet spot. A computing block slides along the floor of an engraved plot,
// shrinking as it goes. A signal crosses its face faster the smaller it gets, and the
// light-delay curve falls behind it. Pushed smaller, its heat rings crowd in and the heat
// curve climbs. It settles where the curves cross. Then the plot clears and a cold halo
// of slow blocks appears far out around it.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, V } from "../../tourScenes3d";
import { makeRipples } from "./parts";

const X0 = -4;
const X1 = 4;
const f = (u: number) => 0.3 + 2.5 * u * u;
const delay = (x: number) => f((X1 - x) / (X1 - X0));
const heat = (x: number) => f((x - X0) / (X1 - X0));
const size = (x: number) => THREE.MathUtils.lerp(1.5, 0.28, (x - X0) / (X1 - X0));
const FRONT = 1.4; // the block's lane, in front of the plot

export function kernel(narrow = false): Built3D {
  const kit = makeKit();
  const scene = new THREE.Scene();
  const st = { x: X0, dDraw: 0, hDraw: 0, halo: 0, plot: 1 };

  // The plot: floor, axes, a back wall of soft rules, two curves as tubes.
  const plot = new THREE.Group();
  scene.add(plot);
  const rules: THREE.Vector3[] = [];
  for (let y = 0.5; y <= 3; y += 0.5) rules.push(V(X0, y, -0.4), V(X1, y, -0.4));
  for (let x = X0; x <= X1; x += 1) rules.push(V(x, 0, -0.4), V(x, 3, -0.4));
  plot.add(segments(rules, kit.soft));
  plot.add(
    segments([V(X0, 0, -0.4), V(X1 + 0.4, 0, -0.4), V(X0, 0, -0.4), V(X0, 3.3, -0.4)], kit.ink)
  );
  const tube = (fn: (x: number) => number) => {
    const pts = Array.from({ length: 41 }, (_, i) => {
      const x = X0 + (i / 40) * (X1 - X0);
      return V(x, fn(x), -0.4);
    });
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.045, 8);
    const mesh = new THREE.Mesh(geo, kit.surface(0.1));
    plot.add(mesh);
    return { mesh, geo, total: geo.index?.count ?? 0 };
  };
  const dTube = tube(delay);
  const hTube = tube(heat);

  // The floor, wide enough for the halo.
  const floor: THREE.Vector3[] = [];
  for (let i = -6; i <= 6; i++) floor.push(V(i, 0, -0.4), V(i, 0, 5));
  scene.add(segments(floor, kit.soft));

  // The block: a lattice cube, with a signal crossing its face.
  const block = new THREE.Group();
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), kit.surface(-0.2));
  cube.position.y = 0.5;
  block.add(cube);
  const grid: THREE.Vector3[] = [];
  for (const u of [-1 / 6, 1 / 6]) {
    grid.push(V(u, 0, 0.501), V(u, 1, 0.501), V(-0.5, 0.5 + u, 0.501), V(0.5, 0.5 + u, 0.501));
    grid.push(V(u, 1.001, -0.5), V(u, 1.001, 0.5), V(-0.5, 1.001, u), V(0.5, 1.001, u));
  }
  block.add(segments(grid, kit.soft));
  const signal = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), kit.ink);
  scene.add(signal);
  block.position.z = FRONT;
  scene.add(block);
  const rip = makeRipples(kit, 6, 0.6, 2.2);
  scene.add(rip.group);

  // The cold halo: small slow blocks in a wide ring, hatched cold.
  const halo = new THREE.Group();
  const haloMat = kit.surface(0.7);
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), haloMat);
    m.position.set(Math.cos(a) * 4.2, 0.16, FRONT + Math.sin(a) * 2.6);
    m.rotation.y = a;
    halo.add(m);
  }
  halo.visible = false;
  scene.add(halo);

  const labels: Label3D[] = [
    { id: "delay", text: "LIGHT DELAY", at: V(-3.2, delay(-3.2), -0.4), dx: 60, dy: -30 },
    { id: "heat", text: "HEAT", at: V(3.4, heat(3.4), -0.4), dx: -60, dy: -24 },
    { id: "smaller", text: "SMALLER", at: V(X1 + 0.4, 0, -0.4), dx: -10, dy: 28 },
    { id: "kernel", text: "THE KERNEL", at: V(0, 0.8, FRONT), dx: 0, dy: -150 },
    { id: "halo", text: "COLD HALO, SLOW WORK", at: V(4.2, 0.32, FRONT), dx: -10, dy: -60 },
  ];

  const k = narrow ? 0.95 : 1;

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const s = size(st.x);
      block.position.x = st.x;
      block.scale.setScalar(s);
      // Light crosses the face at one speed: a big block takes longer.
      const period = s / 0.7 + 0.3;
      const ph = Math.min((time % period) / (s / 0.7), 1);
      signal.position.set(st.x - s / 2 + s * ph, s * 0.5, FRONT + s / 2 + 0.02);
      // Heat crowds in as power is packed tighter.
      const h = (heat(st.x) - 0.3) / 2.5;
      rip.group.position.set(st.x, s * 0.5, FRONT + s / 2);
      rip.update(time, Math.min(0.17 + h, 1), 0.25 + h * 0.6);
      dTube.geo.setDrawRange(0, Math.floor((dTube.total * st.dDraw) / 6) * 6);
      hTube.geo.setDrawRange(0, Math.floor((hTube.total * st.hDraw) / 6) * 6);
      plot.visible = st.plot > 0.5;
      halo.visible = st.halo > 0.5;
      halo.rotation.y = 0;
    },
    stops: [
      // 1 · Smaller thinks faster.
      (tl, t, c) => {
        tl.addLabel("delay", t);
        tl.fromTo(
          c.rig.target,
          { x: -2, y: 1.2, z: 0.5 },
          { x: 0, y: 1.4, z: 0.5, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -3, y: 2, z: 9 },
          { x: 0, y: 1.8 * k, z: 11.5 * k, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(st, { x: X0 }, { x: -0.5, duration: 3.4, ease: "power1.inOut" }, t + 0.6);
        tl.fromTo(st, { dDraw: 0 }, { dDraw: 0.47, duration: 3.4, ease: "power1.inOut" }, t + 0.6);
        lab(tl, c, { delay: 1, smaller: 1 }, t + 1.4);
      },
      // 2 · Heat punishes it.
      (tl, t, c) => {
        tl.addLabel("heat", t);
        tl.to(st, { dDraw: 1, duration: 1, ease: "power1.inOut" }, t);
        tl.to(st, { x: 3.5, duration: 3, ease: "power1.inOut" }, t + 0.3);
        tl.to(st, { hDraw: 1, duration: 3, ease: "power1.inOut" }, t + 0.3);
        cam(tl, c, V(0.8, 1.4, 0.5), V(-1.5, 2 * k, 11 * k), t, 3, EASE);
        lab(tl, c, { heat: 1 }, t + 2.4);
      },
      // 3 · It sits where the two balance.
      (tl, t, c) => {
        tl.addLabel("balance", t);
        tl.to(st, { x: 0, duration: 2.4, ease: "power2.inOut" }, t + 0.2);
        cam(tl, c, V(0, 1.2, 0.6), V(0, 1.6 * k, 10 * k), t, 2.6, EASE);
        lab(tl, c, { kernel: 1 }, t + 2.4);
      },
      // 4 · Slow work runs far out, in the cold.
      (tl, t, c) => {
        tl.addLabel("halo", t);
        lab(tl, c, { delay: 0, heat: 0, smaller: 0, kernel: 0 }, t);
        tl.set(st, { plot: 0 }, t + 0.8);
        cam(tl, c, V(0, 0, FRONT), V(0, 7 * k, 8.5 * k), t, 3, EASE);
        tl.set(st, { halo: 1 }, t + 1.6);
        lab(tl, c, { halo: 1, kernel: 1 }, t + 2.6);
      },
    ],
  };
}
