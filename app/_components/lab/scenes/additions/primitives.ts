// Logic figure for the Primitives (D1, D2): information, relation, structure.
// One coin, tossed: heads or tails, a difference between two states. The camera pulls back
// and the coin is one of a tray of coins, each showing a side: differences only exist
// within some structure. Bridges join some coins: linked coins turn together, or always
// show opposite sides (a relation is a constraint linking states). Then the coins keep
// turning while the bridges stay put: structure is the stable pattern of relation.
// Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, show, V } from "../../tourScenes3d";

const N = 5; // the tray is N × N coins
const GAP = 1.05;
const CR = 0.36; // coin radius
const CT = 0.07; // coin thickness
const MID = 12; // the first coin, at the center of the tray

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The letters H and T as ink strokes on a coin face, in the face's own x/z plane.
function letter(ch: "H" | "T", y: number, s: number) {
  const p =
    ch === "H"
      ? [
          [-0.45, -0.6, -0.45, 0.6],
          [0.45, -0.6, 0.45, 0.6],
          [-0.45, 0, 0.45, 0],
        ]
      : [
          [-0.5, -0.6, 0.5, -0.6],
          [0, -0.6, 0, 0.6],
        ];
  // A coin seen face up: letters read with their top toward -z.
  return p.flatMap(([x0, z0, x1, z1]) => [V(x0 * s, y, z0 * s), V(x1 * s, y, z1 * s)]);
}

