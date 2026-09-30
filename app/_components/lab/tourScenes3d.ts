// Rough 3D previs scenes for the tour animatic, drawn by the shared engraved renderer.
// Each chapter builds one scene; each stop adds its tweens to the controller's timeline.
// Stops only tween plain state (the camera rig, label opacities, `st` values), so any
// stop can be reached by fast-forwarding the ones before it.

import type gsap from "gsap";
import * as THREE from "three";
import { type Kit, makeKit, type Rig } from "./engrave3d";

export type Label3D = {
  id: string;
  text: string;
  at: THREE.Vector3;
  dx: number;
  dy: number;
  italic?: boolean;
};

export type StopCtx = {
  rig: Rig;
  labels: Record<string, number>;
  caption: { text: string; o: number };
};

export type Built3D = {
  scene: THREE.Scene;
  kit: Kit;
  labels: Label3D[];
  update: (time: number) => void;
  stops: ((tl: gsap.core.Timeline, at: number, c: StopCtx) => void)[];
};

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

// ---------- Timeline helpers ----------

function cam(
  tl: gsap.core.Timeline,
  c: StopCtx,
  target: THREE.Vector3 | null,
  offset: THREE.Vector3 | null,
  at: number,
  duration = 2,
  ease = "power2.inOut"
) {
  if (target) tl.to(c.rig.target, { x: target.x, y: target.y, z: target.z, duration, ease }, at);
  if (offset) tl.to(c.rig.offset, { x: offset.x, y: offset.y, z: offset.z, duration, ease }, at);
}
function lab(tl: gsap.core.Timeline, c: StopCtx, values: Record<string, number>, at: number) {
  tl.to(c.labels, { ...values, duration: 0.5 }, at);
}
function caption(tl: gsap.core.Timeline, c: StopCtx, text: string, at: number) {
  if (text) {
    tl.set(c.caption, { text }, at);
    tl.to(c.caption, { o: 1, duration: 0.6 }, at);
  } else {
    tl.to(c.caption, { o: 0, duration: 0.4 }, at);
  }
}
function show(tl: gsap.core.Timeline, obj: THREE.Object3D, at: number, grow = 0.8) {
  tl.set(obj, { visible: true }, at);
  if (grow > 0)
    tl.fromTo(
      obj.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      { x: 1, y: 1, z: 1, duration: grow, ease: "back.out(1.4)" },
      at
    );
}
function hide(tl: gsap.core.Timeline, obj: THREE.Object3D, at: number) {
  tl.set(obj, { visible: false }, at);
}

// ---------- Geometry helpers ----------

function line(points: THREE.Vector3[], mat: THREE.Material, loop = false) {
  const g = new THREE.BufferGeometry().setFromPoints(points);
  return loop ? new THREE.LineLoop(g, mat) : new THREE.Line(g, mat);
}
function segments(pairs: THREE.Vector3[], mat: THREE.Material) {
  return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pairs), mat);
}
function circlePts(r: number, n = 48, z = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return V(Math.cos(a) * r, Math.sin(a) * r, z);
  });
}
// A dashed line as short segments.
function dashed(a: THREE.Vector3, b: THREE.Vector3, mat: THREE.Material, dash = 0.08) {
  const pairs: THREE.Vector3[] = [];
  const len = a.distanceTo(b);
  for (let d = 0; d < len; d += dash * 2) {
    pairs.push(a.clone().lerp(b, d / len), a.clone().lerp(b, Math.min(d + dash, len) / len));
  }
  return segments(pairs, mat);
}

