// Entanglement, and the walls that make lives. Two particles far apart, their spins
// tumbling. Measured, both settle the same way at once; one engraved envelope wraps them,
// one shared state. Pull back: if nothing collapses, the whole universe is one such state.
// Then walls rise through it, across distance and across time, and partition the one
// whole into rooms. In each room a life begins, an aperture opens, and its floor lifts to
// clean paper. Stops tween only plain state.

import * as THREE from "three";
import { type Kit, makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  show,
  V,
} from "../../tourScenes3d";

const HX = 6.3; // half the whole's length (distance)
const HZ = 3.6; // half its depth (time)
const WALL_H = 1.9;
const PY = 1.3; // particle height
const A = V(-4.6, PY, 1.6);
const B = V(4.6, PY, 1.6);

// A wire ellipsoid: a few meridians and parallels, centered at the origin.
function envelope(kit: Kit, rx: number, ry: number, rz: number, mat: THREE.Material) {
  const g = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI;
    g.add(
      line(
        circlePts(1, 96).map((p) => V(p.x * Math.cos(a) * rx, p.y * ry, p.x * Math.sin(a) * rz)),
        mat,
        true
      )
    );
  }
  for (const lat of [-0.6, 0, 0.6]) {
    g.add(
      line(
        circlePts(Math.cos(lat), 96).map((p) => V(p.x * rx, Math.sin(lat) * ry, p.y * rz)),
        lat === 0 ? kit.ink : mat,
        true
      )
    );
  }
  return g;
}

// A spin arrow: a shaft and a cone, pointing up its local y.
function arrow(kit: Kit) {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 8), kit.ink);
  g.add(shaft);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.26, 12), kit.ink);
  tip.position.y = 0.55;
  g.add(tip);
  return g;
}