export function primitives(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  kit.ink.side = THREE.DoubleSide;
  const scene = new THREE.Scene();

  // The tray: a shallow board with a well for each coin.
  const W = N * GAP + 0.3;
  const trayMat = kit.surface(0.05);
  const tray = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(W, 0.14, W), trayMat);
  base.position.y = -0.11;
  tray.add(base);
  const wells: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      const x = (j - (N - 1) / 2) * GAP;
      const z = (i - (N - 1) / 2) * GAP;
      wells.push(V(x, -0.035, z));
    }
  const ringPts: THREE.Vector3[] = [];
  for (const w of wells) {
    const n = 40;
    for (let k = 0; k < n; k++) {
      const a0 = (k / n) * Math.PI * 2;
      const a1 = ((k + 1) / n) * Math.PI * 2;
      const r = CR + 0.07;
      ringPts.push(
        V(w.x + Math.cos(a0) * r, w.y + 0.002, w.z + Math.sin(a0) * r),
        V(w.x + Math.cos(a1) * r, w.y + 0.002, w.z + Math.sin(a1) * r)
      );
    }
  }
  tray.add(segments(ringPts, kit.soft));
  tray.visible = false;
  scene.add(tray);

  // The coins. Each turns about its own x axis; `a` counts half turns, heads when even.
  const rand = rng(11);
  const coinMat = kit.surface(0);
  const coinGeo = new THREE.CylinderGeometry(CR, CR, CT, 48, 1);
  const rimGeo = new THREE.TorusGeometry(CR - 0.035, 0.012, 6, 48);
  rimGeo.rotateX(Math.PI / 2);
  const coins = wells.map((w, i) => {
    const pivot = new THREE.Group();
    pivot.position.copy(w).add(V(0, CT / 2 + 0.002, 0));
    const body = new THREE.Group();
    pivot.add(body);
    body.add(new THREE.Mesh(coinGeo, coinMat));
    for (const s of [1, -1]) {
      const rim = new THREE.Mesh(rimGeo, coinMat);
      rim.position.y = (s * CT) / 2;
      body.add(rim);
    }
    body.add(segments(letter("H", CT / 2 + 0.004, CR * 0.5), kit.ink));
    // Tails, on the underside, drawn so it reads upright once the coin turns over.
    const tails = segments(letter("T", -CT / 2 - 0.004, CR * 0.5), kit.ink);
    tails.scale.z = -1;
    body.add(tails);
    pivot.visible = i === MID;
    scene.add(pivot);
    const start = i === MID ? 0 : rand() < 0.5 ? 0 : 1;
    return { pivot, body, f: { a: start }, start };
  });

  // Bridges: arched links over pairs of neighbours. Same-side links co-vary; crossed links
  // exclude, so their coins always show opposite sides.
  const idx = (r: number, c: number) => r * N + c;
  const covary: [number, number][] = [
    [idx(1, 1), idx(1, 2)],
    [idx(1, 2), idx(2, 2)],
    [idx(2, 2), idx(3, 2)],
    [idx(3, 3), idx(3, 4)],
    [idx(0, 3), idx(1, 3)],
    [idx(3, 0), idx(4, 0)],
    [idx(4, 0), idx(4, 1)],
  ];
  const exclude: [number, number][] = [
    [idx(2, 2), idx(2, 3)],
    [idx(3, 1), idx(4, 1)],
    [idx(0, 0), idx(0, 1)],
  ];
  // Fix the starting sides so every link already holds.
  const setStart = (i: number, v: number) => {
    coins[i].start = v;
    coins[i].f.a = v;
  };
  for (const [a, b] of covary) setStart(b, coins[a].start);
  for (const [a, b] of exclude) setStart(b, 1 - coins[a].start);
  // Re-run once: chains need their order respected.
  for (const [a, b] of covary) setStart(b, coins[a].start);
  setStart(MID, 0);
  for (const [a, b] of covary) setStart(b, coins[a].start);
  for (const [a, b] of exclude) setStart(b, 1 - coins[a].start);

  const bridgeMat = kit.surface(0.15);
  const H = 0.55;
  const bridge = (a: number, b: number, crossed: boolean) => {
    const pa = wells[a].clone().setY(0);
    const pb = wells[b].clone().setY(0);
    const g = new THREE.Group();
    // Two posts beside the coins, joined by a bar.
    const off = pb.clone().sub(pa).normalize();
    const side = V(-off.z, 0, off.x).multiplyScalar(CR + 0.1);
    const ends = [pa, pb].map((p) => p.clone().add(side));
    for (const e of ends) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, H, 8), bridgeMat);
      post.position.copy(e).setY(H / 2);
      g.add(post);
    }
    const len = ends[0].distanceTo(ends[1]);
    const barGeo = new THREE.CylinderGeometry(0.035, 0.035, len, 8);
    barGeo.rotateZ(Math.PI / 2);
    const bar = new THREE.Mesh(barGeo, bridgeMat);
    bar.position.copy(ends[0]).lerp(ends[1], 0.5).setY(H);
    bar.rotation.y = -Math.atan2(off.z, off.x);
    g.add(bar);
    if (crossed) {
      // A small cross on the bar marks exclusion.
      const c = bar.position.clone();
      const u = 0.12;
      g.add(
        segments(
          [
            V(c.x - u, c.y - u, c.z),
            V(c.x + u, c.y + u, c.z),
            V(c.x - u, c.y + u, c.z),
            V(c.x + u, c.y - u, c.z),
          ],
          kit.ink
        )
      );
    }
    g.visible = false;
    scene.add(g);
    return { g, a, b, top: bar.position.clone() };
  };
  const bridges = [
    ...covary.map(([a, b]) => bridge(a, b, false)),
    ...exclude.map(([a, b]) => bridge(a, b, true)),
  ];

  const midTop = V(0, CT, 0);
  const labels: Label3D[] = [
    { id: "two", text: "HEADS OR TAILS", at: midTop, dx: 90, dy: -70 },
    { id: "diff", text: "A DIFFERENCE", at: midTop, dx: -90, dy: 70 },
    {
      id: "within",
      text: "DIFFERENCES WITHIN A STRUCTURE",
      at: wells[idx(0, 4)].clone().add(V(CR, 0, -CR)),
      dx: 40,
      dy: -50,
    },
    { id: "covary", text: "CO-VARY", at: bridges[2].top, dx: -90, dy: -60 },
    { id: "exclude", text: "EXCLUDE", at: bridges[covary.length].top, dx: 90, dy: -60 },
    {
      id: "pattern",
      text: "A STABLE PATTERN OF RELATION",
      at: bridges[3].top,
      dx: 60,
      dy: -70,
    },
  ];

  const k = narrow ? 1.06 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, -0.2, 0.2);
  const wide = view(0, 6.2, 7.4);

  // Turn a set of coins together by one half turn.
  const turn = (tl: gsap.core.Timeline, ids: number[], at: number, d = 0.7) => {
    for (const i of ids) tl.to(coins[i].f, { a: `+=1`, duration: d, ease: "power2.inOut" }, at);
  };
  // Linked groups: turning a coin turns everything its bridges reach.
  const reach = (i: number) => {
    const seen = new Set([i]);
    const stack = [i];
    while (stack.length) {
      const c = stack.pop() as number;
      for (const [a, b] of [...covary, ...exclude]) {
        const o = a === c ? b : b === c ? a : -1;
        if (o >= 0 && !seen.has(o)) {
          seen.add(o);
          stack.push(o);
        }
      }
    }
    return Array.from(seen);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const c of coins) {
        const a = c.f.a;
        const frac = a - Math.floor(a);
        c.body.rotation.x = a * Math.PI;
        // A small toss while the coin turns over.
        c.pivot.position.y = wells[0].y + CT / 2 + 0.002 + Math.sin(frac * Math.PI) * 0.45;
      }
    },
    stops: [
      // 1 · One coin, tossed twice: tails, then heads. A difference between two states.
      (tl, t, c) => {
        tl.addLabel("coin", t);
        tl.set(coins[MID].f, { a: 0 }, t);
        tl.fromTo(kit.clip, { constant: -1 }, { constant: 1, duration: 1.2, ease: "power1.inOut" }, t);
        tl.set(kit.clip, { constant: 100 }, t + 1.25);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 0 },
          { ...V(0, 0.15, 0), duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-1.4, 1.2, 3.4) },
          { ...view(0, 4, 7), duration: 2.6, ease: EASE },
          t
        );
        tl.to(coins[MID].f, { a: 3, duration: 1.3, ease: "power1.inOut" }, t + 1.2);
        lab(tl, c, { two: 1 }, t + 2.4);
        tl.to(coins[MID].f, { a: 4, duration: 0.9, ease: "power1.inOut" }, t + 3.2);
        lab(tl, c, { diff: 1 }, t + 3.8);
      },
      // 2 · Pull back: the coin is one of a tray of coins, each showing a side.
      (tl, t, c) => {
        tl.addLabel("tray", t);
        lab(tl, c, { two: 0, diff: 0 }, t);
        cam(tl, c, home, wide, t, 2.6, EASE);
        show(tl, tray, t + 0.4, 0);
        coins.forEach((co, i) => {
          if (i === MID) return;
          const r = Math.abs(Math.floor(i / N) - 2) + Math.abs((i % N) - 2);
          tl.set(co.f, { a: co.start }, t);
          show(tl, co.pivot, t + 0.6 + r * 0.18, 0.5);
        });
        lab(tl, c, { within: 1 }, t + 2.4);
      },
      // 3 · Bridges join some coins. Turn one and its linked coins turn with it.
      (tl, t, c) => {
        tl.addLabel("relation", t);
        lab(tl, c, { within: 0 }, t);
        cam(tl, c, home, view(-1.4, 5.2, 6.6), t, 2, EASE);
        bridges.forEach((b, i) => {
          show(tl, b.g, t + 0.4 + i * 0.12, 0.4);
        });
        turn(tl, reach(MID), t + 2.2);
        lab(tl, c, { covary: 1, exclude: 1 }, t + 2.6);
        turn(tl, reach(MID), t + 3.6);
      },
      // 4 · The coins keep turning; the pattern of bridges stays. That pattern is structure.
      (tl, t, c) => {
        tl.addLabel("structure", t);
        lab(tl, c, { covary: 0, exclude: 0 }, t);
        cam(tl, c, home, view(1.6, 6.4, 6.8), t, 3, EASE);
        const groups: number[][] = [];
        const done = new Set<number>();
        coins.forEach((_, i) => {
          if (done.has(i)) return;
          const g = reach(i);
          for (const x of g) done.add(x);
          groups.push(g);
        });
        groups.forEach((g, j) => {
          turn(tl, g, t + 0.6 + (j % 6) * 0.35, 0.6);
          if (j % 2 === 0) turn(tl, g, t + 2.8 + (j % 5) * 0.3, 0.6);
        });
        lab(tl, c, { pattern: 1 }, t + 2.4);
      },
    ],
  };
}
