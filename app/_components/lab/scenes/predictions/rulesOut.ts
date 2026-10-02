// What Commitment 1 rules out. A rock, a thermostat, and an observer stand on one floor.
// Only the observer is lit. Each rival view is shown as a change to the scene, then
// struck: sparks in every object, an empty aperture, a floor plan that claims to state
// what is lived, an extra ingredient floating beside the body.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  dashed,
  type Label3D,
  lab,
  line,
  makeIris,
  V,
} from "../../tourScenes3d";
import { box, pop, strike, tone } from "./parts";

const IRIS_Y = 2.35;

export function rulesOut(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { open: 0, spark: 0 };

  box(scene, kit.surface(-0.2), 11, 0.16, 3.6, 0.6, -0.08, 0);

  // Matter without an observer: a rock and a thermostat, hatched.
  const deadMat = kit.surface(0);
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6, 0), deadMat);
  rock.scale.set(1.3, 0.75, 1);
  rock.position.set(-3.6, 0.42, 0.2);
  rock.rotation.set(0.3, 0.5, 0.1);
  scene.add(rock);
  const thermo = new THREE.Group();
  thermo.position.set(-1.6, 0, 0.1);
  box(thermo, deadMat, 0.12, 0.9, 0.12, 0, 0.45, 0);
  box(thermo, deadMat, 0.8, 1.0, 0.3, 0, 1.4, 0);
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.08, 24), deadMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0, 1.45, 0.18);
  thermo.add(dial);
  scene.add(thermo);

  // The observer, lit, with an aperture above.
  const person = makePerson(kit, 0);
  const personMat = (person.group.children[0].children[0] as THREE.Mesh)
    .material as THREE.ShaderMaterial;
  person.group.position.set(0.9, 0, 0.2);
  scene.add(person.group);
  const iris = makeIris(kit, 0.2);
  iris.setOpen(0);
  iris.group.position.set(0.9, IRIS_Y, 0.2);
  scene.add(iris.group);

  // Panpsychism: sparks in the rock and the thermostat.
  const sparks = new THREE.Group();
  const sparkMat = kit.surface(-0.9);
  const sparkAt = [
    V(-3.9, 0.95, 0.5),
    V(-3.2, 0.85, 0.7),
    V(-3.6, 1.1, 0.1),
    V(-1.8, 2.15, 0.2),
    V(-1.35, 2.05, 0.3),
    V(-1.6, 1.0, 0.3),
  ];
  const sparkMeshes = sparkAt.map((p) => {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.17), sparkMat);
    m.position.copy(p);
    sparks.add(m);
    return m;
  });
  sparks.visible = false;
  scene.add(sparks);

  // Strict physicalism: a floor plan on the ground, with the lived drawn onto it.
  const plan = new THREE.Group();
  plan.position.set(4.0, 0.03, 0.4);
  box(plan, kit.surface(-0.6), 2.4, 0.04, 1.8, 0, 0, 0);
  const walls = [
    [-1.1, -0.8, 1.1, -0.8],
    [1.1, -0.8, 1.1, 0.8],
    [1.1, 0.8, -1.1, 0.8],
    [-1.1, 0.8, -1.1, -0.8],
    [0.1, -0.8, 0.1, 0.1],
    [0.1, 0.4, 0.1, 0.8],
    [-1.1, 0.0, -0.3, 0.0],
    [0.1, 0.1, 1.1, 0.1],
  ];
  for (const [x0, z0, x1, z1] of walls) {
    const w = new THREE.Mesh(
      new THREE.BoxGeometry(Math.abs(x1 - x0) + 0.03, 0.06, Math.abs(z1 - z0) + 0.03),
      kit.surface(0.5)
    );
    w.position.set((x0 + x1) / 2, 0.05, (z0 + z1) / 2);
    plan.add(w);
  }
  const claim = line(
    circlePts(0.28, 40).map((p) => V(p.x - 0.5, 0.06, p.y + 0.4)),
    kit.soft,
    true
  );
  claim.visible = false;
  plan.add(claim);
  plan.visible = false;
  scene.add(plan);

  // Dualism: an extra ingredient floating beside the body, tethered to it.
  const ghost = new THREE.Group();
  const orbAt = V(2.4, 2.3, 0.2);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI;
    ghost.add(
      line(
        circlePts(0.38, 40).map((p) =>
          V(orbAt.x + p.x * Math.cos(a), orbAt.y + p.y, orbAt.z + p.x * Math.sin(a))
        ),
        kit.soft,
        true
      )
    );
  }
  ghost.add(dashed(V(1.1, 1.75, 0.2), orbAt.clone().add(V(-0.38, -0.1, 0)), kit.soft, 0.06));
  ghost.visible = false;
  scene.add(ghost);

  const marks = [
    { x: strike(kit, 1.5), at: V(-2.6, 1.2, 1.2) },
    { x: strike(kit, 0.8), at: V(0.9, IRIS_Y, 0.5) },
    { x: strike(kit, 1.1), at: V(3.5, 0.9, 1.4) },
    { x: strike(kit, 0.9), at: orbAt.clone().add(V(0, 0, 0.5)) },
  ];
  for (const m of marks) {
    m.x.position.copy(m.at);
    scene.add(m.x);
  }

  const labels: Label3D[] = [
    { id: "lived", text: "LIVED, IN AN OBSERVER", at: V(0.9, IRIS_Y + 0.3, 0.2), dx: 60, dy: -50 },
    { id: "dead", text: "NOT LIVED", at: V(-3.4, 0.8, 0.4), dx: -20, dy: -80 },
    { id: "pan", text: "PANPSYCHISM", at: V(-2.0, 1.95, 1.2), dx: 0, dy: -60 },
    { id: "ill", text: "ILLUSIONISM", at: V(1.2, IRIS_Y + 0.35, 0.5), dx: 40, dy: -50 },
    { id: "phys", text: "STRICT PHYSICALISM", at: V(4.1, 0.9, 1.2), dx: 0, dy: -70 },
    { id: "dual", text: "DUALISM", at: V(2.5, 2.75, 0.5), dx: 40, dy: -40 },
  ];

  const home = V(-1.2, 1.1, 0);
  const far = V(0, 2.8, 10.5);

  // Each rival: undo the one before, show this one, strike it.
  const clearAll = (tl: gsap.core.Timeline, t: number) => {
    for (const m of marks) tl.set(m.x, { visible: false }, t);
    tl.to(st, { spark: 0, duration: 0.4 }, t);
    tl.set(sparks, { visible: false }, t + 0.4);
    tl.set(plan, { visible: false }, t);
    tl.set(ghost, { visible: false }, t);
    tl.to(st, { open: 0.85, duration: 0.6 }, t);
    tone(tl, personMat, -0.7, t, 0.6);
  };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      iris.setOpen(st.open);
      sparkMeshes.forEach((m, i) => {
        m.scale.setScalar(Math.max(0.001, st.spark * (0.8 + 0.3 * Math.sin(time * 3 + i * 1.7))));
      });
    },
    stops: [
      // 1 · Experience happens nowhere but in observers.
      (tl, t, c) => {
        tl.addLabel("local", t);
        tl.fromTo(
          kit.clip,
          { constant: -5 },
          { constant: 6, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(c.rig.target, { x: -2, y: 0.8, z: 0 }, { ...home, duration: 3, ease: EASE }, t);
        tl.fromTo(c.rig.offset, { x: -4, y: 2, z: 10 }, { ...far, duration: 3, ease: EASE }, t);
        tone(tl, deadMat, 0.6, t + 1.6);
        tone(tl, personMat, -0.7, t + 1.6);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 2.2);
        lab(tl, c, { lived: 1 }, t + 2.6);
        lab(tl, c, { dead: 1 }, t + 3.2);
      },
      // 2 · Panpsychism: a flicker in every rock and thermostat. Struck.
      (tl, t, c) => {
        tl.addLabel("panpsychism", t);
        lab(tl, c, { lived: 0, dead: 0 }, t);
        cam(tl, c, V(-2.4, 1.1, 0), V(1.2, 2.2, 8.5), t, 2, EASE);
        tl.set(sparks, { visible: true }, t + 0.8);
        tl.to(st, { spark: 1, duration: 0.8, ease: "back.out(2)" }, t + 0.8);
        pop(tl, marks[0].x, t + 2.2, 0.4);
        lab(tl, c, { pan: 1 }, t + 2.4);
      },
      // 3 · Illusionism: the aperture shut, nothing lived, only belief. Struck.
      (tl, t, c) => {
        tl.addLabel("illusionism", t);
        lab(tl, c, { pan: 0 }, t);
        clearAll(tl, t);
        cam(tl, c, V(0.9, 1.5, 0), V(-0.6, 1.4, 7.5), t, 2, EASE);
        tl.to(st, { open: 0, duration: 0.9, ease: "power2.in" }, t + 1);
        tone(tl, personMat, 0.6, t + 1, 0.9);
        pop(tl, marks[1].x, t + 2.2, 0.4);
        lab(tl, c, { ill: 1 }, t + 2.4);
      },
      // 4 · Strict physicalism: a floor plan that would state what living there is like. Struck.
      (tl, t, c) => {
        tl.addLabel("physicalism", t);
        lab(tl, c, { ill: 0 }, t);
        clearAll(tl, t);
        cam(tl, c, V(3.2, 0.6, 0.3), V(-1.2, 4.6, 6.5), t, 2, EASE);
        pop(tl, plan, t + 0.8);
        tl.set(claim, { visible: false }, t);
        tl.set(claim, { visible: true }, t + 1.8);
        pop(tl, marks[2].x, t + 2.4, 0.4);
        lab(tl, c, { phys: 1 }, t + 2.6);
      },
      // 5 · Dualism: an extra ingredient beyond physics. Struck.
      (tl, t, c) => {
        tl.addLabel("dualism", t);
        lab(tl, c, { phys: 0 }, t);
        clearAll(tl, t);
        cam(tl, c, V(1.6, 1.6, 0), V(0.4, 1.6, 8), t, 2, EASE);
        pop(tl, ghost, t + 0.9, 0.9);
        pop(tl, marks[3].x, t + 2.3, 0.4);
        lab(tl, c, { dual: 1 }, t + 2.5);
      },
    ],
  };
}
