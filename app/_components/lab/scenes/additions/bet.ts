// Predictions figure: the standing bet and the two versions.
// A system held in two states at once, a particle in the measuring role, and a plot of the
// superposition fading over time. Swap the particle for a person and the curve is the
// same. Threads to the surroundings show why it fades. A dashed, steeper curve marks the
// deviation that would lose the bet. Then a Φ axis: everything tested so far sits far
// below the threshold. Last, one shared core carrying two versions, every branch or one
// history. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import { type Built3D, cam, dashed, type Label3D, lab, segments, V } from "../../tourScenes3d";
import { makeRuler, rand } from "../speculation/parts";

const PX0 = -0.4; // plot x range
const PX1 = 4.4;
const PZ = -1.2; // plot wall depth
const fade = (u: number) => 0.35 + 2.3 * Math.exp(-3 * u);
const steep = (u: number) => 0.35 + 2.3 * Math.exp(-11 * u);
const BALLS = [V(-4.1, 1, 0.2), V(-2.9, 1, 0.2)];
const MX = -1.6; // the measuring role
const MZ = 1.1;

function tubeOf(pts: THREE.Vector3[], r: number, mat: THREE.Material) {
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), pts.length * 3, r, 8);
  return { mesh: new THREE.Mesh(geo, mat), geo, total: geo.index?.count ?? 0 };
}

