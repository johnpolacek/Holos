"use client";

interface OperatorAnatomyDiagramProps {
  isPDF?: boolean;
}

export default function OperatorAnatomyDiagram({ isPDF = false }: OperatorAnatomyDiagramProps) {
  const pdfDescription =
    "Operator Anatomy Diagram: The equation R = C ⊛ O is shown at the center. Leader lines connect to labels: C (Creation) - Generative Possibility / Power Set Operation, ⊛ (The Operator) - Recursive Relational Operator / Non-Associative, O (Observation) - Ontological Registration / Choice Function. A circular arrow indicates the recursive endofunctor loop. Key constraints listed: Structural not Dynamical, Information Preserving (Unitarity), Isomorphic at Ω.";

  return (
    <figure
      className="relative w-full mt-6 mb-4 aspect-video rounded-lg border border-neutral-200 overflow-hidden bg-white"
      role="img"
      aria-label="Operator Anatomy Diagram showing the structure of the Holos operator"
    >
      <figcaption className="sr-only">
        {isPDF ? pdfDescription : "Operator Anatomy Diagram"}
      </figcaption>
      <svg viewBox="0 0 640 360" className="w-full h-full" aria-hidden="true">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(30,30,30,0.5)" />
          </marker>
        </defs>

        {/* Endofunctor Loop - faint circle with arrow */}
        <circle
          cx="320"
          cy="200"
          r="100"
          fill="none"
          stroke="rgba(150,150,150,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 320 100 A 100 100 0 1 1 312 101"
          fill="none"
          stroke="rgba(100,100,100,0.35)"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* Core Equation - R = C ⊛ O — Times New Roman so ⊛ renders in PDF */}
        <g transform="translate(320, 200)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(20,20,30,1)"
            fontSize="24"
            fontFamily="'Times New Roman', Times, serif"
            fontWeight="bold"
          >
            R = C ⊛ O
          </text>
        </g>

        {/* Label for C (Creation) - Left side */}
        <g>
          <line
            x1="210"
            y1="200"
            x2="135"
            y2="200"
            stroke="rgba(80,80,80,0.35)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <circle cx="210" cy="200" r="2.5" fill="rgba(80,80,80,0.5)" />

          <text
            x="125"
            y="185"
            textAnchor="end"
            fill="rgba(30,30,30,0.85)"
            fontSize="12"
            fontFamily="sans-serif"
            fontWeight="bold"
          >
            C (Creation)
          </text>
          <text
            x="125"
            y="200"
            textAnchor="end"
            fill="rgba(60,60,60,0.6)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            Generative Possibility
          </text>
          <text
            x="125"
            y="213"
            textAnchor="end"
            fill="rgba(60,60,60,0.6)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            Power Set P(·)
          </text>
        </g>

        {/* Label for ⊛ (The Operator) - Bottom */}
        <g>
          <line
            x1="320"
            y1="245"
            x2="320"
            y2="310"
            stroke="rgba(80,80,80,0.35)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <circle cx="320" cy="245" r="2.5" fill="rgba(80,80,80,0.5)" />

          <text
            x="320"
            y="328"
            textAnchor="middle"
            fill="rgba(30,30,30,0.85)"
            fontSize="13"
            fontFamily="'Times New Roman', Times, serif"
            fontWeight="bold"
          >
            ⊛ (The Operator)
          </text>
          <text
            x="320"
            y="345"
            textAnchor="middle"
            fill="rgba(60,60,60,0.6)"
            fontSize="10"
            fontFamily="sans-serif"
          >
            Recursive Relational · Non-Associative
          </text>
        </g>

        {/* Label for O (Observation) - Right side */}
        <g>
          <line
            x1="430"
            y1="200"
            x2="505"
            y2="200"
            stroke="rgba(80,80,80,0.35)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <circle cx="430" cy="200" r="2.5" fill="rgba(80,80,80,0.5)" />

          <text
            x="515"
            y="185"
            textAnchor="start"
            fill="rgba(30,30,30,0.85)"
            fontSize="12"
            fontFamily="sans-serif"
            fontWeight="bold"
          >
            O (Observation)
          </text>
          <text
            x="515"
            y="200"
            textAnchor="start"
            fill="rgba(60,60,60,0.6)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            Ontological Registration
          </text>
          <text
            x="515"
            y="213"
            textAnchor="start"
            fill="rgba(60,60,60,0.6)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            Choice Function
          </text>
        </g>

        {/* Key Constraints - Top corners */}
        <text x="20" y="25" fill="rgba(60,60,60,0.5)" fontSize="9" fontFamily="monospace">
          Structural, not Dynamical
        </text>

        <text
          x="620"
          y="25"
          textAnchor="end"
          fill="rgba(60,60,60,0.5)"
          fontSize="9"
          fontFamily="monospace"
        >
          Information Preserving (Unitarity)
        </text>

        {/* Key Constraint - Top center (above loop) */}
        <text
          x="320"
          y="70"
          textAnchor="middle"
          fill="rgba(60,60,60,0.5)"
          fontSize="9"
          fontFamily="monospace"
        >
          Isomorphic at Ω
        </text>
      </svg>
    </figure>
  );
}
