// Overview figure (Why Are We Here?, first paragraph): life is how a universe is lived.
// The universe's history is drawn as the familiar cutaway horn, flaring from its beginning
// at the left, galaxies forming along it. It engraves in complete, with no one in it. A
// life appears late on one world, its aperture opens, light from the past reaches it, and
// the life alone lifts to clean paper. Wheeler's loop, an observer's look reaching back to
// bring the beginning into being, is drawn and then fades: Holos does not claim it. The
// life goes; the horn is untouched, complete and simply never lived. Stops tween only
// plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";

const X0 = -5.6; // the beginning
const X1 = 5.6; // the far end of the drawn history
const RMAX = 2.5;

// The horn's radius along its length: a quick early flare, then a steady widening.
const radius = (x: number) => {
  const u = (x - X0) / (X1 - X0);
  return 0.05 + RMAX * (0.42 * Math.min(u / 0.08, 1) ** 0.6 + 0.58 * u);
};

// A small seeded random, so every build lays out the same.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function whyLived(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  kit.ink.side = THREE.DoubleSide;
  kit.soft.side = THREE.DoubleSide;
  const scene = new THREE.Scene();
  const st = { light: 0, arc: 0, life: 0 };
  const rand = rng(11);

  // The history: the back half of a horn, open toward the viewer.
  const prof = Array.from({ length: 80 }, (_, i) => {
    const x = X0 + ((X1 - X0) * i) / 79;
    return new THREE.Vector2(radius(x), x);
  });
  const hornGeo = new THREE.LatheGeometry(prof, 64, Math.PI / 2, Math.PI);
  hornGeo.rotateZ(-Math.PI / 2);
  const hornMat = kit.surface(0.05);
  scene.add(new THREE.Mesh(hornGeo, hornMat));
  // Ink rims along the cut, and soft slices across time.
  for (const s of [1, -1]) {
    scene.add(
      line(
        prof.map((p) => V(p.y, s * p.x, 0.002)),
        kit.ink
      )
    );
  }
  const sliceAt = (x: number, r = radius(x) + 0.01) =>
    Array.from({ length: 33 }, (_, i) => {
      const a = (i / 32) * Math.PI;
      return V(x, r * Math.cos(a), -r * Math.sin(a));
    });
  for (let i = 1; i <= 9; i++) scene.add(line(sliceAt(X0 + ((X1 - X0) * i) / 10), kit.soft));
  scene.add(line(sliceAt(X1), kit.ink));

  // Early on, a fine haze of matter; later, galaxies, each a disc with two soft arms.
  const haze: THREE.Vector3[] = [];
  for (let i = 0; i < 70; i++) {
    const x = X0 + 0.4 + rand() * 2.6;
    const r = radius(x) * (0.2 + rand() * 0.6);
    const a = rand() * Math.PI;
    const p = V(x, r * Math.cos(a), -r * Math.sin(a));
    haze.push(p, p.clone().add(V(0.05, 0.03, 0)));
  }
  scene.add(segments(haze, kit.soft));
  const galMat = kit.surface(0.25);
  const galaxies: THREE.Vector3[] = [];
  const spots = [
    [-2.2, 0.5],
    [-1.6, -0.6],
    [-0.8, 0.9],
    [-0.2, -0.3],
    [0.6, 1.2],
    [1.1, -1.0],
    [1.8, 0.4],
    [2.6, 1.4],
    [3.0, -0.4],
    [4.6, 1.0],
    [5.0, -1.2],
  ];
  for (const [x, y] of spots) {
    const r = radius(x);
    const z = -Math.sqrt(Math.max(r * r - y * y, 0)) * 0.55;
    const at = V(x, y, z);
    galaxies.push(at);
    const g = new THREE.Group();
    const s = 0.22 + 0.08 * ((x - X0) / (X1 - X0));
    const disc = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), galMat);
    disc.scale.set(s, s * 0.22, s);
    g.add(disc);
    for (const k of [0, Math.PI]) {
      const arm = Array.from({ length: 20 }, (_, i) => {
        const u = i / 19;
        const a = k + u * 3.2;
        const rr = s * (0.6 + u * 1.3);
        return V(Math.cos(a) * rr, 0, Math.sin(a) * rr);
      });
      g.add(line(arm, kit.soft));
    }
    g.position.copy(at);
    g.rotation.set(0.9 + rand() * 0.5, rand() * 3, 0.3 * (rand() - 0.5));
    scene.add(g);
  }

  // One world, late in the history, and a life on it.
  const W = V(3.9, -0.95, -0.6);
  const WR = 0.36;
  const worldMat = kit.surface(0.3);
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(WR, 32, 20), worldMat));
  scene.children[scene.children.length - 1].position.copy(W);
  const person = makePerson(kit, 0.1);
  const PS = 0.42;
  person.group.position.copy(W).add(V(0, WR - 0.02, 0));
  person.group.scale.setScalar(0.001);
  person.group.visible = false;
  scene.add(person.group);
  const personMat = (person.group.children[0].children[0] as THREE.Mesh)
    .material as THREE.ShaderMaterial;
  const iris = makeIris(kit, 0.075);
  const eye = W.clone().add(V(0, WR + 1.0, 0.05));
  iris.group.position.copy(eye);
  iris.group.scale.setScalar(0.001);
  iris.group.visible = false;
  scene.add(iris.group);

  // Light from earlier galaxies reaching the life.
  const sources = [0, 2, 4, 6, 8].map((i) => galaxies[i]);
  const rayPos = new Float32Array(sources.length * 6);
  const rayGeo = new THREE.BufferGeometry();
  rayGeo.setAttribute("position", new THREE.BufferAttribute(rayPos, 3));
  const rays = new THREE.LineSegments(rayGeo, kit.ink);
  rays.frustumCulled = false;
  scene.add(rays);

  // Wheeler's loop: the observer's look arcing back to the beginning.
  const origin = V(X0 + 0.05, 0, 0);
  const arcCurve = new THREE.QuadraticBezierCurve3(eye.clone(), V(0, 6.2, 0.4), origin);
  const arcPts = arcCurve.getPoints(90);
  const arcPairs: THREE.Vector3[] = [];
  for (let i = 0; i + 1 < arcPts.length; i += 2) arcPairs.push(arcPts[i], arcPts[i + 1]);
  const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPairs);
  const arcInk = new THREE.LineSegments(arcGeo, kit.ink);
  const arcSoft = new THREE.LineSegments(arcGeo, kit.soft);
  arcInk.frustumCulled = arcSoft.frustumCulled = false;
  arcSoft.visible = false;
  scene.add(arcInk, arcSoft);
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 14), kit.ink);
  const tail = arcCurve.getTangent(1);
  arrow.quaternion.setFromUnitVectors(V(0, 1, 0), tail);
  arrow.position.copy(origin).addScaledVector(tail, -0.12);
  arrow.visible = false;
  scene.add(arrow);

  const labels: Label3D[] = [
    { id: "structure", text: "STRUCTURE", at: V(0.5, radius(0.5), 0), dx: 0, dy: -40 },
    { id: "begin", text: "THE BEGINNING", at: origin, dx: 10, dy: 60 },
    { id: "life", text: "A LIFE", at: eye, dx: 70, dy: -40 },
    { id: "wheeler", text: "WHEELER'S LOOP", at: arcCurve.getPoint(0.45), dx: 0, dy: -26 },
    { id: "complete", text: "STILL COMPLETE", at: V(-1, radius(-1), 0), dx: -20, dy: -40 },
    { id: "never", text: "NEVER LIVED", at: W.clone().add(V(0, -WR, 0.2)), dx: 50, dy: 55 },
  ];

  const k = narrow ? 1.04 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.3, 0);
  const front = view(0, 4.5, 15.5);

  return {
    scene,
    kit,
    labels,
    update: () => {
      const end = new THREE.Vector3();
      sources.forEach((s, i) => {
        end.copy(s).lerp(eye, st.light);
        rayPos.set([s.x, s.y, s.z, end.x, end.y, end.z], i * 6);
      });
      rayGeo.attributes.position.needsUpdate = true;
      rays.visible = st.light > 0.001;
      const n = Math.round((arcPairs.length / 2) * st.arc) * 2;
      arcGeo.setDrawRange(0, n);
      arcInk.visible = st.arc > 0.001 && !arcSoft.visible;
      arrow.visible = st.arc > 0.98 && !arcSoft.visible;
      person.group.scale.setScalar(Math.max(st.life * PS, 0.001));
      person.group.visible = st.life > 0.001;
      iris.group.scale.setScalar(Math.max(st.life, 0.001));
      iris.group.visible = st.life > 0.001;
      iris.setOpen(st.life * 0.85);
    },
    stops: [
      // 1 · The history engraves in, beginning to end. Complete, with no one in it.
      (tl, t, c) => {
        tl.addLabel("structure", t);
        tl.fromTo(
          kit.clip,
          { constant: X0 - 0.3 },
          { constant: X1 + 0.4, duration: 3, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 3.05);
        tl.fromTo(c.rig.target, { x: -2, y: 0, z: 0 }, { ...home, duration: 3.4, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...view(-4, 2, 13) },
          { ...front, duration: 3.4, ease: EASE },
          t
        );
        lab(tl, c, { begin: 1 }, t + 0.8);
        lab(tl, c, { structure: 1 }, t + 3);
      },
      // 2 · A life appears on one world; light from the past reaches it, and it is lived.
      (tl, t, c) => {
        tl.addLabel("lived", t);
        lab(tl, c, { structure: 0, begin: 0 }, t);
        cam(tl, c, V(2.2, 0, -0.3), view(1.2, 2.6, 10.5), t, 2.4, EASE);
        tl.fromTo(st, { life: 0 }, { life: 1, duration: 1, ease: "back.out(1.4)" }, t + 1.2);
        tl.fromTo(st, { light: 0 }, { light: 1, duration: 1.6, ease: "power2.inOut" }, t + 2.2);
        tl.fromTo(
          personMat.uniforms.tone,
          { value: 0.1 },
          { value: -1, duration: 1, ease: "power1.inOut" },
          t + 3.4
        );
        lab(tl, c, { life: 1 }, t + 3.6);
      },
      // 3 · Wheeler's loop: the look reaching back to make the beginning. It fades.
      (tl, t, c) => {
        tl.addLabel("wheeler", t);
        lab(tl, c, { life: 0 }, t);
        tl.set(arcSoft, { visible: false }, t);
        cam(tl, c, V(0, 1.2, 0), view(0, 3.6, 17), t, 2.2, EASE);
        tl.fromTo(st, { arc: 0 }, { arc: 1, duration: 1.8, ease: "power1.inOut" }, t + 1);
        lab(tl, c, { wheeler: 1 }, t + 2.4);
        tl.set(arcSoft, { visible: true }, t + 4.2);
        tl.set(arrow, { visible: false }, t + 4.2);
      },
      // 4 · The life goes. The history is untouched, complete, and never lived.
      (tl, t, c) => {
        tl.addLabel("never", t);
        lab(tl, c, { wheeler: 0 }, t);
        tl.to(st, { arc: 0, light: 0, duration: 0.8, ease: "power2.in" }, t + 0.2);
        tl.to(st, { life: 0, duration: 0.9, ease: "power2.in" }, t + 0.9);
        tl.set(personMat.uniforms.tone, { value: 0.1 }, t + 1.8);
        cam(tl, c, home, front, t, 2.4, EASE);
        lab(tl, c, { complete: 1 }, t + 2.2);
        lab(tl, c, { never: 1 }, t + 2.8);
      },
    ],
  };
}
