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
            Holos does not add new{" "}
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
            Every claim below follows either from established physics or from those two additions.
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
              <strong>Expectations:</strong> patterns we should already observe in neuroscience,
              quantum foundations, and cosmology if those commitments are right.
            </li>
            <li className="leading-relaxed">
              <strong>Testability and its limits:</strong> what cannot be tested (presence itself),
              a structural test that can fail, a consistency check, and a standing bet that could
              falsify the framework outright.
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
            The statements in this section are fundamental to Holos. If any of these are rejected in
            principle, the framework fails as a coherent account of how reality becomes experienced.
          </p>

          {/* C1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              1. Presence depends on observers
            </h3>

            <p className="leading-relaxed">
              A physical description can be complete and still fail to explain why there is anything
              it is like to be inside the system it describes. The gap is not missing information.
              It is that a complete description can be true and still leave out that anything is
              being lived at all.
            </p>

            <p className="leading-relaxed">
              The claim is not that observers modify physical dynamics. It is that a world becomes{" "}
              actualized reality only when information is registered from an internal perspective.
              Without registration, there is structure, but no lived fact.
            </p>

            <blockquote className="pl-4 border-l-2 border-black/30 text-black/70 italic my-2">
              Consistency alone does not produce presence. Presence requires registration.
            </blockquote>

            <p className="leading-relaxed">
              Unobserved histories therefore remain valid structures within{" "}
              <MathInline>{"C"}</MathInline>, the space of what physics permits, but without{" "}
              <MathInline>{"O"}</MathInline>, an observer to register them, they are not experienced
              realities.
            </p>

            <p className="leading-relaxed">
              Anthropic principles explain why observers find themselves in observer-compatible
              universes. They do not explain how observation itself exists or why physical structure
              is experienced from the inside. This framework addresses that gap.
            </p>

            <p className="leading-relaxed">
              The existence of experience demonstrates that self-registering structures are not
              merely abstract possibilities: physics permits them to be built, and at least one has
              been. Once such a structure is realizable even once, actualized reality exists,
              regardless of how rare or contingent its emergence may be.
            </p>

            <p className="leading-relaxed">
              Closure has two levels. <strong>Sealing</strong> is binary and follows the causal
              structure of spacetime: a region is lived if it lies in the causal past of at least
              one aperture in its branch. Every aperture is built from its causal past and carries
              that past into a lived perspective through its traces, so the lived universe is the
              union of its apertures&apos; causal pasts; in the monist reading (reality as one
              experiencer), it is the totality&apos;s lived history. A stretch of history shared by
              many branches is lived wherever it lies in the causal past of an aperture in any
              branch that grows from it. Whatever lies outside every aperture&apos;s causal past,
              including branches that never form one and the far future after the last observer, is
              structure that is never lived. The relation is tenseless, but it points one way: an
              aperture seals its past, not its future. <strong>Witnessing</strong> is direct
              experience, graded and local: how much of a lived history is experienced in detail
              scales with the observers it contains. One observer seals its past; many witness it.
            </p>
          </div>

          {/* C2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">2. Observerhood is thresholded</h3>

            <p className="leading-relaxed">
              Holos rejects the idea that experience increases smoothly with greater amounts of
              computation. Distributed processing can scale indefinitely without producing a single
              point of view.
            </p>

            <p className="leading-relaxed">
              What matters is integration. Below a critical level, there is no unified internal
              state that could count as “what is happening for the system.” Above that level,
              experience is unavoidable.
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
              Two consequences follow. First, there are no dark duplicates: because crossing the
              threshold is a structural fact, any system wired as an observer necessarily is one: a
              physically identical copy of an observer cannot lack experience, in any possible
              world, because experience is the inside of the same event (Axiom 5). Second, the
              threshold is sharp while its surroundings are not. Whether there is experience at all
              is binary; how rich the experience is, is graded above the line; and locating the
              boundary by measurement is permanently imprecise. The fuzziness of real cases lives in
              richness and in our instruments, not in whether anyone is home.
            </p>
          </div>

          {/* C3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black/90">
              3. Facts are relational but consistent
            </h3>

            <p className="leading-relaxed">
              Holos distinguishes two kinds of facts. <strong>Structural facts</strong> describe
              what is consistent: the laws of physics, the space of allowed histories with their
              quantum weights, and whether a system meets the integration threshold. These are
              absolute and observer-independent. <strong>Registered facts</strong> describe what is
              actualized as experience: which outcome a system registers from its own perspective.
              These are always indexed to observing systems.
            </p>

            <p className="leading-relaxed">
              The relational commitment applies to registered facts. There is no absolute,
              observer-independent fact about which outcome is experienced. The structural layer, by
              contrast, is not relative; without it, registration would have nothing stable to close
              against.
            </p>

            <p className="leading-relaxed">
              This does not imply contradiction, and Holos is specific about why. No possibility is
              erased (Axiom 3), so observers never collide over a single shared outcome. Where
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
              Branches are weighted, not merely counted. The statistics every observer records
              follow the Born rule, the unique self-consistent weighting of quantum outcomes
              (Gleason&apos;s theorem). Those weights are structural facts about the possibility
              space, not a measure of how much experience a branch carries. For an observer, what
              the weight measures is odds: after a measurement splits the world and before you look,
              you are one of many observers without knowing which, and a branch&apos;s weight is
              your odds of being among its observers. Counting cannot supply those odds, because the
              observers cannot be counted, so weight is the only measure left. See{" "}
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
              Collapse is therefore not a new physical process. It is the registration of a
              particular outcome by an observer whose internal structure supports presence.
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
            commitments of Holos are correct. Persistent failure across domains would undermine the
            framework.
          </p>

          {/* Neuroscience */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Neuroscience: Discrete transitions in conscious access
            </h3>

            <p className="leading-relaxed">
              If observerhood requires a minimum level of integration, then transitions between
              conscious and unconscious states should not appear as smooth signal degradation. They
              should resemble state changes.
            </p>

            <p className="leading-relaxed">
              Large-scale neural integration measures should therefore change abruptly, not
              smoothly, near loss and recovery of consciousness. Below threshold, processing
              continues without unified access to experience.
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
              are relevant not as definitions of consciousness, but as probes of whether integration
              crosses a critical boundary.
            </p>
          </div>

          {/* Quantum foundations */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Quantum foundations: Observer-relative facts without collapse
            </h3>

            <p className="leading-relaxed">
              If facts are brought into being through registration, quantum experiments should
              continue to allow descriptions in which different observers register incompatible
              outcomes without violating global consistency.
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
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Cosmology: Ontological filtering rather than fine-tuning
            </h3>

            <p className="leading-relaxed">
              The observed universe lies within the narrow range compatible with long-lived
              observers, not because constants were dynamically tuned, but because only such
              structures become experientially present.
            </p>

            <p className="leading-relaxed">
              Observer-incompatible universes may exist as valid physical structures while never
              being lived: with no apertures, the totality has no opening into them, and they remain
              unlit structure. The nearest examples are not exotic: under the branching picture,
              observer-free branches of our own universe are unlit structure in exactly the same
              sense. Anthropic reasoning (the observation that we can only find ourselves in a
              universe able to support us) is therefore reframed as ontological filtering rather
              than selection.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-black/90">
              Minimal neural systems: emergence of coherent integration
            </h3>

            <p className="leading-relaxed">
              If observerhood depends on informational integration rather than biological scale,
              then small biological neural networks interacting with an environment should exhibit
              measurable transitions in system-level coherence as integration increases.
            </p>

            <p className="leading-relaxed">
              Recent experiments with cultured neural networks connected to digital environments
              suggest that biological neurons can form closed feedback loops outside of a full
              organism. Under the Holos framework, progressively increasing connectivity, feedback
              richness, and environmental coupling should eventually produce a regime where neural
              activity shifts from distributed dynamics toward unified system-level organization.
            </p>

            <p className="leading-relaxed">
              Such transitions would not demonstrate consciousness directly. However, the existence
              of a reproducible boundary between loosely coupled neural computation and coherent
              integrated dynamics would support the claim that observerhood depends on structural
              integration rather than on organismal complexity.
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
            The central claim of Holos is that observation is a closure condition, not a force: it
            changes no equation and moves nothing. But every experiment is a physical measurement,
            and an instrument only ever registers physical change. So{" "}
            <strong>presence itself cannot be detected directly</strong>. An instrument that finds
            nothing extra is exactly what Holos predicts, because there is nothing extra to find:
            presence is what the physics is like from the inside, not an additional signal beside
            it.
          </p>

          <p className="leading-relaxed">
            This is not a gap Holos has failed to close. It follows from the framework&apos;s own
            commitment that observation is dynamically inert. The sharpened form of the objection is
            the <em>unfolding argument</em>: for any conscious system one can in principle describe
            a behaviorally identical twin wired differently, and no external test could separate
            them. Holos accepts this. The metaphysical core (presence, and the totality it belongs
            to) cannot be settled by any experiment.
          </p>

          <p className="leading-relaxed">
            What remains testable is not presence but its <strong>structural preconditions</strong>:
            claims about what observation requires, and how registered facts behave. These live in
            the physical world and can genuinely fail. One is stated below as a test, with an
            explicit way for Holos to lose. The other is stated as a consistency check: its expected
            outcome is the one standard quantum mechanics already predicts, so it guards against
            contradiction rather than singling Holos out. A prediction Holos shares with rival
            theories cannot single it out, but a shared prediction it could fail is still worth more
            than one it cannot. Beneath both sits a standing bet, stated after them, on which the
            framework stakes itself outright.
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
            <h4 className="font-semibold text-black/90 mb-1">Method</h4>
            <p className="leading-relaxed">
              Combine study designs where subjects report only afterward, or not at all, with
              integration proxies such as the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Perturbational_Complexity_Index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perturbational Complexity Index
              </a>{" "}
              across wakefulness, anesthesia, sleep stages, and dissociative states, treating
              behavioral responsiveness and integration as separately varying factors rather than
              proxies for each other.
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
              The clean way to lose is a positive report from below the line: subjects who, on
              waking or recovering, give detailed reports of experience from periods when their
              integration was below threshold, by a measure and cutoff fixed in advance. A report is
              evidence that something was experienced, and it cannot be explained away as a failure
              of memory. If such reports turn up reliably, experience does not depend on integration
              the way Holos claims, and the framework&apos;s core structural claim fails. The
              reverse finding, high-integration states that yield no reports, counts against Holos
              only once report failure can be ruled out (see below).
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
              Positive reports are unaffected, and they carry the test both ways. Where integration
              is high and behavior is absent, subjects report rich experience: ketamine states, REM
              dreaming, complex seizures. Those confirm the prediction without leaning on silence.
              Where integration is low, a positive report is the losing case described above. Holos
              rests Test A on positive reports, and treats silence as suggestive pending a design
              that calibrates report failure against states with known encoding.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black/90 mb-1">
              The live challenge: dreaming in non-REM sleep
            </h4>
            <p className="leading-relaxed">
              The losing case is not hypothetical. Awakenings from non-REM sleep often produce dream
              reports, yet non-REM sleep is where global measures such as PCI fall well below the
              waking range. If vivid reports reliably follow periods whose measured integration sat
              below the cutoff, Test A is lost.
            </p>
            <p className="leading-relaxed">
              Holos has one principled reply, and it comes with a condition. The maximality
              condition allows an aperture smaller than the whole cortex, and{" "}
              <a href="https://doi.org/10.1038/nn.4545" target="_blank" rel="noopener noreferrer">
                work on the neural correlates of dreaming
              </a>{" "}
              finds that whether a dream is reported, in REM or non-REM sleep, tracks local activity
              in posterior cortex rather than the state of the brain as a whole. An aperture
              confined to that region could be integrated above threshold while the whole brain is
              not. But the reply is admissible only if the measure is local by commitment, stated
              before the data are in. A measure chosen afterward to rescue the prediction would turn
              the test into decoration, the failure the note on integration measures below warns
              against.
            </p>
          </div>

          <p className="leading-relaxed text-black/70 text-sm">
            <strong>What this can and cannot show:</strong> this tests a necessary structural
            condition, not presence itself. It cannot prove an integrated system <em>is</em> an
            observer, only whether integration is what experience depends on. Holos shares this
            prediction with other integration-based accounts of consciousness; it is a test Holos
            could fail, not a signature unique to Holos. It also doubles as the calibration engine
            for the framework&apos;s open problems: the same data that test the claim locate the
            threshold and cull the candidate measures (see{" "}
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
          The standing bet: consciousness changes nothing
        </h3>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            The commitment that observation is dynamically inert doubles as a bet. A conscious
            observer and a photon produce identical physics: put an integrated system in the
            measuring role in place of a particle, and Holos predicts no deviation whatsoever.
            Superpositions lose their quantum character for thermodynamic reasons, never because
            someone was home. This does not make experience idle. Under Holos, experience is the
            inside of the physics, so when the physics does everything, experience is doing its
            share, not nothing.
          </p>

          <p className="leading-relaxed">
            <strong>How Holos loses:</strong> if any experiment ever finds a consciousness-linked
            deviation from unitary quantum mechanics (a superposition that degrades when an
            integrated observer registers it, beyond what ordinary decoherence accounts for), the
            framework is falsified outright. Observation would be a force after all, and every page
            of Holos denies that it is one.
          </p>

          <p className="leading-relaxed text-black/70 text-sm">
            Some observer-centered frameworks quietly hope consciousness does something physical.
            Holos formally bets that it does not, and stakes itself on the bet. The bet is untested
            so far. A century of placing ever-larger systems into superposition has found no
            deviation of any kind, but by Holos&apos;s own threshold none of those systems was an
            observer: photons, molecules, and superconducting circuits all sit far below{" "}
            <MathInline>{"\\Phi_c"}</MathInline>. That record shows quantum mechanics holding at
            those scales; it does not yet reach the case the bet is about. The bet is also the one
            standard physics makes. What makes it worth stating is that Holos, unlike views that
            need consciousness to act, cannot hedge on it: the first experiment to put a genuine
            observer in the friend&apos;s role settles it.
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
            Neither counts as a test.
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
            These remain useful only as <strong>correlate probes</strong> feeding Test A, and only
            under two conditions: the integration measure and the threshold value are fixed in
            advance, and there is a stated way to lose: the observed transition tracks a
            non-integration variable (arousal, metabolic rate, raw activity) rather than
            integration. Without a pre-committed measure and a real failure condition, a transition
            &quot;somewhere&quot; is not evidence; it is decoration.
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
            if the Holos framework is correct.
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
                <h4 className="text-lg font-medium text-black/90">H5: Asymptotic Closure</h4>
                <p className="leading-relaxed">
                  This is not a destination or a goal. It is a limit concept: what complete,
                  contradiction-free closure would look like if integration continues to deepen
                  without breaking coherence.
                </p>
              </div>
            </div>

            <p className="leading-relaxed text-black/70 text-sm">
              This scale is intentionally “quiet.” If it is even partly right, the most advanced
              civilizations get harder to see in light, not easier. Thermodynamics guarantees their
              heat exists; it is their own compactness that keeps that heat above the cosmic
              background and, in principle, findable.
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
              One caveat is non-negotiable: visibility collapse applies to light, not heat. Anything
              that computes must shed waste heat, and the total cannot be canceled. Heat can be
              hidden in only one way: radiated barely above the cosmic background, which requires
              radiating surfaces so vast they contradict compactness itself. A civilization that
              stays compact and keeps computing stays warm above the background. Mature systems
              become silent, not cold; the one exception is systems that stop computing and sleep,
              and a sleeping civilization is indistinguishable from none at all.
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
              In this regime, you would look for persistent compactness, non-random organization,
              and mass concentrations that are dark in visible light but carry a faint infrared
              excess, detectable through{" "}
              <a
                href="https://en.wikipedia.org/wiki/Gravitational_lensing"
                target="_blank"
                rel="noopener noreferrer"
              >
                gravitational lensing
              </a>
              , precision mass mapping, and waste-heat surveys rather than radio searches. Infrared
              searches for exactly this signature already exist; the unavoidable search channel is
              warmth plus weight, not messages.
            </p>

            <p className="leading-relaxed text-black/70 text-sm">
              A Dark Node is <em>not</em> dark matter in the cosmologist&apos;s sense: cosmological
              dark matter predates stars, chemistry, and any possible builder, and outweighs all the
              ordinary matter a builder could use about five to one. Nodes are ordinary matter that
              has stopped shining. Holos does not claim any known anomaly is a node, only that if
              long-term integration leaves a footprint, it is gravitational and thermal, and this is
              where it would show up. Two limits bound the idea. The ordinary-matter budget and
              microlensing searches permit nodes only as a trace population, not a hidden census.
              And a node&apos;s observational profile (compact, dark, faintly warm) is shared with
              brown dwarfs, rogue planets, and cooled stellar remnants, so the Dark Node is a search
              channel, not a fingerprint.
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
                Not a star-enclosing megastructure: the Holocore concentrates energy density rather
                than surface area, converting mass into stable, controlled output through tightly
                regulated accretion, fusion, or rotational extraction.
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
            </div>

            {/* 2) Computronium Kernel */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-medium text-black/90">Computronium Kernel</h4>

              <p className="leading-relaxed">
                A maximally compact computational core built from computronium (matter arranged so
                that nearly every particle does useful computation) and optimized for coherent,
                long-horizon modeling rather than raw throughput.
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
                <strong>Note:</strong> The Vault may also <em>present</em> as a Dark Node if its
                stability strategy drives it to become cold, compact, and electromagnetically quiet.
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
