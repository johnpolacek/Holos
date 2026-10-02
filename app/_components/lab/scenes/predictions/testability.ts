// Testability and its limits. Presence sits sealed in a case: an instrument probes it and
// reads nothing extra. Off to the side, the unfolding argument: a network with loops and a
// loop-free twin take the same input and flash the same output. Back at the center, the
// testable preconditions ring presence as solid stone, each one able to fail.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, circlePts, type Label3D, lab, line, V } from "../../tourScenes3d";
import { arrow, box, pop, rod, sphere, tube } from "./parts";

const NET = V(12, 1.4, 0);

export function testability(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { needle: 0 };

  // Presence on a pedestal, sealed in a case.
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.9, 0.5, 32), kit.surface(0.2));
  pedestal.position.y = 0.25;
  scene.add(pedestal);
  scene.add(sphere(0.55, kit.surface(-0.9), V(0, 1.1, 0)));
  const caseEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.85, 0.85, 1.5, 12, 1)),
    kit.soft
  );
  caseEdges.position.y = 1.25;
  scene.add(caseEdges);

  // The instrument: a dial on a stand, its probe stopping at the case.
  const meter = new THREE.Group();
  meter.position.set(2.4, 0, 0.6);
  box(meter, kit.surface(0.25), 0.12, 1.0, 0.12, 0, 0.5, 0);
  box(meter, kit.surface(0.1), 1.1, 0.9, 0.3, 0, 1.4, 0);
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.36, 32), kit.surface(-0.8));
  face.position.set(0, 1.4, 0.16);
  meter.add(face);
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i <= 6; i++) {
    const a = Math.PI * 0.85 - (i / 6) * Math.PI * 0.7;
    ticks.push(V(Math.cos(a) * 0.26, 1.4 + Math.sin(a) * 0.26, 0.17));
    ticks.push(V(Math.cos(a) * 0.34, 1.4 + Math.sin(a) * 0.34, 0.17));
  }
  meter.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks), kit.ink));
  const needleGeo = new THREE.BoxGeometry(0.3, 0.025, 0.02);
  needleGeo.translate(0.15, 0, 0);
  const needle = new THREE.Mesh(needleGeo, kit.ink);
  needle.position.set(0, 1.4, 0.19);
  meter.add(needle);
  meter.add(rod(V(-0.55, 1.4, 0), V(-1.45, 1.35, -0.45), 0.03, kit.ink, 6));
  meter.visible = false;
  scene.add(meter);

  // The unfolding argument. A network with loops: a ring of nodes, signals cycling round.
  const nodeMat = kit.surface(-0.6);
  const loopNet = new THREE.Group();
  const ring = circlePts(1.0, 6).map((p) => V(p.x - 2.2, p.y, 0));
  for (const p of ring) loopNet.add(sphere(0.13, nodeMat, p));
  ring.forEach((p, i) => {
    const q = ring[(i + 1) % ring.length];
    const mid = p.clone().lerp(q, 0.5);
    const out = mid
      .clone()
      .sub(V(-2.2, 0, 0))
      .setZ(0)
      .multiplyScalar(0.25);
    loopNet.add(tube([p, mid.clone().add(out), q], 0.025, kit.ink, 12));
  });
  loopNet.add(tube([ring[0], V(-2.2, 0, 0.2), ring[3]], 0.02, kit.ink, 12));
  loopNet.add(tube([ring[1], V(-2.2, 0.1, -0.2), ring[4]], 0.02, kit.ink, 12));
  // The loop-free twin: layers feeding forward only.
  const ffNet = new THREE.Group();
  const cols = [0, 1, 2, 3].map((ci) => [-0.7, 0, 0.7].map((y) => V(1.1 + ci * 0.75, y, 0)));
  for (const col of cols) for (const p of col) ffNet.add(sphere(0.12, nodeMat, p));
  for (let ci = 0; ci < 3; ci++)
    for (const a of cols[ci]) for (const b of cols[ci + 1]) ffNet.add(rod(a, b, 0.012, kit.ink, 4));
  // Same input, same output lamp, for both.
  const lampMat = kit.surface(0.2);
  const lamps = [V(-0.6, 0, 0), V(4.1, 0, 0)].map((p) => sphere(0.22, lampMat, p));
  const pulseLoop = sphere(0.09, kit.ink);
  const pulseFF = sphere(0.09, kit.ink);
  const nets = new THREE.Group();
  nets.add(loopNet, ffNet, ...lamps, pulseLoop, pulseFF);
  nets.add(arrow(V(-4.3, 0, 0), V(-3.3, 0, 0), kit));
  nets.add(arrow(V(-1.15, 0, 0), V(-0.85, 0, 0), kit, 0.02));
  nets.add(arrow(V(0.0, 0, 0), V(0.85, 0, 0), kit));
  nets.add(arrow(V(3.45, 0, 0), V(3.85, 0, 0), kit, 0.02));
  nets.position.copy(NET);
  nets.visible = false;
  scene.add(nets);

  // The testable preconditions: rings of stone around presence.
  const rings = [1.7, 2.45, 3.2, 3.95].map((r) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.1, 10, 96), kit.surface(0.05));
    m.rotation.x = Math.PI / 2;
    m.position.y = 0.1;
    m.visible = false;
    scene.add(m);
    return m;
  });
  const flat = line(
    circlePts(4.6, 96).map((p) => V(p.x, 0, p.y)),
    kit.soft,
    true
  );
  scene.add(flat);

  const ringAt = (r: number, a: number) => V(Math.cos(a) * r, 0.15, Math.sin(a) * r);
  const labels: Label3D[] = [
    { id: "presence", text: "PRESENCE", at: V(0, 1.85, 0), dx: -60, dy: -40 },
    { id: "nothing", text: "NOTHING EXTRA", at: V(2.4, 1.9, 0.75), dx: 50, dy: -40 },
    { id: "loops", text: "WITH LOOPS", at: NET.clone().add(V(-2.2, 1.0, 0)), dx: 0, dy: -40 },
    { id: "twin", text: "LOOP-FREE TWIN", at: NET.clone().add(V(2.2, 0.7, 0)), dx: 0, dy: -50 },
    { id: "same", text: "SAME BEHAVIOR", at: NET.clone().add(V(4.1, -0.25, 0)), dx: -30, dy: 60 },
    { id: "a", text: "TEST A", at: ringAt(1.7, 1.9), dx: -50, dy: 50 },
    { id: "b", text: "TEST B", at: ringAt(2.45, 1.3), dx: 10, dy: 60 },
    { id: "c", text: "CHECK C", at: ringAt(3.2, 0.75), dx: 50, dy: 50 },
    { id: "bet", text: "STANDING BET", at: ringAt(3.95, 2.45), dx: -40, dy: 40 },
  ];

  const k = narrow ? 1.05 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      needle.rotation.z = Math.PI * 0.85 - 0.02 * Math.sin(time * 2) - st.needle;
      if (!nets.visible) return;
      // One rhythm for both: the loop circles once, the twin passes once, the lamps flash together.
      const ph = (time * 0.6) % 1;
      const a = ph * Math.PI * 2 + Math.PI;
      pulseLoop.position.set(-2.2 + Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0.05);
      tmp.set(1.1 + ph * 2.25, Math.sin(ph * Math.PI * 3) * 0.7, 0.05);
      pulseFF.position.copy(tmp);
      lampMat.uniforms.tone.value = ph > 0.85 ? -0.9 : 0.4;
    },
    stops: [
      // 1 · Presence is not a signal: the instrument reads nothing extra.
      (tl, t, c) => {
        tl.addLabel("presence", t);
        tl.fromTo(
          kit.clip,
          { constant: -5 },
          { constant: 5, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 1, z: 0 },
          { x: 1.0, y: 1.1, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-4, 3, 7) },
          { ...view(-1, 1.8, 8), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { presence: 1 }, t + 1.8);
        pop(tl, meter, t + 2.2);
        lab(tl, c, { nothing: 1 }, t + 3.2);
      },
      // 2 · The unfolding argument: a loop-free twin behaves identically.
      (tl, t, c) => {
        tl.addLabel("unfolding", t);
        lab(tl, c, { presence: 0, nothing: 0 }, t);
        cam(tl, c, NET.clone().add(V(0, -0.3, 0)), view(0, 1.5, 11.5), t, 2.6, EASE);
        tl.set(nets, { visible: true }, t + 1);
        lab(tl, c, { loops: 1 }, t + 2.2);
        lab(tl, c, { twin: 1 }, t + 2.7);
        lab(tl, c, { same: 1 }, t + 3.6);
      },
      // 3 · What remains testable: the structural preconditions, ringed round presence.
      (tl, t, c) => {
        tl.addLabel("rings", t);
        lab(tl, c, { loops: 0, twin: 0, same: 0 }, t);
        cam(tl, c, V(0, 0.4, 0.4), view(0, 7.5, 10.5), t, 2.6, EASE);
        tl.set(nets, { visible: false }, t + 2.6);
        rings.forEach((r, i) => {
          tl.set(r, { visible: true }, t + 1.6 + i * 0.4);
          tl.fromTo(
            r.scale,
            { x: 0.6, y: 0.6, z: 1 },
            { x: 1, y: 1, z: 1, duration: 0.7, ease: EASE },
            t + 1.6 + i * 0.4
          );
        });
        lab(tl, c, { presence: 1 }, t + 2.4);
        lab(tl, c, { a: 1, b: 1 }, t + 3.0);
        lab(tl, c, { c: 1, bet: 1 }, t + 3.6);
      },
    ],
  };
}
