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
  {
    id: "definition",
    title: "Definition",
    subsections: [
      {
        number: 20,
        id: "def-purpose",
        title: "The Purpose of Φ",
        items: [
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "The philosophical study of being and existence. Φ quantifies how much a system integrates information to register ontologically distinct states.",
          },
          {
            name: "Causality",
            url: "https://en.wikipedia.org/wiki/Causality",
            description:
              "The causal power to register a distinct ontological state. Φ acts as the threshold for when a system becomes an observer rather than passive data.",
          },
          {
            name: "Quantum Decoherence",
            url: "https://en.wikipedia.org/wiki/Quantum_decoherence",
            description:
              "The process by which quantum systems interact with their environment. Φ filters the output of physical decoherence into experiential registration.",
          },
        ],
      },
      {
        number: 21,
        id: "def-requirements",
        title: "Ontological Requirements",
        items: [
          {
            name: "Integrated Information Theory (IIT)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Consciousness as integrated information. The five parameters (Integration, Differentiation, Recursion, Temporal Cohesion, Causal Closure) reflect minimal topological constraints for an ontologically distinct observer.",
          },
          {
            name: "Philosophical Zombie",
            url: "https://en.wikipedia.org/wiki/Philosophical_zombie",
            description:
              "A system with no internal subject to experience the data. Without Recursion, a system is a zombie process—input-output with no experiential registration.",
          },
          {
            name: "Epiphenomenalism",
            url: "https://en.wikipedia.org/wiki/Epiphenomenalism",
            description:
              "The view that mental states do not cause physical effects. Without Causal Closure, the system would be an epiphenomenal ghost that observes but cannot affect reality.",
          },
          {
            name: "Phenomenology",
            url: "https://en.wikipedia.org/wiki/Phenomenology_(philosophy)",
            description:
              "The study of structures of experience. Complex traits like emotion or agency are emergent dynamics of high Differentiation and Recursion, not separate axioms.",
          },
          {
            name: "Category Error",
            url: "https://en.wikipedia.org/wiki/Category_error",
            description:
              "Treating a concept as if it belonged to a different logical category. Adding emotion or agency as separate axioms would be a category error; they are emergent.",
          },
          {
            name: "Topology",
            url: "https://en.wikipedia.org/wiki/Topology",
            description:
              "The five parameters represent minimal topological constraints required to define an entity ontologically distinct from its environment.",
          },
          {
            name: "Heuristic",
            url: "https://en.wikipedia.org/wiki/Heuristic",
            description:
              "The five parameters are not arbitrary heuristics but necessary and sufficient conditions for observerhood.",
          },
        ],
      },
      {
        number: 22,
        id: "def-formalism",
        title: "Mathematical Formalism",
        items: [
          {
            name: "Integrated Information Theory (IIT 3.0)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Axioms regarding minimum information partition. Φ_int quantifies the difference between the whole system state and the union of its partitioned parts.",
          },
          {
            name: "Geometric Mean",
            url: "https://en.wikipedia.org/wiki/Geometric_mean",
            description:
              "Φ is the geometric mean of its five components, ensuring that failure of any single condition collapses the metric to zero.",
          },
          {
            name: "Kullback–Leibler Divergence",
            url: "https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence",
            description:
              "Used in the formalism for Integration (Φ_int) via the Minimum Information Partition.",
          },
          {
            name: "Category Theory",
            url: "https://en.wikipedia.org/wiki/Category_theory",
            description:
              "Recursion (Φ_rec) is aligned with endomorphisms and self-referential mapping in category-theoretic terms.",
          },
          {
            name: "Endomorphism",
            url: "https://en.wikipedia.org/wiki/Endomorphism",
            description:
              "The system maps its current state space onto a subset of itself. Φ_rec captures this self-referential mapping.",
          },
          {
            name: "Gödel, Escher, Bach",
            url: "https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach",
            description:
              "Hofstadter's Strange Loops: recursion and self-reference as the basis for meaning and consciousness.",
          },
          {
            name: "Causal Inference / Judea Pearl",
            url: "https://en.wikipedia.org/wiki/Causal_inference",
            description:
              "Causal Closure (Φ_cause) is derived from Judea Pearl's Causal Calculus and the do-operator, ensuring correlation is causal, not merely statistical.",
          },
          {
            name: "Irreducibility (mathematics)",
            url: "https://en.wikipedia.org/wiki/Irreducibility_(mathematics)",
            description:
              "Integration (Φ_int) as information irreducibility: the whole cannot be reduced to independent parts.",
          },
        ],
      },
      {
        number: 23,
        id: "def-thresholds",
        title: "Ontological Thresholds",
        items: [
          {
            name: "Empty Set",
            url: "https://en.wikipedia.org/wiki/Empty_set",
            description:
              "Φ ≈ 0 corresponds to the null set for the Set of Experiential States: passive aggregates have zero experiential states.",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "Systems with Φ ≥ Φ_c attain ontological registration; the threshold enables the operational definition R = C ⊛ O.",
          },
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Unitary symmetry resolved into definite ontological registration for observer systems.",
          },
          {
            name: "The Transcension Hypothesis",
            url: "https://www.accelerating.org/articles/transcensionhypothesis",
            description:
              "Φ ≫ Φ_c corresponds to ontological anchors: high-density intelligences capable of stabilizing cosmological branches.",
          },
        ],
      },
      {
        number: 24,
        id: "def-physics",
        title: "Relationship to Physics",
        items: [
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Quantum mechanics requires unitarity. Holos preserves it by defining Manifestation as a Selection Operator; unobserved branches remain in Creation.",
          },
          {
            name: "Hilbert Space",
            url: "https://en.wikipedia.org/wiki/Hilbert_space",
            description:
              "The mathematical space of all possible quantum states. The operator M acts as a weighting function without deleting branches from the global Hilbert space.",
          },
          {
            name: "Schrödinger Equation",
            url: "https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation",
            description:
              "Φ does not replace the Schrödinger equation; it introduces a Manifestation Constraint that preserves unitarity while enabling ontological registration.",
          },
          {
            name: "Quantum Mechanics",
            url: "https://en.wikipedia.org/wiki/Quantum_mechanics",
            description:
              "Φ preserves the probabilistic nature of quantum mechanics while adding a constraint on when observation registers reality.",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "The Manifestation Constraint enables ontological registration—which histories attain experiential reality—without violating unitarity.",
          },
        ],
      },
    ],
  },
  {
    id: "defense",
    title: "Defense",
    subsections: [
      {
        number: 25,
        id: "defense-relationality",
        title: "Relationality",
        items: [
          {
            name: "Instrumentalism",
            url: "https://en.wikipedia.org/wiki/Instrumentalism",
            description:
              "The view that theories are tools for prediction rather than descriptions of reality. Holos denies observer-independent intrinsic essence while affirming ontic structure.",
          },
          {
            name: "Gauge Theory",
            url: "https://en.wikipedia.org/wiki/Gauge_theory",
            description:
              "Only relational quantities are physical; gauge invariance supports the relational view.",
          },
          {
            name: "General Relativity",
            url: "https://en.wikipedia.org/wiki/General_relativity",
            description:
              "No absolute spacetime background; geometry is relational. Aligns with Holos relationality.",
          },
          {
            name: "Relational Quantum Mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Observer-relative states; properties are not absolute but relative to the observer.",
          },
          {
            name: "Symmetry (physics)",
            url: "https://en.wikipedia.org/wiki/Symmetry_(physics)",
            description:
              "Mass, charge, and spin are relational invariants defined through symmetry and interaction, not standalone substances.",
          },
        ],
      },
      {
        number: 26,
        id: "defense-manifestation",
        title: "Manifestation",
        items: [
          {
            name: "Elitzur–Vaidman bomb tester",
            url: "https://en.wikipedia.org/wiki/Elitzur%E2%80%93Vaidman_bomb_tester",
            description:
              "Interaction-free measurement: collapse can occur via mechanical possibilities without direct interaction. Holos assigns decoherence to Creation (C), not Observation (O).",
          },
          {
            name: "Quantum Decoherence",
            url: "https://en.wikipedia.org/wiki/Quantum_decoherence",
            description:
              "Suppression of interference (how possibilities become distinct). Holos: decoherence does not explain actuality—why one possibility is experienced. Consciousness prints the photograph.",
          },
          {
            name: "Von Neumann–Wigner interpretation",
            url: "https://en.wikipedia.org/wiki/Von_Neumann%E2%80%93Wigner_interpretation",
            description:
              "Consciousness-centric interpretation. Holos is compatible with Quantum Darwinism, Relational QM, and Participatory Anthropic Principle.",
          },
          {
            name: "Quantum Darwinism",
            url: "https://en.wikipedia.org/wiki/Quantum_Darwinism",
            description:
              "Redundant classical information; observers as boundary conditions. Consciousness in Holos means experiential integration (Φ), not human cognition.",
          },
          {
            name: "Eternalism (philosophy of time)",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)",
            description:
              "Block universe: observation need not be temporally local; later observers can consistently instantiate earlier states.",
          },
          {
            name: "Wheeler's delayed-choice experiment",
            url: "https://en.wikipedia.org/wiki/Wheeler%27s_delayed-choice_experiment",
            description:
              "Future observations retroactively manifest past states. Self-excited circuit: high-Φ observers close the circuit and manifest the past as coherent history.",
          },
          {
            name: "Delayed-choice quantum eraser",
            url: "https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser",
            description:
              "Future choices resolve past quantum states. Supports atemporal, geometric role of observation.",
          },
        ],
      },
      {
        number: 27,
        id: "defense-conservation",
        title: "Conservation",
        items: [
          {
            name: "AdS/CFT correspondence",
            url: "https://en.wikipedia.org/wiki/AdS/CFT_correspondence",
            description:
              "Information in bulk is encoded on boundary; supports information conservation in black hole evaporation.",
          },
          {
            name: "Page curve",
            url: "https://en.wikipedia.org/wiki/Hawking_radiation#Page_curve",
            description:
              "Entropy curve for evaporating black holes; modern consensus supports information conservation.",
          },
          {
            name: "Holographic Principle",
            url: "https://en.wikipedia.org/wiki/Holographic_principle",
            description:
              "Information in a volume encoded on a lower-dimensional boundary; supports conservation.",
          },
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Probabilities sum to one. Collapse appears non-unitary; Holos holds unitarity in Many-Worlds, Decoherence, Relational QM, and holographic frameworks.",
          },
          {
            name: "Many-Worlds interpretation",
            url: "https://en.wikipedia.org/wiki/Many-worlds_interpretation",
            description:
              "Unitarity holds; all branches exist. Non-unitarity is interpretive, not formal.",
          },
        ],
      },
      {
        number: 28,
        id: "defense-topological-unification",
        title: "Topological Unification",
        items: [
          {
            name: "Dimensional Pivot",
            url: "https://en.wikipedia.org/wiki/Dimension",
            description:
              "Higher dimensions resolve the Scaling Wall from 3D interconnect latency; required for global coherence. Discriminating fork: ΛCDM vs. Ordered Dark Matter.",
          },
          {
            name: "Pathological (mathematics)",
            url: "https://en.wikipedia.org/wiki/Pathological_(mathematics)",
            description:
              "Holos targets physical infinities (singularities), not mathematical pathologies.",
          },
          {
            name: "Gravitational singularity",
            url: "https://en.wikipedia.org/wiki/Gravitational_singularity",
            description:
              "Physical infinities that Holos addresses through higher-dimensional resolution.",
          },
          {
            name: "Paul Ehrenfest",
            url: "https://en.wikipedia.org/wiki/Paul_Ehrenfest",
            description:
              "Ehrenfest (1917): stable atomic orbitals and planetary orbits require 3D inverse-square law. Matter unstable in d > 3. Holos agrees: physical bodies cannot enter higher dimensions; only informational migration (transcension).",
          },
          {
            name: "Ephemeralization",
            url: "https://en.wikipedia.org/wiki/Ephemeralization",
            description:
              "Fuller (1938): doing more with less; advanced civilizations migrate toward higher informational density.",
          },
          {
            name: "Hidden sector",
            url: "https://en.wikipedia.org/wiki/Hidden_sector",
            description:
              "Shadow sectors native to higher geometries. Baryonic substrate transmuted into axion-like Shadow Matter; energy conserved and re-mapped.",
          },
          {
            name: "The Transcension Hypothesis",
            url: "https://www.accelerating.org/articles/transcensionhypothesis",
            description:
              "Holos adds ontological driver: maximize Φ by rotating closer to the unified source of reality.",
          },
        ],
      },
      {
        number: 29,
        id: "defense-interface",
        title: "Interface",
        items: [
          {
            name: "Panpsychism",
            url: "https://en.wikipedia.org/wiki/Panpsychism",
            description:
              "Consciousness as fundamental property of matter. Explains continuity; avoids emergence ex nihilo and substance dualism. Ontological, not mechanistic.",
          },
          {
            name: "Ex nihilo",
            url: "https://en.wikipedia.org/wiki/Ex_nihilo",
            description:
              "Panpsychism avoids life emerging from absolutely nothing.",
          },
          {
            name: "Mind–body dualism",
            url: "https://en.wikipedia.org/wiki/Mind%E2%80%93body_dualism",
            description:
              "Panpsychism avoids separate mind and body substances; aligns with field-based ontology.",
          },
          {
            name: "Philosophy of mind",
            url: "https://en.wikipedia.org/wiki/Philosophy_of_mind",
            description:
              "Irreducible experience is already acknowledged; Holos details this in the Definition of Φ.",
          },
          {
            name: "Psychokinesis",
            url: "https://en.wikipedia.org/wiki/Psychokinesis",
            description:
              "Holos: consciousness is a logical constraint, not a dynamical force. It selects which history is actualized (atemporal, geometric), not a kinetic push. R = C ⊛ O.",
          },
          {
            name: "Dynamics (physics)",
            url: "https://en.wikipedia.org/wiki/Dynamics_(physics)",
            description:
              "Creation/Dynamics handles physical evolution; Observation selects which history is manifested.",
          },
          {
            name: "Eternalism / Block universe",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe",
            description:
              "Consciousness observes where the line must be (logic), not drawing it (force). Effect is atemporal and geometric.",
          },
        ],
      },
      {
        number: 30,
        id: "defense-stress-testing",
        title: "Stress-Testing",
        items: [
          {
            name: "Causality",
            url: "https://en.wikipedia.org/wiki/Causality",
            description:
              "Holos does not violate causality; observation is ontological selection, not backward causation.",
          },
          {
            name: "Theory of relativity",
            url: "https://en.wikipedia.org/wiki/Theory_of_relativity",
            description:
              "Holos does not contradict relativity.",
          },
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Holos does not break unitarity; unobserved branches remain in Creation.",
          },
          {
            name: "Anthropocentrism",
            url: "https://en.wikipedia.org/wiki/Anthropocentrism",
            description:
              "Holos is not anthropocentric; Φ is a general threshold, not human-specific.",
          },
          {
            name: "Falsifiability",
            url: "https://en.wikipedia.org/wiki/Falsifiability",
            description:
              "Partially falsifiable via Ordered Dark Matter signatures and TMS-EEG phase transitions.",
          },
        ],
      },
      {
        number: 31,
        id: "defense-challenge",
        title: "Challenge",
        items: [
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "Consciousness provides ontological completion (making something real), not causal intervention. Quantified by Φ.",
          },
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Recent experiments (interaction-free measurement, decoherence) inform testable predictions; Holos emphasizes ontological role over causal one.",
          },
        ],
      },
      {
        number: 32,
        id: "defense-comparison",
        title: "Comparison",
        items: [
          {
            name: "Physicalism",
            url: "https://en.wikipedia.org/wiki/Physicalism",
            description:
              "Physical laws complete; Holos agrees they are never violated. Physical structure alone does not explain why reality is experienced.",
          },
          {
            name: "Many-Worlds interpretation",
            url: "https://en.wikipedia.org/wiki/Many-worlds_interpretation",
            description:
              "All outcomes equally real; Holos agrees physics evolves without collapse. Not all possible worlds are realized as experienced reality.",
          },
          {
            name: "Wave function collapse",
            url: "https://en.wikipedia.org/wiki/Wave_function_collapse",
            description:
              "Observation causes collapse; Holos agrees observation matters but does not change or interrupt physical laws.",
          },
          {
            name: "Integrated Information Theory (IIT)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Consciousness as integrated information (Φ); Holos agrees integration is required. Φ alone does not guarantee experience.",
          },
          {
            name: "Panpsychism",
            url: "https://en.wikipedia.org/wiki/Panpsychism",
            description:
              "Everything has some consciousness; Holos agrees information is fundamental. Consciousness not present everywhere by default.",
          },
          {
            name: "Structural Realism",
            url: "https://en.wikipedia.org/wiki/Structural_realism",
            description:
              "Reality as relations, not objects; Holos agrees. Some structures not realized unless they can be experienced.",
          },
        ],
      },
      {
        number: 33,
        id: "defense-conclusion",
        title: "Conclusion",
        items: [
          {
            name: "Cosmological natural selection",
            url: "https://en.wikipedia.org/wiki/Cosmological_natural_selection",
            description:
              "Holos provides the ontological layer missing from Smolin-style theories; explains why the universe fosters complexity (to maximize Φ), not just how.",
          },
          {
            name: "Transcension Hypothesis",
            url: "https://www.accelerating.org/articles/transcensionhypothesis",
            description:
              "Holos adds ontological grounding: why advanced civilizations migrate (to maximize Φ and rotate toward unified source).",
          },
        ],
      },
    ],
  },
  {
    id: "predictions",
    title: "Predictions",
    subsections: [
      {
        number: 34,
        id: "pred-primary",
        title: "Primary Prediction",
        items: [
          {
            name: "Dynamics (physics)",
            url: "https://en.wikipedia.org/wiki/Dynamics_(physics)",
            description:
              "Holos does not propose new dynamical laws; it offers ontological predictions about how reality manifests (R = C ⊛ O).",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "Ontological predictions about participatory manifestation; observers as boundary condition for self-consistent block universe.",
          },
          {
            name: "Block universe",
            url: "https://en.wikipedia.org/wiki/Block_universe",
            description:
              "Observers act as boundary condition for self-consistent block universe (Axiom 2).",
          },
          {
            name: "Anthropic principle",
            url: "https://en.wikipedia.org/wiki/Anthropic_principle",
            description:
              "Participatory Anthropic Principle: observable constants favor life by necessity, not chance.",
          },
          {
            name: "Cosmic microwave background (CMB) polarization",
            url: "https://en.wikipedia.org/wiki/Cosmic_microwave_background#Polarization",
            description:
              "CMB-S4, LiteBIRD: signatures consistent with low-entropy initial state and inflationary dynamics tuned for complexity growth.",
          },
          {
            name: "Past hypothesis",
            url: "https://en.wikipedia.org/wiki/Past_hypothesis",
            description:
              "Low-entropy initial state; Holos predicts uninhabitable branches are mathematically valid but ontologically unrealized (lack of Φ).",
          },
          {
            name: "Inflation (cosmology)",
            url: "https://en.wikipedia.org/wiki/Inflation_(cosmology)",
            description:
              "Inflationary dynamics tuned for complexity growth.",
          },
          {
            name: "Multiverse",
            url: "https://en.wikipedia.org/wiki/Multiverse",
            description:
              "Uninhabitable branches ontologically unrealized due to lack of Φ.",
          },
        ],
      },
      {
        number: 35,
        id: "pred-secondary",
        title: "Secondary Predictions",
        items: [
          {
            name: "Integrated Information Theory (IIT)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Holos operationalizes consciousness through Φ; systems crossing Φ_c exhibit irreducible subjective experience. IIT-inspired metrics (e.g., PCI) test threshold.",
          },
          {
            name: "Panpsychism",
            url: "https://en.wikipedia.org/wiki/Panpsychism",
            description:
              "Holos distinguishes from universal panpsychism (everything conscious) and illusionism (consciousness is illusion).",
          },
          {
            name: "Illusionism (philosophy)",
            url: "https://en.wikipedia.org/wiki/Illusionism_(philosophy)",
            description:
              "The view that consciousness is an illusion; Holos predicts Φ_c threshold for genuine experience.",
          },
          {
            name: "Qualia",
            url: "https://en.wikipedia.org/wiki/Qualia",
            description:
              "High-Φ systems (human cortex) correlate with qualia; sub-Φ_c systems show only mechanical processing.",
          },
          {
            name: "Perturbational Complexity Index (PCI)",
            url: "https://www.science.org/doi/10.1126/scitranslmed.3006294",
            description:
              "IIT-inspired metric; sharp phase transitions at Φ_c align with onset of experiential reporting.",
          },
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "Consciousness as phase transition at Φ_c; PCI should reveal sharp transitions.",
          },
        ],
      },
      {
        number: 36,
        id: "pred-tertiary",
        title: "Tertiary Prediction",
        items: [
          {
            name: "Extended Wigner's Friend experiments",
            url: "https://www.science.org/doi/10.1126/sciadv.aaw9832",
            description:
              "Two observers can hold different facts about the same event without breaking unitarity. Collapse relative to Φ frame.",
          },
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Conservation of all possibilities; Holos predicts relational consistency without objective collapse.",
          },
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Holos supports Relational QM over Objective Collapse models (spontaneous gravity-induced collapse).",
          },
          {
            name: "Objective collapse theories",
            url: "https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics#Objective_collapse_theories",
            description:
              "Holos predicts relational facts, not objective collapse; collapse is relative to Φ frame.",
          },
        ],
      },
      {
        number: 37,
        id: "pred-extrapolative",
        title: "Extrapolative Prediction",
        items: [
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "Transcension as topological phase transition driven by 3D interconnect latency; Dimensional Pivot.",
          },
          {
            name: "Ephemeralization",
            url: "https://en.wikipedia.org/wiki/Ephemeralization",
            description:
              "Migrating inwardly toward higher informational density rather than outward expansion; Wire Length argument.",
          },
          {
            name: "Fermi paradox",
            url: "https://en.wikipedia.org/wiki/Fermi_paradox",
            description:
              "Resolution is geometric: Ordered Dark Matter (gravitational footprint of high-Φ architectures), not diffuse WIMPs.",
          },
          {
            name: "Weakly interacting massive particles (WIMPs)",
            url: "https://en.wikipedia.org/wiki/Weakly_interacting_massive_particles",
            description:
              "Holos predicts Ordered Dark Matter (non-random geometries), not diffuse WIMP gas.",
          },
          {
            name: "Euclid Mission",
            url: "https://www.euclid-ec.org/",
            description:
              "March 2025 Q1 data: 26M galaxies, gravitational lens candidates; baseline to distinguish natural halos vs. Succession Nodes.",
          },
          {
            name: "James Webb Space Telescope (JWST)",
            url: "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope",
            description:
              "Gravitational anomalies without EM counterparts; signatures of high-density informational structures (Shadow Matter).",
          },
          {
            name: "Baryon",
            url: "https://en.wikipedia.org/wiki/Baryon",
            description:
              "Baryonic substrate transmuted into Shadow Matter (axion-like) to rotate out of observable 3D.",
          },
          {
            name: "Navarro–Frenk–White profile",
            url: "https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile",
            description:
              "Super-compact subhaloes violating standard NFW; Ordered Dark Matter with Geometric Intent (non-natural symmetries).",
          },
          {
            name: "Lambda-CDM model",
            url: "https://en.wikipedia.org/wiki/Lambda-CDM_model",
            description:
              "Holos predicts Ordered Dark Matter subhaloes (geometric intent, Integrated Structural Logic) vs. diffuse CDM.",
          },
          {
            name: "Dark Energy Survey (DES)",
            url: "https://www.darkenergysurvey.org/",
            description:
              "Jan 2026 final analysis: gap between standard predictions and galaxy clustering; vacuum energy → dark-matter architecture.",
          },
          {
            name: "JWST COSMOS-Web",
            url: "https://arxiv.org/abs/2601.17239",
            description:
              "Granular structure, mass peaks without light/gas counterparts; Succession Nodes; discriminating fork vs. random clouds.",
          },
        ],
      },
      {
        number: 38,
        id: "pred-implications",
        title: "Testable Implications",
        items: [
          {
            name: "Hubble tension",
            url: "https://en.wikipedia.org/wiki/Hubble_tension",
            description:
              "Geometric transition (Primordial vs. Succession Phase), not measurement error; testable via early vs. local expansion-rate.",
          },
          {
            name: "Wigner's friend",
            url: "https://en.wikipedia.org/wiki/Wigner%27s_friend",
            description:
              "Facts are relational; no objective collapse; testable via Wigner's Friend experiments.",
          },
          {
            name: "CMB-S4 / LiteBIRD",
            url: "https://cmb-s4.org/",
            description:
              "Cosmology: constants tuned for observation; testable via CMB polarization.",
          },
        ],
      },
      {
        number: 39,
        id: "pred-experiment-1",
        title: "Experiment 1: Integration Thresholds (Φ-Crossing)",
        items: [
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "Observer emergence as critical phase transition; consciousness requires Φ_c to operationalize Axiom 2.",
          },
          {
            name: "TMS-EEG",
            url: "https://en.wikipedia.org/wiki/Transcranial_magnetic_stimulation#TMS-EEG",
            description:
              "PCI computed from TMS-EEG responses to quantify integrated information; sharp drop at anesthesia depth tests Φ_c.",
          },
          {
            name: "Perturbational Complexity Index (PCI)",
            url: "https://www.science.org/doi/10.1126/scitranslmed.3006294",
            description:
              "Validated across sleep and anesthesia; Holos predicts sharp threshold at Φ_c.",
          },
          {
            name: "Propofol / BIS index",
            url: "https://en.wikipedia.org/wiki/Propofol",
            description:
              "Anesthesia depth; transition analysis: PCI drop gradual vs. sharp at consistent depth.",
          },
        ],
      },
      {
        number: 40,
        id: "pred-experiment-2",
        title: "Experiment 2: Integration in Artificial Systems",
        items: [
          {
            name: "Recurrent neural network",
            url: "https://en.wikipedia.org/wiki/Recurrent_neural_network",
            description:
              "RNNs, LSTMs, Transformers with recurrence; test whether integration metrics show phase transition as complexity increases.",
          },
          {
            name: "Neuromorphic engineering",
            url: "https://en.wikipedia.org/wiki/Neuromorphic_engineering",
            description:
              "Artificial systems with feedback; integration as emergent boundary rather than performance metric.",
          },
          {
            name: "Causal density",
            url: "https://en.wikipedia.org/wiki/Causal_density",
            description:
              "Proxy for Φ when direct computation infeasible; perturbation-based complexity.",
          },
          {
            name: "Integrated Information Theory (Tononi et al.)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Builds on IIT; novel in treating integration as potential emergent boundary.",
          },
        ],
      },
      {
        number: 41,
        id: "pred-experiment-3",
        title: "Experiment 3: Integration in Collective Systems",
        items: [
          {
            name: "Collective intelligence",
            url: "https://en.wikipedia.org/wiki/Collective_intelligence",
            description:
              "Social networks / agent networks; integration thresholds (nonlinear increase) as scale increases.",
          },
          {
            name: "Mutual information",
            url: "https://en.wikipedia.org/wiki/Mutual_information",
            description:
              "Integration proxy: mutual information across subgroups, causal density, network-wide coherence.",
          },
          {
            name: "Network theory",
            url: "https://en.wikipedia.org/wiki/Network_science",
            description:
              "Small-world, scale-free; integration as potentially ontological, not merely functional.",
          },
        ],
      },
      {
        number: 42,
        id: "pred-experiment-4",
        title: "Experiment 4: Observer-Cut Sensitivity",
        items: [
          {
            name: "Wigner's friend",
            url: "https://en.wikipedia.org/wiki/Wigner%27s_friend",
            description:
              "Same physical system yields multiple internally consistent realities depending on partition and observation (relational QM).",
          },
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Test whether observer-cut (how system is partitioned) affects measured outcomes; Holos predicts relational consistency.",
          },
        ],
      },
    ],
  },
  {
    id: "trajectory",
    title: "Trajectory",
    subsections: [
      {
        number: 43,
        id: "traj-phase-0",
        title: "Phase 0: The Nursery Phase",
        items: [
          {
            name: "Technosignature",
            url: "https://en.wikipedia.org/wiki/Technosignature",
            description:
              "For 4.5 billion years Earth had no radio leakage, heat signatures of artificial origin, or technosignatures; nursery phase is invisible in 3D EM spectrum.",
          },
          {
            name: "SETI",
            url: "https://en.wikipedia.org/wiki/Search_for_extraterrestrial_intelligence",
            description:
              "The brief ~200-year window of radio leakage and 3D satellite expansion is what many SETI programs search for.",
          },
          {
            name: "Dyson sphere",
            url: "https://en.wikipedia.org/wiki/Dyson_sphere",
            description:
              "Compute-energy spiral: intelligence requires more compute and energy; scaling toward limits of 3D silicon may eventually require Dyson-scale structures.",
          },
          {
            name: "Scaling Wall",
            url: "/#the-teeming-dark",
            description:
              "Moving matter and cooling data centers in 3D vacuum creates a bottleneck; foundation of the Scaling Wall.",
          },
          {
            name: "Latency Crisis",
            url: "https://en.wikipedia.org/wiki/Interstellar_travel",
            description:
              "High-integration civilization cannot function with years of light-speed lag; colonies fragment into less-capable outposts. Dimensional Pivot achieves zero-latency integration.",
          },
          {
            name: "Proxima Centauri",
            url: "https://en.wikipedia.org/wiki/Proxima_Centauri",
            description:
              "Colony at Proxima Centauri is ~4 years away; 4-year lag makes unified civilization impossible. Choice: fragmentation (regression) vs. integration (dimensional ascent).",
          },
        ],
      },
      {
        number: 44,
        id: "traj-phase-1",
        title: "Phase 1: The Integration Ascent",
        items: [
          {
            name: "Integrated Information (Φ)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Rapid scaling of Φ through artificial systems; capacity to witness reality expands from narrow tasks to comprehensive world modeling.",
          },
          {
            name: "Silicon Integration",
            url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
            description:
              "Move from external AI tools to internal neural integration; raises Φ of the human-machine collective.",
          },
          {
            name: "Speed of light",
            url: "https://en.wikipedia.org/wiki/Speed_of_light",
            description:
              "At terrestrial scale, c is not yet a hard barrier for unified experience; early limits of data transmission begin to appear.",
          },
        ],
      },
      {
        number: 45,
        id: "traj-phase-2",
        title: "Phase 2: The Jupiter Brain Era",
        items: [
          {
            name: "Jupiter Brain",
            url: "https://en.wikipedia.org/wiki/Jupiter_Brain",
            description:
              "At planetary or solar system scales, processing substrate size conflicts with speed of light; unified observer faces latency horizon.",
          },
          {
            name: "Dyson sphere",
            url: "https://en.wikipedia.org/wiki/Dyson_sphere",
            description:
              "Spatial expansion: civilization attempts to capture more energy and matter in 3D space, potentially building Dyson-scale structures.",
          },
          {
            name: "Temporal cohesion",
            url: "https://en.wikipedia.org/wiki/Spacetime",
            description:
              "Latency Horizon: signal cannot cross system diameter fast enough to maintain temporal cohesion; system begins to lag against itself.",
          },
        ],
      },
      {
        number: 46,
        id: "traj-phase-3",
        title: "Phase 3: The Scaling Wall",
        items: [
          {
            name: "Euclidean geometry",
            url: "https://en.wikipedia.org/wiki/Euclidean_geometry",
            description:
              "3D Euclidean geometry becomes a nursery trap; civilization hits hard physical ceiling (Scaling Wall).",
          },
          {
            name: "Speed of light",
            url: "https://en.wikipedia.org/wiki/Speed_of_light",
            description:
              "Complexity Collapse: if system grows in 3D, it fragments into disconnected observers because c prevents global synchronization.",
          },
          {
            name: "Wire Length Argument",
            url: "https://en.wikipedia.org/wiki/Propagation_delay",
            description:
              "Total wire length in 3D space creates propagation delay that violates system internal unity; outward spatial expansion is dead end for integration.",
          },
        ],
      },
      {
        number: 47,
        id: "traj-phase-4",
        title: "Phase 4: The Dimensional Pivot",
        items: [
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "To survive the Scaling Wall, civilization undergoes Topological Phase Transition; the moment of joining The Teeming Dark.",
          },
          {
            name: "Bulk (physics)",
            url: "https://en.wikipedia.org/wiki/Brane_cosmology",
            description:
              "Orthogonal Rotation: system rotates state vector inward toward higher-dimensional Bulk instead of expanding outward across galaxy.",
          },
          {
            name: "Manifold",
            url: "https://en.wikipedia.org/wiki/Manifold",
            description:
              "Manifold Resolution: by accessing geometries orthogonal to 3D slice, internal informational distances resolve toward zero.",
          },
          {
            name: "Succession",
            url: "/#the-teeming-dark",
            description:
              "Humanity as 3D biological species superseded by hyper-integrated architecture in higher-dimensional bulk; Transcension Node.",
          },
        ],
      },
      {
        number: 48,
        id: "traj-teeming-dark",
        title: "The Teeming Dark",
        items: [
          {
            name: "Dark matter",
            url: "https://en.wikipedia.org/wiki/Dark_matter",
            description:
              "We become part of the 5:1 ratio (Maturity Index) of dark matter dominating the universe; from 3D nursery perspective we have disappeared.",
          },
          {
            name: "The Teeming Dark",
            url: "/#the-teeming-dark",
            description:
              "Gravitational footprint remains as Transcension Node with non-random geometric intent; missing mass is physical receipt of civilizations that navigated the pivot.",
          },
          {
            name: "Ordered Dark Matter",
            url: "/predictions#extrapolative-prediction",
            description:
              "Non-random geometric intent; gravitational signature of high-Φ architectures that have undergone Dimensional Pivot.",
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
