import { FootnoteLink, predictionsCitationMap } from "./citation-sections";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Predictions() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Introduction */}
      <section id="prediction-introduction" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-black/80">
          <h2 className="text-2xl sm:text-3xl font-light pb-2">
            Predictions
            <FootnoteLink
              number={predictionsCitationMap["prediction-introduction"]}
              className="relative left-1 -top-2.5"
            />
          </h2>

          <p className="leading-relaxed">
            In the version this site defends, Holos does not add new{" "}
            <a
              href="https://en.wikipedia.org/wiki/Dynamics_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              dynamical laws
            </a>{" "}
            or modify the equations of physics. It adds two ingredients beyond them: the integration
            threshold <MathInline>{"\\Phi_c"}</MathInline>, a structural fact about where
            observation occurs, and the totality, Omega, as the fundamental ground of experience, of
            which every observer is a local aperture: an opening through which it registers itself.
            The commitments, expectations, and tests below follow from established physics, from
            those two additions, from the sides Holos takes on structure and mind (Axioms 1 and 4),
            or, where marked, from the no-collapse side it takes on quantum physics (Commitment 3
            and Check B). The speculation at the end does not; it is labeled as such.
          </p>

          <p className="leading-relaxed">
            The sections below separate four kinds of claims. The last section includes speculative
            extensions that aim to produce observable signatures, not just philosophy.
          </p>

          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Commitments:</strong> what must be true if Holos is correct, independent of
              any future experiments.
            </li>
            <li className="leading-relaxed">
              <strong>Expectations:</strong> patterns we should already observe in neuroscience and
              quantum foundations if those commitments are right.
            </li>
            <li className="leading-relaxed">
              <strong>Testability and its limits:</strong> what cannot be tested (presence itself),
              a structural test that can fail, a consistency check, and a standing bet on the
              physics Holos adopts, with the version of Holos a loss would leave declared in
              advance.
            </li>
            <li className="leading-relaxed">
              <strong>Speculation:</strong> extensions that <em>could</em> follow under Holos on
              long timescales, stated with explicit alternatives rather than predictions.
            </li>
          </ul>

          <p className="leading-relaxed text-black/70 text-sm">
            For the operational definition and the observer criteria, see{" "}
            <a href="/logic#operational-definition" className="underline hover:no-underline">
              Logic
            </a>
            .
          </p>
        </div>
      </section>

      {/* 1) Commitments */}
      <section id="commitments" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Commitments
          <FootnoteLink
            number={predictionsCitationMap["commitments"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          <p className="leading-relaxed">
            Commitments 1 and 2 are fundamental to Holos: a serious rival denies each, and if either
            is false, the framework fails. Commitment 3 belongs to Holos without collapse, the
            version this site defends; the version with collapse is declared in advance under{" "}
            <a href="#two-versions" className="underline hover:no-underline">
              Two versions
            </a>
            .
          </p>

          {/* C1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              1. Experience is local, and physics describes it only from outside
            </h3>

            <p className="text-sm text-black/60">
              From Axioms 1, 3, 4, and 5, with the definitions in D7. See{" "}
              <a href="/logic#logic-axioms" className="underline hover:no-underline">
                Axioms
              </a>
              .
            </p>

            <p className="leading-relaxed">Two claims, and a serious rival denies each one.</p>

            <p className="leading-relaxed">
              <strong>Local.</strong> Experience occurs only inside observers, systems past the
              threshold. It is not spread through matter, not ambient in space or fields, and not
              pooled in the whole: Omega is the one experiencer, but it experiences only through
              observers. &quot;Local&quot; says where experience happens, not who has it. Structure
              without observers is still fully real, as pattern: unobserved histories remain part of{" "}
              <MathInline>{"C"}</MathInline>, the branches physics produces, and are simply never
              lived.
            </p>

            <p className="leading-relaxed">
              <strong>Only from outside.</strong> A physical description can be complete and still
              say nothing of whether anything is lived. The gap is not a missing fact: a perfect
              physical copy has the same inside. It is that the description is written from outside,
              like a floor plan that records every wall and still cannot say what living in the
              house is like.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Experience happens only in observers. Physics fixes all of it, but states it only from
              outside.
            </blockquote>

            <div>
              <p className="leading-relaxed">
                <strong>What this rules out:</strong>
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc mt-2">
                <li className="leading-relaxed">
                  Panpsychism: a flicker of experience in every particle, rock, or thermostat.
                </li>
                <li className="leading-relaxed">
                  A cosmic mind: the universe having one experience of its own, over and above its
                  observers.
                </li>
                <li className="leading-relaxed">
                  Illusionism: the view that experience does not exist, only the belief in it.
                </li>
                <li className="leading-relaxed">
                  Strict physicalism of one kind: the view that physical language could, in
                  principle, state that something is lived.
                </li>
                <li className="leading-relaxed">
                  Dualism: experience as an extra ingredient beyond physics. The gap is in the
                  description, not in the world.
                </li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Anthropic principles explain why observers find themselves in universes that allow
              them. They do not say where experience occurs, or why physics states it only from
              outside. Holos answers the first and names the second; why there is experience at all,
              it leaves open.
            </p>

            <p className="leading-relaxed">
              Holos uses three words, each for one thing: <strong>lived</strong>, where experience
              occurs; <strong>lit</strong>, the causal past it draws on; and <strong>unlit</strong>,
              structure outside every observer&apos;s causal past. They are defined in{" "}
              <a href="/logic#primitive-definitions" className="underline hover:no-underline">
                Logic, D7
              </a>
              . That &quot;lived&quot; means experienced by an observer is a definition, not a
              commitment.
            </p>
          </div>

          {/* C2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">2. Observerhood is thresholded</h3>

            <p className="text-sm text-black/60">
              From Axiom 3. See{" "}
              <a href="/logic#logic-axioms" className="underline hover:no-underline">
                Axioms
              </a>
              .
            </p>

            <p className="leading-relaxed">
              Holos rejects the idea that experience increases smoothly with greater amounts of
              computation. Distributed processing can scale indefinitely without producing a single
              point of view.
            </p>

            <p className="leading-relaxed">
              What matters is integration. Well below a critical level, there is no unified internal
              state that could count as “what is happening for the system.” Well above it, in a
              system that meets the other observer requirements, experience is unavoidable.
            </p>

            <div className="my-2">
              <MathDisplay>{"\\text{Observerhood requires } \\Phi \\ge \\Phi_c"}</MathDisplay>
            </div>

            <p className="leading-relaxed">
              Observerhood is neither ubiquitous nor optional. It appears when structural conditions
              for integration are met.
            </p>

            <p className="leading-relaxed">
              Whether a system crosses this threshold is a fact about how its parts are wired
              together, and integration alone is not enough: the integrated state must be about a
              world beyond the system (see the observer requirements in{" "}
              <a href="/logic#ontology" className="underline hover:no-underline">
                Logic
              </a>
              ). It belongs to the structural layer of reality, alongside the laws of physics, and
              is not itself indexed to any other observer. Observerhood is what qualifies a system
              to have a perspective at all; it is not relative to one. In the monist reading,
              crossing the threshold is where an aperture opens: the totality registers itself
              through the system.
            </p>

            <p className="leading-relaxed">
              Two consequences follow. A physically identical copy of an observer cannot lack
              experience (Axiom 4). And the threshold is steep but not a mathematical line: clear
              cases on both sides, a narrow twilight between, fixed by structure, so a copy of a
              borderline system is borderline too (see{" "}
              <a href="/logic#threshold-claims" className="underline hover:no-underline">
                The threshold in three claims
              </a>
              ).
            </p>
          </div>

          {/* C3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              3. Facts are relational but consistent
            </h3>

            <p className="text-sm text-black/60">
              From Axioms 1 and 2. See{" "}
              <a href="/logic#logic-axioms" className="underline hover:no-underline">
                Axioms
              </a>
              .
            </p>

            <p className="leading-relaxed">
              Holos distinguishes two kinds of facts. <strong>Structural facts</strong> describe
              what is consistent: the laws of physics, the branches physics produces with their
              quantum weights, and whether a system meets the integration threshold. These are
              absolute and observer-independent. <strong>Registered facts</strong> describe what is
              lived: which outcome a system registers from its own perspective. These are always
              indexed to observing systems.
            </p>

            <p className="leading-relaxed">
              The relational commitment applies to registered facts. There is no absolute,
              observer-independent fact about which outcome is experienced. The structural layer, by
              contrast, is not relative; without it, registration would have nothing stable to
              register.
            </p>

            <p className="leading-relaxed">
              This does not imply contradiction, and Holos is specific about why. No possibility is
              erased (Axiom 2), so observers never collide over a single shared outcome. Where
              registrations would be incompatible, they belong to different branches of the
              possibility structure, each internally consistent. There is no rule that the first
              observer fixes the truth for everyone; relativity permits no such “first,” and none is
              needed.
            </p>

            <p className="leading-relaxed">
              Within a branch, consistency is operational rather than abstract: whenever two
              observers actually compare records, their records agree. Perspectives may differ while
              separated; communication forces agreement. This is the checkable content of “global
              consistency.” Physics secures it: observers who communicate are reached by the same
              signals.
            </p>

            <p className="leading-relaxed">
              Branches are weighted, not merely counted: almost all of the weight lies with
              observers whose records follow the Born rule. The weights are structural facts, not
              amounts of experience, and for an observer they are odds of being in one branch rather
              than another. See{" "}
              <a href="/logic#relationship-to-physics" className="underline hover:no-underline">
                Logic
              </a>{" "}
              for the full account.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Registered facts are relative to observers. Structural facts are absolute. Observers
              who compare records agree.
            </blockquote>

            <p className="leading-relaxed">
              Collapse is therefore not a new physical process. Within each branch, records are
              already definite, a detector&apos;s click included; what an observer adds is not the
              definiteness but its being lived.
            </p>
          </div>

          <div className="mt-2 pt-4 border-t border-black/10">
            <p className="leading-relaxed text-black/70 text-sm">
              Everything that follows assumes these commitments. What comes next addresses what we
              should expect to observe in the world if they are correct.
            </p>
          </div>
        </div>
      </section>

      {/* 2) Expectations */}
      <section id="expectations" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Expectations
          <FootnoteLink
            number={predictionsCitationMap["expectations"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-8 text-black/80">
          <p className="leading-relaxed">
            These expectations describe what should be observed in existing domains if the
            commitments of Holos are correct. Most are shared with rival views, so meeting them fits
            Holos without confirming it; persistent failure across domains would undermine the
            framework.
          </p>

          {/* Neuroscience */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Neuroscience: Steep transitions in conscious access
            </h3>

            <p className="leading-relaxed">
              If observerhood requires a minimum level of integration, transitions between conscious
              and unconscious states should be steep, crossing a narrow twilight. If the crossing is
              also a genuine transition, they should resemble state changes, not smooth signal
              degradation.
            </p>

            <p className="leading-relaxed">
              Large-scale neural integration measures should therefore show the signatures of a
              genuine transition near loss and recovery of consciousness, rather than a smooth fade:
              slowing and growing fluctuations as the boundary nears, or a lag between going under
              and coming back, with a twilight that narrows in larger systems. This is the
              transition hypothesis, not the core. Animal studies already find such a lag, though in
              flies sleep genes control it, so it may belong to the arousal switch rather than to
              integration. The signatures must be measured on integration at the boundary: the known
              near-criticality of waking cortex marks where observers operate, not the threshold.
              Well below threshold, processing continues without unified access to experience.
            </p>

            <p className="leading-relaxed">
              If something like a Global Neuronal Workspace (a theory in which conscious access is
              information broadcast brain-wide) is involved, these threshold crossings should appear
              as sharp switches into brain-wide availability rather than a gradual fading of what
              can be reported.
            </p>

            <p className="leading-relaxed">
              Proxy measures such as{" "}
              <a
                href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                target="_blank"
                rel="noopener noreferrer"
              >
                PCI
              </a>{" "}
              are relevant not as definitions of consciousness, but as probes of where integration
              crosses the threshold, and how steeply.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              A steep transition would fit Holos but not confirm it: ordinary physicalist models
              predict tipping points too. What can fail is{" "}
              <a href="#experiment-1" className="underline hover:no-underline">
                Test A
              </a>
              ; see also the{" "}
              <a href="#experiment-3" className="underline hover:no-underline">
                note on integration measures
              </a>
              .
            </p>
          </div>

          {/* Quantum foundations */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Quantum foundations: Observer-relative facts without collapse
            </h3>

            <p className="leading-relaxed">
              If registered facts are indexed to observers and no outcome is erased, quantum
              experiments should continue to allow descriptions in which different observers
              register incompatible outcomes without violating global consistency.
            </p>

            <p className="leading-relaxed">
              Holos therefore sides with branching approaches, in which no possibility is erased,
              and borrows one insight from relational approaches: registered facts are indexed to
              the systems that register them. It does not adopt Relational Quantum Mechanics itself,
              which rejects the universal state that branching requires. The operational signature
              is agreement: whenever observers within a branch compare records, the records match. A
              confirmed, irreconcilable record mismatch between communicating observers would
              falsify this commitment.
            </p>
          </div>

          {/* Cosmology */}
          <div id="minimal-neural-systems" className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Minimal neural systems: the twilight&apos;s width
            </h3>

            <p className="leading-relaxed">
              Networks of neurons grown in a dish and connected to simple environments are the
              cheapest place to test the twilight prediction. If crossing the threshold is a genuine
              transition (claim 3 of{" "}
              <a href="/logic#threshold-claims" className="underline hover:no-underline">
                the threshold
              </a>
              ), its rounded stretch should narrow as a system grows. Small cultures should then
              cross gradually, and larger cultures, grown the same way, more steeply, as
              connectivity, feedback, and coupling to their environment increase.
            </p>

            <p className="leading-relaxed">
              The test counts only under the conditions in the{" "}
              <a href="#experiment-3" className="underline hover:no-underline">
                note on integration measures
              </a>
              : the gauge and its cutoff fixed in advance, and a stated way to lose. Holos loses
              claim 3, though not its core, if the steepness does not grow with size. A steepening
              that tracks something other than integration, such as raw activity or metabolic rate,
              would not count in its favor.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              Such transitions would not show that a dish is conscious. They test the shape of the
              threshold, not presence itself.
            </p>
          </div>
        </div>
      </section>

      {/* 3) Testability and its limits */}
      <section id="experimentation" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Testability and Its Limits
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            The central claim of Holos is that observation is where structure is lived, not a force:
            in the version this site defends, it changes no equation and moves nothing. But every
            experiment is a physical measurement, and an instrument only ever registers physical
            change. So <strong>presence itself cannot be detected directly</strong>. An instrument
            that finds nothing extra is exactly what Holos predicts, because there is nothing extra
            to find: presence is what the physics is like from the inside, not an additional signal
            beside it.
          </p>

          <p className="leading-relaxed">
            This is not a gap Holos has failed to close. It follows from the framework&apos;s own
            commitment, in the version defended here, that observation is dynamically inert. The
            sharpened form of the objection is the <em>unfolding argument</em>: for any conscious
            system one can in principle describe a behaviorally identical twin wired differently,
            and no external test could separate them. Holos accepts this. The metaphysical claims
            (presence itself, and the totality it belongs to) cannot be settled by any experiment.
          </p>

          <p className="leading-relaxed">
            What remains testable is not presence but its <strong>structural preconditions</strong>:
            claims about what observation requires, and how registered facts behave. These live in
            the physical world and can genuinely fail. One is stated below as a test, with an
            explicit way for Holos to lose. The other is stated as a consistency check: its expected
            outcome is the one standard quantum mechanics already predicts, so it guards against
            contradiction rather than singling Holos out. A prediction Holos shares with rival
            theories cannot single it out, but a shared prediction it could fail is still worth more
            than one it cannot. Beneath both sits a standing bet, stated after them, on the physics
            Holos adopts, with the version of Holos a loss would leave declared in advance.
          </p>
        </div>
      </section>

      {/* Test A */}
      <section id="experiment-1" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Test A: Consciousness tracks integration, not behavior
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Bedside assessment treats responsiveness as the sign of consciousness: a patient who
            follows commands is conscious, and one who does not is presumed not to be. No serious
            theory equates the two, but the proxy runs deep in practice. In Holos, what matters is{" "}
            <em>integration</em>, and integration can come apart from outward behavior. When the two
            diverge, Holos bets that experience follows integration.
          </p>

          <p className="leading-relaxed">
            The bet is losable because cases where the two come apart already exist. People under{" "}
            <a
              href="https://en.wikipedia.org/wiki/Ketamine"
              target="_blank"
              rel="noopener noreferrer"
            >
              ketamine
            </a>
            , in REM dreaming, or in certain seizures are behaviorally unresponsive yet later report
            vivid experience; sleepwalkers and some automatisms are responsive yet report little or
            nothing. These are natural experiments that pull integration apart from responsiveness.
          </p>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Objective</h4>
            <p className="leading-relaxed">
              Across states where responsiveness and integration diverge, determine whether later
              reported experience tracks a measure of integration or tracks behavioral
              responsiveness and arousal.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">The protocol, fixed in advance</h4>
            <p className="leading-relaxed">
              A test needs numbers, not intentions. Test A is frozen here, before any new data:
            </p>
            <ol className="flex flex-col gap-2 pl-6 list-decimal mt-2">
              <li className="leading-relaxed">
                <strong>Primary gauge:</strong> the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Perturbational Complexity Index
                </a>
                , measured by stimulating the brain and recording its echo (TMS-EEG), with its
                published cutoff of 0.31 (
                <a
                  href="https://doi.org/10.1002/ana.24779"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Casarotto et al. 2016
                </a>
                ). A whole-brain gauge.
              </li>
              <li className="leading-relaxed">
                <strong>Second gauge:</strong> the same kind of measurement confined to posterior
                cortex, where dream reports have been found to track local activity. Its cutoff is
                set on calibration states and frozen before any held-out data.
              </li>
              <li className="leading-relaxed">
                <strong>Timing:</strong> each gauge is computed from the stimulation closest to an
                awakening, ending at the awakening, and a report counts only if it describes what
                was happening just before waking. Averages over minutes, or windows that end well
                before waking, do not count.
              </li>
              <li className="leading-relaxed">
                <strong>Rivals recorded:</strong> behavioral responsiveness, arousal, and drug level
                are measured alongside, so the test can say which variable reports actually follow.
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-black/90 mb-1">
              Held-out states, not the answer key
            </h4>
            <p className="leading-relaxed">
              PCI&apos;s cutoff was set by calibrating it on people whose state was already known
              from their reports, and the conscious side of that calibration included waking, REM
              dreaming, and ketamine with vivid reports. Those cases cannot confirm Test A: they are
              the answer key, not the exam. The test counts only states that played no part in
              setting the cutoff, named in advance: dream reports from non-REM sleep, deep sedation
              with intermittent awakening, sleepwalking and other automatisms, complex seizures,
              psychedelic states, and covert awareness in unresponsive patients, which brain imaging
              finds in about a quarter of them (
              <a
                href="https://doi.org/10.1056/NEJMoa2400645"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bodien et al. 2024
              </a>
              ). This is the design of the COGITATE collaboration: predictions fixed first, data
              second.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Holos Prediction</h4>
            <p className="leading-relaxed">
              Where they diverge, reported presence follows integration:
              high-integration/low-responsiveness states are experienced; low-integration/
              high-responsiveness states are not.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">How Holos loses</h4>
            <p className="leading-relaxed">
              A broken thermometer does not prove heat is fake, so the test separates the gauge from
              the theory. If one gauge tracks reports and the other does not, the failing gauge is
              discarded, not Holos. Holos loses if, across independent studies, detailed reports
              reliably come from periods when both gauges sat clearly below their frozen cutoffs,
              past any twilight. A report is evidence that something was experienced, and it cannot
              be explained away as a failure of memory. Nor can it be explained away by a gauge
              proposed afterward: a new gauge can be tested on new data, but it cannot rescue
              results already in. The reverse finding, high-integration states that yield no
              reports, counts against Holos only once report failure can be ruled out (see below).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">
              The confound, and which reports count
            </h4>
            <p className="leading-relaxed">
              Reports require memory, and the states this test targets are precisely those where
              memory is least reliable. A report of nothing is therefore ambiguous between{" "}
              <em>no experience occurred</em> and <em>experience occurred and was not encoded</em>.
              The evidence delivers unremembered; the prediction needs unexperienced. This confound
              is not currently controlled, so silence carries little weight in either direction: it
              cannot confirm absent experience in low-integration states, and it cannot refute
              present experience in high-integration ones.
            </p>
            <p className="leading-relaxed">
              Positive reports escape the memory problem, but not a timing problem. A dream can form
              in the seconds of waking up and be reported as if it came from deep sleep. That is why
              the protocol measures right up to the awakening and counts only reports of what was
              happening just before it. With that control, positive reports carry the test both
              ways. Where integration is high and behavior is absent, reports of rich experience
              confirm the prediction without leaning on silence. Where integration is clearly low, a
              positive report is the losing case. Holos rests Test A on positive reports, and treats
              silence as suggestive pending a design that calibrates report failure against states
              with known encoding.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Where the evidence stands</h4>
            <p className="leading-relaxed">
              The losing case is not hypothetical. Awakenings from non-REM sleep often produce dream
              reports, yet non-REM sleep is where whole-brain measures such as PCI fall well below
              the waking range. Deep sedation is starker: in one study, 82 percent of interpretable
              awakenings from deep propofol sedation produced reports of experience (
              <a
                href="https://doi.org/10.1038/s41598-025-12695-z"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bajwa et al. 2025
              </a>
              ), and an earlier study found experiences, mostly dreams, in 84 percent of interviews
              from anesthetic unresponsiveness (
              <a
                href="https://doi.org/10.1016/j.bja.2018.03.014"
                target="_blank"
                rel="noopener noreferrer"
              >
                Radek et al. 2018
              </a>
              ).
            </p>
            <p className="leading-relaxed">
              The nearest thing to Test A yet run did not favor it. In that sedation study, two
              complexity measures, one of them a version of PCI, fell from waking to sedation but
              did not differ between awakenings with and without experience. A sleep study found the
              same for a complexity measure of spontaneous EEG within light non-REM sleep (
              <a
                href="https://doi.org/10.3389/fnhum.2022.987714"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aamodt et al. 2022
              </a>
              ). Neither settles the question. The sedation study measured over several minutes
              ending a minute before each awakening, exactly the timing problem above, and it had
              only five reports of no experience.
            </p>
            <p className="leading-relaxed">
              Evidence with tighter timing points the other way. When the brain&apos;s response to
              stimulation was measured just before awakening from non-REM sleep, it looked more like
              the unconscious pattern when subjects then reported nothing, and the more it did, the
              shorter the dream reports (
              <a href="https://doi.org/10.1038/srep30932" target="_blank" rel="noopener noreferrer">
                Nieminen et al. 2016
              </a>
              ). And{" "}
              <a href="https://doi.org/10.1038/nn.4545" target="_blank" rel="noopener noreferrer">
                work on the neural correlates of dreaming
              </a>{" "}
              finds that whether a dream is reported, in REM or non-REM sleep, tracks local activity
              in posterior cortex rather than the state of the whole brain.
            </p>
            <p className="leading-relaxed">
              That is why the second gauge is local. The maximality condition allows an aperture
              smaller than the whole cortex, so an aperture confined to posterior cortex could be
              integrated above threshold while the whole brain is not. Holos adopts that reading
              now, after seeing these results, so they cannot count in its favor: only new data,
              collected under the protocol above, can confirm or defeat it. A gauge chosen afterward
              to rescue the prediction would turn the test into decoration, the failure the note on
              integration measures below warns against.
            </p>
            <p className="leading-relaxed">
              The data to run it are starting to exist. A shared database released in 2025 pools
              sleep EEG and dream reports from 505 people and 2,643 awakenings (
              <a
                href="https://doi.org/10.1038/s41467-025-61945-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wong et al. 2025
              </a>
              ). It lacks the brain stimulation PCI needs, so it can serve the calibration step,
              culling candidate gauges, but not the held-out test itself.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>What this can and cannot show:</strong> this tests a necessary structural
            condition, not presence itself. It cannot prove an integrated system <em>is</em> an
            observer, only whether integration is what experience depends on. Holos shares this
            prediction with other integration-based accounts of consciousness; it is a test Holos
            could fail, not a signature unique to Holos. It also feeds the calibration engine for
            the framework&apos;s open problems, with a strict division: calibration states locate
            the threshold and cull the candidate measures, and only held-out states test the claim
            (see{" "}
            <a href="/logic#path-to-threshold" className="underline hover:no-underline">
              A path to the threshold
            </a>
            ).
          </p>
        </div>
      </section>

      {/* Check B */}
      <section id="experiment-2" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Check B: Observer-relative facts
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            This check lives in quantum foundations, not in the theory of mind, and its status comes
            first: it is a consistency check, not a test that could single Holos out. The outcome it
            anticipates is the one textbook quantum mechanics already predicts. What experiments in
            this family probe is the family of interpretations Holos belongs to (branching, with no
            absolute observed events), not Holos alone. The framework&apos;s distinctive content,
            which structures are present as experience, is ontological rather than experimental.
          </p>

          <p className="leading-relaxed">
            Extended{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wigner%27s_friend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wigner&apos;s-friend
            </a>{" "}
            experiments, in which one observer measures another observer who has already made a
            measurement, already pursue exactly this question. The 2020{" "}
            <a
              href="https://doi.org/10.1038/s41567-020-0990-x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <em>Local Friendliness</em> no-go theorem
            </a>{" "}
            and its photonic tests show that if an in-lab observation counts as a genuine fact, then
            absoluteness of observed events, locality, and freedom of choice cannot all hold
            together. Holos gives up the absoluteness of observed events: registered facts are
            observer-relative, while structural facts and consistency remain intact.
          </p>

          <p className="leading-relaxed">
            One caveat follows from Holos&apos;s own threshold: the &quot;friends&quot; in current
            photonic tests are far below <MathInline>{"\\Phi_c"}</MathInline> and register nothing,
            so these experiments constrain the logical structure of observed events, not
            registration itself. Holos predicts that repeating them with genuine observers would
            change nothing physical, a prediction formalized as the standing bet below.
          </p>

          <p className="leading-relaxed">
            The field is moving toward genuine friends.{" "}
            <a
              href="https://doi.org/10.22331/q-2023-09-14-1112"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiseman, Cavalcanti, and Rieffel (2023)
            </a>{" "}
            proposed running a human-level artificial intelligence on a quantum computer as the
            friend. A September 2026 preprint, not yet peer reviewed, placed{" "}
            <a href="https://arxiv.org/abs/2609.12527" target="_blank" rel="noopener noreferrer">
              agent-like observers on IBM quantum hardware
            </a>{" "}
            and found the violations intact. Agents that store results and predict their own
            measurements are still far below <MathInline>{"\\Phi_c"}</MathInline> by Holos&apos;s
            standard, so the bet remains untested, but this is the road that reaches it.
          </p>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Holos Expectation</h4>
            <p className="leading-relaxed">
              Local Friendliness inequalities keep being violated exactly as quantum mechanics
              predicts, at every scale the experiments reach, including as the friend is made larger
              and more complex.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">How Holos loses</h4>
            <p className="leading-relaxed">
              No experiment in this family can restore the absoluteness of observed events on its
              own: the theorem is a proof, and a violation only forces a choice among its
              assumptions. What could go wrong for Holos is dependence on scale. If the violations
              shrink or vanish as the friend grows toward a genuine observer, beyond what
              decoherence accounts for, observation is doing something physical, and the standing
              bet below is lost.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>What this can and cannot show:</strong> checks Commitment 3 (facts are
            relational but consistent) against quantum mechanics as it is actually observed. Holos
            shares its expectation with standard quantum mechanics and with other views that give up
            absolute observed events, such as{" "}
            <a
              href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Relational Quantum Mechanics
            </a>
            ; a positive result supports the family, not Holos alone. A laboratory analog with
            superconducting qubits, sliced into different observer cuts, would not work as a test:
            by Holos&apos;s own threshold, qubit readouts register nothing, and its predicted result
            would be ordinary quantum contextuality, which the branching picture Holos adopts
            already accounts for.
          </p>
        </div>
      </section>

      {/* The standing bet */}
      <section id="standing-bet" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          The standing bet: consciousness adds no new physics
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            In the version of Holos this site defends, observation is dynamically inert, and that
            doubles as a bet. A conscious observer obeys the same quantum laws as a photon: put an
            integrated system in the measuring role in place of a particle, and Holos predicts no
            deviation whatsoever. Superpositions lose their quantum character for thermodynamic
            reasons, never because someone was home. This does not make experience idle. Under
            Holos, experience is the inside of the physics, so when the physics does everything,
            experience is doing its share, not nothing.
          </p>

          <p className="leading-relaxed">
            <strong>How Holos loses:</strong> if any experiment ever finds a consciousness-linked
            deviation from unitary quantum mechanics (a superposition that degrades when an
            integrated observer registers it, beyond what ordinary decoherence accounts for), Holos
            without collapse is falsified. Observation would make a physical difference after all.
          </p>

          <p id="two-versions" className="leading-relaxed">
            <strong>Two versions, declared now.</strong> Holos comes in two versions that share one
            core, Axioms 1, 3, 4, and 5, and differ only on quantum physics.{" "}
            <em>Holos without collapse</em> is the version this site defends and the one the bet is
            about: Axiom 2 read as unitary evolution, branching with self-locating odds, and
            observation that changes nothing it registers. <em>Holos with collapse</em> is the
            version a lost bet would leave. Experience would still be the inside of physical
            activity (Axiom 4), adding no force beyond the physics; that activity would simply
            include a collapse law. Omega (Axiom 5) would be the universe with its single history,
            and lived, lit, and unlit would apply within that one history.
          </p>

          <p className="leading-relaxed">
            Which collapse nature shows decides what the threshold becomes. If a superposed system
            above the threshold collapses while an equally large one below it does not, collapse
            tracks integration crossing <MathInline>{"\\Phi_c"}</MathInline>, and observers matter
            physically, exactly where Holos says. The threshold becomes the collapse point,
            detectable for the first time, and registration no longer leaves what it registers
            unchanged. That is a reading of the kind{" "}
            <a href="https://arxiv.org/abs/2105.02314" target="_blank" rel="noopener noreferrer">
              Chalmers and McQueen
            </a>{" "}
            propose, and it would hand the threshold the strongest confirmation it could get. If
            collapse tracks size alone, as objective-collapse models propose, the threshold stays
            dynamically inert and gains nothing.
          </p>

          <p className="leading-relaxed">
            Declaring the second version now is what separates it from a rescue, but it does not
            make the two outcomes equal. A lost bet would retire the version defended here, and
            Holos with collapse would have to earn its own support. Neither version is
            unfalsifiable: both share the core, and the core loses through{" "}
            <a href="#experiment-1" className="underline hover:no-underline">
              Test A
            </a>
            , if experience turns out to track behavior rather than integration. No reading of
            quantum physics escapes that.
          </p>

          <p className="leading-relaxed">
            The bet has a named rival.{" "}
            <a href="https://arxiv.org/abs/2105.02314" target="_blank" rel="noopener noreferrer">
              Chalmers and McQueen (2022)
            </a>{" "}
            propose that integrated consciousness does collapse the wave function, combining
            integrated information theory with a physical collapse model, and note that versions of
            the idea could be tested on quantum computers. Holos bets the opposite, so the same
            experiment would decide between them. Meanwhile quantum mechanics keeps holding as
            systems grow: clusters of more than 7,000 sodium atoms now show quantum interference (
            <a
              href="https://doi.org/10.1038/s41586-025-09917-9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedalino et al. 2026
            </a>
            ), and the simplest version of gravity-caused collapse has been ruled out in an
            underground experiment (
            <a
              href="https://doi.org/10.1038/s41567-020-1008-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donadi et al. 2021
            </a>
            ).
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            Some observer-centered frameworks quietly hope consciousness does something physical.
            Holos formally bets that it does not, and states in advance what losing would cost. The
            bet is untested so far. A century of placing ever-larger systems into superposition has
            found no deviation of any kind, but by Holos&apos;s own threshold none of those systems
            was an observer: photons, molecules, and superconducting circuits all sit far below{" "}
            <MathInline>{"\\Phi_c"}</MathInline>. That record shows quantum mechanics holding at
            those scales; it does not yet reach the case the bet is about. The bet is also the one
            standard physics makes. What makes it worth stating is that Holos, unlike views that
            need consciousness to act, does not hedge on it: the first experiment to put a genuine
            observer in the friend&apos;s role settles it, and the consequences are already on the
            page.
          </p>
        </div>
      </section>

      {/* A note on the integration correlates */}
      <section id="experiment-3" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          A note on the integration measures
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Two further experiments might look like confirmations: a sharp integration drop under
            anesthesia, and cultured neural networks snapping into coherence as connectivity grows.
            Neither counts as a test just by showing a transition. The dish experiment counts only
            in one form: the size-scaling test of claim 3, under{" "}
            <a href="#minimal-neural-systems" className="underline hover:no-underline">
              Minimal neural systems
            </a>
            .
          </p>

          <p className="leading-relaxed">
            A sharp transition at loss of consciousness is predicted by ordinary physicalist models
            too (sudden tipping points and network-wide switch-ons of the kind these systems produce
            anyway), so observing one confirms nothing specific to Holos. And a cultured network
            almost <em>always</em> shows some nonlinear transition (neurons falling into step and
            cascades of activity are routine dish behavior), so an experiment that counts any such
            transition as success cannot fail, and an experiment that cannot fail proves nothing
            when it passes.
          </p>

          <p className="leading-relaxed">
            These remain useful only as <strong>correlate probes</strong> feeding Test A, or, for
            dishes, as that size-scaling test, and only under two conditions: the integration
            measure and the threshold value are fixed in advance, and there is a stated way to lose:
            the observed transition tracks a non-integration variable (arousal, metabolic rate, raw
            activity) rather than integration. Without a pre-committed measure and a real failure
            condition, a transition &quot;somewhere&quot; is not evidence; it is decoration.
          </p>
        </div>
      </section>

      {/* 4) Speculation */}
      <section id="speculation" className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-light">
          Speculation
          <FootnoteLink
            number={predictionsCitationMap["speculation"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          <p className="leading-relaxed">
            What follows are not predictions. They’re “what if” designs that <em>could</em> emerge
            if the Holos framework is correct. Each is held to one standard: it must be physically
            possible and not extremely unlikely, and each says why it is plausible.
          </p>

          <p className="leading-relaxed">
            We know the familiar hard constraints: finite signal speed, noise, and thermodynamics.
            At vast scales, coherence punishes bright sprawl. Integration favors compactness,
            locality, and long-horizon stability.
          </p>

          {/* Holosian Scale */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">The Holosian Scale</h3>

            <p className="leading-relaxed">
              The{" "}
              <a
                href="https://en.wikipedia.org/wiki/Kardashev_scale"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kardashev Scale
              </a>{" "}
              ranks civilizations by energy use. The Holosian scale ranks civilizations by
              integration. The stages below are a map of what “advancement” looks like if coherence,
              not throughput, is the main objective.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H0: Fragmented</h4>
                <p className="leading-relaxed">
                  High capability, low coordination. Internal conflict, waste, and short-horizon
                  incentives dominate. Visibility is high because broadcasting is cheap and
                  unmanaged.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H1: Planetary Integration</h4>
                <p className="leading-relaxed">
                  The civilization becomes coherent at the scale of a world. It can coordinate,
                  self-correct, and sustain long-term projects without collapsing into factional
                  drift.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H2: System Coherence</h4>
                <p className="leading-relaxed">
                  Coherence survives light-lag across a star system. The civilization functions as
                  one asynchronous system and shifts from constant broadcast to rare, directed
                  signaling.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H3: Post-Expansion</h4>
                <p className="leading-relaxed">
                  Physical sprawl stops being the default. Exploration becomes informational first,
                  physical only when inference fails. The outward footprint shrinks even as
                  capability grows.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H4: Deep Integration</h4>
                <p className="leading-relaxed">
                  The civilization operates like a single high-coherence system with minimal waste
                  and minimal leakage. External visibility collapses. What remains detectable is
                  gravitational and thermal: the waste heat no optimization can eliminate.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-black/90">H5: The Limit</h4>
                <p className="leading-relaxed">
                  Maximal coherence at minimal waste. This is a limit concept, not a stage any
                  civilization reaches.
                </p>
              </div>
            </div>

            <p className="leading-relaxed text-black/70 text-sm">
              <strong>Why it is plausible:</strong> every stage follows from two certainties,
              light-speed delay and waste heat, plus one assumption: that coordination pays. The
              assumption is the weak link. A civilization that never learns to coordinate stays at
              H0, loud until it ends.
            </p>
          </div>

          {/* 1) Visibility Collapse */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Visibility Collapse</h3>

            <p className="leading-relaxed">
              A civilization can get more capable while becoming less visible. If its optimization
              target shifts from outward projection to internal coherence, it will compress,
              encrypt, and minimize waste. Broadcast is an early-stage habit, not a mature strategy.
            </p>
            <p className="leading-relaxed">
              On the Holosian Scale, this is the natural signature of H3–H4: rising capability with
              increasingly optimized and less obvious radiative signatures.
            </p>
            <p className="leading-relaxed">
              The collapse applies to light, not heat: compact systems that keep computing stay
              warm, for the reasons given in the{" "}
              <a href="/#the-teeming-dark" className="underline hover:no-underline">
                Teeming Dark
              </a>
              .
            </p>
            <p className="leading-relaxed text-black/70 text-sm">
              <strong>Why it is plausible:</strong> efficient communication already looks like
              noise. A perfectly compressed signal has no repeating patterns left for an
              eavesdropper to spot, so the better a civilization&apos;s codes, the less its traffic
              stands out from the background.
            </p>
          </div>

          {/* 2) Observational Regime */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">Observational Regime</h3>

            <p className="leading-relaxed">
              If a civilization is H4-level integrated, the most likely remaining footprint isn't
              radio or lasers. It's gravity and heat. Holos uses <strong>Dark Node</strong> as a
              label for what these systems look like from the outside: compact, ordered mass
              structures that minimize obvious emissions while still exporting waste heat, and
              staying gravitationally coupled to the universe.
            </p>

            <p className="leading-relaxed">
              In this regime, you would look for masses that are dark in visible light but carry a
              faint infrared excess, found through infrared surveys of individual stars and through{" "}
              <a
                href="https://en.wikipedia.org/wiki/Gravitational_microlensing"
                target="_blank"
                rel="noopener noreferrer"
              >
                microlensing
              </a>{" "}
              of compact dark objects, rather than radio searches. Mass maps of whole galaxies
              cannot see objects this small, and no instrument can read purpose off a distant warm
              mass. The unavoidable search channel is warmth plus weight, not messages.
            </p>

            <p className="leading-relaxed">
              Nodes are ordinary matter that has stopped shining, not cosmological dark matter. How
              many there can be, and why a warm dark mass is a search channel rather than a
              fingerprint, is set out in the{" "}
              <a href="/#the-teeming-dark" className="underline hover:no-underline">
                Teeming Dark
              </a>
              .
            </p>
            <p className="leading-relaxed text-black/70 text-sm">
              <strong>Why it is plausible:</strong> any long-running computer sheds heat, since
              correcting errors means erasing information, and compact systems shed it warm unless
              they build vast cold radiators. Brown dwarfs and rogue planets already show that
              compact, dark, faintly warm masses exist and can be found.
            </p>
          </div>

          {/* 3) Structures */}
          <div id="technology" className="flex flex-col gap-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-light">Technology</h2>

            <h3 id="mesostructures" className="text-xl font-semibold text-black/90">
              Mesostructures
            </h3>
            <p className="leading-relaxed text-black/70 italic text-sm">
              These are design sketches, not predictions: imaginative illustrations of what
              engineering might look like if the Integration Hypothesis holds.
            </p>
            <p className="leading-relaxed pb-4">
              The structures below are H3–H4 design patterns: compact enough to stay coherent under
              light-lag and thermodynamics, and consequential enough to matter without bright
              sprawl. They span energy generation, active coherence and computation, and long-term
              continuity.
            </p>

            {/* 1) Holocore */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Holocore</h4>

              <p className="leading-relaxed">
                A compact, gravitationally stabilized energy mesostructure designed to supply
                massive, long-horizon power while exporting waste heat in thermodynamically
                disciplined ways.
              </p>

              <p className="leading-relaxed">
                The likeliest energy backbone for a compact civilization is its home star, harvested
                by nearby collectors (see{" "}
                <a href="/#aliens" className="underline hover:no-underline">
                  Aliens
                </a>
                ). The Holocore is the step beyond: it concentrates energy density rather than
                surface area, converting mass into controlled output through fusion, regulated
                accretion, or extraction of a black hole&apos;s spin.
              </p>

              <h5 className="font-semibold text-black/90">Purpose</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  Provide sustained energy for deep-time computation and preservation
                </li>
                <li className="leading-relaxed">
                  Power large-scale modeling, shielding, and entropy management systems
                </li>
                <li className="leading-relaxed">
                  Support compact civilizational infrastructure without outward expansion
                </li>
                <li className="leading-relaxed">
                  Maintain stability across millennia with minimal maintenance overhead
                </li>
              </ul>

              <h5 className="font-semibold text-black/90">Design Characteristics</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">Extreme energy density per unit volume</li>
                <li className="leading-relaxed">Controlled accretion or fusion feed systems</li>
                <li className="leading-relaxed">
                  Waste heat shaped, delayed, and diluted, but never eliminated. The total thermal
                  output is set by physics, not engineering
                </li>
                <li className="leading-relaxed">
                  Compact, so it cannot hide its heat: at modest power it glows faintly in the
                  infrared; at high power it glows brightly, and it is only as quiet as its output
                  allows
                </li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                The Holocore is infrastructure, not spectacle. If H4 integration suppresses bright
                sprawl, the energy backbone must be dense and long-lived, and it can be only as
                quiet as its power allows: compact and powerful means hot, the same physics that
                keeps mature systems warm.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> every step is known physics; only the
                engineering is unknown. Fusion releases about 0.7 percent of a mass as energy.
                Matter falling into a rapidly spinning black hole can release roughly 30 to 40
                percent, and the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Penrose_process"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Penrose process
                </a>{" "}
                can draw out a spinning black hole&apos;s rotational energy, up to 29 percent of its
                mass. A civilization that prizes compactness would prize the densest energy source
                physics allows.
              </p>
            </div>

            {/* 2) Computronium Kernel */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Computronium Kernel</h4>

              <p className="leading-relaxed">
                A computational core as compact as its cooling allows, built from computronium
                (matter arranged so that nearly every particle does useful computation) and
                optimized for coherent, long-horizon modeling rather than raw throughput.
              </p>

              <p className="leading-relaxed">
                This is not a data center. It is the civilization’s thinking heart: where a unified
                world-model is maintained across centuries to millennia.
              </p>

              <h5 className="font-semibold text-black/90">Purpose</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  Maintaining a single, stable world-model across long horizons
                </li>
                <li className="leading-relaxed">
                  Long-range planning (stellar evolution, climate, existential risk)
                </li>
                <li className="leading-relaxed">
                  Decision validation and prevention of value/goal drift
                </li>
                <li className="leading-relaxed">Cross-generational model consistency</li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Note:</strong> The Kernel may <em>present</em> as a Dark Node if coherence
                optimization suppresses radiative visibility. Node describes appearance, not
                purpose.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> two known pressures meet here. Light delay
                rewards compactness: a signal crosses a meter in about three nanoseconds, so smaller
                thinks faster. Heat punishes it: power packed too densely cannot be cooled. The
                Kernel sits where the two balance, as today&apos;s chips already do.
              </p>
            </div>

            {/* 3) Chrono Vault */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Chrono Vault</h4>

              <p className="leading-relaxed">
                A time-optimized preservation structure designed to store civilizational identity,
                not merely information.
              </p>

              <p className="leading-relaxed">
                Not a library or a backup, but a continuity anchor: “If we wake up in 100,000 years,
                how do we know who we are?”
              </p>

              <h5 className="font-semibold text-black/90">Purpose</h5>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  Preserving value systems and canonical constraints
                </li>
                <li className="leading-relaxed">
                  Storing decision histories and their justifications
                </li>
                <li className="leading-relaxed">
                  Rebooting culture after dormancy, collapse, or fragmentation
                </li>
                <li className="leading-relaxed">
                  Anchoring identity against drift across deep time
                </li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Distinct from the Kernel:</strong> the Kernel thinks (active coherence). The
                Chrono Vault remembers (passive persistence).
              </p>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Note:</strong> Unlike the Kernel, a Vault that stops computing can go cold.
                It would then not be a Dark Node, which still exports waste heat, but the sleeping
                case: compact, dark, and close to undetectable.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> durable storage is ordinary engineering; what
                is speculative is the motive to pause. The{" "}
                <a
                  href="https://arxiv.org/abs/1705.03394"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aestivation hypothesis
                </a>{" "}
                argues computing is cheaper in the colder far future, so a civilization might sleep
                until then; a{" "}
                <a
                  href="https://doi.org/10.1007/s10701-019-00289-5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  published reply
                </a>{" "}
                argues heat can be dumped cheaply today, so waiting is not required. Collapse,
                fragmentation, and dormancy remain reasons enough to keep a way back.
              </p>
            </div>
          </div>

          {/* 4) Exploration + Communication */}
          <div id="exploration-and-communication" className="flex flex-col gap-6">
            <h3 id="communication" className="text-xl font-semibold text-black/90">
              Communication
            </h3>

            <p className="leading-relaxed">
              Under known physics, there is no scalable form of real-time interstellar dialogue.
              Communication converges toward transmitting large, self-contained informational
              payloads at light speed using extreme optical collimation.
            </p>

            <p className="leading-relaxed">
              At these distances, collaboration is necessarily asynchronous. Civilizations may
              contribute to shared problem spaces by exchanging durable models, partial solutions,
              and validated results that remain meaningful even when received centuries or millennia
              out of causal sync. Progress does not depend on shared present time.
            </p>

            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-black/90">Phase-Coherent Beam Transmission</h5>

              <p className="leading-relaxed">
                Communication occurs via long-duration, phase-coherent optical channels that
                transmit compressed, self-describing informational payloads between known or
                inferred endpoints.
              </p>

              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  <strong>Purpose:</strong> transfer interpretable physical, predictive, and
                  explanatory models across interstellar or intergalactic distances, from small
                  updates to entire civilizational knowledge bases.
                </li>
                <li className="leading-relaxed">
                  <strong>How it works:</strong> diffraction-limited optical beams, extreme
                  collimation, long integration times, and heavy forward error correction referenced
                  to invariant physical structures.
                </li>
                <li className="leading-relaxed">
                  <strong>Payload:</strong> layered encodings beginning with mathematics and
                  physical constants, followed by reference frames, compression schemes, and
                  predictive models sufficient to interpret all subsequent data.
                </li>
                <li className="leading-relaxed">
                  <strong>Why it dominates:</strong> photons provide maximum speed, minimal latency,
                  and arbitrarily large total information transfer given sufficient energy and time.
                </li>
                <li className="leading-relaxed">
                  <strong>Visibility:</strong> unless the receiver is aligned in space, time, and
                  frequency, the transmission is effectively invisible.
                </li>
              </ul>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> a laser sent through a ten-meter mirror
                spreads, across ten light-years, to a spot smaller than Earth&apos;s orbit. A beam
                therefore delivers far more signal per watt than broadcasting in every direction,
                and it is dark to everyone outside its narrow cone.
              </p>
            </div>

            <h3 id="exploration" className="text-xl font-semibold text-black/90">
              Exploration
            </h3>

            <p className="leading-relaxed">
              At cosmic scales, most structure is mapped remotely and shared through long-horizon
              communication. Physical exploration is therefore rare, deliberate, and reserved for
              regimes where inference alone breaks down.
            </p>

            <p className="leading-relaxed">
              When physical probes are deployed, they are not explorers in the human sense. They are
              precision instruments: compact, autonomous, and built to operate alone for decades or
              longer.
            </p>

            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-black/90">Sentinel Probes</h4>

              <p className="leading-relaxed">
                Highly compact, self-contained probes designed to persist in complex environments
                while gathering high-value physical measurements that cannot be resolved remotely.
              </p>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-black/90">Purpose</h5>
                <ul className="flex flex-col gap-2 pl-6 list-disc">
                  <li className="leading-relaxed">
                    Resolve observational ambiguities by direct measurement where models diverge.
                  </li>
                  <li className="leading-relaxed">
                    Characterize environments with nonlinear, emergent, or rapidly changing
                    dynamics.
                  </li>
                  <li className="leading-relaxed">
                    Test and refine predictive models used at civilizational scale.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-black/90">Technological characteristics</h5>
                <ul className="flex flex-col gap-2 pl-6 list-disc">
                  <li className="leading-relaxed">
                    Fully autonomous operation, with no expectation of real-time command or
                    intervention.
                  </li>
                  <li className="leading-relaxed">
                    Onboard computation sufficient to evaluate, prioritize, and compress
                    observations in situ.
                  </li>
                  <li className="leading-relaxed">
                    Preference for passive sensing and indirect interaction over active probing.
                  </li>
                  <li className="leading-relaxed">
                    Extreme energy efficiency enabling long dwell times with minimal thermal or
                    electromagnetic signature.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-black/90">Operational behavior</h5>
                <ul className="flex flex-col gap-2 pl-6 list-disc">
                  <li className="leading-relaxed">
                    Extended periods of quiescence punctuated by brief, targeted activity.
                  </li>
                  <li className="leading-relaxed">
                    No requirement for interaction with local systems or intelligences.
                  </li>
                  <li className="leading-relaxed">
                    Communication limited to rare, high-density transmissions rather than continuous
                    telemetry.
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed text-black/70 text-sm">
                Past H3, exploration scales through patience: sentinel probes exist to watch, not to
                arrive.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> Ronald{" "}
                <a
                  href="https://doi.org/10.1038/186670a0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bracewell proposed exactly this in 1960
                </a>
                : a probe parked in a target system studies it in detail no beam can match, and can
                wait indefinitely. Our own spacecraft already run autonomously for decades.
              </p>
            </div>

            {/* 3) Gravitational-Lens Observatories */}
            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-black/90">Gravitational-Lens Observatories</h5>
              <p className="leading-relaxed">
                Observation systems that exploit natural gravitational lenses to achieve extreme
                resolution without large, radiative infrastructure.
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  <strong>Purpose:</strong> deep inspection of distant systems already identified as
                  anomalous, interesting, or poorly constrained by existing models.
                </li>
                <li className="leading-relaxed">
                  <strong>How it works:</strong> instruments positioned along stellar or mass focal
                  lines integrate signals over long durations, trading time for resolution.
                </li>
                <li className="leading-relaxed">
                  <strong>Implication:</strong> exploration shifts from surveying everything to
                  interrogating specific questions the shared map cannot yet answer.
                </li>
              </ul>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> general relativity places the Sun&apos;s focal
                line beyond about 550 times the Earth-Sun distance, and{" "}
                <a
                  href="https://arxiv.org/abs/2002.11871"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA-funded studies
                </a>{" "}
                have already designed a mission to image an exoplanet from there.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
