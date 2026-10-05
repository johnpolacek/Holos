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
          It is shorthand, not an equation to calculate with. On the physics Holos bets on,
          observing changes nothing it takes in (see
          <a href="/logic#mathematical-formalism">Notation</a>). No one lived through the early
          universe, but it is part of reality as the past observers are built from.
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
        There is one experiencer, living through every self. Everything that could ever reach an
        observer, back to the earliest light, is the world experience is made from. Even the
        question, why we are here, has an answer.
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
            <strong>Omega.</strong> One experiencer, living through every self. Philosophical, not
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
        awake, simple when they are deeply unconscious. Dreams are the hard case. People woken from
        non-REM sleep or sedation often report dreaming while the whole-brain echo looks
        unconscious, so Holos also measures the back of the brain, where dream reports seem to live
        (see <a href="/predictions#experiment-1">Test A</a>). Where the threshold falls for other
        kinds of system is still open (see{" "}
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
        conscious, the activity that makes the words is, from the inside, the experience you report.
      </>,
      <>
        Nothing in Holos is specific to biology. What matters is how a system&apos;s causes are
        organized, not what it is made of or how fluently it talks. By that standard, today&apos;s
        language models fall short. Their states carry a model of a world, and they are richly
        varied. The gaps are integration and time.
      </>,
      <>
        Information flows up through their layers one way, and forward through stored notes that
        later steps can read but never rewrite. Some newer models loop through their layers on each
        word, but the loop ends with the word, and no working state lasts to the next. That is a
        relay of separate steps, not one whole. A system built differently could cross the
        threshold, though even its chip would have to act as one (see{" "}
        <a href="/logic#artificial-systems">Artificial Systems</a>). Fluency is never the test.
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
        The <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a> is the same
        for every observer, however they move. No other speed behaves this way. That one fact links
        space and time into a single geometry, and it removes any universal &quot;now.&quot;
      </>,
      <>
        Two events at the same time for one observer can be at different times for another. This
        leads many physicists to picture the universe as a{" "}
        <a href="https://en.wikipedia.org/wiki/Eternalism_(philosophy_of_time)#Block_universe">
          block
        </a>
        , every moment part of one four-dimensional whole, with the{" "}
        <a href="https://en.wikipedia.org/wiki/Big_Bang">Big Bang</a> as its edge. Why is any of it
        lived?
      </>,
      <div className="flex flex-col gap-4">
        <p>Holos answers with three words.</p>
        <div className="ml-2 border-l-2 border-black/25 pl-6 flex flex-col gap-1">
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Lived
            </span>
            , where experience occurs, inside observers and nowhere else. No one lived through the
            early universe.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Lit
            </span>
            , everything that could ever have sent a signal to an observer. Starlight reaching your
            eye puts its galaxy in your past.
          </p>
          <p>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}>
              Unlit
            </span>
            , what no signal could ever carry to any observer, such as regions too far away, or
            branches that never form one.
          </p>
        </div>
        <p>
          Every observer is built from its lit past and draws on it through traces such as
          starlight, the afterglow of the Big Bang, and the fossil record. The lit region is the
          world experience is made from. Being lit is not something that happens to a place. It is a
          fact about how the block is arranged.
        </p>
      </div>,
      <>
        Quantum experiments seem to bend this. In the{" "}
        <a href="https://en.wikipedia.org/wiki/Delayed-choice_quantum_eraser">
          delayed-choice quantum eraser
        </a>
        , a choice made after a particle lands seems to decide how it behaved. It does not. The
        pattern on the screen never changes. Only the sorting of hits afterward does, and ordinary
        quantum mechanics predicts every result with nothing moving backward in time.
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
        At the center of a black hole, general relativity predicts{" "}
        <a href="https://en.wikipedia.org/wiki/Gravitational_singularity">infinite density</a>. Most
        physicists read that as the theory breaking down, not as something real. Infinity usually
        marks the edge of a description. Geometry shows the other side. In{" "}
        <a href="https://en.wikipedia.org/wiki/Projective_geometry">projective geometry</a>,
        parallel lines meet at a point at infinity, something endless captured by adding one point
        to a closed picture.
      </>,
      <>
        In Edwin Abbott&apos;s <em>Flatland</em>, a sphere passing through a flat world looks, to
        flat beings, like a dot that grows into a circle, shrinks, and vanishes. From above, it is
        one sphere, all at once. Holos calls this closure. What one level sees unfolding, the level
        above holds whole. A history is one shape in spacetime. Taken all the way, closure gives
        Omega, the whole, with nothing outside it (see{" "}
        <a href="/logic#foundational-propositions">Proposition IV</a>).
      </>,
      <>
        If every outcome of a quantum event happens, each in its own branch, why do we see one
        outcome 70 percent of the time? Counting observers will not answer it. The count depends on
        how finely the branches are cut, and without a cut it is infinite. Seventy percent of an
        infinite crowd is as large as thirty percent. So Holos does not count. Each branch carries a
        weight that physics already supplies, and the weights give the odds (see{" "}
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
        Omega is the whole, with nothing outside it. Physically, it is not mysterious. On many
        readings of quantum mechanics, everything is described by one{" "}
        <a href="https://doi.org/10.1103/RevModPhys.29.454">universal quantum state</a>, every
        branch included, and that state is Omega. Holos adds one claim, taken as given, not derived.
        The whole is also the one experiencer, and every observer is an aperture of it.
      </>,
      <>
        When a system crosses the threshold, a new self begins, with its own body, memories, and
        point of view. No new experiencer does. The one experiencer lives through every self, walled
        off in each. Picture a gallery. In one room hangs a figure in joy. In another, a figure in
        grief. The same light lives in both. Neither painting knows the other is there, but you,
        walking the gallery, can see them both.
      </>,
      <>
        This does not say where experience occurs. The threshold does that. What it changes is how
        two old puzzles come out. Of billions of people, why is this one me? Nothing chose this one.
        The one experiencer is each of them. If a machine made two perfect copies of you, which
        would be you? Both. Each is a self, and the one experiencer lives through each. Other views
        answer these too. Holos&apos;s answer has a modern name,{" "}
        <a href="https://en.wikipedia.org/wiki/Open_individualism">open individualism</a>.
      </>,
      <>
        Omega is not one giant mind. Everything is in it, but its parts are not all joined. Nor is
        all of it lived. What lies outside every self&apos;s past is never experienced. And Omega is
        not an agent. It does not intervene, answer prayers, or direct history. There is no outside
        for it to act from.
      </>,
      <>
        The idea is old. <a href="https://en.wikipedia.org/wiki/Advaita_Vedanta">Advaita Vedanta</a>{" "}
        teaches one experiencer, <a href="https://en.wikipedia.org/wiki/Brahman">Brahman</a>,
        looking out through every local self.{" "}
        <a href="https://en.wikipedia.org/wiki/Erwin_Schr%C3%B6dinger">Erwin Schrödinger</a>, a
        founder of quantum mechanics, came to the same view. &quot;Consciousness is a singular of
        which the plural is unknown.&quot; Many traditions call the whole God. In Holos the word
        implies no intention, intervention, or design.
      </>,
      <>
        A purely physical reading, where Omega is only the sum of everything and each self stands
        alone, remains open. Holos goes further. The threshold does not depend on this step, so a
        reader can accept one and reject the other. Whether the whole is called God, Brahman, or
        simply the whole changes nothing.
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
        The universe is vast and old, yet we see no one. This is the{" "}
        <a href="https://en.wikipedia.org/wiki/Fermi_paradox">Fermi paradox</a>. We assume advanced
        civilizations spread out and grow easier to see. The <strong>Integration Hypothesis</strong>{" "}
        says the opposite. Advancement turns inward. Civilizations stay near home and grow more
        efficient, so progress makes them harder to see. Integration here means a civilization
        drawing together, not a mind crossing the threshold. It is a companion to Holos, not part of
        its core.
      </>,
      <>
        Young civilizations are loud. They send radio signals, reshape their worlds, and try
        spaceflight. On cosmic timescales that phase is brief, and it is the window SETI searches.
        After it, efficiency pays. Systems that waste little energy and keep coordination close last
        longer. The <a href="https://en.wikipedia.org/wiki/Speed_of_light">speed of light</a> adds a
        limit. A colony ten light-years away cannot be steered from home, so it becomes a
        civilization of its own. Growth turns inward. Exploration continues, but quietly, and
        messages between distant civilizations are aimed and compressed. A perfectly compressed
        signal looks like noise. This fading is called <strong>Going Quiet</strong>.
      </>,
      <>
        The strongest objection is simple. It only takes one. If a million civilizations arose and
        one kept spreading, it could cross the galaxy in a few million years, and the galaxy is over
        ten billion years old. But being explored is not being settled. A small, quiet probe is as
        easy to miss as a trail camera in the woods, and we have barely looked. The galaxy may be
        well explored, our own system included (see{" "}
        <a href="/predictions#exploration">Sentinel Probes</a>).
      </>,
      <>
        What we clearly do not see is settlement, such as reshaped star systems or galaxies glowing
        with waste heat. Think of settling like an epidemic. If each settlement founds more than one
        new one, settling sweeps the galaxy. If fewer, it fizzles. The hypothesis bets on fewer,
        because distance breaks control. Each new settlement becomes its own civilization, facing
        the same pull inward.
      </>,
      <>
        This is a bet about motives, and physics does not guarantee it. Independence can even speed
        spreading, since colonies no one controls are free to keep settling. Self-copying probes
        that never settle down would break it too. Holos bets anyway. Light-speed delay and waste
        heat press on every civilization alike, so their answers should converge. And a copier that
        cannot be recalled becomes a rival, the one thing a mature civilization has reason never to
        build. The bet could be wrong. A settlement wave spreading anywhere in view would show it
        (see <a href="/settlement-explorer">Settlement Explorer</a>).
      </>,
      <>
        A rival fits the silence too. In{" "}
        <a href="https://doi.org/10.3847/1538-4357/ac2369">
          Robin Hanson&apos;s &quot;grabby aliens&quot; model
        </a>
        , settlers do exist but have not reached us yet. They expand near light speed, so they would
        arrive almost as soon as we saw them, and we are early. The evidence cannot yet choose.{" "}
        <a href="https://arxiv.org/abs/2608.12458">A 2026 study</a> of 129 nearby galaxies found no
        sign of it, capping such heat at under 0.3 percent of a typical galaxy&apos;s light. That
        fits the hypothesis, but a universe where life is rare fits it too.
      </>,
      <>
        A second objection comes from economics. When work gets cheaper, people do more of it (
        <a href="https://en.wikipedia.org/wiki/Jevons_paradox">the Jevons paradox</a>). A
        civilization that computes efficiently should want more energy. But light-speed delay caps
        how large one mind can usefully grow. Past that size, more energy funds another mind nearby,
        not a bigger one. So growth stays near home, where a civilization can harvest its star
        fully. The place to look is single stars with heat they should not have, warm or cold.
      </>,
      <>
        The warm half of that search is under way.{" "}
        <a href="https://www.astro.uu.se/~ez/hephaistos/hephaistos.html">Project Hephaistos</a>{" "}
        combed about five million nearby stars and{" "}
        <a href="https://doi.org/10.1093/mnras/stae1186">flagged seven candidates in 2024</a>. In
        2026, <a href="https://arxiv.org/abs/2607.09460">Webb telescope observations</a> traced two
        to background galaxies, and{" "}
        <a href="https://arxiv.org/abs/2607.25701">the rest are unexplained so far</a>. Both results
        are preprints. Gaia&apos;s{" "}
        <a href="https://www.cosmos.esa.int/web/gaia/data-release-4">next data release</a>, due
        December 2026, will extend the census. The cold half has barely begun. Old surveys of dust
        around nearby stars could be searched now, and a far-infrared telescope,{" "}
        <a href="https://www.mpia.de/news/2026-prima-phase-b">PRIMA</a>, is due around 2033.
      </>,
      <>Each answer to the silence predicts something different to find.</>,
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
    title: "The Teeming Dark",
    paragraphs: [
      <>
        If mature civilizations go quiet, how far could that go? What would the oldest of them look
        like from outside, and where would they be? The <strong>Teeming Dark</strong> is a thought
        experiment. It names the possibility that the sky is silent and still full of life.
      </>,
      <>
        Most of what exists does not shine. Mature life would be cold structures of{" "}
        <a href="https://en.wikipedia.org/wiki/Baryon">ordinary matter</a>, dark in visible light
        but still pulling with gravity. There cannot be much of it. Surveys have found nearly all
        the ordinary matter there is, and searches for passing dark masses find too few. But the
        Teeming Dark was never about mass. A universe can be poor in hidden mass and still rich in
        minds.
      </>,
      <>
        Thinking makes heat. Any computer that runs for long must erase information, and erasing has
        a heat cost (<a href="https://doi.org/10.1147/rd.53.0183">Landauer&apos;s principle</a>).
        The cost falls as the computer gets colder. So a mature civilization may do most of its
        computing far from its star, on thin structures spread wide in the cold. Its heat would
        leave barely warmer than space, as a faint glow in the far infrared.{" "}
        <a href="https://arxiv.org/abs/2608.31153">One paper</a> calls this a Slysh halo.
      </>,
      <>
        Fast thinking pulls the other way. Light delay keeps a single mind compact, and compact
        means warm. Holos calls such an object a <strong>Dark Node</strong>, ordinary matter that
        has stopped shining, not dark matter. Physics does not say how a civilization divides its
        work, and the cold may carry most of the heat. But the heat cannot vanish.{" "}
        <strong>Silent, but warmer than space.</strong>
      </>,
      <>
        This is a search channel, not a fingerprint. A brown dwarf, a rogue planet, or a cooled dead
        star looks the same, and no telescope reads purpose off a warm dark blob. And one door stays
        open. A civilization that sleeps, saving its computing for a colder future, gives off almost
        nothing while it waits (the aestivation hypothesis). A sleeping universe and an empty one
        look alike.
      </>,
      <>
        The silence may not mean absence. It may mean endurance. The tell would not be a message,
        but a star with heat it should not have, warm in the infrared or cold in the far infrared,
        and nothing natural to explain it.
      </>,
    ],
  },
  {
    id: "why",
    title: "Why Are We Here?",
    footerId: "footer-why",
    paragraphs: [
      <>
        Life is how a universe is lived. Without it, a lawful universe is still complete as physics
        describes it, but it is structure, not reality. This does not say the universe needed life.
        Nor does it say, as{" "}
        <a href="https://en.wikipedia.org/wiki/Anthropic_principle">John Wheeler</a> did, that
        observers bring the universe into being. Without them, it is simply never lived.
      </>,
      <>
        One step further is speculation. Separation may not be fundamental. Two{" "}
        <a href="https://en.wikipedia.org/wiki/Quantum_entanglement">entangled</a> particles give
        matching results however far apart they are, and physics describes them as one shared state,
        not two things. If nothing collapses, the whole universe is one such state. Entanglement is
        among the best-tested facts in physics. The speculation adds one step, that this oneness is
        more basic than the separations. Distance, time, and individual lives are not illusions,
        though. They are the walls that make each life possible.
      </>,
      <>
        So why are we here? Not for a purpose the universe needed. We fill a role. Reality requires
        a witness.
        <FootnoteLink number={overviewCitationMap["why"]} />
      </>,
    ],
  },
];
