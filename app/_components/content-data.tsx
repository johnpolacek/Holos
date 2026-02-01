import type React from "react";
import MathInline from "./MathInline";

// Helper function to create footnote links
function FootnoteLink({ number }: { number: number }) {
  const footerMap: Record<number, string> = {
    1: "footer-life",
    2: "footer-consciousness",
    3: "footer-universe",
    4: "footer-spacetime",
    5: "footer-dimensions",
    6: "footer-infinity",
    7: "footer-blackholes",
    8: "footer-aliens",
    9: "footer-simulation",
    10: "footer-god",
    11: "footer-why",
    12: "footer-axioms",
    13: "footer-predictions",
    14: "footer-hilbert",
    15: "footer-bekenstein",
  };
  const footerId = footerMap[number] || "footer-why";
  return (
    <a className="pl-0.5 pr-2 opacity-80 hover:opacity-100" href={`#${footerId}`}>
      <sup>{number}</sup>
    </a>
  );
}

// Types for content structure
export interface FootnoteItem {
  name: string;
  url: string;
  description: string;
}

export interface FootnoteSection {
  number: number;
  id: string;
  title: string;
  items: FootnoteItem[];
}

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

// All footnote sections
export const footnotes: FootnoteSection[] = [
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
  {
    number: 13,
    id: "footer-predictions",
    title: "Predictions",
    items: [
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
        name: "Metastable DE / Axion-like DM (2024)",
        url: "https://arxiv.org/abs/2403.04970",
        description:
          "Phase transition: metastable Dark Energy decaying into axion-like Dark Matter (m ~ 10^-13 GeV). Physical substrate for informational migration into the Bulk.",
      },
      {
        name: "CMB-S4 Collaboration",
        url: "https://cmb-s4.org/",
        description:
          "Next-generation cosmic microwave background experiment for measuring CMB polarization.",
      },
      {
        name: "LiteBIRD Collaboration",
        url: "https://litebird.isas.jaxa.jp/static/eng/",
        description:
          "JAXA-led space mission to detect primordial gravitational waves through CMB polarization measurements.",
      },
      {
        name: "Tononi, G. (2004)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15522121/",
        description: "An information integration theory of consciousness. BMC Neuroscience, 5, 42.",
      },
      {
        name: "Casali et al. (2013)",
        url: "https://www.science.org/doi/10.1126/scitranslmed.3006294",
        description:
          "A theoretically based index of consciousness independent of sensory processing and behavior. Science Translational Medicine.",
      },
      {
        name: "Frauchiger & Renner (2018)",
        url: "https://www.nature.com/articles/s41467-018-05739-8",
        description:
          "Quantum theory cannot consistently describe the use of itself. Nature Communications.",
      },
      {
        name: "Proietti et al. (2019)",
        url: "https://www.science.org/doi/10.1126/sciadv.aaw9832",
        description: "Experimental test of local observer independence. Science Advances.",
      },
      {
        name: "Davies, P. (2010)",
        url: "https://cosmos.asu.edu/publication/eerie-silence",
        description: "The Eerie Silence: Renewing Our Search for Alien Intelligence.",
      },
      {
        name: "Bekenstein, J. (2003)",
        url: "https://www.scientificamerican.com/article/information-in-the-holographic-univ/",
        description: "Information in the holographic universe. Scientific American.",
      },
    ],
  },
  {
    number: 14,
    id: "footer-hilbert",
    title: "Hilbert Space & Degrees of Freedom",
    items: [
      {
        name: "Hilbert Space",
        url: "https://en.wikipedia.org/wiki/Hilbert_space",
        description:
          'In modern physics, the "state" of any complex system is defined as a vector in a high-dimensional space. Our perception of 3D space is a specific observable projection of this deeper geometric reality. See also: The Holographic Principle and Phase Space in statistical mechanics.',
      },
    ],
  },
  {
    number: 15,
    id: "footer-bekenstein",
    title: "Bekenstein Bound",
    items: [
      {
        name: "Bekenstein Bound",
        url: "https://en.wikipedia.org/wiki/Bekenstein_bound",
        description:
          "An upper limit on the entropy or information that can be contained within a given limited region of space which has a finite amount of energy. It suggests that information is fundamentally tied to the geometry of the universe.",
      },
    ],
  },
];
