// The hero and closing figures: one clockwork cosmos, first unwitnessed, then lived.
// Hero (Introduction): the orrery engraves in and runs, complete and hatched as
// structure. The camera circles and finds no one. A small witness appears on the third
// world, its aperture opens, light from every body reaches it, and the cosmos lifts to
// clean paper: reality. Closing (Why Are We Here?) runs the same cosmos and ends wider,
// the witness lifting its arms. Stops tween only `st`, tones, the rig, and labels.

import type gsap from "gsap";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, V } from "../../tourScenes3d";
import { makeCosmos, SUN_Y } from "./cosmos";

const LIFT = -0.7;

function base() {
  const c = makeCosmos();
  const { kit, st, worlds, eye } = c;
  const outer = worlds[3].body;
  const home = c.homeAt(1);
  const at = {
    gear: V(1.38, 0.62, 0.42),
    outer: V(0, 0, 0),
    eye: V(0, 0, 0),
    sun: V(0, SUN_Y + 0.52, 0),
    plinth: V(-2.4, 0.4, 1.6),
  };
  const update = (time: number) => {
    c.update(time);
    outer.getWorldPosition(at.outer);
    at.eye.copy(eye);
  };
  // Engrave the cosmos upward and set the clockwork running.
  const draw = (tl: gsap.core.Timeline, t: number) => {
    tl.fromTo(
      kit.clip,
      { constant: -0.1 },
      { constant: 10, duration: 3.4, ease: "power1.inOut" },
      t
    );
    tl.set(kit.clip, { constant: 100 }, t + 3.5);
    tl.fromTo(st, { turn: 0 }, { turn: 0.45, duration: 7, ease: "none" }, t);
  };
  const witness = (tl: gsap.core.Timeline, t: number) => {
    tl.set(c.person.group, { visible: true }, t);
    tl.fromTo(
      c.person.group.scale,
      { x: 0.002, y: 0.002, z: 0.002 },
      { x: 0.2, y: 0.2, z: 0.2, duration: 0.8, ease: "back.out(1.6)" },
      t
    );
    tl.set(c.iris.group, { visible: true }, t + 0.8);
    tl.fromTo(st, { open: 0 }, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 0.8);
    tl.fromTo(st, { sight: 0 }, { sight: 1, duration: 1.8, ease: "none" }, t + 1.5);
  };
  const lift = (tl: gsap.core.Timeline, t: number, dur = 1.8) => {
    tl.to(c.bodyMat.uniforms.tone, { value: LIFT, duration: dur, ease: "power1.inOut" }, t);
    tl.to(c.brassMat.uniforms.tone, { value: -0.1, duration: dur, ease: "power1.inOut" }, t);
  };
  return { c, st, at, home, update, draw, witness, lift };
}

const CENTER = V(0, 2.2, 0);