// An iris diaphragm facing +z: six flat blades pivoting under a front cover plate.
// `open` 1 leaves an opening of radius R; 0 closes it.
function makeIris(kit: Kit, R = 0.55) {
  const group = new THREE.Group();
  const cover = new THREE.Mesh(new THREE.RingGeometry(R, R * 2.2, 64, 1), kit.surface());
  cover.position.z = 0.05;
  group.add(cover);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(R, R * 0.07, 8, 64), kit.surface());
  lip.position.z = 0.05;
  group.add(lip);
  for (const r of [R * 2.2, R * 1.9]) {
    const c = line(circlePts(r, 64, 0.055), kit.ink, true);
    group.add(c);
  }
  const blades: THREE.Group[] = [];
  const len = R * 1.7;
  const w = R * 0.75;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const pivot = new THREE.Group();
    pivot.position.set(Math.cos(a) * R * 1.35, Math.sin(a) * R * 1.35, 0.003 * i);
    const geo = new THREE.PlaneGeometry(len, w);
    geo.translate(len / 2, -w / 2, 0);
    pivot.add(new THREE.Mesh(geo, kit.surface(0.3)));
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), kit.ink);
    edge.position.z = 0.001;
    pivot.add(edge);
    pivot.userData.base = a + Math.PI / 2;
    group.add(pivot);
    blades.push(pivot);
  }
  const setOpen = (open: number) => {
    const theta = THREE.MathUtils.lerp(1.5, 0.95, open);
    for (const b of blades) b.rotation.z = b.userData.base + theta;
  };
  setOpen(1);
  return { group, setOpen };
}

// The same iris in soft outline only: present, neither open nor closed (the twilight).
function makeGhostIris(kit: Kit, R = 0.55) {
  const group = new THREE.Group();
  group.add(line(circlePts(R), kit.soft, true));
  group.add(line(circlePts(R + 0.12), kit.soft, true));
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 + 0.26;
    return V(Math.cos(a) * R * 0.45, Math.sin(a) * R * 0.45, 0);
  });
  group.add(line(hex, kit.soft, true));
  return group;
}

// A dial gauge facing +z with a hatched twilight band around Φ_c = 0.6.
function makeGauge(kit: Kit, R = 0.7) {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.CircleGeometry(R, 48, 0, Math.PI), kit.surface()));
  const ang = (v: number) => Math.PI - v * Math.PI;
  const band = new THREE.Mesh(
    new THREE.RingGeometry(R * 0.66, R * 0.98, 12, 1, ang(0.66), 0.12 * Math.PI),
    kit.surface(0.85)
  );
  band.position.z = 0.006;
  group.add(band);
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i <= 10; i++) {
    const a = ang(i / 10);
    ticks.push(
      V(Math.cos(a) * R * 0.86, Math.sin(a) * R * 0.86, 0.01),
      V(Math.cos(a) * R, Math.sin(a) * R, 0.01)
    );
  }
  group.add(segments(ticks, kit.ink));
  const needleGeo = new THREE.BoxGeometry(R * 0.82, 0.03, 0.03);
  needleGeo.translate(R * 0.41, 0, 0);
  const needle = new THREE.Mesh(needleGeo, kit.ink);
  needle.position.z = 0.03;
  group.add(needle);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16), kit.surface());
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.03;
  group.add(hub);
  const base = new THREE.Mesh(new THREE.BoxGeometry(R * 2.3, 0.1, 0.3), kit.surface());
  base.position.y = -0.05;
  group.add(base);
  const setValue = (v: number) => {
    needle.rotation.z = ang(v);
  };
  setValue(0);
  return {
    group,
    setValue,
    bandAt: (p: THREE.Vector3) => p.set(Math.cos(ang(0.6)) * R, Math.sin(ang(0.6)) * R, 0),
  };
}

// ---------- I · Introduction: the branching quantum state ----------

