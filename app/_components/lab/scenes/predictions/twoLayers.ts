// Two layers of fact. A stone slab is the structural layer: the branches physics produces,
// thick or thin by their weights, the same for everyone. Above it, observers on branches
// register outcomes, each a record indexed to the one who holds it. Observers in different
// branches register different outcomes. Two in the same branch compare records and agree.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, dashed, type Label3D, lab, makeIris, V } from "../../tourScenes3d";
import { box, head, pop, rise, rod, sphere } from "./parts";

const Y = 0.12;
const POST = 2.1;

export function twoLayers(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, 0, -1);
  const scene = new THREE.Scene();
  const st = { open: [0, 0, 0] };

  box(scene, kit.surface(0.35), 9, 0.5, 5.4, 0, -0.25, -0.3);
  box(scene, kit.surface(0.1), 9.2, 0.12, 5.6, 0, -0.56, -0.3);

  // The branches, lying in the slab. Width shows weight: the left branch carries more.
  const branchMat = kit.surface(-0.4);
  const root = V(0, Y, 2.1);
  const fork = V(0, Y, 0.9);
  const L = V(-2, Y, -0.4);
  const R = V(2, Y, -0.4);
  const tips = [V(-3.4, Y, -2.3), V(-1.0, Y, -2.3), V(1.0, Y, -2.3), V(3.4, Y, -2.3)];
  const parts: [THREE.Vector3, THREE.Vector3, number][] = [
    [root, fork, 0.13],
    [fork, L, 0.11],
    [fork, R, 0.05],
    [L, tips[0], 0.09],
    [L, tips[1], 0.05],
    [R, tips[2], 0.035],
    [R, tips[3], 0.035],
  ];
  for (const [a, b, r] of parts) {
    scene.add(rod(a, b, r, branchMat, 10));
    scene.add(sphere(r, branchMat, b));
  }

  // Observers: a post up from a point on a branch, an aperture, and the record it holds.
  const observer = (on: THREE.Vector3, up: boolean) => {
    const g = new THREE.Group();
    g.add(rod(on, on.clone().add(V(0, POST - 0.25, 0)), 0.04, kit.soft, 6));
    g.add(sphere(0.08, kit.ink, on));
    const iris = makeIris(kit, 0.16);
    iris.setOpen(0);
    iris.group.position.copy(on).add(V(0, POST, 0));
    g.add(iris.group);
    const rec = new THREE.Group();
    rec.position.copy(on).add(V(0, POST + 0.85, 0));
    box(rec, kit.surface(-0.7), 0.8, 0.62, 0.08);
    const d = up ? 1 : -1;
    rec.add(rod(V(0, -0.2 * d, 0.06), V(0, 0.08 * d, 0.06), 0.03, kit.ink, 6));
    rec.add(head(V(0, 0.22 * d, 0.06), V(0, d, 0), kit.ink, 0.16));
    g.add(rec);
    g.visible = false;
    scene.add(g);
    return { g, iris, rec };
  };
  const onLeaf = (a: THREE.Vector3, b: THREE.Vector3, t: number) => a.clone().lerp(b, t);
  const obs = [
    observer(onLeaf(L, tips[0], 0.8), true),
    observer(onLeaf(R, tips[3], 0.8), false),
    observer(onLeaf(L, tips[0], 0.25), true),
  ];
  const ia = obs[0].rec.position;
  const ic = obs[2].rec.position;
  const link = dashed(ic.clone().add(V(0.42, 0, 0)), ia.clone().add(V(0.42, 0, 0)), kit.ink, 0.08);
  link.visible = false;
  scene.add(link);

  const labels: Label3D[] = [
    { id: "struct", text: "STRUCTURAL, ABSOLUTE", at: V(3.8, -0.2, 2.4), dx: 30, dy: 50 },
    { id: "weights", text: "BRANCHES, WITH WEIGHTS", at: V(-1.0, Y, 0.25), dx: -90, dy: 60 },
    {
      id: "reg",
      text: "REGISTERED, RELATIVE",
      at: ia.clone().add(V(0, 0.32, 0)),
      dx: -40,
      dy: -50,
    },
    {
      id: "other",
      text: "ANOTHER BRANCH",
      at: obs[1].rec.position.clone().add(V(0, 0.32, 0)),
      dx: 20,
      dy: -50,
    },
    {
      id: "agree",
      text: "RECORDS AGREE",
      at: ic
        .clone()
        .lerp(ia, 0.5)
        .add(V(0.42, 0, 0)),
      dx: 110,
      dy: -40,
    },
  ];

  const k = narrow ? 1.08 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);

  const appear = (tl: gsap.core.Timeline, i: number, at: number) => {
    rise(tl, obs[i].g, at, 0.8);
    tl.to(st.open, { [i]: 0.85, duration: 0.8, ease: "back.out(2)" }, at + 0.7);
    pop(tl, obs[i].rec, at + 1.1, 0.5);
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      obs.forEach((o, i) => {
        o.iris.setOpen(st.open[i]);
      });
    },
    stops: [
      // 1 · Structural facts: absolute, observer-independent.
      (tl, t, c) => {
        tl.addLabel("structural", t);
        tl.fromTo(
          kit.clip,
          { constant: -3 },
          { constant: 3.5, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 0.2, z: -0.2, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-3, 9, 6) },
          { ...view(0.5, 7, 8.5), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { struct: 1 }, t + 2);
        lab(tl, c, { weights: 1 }, t + 2.6);
      },
      // 2 · Registered facts: indexed to the observer, different in different branches.
      (tl, t, c) => {
        tl.addLabel("registered", t);
        lab(tl, c, { struct: 0, weights: 0 }, t);
        cam(tl, c, V(0, 1.6, -1.2), view(0, 3.6, 11), t, 2.2, EASE);
        appear(tl, 0, t + 0.8);
        lab(tl, c, { reg: 1 }, t + 2.4);
        appear(tl, 1, t + 2.6);
        lab(tl, c, { other: 1 }, t + 4.1);
      },
      // 3 · Within a branch: compare records, and they agree.
      (tl, t, c) => {
        tl.addLabel("agree", t);
        lab(tl, c, { reg: 0, other: 0 }, t);
        cam(tl, c, V(-1.6, 1.8, -1.0), view(2.5, 3, 9.5), t, 2.2, EASE);
        appear(tl, 2, t + 0.9);
        tl.set(link, { visible: true }, t + 2.4);
        lab(tl, c, { agree: 1 }, t + 2.6);
        lab(tl, c, { other: 1 }, t + 3.2);
      },
    ],
  };
}
