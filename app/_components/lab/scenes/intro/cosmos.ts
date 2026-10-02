// A clockwork cosmos, shared by the hero and closing figures: an orrery on a geared
// plinth, a sun, four worlds on arms, a few far stars. Everything a law could fix is
// here, and it runs. A small person can stand on the third world with an aperture over
// its head; lines of light then reach it from the other bodies. Motion is driven only by
// `st.turn`, so a stop can fast-forward to any arrangement.

import * as THREE from "three";
import { type Kit, makeKit } from "../../engrave3d";
import { JOY, makePerson, STAND } from "../../figures3d";
import { circlePts, line, makeIris, V } from "../../tourScenes3d";

export const SUN_Y = 2.3;
const PLINTH = 3.1;

type World = { R: number; r: number; y: number; rate: number; base: number; arm: number };
// The home world (index 2) faces the camera, at angle π/2, when turn reaches 1.
export const WORLDS: World[] = [
  { R: 1.3, r: 0.15, y: 2.35, rate: 1.3, base: 0.6, arm: 1.75 },
  { R: 2.05, r: 0.21, y: 2.2, rate: 0.85, base: 2.4, arm: 1.5 },
  { R: 2.85, r: 0.3, y: 2.3, rate: 0.5, base: Math.PI / 2 - Math.PI, arm: 1.25 },
  { R: 3.9, r: 0.38, y: 2.45, rate: 0.3, base: 4.1, arm: 1.0 },
];
export const HOME = 2;

// A flat gear lying in the plinth's top, its axis up.
function gearGeo(r: number, teeth: number, depth: number) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const s = (Math.PI * 2) / teeth;
    for (const [da, rr] of [
      [0, r * 0.86],
      [s * 0.18, r],
      [s * 0.5, r],
      [s * 0.68, r * 0.86],
    ]) {
      pts.push(new THREE.Vector2(Math.cos(a + da) * rr, Math.sin(a + da) * rr));
    }
  }
  const shape = new THREE.Shape(pts);
  const hole = new THREE.Path(circlePts(r * 0.25, 20).map((p) => new THREE.Vector2(p.x, p.y)));
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