function introduction(): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();

  // Grow the tree: every segment splits in two, turning around the growth axis each level.
  type Seg = { a: THREE.Vector3; b: THREE.Vector3; depth: number; index: number };
  const segs: Seg[] = [];
  const grow = (a: THREE.Vector3, dir: THREE.Vector3, len: number, depth: number, spin: number) => {
    const b = a.clone().addScaledVector(dir, len);
    segs.push({ a, b, depth, index: segs.length });
    if (depth === 5) return;
    const side = new THREE.Vector3(Math.cos(spin), 0, Math.sin(spin));
    const axis = new THREE.Vector3().crossVectors(dir, side).normalize();
    for (const s of [-1, 1]) {
      const d = dir
        .clone()
        .applyAxisAngle(axis, s * 0.46)
        .normalize();
      grow(b, d, len * 0.8, depth + 1, spin + 2.4);
    }
  };
  grow(V(0, -3.2, 0), V(0, 1, 0), 1.45, 0, 0.3);
  for (const s of segs) {
    const mid = s.a.clone().lerp(s.b, 0.5);
    mid.x += Math.sin(s.index * 1.7) * 0.08;
    mid.z += Math.cos(s.index * 2.3) * 0.08;
    const curve = new THREE.CatmullRomCurve3([s.a, mid, s.b]);
    const r = 0.13 * 0.72 ** s.depth;
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 12, r, 8, false), kit.surface()));
    // A joint at each fork keeps the silhouette continuous.
    const joint = new THREE.Mesh(new THREE.SphereGeometry(r * 1.05, 10, 8), kit.surface());
    joint.position.copy(s.b);
    scene.add(joint);
  }
  const tips = segs.filter((s) => s.depth === 5);
  // Observers sit along branches, never at forks: branching is physics, not observation.
  const along = (s: Seg, t = 0.62) => s.a.clone().lerp(s.b, t);
  const obsSegs = [tips[10], tips[3], tips[22], tips[29], tips[17]];
  const irises = obsSegs.map((s) => {
    const iris = makeIris(kit, 0.1);
    iris.setOpen(0.8);
    iris.group.position.copy(along(s)).add(V(0, 0, 0.18));
    iris.group.visible = false;
    scene.add(iris.group);
    return iris.group;
  });
  // The empty branch to visit: the tip farthest from every observer.
  const empty = tips.reduce((best, t) => {
    const d = (s: Seg) => Math.min(...obsSegs.map((o) => o.b.distanceTo(s.b)));
    return d(t) > d(best) ? t : best;
  }, tips[0]);
  const gauge = makeGauge(kit, 0.32);
  gauge.group.position.copy(along(obsSegs[0])).add(V(0.9, -0.35, 0.25));
  gauge.group.visible = false;
  scene.add(gauge.group);
  gauge.setValue(0.8);

  const labels: Label3D[] = [
    {
      id: "c",
      text: "C · CREATION: EVERY BRANCH",
      at: segs[0].a.clone().lerp(segs[0].b, 0.4),
      dx: -150,
      dy: 0,
    },
    { id: "empty", text: "NO ONE HOME", at: along(empty, 0.9), dx: 70, dy: -40 },
    { id: "o", text: "O · OBSERVATION", at: irises[0].position, dx: -90, dy: -50 },
    { id: "obs", text: "OBSERVERS", at: irises[2].position, dx: 90, dy: -40 },
    { id: "unlived", text: "REAL AS PATTERN, NEVER LIVED", at: along(empty, 0.9), dx: 150, dy: 70 },
    { id: "gauge", text: "THE THRESHOLD", at: gauge.group.position, dx: 80, dy: 30 },
    { id: "omega", text: "OMEGA, THE WHOLE", at: V(0, -2.4, 0), dx: 130, dy: 20 },
  ];

  const overview = { t: V(0, 0.3, 0), o: V(0, 1.4, 12.5) };
  const obsT = irises[0].position;
  return {
    scene,
    kit,
    labels,
    update: () => {},
    stops: [
      // 1 · One state, many branches: the tree engraves upward.
      (tl, at, c) => {
        tl.fromTo(
          kit.clip,
          { constant: -3.3 },
          { constant: 4, duration: 2.4, ease: "power1.inOut" },
          at
        );
        tl.fromTo(
          c.rig.target,
          { x: 0, y: -2, z: 0 },
          { ...overview.t, duration: 2.6, ease: "power2.inOut" },
          at
        );
        tl.fromTo(
          c.rig.offset,
          { x: 5, y: 0.4, z: 9 },
          { ...overview.o, duration: 2.6, ease: "power2.inOut" },
          at
        );
        lab(tl, c, { c: 1 }, at + 2);
      },
      // 2 · No one home: travel out along an empty branch.
      (tl, at, c) => {
        lab(tl, c, { c: 0 }, at);
        cam(tl, c, along(empty, 0.8), V(1.6, 0.6, 4.6), at, 2.2);
        lab(tl, c, { empty: 1 }, at + 1.8);
      },
      // 3 · An observer, mid-branch.
      (tl, at, c) => {
        lab(tl, c, { empty: 0 }, at);
        cam(tl, c, obsT, V(-1, 0.4, 3.8), at, 2);
        show(tl, irises[0], at + 1.6);
        lab(tl, c, { o: 1 }, at + 2.2);
      },
      // 4 · The shorthand.
      (tl, at, c) => {
        cam(tl, c, obsT, V(-2, 0.6, 5.5), at, 1.6);
        caption(tl, c, "R = C ⊛ O", at + 0.6);
      },
      // 5 · Many observers, most branches empty.
      (tl, at, c) => {
        lab(tl, c, { o: 0 }, at);
        caption(tl, c, "", at);
        cam(tl, c, overview.t, overview.o, at, 2.4);
        for (let k = 1; k < irises.length; k++) show(tl, irises[k], at + 0.65 + k * 0.35);
        lab(tl, c, { obs: 1, unlived: 1 }, at + 2.4);
      },
      // 6 · Two additions.
      (tl, at, c) => {
        lab(tl, c, { obs: 0, unlived: 0 }, at);
        cam(tl, c, obsT, V(0.2, 0.3, 3.4), at, 1.8);
        show(tl, gauge.group, at + 1.2);
        lab(tl, c, { gauge: 1 }, at + 1.8);
        cam(tl, c, V(0, 0.6, 0), V(0, 2, 14.5), at + 3, 2.4);
        lab(tl, c, { gauge: 0, omega: 1 }, at + 4.6);
      },
    ],
  };
}

