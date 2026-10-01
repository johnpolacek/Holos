// Figure S1 on the Overview: lived, lit, and unlit in the block universe.
// Time runs up from the Big Bang plate. Galaxy histories start as soft structure; each
// observer's past light cone grows down from its moment, and every history inside a cone
// inks in. The plate shows the same thing from below: lit footprints in clean paper,
// unlit structure hatched. Stops tween only `st`, the rig, and labels, so they fast-forward.

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import * as THREE from "three";
import { makeKit } from "./engrave3d";
import {
  type Built3D,
  cam,
  circlePts,
  dashed,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  show,
  V,
} from "./tourScenes3d";

gsap.registerPlugin(CustomEase);
// The figure's camera curve: a slow lean in, then a long engraver's settle.
const EASE = "engrave";
CustomEase.create(EASE, "M0,0 C0.4,0 0.12,1 1,1");

const BASE = -2.5; // the Big Bang
const TOP = 3.2;
const HALF_X = 9.5;
const HALF_Z = 4.6;
const K = 0.8;
const SWING = 0.8; // radians the portrait camera turns about the time axis
const PULL = 0.66; // light-cone slope: radius per unit of time

type History = { x: number; z: number; phase: number };
type Observer = { home: History; t: number };

// A galaxy history drifts a little as it rises.
const at = (h: History, y: number) =>
  V(h.x + 0.18 * Math.sin(y * 1.2 + h.phase), y, h.z + 0.1 * Math.cos(y * 0.9 + h.phase));

// The highest moment of a history inside an observer's past light cone, or null.
function litUntil(h: History, obs: Observer[]) {
  let best: number | null = null;
  for (const o of obs) {
    const apex = at(o.home, o.t);
    for (let y = o.t; y >= BASE; y -= 0.02) {
      const p = at(h, y);
      if (Math.hypot(p.x - apex.x, p.z - apex.z) <= K * (o.t - y)) {
        if (best === null || y > best) best = y;
        break;
      }
    }
  }
  return best;
}

function tube(h: History, from: number, to: number, r: number, mat: THREE.Material) {
  const n = Math.max(2, Math.ceil(Math.abs(to - from) * 6));
  const pts = Array.from({ length: n + 1 }, (_, i) => at(h, from + ((to - from) * i) / n));
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n * 4, r, 6, false);
  return new THREE.Mesh(geo, mat);
}

// Reveal a tube along its length: TubeGeometry indexes ring by ring from the start.
function grow(mesh: THREE.Mesh, p: number) {
  const g = mesh.geometry as THREE.TubeGeometry;
  const { tubularSegments, radialSegments } = g.parameters;
  g.setDrawRange(0, Math.round(p * tubularSegments) * radialSegments * 6);
}

