export interface CitationItem {
  name: string;
  url: string;
  description: string;
}

export interface CitationSubsection {
  number: number;
  id: string;
  title: string;
  /** Canonical link to the corresponding section on the site (e.g. /#meaning-of-life, /logic#minimal-core). */
  canonicalLink: string;
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
        id: "introduction",
        title: "Introduction",
        canonicalLink: "/#introduction",
        items: [
          {
            name: "Interpretations of quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics",
            description:
              "Holos is an interpretive framework: it does not add new laws of physics, only a way to understand how a physical description turns into lived experience.",
          },
          {
            name: "Philosophy of physics",
            url: "https://en.wikipedia.org/wiki/Philosophy_of_physics",
            description:
              "The study of fundamental questions about space, time, matter, and the relationship between mathematical description and what we take to be real.",
          },
          {
            name: "Structural realism",
            url: "https://en.wikipedia.org/wiki/Structural_realism",
            description:
              "The view that science describes relationships between things, not what they are in themselves; Holos extends this by giving observation a role in making structure lived.",
          },
          {
            name: "Block universe",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe",
            description:
              "The view that past, present, and future exist as a four-dimensional block; Holos treats observation as what registers this structure as experience.",
          },
          {
            name: "Recursion",
            url: "https://en.wikipedia.org/wiki/Recursion",
            description:
              "R = C ⊛ O describes a recursive loop: creation generates possibilities, observation registers them from within without selecting or erasing any, and each registered history feeds the next cycle.",
          },
        ],
      },
      {
        number: 2,
        id: "meaning-of-life",
        title: "The Meaning of Life",
        canonicalLink: "/#meaning-of-life",
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
            name: "Von Neumann-Wigner Interpretation",
            url: "https://en.wikipedia.org/wiki/Von_Neumann%E2%80%93Wigner_interpretation",
            description:
              "An interpretation of quantum mechanics in which consciousness is formulated as a necessary process for the quantum measurement process.",
          },
        ],
      },
      {
        number: 3,
        id: "consciousness",
        title: "Consciousness",
        canonicalLink: "/#consciousness",
        items: [
          {
            name: "Hard problem of consciousness",
            url: "https://en.wikipedia.org/wiki/Hard_problem_of_consciousness",
            description:
              "Chalmers: why does physical activity produce felt experience at all? Holos does not answer this, but reframes it: integration is the condition under which a physical system has an inside view.",
          },
          {
            name: "Binding problem",
            url: "https://en.wikipedia.org/wiki/Binding_problem",
            description:
              "How distributed neural activity gives rise to unified experience; Holos frames integration as the boundary where independent parts become a single perspective.",
          },
          {
            name: "Neural correlates of consciousness",
            url: "https://en.wikipedia.org/wiki/Neural_correlates_of_consciousness",
            description:
              "Search for what in the brain matches experience; anesthesia switching it off, and recovery switching it back on, fit integration as the condition for being an observer.",
          },
          {
            name: "Global Neuronal Workspace Theory (GNWT)",
            url: "https://en.wikipedia.org/wiki/Global_workspace_theory",
            description:
              "The theory that conscious access happens when a signal lights up and spreads across the brain; Holos treats this as a model of what gets reported, not the deeper threshold (integration) for being an observer at all.",
          },
          {
            name: "Integrated Information Theory",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Consciousness as capacity to integrate information (Φ); Holos uses integration as the threshold for observation, not a full theory of qualia.",
          },
          {
            name: "Qualia",
            url: "https://en.wikipedia.org/wiki/Qualia",
            description:
              "The subjective character of experience; Holos does not reduce qualia to Φ but treats integration as the condition for “witnessing reality from the inside.”",
          },
          {
            name: "Panpsychism",
            url: "https://en.wikipedia.org/wiki/Panpsychism",
            description:
              "Consciousness as fundamental in matter; Holos rejects universal panpsychism in favor of a threshold (Φ ≥ Φ_c) so that not everything is an observer.",
          },
          {
            name: "Cultured Neural Network Learning Systems",
            url: "https://pubmed.ncbi.nlm.nih.gov/36228614/",
            description:
              "Recent laboratory experiments have demonstrated that networks of cultured neurons grown on silicon substrates can be interfaced with digital environments and trained through closed-loop feedback to perform simple tasks, including interacting with video game dynamics. These systems show that biological neural tissue can form adaptive feedback loops and integrated processing structures outside a full organism. While they do not demonstrate consciousness, they provide an experimental platform for studying minimal neural integration and learning dynamics.",
          },
        ],
      },
      {
        number: 4,
        id: "our-universe",
        title: "Our Universe",
        canonicalLink: "/#our-universe",
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
        number: 5,
        id: "spacetime",
        title: "Spacetime",
        canonicalLink: "/#spacetime",
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
              "The invariant measure of separation between two events in spacetime. For light the interval is zero, though emission and absorption remain two distinct events.",
          },
          {
            name: "Null Interval",
            url: "https://en.wikipedia.org/wiki/Spacetime#Spacetime_interval",
            description:
              "A spacetime interval of zero, which occurs along light rays. A zero interval does not make two events one: emission and absorption stay distinct, and no observer can ride the light.",
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
              "The idea that future events can influence past ones. Holos rejects it: the quantum eraser needs no backward influence, only the sorting of records made later.",
          },
          {
            name: "Quantum Eraser Experiment",
            url: "https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser",
            description:
              "The screen pattern never changes; interference appears only when recorded hits are sorted using later measurements. Ordinary quantum mechanics predicts every result, with nothing traveling backward in time.",
          },
        ],
      },
      {
        number: 6,
        id: "higher-dimensions",
        title: "Higher Dimensions",
        canonicalLink: "/#higher-dimensions",
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
              "A proposal that fundamental particles are tiny vibrating strings, requiring extra spatial dimensions. Unconfirmed; Holos takes no position on it.",
          },
          {
            name: "Quantum Gravity",
            url: "https://en.wikipedia.org/wiki/Quantum_gravity",
            description:
              "The unfinished effort to reconcile gravity with quantum theory; some approaches use extra dimensions, none yet confirmed.",
          },
          {
            name: "Brane Cosmology",
            url: "https://en.wikipedia.org/wiki/Brane_cosmology",
            description:
              "A proposal that our universe is a slice of a larger, higher-dimensional space. Unconfirmed.",
          },
          {
            name: "Kaluza-Klein Theory",
            url: "https://en.wikipedia.org/wiki/Kaluza%E2%80%93Klein_theory",
            description:
              "A 1920s theory extending general relativity to a fifth dimension, in which electromagnetism appears alongside gravity from one geometry. No extra dimension has been observed.",
          },
          {
            name: "Projective Geometry",
            url: "https://en.wikipedia.org/wiki/Projective_geometry",
            description:
              "A branch of geometry studying what stays the same when the point of view changes; parallel lines meet at infinity.",
          },
        ],
      },
      {
        number: 7,
        id: "infinity",
        title: "Infinity",
        canonicalLink: "/#infinity",
        items: [
          {
            name: "Ultraviolet catastrophe",
            url: "https://en.wikipedia.org/wiki/Ultraviolet_catastrophe",
            description:
              "Classical physics predicted infinite radiation from hot objects. The infinity signaled a broken description, and the fix, energy in discrete packets, became the foundation of quantum theory.",
          },
          {
            name: "Riemann Sphere",
            url: "https://en.wikipedia.org/wiki/Riemann_sphere",
            description:
              "An example of how viewing from a higher dimension turns an infinite structure into something finite and observable.",
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
        number: 8,
        id: "black-holes",
        title: "Black Holes",
        canonicalLink: "/#black-holes",
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
              "Space and time come in tiny discrete chunks rather than being smooth, folding infinite structure into finite loops.",
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
        number: 9,
        id: "aliens",
        title: "Aliens",
        canonicalLink: "/#aliens",
        items: [
          {
            name: "Fermi Paradox",
            url: "https://en.wikipedia.org/wiki/Fermi_paradox",
            description:
              "The discrepancy between the lack of evidence for extraterrestrial life and the high likelihood of its existence. Holos reframes this silence through the Integration Hypothesis: advancement favors compact, efficient integration over expansion and broadcast, so maturity coincides with electromagnetic quiet.",
          },
          {
            name: "Nursery Phase",
            url: "#aliens",
            description:
              "The early biological and broadcasting phase of a civilization. Any hurdle (abiogenesis, nuclear war, coordination failure) that stops a civilization before deep integration is an early filter relative to true maturity.",
          },
          {
            name: "Latency Crisis",
            url: "#aliens",
            description:
              "A high-integration intelligence cannot function with years of light-speed lag between star systems. Independent interstellar colonies either fragment into less-capable outposts or the civilization turns inward, deepening local integration instead of expanding.",
          },
          {
            name: "Dark Nodes",
            url: "#the-teeming-dark",
            description:
              "The hypothesized mature state: compact, non-luminous systems built from ordinary matter, a trace population detectable, if at all, by gravity and waste heat rather than light (the Teeming Dark). Not cosmological dark matter, which predates any possible life.",
          },
          {
            name: "Waste-heat SETI (the Ĝ survey)",
            url: "https://arxiv.org/abs/1408.1133",
            description:
              "Wright et al. (2014): infrared searches for civilizations with large energy supplies, built on the principle that waste heat is the one emission technology cannot eliminate. This is the search channel the Teeming Dark aligns with: silent, but warm. A channel, not a fingerprint: warm dark masses are also what failed stars and cooled remnants look like.",
          },
          {
            name: "Ehrenfest argument",
            url: "https://en.wikipedia.org/wiki/Paul_Ehrenfest",
            description:
              "Paul Ehrenfest (1917) showed that in dimensions greater than three, atomic orbitals and inverse-square planetary systems would destabilize. Matter would spiral into nuclei/stars or fly apart. Holos agrees, and goes further: higher dimensions are descriptions, not places. Nothing migrates into them (Axiom 4).",
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
              "John Smart (2011): advanced civilizations migrate to inner space for efficiency. Holos shares the inward-turn conclusion but not the mechanism: no transmutation or dimensional exit is proposed. Mature systems remain ordinary matter that has stopped shining.",
          },
          {
            name: "Cosmological natural selection",
            url: "https://en.wikipedia.org/wiki/Cosmological_natural_selection",
            description:
              "Lee Smolin (1992): universes evolve to create more black holes; black hole collapse may give rise to daughter universes with slightly different constants. Cited as related work in spirit; Holos takes no position on it and proposes no mechanism linking intelligence to black holes.",
          },
          {
            name: "Substrate independence",
            url: "https://en.wikipedia.org/wiki/Substrate_independence",
            description:
              "The view that a mind could run on different kinds of physical material, not just brains. Holos agrees that pattern matters more than material, without claiming minds can run on anything beyond ordinary matter.",
          },
          {
            name: "Dark matter",
            url: "https://en.wikipedia.org/wiki/Dark_matter",
            description:
              "The unexplained &quot;missing mass&quot; holding galaxies together. Holos takes no position on its particle nature and does not identify it with life: its fingerprints in the CMB predate stars, chemistry, and any possible builder. Mature civilizations belong instead to the non-luminous side of ordinary matter.",
          },
          {
            name: "Dyson sphere",
            url: "https://en.wikipedia.org/wiki/Dyson_sphere",
            description:
              "A hypothetical megastructure that would encompass a star to capture its energy. Their absence is consistent with the Integration Hypothesis: mature civilizations concentrate rather than sprawl. But thermodynamics still applies: waste heat, not visible structure, is the unavoidable search target.",
          },
          {
            name: "Brane cosmology",
            url: "https://en.wikipedia.org/wiki/Brane_cosmology",
            description:
              "The idea that our 3D universe may be a thin brane floating in a larger, higher-dimensional space. An intelligence that moved into that larger space would vanish entirely from our view, drawing closer to what Holos frames as the unified source of reality.",
          },
        ],
      },
      {
        number: 10,
        id: "the-teeming-dark",
        title: "The Teeming Dark",
        canonicalLink: "/#the-teeming-dark",
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
        number: 11,
        id: "omega-point",
        title: "The Omega Point",
        canonicalLink: "/#omega-point",
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
          {
            name: "Advaita Vedanta",
            url: "https://en.wikipedia.org/wiki/Advaita_Vedanta",
            description:
              "The nondual school of Indian philosophy holding that there is one experiencer, and that each individual consciousness is that one seen through a local form; a named ancestor of the Holos monist reading.",
          },
          {
            name: "Baruch Spinoza",
            url: "https://en.wikipedia.org/wiki/Baruch_Spinoza",
            description:
              "Philosopher of substance monism: one substance, of which all finite things are modes or expressions.",
          },
          {
            name: "George Berkeley",
            url: "https://en.wikipedia.org/wiki/George_Berkeley",
            description:
              "Idealist philosopher who grounded the persistence of the unobserved world in a perceiver that never looks away.",
          },
        ],
      },
      {
        number: 12,
        id: "why",
        title: "Why Are We Here?",
        canonicalLink: "/#why",
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
              "The universe's fixed speed limit. At light speed, the spacetime gap between events disappears, as if everything happened at one point.",
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
        number: 13,
        id: "holos",
        title: "Holos",
        canonicalLink: "/#holos",
        items: [
          {
            name: "Structural Realism",
            url: "https://en.wikipedia.org/wiki/Structural_realism",
            description:
              "The view that science describes the relationships between things, not what they are made of in themselves.",
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
              "Holos's iteration: each registered history becomes the context for further possibilities. A conceptual tool for recursive closure, not a process unfolding in time.",
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
        number: 14,
        id: "minimal-core",
        title: "Core",
        canonicalLink: "/logic#minimal-core",
        items: [
          {
            name: "Bekenstein Bound",
            url: "https://en.wikipedia.org/wiki/Bekenstein_bound",
            description:
              "An upper limit on the entropy or information that can be contained within a given limited region of space which has a finite amount of energy. It suggests that information is fundamentally tied to the geometry of the universe.",
          },
          {
            name: "Bekenstein, J. (2003)",
            url: "https://www.scientificamerican.com/article/information-in-the-holographic-univ/",
            description: "Information in the holographic universe. Scientific American.",
          },
        ],
      },
      {
        number: 15,
        id: "operational-definition",
        title: "Definition",
        canonicalLink: "/logic#operational-definition",
        items: [
          {
            name: "Integrated Information Theory",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "IIT identifies consciousness with integrated information (Φ). Holos borrows Φ as a measure of integration only; the threshold Φ_c is its own commitment, not IIT's.",
          },
        ],
      },
      {
        number: 16,
        id: "comparison",
        title: "Comparison",
        canonicalLink: "/logic#comparison",
        items: [
          {
            name: "Many-worlds interpretation",
            url: "https://en.wikipedia.org/wiki/Many-worlds_interpretation",
            description:
              "Everett (1957): every possible outcome of a quantum event really happens, in its own branch. Holos agrees all branches exist, but adds that only some are registered as anyone's actual experience.",
          },
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Rovelli (1996): quantum properties are relative to observers; Holos aligns on relational facts and extends with a threshold (Φ ≥ Φ_c) for what counts as an observer.",
          },
          {
            name: "QBism",
            url: "https://en.wikipedia.org/wiki/Quantum_Bayesianism",
            description:
              "Quantum Bayesianism: quantum probabilities are agent-centered beliefs; Holos is ontological (what is lived) rather than epistemic (what agents believe).",
          },
          {
            name: "Copenhagen interpretation",
            url: "https://en.wikipedia.org/wiki/Copenhagen_interpretation",
            description:
              "Classical interpretation with wavefunction collapse; Holos drops collapse entirely: evolution stays unitary, branches remain, and each is registered from within.",
          },
          {
            name: "Objective collapse theories",
            url: "https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics#Objective_collapse_theories",
            description:
              "Theories in which collapse is a physical process; Holos rejects them. A consciousness-linked collapse would falsify Holos outright (the standing bet).",
          },
        ],
      },
      {
        number: 17,
        id: "primitive-definitions",
        title: "Primitives",
        canonicalLink: "/logic#primitive-definitions",
        items: [
          {
            name: "Information",
            url: "https://en.wikipedia.org/wiki/Information",
            description:
              "The differentiation between possible states of a system (the difference that makes a difference).",
          },
          {
            name: "Phase Space",
            url: "https://en.wikipedia.org/wiki/Phase_space",
            description:
              "The space of all possible states of a system. Creation is the space of lawful states and trajectories; Observation registers trajectories from within and selects none.",
          },
          {
            name: "Invariant (physics)",
            url: "https://en.wikipedia.org/wiki/Invariant_(physics)",
            description:
              "Reality is stable relationships, not fixed properties things carry on their own. ⊛ describes what stays constant in that structure, not how it changes over time.",
          },
        ],
      },
      {
        number: 18,
        id: "logic-axioms",
        title: "Axioms",
        canonicalLink: "/logic#logic-axioms",
        items: [
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "The study of what exists. Holos separates structure, which exists whether or not it is lived, from presence, which requires observers.",
          },
          {
            name: "Epistemology",
            url: "https://en.wikipedia.org/wiki/Epistemology",
            description:
              "The study of knowledge and belief. Holos distinguishes epistemic inference (what we know) from ontological presence (what is lived).",
          },
        ],
      },
      {
        number: 19,
        id: "foundational-propositions",
        title: "Foundations",
        canonicalLink: "/logic#foundational-propositions",
        items: [
          {
            name: "Probability Theory",
            url: "https://en.wikipedia.org/wiki/Probability_theory",
            description:
              "⊛ is not probability weighting: the Born weights are structural facts within C, while ⊛ concerns which structures are lived.",
          },
          {
            name: "Wave Function Collapse",
            url: "https://en.wikipedia.org/wiki/Wave_function_collapse",
            description:
              "⊛ is not a physical collapse happening over time. No outcome is picked; each branch is registered from within.",
          },
          {
            name: "Bayesian Inference",
            url: "https://en.wikipedia.org/wiki/Bayesian_inference",
            description:
              "Bayesian updating describes belief revision (epistemic). ⊛ describes how structure becomes present (ontological).",
          },
          {
            name: "Equivalence Relation",
            url: "https://en.wikipedia.org/wiki/Equivalence_relation",
            description:
              "Lived and unlit partition histories into two classes: a structural classification, not a transition between states.",
          },
        ],
      },
      {
        number: 20,
        id: "ontology",
        title: "Ontology",
        canonicalLink: "/logic#ontology",
        items: [
          {
            name: "Aaronson (2014), Why I Am Not An Integrated Information Theorist",
            url: "https://scottaaronson.blog/?p=1799",
            description:
              "Shows that very simple, inert structures can score higher on integration measures than a brain. Holos answers with the aboutness requirement: integrated states must model a world beyond the system.",
          },
          {
            name: "Harnad (1990), The symbol grounding problem",
            url: "https://doi.org/10.1016/0167-2789(90)90087-6",
            description:
              "Physica D: symbols connected only to other symbols are not about anything until some of them ground out in perception. Holos builds this into aboutness: a model must be grounded in senses of the system's own.",
          },
          {
            name: "Friedman et al. (2010), Evidence for neural inertia",
            url: "https://doi.org/10.1371/journal.pone.0011903",
            description:
              "PLoS ONE: in animals, consciousness is lost and regained at different anesthetic levels. A lag of that kind is a hallmark of sharp switches, the signature Holos's threshold predicts.",
          },
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
              "The process by which quantum systems interact with their environment. Decoherence yields classical-looking branches; Φ marks where within them experience occurs.",
          },
        ],
      },
      {
        number: 21,
        id: "relationship-to-physics",
        title: "Relationship to Physics",
        canonicalLink: "/logic#relationship-to-physics",
        items: [
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Quantum mechanics requires unitarity. Holos preserves it fully: nothing collapses, nothing is selected, and unobserved branches remain in Creation as unlit structure.",
          },
          {
            name: "Hilbert Space",
            url: "https://en.wikipedia.org/wiki/Hilbert_space",
            description:
              "The mathematical space of all possible quantum states. Holos deletes no branches from it; the Born weights are structural facts about it.",
          },
          {
            name: "Schrödinger Equation",
            url: "https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation",
            description:
              "Φ does not replace or modify the Schrödinger equation. It marks where experience occurs and leaves the quantum math untouched.",
          },
          {
            name: "Quantum Mechanics",
            url: "https://en.wikipedia.org/wiki/Quantum_mechanics",
            description:
              "Φ preserves the probabilistic nature of quantum mechanics while adding a constraint on when observation registers reality.",
          },
          {
            name: "Born rule",
            url: "https://en.wikipedia.org/wiki/Born_rule",
            description:
              "Max Born (1926): quantum probabilities are squared amplitudes, the most precisely confirmed rule in physics. In Holos the weights are structural facts within C, fixing the statistics each observer records rather than measuring how much experience a branch carries.",
          },
          {
            name: "Gleason's theorem",
            url: "https://en.wikipedia.org/wiki/Gleason%27s_theorem",
            description:
              "Andrew Gleason (1957): any consistent assignment of probabilities to quantum outcomes must take the Born-rule form: exactly one weighting is possible. Its assumptions remain debated; Holos adds no new mathematics.",
          },
          {
            name: "Sebens and Carroll (2018), Self-locating uncertainty and the origin of probability in Everettian quantum mechanics",
            url: "https://doi.org/10.1093/bjps/axw004",
            description:
              "British Journal for the Philosophy of Science: after branching and before looking, an observer is uncertain which branch they are in, and the Born weights are the rational odds. Holos adopts this reading of the weights and reaches it by elimination: counting fails, weight survives.",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "Histories that contain observers are lived; the rest remain unlit structure. The underlying quantum math is unaltered.",
          },
        ],
      },
      {
        number: 22,
        id: "mathematical-formalism",
        title: "Math",
        canonicalLink: "/logic#mathematical-formalism",
        items: [
          {
            name: "Information Theory",
            url: "https://en.wikipedia.org/wiki/Information_theory",
            description:
              "Sending information assumes a causal signal passes between places; ⊛ sends nothing. It concerns which histories are lived, not which signals travel.",
          },
          {
            name: "Measurement in Quantum Mechanics",
            url: "https://en.wikipedia.org/wiki/Measurement_in_quantum_mechanics",
            description:
              "Measurement models the physical interaction between systems; Observation in Holos is registration from within. It selects nothing and alters no interaction.",
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
        number: 23,
        id: "extrapolative-proposition",
        title: "Extrapolation",
        canonicalLink: "/logic#extrapolative-proposition",
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
              "Paul Ehrenfest (1917) showed that in dimensions greater than three, atomic orbitals and inverse-square planetary systems would destabilize. Holos agrees, and goes further: higher dimensions are descriptions, not places. Nothing migrates into them (Axiom 4).",
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
        number: 24,
        id: "prediction-introduction",
        title: "Introduction",
        canonicalLink: "/predictions#prediction-introduction",
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
              "Predictions about how structure becomes present as experience. Observers register the block universe from within; they do not hold it together.",
          },
          {
            name: "Block universe",
            url: "https://en.wikipedia.org/wiki/Block_universe",
            description:
              "The structural layer of Holos: tenseless and observer-independent. Observers register it from within; its consistency does not depend on them.",
          },
          {
            name: "Anthropic principle",
            url: "https://en.wikipedia.org/wiki/Anthropic_principle",
            description:
              "Holos reframes anthropic selection as ontological filtering: observer-free universes may exist as structure but are never lived.",
          },
          {
            name: "Cosmic microwave background (CMB) polarization",
            url: "https://en.wikipedia.org/wiki/Cosmic_microwave_background#Polarization",
            description:
              "CMB-S4, LiteBIRD: looking for signs the universe began highly ordered, with inflation tuned to let complexity grow.",
          },
          {
            name: "Past hypothesis",
            url: "https://en.wikipedia.org/wiki/Past_hypothesis",
            description:
              "The universe began in a highly ordered, low-entropy state. In Holos, branches where nothing could live remain unlit: real as structure, never lived (no Φ).",
          },
          {
            name: "Inflation (cosmology)",
            url: "https://en.wikipedia.org/wiki/Inflation_(cosmology)",
            description: "Cosmic inflation, tuned in a way that let complexity grow later.",
          },
          {
            name: "Multiverse",
            url: "https://en.wikipedia.org/wiki/Multiverse",
            description:
              "Branches where nothing could live are real as structure, but in Holos they are never lived (no Φ).",
          },
        ],
      },
      {
        number: 25,
        id: "commitments",
        title: "Commitments",
        canonicalLink: "/predictions#commitments",
        items: [
          {
            name: "Integrated Information Theory (IIT)",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "Holos borrows Φ as a measure of integration, not IIT's identity claim. Crossing Φ_c is where experience occurs; PCI is a practical proxy.",
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
              "IIT-inspired metric with an empirically calibrated cutoff between conscious and unconscious states. Holos treats it as a proxy for integration, not a detector of presence.",
          },
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "Holos treats the onset of experience as a switch at Φ_c, not a dial. A sharp jump alone would not confirm this, since ordinary models predict tipping points too.",
          },
        ],
      },
      {
        number: 26,
        id: "expectations",
        title: "Expectations",
        canonicalLink: "/predictions#expectations",
        items: [
          {
            name: "Extended Wigner's Friend experiments",
            url: "https://www.science.org/doi/10.1126/sciadv.aaw9832",
            description:
              "Two observers can hold different registered facts about the same event without breaking unitarity. In Holos each fact is indexed to its branch and observer.",
          },
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Conservation of all possibilities; Holos predicts agreement among communicating observers without objective collapse.",
          },
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Holos borrows RQM's point that facts are indexed to observing systems, but sides with branching, which keeps the universal state RQM rejects.",
          },
          {
            name: "Objective collapse theories",
            url: "https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics#Objective_collapse_theories",
            description:
              "Holos rejects objective collapse: evolution is unitary, and apparent collapse is registration within a branch.",
          },
        ],
      },
      {
        number: 27,
        id: "experimentation",
        title: "Testability and Its Limits",
        canonicalLink: "/predictions#experimentation",
        items: [
          {
            name: "Wigner's friend",
            url: "https://en.wikipedia.org/wiki/Wigner%27s_friend",
            description:
              "Registered facts are observer-indexed; no objective collapse. Extended Wigner's-friend experiments constrain the family of views Holos belongs to (Check B).",
          },
          {
            name: "Bong et al. (2020), A strong no-go theorem on the Wigner's friend paradox",
            url: "https://doi.org/10.1038/s41567-020-0990-x",
            description:
              "Nature Physics: the Local Friendliness theorem and its photonic test. Absoluteness of observed events, locality, and freedom of choice cannot all hold; Holos gives up the first.",
          },
          {
            name: "Siclari et al. (2017), The neural correlates of dreaming",
            url: "https://doi.org/10.1038/nn.4545",
            description:
              "Nature Neuroscience: dream reports occur after awakenings from both REM and NREM sleep, tracked by local activity in posterior cortex. The live challenge for Test A.",
          },
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "If the threshold is a genuine critical point, it should leave measurable signatures near the boundary; see A path to the threshold.",
          },
          {
            name: "TMS-EEG",
            url: "https://en.wikipedia.org/wiki/Transcranial_magnetic_stimulation#TMS-EEG",
            description:
              "PCI is computed from TMS-EEG responses; it is the integration proxy Test A relies on.",
          },
          {
            name: "Perturbational Complexity Index (PCI)",
            url: "https://www.science.org/doi/10.1126/scitranslmed.3006294",
            description:
              "Validated across sleep, anesthesia, and disorders of consciousness; Test A uses it to separate integration from responsiveness.",
          },
          {
            name: "Propofol / BIS index",
            url: "https://en.wikipedia.org/wiki/Propofol",
            description:
              "Anesthesia depth: one of the states Test A compares. A drop in integration alone confirms nothing specific to Holos.",
          },
          {
            name: "Recurrent neural network",
            url: "https://en.wikipedia.org/wiki/Recurrent_neural_network",
            description:
              "Recurrent architectures; relevant to whether artificial systems can meet the recursion and integration requirements for observation.",
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
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Holos shares RQM's observer-indexed facts but not its rejection of a universal state; a positive Check B result supports the family, not Holos alone.",
          },
        ],
      },
      {
        number: 28,
        id: "speculation",
        title: "Speculation",
        canonicalLink: "/predictions#speculation",
        items: [
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "Integration advances in sudden jumps, not gradual growth, driven by light-speed delay and the unavoidable cost of waste heat.",
          },
          {
            name: "Ephemeralization",
            url: "https://en.wikipedia.org/wiki/Ephemeralization",
            description:
              "Doing more with less: advancement as inward growth toward higher informational density rather than outward expansion.",
          },
          {
            name: "Fermi paradox",
            url: "https://en.wikipedia.org/wiki/Fermi_paradox",
            description:
              "Holos resolution: the Integration Hypothesis and Visibility Collapse. Mature civilizations are silent in light; the unavoidable observables are gravity and waste heat.",
          },
          {
            name: "Hanson et al. (2021), If loud aliens explain human earliness, quiet aliens are also rare",
            url: "https://doi.org/10.3847/1538-4357/ac2369",
            description:
              "The Astrophysical Journal: the grabby aliens model. Visible, expanding civilizations exist but have not reached us, and we are early. Named on the site as the main rival to the Integration Hypothesis.",
          },
          {
            name: "Griffith et al. (2015), The Ĝ infrared search, III",
            url: "https://doi.org/10.1088/0067-0049/217/2/25",
            description:
              "The Astrophysical Journal Supplement: of about 100,000 galaxies surveyed with WISE, none hosts a civilization reprocessing more than 85% of its starlight into waste heat.",
          },
          {
            name: "Zoo hypothesis",
            url: "https://en.wikipedia.org/wiki/Zoo_hypothesis",
            description:
              "The idea that mature civilizations deliberately leave young ones alone. For Holos, non-contact needs no agreement: leaving a young civilization alone costs nothing, while contact takes effort.",
          },
          {
            name: "Weakly interacting massive particles (WIMPs)",
            url: "https://en.wikipedia.org/wiki/Weakly_interacting_massive_particles",
            description:
              "A leading dark-matter particle candidate. Holos takes no position on the particle nature of cosmological dark matter, which predates life; Dark Nodes are non-luminous ordinary matter.",
          },
          {
            name: "Euclid Mission",
            url: "https://www.euclid-ec.org/",
            description:
              "March 2025 Q1 data: 26M galaxies, precision mass mapping. Compact mass peaks with weak visible counterparts become interesting only after conventional explanations fail, and only alongside an infrared excess.",
          },
          {
            name: "James Webb Space Telescope (JWST)",
            url: "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope",
            description:
              "Deep-field mass structure under active study. For Holos, a candidate Dark Node requires gravity plus faint warmth, not gravity alone.",
          },
          {
            name: "Baryon",
            url: "https://en.wikipedia.org/wiki/Baryon",
            description:
              "Ordinary matter. Dark Nodes remain baryonic: built matter that stops shining, not matter that changes kind. No transmutation is proposed.",
          },
          {
            name: "Navarro–Frenk–White profile",
            url: "https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile",
            description:
              "Halo-profile deviations have viable conventional explanations (baryonic feedback, mergers, measurement limits). Holos claims no dark-matter anomaly.",
          },
          {
            name: "Lambda-CDM model",
            url: "https://en.wikipedia.org/wiki/Lambda-CDM_model",
            description:
              "The standard cosmological model. Holos does not modify it: cosmological dark matter is primordial and predates any possible life.",
          },
          {
            name: "Dark Energy Survey (DES)",
            url: "https://www.darkenergysurvey.org/",
            description:
              "Jan 2026 final analysis: an open clustering tension. Holos offers no interpretation of it.",
          },
          {
            name: "JWST COSMOS-Web",
            url: "https://arxiv.org/abs/2601.17239",
            description:
              "Granular mass structure under study. A Dark Node candidate would need compact mass plus infrared warmth; mass alone is not evidence.",
          },
        ],
      },
      {
        number: 29,
        id: "technology",
        title: "Technology",
        canonicalLink: "/predictions#technology",
        items: [
          {
            name: "Computronium",
            url: "https://en.wikipedia.org/wiki/Computronium",
            description:
              "Hypothetical material optimized for computation; the Computronium Kernel is a maximally compact core for coherent, long-horizon world-modeling.",
          },
          {
            name: "Megastructure",
            url: "https://en.wikipedia.org/wiki/Megastructure",
            description:
              "Large-scale artificial structures; Holos mesostructures (Kernel, Chrono Vault) are compact and coherence-optimized rather than maximally expansive.",
          },
          {
            name: "Gravitational lens",
            url: "https://en.wikipedia.org/wiki/Gravitational_lens",
            description:
              "Bending of light by mass; gravitational-lens observatories use natural lenses for extreme resolution without large radiative infrastructure.",
          },
          {
            name: "Time capsule",
            url: "https://en.wikipedia.org/wiki/Time_capsule",
            description:
              "The Chrono Vault extends this idea to civilizational identity: preserving value systems, decision histories, and continuity across deep time.",
          },
          {
            name: "Interstellar communication",
            url: "https://en.wikipedia.org/wiki/Interstellar_communication",
            description:
              "At cosmic scales, communication converges on phase-coherent optical payloads and compressed, self-describing models rather than real-time dialogue.",
          },
          {
            name: "Space probe",
            url: "https://en.wikipedia.org/wiki/Space_probe",
            description:
              "Sentinel Probes are compact, autonomous, long-duration instruments that resolve observational ambiguities and operate without real-time control.",
          },
        ],
      },
    ],
  },
];

