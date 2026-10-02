// Spacetime figure 4: traces. One observer stands on a cut slab of rock, an aperture open
// above. Starlight arrives from a distant star. The afterglow of the Big Bang arrives from
// every direction of a sky dome. A fossil in the rock below is read too. All three are
// the lit past reaching the present. Stops tween only plain state, so they fast-forward;
// the arriving light is an ambient loop driven from `update`.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  dashed,
  type Label3D,
  lab,
  line,
  makeIris,
  V,
} from "../../tourScenes3d";
import { dashedPath, makeStar, pathAt } from "./util";

const HX = 4.2;
const HZ = 2.4;
const STRATA = [0.55, 0.6, 0.5, 0.7]; // layer thicknesses, top down
const DOME = 7.5;
const STAND = V(0.3, 0, 1.2);
const EYE = V(0.3, 1.62, 1.3);

export function traces(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { open: 0, star: 0, ray: 0, dome: 0, glow: 0, fossil: 0, all: 0 };

  // The slab: strata, each its own block, darkening with depth.
  let y = 0;
  const seams: THREE.Vector3[] = [];
  STRATA.forEach((h, i) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(HX * 2, h, HZ * 2),
      kit.surface(-0.4 + i * 0.22)
    );
    m.position.y = y - h / 2;
    scene.add(m);
    y -= h;
    // Each seam wavers a little across the cut faces.
    if (i < STRATA.length - 1) {
      for (let j = 0; j < 24; j++) {
        const x0 = -HX + (2 * HX * j) / 24;
        const x1 = -HX + (2 * HX * (j + 1)) / 24;
        const w = (x: number) => y + 0.06 * Math.sin(x * 1.3 + i * 2);
        seams.push(V(x0, w(x0), HZ + 0.01), V(x1, w(x1), HZ + 0.01));
      }
      for (let j = 0; j < 12; j++) {
        const z0 = HZ - (2 * HZ * j) / 12;
        const z1 = HZ - (2 * HZ * (j + 1)) / 12;
        const w = (z: number) => y + 0.06 * Math.sin(z * 1.7 + i * 2 + HX * 1.3);
        seams.push(V(HX + 0.01, w(z0), z0), V(HX + 0.01, w(z1), z1));
      }
    }
  });
  scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seams), kit.ink));
  const bottom = y;

  // A fossil in the third layer, on the cut face: an ammonite's coiled shell.
  const fossil = new THREE.Group();
  const coil: THREE.Vector3[] = [];
  for (let a = 0; a < Math.PI * 6; a += 0.12) {
    const r = 0.03 * Math.exp(a * 0.135);
    coil.push(V(Math.cos(a) * r, Math.sin(a) * r, 0));
  }
  fossil.add(
    new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coil), 160, 0.035, 6), kit.ink)
  );
  const ribs: THREE.Vector3[] = [];
  for (let a = Math.PI * 2; a < Math.PI * 6; a += 0.35) {
    const r0 = 0.03 * Math.exp((a - Math.PI * 2) * 0.135);
    const r1 = 0.03 * Math.exp(a * 0.135);
    ribs.push(V(Math.cos(a) * r0, Math.sin(a) * r0, 0), V(Math.cos(a) * r1, Math.sin(a) * r1, 0));
  }
  fossil.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ribs), kit.ink));
  const fossilAt = V(1.7, -(STRATA[0] + STRATA[1] + STRATA[2] / 2), HZ + 0.02);
  fossil.position.copy(fossilAt);
  scene.add(fossil);

  // The observer, an aperture above.
  const person = makePerson(kit, 0.1);
  person.group.position.copy(STAND);
  person.group.rotation.y = 0.25;
  scene.add(person.group);
  const iris = makeIris(kit, 0.16);
  iris.group.position.set(STAND.x, 2.2, STAND.z);
  iris.setOpen(0);
  iris.group.visible = false;
  scene.add(iris.group);

  // Starlight: a far star, its light running to the eye.
  const starAt = V(-6.2, 4.6, -3);
  const star = makeStar(kit, 0.3);
  star.position.copy(starAt);
  star.visible = false;
  scene.add(star);
  const ray = dashed(starAt, EYE, kit.ink, 0.09);
  const rayN = ray.geometry.attributes.position.count;
  ray.visible = false;
  scene.add(ray);

  // The afterglow: a sky dome, and light arriving from all around it.
  const dome = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI;
    dome.add(
      line(
        circlePts(DOME, 96)
          .filter((p) => p.y >= -0.01)
          .map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        kit.soft
      )
    );
  }
  for (const lat of [0, 0.4, 0.8, 1.15]) {
    dome.add(
      line(
        circlePts(DOME * Math.cos(lat), 96).map((p) => V(p.x, DOME * Math.sin(lat), p.y)),
        lat === 0 ? kit.ink : kit.soft,
        true
      )
    );
  }
  dome.visible = false;
  scene.add(dome);
  const glowDirs = Array.from({ length: 12 }, (_, i) => {
    const az = (i / 12) * Math.PI * 2 + 0.3;
    const el = 0.25 + (i % 3) * 0.35;
    return V(Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az));
  });
  const glow = glowDirs.map((d) => {
    const from = d
      .clone()
      .multiplyScalar(DOME)
      .add(V(0, 0, 0));
    const g = new THREE.Group();
    g.add(dashed(from, EYE, kit.soft, 0.12));
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), kit.ink);
    g.add(p);
    g.visible = false;
    scene.add(g);
    return { g, p, from };
  });

  // The fossil's trace: read by the eye.
  const readPath = [
    fossilAt.clone().add(V(0, 0, 0.1)),
    fossilAt.clone().add(V(-0.2, 0.3, 1.1)),
    EYE,
  ];
  const read = dashedPath(readPath, kit.ink, 0.07);
  const readN = read.geometry.attributes.position.count;
  read.visible = false;
  scene.add(read);
  const photons = [0, 1].map(() => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), kit.ink);
    p.visible = false;
    scene.add(p);
    return p;
  });

  const labels: Label3D[] = [
    { id: "obs", text: "AN OBSERVER", at: V(0.2, 1.1, 0), dx: 90, dy: -30 },
    { id: "star", text: "STARLIGHT", at: starAt.clone().lerp(EYE, 0.35), dx: -40, dy: 45 },
    {
      id: "glow",
      text: "THE BIG BANG'S AFTERGLOW",
      at: V(DOME * 0.5, DOME * 0.86, 0),
      dx: 60,
      dy: -30,
    },
    {
      id: "fossil",
      text: "THE FOSSIL RECORD",
      at: fossilAt.clone().add(V(0.3, -0.1, 0)),
      dx: 110,
      dy: 30,
    },
    { id: "past", text: "ALL ARRIVING NOW", at: EYE, dx: 120, dy: 10 },
  ];
  if (narrow) {
    for (const l of labels) {
      if (l.id === "glow") l.dx = -40;
      if (l.id === "fossil") l.dx = 30;
      if (l.id === "past") l.dx = 80;
    }
  }

  const k = narrow ? 1.15 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      iris.setOpen(st.open);
      iris.group.visible = st.open > 0.01;
      ray.geometry.setDrawRange(0, Math.round((st.ray * rayN) / 2) * 2);
      read.geometry.setDrawRange(0, Math.round((st.fossil * readN) / 2) * 2);
      // Light keeps arriving: the star's, the afterglow from every side, and once all are
      // shown, a bead running up from the fossil.
      const loopStar = st.ray >= 1;
      photons[0].visible = st.ray > 0 && (st.ray < 1 || loopStar);
      const sp = loopStar ? (time * 0.35) % 1 : st.ray;
      photons[0].position.copy(starAt).lerp(EYE, sp);
      photons[1].visible = st.all > 0.5;
      pathAt(readPath, (time * 0.3) % 1, photons[1].position);
      glow.forEach((g, i) => {
        g.g.visible = st.glow > 0.01;
        const f = ((time * 0.22 + i * 0.37) % 1) * st.glow;
        g.p.position.copy(tmp.copy(g.from).lerp(EYE, f));
      });
      dome.visible = st.dome > 0.01;
      dome.scale.setScalar(Math.max(st.dome, 0.001));
    },
    stops: [
      // 1 · An observer on a cut slab of the world, an aperture open.
      (tl: gsap.core.Timeline, t, c) => {
        tl.addLabel("observer", t);
        tl.fromTo(
          kit.clip,
          { constant: bottom - 0.1 },
          { constant: 40, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: 0, y: -1, z: 0 },
          { x: 0, y: 0, z: 0.6, duration: 3.2, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-3, 1, 9) },
          { ...view(3, 3.2, 13), duration: 3.2, ease: EASE },
          t
        );
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 2.4);
        lab(tl, c, { obs: 1 }, t + 2.8);
      },
      // 2 · Starlight: a far star, its light arriving at the eye.
      (tl, t, c) => {
        tl.addLabel("starlight", t);
        lab(tl, c, { obs: 0 }, t);
        cam(tl, c, V(-2.2, 2, -1), view(3, 2, 14), t, 2.2, EASE);
        tl.set(star, { visible: true }, t + 1);
        tl.fromTo(
          star.scale,
          { x: 0.01, y: 0.01, z: 0.01 },
          { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(2.4)" },
          t + 1
        );
        tl.set(ray, { visible: true }, t + 1.5);
        tl.fromTo(st, { ray: 0 }, { ray: 1, duration: 2.4, ease: "none" }, t + 1.5);
        lab(tl, c, { star: 1 }, t + 2.4);
      },
      // 3 · The afterglow of the Big Bang, arriving from every direction of the sky.
      (tl, t, c) => {
        tl.addLabel("afterglow", t);
        lab(tl, c, { star: 0 }, t);
        cam(tl, c, V(0, 2.2, 0), view(6, 7, 22), t, 2.6, EASE);
        tl.fromTo(st, { dome: 0 }, { dome: 1, duration: 2, ease: EASE }, t + 0.8);
        tl.fromTo(st, { glow: 0 }, { glow: 1, duration: 2, ease: "power1.inOut" }, t + 2.2);
        lab(tl, c, { glow: 1 }, t + 3);
      },
      // 4 · The fossil record: the past kept in rock, read by the eye.
      (tl, t, c) => {
        tl.addLabel("fossil", t);
        lab(tl, c, { glow: 0 }, t);
        tl.to(st, { dome: 0, glow: 0, duration: 0.8, ease: "power2.in" }, t);
        cam(tl, c, V(0.9, -0.1, 1.6), view(4, 1.6, 9.5), t, 2.4, EASE);
        tl.set(read, { visible: true }, t + 1.8);
        tl.fromTo(st, { fossil: 0 }, { fossil: 1, duration: 1.4, ease: "none" }, t + 1.8);
        lab(tl, c, { fossil: 1 }, t + 2.2);
      },
      // 5 · All of it is the lit past, arriving now.
      (tl, t, c) => {
        tl.addLabel("lit", t);
        lab(tl, c, { fossil: 0 }, t);
        tl.set(st, { all: 1 }, t + 0.6);
        tl.to(st, { dome: 1, glow: 1, duration: 1.6, ease: EASE }, t + 0.8);
        cam(tl, c, V(-0.6, 1.4, 0), view(5, 4.5, 19), t, 2.8, EASE);
        lab(tl, c, { star: 1, glow: 1, fossil: 1 }, t + 2.4);
        lab(tl, c, { past: 1 }, t + 3.2);
      },
    ],
  };
}
