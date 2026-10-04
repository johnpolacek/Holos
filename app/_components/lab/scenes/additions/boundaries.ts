// Logic figure, Open Problems: where one observer ends and another begins. Integration is
// drawn as a landscape over a field of systems. Only a local maximum is an aperture, so an
// aperture sits on each peak. Around one peak, several candidate boundaries overlap, and
// no procedure yet says which are compared or how overlaps resolve. Last, the measure
// itself changes, the landscape shifts, and the peaks move with it: until the measure and
// the procedure are fixed, the boundaries are fixed only in principle.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, makeIris, show, V } from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";

const S = 4; // half size of the landscape
const N = 64;
type Peak = { x: number; z: number; h: number; w: number };
const MEASURE_A: Peak[] = [
  { x: -2, z: -0.6, h: 1.7, w: 0.75 },
  { x: 1.4, z: 0.8, h: 1.4, w: 0.65 },
  { x: 0.9, z: -1.9, h: 0.9, w: 0.55 },
  { x: -0.4, z: 1.6, h: 0.6, w: 0.9 },
];
const MEASURE_B: Peak[] = [
  { x: -1.6, z: -0.2, h: 1.3, w: 1 },
  { x: 1.8, z: 1.1, h: 1.6, w: 0.55 },
  { x: 0.3, z: -1.7, h: 1.2, w: 0.7 },
  { x: -0.8, z: 1.8, h: 0.4, w: 0.8 },
];

const heightAt = (x: number, z: number, m: number) => {
  let y = 0;
  for (let i = 0; i < MEASURE_A.length; i++) {
    const a = MEASURE_A[i];
    const b = MEASURE_B[i];
    const px = a.x + (b.x - a.x) * m;
    const pz = a.z + (b.z - a.z) * m;
    const h = a.h + (b.h - a.h) * m;
    const w = a.w + (b.w - a.w) * m;
    y += h * Math.exp(-((x - px) ** 2 + (z - pz) ** 2) / (2 * w * w));
  }
  return y;
};