export function walls(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { measured: 0, open: [0, 0, 0, 0, 0, 0] };

  // Six floor tiles, one per room-to-be, so each can lift alone.
  const cols = [-HX, -HX / 3, HX / 3, HX];
  const rows = [-HZ, 0, HZ];
  const tiles: { mat: THREE.ShaderMaterial; cx: number; cz: number }[] = [];
  for (let r = 0; r < 2; r++)
    for (let q = 0; q < 3; q++) {
      const w = cols[q + 1] - cols[q];
      const d = rows[r + 1] - rows[r];
      const mat = kit.surface(0.3);
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.14, d), mat);
      const cx = (cols[q] + cols[q + 1]) / 2;
      const cz = (rows[r] + rows[r + 1]) / 2;
      m.position.set(cx, -0.07, cz);
      scene.add(m);
      tiles.push({ mat, cx, cz });
    }

  // Particles of the whole, and the entangled pair among them.
  const dust = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.09 + (i % 3) * 0.03, 12, 8),
      kit.surface(0.5)
    );
    s.position.set(
      -HX + 0.6 + ((i * 2.37) % (HX * 2 - 1.2)),
      0.7 + ((i * 0.53) % 1.3),
      -HZ + 0.6 + ((i * 1.71) % (HZ * 2 - 1.2))
    );
    dust.add(s);
  }
  dust.visible = false;
  scene.add(dust);

  const pair = [A, B].map((p, i) => {
    const g = new THREE.Group();
    g.position.copy(p);
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), kit.surface(0.1)));
    const orbit = line(circlePts(0.45, 64), kit.soft, true);
    orbit.rotation.x = Math.PI / 2;
    g.add(orbit);
    const arr = arrow(kit);
    arr.position.y = 0.95;
    g.add(arr);
    scene.add(g);
    return { g, arr, phase: i * 2.1 };
  });

  // One shared state around the pair; then the whole.
  const shared = envelope(kit, 5.5, 0.85, 0.85, kit.soft);
  shared.position.set(0, PY + 0.3, 1.6);
  shared.visible = false;
  scene.add(shared);
  const whole = envelope(kit, HX + 1.4, 2.4, HZ + 1.2, kit.soft);
  whole.position.set(0, 0.9, 0);
  whole.visible = false;
  scene.add(whole);

  // Walls: across distance (perpendicular to x) and across time (perpendicular to z).
  const wallMat = kit.surface(0.4);
  const wallList: THREE.Mesh[] = [];
  const wall = (w: number, d: number, x: number, z: number) => {
    const geo = new THREE.BoxGeometry(w, WALL_H, d);
    geo.translate(0, WALL_H / 2, 0);
    const m = new THREE.Mesh(geo, wallMat);
    m.position.set(x, 0, z);
    m.scale.y = 0.001;
    m.visible = false;
    scene.add(m);
    wallList.push(m);
  };
  wall(0.14, HZ * 2, -HX / 3, 0);
  wall(0.14, HZ * 2, HX / 3, 0);
  wall(HX * 2, 0.14, 0, 0);

  // Axes: distance along the front, time along the left side.
  const axes = new THREE.Group();
  const fz = HZ + 0.6;
  const lx = -HX - 0.6;
  axes.add(segments([V(-HX, 0, fz), V(HX, 0, fz), V(lx, 0, HZ), V(lx, 0, -HZ)], kit.ink));
  for (const [p, rot] of [
    [V(HX + 0.1, 0, fz), V(0, 0, -Math.PI / 2)],
    [V(lx, 0, -HZ - 0.1), V(-Math.PI / 2, 0, 0)],
  ] as const) {
    const h = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.26, 12), kit.ink);
    h.position.copy(p);
    h.rotation.set(rot.x, rot.y, rot.z);
    axes.add(h);
  }
  axes.visible = false;
  scene.add(axes);

  // A life in each room: a person, an aperture above it.
  const lives = tiles.map((tile, _i) => {
    const p = makePerson(kit, 0.05);
    const s = 0.62;
    p.group.scale.setScalar(s);
    p.group.position.set(tile.cx - Math.sign(tile.cx) * 0.9, 0, tile.cz - 0.2);
    p.group.visible = false;
    scene.add(p.group);
    const iris = makeIris(kit, 0.1);
    iris.setOpen(0);
    iris.group.position.set(p.group.position.x, 1.75 * s + 0.35, p.group.position.z + 0.05);
    iris.group.visible = false;
    scene.add(iris.group);
    return { p, iris };
  });

  const labels: Label3D[] = [
    { id: "far", text: "FAR APART", at: V(0, PY, 1.6), dx: 0, dy: 70 },
    { id: "match", text: "MATCHING RESULTS", at: B.clone().add(V(0, 1.6, 0)), dx: -70, dy: -40 },
    { id: "shared", text: "ONE SHARED STATE", at: V(0, PY + 1.15, 1.6), dx: 0, dy: -50 },
    { id: "whole", text: "THE WHOLE, ONE STATE", at: V(-HX * 0.5, 3.2, 0), dx: -30, dy: -50 },
    { id: "distance", text: "DISTANCE", at: V(HX * 0.5, 0, fz), dx: 40, dy: 40 },
    { id: "time", text: "TIME", at: V(lx, 0, -HZ * 0.4), dx: -40, dy: -30 },
    { id: "walls", text: "WALLS", at: V(HX / 3, WALL_H, -HZ * 0.6), dx: 60, dy: -50 },
    { id: "life", text: "A LIFE IN EACH ROOM", at: lives[4].iris.group.position, dx: 50, dy: -60 },
  ];

  const pull = narrow ? 1.1 : 1;
  const wide = { t: V(0, 0.8, 0), o: V(2 * pull, 9 * pull, 14 * pull) };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      // Unmeasured, each spin tumbles on its own; measured, both stand upright together.
      const m = st.measured;
      pair.forEach((q) => {
        const free = time * 1.7 + q.phase;
        q.arr.rotation.set(Math.sin(free) * 1.6 * (1 - m), 0, Math.cos(free * 0.8) * 2.4 * (1 - m));
      });
      lives.forEach((l, i) => {
        l.iris.setOpen(st.open[i]);
      });
    },
    stops: [
      // 1 · Two particles, far apart. Measured, they give matching results.
      (tl, t, c) => {
        tl.addLabel("pair", t);
        tl.fromTo(
          kit.clip,
          { constant: -HX - 1 },
          { constant: HX + 1, duration: 2.4, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.5);
        tl.fromTo(
          c.rig.target,
          { x: -4, y: PY, z: 1.6 },
          { x: 0, y: PY + 0.4, z: 1.6, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -2, y: 1, z: 7 },
          { x: 0, y: 1.4 * pull, z: 13 * pull, duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { far: 1 }, t + 2.4);
        tl.fromTo(st, { measured: 0 }, { measured: 1, duration: 0.6, ease: "power3.out" }, t + 4.2);
        lab(tl, c, { match: 1 }, t + 4.6);
      },
      // 2 · One shared state, not two things.
      (tl, t, c) => {
        tl.addLabel("shared", t);
        lab(tl, c, { far: 0, match: 0 }, t);
        tl.to(st, { measured: 1, duration: 0.3 }, t);
        cam(tl, c, V(0, PY + 0.4, 1.6), V(-1.5, 2.6 * pull, 12 * pull), t, 2.4, EASE);
        tl.set(shared, { visible: true }, t + 0.8);
        tl.fromTo(
          shared.scale,
          { x: 0.05, y: 1, z: 1 },
          { x: 1, y: 1, z: 1, duration: 1.6, ease: EASE },
          t + 0.8
        );
        lab(tl, c, { shared: 1 }, t + 2.2);
      },
      // 3 · If nothing collapses, the whole universe is one such state.
      (tl, t, c) => {
        tl.addLabel("whole", t);
        lab(tl, c, { shared: 0 }, t);
        cam(tl, c, wide.t, wide.o, t, 3, EASE);
        show(tl, dust, t + 1, 1);
        tl.set(whole, { visible: true }, t + 1.4);
        tl.fromTo(
          whole.scale,
          { x: 0.3, y: 0.3, z: 0.3 },
          { x: 1, y: 1, z: 1, duration: 1.8, ease: EASE },
          t + 1.4
        );
        tl.to(shared.scale, { x: 0.001, duration: 1, ease: "power2.in" }, t + 1.4);
        tl.set(shared, { visible: false }, t + 2.4);
        lab(tl, c, { whole: 1 }, t + 3);
      },
      // 4 · Walls rise through it, across distance and across time.
      (tl, t, c) => {
        tl.addLabel("walls", t);
        lab(tl, c, { whole: 0 }, t);
        cam(tl, c, wide.t, V(-3 * pull, 8 * pull, 13 * pull), t, 3, EASE);
        show(tl, axes, t + 0.6, 0);
        lab(tl, c, { distance: 1, time: 1 }, t + 0.8);
        wallList.forEach((w, i) => {
          tl.set(w, { visible: true }, t + 1.2 + i * 0.4);
          tl.to(w.scale, { y: 1, duration: 1.2, ease: "back.out(1.1)" }, t + 1.2 + i * 0.4);
        });
        tl.to(
          whole.scale,
          { x: 0.001, y: 0.001, z: 0.001, duration: 1.4, ease: "power2.in" },
          t + 1.2
        );
        tl.set(whole, { visible: false }, t + 2.6);
        lab(tl, c, { walls: 1 }, t + 3);
      },
      // 5 · Each room holds a life. The walls are what make it possible.
      (tl, t, c) => {
        tl.addLabel("lives", t);
        lab(tl, c, { walls: 0, distance: 0, time: 0 }, t);
        cam(tl, c, wide.t, V(1.5 * pull, 7.5 * pull, 12.5 * pull), t, 3, EASE);
        lives.forEach((l, i) => {
          const s = t + 0.8 + i * 0.35;
          tl.set(l.p.group, { visible: true }, s);
          tl.fromTo(
            l.p.group.scale,
            { x: 0.01, y: 0.01, z: 0.01 },
            { x: 0.62, y: 0.62, z: 0.62, duration: 0.7, ease: "back.out(1.6)" },
            s
          );
          tl.set(l.iris.group, { visible: true }, s + 0.5);
          tl.to(st.open, { [i]: 0.85, duration: 0.7, ease: "back.out(2)" }, s + 0.5);
          tl.to(
            tiles[i].mat.uniforms.tone,
            { value: -0.7, duration: 1, ease: "power1.inOut" },
            s + 0.6
          );
        });
        lab(tl, c, { life: 1 }, t + 3.6);
        lab(tl, c, narrow ? {} : { walls: 1 }, t + 4.2);
      },
    ],
  };
}
