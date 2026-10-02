// Shared parts for the speculation figures: heat ripples, light rays, small bodies,
// a probe, a packet, a ruler. All are prebuilt; scenes drive them from `update`.

import * as THREE from "three";
import type { Kit } from "../../engrave3d";
import { circlePts, line, segments, V } from "../../tourScenes3d";

// Heat leaving a body: rings that swell outward, ink near the body and soft as they go.
// `strength` 0..1 sets how many rings run. Rings lie in the xy plane (facing the camera).
export function makeRipples(kit: Kit, count = 5, r0 = 0.5, r1 = 2) {
  const group = new THREE.Group();
  const rings = Array.from({ length: count }, () => {
    const l = line(circlePts(1, 72), kit.ink, true);
    group.add(l);
    return l;
  });
  const update = (time: number, strength: number, speed = 0.3, offset = 0) => {
    const n = strength * count;
    rings.forEach((r, i) => {
      const ph = (((time * speed + i / count + offset) % 1) + 1) % 1;
      r.visible = i < n - 0.01;
      r.scale.setScalar(r0 + (r1 - r0) * ph);
      r.material = ph < 0.45 ? kit.ink : kit.soft;
    });
  };
  update(0, 0);
  return { group, update };
}

// Light: short ink spokes around a body, in the xy plane.
export function makeRays(kit: Kit, n = 12, r0 = 0.6, r1 = 1.1) {
  const pairs: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.13;
    const c = Math.cos(a);
    const s = Math.sin(a);
    pairs.push(V(c * r0, s * r0, 0), V(c * r1, s * r1, 0));
  }
  return segments(pairs, kit.ink);
}

export function makeBall(kit: Kit, r: number, tone = 0, detail = 28) {
  const mat = kit.surface(tone);
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, detail, Math.round(detail * 0.7)), mat);
  return { mesh, mat };
}

// A flat ellipse/circle in the xz plane (an orbit).
export function orbit(kit: Kit, r: number, mat?: THREE.Material, n = 96) {
  return line(
    circlePts(r, n).map((p) => V(p.x, 0, p.y)),
    mat ?? kit.soft,
    true
  );
}

// A small engraved box with inked edges.
export function makeBlock(kit: Kit, w: number, h: number, d: number, tone = 0) {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = kit.surface(tone);
  g.add(new THREE.Mesh(geo, mat));
  return { group: g, mat };
}

// A Sentinel probe: a squat body, a dish, two thin panels, an antenna. About 1 unit across.
export function makeProbe(kit: Kit) {
  const group = new THREE.Group();
  const mat = kit.surface(0);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.3, 8), mat);
  body.rotation.z = Math.PI / 2;
  group.add(body);
  const dishGeo = new THREE.SphereGeometry(0.26, 20, 8, 0, Math.PI * 2, 0, 0.75);
  const dish = new THREE.Mesh(dishGeo, mat);
  dish.rotation.z = Math.PI / 2;
  dish.position.x = 0.36;
  group.add(dish);
  for (const s of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.42), mat);
    panel.position.set(-0.02, 0, s * 0.42);
    group.add(panel);
    group.add(segments([V(-0.02, 0, s * 0.16), V(-0.02, 0, s * 0.21)], kit.ink));
  }
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 6), mat);
  rod.position.set(-0.1, 0.28, 0);
  group.add(rod);
  // An eye at the dish focus, opened by setEye(0..1).
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), kit.ink);
  eye.position.x = 0.5;
  group.add(eye);
  return { group, mat, eye };
}

// A straight ruler: a thin bar with ticks every `step`, from a to b, ticks rising along +y.
export function makeRuler(kit: Kit, a: THREE.Vector3, b: THREE.Vector3, step: number, h = 0.12) {
  const pairs: THREE.Vector3[] = [a.clone(), b.clone()];
  const len = a.distanceTo(b);
  const n = Math.floor(len / step + 1e-6);
  for (let i = 0; i <= n; i++) {
    const p = a.clone().lerp(b, (i * step) / len);
    const tall = i % 5 === 0 ? h * 1.8 : h;
    pairs.push(p, p.clone().add(V(0, tall, 0)));
  }
  return segments(pairs, kit.ink);
}

// Seeded jitter, so a scene is the same every build.
export function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
