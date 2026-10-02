// The formula, R = C ⊛ O, set out as objects in a row. C is a crystal lattice, hatched:
// structure. O is an aperture. ⊛ is the Holos mark, a ring with six spokes, and lines of
// light run from the lattice through it into the aperture. R is the same lattice in
// clean paper, framed by an opening: structure seen from the inside. Both lattices turn
// together, so R is visibly the same structure. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { type Kit, makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  V,
} from "../../tourScenes3d";

const XR = -5.6;
const XEQ = -3.5;
const XC = -1.4;
const XS = 1.0;
const XO = 3.3;
const GAP = 0.6;

function makeLattice(kit: Kit, tone: number) {
  const g = new THREE.Group();
  const mat = kit.surface(tone);
  const nodes: THREE.Mesh[] = [];
  const ball = new THREE.SphereGeometry(0.1, 14, 10);
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      for (let k = -1; k <= 1; k++) {
        const m = new THREE.Mesh(ball, mat);
        m.position.set(i * GAP, j * GAP, k * GAP);
        g.add(m);
        nodes.push(m);
      }
  const rod = new THREE.CylinderGeometry(0.025, 0.025, GAP, 6);
  for (let a = -1; a <= 1; a++)
    for (let b = -1; b <= 1; b++)
      for (const c of [-0.5, 0.5]) {
        const x = new THREE.Mesh(rod, mat);
        x.rotation.z = Math.PI / 2;
        x.position.set(c * GAP, a * GAP, b * GAP);
        const y = new THREE.Mesh(rod, mat);
        y.position.set(a * GAP, c * GAP, b * GAP);
        const z = new THREE.Mesh(rod, mat);
        z.rotation.x = Math.PI / 2;
        z.position.set(a * GAP, b * GAP, c * GAP);
        g.add(x, y, z);
      }
  return { g, nodes, mat };
}

// The Holos mark: a ring, a finer inner ring, and a six-armed asterisk, facing +z.
function makeMark(kit: Kit) {
  const g = new THREE.Group();
  const mat = kit.surface(0.1);
  g.add(new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.05, 10, 64), mat));
  g.add(line(circlePts(0.42, 64), kit.soft, true));
  for (const a of [Math.PI / 2, Math.PI / 6, -Math.PI / 6]) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.84, 8), mat);
    bar.rotation.z = a - Math.PI / 2;
    g.add(bar);
  }
  return g;
}

