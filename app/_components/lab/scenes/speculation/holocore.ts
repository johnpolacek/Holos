// Holocore yields. Three engines on one plinth, each beside a column for the share of
// its fuel's mass it turns to energy, on one scale. Fusion: a bright core and a sliver of
// a column. Accretion: matter spiraling down a disk into a black hole, a tall column with
// an outlined range above it. Spin: a particle splits in the spinning region outside a
// black hole, one half falls in and the other leaves with more energy. Then every engine
// sheds heat: compact and powerful means hot.

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
  segments,
  V,
} from "../../tourScenes3d";
import { makeBall, makeRays, makeRipples } from "./parts";

const PER = 0.072; // column height per percent
const CORE_Y = 1.3;
const XS = [-3.6, 0, 3.6];
const COL_DX = 1.35;

export function holocore(narrow = false): Built3D {
  const kit = makeKit();
  const scene = new THREE.Scene();
  const st = { c0: 0, c1: 0, c2: 0, range: 0, heat: 0, engines: [0, 0, 0] };

  // Plinth with a percent scale along its back.
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.25, 2.2), kit.surface(0.15));
  plinth.position.set(0.6, -0.125, 0);
  scene.add(plinth);
  const ticks: THREE.Vector3[] = [];
  for (let p = 5; p <= 45; p += 5) {
    const y = p * PER;
    ticks.push(V(-4.4, y, -0.9), V(5.6, y, -0.9));
  }
  const scale = segments(ticks, kit.soft);
  scene.add(scale);

  // Columns: bottoms at the plinth top, grown by scale.y.
  const column = (x: number) => {
    const geo = new THREE.CylinderGeometry(0.3, 0.3, 1, 32);
    geo.translate(0, 0.5, 0);
    const m = new THREE.Mesh(geo, kit.surface(-0.5));
    m.position.set(x + COL_DX, 0, 0);
    m.scale.y = 0.001;
    scene.add(m);
    return m;
  };
  const cols = XS.map(column);
  // Accretion's range, 30 to 42 percent, in outline above its column.
  const rangeGeo = new THREE.CylinderGeometry(0.3, 0.3, 12 * PER, 24, 1, true);
  rangeGeo.translate(0, 30 * PER + 6 * PER, 0);
  const range = new THREE.LineSegments(new THREE.EdgesGeometry(rangeGeo, 1), kit.ink);
  const rangeRings = new THREE.Group();
  for (const p of [33, 36, 39, 42]) {
    const r = line(
      circlePts(0.3, 32).map((q) => V(q.x, p * PER, q.y)),
      kit.soft,
      true
    );
    rangeRings.add(r);
  }
  const rangeGroup = new THREE.Group();
  rangeGroup.add(range, rangeRings);
  rangeGroup.position.set(XS[1] + COL_DX, 0, 0);
  rangeGroup.visible = false;
  scene.add(rangeGroup);

  // Fusion: a bright core.
  const fusion = new THREE.Group();
  fusion.position.set(XS[0], CORE_Y, 0);
  fusion.add(makeBall(kit, 0.5, -0.7, 36).mesh);
  const fusionRays = makeRays(kit, 16, 0.62, 0.85);
  fusion.add(fusionRays);
  fusion.visible = false;
  scene.add(fusion);

  // Accretion: a hatched hole in a tilted disk, with matter spiraling down.
  const accretion = new THREE.Group();
  accretion.position.set(XS[1], CORE_Y, 0);
  accretion.add(makeBall(kit, 0.32, 0.95, 32).mesh);
  const disk = new THREE.Group();
  const diskMesh = new THREE.Mesh(new THREE.RingGeometry(0.45, 1.15, 64, 1), kit.surface(-0.3));
  diskMesh.rotation.x = -Math.PI / 2;
  disk.add(diskMesh);
  for (const r of [0.6, 0.8, 1.0])
    disk.add(
      line(
        circlePts(r, 64).map((p) => V(p.x, 0.002, p.y)),
        kit.soft,
        true
      )
    );
  disk.rotation.x = 0.35;
  accretion.add(disk);
  const infall = Array.from({ length: 6 }, () => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), kit.ink);
    disk.add(d);
    return d;
  });
  accretion.visible = false;
  scene.add(accretion);

  // Spin: a hatched hole inside its spinning region, drawn as soft meridians.
  const spin = new THREE.Group();
  spin.position.set(XS[2], CORE_Y, 0);
  spin.add(makeBall(kit, 0.32, 0.95, 32).mesh);
  const ergo = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI;
    ergo.add(
      line(
        circlePts(0.62, 48).map((p) => V(p.x * Math.cos(a), p.y * 0.75, p.x * Math.sin(a))),
        kit.soft,
        true
      )
    );
  }
  ergo.add(
    line(
      circlePts(0.62, 48).map((p) => V(p.x, 0, p.y)),
      kit.ink,
      true
    )
  );
  spin.add(ergo);
  const pIn = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), kit.ink);
  const pFall = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), kit.ink);
  const pOut = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), kit.ink);
  spin.add(pIn, pFall, pOut);
  spin.visible = false;
  scene.add(spin);

  const engines = [fusion, accretion, spin];
  const ripples = XS.map((x) => {
    const r = makeRipples(kit, 4, 0.7, 1.7);
    r.group.position.set(x, CORE_Y, 0.2);
    scene.add(r.group);
    return r;
  });

  const top = (i: number, pct: number) => V(XS[i] + COL_DX, pct * PER, 0);
  const labels: Label3D[] = [
    { id: "fusion", text: "FUSION, 0.7%", at: top(0, 0.7), dx: 40, dy: -60 },
    { id: "accretion", text: "ACCRETION, 30 TO 42%", at: top(1, 42), dx: 0, dy: -30 },
    { id: "spin", text: "SPIN, UP TO 29%", at: top(2, 29), dx: 10, dy: -40 },
    { id: "hot", text: "COMPACT MEANS HOT", at: V(XS[0], CORE_Y + 1.6, 0), dx: 0, dy: -30 },
  ];

  const k = narrow ? 0.95 : 1;
  const SPIN_IN = V(-1.6, 0.5, 0.4);
  const SPLIT = V(-0.45, 0.1, 0.3);
  const OUT = V(-0.1, 1.7, 0.5);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      cols[0].scale.y = Math.max(st.c0 * 0.7 * PER, 0.001);
      cols[1].scale.y = Math.max(st.c1 * 30 * PER, 0.001);
      cols[2].scale.y = Math.max(st.c2 * 29 * PER, 0.001);
      rangeGroup.visible = st.range > 0.5;
      engines.forEach((e, i) => {
        e.visible = st.engines[i] > 0.5;
      });
      fusionRays.rotation.z = time * 0.15;
      disk.rotation.y = -time * 0.5;
      infall.forEach((d, i) => {
        const s = (time * 0.25 + i / infall.length) % 1;
        const r = 1.15 - 0.8 * s;
        const a = s * Math.PI * 3 + i;
        d.position.set(Math.cos(a) * r, 0.03, Math.sin(a) * r);
      });
      ergo.rotation.y = time * 0.6;
      // The split: in to the spinning region, then one half falls and one escapes.
      const ph = (time / 3.2) % 1;
      pIn.visible = ph < 0.4;
      pFall.visible = pOut.visible = ph >= 0.4;
      if (ph < 0.4) pIn.position.copy(SPIN_IN).lerp(SPLIT, ph / 0.4);
      else {
        const f = (ph - 0.4) / 0.6;
        const a = f * 2.5;
        const r = 0.45 * (1 - f) + 0.3 * f;
        pFall.position.set(-Math.cos(a) * r, 0.1 * (1 - f), Math.sin(a) * r * 0.6);
        pOut.position.copy(SPLIT).lerp(OUT, Math.min(f * 1.3, 1));
      }
      ripples.forEach((r, i) => {
        r.update(time, st.heat * [0.8, 1, 1][i], 0.3, i * 0.3);
      });
    },
    stops: [
      // 1 · Fusion: about 0.7 percent of a mass.
      (tl, t, c) => {
        tl.addLabel("fusion", t);
        tl.fromTo(
          c.rig.target,
          { x: -3, y: 1, z: 0 },
          { x: -2.6, y: 1.1, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 3, y: 2, z: 8 },
          { x: 1.2 * k, y: 1.6, z: 7 * k, duration: 3, ease: EASE },
          t
        );
        tl.set(st.engines, { 0: 1 }, t + 0.4);
        tl.to(st, { c0: 1, duration: 1, ease: "power2.out" }, t + 1.6);
        lab(tl, c, { fusion: 1 }, t + 2.2);
      },
      // 2 · Accretion: roughly 30 to 42 percent.
      (tl, t, c) => {
        tl.addLabel("accretion", t);
        lab(tl, c, { fusion: 0 }, t);
        cam(tl, c, V(-0.8, 1.5, 0), V(0.5 * k, 2 * k, 10.5 * k), t, 2.6, EASE);
        tl.set(st.engines, { 1: 1 }, t + 0.8);
        tl.to(st, { c1: 1, duration: 2, ease: "power2.inOut" }, t + 1.4);
        tl.set(st, { range: 1 }, t + 3.2);
        lab(tl, c, { accretion: 1, fusion: 1 }, t + 3.2);
      },
      // 3 · Spin: up to 29 percent of the hole's mass.
      (tl, t, c) => {
        tl.addLabel("spin", t);
        lab(tl, c, { fusion: 0 }, t);
        cam(tl, c, V(0.8, 1.5, 0), V(0, 2.2 * k, 12.5 * k), t, 2.6, EASE);
        tl.set(st.engines, { 2: 1 }, t + 0.8);
        tl.to(st, { c2: 1, duration: 2, ease: "power2.inOut" }, t + 1.4);
        lab(tl, c, { spin: 1 }, t + 3.2);
      },
      // 4 · Compact and powerful means hot.
      (tl, t, c) => {
        tl.addLabel("hot", t);
        lab(tl, c, { accretion: 0, spin: 0 }, t);
        cam(tl, c, V(0.6, 1.4, 0), V(-1, 3 * k, 12.5 * k), t, 2.6, EASE);
        tl.to(st, { heat: 1, duration: 0.01 }, t + 1);
        lab(tl, c, { hot: 1 }, t + 2);
      },
    ],
  };
}