// ---------- II · Consciousness: the bench ----------

// `full` false builds only the threshold half of the bench, for the in-text figure.
function consciousness(full = true): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { v: 0.08, open: 0, align: 0, pulse: 0, flip: 0 };

  // Bench
  const top = new THREE.Mesh(new THREE.BoxGeometry(full ? 21.5 : 13.5, 0.25, 3.6), kit.surface());
  top.position.set(full ? 4.75 : 0.75, -0.125, 0);
  scene.add(top);
  for (const x of [-5.6, full ? 15.1 : 7.1])
    for (const z of [-1.5, 1.5]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), kit.surface(0.1));
      leg.position.set(x, -1.35, z);
      scene.add(leg);
    }

  // Things with no point of view
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32), kit.surface());
  rock.scale.set(1.3, 0.75, 1);
  rock.position.set(-4.6, 0.22, 0.3);
  scene.add(rock);
  const riverGeo = new THREE.PlaneGeometry(1.3, 0.5, 24, 1);
  const rp = riverGeo.attributes.position;
  for (let i = 0; i < rp.count; i++) rp.setZ(i, Math.sin(rp.getX(i) * 7) * 0.05);
  riverGeo.computeVertexNormals();
  const river = new THREE.Mesh(riverGeo, kit.surface());
  river.rotation.x = -Math.PI / 2;
  river.position.set(-3.3, 0.06, 0.4);
  scene.add(river);
  const thermo = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.55, 0.16), kit.surface());
  thermo.position.set(-2.2, 0.28, 0.2);
  scene.add(thermo);
  const dial = line(circlePts(0.12, 32), kit.ink, true);
  dial.position.set(-2.2, 0.32, 0.29);
  scene.add(dial);

  // The network: separate processes, then one integrated loop
  const nodePos = [
    V(-0.8, 1.1, 0.2),
    V(-0.35, 1.75, -0.3),
    V(0.4, 1.8, 0.25),
    V(0.9, 1.2, -0.2),
    V(0.55, 0.6, 0.35),
    V(-0.25, 0.55, -0.25),
    V(0, 1.2, 0.6),
    V(0.1, 1.25, -0.7),
  ];
  const nodes = nodePos.map((p) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), kit.surface());
    m.position.copy(p);
    scene.add(m);
    return m;
  });
  const pairs = (idx: [number, number][]) => idx.flatMap(([a, b]) => [nodePos[a], nodePos[b]]);
  const sepLinks = segments(
    pairs([
      [0, 1],
      [2, 3],
      [4, 5],
    ]),
    kit.ink
  );
  scene.add(sepLinks);
  const joinedLinks = segments(
    pairs([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [6, 0],
      [6, 2],
      [6, 4],
      [7, 1],
      [7, 3],
      [7, 5],
      [6, 7],
      [0, 3],
    ]),
    kit.ink
  );
  joinedLinks.visible = false;
  scene.add(joinedLinks);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8), kit.surface());
  post.position.set(0, 0.25, 0);
  scene.add(post);
  // Aboutness: a small model inside, and the thing beyond it that the model is of.
  const model = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), kit.surface(0.3));
  model.position.set(0.05, 1.2, 0);
  model.visible = false;
  scene.add(model);
  const world = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.5, 4), kit.surface());
  world.position.set(2.1, 0.25, 0.9);
  world.visible = false;
  scene.add(world);
  const about = dashed(V(0.15, 1.15, 0.1), V(2, 0.55, 0.85), kit.ink);
  about.visible = false;
  scene.add(about);

  // Gauge and iris on stands
  const gauge = makeGauge(kit, 0.7);
  gauge.group.position.set(3.4, 0.9, 0);
  scene.add(gauge.group);
  const gpost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.12), kit.surface(0.1));
  gpost.position.set(3.4, 0.42, 0);
  scene.add(gpost);
  const iris = makeIris(kit, 0.3);
  iris.group.position.set(5.4, 1.35, 0);
  iris.group.visible = false;
  scene.add(iris.group);
  const ghost = makeGhostIris(kit, 0.3);
  ghost.position.copy(iris.group.position);
  ghost.visible = false;
  scene.add(ghost);
  const ipost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.66, 0.12), kit.surface(0.1));
  ipost.position.set(5.4, 0.33, 0);
  scene.add(ipost);

  const extras = new THREE.Group();
  extras.visible = full;
  scene.add(extras);

  // Iron bar with tiny magnets, and a plot on an easel
  const bar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.35, 0.7), kit.surface());
  bar.position.set(8, 0.18, 0);
  extras.add(bar);
  const magnets = Array.from({ length: 12 }, (_, i) => {
    const pivot = new THREE.Group();
    pivot.position.set(7.35 + (i % 6) * 0.26, 0.4, i < 6 ? -0.15 : 0.15);
    const coneGeo = new THREE.ConeGeometry(0.05, 0.18, 8);
    coneGeo.rotateZ(-Math.PI / 2);
    pivot.add(new THREE.Mesh(coneGeo, kit.ink));
    pivot.userData.yaw = (i * 2.39) % (Math.PI * 2);
    extras.add(pivot);
    return pivot;
  });
  const board = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.15), kit.surface());
  board.position.set(10.1, 0.9, -0.2);
  extras.add(board);
  const sig = (t: number, k: number) => 1 / (1 + Math.exp(-k * (t - 0.5)));
  const plotLine = (k: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const t = i / 40;
      return V(9.45 + t * 1.3, 0.5 + sig(t, k) * 0.8, -0.19);
    });
  extras.add(line(plotLine(30), kit.ink));
  extras.add(line(plotLine(7), kit.soft));
  extras.add(
    segments(
      [V(9.45, 0.45, -0.19), V(9.45, 1.4, -0.19), V(9.45, 0.45, -0.19), V(10.8, 0.45, -0.19)],
      kit.ink
    )
  );

  // One curve, two sides
  const shell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.1, 1.5, 40, 1, true, -0.95, 1.9),
    kit.surface(-0.9)
  );
  shell.position.set(14, 0.75, -0.9);
  extras.add(shell);

  const labels: Label3D[] = [
    { id: "rock", text: "ROCK", at: rock.position, dx: -10, dy: -50 },
    { id: "river", text: "RIVER", at: river.position, dx: 0, dy: 50 },
    { id: "thermo", text: "THERMOSTAT", at: thermo.position, dx: 10, dy: -60 },
    { id: "sep", text: "SEPARATE PROCESSES", at: nodePos[2], dx: 70, dy: -40 },
    { id: "integ", text: "INTEGRATION", at: nodePos[1], dx: -110, dy: -40 },
    { id: "diff", text: "DIFFERENTIATION", at: nodePos[2], dx: 110, dy: -40 },
    { id: "cohe", text: "TEMPORAL COHESION", at: nodePos[5], dx: -120, dy: 40 },
    { id: "about", text: "ABOUTNESS", at: world.position, dx: 95, dy: 12 },
    { id: "phi", text: "Φ", at: V(3.4, 0.75, 0), dx: 0, dy: 40, italic: true },
    {
      id: "twilight",
      text: "TWILIGHT",
      at: gauge.bandAt(new THREE.Vector3()).add(gauge.group.position),
      dx: -40,
      dy: -60,
    },
    { id: "aperture", text: "AN APERTURE", at: iris.group.position, dx: 0, dy: -185 },
    { id: "iron", text: "IRON, COOLING PAST ITS CURIE POINT", at: bar.position, dx: -40, dy: 60 },
    { id: "large", text: "LARGE BLOCK: STEEP", at: V(10.1, 1.25, -0.2), dx: 60, dy: -50 },
    { id: "tiny", text: "TINY GRAIN: GRADUAL", at: V(10.5, 0.75, -0.2), dx: 70, dy: 40 },
    {
      id: "dial",
      text: "RICHNESS: A DIAL, NOT A SWITCH",
      at: iris.group.position,
      dx: 40,
      dy: -90,
    },
    { id: "rhythm", text: "A SEIZURE: ONE RHYTHM", at: nodePos[2], dx: -40, dy: -70 },
    { id: "outside", text: "OUTSIDE: PHYSICAL ACTIVITY", at: V(14, 1.2, 0.2), dx: 0, dy: -70 },
    { id: "inside", text: "INSIDE: EXPERIENCE", at: V(14, 1, 0.05), dx: -40, dy: -80 },
  ];
  const off = (ids: string[]) => Object.fromEntries(ids.map((k) => [k, 0]));

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      gauge.setValue(st.v);
      iris.setOpen(st.open);
      for (const m of magnets) m.rotation.y = m.userData.yaw * (1 - st.align);
      const beat = 1 + st.pulse * 0.35 * Math.max(0, Math.sin(time * 7));
      for (const n of nodes) n.scale.setScalar(beat);
    },
    stops: [
      // 1 · No point of view
      (tl, at, c) => {
        tl.fromTo(
          kit.clip,
          { constant: -6 },
          { constant: full ? 16 : 8, duration: 2.4, ease: "power1.inOut" },
          at
        );
        tl.fromTo(
          c.rig.target,
          { x: -4, y: 0.4, z: 0 },
          { x: full ? 3.5 : 0.8, y: 0.6, z: 0, duration: 2.4, ease: "power1.inOut" },
          at
        );
        tl.fromTo(
          c.rig.offset,
          { x: 0, y: 3, z: 9 },
          { x: 0, y: full ? 4.5 : 3.6, z: full ? 15 : 11.5, duration: 2.4 },
          at
        );
        tl.set(st, { v: 0.08, open: 0, align: 0, pulse: 0 }, at);
        cam(tl, c, V(-1.8, 0.9, 0), V(0.3, 1.8, 8.6), at + 2.4, 1.8);
        lab(tl, c, { rock: 1, river: 1, thermo: 1, sep: 1 }, at + 3.4);
      },
      // 2 · Four requirements
      (tl, at, c) => {
        lab(tl, c, off(["rock", "river", "thermo", "sep"]), at);
        cam(tl, c, V(0.9, 1.05, 0.3), V(0.6, 0.9, 5.6), at, 1.8);
        hide(tl, sepLinks, at + 0.8);
        tl.set(joinedLinks, { visible: true }, at + 0.8);
        show(tl, model, at + 1.2, 0.5);
        show(tl, world, at + 1.4, 0.5);
        tl.set(about, { visible: true }, at + 1.6);
        lab(tl, c, { integ: 1, diff: 1, cohe: 1, about: 1 }, at + 1.8);
      },
      // 3 · Twilight
      (tl, at, c) => {
        lab(tl, c, off(["integ", "diff", "cohe", "about"]), at);
        cam(tl, c, V(4.4, 1.05, 0), V(0, 0.35, 4.4), at, 1.8);
        tl.to(st, { v: 0.6, duration: 1.4, ease: "power2.inOut" }, at + 1);
        tl.set(ghost, { visible: true }, at + 2.2);
        lab(tl, c, { phi: 1, twilight: 1 }, at + 2.2);
      },
      // 4 · An aperture
      (tl, at, c) => {
        lab(tl, c, { twilight: 0 }, at);
        tl.to(st, { v: 0.8, duration: 1, ease: "power2.inOut" }, at + 0.2);
        tl.set(ghost, { visible: false }, at + 1.2);
        tl.set(iris.group, { visible: true }, at + 1.2);
        tl.to(st, { open: 1, duration: 1.2, ease: "power2.out" }, at + 1.2);
        lab(tl, c, { aperture: 1 }, at + 2);
      },
      // 5 · A steep onset
      (tl, at, c) => {
        lab(tl, c, { aperture: 0, phi: 0 }, at);
        cam(tl, c, V(9, 0.75, 0), V(-0.4, 1.3, 4.6), at, 2);
        tl.to(st, { align: 1, duration: 2, ease: "power3.in" }, at + 1.6);
        lab(tl, c, { iron: 1, large: 1, tiny: 1 }, at + 2);
      },
      // 6 · Dial, not switch
      (tl, at, c) => {
        lab(tl, c, off(["iron", "large", "tiny"]), at);
        cam(tl, c, V(2.7, 1.1, 0), V(0, 0.9, 7.6), at, 2);
        tl.to(st, { open: 0.45, duration: 0.9, ease: "sine.inOut" }, at + 1.8);
        tl.to(st, { open: 1, duration: 0.9, ease: "sine.inOut" }, at + 2.7);
        lab(tl, c, { dial: 1 }, at + 1.8);
        tl.set(st, { pulse: 1 }, at + 3.8);
        tl.to(st, { open: 0.2, duration: 1, ease: "power2.inOut" }, at + 3.8);
        lab(tl, c, { dial: 0, rhythm: 1 }, at + 3.8);
      },
      // 7 · Two sides: the camera walks round one curve
      (tl, at, c) => {
        lab(tl, c, { rhythm: 0 }, at);
        tl.set(st, { pulse: 0, open: 1 }, at);
        cam(tl, c, V(14, 0.9, 0), V(0, 0.6, 5.4), at, 2);
        lab(tl, c, { outside: 1 }, at + 1.8);
        lab(tl, c, { outside: 0 }, at + 3.4);
        cam(tl, c, null, V(4.8, 1.4, -0.4), at + 3.4, 1.4, "power1.in");
        cam(tl, c, V(14, 0.8, -0.9), V(1.4, 1.3, -4.4), at + 4.8, 1.6, "power1.out");
        lab(tl, c, { inside: 1 }, at + 6.2);
      },
    ],
  };
}

export const SCENES3D: Record<string, () => Built3D> = {
  introduction,
  consciousness,
  // Figure O2 on the Overview: the bench's first four stops.
  aperture: () => {
    const b = consciousness(false);
    return { ...b, stops: b.stops.slice(0, 4) };
  },
};
