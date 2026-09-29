export interface CitationItem {
  name: string;
  url: string;
  description: string;
}

export interface CitationSubsection {
  number: number;
  id: string;
  title: string;
  /** Canonical link to the corresponding section on the site (e.g. /#consciousness, /logic#minimal-core). */
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
            name: "Holos",
            url: "#introduction",
            description:
              "The framework, and the relation it is named for: lawful possibility composed with registration (R = C ⊛ O), marking where structure is lived.",
          },
        ],
      },
      {
        number: 2,
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
        number: 3,
        id: "spacetime",
        title: "Spacetime",
        canonicalLink: "/#spacetime",
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
          {
            name: "Eternalism",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)",
            description:
              "Time as an unchanging four-dimensional block in which all moments exist tenselessly, none privileged as now.",
          },
          {
            name: "Block Universe Model",
            url: "https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe",
            description:
              "The view that past, present, and future exist together as one four-dimensional block. All events are fixed in spacetime; nothing, consciousness included, moves through it.",
          },
          {
            name: "Relativity of Simultaneity",
            url: "https://en.wikipedia.org/wiki/Relativity_of_simultaneity",
            description:
              "Whether two spatially separated events occur at the same time depends on the observer.",
          },
          {
            name: "Light Cone",
            url: "https://en.wikipedia.org/wiki/Light_cone",
            description:
              "The boundary of all possible paths that light can take from a given event, defining the causal structure of spacetime.",
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
          {
            name: "Observer Effect",
            url: "https://en.wikipedia.org/wiki/Observer_effect_(physics)",
            description:
              "The disturbance of a system by the physical act of measuring it. Holos denies any further, consciousness-linked disturbance: observation changes no physics.",
          },
          {
            name: "Copenhagen Interpretation",
            url: "https://en.wikipedia.org/wiki/Copenhagen_interpretation",
            description:
              "Observation collapses the wavefunction into a definite state. Holos without collapse, the version defended here, rejects it: evolution stays unitary, and branches with observers are lived from within.",
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
            name: "Von Neumann-Wigner Interpretation",
            url: "https://en.wikipedia.org/wiki/Von_Neumann%E2%80%93Wigner_interpretation",
            description:
              "Consciousness causes collapse. The view Holos bets against: a consciousness-linked deviation would falsify Holos without collapse, leaving Holos with collapse, which shares its core (the standing bet).",
          },
        ],
      },
      {
        number: 4,
        id: "infinity",
        title: "Infinity",
        canonicalLink: "/#infinity",
        items: [
          {
            name: "Gravitational singularity",
            url: "https://en.wikipedia.org/wiki/Gravitational_singularity",
            description:
              "Where general relativity predicts infinite density. Most physicists read it as the place the theory stops working, the same lesson as the ultraviolet catastrophe.",
          },
          {
            name: "Projective Geometry",
            url: "https://en.wikipedia.org/wiki/Projective_geometry",
            description:
              "A branch of geometry studying what stays the same when the point of view changes; parallel lines meet at infinity.",
          },
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
              "The plane plus one point at infinity, closing an unbounded surface into a finite sphere.",
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
        number: 5,
        id: "omega-point",
        title: "Omega",
        canonicalLink: "/#omega-point",
        items: [
          {
            name: "Everett (1957), Relative state formulation of quantum mechanics",
            url: "https://doi.org/10.1103/RevModPhys.29.454",
            description:
              "Reviews of Modern Physics: the origin of the universal wave function. Physically, Holos's Omega is this one universal quantum state.",
          },
          {
            name: "Everett's relative-state formulation (Stanford Encyclopedia of Philosophy)",
            url: "https://plato.stanford.edu/entries/qm-everett/",
            description: "Reference overview of Everett's theory and its interpretations.",
          },
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
              "A future event in which the entirety of the universe spirals toward a final point of unification. Holos borrows the name, not the idea: its Omega is the whole, not an endpoint.",
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
          {
            name: "Open individualism",
            url: "https://en.wikipedia.org/wiki/Open_individualism",
            description:
              "Daniel Kolak (I Am You, 2004): there is one person, and every one of us is it. The nearest modern relative of the Holos monist reading. Its price: every observer's future experience is yours to anticipate; its payoff: self-interest and concern for others coincide.",
          },
          {
            name: "Vertiginous question",
            url: "https://en.wikipedia.org/wiki/Vertiginous_question",
            description:
              'Why, of all the subjects there are, am I this one? Some call it a brute fact; indexical accounts say nothing needs explaining because "I" picks out the asker; on the Holos monist reading nothing needs explaining because the one subject is each.',
          },
          {
            name: "Perry (1979), The problem of the essential indexical",
            url: "https://doi.org/10.2307/2214792",
            description:
              'Noûs: the classic account of "I", "here", and "now" as words that pick out the speaker\'s own position. The strongest rival reply to the vertiginous question, stated on the site beside the monist one.',
          },
          {
            name: "Teletransportation paradox",
            url: "https://en.wikipedia.org/wiki/Teletransportation_paradox",
            description:
              "Parfit's duplication puzzle: if two perfect copies of you are made, which is you? On the Holos monist reading, both, with no remainder. Parfit's own answer: identity is not what matters.",
          },
          {
            name: "Parfit (1984), Reasons and Persons",
            url: "https://doi.org/10.1093/019824908X.001.0001",
            description:
              "Oxford University Press: argues that identity is not what matters in survival, and that seeing this weakens the line between self-interest and concern for others. A route to impartial concern without one subject, which is why the Holos payoff is not unique.",
          },
        ],
      },
      {
        number: 6,
        id: "aliens",
        title: "Aliens",
        canonicalLink: "/#aliens",
        items: [
          {
            name: "Rare Earth hypothesis",
            url: "https://en.wikipedia.org/wiki/Rare_Earth_hypothesis",
            description:
              "Complex life is rare, so the silence is literal emptiness. A column in the Fermi comparison table.",
          },
          {
            name: "Great Filter",
            url: "https://en.wikipedia.org/wiki/Great_Filter",
            description:
              "Robin Hanson: some step stops almost every civilization before it spreads. A column in the Fermi comparison table.",
          },
          {
            name: "Aestivation hypothesis",
            url: "https://en.wikipedia.org/wiki/Aestivation_hypothesis",
            description:
              "Civilizations sleep until the universe cools, when computing is cheaper. A column in the Fermi comparison table; contested by Bennett, Hanson, and Riedel (2019).",
          },
          {
            name: "Carroll-Nellenback et al. (2019), The Fermi paradox and the Aurora effect",
            url: "https://doi.org/10.3847/1538-3881/ab31a3",
            description:
              "The Astronomical Journal: models galactic settlement with finite probe speeds and settlement lifetimes. Whether the galaxy fills or stays patchy turns on those rates, the setting in which the Integration Hypothesis's bet about motives becomes numbers.",
          },
          {
            name: "Jevons paradox",
            url: "https://en.wikipedia.org/wiki/Jevons_paradox",
            description:
              "Efficiency gains tend to raise total consumption. The objection to the Integration Hypothesis; its answer is that light-speed delay caps one mind's useful size, so growth becomes more compact nodes near home, harvesting the home star.",
          },
          {
            name: "Project Hephaistos",
            url: "https://www.astro.uu.se/~ez/hephaistos/hephaistos.html",
            description:
              "Uppsala-led search for waste heat from partial Dyson spheres around individual stars: the star-by-star channel the Integration Hypothesis points to.",
          },
          {
            name: "Suazo et al. (2024), Project Hephaistos II: Dyson sphere candidates from Gaia DR3, 2MASS, and WISE",
            url: "https://doi.org/10.1093/mnras/stae1186",
            description:
              "Monthly Notices of the Royal Astronomical Society: about five million stars searched; seven M-dwarf candidates with unexplained infrared excess.",
          },
          {
            name: "Zackrisson et al. (2026), Project Hephaistos IV: JWST observations of two Dyson sphere candidates",
            url: "https://arxiv.org/abs/2607.09460",
            description:
              "Preprint, not yet peer reviewed: JWST traces the infrared excess of two candidates to background galaxies.",
          },
          {
            name: "Korn et al. (2026), Project Hephaistos III: characterizing anomalous infrared sources",
            url: "https://arxiv.org/abs/2607.25701",
            description:
              "Preprint, not yet peer reviewed: no clear explanation yet for the remaining candidates; dust or background galaxies remain possible.",
          },
          {
            name: "Gaia Data Release 4",
            url: "https://www.cosmos.esa.int/web/gaia/data-release-4",
            description:
              "ESA, due 2 December 2026: the next star-by-star census, extending the base for waste-heat searches around individual stars.",
          },
          {
            name: "Fermi Paradox",
            url: "https://en.wikipedia.org/wiki/Fermi_paradox",
            description:
              "The discrepancy between the lack of evidence for extraterrestrial life and the high likelihood of its existence. The Integration Hypothesis, a companion to Holos, reframes this silence: advancement favors compact, efficient integration over expansion and broadcast, so maturity coincides with electromagnetic quiet.",
          },
          {
            name: "Early broadcasting phase",
            url: "#aliens",
            description:
              "The early biological and broadcasting phase of a civilization. Any hurdle (abiogenesis, nuclear war, coordination failure) that stops a civilization before deep integration is an early filter relative to true maturity.",
          },
          {
            name: "Light-speed latency",
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
            name: "Ephemeralization",
            url: "https://en.wikipedia.org/wiki/Ephemeralization",
            description:
              "R. Buckminster Fuller (1938): the process of doing &quot;more and more with less and less&quot; until intelligence can &quot;do everything with nothing&quot;. The Integration Hypothesis extends this to civilizations turning inward; Fuller did not.",
          },
          {
            name: "The Transcension Hypothesis",
            url: "https://www.accelerating.org/articles/transcensionhypothesis",
            description:
              "John Smart (2011): advanced civilizations migrate to inner space for efficiency. Holos shares the inward-turn conclusion. Mature systems remain ordinary matter that has stopped shining.",
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
        ],
      },
      {
        number: 7,
        id: "the-teeming-dark",
        title: "The Teeming Dark",
        canonicalLink: "/#the-teeming-dark",
        items: [
          {
            name: "Black hole",
            url: "https://en.wikipedia.org/wiki/Black_hole",
            description:
              "A limited precedent for the Teeming Dark: the most compact masses need not shine and are found by gravity alone. The precedent is about compactness, not integration.",
          },
          {
            name: "Massive compact halo object (MACHO)",
            url: "https://en.wikipedia.org/wiki/Massive_compact_halo_object",
            description:
              "Microlensing surveys watched millions of stars for dark compact masses and found too few to make up a large hidden population. Dark Nodes can only be a trace population.",
          },
          {
            name: "Missing baryon problem",
            url: "https://en.wikipedia.org/wiki/Missing_baryon_problem",
            description:
              "Surveys have now located nearly all the ordinary matter the early universe records, leaving little room for hidden built structures.",
          },
          {
            name: "Landauer (1961), Irreversibility and heat generation in the computing process",
            url: "https://doi.org/10.1147/rd.53.0183",
            description:
              "IBM Journal of Research and Development: erasing information has an unavoidable heat cost. Long-running computers must correct errors, which means erasing, so they shed heat, though careful designs can keep the cost small.",
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
              "Ordinary matter. Dark Nodes remain baryonic: built matter that stops shining.",
          },
        ],
      },
      {
        number: 8,
        id: "why",
        title: "Why Are We Here?",
        canonicalLink: "/#why",
        items: [
          {
            name: "Quantum entanglement",
            url: "https://en.wikipedia.org/wiki/Quantum_entanglement",
            description:
              "Particles whose joint state cannot be split into separate states, however far apart they are. The strongest physical hint behind the section's bold reading that separation is not fundamental.",
          },
          {
            name: "Holism and nonseparability in physics (Stanford Encyclopedia of Philosophy)",
            url: "https://plato.stanford.edu/entries/physics-holism/",
            description:
              "Reference overview of the view that entangled systems are not composed of independently existing parts. Holos goes one step further and takes that oneness as more basic than the separations.",
          },
          {
            name: "Participatory Anthropic Principle",
            url: "https://en.wikipedia.org/wiki/Anthropic_principle",
            description:
              'The universe, as a condition of its existence, must be observed. As a "self-excited circuit", the universe requires one or more observers to bring its laws into existence.',
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
        number: 9,
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
              "The space of all possible states of a system. Creation is what physics actually produces in that space, every branch of the one quantum state; Observation registers from within, where observers exist, and selects none.",
          },
          {
            name: "Invariant (physics)",
            url: "https://en.wikipedia.org/wiki/Invariant_(physics)",
            description:
              "Reality is stable relationships, not fixed properties things carry on their own. ⊛ concerns where that structure is lived, not how it changes over time.",
          },
        ],
      },
      {
        number: 10,
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
        number: 11,
        id: "foundational-propositions",
        title: "Foundations",
        canonicalLink: "/logic#foundational-propositions",
        items: [
          {
            name: "Flatland",
            url: "https://en.wikipedia.org/wiki/Flatland",
            description:
              "Edwin Abbott (1884): a sphere passing through a flat world appears to its inhabitants as a changing circle, an event in time; from three dimensions it is one whole. The picture behind Proposition IV: each higher description closes what a lower one leaves open.",
          },
          {
            name: "Ney and Albert, eds. (2013), The Wave Function: Essays on the Metaphysics of Quantum Mechanics",
            url: "https://doi.org/10.1093/acprof:oso/9780199790807.001.0001",
            description:
              "Oxford University Press: essays on wave-function realism, the view that the vast space where the quantum state lives is the most real level. One of the higher descriptions in Proposition IV; Holos does not depend on the view.",
          },
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
              "⊛ is not a physical collapse happening over time. No outcome is picked; each branch with an observer is lived from within.",
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
              "Lit and unlit partition spacetime into two classes: a structural classification, not a transition between states.",
          },
        ],
      },
      {
        number: 12,
        id: "ontology",
        title: "Threshold",
        canonicalLink: "/logic#ontology",
        items: [
          {
            name: "Integrated Information Theory",
            url: "https://en.wikipedia.org/wiki/Integrated_information_theory",
            description:
              "IIT identifies consciousness with integrated information (Φ). Holos borrows Φ as a measure of integration only; the threshold Φ_c is its own commitment, not IIT's.",
          },
          {
            name: "Percolation threshold",
            url: "https://en.wikipedia.org/wiki/Percolation_threshold",
            description:
              "A threshold fixed by structure alone: in a large square grid of randomly open bonds, a path first spans the grid at exactly half open, whatever the grid is made of. The Holos image for a threshold fixed by structure, true in every possible world, not a contingent constant of nature. In any finite grid the crossing point wanders around its center, a twilight that shrinks as the grid grows.",
          },
          {
            name: "Beggs and Plenz (2003), Neuronal avalanches in neocortical circuits",
            url: "https://doi.org/10.1523/JNEUROSCI.23-35-11167.2003",
            description:
              "Journal of Neuroscience: cascades of cortical activity follow power laws whose exponents match a known universality class. Measured at the operating point; evidence about the threshold needs the same kind of measurement at the boundary itself.",
          },
          {
            name: "Curie temperature",
            url: "https://en.wikipedia.org/wiki/Curie_temperature",
            description:
              "Bulk iron gains magnetism of its own below a critical temperature, growing smoothly from zero. The switch is exactly sharp only in the large-size limit; small samples round off over a range of temperatures. The Overview's model for the threshold: a steep onset with a narrow twilight, then graded richness.",
          },
          {
            name: "Giacino et al. (2002), The minimally conscious state",
            url: "https://doi.org/10.1212/wnl.58.3.349",
            description:
              "Neurology: defines a clinical category between the vegetative state and full awareness. Medicine's own evidence that the edge of consciousness has a twilight, not a line.",
          },
          {
            name: "Toker et al. (2022), Consciousness is supported by near-critical slow cortical electrodynamics",
            url: "https://doi.org/10.1073/pnas.2024455119",
            description:
              "PNAS: waking cortex runs near the edge between stability and chaos; anesthesia and generalized seizures move it away, psychedelics move it closer. A critical point at the center of conscious life, where variety peaks, not evidence that crossing the threshold is itself a critical transition.",
          },
          {
            name: "Critical dynamics in spontaneous EEG predict anesthetic-induced loss of consciousness and perturbational complexity (2024)",
            url: "https://doi.org/10.1038/s42003-024-06613-8",
            description:
              "Communications Biology: criticality measures in resting EEG predict anesthetic loss of consciousness and track PCI. Like Toker et al., it measures distance from the operating point, not the threshold.",
          },
          {
            name: "Meisel et al. (2012), Failure of adaptive self-organized criticality during epileptic seizure attacks",
            url: "https://doi.org/10.1371/journal.pcbi.1002312",
            description:
              "PLOS Computational Biology: during seizures, cortical activity departs from criticality toward hypersynchrony. Joined but not varied: the differentiation requirement fails.",
          },
          {
            name: "Warnaby et al. (2017), A signature of neural inertia in humans",
            url: "https://doi.org/10.1097/ALN.0000000000001759",
            description:
              "Anesthesiology: in 393 surgical patients, slow-wave activity differed between induction and emergence. The lag appeared in the EEG, not in responsiveness, so the human evidence is suggestive.",
          },
          {
            name: "COGITATE Consortium (2025), Adversarial testing of global neuronal workspace and integrated information theories",
            url: "https://doi.org/10.1038/s41586-025-08888-1",
            description:
              "Nature: a preregistered adversarial collaboration whose results challenged key claims of both theories. The model design for Test A.",
          },
          {
            name: "What makes a theory of consciousness unscientific? (2025)",
            url: "https://doi.org/10.1038/s41593-025-01881-x",
            description:
              "Nature Neuroscience: argues that IIT's core identity claim is untestable. Holos does not adopt that claim and borrows Φ only as a measure.",
          },
          {
            name: "Aaronson (2014), Why I Am Not An Integrated Information Theorist",
            url: "https://scottaaronson.blog/?p=1799",
            description:
              "Shows that very simple, inert structures can score higher on integration measures than a brain. Holos answers with the aboutness requirement: an observer's states must carry a model of a world. Wiring a sensor into every gate of such an array lets the world set it, but it still models nothing.",
          },
          {
            name: "Harnad (1990), The symbol grounding problem",
            url: "https://doi.org/10.1016/0167-2789(90)90087-6",
            description:
              "Physica D: symbols connected only to other symbols are not about anything until some of them ground out in perception. Holos reads it structurally: a system is about something when its states carry a model of it, whatever channel built the model.",
          },
          {
            name: "Clark (2013), Whatever next? Predictive brains, situated agents, and the future of cognitive science",
            url: "https://doi.org/10.1017/S0140525X12000477",
            description:
              "Behavioral and Brain Sciences: brains as systems that model the causes of their input. The source of the notion of a model in Holos's aboutness requirement, borrowed without predictive processing's theory of consciousness. A dream is the model running on its own.",
          },
          {
            name: "Li et al. (2023), Emergent world representations",
            url: "https://arxiv.org/abs/2210.13382",
            description:
              "ICLR 2023: a sequence model trained only on game move lists builds an internal model of the board. Evidence that systems trained on text-like input can carry models of a world, the reason current AI arguably meets aboutness.",
          },
          {
            name: "Friedman et al. (2010), Evidence for neural inertia",
            url: "https://doi.org/10.1371/journal.pone.0011903",
            description:
              "PLoS ONE: in animals, consciousness is lost and regained at different anesthetic levels. Such a lag marks an abrupt, first-order switch: it fits the transition hypothesis, unless it is pharmacological or belongs to the arousal switch (see Joiner et al. 2013). Human evidence is still suggestive.",
          },
          {
            name: "Joiner et al. (2013), Genetic and anatomical basis of the barrier separating wakefulness and anesthetic-induced unresponsiveness",
            url: "https://doi.org/10.1371/journal.pgen.1003605",
            description:
              "PLoS Genetics: in flies, neural inertia depends on genes tied to sleep regulation, and single mutations collapse it. The lag may belong to the arousal switch rather than to integration.",
          },
          {
            name: "Kuizenga et al. (2018), Test of neural inertia in humans during general anaesthesia",
            url: "https://doi.org/10.1016/j.bja.2017.11.072",
            description:
              "British Journal of Anaesthesia: 36 volunteers; no lag between induction and recovery with propofol, a lag with sevoflurane for some endpoints. Human evidence for an abrupt switch is mixed.",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "The study of what exists. Holos separates structure, real whether or not it is lived, from experience, which occurs only where Φ ≥ Φ_c.",
          },
          {
            name: "Causality",
            url: "https://en.wikipedia.org/wiki/Causality",
            description:
              "How events bring about other events. In Holos, observation causes nothing extra: experience is the inside of physical causation, not an added cause.",
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
        number: 13,
        id: "relationship-to-physics",
        title: "Relationship to Physics",
        canonicalLink: "/logic#relationship-to-physics",
        items: [
          {
            name: "Unitarity (physics)",
            url: "https://en.wikipedia.org/wiki/Unitarity_(physics)",
            description:
              "Unitary evolution never collapses. Holos without collapse, the version defended here, preserves it fully: nothing collapses, nothing is selected, and unobserved branches remain in Creation as unlit structure.",
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
              "Holos leaves quantum mechanics untouched. Φ marks where registration occurs; it adds no constraint to the physics.",
          },
          {
            name: "Born rule",
            url: "https://en.wikipedia.org/wiki/Born_rule",
            description:
              "Max Born (1926): quantum probabilities are squared amplitudes, the most precisely confirmed rule in physics. In Holos the weights are structural facts within C, setting each observer's odds rather than measuring how much experience a branch carries. Almost all of the weight, not every observer, sees Born statistics.",
          },
          {
            name: "Gleason's theorem",
            url: "https://en.wikipedia.org/wiki/Gleason%27s_theorem",
            description:
              "Andrew Gleason (1957): given its assumptions, any consistent assignment of probabilities to measurement outcomes takes the Born-rule form. It constrains the odds but does not by itself say how an observer inside a branch should set them; Holos adds no new mathematics.",
          },
          {
            name: "Sebens and Carroll (2018), Self-locating uncertainty and the origin of probability in Everettian quantum mechanics",
            url: "https://doi.org/10.1093/bjps/axw004",
            description:
              "British Journal for the Philosophy of Science: after branching and before looking, an observer is uncertain which branch they are in, and the Born weights are the rational odds. Holos adopts this reading: counting fails, weight is the measure physics supplies, and the last step is their epistemic separability principle, widely discussed and still debated.",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "Experience is lived only inside observers; the causal pasts they draw on are lit; the rest remains unlit structure. The underlying quantum math is unaltered.",
          },
        ],
      },
      {
        number: 14,
        id: "mathematical-formalism",
        title: "Notation",
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
        number: 15,
        id: "comparison",
        title: "Comparison",
        canonicalLink: "/logic#comparison",
        items: [
          {
            name: "Goff (2017), Consciousness and Fundamental Reality",
            url: "https://doi.org/10.1093/oso/9780190677015.001.0001",
            description:
              "Oxford University Press: the case for priority cosmopsychism, a conscious cosmos from which individual minds derive. Holos shares the single ground but denies the cosmos any pooled experience of its own.",
          },
          {
            name: "Nagasawa and Wager (2016), Panpsychism and priority cosmopsychism",
            url: "https://doi.org/10.1093/acprof:oso/9780199359943.003.0005",
            description:
              "Sets out priority cosmopsychism and the decomposition problem it faces: how one cosmic subject yields many individual ones. Holos's section on walled-off perspectives answers the same problem.",
          },
          {
            name: "Russellian monism",
            url: "https://en.wikipedia.org/wiki/Russellian_monism",
            description:
              "Physics describes structure; experience is the intrinsic nature of that structure. Holos agrees experience is the inside of physical activity, but only above the threshold.",
          },
          {
            name: "Dual-aspect monism",
            url: "https://en.wikipedia.org/wiki/Dual-aspect_monism",
            description:
              "Mind and matter as two aspects of one underlying reality, from Spinoza to the present. The modern family of Axiom 4. Holos is a two-sided monism with a threshold: the two sides appear only above it.",
          },
          {
            name: "Physicalism (Stanford Encyclopedia of Philosophy)",
            url: "https://plato.stanford.edu/entries/physicalism/",
            description:
              "The view that everything is physical, with the mental grounded in the physical. Holos agrees physics fixes every fact, so copies match in every possible world, but holds that neither side of an observer's activity is grounded in the other. Some will still classify it as physicalism; the site says why it does not.",
          },
          {
            name: "Phenomenal concept strategy",
            url: "https://en.wikipedia.org/wiki/Phenomenal_concept_strategy",
            description:
              "The explanatory gap lies between two ways of describing one thing, not between two things. Axiom 4's floor-plan argument is a version of it.",
          },
          {
            name: "Antony (2006), Vagueness and the metaphysics of consciousness",
            url: "https://doi.org/10.1007/s11098-004-7488-8",
            description:
              "Philosophical Studies: consciousness cannot be vague. Most who accept the argument conclude panpsychism; the rest posit an exact cutoff. Holos rejects the premise and accepts a narrow twilight between clear cases.",
          },
          {
            name: "Schwitzgebel (2023), Borderline consciousness",
            url: "https://doi.org/10.1007/s11098-023-02042-1",
            description:
              "Philosophical Studies: argues that borderline cases of experience are coherent. They cannot be pictured from the inside, since picturing an experience makes it definite, but that limits imagination, not reality. The reply Holos gives to the no-vagueness argument.",
          },
          {
            name: "Rosenberg (2004), A Place for Consciousness",
            url: "https://doi.org/10.1093/acprof:oso/9780195168143.001.0001",
            description:
              "Oxford University Press: poses the boundary problem, what fixes where one subject ends. Holos answers with its maximality condition: one peak of integration, one perspective.",
          },
          {
            name: "Global workspace theory",
            url: "https://en.wikipedia.org/wiki/Global_workspace_theory",
            description:
              "Conscious access as brain-wide broadcast. A column in the Holos theories-of-mind table.",
          },
          {
            name: "Illusionism",
            url: "https://en.wikipedia.org/wiki/Illusionism_(philosophy)",
            description:
              "Experience as usually conceived does not exist. A column in the Holos theories-of-mind table; Holos rejects it.",
          },
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
              "Rovelli (1996): quantum properties are relative to observers; Holos aligns on relational facts, but keeps the universal state RQM rejects, and adds a threshold (Φ ≥ Φ_c) for what counts as an observer.",
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
              "Classical interpretation with wavefunction collapse; Holos without collapse, the version defended here, drops it: evolution stays unitary, branches remain, and those with observers are lived from within.",
          },
          {
            name: "Objective collapse theories",
            url: "https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics#Objective_collapse_theories",
            description:
              "Theories in which collapse is a physical process; Holos without collapse rejects them. A consciousness-linked collapse would falsify that version and leave Holos with collapse, declared in advance, with the threshold as the collapse point (the standing bet).",
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
        number: 16,
        id: "prediction-introduction",
        title: "Introduction",
        canonicalLink: "/predictions#prediction-introduction",
        items: [
          {
            name: "Dynamics (physics)",
            url: "https://en.wikipedia.org/wiki/Dynamics_(physics)",
            description:
              "Holos does not propose new dynamical laws; it makes structural claims about how reality becomes lived (R = C ⊛ O).",
          },
          {
            name: "Ontology",
            url: "https://en.wikipedia.org/wiki/Ontology",
            description:
              "Predictions about where structure is lived. Observers register the block universe from within; they do not hold it together.",
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
              "Holos keeps what exists apart from where it is lived: observer-free universes or branches are real as structure but never lived, and nothing is selected or filtered.",
          },
          {
            name: "Multiverse",
            url: "https://en.wikipedia.org/wiki/Multiverse",
            description:
              "Branches where nothing could live are real as structure, but in Holos they are never lived (no system reaches Φ_c).",
          },
        ],
      },
      {
        number: 17,
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
              "The view that consciousness is an illusion. Holos rejects it: experience is the one fact the framework starts from.",
          },
          {
            name: "Qualia",
            url: "https://en.wikipedia.org/wiki/Qualia",
            description:
              "The felt character of experience. Holos locates qualia in systems that meet the observer requirements; below Φ_c there is processing without experience.",
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
              "Holos hypothesizes that the onset of experience is a genuine transition, steep but with a narrow twilight in any finite system. A steep change alone would not confirm this, since ordinary models predict tipping points too.",
          },
        ],
      },
      {
        number: 18,
        id: "experimentation",
        title: "Testability and Its Limits",
        canonicalLink: "/predictions#experimentation",
        items: [
          {
            name: "Chalmers and McQueen (2022), Consciousness and the collapse of the wave function",
            url: "https://arxiv.org/abs/2105.02314",
            description:
              "The named rival to the standing bet: integrated consciousness collapses the wave function, testable in principle on quantum computers. Holos bets it does not.",
          },
          {
            name: "Wiseman, Cavalcanti, and Rieffel (2023), A thoughtful Local Friendliness no-go theorem",
            url: "https://doi.org/10.22331/q-2023-09-14-1112",
            description:
              "Quantum: proposes a human-level AI on a quantum computer as the friend, the road toward a genuine observer in Check C.",
          },
          {
            name: "Laux and Cavalcanti (2026), Extended Wigner's friend scenarios with agent-like observers on quantum computers",
            url: "https://arxiv.org/abs/2609.12527",
            description:
              "Preprint, not yet peer reviewed: agent-like observers on IBM hardware; Local Friendliness violations persist. The agents are far below Φ_c.",
          },
          {
            name: "Pedalino et al. (2026), Probing quantum mechanics with nanoparticle matter-wave interferometry",
            url: "https://doi.org/10.1038/s41586-025-09917-9",
            description:
              "Nature: quantum interference of sodium clusters of more than 7,000 atoms, the current size record.",
          },
          {
            name: "Donadi et al. (2021), Underground test of gravity-related wave function collapse",
            url: "https://doi.org/10.1038/s41567-020-1008-4",
            description:
              "Nature Physics: rules out the parameter-free Diósi-Penrose collapse model.",
          },
          {
            name: "Wigner's friend",
            url: "https://en.wikipedia.org/wiki/Wigner%27s_friend",
            description:
              "Registered facts are observer-indexed; no objective collapse. Extended Wigner's-friend experiments constrain the family of views Holos belongs to (Check C).",
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
              "Nature Neuroscience: dream reports occur after awakenings from both REM and NREM sleep, tracked by local activity in posterior cortex. The reason Test A's second gauge is local; adopted after these data, so they cannot count in Holos's favor.",
          },
          {
            name: "Nieminen et al. (2016), Consciousness and cortical responsiveness: a within-state study during non-rapid eye movement sleep",
            url: "https://doi.org/10.1038/srep30932",
            description:
              "Scientific Reports: TMS-EEG just before awakening from NREM sleep. Responses looked more like the unconscious pattern when subjects reported nothing, and shorter dream reports went with more of it. Within-state evidence with tight timing.",
          },
          {
            name: "Bajwa et al. (2025), A repeated awakening study exploring the capacity of complexity measures to capture dreaming during propofol sedation",
            url: "https://doi.org/10.1038/s41598-025-12695-z",
            description:
              "Scientific Reports: 20 participants, deep propofol sedation; 24 of 29 interpretable awakenings reported experience. PCIst and Lempel-Ziv complexity fell from waking but did not differ with or without experience. The nearest test yet; limited by windows ending a minute before waking and only five no-experience reports.",
          },
          {
            name: "Radek et al. (2018), Dreaming and awareness during dexmedetomidine- and propofol-induced unresponsiveness",
            url: "https://doi.org/10.1016/j.bja.2018.03.014",
            description:
              "British Journal of Anaesthesia: 84% of interviews included experiences from unresponsive periods, mostly dreams. Anesthetic unresponsiveness is not the same as absent experience.",
          },
          {
            name: "Aamodt et al. (2022), EEG Lempel-Ziv complexity varies with sleep stage, but does not seem to track dream experience",
            url: "https://doi.org/10.3389/fnhum.2022.987714",
            description:
              "Frontiers in Human Neuroscience: spontaneous-EEG complexity fell with sleep depth but did not separate dream from non-dream awakenings within NREM2. A caution for spontaneous gauges.",
          },
          {
            name: "Wong et al. (2025), A dream EEG and mentation database",
            url: "https://doi.org/10.1038/s41467-025-61945-1",
            description:
              "Nature Communications: 20 datasets, 505 participants, 2,643 awakenings of sleep EEG with standardized dream reports. Usable for Test A's calibration step; it lacks the stimulation PCI needs.",
          },
          {
            name: "Bodien et al. (2024), Cognitive motor dissociation in disorders of consciousness",
            url: "https://doi.org/10.1056/NEJMoa2400645",
            description:
              "New England Journal of Medicine: 60 of 241 behaviorally unresponsive patients (25%) performed cognitive tasks on fMRI or EEG. Covert awareness, one of Test A's held-out states.",
          },
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "If crossing the threshold is a genuine transition, sudden or continuous, it should leave measurable signatures near the boundary; see A path to the threshold.",
          },
          {
            name: "Casarotto et al. (2016), Stratification of unresponsive patients by an independently validated index of brain complexity",
            url: "https://doi.org/10.1002/ana.24779",
            description:
              "Annals of Neurology: sets PCI's cutoff, 0.31, on a benchmark of states known from report, including REM dreaming and ketamine. That cutoff is Test A's primary gauge; the benchmark cases are calibration, not confirmation, and Test A counts only held-out states named in advance.",
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
              "Recurrent architectures; relevant to whether artificial systems have the feedback that integration requires.",
          },
          {
            name: "Neuromorphic engineering",
            url: "https://en.wikipedia.org/wiki/Neuromorphic_engineering",
            description:
              "Brain-like hardware with feedback; a candidate substrate for meeting the observer requirements.",
          },
          {
            name: "Causal density",
            url: "https://en.wikipedia.org/wiki/Causal_density",
            description:
              "Integration proxy: how much a network's parts predict one another's activity over time, used when computing Φ directly is infeasible.",
          },
          {
            name: "Collective intelligence",
            url: "https://en.wikipedia.org/wiki/Collective_intelligence",
            description:
              "Social and agent networks. Whether group-scale apertures can form is left open: Holos neither asserts nor excludes them.",
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
              "Small-world and scale-free structure; candidate settings for measuring integration.",
          },
          {
            name: "Relational quantum mechanics",
            url: "https://en.wikipedia.org/wiki/Relational_quantum_mechanics",
            description:
              "Holos shares RQM's observer-indexed facts but not its rejection of a universal state; a positive Check C result supports the family, not Holos alone.",
          },
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
              "Evolution that conserves information and total probability; Holos predicts agreement among communicating observers without objective collapse.",
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
              "Holos without collapse rejects objective collapse: evolution is unitary, and apparent collapse is a record within a branch, definite without any observer.",
          },
        ],
      },
      {
        number: 19,
        id: "speculation",
        title: "Speculation",
        canonicalLink: "/predictions#speculation",
        items: [
          {
            name: "Phase transition",
            url: "https://en.wikipedia.org/wiki/Phase_transition",
            description:
              "A speculative reading: civilizational integration may advance in jumps rather than smoothly, as light-speed delay and waste heat reshape what can be coordinated.",
          },
          {
            name: "Fermi paradox",
            url: "https://en.wikipedia.org/wiki/Fermi_paradox",
            description:
              "A companion hypothesis to Holos, not part of its core: the Integration Hypothesis and Going Quiet. Mature civilizations are silent in light; the unavoidable observables are gravity and waste heat.",
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
        ],
      },
      {
        number: 20,
        id: "technology",
        title: "Technology",
        canonicalLink: "/predictions#technology",
        items: [
          {
            name: "Penrose process",
            url: "https://en.wikipedia.org/wiki/Penrose_process",
            description:
              "Extracting a spinning black hole's rotational energy, up to 29 percent of its mass: the known physics behind the Holocore's densest option.",
          },
          {
            name: "Sandberg, Armstrong, and Ćirković (2017), The aestivation hypothesis",
            url: "https://arxiv.org/abs/1705.03394",
            description:
              "Argues advanced civilizations might sleep until the universe cools, when computing is cheaper. One motive for the Chrono Vault's sleeping case.",
          },
          {
            name: "Bennett, Hanson, and Riedel (2019), Comment on the aestivation hypothesis",
            url: "https://doi.org/10.1007/s10701-019-00289-5",
            description:
              "Foundations of Physics: argues entropy can be disposed of cheaply today, so waiting is not required. The counterweight to aestivation.",
          },
          {
            name: "Bracewell (1960), Communications from superior galactic communities",
            url: "https://doi.org/10.1038/186670a0",
            description:
              "Nature: proposes parking autonomous probes in target star systems. The ancestor of Sentinel Probes.",
          },
          {
            name: "Turyshev et al. (2020), Direct multipixel imaging and spectroscopy of an exoplanet with a solar gravity lens mission",
            url: "https://arxiv.org/abs/2002.11871",
            description:
              "A NASA-funded mission design using the Sun's gravitational focus, beyond about 550 times the Earth-Sun distance. The basis for Gravitational-Lens Observatories.",
          },
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
  const anchorId = citationAnchorMap[number] ?? "introduction";
  return (
    <a
      className={`pl-0.5 pr-2 underline-offset-0 text-base opacity-80 hover:opacity-100 ${className}`}
      href={`/citations#${anchorId}`}
    >
      <sup>{number}</sup>
    </a>
  );
}
