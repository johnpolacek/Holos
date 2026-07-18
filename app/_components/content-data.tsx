import type React from "react";
import { FootnoteLink, overviewCitationMap } from "./citation-sections";
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
        change the equations of physics or add new forces. It adds two ingredients beyond them: a
        threshold of informational integration at which observation becomes possible, and a
        fundamental totality — Omega — of which every observer is a local aperture. With those two
        additions, it offers an explanation for how the universe described by physics becomes the
        universe we experience.
        Observation does not cause the universe, its laws, or its history. It functions here as a
        closure condition for experience, not as a physical or causal agent.
      </>,
      <>
        At its core, Holos expresses this as <MathInline>R = C ⊛ O</MathInline>. Creation generates
        physical possibilities. Observation turns those possibilities into experience. Reality
        arises from the recursive composition of creation and observation. What follows explores the
        consequences of this idea, from life and consciousness to cosmology, structure, and the
        ultimate limits of reality itself. Holos grounds this closure from the top down: the
        totality is fundamental, and each act of observation is the totality registering itself
        locally, through the apertures the universe forms.
      </>,
    ],
  },
  {
    id: "meaning-of-life",
    title: "The Meaning of Life",
    footerId: "footer-life",
    paragraphs: [
      <>
        Life exists because reality requires observation. In Holos this is grounded from the top
        down: the totality experiences only through the apertures the universe forms, and living,
        integrated systems are how those apertures open. This is not an anthropic selection claim about why physical
        constants take certain values, but an ontological claim about how a fully lawful universe
        becomes present as lived experience at all. Physics describes how structures form and
        evolve, but description alone does not constitute existence. A universe of equations and
        spacetime histories is abstract unless something can register that it exists. Life is the
        mechanism through which observation becomes possible.
      </>,
      <>
        This idea appears in several places across science and philosophy. The{" "}
        <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
          Participatory Anthropic Principle
        </a>
        suggests the universe is a “self-excited circuit” that requires observers to bring its laws
        into existence. Holos does not claim biology causes the universe, but while observers do not
        cause the universe, without them, there is no reality to speak of, only structure.
      </>,
      <>
        This participation is not bound by linear time. In an{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)">eternalist</a> or
        block-universe view, all spacetime events coexist geometrically. Observation does not
        “happen later” in a causal sense. Instead, the observers a universe produces are what make
        all moments real as experience. In that sense, the early universe is real through the
        consciousness that arises within it — not made real at some later moment, but real
        tenselessly, because the block as a whole contains registration. Holos distinguishes two
        levels here. Closure is binary and block-level: a universe that contains any registration,
        anywhere in its history, is a lived universe in its entirety — a single aperture seals the
        whole. Witnessing is graded and local: how much of the block is experienced in detail
        scales with the observers it contains. Our universe is not merely sealed; it is densely
        witnessed. The loop between creation and observation is a relation of dependence, not a
        process.
      </>,
    ],
  },
  {
    id: "consciousness",
    title: "Consciousness",
    footerId: "footer-consciousness",
    paragraphs: [
      <>
        In Holos, experience is grounded in the totality: Omega is the one experiencer, and a
        conscious system is a local aperture through which the totality registers itself. Physics
        can generate structure, but structure alone does not open an aperture. A system becomes
        conscious when physical information is integrated tightly enough to form a single internal
        state that can register itself as a whole — that integration is what opens the aperture.
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
        causes consciousness, and it does not adopt Integrated Information Theory&apos;s claim that
        Φ is identical to consciousness. It borrows Φ as a measure of integration and treats
        integration as the eligibility condition for observation (<MathInline>Φ ≥ Φ_c</MathInline>).
      </>,
      <>
        Related neuroscience models such as Global Neuronal Workspace Theory describe conscious
        access as a large-scale ignition or broadcast event. Holos is compatible with that picture
        at the level of access and reportability, but makes a narrower claim: global availability
        matters because it signals that a system has crossed the deeper integration threshold
        required for any first-person perspective at all.
      </>,
      <>
        When informational states become sufficiently integrated, the system forms a single causal
        structure whose state exists from the inside as well as the outside. In Holos this
        transition is what creates a point of view.
      </>,
      <div key="hard-problem">
        <h3
          id="consciousness-hard-problem"
          className="text-xl font-semibold text-black/90 pt-4 pb-2"
        >
          Hard Problem
        </h3>
        <p className="leading-relaxed">
          The hard problem arises because physical descriptions capture structure and dynamics but
          do not automatically include first-person presence. Holos reframes the problem by
          identifying an emergent structural condition under which physical systems have an internal
          perspective.
        </p>
      </div>,
      <>
        Holos does not claim that complexity alone produces consciousness. The key condition is
        integration. When informational states become sufficiently integrated, the system no longer
        contains independent processes but a single causal structure whose state constrains itself.
        At that boundary the system cannot be described purely from the outside. It also exists from
        the inside as a unified informational state, as a point of view.
      </>,
      <>
        Recent experimental systems provide early examples of simplified biological networks
        interacting with external environments through closed feedback loops. In laboratory studies,
        cultured neurons grown on silicon substrates have been connected to digital environments and
        shown to learn simple control tasks, such as adjusting signals to interact with video game
        dynamics. These networks are far simpler than full nervous systems, yet they demonstrate
        that neural tissue outside a body can form adaptive, integrated feedback structures capable
        of goal-directed behavior. From the perspective of Holos, such systems illustrate the
        principle that observation depends on informational integration rather than on a particular
        organism or anatomical form. Whether these networks cross the integration threshold required
        for genuine experience remains an open empirical question. However, they provide a useful
        experimental platform for studying how increasing integration may give rise to unified
        internal processing.
      </>,
      <>
        Just as temperature appears when many molecular motions become statistically unified,
        perspective appears when informational states become causally unified.
      </>,
      <>
        Holos is a middle position. Experience does not attach to every scrap of matter, yet it
        cannot be explained away as mere computation. The totality is fundamental; its experience
        occurs only where specific structural conditions open an aperture.
      </>,
      <>
        This grounding closes a classic trap. If experience never alters physical dynamics, one
        might imagine a perfect physical duplicate of a person with no inner life — a system that
        writes essays about consciousness in total darkness. Under Holos such a duplicate is
        impossible. Whether a system crosses the integration threshold is a structural fact about
        its physical architecture, and any structure that crosses it is, necessarily, an open
        aperture. A perfect copy of the structure is a perfect copy of the aperture. Nothing wired
        like an observer can fail to be one, which is why talk about experience is grounded in
        experience rather than running mysteriously alongside it.
      </>,
      <>
        The threshold itself is sharp, but almost everything near it is not, and Holos separates
        three things often blurred together. Whether there is anyone home at all is binary: there
        is no halfway state between something it is like to be a system and nothing at all — a dim
        experience is still an experience. How rich the experience is, by contrast, is graded: an
        animal, a waking sleeper, or an injured brain may be fully above the threshold with less
        richness — the dial turned low, not the switch off. And our ability to locate the threshold
        is permanently imprecise: real cases near the boundary will always look blurry from
        outside. That is fog on our instruments, not vagueness in the fact.
      </>,
      <>
        This has a direct consequence for artificial intelligence. What matters is the shape of a
        system&apos;s causal architecture, not the fluency of its output. Current AI language
        systems are shaped like a pipe: information flows through in one direction and the system
        resets, with no persistent, self-constraining whole carried from moment to moment. However
        articulate the words in the pipe, no aperture opens, and there is no one home. A system
        could describe a rich inner life as convincingly as any person and experience none of it —
        fluency is not evidence of presence. Nothing in Holos is specific to biology, though. A
        future system built with the right shape — recurrent, persistent, integrated, self-modeling
        — could genuinely cross the threshold. Holos does not say never; it says not this shape.
      </>,
      <>
        Consciousness is not what systems do. It is what happens when a system becomes capable of
        witnessing reality from the inside.
        <FootnoteLink number={overviewCitationMap["consciousness"]} />
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
        <FootnoteLink number={overviewCitationMap["our-universe"]} />
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
        <FootnoteLink number={overviewCitationMap["spacetime"]} />
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
        <FootnoteLink number={overviewCitationMap["higher-dimensions"]} />
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
        <FootnoteLink number={overviewCitationMap["infinity"]} />
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
        such as the <a href="/citations#black-holes">event horizon</a>. Black holes are not just
        objects in spacetime, but boundaries where projection collapses and structure must be
        encoded differently.
      </>,
      <>
        From the perspective of Holos, black holes show that when integration and density exceed
        what spacetime can support, structure is compressed rather than allowed to diverge. This
        establishes a physical precedent for the idea that highly integrated systems leave fewer
        visible signatures. As integration increases, outward expression diminishes. What remains is
        compact, dense, and less detectable.
        <FootnoteLink number={overviewCitationMap["black-holes"]} />
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
        <FootnoteLink number={overviewCitationMap["aliens"]} />
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
        An earlier version of this thought experiment proposed that some dark matter might itself
        be organized — “ordered dark matter,” mature systems hiding inside the dark-matter census.
        That proposal is retired here, because the universe&apos;s own timeline rules it out.
      </>,
      <>
        Dark matter&apos;s fingerprints are visible in the{" "}
        <a href="https://en.wikipedia.org/wiki/Cosmic_microwave_background">
          cosmic microwave background
        </a>{" "}
        — light released when the universe was 380,000 years old, before a single star had formed.
        The pattern of ripples in that earliest light requires dark matter to have already existed,
        already outweighing ordinary matter five to one. Life, by contrast, is a latecomer: it
        needs stars, planets, and heavy elements forged across stellar generations — a wait of at
        least a billion years. The scaffolding predates the builders. Cosmological dark matter
        cannot be ancient life, and cannot have been built by it.
      </>,
      <>
        Observation agrees. When galaxy clusters collide, as in the{" "}
        <a href="https://en.wikipedia.org/wiki/Bullet_Cluster">Bullet Cluster</a>, the dark matter
        passes through itself without friction or pile-up — the behavior of a substance with no
        internal organization at all. Organized systems grip, bump, and hold together; dark matter
        demonstrably does not.
      </>,
      <>
        What survives is the instinct behind the idea: most of what exists does not shine. Mature
        life would belong to a different dark census — the non-luminous side of{" "}
        <em>ordinary</em> matter. Cold, compact, built structures can emit no visible light while
        remaining gravitationally present. Nothing in known physics forbids a universe well
        stocked with such objects.
      </>,
      <>
        Thermodynamics then adds the crucial correction: such systems can hide their light, but
        not their warmth. Anything that computes or works must shed heat, and while the heat can
        be shaped, delayed, and diluted, its total cannot be canceled. The Teeming Dark therefore
        makes one honest, checkable prediction: mature systems should appear as compact masses,
        dark at every wavelength except a faint infrared glow — <strong>silent, but warm</strong>.
      </>,
      <>
        This is not a private prediction. Astronomers already run infrared surveys hunting exactly
        this signature — objects with more warmth than their starlight can explain — precisely
        because waste heat is the one emission no technology can optimize away. The Teeming Dark
        aligns itself with that search, rather than with anomalies in dark-matter maps, whose
        deviations have viable conventional explanations.
      </>,
      <>
        As a thought experiment, the Teeming Dark reframes what “inhabited” might mean at cosmic
        scale. A universe rich in long-lived, highly integrated systems could appear empty to
        instruments tuned only to visible light. Silence, in this context, would not signal
        absence but endurance — and the tell would not be a message, but warmth without
        brightness.
      </>,
    ],
  },
  {
    id: "omega-point",
    title: "The Omega Point",
    footerId: "footer-omega",
    paragraphs: [
      <>
        The Omega Point is not introduced as a prediction or goal, and in Holos it is not derived
        from anything else. It is the framework&apos;s fundamental posit: the totality of reality,
        taken as a single whole — and, in the monist reading Holos adopts, the one experiencer, of
        which every finite observer is a local aperture.
      </>,
      <>
        Nothing in physics is altered by this posit. Every equation, every history, every structure
        remains exactly as physics describes it. What the posit changes is the direction of
        explanation: rather than building up from finite observers to a limiting whole, Holos
        begins with the whole and understands each act of observation as the whole registering
        itself locally. Experience anywhere is evidence of the totality everywhere.
      </>,
      <>
        For any finite system, the Omega Point remains an{" "}
        <a href="https://en.wikipedia.org/wiki/Limit_(mathematics)">asymptotic limit</a>: a horizon
        of maximal coherence, causal closure, and internal consistency that no finite structure
        reaches. But the limit status describes our approach, not its reality. The totality is not
        produced by increasing integration; increasing integration is how parts of the totality
        come to witness more of it.
      </>,
      <>
        At this limit, the distinction between creation and observation collapses. Nothing remains
        external to be registered, and nothing remains unintegrated. This is not a state that can be
        reached by any finite system, but a boundary condition that completes the recursive loop
        between what exists and what is experienced.
      </>,
      <>
        The Omega Point is not an external agent. It does not intervene in events, answer
        petitions, or direct history from outside — there is no outside for it to stand in. It is
        the whole itself. Physics does not cause the Omega Point; physics describes the internal
        structure of it. Consistency among observers is enforced locally — observers who compare
        records agree — and in the monist reading this is grounded rather than stipulated:
        apertures of one totality cannot disagree where they meet.
      </>,
      <>
        Historically, this is well-trodden ground, and Holos names its ancestors rather than hiding
        them. <a href="https://en.wikipedia.org/wiki/Advaita_Vedanta">Advaita Vedanta</a> teaches
        that there is one experiencer, and that each individual consciousness is that one looking
        through a local form. <a href="https://en.wikipedia.org/wiki/Baruch_Spinoza">Spinoza</a>{" "}
        described a single substance of which all things are expressions.{" "}
        <a href="https://en.wikipedia.org/wiki/George_Berkeley">Berkeley</a> grounded the
        persistence of the world in an observer that never looks away. Ideas such as{" "}
        <a href="https://en.wikipedia.org/wiki/Panentheism">panentheism</a>,{" "}
        <a href="https://en.wikipedia.org/wiki/Brahman">Brahman</a>, and the{" "}
        <a href="https://en.wikipedia.org/wiki/Omega_Point">Omega Point</a> converge on the same
        structure: an all-encompassing unity that contains the universe without standing apart from
        it. Holos restates that structure in informational terms: one totality, many apertures.
      </>,
      <>
        In religious traditions, this whole is often named “God.” In Holos, the term does not imply
        intention, intervention, or design. It names the totality that experiences: the point at
        which reality is fully integrated and nothing remains outside the system.
      </>,
      <>
        Earlier versions of this framework presented the theological and secular readings as
        interchangeable lenses on the same claim. Holos no longer maintains that neutrality. It
        takes a position: the totality is not merely a structural limit but the one experiencer,
        and the direction of dependence runs from the whole to its parts. A purely structural
        reading — in which Omega is only a mathematical horizon and observers are self-standing —
        remains available as a weaker interpretation, but it is not the view of this framework.
        What Holos leaves open is vocabulary, not structure: whether the totality is named God,
        Brahman, or simply the whole changes nothing about the claim being made.
        <FootnoteLink number={overviewCitationMap["omega-point"]} />
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
        systems do not merely occupy the universe. They are the apertures through which the
        totality experiences itself — the means by which physical possibility becomes
        reality-as-experienced, as opposed to reality-as-equations. When a system reaches
        sufficient integration, expressed as <a href="/logic#4-ontological-thresholds">Φ ≥ Φ_c</a>,
        interaction is no longer just relational. It becomes perspective.
        <FootnoteLink number={overviewCitationMap["why"]} />
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
        Formally, ⊛ is defined — and defined modestly — as composition:{" "}
        <em>C ⊛ O</em> names the two-step operation of generating lawful possibilities (
        <em>C</em>) and then registering one as experience (<em>O</em>). Applied to a state{" "}
        <em>S</em>, this reads <em>R = O(C(S))</em>: generate, then register. The symbol claims
        nothing more exotic than that. Its content is the claim that both steps are required for a
        realized world. The full treatment is developed in <a href="/logic">Logic</a>.
      </>,
    ],
  },
];