export function makeCosmos() {
  const kit: Kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { turn: 0, sight: 0, joy: 0, open: 0 };

  // The bodies share one material so the whole sky can lift to paper together.
  const bodyMat = kit.surface(0.5);
  const brassMat = kit.surface(0.3);
  const plinthMat = kit.surface(0.4);

  // Plinth: two stepped drums.
  const drum = (r: number, h: number, y: number) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.04, h, 64), plinthMat);
    m.position.y = y;
    scene.add(m);
  };
  drum(PLINTH, 0.32, 0.16);
  drum(PLINTH * 0.82, 0.2, 0.42);
  scene.add(
    line(
      circlePts(PLINTH * 0.92, 96).map((p) => V(p.x, 0.325, p.y)),
      kit.ink,
      true
    )
  );

  // The gear train set into the top.
  const gears = [
    { r: 0.95, n: 22, x: 0, z: 0, k: 1 },
    { r: 0.55, n: 13, x: 1.38, z: 0.42, k: -0.95 / 0.55 },
    { r: 0.42, n: 10, x: -0.7, z: 1.18, k: -0.95 / 0.42 },
  ].map((g) => {
    const m = new THREE.Mesh(gearGeo(g.r, g.n, 0.12), brassMat);
    m.position.set(g.x, 0.52, g.z);
    scene.add(m);
    return { m, k: g.k };
  });

  // The column and the sun.
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, SUN_Y - 0.5, 16), brassMat);
  column.position.y = (SUN_Y + 0.5) / 2;
  scene.add(column);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.52, 32, 20), bodyMat);
  sun.position.y = SUN_Y;
  scene.add(sun);
  // A ring of short rays around the sun, inked.
  const rayPts: THREE.Vector3[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    rayPts.push(
      V(Math.cos(a) * 0.66, SUN_Y + Math.sin(a) * 0.66, 0),
      V(Math.cos(a) * (i % 2 ? 0.8 : 0.9), SUN_Y + Math.sin(a) * (i % 2 ? 0.8 : 0.9), 0)
    );
  }
  const sunRays = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(rayPts),
    kit.soft
  );
  scene.add(sunRays);

  // Worlds on arms. Each arm turns about the column.
  const worlds = WORLDS.map((w, i) => {
    const arm = new THREE.Group();
    scene.add(arm);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, w.R, 8), brassMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(w.R / 2, w.arm, 0);
    arm.add(rod);
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, w.y - w.arm - w.r, 8),
      brassMat
    );
    post.position.set(w.R, (w.y - w.r + w.arm) / 2, 0);
    arm.add(post);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16), brassMat);
    hub.position.y = w.arm;
    arm.add(hub);
    const body = new THREE.Group();
    body.position.set(w.R, w.y, 0);
    arm.add(body);
    body.add(new THREE.Mesh(new THREE.SphereGeometry(w.r, 28, 18), bodyMat));
    // Orbit path.
    scene.add(
      line(
        circlePts(w.R, 128).map((p) => V(p.x, w.y, p.y)),
        kit.soft,
        true
      )
    );
    return { w, arm, body, i };
  });
  // The outer world wears a ring; the home world a moon.
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.035, 8, 64), bodyMat);
  ring.rotation.x = Math.PI / 2 - 0.35;
  worlds[3].body.add(ring);
  const moonPivot = new THREE.Group();
  worlds[HOME].body.add(moonPivot);
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 10), bodyMat);
  moon.position.set(0.58, 0.05, 0);
  moonPivot.add(moon);

  // Far stars on a loose shell behind and around.
  const stars: THREE.Mesh[] = [];
  for (let i = 0; i < 26; i++) {
    const a = -0.4 + (i / 26) * (Math.PI + 0.8) + Math.sin(i * 7.1) * 0.08;
    const rad = 7.5 + Math.sin(i * 3.3) * 1.2;
    const y = 1.2 + ((i * 37) % 11) * 0.62;
    const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.07 + (i % 3) * 0.035), bodyMat);
    s.position.set(Math.cos(a) * rad, y, -Math.sin(a) * rad * 0.8);
    s.rotation.set(i, i * 0.7, 0);
    scene.add(s);
    stars.push(s);
  }

  // The witness: a small person on the home world, an aperture above its head.
  const home = worlds[HOME];
  const person = makePerson(kit, 0.05);
  const PS = 0.2;
  person.group.scale.setScalar(PS);
  person.group.position.set(0, home.w.r - 0.01, 0);
  person.group.visible = false;
  home.body.add(person.group);
  const iris = makeIris(kit, 0.055);
  iris.setOpen(0);
  iris.group.position.set(0, home.w.r + PS * 1.75 + 0.16, 0.02);
  iris.group.visible = false;
  home.body.add(iris.group);

  // Lines of light from the other bodies to the aperture, drawn as they arrive.
  const sources: THREE.Object3D[] = [
    sun,
    worlds[0].body,
    worlds[1].body,
    worlds[3].body,
    ...stars.filter((_, i) => i % 3 === 1),
  ];
  const sightGeo = new THREE.BufferGeometry().setFromPoints(
    sources.flatMap(() => [V(0, 0, 0), V(0, 0, 0)])
  );
  const sight = new THREE.LineSegments(sightGeo, kit.ink);
  sight.frustumCulled = false;
  scene.add(sight);

  const eye = new THREE.Vector3();
  const a = new THREE.Vector3();
  const homeAt = (turn: number) => {
    const w = home.w;
    const ang = w.base + w.rate * turn * Math.PI * 2;
    return V(Math.cos(ang) * w.R, w.y, Math.sin(ang) * w.R);
  };

  const update = (time: number) => {
    for (const { w, arm } of worlds) arm.rotation.y = -(w.base + w.rate * st.turn * Math.PI * 2);
    // The witness and its aperture keep facing the viewer as their world turns.
    person.group.rotation.y = -home.arm.rotation.y;
    iris.group.rotation.y = -home.arm.rotation.y;
    for (const g of gears) g.m.rotation.y = st.turn * Math.PI * 2 * g.k * 0.6;
    moonPivot.rotation.y = time * 0.6;
    ring.rotation.z = st.turn * 2;
    iris.setOpen(st.open);
    // A slow lift into joy, if asked for.
    const p = st.joy;
    person.setPose({
      armL: STAND.armL + (JOY.armL - STAND.armL) * p,
      armR: STAND.armR + (JOY.armR - STAND.armR) * p,
      bendL: STAND.bendL + (JOY.bendL - STAND.bendL) * p,
      bendR: STAND.bendR + (JOY.bendR - STAND.bendR) * p,
      head: STAND.head + (JOY.head - STAND.head) * p,
      lean: STAND.lean + (JOY.lean - STAND.lean) * p,
    });
    scene.updateMatrixWorld();
    iris.group.getWorldPosition(eye);
    const pos = sightGeo.attributes.position as THREE.BufferAttribute;
    sources.forEach((s, i) => {
      s.getWorldPosition(a);
      pos.setXYZ(i * 2, a.x, a.y, a.z);
      a.lerp(eye, st.sight);
      pos.setXYZ(i * 2 + 1, a.x, a.y, a.z);
    });
    pos.needsUpdate = true;
  };

  return {
    kit,
    scene,
    st,
    bodyMat,
    brassMat,
    sunRays,
    person,
    iris,
    eye,
    homeAt,
    worlds,
    update,
  };
}
