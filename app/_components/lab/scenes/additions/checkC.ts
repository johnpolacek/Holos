// Predictions figure, Check C: observer-relative facts. A friend in a sealed lab measures a
// particle and sees a result. Outside, Wigner treats the whole lab, friend included, as one
// quantum system and measures it. Three assumptions stand as pillars under one beam: facts
// for everyone, nothing faster than light, free choices. Experiments break the limit the
// three set; Holos takes out the first. Last, the friend in today's experiments is a photon,
// far below the threshold, so they test the logic of observed events, not registration.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, show, V } from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";

const LX = -1.6; // the lab
const WX = 2.9; // Wigner
const PZ = 5.4; // the pillars, well in front
const PILLARS = [-1.6, 0, 1.6];

export function checkC(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { sealed: 0, probe: 0, pull: 0, photon: 0 };

  const floor = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.12, 10), kit.surface(0.03));
  floor.position.set(0.3, -0.06, 2.2);
  scene.add(floor);

  // The lab: a box drawn in its edges, with low walls so the inside shows.
  const lab3 = new THREE.Group();
  const W = 2.4;
  const D = 2;
  const H = 1.9;
  const box = new THREE.BoxGeometry(W, H, D);
  box.translate(0, H / 2, 0);
  lab3.add(new THREE.LineSegments(new THREE.EdgesGeometry(box), kit.ink));
  for (const [x, z, w, d] of [
    [0, -D / 2, W, 0.05],
    [-W / 2, 0, 0.05, D],
  ]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, H, d), kit.surface(-0.3));
    wall.position.set(x, H / 2, z);
    lab3.add(wall);
  }
  const lid = new THREE.Mesh(new THREE.BoxGeometry(W, 0.05, D), kit.surface(0.2));
  lid.position.y = H;
  lid.visible = false;
  lab3.add(lid);
  lab3.position.set(LX, 0, 0);
  scene.add(lab3);

  // Inside: the friend, a particle source, and a detector with a result.
  const friend = makePerson(kit, 0.1);
  friend.group.scale.setScalar(0.8);
  friend.group.position.set(LX - 0.5, 0, 0.1);
  friend.group.rotation.y = 0.9;
  scene.add(friend.group);
  const source = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), kit.surface(0.3));
  source.position.set(LX + 0.7, 0.6, -0.5);
  scene.add(source);
  const detector = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.3, 20).rotateZ(Math.PI / 2),
    kit.surface(0.4)
  );
  detector.position.set(LX + 0.7, 0.6, 0.5);
  detector.rotation.y = Math.PI / 2;
  scene.add(detector);
  scene.add(segments([V(LX + 0.7, 0.6, -0.39), V(LX + 0.7, 0.6, 0.35)], kit.ink));
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), kit.surface(0.2));
  stand.position.set(LX + 0.7, 0.25, 0);
  scene.add(stand);
  // The photon that stands in for the friend in today's experiments.
  const photon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), kit.ink);
  photon.position.set(LX - 0.5, 0.7, 0.1);
  photon.visible = false;
  scene.add(photon);

  // Wigner outside, with an instrument aimed at the whole lab.
  const wigner = makePerson(kit, 0.1);
  wigner.group.position.set(WX, 0, 0.6);
  wigner.group.rotation.y = -1.3;
  scene.add(wigner.group);
  const inst = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.35), kit.surface(0.35));
  inst.add(body);
  const dish = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.3, 24, 1, true).rotateZ(Math.PI / 2),
    kit.surface(0.15)
  );
  dish.position.x = -0.38;
  inst.add(dish);
  const tripod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8), kit.surface(0.2));
  tripod.position.y = -0.7;
  inst.add(tripod);
  inst.position.set(WX - 1, 1.25, 0.5);
  inst.visible = false;
  scene.add(inst);
  const probeLines = segments(
    [
      V(WX - 1.5, 1.25, 0.5),
      V(LX + W / 2, H, D / 2),
      V(WX - 1.5, 1.25, 0.5),
      V(LX + W / 2, 0.05, D / 2),
      V(WX - 1.5, 1.25, 0.5),
      V(LX + W / 2, H, -D / 2),
    ],
    kit.soft
  );
  probeLines.visible = false;
  scene.add(probeLines);

  // Three pillars under one beam.
  const pillars = PILLARS.map((x) => {
    const g = new THREE.Group();
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.3, 20), kit.surface(0.12));
    col.position.y = 0.65;
    g.add(col);
    const capital = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.5), kit.surface(0.2));
    capital.position.y = 1.35;
    g.add(capital);
    g.position.set(x, 0, PZ);
    g.visible = false;
    scene.add(g);
    return g;
  });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.16, 0.5), kit.surface(0.15));
  beam.position.set(0, 1.48, PZ);
  beam.visible = false;
  scene.add(beam);

  const labels: Label3D[] = [
    { id: "friend", text: "THE FRIEND", at: V(LX - 0.5, 1.45, 0.1), dx: -50, dy: -50 },
    { id: "result", text: "A RESULT", at: V(LX + 0.7, 0.75, 0.6), dx: 40, dy: -40 },
    { id: "sealed", text: "SEALED", at: V(LX, H, -D / 2), dx: -40, dy: -40 },
    { id: "wigner", text: "WIGNER", at: V(WX, 1.8, 0.6), dx: 40, dy: -40 },
    {
      id: "whole",
      text: "THE WHOLE LAB, ONE SYSTEM",
      at: V(LX + W / 2, H, D / 2),
      dx: 60,
      dy: -60,
    },
    { id: "abs", text: "FACTS FOR EVERYONE", at: V(PILLARS[0], 0.3, PZ + 0.2), dx: -40, dy: 50 },
    {
      id: "local",
      text: "NOTHING FASTER THAN LIGHT",
      at: V(PILLARS[1], 0.3, PZ + 0.2),
      dx: 0,
      dy: 80,
    },
    { id: "free", text: "FREE CHOICES", at: V(PILLARS[2], 0.3, PZ + 0.2), dx: 40, dy: 50 },
    { id: "gives", text: "HOLOS GIVES THIS UP", at: V(PILLARS[0], 1.5, PZ), dx: -60, dy: -50 },
    {
      id: "photon",
      text: "A PHOTON, FAR BELOW THE THRESHOLD",
      at: V(LX - 0.5, 0.8, 0.1),
      dx: -50,
      dy: -60,
    },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0.4, 0.9, 0.4);

  return {
    scene,
    kit,
    labels,
    update: () => {
      lid.visible = st.sealed > 0.5;
      inst.visible = probeLines.visible = st.probe > 0.5;
      pillars[0].position.x = PILLARS[0] - 1.6 * st.pull;
      pillars[0].rotation.z = 0.5 * st.pull;
      beam.rotation.z = 0.12 * st.pull;
      beam.position.y = 1.48 - 0.25 * st.pull;
      friend.group.visible = st.photon < 0.5;
      photon.visible = st.photon > 0.5;
    },
    stops: [
      // 1 · The friend: the lab engraves in; inside, a measurement and a result.
      (tl, t, c) => {
        tl.addLabel("friend", t);
        tl.fromTo(
          kit.clip,
          { constant: -4.6 },
          { constant: 4.6, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(LX, 0.8, 0)) },
          { ...xyz(V(LX, 0.8, 0.2)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-1, 2, 5)) },
          { ...xyz(view(1.6, 2.6, 5.6)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { friend: 1 }, t + 1.8);
        lab(tl, c, { result: 1 }, t + 2.4);
        tl.set(st, { sealed: 1 }, t + 3);
        lab(tl, c, { sealed: 1 }, t + 3.2);
      },
      // 2 · Wigner outside, measuring the whole lab as one system.
      (tl, t, c) => {
        tl.addLabel("wigner", t);
        lab(tl, c, { friend: 0, result: 0, sealed: 0 }, t);
        cam(tl, c, home, view(1.4, 3.4, 8.6), t, 2.4, EASE);
        lab(tl, c, { wigner: 1 }, t + 1);
        tl.set(st, { probe: 1 }, t + 1.4);
        lab(tl, c, { whole: 1 }, t + 2);
      },
      // 3 · Three assumptions: one beam on three pillars; Holos takes out the first.
      (tl, t, c) => {
        tl.addLabel("pillars", t);
        lab(tl, c, { wigner: 0, whole: 0 }, t);
        cam(tl, c, V(0, 0.9, PZ), view(0.6, 2.2, 6.6), t, 2.4, EASE);
        pillars.forEach((p, i) => {
          show(tl, p, t + 0.6 + i * 0.2, 0.5);
        });
        show(tl, beam, t + 1.3, 0.5);
        lab(tl, c, { abs: 1, local: 1, free: 1 }, t + 1.6);
        tl.fromTo(st, { pull: 0 }, { pull: 1, duration: 1.2, ease: "power2.inOut" }, t + 2.8);
        lab(tl, c, { gives: 1 }, t + 3.6);
      },
      // 4 · Today's friends: the friend gives way to a photon, far below the threshold.
      (tl, t, c) => {
        tl.addLabel("photon", t);
        lab(tl, c, none, t);
        tl.set([...pillars, beam], { visible: false }, t + 0.4);
        cam(tl, c, V(LX, 0.8, 0.2), view(1.6, 2.4, 5.4), t, 2.4, EASE);
        tl.set(st, { photon: 1 }, t + 1);
        lab(tl, c, { photon: 1 }, t + 1.4);
      },
    ],
  };
}