export function bet(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  kit.ink.side = THREE.DoubleSide;
  kit.soft.side = THREE.DoubleSide;
  const scene = new THREE.Scene();
  const st = { draw: 0, who: 0, env: 0, dev: 0 };
  const plates = Array.from({ length: 3 }, () => {
    const g = new THREE.Group();
    g.visible = false;
    scene.add(g);
    return g;
  });

  // ---- Plate 0 · the measurement and its plot ----
  const P = plates[0];
  const floor: THREE.Vector3[] = [];
  for (let x = -5; x <= 5; x += 1) floor.push(V(x, 0, PZ), V(x, 0, 2.6));
  for (let z = PZ; z <= 2.61; z += 0.95) floor.push(V(-5, 0, z), V(5, 0, z));
  P.add(segments(floor, kit.soft));

  // The plot on a back wall: soft rules, inked axes, the fading curve as a tube.
  const rules: THREE.Vector3[] = [];
  for (let y = 0.6; y <= 2.81; y += 0.55) rules.push(V(PX0, y, PZ), V(PX1, y, PZ));
  for (let x = PX0 + 0.8; x <= PX1; x += 0.8) rules.push(V(x, 0.05, PZ), V(x, 2.9, PZ));
  P.add(segments(rules, kit.soft));
  P.add(
    segments(
      [V(PX0, 0.05, PZ), V(PX1 + 0.3, 0.05, PZ), V(PX0, 0.05, PZ), V(PX0, 3.15, PZ)],
      kit.ink
    )
  );
  const curvePts = (fn: (u: number) => number) =>
    Array.from({ length: 41 }, (_, i) => {
      const u = i / 40;
      return V(PX0 + 0.05 + u * (PX1 - PX0 - 0.05), fn(u), PZ + 0.02);
    });
  const curve = tubeOf(curvePts(fade), 0.05, kit.surface(0.1));
  P.add(curve.mesh);
  // The deviation that would lose the bet: dashed, steeper.
  const devPairs: THREE.Vector3[] = [];
  const dp = curvePts(steep);
  for (let i = 0; i < dp.length - 1; i += 2) devPairs.push(dp[i], dp[i + 1]);
  const devGeo = new THREE.BufferGeometry().setFromPoints(devPairs);
  const dev = new THREE.LineSegments(devGeo, kit.ink);
  P.add(dev);
  const devFat = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(devPairs.map((p) => p.clone().add(V(0, 0.025, 0)))),
    kit.ink
  );
  P.add(devFat);

  // A system in two states at once: the same ball, twice, joined by a soft bracket.
  const ballMat = kit.surface(-0.3);
  for (const b of BALLS) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.34, 28, 20), ballMat);
    m.position.copy(b);
    P.add(m);
    P.add(segments([V(b.x, 0, b.z), V(b.x, b.y - 0.34, b.z)], kit.soft));
  }
  P.add(dashed(V(BALLS[0].x + 0.34, 1, 0.2), V(BALLS[1].x - 0.34, 1, 0.2), kit.ink, 0.06));

  // The measuring role: a particle, then a person.
  const particle = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), kit.surface(0.3));
  particle.position.set(MX, 1, MZ);
  P.add(particle);
  const person = makePerson(kit, 0.1);
  person.group.position.set(MX, 0, MZ);
  person.group.rotation.y = -1.15;
  P.add(person.group);
  // Its lines of registration toward both states.
  const regPos = new Float32Array(2 * 2 * 3);
  const regGeo = new THREE.BufferGeometry();
  regGeo.setAttribute("position", new THREE.BufferAttribute(regPos, 3));
  P.add(new THREE.LineSegments(regGeo, kit.soft));

  // Surroundings: small bits of the world, each threaded to the system.
  const envDots = Array.from({ length: 16 }, (_, i) => {
    const a = rand(i + 3) * Math.PI * 2;
    const r = 1.1 + rand(i + 40) * 0.8;
    const at = V(-3.5 + Math.cos(a) * r * 1.05, 1 + Math.sin(a) * r * 0.65, -0.2 + (rand(i + 9) - 0.5) * 1.2);
    at.x = Math.min(at.x, -2.3);
    at.y = Math.max(at.y, 0.18);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), kit.ink);
    m.position.copy(at);
    P.add(m);
    return { m, at, from: BALLS[i % 2] };
  });
  const envPos = new Float32Array(envDots.length * 2 * 3);
  const envGeo = new THREE.BufferGeometry();
  envGeo.setAttribute("position", new THREE.BufferAttribute(envPos, 3));
  const envLines = new THREE.LineSegments(envGeo, kit.soft);
  P.add(envLines);

  // ---- Plate 1 · everything tested so far, on a Φ axis ----
  const Q = plates[1];
  const qFloor: THREE.Vector3[] = [];
  for (let x = -5; x <= 5; x += 1) qFloor.push(V(x, 0, -1.4), V(x, 0, 1.6));
  Q.add(segments(qFloor, kit.soft));
  Q.add(makeRuler(kit, V(-4.8, 0.01, 0.9), V(4.6, 0.01, 0.9), 0.4, 0.1));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 12), kit.ink);
  head.rotation.z = -Math.PI / 2;
  head.position.set(4.75, 0.01, 0.9);
  Q.add(head);
  const post = (x: number, h: number) => {
    Q.add(segments([V(x, 0.01, 0.9), V(x, h, 0.9)], kit.ink));
  };
  // A photon, a molecule, a circuit: all near the bottom of the axis.
  post(-4.5, 0.7);
  const photon = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), kit.ink);
  photon.position.set(-4.5, 0.78, 0.9);
  Q.add(photon);
  post(-3.9, 0.6);
  const molMat = kit.surface(0);
  for (const [dx, dy, dz] of [
    [0, 0.8, 0],
    [0.16, 0.92, 0.05],
    [-0.15, 0.94, -0.04],
    [0.02, 1.08, 0.08],
  ]) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), molMat);
    m.position.set(-3.9 + dx, dy, 0.9 + dz);
    Q.add(m);
  }
  post(-3.2, 0.55);
  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.38), kit.surface(0.2));
  chip.position.set(-3.2, 0.62, 0.9);
  Q.add(chip);
  const pins: THREE.Vector3[] = [];
  for (let i = 0; i < 4; i++) {
    const x = -3.38 + i * 0.12;
    pins.push(V(x, 0.6, 1.09), V(x, 0.52, 1.16), V(x, 0.6, 0.71), V(x, 0.52, 0.64));
  }
  Q.add(segments(pins, kit.ink));
  // The threshold: a hatched twilight slab standing across the axis.
  const slab = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.3, 2.2), kit.surface(0.8));
  slab.position.set(2.3, 1.15, 0.3);
  Q.add(slab);
  // A gap measured out, then an observer past it, untested.
  Q.add(dashed(V(-2.8, 1.3, 0.9), V(1.9, 1.3, 0.9), kit.ink, 0.1));
  const friend = makePerson(kit, -0.7);
  friend.group.position.set(3.7, 0, 0.9);
  friend.group.rotation.y = -0.35;
  Q.add(friend.group);
  const ring: THREE.Vector3[] = [];
  for (let i = 0; i < 40; i += 1) {
    const a0 = (i / 40) * Math.PI * 2;
    const a1 = ((i + 0.5) / 40) * Math.PI * 2;
    ring.push(
      V(3.7 + Math.cos(a0) * 0.75, 0.95 + Math.sin(a0) * 1.15, 0.9),
      V(3.7 + Math.cos(a1) * 0.75, 0.95 + Math.sin(a1) * 1.15, 0.9)
    );
  }
  Q.add(segments(ring, kit.soft));

  // ---- Plate 2 · one core, two versions ----
  const R = plates[2];
  const core = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.55, 2.2), kit.surface(0.15));
  core.position.set(0, 0.275, 0);
  R.add(core);
  const coreLines: THREE.Vector3[] = [];
  for (let x = -2.4; x <= 2.41; x += 1.6) coreLines.push(V(x, 0.05, 1.105), V(x, 0.5, 1.105));
  R.add(segments(coreLines, kit.soft));
  const treeMat = kit.surface(0.1);
  const TX = -1.6;
  const grow = (from: THREE.Vector3, dir: number, len: number, depth: number) => {
    const to = from.clone().add(V(dir * len * 0.45, len, (depth % 2 ? 1 : -1) * 0.12 * dir));
    const mid = from.clone().lerp(to, 0.5).add(V(0, 0.05, 0));
    R.add(tubeOf([from, mid, to], 0.045 * (0.75 ** (3 - depth) + 0.3), treeMat).mesh);
    if (depth > 0) {
      grow(to, -1, len * 0.78, depth - 1);
      grow(to, 1, len * 0.78, depth - 1);
    }
  };
  const trunkTop = V(TX, 1.4, 0);
  R.add(tubeOf([V(TX, 0.55, 0), V(TX, 1.0, 0), trunkTop], 0.07, treeMat).mesh);
  grow(trunkTop, -1, 0.8, 2);
  grow(trunkTop, 1, 0.8, 2);
  const oneMat = kit.surface(-0.2);
  const oneTop = V(1.6, 3.5, 0);
  R.add(
    tubeOf(
      [V(1.6, 0.55, 0), V(1.62, 1.4, 0.05), V(1.55, 2.3, -0.05), V(1.62, 3.0, 0.02), oneTop],
      0.07,
      oneMat
    ).mesh
  );

  const labels: Label3D[] = [
    { id: "two", text: "TWO STATES AT ONCE", at: V(-3.5, 1.38, 0.2), dx: 0, dy: -60 },
    { id: "particle", text: "A PARTICLE", at: V(MX, 1.15, MZ), dx: 30, dy: 70 },
    { id: "observer", text: "AN OBSERVER", at: V(MX, 1.75, MZ), dx: 40, dy: -50 },
    { id: "axis", text: "SUPERPOSITION", at: V(PX0, 3.15, PZ), dx: 40, dy: -22 },
    { id: "time", text: "TIME", at: V(PX1 + 0.3, 0.05, PZ), dx: -10, dy: 26 },
    { id: "same", text: "NO DEVIATION", at: V(PX0 + 1.6, fade(0.4), PZ), dx: 60, dy: -50 },
    { id: "env", text: "SURROUNDINGS", at: envDots[5].at, dx: -20, dy: 60 },
    { id: "dev", text: "IF IT EVER DEVIATED", at: V(PX0 + 1.4, steep(0.3), PZ), dx: 40, dy: 60 },
    { id: "tested", text: "EVERYTHING TESTED SO FAR", at: V(-3.9, 1.1, 0.9), dx: 0, dy: -60 },
    { id: "phic", text: "THE THRESHOLD", at: V(2.3, 2.3, 0.3), dx: 0, dy: -30 },
    { id: "phi", text: "Φ", at: V(4.8, 0.01, 0.9), dx: 0, dy: 26, italic: true },
    { id: "untested", text: "NOT YET TESTED", at: V(3.7, 2.1, 0.9), dx: 0, dy: -36 },
    { id: "core", text: "ONE CORE", at: V(0, 0.28, 1.1), dx: 0, dy: 50 },
    { id: "branch", text: "EVERY BRANCH", at: V(TX, 3.3, 0), dx: 0, dy: -40 },
    { id: "single", text: "ONE HISTORY", at: oneTop, dx: 0, dy: -36 },
  ];

  const k = narrow ? 0.96 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  // Bring one plate in: hide the others, then engrave it left to right.
  const plate = (tl: gsap.core.Timeline, c: Parameters<typeof cam>[1], i: number, t: number, d = 0.5) => {
    lab(tl, c, none, t);
    plates.forEach((p, j) => {
      tl.set(p, { visible: j === i }, t + d);
    });
    tl.fromTo(kit.clip, { constant: -6 }, { constant: 6, duration: 1.6, ease: "power1.inOut" }, t + d);
    tl.set(kit.clip, { constant: 100 }, t + d + 1.65);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      curve.geo.setDrawRange(0, Math.floor((curve.total * st.draw) / 6) * 6);
      const n = Math.floor((devPairs.length * st.dev) / 2) * 2;
      devGeo.setDrawRange(0, n);
      devFat.geometry.setDrawRange(0, n);
      const w = st.who;
      particle.visible = w < 0.5;
      particle.scale.setScalar(Math.max(1 - w * 2, 0.001));
      person.group.visible = w >= 0.5;
      person.group.scale.setScalar(Math.max(w * 2 - 1, 0.001) * 0.92);
      const eye = w < 0.5 ? V(MX, 1, MZ) : V(MX - 0.08, 1.58, MZ + 0.03);
      BALLS.forEach((b, i) => {
        const end = eye.clone().lerp(b, 0.82);
        regPos.set([eye.x, eye.y, eye.z, end.x, end.y, end.z], i * 6);
      });
      regGeo.attributes.position.needsUpdate = true;
      regGeo.computeBoundingSphere();
      const e = st.env;
      envDots.forEach((d, i) => {
        d.m.visible = e > 0.02;
        d.m.position.copy(d.from).lerp(d.at, Math.min(e * 1.2, 1));
        envPos.set([d.from.x, d.from.y, d.from.z, d.m.position.x, d.m.position.y, d.m.position.z], i * 6);
      });
      envLines.visible = e > 0.02;
      envGeo.attributes.position.needsUpdate = true;
      envGeo.computeBoundingSphere();
    },
    stops: [
      // 1 · A particle in the measuring role; the superposition fades.
      (tl, t, c) => {
        tl.addLabel("particle", t);
        tl.set(st, { draw: 0, who: 0, env: 0, dev: 0 }, t);
        plate(tl, c, 0, t, 0);
        tl.fromTo(c.rig.target, { x: -0.5, y: 1.3, z: 0 }, { x: 0, y: 1.4, z: 0, duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...view(-3, 2.5, 12) },
          { ...view(0, 2.4, 13.2), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { two: 1, particle: 1 }, t + 1.8);
        lab(tl, c, { axis: 1, time: 1 }, t + 2.4);
        tl.to(st, { draw: 1, duration: 2.2, ease: "power1.inOut" }, t + 2.6);
      },
      // 2 · Someone home: the same curve.
      (tl, t, c) => {
        tl.addLabel("observer", t);
        lab(tl, c, { particle: 0 }, t);
        tl.to(st, { who: 1, duration: 1.2, ease: "power2.inOut" }, t + 0.3);
        lab(tl, c, { observer: 1 }, t + 1.3);
        tl.to(st, { draw: 0, duration: 0.4, ease: "power1.in" }, t + 1.4);
        tl.to(st, { draw: 1, duration: 2.2, ease: "power1.inOut" }, t + 1.9);
        lab(tl, c, { same: 1 }, t + 3.6);
      },
      // 3 · Why it fades: entanglement with the surroundings.
      (tl, t, c) => {
        tl.addLabel("decoherence", t);
        lab(tl, c, { same: 0, axis: 0, time: 0 }, t);
        cam(tl, c, V(-1.4, 1.3, 0.2), view(-0.4, 2.3, 11.6), t, 2.6, EASE);
        tl.to(st, { env: 1, duration: 2.4, ease: "power2.out" }, t + 0.8);
        lab(tl, c, { env: 1 }, t + 2.4);
      },
      // 4 · How it would lose: a steeper fade, tied to the observer.
      (tl, t, c) => {
        tl.addLabel("loses", t);
        lab(tl, c, { env: 0, two: 0 }, t);
        tl.to(st, { env: 0, duration: 1, ease: "power2.in" }, t);
        cam(tl, c, V(0.6, 1.4, 0), view(0.4, 2.4, 12.6), t, 2.4, EASE);
        tl.set(st, { dev: 0 }, t);
        tl.to(st, { dev: 1, duration: 1.8, ease: "power1.inOut" }, t + 1.4);
        lab(tl, c, { dev: 1, axis: 1 }, t + 2.6);
      },
      // 5 · Untested: every system put in superposition sits far below the threshold.
      (tl, t, c) => {
        tl.addLabel("untested", t);
        plate(tl, c, 1, t);
        cam(tl, c, V(0, 1.1, 0.4), view(0, 3, 12.6), t, 2.4, EASE);
        lab(tl, c, { tested: 1, phi: 1 }, t + 2.2);
        lab(tl, c, { phic: 1 }, t + 2.8);
        lab(tl, c, { untested: 1 }, t + 3.4);
      },
      // 6 · Two versions on one core.
      (tl, t, c) => {
        tl.addLabel("versions", t);
        plate(tl, c, 2, t);
        cam(tl, c, V(0, 1.7, 0), view(0, 2.6, 11.5), t, 2.4, EASE);
        lab(tl, c, { core: 1 }, t + 2);
        lab(tl, c, { branch: 1 }, t + 2.6);
        lab(tl, c, { single: 1 }, t + 3.2);
      },
    ],
  };
}

