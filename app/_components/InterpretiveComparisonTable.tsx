export default function InterpretationComparisonTable() {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black/30">
            <th className="text-left py-2 pr-6 font-semibold text-black/90">Dimension</th>
            <th className="text-left py-2 pr-6 font-semibold text-black/90">
              Holos <span className="text-lg font-normal">⊛</span>
            </th>
            <th className="text-left py-2 pr-6 font-semibold text-black/90">Many-Worlds (MWI)</th>
            <th className="text-left py-2 pr-6 font-semibold text-black/90">Relational QM (RQM)</th>
            <th className="text-left py-2 font-semibold text-black/90">QBism</th>
          </tr>
        </thead>
        <tbody className="text-black/80">
          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">What is fundamental?</td>
            <td className="py-3 pr-6">Relational structure + ontological manifestation</td>
            <td className="py-3 pr-6">Universal wavefunction</td>
            <td className="py-3 pr-6">Relations between systems</td>
            <td className="py-3">Agent-centered beliefs</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Wavefunction status</td>
            <td className="py-3 pr-6">Represents Creation (valid possibilities)</td>
            <td className="py-3 pr-6">Literally real, never collapses</td>
            <td className="py-3 pr-6">Observer-relative</td>
            <td className="py-3">Subjective expectation</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Collapse?</td>
            <td className="py-3 pr-6">No physical collapse; ontological selection</td>
            <td className="py-3 pr-6">No collapse (branching)</td>
            <td className="py-3 pr-6">Relative collapse only</td>
            <td className="py-3">Belief update</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Role of observer</td>
            <td className="py-3 pr-6">Ontologically constitutive (Φ ≥ Φc)</td>
            <td className="py-3 pr-6">Passive branch inhabitant</td>
            <td className="py-3 pr-6">Defines relational facts</td>
            <td className="py-3">Central agent</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Reality without observers</td>
            <td className="py-3 pr-6">Structurally valid, ontologically unregistered</td>
            <td className="py-3 pr-6">Fully real</td>
            <td className="py-3 pr-6">Undefined</td>
            <td className="py-3">Undefined</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Multiple realities?</td>
            <td className="py-3 pr-6">Yes, cut-relative realized realities</td>
            <td className="py-3 pr-6">Yes, branching universes</td>
            <td className="py-3 pr-6">Yes, relative facts</td>
            <td className="py-3">No</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Observer cuts</td>
            <td className="py-3 pr-6">Create complete realities</td>
            <td className="py-3 pr-6">Irrelevant</td>
            <td className="py-3 pr-6">Change relations</td>
            <td className="py-3">Change beliefs</td>
          </tr>

          <tr className="border-b border-black/10">
            <td className="py-3 pr-6 font-medium">Ontology vs epistemology</td>
            <td className="py-3 pr-6 font-medium">Explicitly ontological</td>
            <td className="py-3 pr-6">Ontological</td>
            <td className="py-3 pr-6">Mixed / structural</td>
            <td className="py-3">Epistemic</td>
          </tr>

          <tr>
            <td className="py-3 pr-6 font-medium">Key prediction focus</td>
            <td className="py-3 pr-6">Φ thresholds, observer cuts, dark-sector structure</td>
            <td className="py-3 pr-6">Branch interference</td>
            <td className="py-3 pr-6">Relational consistency</td>
            <td className="py-3">Decision coherence</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
