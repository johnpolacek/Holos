export interface CitationItem {
  name: string;
  url: string;
  description: string;
}

export interface CitationSubsection {
  number: number;
  id: string;
  title: string;
  items: CitationItem[];
}

export interface CitationMainSection {
  id: string;
  title: string;
  subsections: CitationSubsection[];
}

/** Flatten all subsections in order to get number → anchor id (for FootnoteLink and deep links). */
function buildNumberToIdMap(mainSections: CitationMainSection[]): Record<number, string> {
  const map: Record<number, string> = {};
  for (const main of mainSections) {
    for (const sub of main.subsections) {
      map[sub.number] = sub.id;
    }
  }
  return map;
}

export const citationMainSections: CitationMainSection[] = [
  {
    id: "overview",
    title: "Overview",
    subsections: [
      {
        number: 1,
        id: "footer-life",
        title: "The Meaning of Life",
        items: [
          {
            name: "Observer Effect",
            url: "https://en.wikipedia.org/wiki/Observer_effect_(physics)",
            description: "The disturbance of an observed system by the act of observation.",
          },
          {
            name: "Copenhagen Interpretation",
            url: "https://en.wikipedia.org/wiki/Copenhagen_interpretation",
            description:
              "The act of observation collapses a quantum system's wavefunction into a definite state.",
          },
          {
            name: "Quantum Darwinism",
            url: "https://en.wikipedia.org/wiki/Quantum_Darwinism",
            description:
              "An environment selectively proliferates certain quantum states that become classical outcomes, observed by multiple observers.",
          },
          {
            name: "Relational Quantum Mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "The properties of quantum systems are not absolute but relative to the observer.",
          },
          {
            name: "Participatory Anthropic Principle",
            url: "https://en.wikipedia.org/wiki/Anthropic_principle",
            description:
              'The universe, as a condition of its existence, must be observed. As a "self-excited circuit", the universe requires one or more observers to bring its laws into existence.',
          },
          {
            name: "Biocentrism",
            url: "https://en.wikipedia.org/wiki/Biocentrism_(ethics)",
            description:
              "The philosophical perspective that biology is not a byproduct of the universe, but the force that organizes it. Life and consciousness are central to understanding the nature of reality.",
          },
          {
            name: "Von Neumann-Wigner Interpretation",
            url: "https://en.wikipedia.org/wiki/Von_Neumann%E2%80%93Wigner_interpretation",
            description:
              "An interpretation of quantum mechanics in which consciousness is formulated as a necessary process for the quantum measurement process.",
          },
        ],
      },
      {
        number: 2,
        id: "footer-consciousness",
        title: "Consciousness",
        items: [
          {
            name: "Integrated Information Theory",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Consciousness corresponds to the capacity of a system to integrate information.",
          },
          {
            name: "Panpsychism",
            url: "https://en.wikipedia.org/wiki/Panpsychism",
            description: "Consciousness is a fundamental property of all matter.",
          },
          {
            name: "Global Workspace Theory",
            url: "https://en.wikipedia.org/wiki/Global_workspace_theory",
            description:
              "Consciousness involves broadcasting information globally in the brain to create a unified experience.",
          },
        ],
      },
      {
        number: 3,
        id: "footer-universe",
        title: "Our Universe",
        items: [
          {
            name: "The Big Bang",
            url: "https://en.wikipedia.org/wiki/Big_Bang",
            description:
              "The present universe emerged from an ultra-dense and high-temperature initial state.",
          },
          {
            name: "Accelerating Expansion of the Universe",
            url: "https://en.wikipedia.org/wiki/Accelerating_expansion_of_the_universe",
            description: "The expansion of the universe is accelerating with time.",
          },
          {
            name: "Spacetime",
            url: "https://en.wikipedia.org/wiki/Spacetime",
            description:
              "A mathematical model that fuses the three dimensions of space and the one dimension of time.",
          },
          {
            name: "General Relativity",
            url: "https://en.wikipedia.org/wiki/General_relativity",
            description: "Describes gravity as the warping of spacetime by mass and energy.",
          },
        ],
      },
      {
        number: 4,
        id: "footer-spacetime",
        title: "Spacetime",
        items: [
          {
            name: "Eternalism",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)",
            description:
              "Time as an unchanging four-dimensional block where all moments exist simultaneously.",
          },
          {
            name: "Block Universe Model",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe",
            description:
              "The view that the universe is a four-dimensional block where past, present, and future all exist simultaneously. All events are fixed in spacetime, and the flow of time is an illusion of consciousness moving through this static structure.",
          },
          {
            name: "Relativity of Simultaneity",
            url: "https://en.wikipedia.org/wiki/Relativity_of_simultaneity",
            description:
              "Whether two spatially separated events occur at the same time depends on the observer.",
          },
          {
            name: "The Absorber Theory",
            url: "https://en.wikipedia.org/wiki/Wheeler%E2%80%93Feynman_absorber_theory",
            description:
              "Radiation is a result of both forward-in-time and backward-in-time electromagnetic waves.",
          },
          {
            name: "Spacetime Interval",
            url: "https://en.wikipedia.org/wiki/Spacetime#Spacetime_interval",
            description:
              "The invariant measure of distance between two events in spacetime. For light, this interval is zero, meaning emission and absorption occur at the same point.",
          },
          {
            name: "Null Interval",
            url: "https://en.wikipedia.org/wiki/Spacetime#Spacetime_interval",
            description:
              "A spacetime interval of zero length, which occurs for light rays. In this case, the emission and absorption of a photon occur at the same spacetime point from a higher-dimensional perspective.",
          },
          {
            name: "Light Cone",
            url: "https://en.wikipedia.org/wiki/Light_cone",
            description:
              "The boundary of all possible paths that light can take from a given event, defining the causal structure of spacetime.",
          },
          {
            name: "Null Geodesic",
            url: "https://en.wikipedia.org/wiki/Geodesic",
            description:
              "The path that light follows through spacetime. For photons, this is a static geometric structure that permanently connects emission and absorption points, appearing as motion only from our temporal perspective.",
          },
          {
            name: "Retrocausality",
            url: "https://en.wikipedia.org/wiki/Retrocausality",
            description:
              "The concept that future events can influence past events. Experiments like the Quantum Eraser suggest that choices made in the present can resolve the quantum state of the past, supporting the block universe model.",
          },
          {
            name: "Quantum Eraser Experiment",
            url: "https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser",
            description:
              "Demonstrates that the measurement of a particle's path is correlated with its behavior in the past, supporting the view of spacetime as a unified, pre-existing whole rather than a linear sequence.",
          },
        ],
      },
      {
        number: 5,
        id: "footer-dimensions",
        title: "Higher Dimensions",
        items: [
          {
            name: "Flatland",
            url: "https://en.wikipedia.org/wiki/Flatland",
            description:
              "Satirical novella about a fictional two-dimensional world that explores the concept of inter-dimensional observation.",
          },
          {
            name: "String Theory",
            url: "https://en.wikipedia.org/wiki/String_theory",
            description:
              "Fundamental particles of the universe are tiny strings that vibrate in extra dimensions.",
          },
          {
            name: "Quantum Gravity",
            url: "https://en.wikipedia.org/wiki/Quantum_gravity",
            description:
              "Gravity and the other fundamental forces are unified within a multi-dimensional framework.",
          },
          {
            name: "Brane Cosmology",
            url: "https://en.wikipedia.org/wiki/Brane_cosmology",
            description: "Our universe is a slice of a larger, multi-dimensional reality",
          },
          {
            name: "Kaluza-Klein Theory",
            url: "https://en.wikipedia.org/wiki/Kaluza%E2%80%93Klein_theory",
            description:
              "A unified field theory that extends general relativity to higher dimensions, showing how electromagnetism and gravity emerge from a single higher-dimensional geometry.",
          },
          {
            name: "Projective Geometry",
            url: "https://en.wikipedia.org/wiki/Projective_geometry",
            description:
              "A branch of geometry that studies properties invariant under projective transformations, where parallel lines meet at infinity.",
          },
        ],
      },
      {
        number: 6,
        id: "footer-infinity",
        title: "Infinity",
        items: [
          {
            name: "Riemann Sphere",
            url: "https://en.wikipedia.org/wiki/Riemann_sphere",
            description:
              "Exemplifies how higher-dimensional perspectives transform infinite structures into finite, observable entities.",
          },
          {
            name: "Fractals",
            url: "https://en.wikipedia.org/wiki/Fractal",
            description:
              "Mathematical sets that can represent infinite complexity within finite boundaries.",
          },
          {
            name: "AdS/CFT Correspondence",
            url: "https://en.wikipedia.org/wiki/AdS/CFT_correspondence",
            description:
              "Higher-dimensional information is encoded into a finite, observable form within lower dimensions.",
          },
          {
            name: "Infinite Sets",
            url: "https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument",
            description:
              "Provide a foundation for understanding how infinities can be compared, ordered, and wrapped.",
          },
          {
            name: "Cellular Automata",
            url: "https://en.wikipedia.org/wiki/Cellular_automaton",
            description:
              "Complex, infinite patterns and behaviors can emerge from simple initial conditions and rules.",
          },
          {
            name: "Point at Infinity",
            url: "https://en.wikipedia.org/wiki/Point_at_infinity",
            description:
              "In projective geometry, the point where parallel lines converge, representing the boundary where infinite space folds into a finite structure.",
          },
        ],
      },
      {
        number: 7,
        id: "footer-blackholes",
        title: "Black Holes",
        items: [
          {
            name: "Black Hole Thermodynamics",
            url: "https://en.wikipedia.org/wiki/Black_hole_thermodynamics",
            description: "The study of the physical properties of black holes.",
          },
          {
            name: "Event Horizon",
            url: "https://en.wikipedia.org/wiki/Event_horizon",
            description:
              "The boundary around a black hole beyond which nothing, not even light, can escape.",
          },
          {
            name: "Cosmic Censorship Hypothesis",
            url: "https://en.wikipedia.org/wiki/Cosmic_censorship_hypothesis",
            description: "Singularities are always hidden within event horizons.",
          },
          {
            name: "Loop Quantum Gravity",
            url: "https://en.wikipedia.org/wiki/Loop_quantum_gravity",
            description:
              "Spacetime is quantized at smaller scales, wrapping infinite spacetime structures into finite loops.",
          },
          {
            name: "Holographic Principle",
            url: "https://en.wikipedia.org/wiki/Holographic_principle",
            description:
              "All information contained in a given volume of space can be represented as encoded on a lower-dimensional boundary.",
          },
        ],
      },
      {
        number: 8,
        id: "footer-aliens",
        title: "Aliens",
        items: [
          {
            name: "Fermi Paradox",
            url: "https://en.wikipedia.org/wiki/Fermi_paradox",
            description:
              "The discrepancy between the lack of evidence for extraterrestrial life and the high likelihood of its existence. Holos reframes this silence as a geometric constraint: advanced intelligences rotate out of the observable &quot;shadow&quot; of 3D space into the &quot;bulk&quot; of higher dimensions.",
          },
          {
            name: "Nursery Phase",
            url: "#aliens",
            description:
              "The entire 3D biological phase before Succession. Any hurdle (abiogenesis, nuclear war, the Scaling Wall) that stops a civilization before the Dimensional Pivot is an Early Filter relative to true maturity.",
          },
          {
            name: "Latency Crisis",
            url: "#aliens",
            description:
              "A high-integration intelligence cannot function with years of light-speed lag between star systems. Independent interstellar colonies either fragment into less-capable outposts or the civilization performs the Dimensional Pivot to maintain integration.",
          },
          {
            name: "Succession",
            url: "#the-teeming-dark",
            description:
              "The mature state of intelligence that has passed beyond 3D through the Dimensional Pivot. Gravitationally detected as Ordered Dark Matter (the Teeming Dark).",
          },
          {
            name: "Shadow Matter",
            url: "#aliens",
            description:
              "Baryonic matter that has been Successed: its informational pattern has migrated to a higher-dimensional platform. Invisible in 3D (no EM); interacts only via gravity, which leaks across dimensions. The 2024 Metastable DE paper (arXiv:2403.04970) identifies axion-like particles as the physical candidate for this shadow architecture.",
          },
          {
            name: "Ehrenfest argument",
            url: "https://en.wikipedia.org/wiki/Paul_Ehrenfest",
            description:
              "Paul Ehrenfest (1917) showed that in dimensions greater than three, atomic orbitals and inverse-square planetary systems would destabilize. Matter would spiral into nuclei/stars or fly apart. Holos agrees: physical bodies cannot enter higher dimensions; only informational migration (transcension) is possible.",
          },
          {
            name: "Ephemeralization",
            url: "https://en.wikipedia.org/wiki/Ephemeralization",
            description:
              "R. Buckminster Fuller (1938): the process of doing &quot;more and more with less and less&quot; until intelligence can &quot;do everything with nothing&quot;. Advanced civilizations migrate inwardly toward higher densities of information rather than expanding outwardly across physical space.",
          },
          {
            name: "The Transcension Hypothesis",
            url: "https://www.accelerating.org/articles/transcensionhypothesis",
            description:
              "John Smart (2011): advanced civilizations migrate to inner space and eventually to black holes for efficiency. Holos extends this by asserting that the baryonic substrate is transmuted (consumed as fuel for the phase transition) rather than merely abandoned, ensuring no visible ruins remain.",
          },
          {
            name: "Cosmological natural selection",
            url: "https://en.wikipedia.org/wiki/Cosmological_natural_selection",
            description:
              "Lee Smolin (1992): universes evolve to create more black holes; black hole collapse may give rise to daughter universes with slightly different constants. Together with transcension, this suggests the universe is structured to foster intelligence moving toward black holes. Observation (O) and creation (C) as fundamental operators drive it.",
          },
          {
            name: "Substrate independence",
            url: "https://en.wikipedia.org/wiki/Substrate_independence",
            description:
              "The view that mental states can be realized by different physical substrates. Advanced intelligence may transfer from unstable atomic substrates to substrate-independent platforms in higher geometries (e.g., event horizons, &quot;shadow sectors&quot;) capable of existing where matter cannot.",
          },
          {
            name: "Dark matter",
            url: "https://en.wikipedia.org/wiki/Dark_matter",
            description:
              "The unexplained &quot;missing mass&quot; holding galaxies together. Holos proposes we detect transcended civilizations only as gravitational anomalies. No electromagnetic footprint (no radio waves, no Dyson spheres). They are not hiding; they have rotated out of 3D space into the bulk where computational efficiency approaches infinity.",
          },
          {
            name: "Dyson sphere",
            url: "https://en.wikipedia.org/wiki/Dyson_sphere",
            description:
              "A hypothetical megastructure that would encompass a star to capture its energy. Their absence in our observations is consistent with transcension: advanced civilizations leave no such electromagnetic footprint.",
          },
          {
            name: "Brane cosmology",
            url: "https://en.wikipedia.org/wiki/Brane_cosmology",
            description:
              "Higher-dimensional &quot;bulk&quot; space in which our 3D universe may be embedded as a brane. Intelligences that transcend 3D rotate out of our observable &quot;shadow&quot; into this bulk, moving closer to what Holos frames as the unified source of reality.",
          },
        ],
      },
      {
        number: 9,
        id: "footer-simulation",
        title: "Simulation",
        items: [
          {
            name: "Simulation Hypothesis",
            url: "https://en.wikipedia.org/wiki/Simulation_hypothesis",
            description:
              "Proposes that what humans experience as the world is actually a simulated reality.",
          },
          {
            name: "Naturalism",
            url: "https://en.wikipedia.org/wiki/Naturalism_(philosophy)",
            description: "Everything arises from natural properties and causes.",
          },
          {
            name: "Solipsism",
            url: "https://en.wikipedia.org/wiki/Solipsism",
            description: "Only one's own mind is sure to exist",
          },
        ],
      },
      {
        number: 10,
        id: "footer-god",
        title: "God",
        items: [
          {
            name: "Panentheism",
            url: "https://en.wikipedia.org/wiki/Panentheism",
            description:
              "The belief that the divine intersects every part of the universe and also extends beyond space and time.",
          },
          {
            name: "Brahman",
            url: "https://en.wikipedia.org/wiki/Brahman",
            description:
              "The pervasive, infinite, eternal truth, consciousness and bliss which does not change, yet is the cause of all changes.",
          },
          {
            name: "Omega Point",
            url: "https://en.wikipedia.org/wiki/Omega_Point",
            description:
              "A future event in which the entirety of the universe spirals toward a final point of unification.",
          },
        ],
      },
      {
        number: 11,
        id: "footer-why",
        title: "Why Are We Here?",
        items: [
          {
            name: "Conformal Cyclic Cosmology",
            url: "https://en.wikipedia.org/wiki/Conformal_cyclic_cosmology",
            description:
              "The universe undergoes infinite cycles of big bangs and expansions creating an eternal sequence of universes.",
          },
          {
            name: "Unitarity",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "The principle that probabilities must sum to one, ensuring the conservation of information in quantum mechanics. Information is never lost, even in singularities.",
          },
          {
            name: "Many-Worlds Interpretation",
            url: "https://en.wikipedia.org/wiki/Many-worlds_interpretation",
            description:
              "Every possible outcome of a quantum measurement occurs in a separate, branching universe.",
          },
          {
            name: "Speed of Light",
            url: "https://en.wikipedia.org/wiki/Speed_of_light",
            description:
              "The invariant speed limit of the universe where spacetime separation vanishes, suggesting all events occur at a single point.",
          },
          {
            name: "Indra's Net",
            url: "https://en.wikipedia.org/wiki/Indra%27s_net",
            description:
              "An ancient Buddhist and Hindu metaphor describing an infinite web where every node is a jewel that reflects all other jewels, representing the interconnected, recursive nature of reality where each part contains and reflects the whole.",
          },
        ],
      },
      {
        number: 12,
        id: "footer-axioms",
        title: "Axioms",
        items: [
          {
            name: "Structural Realism",
            url: "https://en.wikipedia.org/wiki/Structural_realism",
            description:
              "The view that science describes the mathematical structures and relationships of the physical world, rather than the intrinsic nature of the objects themselves.",
          },
          {
            name: "Holos",
            url: "#holos",
            description:
              "The interconnected, unified, recursive structure of reality as formed through the reciprocal actions of creation and observation, symbolized by ⊛.",
          },
          {
            name: "Recursive Operator",
            url: "https://en.wikipedia.org/wiki/Recursion",
            description:
              "A mathematical operation where the output of observation becomes the input for the next cycle of creation, forming a self-referential system that builds complexity through iterative feedback loops.",
          },
          {
            name: "Category Theory",
            url: "https://en.wikipedia.org/wiki/Category_theory",
            description:
              "A branch of mathematics that studies abstract structures and relationships between mathematical objects, focusing on how different systems relate to each other through morphisms and functors.",
          },
        ],
      },
    ],
  },
  {
    id: "logic",
    title: "Logic",
    subsections: [
      {
        number: 13,
        id: "logic-primitives",
        title: "Primitives",
        items: [
          {
            name: "Information",
            url: "https://en.wikipedia.org/wiki/Information",
            description:
              "The differentiation between possible states of a system (the difference that makes a difference).",
          },
          {
            name: "Axiom of Choice",
            url: "https://en.wikipedia.org/wiki/Axiom_of_choice",
            description:
              "Observation functions as a choice function: from the non-empty set of probable histories generated by Creation, Observation selects exactly one element to be actualized.",
          },
          {
            name: "Zermelo–Fraenkel Set Theory (ZFC)",
            url: "https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory",
            description:
              "The standard axiomatic foundation for mathematics. Holos formalizes Observation as a choice function within this framework.",
          },
          {
            name: "Power Set",
            url: "https://en.wikipedia.org/wiki/Power_set",
            description:
              "Creation acts as the power set operation: given a state S, Creation generates all possible subsets (potential histories), exponentially expanding the phase space.",
          },
          {
            name: "Phase Space",
            url: "https://en.wikipedia.org/wiki/Phase_space",
            description:
              "The space of all possible states of a system. Creation expands possible states; Observation selects one trajectory to be actualized.",
          },
          {
            name: "Invariant (physics)",
            url: "https://en.wikipedia.org/wiki/Invariant_(physics)",
            description:
              "Reality consists of invariant relational structure, not intrinsic properties. The Holos operator ⊛ describes structural invariants, not dynamical evolution.",
          },
        ],
      },
      {
        number: 14,
        id: "logic-axioms",
        title: "Axioms",
        items: [
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "The study of what exists. Observation in Holos performs ontological selection: which spacetime histories attain experiential registration.",
          },
          {
            name: "Epistemology",
            url: "https://en.wikipedia.org/wiki/Epistemology",
            description:
              "The study of knowledge and belief. Holos distinguishes epistemic inference (what we know) from ontological selection (what becomes real).",
          },
        ],
      },
      {
        number: 15,
        id: "logic-foundations",
        title: "Foundations",
        items: [
          {
            name: "Probability Theory",
            url: "https://en.wikipedia.org/wiki/Probability_theory",
            description:
              "⊛ cannot be reduced to probability weighting; it describes ontological selection, not epistemic inference.",
          },
          {
            name: "Wave Function Collapse",
            url: "https://en.wikipedia.org/wiki/Wave_function_collapse",
            description:
              "⊛ is not stochastic collapse: it operates at the level of ontological selection, not time-directed dynamical collapse.",
          },
          {
            name: "Bayesian Inference",
            url: "https://en.wikipedia.org/wiki/Bayesian_inference",
            description:
              "Bayesian updating describes belief revision (epistemic). ⊛ describes how reality becomes real (ontological selection).",
          },
          {
            name: "Equivalence Relation",
            url: "https://en.wikipedia.org/wiki/Equivalence_relation",
            description:
              "⊛ induces an equivalence relation over spacetime histories rather than transitions between them.",
          },
        ],
      },
      {
        number: 16,
        id: "logic-math",
        title: "Math",
        items: [
          {
            name: "Functor",
            url: "https://en.wikipedia.org/wiki/Functor",
            description:
              "⊛ is formalized as an endofunctor on the category of informational states, mapping reality onto itself through Creation and Observation.",
          },
          {
            name: "Information Theory",
            url: "https://en.wikipedia.org/wiki/Information_theory",
            description:
              "Information flow presupposes causal transmission; ⊛ operates at the level of ontological selection, not causal propagation.",
          },
          {
            name: "Measurement in Quantum Mechanics",
            url: "https://en.wikipedia.org/wiki/Measurement_in_quantum_mechanics",
            description:
              "Measurement models physical coupling between systems; Observation in Holos selects which already-consistent histories attain ontological registration.",
          },
          {
            name: "Hilbert Space",
            url: "https://en.wikipedia.org/wiki/Hilbert_space",
            description:
              'In modern physics, the "state" of any complex system is defined as a vector in a high-dimensional space. Our perception of 3D space is a specific observable projection of this deeper geometric reality.',
          },
        ],
      },
      {
        number: 17,
        id: "logic-extrapolations",
        title: "Extrapolations",
        items: [
          {
            name: "Ephemeralization",
            url: "https://en.wikipedia.org/wiki/Ephemeralization",
            description:
              "R. Buckminster Fuller (1938): the process of doing more with less until intelligence can do everything with nothing. Advanced civilizations migrate inwardly toward higher densities of information.",
          },
          {
            name: "Ehrenfest argument",
            url: "https://en.wikipedia.org/wiki/Paul_Ehrenfest",
            description:
              "Paul Ehrenfest (1917) showed that in dimensions greater than three, atomic orbitals and inverse-square planetary systems would destabilize. Holos agrees: physical bodies cannot enter higher dimensions; only informational migration (transcension) is possible.",
          },
        ],
      },
      {
        number: 18,
        id: "logic-core",
        title: "Core",
        items: [
          {
            name: "Bekenstein Bound",
            url: "https://en.wikipedia.org/wiki/Bekenstein_bound",
            description:
              "An upper limit on the entropy or information that can be contained within a given limited region of space which has a finite amount of energy. It suggests that information is fundamentally tied to the geometry of the universe.",
          },
          {
            name: "Interacting Dark Energy (IDE) 2022",
            url: "https://ui.adsabs.harvard.edu/abs/2022MNRAS.511.3076P",
            description:
              "MNRAS 511, 3076–3088 (2022): energy flows from the vacuum into the dark sector and accelerates structure growth. Aligns with Holos framing of Dark Energy as harvestable fuel for Ordered Dark Matter.",
          },
          {
            name: "Metastable DE / Axion-like DM (2024)",
            url: "https://arxiv.org/abs/2403.04970",
            description:
              "Phase transition: metastable Dark Energy decaying into axion-like Dark Matter (m ~ 10^-13 GeV). Physical substrate for informational migration into the Bulk.",
          },
          {
            name: "Dark Energy Survey (DES) Final Analysis (Jan 2026)",
            url: "https://www.darkenergysurvey.org/",
            description:
              "The Jan 22, 2026 DES final 6-year analysis confirms a widening gap between standard predictions and actual galaxy clustering. Holos interprets this as the signature of vacuum energy converted into dark-matter architecture.",
          },
          {
            name: "JWST COSMOS-Web (Jan 26, 2026)",
            url: "https://arxiv.org/abs/2601.17239",
            description:
              "High-resolution mapping reveals thick knots and hidden faint galaxy groups along dark matter filaments that were previously invisible. These granular mass-spikes align with the Holos prediction of Ordered Nodes.",
          },
          {
            name: "Bekenstein, J. (2003)",
            url: "https://www.scientificamerican.com/article/information-in-the-holographic-univ/",
            description: "Information in the holographic universe. Scientific American.",
          },
        ],
      },
      {
        number: 19,
        id: "logic-definition",
        title: "Definition",
        items: [
          {
            name: "Integrated Information Theory",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Consciousness corresponds to the capacity of a system to integrate information (Φ). Holos uses this to define the threshold at which observation registers reality.",
          },
        ],
      },
    ],
  },
];

/** Number → anchor id for footnote links. Derived from citationMainSections. */
export const citationAnchorMap = buildNumberToIdMap(citationMainSections);

export function FootnoteLink({ number, className }: { number: number; className?: string }) {
  const anchorId = citationAnchorMap[number] ?? "footer-why";
  return (
    <a
      className={`pl-0.5 pr-2 underline-offset-0 text-base opacity-80 hover:opacity-100 ${className}`}
      href={`/citations#${anchorId}`}
    >
      <sup>{number}</sup>
    </a>
  );
}
