// The tour storyboard (wiki/storyboard.md) as data for the /lab/tour animatic.
// Narration must match the storyboard; sketches are rough placeholders.

export type SketchItem = {
  p: string;
  x: number;
  y: number;
  s?: number;
  label?: string;
  // Primitive options, read by the sketch renderer.
  o?: Record<string, string | number | boolean>;
};

export type Stop = {
  title: string;
  narration: string;
  shows: string;
  // Flat placeholder; chapters with a 3D scene ignore it.
  sketch?: SketchItem[];
  status?: string;
};

export type Chapter = {
  id: string;
  numeral: string;
  title: string;
  name: string;
  status: string;
  stops: Stop[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "introduction",
    numeral: "I",
    title: "Introduction",
    name: "Every Branch",
    status: "The starting distinction",
    stops: [
      {
        title: "Every branch",
        shows:
          "A 3D tree engraves upward from one root: the one quantum state splitting into branches. Label: C, CREATION.",
        narration:
          "Physics describes a universe that branches: every outcome a quantum event allows happens, each in its own branch. This is Creation: everything physics produces.",
      },
      {
        title: "No one home",
        shows: "The camera travels out along an empty branch.",
        narration:
          "Most branches are complete as physics describes them, yet no one is there. Nothing in them is lived.",
      },
      {
        title: "An observer",
        shows:
          "An iris appears partway along one branch, never at a fork. Nothing else in the tree changes. Label: O, OBSERVATION.",
        narration:
          "Where a branch holds an observer, its world is also taken in from the inside. This is Observation. It selects nothing and changes nothing it takes in.",
      },
      {
        title: "The shorthand",
        shows: "Caption: R = C ⊛ O.",
        narration:
          "Holos writes this as R = C ⊛ O: possibility, then registration. It is an order of logic, not of time.",
      },
      {
        title: "Many observers",
        shows:
          "Pull back: irises on a few branches, most branches empty. Labels: OBSERVERS; REAL AS PATTERN, NEVER LIVED.",
        narration:
          "Lived reality is the family of these perspectives, one per observer per branch. The rest stays real as pattern, never lived.",
      },
      {
        title: "Two additions",
        shows:
          "A small Φ gauge beside the first observer; then the camera pulls back to the whole tree. Labels: THE THRESHOLD; OMEGA, THE WHOLE.",
        narration:
          "Holos adds two things to physics: a threshold, where a point of view forms, and Omega, the whole of reality. The tour takes them in turn.",
      },
    ],
  },
  {
    id: "consciousness",
    numeral: "II",
    title: "Consciousness",
    name: "The Aperture",
    status: "First addition · testable (Test A)",
    stops: [
      {
        title: "No point of view",
        shows:
          "A rock, a river, a thermostat, then a busy network of separate processes. Gauge near zero.",
        narration:
          "A rock has no point of view. Neither does a system that only processes information, however busy. Computing is not integration.",
        sketch: [
          { p: "objects", x: 260, y: 250, s: 1.3 },
          { p: "network", x: 580, y: 250, s: 1.4, label: "SEPARATE PROCESSES" },
          { p: "gauge", x: 830, y: 250, s: 1, o: { v: 0.08 } },
        ],
      },
      {
        title: "Four requirements",
        shows:
          "Links tighten into one loop. Four labels engrave: integration, differentiation, temporal cohesion, aboutness (a small model inside the network, with leaders to an object outside it).",
        narration:
          "Holos names four requirements: the parts act as one, the whole can be in many states, it holds together over time, and its states carry a model of something beyond itself.",
        sketch: [{ p: "network", x: 480, y: 250, s: 2, o: { joined: true, reqs: true } }],
      },
      {
        title: "Twilight",
        shows:
          "The needle enters the hatched band. The iris is ghosted: present in outline, neither open nor closed.",
        narration:
          "Near the threshold lies a narrow twilight with no exact fact of the matter, the way no single second marks the end of dusk.",
        sketch: [
          { p: "gauge", x: 340, y: 250, s: 1.8, o: { v: 0.6 }, label: "TWILIGHT" },
          { p: "iris", x: 680, y: 240, s: 2.2, o: { state: "ghost" } },
        ],
      },
      {
        title: "An aperture",
        shows: "The needle passes Φ_c. The iris opens. Nothing enters it.",
        narration:
          "Past the threshold, the system is an observer: a local aperture through which the whole registers itself as experience.",
        sketch: [
          { p: "gauge", x: 340, y: 250, s: 1.8, o: { v: 0.8 } },
          { p: "iris", x: 680, y: 240, s: 2.2, o: { state: "open" }, label: "AN APERTURE" },
        ],
      },
      {
        title: "A steep onset",
        status: "A hypothesis",
        shows:
          "The iron bar: arrows scattered, then lining up as it cools. Two small curves: steep for a large block, gradual for a tiny grain.",
        narration:
          "Cool iron past its Curie point and its tiny magnets line up. The transition hypothesis expects a steep onset for experience too, steepest in the largest integrated systems.",
        sketch: [
          { p: "magnet", x: 320, y: 250, s: 1.5, label: "IRON, COOLING" },
          {
            p: "plot",
            x: 700,
            y: 250,
            s: 1.5,
            o: { kind: "curie" },
            label: "LARGE BLOCK · TINY GRAIN",
          },
        ],
      },
      {
        title: "Dial, not switch",
        shows:
          "The iris widens and narrows (richness). Then every node pulses in one rhythm: links stay, the iris narrows.",
        narration:
          "Past the threshold, richness is graded: a drowsy person is dimmer, not switched off. And unlike a magnet, a brain can overshoot: a seizure locks every part into one rhythm and loses the variety experience needs.",
        sketch: [
          { p: "iris", x: 230, y: 240, s: 1.4, o: { state: "wide" }, label: "RICH" },
          { p: "iris", x: 430, y: 240, s: 1.4, o: { state: "open" }, label: "DROWSY" },
          {
            p: "network",
            x: 720,
            y: 240,
            s: 1.3,
            o: { joined: true, locked: true },
            label: "ONE RHYTHM",
          },
        ],
      },
      {
        title: "Two sides",
        status: "A side taken on mind",
        shows:
          "One engraved curve, labeled OUTSIDE: PHYSICAL ACTIVITY on its convex side and INSIDE: EXPERIENCE on its concave side.",
        narration:
          "Seen from outside, it is physical activity; lived from inside, it is experience. One event with two sides, like one curve that is convex from one side and concave from the other.",
        sketch: [{ p: "curve", x: 500, y: 250, s: 2.2 }],
      },
    ],
  },
  {
    id: "spacetime",
    numeral: "III",
    title: "Spacetime",
    name: "The Lit Cone",
    status: "Physics, as it stands",
    stops: [
      {
        title: "One speed",
        shows:
          "Two observers moving differently; their space and time axes tilt against each other while the 45° light line stays put.",
        narration:
          "The speed of light is the same for every observer, however they move. That one fact ties space and time into a single geometry.",
        sketch: [{ p: "frames", x: 500, y: 250, s: 2 }],
      },
      {
        title: "The block",
        shows:
          "Their “now” slices disagree. Camera pulls back to the whole block, Big Bang at the bottom edge.",
        narration:
          "Observers moving differently disagree about what happens at the same time. That motivates the block universe: every moment part of one four-dimensional whole.",
        sketch: [{ p: "block", x: 500, y: 250, s: 2, o: { slices: true }, label: "BIG BANG" }],
      },
      {
        title: "Lit",
        status: "Holos’s terms for physics",
        shows:
          "One world line with its past light cone, already engraved with the block. Arrows along the cone point in toward the observer. Leader: STARLIGHT.",
        narration:
          "Lit is everything in an observer's causal past: every place from which light, or any signal, could have reached it. Starlight from a distant galaxy puts that galaxy in yours.",
        sketch: [
          { p: "block", x: 500, y: 250, s: 2, o: { cone: true, arrows: true }, label: "LIT" },
        ],
      },
      {
        title: "Lived",
        status: "Holos’s terms for physics",
        shows:
          "Iris marks along the world line only. The cone's base near the Big Bang is lit (full ink) but carries no iris.",
        narration:
          "Lived is narrower: experience occurs inside observers and nowhere else. The early universe is lit, but no one lived through it.",
        sketch: [
          {
            p: "block",
            x: 500,
            y: 250,
            s: 2,
            o: { cone: true, lived: true },
            label: "LIVED: THE WORLD LINE ONLY",
          },
        ],
      },
      {
        title: "Unlit",
        status: "Holos’s terms for physics",
        shows:
          "Everything outside the cone in soft ink. Beside it, a second small block (another branch) with no observer, entirely soft ink.",
        narration:
          "Outside every observer's causal past lies unlit structure: real as pattern, never part of any observer's world. Some branches never form an observer at all.",
        sketch: [
          {
            p: "block",
            x: 400,
            y: 250,
            s: 1.9,
            o: { cone: true, softOutside: true },
            label: "UNLIT OUTSIDE THE CONE",
          },
          {
            p: "block",
            x: 780,
            y: 270,
            s: 1,
            o: { soft: true },
            label: "A BRANCH WITH NO OBSERVER",
          },
        ],
      },
      {
        title: "Witnessing",
        status: "Holos’s terms for physics",
        shows: "Denser hatching inside the cone along traces: STARLIGHT, CMB, FOSSIL RECORD.",
        narration:
          "Being lit is all or nothing, a fact about how the block is arranged, not an event. Witnessing is graded: how much of the lit region an observer's experience is actually about.",
        sketch: [
          {
            p: "block",
            x: 500,
            y: 250,
            s: 2,
            o: { cone: true, witness: true },
            label: "STARLIGHT · CMB · FOSSIL RECORD",
          },
        ],
      },
      {
        title: "A side plate",
        shows:
          "An inset of the eraser table, with an “open plate” button into the existing six-stop eraser scene.",
        narration:
          "Quantum experiments seem to reach back in time. The delayed-choice eraser shows they do not. Open the side plate to see why.",
        sketch: [
          { p: "block", x: 300, y: 250, s: 1.3, o: { cone: true } },
          { p: "eraser", x: 680, y: 250, s: 1.8, label: "SIDE PLATE: THE QUANTUM ERASER" },
        ],
      },
    ],
  },
  {
    id: "infinity",
    numeral: "IV",
    title: "Infinity",
    name: "Where Descriptions Close",
    status: "Physics, as it stands",
    stops: [
      {
        title: "A warning",
        shows:
          "An oven and a plot: the classical curve climbing off the chart, Planck's curve turning over.",
        narration:
          "Around 1900, physics predicted a hot oven would pour out infinite energy. Nothing does. The infinity was a warning about the theory, not a feature of the world.",
        sketch: [
          { p: "oven", x: 300, y: 250, s: 1.5, label: "OVEN" },
          { p: "plot", x: 660, y: 250, s: 1.7, o: { kind: "uv" }, label: "CLASSICAL · PLANCK" },
        ],
      },
      {
        title: "One point",
        shows:
          "Parallel rails running to one horizon point; an endless grid wraps onto a sphere with one point added.",
        narration:
          "In projective geometry, parallel lines meet at a single point at infinity: something endless, captured by adding one point to a closed picture.",
        sketch: [
          { p: "rails", x: 330, y: 250, s: 1.7, label: "THE POINT AT INFINITY" },
          { p: "sphere", x: 700, y: 240, s: 1.4, o: { grid: true }, label: "ONE POINT CLOSES IT" },
        ],
      },
      {
        title: "Flatland",
        status: "Proposition IV · Closure",
        shows:
          "Camera at the plane's level: a dot grows into a circle, shrinks, vanishes. Caption: AN IMAGE, NOT A CLAIM ABOUT SPACE.",
        narration:
          "In Flatland, a sphere passing through a flat world looks, to flat beings, like a dot that grows into a circle, shrinks, and vanishes: an event in time.",
        sketch: [
          { p: "flatland", x: 500, y: 250, s: 2.2, label: "AN IMAGE, NOT A CLAIM ABOUT SPACE" },
        ],
      },
      {
        title: "All at once",
        status: "Proposition IV · Closure",
        shows: "The camera tilts to see the one sphere.",
        narration:
          "Seen from three dimensions, it is one sphere, all at once. Holos calls this closure: each higher description holds whole what the one below sees as endless or unfolding.",
        sketch: [{ p: "sphere", x: 500, y: 240, s: 2.2, o: { plane: true }, label: "ONE SPHERE" }],
      },
      {
        title: "Nothing outside",
        status: "Proposition IV · Closure",
        shows:
          "The camera pulls back from a whole history drawn as one shape; the plate's frame rules fade.",
        narration:
          "Closure is not a path to anywhere. It ends at Omega, the description with nothing outside it.",
        sketch: [{ p: "tube", x: 500, y: 250, s: 2, label: "A WHOLE HISTORY, ONE SHAPE" }],
      },
      {
        title: "Weights, not counts",
        status: "A side taken on physics",
        shows:
          "A branch point splits into two ribbons, widths 70 and 30. Tiny figures along them multiply without end as the cut gets finer.",
        narration:
          "Counting observers across branches gives no fixed answer: cut finer and the count grows without end. Instead each branch carries a weight physics supplies, and the weights give the odds.",
        sketch: [{ p: "ribbons", x: 500, y: 250, s: 2.2 }],
      },
    ],
  },
  {
    id: "omega-point",
    numeral: "V",
    title: "Omega",
    name: "One Whole, Many Apertures",
    status: "Second addition · philosophical, not testable",
    stops: [
      {
        title: "The whole",
        shows:
          "Pull back until every branch is one object; the frame rules fade so no outside remains.",
        narration:
          "Omega is the whole of reality. Physically it is nothing mysterious: the universal quantum state, which on the no-collapse reading includes every branch.",
        sketch: [{ p: "whole", x: 500, y: 260, s: 2.2, label: "THE UNIVERSAL QUANTUM STATE" }],
      },
      {
        title: "Apertures",
        shows: "Irises in several branches, each the same engraved mark.",
        narration:
          "On the monist reading, the whole is also the one experiencer, and every observer is an aperture of it. When a system crosses the threshold, no new experiencer appears; the one experiencer wakes there.",
        sketch: [{ p: "whole", x: 500, y: 260, s: 2.2, o: { irises: true }, label: "APERTURES" }],
      },
      {
        title: "The walls",
        shows: "Hatched partitions between the irises.",
        narration:
          "The apertures are walled off from one another. The walls keep you from feeling a stranger's pain, not from being the one who will. That is the view's price, and its point.",
        sketch: [
          { p: "iris", x: 250, y: 240, s: 1.4, o: { state: "open" } },
          { p: "wall", x: 375, y: 240, s: 1.4 },
          { p: "iris", x: 500, y: 240, s: 1.4, o: { state: "open" } },
          { p: "wall", x: 625, y: 240, s: 1.4 },
          { p: "iris", x: 750, y: 240, s: 1.4, o: { state: "open" } },
          { p: "tag", x: 500, y: 400, o: { text: "WALLED OFF", bare: true } },
        ],
      },
      {
        title: "Two puzzles",
        shows: "One figure with an iris; a copier; two copies, each with an iris.",
        narration:
          "Why is this one person me? On the monist reading, there is nothing to explain. Copy someone twice and both are them. Rival views answer these puzzles too; this is one answer among them.",
        sketch: [{ p: "copier", x: 500, y: 250, s: 2 }],
      },
      {
        title: "Not all lived",
        shows: "Zoom across the object: most of it soft ink, parts unconnected.",
        narration:
          "Omega is the ultimate whole, not the ultimate integration: its parts are not all joined, and structure outside every aperture's causal past is never lived.",
        sketch: [
          {
            p: "whole",
            x: 500,
            y: 260,
            s: 2.2,
            o: { irises: true, mostlySoft: true },
            label: "MOSTLY UNLIT",
          },
        ],
      },
      {
        title: "No outside",
        shows:
          "The camera circles; there is no center anywhere. Labels engrave around the object: GOD · BRAHMAN · THE WHOLE.",
        narration:
          "Omega does not intervene or direct history; there is no outside for it to stand in. Whether it is called God, Brahman, or the whole changes nothing about the claim.",
        sketch: [
          { p: "whole", x: 500, y: 260, s: 2.2, o: { irises: true, mostlySoft: true } },
          { p: "tag", x: 250, y: 120, o: { text: "GOD", bare: true } },
          { p: "tag", x: 500, y: 90, o: { text: "BRAHMAN", bare: true } },
          { p: "tag", x: 750, y: 120, o: { text: "THE WHOLE", bare: true } },
        ],
      },
    ],
  },
  {
    id: "aliens",
    numeral: "VI",
    title: "Aliens",
    name: "Going Quiet",
    status: "Companion idea · separate from the core",
    stops: [
      {
        title: "Silence",
        shows: "The galaxy; a radio dish on Earth; nothing arriving.",
        narration: "The galaxy is vast and old, yet we detect no one. This is the Fermi paradox.",
        sketch: [
          { p: "galaxy", x: 400, y: 250, s: 2 },
          { p: "dish", x: 800, y: 270, s: 1.3, label: "LISTENING" },
        ],
      },
      {
        title: "Loud and brief",
        shows: "A young civilization: an expanding radio shell, sprawling structures.",
        narration:
          "Young civilizations are loud: radio, reshaped worlds, early spaceflight. On cosmic timescales, that phase is brief.",
        sketch: [
          { p: "galaxy", x: 500, y: 250, s: 2.2, o: { shell: true }, label: "A RADIO SHELL" },
        ],
      },
      {
        title: "Going Quiet",
        shows:
          "The sprawl contracts into a compact node; the shell fades. Inset: circuit layers stacking.",
        narration:
          "The Integration Hypothesis: advancement favors compact, efficient structure, the way circuit boards stack layers to shorten paths. Going quiet is not hiding; efficiency pays.",
        sketch: [
          { p: "node", x: 360, y: 250, s: 1.8, label: "COMPACT NODE" },
          { p: "layers", x: 680, y: 250, s: 1.6, label: "STACKED LAYERS" },
        ],
      },
      {
        title: "Distance breaks control",
        shows:
          "A colony ten light-years out; a signal crawls between; the link line breaks and the colony becomes its own node.",
        narration:
          "Light-speed delay breaks control. A colony ten light-years away cannot be steered from home, so it becomes a civilization of its own.",
        sketch: [{ p: "colony", x: 500, y: 250, s: 2, label: "TEN LIGHT-YEARS" }],
      },
      {
        title: "It only takes one",
        shows:
          "Two settlement trees: one founding more than one settlement each and exploding (THE BET FAILS), one fizzling after a few hops.",
        narration:
          "The strongest objection: it only takes one. The hypothesis bets each settlement founds fewer than one more before turning inward. That is a bet about motives, not physics.",
        sketch: [
          { p: "tree", x: 300, y: 250, s: 1.6, o: { explode: true }, label: "THE BET FAILS" },
          { p: "tree", x: 700, y: 250, s: 1.6, label: "THE BET HOLDS" },
        ],
      },
      {
        title: "Explored, not settled",
        shows: "A small dark probe in orbit near a star, drawn like a trail camera.",
        narration:
          "Being explored is not being settled. A small, dark watcher is as easy to miss as a trail camera in the woods.",
        sketch: [{ p: "probe", x: 500, y: 250, s: 2, label: "A WATCHER" }],
      },
      {
        title: "Where to look",
        shows: "One star: dim in a visible-light plot, bright in an infrared plot.",
        narration:
          "So look for single stars glowing unusually warm in the infrared. Of seven candidates flagged in 2024, two turned out to be background galaxies; the rest are unexplained.",
        sketch: [
          { p: "plot", x: 330, y: 250, s: 1.5, o: { kind: "visible" }, label: "VISIBLE: DIM" },
          { p: "plot", x: 670, y: 250, s: 1.5, o: { kind: "ir" }, label: "INFRARED: WARM" },
        ],
      },
    ],
  },
  {
    id: "the-teeming-dark",
    numeral: "VII",
    title: "The Teeming Dark",
    name: "Silent, but Warm",
    status: "Thought experiment · companion idea",
    stops: [
      {
        title: "The Eerie Silence",
        shows: "The dish listening to static.",
        narration:
          "Paul Davies called it the Eerie Silence. Could silence and an abundance of life coexist? That possibility is the Teeming Dark.",
        sketch: [{ p: "dish", x: 500, y: 250, s: 2.2, o: { static: true }, label: "STATIC" }],
      },
      {
        title: "Not dark matter",
        shows:
          "A dark-matter halo around a galaxy, then a timeline: CMB at 380,000 years, first stars hundreds of millions of years later. The halo is struck through.",
        narration:
          "A tempting version hides mature life inside dark matter. The universe's records rule it out: dark matter was already there, in full, before any star formed, and there were never enough atoms to build it.",
        sketch: [
          {
            p: "galaxy",
            x: 300,
            y: 240,
            s: 1.4,
            o: { halo: true, struck: true },
            label: "DARK MATTER",
          },
          { p: "timeline", x: 700, y: 250, s: 1.6 },
        ],
      },
      {
        title: "The books balance",
        shows: "A balance scale: ordinary matter, nearly level, a small gap on one pan.",
        narration:
          "Mature life would be built from ordinary matter, and those books are nearly balanced. Built structures must fit inside a small and shrinking gap.",
        sketch: [{ p: "scale", x: 500, y: 250, s: 2, label: "ORDINARY MATTER" }],
      },
      {
        title: "The hunt",
        shows:
          "A star field; one star brightens briefly as a dark mass passes; a light curve with one bump.",
        narration:
          "Astronomers have watched millions of stars for the flicker a passing dark mass causes, and found too few for a large hidden population. At most, a trace population.",
        sketch: [
          { p: "stars", x: 300, y: 250, s: 1.5 },
          { p: "plot", x: 680, y: 250, s: 1.6, o: { kind: "lightcurve" }, label: "ONE FLICKER" },
        ],
      },
      {
        title: "Heat must go somewhere",
        shows:
          "A compact computer beside a vast cold radiator. Dimension line: about 100,000,000× the area.",
        narration:
          "Any long-running computer must shed heat. Shedding it near the sky's own cold takes enormous surfaces, and the Integration Hypothesis bets mature civilizations avoid that sprawl.",
        sketch: [{ p: "radiator", x: 500, y: 250, s: 2 }],
      },
      {
        title: "A Dark Node",
        shows: "One compact mass, dark in visible light, faint infrared stipple.",
        narration:
          "What remains: a compact mass, dark in visible light, with a faint infrared excess. Silent, but warm. Holos calls it a Dark Node: ordinary matter that has stopped shining.",
        sketch: [{ p: "node", x: 500, y: 240, s: 2.4, o: { warm: true }, label: "DARK NODE" }],
      },
      {
        title: "Honest limits",
        shows:
          "The same blob with three labels: BROWN DWARF? ROGUE PLANET? COOLED REMNANT? Then a sleeping node, nearly invisible.",
        narration:
          "This is a search channel, not a fingerprint: brown dwarfs and rogue planets look the same. And a civilization that mostly sleeps would emit almost nothing.",
        sketch: [
          { p: "node", x: 380, y: 240, s: 1.8, o: { warm: true } },
          { p: "tag", x: 650, y: 170, o: { text: "BROWN DWARF?" } },
          { p: "tag", x: 650, y: 240, o: { text: "ROGUE PLANET?" } },
          { p: "tag", x: 650, y: 310, o: { text: "COOLED REMNANT?" } },
        ],
      },
    ],
  },
  {
    id: "why",
    numeral: "VIII",
    title: "Why Are We Here?",
    name: "Where the Whole Is Lived",
    status: "What follows from the core",
    stops: [
      {
        title: "Complete, unlived",
        shows: "The left block, fully drawn, all soft ink, no observers.",
        narration:
          "A lawful universe with no observers still exists, complete as physics describes it. What it lacks is not existence but presence: nothing in it is lived.",
        sketch: [{ p: "block", x: 330, y: 250, s: 1.8, o: { soft: true }, label: "NO OBSERVERS" }],
      },
      {
        title: "Lived",
        shows:
          "The right block engraves line for line the same, but holds one observer and its lit cone. A dimension line between the blocks: IDENTICAL.",
        narration:
          "Life is how a universe comes to be lived. Observers do not cause the universe; without them, it is simply never lived.",
        sketch: [
          { p: "block", x: 330, y: 250, s: 1.8, o: { soft: true }, label: "NO OBSERVERS" },
          {
            p: "block",
            x: 670,
            y: 250,
            s: 1.8,
            o: { cone: true, softOutside: true, lived: true },
            label: "ONE OBSERVER",
          },
          { p: "dim", x: 500, y: 95, s: 1, o: { text: "IDENTICAL" } },
        ],
      },
      {
        title: "A role",
        shows: "Two irises with a wall between them.",
        narration:
          "This is a role, not yet a meaning. Through Omega it says one thing about value: a stranger's pain is not, at bottom, someone else's.",
        sketch: [
          { p: "iris", x: 360, y: 240, s: 1.6, o: { state: "open" } },
          { p: "wall", x: 500, y: 240, s: 1.6 },
          { p: "iris", x: 640, y: 240, s: 1.6, o: { state: "open" } },
        ],
      },
      {
        title: "Hints of oneness",
        status: "Speculation",
        shows:
          "An entangled pair drawn inside one outline, far apart, with nothing traveling between. A light ray from star to eye with a dimension line: INTERVAL = 0.",
        narration:
          "Physics already describes entangled particles as one shared state, and a light ray's separation through spacetime as exactly zero.",
        sketch: [
          { p: "entangled", x: 500, y: 170, s: 1.8, label: "ONE SHARED STATE" },
          { p: "ray", x: 500, y: 350, s: 1.8 },
        ],
      },
      {
        title: "The walls",
        status: "Speculation",
        shows: "Pull back: one whole, apertures walled off.",
        narration:
          "Holos reads this boldly: separation is not fundamental. Distance, duration, and individuality are not illusions; they are the walls that make local experience possible.",
        sketch: [
          {
            p: "whole",
            x: 500,
            y: 260,
            s: 2.2,
            o: { irises: true, walls: true },
            label: "ONE WHOLE, WALLED APERTURES",
          },
        ],
      },
      {
        title: "Why we are here",
        shows: "Slow push into one iris.",
        narration:
          "So why are we here? Not for a purpose the universe needed, but because we are one of the places where the whole is lived.",
        sketch: [{ p: "iris", x: 500, y: 240, s: 3.2, o: { state: "open" } }],
      },
    ],
  },
];

// Seconds a stop waits before continuing on its own, matching the eraser scene.
export function readingTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.min(Math.max(3 + words * 0.17, 6), 12);
}
