// Logic figure, Why Integration: being one, for a structure. A screen shows one seamless
// picture; pulled apart, it is a grid of pixels that are strangers to each other. A heap
// of sand: lift a grain and nothing else moves. A joined web like a body: pull one part
// and the rest follow, because its parts make a difference to one another. Last, a viewer
// in front of the screen: the picture's unity lives in the one structure in the room whose
// parts do constrain each other, the viewer's brain. Stops tween only plain state.

import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  segments,
  V,
} from "../../tourScenes3d";
import { rng, rod, setup, xyz } from "../logic2/decoherence-util";

const SCX = -3.4; // the screen
const HX = 0.6; // the heap
const BX = 3.8; // the body-like web
const PW = 12; // pixels across
const PH = 8;

export function integration(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { apart: 0, lift: 0, pull: 0, viewer: 0 };
  const r = rng(53);

  // The screen: a frame on a stand, a seamless picture, and the pixels beneath it.
  const screen = new THREE.Group();
  const W = 2.6;
  const H = W * (PH / PW);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(W + 0.2, H + 0.2, 0.08), kit.surface(0.3));
  frame.position.z = -0.06;
  screen.add(frame);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1, 0.12), kit.surface(0.2));
  stand.position.y = -H / 2 - 0.55;
  screen.add(stand);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.5), kit.surface(0.15));
  foot.position.y = -H / 2 - 1.05;
  screen.add(foot);
  const pw = W / PW;
  const pixels: { m: THREE.Mesh; d: number }[] = [];
  for (let i = 0; i < PW; i++)
    for (let j = 0; j < PH; j++) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pw, pw, 0.04), kit.surface(-0.4));
      m.position.set(-W / 2 + pw * (i + 0.5), -H / 2 + pw * (j + 0.5), 0);
      screen.add(m);
      pixels.push({ m, d: 0.4 + r() * 1.6 });
    }
  const picture = new THREE.Group();
  const hills = Array.from({ length: 41 }, (_, i) => {
    const x = -W / 2 + (i / 40) * W;
    return V(x, -0.25 + 0.22 * Math.sin(x * 2.4) + 0.12 * Math.sin(x * 5.1), 0.03);
  });
  picture.add(line(hills, kit.ink));
  picture.add(line([V(-W / 2, -0.55, 0.03), V(W / 2, -0.55, 0.03)], kit.ink));
  picture.add(
    line(
      circlePts(0.2, 32, 0.03).map((p) => p.add(V(0.7, 0.42, 0))),
      kit.ink,
      true
    )
  );
  const hatch: THREE.Vector3[] = [];
  for (let x = -W / 2 + 0.05; x < W / 2; x += 0.09) {
    const y = -0.25 + 0.22 * Math.sin(x * 2.4) + 0.12 * Math.sin(x * 5.1);
    hatch.push(V(x, y - 0.04, 0.03), V(x + 0.05, -0.55, 0.03));
  }
  picture.add(segments(hatch, kit.soft));
  screen.add(picture);
  screen.position.set(SCX, 1.75, 0);
  scene.add(screen);

  // The heap of sand.
  const heap = new THREE.Group();
  const grainGeo = new THREE.SphereGeometry(0.11, 10, 8);
  const grainMat = kit.surface(0.25);
  let lifted: THREE.Mesh | null = null;
  for (let layer = 0; layer < 5; layer++) {
    const n = (5 - layer) * 5;
    for (let g = 0; g < n; g++) {
      const a = r() * Math.PI * 2;
      const rad = r() * (1 - layer * 0.18) * 0.9;
      const m = new THREE.Mesh(grainGeo, grainMat);
      m.position.set(Math.cos(a) * rad, 0.1 + layer * 0.17, Math.sin(a) * rad);
      heap.add(m);
      if (layer === 4 && !lifted) lifted = m;
    }
  }
  const liftFrom = lifted ? lifted.position.clone() : V(0, 0.8, 0);
  heap.position.x = HX;
  scene.add(heap);

  // The body-like web: joined parts that follow when one is pulled.
  const body = new THREE.Group();
  const nodes = [
    V(0, 0.6, 0),
    V(0.7, 1, 0.2),
    V(-0.6, 1.1, -0.1),
    V(0.1, 1.6, 0.25),
    V(0.65, 1.9, -0.2),
    V(-0.5, 1.95, 0.15),
    V(0, 2.5, 0),
    V(0.9, 0.5, -0.3),
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
    [1, 7],
    [0, 7],
    [4, 1],
    [5, 2],
  ];
  const balls = nodes.map((p) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), kit.surface(0.3));
    m.position.copy(p);
    body.add(m);
    return m;
  });
  const links = edges.map(([a, b]) => {
    const rd = rod(0.03, kit.surface(0.15), 8);
    body.add(rd.mesh);
    return { rd, a, b };
  });
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), kit.surface(0.2));
  stalk.position.y = 0.25;
  body.add(stalk);
  body.position.x = BX;
  scene.add(body);
  const base = new THREE.Mesh(new THREE.BoxGeometry(11, 0.12, 2.4), kit.surface(0.04));
  base.position.set(0, -0.06, 0);
  scene.add(base);

  // The viewer, in front of the screen, with the brain's joined knot.
  const viewer = makePerson(kit, 0.1);
  viewer.group.position.set(SCX + 0.4, 0, 3.4);
  viewer.group.rotation.y = Math.PI;
  viewer.group.visible = false;
  scene.add(viewer.group);
  const knot = new THREE.Group();
  const kg = new THREE.IcosahedronGeometry(0.11, 0);
  knot.add(new THREE.Mesh(kg, kit.surface(0.35)));
  knot.add(new THREE.LineSegments(new THREE.EdgesGeometry(kg), kit.ink));
  knot.position.set(SCX + 0.4, 1.76, 3.62);
  knot.visible = false;
  scene.add(knot);
  const sight = segments(
    [
      V(SCX + 0.4, 1.7, 3.3),
      V(SCX - 1.1, 2.4, 0.05),
      V(SCX + 0.4, 1.7, 3.3),
      V(SCX + 1.2, 1.2, 0.05),
      V(SCX + 0.4, 1.7, 3.3),
      V(SCX - 0.9, 1.1, 0.05),
    ],
    kit.soft
  );
  sight.visible = false;
  scene.add(sight);

  const labels: Label3D[] = [
    { id: "one", text: "ONE PICTURE", at: V(SCX + 0.7, 2.2, 0.05), dx: 60, dy: -60 },
    {
      id: "strangers",
      text: "PIXELS, STRANGERS TO EACH OTHER",
      at: V(SCX + 1.1, 1.2, 0.8),
      dx: 70,
      dy: 60,
    },
    {
      id: "heap",
      text: "LIFT A GRAIN, NOTHING ELSE NOTICES",
      at: V(HX + liftFrom.x, 1.6 + liftFrom.y, liftFrom.z),
      dx: 40,
      dy: -60,
    },
    { id: "body", text: "PULL ONE PART, THE REST FOLLOW", at: V(BX, 3.1, 0), dx: 40, dy: -50 },
    {
      id: "brain",
      text: "THE ONE STRUCTURE HERE THAT ACTS AS ONE",
      at: V(SCX + 0.4, 1.9, 3.62),
      dx: 90,
      dy: -40,
    },
  ];

  const k = narrow ? 1.7 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: () => {
      picture.visible = st.apart < 0.5;
      for (const p of pixels) p.m.position.z = st.apart * p.d;
      if (lifted) lifted.position.copy(liftFrom).add(V(0, st.lift * 1.3, 0));
      const tug = V(0.9, 0.5, 0.4).multiplyScalar(st.pull);
      balls.forEach((b, i) => {
        b.position.copy(nodes[i]).addScaledVector(tug, [0, 0.3, 0.3, 0.6, 0.65, 0.65, 1, 0.1][i]);
      });
      for (const l of links) l.rd.place(balls[l.a].position, balls[l.b].position);
      viewer.group.visible = knot.visible = sight.visible = st.viewer > 0.5;
    },
    stops: [
      // 1 · One picture, many parts: the screen engraves in, then its pixels pull apart.
      (tl, t, c) => {
        tl.addLabel("screen", t);
        tl.fromTo(
          kit.clip,
          { constant: SCX - 2 },
          { constant: BX + 1.5, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(SCX, 1.6, 0)) },
          { ...xyz(V(SCX, 1.6, 0.4)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-1, 0.6, 5.5)) },
          { ...xyz(view(3.4, 1.2, 4.8)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { one: 1 }, t + 1.6);
        tl.to(st, { apart: 1, duration: 1.4, ease: "power2.inOut" }, t + 2.8);
        lab(tl, c, { one: 0 }, t + 2.8);
        lab(tl, c, { strangers: 1 }, t + 3.6);
      },
      // 2 · A heap: lift one grain, and nothing else moves.
      (tl, t, c) => {
        tl.addLabel("heap", t);
        lab(tl, c, { strangers: 0 }, t);
        tl.to(st, { apart: 0, duration: 0.8 }, t);
        cam(tl, c, V(HX, 0.8, 0), view(0.6, 2.2, 5), t, 2.2, EASE);
        tl.fromTo(st, { lift: 0 }, { lift: 1, duration: 1.2, ease: "power2.out" }, t + 1.2);
        lab(tl, c, { heap: 1 }, t + 2.2);
      },
      // 3 · A body: pull one part, and the rest follow.
      (tl, t, c) => {
        tl.addLabel("body", t);
        lab(tl, c, { heap: 0 }, t);
        tl.to(st, { lift: 0, duration: 0.8 }, t);
        cam(tl, c, V(BX + 0.3, 1.6, 0), view(-0.6, 1.4, 5.4), t, 2.2, EASE);
        tl.fromTo(st, { pull: 0 }, { pull: 1, duration: 1.2, ease: "power2.inOut" }, t + 1.2);
        lab(tl, c, { body: 1 }, t + 2.2);
      },
      // 4 · Where the unity lives: a viewer before the screen, and the knot in the viewer's head.
      (tl, t, c) => {
        tl.addLabel("viewer", t);
        lab(tl, c, { body: 0 }, t);
        tl.to(st, { pull: 0, duration: 0.8 }, t);
        tl.set(st, { viewer: 1 }, t + 0.6);
        cam(tl, c, V(SCX + 0.2, 1.5, 1.9), view(3.2, 1.6, 4.6), t, 2.6, EASE);
        lab(tl, c, { one: 1 }, t + 1.6);
        lab(tl, c, { brain: 1 }, t + 2.4);
      },
    ],
  };
}
