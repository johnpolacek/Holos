// Figure Ω2: the gallery. Two rooms, a wall between them, a painting in each: a figure in
// joy, a figure in grief. One lamp hangs above the wall, and its light reaches both. The
// camera walks from room to room, then rises to see the whole gallery at once.
// Stops tween only plain state, so any stop fast-forwards.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "./engrave3d";
import { EASE, GRIEF, JOY, makePerson } from "./figures3d";
import { type Built3D, cam, dashed, type Label3D, lab, V } from "./tourScenes3d";

const W = 7; // half the gallery's length
const D = 3; // half its depth
const H = 3.2; // wall height
const DARK = 0.8;
const LIT = -0.6;

export function gallery(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { rayL: 0, rayR: 0 };

  // Floor, back wall, end walls, and the dividing wall with a doorway, cut away in front.
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, tone = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), kit.surface(tone));
    m.position.set(x, y, z);
    scene.add(m);
    return m;
  };
  box(W * 2, 0.12, D * 2, 0, -0.06, 0, 0.15);
  box(W * 2, H, 0.14, 0, H / 2, -D, -0.3);
  box(0.14, H, D * 2, -W, H / 2, 0, 0.1);
  box(0.14, H, D * 2, W, H / 2, 0, 0.1);
  const doorZ0 = -0.2;
  const doorZ1 = 1.4;
  const doorH = 2.3;
  box(0.22, H, doorZ0 + D, 0, H / 2, (-D + doorZ0) / 2, 0.35);
  box(0.22, H, D - doorZ1, 0, H / 2, (doorZ1 + D) / 2, 0.35);
  box(0.22, H - doorH, doorZ1 - doorZ0, 0, (H + doorH) / 2, (doorZ0 + doorZ1) / 2, 0.35);

  // A painting: a frame, a canvas, and a figure in relief. Its materials start dark.
  const painting = (x: number, pose: typeof JOY) => {
    const g = new THREE.Group();
    g.position.set(x, 1.75, -D + 0.1);
    scene.add(g);
    const canvasMat = kit.surface(DARK);
    const canvas = new THREE.Mesh(new THREE.BoxGeometry(2, 2.3, 0.06), canvasMat);
    g.add(canvas);
    const frameMat = kit.surface(0.2);
    for (const [w, h, px, py] of [
      [2.3, 0.15, 0, 1.22],
      [2.3, 0.15, 0, -1.22],
      [0.15, 2.6, -1.08, 0],
      [0.15, 2.6, 1.08, 0],
    ]) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.14), frameMat);
      f.position.set(px, py, 0.04);
      g.add(f);
    }
    const person = makePerson(kit, DARK);
    person.setPose(pose);
    person.group.scale.set(1, 1, 0.3);
    person.group.position.set(0, -1.02, 0.08);
    g.add(person.group);
    const personMat = (person.group.children[0].children[0] as THREE.Mesh)
      .material as THREE.ShaderMaterial;
    return { g, tones: [canvasMat.uniforms.tone, personMat.uniforms.tone] };
  };
  const joy = painting(-W / 2, JOY);
  const grief = painting(W / 2, GRIEF);

  // One lamp above the dividing wall, and a ray of its light into each room.
  const lamp = new THREE.Group();
  lamp.position.set(0, H + 1.1, -D + 0.9);
  const glass = new THREE.Mesh(new THREE.OctahedronGeometry(0.26), kit.surface(-0.4));
  glass.scale.y = 1.4;
  lamp.add(glass);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.22, 16), kit.surface(0.4));
  cap.position.y = 0.42;
  lamp.add(cap);
  scene.add(lamp);
  const rayTo = (p: typeof joy) => {
    const target = p.g.position.clone().add(V(0, 0.4, 0.2));
    const ray = dashed(lamp.position.clone(), target, kit.ink, 0.09);
    scene.add(ray);
    return { ray, verts: ray.geometry.attributes.position.count };
  };
  const rays = [rayTo(joy), rayTo(grief)];

  const labels: Label3D[] = [
    {
      id: "joy",
      text: "A FIGURE IN JOY",
      at: joy.g.position.clone().add(V(0.7, 1.2, 0)),
      dx: 90,
      dy: -40,
    },
    {
      id: "grief",
      text: "A FIGURE IN GRIEF",
      at: grief.g.position.clone().add(V(-0.7, 1.2, 0)),
      dx: -90,
      dy: -40,
    },
    { id: "wall", text: "A WALL BETWEEN SELVES", at: V(0, H, D * 0.8), dx: 60, dy: -50 },
    { id: "light", text: "ONE LIGHT", at: lamp.position, dx: 70, dy: -30 },
    { id: "you", text: "YOU, WALKING THE GALLERY", at: V(0, 0.1, D), dx: 0, dy: 40 },
  ];

  // The walk stays just outside the cutaway front, at eye height. Narrow screens stand
  // further back to keep a painting's width in view.
  const back = narrow ? 1.25 : 1;
  const room = (x: number) => ({ t: V(x, 1.7, -D), o: V(0, 0.2, 6.6 * back) });
  const above = { t: V(0, 2, -1.6), o: V(0, 4.5 * back, 12 * back) };

  const light = (tl: gsap.core.Timeline, key: "rayL" | "rayR", p: typeof joy, at: number) => {
    tl.to(st, { [key]: 1, duration: 1.1, ease: "none" }, at);
    for (const tone of p.tones)
      tl.to(tone, { value: LIT, duration: 0.9, ease: "power2.out" }, at + 0.9);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      rays[0].ray.geometry.setDrawRange(0, Math.round((st.rayL * rays[0].verts) / 2) * 2);
      rays[1].ray.geometry.setDrawRange(0, Math.round((st.rayR * rays[1].verts) / 2) * 2);
    },
    stops: [
      // 1 · One room: a new self, and the light finds it.
      (tl, t, c) => {
        tl.addLabel("joy", t);
        tl.fromTo(
          kit.clip,
          { constant: -W - 0.5 },
          { constant: 0.3, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { ...room(-W / 2).t, x: -W },
          { ...room(-W / 2).t, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -3, y: 1, z: 9 * back },
          { ...room(-W / 2).o, duration: 2.6, ease: EASE },
          t
        );
        light(tl, "rayL", joy, t + 2.2);
        lab(tl, c, { joy: 1 }, t + 3.4);
      },
      // 2 · Walk through to the next room: another self, and a wall between.
      (tl, t, c) => {
        tl.addLabel("grief", t);
        lab(tl, c, { joy: 0 }, t);
        tl.to(kit.clip, { constant: W + 1, duration: 2.6, ease: "power1.inOut" }, t);
        cam(tl, c, room(W / 2).t, room(W / 2).o, t + 0.2, 3.2, "sine.inOut");
        lab(tl, c, { wall: 1 }, t + 1.4);
        lab(tl, c, { wall: 0 }, t + 2.8);
        light(tl, "rayR", grief, t + 3);
        lab(tl, c, { grief: 1 }, t + 4);
      },
      // 3 · Rise above the wall: one lamp, its light in both rooms.
      (tl, t, c) => {
        tl.addLabel("light", t);
        lab(tl, c, { grief: 0 }, t);
        cam(tl, c, V(0, H, -1), V(-2.5, 3.5, 9 * back), t, 2.6, EASE);
        lab(tl, c, { light: 1 }, t + 2.4);
      },
      // 4 · The whole gallery at once: every self, one experiencer.
      (tl, t, c) => {
        tl.addLabel("gallery", t);
        lab(tl, c, { light: 0 }, t);
        cam(tl, c, above.t, above.o, t, 3, EASE);
        // Narrow screens keep only the light's label; the paintings' would collide.
        lab(tl, c, narrow ? { light: 1 } : { joy: 1, grief: 1, light: 1 }, t + 2.6);
        lab(tl, c, { you: 1 }, t + 3.4);
      },
    ],
  };
}
