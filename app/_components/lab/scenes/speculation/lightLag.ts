// Light-lag. A home star and its orbits; a message crawls a ruled path across the system
// (hours). The camera pulls back to the neighboring stars and a message crawls between them
// (years). Outposts spread across the stars blink out of step, their links long and slow.
// Then they gather home, the links shorten, and the blinking falls into step.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, V } from "../../tourScenes3d";
import { makeBall, makeRipples, makeRuler, orbit, rand } from "./parts";

const ORBITS = [1, 1.7, 2.6];
const STARS = [V(17, 0, -3), V(-15, 0, -9), V(5, 0, -19), V(-7, 0, 9), V(11, 0, 11)];
const SPEED = 1.3; // units per second, the same light everywhere

export function lightLag(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { short: 0, long: 0, out: 0, gather: 0, sync: 0, links: 0 };

  // Home system.
  const home = makeBall(kit, 0.32, -0.7);
  scene.add(home.mesh);
  for (const r of ORBITS) scene.add(orbit(kit, r));
  const planets = ORBITS.map((r, i) => {
    const p = makeBall(kit, 0.09 + i * 0.03, 0.1, 16).mesh;
    const a = [2.4, 0.2, 4.6][i];
    p.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
    scene.add(p);
    return p;
  });

  // Other stars, each with one small orbit.
  for (const s of STARS) {
    const b = makeBall(kit, 0.32, -0.7).mesh;
    b.position.copy(s);
    scene.add(b);
    const o = orbit(kit, 1.1);
    o.position.copy(s);
    scene.add(o);
  }

  // The two ruled paths a message travels.
  const shortA = planets[0].position.clone();
  const shortB = planets[2].position.clone();
  const longA = V(0.5, 0, 0);
  const longB = STARS[0].clone().add(V(-0.5, 0, 0));
  const shortRuler = makeRuler(kit, shortA, shortB, 0.18, 0.06);
  const longRuler = makeRuler(kit, longA, longB, 0.55, 0.22);
  shortRuler.visible = false;
  longRuler.visible = false;
  scene.add(shortRuler, longRuler);
  const msg = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), kit.ink);
  const msgL = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), kit.ink);
  scene.add(msg, msgL);

  // Outposts: one per far star when spread, all on the home orbits when gathered.
  const outposts = STARS.map((s, i) => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.42), kit.surface(-0.4));
    g.add(body);
    const rip = makeRipples(kit, 2, 0.6, 2.4);
    rip.group.rotation.x = -Math.PI / 4;
    g.add(rip.group);
    const spread = s.clone().add(V(0.9, 0.5, 0.6));
    const a = i * 1.26 + 0.5;
    const r = ORBITS[i % 3] + 0.15;
    const gathered = V(Math.cos(a) * r, 0.25, Math.sin(a) * r);
    g.visible = false;
    scene.add(g);
    return { g, rip, spread, gathered, phase: rand(i + 3) };
  });
  // Links between neighboring outposts, with a pulse on each.
  const linkGeo = new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: outposts.length * 2 }, () => V(0, 0, 0))
  );
  const links = new THREE.LineSegments(linkGeo, kit.soft);
  links.visible = false;
  scene.add(links);
  const pulses = outposts.map(() => {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), kit.ink);
    p.visible = false;
    scene.add(p);
    return p;
  });

  const labels: Label3D[] = [
    {
      id: "hours",
      text: "HOURS ACROSS A SYSTEM",
      at: shortA.clone().lerp(shortB, 0.5),
      dx: 0,
      dy: -70,
    },
    {
      id: "years",
      text: "YEARS BETWEEN STARS",
      at: longA.clone().lerp(longB, 0.6),
      dx: 0,
      dy: -60,
    },
    {
      id: "thin",
      text: "SPREAD THIN, OUT OF STEP",
      at: outposts[2].spread,
      dx: 0,
      dy: -40,
    },
    {
      id: "compact",
      text: "COMPACT, IN STEP",
      at: outposts[1].gathered,
      dx: -60,
      dy: -70,
    },
  ];

  const k = narrow ? 0.9 : 1;
  const tmp = new THREE.Vector3();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  // A dot running a path at light speed, looping with a pause at the far end.
  const run = (dot: THREE.Mesh, from: THREE.Vector3, to: THREE.Vector3, time: number) => {
    const len = from.distanceTo(to);
    const period = len / SPEED + 0.8;
    const f = Math.min(((time % period) / period) * (period / (len / SPEED)), 1);
    dot.position.copy(from).lerp(to, f);
  };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      msg.visible = st.short > 0.5;
      msgL.visible = st.long > 0.5;
      if (msg.visible) run(msg, shortA, shortB, time);
      if (msgL.visible) run(msgL, longA, longB, time);
      const pos = linkGeo.attributes.position as THREE.BufferAttribute;
      outposts.forEach((o, i) => {
        o.g.visible = st.out > 0.5;
        o.g.position.copy(o.spread).lerp(o.gathered, st.gather);
        o.g.scale.setScalar(1 - 0.75 * st.gather);
        // Out of step: each blinks on its own phase. In step: one shared phase.
        o.rip.update(time, st.out, 0.45, o.phase * (1 - st.sync));
        const next = outposts[(i + 1) % outposts.length];
        a.copy(o.spread).lerp(o.gathered, st.gather);
        b.copy(next.spread).lerp(next.gathered, st.gather);
        pos.setXYZ(i * 2, a.x, a.y, a.z);
        pos.setXYZ(i * 2 + 1, b.x, b.y, b.z);
        const p = pulses[i];
        p.visible = st.links > 0.5;
        if (p.visible) {
          tmp.copy(a);
          run(p, tmp, b, time + o.phase * 10);
          p.scale.setScalar(1 - 0.8 * st.gather);
        }
      });
      pos.needsUpdate = true;
      linkGeo.computeBoundingSphere();
      links.visible = st.links > 0.5;
    },
    stops: [
      // 1 · Across a system, messages take hours.
      (tl, t, c) => {
        tl.addLabel("hours", t);
        tl.fromTo(
          kit.clip,
          { constant: -3 },
          { constant: 3.2, duration: 2.2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.3);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0, z: 0 },
          { x: 0.2, y: 0, z: 0.3, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 3, y: 6, z: 7 },
          { x: 0, y: 4.4 * k, z: 6.4 * k, duration: 3, ease: EASE },
          t
        );
        tl.set(shortRuler, { visible: true }, t + 1.6);
        tl.set(st, { short: 1 }, t + 2);
        lab(tl, c, { hours: 1 }, t + 2.2);
      },
      // 2 · Across many systems, years.
      (tl, t, c) => {
        tl.addLabel("years", t);
        lab(tl, c, { hours: 0 }, t);
        tl.set(st, { short: 0 }, t + 0.4);
        cam(tl, c, V(1.5, 0, -3), V(0, 30 * k, 30 * k), t, 3, EASE);
        tl.set(longRuler, { visible: true }, t + 1.8);
        tl.set(st, { long: 1 }, t + 2.4);
        lab(tl, c, { years: 1 }, t + 2.6);
      },
      // 3 · Spread thin, the parts drift out of step.
      (tl, t, c) => {
        tl.addLabel("thin", t);
        lab(tl, c, { years: 0 }, t);
        tl.set(st, { long: 0 }, t + 0.4);
        tl.set(longRuler, { visible: false }, t + 0.4);
        tl.set(shortRuler, { visible: false }, t);
        cam(tl, c, V(1.5, 0, -2), V(-4, 26 * k, 32 * k), t, 2.6, EASE);
        tl.set(st, { out: 1 }, t + 0.8);
        tl.set(st, { links: 1 }, t + 1.6);
        lab(tl, c, { thin: 1 }, t + 2.4);
      },
      // 4 · Compact, the whole falls into step.
      (tl, t, c) => {
        tl.addLabel("compact", t);
        lab(tl, c, { thin: 0 }, t);
        tl.to(st, { gather: 1, duration: 3, ease: "power2.inOut" }, t + 0.3);
        cam(tl, c, V(0, 0, 0.3), V(0, 4.8 * k, 7 * k), t + 0.6, 3, EASE);
        tl.to(st, { sync: 1, duration: 1.2, ease: "power1.inOut" }, t + 3.2);
        lab(tl, c, { compact: 1 }, t + 3.6);
      },
    ],
  };
}
