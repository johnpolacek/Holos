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
        circuits, the capacity for experience is intrinsic to matter but scales into awareness
        through integration. This integration is described by <a href="/definition">Φ (Phi)</a>,
        which characterizes when a system maintains a coherent internal perspective.
      </>,
      <>
        Systems with higher integration are more stable, expressive, and capable of sustaining
        internal models over time. As a result, natural selection and technological evolution tend
        to favor structures that increase Φ, not by intention, but because integrated systems
        persist longer and do more with less energy.
      </>,
      <>
        Consciousness, in this view, converts physical structure into experienced reality. The
        threshold at which this occurs is defined in <a href="/definition">Definition</a> as Φ.
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
        Our universe is described by the{" "}
        <a href="https://en.wikipedia.org/wiki/Big_Bang">Big Bang</a> model, in which spacetime has
        expanded from an extremely hot and dense early state. We experience three spatial dimensions
        and move through time in one direction. Together, these form our{" "}
        <a href="https://en.wikipedia.org/wiki/Spacetime">spacetime</a>. One way to understand this
        structure is as a four-dimensional{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block universe
        </a>
        , where all moments exist as part of a single geometric whole.
      </>,
      <>
        From this perspective, the Big Bang may be understood not as a moment of absolute creation,
        but as a boundary within spacetime itself. This raises a natural question. Are there other
        structures beyond this one?
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
        The structure of spacetime follows from a single counterintuitive fact: the{" "}
        <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a> is invariant.
        Unlike any other speed, it remains constant regardless of the motion of the observer. This
        invariance links space and time into a single geometric structure.
      </>,
      <>
        One consequence is the absence of a universal present. Events that are simultaneous for one
        observer may not be for another. This motivates interpretations such as the{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block universe
        </a>
        , where past, present, and future are treated as parts of a four-dimensional whole rather
        than a sequence of absolute moments.
      </>,
      <>
        The speed of light also sets a physical limit on how quickly information can be shared
        across space. This creates a natural latency horizon for large-scale coordination. As
        systems grow more complex, maintaining coherence through long-distance signaling becomes
        increasingly inefficient. This pressure favors architectures that rely more on local
        integration than global synchronization.
      </>,
      <>
        A useful boundary case is light itself. Along a photon’s trajectory, the{" "}
        <a href="https://en.wikipedia.org/wiki/Proper_time">proper time</a> is zero, and its path is
        described as a <a href="https://en.wikipedia.org/wiki/Null_geodesic">null geodesic</a>{" "}
        connecting two spacetime events. This does not imply a physical frame of reference for the
        photon, but it illustrates how spacetime geometry can collapse distance and duration without
        violating causality.
      </>,
      <>
        Experiments such as the{" "}
        <a href="https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser">
          delayed-choice quantum eraser
        </a>{" "}
        highlight how quantum correlations are constrained by global consistency rather than simple
        temporal order. Related thought experiments like{" "}
        <a href="https://en.wikipedia.org/wiki/Wigner%27s_friend">Wigner’s Friend</a> explore how
        observation depends on perspective. Together, these ideas suggest that time in fundamental
        physics is better understood as geometric structure than as a universal flow.
        <FootnoteLink number={4} />
      </>,
    ],
  },
  {
    id: "extrapolation",
    title: "A Note on Extrapolation",
    paragraphs: [
      <>
        The sections that follow (Higher Dimensions, Black Holes, Aliens, Simulation Theory, God)
        extend beyond established physics into interpretation. They are not claims of new physical
        laws, but reasoned extrapolations constrained by the <a href="/logic">Holos axioms</a>.
        Their purpose is to explore the space of possibilities that emerges when observation,
        relativity, and scale are applied to unresolved cosmic questions.
      </>,
      <>
        Where these ideas intersect with existing data or produce testable implications, they are
        addressed in <a href="/defense">Defense</a> and <a href="/predictions">Predictions</a>.
      </>,
    ],
  },
  {
    id: "higher-dimensions",
    title: "Higher Dimensions",
    footerId: "footer-dimensions",
    paragraphs: [
      <>
        We cannot directly observe higher dimensions, but they appear in several physical theories
        as mathematical structures that help describe the behavior of our universe. In particular,
        models that extend spacetime beyond three spatial dimensions are used to explore unification
        problems in physics, including gravity and{" "}
        <a href="https://en.wikipedia.org/wiki/Quantum_mechanics">quantum mechanics</a>.
      </>,
      <>
        In these theories, additional dimensions are not separate places but constrained degrees of
        freedom. They are{" "}
        <a href="https://en.wikipedia.org/wiki/Compactification_(physics)">compactified</a> or
        hidden from direct observation, yet they influence the physical laws and constants we
        observe. Higher dimensions describe structure, not destinations.
      </>,
      <>
        A useful analogy is projection. A three-dimensional object can cast a two-dimensional shadow
        without leaving its original space. In the same way, the laws we experience in three
        dimensions may reflect deeper geometric relationships that are not directly visible.
      </>,
      <>
        <strong>The Projection Fallacy</strong>
      </>,
      <>
        A common misunderstanding assumes that if higher dimensions exist, advanced civilizations
        must move into them. This treats higher dimensions as locations rather than descriptions of
        structure.
      </>,
      <>
        We already exist in a higher-dimensional mathematical space. We simply interact with a
        limited subset of it. A drawing on paper exists within three-dimensional space, but the
        drawing itself only accesses the surface. Changing orientation does not require leaving the
        room.
      </>,
      <>
        In this sense, higher dimensions do not imply escape from spacetime. They describe
        additional ways structure can be organized within it.
      </>,
      <>
        <strong>Structural Reorientation</strong>
      </>,
      <>
        Some speculative ideas describe advanced systems as “rotating” into higher dimensions. A
        clearer way to understand this is <strong>structural reorientation</strong>, where a system
        changes how its internal parts connect so coherence depends less on spatial separation and
        more on local structure. In mathematics and physics, this is closer to concepts like
        <a href="https://en.wikipedia.org/wiki/Embedding">embedding</a> and{" "}
        <a href="https://en.wikipedia.org/wiki/Dimensional_reduction">dimensional reduction</a> than
        to movement into a new space.
      </>,
      <>
        A useful analogy is a circuit board. Early designs route signals across a flat surface.
        Modern boards stack layers vertically, shortening paths without bypassing physical limits.
        The system does not leave space. It becomes more compact and internally integrated.
      </>,
      <>
        This does not remove causality or the speed of light. It reduces reliance on long-distance
        coordination by shifting coherence toward local interactions, consistent with the{" "}
        <a href="https://en.wikipedia.org/wiki/Principle_of_locality">Principle of Locality</a>. As
        systems become more integrated, higher-dimensional descriptions become useful for tracking
        how many local relationships must be maintained at once. These descriptions do not imply
        infinite speed or global awareness. Any real system remains bound by energy limits,{" "}
        <a href="https://en.wikipedia.org/wiki/Thermodynamics">thermodynamics</a>, and causal
        structure. Higher dimensions describe how coherence scales, not how physical limits are
        bypassed.
      </>,
      <>
        <strong>The Speculative Frontier</strong>
      </>,
      <>
        These ideas remain speculative. While higher-dimensional geometry is well developed
        mathematically, we do not know whether advanced civilizations can engineer systems that
        meaningfully exploit it. This framework outlines a possible evolutionary direction, not a
        construction plan..
      </>,
      <>
        Predictions related to this framework, including the possibility of Ordered Dark Matter as a
        byproduct of extreme integration, are discussed in the{" "}
        <strong>
          <a href="/predictions">Predictions</a>
        </strong>{" "}
        section.
      </>,
      <>
        As systems become more integrated, they require broader perspectives to describe their
        coherence. In this sense, higher-dimensional observers are not external agents but limiting
        viewpoints that emerge as structure deepens. They represent how reality appears when
        relationships are considered together rather than sequentially, consistent with ideas of{" "}
        <a href="https://en.wikipedia.org/wiki/Emergence">emergence</a> and{" "}
        <a href="https://en.wikipedia.org/wiki/Self-organization">self-organization</a>.
      </>,
      <>
        Light offers a useful boundary case. From within spacetime, photons transfer energy across
        distance. Along a photon’s own trajectory, however, no time elapses, a consequence of{" "}
        <a href="https://en.wikipedia.org/wiki/Proper_time">proper time</a> along a{" "}
        <a href="https://en.wikipedia.org/wiki/Null_geodesic">null geodesic</a>. This does not imply
        new physics, but it shows how perspective can collapse extension without violating physical
        laws.
      </>,
      <>
        <strong>Higher-dimensional observation</strong> becomes necessary as integration increases.
        At the limit, this converges on an idealized observer where creation and observation
        coincide. This is an <strong>asymptotic horizon</strong>, a conceptual limit rather than a
        reachable state, consistent with the mathematical idea of an{" "}
        <a href="https://en.wikipedia.org/wiki/Asymptote">asymptote</a>.
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
        In <a href="https://en.wikipedia.org/wiki/Projective_geometry">projective geometry</a>,
        parallel lines intersect at a point at infinity. This does not make infinity finite, but it
        allows infinite extension to be represented within a bounded structure. In this sense,
        higher-dimensional descriptions can encode unbounded relationships without requiring
        unbounded space.
      </>,
      <>
        Light offers a physical analogy. Along a photon’s path, the{" "}
        <a href="https://en.wikipedia.org/wiki/Proper_time">proper time</a> is zero, so emission and
        absorption are connected without duration. Distance is not eliminated, but it is compressed
        by perspective. As beings who experience time, we already use a higher dimension to organize
        three-dimensional space.
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
        Black holes are regions of spacetime where gravity is so strong that not even light can
        escape. At their centers, current physical theories predict singularities, signaling limits
        in our understanding rather than confirmed physical infinities. In this sense, black holes
        compress extreme structure into finite regions.
      </>,
      <>
        While classical physics once suggested that information falling into a black hole is lost,
        modern approaches challenge this view. The{" "}
        <a href="https://en.wikipedia.org/wiki/Holographic_principle">holographic principle</a>{" "}
        proposes that all information contained within a volume can be represented on its boundary,
        such as the two-dimensional <a href="#footer-blackholes">event horizon</a>. This reframes
        black holes not as sinks of information, but as limits where geometry, information, and
        observation converge.
        <FootnoteLink number={7} />
      </>,
    ],
  },
  {
    id: "aliens",
    title: "Aliens",
    footerId: "footer-aliens",
    paragraphs: [
      <>
        The <a href="https://en.wikipedia.org/wiki/Fermi_paradox">Fermi Paradox</a> asks why we have
        not detected extraterrestrial civilizations despite the vast size and age of the universe.
        Rather than rarity alone or universal catastrophe, this silence is explained by a{" "}
        <strong>selection effect</strong>. Civilizations that persist become quieter, more
        efficient, and less externally visible over time.
      </>,
      <>
        This explanation is referred to here as the <strong>Integration Hypothesis</strong>.
      </>,
      <>
        Early technological civilizations are likely to emit radio signals, reshape their
        environments, and experiment with spaceflight. This phase is brief on cosmic timescales.
        Traditional SETI efforts focus almost entirely on this window, when detection is easiest but
        overlap between civilizations is unlikely.
      </>,
      <>
        As technology advances, pressures favor <strong>informational integration</strong> rather
        than outward expansion. Systems that minimize energy waste, reduce long-distance
        coordination, and rely on local structure are more stable. Visibility decreases not because
        civilizations are hiding, but because inefficiency is selected against. This progressive
        reduction in external signals is referred to as <strong>Visibility Collapse</strong>.
      </>,
      <>
        Large-scale interstellar expansion faces a fundamental constraint. The finite{" "}
        <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a> introduces growing
        latency between distant regions. Maintaining coherence across light-years is costly and
        fragile. Expansion will produce fragmented descendants rather than a unified intelligence.
        There is no stable path to a galaxy-spanning civilization that remains tightly integrated.
      </>,
      <>
        The long-lived outcome is not stagnation but inward growth. Civilizations continue to
        develop by deepening internal structure. Computation, coordination, and meaning concentrate
        locally.
      </>,
      <>
        This explains the silence without requiring intent or concealment. Even civilizations that
        explore extensively can do so quietly, using small probes, passive observation, and
        patience. Exploration does not require communication, and communication offers diminishing
        returns as integration increases.
        <FootnoteLink number={8} />
      </>,
    ],
  },
  {
    id: "the-teeming-dark",
    title: "The Teeming Dark: An Interpretive Thought Experiment",
    paragraphs: [
      <>
        The absence of visible extraterrestrial civilizations is often described as{" "}
        <a href="https://en.wikipedia.org/wiki/The_Eerie_Silence">the Eerie Silence</a>. One way to
        account for this silence is through selection effects and informational integration, as
        proposed by the <strong>Integration Hypothesis</strong>.
      </>,
      <>How far can we take this concept of structural integration in a thought experiment?</>,
      <>
        The thought experiment begins with a simple question. If complex systems tend to persist by
        reducing energy loss and external projection, what would extremely mature forms of
        organization look like from the outside? If integration continues beyond the phase where
        electromagnetic signaling is useful, the most stable outcomes may no longer announce
        themselves in ways we are accustomed to detecting.
      </>,
      <>
        In this view, three-dimensional spacetime can be understood as a developmental environment
        where complexity becomes visible only during a brief, inefficient phase. As systems
        optimize, external visibility decreases. Maturity does not require disappearance, but it may
        naturally coincide with silence.
      </>,
      <>
        The universe is dominated by{" "}
        <a href="https://en.wikipedia.org/wiki/Dark_matter">dark matter</a>, a form of mass that
        does not emit light but shapes cosmic structure through gravity. Whatever its underlying
        nature, dark matter is cold, persistent, and largely invisible to electromagnetic
        observation. It is so common that its ratio to visible baryonic matter is approximately 5:1.
      </>,
      <>
        The Eerie Silence is unsettling because we would not expect to be alone. On the contrary, we
        would expect to exist within a universe rich in intelligence.
      </>,
      <>The Teeming Dark is a name for the possibility that both expectations are true.</>,
      <>
        To explore this possibility, consider a distinction between two conceptual regimes of dark
        matter. The first is <strong>primordial dark matter</strong>, the diffuse, collisionless
        component that emerged in the early universe and provided the gravitational scaffolding for
        galaxy formation. In standard cosmology, this component remains largely unchanged over time.
      </>,
      <>
        A second, purely hypothetical category can be introduced for the sake of the thought
        experiment: <strong>ordered dark matter</strong>. This does not refer to a new particle or a
        revised cosmological model, but to the idea that structure without electromagnetic emission
        could, in principle, become more spatially organized over cosmic time.
      </>,
      <>
        If integration favors persistence, then the most enduring large-scale structures would be
        those that minimize energetic leakage while remaining gravitationally bound. From our
        perspective, such structures would appear dark, cold, and inert, even if internally complex.
      </>,
      <>
        This raises a natural observational question. Do all dark matter halos remain smooth and
        diffuse indefinitely, as simple collisionless models suggest, or could some halos exhibit
        increasing granularity or concentration over time? Current models predict smooth profiles,
        such as{" "}
        <a href="https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile">
          NFW profiles
        </a>
        , but real galaxies show deviations that are still actively studied.
      </>,
      <>
        Recent high-resolution surveys, including deep-field observations with the{" "}
        <a href="https://en.wikipedia.org/wiki/James_Webb_Space_Telescope">
          James Webb Space Telescope
        </a>
        , have revealed small-scale structure in galactic mass distributions that is not yet fully
        understood. Standard explanations include baryonic feedback, mergers, and measurement
        limits. The Teeming Dark asks a different question. If long-lived integration leaves
        gravitational traces, what would those traces look like?
      </>,
      <>
        Under this thought experiment, maturity would not be measured by brightness or expansion,
        but by gravitational texture. Older systems would appear quieter, denser, and more locally
        structured, not because they are engineered, but because persistence favors compactness and
        stability.
      </>,
      <>
        Importantly, this interpretation does not resolve existing tensions in cosmology, nor does
        it claim to explain phenomena such as the{" "}
        <a href="https://en.wikipedia.org/wiki/Hubble_tension">Hubble tension</a>. Instead, it
        highlights a possibility. If the universe has evolved toward increasing internal structure
        at multiple scales, then some discrepancies may reflect limits of our assumptions rather
        than errors in measurement.
      </>,
      <>
        As a thought experiment, the Teeming Dark reframes what “inhabited” might mean at cosmic
        scale. A universe full of long-lived, highly integrated systems could appear empty if our
        instruments are tuned only to light. Silence, in this context, would not be a failure of
        life, but a consequence of endurance.
      </>,
    ],
  },
  {
    id: "simulation",
    title: "Simulation",
    footerId: "footer-simulation",
    paragraphs: [
      <>
        The <a href="https://en.wikipedia.org/wiki/Simulation_hypothesis">simulation hypothesis</a>
        asks whether our universe is computed or naturally occurring. Within Holos, this distinction
        does not alter the structure of reality. Existence is defined by the recursive interaction
        of creation and observation, regardless of how the underlying process is implemented.
      </>,
      <>
        A simulated universe and a naturally emergent universe can exhibit identical internal
        structure. Both obey consistent rules, generate experience, and support meaning. From within
        the system, the difference is interpretive rather than operational.
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
        One way to interpret the structure of reality is through a limit concept. If informational
        integration continues without bound, it approaches an idealized state of maximal coherence,
        causal completeness, and non-local presence. In Holos, this corresponds to the{" "}
        <a href="https://en.wikipedia.org/wiki/Limit_(mathematics)">limit case</a> where{" "}
        <a href="/definition">Φ</a> approaches infinity, a horizon of complete awareness rather than
        a reachable condition.
      </>,
      <>
        Many philosophical and theological traditions gesture toward similar ideas. Concepts such as{" "}
        <a href="https://en.wikipedia.org/wiki/Panentheism">panentheism</a>,{" "}
        <a href="https://en.wikipedia.org/wiki/Brahman">Brahman</a>, and the{" "}
        <a href="https://en.wikipedia.org/wiki/Omega_Point">Omega Point</a> describe an
        all-encompassing unity that contains, but is not separate from, the universe.
      </>,
      <>
        Atheistic frameworks describe the same structure without invoking higher consciousness,
        attributing complexity and order to natural processes alone.
      </>,
      <>
        These perspectives need not be mutually exclusive. They can simply represent different
        interpretive lenses applied to the same underlying reality.
        <FootnoteLink number={10} />
      </>,
    ],
  },
  {
    id: "why",
    title: "Why Are We Here?",
    footerId: "footer-why",
    paragraphs: [
      <>At extreme limits, many distinctions collapse.</>,
      <>
        At the <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a>, the usual
        distinctions between “here” and “there,” or “now” and “then,” mathematically vanish. This
        physical limit suggests that separation is not fundamental, but an emergent feature of how
        reality is structured.
      </>,
      <>
        What we experience as an expansive universe may be a single, self-consistent informational
        process expressed across space, time, and scale. Distance, duration, and individuality are
        not illusions. They are the structures that make experience possible.
      </>,
      <>
        In Holos, life exists because observation allows reality to differentiate itself. Conscious
        systems do not merely occupy the universe. They participate in its realization. When a
        system reaches sufficient integration, expressed as <a href="/definition">Φ ≥ Φ_c</a>,
        possibility becomes experience.
        <FootnoteLink number={11} />
      </>,
    ],
  },
  {
    id: "holos",
    title: "⊛ Holos",
    paragraphs: [
      <>
        The symbol ⊛ denotes a relational operator. Unlike standard multiplication, it does not act
        on isolated values or scale quantities. Instead, it represents structured composition, where
        relationships are preserved as the operation is applied repeatedly. In formal terms, it can
        be modeled as an <a href="https://en.wikipedia.org/wiki/Functor">endofunctor</a> acting on
        informational states. A full treatment appears in <a href="/logic">Logic</a>.
      </>,
      <>
        Holos derives from the Greek <em>ὅλος</em>, meaning “whole.” It names the recursive coupling
        of Creation and Observation as two inseparable aspects of reality. Creation generates
        possibilities. Observation selects and registers experience. The result feeds back into the
        process. This relationship is expressed as <em>R = C ⊛ O</em> and developed formally in{" "}
        <a href="/logic">Logic</a>.
      </>,
      <>
        The ⊛ operator is <strong>structural, not dynamical</strong>. It does not introduce a
        physical force or describe change over time. Instead, it specifies how possibility and
        experience are logically connected within spacetime. In this sense, ⊛ describes an{" "}
        <a href="https://en.wikipedia.org/wiki/Ontology">ontological</a> relationship: how reality
        arises through the recursive interaction of what can exist and what is observed.
      </>,
    ],
  },
];
