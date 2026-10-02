// Figure A3: it only takes one. A single civilization's frontier sweeps the whole galaxy.
// On a beam of the galaxy's age, the crossing is a sliver at one end. Then the woods: a
// trail camera strapped to a trunk, easy to miss, and a flashlight that lights only a
// small patch of hatched ground. Explored is not settled, and we have barely looked.
// Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";
import { makeBeam, makeGalaxy, rng } from "./common";

const RY = -9; // the age beam
const WX = 40; // the woods
const AGE = 24;
const CROSS = 0.012; // a few million years against more than ten billion, roughly to scale

export function aliensOnlyOne(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, 0, -1);
  const scene = new THREE.Scene();
  const st = { spread: 0, sweep: 0 };

  // ---------- One civilization crosses the galaxy ----------
  const galaxy = makeGalaxy(kit, { radius: 6, count: 1500, seed: 23 });
  scene.add(galaxy.group);
  const origin = galaxy.bright.reduce((b, p) => (p.x - p.z * 0.3 < b.x - b.z * 0.3 ? p : b));
  const settled = galaxy.stars
    .filter((p) => p !== origin)
    .sort((a, b) => a.distanceTo(origin) - b.distanceTo(origin));
  const ring = circlePts(0.09, 6);
  const pairs: THREE.Vector3[] = [];
  for (const p of settled)
    for (let i = 0; i < 6; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % 6];
      pairs.push(V(p.x + a.x, p.y, p.z + a.y), V(p.x + b.x, p.y, p.z + b.y));
    }
  const marks = segments(pairs, kit.ink);
  scene.add(marks);
  const frontier = line(
    circlePts(1, 128).map((p) => V(p.x, 0, p.y)),
    kit.ink,
    true
  );
  frontier.position.copy(origin);
  scene.add(frontier);

  // ---------- The crossing against the galaxy's age ----------
  const age = makeBeam(kit, -AGE / 2, AGE / 2, { tone: 0.35, tick: 1, h: 0.4, d: 1 });
  age.group.position.y = RY;
  scene.add(age.group);
  const sliverGeo = new THREE.BoxGeometry(CROSS, 0.7, 1.1);
  sliverGeo.translate(CROSS / 2, 0.15, 0);
  const sliver = new THREE.Mesh(sliverGeo, kit.ink);
  sliver.position.set(-AGE / 2, RY, 0);
  scene.add(sliver);

  // ---------- The woods ----------
  const r = rng(3);
  const ground = new THREE.Mesh(new THREE.BoxGeometry(16, 0.2, 12), kit.surface(0.7));
  ground.position.set(WX, -0.1, -2);
  scene.add(ground);
  const barkMat = kit.surface(0.3);
  const leafMat = kit.surface(0.15);
  const trunks: THREE.Vector3[] = [];
  const tree = (x: number, z: number, s: number) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11 * s, 0.16 * s, 1.6 * s, 10),
      barkMat
    );
    trunk.position.y = 0.8 * s;
    g.add(trunk);
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry((1 - i * 0.22) * s, 1.3 * s, 12), leafMat);
      cone.position.y = (1.7 + i * 0.6) * s;
      g.add(cone);
    }
    scene.add(g);
    trunks.push(V(x, 0, z));
  };
  const camTree = V(WX + 0.6, 0, 0.6);
  tree(camTree.x, camTree.z, 1);
  for (let i = 0; i < 26; i++) {
    const x = WX + (r() - 0.5) * 14;
    const z = -7 + r() * 7.2;
    if (Math.hypot(x - camTree.x, z - camTree.z) < 1.2) continue;
    tree(x, z, 0.8 + r() * 0.5);
  }
  // The trail camera on the near side of its trunk, with a strap round the bark.
  const trail = new THREE.Group();
  trail.position.set(camTree.x, 0.75, camTree.z + 0.2);
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, 0.12), kit.surface(0.45));
  trail.add(body);
  const lens = makeIris(kit, 0.035);
  lens.setOpen(0.8);
  lens.group.position.set(0, 0.04, 0.065);
  trail.add(lens.group);
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.018, 6, 24), kit.surface(0.6));
  strap.rotation.x = Math.PI / 2;
  strap.position.set(0, 0, -0.2);
  trail.add(strap);
  scene.add(trail);

  // Someone with a flashlight. Its lit patch is clean paper on the hatched ground.
  const person = makePerson(kit, 0.1);
  person.setPose({ armR: 1.25, bendR: 1.05, lean: 0.05 });
  person.group.position.set(WX - 3.6, 0, 2.6);
  person.group.rotation.y = Math.PI * 0.82;
  scene.add(person.group);
  scene.updateMatrixWorld(true);
  const elbow = person.group.children[0].children[3].children[1];
  const hand = elbow.localToWorld(V(0, -0.36, 0));
  const torch = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.035, 0.22, 10), kit.ink);
  torch.position.copy(hand);
  scene.add(torch);
  const patch = new THREE.Mesh(new THREE.CircleGeometry(1, 40), kit.surface(-0.9));
  patch.rotation.x = -Math.PI / 2;
  patch.scale.set(1.1, 0.75, 1);
  scene.add(patch);
  const beamGeo = new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 16 }, () => V(0, 0, 0))
  );
  const beam = new THREE.LineSegments(beamGeo, kit.soft);
  scene.add(beam);

  const labels: Label3D[] = [
    { id: "one", text: "ONE THAT KEEPS SPREADING", at: origin, dx: -40, dy: -80 },
    {
      id: "cross",
      text: "CROSSING, A FEW MILLION YEARS",
      at: V(-AGE / 2 + CROSS / 2, RY + 0.5, 0),
      dx: 110,
      dy: -60,
    },
    {
      id: "age",
      text: "THE GALAXY, OVER TEN BILLION YEARS",
      at: V(AGE / 4, RY - 0.25, 0.5),
      dx: 0,
      dy: 50,
    },
    {
      id: "trail",
      text: "A TRAIL CAMERA",
      at: V(camTree.x + 0.1, 0.85, camTree.z + 0.3),
      dx: 110,
      dy: -50,
    },
    { id: "looked", text: "WHERE WE HAVE LOOKED", at: V(WX - 2, 0, -1), dx: -60, dy: 60 },
  ];
  const lookedAt = labels[4].at;

  const k = narrow ? 1.05 : 1;
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const n = Math.round(settled.length * st.spread);
      marks.geometry.setDrawRange(0, n * 12);
      frontier.visible = st.spread > 0.01 && st.spread < 0.999;
      frontier.scale.setScalar(
        Math.max(n > 0 ? settled[n - 1].distanceTo(origin) : 0, 0.05) + 0.15
      );
      // The lit patch wanders over a little of the ground, never reaching the camera tree.
      const a = time * 0.35;
      const px = WX - 2.2 + Math.sin(a) * 1.4;
      const pz = -1.2 + Math.sin(a * 1.7) * 0.8;
      patch.position.set(px, 0.01, pz);
      patch.visible = st.sweep > 0.5;
      beam.visible = patch.visible;
      lookedAt.set(px, 0, pz + 0.5);
      const pos = beamGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < 8; i++) {
        const t = (i / 8) * Math.PI * 2;
        tmp.set(px + Math.cos(t) * 1.1, 0.02, pz + Math.sin(t) * 0.75);
        pos.setXYZ(i * 2, hand.x, hand.y, hand.z);
        pos.setXYZ(i * 2 + 1, tmp.x, tmp.y, tmp.z);
      }
      pos.needsUpdate = true;
      torch.lookAt(px, 0, pz);
      torch.rotateX(Math.PI / 2);
    },
    stops: [
      // 1 · It only takes one: a single civilization's frontier sweeps the galaxy.
      (tl, t, c) => {
        tl.addLabel("one", t);
        tl.fromTo(
          kit.clip,
          { constant: -7 },
          { constant: 8, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 0 },
          { x: 0, y: -0.6, z: 0.4, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 4, y: 4, z: 11 * k },
          { x: 0, y: 8.5 * k, z: 14 * k, duration: 2.6, ease: EASE },
          t
        );
        lab(tl, c, { one: 1 }, t + 1.6);
        tl.to(st, { spread: 1, duration: 4, ease: "none" }, t + 1.8);
      },
      // 2 · A few million years to cross, against more than ten billion years of age.
      (tl, t, c) => {
        tl.addLabel("age", t);
        lab(tl, c, { one: 0 }, t);
        tl.set(st, { spread: 1 }, t);
        cam(tl, c, V(-AGE / 2 + 0.3, RY + 0.2, 0), V(0.3, 0.6, 3.2 * k), t, 2.2, EASE);
        lab(tl, c, { cross: 1 }, t + 2);
        cam(tl, c, V(0, RY + 0.4, 0), V(0, 3, 30 * k), t + 3.4, 3, EASE);
        lab(tl, c, { age: 1 }, t + 5.4);
      },
      // 3 · Explored is not settled: a trail camera in the woods.
      (tl, t, c) => {
        tl.addLabel("woods", t);
        lab(tl, c, { cross: 0, age: 0 }, t);
        cam(tl, c, V(camTree.x - 0.3, 1.2, camTree.z), V(1.2, 0.8, 6.5 * k), t, 2.6, EASE);
        lab(tl, c, { trail: 1 }, t + 2.4);
      },
      // 4 · And we have barely looked.
      (tl, t, c) => {
        tl.addLabel("looked", t);
        lab(tl, c, { trail: 0 }, t);
        cam(tl, c, V(WX - 1, 1, -1), V(1.5, 6 * k, 12 * k), t, 2.6, EASE);
        tl.set(st, { sweep: 1 }, t + 1.4);
        lab(tl, c, { looked: 1, trail: 1 }, t + 2.4);
      },
    ],
  };
}
