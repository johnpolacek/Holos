// Figure A7: the search for heat a star should not have. A dense field stands for the
// stars Project Hephaistos combed. Seven are ringed as candidates. Two resolve into small
// background galaxies; the rest stay ringed, unexplained so far. Then one star's light on
// a plate: its own curve, a warm bump the search covers, and a cold bump, dashed, that
// has barely been searched. Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
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
import { crosses, drawTube, makeGalaxy, rng } from "./common";

const PY = -16; // the plate row
const GW = 10;
const GH = 5;

export function aliensHephaistos(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { rings: 0, traced: 0, star: 0, warm: 0, cold: 0 };
  const r = rng(29);

  // ---------- The field ----------
  const stars: THREE.Vector3[] = [];
  for (let i = 0; i < 2600; i++)
    stars.push(V((r() - 0.5) * 22, (r() - 0.5) * 12, (r() - 0.5) * 6 - 1));
  scene.add(
    crosses(
      stars.filter((_, i) => i % 6),
      0.08,
      kit.soft
    )
  );
  scene.add(
    crosses(
      stars.filter((_, i) => !(i % 6)),
      0.13,
      kit.ink
    )
  );

  // Seven candidates, spread over the field, each ringed in ink.
  const spots = [
    V(-7.5, 3, 1.5),
    V(-4, -2.6, 1.5),
    V(-1, 2.2, 1.5),
    V(1.8, -0.6, 1.5),
    V(4.6, 3.1, 1.5),
    V(6.8, -2.4, 1.5),
    V(-6, -0.2, 1.5),
  ];
  const traced = [2, 5];
  const candidates = spots.map((p, i) => {
    const cross = crosses([p], 0.2, kit.ink);
    scene.add(cross);
    const ring = line(circlePts(0.34, 40), kit.ink, true);
    ring.position.copy(p);
    scene.add(ring);
    const softRing = line(circlePts(0.34, 40), kit.soft, true);
    softRing.position.copy(p);
    scene.add(softRing);
    let galaxy: THREE.Group | null = null;
    if (traced.includes(i)) {
      galaxy = makeGalaxy(kit, { radius: 3, count: 260, seed: 50 + i, size: 0.12 }).group;
      galaxy.scale.setScalar(0.085);
      galaxy.rotation.x = 1.1;
      galaxy.position.copy(p);
      scene.add(galaxy);
    }
    return { cross, ring, softRing, galaxy };
  });

  // ---------- One star's light, and the heat it should not have ----------
  const plate = new THREE.Group();
  plate.position.set(-GW / 2, PY, 0);
  scene.add(plate);
  const board = new THREE.Mesh(new THREE.BoxGeometry(GW + 1.2, GH + 1.2, 0.2), kit.surface(-0.4));
  board.position.set(GW / 2, GH / 2, -0.15);
  plate.add(board);
  plate.add(line([V(0, GH, 0), V(0, 0, 0), V(GW, 0, 0)], kit.ink));
  const starY = (x: number) => 4 * Math.exp(-(Math.log((x + 0.3) / 1.6) ** 2) / (2 * 0.42 ** 2));
  const bump = (x: number, c: number, w: number, h: number) =>
    h * Math.exp(-((x - c) ** 2) / (2 * w * w));
  const WARM = { c: 4.6, w: 0.6, h: 0.95 };
  const COLD = { c: 7.7, w: 0.75, h: 0.75 };
  const span = (x0: number, x1: number, f: (x: number) => number, n = 60) =>
    Array.from({ length: n }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / (n - 1);
      return V(x, 0.05 + f(x), 0.08);
    });
  const starCurve = drawTube(span(0.05, GW - 0.4, starY, 90), 0.06, kit.surface(0.1));
  plate.add(starCurve.mesh);
  const warmPts = span(2.9, 6.3, (x) => starY(x) + bump(x, WARM.c, WARM.w, WARM.h));
  const warmCurve = drawTube(warmPts, 0.06, kit.surface(-0.6));
  plate.add(warmCurve.mesh);
  const coldPts = span(5.6, 9.8, (x) => starY(x) + bump(x, COLD.c, COLD.w, COLD.h));
  const coldPairs: THREE.Vector3[] = [];
  for (let i = 0; i < coldPts.length - 1; i += 2) coldPairs.push(coldPts[i], coldPts[i + 1]);
  const coldCurve = segments(coldPairs, kit.ink);
  plate.add(coldCurve);
  const warmTop = warmPts.reduce((b, p) => (p.y > b.y ? p : b));
  const coldTop = coldPts.reduce((b, p) => (p.y > b.y ? p : b));
  const starTop = V(1.6, 0.05 + starY(1.6), 0);

  const P = (p: THREE.Vector3) => p.clone().add(plate.position);
  const labels: Label3D[] = [
    { id: "field", text: "ABOUT FIVE MILLION NEARBY STARS", at: V(-9, 5.2, -1), dx: 60, dy: -24 },
    {
      id: "seven",
      text: "SEVEN CANDIDATES",
      at: spots[4].clone().add(V(0, 0.34, 0)),
      dx: 20,
      dy: -40,
    },
    {
      id: "traced",
      text: "BACKGROUND GALAXIES",
      at: spots[2].clone().add(V(0, 0.34, 0)),
      dx: -40,
      dy: -50,
    },
    {
      id: "rest",
      text: "UNEXPLAINED SO FAR",
      at: spots[3].clone().add(V(0, -0.34, 0)),
      dx: 40,
      dy: 50,
    },
    { id: "star", text: "THE STAR'S OWN LIGHT", at: P(starTop), dx: 90, dy: -30 },
    { id: "warm", text: "WARM HEAT", at: P(warmTop), dx: 0, dy: -40 },
    { id: "cold", text: "COLD HEAT", at: P(coldTop), dx: 0, dy: -40 },
    { id: "gaia", text: "GAIA, DECEMBER 2026", at: P(V(WARM.c, 0, 0)), dx: 0, dy: 40 },
    { id: "prima", text: "PRIMA, AROUND 2033", at: P(V(COLD.c, 0, 0)), dx: 0, dy: 40 },
  ];

  const k = narrow ? 1.05 : 1;
  const graph = { t: P(V(GW / 2, GH / 2, 0)), o: V(-2.5, 1, 13.5 * k) };

  return {
    scene,
    kit,
    labels,
    update: () => {
      candidates.forEach((cand, i) => {
        const shown = st.rings * 7 > i;
        const gone = cand.galaxy && st.traced > 0.5;
        cand.ring.visible = shown && !gone;
        cand.softRing.visible = shown && !!gone;
        cand.cross.visible = !gone;
        if (cand.galaxy) cand.galaxy.visible = !!gone;
      });
      starCurve.setDraw(st.star);
      warmCurve.setDraw(st.warm);
      coldCurve.geometry.setDrawRange(0, Math.round((st.cold * coldPairs.length) / 2) * 2);
    },
    stops: [
      // 1 · Project Hephaistos combed about five million nearby stars.
      (tl, t, c) => {
        tl.addLabel("field", t);
        tl.fromTo(
          kit.clip,
          { constant: -11.5 },
          { constant: 11.5, duration: 2.2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.3);
        tl.fromTo(
          c.rig.target,
          { x: -4, y: 0, z: 0 },
          { x: 0, y: 0.3, z: 0, duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -4, y: 1, z: 16 * k },
          { x: 0, y: 0.6, z: 23 * k, duration: 2.8, ease: EASE },
          t
        );
        lab(tl, c, { field: 1 }, t + 2.4);
      },
      // 2 · Seven candidates flagged in 2024.
      (tl, t, c) => {
        tl.addLabel("seven", t);
        lab(tl, c, { field: 0 }, t);
        cam(tl, c, V(0, 0.3, 1), V(1, 0.8, 19 * k), t, 2.4, EASE);
        tl.to(st, { rings: 1, duration: 2.4, ease: "none" }, t + 0.6);
        lab(tl, c, { seven: 1 }, t + 3);
      },
      // 3 · Webb traced two to background galaxies. The rest are unexplained so far.
      (tl, t, c) => {
        tl.addLabel("traced", t);
        lab(tl, c, { seven: 0 }, t);
        cam(tl, c, V(0.6, 0.6, 1.5), V(-0.8, 0.5, 9 * k), t, 2.6, EASE);
        tl.set(st, { traced: 1 }, t + 2.2);
        lab(tl, c, { traced: 1 }, t + 2.6);
        lab(tl, c, { rest: 1 }, t + 3.2);
      },
      // 4 · A star's own light, with heat it should not have, warm or cold.
      (tl, t, c) => {
        tl.addLabel("plate", t);
        lab(tl, c, { traced: 0, rest: 0 }, t);
        cam(tl, c, graph.t, graph.o, t, 2.6, EASE);
        tl.to(st, { star: 1, duration: 1.6, ease: "none" }, t + 2);
        lab(tl, c, { star: 1 }, t + 2.8);
        tl.to(st, { warm: 1, duration: 1, ease: "none" }, t + 3.4);
        lab(tl, c, { warm: 1 }, t + 4);
        tl.to(st, { cold: 1, duration: 1, ease: "none" }, t + 4.4);
        lab(tl, c, { cold: 1 }, t + 5);
      },
      // 5 · Gaia's next release extends the warm census; PRIMA opens the cold half.
      (tl, t, c) => {
        tl.addLabel("next", t);
        lab(tl, c, { star: 0 }, t);
        cam(tl, c, P(V(GW * 0.62, GH * 0.35, 0)), V(1.5, 1.2, 11.5 * k), t, 2.4, EASE);
        lab(tl, c, { gaia: 1 }, t + 2);
        lab(tl, c, { prima: 1 }, t + 2.6);
      },
    ],
  };
}
