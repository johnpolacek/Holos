// Figure Ω4: lineage. An engraved beam runs through time, broken between eras. Each
// tradition Holos stands in is a solid pillar; Teilhard and Tipler, whose Omega was an
// endpoint, stand only in outline, since Holos borrows their word and not their meaning.
// The camera dollies era by era as the beam engraves in. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "./engrave3d";
import { EASE } from "./figures3d";
import { type Built3D, cam, type Label3D, lab, makeIris, segments, V } from "./tourScenes3d";

type Mark = { id: string; text: string; x: number; h: number; echo?: boolean };

// Eras are spaced evenly, not to scale: the beam breaks between them.
const ERAS = [
  { x0: -13, x1: -7.5 },
  { x0: -6, x1: -1.5 },
  { x0: 0, x1: 7 },
  { x0: 8.5, x1: 13 },
];
const MARKS: Mark[] = [
  { id: "upanishads", text: "UPANISHADS, C. 700 BCE", x: -11.6, h: 2.2 },
  { id: "shankara", text: "SHANKARA, ADVAITA, 8TH C.", x: -8.8, h: 2.8 },
  { id: "spinoza", text: "SPINOZA, 1677", x: -4.6, h: 2.5 },
  { id: "berkeley", text: "BERKELEY, 1710", x: -2.6, h: 2.0 },
  { id: "teilhard", text: "TEILHARD, 1955", x: 1.4, h: 2.2, echo: true },
  { id: "schrodinger", text: "SCHRÖDINGER, 1958", x: 3.4, h: 3.0 },
  { id: "tipler", text: "TIPLER, 1986", x: 5.6, h: 2.0, echo: true },
  { id: "kolak", text: "KOLAK, 2004", x: 9.8, h: 2.6 },
  { id: "holos", text: "HOLOS", x: 11.8, h: 3.2 },
];

