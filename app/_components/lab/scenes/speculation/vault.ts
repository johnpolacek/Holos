// The Chrono Vault and the four thermal signatures. A layered archive draws in and its
// layers lift apart: values, decisions and their reasons, a way to reboot, identity at
// the core. Beside it a Kernel computes, signals crossing it and heat leaving it, while
// the Vault holds still. Pull back to four bodies in a row: a Holocore glowing in light
// and heat, the Kernel, a Dark Node that has stopped shining but still sheds heat, and
// the Vault. Then the Vault goes cold: dark, quiet, close to undetectable.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, V } from "../../tourScenes3d";
import { makeBall, makeRays, makeRipples } from "./parts";

const XS = [-4.5, -1.5, 1.5, 4.5]; // Holocore, Kernel, Dark Node, Vault
const Y = 1.1;
const LAYERS = [
  { r: 0.95, h: 0.22 },
  { r: 0.85, h: 0.22 },
  { r: 0.74, h: 0.22 },
  { r: 0.6, h: 0.22 },
];

export function vault(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { lift: 0, show: [0, 0, 0, 1], sleep: 0, kernelHeat: 0, lineup: 0 };

  const ground: THREE.Vector3[] = [];
  for (let i = -7; i <= 7; i++) ground.push(V(i, 0, -1.6), V(i, 0, 1.6));
  ground.push(V(-7, 0, -1.6), V(7, 0, -1.6), V(-7, 0, 1.6), V(7, 0, 1.6));
  scene.add(segments(ground, kit.soft));

  // The Vault: a central spindle and four stacked layers that can lift apart.
  const vaultG = new THREE.Group();
  vaultG.position.set(XS[3], 0, 0);
  scene.add(vaultG);
  const vaultMat = kit.surface(-0.35);
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 0.18, 48), vaultMat);
  plinth.position.y = 0.09;
  vaultG.add(plinth);
  const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.3, 24), vaultMat);
  spindle.position.y = 1.2;
  vaultG.add(spindle);
  const layers = LAYERS.map((L) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(L.r, L.r, L.h, 48), vaultMat);
    // Engraved bands around the rim, the written record.
    const g = new THREE.Group();
    g.add(m);
    const bands: THREE.Vector3[] = [];
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      const c = Math.cos(a) * (L.r + 0.002);
      const s = Math.sin(a) * (L.r + 0.002);
      bands.push(V(c, -L.h * 0.3, s), V(c, L.h * 0.3, s));
    }
    g.add(segments(bands, kit.soft));
    vaultG.add(g);
    return g;
  });
  const vaultRip = makeRipples(kit, 2, 1.0, 1.5);
  vaultRip.group.position.set(XS[3], Y, 0.3);
  scene.add(vaultRip.group);

  // A Kernel: a lattice block, signals crossing it.
  const block = (tone: number, x: number) => {
    const g = new THREE.Group();
    const mat = kit.surface(tone);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), mat);
    g.add(cube);
    const grid: THREE.Vector3[] = [];
    for (const u of [-0.55 / 3, 0.55 / 3]) {
      grid.push(V(u, -0.55, 0.552), V(u, 0.55, 0.552), V(-0.55, u, 0.552), V(0.55, u, 0.552));
      grid.push(V(u, 0.552, -0.55), V(u, 0.552, 0.55), V(-0.55, 0.552, u), V(0.55, 0.552, u));
    }
    g.add(segments(grid, kit.soft));
    g.position.set(x, Y, 0);
    scene.add(g);
    return { g, mat };
  };
  const kern = block(-0.2, XS[1]);
  const kernRays = makeRays(kit, 14, 0.95, 1.2);
  kernRays.position.set(XS[1], Y, 0.6);
  scene.add(kernRays);
  const signals = [0, 1, 2].map(() => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), kit.ink);
    scene.add(d);
    return d;
  });
  const node = block(0.85, XS[2]);

  // A Holocore: a bright compact core.
  const core = makeBall(kit, 0.6, -0.7, 36).mesh;
  core.position.set(XS[0], Y, 0);
  scene.add(core);
  const coreRays = makeRays(kit, 16, 0.75, 1.05);
  coreRays.position.set(XS[0], Y, 0.3);
  scene.add(coreRays);

  const rips = [0, 1, 2].map((i) => {
    const r = makeRipples(kit, [4, 3, 3][i], 0.95, 1.45);
    r.group.position.set(XS[i], Y, 0.65);
    scene.add(r.group);
    return r;
  });
  const bodies = [[core, coreRays], [kern.g, kernRays], [node.g]];

  // Each layer's label anchor rides with its layer as the stack lifts apart.
  const anchors = LAYERS.map((l) => V(XS[3] + l.r, 0, 0));
  const lay = (i: number) => anchors[i];
  const labels: Label3D[] = [
    { id: "l0", text: "VALUES", at: lay(0), dx: 90, dy: 0 },
    { id: "l1", text: "DECISIONS, AND WHY", at: lay(1), dx: 110, dy: 0 },
    { id: "l2", text: "HOW TO REBOOT", at: lay(2), dx: 110, dy: 0 },
    { id: "l3", text: "WHO WE ARE", at: lay(3), dx: 110, dy: 0 },
    { id: "thinks", text: "THINKS", at: V(XS[1], Y + 0.55, 0), dx: 0, dy: -110 },
    { id: "remembers", text: "REMEMBERS", at: V(XS[3], 2.35, 0), dx: 0, dy: -50 },
    { id: "s0", text: "HOLOCORE", at: V(XS[0], 0, 0), dx: 0, dy: 34 },
    { id: "s1", text: "KERNEL", at: V(XS[1], 0, 0), dx: 0, dy: 34 },
    { id: "s2", text: "DARK NODE", at: V(XS[2], 0, 0), dx: 0, dy: 34 },
    { id: "s3", text: "VAULT", at: V(XS[3], 0, 0), dx: 0, dy: 34 },
    { id: "cold", text: "CLOSE TO UNDETECTABLE", at: V(XS[3], 2.35, 0), dx: -40, dy: -60 },
  ];

  const k = narrow ? 0.92 : 1;

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      // Layers stack on the plinth; `lift` spreads them up the spindle.
      let y = 0.18;
      layers.forEach((g, i) => {
        const h = LAYERS[i].h;
        g.position.y = y + h / 2 + st.lift * 0.32 * (i + 1);
        anchors[i].y = g.position.y;
        y += h;
      });
      bodies.forEach((list, i) => {
        for (const o of list) o.visible = st.show[i] > 0.5;
      });
      coreRays.rotation.z = time * 0.12;
      kernRays.rotation.z = -time * 0.08;
      rips.forEach((r, i) => {
        const on = st.show[i] > 0.5 ? (i === 1 ? st.kernelHeat : 1) : 0;
        r.update(time, on, [0.4, 0.3, 0.25][i], i * 0.3);
      });
      // Signals cross the Kernel's face, top to bottom, on staggered clocks.
      signals.forEach((d, i) => {
        d.visible = st.show[1] > 0.5;
        const ph = (time * 0.9 + i / 3) % 1;
        d.position.set(XS[1] - 0.55 + 1.1 * ph, Y + 0.55 - (i + 0.5) * (1.1 / 3), 0.58);
      });
      vaultMat.uniforms.tone.value = THREE.MathUtils.lerp(-0.35, 0.9, st.sleep);
      vaultRip.update(time, 0.5 * (1 - st.sleep), 0.12);
    },
    stops: [
      // 1 · A layered archive of identity.
      (tl, t, c) => {
        tl.addLabel("archive", t);
        tl.fromTo(
          kit.clip,
          { constant: 0 },
          { constant: 2.8, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { x: XS[3], y: 1, z: 0 },
          { x: XS[3] + 0.5, y: 1.3, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -2, y: 3, z: 7 },
          { x: -1.5 * k, y: 2.2, z: 7.5 * k, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(st, { lift: 0 }, { lift: 1, duration: 1.6, ease: "power2.inOut" }, t + 2);
        lab(tl, c, { l0: 1, l1: 1, l2: 1, l3: 1 }, t + 3);
      },
      // 2 · The Kernel thinks, the Vault remembers.
      (tl, t, c) => {
        tl.addLabel("thinks", t);
        lab(tl, c, { l0: 0, l1: 0, l2: 0, l3: 0 }, t);
        tl.to(st, { lift: 0, duration: 1.2, ease: "power2.inOut" }, t + 0.2);
        cam(tl, c, V(1.5, 1.2, 0), V(0, 2 * k, 10.5 * k), t, 2.8, EASE);
        tl.set(st.show, { 1: 1 }, t + 1);
        tl.set(st, { kernelHeat: 0.67 }, t + 1.4);
        lab(tl, c, { thinks: 1, remembers: 1 }, t + 2.4);
      },
      // 3 · Four signatures side by side.
      (tl, t, c) => {
        tl.addLabel("signatures", t);
        lab(tl, c, { thinks: 0, remembers: 0 }, t);
        cam(tl, c, V(0, 1.1, 0), V(0, 2.6 * k, 15 * k), t, 2.8, EASE);
        tl.set(st.show, { 0: 1 }, t + 1);
        tl.set(st.show, { 2: 1 }, t + 1.4);
        lab(tl, c, { s0: 1, s1: 1, s2: 1, s3: 1 }, t + 2);
      },
      // 4 · The Vault sleeps: cold and dark.
      (tl, t, c) => {
        tl.addLabel("sleep", t);
        tl.to(st, { sleep: 1, duration: 2, ease: "power1.inOut" }, t + 0.5);
        cam(tl, c, V(2.2, 1.1, 0), V(-2.5, 2.4 * k, 12 * k), t, 2.8, EASE);
        lab(tl, c, { cold: 1 }, t + 2.4);
      },
    ],
  };
}
