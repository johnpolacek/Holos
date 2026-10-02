// Teeming Dark, figure 4: the confusers, and the sleepers.
// A brown dwarf, a rogue planet, a cooled dead star, and a Dark Node in a row, each giving
// off heat. The same warm blob closes over each: from outside they look alike. Then the
// node sleeps while the universe cools: its aperture closes and its heat fades. Last, a
// sleeping universe and an empty one give the same flat reading. Stops tween only plain state.

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
import { makeEye, makeField, makeGlow, makeThermo, seeded } from "./common";

const XS = [-4.8, -1.6, 1.6, 4.8];
const BLOB = 1.08;
const BOX = 2.4;
const BOX_X = [11, 15];

function rocky(r: number, seed: number) {
  const geo = new THREE.IcosahedronGeometry(r, 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const rnd = seeded(seed);
  const map = new Map<string, number>();
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
    if (!map.has(key)) map.set(key, 0.9 + rnd() * 0.18);
    v.multiplyScalar(map.get(key) ?? 1);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function lineup(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { blob: 0, sleep: 0, glow: 1 };
  const eye = makeEye();

  scene.add(makeField(kit, 200, V(50, 22, 20), 3));

  const holders = XS.map((x) => {
    const g = new THREE.Group();
    g.position.set(x, 0, 0);
    scene.add(g);
    return g;
  });

  // A brown dwarf: a banded ball.
  const dwarf = new THREE.Mesh(new THREE.SphereGeometry(0.95, 40, 28), kit.surface(0.12));
  dwarf.rotation.z = 0.25;
  holders[0].add(dwarf);
  for (const lat of [-0.55, -0.25, 0.05, 0.35, 0.6]) {
    const r = Math.cos(lat) * 0.955;
    const y = Math.sin(lat) * 0.955;
    const band = line(
      circlePts(r, 64).map((p, i) => V(p.x, y + Math.sin(i * 0.6 + lat * 9) * 0.02, p.y)),
      kit.ink,
      true
    );
    dwarf.add(band);
  }
  // A rogue planet: rough rock, no star.
  const planet = new THREE.Mesh(rocky(0.72, 5), kit.surface(0.32));
  holders[1].add(planet);
  // A cooled dead star: small and dense.
  const dead = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 20), kit.surface(0.72));
  holders[2].add(dead);
  // A Dark Node: a hatched shell with an aperture.
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 1), kit.surface(0.6));
  holders[3].add(shell);
  const iris = makeIris(kit, 0.13);
  iris.group.position.set(0, 0.05, 0.74);
  holders[3].add(iris.group);

  // Each gives off heat. The same blob can close over each.
  const glows = holders.map((h, i) => {
    const g = makeGlow(kit, { r0: [1.0, 0.8, 0.5, 0.85][i], r1: 1.75, n: 2, speed: 0.3 });
    h.add(g.group);
    return g;
  });
  const blobGeo = new THREE.SphereGeometry(BLOB, 40, 28);
  const blobMat = kit.surface(0.38);
  const blobs = holders.map((h) => {
    const b = new THREE.Mesh(blobGeo, blobMat);
    b.visible = false;
    h.add(b);
    return b;
  });

  // The universe cooling: a thermometer beside the node.
  const thermo = makeThermo(kit, 2.2);
  thermo.group.position.set(XS[3] + 2.1, -1.3, 0);
  scene.add(thermo.group);
  thermo.group.visible = false;

  // Two volumes of space, one with sleepers, one empty, and the same flat reading below each.
  const boxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(BOX, BOX, BOX));
  const sleepers: THREE.Object3D[] = [];
  const rnd = seeded(77);
  BOX_X.forEach((x, k) => {
    const frame = new THREE.LineSegments(boxEdges, kit.ink);
    frame.position.set(x, 0.3, 0);
    scene.add(frame);
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(BOX, 0.7, 0.12), kit.surface(-0.4));
    plaque.position.set(x, -1.6, BOX / 2);
    scene.add(plaque);
    const z = BOX / 2 + 0.07;
    scene.add(line([V(x - 1, -1.6, z), V(x + 1, -1.6, z)], kit.ink));
    const ticks: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++)
      ticks.push(V(x - 1 + i * 0.25, -1.82, z), V(x - 1 + i * 0.25, -1.76, z));
    scene.add(segments(ticks, kit.soft));
    if (k === 0) {
      for (let i = 0; i < 4; i++) {
        const s = new THREE.Mesh(new THREE.IcosahedronGeometry(0.17, 0), kit.surface(0.6));
        s.position.set(x + (rnd() - 0.5) * 1.6, 0.3 + (rnd() - 0.5) * 1.6, (rnd() - 0.5) * 1.4);
        s.rotation.set(rnd() * 3, rnd() * 3, 0);
        scene.add(s);
        sleepers.push(s);
      }
    }
  });

  const labels: Label3D[] = [
    { id: "dwarf", text: "BROWN DWARF", at: V(XS[0], 0.95, 0), dx: 0, dy: -80 },
    { id: "planet", text: "ROGUE PLANET", at: V(XS[1], -0.72, 0), dx: 0, dy: 85 },
    { id: "dead", text: "COOLED DEAD STAR", at: V(XS[2], 0.42, 0), dx: 0, dy: -95 },
    { id: "node", text: "DARK NODE", at: V(XS[3], -0.72, 0), dx: 0, dy: 85 },
    { id: "blob", text: "THE SAME WARM BLOB", at: V(XS[2], BLOB, 0), dx: -90, dy: -90 },
    { id: "cools", text: "THE UNIVERSE COOLS", at: V(XS[3] + 2.1, 0.2, 0), dx: 60, dy: -70 },
    { id: "sleep", text: "ASLEEP, WAITING", at: V(XS[3], 0.7, 0), dx: -90, dy: -80 },
    { id: "sleeping", text: "SLEEPING", at: V(BOX_X[0], 0.3 + BOX / 2, -BOX / 2), dx: 0, dy: -40 },
    { id: "empty", text: "EMPTY", at: V(BOX_X[1], 0.3 + BOX / 2, -BOX / 2), dx: 0, dy: -40 },
    { id: "same", text: "THE SAME SILENCE", at: V(13, -1.6, BOX / 2 + 0.1), dx: 0, dy: 70 },
  ];
  if (narrow) {
    labels[2].dy = -120;
    labels[3].dy = 115;
    labels[1].dy = 115;
  }

  const k = narrow ? 1.15 : 1;
  const off = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const e = eye.get();
      planet.rotation.y = time * 0.12;
      dwarf.rotation.y = time * 0.2;
      shell.rotation.y = Math.sin(time * 0.3) * 0.15;
      blobs.forEach((b) => {
        b.visible = st.blob > 0.01;
        b.scale.setScalar(Math.max(st.blob, 0.001));
      });
      glows.forEach((g, i) => {
        g.update(time + i * 0.5, i === 3 ? st.glow : 1, e);
      });
      iris.setOpen(1 - st.sleep);
      thermo.set(1 - st.sleep * 0.85);
      thermo.group.visible = st.sleep > 0.001 || st.glow < 1;
    },
    stops: [
      // 1 · Four warm objects in a row.
      (tl, t, c) => {
        tl.addLabel("four", t);
        eye.set(c.rig);
        tl.set(st, { blob: 0, sleep: 0, glow: 1 }, t);
        tl.fromTo(
          kit.clip,
          { constant: -7 },
          { constant: 30, duration: 2.8, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: -2, y: 0.3, z: 0 },
          { x: 0, y: 0, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...off(-3, 2.5, 13) },
          { ...off(0, 1.2, 13.5), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { dwarf: 1 }, t + 1.2);
        lab(tl, c, { planet: 1 }, t + 1.6);
        lab(tl, c, { dead: 1 }, t + 2);
        lab(tl, c, { node: 1 }, t + 2.4);
      },
      // 2 · Seen from far off, each is the same warm blob.
      (tl, t, c) => {
        tl.addLabel("blob", t);
        eye.set(c.rig);
        cam(tl, c, V(0, 0.2, 0), off(0, 2.2, 15), t, 2.4, EASE);
        tl.fromTo(st, { blob: 0 }, { blob: 1, duration: 1.4, ease: "back.out(1.3)" }, t + 0.8);
        lab(tl, c, { dwarf: 0, planet: 0, dead: 0, node: 0 }, t + 1.6);
        lab(tl, c, { blob: 1 }, t + 2.6);
      },
      // 3 · The node sleeps while the universe cools.
      (tl, t, c) => {
        tl.addLabel("asleep", t);
        eye.set(c.rig);
        lab(tl, c, { blob: 0, dwarf: 0, planet: 0, dead: 0, node: 0 }, t);
        tl.to(st, { blob: 0, duration: 0.8, ease: "power2.in" }, t);
        cam(tl, c, V(XS[3] + 0.9, -0.1, 0), off(-1, 1.4, 8.5), t, 2.6, EASE);
        tl.fromTo(st, { sleep: 0 }, { sleep: 1, duration: 3.4, ease: "power1.inOut" }, t + 1.4);
        tl.fromTo(st, { glow: 1 }, { glow: 0, duration: 3, ease: "power1.inOut" }, t + 1.8);
        lab(tl, c, { cools: 1 }, t + 2);
        lab(tl, c, { sleep: 1 }, t + 4);
      },
      // 4 · A sleeping universe and an empty one give the same reading.
      (tl, t, c) => {
        tl.addLabel("alike", t);
        eye.set(c.rig);
        tl.set(st, { blob: 0, sleep: 1, glow: 0 }, t);
        lab(tl, c, { cools: 0, sleep: 0 }, t);
        cam(tl, c, V(13, -0.2, 0), off(0, 1.6, narrow ? 12 : 11), t, 3, EASE);
        lab(tl, c, { sleeping: 1 }, t + 2.4);
        lab(tl, c, { empty: 1 }, t + 2.8);
        lab(tl, c, { same: 1 }, t + 3.4);
      },
    ],
  };
}
