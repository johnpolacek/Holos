// Shared parts for the Teeming Dark figures: a shining star, heat ripples that face the
// camera, a thermometer, faint background stars, and a thin cold panel.

import * as THREE from "three";
import type { Kit, Rig } from "../../engrave3d";
import { circlePts, line, segments, V } from "../../tourScenes3d";

// Stops hand over the camera rig so per-frame code can face things toward the eye.
export function makeEye() {
  const ref: { rig: Rig | null } = { rig: null };
  const eye = new THREE.Vector3(0, 0, 100);
  return {
    set(rig: Rig) {
      ref.rig = rig;
    },
    get() {
      if (ref.rig) eye.copy(ref.rig.target).add(ref.rig.offset);
      return eye;
    },
  };
}

// A star: a clean sphere with a ring of rays that always faces the camera.
export function makeStar(kit: Kit, r = 1) {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.SphereGeometry(r, 40, 28), kit.surface(-1)));
  const rays = new THREE.Group();
  const pairs: THREE.Vector3[] = [];
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const len = i % 2 ? 0.45 : 0.9;
    const c = Math.cos(a);
    const s = Math.sin(a);
    pairs.push(V(c * r * 1.18, s * r * 1.18, 0), V(c * r * (1.18 + len), s * r * (1.18 + len), 0));
  }
  rays.add(segments(pairs, kit.ink));
  rays.add(line(circlePts(r * 1.08, 64), kit.soft, true));
  group.add(rays);
  return {
    group,
    rays,
    update(time: number, eye: THREE.Vector3) {
      rays.lookAt(eye);
      rays.rotateZ(time * 0.05);
    },
  };
}

// Heat leaving a body: dashed rings that face the camera and spread outward on a loop.
// `strength` 0..1 sets how far they reach; 0 hides them.
export function makeGlow(
  kit: Kit,
  { r0 = 1, r1 = 2.5, n = 3, speed = 0.35, mat = kit.soft as THREE.Material } = {}
) {
  const group = new THREE.Group();
  const pairs: THREE.Vector3[] = [];
  const N = 40;
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2;
    const a1 = ((i + 0.55) / N) * Math.PI * 2;
    pairs.push(V(Math.cos(a0), Math.sin(a0), 0), V(Math.cos(a1), Math.sin(a1), 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pairs);
  const rings = Array.from({ length: n }, () => {
    const ring = new THREE.LineSegments(geo, mat);
    group.add(ring);
    return ring;
  });
  const world = new THREE.Vector3();
  return {
    group,
    update(time: number, strength: number, eye: THREE.Vector3) {
      group.getWorldPosition(world);
      const reach = r0 + (r1 - r0) * Math.min(Math.max(strength, 0), 1);
      rings.forEach((ring, i) => {
        const f = (((time * speed + i / n) % 1) + 1) % 1;
        ring.visible = strength > 0.03;
        ring.scale.setScalar(r0 + (reach - r0) * f + 0.001);
        ring.lookAt(eye);
      });
    },
  };
}

// A thermometer: clean glass, an ink column, a bulb, and ticks. `set(level)` 0..1.
export function makeThermo(kit: Kit, H = 2) {
  const group = new THREE.Group();
  const tube = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, H, 4, 16), kit.surface(-1));
  tube.position.y = H / 2;
  group.add(tube);
  const colGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 12);
  colGeo.translate(0, 0.5, 0);
  const col = new THREE.Mesh(colGeo, kit.ink);
  col.position.set(0, 0, 0.06);
  group.add(col);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), kit.ink);
  group.add(bulb);
  const ticks: THREE.Vector3[] = [];
  for (let i = 1; i <= 8; i++) {
    const y = (i / 9) * H + 0.15;
    ticks.push(V(0.14, y, 0), V(i % 2 ? 0.24 : 0.3, y, 0));
  }
  group.add(segments(ticks, kit.ink));
  const set = (level: number) => {
    col.scale.y = 0.15 + Math.max(level, 0.001) * (H - 0.1);
  };
  set(1);
  return { group, set, top: (level: number) => V(0, 0.15 + level * (H - 0.1), 0) };
}

// Faint background stars: tiny soft crosses scattered on a far shell or box.
export function makeField(kit: Kit, count: number, spread: THREE.Vector3, seed = 1) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const pairs: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const p = V((rnd() - 0.5) * spread.x, (rnd() - 0.5) * spread.y, (rnd() - 0.5) * spread.z);
    const k = 0.04 + rnd() * 0.06;
    pairs.push(
      V(p.x - k, p.y, p.z),
      V(p.x + k, p.y, p.z),
      V(p.x, p.y - k, p.z),
      V(p.x, p.y + k, p.z)
    );
  }
  return segments(pairs, kit.soft);
}

// A seeded random source for repeatable layouts.
export function seeded(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

// A thin cold panel: a flat sheet with an inked frame and a few ruled lines.
export function makePanel(kit: Kit, w: number, h: number, tone = -0.4) {
  const group = new THREE.Group();
  const sheet = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, Math.min(w, h) * 0.03),
    kit.surface(tone)
  );
  group.add(sheet);
  const z = Math.min(w, h) * 0.016;
  const ruled: THREE.Vector3[] = [];
  for (let i = 1; i < 4; i++) {
    const x = -w / 2 + (i / 4) * w;
    ruled.push(V(x, -h / 2, z), V(x, h / 2, z), V(x, -h / 2, -z), V(x, h / 2, -z));
  }
  group.add(segments(ruled, kit.soft));
  return group;
}
