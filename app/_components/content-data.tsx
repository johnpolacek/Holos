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
        propose new physical laws or challenge established physics. Instead, it offers an
        explanation for how the universe described by physics becomes the universe we experience.
      </>,
      <>
        At its core, Holos expresses this as <MathInline>R = C ⊛ O</MathInline>. Creation generates
        physical possibilities. Observation turns those possibilities into experience. Reality
        arises from the recursive composition of creation and observation. What follows explores the
        consequences of this idea, from life and consciousness to cosmology, structure, and the
        ultimate limits of reality itself.
      </>,
    ],
  },
  {
    id: "meaning-of-life",
    title: "The Meaning of Life",
    footerId: "footer-life",
    paragraphs: [
      <>
        Life exists because reality requires observation. Physics describes how structures form and
        evolve, but description alone does not constitute existence. A universe of equations and
        spacetime histories is abstract unless something can register that it exists. Life is the
        mechanism through which observation becomes possibl.
      </>,
      <>
        This idea appears in several places across science and philosophy. The{" "}
        <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
          Participatory Anthropic Principle
        </a>
        suggests the universe is a “self-excited circuit” that requires observers to bring its laws
        into existence. <a href="https://en.wikipedia.org/wiki/Biocentrism_(ethics)">Biocentrism</a>
        , more controversially, argues that life is not a byproduct of the universe but a central
        organizing feature. Holos does not claim biology causes the universe, but while observers do
        not cause the universe, without them, there is no reality to speak of, only structure.
      </>,
      <>
        This participation is not bound by linear time. In an{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)">eternalist</a> or
        block-universe view, all spacetime events coexist geometrically. Observation does not
        “happen later” in a causal sense. Instead, the observers a universe produces are what make
        all moments real as experience. In that sense, the early universe becomes real through the
        consciousness that eventually arises within it, closing the loop between creation and
        observation.
      </>,
    ],
  },
  {
    id: "consciousness",
    title: "Consciousness",
    footerId: "footer-consciousness",
    paragraphs: [
      <>
        Consciousness is not fundamental as a substance, but is fundamental as a condition. Physics
        can generate structure, but structure alone does not produce observation. A system becomes
        conscious when physical information is integrated tightly enough to form a single internal
        state that can register itself as a whole.
      </>,
      <>
        This distinguishes integration from computation or recursion. Many systems process
        information, model their environment, or even model themselves, yet nothing is experienced.
        Integration marks the boundary where distributed processes stop behaving as independent
        parts and instead function as a unified perspective. Below that boundary, there is no
        experience at all. Above it, experience becomes unavoidable.
      </>,
      <>
        Measures like Φ are useful because they track this transition empirically. When integration
        in the brain is disrupted, such as under anesthesia, experience fragments or disappears.
        When integration returns, unified experience returns with it. Holos does not claim that Φ
        causes consciousness. It treats integration as the eligibility condition for observation.
      </>,
      <>
        Consciousness is not what systems do. It is what happens when a system becomes capable of
        witnessing reality from the inside.
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
        If consciousness depends on physical integration, then the structure of the universe is no
        longer a neutral backdrop. It sets the conditions under which observers can exist at all.
        Our universe is well described by the{" "}
        <a href="https://en.wikipedia.org/wiki/Big_Bang">Big Bang</a> where spacetime expands from
        an extremely hot and dense early state. We experience this as three spatial dimensions and
        one temporal dimension, together forming{" "}
        <a href="https://en.wikipedia.org/wiki/Spacetime">spacetime</a>.
      </>,
      <>
        One way to understand this is the{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block universe view
        </a>
        , where all moments in time exist as part of a single four-dimensional geometry.
      </>,
      <>
        From this perspective, the Big Bang is not a moment of absolute creation, but a boundary
        within spacetime itself. If all histories already exist geometrically, then the role of
        observation becomes sharper. Physics supplies the full structure, but not an explanation for
        why it is registered as reality.
      </>,
      <>
        This raises the next question. If spacetime is a complete geometric object, what is its
        structure?
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
        invariance links space and time into a single geometric structure and removes the idea of a
        universal present.
      </>,
      <>
        Events that are simultaneous for one observer may not be for another. It is from this
        concept that leads to interpretations such as the{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block universe
        </a>
        , where past, present, and future coexist as parts of a four-dimensional whole rather than
        unfolding as absolute moments. In other words, time behaves less like a flow and more like a
        dimension.
      </>,
      <>
        A useful boundary case is light itself. Along a photon’s trajectory, the{" "}
        <a href="https://en.wikipedia.org/wiki/Proper_time">proper time</a> is zero, and its path is
        described as a <a href="https://en.wikipedia.org/wiki/Null_geodesic">null geodesic</a>{" "}
        connecting spacetime events. While this does not define a physical frame of reference, it
        illustrates how spacetime geometry can collapse distance and duration without violating
        <a href="https://en.wikipedia.org/wiki/Causality_(physics)">causality</a>.
      </>,
      <>
        Quantum experiments such as the{" "}
        <a href="https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser">
          delayed-choice quantum eraser
        </a>{" "}
        and thought experiments like{" "}
        <a href="https://en.wikipedia.org/wiki/Wigner%27s_friend">Wigner’s Friend</a>
        suggest that consistency in physics is enforced globally rather than by simple temporal
        sequence of events. Together, these results suggest that spacetime, as we describe it, may
        be an effective structure, but it is also incomplete.
      </>,
      <>
        If coherence can outrun what four dimensions can support, additional descriptive frameworks
        are required.
        <FootnoteLink number={4} />
      </>,
    ],
  },
  {
    id: "extrapolation",
    title: "A Note on Extrapolation",
    paragraphs: [
      <>
        The sections that follow (Higher Dimensions, Black Holes, Aliens, God, Why Are We Here?)
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
        Higher dimensions appear in physics not as additional places, but as mathematical structures
        required to describe complex relationships. When systems become too interdependent to be
        tracked within three spatial dimensions and one time dimension, higher-dimensional
        descriptions become unavoidable. They describe how structure is organized, not where
        anything goes.
      </>,
      <>
        In many physical theories, additional dimensions are treated as constrained degrees of
        freedom rather than extended space. They are{" "}
        <a href="https://en.wikipedia.org/wiki/Compactification_(physics)">compactified</a> or
        hidden from direct observation, yet they shape observable laws and constants.
      </>,
      <>
        Higher dimensions are often imagined as places advanced systems might move into. That
        interpretation mistakes description for location. We already exist within higher-dimensional
        mathematical spaces. We simply interact with a restricted subset of them.
      </>,
      <>
        As systems become more integrated, coherence depends less on spatial separation and more on
        <a href="https://en.wikipedia.org/wiki/Principle_of_locality">local structure</a>. This can
        be understood as structural reorientation rather than motion. Like modern circuit boards
        stacking layers to shorten paths, integrated systems reduce effective distance without
        violating physical limits. Causality,{" "}
        <a href="https://en.wikipedia.org/wiki/Thermodynamics">thermodynamics</a>, and the speed of
        light still apply.
      </>,
      <>
        From this perspective, higher-dimensional observation becomes necessary as integration
        increases. It is not an external viewpoint, but a limiting description that emerges when
        many relationships must be considered simultaneously rather than sequentially. At the
        extreme limit, this converges on an idealized observer where creation and observation
        coincide. This limit is <a href="https://en.wikipedia.org/wiki/Asymptote">asymptotic</a>,
        not reachable, and marks the boundary where further structural distinction ceases to be
        meaningful.
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
        Infinity does not usually appear because reality is infinite, but because a representation
        has broken down. In
        <a href="https://en.wikipedia.org/wiki/Projective_geometry">projective geometry</a>,
        parallel lines intersect at a point at infinity, not because infinity has been made finite,
        but because unbounded extension can be encoded within a closed structure. Infinity marks the
        edge of a descriptive framework, where additional structure is required to preserve
        coherence.
      </>,
      <>
        The same idea appears in physics. Light provides a useful boundary case. Along a photon’s
        trajectory, the <a href="https://en.wikipedia.org/wiki/Proper_time">proper time</a> is zero,
        so emission and absorption are connected without duration. Distance is not removed, but it
        collapses under a different perspective. From within spacetime, light traverses distance.
        From the limit of its path, extension disappears. This does not violate physics, but it
        shows how infinities can arise from perspective rather than substance.
      </>,
      <>
        From the Holos perspective, infinities appear as warnings, not features. Resolving them
        requires either additional structure or a boundary that enforces consistency. In physics,
        those boundaries are not abstract. They appear as real, measurable limits.
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
        Black holes are regions of spacetime where gravity becomes so strong not even light can
        escape. At their cores, classical physics predicts singularities, which are best understood
        not as literal infinities, but as signals that a description has failed. In this sense,
        black holes compress extreme structure into finite regions and expose the limits of
        spacetime as a representational framework.
      </>,
      <>
        Modern physics suggests that information is not destroyed by black holes, but reorganized.
        The <a href="https://en.wikipedia.org/wiki/Holographic_principle">holographic principle</a>{" "}
        proposes that all information contained within a volume can be represented on its boundary,
        such as the <a href="#footer-blackholes">event horizon</a>. Black holes are not just objects
        in spacetime, but boundaries where projection collapses and structure must be encoded
        differently.
      </>,
      <>
        From the perspective of Holos, black holes show that when integration and density exceed
        what spacetime can support, structure is compressed rather than allowed to diverge. This
        establishes a physical precedent for the idea that highly integrated systems leave fewer
        visible signatures. As integration increases, outward expression diminishes. What remains is
        compact, dense, and less detectable.
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
      </>,
      <>
        We often assume that as civilizations advance, they expand outward, build megastructures and
        become increasingly visible. But what if the opposite is true? What if advancement favors
        integration, using smaller, denser substrates rather than galaxy-scale infrastructure, and
        reducing energy loss as systems approach thermodynamic limits.
      </>,
      <>
        In this case, progress would make civilizations less detectable, and this explanation is
        referred to here as the <strong>Integration Hypothesis</strong>.
      </>,
      <>
        While early technological civilizations are likely to emit radio signals, reshape their
        environments, and experiment with spaceflight, this phase is brief on cosmic timescales.
        SETI efforts focus almost entirely on this window, when detection is easiest but overlap
        between civilizations is unlikely if the Integration Hypothesis is correct.
      </>,
      <>
        As technology advances, pressures favor informational integration over outward expansion.
        Systems that minimize energy waste, reduce long-distance coordination, and rely on dense
        local structure are more stable. Visibility decreases not because civilizations are hiding,
        but because inefficiency is selected against. This progressive reduction in external
        signatures is referred to as <strong>Visibility Collapse</strong>.
      </>,
      <>
        Large-scale interstellar expansion is constrained by the{" "}
        <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a>, introducing
        growing latency as distances increase. Expansion produces fragmented descendants rather than
        a unified intelligence. There is no stable path to a galaxy-spanning civilization.
      </>,
      <>
        The long-lived outcome is not stagnation but inward growth. Civilizations continue to
        advance, but by deepening internal structure. Computation, coordination, and meaning
        concentrate locally. Exploration does not stop, but it becomes distributed rather than
        centralized. Communication to distant technology or other civilizations is highly
        directional and compressed, thus very hard to detect.
      </>,
      <>
        The result is a universe that is full of life, but quiet to pre-integrated observers.
        <FootnoteLink number={8} />
      </>,
    ],
  },
  {
    id: "the-teeming-dark",
    title: "The Teeming Dark: An Interpretive Thought Experiment",
    paragraphs: [
      <>
        The absence of visible extraterrestrial civilizations is often described as the{" "}
        <a href="https://en.wikipedia.org/wiki/The_Eerie_Silence">Eerie Silence</a>. One way to
        account for this silence is through selection effects and informational integration, as
        proposed by the <strong>Integration Hypothesis</strong>.
      </>,
      <>How far can this idea of structural integration be taken as a thought experiment?</>,
      <>
        The thought experiment begins with a simple question. If complex systems persist by reducing
        energy loss and external projection, what would extremely mature forms of organization look
        like from the outside? If integration continues beyond the phase where electromagnetic
        signaling is useful, where would such systems be found?
      </>,
      <>
        In this view, three-dimensional spacetime functions as a developmental environment.
        Complexity becomes visible during an early, inefficient phase when systems radiate, expand,
        and explore openly. As optimization proceeds, external visibility decreases. Maturity does
        not require disappearance, but it may naturally coincide with silence.
      </>,
      <>
        The <strong>Teeming Dark</strong> is a name for the possibility that silence and an
        abundance of life coexist.
      </>,
      <>
        To explore this possibility, consider{" "}
        <a href="https://en.wikipedia.org/wiki/Dark_matter">dark matter</a>, a form of mass that
        does not emit light but shapes cosmic structure through gravity. It is cold, persistent, and
        largely invisible to electromagnetic observation. Its abundance exceeds that of visible
        matter by roughly a factor of five.
      </>,
      <>
        To further speculate, we can propose two categories of dark matter. The first is -{" "}
        <strong>primordial dark matter</strong>, the more commonly understood diffuse, collisionless
        - component that emerged in the early universe and provided scaffolding for galaxy
        formation. It remains largely unchanged over time.
      </>,
      <>
        A second, purely hypothetical category can be introduced:{" "}
        <strong>ordered dark matter</strong>. This does not refer to a new particle or a revised
        cosmological model, but to the idea that structure without electromagnetic emission could,
        in principle, become increasingly organized over cosmic timescales.
      </>,
      <>
        If integration favors persistence, then the most enduring large-scale structures would be
        those that minimize energetic leakage while remaining gravitationally bound. From our
        perspective, such structures would appear dark, cold, and inert, even if internally complex.
        In this speculative view, some fraction of non-luminous mass could include highly integrated
        systems that no longer project strongly into electromagnetic space.
      </>,
      <>
        This framing allows for conditional expectations. If ordered dark matter exists, we would
        expect some dark matter structures to deviate subtly from purely collisionless behavior,
        especially in long-lived, dynamically stable environments. Such deviations might appear as
        persistent small-scale granularity, anisotropy, or coherence in gravitational lensing data,
        rather than as new forces or particles.
      </>,
      <>
        Standard models predict smooth halo profiles, such as{" "}
        <a href="https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile">
          NFW profiles
        </a>
        , yet real galaxies show deviations that remain actively studied. Conventional explanations
        include baryonic feedback, mergers, and measurement limits.
      </>,
      <>
        Recent high-resolution surveys, including deep-field observations with the{" "}
        <a href="https://en.wikipedia.org/wiki/James_Webb_Space_Telescope">
          James Webb Space Telescope
        </a>
        , have revealed small-scale structure in galactic mass distributions that is not yet fully
        understood. The Teeming Dark does not challenge existing explanations, but asks a different
        question. If long-lived integration leaves gravitational traces without light, what would
        those traces look like?
      </>,
      <>
        Under this thought experiment, maturity would not be measured by brightness or expansion,
        but by gravitational texture. Older systems would appear quieter, denser, and more locally
        structured, not because they are engineered, but because persistence favors compactness and
        stability.
      </>,
      <>
        This interpretation does not claim to resolve existing tensions in cosmology, nor does it
        propose an alternative to standard models. However, it expands the space of interpretations
        by questioning an implicit assumption: that non-luminous structure must also be simple or
        inert. If this assumption is incomplete, some discrepancies may reflect limits in our
        interpretive framework rather than errors in measurement.
      </>,
      <>
        As a thought experiment, the Teeming Dark reframes what “inhabited” might mean at cosmic
        scale. A universe rich in long-lived, highly integrated systems could appear empty if our
        instruments are tuned only to light. Silence, in this context, would not signal absence, but
        endurance.
      </>,
    ],
  },
  {
    id: "omega-point",
    title: "The Omega Point",
    footerId: "footer-omega",
    paragraphs: [
      <>
        One way to interpret the structure of reality is through a limit concept. If informational
        integration continues without bound, it approaches an idealized state of maximal coherence,
        causal closure, and internal consistency. In Holos, this corresponds to an{" "}
        <a href="https://en.wikipedia.org/wiki/Limit_(mathematics)">asymptotic limit</a>, not a
        physical destination, but a horizon toward which integration tends.
      </>,
      <>
        At this limit, the distinction between creation and observation collapses. Nothing remains
        external to be registered, and nothing remains unintegrated. This is not a state that can be
        reached by any finite system, but a boundary condition that completes the recursive loop
        between what exists and what is experienced.
      </>,
      <>
        In this sense, the Omega Point is not an agent and does not act on the universe. It is a
        structural completion. It represents the limit where reality is fully self-consistent, with
        no remaining separation between possibility and experience.
      </>,
      <>
        Historically, many philosophical and theological traditions have gestured toward similar
        limit concepts. Ideas such as{" "}
        <a href="https://en.wikipedia.org/wiki/Panentheism">panentheism</a>,{" "}
        <a href="https://en.wikipedia.org/wiki/Brahman">Brahman</a>, and the{" "}
        <a href="https://en.wikipedia.org/wiki/Omega_Point">Omega Point</a> describe an
        all-encompassing unity that contains the universe without standing apart from it. While
        their languages differ, they converge on the idea of a maximal, self-complete whole.
      </>,
      <>
        In religious traditions, this limit is often named “God.” In Holos, the term does not imply
        intention, intervention, or design. It names the same asymptotic structure described in
        secular terms: the point at which reality is fully integrated and nothing remains outside
        the system.
      </>,
      <>
        Atheistic interpretations describe the same limit without invoking divinity, attributing the
        emergence of global coherence to natural processes alone. From this perspective, the Omega
        Point is not consciousness acting on reality, but the inevitable structural consequence of
        unbounded integration.
      </>,
      <>
        These interpretations are not mutually exclusive. They represent different lenses applied to
        the same underlying claim: that reality, at its limit, forms a unified whole where creation
        and observation are no longer distinct.
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
        At the <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a>, concepts
        like “here” and “there,” or “now” and “then,” lose their meaning. This is not a
        philosophical claim but a physical one. It suggests that separation is not fundamental, but
        an emergent feature of how reality is structured.
      </>,
      <>
        What we experience as an expansive universe may instead be understood as a single,
        self-consistent informational process expressed across space, time, and scale. Distance,
        duration, and individuality are not illusions. They are the constraints that make localized
        experience possible.
      </>,
      <>
        In Holos, life exists because observation allows reality to close on itself. Conscious
        systems do not merely occupy the universe. They are the means by which physical possibility
        becomes reality-as-experienced, as opposed to reality-as-equations. When a system reaches
        sufficient integration, expressed as <a href="/definition">Φ ≥ Φ_c</a>, interaction is no
        longer just relational. It becomes perspective.
        <FootnoteLink number={11} />
      </>,
    ],
  },
  {
    id: "holos",
    title: "⊛ Holos",
    paragraphs: [
      <>
        The symbol ⊛ denotes a relational operator. Unlike standard multiplication, it does not
        combine quantities or scale values. Instead, it represents structured composition, where
        relationships are preserved as the operation is applied. Informally, it describes how two
        processes remain coupled rather than reduced to a single result.
      </>,
      <>
        Holos derives from the Greek <em>ὅλος</em>, meaning “whole.” It names the recursive coupling
        of Creation and Observation as two inseparable aspects of reality. Creation generates
        physical possibilities. Observation registers experience. Each constrains the other. This
        relationship is expressed as <em>R = C ⊛ O</em>.
      </>,
      <>
        The ⊛ operator is <strong>structural, not dynamical</strong>. It does not describe a force,
        a mechanism, or an evolution in time. Instead, it specifies a closure condition: how
        possibility becomes reality only when physical structure is taken up into experience. In
        this sense, ⊛ is an ontological relation, not a physical law. It describes how reality is
        completed, not how it moves.
      </>,
      <>
        Formally, ⊛ can be modeled as a structure-preserving mapping over informational states,
        similar in spirit to an <a href="https://en.wikipedia.org/wiki/Functor">endofunctor</a>. A
        more precise treatment of this interpretation is developed in <a href="/logic">Logic</a>.
      </>,
    ],
  },
];
