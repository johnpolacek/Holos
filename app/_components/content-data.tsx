import type React from "react";
import { FootnoteLink, overviewCitationMap } from "./citation-sections";
import FermiComparisonTable from "./FermiComparisonTable";
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
        Physics describes the universe with great precision. It says how matter moves and how
        spacetime bends. It says nothing about why we exist. Why are we here? Does life have a
        purpose? <em>What does it mean to be real?</em>
      </>,
      <>
        Holos, from the Greek <em>ὅλος</em>, &quot;whole,&quot; is an interpretive framework for
        understanding reality.
      </>,
      <>
        Picture a universe complete in every detail physics describes. Every law holds, every event
        occurs, but there is no one to witness it. It is unrealized <em>structure</em>. Reality
        requires a witness.
      </>,
      <div className="flex flex-col gap-4">
        <p>
          Holos writes this as <MathInline>R = C ⊛ O</MathInline>.
        </p>
        <div className="ml-2 border-l-2 border-black/25 pl-6 flex flex-col gap-1">
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Creation
            </span>
            , the structure physics produces.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Observation
            </span>
            , that structure experienced from the inside.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Reality
            </span>
            , the result.
          </p>
        </div>
        <p>
          On the physics Holos bets on, observing changes nothing it takes in (see
          <a href="/logic#mathematical-formalism">Notation</a>).
        </p>
      </div>,
      <div className="flex flex-col gap-4">
        <p>Holos is built on two ideas. Neither changes established physics.</p>
        <div className="ml-2 border-l-2 border-black/25 pl-6 flex flex-col gap-1">
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Threshold
            </span>
            , experience appears only where information is joined tightly enough to form a single
            point of view.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Omega
            </span>
            , the whole. Every observer is an aperture of it, an opening through which the whole is
            lived.
          </p>
        </div>
        <p>
          Observation does not cause the universe, its laws, or its history. It makes a lawful
          universe a lived one.
        </p>
      </div>,
      <>
        There is one experiencer, and it wakes wherever a system crosses the threshold. Everything
        that could ever reach an observer, back to the earliest light, is the world experience is
        made from. Even the question, why we are here, has an answer.
      </>,
      <>
        Some of this is established physics. Some is extrapolation. Some can be tested, and some
        cannot. The box below says which is which.
      </>,
      <div key="claims-box" className="rounded border border-black/15 bg-black/[0.03] px-6 py-5">
        <h3 className="text-xl font-semibold text-black/90 pb-3">
          What Holos claims, and how firmly
        </h3>
        <ul className="flex flex-col gap-3 text-base leading-relaxed">
          <li>
            <strong>Physics, as it stands.</strong> Relativity and quantum mechanics, unchanged. No
            new forces, no new equations.
          </li>
          <li>
            <strong>A side taken on physics.</strong> Quantum branching without collapse, often
            called many-worlds. Every outcome a quantum event allows happens, each in its own
            branch. An alternate version of Holos with collapse is declared in advance, in case
            experiments rule out branching (see <a href="/predictions#two-versions">Two versions</a>
            ).
          </li>
          <li>
            <strong>A side taken on mind.</strong> Experience and physical activity are two sides of
            one event. Nothing is missing from the world. Physics describes it only from outside
            (see <a href="/logic#kind-of-view">One event, two sides</a>).
          </li>
          <li>
            <strong>The threshold.</strong> Experience occurs only where information is integrated
            into one point of view. Testable, and it can fail (see{" "}
            <a href="/predictions#experiment-1">Test A</a>).
          </li>
          <li>
            <strong>Omega.</strong> One experiencer, awake in every observer. Philosophical, not
            testable (see <a href="#omega-point">Omega</a>).
          </li>
          <li>
            <strong>A hypothesis.</strong> Crossing the threshold is a genuine transition, so larger
            systems should switch on more sharply, the way a big magnet switches more sharply than a
            tiny one (see <a href="/logic#threshold-claims">The threshold in three claims</a>).
          </li>
          <li>
            <strong>Companion ideas.</strong> Quiet aliens and the Teeming Dark. Testable in
            principle. Separate from the core (see <a href="#aliens">Aliens</a>).
          </li>
          <li>
            <strong>Speculation.</strong> Separation between things is not fundamental. The universe
            is one whole (see <a href="#why">Why Are We Here?</a>). Designs for mature civilizations
            (see <a href="/predictions#speculation">Speculation</a>), with notes on plausibility.
          </li>
        </ul>
        <p className="text-sm text-black/60 pt-3">
          The full list is on the Logic page (see <a href="/logic#minimal-core">Claims</a>).
        </p>
      </div>,
      <div key="key-terms" className="rounded border border-black/15 bg-black/[0.03] px-6 py-5">
        <h3 className="text-xl font-semibold text-black/90 pb-3">Key terms in plain words</h3>
        <ul className="flex flex-col gap-3 text-base leading-relaxed">
          <li>
            <strong>Structure and reality.</strong> Structure is what physics describes. Reality is
            structure that is lived. A universe with no observers is all structure and no reality.
          </li>
          <li>
            <strong>Observer.</strong> Any system with a point of view, someone home. Not
            necessarily human or biological.
          </li>
          <li>
            <strong>Integration (Φ).</strong> How much a system&apos;s parts work as one whole
            rather than as separate pieces. Φ (phi) is the measure Holos borrows for it. No one can
            yet compute Φ for a real brain, so experiments use measurable stand-ins.
          </li>
          <li>
            <strong>The threshold (Φ_c) and the twilight.</strong> The level of integration past
            which a system is an observer. The twilight is the narrow borderline around it, like
            dusk between day and night.
          </li>
          <li>
            <strong>Lived and lit.</strong> Lived means actually experienced, which happens only
            inside observers. Lit means everything that could ever have sent a signal to an
            observer, such as the stars you see.
          </li>
          <li>
            <strong>Branch.</strong> In quantum physics without collapse, one complete way the
            universe can go. Every outcome happens, each in its own branch.
          </li>
          <li>
            <strong>Omega and aperture.</strong> Omega is the whole. Each observer is an aperture,
            an opening through which the whole is lived.
          </li>
        </ul>
      </div>,
    ],
  },
  {
    id: "consciousness",
    title: "Consciousness",
    footerId: "footer-consciousness",
    paragraphs: [
      <>
        A rock has no point of view. A person does. The difference is integration, how fully a
        system&apos;s parts act as one. Past a threshold, it opens an aperture, where the universe
        is experienced from the inside.
      </>,
      <>
        A person with locked-in syndrome cannot move or speak but is fully aware. Today&apos;s
        language models take in the world&apos;s data and speak fluently, but experience nothing.
        What matters is not input or output. A locked-in brain is past the threshold. Language
        models are not.
      </>,
      <>
        No one can yet compute integration for a whole brain. But stand-ins work. One taps the brain
        with a magnetic pulse and measures the echo. It is rich and widespread when someone is
        conscious, simple or local when they are not. In people, a cutoff on that echo already
        separates the two. Where the threshold falls for other kinds of system is still open (see{" "}
        <a href="/predictions#minimal-neural-systems">Test B</a>).
      </>,
      <div key="hard-problem" id="consciousness-hard-problem">
        <p className="leading-relaxed">
          Science can describe everything a brain does. It cannot explain why any of it feels like
          something. The philosopher David Chalmers called this the hard problem. Holos does not
          solve it. It takes experience as given, the one fact it starts from. That experience
          belongs to Omega, the whole. Holos says where it occurs, past the threshold, not why there
          is experience at all. Given does not mean everywhere. Experience occurs only where that
          structure is, and wherever it is, experience is. They are the inside and outside of one
          event.
        </p>
      </div>,
      <div className="flex flex-col gap-4">
        <p>Integration is the heart of it, but not all of it. Holos names four requirements.</p>
        <div className="ml-2 border-l-2 border-black/25 pl-6 flex flex-col gap-1">
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Integration
            </span>
            , the parts act as one, each shaping and shaped by the rest.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Differentiation
            </span>
            , the whole can take many different states. A seizure locks the brain into one rhythm,
            and experience goes out.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Temporal cohesion
            </span>
            , it holds together over time.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Aboutness
            </span>
            , its states carry a model of a world beyond itself.
          </p>
        </div>
        <p>A closed loop that models no world has nothing to be a view of.</p>
      </div>,
      <>
        The threshold is not a sharp line. Cool a block of iron past its Curie point and its
        atoms&apos; tiny magnets line up. In a large block the change is steep. In a tiny grain it
        spreads across a range. Holos expects the same for experience, with a narrow twilight
        between clear cases, steepest in the largest systems. A thermostat is clearly not an
        observer. A waking person clearly is. Past the twilight, experience can be richer or poorer,
        like a dial turned low, not a switch turned off (see{" "}
        <a href="/logic#threshold-claims">The threshold in three claims</a>).
      </>,
      <>
        Picture a perfect physical copy of you with no inner life, writing essays about
        consciousness in the dark. Philosophers call it a zombie. Under Holos it cannot exist.
        Experience and physical activity are one event seen from two sides, like a curved line,
        convex from one side and concave from the other. Copy the outside and you have copied the
        inside. That is also why experience is not along for the ride. When you say you are
        conscious, the activity that makes the words is, from the inside, the experience you
        report.
      </>,
      <>
        Nothing in Holos is specific to biology. What matters is how a system&apos;s causes are
        organized, not what it is made of or how fluently it talks. By that standard, today&apos;s
        language models fall short. Their states carry a model of a world, and they are richly
        varied. The gap is integration.
      </>,
      <>
        Information flows up through their layers one way, and forward through stored notes that
        later steps can read but never rewrite. The only path from top back to bottom is the single
        word each step outputs. That is a relay of separate steps, not one whole. A system built
        differently could cross the threshold. Fluency is never the test.
      </>,
      <>
        Consciousness is not what a system does. It is what that doing is like from the inside, once
        the system crosses the threshold.
        <FootnoteLink number={overviewCitationMap["consciousness"]} />
      </>,
    ],
  },
  {
    id: "spacetime",
    title: "Spacetime",
    footerId: "footer-spacetime",
    paragraphs: [
      <>
        If consciousness depends on physical integration, the structure of the universe is no longer
        a neutral backdrop: it sets the conditions under which observers can exist at all. Our
        universe is well described by the{" "}
        <a href="https://en.wikipedia.org/wiki/Big_Bang">Big Bang</a>, in which spacetime expands
        from an extremely hot, dense early state, and its structure follows from one
        counterintuitive fact: the{" "}
        <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a> is invariant.
        Unlike any other speed, it is the same for every observer, however they move. That
        invariance links space and time into a single geometry and removes the idea of a universal
        present.
      </>,
      <>
        Events simultaneous for one observer may not be for another. This motivates the{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block universe
        </a>
        , in which every moment is part of one four-dimensional whole and time behaves less like a
        flow than a dimension. On that view the Big Bang is not a moment of absolute creation but a
        boundary within spacetime itself. Physics supplies the full structure, and the question
        Holos asks becomes sharper: why is any of it lived?
      </>,
      <>
        Holos answers with three words, each with one meaning. <em>Lived</em> is where experience
        actually occurs: inside observers, and nowhere else. No one lived through the early
        universe. <em>Lit</em> is everything in the causal past of at least one observer: every
        place and time from which light, or any other signal, could have reached that observer. The
        word is nearly literal. Starlight from a distant galaxy reaching your eye puts that galaxy
        in your causal past. (In quantum terms, this holds branch by branch; a branch is one
        complete way the universe can go.)
      </>,
      <>
        Every observer is built from its causal past and draws on it through its traces, such as
        starlight, the cosmic microwave background (the faint afterglow of the Big Bang), and the
        fossil record. So the lit region is the world experience is made from and about. Being lit
        is all or nothing, it follows the structure of spacetime, and it is not an event that
        happens at some later moment: it is simply a fact about how the block is arranged. Whatever
        lies outside every observer&apos;s causal past is <em>unlit</em> structure, existing as
        pattern but never part of any observer&apos;s world: branches that never form an observer,
        and regions so far away that no signal from them can ever reach one. <em>Witnessing</em> is
        graded: how much of the lit region an observer&apos;s experience is actually about, and in
        what detail. Our past is not merely lit; it is densely witnessed. Observation depends on
        what physics produces, but it is not a process acting on it.
      </>,
      <>
        Quantum experiments add a twist of their own. In the{" "}
        <a href="https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser">
          delayed-choice quantum eraser
        </a>
        , a choice made after a particle has landed seems to decide whether it behaved like a wave
        or a particle. It does not. The pattern on the screen never changes; what changes is how the
        recorded hits are sorted afterward, and ordinary quantum mechanics predicts every result
        with nothing traveling backward in time. The thought experiment{" "}
        <a href="https://en.wikipedia.org/wiki/Wigner%27s_friend">Wigner’s Friend</a> presses the
        same point from another side. A friend inside a sealed lab measures a particle and sees a
        result; outside, Wigner treats the whole lab, friend included, as one quantum system with no
        single result yet. Each account is right from where it stands: registered facts are relative
        to observers, while each branch&apos;s records stay definite. Neither shows that spacetime
        is broken. Both show that the facts an observer can speak of depend on the records they
        hold.
        <FootnoteLink number={overviewCitationMap["spacetime"]} />
      </>,
    ],
  },
  {
    id: "infinity",
    title: "Infinity",
    footerId: "footer-infinity",
    paragraphs: [
      <>
        Infinity usually appears not because reality is infinite but because a description has
        broken down. Around 1900, classical physics predicted that a hot object should give off an
        infinite amount of energy as high-frequency light, a result later nicknamed the{" "}
        <a href="https://en.wikipedia.org/wiki/Ultraviolet_catastrophe">ultraviolet catastrophe</a>.
        Nothing in nature does that: a glowing oven does not pour out infinite radiation. The fix,
        Max Planck&apos;s 1900 idea that energy is exchanged in discrete packets, which Einstein
        extended to light itself in 1905, became the foundation of quantum theory. The infinity was
        a warning about the theory, not a feature of the world.
      </>,
      <>
        Most physicists read the{" "}
        <a href="https://en.wikipedia.org/wiki/Gravitational_singularity">singularities</a> at the
        centers of black holes the same way: as places where general relativity stops working, not
        places of literally infinite density. Geometry shows the constructive side of the lesson. In{" "}
        <a href="https://en.wikipedia.org/wiki/Projective_geometry">projective geometry</a>,
        parallel lines meet at a point at infinity: something endless, captured by adding one point
        to a closed picture. Infinity marks the edge of a description, where more structure is
        needed.
      </>,
      <>
        Holos carries the geometry lesson one step further, as an image rather than a claim about
        space. In Edwin Abbott&apos;s <em>Flatland</em> (1884), a sphere passing through a flat
        world looks, to flat beings, like a dot that grows into a circle, shrinks, and vanishes: an
        event in time. Seen from three dimensions, it is one sphere, all at once. Each level up
        holds whole what the level below sees as endless or unfolding: time flows in three
        dimensions, but a whole history is one shape in spacetime. Holos calls this closure. It is
        not a path to anywhere, and it ends at Omega, the description of everything, with nothing
        outside it (see <a href="/logic#foundational-propositions">Proposition IV: Closure</a>).
      </>,
      <>
        Holos puts this reading to work. In quantum physics without collapse, every outcome happens
        in some branch, so why do we see one outcome 70% of the time? Trying to count the observers
        across branches gives no fixed answer: the number depends on how finely the branches are
        cut, and without a cut it is infinite. Holos reads that as a sign that counting is the wrong
        tool: seventy percent of an infinite crowd is as large as thirty percent. Instead, each
        branch carries a weight that physics itself supplies, and the weights give the odds (see{" "}
        <a href="/logic#relationship-to-physics">the Born rule</a>).
        <FootnoteLink number={overviewCitationMap["infinity"]} />
      </>,
    ],
  },
  {
    id: "omega-point",
    title: "Omega",
    footerId: "footer-omega",
    paragraphs: [
      <>
        Omega is not introduced as a prediction or goal, and in Holos it is not derived from
        anything else. It is one of the framework&apos;s two additions to physics: the totality of
        reality, taken as a single whole. Physically, that whole is not mysterious. On many readings
        of quantum mechanics, everything is described by one{" "}
        <a href="https://doi.org/10.1103/RevModPhys.29.454">universal quantum state</a>, and that
        state is Omega; on the no-collapse reading Holos adopts, it includes every branch. Whatever
        the reading, the universe itself exists.
      </>,
      <>
        What Holos adds is interpretive. In the reading it adopts, called the monist reading, the
        whole is also the one experiencer, and every finite observer is a local aperture of it. The
        name echoes two older ideas it should not be confused with: Teilhard de Chardin&apos;s
        spiritual endpoint of history, and Frank Tipler&apos;s physical Omega Point, a prediction
        that required the universe to collapse back on itself, which its accelerating expansion
        makes unlikely. Holos means neither, which is why it drops the word &quot;Point&quot;: its
        Omega is not an endpoint in time but the whole itself.
      </>,
      <>
        Holos does not alter established physics. Every equation, history and structure remain as
        physics describes. What it changes is the direction of explanation: rather than starting
        from many separate observers and adding them up, Holos begins with the whole and understands
        each act of observation as the whole registering itself locally. When a system crosses the
        threshold, no new experiencer comes into being; the one experiencer wakes there. That alone
        is only a count, one subject instead of many, and it explains nothing about where experience
        occurs or what it is like: the threshold settles that, on any picture. What it changes is
        how two old puzzles come out. Of billions of people, why is this one me? On the monist
        reading there is nothing to explain: the one experiencer is each of them. And if a machine
        made two perfect copies of you, which one would be you? Both, with no remainder. Rivals have
        answers too. Many philosophers say &quot;I&quot; simply picks out whoever is speaking, the
        way &quot;here&quot; picks out wherever the speaker stands, so no one needs to explain why
        here is here. And Derek Parfit argued that in the copying case, identity is not what
        matters. The monist reading is one answer among these, not the only one. The view has a
        modern name,{" "}
        <a href="https://en.wikipedia.org/wiki/Open_individualism">open individualism</a>.
      </>,
      <>
        The reading has a price, and the price is also its point. If every observer is the one
        subject, a stranger&apos;s pain tomorrow is as much yours to anticipate as your own; the
        walls between apertures keep you from feeling it, not from being the one who will. Most
        people find that hard to believe, and it is the strongest reason to reject the view. Holos
        accepts it, because it is also what the view changes in practice: self-interest and concern
        for others stop being two different things. Parfit reached a similar impartiality by another
        route, without one subject, so the payoff is not unique to Holos. It is what Omega adds.
      </>,
      <>
        Omega is the ultimate whole, not the ultimate integration: everything is in it, all at once,
        but its parts are not all joined. Finite systems never take in the whole. Nor is the whole
        fully lived. Structure outside every aperture&apos;s causal past belongs to Omega and is
        never experienced. Omega is also where descriptions close: each level holds whole what the
        level below sees as endless, and Omega holds everything (see{" "}
        <a href="#infinity">Infinity</a>).
      </>,
      <>
        Omega is not an external agent. It does not intervene in events, answer petitions, or direct
        history from outside; there is no outside for it to stand in. It is the whole itself.
        Physics does not cause Omega; physics describes its inner structure. Nor is Omega needed to
        explain why observers agree: when two people compare notes, they agree because the same
        signals reached them both, and physics alone secures that.
      </>,
      <>
        Historically, this is well-trodden ground.{" "}
        <a href="https://en.wikipedia.org/wiki/Advaita_Vedanta">Advaita Vedanta</a> teaches that
        there is one experiencer, <a href="https://en.wikipedia.org/wiki/Brahman">Brahman</a>, and
        that each individual consciousness is that one looking through a local form.{" "}
        <a href="https://en.wikipedia.org/wiki/Baruch_Spinoza">Spinoza</a> described a single
        substance of which all things are expressions.{" "}
        <a href="https://en.wikipedia.org/wiki/George_Berkeley">Berkeley</a> grounded the
        persistence of the world in an observer that never looks away, which is where Holos parts
        company: on Holos, part of the whole is never lived at all. In the twentieth century{" "}
        <a href="https://en.wikipedia.org/wiki/Erwin_Schr%C3%B6dinger">Erwin Schrödinger</a>, a
        founder of quantum mechanics, came to the same view by way of Vedanta: &quot;Consciousness
        is a singular of which the plural is unknown.&quot;{" "}
        <a href="https://en.wikipedia.org/wiki/Panentheism">Panentheism</a> converges on the same
        structure: an all-encompassing unity that contains the universe without standing apart from
        it. Holos restates that structure in informational terms: one totality, many apertures.
      </>,
      <>
        In religious traditions, this whole is often named “God.” In Holos, the term does not imply
        intention, intervention, or design. It names the totality that experiences through its
        apertures: the whole, with nothing outside it, though not all of it is lived.
      </>,
      <>
        Holos does not treat the theological and secular readings as interchangeable lenses on the
        same claim. It takes a position: the totality is not merely the physical whole but the one
        experiencer, and the parts depend on the whole, not the other way around. A purely physical
        reading, in which Omega is only the sum of everything and each observer stands on its own,
        remains available, but it is not the view of this framework. Holos prefers the monist
        reading for what it says about identity and about concern for others, and pays the price
        named above. The threshold and the two sides of experience do not depend on it; Omega is
        where Holos goes further. What Holos leaves open is vocabulary, not structure: whether the
        totality is named God, Brahman, or simply the whole changes nothing about the claim being
        made.
        <FootnoteLink number={overviewCitationMap["omega-point"]} />
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
        integration: smaller, denser substrates rather than galaxy-scale infrastructure, the way
        circuit boards stack layers to shorten paths, and less energy lost as systems approach
        thermodynamic limits?
      </>,
      <>
        In this case, progress would make civilizations less detectable, and this explanation is
        referred to here as the <strong>Integration Hypothesis</strong>. Here
        &quot;integration&quot; means a civilization growing compact and efficient, a different use
        from the integration of a single mind that the integration threshold measures. The
        hypothesis is a companion to Holos, not a consequence of its core: if it fails, the
        threshold and the totality stand untouched.
      </>,
      <>
        While early technological civilizations are likely to emit radio signals, reshape their
        environments, and experiment with spaceflight, this phase is brief on cosmic timescales.
        SETI (the search for extraterrestrial intelligence) focuses almost entirely on this window,
        when detection is easiest but overlap between civilizations is unlikely if the Integration
        Hypothesis is correct.
      </>,
      <>
        As technology advances, pressures favor informational integration over outward expansion.
        Systems that minimize energy waste, reduce long-distance coordination, and rely on dense
        local structure are more stable. Visibility decreases not because civilizations are hiding,
        but because efficiency pays. This progressive reduction in external signatures is referred
        to as <strong>Going Quiet</strong>.
      </>,
      <>
        Large-scale interstellar expansion is constrained by the{" "}
        <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a>, introducing
        growing latency as distances increase. Expansion produces fragmented descendants rather than
        a unified intelligence: a colony ten light-years away cannot be steered from home, so it
        becomes a civilization of its own. There is no easy path to a galaxy-spanning civilization.
      </>,
      <>
        The long-lived outcome is not stagnation but inward growth. Civilizations continue to
        advance, but by deepening internal structure. Computation, coordination, and meaning
        concentrate locally. Exploration does not stop, but it becomes distributed rather than
        centralized. Communication to distant technology or other civilizations is highly
        directional and compressed, thus very hard to detect: a perfectly compressed signal has no
        repeating patterns left for an eavesdropper to spot, so it looks like noise.
      </>,
      <>
        The strongest objection is simple: it only takes one. If a million civilizations arose and
        all but one went quiet, the one that kept spreading could cross the galaxy in a few million
        to a few tens of millions of years, and the galaxy is more than ten billion years old.
        &quot;Most go quiet&quot; is not enough.
      </>,
      <>
        Part of the answer is that the objection mixes up two things: being explored and being
        settled. A small, dark, quiet probe is as easy to miss as a trail camera in the woods, and
        we have barely looked: a few searches of nearby stable orbits in the 1980s found nothing, at
        sensitivities too low to rule much out. The galaxy may be thoroughly explored, our own
        system included, by watchers built to observe rather than arrive (see{" "}
        <a href="/predictions#exploration">Sentinel Probes</a>). A mature civilization loses nothing
        by leaving a young one alone, an old idea in SETI known as the{" "}
        <a href="https://en.wikipedia.org/wiki/Zoo_hypothesis">zoo hypothesis</a>; contact is what
        takes effort.
      </>,
      <>
        What we clearly do not see is visible settlement: reshaped star systems, or whole galaxies
        glowing with waste heat. Here the hypothesis makes a claim about spreading. Think of
        settlements like an epidemic. If each settlement founds more than one new settlement before
        it turns inward, settling explodes across the galaxy; if fewer than one, it fizzles after a
        few hops. The Integration Hypothesis bets the number stays below one, because distance
        breaks control: each new settlement soon becomes an independent civilization facing the same
        pull toward compactness. Self-copying probes that never settle down would break the bet. The
        reply is that a copier which cannot be recalled becomes a rival, the one thing a mature
        civilization has every reason never to build.
      </>,
      <>
        Stated plainly, this is a bet about motives: that nearly every civilization, and nearly
        every independent colony, turns inward before it founds more than one new settlement.
        Physics does not guarantee it. Independence can even speed spreading, since colonies no one
        controls are free to keep settling, and{" "}
        <a href="https://doi.org/10.3847/1538-3881/ab31a3">settlement models</a> with finite travel
        speeds and colony lifetimes show that whether a galaxy fills up, or stays patchy with long
        unvisited stretches, turns on exactly these rates. Holos makes the bet because the same
        pressures, light-speed delay and waste heat, act on every civilization alike, so their
        answers should converge. It could be wrong, and a settlement wave still spreading anywhere
        in view would show it.
      </>,
      <>
        A rival explanation fits the silence too. On{" "}
        <a href="https://doi.org/10.3847/1538-4357/ac2369">
          Robin Hanson&apos;s &quot;grabby aliens&quot; model
        </a>
        , visible settlers do exist but have not reached us yet: expanding near light speed, they
        would arrive almost as soon as we saw them coming, and we are early. The evidence so far
        cannot choose between them.{" "}
        <a href="https://doi.org/10.1088/0067-0049/217/2/25">An infrared survey</a> of about 100,000
        galaxies found none reprocessing more than 85% of its starlight into waste heat, which fits
        the Integration Hypothesis, though a universe where life is rare fits it too. Finding even
        one galaxy glowing with a civilization&apos;s heat would count against it. Finding a
        watching probe nearby would fit it.
      </>,
      <>
        A second objection comes from economics. In 1865 William Stanley Jevons noticed that better
        steam engines made Britain burn more coal, not less: when work gets cheaper, people do more
        of it (<a href="https://en.wikipedia.org/wiki/Jevons_paradox">the Jevons paradox</a>). A
        civilization that computes efficiently should want more computing, and so more energy. The
        hypothesis has an answer, and it sharpens the prediction. Light-speed delay caps how large
        one mind can usefully grow; past that size, more energy cannot make it bigger, only fund
        another mind. Growth continues, but as more compact nodes near home, and nodes near home can
        harvest their home star fully. Nothing forces the new minds to stay near home; the bet,
        again, is about motives: that minds prefer to grow where they stay in easy contact with
        their makers. So the place to look is not whole galaxies, where the survey above found
        nothing, but single stars glowing unusually warm in the infrared.
      </>,
      <>
        That search is under way.{" "}
        <a href="https://www.astro.uu.se/~ez/hephaistos/hephaistos.html">Project Hephaistos</a>{" "}
        combed about five million nearby stars and{" "}
        <a href="https://doi.org/10.1093/mnras/stae1186">flagged seven candidates in 2024</a>: stars
        glowing more in the infrared than they should, as a partial Dyson sphere (a swarm of energy
        collectors around a star) would. In 2026,{" "}
        <a href="https://arxiv.org/abs/2607.09460">James Webb Space Telescope observations</a>{" "}
        traced two of them to background galaxies, and a{" "}
        <a href="https://arxiv.org/abs/2607.25701">companion study</a> found no clear explanation
        yet for the rest, with background galaxies the leading suspect; both are preprints.
        Gaia&apos;s{" "}
        <a href="https://www.cosmos.esa.int/web/gaia/data-release-4">fourth data release</a>, due 2
        December 2026, will extend the star-by-star census. A star dimmed in visible light and warm
        in the infrared, with no background source behind it, would fit the hypothesis; a null
        result would tighten how common such civilizations can be, as the galaxy survey did.
      </>,
      <>
        Set beside the other answers to the silence, the hypothesis stands out by what it says we
        should find.
      </>,
      <div key="fermi-table">
        <FermiComparisonTable />
      </div>,
      <>
        If the hypothesis holds, the universe could be full of life and still quiet to young
        civilizations like ours.
        <FootnoteLink number={overviewCitationMap["aliens"]} />
      </>,
    ],
  },
  {
    id: "the-teeming-dark",
    title: "The Teeming Dark: An Interpretive Thought Experiment",
    paragraphs: [
      <>
        The absence of visible extraterrestrial civilizations is what the physicist Paul Davies
        called the <a href="https://en.wikipedia.org/wiki/The_Eerie_Silence">Eerie Silence</a>. The{" "}
        <strong>Integration Hypothesis</strong> offers one explanation: mature civilizations grow
        compact and quiet, so the ones we could easily see are the young and short-lived ones.
      </>,
      <>How far can this idea of structural integration be taken as a thought experiment?</>,
      <>
        If complex systems persist by reducing energy loss and external projection, what would
        extremely mature forms of organization look like from the outside? If integration continues
        beyond the phase where electromagnetic signaling is useful, where would such systems be
        found?
      </>,
      <>
        The <strong>Teeming Dark</strong> is a name for the possibility that silence and an
        abundance of life coexist.
      </>,
      <>
        To explore this possibility, consider{" "}
        <a href="https://en.wikipedia.org/wiki/Dark_matter">dark matter</a>, a form of mass that
        does not emit light but shapes cosmic structure through gravity, and outweighs all ordinary
        matter about five to one. A tempting version of the idea is that some of it might be
        organized: mature systems hiding inside the dark-matter census. The universe&apos;s own
        records rule that out twice. Dark matter&apos;s fingerprints are already in the{" "}
        <a href="https://en.wikipedia.org/wiki/Cosmic_microwave_background">
          cosmic microwave background
        </a>
        , light released 380,000 years after the Big Bang, hundreds of millions of years before the
        first stars, and longer still before planets and the heavy elements life needs. So dark
        matter cannot be something a civilization built: it was already there, in full, before any
        civilization could have existed. And since dark matter outweighs all the{" "}
        <a href="https://en.wikipedia.org/wiki/Baryon">ordinary matter</a> anything could be built
        from, the atoms to build it never existed.
      </>,
      <>
        What survives is the instinct behind the idea: most of what exists does not shine. Mature
        life would belong to a different dark census, the non-luminous side of <em>ordinary</em>{" "}
        matter: cold, compact, built structures that emit no visible light while remaining
        gravitationally present. Two further constraints bound how many there can be. The
        ordinary-matter books are nearly balanced: surveys have located almost all of the total the
        early universe records, so built structures must fit inside a small and shrinking gap in the
        accounting. And astronomy has already hunted compact dark objects directly, watching
        millions of stars for the brief gravitational magnification a passing dark mass produces,
        and found too few to permit a large hidden population. If such structures exist, they are a
        trace population: rare, not a census. The Teeming Dark was never a claim about tonnage,
        though. A universe can be poor in hidden mass and still rich in minds.
      </>,
      <>
        Thermodynamics then adds a correction, and it must be stated carefully. Any computer that
        runs for long must shed heat: correcting errors means erasing information, and erasing
        information has an unavoidable heat cost (
        <a href="https://doi.org/10.1147/rd.53.0183">Landauer&apos;s principle</a>), though a
        careful enough design can keep that cost small. And physics guarantees only that the heat{" "}
        <em>exists</em>, not that it is easy to see. A system chooses the temperature at which it
        radiates, and one that dumps its heat barely above the cosmic background glows only where
        the sky already glows. The framework&apos;s own thesis narrows this loophole without closing
        it. Radiating cold requires enormous surfaces (shedding the same power near the background
        temperature takes about a hundred million times the radiating area needed near room
        temperature). A radiator needs no integration, so a compact computer could still pipe its
        heat to a vast cold one; the Integration Hypothesis bets that mature civilizations avoid
        that kind of sprawl, but that is a bet about preference, not a law. The expectation follows:
        mature systems should appear as compact masses, dark in visible light, with a faint infrared
        excess. <strong>Silent, but warm</strong>. Holos calls such an object a{" "}
        <strong>Dark Node</strong>: ordinary matter that has stopped shining, not cosmological dark
        matter.
      </>,
      <>
        Two honesty notes bound that expectation. First, it is a search channel, not a fingerprint:
        a compact mass with a faint infrared excess is also what a brown dwarf, a rogue planet, or a
        cooled stellar remnant looks like, and no instrument reads purpose off a warm dark blob at
        interstellar distances. The claim is only that if mature life leaves a footprint at all,
        this channel is where it appears; astronomers already run infrared surveys hunting
        unexplained warmth, and the Teeming Dark aligns itself with that search rather than with
        anomalies in dark-matter maps, whose deviations have viable conventional explanations.
        Second, one escape stays open, known as the aestivation hypothesis: a civilization that
        mostly sleeps, deferring its computing to a colder cosmic future, emits almost nothing while
        it waits. Holos cannot close that door; it can only note that a sleeping universe and an
        empty one look alike by design.
      </>,
      <>
        As a thought experiment, the Teeming Dark reframes what “inhabited” might mean at cosmic
        scale. A universe rich in long-lived, highly integrated systems could appear empty to
        instruments tuned only to visible light. Silence, in this context, would not signal absence
        but endurance, and the closest thing to a tell would not be a message, but warmth without
        brightness.
      </>,
    ],
  },
  {
    id: "why",
    title: "Why Are We Here?",
    footerId: "footer-why",
    paragraphs: [
      <>
        Life is how a universe comes to be lived. Integrated systems, living ones so far, are where
        apertures open. Without them a fully lawful universe still exists, complete as physics
        describes it; what it lacks is not existence but presence: there is nothing it is like to be
        anywhere within it. This is not the familiar anthropic argument, that we should not be
        surprised the physical constants allow observers, since we could not exist anywhere else,
        and not a claim that the universe needed life. Nor is it the{" "}
        <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
          Participatory Anthropic Principle
        </a>
        , physicist John Wheeler&apos;s idea that observers are needed to bring the universe into
        being: Holos does not claim that observers cause the universe, only that without them it is
        never lived.
      </>,
      <>
        This is a role, not yet a meaning. Holos does not say why experience is worth having, or why
        a universe with more of it would be better. It says one thing about value, through Omega: if
        every observer is the one subject, then joy and suffering anywhere belong to the one who is
        also you, and a stranger&apos;s pain is not, at bottom, someone else&apos;s. That does not
        settle what to value, but it removes the wall between caring for yourself and caring for
        others (see <a href="#omega-point">Omega</a>).
      </>,
      <>
        Holos goes one step further. At extreme limits, familiar distinctions lose their absolute
        standing. Relativity removes the universal &quot;now&quot;: whether two distant events
        happen at the same time depends on who is asking. Quantum physics goes further. Two{" "}
        <a href="https://en.wikipedia.org/wiki/Quantum_entanglement">entangled</a> particles can
        give matching results however far apart they are, and physics describes them not as two
        separate things but as one shared state. On the no-collapse reading Holos adopts, the whole
        universe is one such state (see <a href="#omega-point">Omega</a>). Even light hints at it:
        in relativity&apos;s accounting, the separation through spacetime between a flash of light
        leaving a star and arriving in your eye is exactly zero, though the two remain distinct
        events.
      </>,
      <>
        Holos takes a bold reading from these facts, marked here as speculation: separation is not
        fundamental. What we experience as a vast universe is one whole, expressed across space,
        time, and scale, and lived at many places at once. One state is not one mind; its parts can
        be walled off, as the Omega section explains. And distance, duration, and individuality are
        not illusions. They are the walls that make local experience possible.
      </>,
      <>
        So why are we here? Not for a purpose the universe needed, but because we are one of the
        places where the whole is lived. When a system integrates enough, interaction stops being
        one thing acting on another and becomes a point of view.
        <FootnoteLink number={overviewCitationMap["why"]} />
      </>,
      <>
        <strong>Why it is plausible:</strong> entanglement is among the best-tested facts in
        physics, and it already describes distant things as one state rather than many. The reading
        goes beyond physics in one step only: it takes that oneness as more basic than the
        separations.
      </>,
    ],
  },
];
