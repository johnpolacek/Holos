// Predictions figure, Exploration: watch, not arrive. A home system maps the stars around
// it from afar, sight lines running out to each. One target is uncertain: two models of it
// disagree. A sentinel probe goes there, parks, and waits, long dormant, with a rare dense
// report sent home. Last, a gravitational lens: light bent around a star converges far
// behind it, where a small observatory sits at the focus. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
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
} from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";
import { makeBall, makeProbe, makeRays, orbit, rand } from "../speculation/parts";

const HOME = V(-4.6, 0, 1.2);
const TARGET = V(2.6, 0, -1.8);
const LENS = V(0, 0, 6.5); // the lensing star, in front
const FOCUS = V(4.4, 0, 6.5);

export function exploration(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { sight: 0, models: 0, fly: 0, report: 0, lens: 0 };

  const star = (p: THREE.Vector3, r: number, rays = true) => {
    const g = new THREE.Group();
    g.add(makeBall(kit, r, -0.3).mesh);
    if (rays) g.add(makeRays(kit, 12, r * 1.35, r * 1.9));
    g.position.copy(p);
    scene.add(g);
    return g;
  };

  // Home: a star, an orbit, and a dish.
  star(HOME, 0.4);
  const homeOrbit = orbit(kit, 1.1);
  homeOrbit.position.copy(HOME);
  scene.add(homeOrbit);
  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 20, 8, 0, Math.PI * 2, 0, 0.8),
    kit.surface(0.1)
  );
  dish.rotation.z = -Math.PI / 2.4;
  dish.position.copy(HOME).add(V(1.1, 0, 0));
  scene.add(dish);

  // Distant stars, each reached by a sight line.
  const far = Array.from({ length: 9 }, (_, i) => {
    const a = -0.9 + i * 0.28 + (rand(i) - 0.5) * 0.15;
    const d = 5.5 + rand(i + 20) * 2.2;
    return V(HOME.x + Math.cos(a) * d, 0, HOME.z + Math.sin(a) * d * 0.55 - 1.2);
  });
  for (const p of far) star(p, 0.12, false);
  const sights = segments(
    far.flatMap((p) => [HOME.clone().add(V(1.15, 0, 0)), p]),
    kit.soft
  );
  sights.visible = false;
  scene.add(sights);

  // The target, and two models of it that disagree.
  star(TARGET, 0.32);
  const modelA = line(
    circlePts(1, 64).map((p) => V(TARGET.x + p.x, 0, TARGET.z + p.y * 0.75)),
    kit.ink,
    true
  );
  const modelB = line(
    circlePts(1.25, 64).map((p) => V(TARGET.x + p.x * 0.8 + 0.2, 0, TARGET.z + p.y)),
    kit.soft,
    true
  );
  modelA.visible = modelB.visible = false;
  scene.add(modelA, modelB);

  // The sentinel probe, its flight, and a rare dense report home.
  const probe = makeProbe(kit);
  probe.group.scale.setScalar(0.7);
  probe.group.visible = false;
  scene.add(probe.group);
  const parked = TARGET.clone().add(V(-1.2, 0.3, 0.6));
  const from = HOME.clone().add(V(1.2, 0.3, 0));
  const packet = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.16), kit.surface(0.4));
  packet.visible = false;
  scene.add(packet);

  // The gravitational lens: rays bending round a star to a focus, and an observatory there.
  const lensGroup = new THREE.Group();
  const lensStar = makeBall(kit, 0.45, -0.3);
  lensStar.mesh.position.copy(LENS);
  lensGroup.add(lensStar.mesh);
  const bent: THREE.Vector3[][] = [-1, 1].flatMap((s) =>
    [0.55, 0.75].map((b) => [
      V(LENS.x - 3.6, 0, LENS.z + s * b),
      V(LENS.x - 0.4, 0, LENS.z + s * b),
      V(LENS.x + 0.4, 0, LENS.z + s * b * 0.92),
      FOCUS.clone(),
    ])
  );
  for (const pts of bent) lensGroup.add(line(pts, kit.soft));
  const obs = makeProbe(kit);
  obs.group.position.copy(FOCUS).add(V(0.5, 0, 0));
  obs.group.rotation.y = Math.PI;
  obs.group.scale.setScalar(0.6);
  lensGroup.add(obs.group);
  lensGroup.visible = false;
  scene.add(lensGroup);

  const labels: Label3D[] = [
    { id: "home", text: "HOME", at: HOME.clone().add(V(0, 0.4, 0)), dx: -30, dy: -40 },
    { id: "afar", text: "MAPPED FROM AFAR", at: far[6], dx: 40, dy: -40 },
    {
      id: "diverge",
      text: "WHERE MODELS DISAGREE",
      at: V(TARGET.x + 1, 0, TARGET.z),
      dx: 60,
      dy: -40,
    },
    { id: "sentinel", text: "A SENTINEL, WAITING", at: parked, dx: -60, dy: -50 },
    { id: "report", text: "A RARE, DENSE REPORT", at: packet.position, dx: 30, dy: 50 },
    {
      id: "lens",
      text: "A STAR'S GRAVITY AS A LENS",
      at: LENS.clone().add(V(0, 0.45, 0)),
      dx: -40,
      dy: -50,
    },
    {
      id: "focus",
      text: "AN OBSERVATORY AT THE FOCUS",
      at: FOCUS.clone().add(V(0.5, 0.2, 0)),
      dx: 20,
      dy: -50,
    },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const map = V(-0.6, 0, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      sights.visible = st.sight > 0.5;
      modelA.visible = modelB.visible = st.models > 0.5;
      probe.group.visible = st.fly > 0.01;
      probe.group.position.lerpVectors(from, parked, Math.min(st.fly, 1));
      probe.group.rotation.y = -0.4;
      probe.eye.scale.setScalar(
        st.fly >= 1 ? 0.6 + 0.4 * Math.max(0, Math.sin(time * 0.6)) ** 8 : 1
      );
      packet.visible = st.report > 0.01 && st.report < 0.99;
      packet.position.lerpVectors(parked, from, st.report);
      lensGroup.visible = st.lens > 0.5;
    },
    stops: [
      // 1 · Mapped from afar: home, and sight lines out to the stars around it.
      (tl, t, c) => {
        tl.addLabel("map", t);
        tl.fromTo(
          kit.clip,
          { constant: HOME.x - 1.5 },
          { constant: 6.5, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(c.rig.target, { ...xyz(HOME) }, { ...xyz(map), duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-1, 4, 5)) },
          { ...xyz(view(0, 10, 8.6)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { home: 1 }, t + 1.6);
        tl.set(st, { sight: 1 }, t + 2.2);
        lab(tl, c, { afar: 1 }, t + 2.8);
      },
      // 2 · Where models disagree: two outlines of one target do not match.
      (tl, t, c) => {
        tl.addLabel("diverge", t);
        lab(tl, c, { afar: 0, home: 0 }, t);
        cam(tl, c, TARGET, view(0.4, 5.4, 5.4), t, 2.4, EASE);
        tl.set(st, { models: 1 }, t + 1);
        lab(tl, c, { diverge: 1 }, t + 1.6);
      },
      // 3 · A sentinel: the probe goes, parks, waits, and sends one dense report home.
      (tl, t, c) => {
        tl.addLabel("sentinel", t);
        lab(tl, c, { diverge: 0 }, t);
        cam(tl, c, map, view(0, 9, 8.6), t, 2.4, EASE);
        tl.fromTo(st, { fly: 0 }, { fly: 1, duration: 2.2, ease: "power1.inOut" }, t + 0.6);
        lab(tl, c, { sentinel: 1 }, t + 2.8);
        tl.fromTo(st, { report: 0 }, { report: 0.55, duration: 1.2, ease: "none" }, t + 3.4);
        lab(tl, c, { report: 1 }, t + 3.8);
      },
      // 4 · A gravitational lens: light bends round a star to an observatory at the focus.
      (tl, t, c) => {
        tl.addLabel("lens", t);
        lab(tl, c, none, t);
        tl.set(st, { report: 0 }, t);
        show(tl, lensGroup, t + 0.4, 0);
        tl.set(st, { lens: 1 }, t + 0.4);
        cam(tl, c, V(1.8, 0, LENS.z), view(0, 7.6, 5.4), t, 2.6, EASE);
        lab(tl, c, { lens: 1 }, t + 1.8);
        lab(tl, c, { focus: 1 }, t + 2.4);
      },
    ],
  };
}