export function formula(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { open: 0, ray: 0, spin: 0 };

  const C = makeLattice(kit, 0.45);
  C.g.position.x = XC;
  scene.add(C.g);

  const R = makeLattice(kit, -0.8);
  R.g.position.x = XR;
  R.g.visible = false;
  scene.add(R.g);
  // R's frame: the opening it is seen through.
  const frame = new THREE.Group();
  frame.position.set(XR, 0, 0.9);
  frame.add(line(circlePts(1.25, 96), kit.ink, true));
  frame.add(line(circlePts(1.33, 96), kit.ink, true));
  frame.visible = false;
  scene.add(frame);

  const eq = new THREE.Group();
  for (const y of [-0.15, 0.15]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.08), kit.surface(0.1));
    bar.position.y = y;
    eq.add(bar);
  }
  eq.position.x = XEQ;
  eq.visible = false;
  scene.add(eq);

  const mark = makeMark(kit);
  mark.position.x = XS;
  mark.visible = false;
  scene.add(mark);

  const iris = makeIris(kit, 0.32);
  iris.setOpen(0);
  iris.group.position.x = XO;
  iris.group.rotation.y = -0.35;
  iris.group.visible = false;
  scene.add(iris.group);

  // Light from the lattice's corner nodes, gathered through the mark into the aperture.
  const corners = C.nodes.filter(
    (n) => Math.abs(n.position.x) + Math.abs(n.position.y) + Math.abs(n.position.z) > 1.7
  );
  const rayGeo = new THREE.BufferGeometry().setFromPoints(
    corners.flatMap(() => [V(0, 0, 0), V(0, 0, 0)])
  );
  const rays = new THREE.LineSegments(rayGeo, kit.ink);
  rays.frustumCulled = false;
  scene.add(rays);
  const eye = V(XO, 0, 0.05);

  const labels: Label3D[] = [
    { id: "c", text: "C", at: V(XC, 0.95, 0), dx: 0, dy: -30, italic: true },
    { id: "creation", text: "CREATION", at: V(XC, -0.95, 0), dx: 0, dy: 40 },
    { id: "o", text: "O", at: V(XO, 0.8, 0), dx: 0, dy: -30, italic: true },
    { id: "observation", text: "OBSERVATION", at: V(XO, -0.8, 0), dx: 0, dy: 40 },
    { id: "s", text: "⊛", at: V(XS, 0.6, 0), dx: 0, dy: -30, italic: true },
    { id: "r", text: "R", at: V(XR, 1.35, 0.9), dx: 0, dy: -24, italic: true },
    { id: "reality", text: "REALITY", at: V(XR, -1.35, 0.9), dx: 0, dy: 36 },
  ];

  const pull = narrow ? 1.12 : 1;
  const tmp = new THREE.Vector3();
  const showGrow = (tl: gsap.core.Timeline, o: THREE.Object3D, at: number) => {
    tl.set(o, { visible: true }, at);
    tl.fromTo(
      o.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.4)" },
      at
    );
  };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const turn = time * 0.25;
      for (const L of [C, R]) L.g.rotation.set(0.45, turn, 0.1);
      mark.rotation.z = time * 0.6 * st.spin;
      iris.setOpen(st.open);
      scene.updateMatrixWorld();
      const pos = rayGeo.attributes.position as THREE.BufferAttribute;
      corners.forEach((n, i) => {
        n.getWorldPosition(tmp);
        pos.setXYZ(i * 2, tmp.x, tmp.y, tmp.z);
        tmp.lerp(eye, st.ray);
        pos.setXYZ(i * 2 + 1, tmp.x, tmp.y, tmp.z);
      });
      pos.needsUpdate = true;
    },
    stops: [
      // 1 · Creation: the lattice engraves in, hatched, turning.
      (tl, t, c) => {
        tl.addLabel("creation", t);
        tl.fromTo(
          kit.clip,
          { constant: XC - 1.2 },
          { constant: XC + 1.2, duration: 2.2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.3);
        tl.fromTo(
          c.rig.target,
          { x: XC - 1, y: -0.3, z: 0 },
          { x: XC, y: 0, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -2, y: 0.5, z: 5 },
          { x: 1.2 * pull, y: 1.1, z: 5.6 * pull, duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { c: 1, creation: 1 }, t + 2.2);
      },
      // 2 · Observation: an aperture opens.
      (tl, t, c) => {
        tl.addLabel("observation", t);
        lab(tl, c, { creation: 0, c: 0 }, t);
        cam(tl, c, V(XO, 0, 0), V(-1 * pull, 0.8, 5.4 * pull), t, 2.2, EASE);
        tl.set(iris.group, { visible: true }, t + 1);
        tl.to(st, { open: 0.85, duration: 1, ease: "back.out(2)" }, t + 1.2);
        lab(tl, c, { o: 1, observation: 1 }, t + 2.2);
      },
      // 3 · Joined: the mark between them, and light from the lattice into the aperture.
      (tl, t, c) => {
        tl.addLabel("joined", t);
        lab(tl, c, { observation: 0 }, t);
        cam(tl, c, V((XC + XO) / 2, 0, 0), V(0.5, 1.3, 8.6 * pull), t, 2.4, EASE);
        showGrow(tl, mark, t + 1);
        tl.to(st, { spin: 1, duration: 1.5, ease: "power1.in" }, t + 1);
        tl.to(st, { ray: 1, duration: 1.6, ease: "none" }, t + 1.8);
        lab(tl, c, { c: 1, s: 1 }, t + 2.4);
      },
      // 4 · Reality: the same lattice, lit, seen through an opening.
      (tl, t, c) => {
        tl.addLabel("reality", t);
        cam(tl, c, V((XR + XO) / 2, 0, 0), V(0, 1.4, 13 * pull), t, 2.8, EASE);
        showGrow(tl, eq, t + 1.2);
        showGrow(tl, R.g, t + 1.6);
        showGrow(tl, frame, t + 1.9);
        lab(
          tl,
          c,
          narrow ? { r: 1, reality: 1 } : { r: 1, reality: 1, creation: 1, observation: 1 },
          t + 2.6
        );
      },
    ],
  };
}