/** Number → anchor id for footnote links. Derived from citationMainSections. */
export const citationAnchorMap = buildNumberToIdMap(citationMainSections);

/** Section id → citation number for Overview (theory) page. */
export const overviewCitationMap: Record<string, number> = (() => {
  const m: Record<string, number> = {};
  const main = citationMainSections.find((s) => s.id === "overview");
  if (main) for (const sub of main.subsections) m[sub.id] = sub.number;
  return m;
})();

/** Section id → citation number for Logic page. */
export const logicCitationMap: Record<string, number> = (() => {
  const m: Record<string, number> = {};
  const main = citationMainSections.find((s) => s.id === "logic");
  if (main) for (const sub of main.subsections) m[sub.id] = sub.number;
  return m;
})();

/** Section id → citation number for Predictions page. */
export const predictionsCitationMap: Record<string, number> = (() => {
  const m: Record<string, number> = {};
  const main = citationMainSections.find((s) => s.id === "predictions");
  if (main) for (const sub of main.subsections) m[sub.id] = sub.number;
  return m;
})();

export function FootnoteLink({ number, className }: { number: number; className?: string }) {
  const anchorId = citationAnchorMap[number] ?? "why";
  return (
    <a
      className={`pl-0.5 pr-2 underline-offset-0 text-base opacity-80 hover:opacity-100 ${className}`}
      href={`/citations#${anchorId}`}
    >
      <sup>{number}</sup>
    </a>
  );
}
