// Revisions R1: the revision timeline. Every retired claim stands on one engraved beam, oldest
// first, as a marker shaped by what happened to it. A claim taken out is a hatched stub. A claim
// replaced is a hatched stub with a clean pillar built on it. Narrowed claims taper upward,
// widened ones flare, corrected ones carry a ball, the one reversal stands on its point.
// The camera travels the beam entry by entry, then each kind lifts in turn.
// Stops tween only `st`, the rig, and labels, so any stop fast-forwards.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, dashed, type Label3D, type StopCtx, segments, V } from "../../tourScenes3d";
import { ENTRIES, KIND_OF, type Kind } from "./data";

const GAP = 0.8;
const N = ENTRIES.length;
const X = (i: number) => i * GAP;
const END = X(N - 1);
const STEP = 0.55; // seconds per entry while the camera travels
const KINDS: Kind[] = ["gone", "narrowed", "widened", "corrected", "reversed", "replaced"];
const KIND_TEXT: Record<Kind, string> = {
  gone: "RETIRED, DROPPED, CUT",
  narrowed: "NARROWED, REDUCED, FROZEN",
  widened: "EXTENDED, WIDENED",
  corrected: "CORRECTED, CLARIFIED",
  reversed: "REVERSED",
  replaced: "REPLACED",
};
const ZERO = Object.fromEntries(KINDS.map((k) => [k, 0]));
// The member each kind's label points at: early on the beam, nearest the overview camera.
const KIND_AT: Record<Kind, number> = {
  gone: 0,
  narrowed: 5,
  widened: 8,
  corrected: 19,
  reversed: 40,
  replaced: 3,
};

function marker(kit: ReturnType<typeof makeKit>, kind: Kind, mats: Record<string, THREE.Material>) {
  const g = new THREE.Group();
  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, y: number, rotY = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.y = y;
    m.rotation.y = rotY;
    g.add(m);
    return m;
  };
  let h = 1;
  if (kind === "gone") {
    // The claim taken out: a broken stub, hatched.
    add(new THREE.BoxGeometry(0.36, 0.42, 0.36), mats.old, 0.21);
    add(new THREE.BoxGeometry(0.3, 0.08, 0.3), mats.old, 0.46, 0.5).rotation.z = 0.35;
    h = 0.5;
  } else if (kind === "replaced") {
    // The old claim below, hatched; the new one built on it, clean.
    add(new THREE.BoxGeometry(0.38, 0.3, 0.38), mats.old, 0.15);
    add(new THREE.BoxGeometry(0.28, 0.85, 0.28), mats.clean, 0.725);
    add(new THREE.ConeGeometry(0.22, 0.22, 4), mats.clean, 1.26, Math.PI / 4);
    h = 1.37;
  } else if (kind === "narrowed") {
    add(new THREE.BoxGeometry(0.4, 0.12, 0.4), mats.old, 0.06);
    add(new THREE.ConeGeometry(0.25, 1.15, 4), mats.clean, 0.695, Math.PI / 4);
    h = 1.27;
  } else if (kind === "widened") {
    add(new THREE.BoxGeometry(0.4, 0.12, 0.4), mats.old, 0.06);
    add(new THREE.CylinderGeometry(0.3, 0.1, 0.95, 4), mats.clean, 0.595, Math.PI / 4);
    h = 1.07;
  } else if (kind === "corrected") {
    add(new THREE.BoxGeometry(0.38, 0.12, 0.38), mats.old, 0.06);
    add(new THREE.BoxGeometry(0.26, 0.72, 0.26), mats.clean, 0.48);
    add(new THREE.SphereGeometry(0.16, 20, 14), mats.clean, 1.0);
    h = 1.16;
  } else {
    // Reversed: the claim stood on its head, its point to the beam.
    add(new THREE.ConeGeometry(0.28, 1.0, 4), mats.clean, 0.5, Math.PI / 4).rotation.x = Math.PI;
    add(new THREE.BoxGeometry(0.44, 0.1, 0.44), mats.clean, 1.05);
    h = 1.1;
  }
  return { g, h };
}