export function boundaries(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { measure: 0, rise: 0, loops: 0 };

  // The landscape: a sheet whose height is integration.
  const geo = new THREE.PlaneGeometry(2 * S, 2 * S, N, N);
  geo.rotateX(-Math.PI / 2);
  const land = new THREE.Mesh(geo, kit.surface(0.1));
  scene.add(land);
  const pos = geo.attributes.position;
  // Grid lines riding on the surface, so the relief reads as an engraving.
  const ribs = Array.from({ length: 9 }, (_, i) => {
    const x = -S + ((i + 0.5) * 2 * S) / 9;
    const l = line(
      Array.from({ length: 65 }, () => V(0, 0, 0)),
      kit.soft
    );
    l.userData.x = x;
    scene.add(l);
    return l;
  });
  let lastM = -1;
  let lastRise = -1;
  const reshape = () => {
    if (st.measure === lastM && st.rise === lastRise) return;
    lastM = st.measure;
    lastRise = st.rise;
    for (let i = 0; i < pos.count; i++)
      pos.setY(i, heightAt(pos.getX(i), pos.getZ(i), st.measure) * st.rise);
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    for (const rib of ribs) {
      const p = rib.geometry.attributes.position;
      for (let j = 0; j < p.count; j++) {
        const z = -S + (j / (p.count - 1)) * 2 * S;
        p.setXYZ(j, rib.userData.x, heightAt(rib.userData.x, z, st.measure) * st.rise + 0.012, z);
      }
      p.needsUpdate = true;
    }
  };

  // Small systems dotted over the field below.
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2 * S + 0.4, 0.12, 2 * S + 0.4),
    kit.surface(0.05)
  );
  base.position.y = -0.07;
  scene.add(base);

  // An aperture on each of the two highest peaks.
  const irises = [0, 1].map(() => {
    const iris = makeIris(kit, 0.22);
    iris.group.visible = false;
    scene.add(iris.group);
    return iris;
  });
  const peakAt = (i: number, m: number) => {
    const a = MEASURE_A[i];
    const b = MEASURE_B[i];
    const x = a.x + (b.x - a.x) * m;
    const z = a.z + (b.z - a.z) * m;
    return V(x, heightAt(x, z, m), z);
  };

  // Candidate boundaries around the first peak: overlapping loops on the surface.
  const loopAt = (cx: number, cz: number, r: number, m: number) =>
    Array.from({ length: 73 }, (_, i) => {
      const a = (i / 72) * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      return V(x, heightAt(x, z, m) + 0.03, z);
    });
  const cands = [
    { dx: 0, dz: 0, r: 0.55 },
    { dx: 0.35, dz: 0.2, r: 0.95 },
    { dx: 0.9, dz: 0.5, r: 1.6 },
  ].map((cd) => {
    const l = line(loopAt(MEASURE_A[0].x + cd.dx, MEASURE_A[0].z + cd.dz, cd.r, 0), kit.ink, true);
    l.visible = false;
    scene.add(l);
    return l;
  });

  const labels: Label3D[] = [
    { id: "integ", text: "INTEGRATION, AS HEIGHT", at: V(S, 0.1, -S), dx: 40, dy: -30 },
    {
      id: "peak",
      text: "A LOCAL MAXIMUM, AN APERTURE",
      at: peakAt(0, 0).add(V(0, 0.5, 0)),
      dx: -60,
      dy: -60,
    },
    {
      id: "cands",
      text: "WHICH CANDIDATES ARE COMPARED",
      at: loopAt(MEASURE_A[0].x + 0.9, MEASURE_A[0].z + 0.5, 1.6, 0)[9],
      dx: 80,
      dy: -40,
    },
    {
      id: "overlap",
      text: "HOW OVERLAPS RESOLVE",
      at: loopAt(MEASURE_A[0].x + 0.35, MEASURE_A[0].z + 0.2, 0.95, 0)[30],
      dx: -80,
      dy: 60,
    },
    { id: "measure", text: "ANOTHER MEASURE, OTHER PEAKS", at: V(S, 0.4, S), dx: 40, dy: 50 },
  ];

  const k = narrow ? 1.15 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.6, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      reshape();
      irises.forEach((iris, i) => {
        const p = peakAt(i, st.measure);
        iris.group.position.set(p.x, p.y * st.rise + 0.55, p.z);
      });
      for (const l of cands) l.visible = st.loops > 0.5 && st.measure < 0.05;
    },
    stops: [
      // 1 · A local maximum: the landscape rises, and an aperture sits on each high peak.
      (tl, t, c) => {
        tl.addLabel("peaks", t);
        tl.fromTo(
          kit.clip,
          { constant: -S - 0.5 },
          { constant: S + 0.5, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(st, { rise: 0 }, { rise: 1, duration: 1.8, ease: "power2.inOut" }, t + 1);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(0, 0, 0)) },
          { ...xyz(home), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(0, 9, 6)) },
          { ...xyz(view(3.4, 8.6, 15)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { integ: 1 }, t + 2.4);
        for (const iris of irises) show(tl, iris.group, t + 2.8, 0.6);
        lab(tl, c, { peak: 1 }, t + 3.2);
      },
      // 2 · Overlapping candidates: several boundaries around one peak, none yet chosen.
      (tl, t, c) => {
        tl.addLabel("candidates", t);
        lab(tl, c, { integ: 0, peak: 0 }, t);
        cam(
          tl,
          c,
          V(MEASURE_A[0].x + 0.4, 0.8, MEASURE_A[0].z + 0.3),
          view(1.4, 6.4, 7.6),
          t,
          2.4,
          EASE
        );
        tl.set(st, { loops: 1 }, t + 1);
        lab(tl, c, { cands: 1 }, t + 1.6);
        lab(tl, c, { overlap: 1 }, t + 2.2);
      },
      // 3 · Fixed only in principle: the measure changes, the landscape shifts, the peaks move.
      (tl, t, c) => {
        tl.addLabel("measure", t);
        lab(tl, c, { cands: 0, overlap: 0 }, t);
        cam(tl, c, home, view(-3, 8.6, 15), t, 2.4, EASE);
        tl.fromTo(st, { measure: 0 }, { measure: 1, duration: 2.4, ease: "sine.inOut" }, t + 0.8);
        lab(tl, c, { measure: 1 }, t + 2.6);
      },
    ],
  };
}
