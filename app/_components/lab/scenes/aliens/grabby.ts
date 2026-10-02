// Figure A5: grabby aliens and the waste-heat cap. A field of galaxies; settler bubbles
// swell at near light speed and hatch every galaxy they take. One bubble nears our galaxy,
// its light only just ahead of its wall: we are early. Then 129 nearby galaxies, and one
// galaxy's light as a long clean bar with a hatched sliver at its end: the cap on waste
// heat. Stops tween only plain state.

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
  makeIris,
  V,
} from "../../tourScenes3d";
import { makeBeam, makeGlobe, rng } from "./common";

const SY = -22; // the survey row
const BAR = 14;
const CAP = 0.003;

export function aliensGrabby(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { grow: 0, open: 0, survey: 0 };
  const r = rng(41);

  const discGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.04, 24);
  const bulgeGeo = new THREE.SphereGeometry(0.08, 12, 8);
  const free = kit.surface(-0.4);
  const taken = kit.surface(0.85);
  const galaxyIcon = (p: THREE.Vector3, s = 1) => {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(discGeo, free);
    g.add(disc);
    const bulge = new THREE.Mesh(bulgeGeo, free);
    g.add(bulge);
    g.position.copy(p);
    g.rotation.set(0.9 + r() * 0.8, r() * 3, r() * 0.6);
    g.scale.setScalar(s);
    scene.add(g);
    return { g, disc, bulge };
  };

  // ---------- The field and its bubbles ----------
  const us = V(1.6, -0.6, 1.2);
  const field: ReturnType<typeof galaxyIcon>[] = [];
  for (let i = 0; i < 70; i++) {
    const p = V((r() - 0.5) * 20, (r() - 0.5) * 9, (r() - 0.5) * 8);
    if (p.distanceTo(us) < 1.2) continue;
    field.push(galaxyIcon(p, 0.8 + r() * 0.5));
  }
  galaxyIcon(us, 1.1);
  const iris = makeIris(kit, 0.09);
  iris.setOpen(0);
  iris.group.position.copy(us).add(V(0, 0.45, 0.2));
  iris.group.visible = false;
  scene.add(iris.group);

  const seeds = [
    { c: V(-6.5, 1.5, -1.5), max: 4.2 },
    { c: V(5.5, 2.4, -2.5), max: 3.4 },
    { c: V(-1.4, -1.6, 0.4), max: 0 }, // set below: stops just short of us
  ];
  seeds[2].max = seeds[2].c.distanceTo(us) - 0.55;
  const bubbles = seeds.map((s) => {
    const globe = makeGlobe(kit, 1, 10, kit.soft);
    globe.position.copy(s.c);
    scene.add(globe);
    // Their light runs only a little ahead of the wall.
    const front = new THREE.Group();
    for (const rot of [0, Math.PI / 2]) {
      const l = line(circlePts(1.07, 96), kit.ink, true);
      l.rotation.y = rot;
      front.add(l);
    }
    front.position.copy(s.c);
    scene.add(front);
    return { ...s, globe, front };
  });

  // ---------- 129 nearby galaxies, and one galaxy's light ----------
  const survey = new THREE.Group();
  survey.position.set(0, SY, 0);
  scene.add(survey);
  const surveyed: THREE.Object3D[] = [];
  for (let i = 0; i < 129; i++) {
    const col = i % 19;
    const row = Math.floor(i / 19);
    const p = V(
      -9 + col + (r() - 0.5) * 0.5,
      4.6 - row * 0.85 + (r() - 0.5) * 0.3,
      (r() - 0.5) * 1.5
    );
    const icon = galaxyIcon(p.add(survey.position), 0.85);
    surveyed.push(icon.g);
  }
  const bar = makeBeam(kit, -BAR / 2, BAR / 2, { h: 0.5, d: 0.6, tone: -0.6, tick: 0 });
  bar.group.position.set(0, SY - 1.4, 0);
  scene.add(bar.group);
  const capGeo = new THREE.BoxGeometry(BAR * CAP, 0.56, 0.66);
  capGeo.translate(-(BAR * CAP) / 2, -0.25, 0);
  const cap = new THREE.Mesh(capGeo, kit.ink);
  cap.position.set(BAR / 2, SY - 1.4, 0);
  scene.add(cap);

  const labels: Label3D[] = [
    { id: "grabby", text: "SETTLERS NEAR LIGHT SPEED", at: V(-6.5, 5.7, -1.5), dx: 40, dy: -30 },
    { id: "us", text: "US, EARLY", at: iris.group.position, dx: 70, dy: -50 },
    { id: "light", text: "THEIR LIGHT, JUST AHEAD", at: V(0, 0, 0), dx: -60, dy: 70 },
    { id: "survey", text: "129 NEARBY GALAXIES", at: V(0, SY + 5.1, 0), dx: 0, dy: -36 },
    { id: "galaxy", text: "A TYPICAL GALAXY'S LIGHT", at: V(-3, SY - 1.65, 0.3), dx: 0, dy: 44 },
    {
      id: "cap",
      text: "WASTE HEAT, UNDER 0.3 PERCENT",
      at: V(BAR / 2 - (BAR * CAP) / 2, SY - 1.15, 0.3),
      dx: -110,
      dy: -60,
    },
  ];
  const lightAt = labels[2].at;

  const k = narrow ? 1.05 : 1;

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const b of bubbles) {
        const rad = Math.max(b.max * st.grow, 0.01);
        b.globe.scale.setScalar(rad);
        b.front.scale.setScalar(rad);
        b.globe.visible = st.grow > 0.01;
        b.front.visible = b.globe.visible;
      }
      const near = bubbles[2];
      lightAt
        .copy(us)
        .sub(near.c)
        .normalize()
        .multiplyScalar(near.max * st.grow * 1.07)
        .add(near.c);
      for (const f of field) {
        const inside = bubbles.some((b) => f.g.position.distanceTo(b.c) < b.max * st.grow);
        f.disc.material = inside ? taken : free;
        f.bulge.material = f.disc.material;
      }
      iris.setOpen(st.open);
      for (const s of surveyed) s.visible = st.survey > 0.5;
    },
    stops: [
      // 1 · Hanson's grabby aliens: settlers expanding near light speed.
      (tl, t, c) => {
        tl.addLabel("grabby", t);
        tl.fromTo(
          kit.clip,
          { constant: -10.5 },
          { constant: 10.5, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { x: -3, y: 0, z: 0 },
          { x: 0, y: 0.6, z: 0, duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -3, y: 1, z: 18 * k },
          { x: 0, y: 2.5 * k, z: 25 * k, duration: 2.8, ease: EASE },
          t
        );
        tl.to(st, { grow: 0.8, duration: 4, ease: "none" }, t + 1.4);
        lab(tl, c, { grabby: 1 }, t + 3.2);
      },
      // 2 · They would arrive almost as soon as we saw them. We are early.
      (tl, t, c) => {
        tl.addLabel("early", t);
        lab(tl, c, { grabby: 0 }, t);
        tl.to(st, { grow: 1, duration: 2.6, ease: "none" }, t);
        cam(tl, c, us.clone().add(V(-1.4, 0.2, 0)), V(1.5, 1.4 * k, 9 * k), t, 2.6, EASE);
        tl.set(iris.group, { visible: true }, t + 1.6);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 1.6);
        lab(tl, c, { us: 1 }, t + 2.4);
        lab(tl, c, { light: 1 }, t + 3);
      },
      // 3 · A 2026 study of 129 nearby galaxies.
      (tl, t, c) => {
        tl.addLabel("survey", t);
        lab(tl, c, { us: 0, light: 0 }, t);
        tl.set(st, { survey: 1 }, t);
        cam(tl, c, V(0, SY + 1.6, 0), V(0, 1.5 * k, 21 * k), t, 2.8, EASE);
        lab(tl, c, { survey: 1 }, t + 2.4);
      },
      // 4 · No sign of it: such heat is under 0.3 percent of a typical galaxy's light.
      (tl, t, c) => {
        tl.addLabel("cap", t);
        lab(tl, c, { survey: 0 }, t);
        cam(tl, c, V(BAR / 2 - 0.4, SY - 1.5, 0), V(-0.6, 0.6, 3.2 * k), t, 2.4, EASE);
        lab(tl, c, { cap: 1 }, t + 2.2);
        cam(tl, c, V(0.6, SY - 0.6, 0), V(0, 1.4 * k, 17 * k), t + 3.6, 2.8, EASE);
        lab(tl, c, { galaxy: 1 }, t + 5.6);
      },
    ],
  };
}