export function lineage(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { open: 0 };

  // The beam, one section per era, with year ticks along its face.
  for (const e of ERAS) {
    const len = e.x1 - e.x0;
    const beam = new THREE.Mesh(new THREE.BoxGeometry(len, 0.32, 1.1), kit.surface(0.25));
    beam.position.set((e.x0 + e.x1) / 2, -0.16, 0);
    scene.add(beam);
    const ticks: THREE.Vector3[] = [];
    for (let x = e.x0 + 0.5; x < e.x1; x += 0.5) ticks.push(V(x, -0.1, 0.56), V(x, -0.26, 0.56));
    scene.add(segments(ticks, kit.ink));
  }
  // The breaks: a pair of slashes in each gap.
  const slashes: THREE.Vector3[] = [];
  for (let i = 0; i < ERAS.length - 1; i++) {
    const mid = (ERAS[i].x1 + ERAS[i + 1].x0) / 2;
    for (const d of [-0.18, 0.18])
      slashes.push(V(mid + d - 0.15, -0.4, 0.56), V(mid + d + 0.15, 0.1, 0.56));
  }
  scene.add(segments(slashes, kit.ink));

  // A pillar per mark: solid where Holos stands in the line, outline where it only echoes.
  for (const m of MARKS) {
    const geo = new THREE.BoxGeometry(0.42, m.h, 0.42);
    geo.translate(0, m.h / 2, 0);
    const base = new THREE.BoxGeometry(0.7, 0.16, 0.7);
    base.translate(0, 0.08, 0);
    const g = new THREE.Group();
    g.position.set(m.x, 0, 0);
    if (m.echo) {
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), kit.soft));
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(base), kit.soft));
    } else {
      g.add(new THREE.Mesh(geo, kit.surface(0.1)));
      g.add(new THREE.Mesh(base, kit.surface(0.3)));
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.32, 4), kit.surface(0.1));
      cap.rotation.y = Math.PI / 4;
      cap.position.y = m.h + 0.16;
      g.add(cap);
    }
    scene.add(g);
  }
  const holos = MARKS[MARKS.length - 1];
  const iris = makeIris(kit, 0.16);
  iris.setOpen(0);
  iris.group.position.set(holos.x, holos.h + 0.85, 0.05);
  scene.add(iris.group);

  // Labels alternate above the pillar tops and below the beam, so neighbours never collide.
  const labels: Label3D[] = MARKS.map((m, i) =>
    i % 2
      ? { id: m.id, text: m.text, at: V(m.x, -0.3, 0.56), dx: 0, dy: 56 }
      : { id: m.id, text: m.text, at: V(m.x, m.h + 0.35, 0), dx: 0, dy: -40 }
  );
  labels.push({
    id: "echo",
    text: "THE NAME, NOT THE ENDPOINT",
    at: V(1.4, 1.6, 0),
    dx: -20,
    dy: -80,
  });

  const back = narrow ? 1.35 : 1;
  const era = (i: number) => {
    const e = ERAS[i];
    return { t: V((e.x0 + e.x1) / 2, 1.3, 0), o: V(1.2 * back, 2.2 * back, 9.5 * back) };
  };
  const reveal = (tl: gsap.core.Timeline, to: number, at: number) =>
    tl.to(kit.clip, { constant: to, duration: 2.2, ease: "power1.inOut" }, at);
  const visit = (
    tl: gsap.core.Timeline,
    c: Parameters<Built3D["stops"][number]>[2],
    i: number,
    at: number
  ) => cam(tl, c, era(i).t, era(i).o, at, 2.4, EASE);
  const ids = (from: number, to: number, v: number) =>
    Object.fromEntries(MARKS.slice(from, to).map((m) => [m.id, v]));

  return {
    scene,
    kit,
    labels,
    update: () => {
      iris.setOpen(st.open);
    },
    stops: [
      // 1 · One experiencer behind every eye: the Upanishads and Advaita.
      (tl, t, c) => {
        tl.addLabel("ancient", t);
        tl.fromTo(
          kit.clip,
          { constant: -14 },
          { constant: ERAS[0].x1 + 0.4, duration: 2.4, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { ...era(0).t, x: -15 },
          { ...era(0).t, duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -4, y: 1, z: 8 * back },
          { ...era(0).o, duration: 2.8, ease: EASE },
          t
        );
        lab(tl, c, ids(0, 2, 1), t + 2.2);
      },
      // 2 · One substance, one perceiver: Spinoza and Berkeley.
      (tl, t, c) => {
        tl.addLabel("modern", t);
        lab(tl, c, ids(0, 2, 0), t);
        reveal(tl, ERAS[1].x1 + 0.4, t);
        visit(tl, c, 1, t);
        lab(tl, c, ids(2, 4, 1), t + 2.2);
      },
      // 3 · A singular of which the plural is unknown; and the name Omega, borrowed.
      (tl, t, c) => {
        tl.addLabel("twentieth", t);
        lab(tl, c, ids(2, 4, 0), t);
        reveal(tl, ERAS[2].x1 + 0.4, t);
        visit(tl, c, 2, t);
        lab(tl, c, ids(4, 7, 1), t + 2.2);
        // On narrow screens the caption carries this; the label would collide with the names.
        if (!narrow) lab(tl, c, { echo: 1 }, t + 3.2);
      },
      // 4 · Open individualism, and Holos at the end of the beam.
      (tl, t, c) => {
        tl.addLabel("now", t);
        lab(tl, c, { ...ids(4, 7, 0), echo: 0 }, t);
        reveal(tl, ERAS[3].x1 + 0.6, t);
        visit(tl, c, 3, t);
        lab(tl, c, ids(7, 9, 1), t + 2.2);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 2.6);
        cam(tl, c, V(0, 1.4, 0), V(0, 4 * back, 31 * back), t + 4.2, 3.2, EASE);
        lab(tl, c, ids(7, 9, 0), t + 4.2);
      },
    ],
  };
}