export function witness(narrow = false): Built3D {
  const { c, st, at, home, update, draw, witness: arrive, lift } = base();
  const k = narrow ? 0.92 : 1;
  const wide = V(0, 3.4 * k, 11 * k);
  const close = narrow ? V(0.7, 0.45, 2.3) : V(1.1, 0.55, 2.7);
  const labels: Label3D[] = [
    { id: "laws", text: "EVERY LAW HOLDS", at: at.gear, dx: 110, dy: 50 },
    { id: "events", text: "EVERY EVENT OCCURS", at: at.outer, dx: 40, dy: -70 },
    { id: "none", text: "NO ONE TO WITNESS IT", at: at.sun, dx: -60, dy: -80 },
    { id: "structure", text: "STRUCTURE", at: at.plinth, dx: -50, dy: 50 },
    { id: "witness", text: "A WITNESS", at: at.eye, dx: -90, dy: -50 },
    { id: "reality", text: "REALITY", at: at.sun, dx: 0, dy: -90 },
  ];
  return {
    scene: c.scene,
    kit: c.kit,
    labels,
    update,
    stops: [
      // 1 · Complete in every detail: the clockwork engraves in and runs.
      (tl, t, x) => {
        tl.addLabel("complete", t);
        draw(tl, t);
        tl.fromTo(x.rig.target, { x: 0, y: 0.6, z: 0 }, { ...CENTER, duration: 4, ease: EASE }, t);
        tl.fromTo(x.rig.offset, { x: 6, y: 1, z: 11 }, { ...wide, duration: 4, ease: EASE }, t);
        lab(tl, x, { laws: 1 }, t + 3.4);
        lab(tl, x, { events: 1 }, t + 4.2);
      },
      // 2 · No one to witness it: circle the whole and find no eye anywhere.
      (tl, t, x) => {
        tl.addLabel("unwitnessed", t);
        lab(tl, x, { laws: 0, events: 0 }, t);
        tl.to(st, { turn: 0.82, duration: 6, ease: "none" }, t);
        cam(tl, x, CENTER, V(-8 * k, 3, 7.5 * k), t, 3, "sine.inOut");
        lab(tl, x, { none: 1 }, t + 1.8);
        cam(tl, x, CENTER, V(3 * k, 6 * k, 10 * k), t + 3, 3, "sine.inOut");
        lab(tl, x, { none: 0, structure: 1 }, t + 4.6);
      },
      // 3 · The same universe, with one observer.
      (tl, t, x) => {
        tl.addLabel("witness", t);
        lab(tl, x, { none: 0, structure: 0 }, t);
        tl.to(st, { turn: 1, duration: 2.6, ease: "power2.out" }, t);
        cam(tl, x, home.clone().add(V(0, 0.32, 0)), close, t, 2.8, EASE);
        arrive(tl, t + 2.2);
        lab(tl, x, { witness: 1 }, t + 3.2);
      },
      // 4 · Reality: the same structure, lived from the inside.
      (tl, t, x) => {
        tl.addLabel("reality", t);
        lab(tl, x, { witness: 0 }, t);
        cam(tl, x, CENTER, V(2.5 * k, 3.8 * k, 11.5 * k), t, 3.2, EASE);
        lift(tl, t + 0.6);
        lab(tl, x, { reality: 1 }, t + 2.6);
        lab(tl, x, { witness: 1 }, t + 3.2);
      },
    ],
  };
}

export function closing(narrow = false): Built3D {
  const { c, st, at, home, update, draw, witness: arrive, lift } = base();
  const k = narrow ? 0.92 : 1;
  const labels: Label3D[] = [
    { id: "never", text: "COMPLETE, AND NEVER LIVED", at: at.sun, dx: 0, dy: -90 },
    { id: "witness", text: "A WITNESS", at: at.eye, dx: -90, dy: -50 },
    { id: "lived", text: "THE UNIVERSE, LIVED", at: at.sun, dx: 0, dy: -100 },
  ];
  return {
    scene: c.scene,
    kit: c.kit,
    labels,
    update,
    stops: [
      // 1 · Not for a purpose: the cosmos runs, whole, and no one lives it.
      (tl, t, x) => {
        tl.addLabel("unlived", t);
        draw(tl, t);
        tl.fromTo(x.rig.target, { ...CENTER }, { ...CENTER, duration: 4, ease: EASE }, t);
        tl.fromTo(
          x.rig.offset,
          { x: -9, y: 7, z: 12 },
          { x: -4 * k, y: 4.5 * k, z: 14 * k, duration: 4.4, ease: EASE },
          t
        );
        lab(tl, x, { never: 1 }, t + 3.6);
      },
      // 2 · We fill a role: one witness on one world.
      (tl, t, x) => {
        tl.addLabel("role", t);
        lab(tl, x, { never: 0 }, t);
        tl.to(st, { turn: 1, duration: 3.2, ease: "power2.out" }, t);
        cam(
          tl,
          x,
          home.clone().add(V(0, 0.32, 0)),
          narrow ? V(-0.6, 0.5, 2.4) : V(-1, 0.6, 2.8),
          t,
          3.2,
          EASE
        );
        arrive(tl, t + 2.6);
        lab(tl, x, { witness: 1 }, t + 3.6);
      },
      // 3 · Reality requires a witness: the cosmos lifts, and the camera draws far back.
      (tl, t, x) => {
        tl.addLabel("lived", t);
        lab(tl, x, { witness: 0 }, t);
        tl.to(st, { joy: 1, duration: 1.2, ease: "power2.inOut" }, t + 0.2);
        lift(tl, t + 1.2, 2.4);
        cam(tl, x, CENTER, V(6 * k, 6 * k, 15 * k), t + 1, 3.4, EASE);
        cam(tl, x, null, V(-2 * k, 5.5 * k, 17 * k), t + 4.4, 4, "sine.inOut");
        lab(tl, x, { lived: 1 }, t + 3.6);
      },
    ],
  };
}
