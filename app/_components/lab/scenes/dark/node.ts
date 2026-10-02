// Teeming Dark, figure 3: the Dark Node.
// A mind spread wide as a ring of modules, one signal crawling around it at a fixed speed.
// The ring draws in to a tight cluster: the same signal now laps it fast, and the heat
// gathers. A hatched shell closes over it, dark beside a shining star. Last, cold thin
// structures far around it share the work, and the node still glows faintly warm.
// Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, V } from "../../tourScenes3d";
import { makeEye, makeField, makeGlow, makePanel, makeStar, seeded } from "./common";

const N = 12;
const WIDE = 3.4;
const TIGHT = 0.42;
const STAR_X = -7.5;
const FAR = 9;

export function node(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { pack: 0, shell: 0, star: 0, halo: 0, cold: 0 };
  const eye = makeEye();

  scene.add(makeField(kit, 180, V(70, 40, 40), 9));

  // Modules: a wide ring, or a tight ball.
  const ring = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2;
    return V(Math.cos(a) * WIDE, Math.sin(a) * WIDE * 0.75, Math.sin(a) * 0.6);
  });
  const ball = Array.from({ length: N }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / N;
    const r = Math.sqrt(1 - y * y);
    const a = i * 2.39996;
    return V(Math.cos(a) * r * TIGHT, y * TIGHT, Math.sin(a) * r * TIGHT);
  });
  const modGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  const modMat = kit.surface(-0.2);
  const mods = ring.map((p, i) => {
    const m = new THREE.Mesh(modGeo, modMat);
    m.position.copy(p);
    m.rotation.set(i * 0.7, i * 1.3, 0);
    scene.add(m);
    return m;
  });

  // The link that joins them, and one signal running it at constant speed.
  const linkPos = new Float32Array((N + 1) * 3);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
  const link = new THREE.Line(linkGeo, kit.soft);
  link.frustumCulled = false;
  scene.add(link);
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), kit.ink);
  scene.add(pulse);
  const trail = Array.from({ length: 4 }, (_, i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06 - i * 0.01, 10, 6), kit.ink);
    scene.add(m);
    return m;
  });

  const glow = makeGlow(kit, { r0: 0.8, r1: 3.4, n: 4, speed: 0.4, mat: kit.soft });
  scene.add(glow.group);

  // The shell: ordinary matter that has stopped shining.
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 1), kit.surface(0.6));
  shell.visible = false;
  scene.add(shell);

  const star = makeStar(kit, 1.1);
  star.group.position.set(STAR_X, 0.3, -1);
  scene.add(star.group);

  // Cold structures far out, sharing the work, each faintly glowing.
  const rnd = seeded(41);
  const far = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 + rnd() * 0.25;
    const p = V(Math.cos(a) * FAR, (rnd() - 0.5) * 3, Math.sin(a) * FAR * 0.8);
    const g = makePanel(kit, 1.3, 0.9, -0.5);
    g.position.copy(p);
    g.lookAt(0, 0, 0);
    g.visible = false;
    scene.add(g);
    const gl = makeGlow(kit, { r0: 0.9, r1: 1.5, n: 1, speed: 0.15 });
    gl.group.position.copy(p);
    scene.add(gl.group);
    return { g, gl };
  });

  const back = far.reduce((a, b) => (b.g.position.z < a.g.position.z ? b : a)).g.position.clone();
  back.y += 0.5;
  const labels: Label3D[] = [
    { id: "mind", text: "ONE MIND, SPREAD WIDE", at: ring[3], dx: -40, dy: -50 },
    { id: "signal", text: "A SIGNAL AT LIGHT SPEED", at: ring[9], dx: 80, dy: 50 },
    { id: "warm", text: "COMPACT, WARM", at: V(0.4, 0.4, 0), dx: 110, dy: -70 },
    { id: "star", text: "A STAR SHINES", at: V(STAR_X, 1.4, -1), dx: 0, dy: -70 },
    { id: "node", text: "A DARK NODE", at: V(0.5, 0.6, 0.3), dx: 90, dy: -80 },
    { id: "cold", text: "COLD STRUCTURES", at: back, dx: 30, dy: -60 },
    { id: "space", text: "SILENT, BUT WARMER THAN SPACE", at: V(0, -0.8, 0.3), dx: -170, dy: 100 },
  ];
  if (narrow) {
    labels[1].dx = 20;
    labels[4].dx = 40;
  }

  const k = narrow ? 1.2 : 1;
  const off = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const pts = Array.from({ length: N }, () => new THREE.Vector3());
  const lens: number[] = [];
  let s = 0;
  let last = 0;

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const e = eye.get();
      star.update(time, e);
      star.group.scale.setScalar(Math.max(st.star, 0.001));
      star.group.visible = st.star > 0.01;
      // Ease each module between the ring and the ball, each a little out of step.
      for (let i = 0; i < N; i++) {
        const f = THREE.MathUtils.clamp(st.pack * 1.3 - (i / N) * 0.3, 0, 1);
        const sm = f * f * (3 - 2 * f);
        pts[i].lerpVectors(ring[i], ball[i], sm);
        mods[i].position.copy(pts[i]);
        mods[i].rotation.y = i * 1.3 + time * 0.1;
        linkPos.set([pts[i].x, pts[i].y, pts[i].z], i * 3);
      }
      linkPos.set([pts[0].x, pts[0].y, pts[0].z], N * 3);
      linkGeo.attributes.position.needsUpdate = true;
      // The signal moves at one fixed speed, so a smaller loop is a quicker lap.
      let total = 0;
      for (let i = 0; i < N; i++) {
        lens[i] = pts[i].distanceTo(pts[(i + 1) % N]);
        total += lens[i];
      }
      const dt = Math.min(Math.max(time - last, 0), 0.1);
      last = time;
      s = (s + dt * 2.2) % total;
      const at = (d: number, out: THREE.Vector3) => {
        let r = ((d % total) + total) % total;
        for (let i = 0; i < N; i++) {
          if (r <= lens[i]) return out.lerpVectors(pts[i], pts[(i + 1) % N], r / lens[i]);
          r -= lens[i];
        }
        return out.copy(pts[0]);
      };
      at(s, pulse.position);
      trail.forEach((m, i) => {
        at(s - (i + 1) * 0.22, m.position);
      });
      const inside = st.shell > 0.6;
      for (const m of [pulse, ...trail]) m.visible = !inside;
      shell.visible = st.shell > 0.01;
      shell.scale.setScalar(Math.max(st.shell, 0.001));
      shell.rotation.y = time * 0.05;
      glow.update(time, st.pack, e);
      far.forEach((f, i) => {
        f.g.visible = i < Math.round(st.halo * far.length);
        f.gl.update(time + i * 0.4, f.g.visible ? st.cold : 0, e);
      });
    },
    stops: [
      // 1 · A mind spread wide: one signal crawls around it.
      (tl, t, c) => {
        tl.addLabel("wide", t);
        eye.set(c.rig);
        tl.set(st, { pack: 0, shell: 0, star: 0, halo: 0, cold: 0 }, t);
        tl.fromTo(
          kit.clip,
          { constant: -5 },
          { constant: 30, duration: 2.6, ease: "power1.in" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: -1, y: 0.4, z: 0 },
          { x: 0, y: 0, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...off(-3, 3, 13) },
          { ...off(0.5, 1.6, 12.5), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { mind: 1 }, t + 1.8);
        lab(tl, c, { signal: 1 }, t + 2.6);
      },
      // 2 · Drawn in tight, the signal laps it fast, and the heat gathers.
      (tl, t, c) => {
        tl.addLabel("tight", t);
        eye.set(c.rig);
        lab(tl, c, { mind: 0, signal: 0 }, t);
        cam(tl, c, V(0, 0, 0), off(0.5, 1.2, 9), t, 3.2, EASE);
        tl.fromTo(st, { pack: 0 }, { pack: 1, duration: 3, ease: "power1.inOut" }, t + 0.4);
        lab(tl, c, { warm: 1 }, t + 3.2);
      },
      // 3 · A Dark Node: ordinary matter that has stopped shining, beside a star that shines.
      (tl, t, c) => {
        tl.addLabel("node", t);
        eye.set(c.rig);
        tl.set(st, { pack: 1 }, t);
        lab(tl, c, { warm: 0 }, t);
        cam(tl, c, V(STAR_X / 2, 0.1, 0), off(0, 1.4, narrow ? 16 : 13.5), t, 2.6, EASE);
        tl.fromTo(st, { shell: 0 }, { shell: 1, duration: 1, ease: "back.out(1.4)" }, t + 0.8);
        tl.fromTo(st, { star: 0 }, { star: 1, duration: 1, ease: "back.out(1.4)" }, t + 1.2);
        lab(tl, c, { node: 1 }, t + 2);
        lab(tl, c, { star: 1 }, t + 2.6);
      },
      // 4 · Cold structures may carry most of the heat. The node still glows: warmer than space.
      (tl, t, c) => {
        tl.addLabel("both", t);
        eye.set(c.rig);
        tl.set(st, { pack: 1, shell: 1 }, t);
        lab(tl, c, { star: 0, node: 0 }, t);
        tl.to(st, { star: 0, duration: 0.8, ease: "power2.in" }, t + 0.2);
        cam(tl, c, V(0, -0.4, 0), off(0, 14, 21), t, 3, EASE);
        tl.fromTo(st, { halo: 0 }, { halo: 1, duration: 1.8, ease: "none" }, t + 1);
        tl.fromTo(st, { cold: 0 }, { cold: 1, duration: 1.6, ease: "power1.inOut" }, t + 2);
        lab(tl, c, { cold: 1 }, t + 2.8);
        lab(tl, c, { space: 1 }, t + 3.4);
      },
    ],
  };
}
