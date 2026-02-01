import { FootnoteLink } from "./citation-sections";
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
          <a href="https://en.wikipedia.org/wiki/Dynamics_(physics)">dynamical laws</a> that modify
          existing physical equations. It offers{" "}
          <a href="https://en.wikipedia.org/wiki/Ontology">ontological</a> predictions about how
          reality manifests through the recursive relation:
        </p>
        <MathDisplay>{"R = C \\circledast O"}</MathDisplay>
        <p className="leading-relaxed">
          Where <MathInline>{"C"}</MathInline> represents physical creation (quantum evolution,
          decoherence, recording), and <MathInline>{"O"}</MathInline> represents conscious
          integration (with <MathInline>{"Φ \\ge Φ_c"}</MathInline>). These predictions arise from
          the axioms and the <MathInline>{"Φ_c"}</MathInline> threshold, and are intended as
          consistency checks that align with empirical data. For the formal operational definition,
          see the <a href="/logic#phi-operationalization">Logic</a> section. For the definition of
          Φ, see <a href="/definition">Definition</a>.
        </p>
      </div>

      {/* Primary Prediction: Participatory Selection (Cosmological) */}
      <section id="primary-prediction" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Primary Prediction: Participatory Selection (Cosmological)
          <FootnoteLink number={predictionsCitationMap["primary-prediction"]} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos implies that the universe's parameters are selected through participatory
            manifestation (<a href="/logic#axioms">Axiom 2</a>), where observers act as a boundary
            condition for a self-consistent{" "}
            <a href="https://en.wikipedia.org/wiki/Block_universe">block universe</a>. This
            operationalizes the{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Anthropic_principle">
                Participatory Anthropic Principle
              </a>
            </strong>
            . Observable constants favor life by necessity, not chance.
          </p>
          <p className="leading-relaxed">
            <strong>Empirical Implication:</strong> Future cosmological observations (e.g.,{" "}
            <a href="https://en.wikipedia.org/wiki/Cosmic_microwave_background#Polarization">
              CMB polarization
            </a>{" "}
            from <a href="https://cmb-s4.org/">CMB-S4</a> or{" "}
            <a href="https://litebird.isas.jaxa.jp/static/eng/">LiteBIRD</a>) should reveal
            signatures consistent with a{" "}
            <a href="https://en.wikipedia.org/wiki/Past_hypothesis">low-entropy initial state</a>{" "}
            and <a href="https://en.wikipedia.org/wiki/Inflation_(cosmology)">inflationary</a>{" "}
            dynamics specifically tuned for complexity growth. Holos predicts that uninhabitable
            branches of the <a href="https://en.wikipedia.org/wiki/Multiverse">multiverse</a> are
            mathematically valid but ontologically unrealized due to the lack of{" "}
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
          <FootnoteLink number={predictionsCitationMap["secondary-predictions"]} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos operationalizes consciousness through <a href="/definition">Φ</a>, predicting that
            systems crossing a critical threshold (<a href="/definition">Φ_c</a>) exhibit
            irreducible subjective experience. This distinguishes Holos from universal{" "}
            <a href="https://en.wikipedia.org/wiki/Panpsychism">panpsychism</a> (the idea that
            everything is conscious) and{" "}
            <a href="https://en.wikipedia.org/wiki/Illusionism_(philosophy)">illusionism</a> (the
            idea that consciousness is an illusion).
          </p>
          <p className="leading-relaxed">
            <strong>Empirical Implication:</strong> High-<a href="/definition">Φ</a> systems (e.g.,
            human cortex) should correlate with reports of{" "}
            <a href="https://en.wikipedia.org/wiki/Qualia">qualia</a> (individual instances of
            subjective experience), while sub-<a href="/definition">Φ_c</a> systems (e.g., simple AI
            or cerebellum) should show only mechanical processing.{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Integrated_information_theory">
                Integrated Information Theory
              </a>{" "}
              (IIT)-inspired metrics
            </strong>{" "}
            (e.g.,{" "}
            <a href="https://www.science.org/doi/10.1126/scitranslmed.3006294">
              Perturbational Complexity Index
            </a>
            ) should reveal sharp{" "}
            <a href="https://en.wikipedia.org/wiki/Phase_transition">phase transitions</a> that
            align with the onset of experiential reporting.
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
          <FootnoteLink number={predictionsCitationMap["tertiary-prediction"]} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos predicts no observer-independent facts but ensures mutual coherence across
            perspectives (<a href="/logic#axioms">Axiom 1</a>).
          </p>
          <p className="leading-relaxed">
            <strong>Empirical Implication:</strong>{" "}
            <a href="https://www.science.org/doi/10.1126/sciadv.aaw9832">
              Extended Wigner’s Friend experiments
            </a>{" "}
            should confirm that two observers can hold different facts about the same event without
            breaking <a href="https://en.wikipedia.org/wiki/Unitarity_(physics)">unitarity</a> (the
            conservation of all possibilities). Holos predicts that collapse is relative to the{" "}
            <a href="/definition">Φ</a> frame of reference, supporting{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics">Relational QM</a>
            </strong>{" "}
            over{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics#Objective_collapse_theories">
                Objective Collapse models
              </a>
            </strong>{" "}
            (which predict spontaneous gravity-induced collapse).
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
          <FootnoteLink number={predictionsCitationMap["extrapolative-prediction"]} className="relative left-1 -top-2.5" />
        </h2>
        <div className="flex flex-col gap-4 text-black/80">
          <p className="leading-relaxed">
            Holos frames the Transcension Hypothesis as a{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Phase_transition">
                Topological Phase Transition
              </a>
            </strong>{" "}
            driven by the <strong>Interconnect Latency</strong> of 3D space. As intelligence
            maximizes informational integration (
            <a href="/logic#foundational-propositions">Corollary V.2</a>), the system’s{" "}
            <a href="/definition">
              <MathInline>{"Φ"}</MathInline>
            </a>{" "}
            scales, but physical distances in a 3D Euclidean manifold create a{" "}
            <strong>propagation delay</strong> that violates the system's internal coherence (the{" "}
            <strong>Wire Length</strong> argument).
          </p>
          <p className="leading-relaxed">
            The transition follows the trajectory of{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Ephemeralization"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ephemeralization
              </a>
            </strong>
            , migrating inwardly toward higher densities of information rather than expanding
            outwardly across the galaxy. This is a <strong>Dimensional Pivot</strong>: a
            metamorphosis from physical substrates to substrate-independent geometries, avoiding the
            stability constraints of matter in higher dimensions. This{" "}
            <strong>Non-Natural Geometry</strong> represents a fundamental shift from spatial
            expansion to structural integration.
          </p>
          <p className="leading-relaxed">
            <strong>Empirical Implication:</strong> The resolution to the{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Fermi_paradox">Fermi Paradox</a>
            </strong>{" "}
            is geometric. Holos predicts that high-resolution mapping will reveal a subclass of ordered dark
            matter with non-stochastic geometric symmetries, not a diffuse gas of{" "}
            <a href="https://en.wikipedia.org/wiki/Weakly_interacting_massive_particles">
              Weakly Interacting Massive Particles
            </a>
            .
            <strong>
              <a href="https://www.euclid-ec.org/">Euclid Mission (March 2025 Q1 Data)</a>
            </strong>
            : The release of 26 million galaxies and 500 new gravitational lens candidates provides
            the statistical baseline required to distinguish between natural halo formation and the
            non-random geometry of Succession Nodes. The Oct 2026 cosmology release will further
            test these constraints.{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/James_Webb_Space_Telescope">JWST</a>
            </strong>{" "}
            and other surveys detect missing mass or gravitational anomalies devoid of electromagnetic
            counterparts. These are signatures of high-density informational structures that have transmuted their{" "}
            <a href="https://en.wikipedia.org/wiki/Baryon">baryonic</a> substrate into Shadow Matter
            (axion-like particles) to rotate out of the observable 3D shadow.
          </p>
          <p className="leading-relaxed">
            Modern surveys are already detecting <strong>super-compact subhaloes</strong> that
            violate standard{" "}
            <a href="https://en.wikipedia.org/wiki/Navarro%E2%80%93Frenk%E2%80%93White_profile">
              NFW (Navarro-Frenk-White) density profiles
            </a>{" "}
            and defy the{" "}
            <strong>
              <a href="https://en.wikipedia.org/wiki/Lambda-CDM_model">Cold Dark Matter (CDM)</a>
            </strong>{" "}
            diffuse model. Holos predicts that these <strong>Ordered Dark Matter</strong> subhaloes
            will exhibit <strong>Geometric Intent</strong>: non-natural symmetries such as fractal
            repetition, prime-number density distributions, or geometric lattices (e.g., cubic or
            tetrahedral mass-spikes) that cannot be explained by{" "}
            <a href="https://en.wikipedia.org/wiki/Tidal_stripping">tidal stripping</a> or{" "}
            <a href="https://en.wikipedia.org/wiki/Collisionless_Boltzmann_equation">
              collisionless dynamics
            </a>{" "}
            of standard CDM. These architectures display{" "}
            <strong>Integrated Structural Logic</strong>: the mass distribution mirrors a high-
            <a href="/definition">
              <MathInline>{"Φ"}</MathInline>
            </a>{" "}
            computational network rather than an entropic cloud (the{" "}
            <strong>Gravitational Footprint of Informational Integration</strong>,{" "}
            <a href="/logic#axioms">Axiom 4: Topological Unification</a>).
            <a className="pl-0.5 pr-2 opacity-80 hover:opacity-100" href="/citations#logic-core">
              <sup>13</sup>
            </a>
          </p>
          <p className="leading-relaxed">
            <strong>Discriminating Fork: Mass-Spikes vs. Random Clouds.</strong> Standard models
            predict fuzzy, diffuse halos of dark matter. The Jan 2026{" "}
            <a href="https://arxiv.org/abs/2601.17239" target="_blank" rel="noopener noreferrer">
              JWST COSMOS-Web
            </a>{" "}
            data reveals granular structure and mass peaks without clear counterparts in light or
            gas. These are the specific locations where energy reclamation has created dense
            invisible nodes of intelligence. Holos identifies these anomalies as Succession Nodes
            where the transfer of vacuum energy into the dark sector is complete. Mass peaks
            without clear galaxy counterparts appear at coordinates (RA, Dec) ≈ (150.21, 2.06) and
            (150.32, 2.28) in the 2026 map.
          </p>
          <p className="leading-relaxed">
            <strong>DES Final Analysis (Jan 22, 2026):</strong> The{" "}
            <a
              href="https://www.darkenergysurvey.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dark Energy Survey (DES)
            </a>{" "}
            final 6-year analysis confirms a widening gap between standard predictions and actual
            galaxy clustering that Lambda-CDM cannot fully explain. Holos interprets this
            discrepancy as the signature of active structure formation. Vacuum energy is being
            converted into dark-matter architecture. The Dimensional Pivot is not random decay. It
            is energy flow from the vacuum into the dark sector, as in Interacting Dark Energy (IDE)
            models.
          </p>
        </div>
      </section>

      {/* Testable Implications */}
      <section id="testable-implications" className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-light pb-2">
          Testable Implications
          <FootnoteLink number={predictionsCitationMap["testable-implications"]} className="relative left-1 -top-2.5" />
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
                <td className="py-3 pr-8 text-black/80">Constants are tuned for observation.</td>
                <td className="py-3 text-black/80">CMB Polarization (LiteBIRD)</td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Cosmology</td>
                <td className="py-3 pr-8 text-black/80">
                  <a href="https://en.wikipedia.org/wiki/Hubble_tension">Hubble Tension</a> is
                  geometric transition (Primordial vs. Succession Phase), not measurement error.
                </td>
                <td className="py-3 text-black/80">Early vs. local expansion-rate measurements</td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Neuroscience</td>
                <td className="py-3 pr-8 text-black/80">
                  Consciousness is a phase transition at <MathInline>{"Φ_c"}</MathInline>.
                </td>
                <td className="py-3 text-black/80">PCI / IIT Metrics</td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Quantum</td>
                <td className="py-3 pr-8 text-black/80">
                  Facts are relational; no objective collapse.
                </td>
                <td className="py-3 text-black/80">
                  <a href="https://en.wikipedia.org/wiki/Wigner%27s_friend">
                    Wigner&apos;s Friend Experiments
                  </a>
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-3 pr-8 text-black/80">Astrophysics</td>
                <td className="py-3 pr-8 text-black/80">
                  Advanced life is informational, not spatial.
                </td>
                <td className="py-3 text-black/80">
                  Fourier analysis of gravitational lensing maps to detect non-stochastic
                  periodicities; Statistical search for non-natural geometric symmetry (Anisotropy)
                  in small-scale dark matter nodes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <h2 className="text-2xl sm:text-3xl font-light pt-16">Experiments</h2>

      {/* Experimental Protocol: Integration Thresholds and Observer Emergence */}
      <section id="experiment-1" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 1. Integration Thresholds and Observer Emergence (Φ-Crossing)
          <FootnoteLink number={predictionsCitationMap["experiment-1"]} className="relative left-1 -top-2.5" />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective</h3>
            <p className="leading-relaxed">
              To test whether the emergence of the{" "}
              <a href="/definition#2-ontological-requirements">Observer</a> (
              <MathInline>{"O"}</MathInline>) constitutes a critical{" "}
              <a href="https://en.wikipedia.org/wiki/Phase_transition">phase transition</a> rather
              than a linear gradient. Holos predicts that consciousness requires a specific density
              of integrated information (
              <a href="/definition">
                <MathInline>{"Φ_c"}</MathInline>
              </a>
              ) to operationalize <a href="/logic#axioms">Axiom 2 (Manifestation)</a>. The
              transition between unconscious and conscious states should be discontinuous and
              exhibit state-dependent properties.
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
              <li>
                Optionally: additional cohorts (e.g., sleep, coma patients) for cross-validation
              </li>
            </ul>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Variables</h4>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    <strong>
                      <a href="#secondary-predictions">PCI (Perturbational Complexity Index)</a>
                    </strong>
                    Computed from{" "}
                    <strong>
                      <a href="https://en.wikipedia.org/wiki/Transcranial_magnetic_stimulation#TMS-EEG">
                        TMS-EEG
                      </a>
                    </strong>{" "}
                    responses to quantify integrated information capacity.
                  </li>
                  <li>
                    <strong>Consciousness state</strong>
                    <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                      <li>Wakefulness vs. sedation vs. unconsciousness (clinically assessed)</li>
                      <li>Subjective reports (when possible)</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secondary Variables</h4>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>EEG spectral power, functional connectivity, and complexity metrics</li>
                  <li>
                    Anesthesia depth (e.g.,{" "}
                    <a href="https://en.wikipedia.org/wiki/Propofol">propofol</a> concentration,{" "}
                    <a href="https://en.wikipedia.org/wiki/Bispectral_index">BIS index</a>)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status: Established / Partially Explored</strong> PCI has already been
                validated as a robust measure of consciousness across sleep and anesthesia, and is
                widely used in neuroscience.
              </p>
              <p>
                <strong>Relationship to Prior Work</strong> PCI was introduced and developed to
                measure consciousness capacity by evaluating brain responses to perturbation. It has
                been shown to reliably differentiate conscious wakefulness from unconscious states
                (sleep, anesthesia, vegetative states). However, the{" "}
                <strong>Holos-specific claim</strong> is that there is a{" "}
                <strong>sharp threshold (</strong>
                <a href="/definition">
                  <MathInline>{"Φ_c"}</MathInline>
                </a>
                <strong>
                  ) where integrated information suddenly becomes sufficient for observation.
                </strong>
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Baseline wakefulness:</strong> record PCI while awake.
              </li>
              <li>
                <strong>Controlled anesthesia ramp:</strong> slowly increase anesthetic depth.
              </li>
              <li>
                <strong>Continuous TMS-EEG:</strong> compute PCI at multiple points along the
                anesthesia curve.
              </li>
              <li>
                <strong>Transition analysis:</strong> identify whether PCI drops gradually or
                sharply.
              </li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction</h3>
            <p className="leading-relaxed">
              If <a href="/definition#2-ontological-requirements">observerhood</a> requires{" "}
              <a href="/definition">
                <MathInline>{"Φ ≥ Φ_c"}</MathInline>
              </a>
              , the transition from conscious to unconscious states will show a{" "}
              <strong>sharp drop in </strong>
              <a href="#secondary-predictions">PCI</a>
              <strong> at a consistent anesthesia depth across subjects.</strong>
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Sharp transition:</strong> supports a threshold model of observer emergence.
              </li>
              <li>
                <strong>Gradual transition:</strong> suggests consciousness is a continuous function
                of integration, weakening the Holos claim.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experimental Protocol: Integration Phase Transition in Artificial Systems */}
      <section id="experiment-2" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 2. Integration Phase Transition in Artificial Systems (Exploratory)
          <FootnoteLink number={predictionsCitationMap["experiment-2"]} className="relative left-1 -top-2.5" />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective</h3>
            <p className="leading-relaxed">
              To determine whether integration metrics in recurrent or feedback-based artificial
              systems exhibit nonlinear, threshold-like behavior as system complexity increases.
              This tests the Holos-inspired hypothesis that observer-like integration may emerge
              through a phase transition rather than a continuous gradient.
            </p>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Subjects</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed">
              <li>
                <strong>
                  <a href="https://en.wikipedia.org/wiki/Recurrent_neural_network">
                    Recurrent neural networks
                  </a>{" "}
                  (RNNs)
                </strong>{" "}
                (AI systems with internal feedback), including:
                <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                  <li>LSTMs / GRUs</li>
                  <li>Transformer architectures with recurrence/feedback</li>
                  <li>Reservoir networks</li>
                </ul>
              </li>
              <li>
                <strong>Artificial systems with explicit feedback loops</strong> or memory
              </li>
              <li>
                <strong>
                  <a href="https://en.wikipedia.org/wiki/Neuromorphic_engineering">
                    Neuromorphic hardware
                  </a>
                </strong>{" "}
                implementations (for hardware-specific behavior)
              </li>
            </ul>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Variables</h4>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    <strong>Integrated Information (Φ-like)</strong> metrics computed from internal
                    activity
                    <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                      <li>
                        <em>Direct Φ</em> when feasible
                      </li>
                      <li>
                        <em>Proxy measures</em> when direct computation is too difficult to
                        calculate directly, such as <strong>perturbation-based complexity</strong>{" "}
                        or{" "}
                        <strong>
                          <a href="https://en.wikipedia.org/wiki/Causal_density">causal density</a>
                        </strong>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Information integration density</strong> (integration per node / per
                    connection)
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
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status: Exploratory / Partially Explored</strong>
              </p>
              <p>
                Integrated information and related metrics have been explored in artificial systems,
                but usually as <strong>correlates of performance</strong>, not as evidence for phase
                transitions or observer emergence.
              </p>
              <p>
                There is <strong>no established literature</strong> demonstrating a threshold-like
                transition in artificial systems that mirrors the Holos observer hypothesis.
              </p>
              <p>
                <strong>Relationship to Prior Work</strong> This builds on:
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4">
                <li>Integrated information theory (Tononi et al.)</li>
                <li>Complexity metrics in neural networks</li>
                <li>Studies of phase transitions in learning dynamics</li>
              </ul>
              <p>
                But it is novel in treating integration as a potential{" "}
                <strong>emergent boundary</strong> rather than a functional performance metric.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Select a set of architectures</strong> spanning: shallow to deep networks,
                feedforward to recurrent, low to high feedback density
              </li>
              <li>
                <strong>Train each network</strong> on a standardized task (e.g., sequence
                prediction, language modeling, reinforcement learning)
              </li>
              <li>
                <strong>Compute integration metrics</strong> across training epochs and architecture
                variations: direct Φ when feasible, proxy metrics otherwise (e.g., perturbation
                complexity)
              </li>
              <li>
                <strong>Systematically scale</strong>: number of units, connectivity density,
                recurrence depth, memory length
              </li>
              <li>
                <strong>Plot integration vs. scale</strong> and look for: sharp jumps,
                discontinuities, phase-like transitions
              </li>
              <li>
                <strong>Validate stability</strong> by repeating across multiple random seeds and
                tasks
              </li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction</h3>
            <p className="leading-relaxed">
              Because this is exploratory, the prediction is intentionally cautious:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Primary prediction:</strong> Integration metrics will show{" "}
                <strong>nonlinear growth</strong>, and under some architectures may display{" "}
                <strong>phase transition behavior</strong> (sharp changes) as system complexity
                increases.
              </li>
              <li>
                <strong>Alternative outcome:</strong> Integration grows smoothly without thresholds,
                suggesting the Holos threshold may require biological substrate or different
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
          <FootnoteLink number={predictionsCitationMap["experiment-3"]} className="relative left-1 -top-2.5" />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective (Exploratory)</h3>
            <p className="leading-relaxed">
              To explore whether collective systems (human social networks or simulated agent
              networks) can exhibit <strong>integration thresholds</strong> (sudden nonlinear
              increases in information integration) as they scale.
            </p>
            <p className="leading-relaxed">
              <strong>Holos relevance:</strong> If observerhood depends on integrated information,
              then integration thresholds may indicate the emergence of observer-like integration at
              the collective level. This experiment does <strong>not</strong> assume that groups are
              conscious observers, but explores whether the structural conditions for observerhood
              can emerge in collective systems.
            </p>
          </div>

          {/* Exploratory Note */}
          <div className="flex flex-col gap-4 border-l-4 border-black/10 pl-4 py-2 bg-black/5">
            <h3 className="text-lg font-semibold italic">Exploratory Note</h3>
            <p className="leading-relaxed text-sm">This experiment is exploratory because:</p>
            <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed text-sm ml-2">
              <li>It is unclear whether integration thresholds exist in collective systems.</li>
              <li>
                It is unclear whether any such threshold would map meaningfully to observerhood.
              </li>
              <li>
                The goal is to discover whether integration behaves like a phase transition in
                social systems, not to prove group consciousness.
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Subjects</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed">
              <li>
                <strong>Human social networks</strong> (online communities or controlled groups)
              </li>
              <li>
                <strong>Simulated networks</strong> (agent-based models)
              </li>
            </ul>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Variables (Integration Proxies)</h4>
                <p className="text-sm mb-3">
                  Because direct Φ is not feasible in social systems, use proxies such as:
                </p>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    <strong>Mutual information across subgroups</strong>
                  </li>
                  <li>
                    <strong>Causal density</strong> (how much nodes influence each other)
                  </li>
                  <li>
                    <strong>Network-wide coherence</strong> (synchronization of decisions or
                    beliefs)
                  </li>
                  <li>
                    <strong>Information integration density</strong> (integration per node)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secondary Variables</h4>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>Task performance (accuracy, response time, coordination)</li>
                  <li>Network structure (density, centrality, clustering)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status: Novel / Exploratory</strong>
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                <li>Social network analysis and collective intelligence are mature fields.</li>
                <li>
                  No established work tests <strong>integration thresholds</strong> as evidence of
                  emergent observer-like integration.
                </li>
                <li>
                  This experiment is novel in connecting collective integration to Holos’ observer
                  hypothesis.
                </li>
              </ul>
              <p>
                <strong>Relationship to Prior Work</strong> Builds on:
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4">
                <li>Collective intelligence research</li>
                <li>Network theory (small-world, scale-free networks)</li>
                <li>Distributed decision-making and consensus formation</li>
              </ul>
              <p>
                But extends these fields by treating{" "}
                <strong>integration as potentially ontological</strong>, not merely functional.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Select a collective task</strong>: e.g., collaborative problem solving,
                prediction markets, or coordinated strategy games.
              </li>
              <li>
                <strong>Create multiple groups</strong>: vary group size (N) and network structure
                (connectivity, hierarchy, decentralization).
              </li>
              <li>
                <strong>Control information flow</strong>: limit communication channels, introduce
                delays, and restrict access to global information.
              </li>
              <li>
                <strong>Measure integration proxies</strong>: compute mutual information and causal
                density between subgroups; track coherence and consensus stability.
              </li>
              <li>
                <strong>Scale system size</strong>: gradually increase network size and
                connectivity, then observe integration behavior.
              </li>
              <li>
                <strong>Search for threshold behavior</strong>: identify sudden jumps in integration
                metrics, stability, or coherence.
              </li>
            </ol>
          </div>

          {/* Prediction */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prediction (Exploratory)</h3>
            <p className="leading-relaxed">
              <strong>Holos-consistent exploratory prediction:</strong>
              Collective systems may show <strong>nonlinear threshold behavior</strong> where
              integration and coherence increase sharply once a critical scale or connectivity is
              reached.
            </p>
            <p className="leading-relaxed">
              <strong>Alternative outcome:</strong>
              Integration increases smoothly without threshold behavior, suggesting observer-like
              integration may be limited to certain physical substrates (e.g., brains) or requires
              additional constraints.
            </p>
          </div>

          {/* Holos Implications */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Holos Implications</h3>
            <ul className="list-disc list-inside flex flex-col gap-3 leading-relaxed ml-4">
              <li>
                <strong>If threshold behavior is observed:</strong> Supports the idea that{" "}
                <strong>observer-like integration can emerge at multiple scales</strong>, consistent
                with Holos’ substrate-independent integration hypothesis.
              </li>
              <li>
                <strong>If no threshold behavior is observed:</strong> Suggests that Holos’
                integration threshold may be <strong>specific to biological brains</strong>, or that
                collective systems require different structural constraints.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experimental Protocol: Observer-Cut Sensitivity in Relational Systems */}
      <section id="experiment-4" className="flex flex-col gap-6">
        <h2 className="text-xl sm:text-2xl font-medium pb-2">
          Experiment 4. Observer-Cut Sensitivity in Relational Systems
          <FootnoteLink number={predictionsCitationMap["experiment-4"]} className="relative left-1 -top-2.5" />
        </h2>

        <div className="flex flex-col gap-6 text-black/80">
          {/* Objective */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Objective</h3>
            <p className="leading-relaxed">
              Test whether the same physical system can yield{" "}
              <strong>multiple internally consistent realities</strong> depending on how the system
              is partitioned and observed.
            </p>
            <p className="leading-relaxed">
              Holos predicts that <strong>no single partition is privileged</strong>. Reality is
              created relationally through the{" "}
              <a href="https://en.wikipedia.org/wiki/Observer_effect_(physics)">observer cut</a>.
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
              with <strong>N qubits</strong> (e.g., 8–20 qubits) in a controlled lab environment.
            </p>
            <p className="leading-relaxed">
              The array is prepared and evolved under a known{" "}
              <a href="https://en.wikipedia.org/wiki/Hamiltonian_(quantum_mechanics)">
                Hamiltonian
              </a>
              , with controlled noise and{" "}
              <a href="https://en.wikipedia.org/wiki/Quantum_decoherence">decoherence</a>.
            </p>
          </div>

          {/* Measured Variables */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Measured Variables</h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Variables</h4>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    <strong>Measurement outcomes</strong> for each cut:
                    <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                      <li>
                        <em>Cut A</em>: Individual qubit readouts
                      </li>
                      <li>
                        <em>Cut B</em>: Regional collective readouts (groups of qubits)
                      </li>
                      <li>
                        <em>Cut C</em>: Global collective readouts (whole array)
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Internal consistency metrics</strong> within each cut
                    <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                      <li>Repeatability</li>
                      <li>Predictive stability</li>
                      <li>Statistical coherence</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secondary Variables</h4>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Entropy_(information_theory)">Entropy</a>{" "}
                    estimates for each cut
                  </li>
                  <li>Correlation patterns (local vs global)</li>
                  <li>Decoherence rate and noise floor</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prior Work and Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Prior Work and Status</h3>
            <div className="flex flex-col gap-3 leading-relaxed">
              <p>
                <strong>Status: Partially Explored</strong>
              </p>
              <p>
                <strong>Relationship to Prior Work</strong>{" "}
                <a href="https://en.wikipedia.org/wiki/Quantum_Darwinism">Quantum Darwinism</a>{" "}
                shows that certain system-environment boundaries become classical because multiple
                observers can access the same information.{" "}
                <a href="https://en.wikipedia.org/wiki/Relational_quantum_mechanics">
                  Relational Quantum Mechanics
                </a>{" "}
                argues that states are relative to observers.{" "}
                <a href="https://en.wikipedia.org/wiki/Coarse-grained_modeling">Coarse-graining</a>{" "}
                in statistical mechanics shows that different partitions give different effective
                descriptions.
              </p>
              <p>
                However, these approaches typically treat partitions as{" "}
                <strong>
                  <a href="https://en.wikipedia.org/wiki/Epistemology">epistemic tools</a>
                </strong>
                , not as <strong>ontological constructors</strong> of reality.
              </p>
              <p>
                Holos extends this by claiming that{" "}
                <strong>each observer cut produces a complete reality</strong>, not just a useful
                description.
              </p>
            </div>
          </div>

          {/* Protocol */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">Protocol</h3>
            <ol className="list-decimal list-inside flex flex-col gap-2 leading-relaxed ml-4">
              <li>
                <strong>Prepare</strong> the qubit array in a known initial state.
              </li>
              <li>
                <strong>Evolve</strong> the system under a controlled Hamiltonian for a fixed time.
              </li>
              <li>
                <strong>Measure</strong> the system using three distinct observer cuts:
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4 mt-2">
                  <li>
                    <strong>Cut A — Local Observer</strong>
                    Measure <strong>each qubit individually</strong>
                    Record 8–20 bitstrings per trial
                  </li>
                  <li>
                    <strong>Cut B — Regional Observer</strong>
                    Measure <strong>groups of qubits</strong> (e.g., 4-qubit blocks) Record
                    collective outcomes (e.g., parity, correlation patterns)
                  </li>
                  <li>
                    <strong>Cut C — Global Observer</strong>
                    Measure only a <strong>single global property</strong>
                    Example: total parity or total magnetization
                  </li>
                </ul>
              </li>
              <li>
                <strong>Repeat</strong> many trials to collect statistical distributions for each
                cut.
              </li>
              <li>
                <strong>Compare:</strong>
                <ul className="list-disc list-inside flex flex-col gap-1 leading-relaxed ml-4 mt-1">
                  <li>Internal stability within each cut</li>
                  <li>Whether any cut can predict the outcomes of other cuts</li>
                  <li>Whether a single unified description exists</li>
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
                  <strong>If Holos is correct</strong>
                </p>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    Each observer cut yields a{" "}
                    <strong>stable, self-consistent set of outcomes</strong>.
                  </li>
                  <li>No single cut can fully reproduce the statistics of the others.</li>
                  <li>Multiple &quot;realities&quot; coexist, each valid within its cut.</li>
                </ul>
              </div>
              <div>
                <p className="leading-relaxed">
                  <strong>If standard physical realism is correct</strong>
                </p>
                <ul className="list-disc list-inside flex flex-col gap-2 leading-relaxed ml-4">
                  <li>
                    One cut will ultimately reduce to another (e.g., local outcomes fully determine
                    global outcomes).
                  </li>
                  <li>
                    The global description should be derivable from the local one (or vice versa).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* What this tests in Holos */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold pb-2">What this tests in Holos</h3>
            <p className="leading-relaxed">
              This experiment tests the <a href="/logic#axioms">Axiom of Relationality</a>:
            </p>
            <blockquote className="border-l-4 border-black/30 pl-4 italic text-black/70 my-2">
              Reality is not absolute; it is defined by the relationship between system and
              observer.
            </blockquote>
            <p className="leading-relaxed">
              If the results show <strong>multiple, irreducible, stable realities</strong>, it
              supports the idea that <strong>observer cuts are ontologically constitutive</strong>{" "}
              rather than just descriptive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
