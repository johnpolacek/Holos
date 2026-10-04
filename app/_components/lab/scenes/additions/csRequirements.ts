// Overview, Consciousness: the four requirements, in plain terms. One small network of
// parts on a plinth. Its parts link up and act as one (integration). Its parts light in
// ever-changing patterns (differentiation). It trails back through time as one bundle
// (temporal cohesion). Beside it stands a small world, and inside it a faint model of that
// world (aboutness). With all four, an aperture opens. A closed loop beside it, modelling
// nothing, stays dark. Stops tween only `st`, the rig, labels, and visibility.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, circlePts, type Label3D, lab, line, makeIris, segments, V } from "../../tourScenes3d";
import { drawIn, growLine, growSegments, seeded } from "../consciousness/common";

const CY = 1.45; // the network's centre height
const TRAIL = 3.4; // how far back in time the trails reach

export function csRequirements(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { links: 0, diff: 0, trail: 0, world: 0, model: 0, open: 0, loop: 0 };
  const rand = seeded(23);
  const WX = narrow ? 2.55 : 3.1; // the world
  const LX = narrow ? -2.55 : -3.1; // the closed loop

  const plinth = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(LX) + WX + 2.6, 0.16, 2.4), kit.surface(0.2));
  plinth.position.set((LX + WX) / 2, -0.08, 0);
  scene.add(plinth);

  // The network: parts spread through a rounded body, kept apart so each reads.
  const pts: THREE.Vector3[] = [];
  let guard = 0;
  while (pts.length < 44 && guard++ < 20000) {
    const d = V(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    if (d.lengthSq() > 1) continue;
    const p = V(d.x * 1.15, CY + d.y * 0.8, d.z * 0.7);
    if (pts.every((q) => q.distanceTo(p) > 0.27)) pts.push(p);
  }
  const net = new THREE.Group();
  scene.add(net);
  const nodeGeo = new THREE.SphereGeometry(0.065, 12, 10);
  const litGeo = new THREE.SphereGeometry(0.072, 12, 10);
  const nodeMat = kit.surface(-0.4);
  const nodes = pts.map((p, i) => {
    const m = new THREE.Mesh(nodeGeo, nodeMat);
    m.position.copy(p);
    net.add(m);
    const lit = new THREE.Mesh(litGeo, kit.ink);
    lit.position.copy(p);
    lit.visible = false;
    net.add(lit);
    return { m, lit, p, seed: rand() * 100, i };
  });

  // Links to near neighbours, grown from the middle out.
  const pairs: [number, number][] = [];
  const seen = new Set<string>();
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          pairs.push([i, j]);
        }
      });
  });
  const centre = V(0, CY, 0);
  pairs.sort(
    (a, b) =>
      pts[a[0]].distanceTo(centre) + pts[a[1]].distanceTo(centre) -
      (pts[b[0]].distanceTo(centre) + pts[b[1]].distanceTo(centre))
  );
  const links = segments(
    pairs.flatMap(([a, b]) => [pts[a], pts[b]]),
    kit.ink
  );
  growSegments(links, 0);
  net.add(links);

  // Time: each part trails back as one bundle.
  const trails = pts.map((p, i) => {
    const n = 40;
    const ps = Array.from({ length: n }, (_, k) => {
      const u = k / (n - 1);
      return V(
        p.x - u * TRAIL,
        p.y + 0.06 * Math.sin(u * 5 + i * 0.7) * u,
        p.z + 0.06 * Math.cos(u * 4 + i * 1.3) * u
      );
    });
    const l = line(ps, kit.soft);
    growLine(l, 0);
    scene.add(l);
    return l;
  });
  const timeArrow = new THREE.Group();
  timeArrow.add(line([V(-0.4, 0.02, 1.05), V(-TRAIL - 0.2, 0.02, 1.05)], kit.ink));
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 12), kit.ink);
  tip.position.set(0, 0.02, 1.05);
  tip.rotation.z = -Math.PI / 2;
  timeArrow.add(tip);
  timeArrow.visible = false;
  scene.add(timeArrow);

  // A small world beside it: ground, a house, a tree.
  const makeWorld = (asModel: boolean) => {
    const g = new THREE.Group();
    const add = (geo: THREE.BufferGeometry, pos: THREE.Vector3, rotY = 0) => {
      if (asModel) {
        const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), kit.ink);
        e.position.copy(pos);
        e.rotation.y = rotY;
        g.add(e);
      } else {
        const m = new THREE.Mesh(geo, kit.surface(0.05));
        m.position.copy(pos);
        m.rotation.y = rotY;
        g.add(m);
      }
    };
    add(new THREE.CylinderGeometry(0.95, 0.95, 0.1, asModel ? 16 : 48), V(0, 0.05, 0));
    add(new THREE.BoxGeometry(0.55, 0.45, 0.5), V(-0.25, 0.325, 0.05), 0.3);
    add(new THREE.ConeGeometry(0.46, 0.34, 4), V(-0.25, 0.72, 0.05), 0.3 + Math.PI / 4);
    add(new THREE.CylinderGeometry(0.05, 0.06, 0.45, 8), V(0.45, 0.32, -0.15));
    add(new THREE.IcosahedronGeometry(0.28, 0), V(0.45, 0.75, -0.15));
    return g;
  };
  const world = makeWorld(false);
  world.position.set(WX, 0, 0);
  world.visible = false;
  scene.add(world);
  const model = makeWorld(true);
  model.scale.setScalar(0.5);
  model.position.set(0, CY - 0.3, 0.05);
  model.visible = false;
  net.add(model);

  // The aperture above the network.
  const iris = makeIris(kit, 0.24);
  iris.setOpen(0);
  iris.group.position.set(0, CY + 1.65, 0);
  iris.group.visible = false;
  scene.add(iris.group);

  // A closed loop: parts in a ring, a pulse running round, no world in it.
  const ringPts = circlePts(0.62, 12).map((p) => V(LX + p.x, CY - 0.3 + p.y, 0));
  const loopG = new THREE.Group();
  for (const p of ringPts) {
    const m = new THREE.Mesh(nodeGeo, nodeMat);
    m.position.copy(p);
    loopG.add(m);
  }
  loopG.add(line(ringPts, kit.ink, true));
  const runner = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), kit.ink);
  loopG.add(runner);
  loopG.visible = false;
  scene.add(loopG);
  // Its empty place for an aperture, never opened.
  const noIris = new THREE.Group();
  noIris.add(line(circlePts(0.24, 48), kit.soft, true));
  noIris.position.set(LX, CY + 1.0, 0);
  loopG.add(noIris);

  const labels: Label3D[] = [
    { id: "one", text: "THE PARTS ACT AS ONE", at: V(0.9, CY + 0.6, 0.2), dx: 80, dy: -70 },
    { id: "many", text: "MANY DIFFERENT STATES", at: V(0.8, CY + 0.5, 0.3), dx: 80, dy: -70 },
    { id: "time", text: "HOLDS TOGETHER OVER TIME", at: V(-2.2, CY + 0.4, 0), dx: -10, dy: -110 },
    { id: "world", text: "A WORLD BEYOND IT", at: V(WX, 0.9, 0), dx: 10, dy: -90 },
    { id: "model", text: "A MODEL OF IT, INSIDE", at: V(-0.15, CY + 0.15, 0.1), dx: -80, dy: 150 },
    { id: "aperture", text: "AN APERTURE", at: iris.group.position, dx: 120, dy: -20 },
    { id: "loop", text: "A CLOSED LOOP, NO WORLD", at: V(LX, CY - 0.95, 0.2), dx: 0, dy: 60 },
  ];

  const back = narrow ? 1.12 : 1;
  const home = { t: V(0, CY + 0.25, 0), o: V(0, 1.2 * back, 9.6 * back) };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      growSegments(links, st.links);
      // A pulse runs out through the joined parts from the middle.
      const k = Math.floor(time * 1.4);
      for (const n of nodes) {
        const wave = Math.max(0, Math.sin(time * 3 - n.p.distanceTo(centre) * 3.5)) ** 6;
        n.m.scale.setScalar(1 + 0.5 * wave * st.links * (1 - st.diff));
        // Differentiation: a changing pattern of parts lit and dark.
        const h = Math.sin(n.seed + k * 12.9898) * 43758.5453;
        n.lit.visible = st.diff > 0.5 && h - Math.floor(h) > 0.55;
      }
      trails.forEach((l) => {
        growLine(l, st.trail);
      });
      iris.setOpen(st.open);
      const a = time * 1.6;
      runner.position.set(LX + Math.cos(a) * 0.62, CY - 0.3 + Math.sin(a) * 0.62, 0);
    },
    stops: [
      // 1 · Integration: the parts link up and act as one.
      (tl, t, c) => {
        tl.addLabel("integration", t);
        drawIn(tl, kit, -4.6, 4.6, t, 2);
        tl.fromTo(c.rig.target, { x: 0, y: CY, z: 0 }, { ...home.t, duration: 2.6, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { x: -1.5, y: 0.6, z: 6.5 * back },
          { x: 0, y: 0.9 * back, z: 7.4 * back, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(st, { links: 0 }, { links: 1, duration: 2, ease: "power1.inOut" }, t + 0.8);
        lab(tl, c, { one: 1 }, t + 2.4);
      },
      // 2 · Differentiation: the whole takes many different states.
      (tl, t, c) => {
        tl.addLabel("differentiation", t);
        lab(tl, c, { one: 0 }, t);
        cam(tl, c, home.t, V(0.6, 1.2 * back, 7.2 * back), t, 2, EASE);
        tl.set(st, { diff: 1 }, t + 0.8);
        lab(tl, c, { many: 1 }, t + 1.6);
      },
      // 3 · Temporal cohesion: it trails back through time as one bundle.
      (tl, t, c) => {
        tl.addLabel("time", t);
        lab(tl, c, { many: 0 }, t);
        tl.set(st, { diff: 0 }, t + 0.4);
        tl.set(kit.clip, { constant: 100 }, t);
        cam(tl, c, V(-1.3, CY, 0), V(2.4, 2.4 * back, 8.6 * back), t, 2.2, EASE);
        tl.set(timeArrow, { visible: true }, t + 0.8);
        tl.fromTo(st, { trail: 0 }, { trail: 1, duration: 1.8, ease: "power1.inOut" }, t + 0.8);
        lab(tl, c, { time: 1 }, t + 2.2);
      },
      // 4 · Aboutness: a world beyond it, and a model of that world inside it.
      (tl, t, c) => {
        tl.addLabel("aboutness", t);
        lab(tl, c, { time: 0 }, t);
        tl.to(st, { trail: 0, duration: 0.8, ease: "power1.in" }, t);
        tl.set(timeArrow, { visible: false }, t + 0.8);
        cam(tl, c, V(1.4, CY - 0.1, 0), V(0, 1.2 * back, 9 * back), t, 2.2, EASE);
        tl.set(world, { visible: true }, t + 0.8);
        tl.fromTo(world.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.4)" }, t + 0.8);
        lab(tl, c, { world: 1 }, t + 1.6);
        tl.set(model, { visible: true }, t + 2);
        tl.fromTo(model.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 0.5, y: 0.5, z: 0.5, duration: 0.9, ease: "power2.out" }, t + 2);
        lab(tl, c, { model: 1 }, t + 2.6);
      },
      // 5 · All four: an aperture opens. A closed loop that models no world stays dark.
      (tl, t, c) => {
        tl.addLabel("all", t);
        lab(tl, c, { world: 0, model: 0 }, t);
        cam(tl, c, home.t, home.o, t, 2.2, EASE);
        tl.set(iris.group, { visible: true }, t + 0.8);
        tl.fromTo(st, { open: 0 }, { open: 1, duration: 1.2, ease: "power2.out" }, t + 0.8);
        lab(tl, c, { aperture: 1 }, t + 1.6);
        tl.set(loopG, { visible: true }, t + 1.8);
        tl.fromTo(loopG.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.4)" }, t + 1.8);
        lab(tl, c, { loop: 1 }, t + 2.6);
      },
    ],
  };
}
