// Predictions figure, Communication: packages, not dialogue. Two star systems far apart are
// joined by a laser beam focused as tightly as physics allows, and a self-contained package
// travels it. The package opens into its layers: mathematics and constants first, then
// reference frames, compression, and the models the rest depends on. The exchange is
// asynchronous: a reply returns centuries later, and the shared work grows anyway. Last, a
// third system off the beam sees nothing at all. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, show, V } from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";
import { makeBall, makeRays, orbit } from "../speculation/parts";

const AX = -5; // sender
const BX = 5; // receiver
const LAYERS = [
  "MATHEMATICS, PHYSICAL CONSTANTS",
  "REFERENCE FRAMES",
  "COMPRESSION",
  "PREDICTIVE MODELS",
];

export function communication(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { beam: 0, travel: 0, open: 0, back: 0, shared: 0, off: 0 };

  const system = (x: number, z = 0) => {
    const g = new THREE.Group();
    const star = makeBall(kit, 0.45, -0.3);
    g.add(star.mesh);
    const rays = makeRays(kit, 14, 0.6, 0.85);
    g.add(rays);
    g.add(orbit(kit, 1.1), orbit(kit, 1.6));
    const planet = makeBall(kit, 0.12, 0.3);
    planet.mesh.position.set(1.1, 0, 0.3);
    g.add(planet.mesh);
    g.position.set(x, 0, z);
    scene.add(g);
    return g;
  };
  system(AX);
  system(BX);
  const third = system(0.6, -4.2);
  third.visible = false;

  // The beam: a narrow cylinder, drawn out from the sender.
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 1, 10).rotateZ(Math.PI / 2),
    kit.ink
  );
  scene.add(beam);
  const span = BX - AX - 2.4;

  // A package: a small layered block that travels the beam and then opens.
  const pkg = new THREE.Group();
  const tiles = LAYERS.map((_, i) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.36), kit.surface(0.1 + i * 0.12));
    m.position.y = i * 0.09;
    pkg.add(m);
    return m;
  });
  pkg.visible = false;
  scene.add(pkg);

  // A reply on its way back, and a small stack of shared work growing at both ends.
  const reply = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.3), kit.surface(0.3));
  reply.visible = false;
  scene.add(reply);
  const shelves = [AX, BX].map((x) => {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.3), kit.surface(0.15 + i * 0.1));
      b.position.y = i * 0.1;
      g.add(b);
    }
    g.position.set(x, -1.6, 0.8);
    g.visible = false;
    scene.add(g);
    return g;
  });

  // Off the beam: the third system's lines of sight miss it.
  const misses = segments(
    [V(0.6, 0, -4.2), V(-1.4, 0, -0.35), V(0.6, 0, -4.2), V(2.6, 0, -0.35)],
    kit.soft
  );
  misses.visible = false;
  scene.add(misses);

  const mid = V((AX + BX) / 2, 0, 0);
  const labels: Label3D[] = [
    {
      id: "beam",
      text: "A TIGHTLY FOCUSED BEAM",
      at: V(-1, 0.03, 0),
      dx: 0,
      dy: -60,
    },
    { id: "pkg", text: "A SELF-CONTAINED PACKAGE", at: pkg.position, dx: 40, dy: -50 },
    ...LAYERS.map((t, i) => ({
      id: `l${i}`,
      text: t,
      at: V(BX - 1.6 + 0.25, 0.4 + i * 0.32, 0),
      dx: 70,
      dy: -10,
    })),
    { id: "later", text: "A REPLY, CENTURIES LATER", at: V(-1.5, 0.05, 0), dx: -40, dy: 60 },
    { id: "shared", text: "SHARED WORK GROWS AT BOTH ENDS", at: V(BX, -1.2, 0.8), dx: 30, dy: 60 },
    { id: "off", text: "OFF THE BEAM, NOTHING", at: V(0.6, 0.6, -4.2), dx: 40, dy: -40 },
  ];
  const layerIds = Object.fromEntries(LAYERS.map((_, i) => [`l${i}`, 0]));

  const k = narrow ? 1.7 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: () => {
      const len = Math.max(span * st.beam, 0.001);
      beam.scale.x = len;
      beam.position.set(AX + 1.2 + len / 2, 0, 0);
      beam.visible = st.beam > 0.01;
      pkg.visible = st.travel > 0.01;
      const px = THREE.MathUtils.lerp(AX + 1.3, BX - 1.6, Math.min(st.travel, 1));
      pkg.position.set(px, 0.08, 0);
      tiles.forEach((tile, i) => {
        tile.position.y = i * (0.09 + 0.24 * st.open);
      });
      reply.visible = st.back > 0.01 && st.back < 0.99;
      reply.position.set(THREE.MathUtils.lerp(BX - 1.3, AX + 1.3, st.back), 0.08, 0);
      for (const sh of shelves) sh.visible = st.shared > 0.5;
      third.visible = misses.visible = st.off > 0.5;
    },
    stops: [
      // 1 · Packages, not dialogue: two systems, a beam drawn out, a package travelling it.
      (tl, t, c) => {
        tl.addLabel("beam", t);
        tl.fromTo(
          kit.clip,
          { constant: AX - 2 },
          { constant: BX + 2, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(AX, 0, 0)) },
          { ...xyz(mid), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2, 3, 6)) },
          { ...xyz(view(0, 9.4, 13)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(st, { beam: 0 }, { beam: 1, duration: 1.2, ease: "power1.in" }, t + 1.8);
        lab(tl, c, { beam: 1 }, t + 2.6);
        tl.fromTo(st, { travel: 0 }, { travel: 0.6, duration: 1.6, ease: "none" }, t + 2.8);
        lab(tl, c, { pkg: 1 }, t + 3.6);
      },
      // 2 · It explains itself: the package arrives and opens into its layers.
      (tl, t, c) => {
        tl.addLabel("payload", t);
        lab(tl, c, { beam: 0, pkg: 0 }, t);
        tl.to(st, { travel: 1, duration: 1, ease: "none" }, t);
        cam(tl, c, V(BX - 1.4, 0.6, 0), view(1.6, 1.6, 4.6), t, 2.4, EASE);
        tl.fromTo(st, { open: 0 }, { open: 1, duration: 1.2, ease: "power2.out" }, t + 1.2);
        LAYERS.forEach((_, i) => {
          lab(tl, c, { [`l${i}`]: 1 }, t + 1.8 + i * 0.3);
        });
      },
      // 3 · Asynchronous: a reply returns centuries later, and shared work grows.
      (tl, t, c) => {
        tl.addLabel("async", t);
        lab(tl, c, layerIds, t);
        tl.to(st, { open: 0, duration: 0.6 }, t);
        cam(tl, c, V(0, -0.5, 0.3), view(0, 8.6, 12.6), t, 2.4, EASE);
        tl.fromTo(st, { back: 0 }, { back: 1, duration: 2.2, ease: "none" }, t + 0.8);
        lab(tl, c, { later: 1 }, t + 1.4);
        show(tl, shelves[0], t + 2.6, 0.5);
        show(tl, shelves[1], t + 2.6, 0.5);
        tl.set(st, { shared: 1 }, t + 2.6);
        lab(tl, c, { shared: 1 }, t + 3);
      },
      // 4 · Invisible unless aligned: a third system off the beam sees nothing.
      (tl, t, c) => {
        tl.addLabel("off", t);
        lab(tl, c, { later: 0, shared: 0 }, t);
        cam(tl, c, V(0.3, 0, -1.6), view(0, 7.4, 9.6), t, 2.6, EASE);
        tl.set(st, { off: 1 }, t + 1);
        lab(tl, c, { off: 1, beam: 1 }, t + 1.6);
      },
    ],
  };
}
