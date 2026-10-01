// Figure I1 on the Overview: closure, from Flatland to Omega.
// A flat world as an engraved grid with a few polygon inhabitants. A sphere passes
// through it; the flat beings see only a dot that grows into a circle and vanishes.
// From above, the sphere is whole, every circle a slice of it. Read the vertical as time
// and the stack of slices is one history, one fixed shape. Omega closes around it all.
// Stops tween only `st`, the rig, and labels, so any stop fast-forwards.

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import * as THREE from "three";
import { makeKit } from "./engrave3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  segments,
  show,
  V,
} from "./tourScenes3d";

gsap.registerPlugin(CustomEase);
const EASE = "engrave";
if (!CustomEase.get(EASE)) CustomEase.create(EASE, "M0,0 C0.4,0 0.12,1 1,1");

const R = 1.6; // the sphere
const HALF_X = 5;
const HALF_Z = 3.4;
const TRAVEL = 2.5; // the sphere's centre runs from +TRAVEL to -TRAVEL through the plane
const SLICES = [-1.2, -0.6, 0, 0.6, 1.2]; // heights of the circles shown as a history
const OMEGA = 6.4;

// A flat ink ring in the plane whose radius changes without changing its line weight.
function makeRing(mat: THREE.Material, n = 96, w = 0.045) {
  const pos = new Float32Array((n + 1) * 2 * 3);
  const idx: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    // Wound to face up (+y), so the ring is seen from above.
    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  const mesh = new THREE.Mesh(geo, mat);
  const setRadius = (r: number) => {
    const inner = Math.max(r - w, 0);
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2;
      const c = Math.cos(t);
      const s = Math.sin(t);
      pos.set([c * inner, 0, s * inner, c * r, 0, s * r], i * 6);
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeBoundingSphere();
  };
  setRadius(0.001);
  return { mesh, setRadius };
}

// A flat polygon inhabitant: a low prism, hatched dark, with an inked top edge.
function makeBeing(kit: ReturnType<typeof makeKit>, sides: number, r: number) {
  const g = new THREE.Group();
  const shape = new THREE.Shape(
    Array.from({ length: sides }, (_, i) => {
      const a = (i / sides) * Math.PI * 2 + Math.PI / 2;
      return new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r);
    })
  );
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  g.add(new THREE.Mesh(geo, kit.surface(0.55)));
  return g;
}

