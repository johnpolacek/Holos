// Teeming Dark, figure 1: what shines, and the matter budget.
// An iceberg: a small clean tip above the waterline, a large hatched body below it. Then a
// graduated jar of ordinary matter, filled nearly to the brim with what surveys found, a
// couple of hatched pebbles of hidden mass in the thin gap, and many small apertures
// opening in that gap: poor in hidden mass, rich in minds. Stops tween only plain state.

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
  segments,
  V,
} from "../../tourScenes3d";
import { seeded } from "./common";

const JAR_X = 10;
const JAR_R = 1.15;
const JAR_H = 3.35;
const BLOCK = 0.44;
const LAYERS = 6;

function makeIceberg() {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const rnd = seeded(11);
  const jitter = new Map<string, number>();
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
    if (!jitter.has(key)) jitter.set(key, 0.82 + rnd() * 0.3);
    const k = jitter.get(key) ?? 1;
    v.multiplyScalar(k);
    // A peaked top and a wide, heavy base.
    if (v.y > 0.4) {
      v.x *= 0.75;
      v.z *= 0.75;
      v.y *= 1.25;
    }
    pos.setXYZ(i, v.x * 1.9, v.y * 2.7, v.z * 1.6);
  }
  geo.computeVertexNormals();
  geo.translate(0, -2.3, 0);
  return geo;
}

