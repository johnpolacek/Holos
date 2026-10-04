import { FootnoteLink, predictionsCitationMap } from "./citation-sections";
import EvidenceSoFar from "./EvidenceSoFar";
import { evidence } from "./evidence-data";
import { SPECS as PRED } from "./figures/predictions";
import { SPECS as PRED2 } from "./figures/predictions2";
import SpecFigure from "./figures/SpecFigure";
import { SPECS as SPEC } from "./figures/speculation";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

export default function Predictions({ isPDF = false }: { isPDF?: boolean } = {}) {
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
            In the version this site defends, Holos adds no new{" "}
            <a
              href="https://en.wikipedia.org/wiki/Dynamics_(physics)"
              target="_blank"
              rel="noopener noreferrer"
            >
              dynamical laws
            </a>{" "}
            (the rules that say how things change over time) and changes none of the equations of
            physics. It is built on two ideas. First, a threshold,{" "}
            <MathInline>{"\\Phi_c"}</MathInline>. A system is an observer, with experience of its
            own, only once its parts are integrated enough to act as one whole. Second, Omega, the
            whole, with one experiencer living through every self. The commitments and tests below
            follow from established physics, from those two additions, and from the positions Holos
            takes on structure and mind (Axioms 1 and 4). Where a claim depends on one particular
            reading of quantum physics, the one without collapse, it is marked (Commitment 3 and
            Check C). The speculation at the end does not follow from any of this, and it is labeled
            as such.
          </p>

          <p className="leading-relaxed">
            The sections below separate three kinds of claims. The last section includes speculative
            extensions that aim to produce observable signatures, not just philosophy.
          </p>

          <ul className="flex flex-col gap-2 pl-6 list-disc">
            <li className="leading-relaxed">
              <strong>Commitments.</strong> What must be true if Holos is correct, independent of
              any future experiments.
            </li>
            <li className="leading-relaxed">
              <strong>Testability and its limits.</strong> What can never be tested (presence, the
              fact that experience is lived), two tests Holos could fail, one consistency check, and
              one standing bet about physics, with the fallback version of Holos stated in advance
              in case the bet is lost.
            </li>
            <li className="leading-relaxed">
              <strong>Speculation.</strong> Extensions that <em>could</em> follow under Holos on
              long timescales, stated with explicit alternatives rather than predictions.
            </li>
          </ul>
          <SpecFigure spec={PRED.claims} isPDF={isPDF} />

          <p className="leading-relaxed text-black/70 text-sm">
            For the definitions and the observer requirements, see{" "}
            <a href="/logic#primitive-definitions" className="underline hover:no-underline">
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
            Commitments 1 and 2 are fundamental to Holos. A serious rival denies each, and if either
            is false, the framework fails. Commitment 3 belongs to Holos without collapse, the
            version this site defends. The version with collapse is declared in advance under{" "}
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
              <strong>Local.</strong> Experience occurs in no place except inside observers, systems
              past the threshold. It is not spread through matter or ambient in space or fields.
              Omega is the one experiencer, and it lives through observers. Whether the whole as
              such has any view of itself is not a question about a place, and Holos leaves it open.
              &quot;Local&quot; says where experience happens, not who has it. Structure without
              observers still exists, as pattern. Unobserved histories remain part of{" "}
              <MathInline>{"C"}</MathInline>, the branches physics produces, and are simply never
              lived. (In the reading of quantum physics adopted here, every outcome a measurement
              could have occurs, each in its own branch, a complete, separate version of how the
              world goes.)
            </p>

            <p className="leading-relaxed">
              <strong>Only from outside.</strong> A physical description can be complete and still
              say nothing of whether anything is lived. The gap is not a missing fact. A perfect
              physical copy has the same inside. It is that the description is written from outside,
              like a floor plan that records every wall and still cannot say what living in the
              house is like.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Experience happens nowhere but in observers. Physics fixes all of it, but states it
              only from outside.
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
            <SpecFigure spec={PRED.rulesOut} isPDF={isPDF} />

            <p className="leading-relaxed">
              Anthropic principles (we should not be surprised to find ourselves in a universe that
              allows observers, since we could not find ourselves anywhere else) explain why
              observers find themselves in universes that allow them. They do not say where
              experience occurs, or why physics states it only from outside. Holos answers the first
              and names the second. Why there is experience at all, it leaves open.
            </p>

            <p className="leading-relaxed">
              Holos uses three words, each for one thing. <strong>Lived</strong> is where experience
              occurs. <strong>Lit</strong> is the causal past it draws on (everything close enough
              in space and time for light or signals to have reached an observer). And{" "}
              <strong>unlit</strong> is structure outside every observer&apos;s causal past. They
              are defined in{" "}
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
            <SpecFigure spec={PRED2.thresholded} isPDF={isPDF} />

            <p className="leading-relaxed">
              Holos rejects the idea that experience increases smoothly with greater amounts of
              computation. Distributed processing can scale indefinitely without producing a single
              point of view.
            </p>

            <p className="leading-relaxed">
              What matters is integration. Well below the threshold, there is no unified internal
              state that could count as “what is happening for the system.” Well above it, in a
              system that meets the other observer requirements, experience is unavoidable.
            </p>

            <div className="my-2">
              <MathDisplay>{"\\text{Observerhood requires } \\Phi \\ge \\Phi_c"}</MathDisplay>
            </div>

            <p className="leading-relaxed">
              In words, a system is an observer only if its integration, written{" "}
              <MathInline>{"\\Phi"}</MathInline> (phi), reaches the threshold,{" "}
              <MathInline>{"\\Phi_c"}</MathInline>. <MathInline>{"\\Phi"}</MathInline> measures how
              far a system&apos;s parts constrain one another as one whole, and the inequality is
              shorthand for being past the twilight described below. No one can yet compute{" "}
              <MathInline>{"\\Phi"}</MathInline> for a real brain, so the tests below use measurable
              stand-ins such as PCI.
            </p>

            <p className="leading-relaxed">
              Observerhood is neither ubiquitous nor optional. It appears when structural conditions
              for integration are met.
            </p>

            <p className="leading-relaxed">
              Whether a system crosses this threshold is a fact about how its parts are wired
              together, and integration alone is not enough. The integrated state must be about a
              world beyond the system (see the observer requirements in{" "}
              <a href="/logic#ontology" className="underline hover:no-underline">
                Logic
              </a>
              ). It belongs to the structural layer, the facts that hold the same for everyone,
              alongside the laws of physics, and it does not depend on who is looking. Observerhood
              is what qualifies a system to have a perspective at all. It is not relative to one. In
              the monist reading (the reading that the whole is the one experiencer), crossing the
              threshold is where a new self begins. No new experiencer does.
            </p>

            <p className="leading-relaxed">
              Two consequences follow. A physically identical copy of an observer cannot lack
              experience (Axiom 4). And the threshold is steep but not a mathematical line. There
              are clear cases on both sides, a narrow twilight between, fixed by structure, so a
              copy of a borderline system is borderline too (see{" "}
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
              what is consistent, such as the laws of physics, the branches physics produces with
              their quantum weights, and whether a system meets the integration threshold. These are
              absolute and observer-independent. <strong>Registered facts</strong> describe what is
              lived, which outcome a system registers from its own perspective. These are always
              indexed to observing systems.
            </p>

            <p className="leading-relaxed">
              The relational commitment applies to registered facts. There is no absolute,
              observer-independent fact about which outcome is experienced. The structural layer, by
              contrast, is not relative. Without it, registration would have nothing stable to
              register.
            </p>

            <p className="leading-relaxed">
              This does not imply contradiction, and Holos is specific about why. No possibility is
              erased (Axiom 2), so observers never collide over a single shared outcome. Where
              registrations would be incompatible, they belong to different branches of the one
              quantum state, each internally consistent. There is no rule that the first observer
              fixes the truth for everyone. For far-apart events, relativity says observers moving
              differently can disagree about which came first, so there is no single “first” to
              appoint, and none is needed.
            </p>

            <p className="leading-relaxed">
              Within a branch, consistency is operational rather than abstract. Whenever two
              observers actually compare records, their records agree. Perspectives may differ while
              separated. Communication forces agreement. This is what &quot;consistent&quot; means
              in practice. Physics secures it. Observers who communicate are reached by the same
              signals.
            </p>

            <p className="leading-relaxed">
              Branches are not all equal. Each carries a weight, and those weights reproduce the
              probabilities quantum physics predicts (the Born rule). That is why, from inside, a
              50/50 quantum experiment looks like a fair coin. Almost all of the weight lies with
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
            <SpecFigure spec={PRED.twoLayers} isPDF={isPDF} />

            <p className="leading-relaxed">
              Apparent collapse (the way a measurement seems to pick out one outcome) is therefore
              not a new physical process. Within each branch, records are already definite, a
              detector&apos;s click included. What an observer adds is not the definiteness but its
              being lived.
            </p>
          </div>

          <div className="mt-2 pt-4 border-t border-black/10">
            <p className="leading-relaxed text-black/70 text-sm">
              Everything that follows assumes these commitments. What comes next is what experiments
              can and cannot show about them.
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
            The central claim of Holos is that observation is where structure is lived, not a force.
            In the version this site defends, it changes no equation and moves nothing. But every
            experiment is a physical measurement, and an instrument only ever records physical
            change. So <strong>presence itself cannot be detected directly</strong>. An instrument
            that finds nothing extra is exactly what Holos predicts, because there is nothing extra
            to find. Presence is what the physics is like from the inside, not an additional signal
            beside it.
          </p>

          <p className="leading-relaxed">
            This is not a gap Holos has failed to close. It follows from the framework&apos;s own
            commitment, in the version defended here, that observation is dynamically inert. It has
            no physical effect, pushes nothing, and changes no outcome. The sharpest form of the
            objection is the{" "}
            <a
              href="https://doi.org/10.1016/j.concog.2019.04.002"
              target="_blank"
              rel="noopener noreferrer"
            >
              <em>unfolding argument</em>
            </a>{" "}
            (Doerig et al. 2019). Any system with feedback loops can in principle be copied by a
            loop-free one that behaves identically, so no behavioral test can tell which is
            conscious. It is aimed at integration-based theories like Holos. Holos accepts it for
            presence itself. The metaphysical claims (presence, and the whole it belongs to) cannot
            be settled by any experiment. Test A does not compare such twins. It asks, within real
            human brains, whether reports follow integration or behavior when the two come apart.
            The same limit is why artificial systems offer no test of their own. What a language
            model says about its experience is learned from human writing, so it is not evidence
            either way. Whether a machine crosses is judged by its structure (see{" "}
            <a href="/logic#artificial-systems" className="underline hover:no-underline">
              Artificial Systems
            </a>
            ).
          </p>

          <p className="leading-relaxed">
            What remains testable is not presence but its <strong>structural preconditions</strong>:
            claims about what observation requires, and how registered facts behave. These live in
            the physical world and can genuinely fail. Two are stated below as tests, each with an
            explicit way to lose: Test A for the core, and Test B for the transition hypothesis. A
            third is stated as a consistency check. Its expected outcome is the one standard quantum
            mechanics already predicts, so it guards against contradiction rather than singling
            Holos out. A prediction Holos shares with rival theories cannot single it out, but a
            shared prediction it could fail is still worth more than one it cannot. Beneath them all
            sits a standing bet, stated after them, on the physics Holos adopts, with the version of
            Holos a loss would leave declared in advance.
          </p>
          <SpecFigure spec={PRED.testability} isPDF={isPDF} />
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
            Bedside assessment treats responsiveness as the sign of consciousness. A patient who
            follows commands is conscious, and one who does not is presumed not to be. No serious
            theory equates the two, but the proxy runs deep in practice. In Holos, what matters is{" "}
            <em>integration</em>, and integration can come apart from outward behavior. When the two
            diverge, Holos bets that experience follows integration.
          </p>
          <SpecFigure spec={PRED2.testA} isPDF={isPDF} />

          <p className="leading-relaxed">
            The bet is losable because cases where the two come apart already exist. People under
            anesthetic doses of{" "}
            <a
              href="https://en.wikipedia.org/wiki/Ketamine"
              target="_blank"
              rel="noopener noreferrer"
            >
              ketamine
            </a>
            , in REM sleep (the stage of most vivid dreaming), or in some seizures do not respond,
            yet later report vivid experience. Sleepwalkers, and people performing automatic actions
            during certain seizures (automatisms), move and respond, yet often report little. These
            are natural experiments that pull integration apart from responsiveness.
          </p>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Objective</h4>
            <p className="leading-relaxed">
              Across states where responsiveness and integration diverge, determine whether later
              reported experience tracks a measure of integration or tracks behavioral
              responsiveness and arousal (how awake the brain is, as distinct from what it
              experiences).
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
                </a>{" "}
                (PCI). A magnetic pulse is sent into the brain through the scalp (transcranial
                magnetic stimulation, TMS), and EEG records how the cortex echoes. A rich,
                widespread, varied echo scores high. A local or uniform one scores low. PCI captures
                integration together with differentiation, so it is a stand-in for integration, not
                a direct measure. The original PCI&apos;s published cutoff is 0.31 (
                <a
                  href="https://doi.org/10.1002/ana.24779"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Casarotto et al. 2016
                </a>
                ). A cortex-wide gauge.
              </li>
              <li className="leading-relaxed">
                <strong>Second gauge:</strong> the same kind of measurement confined to the back of
                the brain&apos;s outer layer (posterior cortex), where dream reports have been found
                to track local activity. Its cutoff is set on calibration states (cases used to tune
                the gauge) and frozen before any held-out data (cases set aside in advance to test
                it).
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
              dreaming, and ketamine with vivid reports. Those cases cannot confirm Test A. They are
              the answer key, not the exam. The test counts only states that played no part in
              setting the cutoff, named in advance. They are dream reports from non-REM sleep (the
              sleep stages outside REM), deep sedation with intermittent awakening, sleepwalking and
              other automatisms, complex seizures, psychedelic states, and covert awareness in
              unresponsive patients, which brain scans or EEG find in about a quarter of those
              tested (
              <a
                href="https://doi.org/10.1056/NEJMoa2400645"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bodien et al. 2024
              </a>
              ). This follows the model of{" "}
              <a
                href="https://doi.org/10.1038/s41586-025-08888-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                COGITATE
              </a>
              , an &quot;adversarial collaboration&quot; in which two rival theories of
              consciousness (integrated information theory and global workspace theory) wrote down
              their predictions before the data were collected. Its results (Cogitate Consortium,
              2025) challenged key predictions of both.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">Holos Prediction</h4>
            <p className="leading-relaxed">
              Where the two come apart, reports follow integration. People whose brains are highly
              integrated but who do not respond are experiencing something. People who respond but
              whose brains show low integration are not.
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
              proposed afterward. A new gauge can be tested on new data, but it cannot rescue
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
              The evidence delivers unremembered. The prediction needs unexperienced. This confound
              is not currently controlled, so silence carries little weight in either direction. It
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
              the waking range. Deep sedation is starker. In one study, 82 percent of interpretable
              awakenings from deep sedation with propofol (a common anesthetic) produced reports of
              experience (
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
              complexity measures, one of them a newer variant of PCI (PCIst, on a different scale
              from the 0.31 cutoff), fell from waking to sedation but did not differ between
              awakenings with and without experience. A sleep study found the same for a complexity
              measure of spontaneous EEG (brain activity recorded without stimulation) within light
              non-REM sleep (
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
              That is why the second gauge is local. The maximality condition (an observer forms
              where integration peaks) allows an aperture smaller than the whole cortex, so an
              aperture confined to posterior cortex could be integrated above threshold while the
              whole brain is not. Holos adopts that reading now, after seeing these results, so they
              cannot count in its favor. Only new data, collected under the protocol above, can
              confirm or defeat it. A gauge chosen afterward to rescue the prediction would turn the
              test into decoration.
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
            prediction with other integration-based accounts of consciousness. It is a test Holos
            could fail, not a signature unique to Holos. Its results also help locate the threshold,
            under a strict rule. States used to set a cutoff may tune the measures and weed out weak
            ones, but never count as evidence. Only states set aside in advance can confirm or
            refute the claim (see{" "}
            <a href="/logic#path-to-threshold" className="underline hover:no-underline">
              A path to the threshold
            </a>
            ).
          </p>
        </div>
        <EvidenceSoFar block={evidence["test-a"]} />
      </section>

      {/* Test B */}
      <section id="minimal-neural-systems" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Test B: The twilight narrows with size
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            This test is for the transition hypothesis (claim 3 of{" "}
            <a href="/logic#threshold-claims" className="underline hover:no-underline">
              the threshold
            </a>
            ), not the core. Genuine transitions in physics look blurred in a small sample and
            sharpen in a large one. A magnet loses its magnetism at a set temperature (the Curie
            point), and the larger the magnet, the more abrupt the change. If crossing the threshold
            is a genuine transition, sudden or continuous, its twilight should likewise narrow as a
            system grows. Networks of living neurons grown in a dish and connected to simple
            environments are the cheapest place to look. The{" "}
            <a
              href="https://doi.org/10.1016/j.neuron.2022.09.001"
              target="_blank"
              rel="noopener noreferrer"
            >
              DishBrain
            </a>{" "}
            platform, in which cultured neurons were wired to a simple game of Pong (Kagan et al.
            2022), shows the kind of setup, not evidence of experience. Integration is the result,
            not the knob. Turn a condition such as a drug dose or the network&apos;s connectivity,
            and track an integration measure fixed in advance. Small cultures should cross
            gradually, and larger cultures, grown the same way, more steeply, as connectivity,
            feedback, and coupling to their environment increase.
          </p>
          <SpecFigure spec={PRED2.testB} isPDF={isPDF} />

          <div>
            <h4 className="font-semibold text-black/90 mb-1">
              Why a transition alone is not enough
            </h4>
            <p className="leading-relaxed">
              A sharp transition at loss of consciousness is predicted by ordinary physicalist
              models too (sudden tipping points and network-wide switch-ons of the kind these
              systems produce anyway), so observing one confirms nothing specific to Holos. And a
              cultured network almost <em>always</em> shows some abrupt change in behavior (neurons
              falling into step and cascades of activity called neuronal avalanches are routine dish
              behavior), so an experiment that counts any such transition as success cannot fail,
              and an experiment that cannot fail proves nothing when it passes. What counts is how
              the steepness scales with size.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">How Holos loses</h4>
            <p className="leading-relaxed">
              The integration measure and its cutoff are fixed in advance. Holos loses claim 3,
              though not its core, if the steepness does not grow with size. A steepening that
              tracks something other than integration, such as arousal, raw activity, or metabolic
              rate, does not count in its favor. Without a pre-committed measure and a real failure
              condition, a transition &quot;somewhere&quot; is not evidence. It is decoration.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>What this can and cannot show:</strong> such transitions would not show that a
            dish is conscious. They test the shape of the threshold, not presence itself. Sharp
            drops in integration under anesthesia are useful in the same way, but only as data for
            Test A, under its rules.
          </p>
        </div>
        <EvidenceSoFar block={evidence["test-b"]} />
      </section>

      {/* Check C */}
      <section id="experiment-2" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          Check C: Observer-relative facts
          <FootnoteLink
            number={predictionsCitationMap["experimentation"]}
            className="relative left-1 -top-2.5"
          />
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            This check lives in quantum foundations (the study of what quantum theory says about the
            world), not in the theory of mind, and its status comes first. It is a consistency
            check, not a test that could single Holos out. The outcome it anticipates is the one
            textbook quantum mechanics already predicts. What experiments in this family probe is
            the family of interpretations Holos belongs to (branching, with no observed event that
            is a fact for everyone), not Holos alone. The framework&apos;s distinctive content,
            which structures are lived, is a claim about what exists, not something an experiment
            can show.
          </p>
          <SpecFigure spec={PRED2.checkC} isPDF={isPDF} />

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
            measurement, already pursue exactly this question. Picture a friend sealed in a lab who
            measures a particle and sees a result. Outside, Wigner treats the whole lab, friend
            included, as one quantum system and runs a measurement that probes the friend&apos;s
            result. The 2020{" "}
            <a
              href="https://doi.org/10.1038/s41567-020-0990-x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <em>Local Friendliness</em> no-go theorem
            </a>{" "}
            (an impossibility proof, Bong et al.) shows that three reasonable assumptions cannot all
            be true together, if the friend&apos;s observation counts as a genuine fact. The three
            are that the friend&apos;s result is a fact for everyone (the absoluteness of observed
            events), that no influence travels faster than light (locality), and that the
            experimenters&apos; choices are free (freedom of choice). &quot;Local Friendliness&quot;
            is the name for the three together. Experiments with light, with photons standing in for
            the friend, break the limit the three assumptions set, just as quantum theory predicts.
            Holos gives up the absoluteness of observed events. Registered facts are
            observer-relative, while structural facts and consistency remain intact. In this it
            sides with branching approaches and borrows one insight from relational ones. Registered
            facts are indexed to the systems that register them. It does not adopt Relational
            Quantum Mechanics itself, which rejects the universal state (a single quantum state for
            the whole universe) that branching requires.
          </p>

          <p className="leading-relaxed">
            One caveat follows from Holos&apos;s own threshold. The &quot;friends&quot; in current
            experiments with light are far below <MathInline>{"\\Phi_c"}</MathInline> and register
            nothing, so these experiments constrain the logical structure of observed events, not
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
              own. The theorem is a proof, and a violation only forces a choice among its
              assumptions. What could go wrong for Holos is dependence on scale. If the violations
              shrink or vanish as the friend grows toward a genuine observer, beyond what
              decoherence (the ordinary fading of quantum effects through contact with the
              surroundings) accounts for, observation is doing something physical, and the standing
              bet below is lost. A second way to lose lies within a branch. Observers who compare
              records must find them matching, and a confirmed, irreconcilable mismatch between
              communicating observers would falsify Commitment 3.
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
            . A positive result supports the family, not Holos alone. Running the same test on a
            quantum computer&apos;s chips (superconducting qubits), treating different parts as
            &quot;observers&quot;, would not work as a test. By Holos&apos;s own threshold, qubit
            readouts register nothing, and the result would be ordinary quantum behavior that the
            branching picture Holos adopts already accounts for.
          </p>
        </div>
        <EvidenceSoFar block={evidence["check-c"]} />
      </section>

      {/* The standing bet */}
      <section id="standing-bet" className="flex flex-col gap-6">
        <h3 className="text-xl sm:text-2xl font-medium pb-2">
          The standing bet: consciousness adds no new physics
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            In the version of Holos this site defends, observation is dynamically inert, and that
            doubles as a bet. A conscious observer obeys the same quantum laws as a photon. Put an
            integrated system in the measuring role in place of a particle, and Holos predicts no
            deviation whatsoever. Superpositions (a system being in several states at once) fade
            because the system becomes entangled with its surroundings, a well-understood process
            called decoherence, never because someone was home. This does not make experience idle.
            Under Holos, experience is the inside of the physics, so when the physics does
            everything, experience is doing its share, not nothing.
          </p>
          <SpecFigure spec={PRED2.bet} isPDF={isPDF} />

          <p className="leading-relaxed">
            <strong>How Holos loses:</strong> unitary quantum mechanics is quantum mechanics in
            which the state always evolves smoothly and never collapses. If any experiment ever
            finds a consciousness-linked deviation from it (a superposition that degrades when an
            integrated observer registers it, beyond what ordinary decoherence accounts for), Holos
            without collapse is falsified. Observation would make a physical difference after all.
            The version defended here also loses if experiments confirm collapse of any other kind,
            such as the size-based collapse that objective-collapse models propose (large objects
            settling into one outcome on their own, observed or not). That would leave the standing
            bet about consciousness intact but rule out branching, leaving Holos with collapse. So
            far every such search has come up empty, and the simplest version has been ruled out.
          </p>

          <p id="two-versions" className="leading-relaxed">
            <strong>Two versions, declared now.</strong> Holos comes in two versions. They share one
            core, Axioms 1, 3, 4, and 5, and differ only on quantum physics.{" "}
            <em>Holos without collapse</em> is the version this site defends and the one the bet is
            about. In it, Axiom 2 is read as unitary evolution. The quantum state always evolves
            smoothly, every outcome occurs in its own branch, an observer&apos;s odds are odds of
            finding itself in one branch rather than another (self-locating odds), and observation
            changes nothing it registers. <em>Holos with collapse</em> is the version a lost bet
            would leave, declared now. Experience would still be the inside of physical activity
            (Axiom 4), adding no force beyond the physics. That activity would simply include a
            collapse law. Omega (Axiom 5) would be the universe with its single history, and lived,
            lit, and unlit would apply within that one history.
          </p>

          <p className="leading-relaxed">
            Which collapse nature shows decides what the threshold becomes. If a superposed system
            above the threshold collapses while an equally large one below it does not, collapse
            tracks integration crossing <MathInline>{"\\Phi_c"}</MathInline>, and observers matter
            physically, exactly where Holos says. The threshold becomes the collapse point,
            detectable for the first time, and registration no longer leaves what it registers
            unchanged. That is the reading of Holos&apos;s named rival,{" "}
            <a href="https://arxiv.org/abs/2105.02314" target="_blank" rel="noopener noreferrer">
              Chalmers and McQueen (2022)
            </a>
            , who propose that integrated consciousness does collapse the wave function (the quantum
            state, which collapse would reduce to a single outcome), combining integrated
            information theory (IIT) with a physical collapse law, and note that versions of the
            idea could be tested on quantum computers. Holos bets the opposite, so the same
            experiment would decide between them, and a win for their reading would hand the
            threshold the strongest confirmation it could get. If collapse tracks size alone, as
            objective-collapse models propose (large objects collapse on their own, observed or
            not), the threshold stays dynamically inert and gains nothing.
          </p>

          <p className="leading-relaxed">
            Declaring the second version now is what separates it from a rescue, but it does not
            make the two outcomes equal. A lost bet would retire the version defended here, and
            Holos with collapse would have to earn its own support. Neither version is
            unfalsifiable. Both share the core, and the core loses through{" "}
            <a href="#experiment-1" className="underline hover:no-underline">
              Test A
            </a>
            , if experience turns out to track behavior rather than integration. No reading of
            quantum physics escapes that.
          </p>

          <p className="leading-relaxed">
            Meanwhile quantum mechanics keeps holding as systems grow. Clusters of more than 7,000
            sodium atoms now show quantum interference (
            <a
              href="https://doi.org/10.1038/s41586-025-09917-9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedalino et al. 2026
            </a>
            ), and the simplest, parameter-free version of the Diósi-Penrose idea, that gravity
            collapses superpositions, has been ruled out by a search for the faint radiation it
            predicts, run deep under the Gran Sasso mountain in Italy to shield it from cosmic rays
            (
            <a
              href="https://doi.org/10.1038/s41567-020-1008-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donadi et al. 2021
            </a>
            ). Versions with an adjustable parameter survive, and Penrose&apos;s own version may not
            predict that radiation.
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            Some observer-centered frameworks quietly hope consciousness does something physical.
            Holos formally bets that it does not, and states in advance what losing would cost. The
            bet is untested so far. A century of placing ever-larger systems into superposition has
            found no deviation of any kind, but by Holos&apos;s own threshold none of those systems
            was an observer. Photons, molecules, and superconducting circuits all sit far below{" "}
            <MathInline>{"\\Phi_c"}</MathInline>. That record shows quantum mechanics holding at
            those scales. It does not yet reach the case the bet is about. The bet is also the one
            standard physics makes. What makes it worth stating is that Holos, unlike views that
            need consciousness to act, does not hedge on it. The first experiment to put a system
            that clearly meets the observer requirements in the friend&apos;s role would put it to a
            real test, provided the friend can be shown, by agreed measures fixed in advance, to be
            well past the threshold. The consequences are already on the page.
          </p>
        </div>
        <EvidenceSoFar block={evidence["standing-bet"]} />
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
            if the Holos framework is correct. Each is held to one standard. It must be physically
            possible and not extremely unlikely, and each says why it is plausible.
          </p>

          <p className="leading-relaxed">
            We know the familiar hard constraints, which are finite signal speed, noise, and
            thermodynamics. Across a star system, messages take hours. Across many systems, they
            take years. A civilization spread thin and bright struggles to act as one, so staying
            coherent (coordinated as a single whole) rewards compactness, keeping things close, and
            stability over long spans of time.
          </p>
          <SpecFigure spec={SPEC.lightLag} isPDF={isPDF} />

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
              ranks civilizations by energy use. The Holosian Scale ranks civilizations by
              integration in a social sense, meaning how well a civilization coordinates as one
              whole. (This is not the <MathInline>{"\\Phi"}</MathInline> of the tests above.) The
              stages below are a map of what “advancement” looks like if coherence, not throughput,
              is the main objective.
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
                  Coherence survives light-lag (the hours messages take to cross a star system). The
                  civilization functions as one system whose parts need not act in step and shifts
                  from constant broadcast to rare, directed signaling.
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
                  and minimal leakage. External visibility fades. What remains detectable is
                  gravitational and thermal, the waste heat no optimization can eliminate.
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
              light-speed delay and waste heat, plus one assumption, that coordination pays. The
              assumption is the weak link. A civilization that never learns to coordinate stays at
              H0, loud until it ends.
            </p>
            <SpecFigure spec={SPEC.scale} isPDF={isPDF} />
          </div>

          {/* 3) Structures */}
          <div id="technology" className="flex flex-col gap-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-light">Technology</h2>

            <h3 id="mesostructures" className="text-xl font-semibold text-black/90">
              Mesostructures
            </h3>
            <p className="leading-relaxed text-black/70 italic text-sm">
              These are design sketches, not predictions. They are imaginative illustrations of what
              engineering might look like if the Integration Hypothesis (the companion idea that
              mature civilizations stay near home, grow efficient, and go quiet in light) holds.
              Mesostructures, a coinage here, are engineered works far larger than any building but
              far smaller than the star-enclosing megastructures of science fiction.
            </p>
            <p className="leading-relaxed pb-4">
              The structures below are H3–H4 design patterns, compact enough to stay coherent under
              light-lag and thermodynamics, and consequential enough to matter without bright
              sprawl. They span energy generation, active coherence and computation, and long-term
              continuity.
            </p>

            {/* 1) Holocore */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Holocore</h4>

              <p className="leading-relaxed">
                A compact power source, held together by its own gravity, that supplies huge amounts
                of energy for a very long time and sheds its waste heat in a controlled way.
              </p>

              <p className="leading-relaxed">
                The likeliest energy backbone for a civilization that stays home is its home star,
                harvested by nearby collectors (see{" "}
                <a href="/#aliens" className="underline hover:no-underline">
                  Aliens
                </a>
                ). The Holocore is the step beyond. It concentrates energy density rather than
                surface area, converting mass into controlled output through fusion, regulated
                accretion (matter fed steadily into a black hole), or extraction of a black
                hole&apos;s spin.
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
                  Compact, so it cannot hide its heat. At modest power it glows faintly in the
                  infrared. At high power it glows brightly, and it is only as quiet as its output
                  allows
                </li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                The Holocore is infrastructure, not spectacle. If H4 integration suppresses bright
                sprawl, the energy backbone must be dense and long-lived, and it can be only as
                quiet as its power allows. Compact and powerful means hot, the same physics that
                keeps mature systems warm.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> every step is known physics. Only the
                engineering is unknown. Fusion releases about 0.7 percent of a mass as energy.
                Matter falling into a rapidly spinning black hole can release roughly 30 to 42
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
              <SpecFigure spec={SPEC.holocore} isPDF={isPDF} />
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
                This is not a data center. It is the civilization’s thinking heart, where a unified
                world-model (a working picture of how everything fits and behaves) is maintained
                across centuries to millennia.
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
                  Checking decisions and keeping values and goals from drifting over time
                </li>
                <li className="leading-relaxed">Cross-generational model consistency</li>
              </ul>

              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Note:</strong> The Kernel may <em>present</em> as a{" "}
                <a href="/#the-teeming-dark" className="underline hover:no-underline">
                  Dark Node
                </a>
                , ordinary matter that has stopped shining (nothing to do with cosmological dark
                matter), if coherence optimization suppresses the light it gives off. Node describes
                appearance, not purpose.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> two known pressures meet here. Light delay
                rewards compactness. A signal crosses a meter in about three nanoseconds, so smaller
                thinks faster. Heat punishes it. Power packed too densely cannot be cooled. The
                Kernel sits where the two balance, as today&apos;s chips already do. It need not
                hold most of a civilization&apos;s computing. Erasing information costs less in the
                cold, so work that need not be fast may run far out, in a cold halo (see{" "}
                <a href="/#the-teeming-dark" className="underline hover:no-underline">
                  The Teeming Dark
                </a>
                ). The Kernel is the part that must think fast.
              </p>
              <SpecFigure spec={SPEC.kernel} isPDF={isPDF} />
            </div>

            {/* 3) Chrono Vault */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Chrono Vault</h4>

              <p className="leading-relaxed">
                A time-optimized preservation structure designed to store civilizational identity,
                not merely information.
              </p>
              <SpecFigure spec={PRED2.vault} isPDF={isPDF} />

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
                case, compact, dark, and close to undetectable.
              </p>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> durable storage is ordinary engineering. What
                is speculative is the motive to pause. The{" "}
                <a
                  href="https://arxiv.org/abs/1705.03394"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aestivation hypothesis
                </a>{" "}
                argues computing is cheaper in the colder far future, so a civilization might sleep
                until then. A{" "}
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
              Communication converges toward sending large, self-contained packages of information
              at light speed in tightly focused laser beams.
            </p>
            <SpecFigure spec={PRED2.communication} isPDF={isPDF} />

            <p className="leading-relaxed">
              At these distances, collaboration is necessarily asynchronous. Civilizations may
              contribute to shared problem spaces by exchanging durable models, partial solutions,
              and validated results that remain meaningful even when received centuries or millennia
              after they were sent. Progress does not depend on shared present time.
            </p>

            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-black/90">Phase-Coherent Beam Transmission</h5>

              <p className="leading-relaxed">
                Communication occurs via long-running laser links whose light waves stay in step
                (phase-coherent), carrying compressed packages that explain their own format,
                between known or inferred destinations.
              </p>

              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  <strong>Purpose:</strong> transfer interpretable physical, predictive, and
                  explanatory models across interstellar or intergalactic distances, from small
                  updates to entire civilizational knowledge bases.
                </li>
                <li className="leading-relaxed">
                  <strong>How it works:</strong> laser beams focused as tightly as physics allows,
                  received over long stretches of time, with heavy built-in redundancy so errors can
                  be corrected, and with codes keyed to things every civilization shares, such as
                  physical constants.
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
                  frequency, the transmission is effectively invisible. Optical SETI, the search for
                  laser flashes from other civilizations, looks for exactly this kind of signal, one
                  of several technosignatures (detectable signs of technology) astronomers now
                  search for.
                </li>
              </ul>
              <p className="leading-relaxed text-black/70 text-sm">
                <strong>Why it is plausible:</strong> a visible or near-infrared laser sent through
                a ten-meter mirror spreads, across ten light-years, to a spot smaller than
                Earth&apos;s orbit. A beam therefore delivers far more signal per watt than
                broadcasting in every direction, and it is dark to everyone outside its narrow cone.
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
            <SpecFigure spec={PRED2.exploration} isPDF={isPDF} />

            <p className="leading-relaxed">
              When physical probes are deployed, they are not explorers in the human sense. They are
              precision instruments, compact, autonomous, and built to operate alone for decades or
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
                    Study places too complex or fast-changing to predict from afar.
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
                    observations on the spot.
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
                    Long dormant stretches broken by brief, targeted activity.
                  </li>
                  <li className="leading-relaxed">
                    No requirement for interaction with local systems or intelligences.
                  </li>
                  <li className="leading-relaxed">
                    Communication limited to rare, information-dense transmissions rather than a
                    continuous stream of status reports.
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed text-black/70 text-sm">
                Past H3, exploration scales through patience. Sentinel probes exist to watch, not to
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
                . A probe parked in a target system studies it in detail no beam can match, and can
                wait indefinitely. Our own spacecraft already run autonomously for decades.
              </p>
            </div>

            {/* 3) Gravitational-Lens Observatories */}
            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-black/90">Gravitational-Lens Observatories</h5>
              <p className="leading-relaxed">
                Observation systems that use natural gravitational lenses (a star&apos;s gravity
                bending light like a giant lens) to see in extreme detail without large, glowing
                infrastructure.
              </p>
              <ul className="flex flex-col gap-2 pl-6 list-disc">
                <li className="leading-relaxed">
                  <strong>Purpose:</strong> deep inspection of distant systems already identified as
                  anomalous, interesting, or poorly constrained by existing models.
                </li>
                <li className="leading-relaxed">
                  <strong>How it works:</strong> a star&apos;s gravity brings distant light to a
                  focus far away. Instruments placed along that focal line collect light for a long
                  time, trading patience for sharpness.
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
        <EvidenceSoFar block={evidence["speculation"]} />
      </section>
    </div>
  );
}
