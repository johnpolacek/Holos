// Overview figure, Consciousness: one event seen from two sides. You stand beside a perfect
// physical copy, and the question is whether the copy is dark inside. Then a curved shell:
// from one side it is convex, from the other concave, one curve seen from two sides. Copy
// the outside and you have copied the inside, so the copy's aperture opens like yours. Last,
// you say you are conscious: the activity that makes the words is, from the inside, the
// experience you report. Stops tween only plain state.

import * as THREE from "three";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";

const YOU = V(-1.3, 0, 0);
const COPY = V(1.3, 0, 0);
const SHELL = V(0, 0, -4.6);

export function csTwoSides(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { copyOpen: 0, words: 0 };

  const plinth = (p: THREE.Vector3) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.2, 48), kit.surface(0.05));
    m.position.copy(p).setY(0.1);
    scene.add(m);
  };
  plinth(YOU);
  plinth(COPY);
  const you = makePerson(kit, 0.1);
  you.group.position.copy(YOU).setY(0.2);
  scene.add(you.group);
  const copy = makePerson(kit, 0.1);
  copy.group.position.copy(COPY).setY(0.2);
  scene.add(copy.group);

  // Apertures above each: yours open; the copy's in question, then open.
  const irisYou = makeIris(kit, 0.24);
  irisYou.group.position.copy(YOU).setY(2.55);
  scene.add(irisYou.group);
  const irisCopy = makeIris(kit, 0.24);
  irisCopy.group.position.copy(COPY).setY(2.55);
  irisCopy.setOpen(0);
  scene.add(irisCopy.group);
  const query = line(
    Array.from({ length: 49 }, (_, i) => {
      const a = (i / 48) * Math.PI * 2;
      return V(COPY.x + Math.cos(a) * 0.62, 2.55 + Math.sin(a) * 0.62, 0.02);
    }),
    kit.soft,
    true
  );
  scene.add(query);
  // A dimension line between them: identical, part for part.
  scene.add(
    segments(
      [
        V(YOU.x, 0.25, 1),
        V(COPY.x, 0.25, 1),
        V(YOU.x, 0.15, 1),
        V(YOU.x, 0.35, 1),
        V(COPY.x, 0.15, 1),
        V(COPY.x, 0.35, 1),
      ],
      kit.ink
    )
  );

  // The curved shell: half a cylinder, hatched on its shadowed face.
  const shell = new THREE.Group();
  const geo = new THREE.CylinderGeometry(1.6, 1.6, 2.6, 64, 1, true, -Math.PI / 2, Math.PI);
  const shellMesh = new THREE.Mesh(geo, kit.surface(0.05));
  shellMesh.position.y = 1.3;
  shell.add(shellMesh);
  for (const y of [0.01, 2.6]) {
    shell.add(
      line(
        Array.from({ length: 49 }, (_, i) => {
          const a = -Math.PI / 2 + (i / 48) * Math.PI;
          return V(Math.sin(a) * 1.6, y, Math.cos(a) * 1.6);
        }),
        kit.ink
      )
    );
  }
  shell.position.copy(SHELL);
  shell.visible = false;
  scene.add(shell);

  // Speech: short lines leaving your head.
  const speech = segments(
    [0.25, 0.45, 0.65].flatMap((r) => [
      V(YOU.x + 0.25 + r, 1.75 + r * 0.25, 0.1),
      V(YOU.x + 0.4 + r * 1.2, 1.85 + r * 0.35, 0.1),
    ]),
    kit.ink
  );
  speech.visible = false;
  scene.add(speech);

  const labels: Label3D[] = [
    { id: "you", text: "YOU", at: V(YOU.x, 0.2, 0.8), dx: -30, dy: 40 },
    { id: "copy", text: "A PERFECT PHYSICAL COPY", at: V(COPY.x, 0.2, 0.8), dx: 40, dy: 40 },
    { id: "dark", text: "DARK INSIDE?", at: V(COPY.x + 0.62, 2.55, 0), dx: 50, dy: -30 },
    {
      id: "convex",
      text: "CONVEX FROM HERE",
      at: V(SHELL.x + 0.9, 2, SHELL.z + 1.3),
      dx: 60,
      dy: -40,
    },
    {
      id: "concave",
      text: "CONCAVE FROM THERE",
      at: V(SHELL.x - 0.9, 2, SHELL.z + 1.3),
      dx: -60,
      dy: -40,
    },
    {
      id: "copied",
      text: "COPY THE OUTSIDE, COPY THE INSIDE",
      at: V(COPY.x, 2.85, 0),
      dx: 50,
      dy: -40,
    },
    {
      id: "words",
      text: "THE ACTIVITY THAT MAKES THE WORDS",
      at: V(YOU.x + 1.1, 2.1, 0.1),
      dx: 40,
      dy: -50,
    },
  ];
  const none = Object.fromEntries(labels.map((l) => [l.id, 0]));

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const pair = V(0, 1.3, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      irisCopy.setOpen(st.copyOpen);
      query.visible = st.copyOpen < 0.5;
      speech.visible = st.words > 0.5;
    },
    stops: [
      // 1 · The zombie: you and a perfect copy; is the copy dark inside?
      (tl, t, c) => {
        tl.addLabel("zombie", t);
        tl.fromTo(
          kit.clip,
          { constant: -2.6 },
          { constant: 2.6, duration: 1.6, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.7);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-0.6, 1.2, 0)) },
          { ...xyz(pair), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-1, 1, 5)) },
          { ...xyz(view(0.4, 1, 7)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { you: 1, copy: 1 }, t + 1.8);
        lab(tl, c, { dark: 1 }, t + 2.6);
      },
      // 2 · One curve, two sides: a shell, convex from one side, concave from the other.
      (tl, t, c) => {
        tl.addLabel("curve", t);
        lab(tl, c, { you: 0, copy: 0, dark: 0 }, t);
        show(tl, shell, t + 0.3, 0);
        cam(tl, c, V(SHELL.x, 1.3, SHELL.z), view(4.6, 2.2, 3.6), t, 2.2, EASE);
        lab(tl, c, { convex: 1 }, t + 1.8);
        cam(tl, c, null, view(-4.6, 2.2, -3.6), t + 2.6, 2.6, EASE);
        lab(tl, c, { convex: 0 }, t + 2.6);
        lab(tl, c, { concave: 1 }, t + 4.6);
      },
      // 3 · Copy the outside: back at the pair, the copy's aperture opens like yours.
      (tl, t, c) => {
        tl.addLabel("copied", t);
        lab(tl, c, { concave: 0 }, t);
        tl.set(shell, { visible: false }, t + 1.2);
        cam(tl, c, pair, view(0.4, 1, 7), t, 2.6, EASE);
        tl.fromTo(st, { copyOpen: 0 }, { copyOpen: 1, duration: 1, ease: "power2.out" }, t + 2.2);
        lab(tl, c, { copied: 1 }, t + 2.6);
      },
      // 4 · Not along for the ride: you speak, and the speaking is the experience reported.
      (tl, t, c) => {
        tl.addLabel("words", t);
        lab(tl, c, none, t);
        cam(tl, c, V(YOU.x + 0.7, 1.7, 0), view(0.8, 0.6, 5.8), t, 2.4, EASE);
        tl.set(st, { words: 1 }, t + 1);
        lab(tl, c, { words: 1 }, t + 1.6);
      },
    ],
  };
}
