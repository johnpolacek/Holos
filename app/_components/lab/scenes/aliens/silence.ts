// Figure A1: the silent galaxy and two ways a civilization could go. An engraved spiral
// galaxy, quiet. First the usual picture: one civilization spreads star to star, a growing
// frontier. Then the Integration Hypothesis: the spread draws back and the civilization
// closes in around its home star. Last, a plate charts how visible each path is over time.
// Stops tween only plain state.

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
import { drawTube, makeGalaxy, makeGlobe, makeStar } from "./common";

const GRAPH = V(30, 0, 0);
const GW = 10;
const GH = 5.4;
const SPREAD = 5.2;

export function aliensSilence(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, 0, -1);
  const scene = new THREE.Scene();
  const st = { spread: 0, home: 0, curves: 0, spin: 0 };

  const galaxy = makeGalaxy(kit, { radius: 6, count: 1500, seed: 11 });
  scene.add(galaxy.group);

  // Home: the bright star closest to a chosen spot in the near arm.
  const spot = V(3.4, 0, 2.4);
  const home = galaxy.bright.reduce((b, p) => (p.distanceTo(spot) < b.distanceTo(spot) ? p : b));

  // Settled stars, nearest first, each marked by a small ink ring. Reveal by draw range.
  const settled = galaxy.stars
    .filter((p) => p.distanceTo(home) < SPREAD && p !== home)
    .sort((a, b) => a.distanceTo(home) - b.distanceTo(home));
  const ringPairs: THREE.Vector3[] = [];
  const ring = circlePts(0.09, 8);
  for (const p of settled) {
    for (let i = 0; i < 8; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % 8];
      ringPairs.push(V(p.x + a.x, p.y, p.z + a.y), V(p.x + b.x, p.y, p.z + b.y));
    }
  }
  const settledMarks = segments(ringPairs, kit.ink);
  scene.add(settledMarks);
  const frontier = line(
    circlePts(1, 96).map((p) => V(p.x, 0, p.y)),
    kit.ink,
    true
  );
  frontier.position.copy(home);
  scene.add(frontier);

  // Home star with a closed shell around it: growth turned inward.
  const homeStar = makeStar(kit, 0.12, 10);
  homeStar.position.copy(home);
  homeStar.visible = false;
  scene.add(homeStar);
  const shell = makeGlobe(kit, 0.32, 8);
  shell.position.copy(home);
  shell.visible = false;
  scene.add(shell);

  // The plate: how easy each path is to see, over time.
  const plate = new THREE.Group();
  plate.position.copy(GRAPH);
  scene.add(plate);
  const board = new THREE.Mesh(new THREE.BoxGeometry(GW + 1.2, GH + 1.2, 0.2), kit.surface(-0.4));
  board.position.set(GW / 2, GH / 2, -0.15);
  plate.add(board);
  plate.add(line([V(0, GH, 0), V(0, 0, 0), V(GW, 0, 0)], kit.ink));
  const arrows: THREE.Vector3[] = [
    V(GW, 0, 0),
    V(GW - 0.25, 0.12, 0),
    V(GW, 0, 0),
    V(GW - 0.25, -0.12, 0),
    V(0, GH, 0),
    V(0.12, GH - 0.25, 0),
    V(0, GH, 0),
    V(-0.12, GH - 0.25, 0),
  ];
  plate.add(segments(arrows, kit.ink));
  const expansionPts = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * (GW - 0.6);
    return V(x, 0.15 + (GH - 0.6) * (1 / (1 + Math.exp(-(x - 3.4) * 1.1))), 0.05);
  });
  const expansion = new THREE.Group();
  for (let i = 0; i < expansionPts.length - 1; i++)
    if (i % 2 === 0) expansion.add(line([expansionPts[i], expansionPts[i + 1]], kit.ink));
  plate.add(expansion);
  const integrationPts = Array.from({ length: 50 }, (_, i) => {
    const x = (i / 49) * (GW - 0.6);
    const rise = 1 / (1 + Math.exp(-(x - 2.4) * 2.2));
    const fall = Math.exp(-Math.max(x - 3.2, 0) * 0.75);
    return V(x, 0.15 + 2.6 * rise * fall, 0.08);
  });
  const integration = drawTube(integrationPts, 0.07, kit.surface(0.1));
  plate.add(integration.mesh);
  const peak = integrationPts.reduce((b, p) => (p.y > b.y ? p : b));

  const P = (p: THREE.Vector3) => p.clone().add(GRAPH);
  const labels: Label3D[] = [
    { id: "quiet", text: "A QUIET GALAXY", at: V(-4.6, 0, -2.6), dx: -30, dy: -70 },
    { id: "spread", text: "SPREADING STAR TO STAR", at: V(0, 0, 0), dx: 70, dy: -80 },
    { id: "home", text: "STAYS NEAR HOME", at: home, dx: 90, dy: -60 },
    {
      id: "expansion",
      text: "EXPANSION",
      at: P(expansionPts[30]),
      dx: -70,
      dy: -40,
    },
    { id: "loud", text: "LOUD", at: P(peak), dx: 0, dy: -40 },
    {
      id: "integration",
      text: "INTEGRATION, GOING QUIET",
      at: P(integrationPts[34]),
      dx: 30,
      dy: -50,
    },
    { id: "seen", text: "EASE OF SEEING", at: P(V(0, GH * 0.8, 0)), dx: 70, dy: -30 },
    { id: "time", text: "TIME", at: P(V(GW, 0, 0)), dx: -20, dy: 28 },
  ];
  const spreadLabel = labels[1].at;

  const k = narrow ? 0.95 : 1;
  const wide = { t: V(0, -0.4, 0.3), o: V(0, 9.5 * k, 11.5 * k) };
  const close = { t: home.clone(), o: V(0.4, 2.2 * k, 4.2 * k) };
  const graph = { t: P(V(GW / 2, GH / 2, 0)), o: V(-3, 1.2, 14 * k) };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const n = Math.round(settled.length * st.spread);
      settledMarks.geometry.setDrawRange(0, n * 16);
      const fr = Math.max(n > 0 ? settled[n - 1].distanceTo(home) : 0, 0.05);
      frontier.scale.setScalar(fr + 0.15);
      frontier.visible = st.spread > 0.01;
      spreadLabel.copy(home).add(V(-fr * 0.7, 0, -fr * 0.7));
      shell.rotation.y = time * 0.3;
      shell.scale.setScalar(Math.max(st.home, 0.01));
      integration.setDraw(st.curves);
    },
    stops: [
      // 1 · Vast, old, and quiet.
      (tl, t, c) => {
        tl.addLabel("quiet", t);
        tl.fromTo(
          kit.clip,
          { constant: -7 },
          { constant: 8, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.fromTo(c.rig.target, { x: 0, y: 0, z: 0 }, { ...wide.t, duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { x: -5, y: 3, z: 10 * k },
          { ...wide.o, duration: 3, ease: EASE },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.7);
        lab(tl, c, { quiet: 1 }, t + 2.4);
      },
      // 2 · The usual picture: one civilization spreads and grows easier to see.
      (tl, t, c) => {
        tl.addLabel("spread", t);
        lab(tl, c, { quiet: 0 }, t);
        cam(tl, c, V(home.x * 0.5, -0.4, home.z * 0.4), V(0, 6.5 * k, 12.5 * k), t, 2.4, EASE);
        tl.to(st, { spread: 1, duration: 4, ease: "power1.in" }, t + 0.6);
        lab(tl, c, { spread: 1 }, t + 3.6);
      },
      // 3 · The Integration Hypothesis: the spread draws back, the civilization closes in.
      (tl, t, c) => {
        tl.addLabel("inward", t);
        lab(tl, c, { spread: 0 }, t);
        tl.to(st, { spread: 0, duration: 2.4, ease: "power2.inOut" }, t);
        tl.set(homeStar, { visible: true }, t + 1);
        tl.set(shell, { visible: true }, t + 1.6);
        cam(tl, c, close.t, close.o, t + 0.6, 3, EASE);
        tl.to(st, { home: 1, duration: 1.4, ease: "back.out(1.6)" }, t + 2.2);
        lab(tl, c, { home: 1 }, t + 3.4);
      },
      // 4 · Ease of seeing over time: expansion keeps rising, integration rises then falls.
      (tl, t, c) => {
        tl.addLabel("graph", t);
        lab(tl, c, { home: 0 }, t);
        cam(tl, c, graph.t, graph.o, t, 2.4, EASE);
        lab(tl, c, { seen: 1, time: 1 }, t + 2);
        lab(tl, c, { expansion: 1 }, t + 2.6);
        tl.to(st, { curves: 1, duration: 3, ease: "none" }, t + 2.8);
        lab(tl, c, { loud: 1 }, t + 3.6);
        lab(tl, c, { integration: 1 }, t + 5.4);
      },
    ],
  };
}
