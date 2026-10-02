// Figure A2: going quiet. A young world leaks radio rings. Pulled back, its loud phase is
// a short clean block on a long hatched beam of cosmic time, the only stretch SETI searches.
// Below, home and a colony ten light-years apart: a signal takes ten years each way, the
// tether between them breaks, and the colony opens its own aperture. Last, two messages
// pass between them: one structured, one perfectly compressed, which looks like noise.
// Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  dashed,
  type Label3D,
  lab,
  line,
  makeIris,
  V,
} from "../../tourScenes3d";
import { makeBeam, makeRings, makeStar, rng } from "./common";

const Y2 = -12; // the home and colony row
const HX = -5;
const CX = 5;

export function aliensGoingQuiet(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { radio: 1, pulse: 0, tether: 1, open: 0, bars: 0 };

  // ---------- The loud window on cosmic time ----------
  const world = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 20), kit.surface(0.1));
  world.position.set(0.3, 1.5, 0);
  scene.add(world);
  const rings = makeRings(kit, 5, 3.2);
  rings.group.position.copy(world.position);
  scene.add(rings.group);
  const timeline = makeBeam(kit, -4, 22, { tone: 0.55, tick: 1 });
  scene.add(timeline.group);
  const loud = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.42, 1.0), kit.surface(-0.8));
  loud.position.set(0.3, -0.12, 0);
  scene.add(loud);
  scene.add(line([V(0.3, 0.1, 0), V(0.3, 1.05, 0)], kit.soft));

  // ---------- Home and a colony, ten light-years apart ----------
  const homeStar = makeStar(kit, 0.36);
  homeStar.position.set(HX, Y2, 0);
  const colonyStar = makeStar(kit, 0.36);
  colonyStar.position.set(CX, Y2, 0);
  scene.add(homeStar, colonyStar);
  const planet = (x: number) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), kit.surface(0.1));
    m.position.set(x, Y2 + 0.05, 0.1);
    scene.add(m);
    return m.position;
  };
  const hp = planet(HX + 0.95);
  const cp = planet(CX - 0.95);
  const ruler = makeBeam(kit, HX, CX, { h: 0.14, d: 0.3, tone: 0.2, tick: 1 });
  ruler.group.position.y = Y2 - 1.0;
  scene.add(ruler.group);
  const rulerEnds = new THREE.Group();
  for (const x of [HX, CX])
    rulerEnds.add(line([V(x, Y2 - 1.3, 0.16), V(x, Y2 - 0.7, 0.16)], kit.ink));
  scene.add(rulerEnds);
  const tether = line([hp, cp], kit.ink);
  scene.add(tether);
  // Once control breaks, only aimed messages cross the gap.
  const aimed = dashed(hp, cp, kit.soft, 0.12);
  aimed.visible = false;
  scene.add(aimed);
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), kit.ink);
  scene.add(pulse);
  const iris = makeIris(kit, 0.16);
  iris.setOpen(0);
  iris.group.position.set(CX - 0.95, Y2 + 0.75, 0.15);
  iris.group.visible = false;
  scene.add(iris.group);

  // ---------- Two messages: structured, and perfectly compressed ----------
  const N = 36;
  const r = rng(5);
  const motif = [0.7, 0.2, 0.45, 0.2, 0.7, 0.2, 0.2, 0.45, 0.2];
  const strip = (base: number, height: (i: number) => number, tone: number) => {
    const g = new THREE.Group();
    const mat = kit.surface(tone);
    for (let i = 0; i < N; i++) {
      const h = height(i);
      const geo = new THREE.BoxGeometry(0.13, h, 0.2);
      geo.translate(0, h / 2, 0);
      const b = new THREE.Mesh(geo, mat);
      b.position.set(-3.5 + i * 0.2, base, 0);
      g.add(b);
    }
    g.add(line([V(-3.65, base, 0.1), V(3.65, base, 0.1)], kit.ink));
    scene.add(g);
    return g;
  };
  const structured = strip(Y2 - 1.5, (i) => motif[i % motif.length], -0.3);
  const compressed = strip(Y2 - 3.0, () => 0.12 + r() * 0.6, 0.3);
  const bars = [structured, compressed];

  const labels: Label3D[] = [
    { id: "radio", text: "RADIO LEAKING OUT", at: V(1.6, 2.6, 0), dx: 90, dy: -40 },
    { id: "window", text: "THE WINDOW SETI SEARCHES", at: V(0.3, -0.33, 0.5), dx: 40, dy: 60 },
    { id: "cosmic", text: "COSMIC TIME", at: V(20, -0.3, 0.45), dx: -30, dy: 50 },
    { id: "distance", text: "TEN LIGHT-YEARS", at: V(0, Y2 - 1.15, 0.15), dx: 0, dy: 40 },
    { id: "round", text: "TEN YEARS EACH WAY", at: V(0, Y2 + 0.05, 0), dx: 0, dy: -60 },
    { id: "home", text: "HOME", at: V(HX, Y2 + 0.6, 0), dx: 0, dy: -36 },
    { id: "own", text: "ITS OWN CIVILIZATION", at: iris.group.position, dx: -30, dy: -60 },
    { id: "structured", text: "STRUCTURED", at: V(0, Y2 - 1.55, 0.1), dx: 0, dy: 24 },
    {
      id: "compressed",
      text: "PERFECTLY COMPRESSED, LIKE NOISE",
      at: V(0, Y2 - 3.05, 0.1),
      dx: 0,
      dy: 24,
    },
  ];

  const k = narrow ? 1.05 : 1;
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      rings.set(time, st.radio);
      // Light crosses at a steady pace: out to the colony, then back.
      const f = (time * 0.2) % 1;
      const leg = f < 0.5 ? f * 2 : 2 - f * 2;
      tmp.copy(hp).lerp(cp, leg);
      pulse.position.copy(tmp);
      pulse.visible = st.pulse > 0.5;
      tether.visible = st.tether > 0.5;
      aimed.visible = !tether.visible;
      iris.setOpen(st.open);
      bars.forEach((g, gi) => {
        g.children.forEach((b, i) => {
          const s = Math.min(Math.max(st.bars * (N + 8) - i - gi * 4, 0.01), 1);
          b.scale.y = b instanceof THREE.Mesh ? s : 1;
        });
        g.visible = st.bars > 0.001;
      });
    },
    stops: [
      // 1 · Young civilizations are loud.
      (tl, t, c) => {
        tl.addLabel("loud", t);
        tl.fromTo(
          kit.clip,
          { constant: -1.5 },
          { constant: 2.5, duration: 1.6, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.7);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 1, z: 0 },
          { x: 0.8, y: 1.3, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -2, y: 0.5, z: 5 * k },
          { x: 0, y: 0.8, z: 9 * k, duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { radio: 1 }, t + 2);
      },
      // 2 · On cosmic timescales that phase is brief: the window SETI searches.
      (tl, t, c) => {
        tl.addLabel("window", t);
        lab(tl, c, { radio: 0 }, t);
        cam(tl, c, V(8.5, 0.6, 0), V(0, 1.5, 30 * k), t, 3, EASE);
        tl.to(st, { radio: 0, duration: 1.5, ease: "power1.in" }, t + 2.4);
        lab(tl, c, { window: 1 }, t + 2.4);
        lab(tl, c, { cosmic: 1 }, t + 3);
      },
      // 3 · A colony ten light-years away: ten years for word to arrive, ten to answer.
      (tl, t, c) => {
        tl.addLabel("lag", t);
        lab(tl, c, { window: 0, cosmic: 0 }, t);
        cam(tl, c, V(0, Y2 - 0.3, 0), V(0, 1, 15 * k), t, 2.6, EASE);
        tl.set(st, { pulse: 1 }, t + 2);
        lab(tl, c, { home: 1, distance: 1 }, t + 2.2);
        lab(tl, c, { round: 1 }, t + 3);
      },
      // 4 · It cannot be steered from home, so it becomes a civilization of its own.
      (tl, t, c) => {
        tl.addLabel("own", t);
        lab(tl, c, { round: 0, distance: 0 }, t);
        tl.set(st, { pulse: 0, tether: 0 }, t + 0.6);
        cam(tl, c, V(2, Y2 + 0.2, 0), V(-1.5, 1, 11 * k), t, 2.4, EASE);
        tl.set(iris.group, { visible: true }, t + 1.2);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 1.2);
        lab(tl, c, { own: 1 }, t + 2.2);
      },
      // 5 · Messages between them are aimed and compressed. Perfect compression looks like noise.
      (tl, t, c) => {
        tl.addLabel("signal", t);
        lab(tl, c, { own: 0, home: 0 }, t);
        tl.to(ruler.group.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.5 }, t);
        tl.set(ruler.group, { visible: false }, t + 0.5);
        tl.set(rulerEnds, { visible: false }, t);
        tl.set(st, { pulse: 1 }, t + 0.4);
        cam(tl, c, V(0, Y2 - 1.4, 0), V(0, 0.8, 13 * k), t, 2.4, EASE);
        tl.to(st, { bars: 1, duration: 2.6, ease: "none" }, t + 1.2);
        lab(tl, c, { structured: 1 }, t + 2.4);
        lab(tl, c, { compressed: 1 }, t + 3.2);
      },
    ],
  };
}