export function lived(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { ray: 0, life: 0, lives: 0, open: [0, 0, 0] };

  // The block: a frame, a few soft time slices, and the Big Bang plate, hatched as unlit.
  // The plate draws the bottom edges, so the frame has only uprights and a top.
  const corners = [
    V(-HALF_X, 0, -HALF_Z),
    V(HALF_X, 0, -HALF_Z),
    V(HALF_X, 0, HALF_Z),
    V(-HALF_X, 0, HALF_Z),
  ];
  scene.add(
    line(
      corners.map((p) => V(p.x, TOP, p.z)),
      kit.ink,
      true
    )
  );
  scene.add(
    segments(
      corners.flatMap((p) => [V(p.x, BASE, p.z), V(p.x, TOP, p.z)]),
      kit.ink
    )
  );
  for (let y = BASE + 1.4; y < TOP - 0.6; y += 1.4) {
    const s = line(
      [V(-HALF_X, y, -HALF_Z), V(HALF_X, y, -HALF_Z), V(HALF_X, y, HALF_Z), V(-HALF_X, y, HALF_Z)],
      kit.soft,
      true
    );
    scene.add(s);
  }
  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(HALF_X * 2, 0.16, HALF_Z * 2),
    kit.surface(0.62)
  );
  plate.position.y = BASE - 0.08;
  scene.add(plate);

  // Time arrow up the front left edge.
  const arrowX = -HALF_X - 0.5;
  scene.add(line([V(arrowX, BASE, HALF_Z), V(arrowX, TOP - 0.2, HALF_Z)], kit.ink));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 12), kit.ink);
  head.position.set(arrowX, TOP - 0.15, HALF_Z);
  scene.add(head);

  // Galaxy histories, all soft to begin with: structure, not yet lit.
  const seeds: [number, number][] = [
    [-7.6, -2.2],
    [-6.2, 2.7],
    [-2.6, 1.9],
    [-1.8, -3.0],
    [1.8, 2.8],
    [2.4, -1.5],
    [6.4, 2.0],
    [7.0, -3.25],
    [8.7, 0.75],
    [-8.8, 3.75],
    [8.3, -3.9],
  ];
  const galaxies: History[] = seeds.map(([x, z], i) => ({ x, z, phase: i * 1.9 }));
  const homeA: History = { x: 0, z: 0, phase: 0.4 };
  const homeB: History = { x: -5, z: -0.6, phase: 2.1 };
  const homeC: History = { x: 4.6, z: 0.5, phase: 3.3 };
  const A: Observer = { home: homeA, t: 2.6 };
  const B: Observer = { home: homeB, t: 2.0 };
  const C: Observer = { home: homeC, t: 1.2 };
  const all = [...galaxies, homeA, homeB, homeC];
  for (const h of all) {
    const pts = Array.from({ length: 40 }, (_, i) => at(h, BASE + ((TOP - BASE) * i) / 39));
    scene.add(line(pts, kit.soft));
  }

  // Each observer: a short lived stretch at the top of its history, an aperture, a past
  // light cone, and the footprint that cone leaves on the Big Bang.
  const observers = [A, B, C].map((o) => {
    const apex = at(o.home, o.t);
    const depth = o.t - BASE;
    const R = K * depth;
    const life = tube(o.home, o.t - 0.55, o.t, 0.075, kit.ink);
    scene.add(life);
    const iris = makeIris(kit, 0.11);
    iris.setOpen(0);
    iris.group.position.copy(apex).add(V(0, 0.32, 0));
    // The portrait camera swings round; turn the apertures with it so they stay open to view.
    if (narrow) iris.group.rotation.y = SWING;
    iris.group.visible = false;
    scene.add(iris.group);

    // The cone, engraved as rulings and light fronts, apex at the origin.
    const cone = new THREE.Group();
    const rulings: THREE.Vector3[] = [];
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      rulings.push(V(0, 0, 0), V(Math.cos(a) * R, -depth, Math.sin(a) * R));
    }
    cone.add(segments(rulings, kit.soft));
    for (let d = 0.7; d < depth; d += 0.7) {
      cone.add(
        line(
          circlePts(K * d, 64).map((p) => V(p.x, -d, p.y)),
          kit.ink,
          true
        )
      );
    }
    cone.position.copy(apex);
    cone.scale.setScalar(0.001);
    cone.visible = false;
    scene.add(cone);

    // Histories this observer lights, inked from the moment the falling light front
    // reaches them down to the Big Bang, so the ink rides the front.
    const ink = all.flatMap((h) => {
      const top = litUntil(h, [o]);
      if (top === null || top - BASE < 0.05) return [];
      const mesh = tube(h, top, BASE, 0.035, kit.ink);
      grow(mesh, 0);
      scene.add(mesh);
      return [{ mesh, top }];
    });

    const foot = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CircleGeometry(R, 72), kit.surface(-1));
    disc.rotation.x = -Math.PI / 2;
    foot.add(disc);
    foot.add(
      line(
        circlePts(R, 96).map((p) => V(p.x, 0.004, p.y)),
        kit.ink,
        true
      )
    );
    foot.position.set(apex.x, BASE + 0.005, apex.z);
    foot.visible = false;
    scene.add(foot);
    return { o, apex, depth, life, iris, cone, ink, foot };
  });
  // Footprints overlap; lift each slightly so they never fight.
  observers.forEach((ob, i) => {
    ob.foot.position.y += i * 0.003;
  });

  // Starlight: emitted by a galaxy on the cone's surface, travelling to observer A's eye.
  const src = galaxies[2];
  const from = at(src, litUntil(src, [A]) ?? BASE);
  const to = observers[0].apex;
  const ray = dashed(from, to, kit.ink, 0.07);
  const rayVerts = ray.geometry.attributes.position.count;
  ray.visible = false;
  scene.add(ray);
  const photon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), kit.ink);
  photon.visible = false;
  scene.add(photon);
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), kit.surface());
  star.position.copy(from);
  star.visible = false;
  scene.add(star);

  const labels: Label3D[] = [
    { id: "bang", text: "THE BIG BANG", at: V(-4.5, BASE, HALF_Z), dx: -40, dy: 40 },
    { id: "time", text: "TIME", at: V(arrowX, TOP - 0.6, HALF_Z), dx: -40, dy: 0 },
    { id: "hist", text: "A GALAXY'S HISTORY", at: at(galaxies[4], 1.8), dx: 80, dy: -40 },
    { id: "lived", text: "LIVED", at: observers[0].apex, dx: 70, dy: -50 },
    {
      id: "early",
      text: "NO ONE LIVED THROUGH THIS",
      at: at(homeA, BASE + 0.9),
      dx: 120,
      dy: 30,
    },
    { id: "cone", text: "LIT, ITS PAST", at: V(1.7, 0.4, 0.3), dx: 120, dy: -20 },
    { id: "star", text: "STARLIGHT", at: from.clone().lerp(to, 0.45), dx: -90, dy: -40 },
    { id: "union", text: "THE LIT WORLD", at: V(-1.8, BASE, 2.4), dx: -60, dy: 50 },
    { id: "unlit", text: "UNLIT", at: at(galaxies[8], 1.2), dx: 60, dy: -50 },
    { id: "future", text: "NEVER IN ANYONE'S PAST", at: V(7, TOP - 0.4, -2), dx: 40, dy: -40 },
  ];

  // Portrait: swing the camera round to look down the block's long axis, so the three
  // cones stack in depth instead of spreading across a narrow screen.
  const view = (x: number, y: number, z: number) =>
    narrow
      ? V(x, y, z)
          .applyAxisAngle(V(0, 1, 0), SWING)
          .multiplyScalar(PULL)
      : V(x, y, z);
  const center = narrow ? V(0, -2.2, 0) : V(0, 0.2, 0);
  const wide = view(4, 7, 24);

  // A cone falls from its apex at the speed of light: linear, not eased, so the front
  // and the ink it leaves keep one pace. The camera carries the drama.
  const fall = (
    tl: gsap.core.Timeline,
    ob: (typeof observers)[number],
    at0: number,
    dur: number
  ) => {
    tl.set(ob.cone, { visible: true }, at0);
    tl.to(ob.cone.scale, { x: 1, y: 1, z: 1, duration: dur, ease: "none" }, at0);
    show(tl, ob.foot, at0 + dur - 0.1, 0.9);
  };
  const open = (tl: gsap.core.Timeline, ob: (typeof observers)[number], at0: number) => {
    tl.set(ob.iris.group, { visible: true }, at0);
    tl.to(st.open, { [observers.indexOf(ob)]: 0.85, duration: 0.9, ease: "back.out(2)" }, at0);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const ob of observers) {
        const front = ob.o.t - ob.cone.scale.x * ob.depth;
        for (const { mesh, top } of ob.ink) {
          grow(mesh, THREE.MathUtils.clamp((top - front) / (top - BASE), 0, 1));
        }
      }
      grow(observers[0].life, st.life);
      grow(observers[1].life, st.lives);
      grow(observers[2].life, st.lives);
      observers.forEach((ob, i) => {
        ob.iris.setOpen(st.open[i]);
      });
      ray.geometry.setDrawRange(0, Math.round((st.ray * rayVerts) / 2) * 2);
      photon.visible = st.ray > 0 && st.ray < 1;
      photon.position.copy(from).lerp(to, st.ray);
    },
    stops: [
      // 1 · The block engraves upward from the Big Bang.
      (tl: gsap.core.Timeline, t, c) => {
        tl.addLabel("block", t);
        tl.fromTo(
          kit.clip,
          { constant: BASE - 0.3 },
          { constant: TOP + 0.4, duration: 3, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: -2, y: BASE, z: 0 },
          { ...center, duration: 3.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-11, 1.5, 15) },
          { ...wide, duration: 3.6, ease: EASE },
          t
        );
        lab(tl, c, { bang: 1, time: 1 }, t + 1.2);
        lab(tl, c, { hist: 1 }, t + 3);
      },
      // 2 · Lived: one brief stretch of one history, inside an observer.
      (tl, t, c) => {
        tl.addLabel("lived", t);
        lab(tl, c, { bang: 0, time: 0, hist: 0 }, t);
        cam(tl, c, observers[0].apex.clone().add(V(0, -0.3, 0)), view(1.6, 0.9, 6), t, 2.2, EASE);
        tl.to(st, { life: 1, duration: 1.2, ease: "power2.out" }, t + 1.6);
        open(tl, observers[0], t + 2.3);
        lab(tl, c, { lived: 1 }, t + 2.8);
        cam(tl, c, V(0, 0.5, 0), view(5, 1.6, 16), t + 4.4, 2.4, EASE);
        lab(tl, c, { lived: 0, early: 1 }, t + 6);
      },
      // 3 · Lit: the past light cone falls from the observer to the Big Bang, and starlight
      // emitted on its surface arrives at the eye.
      (tl, t, c) => {
        tl.addLabel("lit", t);
        lab(tl, c, { early: 0 }, t);
        cam(tl, c, V(0, 0, 0), view(7, 4, 15.5), t, 2.2, EASE);
        fall(tl, observers[0], t + 1.2, 2.6);
        lab(tl, c, { cone: 1 }, t + 3.4);
        tl.set(star, { visible: true }, t + 4.1);
        tl.fromTo(
          star.scale,
          { x: 0.01, y: 0.01, z: 0.01 },
          { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(2.4)" },
          t + 4.1
        );
        tl.set(ray, { visible: true }, t + 4.5);
        tl.to(st, { ray: 1, duration: 1.8, ease: "none" }, t + 4.5);
        lab(tl, c, { star: 1 }, t + 5);
      },
      // 4 · Many observers: the lit world is the union of their pasts.
      (tl, t, c) => {
        tl.addLabel("world", t);
        lab(tl, c, { cone: 0, star: 0 }, t);
        tl.set([ray, star], { visible: false }, t + 0.5);
        cam(tl, c, center, wide, t, 2.4, EASE);
        tl.to(st, { lives: 1, duration: 1, ease: "power2.out" }, t + 0.8);
        observers.slice(1).forEach((ob, i) => {
          const s = t + 1.4 + i * 1.1;
          open(tl, ob, s - 0.4);
          fall(tl, ob, s, 2.2);
        });
        lab(tl, c, { union: 1 }, t + 4.8);
      },
      // 5 · Unlit: beyond every cone, and above every observer.
      (tl, t, c) => {
        tl.addLabel("unlit", t);
        lab(tl, c, { union: 0 }, t);
        cam(tl, c, V(6.8, 0.6, 0), view(7, 3.5, 13), t, 2.4, EASE);
        lab(tl, c, { unlit: 1 }, t + 2.2);
        cam(tl, c, V(5.5, 1.8, -1), view(4, 5, 14), t + 3.6, 2, EASE);
        lab(tl, c, { future: 1 }, t + 5.2);
      },
      // 6 · A fact about arrangement: one slow turn around the finished block.
      (tl, t, c) => {
        tl.addLabel("arranged", t);
        lab(tl, c, { unlit: 0, future: 0 }, t);
        cam(tl, c, center, view(-10, 7, 21), t, 4, "sine.inOut");
        cam(tl, c, null, wide, t + 4, 4, "sine.inOut");
      },
    ],
  };
}
