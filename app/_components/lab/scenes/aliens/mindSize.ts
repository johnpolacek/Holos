// Figure A6: how large one mind can grow. A mind is a wire globe with a network inside and
// a signal crossing it at a steady pace. It grows, and the crossing takes longer, until it
// meets the limit light delay sets. More energy then funds more minds of that size around
// the same star, not a bigger one. Last, the crowded star sheds heat it should not have.
// Stops tween only plain state.

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
import { makeGlobe, makeRings, makeStar, rng } from "./common";

const ORBIT = 2.7;
const CAPR = 1.15; // the useful limit
const MINDS = 6;

export function aliensMindSize(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { size: 0.45, more: 0, heat: 0, limit: 0 };
  const r = rng(17);

  const star = makeStar(kit, 0.5, 14);
  scene.add(star);

  // One mind: nodes inside a unit globe, joined to their near neighbours.
  const makeMind = () => {
    const g = new THREE.Group();
    g.add(makeGlobe(kit, 1, 8));
    const nodes: THREE.Vector3[] = [];
    while (nodes.length < 22) {
      const p = V(r() * 2 - 1, r() * 2 - 1, r() * 2 - 1);
      if (p.length() < 0.85) nodes.push(p);
    }
    const mat = kit.surface(0.1);
    const geo = new THREE.SphereGeometry(0.06, 10, 8);
    for (const p of nodes) {
      const m = new THREE.Mesh(geo, mat);
      m.position.copy(p);
      g.add(m);
    }
    const pairs: THREE.Vector3[] = [];
    nodes.forEach((a, i) => {
      for (let j = i + 1; j < nodes.length; j++)
        if (a.distanceTo(nodes[j]) < 0.62) pairs.push(a, nodes[j]);
    });
    g.add(segments(pairs, kit.soft));
    scene.add(g);
    return g;
  };
  const minds = Array.from({ length: MINDS }, (_, i) => {
    const m = makeMind();
    const a = (i / MINDS) * Math.PI * 2;
    m.position.set(Math.cos(a) * ORBIT, 0, Math.sin(a) * ORBIT);
    m.visible = i === 0;
    return m;
  });
  const first = minds[0].position;

  // A signal crossing the first mind at a steady pace, edge to edge.
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), kit.ink);
  scene.add(pulse);
  const trail = line([V(0, 0, 0), V(0, 0, 0)], kit.ink);
  scene.add(trail);

  // The limit: a dashed ring at the largest useful size.
  const limit = new THREE.Group();
  const ring = circlePts(CAPR, 64);
  const dash: THREE.Vector3[] = [];
  for (let i = 0; i < 64; i += 2) dash.push(ring[i], ring[i + 1]);
  limit.add(segments(dash, kit.ink));
  limit.position.copy(first);
  scene.add(limit);

  // Heat leaving the crowded star, flat around it.
  const heat = makeRings(kit, 4, 5.5, kit.soft);
  heat.group.rotation.x = -Math.PI / 2;
  scene.add(heat.group);

  const labels: Label3D[] = [
    { id: "mind", text: "ONE MIND", at: first.clone().add(V(0, 0.5, 0)), dx: 70, dy: -50 },
    { id: "signal", text: "A SIGNAL CROSSING", at: V(0, 0, 0), dx: -40, dy: 60 },
    {
      id: "limit",
      text: "THE LIGHT-DELAY LIMIT",
      at: first.clone().add(V(CAPR * 0.7, CAPR * 0.7, 0)),
      dx: 80,
      dy: -40,
    },
    { id: "more", text: "ANOTHER MIND NEARBY", at: minds[1].position, dx: 60, dy: -80 },
    { id: "star", text: "ONE STAR, HARVESTED", at: V(0, 0.5, 0), dx: -60, dy: -110 },
    { id: "heat", text: "HEAT IT SHOULD NOT HAVE", at: V(-5.2, 0, 0.8), dx: -20, dy: 60 },
  ];
  const signalAt = labels[1].at;

  const k = narrow ? 1.05 : 1;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      minds[0].scale.setScalar(st.size);
      minds.forEach((m, i) => {
        if (i === 0) return;
        const s = Math.min(Math.max(st.more * MINDS - i + 1, 0), 1);
        m.visible = s > 0.01;
        m.scale.setScalar(Math.max(s * CAPR, 0.01));
      });
      // Constant speed: a bigger mind takes longer to cross.
      const R = st.size;
      const speed = 0.9;
      const f = ((time * speed) % (2 * R + 0.6)) - 0.3;
      const x = Math.min(Math.max(f, 0), 2 * R) - R;
      a.copy(first).add(V(-R, R * 0.15, R * 0.3));
      b.copy(first).add(V(R, -R * 0.15, R * 0.3));
      const u = (x + R) / (2 * R);
      pulse.position.copy(a).lerp(b, u);
      pulse.visible = st.heat < 0.5;
      const pos = trail.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, a.x, a.y, a.z);
      pos.setXYZ(1, pulse.position.x, pulse.position.y, pulse.position.z);
      pos.needsUpdate = true;
      trail.visible = pulse.visible;
      signalAt.copy(a).lerp(b, 0.5);
      limit.visible = st.limit > 0.5;
      heat.set(time, st.heat, 0.25);
    },
    stops: [
      // 1 · More work for cheaper: a mind that computes efficiently wants more energy.
      (tl, t, c) => {
        tl.addLabel("mind", t);
        tl.fromTo(
          kit.clip,
          { constant: -1.5 },
          { constant: 1.5, duration: 1.6, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.7);
        tl.fromTo(
          c.rig.target,
          { ...first, x: first.x + 1 },
          { ...first, x: first.x - 0.6, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 1, y: 0.5, z: 4 * k },
          { x: 0, y: 1.2 * k, z: 6.5 * k, duration: 2.6, ease: EASE },
          t
        );
        lab(tl, c, { mind: 1, signal: 1 }, t + 1.8);
      },
      // 2 · Light-speed delay caps how large one mind can usefully grow.
      (tl, t, c) => {
        tl.addLabel("limit", t);
        lab(tl, c, { mind: 0, signal: 0 }, t);
        tl.set(st, { limit: 1 }, t + 0.4);
        cam(tl, c, first.clone().add(V(-0.4, 0, 0)), V(0, 1.5 * k, 8.5 * k), t, 2.4, EASE);
        tl.to(st, { size: CAPR, duration: 3, ease: "power1.inOut" }, t + 0.6);
        lab(tl, c, { limit: 1 }, t + 3);
      },
      // 3 · Past that size, more energy funds another mind nearby.
      (tl, t, c) => {
        tl.addLabel("more", t);
        lab(tl, c, { limit: 0 }, t);
        tl.set(st, { limit: 0 }, t + 0.6);
        cam(tl, c, V(0, 0, 0), V(0, 7 * k, 10 * k), t, 2.6, EASE);
        tl.to(st, { more: 1, duration: 3, ease: "none" }, t + 1);
        lab(tl, c, { more: 1 }, t + 2);
      },
      // 4 · Growth stays home and harvests the star fully: look for heat it should not have.
      (tl, t, c) => {
        tl.addLabel("heat", t);
        lab(tl, c, { more: 0 }, t);
        cam(tl, c, V(0, -0.3, 0), V(0, 9 * k, 14 * k), t, 2.6, EASE);
        tl.to(st, { heat: 1, duration: 1.2 }, t + 1.2);
        lab(tl, c, { star: 1 }, t + 1.8);
        lab(tl, c, { heat: 1 }, t + 2.6);
      },
    ],
  };
}
