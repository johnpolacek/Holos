// Predictions figure: Commitment 2, observerhood is thresholded.
// Three plates. A field of separate processors grows column by column and no point of view
// appears. Then one small network joins up: its integration gauge passes the twilight, and
// once its integrated state models a world beyond it, an aperture opens. A physical copy
// beside it opens the same way. Last, a row of systems along Φ: clear cases on both sides,
// a narrow twilight between, where a borderline system and its copy sit together.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, dashed, type Label3D, lab, makeIris, segments, show, V } from "../../tourScenes3d";
import { makeGauge, makeGhostIris, makeNetwork, plateIn, setup, xyz } from "./thresholded-parts";

const COLS = 12;
const ROWS = 4;
const NX = 2.6; // the network, and its copy at -NX / +NX
const NY = 1.55;
const GX = 4.75; // gauges
const CUT = 0.6; // Φ_c on the dial

export function thresholded(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { grow: 0, join: 0, phi: 0.1, open: 0, about: 0 };
  const plates = Array.from({ length: 3 }, () => {
    const g = new THREE.Group();
    g.visible = false;
    scene.add(g);
    return g;
  });

  // ---------- 1 · Separate processors, scaled up ----------
  const DX = 0.78;
  const DZ = 0.95;
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(COLS * DX + 0.6, 0.12, ROWS * DZ + 0.4),
    kit.surface(0.05)
  );
  floor.position.set(0, -0.06, 0);
  plates[0].add(floor);
  const procMat = kit.surface(0.25);
  const cols = Array.from({ length: COLS }, (_, ci) => {
    const g = new THREE.Group();
    const x = (ci - (COLS - 1) / 2) * DX;
    for (let ri = 0; ri < ROWS; ri++) {
      const z = (ri - (ROWS - 1) / 2) * DZ;
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.3, 0.36), procMat);
      box.position.set(x, 0.15, z);
      g.add(box);
      // Each processor passes its output on along its own row, one way.
      if (ci > 0) {
        g.add(segments([V(x - DX + 0.18, 0.15, z), V(x - 0.2, 0.15, z)], kit.ink));
        const head = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 10), kit.ink);
        head.rotation.z = -Math.PI / 2;
        head.position.set(x - 0.24, 0.15, z);
        g.add(head);
      }
    }
    g.visible = false;
    plates[0].add(g);
    return g;
  });
  const shut = makeIris(kit, 0.24);
  shut.setOpen(0);
  shut.group.position.set(0, 2.3, -0.3);
  plates[0].add(shut.group);
  plates[0].add(dashed(V(0, 0.4, -0.3), V(0, 1.75, -0.3), kit.soft, 0.08));

  // ---------- 2 · One network: integration, a world, a copy ----------
  const world = new THREE.Group();
  const peak = new THREE.Mesh(new THREE.ConeGeometry(1.05, 1.7, 4), kit.surface(0.05));
  peak.position.y = 0.85;
  peak.rotation.y = Math.PI / 4;
  world.add(peak);
  const knoll = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.9, 4), kit.surface(0.05));
  knoll.position.set(0.95, 0.45, 0.35);
  knoll.rotation.y = 0.3;
  world.add(knoll);
  world.position.set(0, 0, -2.4);
  world.visible = false;
  plates[1].add(world);

  const makeSystem = (side: number) => {
    // Built in local space around the network, then placed at side · NX.
    const g = new THREE.Group();
    g.position.x = side * NX;
    const net = makeNetwork(kit, 1, 10, 5);
    net.group.position.set(0, NY, 0);
    g.add(net.group);
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 0.3, 40), kit.surface(0.15));
    plinth.position.set(0, 0.15, 0);
    g.add(plinth);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8), kit.surface(0.1));
    stem.position.set(0, 0.5, 0);
    g.add(stem);
    // The model inside: a small likeness of the world's two peaks.
    const model = new THREE.Group();
    const m1 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.32, 4), kit.surface(0.3));
    m1.rotation.y = Math.PI / 4;
    model.add(m1);
    const m2 = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.17, 4), kit.surface(0.3));
    m2.position.set(0.18, -0.07, 0.06);
    model.add(m2);
    model.position.set(0, NY - 0.05, 0);
    model.visible = false;
    g.add(model);
    const about = dashed(
      V(-side * NX * 0.08, NY, -0.1),
      V(-side * (NX - 0.75), 1.1, -2.1),
      kit.ink,
      0.09
    );
    about.visible = false;
    g.add(about);
    const iris = makeIris(kit, 0.24);
    iris.setOpen(0);
    iris.group.position.set(0, NY + 1.65, 0.1);
    g.add(iris.group);
    g.add(dashed(V(0, NY + 0.95, 0.05), V(0, NY + 1.3, 0.05), kit.ink, 0.06));
    const gauge = makeGauge(kit, 0.62, CUT);
    gauge.group.position.set(side * (GX - NX), 1.05, 0.5);
    g.add(gauge.group);
    const gpost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 0.1), kit.surface(0.1));
    gpost.position.set(side * (GX - NX), 0.5, 0.45);
    g.add(gpost);
    plates[1].add(g);
    return { g, net, model, about, iris, gauge };
  };
  const A = makeSystem(-1);
  const B = makeSystem(1);
  B.g.visible = false;

  // ---------- 3 · Along Φ: clear cases, a narrow twilight ----------
  const RAIL = 11.6;
  const rail = new THREE.Mesh(new THREE.BoxGeometry(RAIL, 0.18, 1.6), kit.surface(0.05));
  rail.position.y = -0.09;
  plates[2].add(rail);
  const BAND_X = 0.6;
  const BAND_W = 1.5;
  const band = new THREE.Mesh(new THREE.BoxGeometry(BAND_W, 0.05, 1.62), kit.surface(0.85));
  band.position.set(BAND_X, 0.02, 0);
  plates[2].add(band);
  // The Φ axis along the front edge.
  const ax = [V(-RAIL / 2, 0.01, 0.95), V(RAIL / 2 + 0.1, 0.01, 0.95)];
  plates[2].add(segments(ax, kit.ink));
  const axHead = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 12), kit.ink);
  axHead.rotation.z = -Math.PI / 2;
  axHead.position.set(RAIL / 2 + 0.2, 0.01, 0.95);
  plates[2].add(axHead);
  const POST_H = 1.15;
  const post = (x: number, z = 0) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, POST_H, 8), kit.surface(0.1));
    p.position.set(x, POST_H / 2, z);
    plates[2].add(p);
  };
  const row: { x: number; open: number }[] = [
    { x: -5, open: 0 },
    { x: -4, open: 0 },
    { x: -3, open: 0 },
    { x: -2, open: 0 },
    { x: 3.1, open: 0.85 },
    { x: 4.1, open: 0.85 },
    { x: 5.1, open: 0.85 },
  ];
  const IR = 0.17;
  for (const r of row) {
    post(r.x);
    const iris = makeIris(kit, IR);
    iris.setOpen(r.open);
    iris.group.position.set(r.x, POST_H + 0.3, 0);
    plates[2].add(iris.group);
  }
  const ghosts = [-0.35, 0.35].map((dx) => {
    post(BAND_X + dx);
    const g = makeGhostIris(kit, IR);
    g.position.set(BAND_X + dx, POST_H + 0.3, 0);
    plates[2].add(g);
    return g;
  });

  const labels: Label3D[] = [
    { id: "sep", text: "SEPARATE PROCESSES", at: V(-3.5 * DX, 0.3, 1.5 * DZ), dx: -40, dy: 110 },
    { id: "more", text: "SCALED UP", at: V(5.5 * DX, 0.3, -1.5 * DZ), dx: 40, dy: -70 },
    { id: "nopov", text: "NO POINT OF VIEW", at: V(0, 2.3, -0.3), dx: 110, dy: -30 },
    { id: "integ", text: "INTEGRATION", at: A.net.pos[1].clone().add(V(-NX, NY, 0)), dx: -60, dy: -70 },
    { id: "phi", text: "Φ", at: V(-GX, 1.05, 0.55), dx: -40, dy: 60, italic: true },
    { id: "phic", text: "Φc", at: A.gauge.at(CUT).add(V(-GX, 1.05, 0.5)), dx: 30, dy: -60, italic: true },
    { id: "world", text: "A WORLD BEYOND IT", at: V(0, 1.7, -2.4), dx: 60, dy: -50 },
    { id: "about", text: "ITS MODEL OF IT", at: V(-NX, NY - 0.05, 0), dx: 150, dy: 120 },
    { id: "obs", text: "AN OBSERVER", at: V(-NX, NY + 1.65, 0.1), dx: -90, dy: -30 },
    { id: "copy", text: "A PHYSICAL COPY", at: V(NX + 0.6, NY - 0.6, 0.4), dx: 60, dy: 80 },
    { id: "also", text: "ALSO AN OBSERVER", at: V(NX, NY + 1.65, 0.1), dx: 90, dy: -30 },
    { id: "below", text: "CLEAR CASES", at: V(-3.5, POST_H + 0.6, 0), dx: 0, dy: -60 },
    { id: "above", text: "CLEAR CASES", at: V(4.1, POST_H + 0.6, 0), dx: 0, dy: -60 },
    { id: "twilight", text: "A NARROW TWILIGHT", at: V(BAND_X, 0.05, 0.6), dx: 0, dy: 60 },
    { id: "border", text: "BORDERLINE, AND ITS COPY", at: V(BAND_X, POST_H + 0.75, 0), dx: 0, dy: -80 },
    { id: "axis", text: "Φ", at: V(RAIL / 2 + 0.2, 0.01, 0.95), dx: 20, dy: 30, italic: true },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.06 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: () => {
      const shown = 3 + st.grow * (COLS - 3);
      cols.forEach((g, i) => {
        // Grow outward from the middle columns.
        const order = Math.abs(i - (COLS - 1) / 2) * 2;
        g.visible = order < shown;
      });
      for (const s of [A, B]) {
        s.net.join(st.join);
        s.gauge.setValue(st.phi);
        s.iris.setOpen(st.open);
        s.model.visible = st.about > 0;
        s.about.visible = st.about > 0;
      }
      world.visible = st.about > 0;
    },
    stops: [
      // 1 · Separate processors scale up, column by column. No point of view appears.
      (tl, t, c) => {
        tl.addLabel("scale", t);
        plateIn(tl, c, kit, plates, 0, t, none, -6, 6, 0);
        tl.set(st, { grow: 0 }, t);
        tl.fromTo(c.rig.target, { x: -1, y: 0.4, z: 0 }, { x: 0, y: 0.8, z: 0, duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2.5, 3.5, 9)) },
          { ...xyz(view(0, 5.6, 14)), duration: 3, ease: EASE },
          t
        );
        tl.to(st, { grow: 1, duration: 2.6, ease: "power1.inOut" }, t + 1.4);
        lab(tl, c, { sep: 1 }, t + 1.6);
        lab(tl, c, { more: 1 }, t + 3.6);
        lab(tl, c, { nopov: 1 }, t + 4.2);
      },
      // 2 · One network joins up. Its integration passes the twilight on the gauge.
      (tl, t, c) => {
        tl.addLabel("integration", t);
        plateIn(tl, c, kit, plates, 1, t, none, -6.5, 1.5);
        tl.set(st, { join: 0, phi: 0.1, open: 0, about: 0 }, t);
        tl.set(B.g, { visible: false }, t);
        cam(tl, c, V(-NX - 0.9, 1.5, 0), view(0.8, 2.2, 9.6), t, 2.4, EASE);
        tl.set(st, { join: 1 }, t + 2.4);
        lab(tl, c, { integ: 1 }, t + 2.5);
        tl.to(st, { phi: 0.8, duration: 1.6, ease: "power2.inOut" }, t + 2.9);
        lab(tl, c, { phi: 1 }, t + 3);
        lab(tl, c, { phic: 1 }, t + 3.8);
      },
      // 3 · Its integrated state models a world beyond it. Now the aperture opens.
      (tl, t, c) => {
        tl.addLabel("about", t);
        lab(tl, c, { integ: 0, phi: 0, phic: 0 }, t);
        tl.set(st, { join: 1, phi: 0.8 }, t);
        tl.set(kit.clip, { constant: 100 }, t);
        cam(tl, c, V(-1.4, 1.5, -0.8), view(0.6, 2.8, 11.5), t, 2.2, EASE);
        tl.set(st, { about: 1 }, t + 1.2);
        show(tl, world, t + 1.2, 0.8);
        lab(tl, c, { world: 1 }, t + 1.8);
        lab(tl, c, { about: 1 }, t + 2.4);
        tl.to(st, { open: 0.85, duration: 1, ease: "back.out(2)" }, t + 3.2);
        lab(tl, c, { obs: 1 }, t + 3.6);
      },
      // 4 · A physical copy beside it crosses the same way.
      (tl, t, c) => {
        tl.addLabel("copy", t);
        lab(tl, c, { world: 0, about: 0 }, t);
        tl.set(st, { join: 1, phi: 0.8, about: 1, open: 0.85 }, t);
        tl.set(kit.clip, { constant: 100 }, t);
        cam(tl, c, V(0, 1.6, -0.6), view(0, 3.4, 15.5), t, 2.4, EASE);
        show(tl, B.g, t + 1.4, 0.9);
        lab(tl, c, { copy: 1 }, t + 2.4);
        lab(tl, c, { also: 1 }, t + 3.1);
      },
      // 5 · Along Φ: clear cases on both sides, a narrow twilight, a borderline pair.
      (tl, t, c) => {
        tl.addLabel("steep", t);
        plateIn(tl, c, kit, plates, 2, t, none, -6.4, 6.4);
        cam(tl, c, V(0.2, 0.9, 0), view(0, 3.4, 15.2), t, 2.4, EASE);
        lab(tl, c, { below: 1, above: 1 }, t + 2.4);
        lab(tl, c, { twilight: 1 }, t + 3.1);
        lab(tl, c, { border: 1 }, t + 3.8);
        lab(tl, c, { axis: 1 }, t + 3.8);
        void ghosts;
      },
    ],
  };
}
