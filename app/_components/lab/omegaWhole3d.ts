// Figure Ω1: the whole and its apertures, and what Omega is not.
// One branching quantum state inside an engraved globe. Apertures open on a few
// branches. Reaching links between them stop short: the parts are not all joined.
// Branches outside every aperture's past darken with hatching: never lived. The camera
// leaves the globe and finds nothing outside it. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "./engrave3d";
import { EASE } from "./figures3d";
import { type Built3D, cam, circlePts, type Label3D, lab, line, makeIris, V } from "./tourScenes3d";

const SHELL = 5.6;
const SHELL_Y = 0.3;

export function omegaWhole(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { reach: 0, open: [0, 0, 0, 0] };

  // The one state: a tree of branches, each a tube. Lived and unlived get separate
  // materials so the unlived can darken on cue.
  type Seg = { a: THREE.Vector3; b: THREE.Vector3; depth: number; parent: number };
  const segs: Seg[] = [];
  const grow = (
    a: THREE.Vector3,
    dir: THREE.Vector3,
    len: number,
    depth: number,
    spin: number,
    parent: number
  ) => {
    const b = a.clone().addScaledVector(dir, len);
    const me = segs.length;
    segs.push({ a, b, depth, parent });
    if (depth === 5) return;
    const side = V(Math.cos(spin), 0, Math.sin(spin));
    const axis = new THREE.Vector3().crossVectors(dir, side).normalize();
    for (const s of [-1, 1]) {
      grow(
        b,
        dir
          .clone()
          .applyAxisAngle(axis, s * 0.5)
          .normalize(),
        len * 0.8,
        depth + 1,
        spin + 2.4,
        me
      );
    }
  };
  grow(V(0, -3.6, 0), V(0, 1, 0), 1.5, 0, 0.3, -1);

  const tips = segs.map((s, i) => ({ s, i })).filter(({ s }) => s.depth === 5);
  const apertureTips = [tips[4], tips[13], tips[21], tips[28]].map((t) => t.i);
  // Lived: every segment in the past of an aperture, its ancestors included.
  const lived = new Set<number>();
  for (let i of apertureTips) {
    while (i >= 0) {
      lived.add(i);
      i = segs[i].parent;
    }
  }
  const livedMat = kit.surface(0);
  const unlivedMat = kit.surface(0);
  segs.forEach((s, i) => {
    const mid = s.a.clone().lerp(s.b, 0.5);
    mid.x += Math.sin(i * 1.7) * 0.08;
    mid.z += Math.cos(i * 2.3) * 0.08;
    const r = 0.14 * 0.72 ** s.depth;
    const mat = lived.has(i) ? livedMat : unlivedMat;
    scene.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3([s.a, mid, s.b]), 12, r, 8),
        mat
      )
    );
    const joint = new THREE.Mesh(new THREE.SphereGeometry(r * 1.05, 10, 8), mat);
    joint.position.copy(s.b);
    scene.add(joint);
  });

  // Apertures, set a little out along their branch.
  const along = (i: number, t = 0.7) => segs[i].a.clone().lerp(segs[i].b, t);
  const irises = apertureTips.map((i) => {
    const iris = makeIris(kit, 0.13);
    iris.setOpen(0);
    iris.group.position.copy(along(i)).add(V(0, 0, 0.2));
    iris.group.visible = false;
    scene.add(iris.group);
    return iris;
  });

  // Links reaching from each aperture toward the next, which never meet.
  const pairs: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ];
  const reaches = pairs.flatMap(([p, q]) => {
    const a = irises[p].group.position;
    const b = irises[q].group.position;
    return [
      { from: a, to: a.clone().lerp(b, 0.42) },
      { from: b, to: b.clone().lerp(a, 0.42) },
    ];
  });
  const reachGeo = new THREE.BufferGeometry().setFromPoints(
    reaches.flatMap((r) => [r.from, r.from.clone()])
  );
  const reachLines = new THREE.LineSegments(reachGeo, kit.ink);
  scene.add(reachLines);

  // Omega: the engraved globe, with nothing outside it.
  const shell = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI;
    shell.add(
      line(
        circlePts(SHELL, 128).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        kit.soft,
        true
      )
    );
  }
  for (const lat of [-0.9, -0.5, 0, 0.5, 0.9]) {
    const y = SHELL * Math.sin(lat);
    const r = SHELL * Math.cos(lat);
    shell.add(
      line(
        circlePts(r, 128).map((p) => V(p.x, y, p.y)),
        lat === 0 ? kit.ink : kit.soft,
        true
      )
    );
  }
  shell.position.y = SHELL_Y;
  shell.visible = false;
  scene.add(shell);

  const unlivedTip = tips.find(
    ({ i }) => !lived.has(i) && segs[segs[i].parent].parent >= 0 && !lived.has(segs[i].parent)
  );
  const labels: Label3D[] = [
    { id: "state", text: "ONE QUANTUM STATE", at: V(0, -2.6, 0), dx: 140, dy: 20 },
    { id: "omega", text: "OMEGA, THE WHOLE", at: V(0, SHELL_Y + SHELL, 0), dx: 0, dy: -24 },
    { id: "aperture", text: "AN APERTURE", at: irises[1].group.position, dx: -100, dy: -50 },
    { id: "joined", text: "NOT ALL JOINED", at: reaches[2].to, dx: 130, dy: -90 },
    {
      id: "lived",
      text: "NEVER LIVED",
      at: along(unlivedTip?.i ?? tips[0].i, 0.8),
      dx: 110,
      dy: -40,
    },
    {
      id: "outside",
      text: "NOTHING OUTSIDE",
      at: V(SHELL * 0.72, SHELL_Y + SHELL * 0.72, 0),
      dx: 110,
      dy: -50,
    },
  ];

  const k = narrow ? 1.05 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const center = V(0, 0.2, 0);
  const near = view(0, 1.2, 13.5);
  const tmp = new THREE.Vector3();

  const open = (tl: gsap.core.Timeline, i: number, at: number) => {
    tl.set(irises[i].group, { visible: true }, at);
    tl.to(st.open, { [i]: 0.85, duration: 0.9, ease: "back.out(2)" }, at);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      irises.forEach((iris, i) => {
        iris.setOpen(st.open[i]);
      });
      const pos = reachGeo.attributes.position as THREE.BufferAttribute;
      reaches.forEach((r, i) => {
        tmp.copy(r.from).lerp(r.to, st.reach);
        pos.setXYZ(i * 2 + 1, tmp.x, tmp.y, tmp.z);
      });
      pos.needsUpdate = true;
    },
    stops: [
      // 1 · One state, every branch included, held in one whole.
      (tl, t, c) => {
        tl.addLabel("state", t);
        tl.fromTo(
          kit.clip,
          { constant: -3.8 },
          { constant: 4.5, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.fromTo(c.rig.target, { x: 0, y: -2.5, z: 0 }, { ...center, duration: 3, ease: EASE }, t);
        tl.fromTo(c.rig.offset, { ...view(5, -0.5, 9) }, { ...near, duration: 3, ease: EASE }, t);
        lab(tl, c, { state: 1 }, t + 2);
        tl.set(kit.clip, { constant: 100 }, t + 2.7);
        tl.set(shell, { visible: true }, t + 2.7);
        tl.fromTo(
          shell.scale,
          { x: 0.6, y: 0.6, z: 0.6 },
          { x: 1, y: 1, z: 1, duration: 1.6, ease: EASE },
          t + 2.7
        );
        cam(tl, c, center, view(0, 2.5, 19), t + 2.7, 2, EASE);
        lab(tl, c, { omega: 1 }, t + 3.8);
      },
      // 2 · Every observer is an aperture of it.
      (tl, t, c) => {
        tl.addLabel("apertures", t);
        lab(tl, c, { state: 0, omega: 0 }, t);
        cam(tl, c, center, near, t, 2, EASE);
        irises.forEach((_, i) => {
          open(tl, i, t + 1 + i * 0.45);
        });
        lab(tl, c, { aperture: 1 }, t + 2.8);
      },
      // 3 · Not one giant mind: the parts reach for each other and never join.
      (tl, t, c) => {
        tl.addLabel("joined", t);
        lab(tl, c, { aperture: 0 }, t);
        cam(tl, c, V(0, 1.2, 0), view(-3, 2.2, 12.5), t, 2, EASE);
        tl.to(st, { reach: 1, duration: 1.6, ease: "power2.out" }, t + 1);
        lab(tl, c, { joined: 1 }, t + 2.4);
      },
      // 4 · Nor is all of it lived: branches outside every aperture's past darken.
      (tl, t, c) => {
        tl.addLabel("lived", t);
        lab(tl, c, { joined: 0 }, t);
        tl.to(st, { reach: 0, duration: 0.8, ease: "power2.in" }, t);
        cam(tl, c, center, view(4, 1.5, 13.5), t, 2, EASE);
        tl.to(
          unlivedMat.uniforms.tone,
          { value: 0.95, duration: 1.4, ease: "power1.inOut" },
          t + 1
        );
        // Lived branches lift to clean paper as the rest darken, so the two read apart.
        tl.to(livedMat.uniforms.tone, { value: -0.8, duration: 1.4, ease: "power1.inOut" }, t + 1);
        lab(tl, c, { lived: 1 }, t + 2.2);
      },
      // 5 · Not an agent: leave the whole and find nothing outside it to act from.
      (tl, t, c) => {
        tl.addLabel("outside", t);
        lab(tl, c, { lived: 0 }, t);
        cam(tl, c, center, view(-6, 6, 22), t, 3.2, EASE);
        lab(tl, c, { outside: 1 }, t + 2.8);
      },
    ],
  };
}
