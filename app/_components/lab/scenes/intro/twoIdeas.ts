// The two ideas side by side. Left, the threshold: a bead climbs a rising curve of
// integration. Below the line the curve is hatched; as the bead crosses, an aperture
// opens above it and the curve runs on in clean paper. Right, Omega: one lamp behind a
// wall with five openings. Each opening is an aperture, and the one light passes through
// every one. Stops tween only plain state; the left aperture reads the bead's height.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  dashed,
  type Label3D,
  lab,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";

const XL = -3.6;
const XR = 3.6;
const TH = 1.65; // the threshold
const SPAN = 2.1;
const curveY = (x: number) => 0.35 + 2.6 / (1 + Math.exp(-2.2 * (x - XL)));

function growTube(mesh: THREE.Mesh, p: number) {
  const g = mesh.geometry as THREE.TubeGeometry;
  const { tubularSegments, radialSegments } = g.parameters;
  g.setDrawRange(
    0,
    Math.round(THREE.MathUtils.clamp(p, 0, 1) * tubularSegments) * radialSegments * 6
  );
}

export function twoIdeas(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { p: 0, ray: 0, open: [0, 0, 0, 0, 0] };

  const box = (w: number, h: number, d: number, x: number, y: number, z: number, tone: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), kit.surface(tone));
    m.position.set(x, y, z);
    scene.add(m);
    return m;
  };

  // ---- Threshold ----
  box(5, 0.12, 1.6, XL, -0.06, 0, 0.25);
  box(5, 3.5, 0.08, XL, 1.75, -0.4, -0.4);
  const ax = XL - 2.3;
  scene.add(
    segments([V(ax, 0.02, 0), V(ax, 3.3, 0), V(ax, 0.02, 0), V(XL + 2.3, 0.02, 0)], kit.ink)
  );
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 12), kit.ink);
  head.position.set(ax, 3.35, 0);
  scene.add(head);
  // The twilight band, hatched, and the threshold line through it.
  box(4.7, 0.24, 0.03, XL, TH, -0.33, 0.75);
  scene.add(dashed(V(ax, TH, -0.3), V(XL + 2.35, TH, -0.3), kit.ink, 0.1));

  const pts = (from: number, to: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = from + ((to - from) * i) / 40;
      return V(x, curveY(x), 0);
    });
  const tube = (p: THREE.Vector3[], tone: number) => {
    const m = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p), 60, 0.06, 8, false),
      kit.surface(tone)
    );
    growTube(m, 0);
    scene.add(m);
    return m;
  };
  const below = tube(pts(XL - SPAN, XL), 0.65);
  const above = tube(pts(XL, XL + SPAN), -0.7);
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), kit.ink);
  bead.visible = false;
  scene.add(bead);
  const pov = makeIris(kit, 0.13);
  pov.setOpen(0);
  pov.group.visible = false;
  scene.add(pov.group);

  // ---- Omega ----
  box(5.6, 0.12, 4.6, XR, -0.06, 0.3, 0.25);
  const holes = [
    [-1.7, 2.45],
    [0, 2.45],
    [1.7, 2.45],
    [-0.85, 1.05],
    [0.85, 1.05],
  ].map(([x, y]) => V(XR + x, y, 0));
  const shape = new THREE.Shape();
  shape.moveTo(-2.6, 0);
  shape.lineTo(2.6, 0);
  shape.lineTo(2.6, 3.4);
  shape.lineTo(-2.6, 3.4);
  shape.closePath();
  for (const h of holes) {
    const p = new THREE.Path();
    p.absarc(h.x - XR, h.y, 0.3, 0, Math.PI * 2, true);
    shape.holes.push(p);
  }
  const wallGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.2,
    bevelEnabled: false,
    curveSegments: 24,
  });
  const wall = new THREE.Mesh(wallGeo, kit.surface(0.35));
  wall.position.set(XR, 0, -0.1);
  scene.add(wall);
  const irises = holes.map((h) => {
    const iris = makeIris(kit, 0.3);
    iris.setOpen(0);
    iris.group.position.set(h.x, h.y, 0.12);
    iris.group.visible = false;
    scene.add(iris.group);
    return iris;
  });

  const lamp = new THREE.Group();
  const LAMP = V(XR, 1.75, -2.2);
  lamp.position.copy(LAMP);
  const glass = new THREE.Mesh(new THREE.OctahedronGeometry(0.3), kit.surface(-0.6));
  glass.scale.y = 1.4;
  lamp.add(glass);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.24, 16), kit.surface(0.4));
  cap.position.y = 0.48;
  lamp.add(cap);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8), kit.surface(0.2));
  stem.position.y = -1.15;
  lamp.add(stem);
  scene.add(lamp);
  const glow: THREE.Vector3[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    glow.push(
      V(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0),
      V(Math.cos(a) * 0.8, Math.sin(a) * 0.8, 0)
    );
  }
  const glowLines = segments(glow, kit.soft);
  glowLines.position.copy(LAMP);
  scene.add(glowLines);
  // One beam per opening, from the lamp out through it.
  const beams = holes.map((h) => {
    const dir = h.clone().sub(LAMP);
    const end = LAMP.clone().addScaledVector(dir, (2.4 - LAMP.z) / dir.z);
    const d = dashed(LAMP, end, kit.ink, 0.08);
    d.geometry.setDrawRange(0, 0);
    scene.add(d);
    return { d, n: d.geometry.attributes.position.count };
  });

  const povAt = V(0, 0, 0);
  const labels: Label3D[] = [
    { id: "integ", text: "INTEGRATION", at: V(ax, 3.1, 0), dx: 70, dy: -20 },
    { id: "thresh", text: "THRESHOLD", at: V(XL + 2.3, TH, -0.3), dx: 40, dy: 50 },
    { id: "pov", text: "A POINT OF VIEW", at: povAt, dx: -80, dy: -50 },
    { id: "light", text: "ONE LIGHT", at: LAMP.clone().add(V(0, 0.5, 0)), dx: 50, dy: -60 },
    { id: "apert", text: "APERTURES", at: holes[2].clone().add(V(0, 0, 0.2)), dx: 60, dy: -50 },
  ];

  const pull = narrow ? 1.08 : 1;
  const tmp = V(0, 0, 0);
  const open = (tl: gsap.core.Timeline, i: number, at: number) => {
    tl.set(irises[i].group, { visible: true }, at);
    tl.to(st.open, { [i]: 0.85, duration: 0.8, ease: "back.out(2)" }, at);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      growTube(below, st.p / 0.5);
      growTube(above, (st.p - 0.5) / 0.5);
      const x = XL - SPAN + st.p * SPAN * 2;
      tmp.set(x, curveY(x), 0.02);
      bead.position.copy(tmp);
      bead.visible = st.p > 0.001;
      const o = THREE.MathUtils.clamp((tmp.y - TH) / 0.5, 0, 1);
      pov.group.visible = o > 0.01;
      pov.setOpen(o * 0.85);
      pov.group.position.copy(tmp).add(V(0, 0.5, 0.1));
      povAt.copy(pov.group.position);
      irises.forEach((iris, i) => {
        iris.setOpen(st.open[i]);
      });
      for (const b of beams) b.d.geometry.setDrawRange(0, Math.round((st.ray * b.n) / 2) * 2);
    },
    stops: [
      // 1 · Threshold: a bead climbs the curve; past the line, a point of view opens.
      (tl, t, c) => {
        tl.addLabel("threshold", t);
        tl.fromTo(
          kit.clip,
          { constant: XL - 3 },
          { constant: 0, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: XL, y: 1.2, z: 0 },
          { x: XL, y: 1.6, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -3, y: 0.6, z: 7 },
          { x: 0.8 * pull, y: 1.2, z: 8.2 * pull, duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { integ: 1, thresh: 1 }, t + 1.8);
        tl.fromTo(st, { p: 0 }, { p: 1, duration: 4.2, ease: "none" }, t + 2.2);
        lab(tl, c, { pov: 1 }, t + 4.8);
      },
      // 2 · Omega: one light behind a wall, every opening an aperture of it.
      (tl, t, c) => {
        tl.addLabel("omega", t);
        lab(tl, c, { integ: 0, thresh: 0, pov: 0 }, t);
        tl.to(kit.clip, { constant: XR + 3.5, duration: 2, ease: "power1.inOut" }, t);
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        cam(tl, c, V(XR, 1.7, -1), V(6 * pull, 2.4, -5 * pull), t, 2.4, EASE);
        lab(tl, c, { light: 1 }, t + 2);
        cam(tl, c, V(XR, 1.6, 0), V(-1.6 * pull, 1.3, 8.6 * pull), t + 3.4, 2.8, EASE);
        lab(tl, c, { light: 0 }, t + 3.4);
        irises.forEach((_, i) => {
          open(tl, i, t + 4.4 + i * 0.25);
        });
        tl.to(st, { ray: 1, duration: 1.6, ease: "none" }, t + 5.2);
        lab(tl, c, { apert: 1 }, t + 6);
      },
      // 3 · Both at once. Neither changes the physics.
      (tl, t, c) => {
        tl.addLabel("both", t);
        lab(tl, c, { apert: 0 }, t);
        cam(tl, c, V(0, 1.6, 0), V(0, 2.6, 16 * pull), t, 3, EASE);
        lab(
          tl,
          c,
          narrow ? { thresh: 1, light: 1 } : { thresh: 1, pov: 1, light: 1, apert: 1 },
          t + 2.6
        );
      },
    ],
  };
}
