// Three kinds of claims, built as one structure. Commitments are the foundation slab.
// On it stand the tests (two tests, a check, a bet) around a sealed core, presence, which
// no test touches. Above, speculation is only an outline, never built in stone.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, V } from "../../tourScenes3d";
import { box, pop, rise, sphere } from "./parts";

export function claims(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();

  // The foundation: a stepped slab with a plinth course.
  const slab = new THREE.Group();
  box(slab, kit.surface(0.15), 7.6, 0.5, 3.4, 0, 0.25, 0);
  box(slab, kit.surface(-0.1), 7.0, 0.3, 3.0, 0, 0.65, 0);
  scene.add(slab);

  // The tests: four columns with capitals and bases.
  const xs = [-3.0, -1.25, 1.25, 3.0];
  const columns = xs.map((x) => {
    const g = new THREE.Group();
    g.position.set(x, 0.8, -0.6);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 2.2, 20), kit.surface(0));
    shaft.position.y = 1.25;
    g.add(shaft);
    box(g, kit.surface(0.2), 0.7, 0.16, 0.7, 0, 0.08, 0);
    box(g, kit.surface(0.2), 0.72, 0.18, 0.72, 0, 2.43, 0);
    g.visible = false;
    scene.add(g);
    return g;
  });
  const beam = new THREE.Group();
  box(beam, kit.surface(0.1), 6.5, 0.36, 1.0, 0, 0, 0);
  beam.position.set(0, 3.7, -0.6);
  beam.visible = false;
  scene.add(beam);

  // Presence: a clean sphere sealed in a wire case at the front. No column reaches it.
  const core = new THREE.Group();
  core.position.set(0, 0.8, 0.95);
  core.add(sphere(0.42, kit.surface(-0.9), V(0, 0.62, 0)));
  const caseEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 1.2, 1.2)),
    kit.soft
  );
  caseEdges.position.y = 0.62;
  core.add(caseEdges);
  core.visible = false;
  scene.add(core);

  // Speculation: a spire in outline only, above the beam.
  const spire = new THREE.Group();
  const cone = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.ConeGeometry(2.6, 2.8, 4, 1)),
    kit.soft
  );
  cone.rotation.y = Math.PI / 4;
  cone.position.y = 1.4;
  spire.add(cone);
  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(3.6, 0.8, 1.2)),
    kit.soft
  );
  frame.position.y = -0.4;
  spire.add(frame);
  spire.position.set(0, 4.3, -0.6);
  spire.visible = false;
  scene.add(spire);

  const labels: Label3D[] = [
    { id: "commit", text: "COMMITMENTS", at: V(-3.2, 0.5, 1.7), dx: -40, dy: 50 },
    { id: "tests", text: "TWO TESTS, A CHECK, A BET", at: V(2.6, 3.9, -0.1), dx: 40, dy: -50 },
    { id: "presence", text: "PRESENCE, NEVER TESTED", at: V(0.35, 1.2, 1.3), dx: 60, dy: 110 },
    { id: "spec", text: "SPECULATION, LABELED", at: V(-0.9, 5.9, -0.6), dx: -110, dy: -20 },
  ];

  const k = narrow ? 0.92 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: () => {},
    stops: [
      // 1 · The commitments: the foundation everything stands on.
      (tl, t, c) => {
        tl.addLabel("commitments", t);
        tl.fromTo(kit.clip, { constant: -0.1 }, { constant: 1, duration: 1.6, ease: "none" }, t);
        tl.set(kit.clip, { constant: 100 }, t + 1.7);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0.8, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-5, 2, 8) },
          { ...view(2.5, 4, 11), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { commit: 1 }, t + 2);
      },
      // 2 · The tests rise on it, and presence sits sealed among them.
      (tl, t, c) => {
        tl.addLabel("tests", t);
        lab(tl, c, { commit: 0 }, t);
        cam(tl, c, V(0, 1.9, 0), view(3, 3.6, 13), t, 2.2, EASE);
        columns.forEach((col, i) => {
          rise(tl, col, t + 0.6 + i * 0.25);
        });
        tl.set(beam, { visible: true }, t + 1.8);
        tl.fromTo(beam.position, { y: 4.6 }, { y: 3.7, duration: 0.6, ease: "power2.in" }, t + 1.8);
        lab(tl, c, { tests: 1 }, t + 2.4);
        pop(tl, core, t + 2.8);
        lab(tl, c, { presence: 1 }, t + 3.4);
      },
      // 3 · Speculation: an outline above, labeled, never part of the building.
      (tl, t, c) => {
        tl.addLabel("speculation", t);
        lab(tl, c, { tests: 0, presence: 0 }, t);
        cam(tl, c, V(0, 2.9, 0), view(-2.5, 3.4, 16.5), t, 2.4, EASE);
        tl.set(spire, { visible: true }, t + 1);
        tl.fromTo(spire.position, { y: 6 }, { y: 4.3, duration: 1.4, ease: EASE }, t + 1);
        lab(tl, c, { spec: 1, commit: 1 }, t + 2.4);
      },
    ],
  };
}