export function budget(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { fill: 0, open: 0 };

  // The iceberg: one shape, two materials split at the waterline. The body below
  // sweeps in downward on its own plane.
  const geo = makeIceberg();
  const above = kit.surface(-0.7);
  above.clippingPlanes = [kit.clip, new THREE.Plane(V(0, 1, 0), 0)];
  const tip = new THREE.Mesh(geo, above);
  scene.add(tip);
  const sweep = new THREE.Plane(V(0, 1, 0), 0);
  const below = kit.surface(0.62);
  below.clippingPlanes = [kit.clip, new THREE.Plane(V(0, -1, 0), 0), sweep];
  const body = new THREE.Mesh(geo, below);
  scene.add(body);

  // The waterline traced around the berg, and the water as soft ripple lines.
  tip.updateMatrixWorld();
  const ray = new THREE.Raycaster();
  const rim: THREE.Vector3[] = [];
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const from = V(Math.cos(a) * 6, 0.001, Math.sin(a) * 6);
    ray.set(from, from.clone().multiplyScalar(-1).normalize());
    const hit = ray.intersectObject(tip)[0] ?? ray.intersectObject(body)[0];
    if (hit) rim.push(hit.point.setY(0.01));
  }
  scene.add(line(rim, kit.ink, true));
  const water: THREE.Vector3[] = [];
  for (let z = -6.2; z <= 4.2; z += 0.55) {
    for (let x = -14; x < 7; x += 0.5) {
      const w = (x: number) => z + Math.sin(x * 1.3 + z * 2) * 0.06;
      // Ripples stop at the berg, so nothing rules across the ice.
      const inside = (x: number) => (x / 1.05) ** 2 + (w(x) / 0.95) ** 2 < 1;
      if (inside(x) || inside(x + 0.5)) continue;
      water.push(V(x, 0, w(x)), V(x + 0.5, 0, w(x + 0.5)));
    }
  }
  scene.add(segments(water, kit.soft));

  // The jar: ink rims, soft glass, graduation ticks, on a low plinth.
  const jar = new THREE.Group();
  jar.position.set(JAR_X, -1.2, 0);
  scene.add(jar);
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.3, 3.2), kit.surface(0.2));
  plinth.position.y = -0.15;
  jar.add(plinth);
  for (const y of [0, JAR_H]) {
    jar.add(
      line(
        circlePts(JAR_R, 64).map((p) => V(p.x, y, p.y)),
        kit.ink,
        true
      )
    );
  }
  const glass: THREE.Vector3[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + 0.2;
    glass.push(
      V(Math.cos(a) * JAR_R, 0, Math.sin(a) * JAR_R),
      V(Math.cos(a) * JAR_R, JAR_H, Math.sin(a) * JAR_R)
    );
  }
  jar.add(segments(glass, kit.soft));
  const ticks: THREE.Vector3[] = [];
  for (let i = 1; i <= 12; i++) {
    const y = (i / 12) * JAR_H;
    const a = Math.PI / 2 - 0.5;
    const w = i % 3 ? 0.12 : 0.24;
    ticks.push(
      V(Math.cos(a) * JAR_R, y, Math.sin(a) * JAR_R),
      V(Math.cos(a) * (JAR_R + w), y, Math.sin(a) * (JAR_R + w))
    );
  }
  jar.add(segments(ticks, kit.ink));

  // What surveys found: clean blocks, layer by layer, nearly to the brim.
  const cells: [number, number][] = [];
  for (const x of [-0.75, -0.25, 0.25, 0.75])
    for (const z of [-0.75, -0.25, 0.25, 0.75]) if (x * x + z * z < 1.05) cells.push([x, z]);
  const blockGeo = new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK);
  const blockMat = kit.surface(-0.45);
  const blocks: THREE.Mesh[] = [];
  const topY = (LAYERS - 1) * 0.5 + 0.25 + BLOCK / 2;
  for (let l = 0; l < LAYERS; l++) {
    for (const [x, z] of cells) {
      const b = new THREE.Mesh(blockGeo, blockMat);
      b.position.set(x, l * 0.5 + 0.25, z);
      b.rotation.y = ((x * 7 + z * 3 + l) % 3) * 0.05;
      b.visible = false;
      jar.add(b);
      blocks.push(b);
    }
  }

  // Hidden mass: a couple of hatched pebbles in the gap. Too few.
  const pebbleMat = kit.surface(0.7);
  const pebbles = [V(-0.45, topY + 0.1, 0.35), V(0.5, topY + 0.09, -0.4)].map((p, i) => {
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1 - i * 0.015, 0), pebbleMat);
    m.position.copy(p);
    m.visible = false;
    jar.add(m);
    return m;
  });

  // Minds: small apertures on the top layer, opening in the thin gap.
  const irises = cells.map(([x, z], i) => {
    const iris = makeIris(kit, 0.045);
    iris.group.rotation.x = -Math.PI / 2;
    iris.group.position.set(x + (i % 2 ? 0.06 : -0.05), topY + 0.012, z);
    iris.group.visible = false;
    jar.add(iris.group);
    return iris;
  });

  const jarAt = (x: number, y: number, z: number) => V(JAR_X + x, y - 1.2, z);
  const labels: Label3D[] = [
    { id: "shines", text: "WHAT SHINES", at: V(-0.1, 0.9, 0), dx: -110, dy: -40 },
    { id: "dark", text: "WHAT DOES NOT", at: V(1.5, -3.3, 0.6), dx: 120, dy: 30 },
    { id: "found", text: "ORDINARY MATTER FOUND", at: jarAt(0.75, 1.4, 0.75), dx: 150, dy: 30 },
    { id: "room", text: "LITTLE ROOM LEFT", at: jarAt(-0.8, JAR_H - 0.1, 0.6), dx: -130, dy: -40 },
    {
      id: "mass",
      text: "HIDDEN MASS, TOO LITTLE",
      at: jarAt(0.5, topY + 0.1, -0.4),
      dx: 110,
      dy: -60,
    },
    { id: "minds", text: "ROOM FOR MINDS", at: jarAt(-0.25, topY, 0.25), dx: -150, dy: 90 },
  ];
  if (narrow) {
    labels[2].dx = 40;
    labels[2].dy = 90;
    labels[4].dx = 40;
    labels[5].dx = -40;
  }

  const k = narrow ? 1.15 : 1;
  const off = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const n = Math.round(st.fill * blocks.length);
      blocks.forEach((b, i) => {
        b.visible = i < n;
      });
      for (const p of pebbles) p.visible = st.fill > 0.98;
      irises.forEach((iris, i) => {
        const o = Math.min(Math.max(st.open * 1.6 - (i % 5) * 0.12, 0), 1);
        iris.group.visible = st.open > 0;
        iris.setOpen(o * (0.9 + 0.1 * Math.sin(time * 1.3 + i)));
      });
      // The berg rides the swell a little.
      tip.rotation.z = body.rotation.z = Math.sin(time * 0.5) * 0.012;
    },
    stops: [
      // 1 · The tip engraves in: what shines.
      (tl, t, c) => {
        tl.addLabel("tip", t);
        tl.set(sweep, { constant: 0 }, t);
        tl.set(st, { fill: 0, open: 0 }, t);
        tl.fromTo(
          kit.clip,
          { constant: -7 },
          { constant: 40, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: -1, y: 0.6, z: 0 },
          { x: 0, y: 0.2, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...off(-3, 2.5, 10) },
          { ...off(0, 1.6, 10.5), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { shines: 1 }, t + 2);
      },
      // 2 · Below the line, most of it: dark in visible light.
      (tl, t, c) => {
        tl.addLabel("below", t);
        cam(tl, c, narrow ? V(0, -2, 0) : V(0.4, -1.9, 0), off(3.5, 0.6, 14), t, 2.6, EASE);
        tl.fromTo(
          sweep,
          { constant: 0 },
          { constant: 6, duration: 2.6, ease: "power1.inOut" },
          t + 0.6
        );
        lab(tl, c, { dark: 1 }, t + 2.6);
      },
      // 3 · The budget: a jar of ordinary matter, nearly all of it found.
      (tl, t, c) => {
        tl.addLabel("budget", t);
        lab(tl, c, { shines: 0, dark: 0 }, t);
        cam(tl, c, V(JAR_X, 0.4, 0), off(0.5, 2.6, 10.5), t, 2.6, EASE);
        tl.fromTo(st, { fill: 0 }, { fill: 1, duration: 2.4, ease: "none" }, t + 1.2);
        lab(tl, c, { found: 1 }, t + 2.4);
        lab(tl, c, { room: 1 }, t + 3.8);
        lab(tl, c, { mass: 1 }, t + 4.6);
      },
      // 4 · In that thin gap, many minds.
      (tl, t, c) => {
        tl.addLabel("minds", t);
        tl.set(st, { fill: 1 }, t);
        lab(tl, c, { found: 0, room: 0 }, t);
        cam(tl, c, V(JAR_X, topY - 1.35, 0), off(0.4, 3.1, 4.9), t, 2.6, EASE);
        tl.fromTo(st, { open: 0 }, { open: 1, duration: 2.2, ease: "power1.inOut" }, t + 1.4);
        lab(tl, c, { mass: 1 }, t + 2.2);
        lab(tl, c, { minds: 1 }, t + 3);
      },
    ],
  };
}
