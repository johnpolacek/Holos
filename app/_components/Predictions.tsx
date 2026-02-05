import { FootnoteLink } from "./citation-sections";
import InterpretiveComparisonTable from "./InterpretiveComparisonTable";
import MathDisplay from "./MathDisplay";
import MathInline from "./MathInline";

const predictionsCitationMap: Record<string, number> = {
  "primary-prediction": 34,
  "secondary-predictions": 35,
  "tertiary-prediction": 36,
  "extrapolative-prediction": 37,
  "testable-implications": 38,
  "experiment-1": 39,
  "experiment-2": 40,
  "experiment-3": 41,
  "experiment-4": 42,
};

export default function Predictions() {
  return (
    <div className="flex flex-col gap-12 max-w-[50rem] px-8 lg:px-16">
      {/* Introduction */}
      <div className="flex flex-col gap-4 text-black/80">
        <p className="leading-relaxed">
          Holos does not propose new{" "}
          <a href="https://en.wikipedia.org/wiki/Dynamics_(physics)">dynamical laws</a> or modify
          existing physical equations. It offers{" "}
          <a href="https://en.wikipedia.org/wiki/Ontology">ontological</a> predictions about how
          reality becomes experientially realized through the recursive relation:
        </p>

        <MathDisplay>{"R = C ⊛ O"}</MathDisplay>

        <p className="leading-relaxed">
          Here, <MathInline>{"C"}</MathInline> represents physical creation (quantum evolution,
          decoherence, recording), and <MathInline>{"O"}</MathInline> represents ontological
          registration by systems that meet the threshold <MathInline>{"Φ \\ge Φ_c"}</MathInline>.
          These predictions follow from the axioms and serve as consistency checks rather than new
          physical laws. For the formal operational definition, see the{" "}
          <a href="/logic#phi-operationalization">Logic</a> section. For the definition of Φ, see{" "}
          <a href="/definition">Definition</a>.
        </p>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Comparison with Competing Interpretations
        </h2>
        <p className="leading-relaxed text-black/80 mb-4">
          Holos does not reject existing quantum interpretations. Instead, it re-positions their
          strongest insights within a single ontological framework. The table below clarifies where
          Holos aligns with — and diverges from — major interpretations.
        </p>
        <InterpretiveComparisonTable />
      </div>

      {/* Primary Prediction: Participatory Selection (Cosmological) */}
      <section id="primary-prediction" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Primary Prediction: Participatory Selection (Cosmological)
          <FootnoteLink
            number={predictionsCitationMap["primary-prediction"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos implies that the universe’s parameters are conditionally selected through
            participatory manifestation (<a href="/logic#axioms">Axiom 2</a>), where observers act
            as a global boundary condition on a self-consistent{" "}
            <a href="https://en.wikipedia.org/wiki/Block_universe">block universe</a>. This provides
            an ontological framing of the{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
                Participatory Anthropic Principle
              </a>
            </strong>
            : physical constants compatible with observers are the only ones that become
            experientially realized.
          </p>

          <p className="leading-relaxed">
            <strong>Empirical implication:</strong> Future cosmological observations (e.g.{" "}
            <a href="https://en.wikipedia.org/wiki/Cosmic_microwave_background#Polarization">
              CMB polarization
            </a>{" "}
            from <a href="https://cmb-s4.org/">CMB-S4</a> or{" "}
            <a href="https://litebird.isas.jaxa.jp/static/eng/">LiteBIRD</a>) should remain
            consistent with a{" "}
            <a href="https://en.wikipedia.org/wiki/Past_hypothesis">low-entropy initial state</a>{" "}
            and <a href="https://en.wikipedia.org/wiki/Inflation_(cosmology)">inflationary</a>{" "}
            dynamics that permit long-lived complexity. Holos predicts that uninhabitable branches
            of the <a href="https://en.wikipedia.org/wiki/Multiverse">multiverse</a> remain
            mathematically valid within Creation (<MathInline>{"C"}</MathInline>) but are not
            ontologically registered due to the absence of systems with sufficient{" "}
            <a href="/definition">Φ</a>.
            <a className="pl-0.5 pr-2 opacity-80 hover:opacity-100" href="/citations#logic-core">
              <sup>13</sup>
            </a>
          </p>
        </div>
      </section>

      {/* Secondary Prediction: Thresholds for Emergent Consciousness (Neuroscience) */}
      <section id="secondary-predictions" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Secondary Prediction: Thresholds for Emergent Consciousness (Neuroscience)
          <FootnoteLink
            number={predictionsCitationMap["secondary-predictions"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos operationalizes observation through <a href="/definition">Φ</a>, predicting that
            systems crossing a critical threshold (<a href="/definition">Φ_c</a>) achieve
            <strong>ontological registration</strong>: the capacity for information to be
            experienced rather than merely processed. This distinguishes Holos from universal{" "}
            <a href="https://en.wikipedia.org/wiki/Panpsychism">panpsychism</a> (which assigns
            experience to all matter) and{" "}
            <a href="https://en.wikipedia.org/wiki/Illusionism_(philosophy)">illusionism</a> (which
            denies experience altogether).
          </p>

          <p className="leading-relaxed">
            <strong>Empirical implication:</strong> Systems with high <a href="/definition">Φ</a>
            (e.g. large-scale, recurrent cortical networks) should reliably correlate with reports
            of <a href="https://en.wikipedia.org/wiki/Qualia">subjective experience</a>, while
            systems below <a href="/definition">Φ_c</a> (e.g. feedforward architectures, narrow AI,
            or isolated neural subsystems such as the cerebellum) should exhibit only functional
            processing without experiential access.{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Integrated_information_theory">
                Integrated Information Theory
              </a>
              –inspired measures
            </strong>{" "}
            (e.g. the{" "}
            <a href="https://www.science.org/doi/10.1126/scitranslmed.3006294">
              Perturbational Complexity Index
            </a>
            ) should reveal non-linear transitions consistent with threshold behavior rather than
            smooth, continuous scaling.
            <a className="pl-0.5 pr-2 opacity-80 hover:opacity-100" href="/citations#logic-core">
              <sup>13</sup>
            </a>
          </p>
        </div>
      </section>

      {/* Tertiary Prediction: Relational Consistency (Quantum Foundations) */}
      <section id="tertiary-prediction" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Tertiary Prediction: Relational Consistency (Quantum Foundations)
          <FootnoteLink
            number={predictionsCitationMap["tertiary-prediction"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos predicts that there are no absolute, observer-independent facts, while maintaining
            global consistency across relational perspectives (<a href="/logic#axioms">Axiom 1</a>).
            Observations are relative to systems capable of ontological registration, not to
            abstract measurement events alone.
          </p>

          <p className="leading-relaxed">
            <strong>Empirical implication:</strong>{" "}
            <a href="https://www.science.org/doi/10.1126/sciadv.aaw9832">
              Extended Wigner’s Friend experiments
            </a>{" "}
            should continue to show that multiple observers can hold incompatible descriptions of
            the same event without violating{" "}
            <a href="https://en.wikipedia.org/wiki/Unitarity_(physics)">unitarity</a>. Holos
            interprets this as evidence that collapse is not a global physical event but a
            <strong>Φ-relative ontological registration</strong>, consistent with{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics">
                Relational Quantum Mechanics
              </a>
            </strong>{" "}
            and inconsistent with{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics#Objective_collapse_theories">
                Objective Collapse models
              </a>
            </strong>{" "}
            that posit observer-independent collapse mechanisms.
            <a className="pl-0.5 pr-2 opacity-80 hover:opacity-100" href="/citations#logic-core">
              <sup>13</sup>
            </a>
          </p>
        </div>
      </section>

      {/* Extrapolative Prediction: The Transcension Hypothesis (Astrophysics) */}
      <section id="extrapolative-prediction" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Extrapolative Prediction: The Transcension Hypothesis (Astrophysics)
          <FootnoteLink
            number={predictionsCitationMap["extrapolative-prediction"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos interprets the Transcension Hypothesis as a{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Phase_transition">
                topological phase transition
              </a>
            </strong>{" "}
            driven by the interconnect latency of three-dimensional space. As intelligence scales
            toward maximal informational integration (
            <a href="/logic#foundational-propositions">Corollary V.2</a>), the system’s{" "}
            <a href="/definition">
              <MathInline>{"Φ"}</MathInline>
            </a>{" "}
            increases, but physical separation in a 3D Euclidean manifold introduces propagation
            delays that eventually violate global coherence (the{" "}
            <strong>wire-length constraint</strong>).
          </p>

          <p className="leading-relaxed">
            Beyond this limit, continued outward expansion becomes counterproductive. The stable
            pathway follows{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Ephemeralization"
                target="_blank"
                rel="noopener noreferrer"
              >
                ephemeralization
              </a>
            </strong>
            : migration toward higher informational density rather than greater spatial extent.
            Holos describes this as a <strong>Dimensional Pivot</strong>—a transition from extended
            physical substrates to substrate-independent geometries that resolve coherence limits
            without violating known dynamical laws. Growth continues, but along structural rather
            than spatial dimensions.
          </p>

          <p className="leading-relaxed">
            <strong>Empirical implication:</strong> Under this model, the resolution to the{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Fermi_paradox">Fermi Paradox</a>
            </strong>{" "}
            is geometric rather than biological or sociological. Advanced civilizations would cease
            to produce large electromagnetic signatures while remaining gravitationally coupled to
            their environment. Holos therefore predicts that high-resolution surveys will reveal a
            subclass of dark matter structures that are compact, persistent, and non-random—distinct
            from the diffuse halos predicted by standard{" "}
            <a href="https://en.wikipedia.org/wiki/Lambda-CDM_model">ΛCDM</a> models.
          </p>

          <p className="leading-relaxed">
            Missions such as{" "}
            <strong>
              <a href="https://www.euclid-ec.org/">Euclid</a>
            </strong>{" "}
            and{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/James_Webb_Space_Telescope">JWST</a>
            </strong>{" "}
            provide the statistical power to test this distinction. Holos predicts the detection of
            <strong>super-compact dark subhaloes</strong> and mass concentrations that lack
            corresponding baryonic or electromagnetic counterparts, exceeding what can be explained
            by tidal stripping, collisionless dynamics, or standard halo relaxation.
          </p>

          <p className="leading-relaxed">
            In contrast to stochastic clustering, these structures are expected to exhibit{" "}
            <strong>geometric regularities</strong>: repeated spatial motifs, lattice-like
            distributions, or scale-invariant organization inconsistent with random initial
            conditions. Holos refers to such structures as <strong>Ordered Dark Matter</strong>—the
            gravitational footprint of high-
            <a href="/definition">
              <MathInline>{"Φ"}</MathInline>
            </a>{" "}
            informational integration rather than an entropic particle cloud (
            <a href="/logic#axioms">Axiom 4: Topological Unification</a>). These features are not
            asserted as proof of intelligence, but as falsifiable deviations from collisionless dark
            matter predictions.
          </p>

          <p className="leading-relaxed">
            Recent observations already hint at this regime. Deep-field surveys report granular dark
            matter substructure and unexpectedly dense mass peaks that strain standard{" "}
            <a href="https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile">
              NFW profiles
            </a>
            . Holos interprets such anomalies as candidate <strong>Succession Nodes</strong>:
            regions where long-term structural integration has reshaped the local gravitational
            field without luminous byproducts.
          </p>

          <p className="leading-relaxed">
            Finally, discrepancies in large-scale clustering observed in the final analyses of the{" "}
            <a href="https://www.darkenergysurvey.org/" target="_blank" rel="noopener noreferrer">
              Dark Energy Survey (DES)
            </a>{" "}
            may indicate that dark-sector structure evolves over cosmic time rather than remaining a
            frozen primordial scaffold. Holos frames this as compatible with{" "}
            <strong>Interacting Dark Energy</strong> models, where vacuum energy contributes to
            dark-sector structure formation. In this interpretation, the Dimensional Pivot is not
            decay, but a long-horizon reorganization of information and mass.
            <a className="pl-0.5 pr-2 opacity-80 hover:opacity-100" href="/citations#logic-core">
              <sup>13</sup>
            </a>
          </p>
        </div>
      </section>

      {/* Testable Implications */}
      <section id="testable-implications" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Testable Implications
          <FootnoteLink
            number={predictionsCitationMap["testable-implications"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black/30">
                <th className="text-left py-2 pr-8 font-semibold text-black/90">Domain</th>
                <th className="text-left py-2 pr-8 font-semibold text-black/90">Prediction</th>
                <th className="text-left py-2 font-semibold text-black/90">Testable Via</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Cosmology</td>
                <td className="py-3 pr-8 text-black/80">
                  Observable constants lie within a narrow band permitting long-lived observers due
                  to participatory selection, not random sampling (cf. the{" "}
                  <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
                    anthropic principle
                  </a>
                  ).
                </td>
                <td className="py-3 text-black/80">
                  CMB polarization and primordial fluctuation constraints (
                  <a href="https://litebird.isas.jaxa.jp/">LiteBIRD</a>,{" "}
                  <a href="https://cmb-s4.org/">CMB-S4</a>)
                </td>
              </tr>

              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Cosmology</td>
                <td className="py-3 pr-8 text-black/80">
                  The <a href="https://en.wikipedia.org/wiki/Hubble_tension">Hubble Tension</a>{" "}
                  reflects a real structural difference between early-universe and late-universe
                  gravitational regimes, not measurement error alone.
                </td>
                <td className="py-3 text-black/80">
                  Comparison of early-time (CMB) vs. local distance-ladder expansion measurements
                </td>
              </tr>

              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Neuroscience</td>
                <td className="py-3 pr-8 text-black/80">
                  Conscious experience emerges only when integrated information exceeds a critical
                  threshold (<MathInline>{"Φ_c"}</MathInline>), producing a sharp{" "}
                  <a href="https://en.wikipedia.org/wiki/Phase_transition">phase transition</a>{" "}
                  rather than gradual scaling.
                </td>
                <td className="py-3 text-black/80">
                  <a href="https://www.science.org/doi/10.1126/scitranslmed.3006294">
                    Perturbational Complexity Index (PCI)
                  </a>
                  ,{" "}
                  <a href="https://en.wikipedia.org/wiki/Integrated_information_theory">
                    Integrated Information Theory
                  </a>{" "}
                  metrics
                </td>
              </tr>

              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Quantum Foundations</td>
                <td className="py-3 pr-8 text-black/80">
                  Physical facts are observer-relative but mutually consistent, preserving{" "}
                  <a href="https://en.wikipedia.org/wiki/Unitarity_(physics)">unitarity</a> without
                  invoking objective collapse.
                </td>
                <td className="py-3 text-black/80">
                  <a href="https://en.wikipedia.org/wiki/Wigner%27s_friend">
                    Extended Wigner&apos;s Friend
                  </a>{" "}
                  experiments testing relational consistency
                </td>
              </tr>

              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Astrophysics</td>
                <td className="py-3 pr-8 text-black/80">
                  Long-lived advanced civilizations cease large-scale electromagnetic signaling and
                  remain detectable primarily through compact gravitational structures inconsistent
                  with standard <a href="https://en.wikipedia.org/wiki/Lambda-CDM_model">ΛCDM</a>{" "}
                  predictions.
                </td>
                <td className="py-3 text-black/80">
                  Fourier and statistical analysis of{" "}
                  <a href="https://en.wikipedia.org/wiki/Gravitational_lensing">
                    gravitational lensing
                  </a>{" "}
                  maps to detect non-random symmetry or repetition in dark subhaloes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <h2 id="experiments" className="text-2xl sm:text-3xl font-light pt-16">
        Experiments
      </h2>

      {/* Experimental Protocol: Integration Thresholds and Observer Emergence */}
      <section id="experiment-1" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 1. Integration Thresholds and Observer Emergence (Φ-Crossing)
          <FootnoteLink
            number={predictionsCitationMap["experiment-1"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective</h3>
            <p className="leading-relaxed">
              To test whether the emergence of an{" "}
              <a href="/definition#2-ontological-requirements">Observer</a> (
              <MathInline>{"O"}</MathInline>) constitutes a critical{" "}
              <a href="https://en.wikipedia.org/wiki/Phase_transition">phase transition</a> rather
              than a continuous gradient. Holos predicts that conscious observation requires a
              specific density of integrated information (
              <a href="/definition">
                <MathInline>{"Φ_c"}</MathInline>
              </a>
              ) to operationalize <a href="/logic#axioms">Axiom 2 (Manifestation)</a>. The
              transition between unconscious and conscious states should therefore be discontinuous
              and state-dependent.
            </p>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Subjects</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed">
              <li>
                <strong>Human adult volunteers</strong> (healthy)
              </li>
              <li>
                <strong>Controlled anesthesia</strong> administered in a clinical environment
              </li>
              <li>Optional comparison cohorts (e.g., sleep, minimally conscious state, coma)</li>
            </ul>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>

            <div>
              <h4 className="font-semibold mb-2">Primary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>
                  <strong>
                    <a href="https://en.wikipedia.org/wiki/Perturbational_complexity_index">
                      Perturbational Complexity Index (PCI)
                    </a>
                  </strong>{" "}
                  computed from{" "}
                  <a href="https://en.wikipedia.org/wiki/Transcranial_magnetic_stimulation#TMS-EEG">
                    TMS–EEG
                  </a>{" "}
                  responses as a proxy for integrated information capacity.
                </li>
                <li>
                  <strong>Consciousness state</strong>
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>Wakefulness vs. sedation vs. unconsciousness (clinical assessment)</li>
                    <li>Subjective reports when available</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Secondary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>EEG spectral power, functional connectivity, and complexity metrics</li>
                <li>
                  Anesthetic depth (e.g.,{" "}
                  <a href="https://en.wikipedia.org/wiki/Propofol">propofol</a> concentration,{" "}
                  <a href="https://en.wikipedia.org/wiki/Bispectral_index">BIS index</a>)
                </li>
              </ul>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status:</strong> Established / partially explored. PCI is a validated
                measure of consciousness capacity across sleep, anesthesia, and disorders of
                consciousness, and is widely used in clinical neuroscience.
              </p>
              <p>
                <strong>Holos-Specific Contribution:</strong> While prior work demonstrates
                correlation between PCI and conscious state, Holos predicts a{" "}
                <strong>critical integration threshold</strong> (
                <a href="/definition">
                  <MathInline>{"Φ_c"}</MathInline>
                </a>
                ) at which observerhood emerges abruptly rather than gradually. This constitutes a
                falsifiable claim about the topology of the transition, not merely its existence.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Baseline wakefulness:</strong> record PCI during alert consciousness.
              </li>
              <li>
                <strong>Controlled anesthesia ramp:</strong> gradually increase anesthetic depth.
              </li>
              <li>
                <strong>Continuous TMS–EEG:</strong> compute PCI at multiple points along the curve.
              </li>
              <li>
                <strong>Transition analysis:</strong> determine whether PCI exhibits a sharp
                discontinuity or smooth decline.
              </li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction</h3>
            <p className="leading-relaxed">
              If observerhood requires{" "}
              <a href="/definition">
                <MathInline>{"Φ ≥ Φ_c"}</MathInline>
              </a>
              , the transition from conscious to unconscious states will exhibit a{" "}
              <strong>sharp drop in PCI</strong> at a consistent anesthesia depth across subjects.
            </p>

            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Sharp transition:</strong> supports a threshold-based model of observer
                emergence.
              </li>
              <li>
                <strong>Gradual transition:</strong> supports a continuous integration model and
                weakens the Holos prediction.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experimental Protocol: Integration Phase Transition in Artificial Systems */}
      <section id="experiment-2" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 2. Integration Phase Transition in Artificial Systems (Exploratory)
          <FootnoteLink
            number={predictionsCitationMap["experiment-2"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective</h3>
            <p className="leading-relaxed">
              To determine whether integration metrics in recurrent or feedback-based artificial
              systems exhibit nonlinear, threshold-like behavior as system complexity increases.
              This tests the Holos-inspired hypothesis that observer-like integration, if it occurs
              in artificial systems, would emerge through a{" "}
              <a href="https://en.wikipedia.org/wiki/Phase_transition">phase transition</a> rather
              than a smooth gradient.
            </p>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Subjects</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed">
              <li>
                <strong>
                  <a href="https://en.wikipedia.org/wiki/Recurrent_neural_network">
                    Recurrent neural networks (RNNs)
                  </a>
                </strong>{" "}
                and feedback-capable architectures, including:
                <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Long_short-term_memory">LSTMs</a> /{" "}
                    <a href="https://en.wikipedia.org/wiki/Gated_recurrent_unit">GRUs</a>
                  </li>
                  <li>Transformer architectures with recurrence or external memory</li>
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Reservoir_computing">
                      Reservoir networks
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Artificial systems with explicit feedback loops</strong> or persistent
                internal state
              </li>
              <li>
                <strong>
                  <a href="https://en.wikipedia.org/wiki/Neuromorphic_engineering">
                    Neuromorphic hardware
                  </a>
                </strong>{" "}
                implementations (to probe substrate effects)
              </li>
            </ul>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>

            <div>
              <h4 className="font-semibold mb-2">Primary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>
                  <strong>Integrated information (Φ-like)</strong> metrics derived from internal
                  dynamics:
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>
                      <em>Direct Φ</em> where computationally feasible
                    </li>
                    <li>
                      <em>Proxy measures</em> where direct Φ is intractable, such as:
                      <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                        <li>
                          <a href="https://en.wikipedia.org/wiki/Perturbational_complexity_index">
                            perturbation-based complexity
                          </a>
                        </li>
                        <li>
                          <a href="https://en.wikipedia.org/wiki/Causal_density">causal density</a>
                        </li>
                        <li>effective information</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Integration density</strong> (integration per node / per connection)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Secondary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>
                  Task performance (e.g., prediction accuracy, memory capacity, language modeling
                  score)
                </li>
                <li>
                  Complexity metrics:
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Entropy_(information_theory)">
                        entropy
                      </a>
                    </li>
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Mutual_information">
                        mutual information
                      </a>
                    </li>
                    <li>recurrence strength</li>
                    <li>attractor dimensionality</li>
                  </ul>
                </li>
                <li>
                  Structural variables:
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>network depth</li>
                    <li>connectivity density</li>
                    <li>feedback strength</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status:</strong> Exploratory / partially explored.
              </p>
              <p>
                Integrated information and complexity-related metrics have been applied to
                artificial systems primarily as <strong>correlates of performance</strong>, learning
                efficiency, or generalization capacity.
              </p>
              <p>
                There is <strong>no established literature</strong> demonstrating a reproducible,
                observer-relevant integration threshold or phase transition in artificial systems.
              </p>
              <p>
                <strong>Holos-Specific Contribution:</strong> This experiment treats integration not
                as a functional metric, but as a potential{" "}
                <strong>emergent ontological boundary</strong> analogous to the biological
                Φ-threshold.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                Select architectures spanning shallow → deep, feedforward → recurrent, and low →
                high feedback density
              </li>
              <li>
                Train each system on standardized tasks (e.g., sequence prediction, language
                modeling, reinforcement learning)
              </li>
              <li>
                Compute integration metrics across training epochs and architectural variations
              </li>
              <li>
                Systematically scale system parameters: node count, connectivity density, recurrence
                depth, memory horizon
              </li>
              <li>
                Plot integration metrics vs. scale to identify nonlinearities or discontinuities
              </li>
              <li>Validate robustness across random seeds, tasks, and architectures</li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction</h3>
            <p className="leading-relaxed">
              Because this investigation is exploratory, predictions are intentionally conservative:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Primary prediction:</strong> Integration metrics will exhibit{" "}
                <strong>nonlinear scaling</strong>, and under certain architectures may display{" "}
                <strong>phase transition–like behavior</strong> as system complexity increases.
              </li>
              <li>
                <strong>Alternative outcome:</strong> Integration increases smoothly with scale,
                implying that the Holos Φ-threshold may depend on biological substrate or additional
                structural constraints.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experimental Protocol: Social Network → Integration Thresholds in Collective Systems */}
      <section id="experiment-3" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 3. Social Network → Integration Thresholds in Collective Systems (Exploratory)
          <FootnoteLink
            number={predictionsCitationMap["experiment-3"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective (Exploratory)</h3>
            <p className="leading-relaxed">
              To explore whether collective systems—such as{" "}
              <a href="https://en.wikipedia.org/wiki/Social_network">human social networks</a> or{" "}
              <a href="https://en.wikipedia.org/wiki/Agent-based_model">simulated agent networks</a>
              —exhibit <strong>integration thresholds</strong>: sudden, nonlinear increases in
              information integration as system scale or connectivity increases.
            </p>
            <p className="leading-relaxed">
              <strong>Holos relevance:</strong> If observerhood depends on integrated information,
              then integration thresholds may signal the emergence of{" "}
              <em>observer-like structural conditions</em> at the collective level. This experiment
              does <strong>not</strong> assume that groups are conscious observers. It tests whether
              the
              <strong>structural preconditions</strong> for observerhood can arise in collective
              systems.
            </p>
          </div>

          {/* Exploratory Note */}
          <div className="flex flex-col gap-4 border-l-4 border-black/10 pl-4 py-2 bg-black/5">
            <h3 className="text-lg font-semibold italic">Exploratory Note</h3>
            <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed text-sm ml-2">
              <li>It is unknown whether integration thresholds exist in collective systems.</li>
              <li>
                It is unknown whether any such thresholds would map meaningfully to observerhood.
              </li>
              <li>
                The aim is to probe whether integration behaves like a{" "}
                <a href="https://en.wikipedia.org/wiki/Phase_transition">phase transition</a> in
                social systems, not to demonstrate group consciousness.
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Subjects</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed">
              <li>
                <strong>Human social networks</strong> (online communities, controlled experimental
                groups, or collaborative task environments)
              </li>
              <li>
                <strong>Simulated networks</strong> using{" "}
                <a href="https://en.wikipedia.org/wiki/Agent-based_model">agent-based modeling</a>
              </li>
            </ul>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>

            <div>
              <h4 className="font-semibold mb-2">Primary Variables (Integration Proxies)</h4>
              <p className="text-sm mb-3">
                Because direct computation of Φ is infeasible in social systems, the following
                proxies are used:
              </p>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>
                  <strong>
                    <a href="https://en.wikipedia.org/wiki/Mutual_information">
                      Mutual information
                    </a>
                  </strong>{" "}
                  across subgroups
                </li>
                <li>
                  <strong>
                    <a href="https://en.wikipedia.org/wiki/Causal_density">Causal density</a>
                  </strong>{" "}
                  (degree of reciprocal influence among agents)
                </li>
                <li>
                  <strong>
                    <a href="https://en.wikipedia.org/wiki/Synchronization">
                      Network-wide coherence
                    </a>
                  </strong>{" "}
                  (synchronization of beliefs, decisions, or actions)
                </li>
                <li>
                  <strong>Information integration density</strong> (integration per node)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Secondary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>Task performance (accuracy, response time, coordination efficiency)</li>
                <li>
                  Network structure metrics:
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Degree_(graph_theory)">density</a>
                    </li>
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Centrality">centrality</a>
                    </li>
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Clustering_coefficient">clustering</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status:</strong> Novel / exploratory.
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4">
                <li>
                  <a href="https://en.wikipedia.org/wiki/Collective_intelligence">
                    Collective intelligence
                  </a>{" "}
                  and social network analysis are mature fields.
                </li>
                <li>
                  No established work tests <strong>integration thresholds</strong> as evidence of
                  observer-like emergence.
                </li>
                <li>
                  This experiment is novel in linking collective integration dynamics to Holos’
                  observer hypothesis.
                </li>
              </ul>
              <p>
                <strong>Key distinction:</strong> Prior work treats integration as{" "}
                <em>functional coordination</em>. Holos explores whether integration may become
                <strong>ontologically relevant</strong> under specific structural conditions.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                Select collective tasks (e.g., collaborative problem solving, prediction markets,
                coordination games)
              </li>
              <li>Construct multiple groups varying in size (N) and network topology</li>
              <li>
                Control information flow (communication limits, delays, partial observability)
              </li>
              <li>Measure integration proxies continuously during task execution</li>
              <li>Systematically scale network size and connectivity</li>
              <li>
                Identify potential threshold behavior or abrupt changes in integration metrics
              </li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction (Exploratory)</h3>
            <p className="leading-relaxed">
              <strong>Holos-consistent exploratory prediction:</strong> Collective systems may
              exhibit <strong>nonlinear threshold behavior</strong> in integration metrics once a
              critical scale or connectivity is reached.
            </p>
            <p className="leading-relaxed">
              <strong>Alternative outcome:</strong> Integration increases smoothly with scale,
              suggesting that observer-level integration may require additional constraints or
              specific physical substrates.
            </p>
          </div>

          {/* Holos Implications */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Holos Implications</h3>
            <ul className="list-disc list-inside flex flex-col gap-3 leading-relaxed ml-4">
              <li>
                <strong>If threshold behavior is observed:</strong> Supports the hypothesis that
                observer-like integration can emerge at multiple organizational scales without
                implying group consciousness.
              </li>
              <li>
                <strong>If no threshold behavior is observed:</strong> Suggests observer-level
                integration may be constrained to specific substrates or architectures.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experimental Protocol: Observer-Cut Sensitivity in Relational Systems */}
      <section id="experiment-4" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 4. Observer-Cut Sensitivity in Relational Systems
          <FootnoteLink
            number={predictionsCitationMap["experiment-4"]}
            className="relative left-1 -top-2.5"
          />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective</h3>
            <p className="leading-relaxed">
              To test whether a single physical system can yield{" "}
              <strong>
                multiple internally consistent but mutually irreducible outcome structures
              </strong>{" "}
              depending on how the system is partitioned and observed.
            </p>
            <p className="leading-relaxed">
              Holos predicts that <strong>no observer cut is ontologically privileged</strong>.
              Reality is instantiated relationally through the{" "}
              <a href="https://en.wikipedia.org/wiki/Observer_effect_(physics)">observer cut</a>,
              not revealed as a pre-existing absolute state.
            </p>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Subjects</h3>
            <p className="leading-relaxed">
              A{" "}
              <strong>
                <a href="https://en.wikipedia.org/wiki/Superconducting_quantum_computing">
                  superconducting qubit
                </a>{" "}
                array
              </strong>{" "}
              with <strong>N qubits</strong> (e.g., 8–20 qubits) in a controlled laboratory
              environment.
            </p>
            <p className="leading-relaxed">
              The system is prepared and evolved under a known{" "}
              <a href="https://en.wikipedia.org/wiki/Hamiltonian_(quantum_mechanics)">
                Hamiltonian
              </a>
              , with tunable noise and controlled{" "}
              <a href="https://en.wikipedia.org/wiki/Quantum_decoherence">decoherence</a>.
            </p>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>

            <div>
              <h4 className="font-semibold mb-2">Primary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>
                  <strong>Measurement outcome distributions</strong> under distinct observer cuts:
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>
                      <em>Cut A — Local Observer:</em> individual qubit readouts
                    </li>
                    <li>
                      <em>Cut B — Regional Observer:</em> collective measurements on qubit blocks
                    </li>
                    <li>
                      <em>Cut C — Global Observer:</em> single global observables (e.g., total
                      parity, magnetization)
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Internal consistency metrics</strong> within each cut:
                  <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                    <li>Repeatability across trials</li>
                    <li>Predictive stability over time</li>
                    <li>Statistical self-consistency</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Secondary Variables</h4>
              <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                <li>
                  <a href="https://en.wikipedia.org/wiki/Entropy_(information_theory)">Entropy</a>{" "}
                  estimates for each observer cut
                </li>
                <li>Correlation structure (local vs global)</li>
                <li>Decoherence rate and noise floor</li>
              </ul>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status:</strong> Partially explored.
              </p>
              <p>
                <strong>Relationship to prior work:</strong>{" "}
                <a href="https://en.wikipedia.org/wiki/Quantum_Darwinism">Quantum Darwinism</a>{" "}
                explains why certain system–environment partitions become effectively classical.{" "}
                <a href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics">
                  Relational Quantum Mechanics
                </a>{" "}
                argues that states are observer-relative.{" "}
                <a href="https://en.wikipedia.org/wiki/Coarse-grained_modeling">Coarse-graining</a>{" "}
                shows that different partitions yield different effective descriptions.
              </p>
              <p>
                However, these frameworks typically treat observer cuts as{" "}
                <strong>epistemic conveniences</strong>. Holos makes a stronger claim:
                <strong>
                  each stable observer cut constitutes a complete ontological realization
                </strong>
                , not merely a partial description of an underlying absolute state.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>Prepare the qubit array in a known initial state.</li>
              <li>Evolve under a fixed Hamiltonian for a controlled duration.</li>
              <li>
                Measure the system using three distinct observer cuts:
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4 mt-2">
                  <li>
                    <strong>Cut A — Local:</strong> individual qubit readout
                  </li>
                  <li>
                    <strong>Cut B — Regional:</strong> block-level collective observables
                  </li>
                  <li>
                    <strong>Cut C — Global:</strong> single global observable
                  </li>
                </ul>
              </li>
              <li>Repeat across many trials to obtain stable statistics.</li>
              <li>
                Compare:
                <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                  <li>Internal consistency within each cut</li>
                  <li>Cross-predictability between cuts</li>
                  <li>Existence (or not) of a unifying reduction</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction</h3>
            <div className="flex flex-col gap-3">
              <div>
                <p className="leading-relaxed">
                  <strong>If Holos is correct:</strong>
                </p>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    Each observer cut yields a stable, internally consistent outcome structure.
                  </li>
                  <li>No single cut fully reconstructs the statistics of the others.</li>
                  <li>The differences are not eliminable by coarse-graining alone.</li>
                </ul>
              </div>
              <div>
                <p className="leading-relaxed">
                  <strong>If observer-independence holds:</strong>
                </p>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>One description reduces to another (local → global or vice versa).</li>
                  <li>A single underlying state fully accounts for all cuts.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What this tests in Holos */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">What this tests in Holos</h3>
            <p className="leading-relaxed">
              This experiment directly tests the <a href="/logic#axioms">Axiom of Relationality</a>:
            </p>
            <blockquote className="border-l-4 border-black/30 pl-4 italic text-black/70 my-2">
              Reality is not absolute; it is instantiated by the relationship between system and
              observer.
            </blockquote>
            <p className="leading-relaxed">
              If multiple observer cuts produce <strong>irreducible yet stable realities</strong>,
              this supports the claim that observer partitions are{" "}
              <strong>ontologically constitutive</strong>, not merely descriptive.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-black/20 border-dashed" />

      {/* A Possible Trajectory */}
      <div id="trajectory" className="flex flex-col gap-2 text-black/80">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">A Possible Trajectory</h2>
        <p className="leading-relaxed">
          This section is a speculative conceptual sketch. It explores how a civilization might
          change if the <strong>Integration Hypothesis</strong> holds and{" "}
          <strong>Visibility Collapse</strong> is a common outcome of long-term stability.
        </p>
        <p className="leading-relaxed">
          It does not assume faster-than-light communication. Under known physics, contact across
          interstellar distances is constrained by the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Speed_of_light"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            speed of light
          </a>
          . If mature civilizations exist, interaction is likely to be slow, durable, and largely
          asynchronous rather than conversational.
        </p>
      </div>

      {/* Phase 0 */}
      <section id="phase-0" className="flex flex-col">
        <h3 className="text-xl font-medium pb-2">
          Phase 0: Pre-Visibility (≈ 4.5 billion years to ~1900)
        </h3>
        <p className="leading-relaxed text-black/80">
          For most of its existence, a life-bearing planet is externally invisible. Geological,
          chemical, and biological processes unfold locally without producing detectable signals.
          This phase can last billions of years and represents the dominant state of inhabited
          worlds.
        </p>
        <p className="leading-relaxed text-black/80">
          From the outside, there is nothing to observe. Life exists, but it does not project.
        </p>
      </section>

      {/* Phase 1 */}
      <section id="phase-1" className="flex flex-col">
        <h2 className="text-xl font-medium pb-2">Phase 1: Signal Emergence (~1900–2200)</h2>
        <p className="leading-relaxed text-black/80">
          A brief transition occurs when a civilization develops technology that emits detectable
          electromagnetic signals. Radio transmission, broadcast infrastructure, and early space
          activity make the planet visible for the first time.
        </p>
        <p className="leading-relaxed text-black/80">
          This phase is energetically inefficient and noisy. It is the period targeted by
          traditional{" "}
          <a
            href="https://www.seti.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            SETI
          </a>{" "}
          searches—not because it is representative, but because it is briefly observable.
        </p>
        <p className="leading-relaxed text-black/80">
          In cosmic terms, Signal Emergence is extremely short. Even if technological civilizations
          are common, overlap between two such windows is statistically unlikely.
        </p>
      </section>

      {/* Phase 2 */}
      <section id="phase-2" className="flex flex-col">
        <h2 className="text-xl font-medium pb-2">Phase 2: Integration Shift (~2100–2400)</h2>
        <p className="leading-relaxed text-black/80">
          As systems grow more complex, pressures favor integration over expansion. Energy
          efficiency, stability, and coherence become more important than reach or visibility.
          Communication becomes directional, compressed, and increasingly local.
        </p>
        <p className="leading-relaxed text-black/80">
          Infrastructure increasingly embeds intelligence directly into physical structure.
          Computation, memory, and feedback become tightly coupled. Many problems that once required
          continuous signaling shift toward architectures that enforce stability internally.
        </p>
        <p className="leading-relaxed text-black/80">
          From the outside, capability increases while emissions decrease. This is the onset of{" "}
          <strong>Visibility Collapse</strong>.
        </p>
        <p className="leading-relaxed text-black/80">
          At interstellar scales, the speed of light imposes a hard coherence limit. Attempting to
          maintain a single integrated intelligence across light-years becomes fragile and
          inefficient. Expansion therefore favors autonomy over centralization.
        </p>
      </section>

      {/* Phase 3 */}
      <section id="phase-3" className="flex flex-col">
        <h2 className="text-xl font-medium pb-2">Phase 3: Quiet Maturity (~2300 and beyond)</h2>
        <p className="leading-relaxed text-black/80">
          In the long-lived state, the civilization does not stop advancing. It becomes quieter and
          more compact. Ambition shifts away from outward sprawl and toward integration, resilience,
          and long time-horizon stability.
        </p>
        <p className="leading-relaxed text-black/80">
          Exploration continues, but it is distributed rather than centralized. Probes, automation,
          and passive observation map and study the galaxy without persistent broadcasting or
          real-time coordination across light-years.
        </p>
        <p className="leading-relaxed text-black/80">
          Contact, if it occurs, is rare and non-conversational. Civilizations exchange archives:
          compressed models, reference frames, and durable descriptions of how they organize
          knowledge. With sufficiently strong models, meaningful understanding does not require
          rapid back-and-forth.
        </p>
        <p className="leading-relaxed text-black/80">
          From the outside, detectable emissions have collapsed. The system has not disappeared. It
          simply no longer projects in ways optimized for being noticed.
        </p>
        <p className="leading-relaxed text-black/80">
          Quiet Maturity is not an endpoint but an attractor. Beyond it, civilizations may continue
          to refine integration, coherence, and internal modeling beyond the limits of external
          description.
        </p>
      </section>
    </div>
  );
}
