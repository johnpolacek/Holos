// Predictions figure, Test B: the twilight narrows with size. Three dishes of grown neurons,
// small, medium, and large, the largest wired to a simple game. A condition is turned on
// each (a drug dose, connectivity), and an integration measure fixed in advance is
// tracked. On the board behind, the small culture crosses gradually and the large one
// steeply. Last, how it loses: if the curves keep the same steepness at every size, claim
// 3 fails, though not the core. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, segments, show, V } from "../../tourScenes3d";
import { rng, setup, xyz } from "../logic2/decoherence-util";

const DISHES = [
  { x: -3, r: 0.6, n: 7 },
  { x: -0.6, r: 0.95, n: 16 },
  { x: 2.3, r: 1.35, n: 32 },
];
const SLOPES = [1.6, 3.6, 9];
const PZ = -2.6; // the plot board
const PW = 4.6;
const PH = 2.6;
const PY = 2.5;

export function testB(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { knob: 0, curves: 0, same: 0 };
  const r = rng(61);

  const bench = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.14, 3.2), kit.surface(0.04));
  bench.position.set(-0.3, -0.07, 0.2);
  scene.add(bench);

  // The dishes, each with a culture of linked neurons and a condition knob in front.
  const knobs: THREE.Mesh[] = [];
  for (const d of DISHES) {
    const g = new THREE.Group();
    const wall = new THREE.Mesh(
      new THREE.CylinderGeometry(d.r, d.r, 0.22, 64, 1, true),
      kit.surface(0.1)
    );
    wall.position.y = 0.11;
    g.add(wall);
    const floor = new THREE.Mesh(new THREE.CylinderGeometry(d.r, d.r, 0.03, 64), kit.surface(-0.2));
    floor.position.y = 0.015;
    g.add(floor);
    const cells: THREE.Vector3[] = [];
    for (let i = 0; i < d.n; i++) {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * d.r * 0.8;
      const p = V(Math.cos(a) * rad, 0.08, Math.sin(a) * rad);
      cells.push(p);
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), kit.surface(0.4));
      m.position.copy(p);
      g.add(m);
    }
    const links: THREE.Vector3[] = [];
    cells.forEach((a, i) => {
      cells.forEach((b, j) => {
        if (j > i && a.distanceTo(b) < 0.55) links.push(a, b);
      });
    });
    g.add(segments(links, kit.ink));
    const knob = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24),
      kit.surface(0.35)
    );
    knob.position.set(0, 0.06, d.r + 0.45);
    g.add(knob);
    g.add(segments([V(0, 0.13, d.r + 0.45), V(0.13, 0.13, d.r + 0.45)], kit.ink));
    knobs.push(knob);
    g.position.x = d.x;
    scene.add(g);
  }

  // A simple game beside the largest dish: a small screen with a paddle and a ball.
  const game = new THREE.Group();
  const scr = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.65, 0.05), kit.surface(-0.4));
  game.add(scr);
  game.add(
    line(
      [V(-0.45, -0.33, 0.03), V(0.45, -0.33, 0.03), V(0.45, 0.33, 0.03), V(-0.45, 0.33, 0.03)],
      kit.ink,
      true
    )
  );
  const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.02), kit.ink);
  paddle.position.set(-0.35, 0.05, 0.04);
  game.add(paddle);
  const ball = new THREE.Mesh(new THREE.CircleGeometry(0.03, 12), kit.ink);
  ball.position.set(0.1, -0.08, 0.04);
  game.add(ball);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8), kit.surface(0.2));
  stem.position.y = -0.62;
  game.add(stem);
  game.position.set(3.9, 0.92, 0.6);
  game.rotation.y = -0.4;
  scene.add(game);
  scene.add(
    line([V(3.65, 0.08, 0.5), V(3.4, 0.08, 0.4), V(2.3 + 1.35 * 0.9, 0.16, 0.2)], kit.soft)
  );

  // The plot board behind: integration against the condition, one curve per size.
  const board = new THREE.Group();
  board.add(new THREE.Mesh(new THREE.BoxGeometry(PW, PH, 0.08), kit.surface(-0.6)));
  const z = 0.05;
  const ax = -PW / 2 + 0.35;
  const ay = -PH / 2 + 0.3;
  const right = PW / 2 - 0.25;
  const top = PH / 2 - 0.25;
  board.add(line([V(ax, top, z), V(ax, ay, z), V(right, ay, z)], kit.ink));
  const curvePts = (k: number) =>
    Array.from({ length: 61 }, (_, i) => {
      const u = i / 60;
      const y = 1 / (1 + Math.exp(-(u - 0.5) * k * 2.4));
      return V(ax + 0.1 + u * (right - ax - 0.2), ay + 0.1 + y * (top - ay - 0.25), z + 0.01);
    });
  const curves = SLOPES.map((sl) => {
    const l = line(curvePts(sl), kit.ink);
    l.userData.k = sl;
    l.visible = false;
    board.add(l);
    return l;
  });
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.1, PY - PH / 2, 0.1), kit.surface(0.2));
  legs.position.y = -PH / 2 - (PY - PH / 2) / 2;
  board.add(legs);
  board.position.set(-0.3, PY, PZ);
  board.visible = false;
  scene.add(board);

  const at = (x: number, y: number) => V(-0.3 + x, PY + y, PZ);
  const labels: Label3D[] = [
    { id: "small", text: "SMALL", at: V(DISHES[0].x, 0.2, -DISHES[0].r), dx: -20, dy: -40 },
    { id: "large", text: "LARGE", at: V(DISHES[2].x, 0.2, -DISHES[2].r), dx: 20, dy: -40 },
    { id: "game", text: "WIRED TO A SIMPLE GAME", at: V(3.9, 1.25, 0.6), dx: 30, dy: -40 },
    {
      id: "knob",
      text: "A DOSE, OR CONNECTIVITY",
      at: V(DISHES[1].x, 0.12, DISHES[1].r + 0.45),
      dx: 40,
      dy: 50,
    },
    { id: "integ", text: "INTEGRATION, FIXED IN ADVANCE", at: at(ax, top - 0.1), dx: -30, dy: -40 },
    { id: "gradual", text: "SMALL, GRADUAL", at: at(ax + 0.6, ay + 0.6), dx: -40, dy: 50 },
    { id: "steep", text: "LARGE, STEEP", at: at(0.05, 0.1), dx: 60, dy: -50 },
    { id: "same", text: "SAME STEEPNESS, CLAIM 3 LOSES", at: at(0.4, 0.4), dx: 60, dy: -50 },
  ];

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const kn of knobs) kn.rotation.y = st.knob * Math.PI * 1.5;
      curves.forEach((l, i) => {
        l.visible = st.curves > 0.5;
        const kk = THREE.MathUtils.lerp(SLOPES[i], 3, st.same);
        const p = l.geometry.attributes.position;
        const pts = curvePts(kk);
        for (let j = 0; j < p.count; j++) p.setXYZ(j, pts[j].x, pts[j].y, pts[j].z);
        p.needsUpdate = true;
      });
    },
    stops: [
      // 1 · Grown networks: three dishes, small to large; the largest is wired to a game.
      (tl, t, c) => {
        tl.addLabel("dishes", t);
        tl.fromTo(
          kit.clip,
          { constant: -4.6 },
          { constant: 4.6, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-2, 0.3, 0.2)) },
          { ...xyz(V(0.5, 0.4, 0.2)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2, 3, 5)) },
          { ...xyz(view(0.4, 6.4, 8.6)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { small: 1, large: 1 }, t + 2);
        lab(tl, c, { game: 1 }, t + 2.6);
      },
      // 2 · Turn a condition: each dish's knob turns.
      (tl, t, c) => {
        tl.addLabel("knob", t);
        lab(tl, c, { game: 0 }, t);
        cam(tl, c, V(-0.6, 0.2, 1.2), view(0.4, 2.8, 5.4), t, 2.2, EASE);
        tl.fromTo(st, { knob: 0 }, { knob: 1, duration: 2, ease: "sine.inOut" }, t + 0.8);
        lab(tl, c, { knob: 1 }, t + 1.4);
      },
      // 3 · Steeper with size: the board rises, and the large culture's curve is steepest.
      (tl, t, c) => {
        tl.addLabel("steeper", t);
        lab(tl, c, { knob: 0, small: 0, large: 0 }, t);
        show(tl, board, t + 0.2, 0);
        cam(tl, c, V(-0.3, PY - 0.2, PZ), view(0.2, 1, 7.2), t, 2.4, EASE);
        tl.set(st, { curves: 1 }, t + 1);
        lab(tl, c, { integ: 1 }, t + 1.4);
        lab(tl, c, { gradual: 1, steep: 1 }, t + 2);
      },
      // 4 · How it loses: the curves fall to one steepness at every size.
      (tl, t, c) => {
        tl.addLabel("loses", t);
        lab(tl, c, { gradual: 0, steep: 0 }, t);
        cam(tl, c, V(-0.3, PY - 0.2, PZ), view(-0.6, 1.2, 7.2), t, 2, EASE);
        tl.fromTo(st, { same: 0 }, { same: 1, duration: 1.6, ease: "power2.inOut" }, t + 0.6);
        lab(tl, c, { same: 1 }, t + 2.2);
      },
    ],
  };
}