export function closure(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { y: TRAVEL + 0.4, sphere: 0, gone: 0, loop: 0 };
  let loopFrom = -1;

  // Flatland: a ruled plane, outlined in ink, gridded soft so a sphere can pass through.
  const plane = new THREE.Group();
  plane.add(
    line(
      [V(-HALF_X, 0, -HALF_Z), V(HALF_X, 0, -HALF_Z), V(HALF_X, 0, HALF_Z), V(-HALF_X, 0, HALF_Z)],
      kit.ink,
      true
    )
  );
  const grid: THREE.Vector3[] = [];
  for (let x = -HALF_X + 1; x < HALF_X; x += 1) grid.push(V(x, 0, -HALF_Z), V(x, 0, HALF_Z));
  for (let z = -HALF_Z + 0.85; z < HALF_Z; z += 0.85) grid.push(V(-HALF_X, 0, z), V(HALF_X, 0, z));
  plane.add(segments(grid, kit.soft));
  scene.add(plane);

  // Inhabitants: Abbott's cast, a triangle, a square, a pentagon, a hexagon.
  const beings = [
    { sides: 3, r: 0.32, at: V(-3.4, 0, 1.6) },
    { sides: 4, r: 0.3, at: V(-2.5, 0, -1.9) },
    { sides: 5, r: 0.3, at: V(3.2, 0, -1.4) },
    { sides: 6, r: 0.32, at: V(3.6, 0, 1.9) },
  ].map((b, i) => {
    const m = makeBeing(kit, b.sides, b.r);
    m.position.copy(b.at);
    m.userData = { home: b.at.clone(), phase: i * 1.7 };
    scene.add(m);
    return m;
  });

  // What they see: one ring in the plane, and a dot when it is only a point.
  const seen = makeRing(kit.ink);
  seen.mesh.position.y = 0.004;
  scene.add(seen.mesh);
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.07, 20), kit.ink);
  dot.rotation.x = -Math.PI / 2;
  dot.position.y = 0.005;
  scene.add(dot);

  // The sphere itself, and the circles it leaves as rings on its own surface.
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 40), kit.surface(0.05));
  sphere.visible = false;
  scene.add(sphere);
  const slices = SLICES.map((h) => {
    const r = Math.sqrt(R * R - h * h);
    const g = line(
      circlePts(r, 96).map((p) => V(p.x, h, p.y)),
      kit.ink,
      true
    );
    g.visible = false;
    scene.add(g);
    return g;
  });

  // The history: a frame for each moment of Flatland, stacked up a time axis.
  const frames = SLICES.filter((h) => h !== 0).map((h) => {
    const f = line(
      [V(-HALF_X, h, -HALF_Z), V(HALF_X, h, -HALF_Z), V(HALF_X, h, HALF_Z), V(-HALF_X, h, HALF_Z)],
      kit.soft,
      true
    );
    f.visible = false;
    scene.add(f);
    return f;
  });
  const arrowX = HALF_X + 0.6;
  const timeAxis = new THREE.Group();
  timeAxis.add(line([V(arrowX, -1.9, HALF_Z), V(arrowX, 1.9, HALF_Z)], kit.ink));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 12), kit.ink);
  head.position.set(arrowX, 2, HALF_Z);
  timeAxis.add(head);
  timeAxis.visible = false;
  scene.add(timeAxis);

  // Omega: the description with nothing outside it, engraved as meridians and parallels.
  const omega = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI;
    const m = line(
      circlePts(OMEGA, 128).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
      kit.soft,
      true
    );
    omega.add(m);
  }
  for (const lat of [-0.9, -0.5, 0, 0.5, 0.9]) {
    const y = OMEGA * Math.sin(lat);
    const r = OMEGA * Math.cos(lat);
    omega.add(
      line(
        circlePts(r, 128).map((p) => V(p.x, y, p.y)),
        lat === 0 ? kit.ink : kit.soft,
        true
      )
    );
  }
  omega.visible = false;
  scene.add(omega);

  const labels: Label3D[] = [
    { id: "flat", text: "FLATLAND", at: V(-HALF_X, 0, HALF_Z), dx: 40, dy: 50 },
    { id: "being", text: "A FLAT BEING", at: V(-3.4, 0.05, 1.6), dx: -30, dy: -60 },
    { id: "dot", text: "A DOT", at: V(0, 0, 0), dx: 60, dy: -60 },
    { id: "circle", text: "A CIRCLE", at: V(R * 0.8, 0, R * 0.6), dx: 90, dy: 50 },
    {
      id: "sphere",
      text: "ONE SPHERE, ALL AT ONCE",
      at: V(-R * 0.5, R * 0.8, R * 0.3),
      dx: -110,
      dy: -60,
    },
    { id: "slices", text: "EVERY CIRCLE THEY SAW", at: V(R * 0.8, 1.2, 0.6), dx: 120, dy: -30 },
    { id: "time", text: "TIME", at: V(arrowX, 1.4, HALF_Z), dx: 50, dy: 0 },
    {
      id: "shape",
      text: "ONE HISTORY, ONE SHAPE",
      at: V(-R * 0.7, -0.6, R * 0.6),
      dx: -120,
      dy: 50,
    },
    { id: "omega", text: "OMEGA, NOTHING OUTSIDE", at: V(0, OMEGA, 0), dx: 0, dy: -30 },
  ];

  const pull = narrow ? 0.9 : 1;
  const view = (x: number, y: number, z: number) => V(x * pull, y * pull, z * pull);
  const home = narrow ? V(0, -1.4, 0) : V(0, -0.5, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      // The inhabitants drift a little: Flatland is lived in.
      for (const b of beings) {
        const { home: h, phase } = b.userData as { home: THREE.Vector3; phase: number };
        b.position.set(
          h.x + Math.sin(time * 0.35 + phase) * 0.25,
          0,
          h.z + Math.cos(time * 0.3 + phase) * 0.18
        );
        b.rotation.y = Math.sin(time * 0.2 + phase) * 0.4;
      }
      // While stage 2 rests, the sphere keeps passing through, top to bottom, at one pace.
      if (st.loop > 0) {
        if (loopFrom < 0) loopFrom = time;
        const phase = ((time - loopFrom) * 0.42) % 1;
        st.y = TRAVEL - phase * 2 * TRAVEL;
      } else loopFrom = -1;
      // The slice the plane cuts from the sphere at its current height.
      const r2 = R * R - st.y * st.y;
      const r = r2 > 0 ? Math.sqrt(r2) : 0;
      seen.mesh.visible = r > 0.12 && st.gone < 1;
      if (seen.mesh.visible) seen.setRadius(r);
      dot.visible = r > 0 && r <= 0.12 && st.gone < 1;
      sphere.position.y = st.y;
      sphere.visible = st.sphere > 0;
      sphere.scale.setScalar(Math.max(st.sphere, 0.001));
    },
    stops: [
      // 1 · Flatland engraves in, left to right.
      (tl, t, c) => {
        tl.addLabel("flatland", t);
        tl.fromTo(
          kit.clip,
          { constant: -HALF_X - 1 },
          { constant: HALF_X + 1.5, duration: 2.4, ease: "power1.inOut" },
          t
        );
        tl.fromTo(c.rig.target, { x: -2, y: 0, z: 0 }, { ...home, duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...view(-4, 1, 9) },
          { ...view(0, 4.2, 9.5), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { flat: 1 }, t + 1.6);
        lab(tl, c, { being: 1 }, t + 2.6);
      },
      // 2 · A sphere passes through. They see a dot, a circle that grows and shrinks, nothing.
      (tl, t, c) => {
        tl.addLabel("passing", t);
        lab(tl, c, { flat: 0, being: 0 }, t);
        cam(tl, c, home, view(0.8, 3.2, 8.5), t, 1.8, EASE);
        // The sphere touches the plane and holds there a beat, so the dot can be read.
        tl.fromTo(st, { y: TRAVEL }, { y: R - 0.004, duration: 0.7, ease: "power1.in" }, t + 1.4);
        lab(tl, c, { dot: 1 }, t + 2);
        tl.to(st, { y: 0, duration: 1.3, ease: "power1.out" }, t + 2.9);
        lab(tl, c, { dot: 0, circle: 1 }, t + 3.2);
        tl.to(st, { y: -TRAVEL, duration: 1.8, ease: "power1.in" }, t + 4.3);
        lab(tl, c, { circle: 0 }, t + 4.6);
        tl.set(st, { loop: 1 }, t + 6.4);
      },
      // 3 · From above: one sphere, all at once, and every circle a slice of it.
      (tl, t, c) => {
        tl.addLabel("above", t);
        tl.set(st, { loop: 0, y: 0 }, t);
        cam(tl, c, V(0, 0.3, 0), view(4.5, 5.5, 9.5), t, 2.4, EASE);
        tl.to(st, { sphere: 1, duration: 1.1, ease: "back.out(1.6)" }, t + 1);
        lab(tl, c, { sphere: 1 }, t + 2);
        slices.forEach((s, i) => {
          tl.set(s, { visible: true }, t + 2.6 + i * 0.22);
        });
        lab(tl, c, { slices: 1 }, t + 3.6);
      },
      // 4 · The same step one level up: read the vertical as time, and the circle's whole
      // life is one fixed shape.
      (tl, t, c) => {
        tl.addLabel("history", t);
        lab(tl, c, { sphere: 0, slices: 0 }, t);
        tl.to(st, { sphere: 0, duration: 0.6, ease: "power2.in" }, t + 0.2);
        tl.set(st, { gone: 1 }, t + 0.8);
        cam(tl, c, V(0, 0, 0), view(7.5, 2.6, 9), t, 2.4, EASE);
        frames.forEach((f, i) => {
          tl.set(f, { visible: true }, t + 1.2 + i * 0.25);
        });
        show(tl, timeAxis, t + 1.6, 0.7);
        lab(tl, c, { time: 1 }, t + 2.2);
        lab(tl, c, { shape: 1 }, t + 3.2);
      },
      // 5 · Closure taken all the way: Omega, with nothing outside it.
      (tl, t, c) => {
        tl.addLabel("omega", t);
        lab(tl, c, { time: 0, shape: 0 }, t);
        cam(tl, c, V(0, 0.3, 0), view(6, 6.5, 25), t, 3.2, EASE);
        tl.set(omega, { visible: true }, t + 0.8);
        tl.fromTo(
          omega.scale,
          { x: 0.25, y: 0.25, z: 0.25 },
          { x: 1, y: 1, z: 1, duration: 2.6, ease: EASE },
          t + 0.8
        );
        tl.fromTo(omega.rotation, { y: -0.8 }, { y: 0, duration: 3, ease: EASE }, t + 0.8);
        lab(tl, c, { omega: 1 }, t + 3.4);
      },
    ],
  };
}
