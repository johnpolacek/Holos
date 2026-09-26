export interface ComparisonRow {
  dimension: string;
  holos: string;
  others: string[];
}

interface ComparisonTableProps {
  holosLabel?: string;
  mark?: boolean;
  columns: string[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({
  holosLabel = "Holos",
  mark = true,
  columns,
  rows,
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black/30">
            <th className="text-left py-2 pr-6 font-semibold text-black/90">Dimension</th>
            <th className="text-left py-2 pr-6 font-semibold text-black/90">
              {holosLabel} {mark && <span className="text-lg font-normal">⊛</span>}
            </th>
            {columns.map((column, i) => (
              <th
                key={column}
                className={`text-left py-2 font-semibold text-black/90 ${i < columns.length - 1 ? "pr-6" : ""}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-black/80">
          {rows.map((row) => (
            <tr key={row.dimension} className="border-b border-black/10">
              <td className="py-3 pr-6 font-medium">{row.dimension}</td>
              <td className="py-3 pr-6">{row.holos}</td>
              {row.others.map((cell, i) => (
                <td key={columns[i]} className={`py-3 ${i < row.others.length - 1 ? "pr-6" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
