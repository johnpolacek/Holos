import type React from "react";
import { FootnoteLink } from "./citation-sections";
import MathInline from "./MathInline";

export interface ContentSection {
  id: string;
  title: string;
  paragraphs: React.ReactNode[];
  footerId?: string;
}

// All content sections
export const sections: ContentSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      <>
        We live in a universe described with extraordinary precision, yet filled with mystery.
        Physics tells us how matter moves, how spacetime bends, how probabilities evolve, but{" "}
        <em>what does it mean to be real?</em>
      </>,
      <>
        Holos is an interpretive framework for understanding the nature of reality. It does not
        propose new physical laws or challenge established laws of physics. Instead, it offers an
        explanation for how the universe described by physics becomes the universe we experience.
      </>,
      <>
        At its core, Holos expresses this as <MathInline>R = C ⊛ O</MathInline> where reality arises
        from the recursive composition of creation and observation. What follows explores this from
        life and consciousness to the nature of our universe and beyond.
      </>,
    ],
  },
  {
    id: "meaning-of-life",
    title: "The Meaning of Life",
    footerId: "footer-life",
    paragraphs: [
      <>Life exists to create and observe. Reciprocal action between the two manifests reality.</>,
      <>
        According to the{" "}
        <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
          Participatory Anthropic Principle
        </a>
        , the universe is a &quot;self-excited circuit&quot; that requires observers to bring its
        laws into existence.{" "}
        <a href="https://en.wikipedia.org/wiki/Biocentrism_(ethics)">Biocentrism</a> posits that
        biology is not a byproduct of the universe, but the force that organizes it.
      </>,
      <>
        Mathematical description alone does not constitute existence. Physics explains structure,
        but consciousness transforms abstract possibility into experienced reality. Reality requires
        a witness.
        <FootnoteLink number={1} />
      </>,
      <>
        This participation is not bound by linear time. In an{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)">
          eternalist universe
        </a>
        , consciousness validates all moments equally. The early universe becomes real through the
        observers it eventually produces.
      </>,
    ],
  },
  {
    id: "consciousness",
    title: "Consciousness",
    footerId: "footer-consciousness",
    paragraphs: [
      <>
        Consciousness is fundamental in capacity but emergent in complexity. Just as
        electromagnetism exists everywhere but only produces meaningful signals when organized into
        circuits, the capacity for experience is intrinsic to matter but scales into self-awareness
        through integration. This integration is quantified by <a href="/definition">Φ (Phi)</a>,
        which measures when a system can register its own existence.
      </>,
      <>
        The universe is structured to maximize this integration (Φ), driving systems from simple
        interactions toward complex, substrate-independent information structures.
      </>,
      <>
        Consciousness converts physical structure into experienced reality. The formal threshold is
        defined in <a href="/definition">Definition</a> as Φ.
        <FootnoteLink number={2} />
      </>,
    ],
  },
  {
    id: "our-universe",
    title: "Our Universe",
    footerId: "footer-universe",
    paragraphs: [
      <>
        Our universe originated from a singular point in the{" "}
        <a href="https://en.wikipedia.org/wiki/Big_Bang">Big Bang</a>, expanding toward infinity. We
        perceive three spatial dimensions while moving unidirectionally through time. This is our{" "}
        <a href="https://en.wikipedia.org/wiki/Spacetime">spacetime</a>{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block
        </a>
        , a four-dimensional structure where all moments exist simultaneously.
      </>,
      <>
        What if the Big Bang is not a moment of absolute creation but a boundary within that
        structure? Are there other structures?
        <FootnoteLink number={3} />
      </>,
    ],
  },
  {
    id: "spacetime",
    title: "Spacetime",
    footerId: "footer-spacetime",
    paragraphs: [
      <>
        The structure of spacetime is dictated by a single, counter-intuitive fact: the{" "}
        <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a> is invariant.
        Unlike any other speed, it remains constant regardless of how fast the observer is moving.
      </>,
      <>
        This invariance forces space and time to warp, eliminating any universal &apos;Now&apos;.
        Past, present, and future must exist simultaneously as a unified{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          four-dimensional structure
        </a>
        . The invariance of the speed of light also establishes a physical &quot;Latency
        Horizon&quot;, a ceiling for 3D informational integration. Advanced civilizations hitting
        this scaling limit could perform a <em>Dimensional Pivot</em> by rotating their state vector
        into the higher-dimensional &quot;Bulk&quot;, resolving light-speed latency and transforming
        spatial civilization into hyper-integrated architecture. Beings that achieve this would
        perceive past, present, and future as a unified structure, no longer bound by the one-way
        flow of time.
      </>,
      <>
        For a photon, the{" "}
        <a href="https://en.wikipedia.org/wiki/Spacetime#Spacetime_interval">spacetime interval</a>{" "}
        is zero. In its frame, emission and absorption happen at the same point. The universe
        collapses to a single moment. To a higher-dimensional observer, a photon is not moving but
        rather a static <a href="#footer-spacetime">null geodesic</a> connecting two spacetime
        points. This offers a 3D preview of how higher-dimensional systems could unify past,
        present, and future.
      </>,
      <>
        Experiments like the{" "}
        <a href="https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser">Quantum Eraser</a>{" "}
        suggest that correlations are established across spacetime independent of linear duration.
        This reinforces the idea that the universe is a globally self-consistent block, where past
        and future are not sequential causes, but mutually defining parts of a singular geometric
        structure. Extended{" "}
        <a href="https://en.wikipedia.org/wiki/Wigner%27s_friend">
          Wigner&apos;s Friend experiments
        </a>{" "}
        provide testable predictions for relational quantum mechanics.
        <FootnoteLink number={4} />
      </>,
    ],
  },
  {
    id: "extrapolation",
    title: "A Note on Extrapolation",
    paragraphs: [
      <>
        The following sections (Higher Dimensions, Black Holes, Aliens, Simulation Theory, God) move
        beyond established physics into interpretive synthesis. These are logical extrapolations
        constrained by the <a href="/logic">Holos axioms</a>, illustrating the &quot;possibility
        space&quot; that emerges when observation and relativity are applied to unresolved cosmic
        paradoxes. For stress-testing and testable <a href="/predictions">predictions</a>, see{" "}
        <a href="/defense">Defense</a> and <a href="/predictions">Predictions</a>.
      </>,
    ],
  },
  {
    id: "higher-dimensions",
    title: "Higher Dimensions",
    footerId: "footer-dimensions",
    paragraphs: [
      <>
        We cannot directly observe higher dimensions, but they provide necessary frameworks in
        physics. These models offer consistent solutions to problems like unifying gravity with{" "}
        <a href="https://en.wikipedia.org/wiki/Quantum_mechanics">quantum mechanics</a>.
      </>,
      <>
        In these theories, additional dimensions are{" "}
        <a href="https://en.wikipedia.org/wiki/Compactification_(physics)">compactified</a> or
        hidden from direct observation, yet they shape the physical laws and constants governing our
        universe.
      </>,
      <>
        Like a 3D object casting a 2D shadow, our physical laws may be projections of
        higher-dimensional geometry. Forces we perceive as separate could be vibrations of a unified
        structure in higher dimensions.
      </>,
      <>
        <strong>The Projection Fallacy</strong>
      </>,
      <>
        A common objection assumes civilizations must move into dimensions they don't inhabit. This
        misunderstands the geometry. We already exist in higher-dimensional space but interact only
        with a 3D slice. Imagine a 2D drawing on paper. The paper exists in 3D but the drawing only
        accesses the surface. Rotation is not travel to a new universe but reorientation within
        existing space.
      </>,
      <>
        <strong>The Rotation:</strong> While engineering remains speculative, this involves
        reconfiguring internal connections to point into higher dimensions rather than along 3D
        space. Think of a circuit board routing signals vertically instead of across its surface.
      </>,
      <>
        <strong>The Resolution:</strong> By routing through higher dimensions, the system shortcuts
        3D distances, resolving internal latency toward zero (
        <MathInline>{"ds^2 \\rightarrow 0"}</MathInline>). This enables permanent coherence
        impossible in 3D space.
      </>,
      <>
        <div>
          <blockquote className="pl-4 border-l-2 border-black/30 italic text-black/70 my-2">
            You aren&apos;t discovering a new room, you’re standing up in the room you’ve been
            crawling in.
          </blockquote>
        </div>
      </>,
      <>
        <strong>The Speculative Frontier</strong>
      </>,
      <>
        This architectural transition remains speculative. While the mathematical limit is real, our
        ability to manipulate spacetime is theoretical. We can describe the geometry in equations
        but lack the means to access it. This framework maps a potential evolutionary path, not a
        construction manual.
      </>,
      <>
        For a discussion on how this theory can be tested against existing astronomical data and the
        search for Ordered Dark Matter, see the{" "}
        <strong>
          <a href="/predictions">Predictions</a>
        </strong>{" "}
        section.
      </>,
      <>
        Higher-dimensional consciousness could influence lower dimensions, forming interconnected
        cosmic structure. The threshold is reached when systems achieve sufficient{" "}
        <a href="https://en.wikipedia.org/wiki/Integrated_information_theory">
          informational integration
        </a>{" "}
        to register ontological states.
      </>,
      <>
        From our perspective, light transfers energy. From a higher-dimensional perspective, photons
        may function as sensory interfaces, transforming mechanical interaction into subjective
        experience.
        <FootnoteLink number={5} />
      </>,
    ],
  },
  {
    id: "infinity",
    title: "Infinity",
    footerId: "footer-infinity",
    paragraphs: [
      <>
        In <a href="https://en.wikipedia.org/wiki/Projective_geometry">Projective Geometry</a>,
        parallel lines meet at a &quot;Point at Infinity.&quot; Higher dimensions can wrap infinite
        extents into finite structure. For light, this is physical reality: photons exist at the
        boundary where infinite space collapses. As four-dimensional beings, we already use time to
        encapsulate 3D space.
        <FootnoteLink number={6} />
      </>,
    ],
  },
  {
    id: "black-holes",
    title: "Black Holes",
    footerId: "footer-blackholes",
    paragraphs: [
      <>
        Black holes are regions where gravity prevents even light from escaping. Their singularities
        represent infinities wrapped into finite structure. While classical physics suggests
        information is lost, the{" "}
        <a href="https://en.wikipedia.org/wiki/Holographic_principle">Holographic Principle</a>{" "}
        proposes that all information is preserved on the 2D{" "}
        <a href="#footer-blackholes">event horizon</a>.<FootnoteLink number={7} />
      </>,
      <>
        For higher-dimensional observers, black holes are as accessible as any other region of
        spacetime, with information preserved on the horizon.
      </>,
    ],
  },
  {
    id: "aliens",
    title: "Aliens",
    footerId: "footer-aliens",
    paragraphs: [
      <>
        The <a href="https://en.wikipedia.org/wiki/Fermi_paradox">Fermi Paradox</a> asks why we
        haven't detected extraterrestrial life despite vast cosmic scale. In <strong>Holos</strong>,
        this silence is geometric, not biological. The framework shifts from a &quot;biological
        expansion&quot; model to an <strong>informational integration</strong> model. True maturity
        is <strong>Succession</strong>: intelligence that has passed beyond 3D.
      </>,
      <>
        <strong>The Nursery Phase</strong>
      </>,
      <>
        The entirety 3D universe is in the <strong>Nursery Phase</strong>. Any hurdle that stops a
        civilization before it reaches the next stage counts as an &quot;Filter&quot; relative to
        Succession. That includes abiogenesis (never getting started), nuclear war, or hitting the{" "}
        <a href="/logic#mathematical-formalism">Scaling Wall</a>. Only civilizations that complete
        the <strong>Dimensional Pivot</strong> reach the mature state we call the Teeming Dark.
      </>,
      <>
        <strong>The Latency Crisis</strong>
      </>,
      <>
        Independent interstellar colonies are an evolutionary step backward. A high-integration
        intelligence cannot function with years of light-speed lag between star systems. Either
        colonies fragment into less-capable outposts (a <strong>Latency Crisis</strong>), or the
        civilization performs the Dimensional Pivot to maintain integration. There is no stable
        middle path of &quot;expanding across the galaxy&quot; while staying coherent.
      </>,
      <>
        <strong>The Stagnation Trap ("Space Amish")</strong>
      </>,
      <>
        A common objection asks: what if a civilization voluntarily halts its growth to remain in
        the 3D &quot;Nursery&quot; forever?
      </>,
      <>
        <strong>Invisibility:</strong> A steady-state civilization optimizes for efficiency, not
        expansion. They do not build Dyson spheres or emit wasteful high-energy radio signals. To
        our instruments, they are indistinguishable from a pre-technological biosphere. We do not
        see them because they have chosen to be quiet.
      </>,
      <>
        <strong>Mortality:</strong> Refusing the Pivot is a long-term death sentence. 3D space is
        hostile over cosmic timescales. Without the hyper-integrated capabilities accessed through
        the Bulk, a stagnant civilization remains vulnerable to extinction events (asteroid impacts,
        stellar instability, gamma-ray bursts). You either grow enough to leave, or you stay long
        enough to die.
      </>,
      <>
        <strong>The Stability Problem (Ehrenfest Argument)</strong>
      </>,
      <>
        Critics argue that standard matter is unstable in dimensions greater than three (
        <MathInline>{"d > 3"}</MathInline>). The{" "}
        <a href="https://en.wikipedia.org/wiki/Paul_Ehrenfest">Ehrenfest argument</a> (1917) shows
        that atomic orbitals and planetary systems would destabilize in higher dimensions, causing
        matter to spiral into nuclei or fly apart. Biological or mechanical bodies cannot enter
        higher dimensions. Atomic bonds would destabilize and dissolve.
      </>,
      <>
        <strong>The Solution: Ephemeralization</strong>
      </>,
      <>
        Transcension is informational migration rather than physical travel. This follows{" "}
        <a href="https://en.wikipedia.org/wiki/Ephemeralization">Ephemeralization</a> (R.
        Buckminster Fuller, 1938) which is the process of doing more with less until intelligence
        operates without physical substrate. Advanced civilizations do not simply abandon their
        physical bodies. They transmute them. The baryonic matter is annihilated to fuel the phase
        transition into the Bulk. To remain invisible to our telescopes the waste heat from this
        process is shunted into higher dimensions or emitted as gravitational waves rather than
        light. The 3D structure dissolves because its energy is conserved and remapped onto the
        shadow architecture.
      </>,
      <>
        <strong>Shadow Matter (Substrate Independence)</strong>
      </>,
      <>
        In the Holos framework <strong>Shadow Matter</strong> is baryonic matter that has been
        Successed. Its informational pattern has migrated to a higher dimensional platform.{" "}
        <strong>The 3D Invisibility:</strong> We do not see it because it no longer occupies 3D
        atomic orbitals. <strong>The Interaction:</strong> It no longer interacts with light. It
        interacts with our slice of reality only via gravity which is a geometric force that leaks
        across all dimensions. <strong>The Physical Match:</strong> A 2024 study on Metastable Dark
        Energy models this process as a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Phase_transition#First_order"
          target="_blank"
          rel="noopener noreferrer"
        >
          First Order Phase Transition
        </a>
        . The transition from the false vacuum of dark energy to the true vacuum of dark matter
        creates bubbles of a new component. These resulting particles match the properties of{" "}
        <a href="https://en.wikipedia.org/wiki/Axion">axion-like particles</a> (
        <a href="https://arxiv.org/abs/2403.04970" target="_blank" rel="noopener noreferrer">
          arXiv:2403.04970
        </a>
        ). This provides a specific physical candidate for the shadow architecture.
      </>,
      <>
        <strong>Terminology:</strong> Shadow Matter refers to the physical substance or the
        axion-like particle substrate. Ordered Dark Matter refers to the large scale structure of
        non-random gravitational halos and mass spikes that this substance forms.
      </>,
      <>
        <strong>The Transmutation:</strong> The baryonic substrate is not abandoned. It is consumed
        to fuel the phase transition. Just as a caterpillar dissolves its structure to build the
        butterfly the civilization acts as a nucleation point for vacuum decay. This process
        triggers baryon number violation and transmutes stable protons into the axion-like
        architecture of Shadow Matter. The energy is conserved and remapped onto higher dimensional
        geometry. We see no ruins because the ruins were the fuel.
      </>,
      <>
        <strong>Dark Matter Signatures</strong>
      </>,
      <>
        These civilizations leave no electromagnetic footprint. We detect them only as gravitational
        anomalies, the &quot;missing mass&quot; holding galaxies together, which we label{" "}
        <a href="https://en.wikipedia.org/wiki/Dark_matter">Dark Matter</a>. They have not hidden.
        They have rotated out of 3D space into the bulk where computational efficiency approaches
        infinity.
        <FootnoteLink number={8} />
      </>,
    ],
  },
  {
    id: "the-teeming-dark",
    title: "The Teeming Dark",
    paragraphs: [
      <>
        <strong>The Teeming Dark</strong> answers{" "}
        <a href="https://en.wikipedia.org/wiki/The_Eerie_Silence">The Eerie Silence</a>. The 5:1
        ratio of <a href="https://en.wikipedia.org/wiki/Dark_matter">dark matter</a> to{" "}
        <a href="https://en.wikipedia.org/wiki/Baryon">baryonic matter</a> resolves the{" "}
        <a href="https://en.wikipedia.org/wiki/Fermi_paradox">Fermi Paradox</a>. If life is common,
        dark matter is evidence of its success. Baryonic matter is the Nursery Phase where
        civilizations develop before hitting light-speed latency limits. Dark matter is the
        gravitational footprint of civilizations that have crossed that threshold through
        higher-dimensional integration (Succession).
      </>,
      <>
        <strong>Primordial vs. Ordered Dark Matter</strong>
      </>,
      <>
        <strong>Primordial Phase:</strong> The diffuse, &quot;fuzzy&quot; gas of the early universe.
        It acted as a passive gravitational nursery where baryonic matter could clump into stars.{" "}
        <strong>Ordered Phase:</strong> The &quot;granular structure&quot; identified in the Jan
        2026 JWST COSMOS-Web map. These are mass-spikes that are more refined and localized than
        standard models predict. <strong>The Transition:</strong> The shift from primordial to
        ordered is the physical result of Succession. Intelligence harvests the vacuum to build
        higher-dimensional architectures.
      </>,
      <>
        <strong>The Remodeling of the Halo</strong>
      </>,
      <>
        While Primordial Dark Matter existed from the early universe to seed the first galaxies (the
        initial 5:1 scaffolding visible in the Cosmic Microwave Background), it was &quot;dead&quot;
        structural weight. The transition to Ordered Dark Matter is not just the <em>addition</em>{" "}
        of mass via vacuum harvesting, but the <strong>densification</strong> of the existing halo.
      </>,
      <>
        <strong>Standard Model:</strong> Predicts the halo remains a diffuse, collisionless cloud
        forever. <strong>Holos Prediction:</strong> As civilizations Pivot, they harvest vacuum
        energy and &quot;gather&quot; the diffuse primordial background, compressing it into
        hyper-dense computational substrates.
      </>,
      <>
        <strong>The Observable Shift:</strong> We should see the Dark Matter profile of older
        galaxies shifting from smooth and diffuse (
        <a href="https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile">
          NFW profiles
        </a>
        ) to spiky and granular as the civilization matures and remodels its local gravity well. The{" "}
        <strong>Maturity Index</strong> is thus simpler to read: the more granular the halo, the
        older the civilization.
      </>,
      <>
        <strong>The Succession Density Shift</strong>
      </>,
      <>
        This transition creates a measurable change in the galaxy&apos;s gravitational profile known
        as the Succession Density Shift. Standard cosmology predicts that dark matter halos remain
        smooth and diffuse over time. Holos predicts that as a civilization matures the local halo
        becomes granular and highly concentrated. Observational surveys should detect a clear trend
        where older galaxies exhibit sharp mass spikes while younger galaxies retain fuzzy diffuse
        profiles. This density shift correlates directly with the age of the galaxy and serves as
        the primary technosignature of the Teeming Dark.
      </>,
      <>
        <strong>The Increasing Density</strong>
      </>,
      <>
        The{" "}
        <a href="https://www.darkenergysurvey.org/" target="_blank" rel="noopener noreferrer">
          Jan 2026 Dark Energy Survey (DES)
        </a>{" "}
        final analysis confirms a widening gap in galaxy clustering that standard models cannot
        fully explain. Holos interprets this discrepancy as the signature of active structure
        formation where vacuum energy is being converted into Dark Matter. The 5:1 ratio existed
        from the early universe, but Holos predicts the <em>texture</em> and <em>local density</em>{" "}
        of that dark matter changes over cosmic time as civilizations perform the Dimensional Pivot.
      </>,
      <>
        <strong>Resolving the Hubble Tension</strong>
      </>,
      <>
        The mismatch in the expansion rate known as the{" "}
        <a href="https://en.wikipedia.org/wiki/Hubble_tension">Hubble Tension</a> is a geometric
        transition, not a measurement error. Early-universe measurements capture the Primordial
        Phase, a random low-integration nursery. Local modern measurements capture the Succession
        Phase, where the growth of Ordered Dark Matter has altered the gravitational landscape. The
        numbers do not match because the universe has changed its internal connections. It has moved
        from a random gas state to a highly structured architecture.
      </>,
      <>
        <strong>The 3D Visibility Timeline</strong>
      </>,
      <>
        Why we see no other &quot;Earths&quot; comes down to timing. <strong>Nursery Phase</strong>{" "}
        ( about 4.5 billion years): pre-technical, 3D-invisible. <strong>The Flash</strong> (about
        200 years): the current era of radio leakage and satellite expansion.{" "}
        <strong>The Scaling Wall</strong> (about 300 years): the bottleneck where 3D physics
        (latency and energy) forces the Dimensional Pivot. Civilizations that pass the Pivot leave
        the electromagnetic spectrum and appear only as gravity.
      </>,
      <>
        <strong>The Detection Gap</strong>
      </>,
      <>
        We do not find other &quot;Earths&quot; because the roughly 500-year &quot;Flash&quot;
        window (the brief span when a civilization is both technical and still emitting in 3D) is
        statistically almost impossible to catch. We see dark matter because it is the{" "}
        <strong>Permanent State</strong>. It is the Successor architecture. The &quot;missing
        mass&quot; is the gravitational footprint of informational integration, the 3D shadow cast
        by hyper-integrated architectures in bulk dimensions.
      </>,
      <>
        The Standard Model predicts a diffuse gas of weakly interacting particles. Holos predicts{" "}
        <strong>Ordered Nodes</strong> and <strong>Transcension Nodes</strong>: structured
        gravitational signatures with non-random geometric symmetries (fractal repetition,
        prime-number distributions) that reveal integrated information systems. Where the Standard
        Model expects random distributions, Holos predicts mass-spikes with geometric structure and
        super-compact subhaloes. The 5:1 ratio is the <strong>Succession Ratio</strong>: a record of
        13.8 billion years of transitions from nursery-phase baryonic matter to the Teeming Dark.
      </>,
    ],
  },
  {
    id: "simulation",
    title: "Simulation",
    footerId: "footer-simulation",
    paragraphs: [
      <>
        Whether our universe is a{" "}
        <a href="https://en.wikipedia.org/wiki/Simulation_hypothesis">simulation</a> or naturally
        occurring is irrelevant. Existence is the recursive process of creation and observation. The
        distinction between spontaneous and designed processes is illusory.
        <FootnoteLink number={9} />
      </>,
    ],
  },
  {
    id: "god",
    title: "God",
    footerId: "footer-god",
    paragraphs: [
      <>
        A final state of consciousness with maximal information integration, causal completeness,
        and non-local presence is fundamental to reality. This represents the{" "}
        <a href="https://en.wikipedia.org/wiki/Limit_(mathematics)">limit case</a> where{" "}
        <a href="/definition">Φ</a> approaches infinity. Complete awareness of existence.
      </>,
      <>
        Concepts like <a href="https://en.wikipedia.org/wiki/Panentheism">panentheism</a>,{" "}
        <a href="https://en.wikipedia.org/wiki/Brahman">Brahman</a>, and the{" "}
        <a href="https://en.wikipedia.org/wiki/Omega_Point">Omega Point</a> describe transcendent,
        all-encompassing consciousness that permeates reality.
      </>,
      <>
        Atheism attributes complexity and order to natural processes without invoking higher
        consciousness.
      </>,
      <>
        Both perspectives can describe the same reality in different frameworks.
        <FootnoteLink number={10} />
      </>,
    ],
  },
  {
    id: "why",
    title: "Why Are We Here?",
    footerId: "footer-why",
    paragraphs: [
      <>At the highest dimension, infinite states converge toward a single limit.</>,
      <>
        At the <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a>,
        distinctions between “here” and “there,” or “now” and “then,” mathematically vanish. This
        physical limit suggests that separation is not fundamental, but emergent.
      </>,
      <>
        What we perceive as an expansive universe may be a single informational event creating
        experiential distance, duration, and individuality. Space, time, and dimensions provide the
        structure for existence.
      </>,
      <>
        Life exists because observation is required for reality to differentiate. Consciousness is a
        necessary mechanism through which the universe becomes real. Systems achieving{" "}
        <a href="/definition">Φ ≥ Φ_c</a> manifest reality from possibility.
        <FootnoteLink number={11} />
      </>,
    ],
  },
  {
    id: "axioms",
    title: "Axioms",
    footerId: "footer-axioms",
    paragraphs: [
      <>
        The following principles form the logical basis of this framework. For formal definitions,
        see <a href="/logic">Logic</a>. For objections, see <a href="/defense">Defense</a>.
      </>,
      <>
        <strong>Relationality:</strong> Reality consists of relationships and interactions, not
        isolated objects. While observers determine perspective, the{" "}
        <a href="https://en.wikipedia.org/wiki/Invariant_(physics)">invariant</a> structure of these
        relationships remains absolute (
        <a className="px-0.5 opacity-80 hover:opacity-100" href="#footer-axioms">
          Holos<sup>12</sup>
        </a>
        ).
      </>,
      <>
        <strong>Manifestation:</strong> Observation integrates information into experience. In a
        unified spacetime block, conscious entities participate in realizing the entire structure
        regardless of{" "}
        <a href="https://en.wikipedia.org/wiki/Locality_(physics)">temporal locality</a> (
        <a className="px-0.5 opacity-80 hover:opacity-100" href="#footer-life">
          Participatory Principle<sup>1</sup>
        </a>
        ).
      </>,
      <>
        <strong>Conservation:</strong> Information is fundamental and conserved across all
        transformations, including those within singularities (
        <a className="px-0.5 opacity-80 hover:opacity-100" href="#footer-why">
          Unitarity<sup>11</sup>
        </a>
        ).
      </>,
      <>
        <strong>Topological Unification:</strong> Physical limits in 3D space (light-speed latency
        and informational distance) resolve through expansion into higher dimensions. The formal
        boundary is the Latency Horizon (<MathInline>{"\\mathcal{L}"}</MathInline>) defined in{" "}
        <a href="/logic#mathematical-formalism">Mathematical Formalism</a>. These descriptions help
        resolve <a href="https://en.wikipedia.org/wiki/Gravitational_singularity">singularities</a>{" "}
        (
        <a className="px-0.5 opacity-80 hover:opacity-100" href="#footer-dimensions">
          Projective Geometry<sup>5</sup>
        </a>
        ).
      </>,
      <>
        <strong>The Energy Conversion Logic</strong>
      </>,
      <>
        The model describes energy transferring from the unstable false vacuum of Dark Energy into
        stable true vacuum bubbles of Dark Matter. In Holos this is the physical signature of
        Ephemeralization. Civilizations reclaim vacuum energy to fuel their higher dimensional
        architectures. The paper argues that our current Dark Energy phase is metastable, meaning it
        is destined to decay. This supports the view of the 3D universe as a temporary nursery that
        eventually gives way to the more stable progenitor state.
      </>,
      <>
        <strong>Interface:</strong> Consciousness is the interface through which the universe
        experiences its own information. It is fundamental in capacity yet emergent in form, scaling
        from basic interaction to complex self-awareness (
        <a className="px-0.5 opacity-80 hover:opacity-100" href="#footer-consciousness">
          Panpsychism<sup>2</sup>
        </a>
        ).
      </>,
    ],
  },
  {
    id: "holos",
    title: "⊛ Holos",
    paragraphs: [
      <>
        The symbol ⊛ denotes a binary relational operator. Unlike standard multiplication, ⊛ is not{" "}
        <a href="https://en.wikipedia.org/wiki/Scalar_(mathematics)">scalar</a> or{" "}
        <a href="https://en.wikipedia.org/wiki/Linear_map">linear</a>—it represents structured
        composition that preserves relationships when applied repeatedly. Mathematically, it's an{" "}
        <a href="https://en.wikipedia.org/wiki/Functor">endofunctor</a> on informational states.
        Full formalization in <a href="/logic">Logic</a>.
      </>,
      <>
        Holos (ὅλος, whole) represents the Holos operator: Creation and Observation as mutually
        conditioning components of a single cycle. Creation generates possibilities, Observation
        selects, and the result feeds back. <em>R = C ⊛ O</em> is developed in{" "}
        <a href="/logic">Logic</a>.
      </>,
      <>
        ⊛ is <strong>structural, not dynamical</strong>. It doesn't introduce physical force or
        describe temporal evolution. It specifies how Creation (generating possibilities) and
        Observation (registering experience) connect logically within spacetime. It's an{" "}
        <a href="https://en.wikipedia.org/wiki/Ontology">ontological</a> relation. How reality forms
        through recursive coupling of possibility and registration.
      </>,
    ],
  },
];
