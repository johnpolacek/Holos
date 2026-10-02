// The claims ladder: eight steps down, in the order of the "What Holos claims" box. The
// top steps are solid blocks with inked edges. As confidence drops the blocks hatch, then
// lose their bodies to soft outlines, and the last two are dashed outlines only. Each
// stop raises the next steps out of the floor. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, dashed, type Label3D, lab, V } from "../../tourScenes3d";

const N = 8;
const STEP_W = 1.9;
const DEPTH = 2.4;
const x0 = -((N - 1) * 2) / 2;
const stepX = (i: number) => x0 + i * 2;
const stepH = (i: number) => 0.45 + (N - 1 - i) * 0.5;

const NAMES = [
  "PHYSICS, AS IT STANDS",
  "BRANCHING",
  "TWO SIDES",
  "THE THRESHOLD",
  "OMEGA",
  "A SHARP SWITCH",
  "COMPANION IDEAS",
  "SPECULATION",
];

// Box corners and its twelve edges, for outlines drawn without a body.
function edges(w: number, h: number, d: number) {
  const c = (sx: number, sy: number, sz: number) => V((sx * w) / 2, sy * h, (sz * d) / 2);
  const out: [THREE.Vector3, THREE.Vector3][] = [];
  for (const sy of [0, 1]) for (const sz of [-1, 1]) out.push([c(-1, sy, sz), c(1, sy, sz)]);
  for (const sy of [0, 1]) for (const sx of [-1, 1]) out.push([c(sx, sy, -1), c(sx, sy, 1)]);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) out.push([c(sx, 0, sz), c(sx, 1, sz)]);
  return out;
}

export function claims(narrow = false): Built3D {
  const kit = makeKit();
  const scene = new THREE.Scene();

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(N * 2 + 1.2, 0.1, DEPTH + 1.4),
    kit.surface(0.2)
  );
  floor.position.y = -0.05;
  scene.add(floor);

  // Each step grows from the floor: its group's origin sits at floor level.
  const steps = Array.from({ length: N }, (_, i) => {
    const g = new THREE.Group();
    g.position.x = stepX(i);
    const h = stepH(i);
    if (i < 6) {
      // Physics and the sides taken: clean. The threshold and Omega: hatched. The hypothesis: heavier.
      const tone = i < 3 ? -0.5 : i < 5 ? 0.35 : 0.7;
      const geo = new THREE.BoxGeometry(STEP_W, h, DEPTH);
      geo.translate(0, h / 2, 0);
      g.add(new THREE.Mesh(geo, kit.surface(tone)));
      if (i < 3) {
        const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), kit.ink);
        g.add(e);
      }
    } else {
      // Companion ideas and speculation: dashed outlines, no body.
      const pairs = edges(STEP_W, h, DEPTH);
      for (const [a, b] of pairs) g.add(dashed(a, b, i === 6 ? kit.ink : kit.soft, 0.09));
    }
    g.scale.y = 0.001;
    g.visible = false;
    scene.add(g);
    return { g, h };
  });

  // Labels sit on each step's top front edge, staggered high and low so they never meet.
  const labels: Label3D[] = steps.map((s, i) => ({
    id: `s${i}`,
    text: NAMES[i],
    at: V(stepX(i), s.h, DEPTH / 2),
    dx: narrow ? 0 : 10,
    dy: i % 2 === 0 ? -34 : -78,
  }));
  labels.push(
    { id: "firm", text: "FIRM", at: V(stepX(0) - 1, stepH(0) + 0.6, 0), dx: -10, dy: -40 },
    { id: "open", text: "OPEN", at: V(stepX(N - 1) + 1, 0.9, 0), dx: 10, dy: -50 }
  );

  const rise = (tl: gsap.core.Timeline, i: number, at: number) => {
    tl.set(steps[i].g, { visible: true }, at);
    tl.to(steps[i].g.scale, { y: 1, duration: 1.1, ease: "back.out(1.2)" }, at);
  };
  // Look at steps a..b from the front and a little above.
  const pull = narrow ? 1.25 : 1;
  const frame = (
    tl: gsap.core.Timeline,
    c: Parameters<typeof lab>[1],
    a: number,
    b: number,
    at: number
  ) => {
    const mid = (stepX(a) + stepX(b)) / 2;
    const span = stepX(b) - stepX(a) + 4.2;
    const y = (stepH(a) + stepH(b)) / 2;
    cam(
      tl,
      c,
      V(mid, y * 0.75, 0),
      V(1.2, 2.6 + span * 0.15, (5 + span * 1.05) * pull),
      at,
      2.4,
      EASE
    );
  };
  const wide = V(2.5, 6, 19.5 * pull);

  return {
    scene,
    kit,
    labels,
    update: () => {},
    stops: [
      // 1 · Physics, as it stands.
      (tl, t, c) => {
        tl.addLabel("physics", t);
        tl.fromTo(
          c.rig.target,
          { x: stepX(0), y: 0.5, z: 0 },
          { x: stepX(0) + 0.6, y: 2.4, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 4, y: 1.5, z: 6 },
          { x: 2.4, y: 3, z: 8.6 * pull, duration: 3, ease: EASE },
          t
        );
        rise(tl, 0, t + 0.8);
        lab(tl, c, { s0: 1, firm: 1 }, t + 2.2);
      },
      // 2 · Sides taken, on physics and on mind.
      (tl, t, c) => {
        tl.addLabel("sides", t);
        lab(tl, c, { firm: 0 }, t);
        frame(tl, c, 0, 2, t);
        rise(tl, 1, t + 1);
        rise(tl, 2, t + 1.5);
        lab(tl, c, { s1: 1, s2: 1 }, t + 2.4);
      },
      // 3 · The threshold: testable, and it can fail.
      (tl, t, c) => {
        tl.addLabel("threshold", t);
        lab(tl, c, narrow ? { s0: 0, s1: 0 } : { s0: 0 }, t);
        frame(tl, c, 1, 4, t);
        rise(tl, 3, t + 1);
        lab(tl, c, { s3: 1 }, t + 2.2);
      },
      // 4 · Omega, and the hypothesis.
      (tl, t, c) => {
        tl.addLabel("omega", t);
        lab(tl, c, { s1: 0, s2: 0 }, t);
        frame(tl, c, 3, 6, t);
        rise(tl, 4, t + 1);
        rise(tl, 5, t + 1.5);
        lab(tl, c, { s4: 1, s5: 1 }, t + 2.4);
      },
      // 5 · Further out: companion ideas and speculation. Then the whole ladder.
      (tl, t, c) => {
        tl.addLabel("further", t);
        lab(tl, c, { s3: 0, s4: 0 }, t);
        frame(tl, c, 5, 7, t);
        rise(tl, 6, t + 1);
        rise(tl, 7, t + 1.5);
        lab(tl, c, { s6: 1, s7: 1 }, t + 2.4);
        lab(tl, c, { s5: 0, s6: 0, s7: 0 }, t + 4.2);
        cam(tl, c, V(0, 1.6, 0), wide, t + 4.2, 3, EASE);
        const all = Object.fromEntries(steps.map((_, i) => [`s${i}`, narrow && i % 2 ? 0 : 1]));
        lab(tl, c, { ...all, firm: narrow ? 0 : 1, open: narrow ? 0 : 1 }, t + 6.6);
      },
    ],
  };
}