export function timeline(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const lift: Record<Kind, number> = {
    gone: 0,
    replaced: 0,
    narrowed: 0,
    widened: 0,
    corrected: 0,
    reversed: 0,
  };
  const st = { lift };
  const mats = { old: kit.surface(0.6), clean: kit.surface(-0.25) };

  // The beam, with a tick under every entry and one soft run left open past the newest.
  const beam = new THREE.Mesh(new THREE.BoxGeometry(END + 1.6, 0.3, 0.9), kit.surface(0.25));
  beam.position.set(END / 2, -0.15, 0);
  scene.add(beam);
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) ticks.push(V(X(i), -0.06, 0.46), V(X(i), -0.24, 0.46));
  scene.add(segments(ticks, kit.ink));
  scene.add(dashed(V(END + 0.8, -0.15, 0.46), V(END + 4.2, -0.15, 0.46), kit.soft, 0.12));
  scene.add(dashed(V(END + 0.8, 0, 0), V(END + 4.2, 0, 0), kit.soft, 0.12));

  const marks = ENTRIES.map(([, verb], i) => {
    const kind = KIND_OF[verb];
    const m = marker(kit, kind, mats);
    m.g.position.x = X(i);
    scene.add(m.g);
    return { ...m, kind };
  });

  // Entry labels sit in three rows, so the few shown at once never share one.
  const rowDy = narrow ? [-26, -54, -82] : [-30, -62, -94];
  const labels: Label3D[] = ENTRIES.map(([tag, verb], i) => ({
    id: `e${i}`,
    text: `${tag}, ${verb}`,
    at: V(X(i), marks[i].h + 0.1, 0),
    dx: 0,
    dy: rowDy[i % 3],
  }));
  for (const k of KINDS) {
    const i = KIND_AT[k];
    labels.push({
      id: `k-${k}`,
      text: KIND_TEXT[k],
      at: V(X(i), marks[i].h + 0.55, 0),
      dx: 0,
      dy: -50,
    });
  }
  labels.push(
    { id: "oldest", text: "OLDEST", at: V(0, -0.3, 0.46), dx: 0, dy: 40 },
    { id: "newest", text: "NEWEST", at: V(END, -0.3, 0.46), dx: 0, dy: 40 }
  );

  const pull = narrow ? 0.78 : 1.15;
  const near = V(0, 1.5 * pull, 6.6 * pull);
  const wideT = narrow ? V(11, -0.8, 0) : V(11.5, -0.2, 0);
  const wideO = narrow ? V(-21, 9.5, 11.5) : V(-21, 5, 10.5);
  const aim = (i: number) => V(X(i), 0.75, 0);
  const off = (ids: string[]) => Object.fromEntries(ids.map((id) => [id, 0]));
  const allEntries = ENTRIES.map((_, i) => `e${i}`);
  const allKinds = KINDS.map((k) => `k-${k}`);
  const fade = (tl: gsap.core.Timeline, c: StopCtx, v: Record<string, number>, at: number) =>
    tl.to(c.labels, { ...v, duration: 0.3, ease: "power1.inOut" }, at);

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const m of marks) m.g.position.y = st.lift[m.kind] * 0.55;
    },
    stops: [
      // 1 · The beam engraves in, oldest at the left, every entry standing on it.
      (tl, t, c) => {
        tl.addLabel("beam", t);
        tl.fromTo(
          kit.clip,
          { constant: -1.2 },
          { constant: END + 5, duration: 3.2, ease: "power1.inOut" },
          t
        );
        tl.fromTo(c.rig.target, { ...wideT, x: 4 }, { ...wideT, duration: 3.4, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { x: wideO.x * 0.6, y: wideO.y * 0.5, z: wideO.z * 0.7 },
          { ...wideO, duration: 3.4, ease: EASE },
          t
        );
        fade(tl, c, { oldest: 1 }, t + 1);
        fade(tl, c, { newest: 1 }, t + 3.2);
      },
      // 2 · The camera travels the beam, a few entries named at a time.
      (tl, t, c) => {
        tl.addLabel("travel", t);
        fade(tl, c, { oldest: 0, newest: 0, ...off(allKinds) }, t);
        tl.set(st.lift, ZERO, t);
        tl.to(c.rig.target, { ...aim(0), duration: 2.2, ease: EASE }, t);
        tl.to(c.rig.offset, { ...near, duration: 2.2, ease: EASE }, t);
        const t0 = t + 2.4;
        tl.to(c.rig.target, { x: END, duration: (N - 1) * STEP, ease: "none" }, t0);
        const w = narrow ? 0.45 : 0.8;
        ENTRIES.forEach((_, i) => {
          const pass = t0 + i * STEP;
          fade(tl, c, { [`e${i}`]: 1 }, Math.max(pass - w, t0 - 0.4));
          fade(tl, c, { [`e${i}`]: 0 }, pass + w);
        });
      },
      // 3 · Each kind lifts in turn. Replaced, the most common, comes last.
      (tl, t, c) => {
        tl.addLabel("kinds", t);
        fade(tl, c, off(allEntries), t);
        tl.to(c.rig.target, { ...wideT, duration: 2.6, ease: EASE }, t);
        tl.to(c.rig.offset, { ...wideO, duration: 2.6, ease: EASE }, t);
        KINDS.forEach((k, j) => {
          const at = t + 2.6 + j * 2.1;
          tl.to(st.lift, { [k]: 1, duration: 0.5, ease: "back.out(2)" }, at);
          fade(tl, c, { [`k-${k}`]: 1 }, at + 0.2);
          if (j < KINDS.length - 1) {
            tl.to(st.lift, { [k]: 0, duration: 0.4, ease: "power2.in" }, at + 1.7);
            fade(tl, c, { [`k-${k}`]: 0 }, at + 1.6);
          }
        });
      },
      // 4 · The newest entries, then the whole beam again, still open at its end.
      (tl, t, c) => {
        tl.addLabel("newest", t);
        fade(tl, c, off(allKinds), t);
        tl.to(st.lift, { ...ZERO, duration: 0.4 }, t);
        tl.to(c.rig.target, { ...aim(N - 2), duration: 2.6, ease: EASE }, t);
        tl.to(c.rig.offset, { ...near, duration: 2.6, ease: EASE }, t);
        const last = narrow ? [N - 2, N - 1] : [N - 3, N - 2, N - 1];
        last.forEach((i, j) => {
          fade(tl, c, { [`e${i}`]: 1 }, t + 2.2 + j * 0.5);
        });
        fade(tl, c, Object.fromEntries(last.map((i) => [`e${i}`, 0])), t + 5.6);
        tl.to(c.rig.target, { ...wideT, duration: 3, ease: EASE }, t + 5.8);
        tl.to(c.rig.offset, { ...wideO, duration: 3, ease: EASE }, t + 5.8);
        fade(tl, c, { oldest: 1, newest: 1 }, t + 8);
      },
    ],
  };
}
