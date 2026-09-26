"use client";

interface AxiomDiagramProps {
  axiom: "relationality" | "manifestation" | "conservation" | "unification" | "interface";
  isPDF?: boolean;
}

export default function AxiomDiagram({ axiom, isPDF = false }: AxiomDiagramProps) {
  if (isPDF) {
    const descriptions: Record<string, string> = {
      relationality: "Reality is relationships, not isolated objects.",
      manifestation: "Observation makes the spacetime structure lived.",
      conservation: "Information is conserved across all transformations.",
      unification: "Infinities resolve into finite structures in higher-dimensional descriptions.",
      interface: "Experience and activity are two sides of one event.",
    };
    return (
      <div
        style={{
          width: "100%",
          marginTop: "1em",
          marginBottom: "1em",
          padding: "1em",
          background: "#fafafa",
          borderRadius: "6px",
          textAlign: "center",
          fontSize: "0.85em",
          color: "rgba(0,0,0,0.6)",
          fontStyle: "italic",
        }}
      >
        {descriptions[axiom]}
      </div>
    );
  }

  const diagrams: Record<string, React.ReactNode> = {
    relationality: (
      <svg viewBox="0 0 400 100" className="w-full h-full" aria-hidden="true">
        {/* Left: Isolated objects (crossed out) */}
        <g transform="translate(80, 48)">
          <circle
            cx="0"
            cy="-14"
            r="10"
            fill="none"
            stroke="rgba(150,150,150,0.5)"
            strokeWidth="1.5"
          />
          <circle
            cx="22"
            cy="2"
            r="10"
            fill="none"
            stroke="rgba(150,150,150,0.5)"
            strokeWidth="1.5"
          />
          <circle
            cx="-4"
            cy="14"
            r="10"
            fill="none"
            stroke="rgba(150,150,150,0.5)"
            strokeWidth="1.5"
          />
          {/* X mark */}
          <line x1="-22" y1="-28" x2="38" y2="28" stroke="rgba(80,80,80,0.4)" strokeWidth="0.5" />
          <line x1="38" y1="-28" x2="-22" y2="28" stroke="rgba(80,80,80,0.4)" strokeWidth="0.5" />
        </g>
        <text
          x="80"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          isolated objects
        </text>

        {/* Arrow */}
        <path
          d="M 145 50 L 235 50"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#relArrow)"
        />

        {/* Right: Relational network */}
        <g transform="translate(320, 48)">
          <circle
            cx="0"
            cy="-20"
            r="10"
            fill="none"
            stroke="rgba(30,30,30,0.8)"
            strokeWidth="1.5"
          />
          <circle cx="28" cy="5" r="10" fill="none" stroke="rgba(30,30,30,0.8)" strokeWidth="1.5" />
          <circle
            cx="-28"
            cy="5"
            r="10"
            fill="none"
            stroke="rgba(30,30,30,0.8)"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="20" r="10" fill="none" stroke="rgba(30,30,30,0.8)" strokeWidth="1.5" />
          {/* Connection lines */}
          <line x1="0" y1="-10" x2="20" y2="0" stroke="rgba(50,50,50,0.6)" strokeWidth="1.5" />
          <line x1="0" y1="-10" x2="-20" y2="0" stroke="rgba(50,50,50,0.6)" strokeWidth="1.5" />
          <line x1="18" y1="5" x2="8" y2="14" stroke="rgba(50,50,50,0.6)" strokeWidth="1.5" />
          <line x1="-18" y1="5" x2="-8" y2="14" stroke="rgba(50,50,50,0.6)" strokeWidth="1.5" />
          <line x1="-18" y1="5" x2="18" y2="5" stroke="rgba(50,50,50,0.6)" strokeWidth="1.5" />
        </g>
        <text
          x="320"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          relational network
        </text>

        <defs>
          <marker id="relArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(80,80,80,0.5)" />
          </marker>
        </defs>
      </svg>
    ),

    manifestation: (
      <svg viewBox="0 0 400 100" className="w-full h-full" aria-hidden="true">
        {/* Left: Unrealized possibility (dashed) */}
        <g transform="translate(65, 48)">
          <rect
            x="-25"
            y="-25"
            width="50"
            height="50"
            fill="none"
            stroke="rgba(150,150,150,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle
            cx="-8"
            cy="-10"
            r="6"
            fill="none"
            stroke="rgba(150,150,150,0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle
            cx="10"
            cy="5"
            r="7"
            fill="none"
            stroke="rgba(150,150,150,0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <rect
            x="-5"
            y="12"
            width="9"
            height="9"
            fill="none"
            stroke="rgba(150,150,150,0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </g>
        <text
          x="65"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          possibility
        </text>

        {/* Center: Φ observer */}
        <text
          x="200"
          y="52"
          textAnchor="middle"
          fill="rgba(30,30,40,1)"
          fontSize="26"
          fontFamily="serif"
          fontStyle="italic"
        >
          Φ
        </text>
        <text
          x="200"
          y="70"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          observes
        </text>

        {/* Arrows */}
        <path
          d="M 115 50 L 165 50"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#manArrow)"
        />
        <path
          d="M 235 50 L 285 50"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#manArrow)"
        />

        {/* Right: Realized structure (solid) */}
        <g transform="translate(335, 48)">
          <rect
            x="-25"
            y="-25"
            width="50"
            height="50"
            fill="none"
            stroke="rgba(30,30,30,0.8)"
            strokeWidth="2"
          />
          <circle cx="-8" cy="-10" r="6" fill="rgba(30,30,30,0.8)" />
          <circle cx="10" cy="5" r="7" fill="rgba(30,30,30,0.8)" />
          <rect x="-5" y="12" width="9" height="9" fill="rgba(30,30,30,0.8)" />
        </g>
        <text
          x="335"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          reality
        </text>

        <defs>
          <marker id="manArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(80,80,80,0.5)" />
          </marker>
        </defs>
      </svg>
    ),

    conservation: (
      <svg viewBox="0 0 400 100" className="w-full h-full" aria-hidden="true">
        {/* Left: Information bits (squares) */}
        <g transform="translate(70, 48)">
          <rect x="-20" y="-20" width="16" height="16" fill="rgba(30,30,30,0.8)" />
          <rect x="4" y="-20" width="16" height="16" fill="rgba(30,30,30,0.8)" />
          <rect x="-20" y="4" width="16" height="16" fill="rgba(30,30,30,0.8)" />
          <rect x="4" y="4" width="16" height="16" fill="rgba(30,30,30,0.8)" />
        </g>
        <text
          x="70"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.6)"
          fontSize="11"
          fontFamily="monospace"
        >
          I = 4
        </text>

        {/* Center: Transformation symbol */}
        <g transform="translate(200, 48)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(60,60,60,0.5)" strokeWidth="1.5" />
          <path
            d="M -10 -3 L 10 -3 M 6 -7 L 10 -3 L 6 1"
            stroke="rgba(60,60,60,0.6)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 10 5 L -10 5 M -6 1 L -10 5 L -6 9"
            stroke="rgba(60,60,60,0.6)"
            strokeWidth="2"
            fill="none"
          />
        </g>
        <text
          x="200"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          transform
        </text>

        {/* Arrows */}
        <path
          d="M 110 50 L 165 50"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#conArrow)"
        />
        <path
          d="M 235 50 L 290 50"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#conArrow)"
        />

        {/* Right: Transformed but conserved (circles) */}
        <g transform="translate(330, 48)">
          <circle cx="-12" cy="-12" r="8" fill="rgba(30,30,30,0.8)" />
          <circle cx="12" cy="-12" r="8" fill="rgba(30,30,30,0.8)" />
          <circle cx="-12" cy="12" r="8" fill="rgba(30,30,30,0.8)" />
          <circle cx="12" cy="12" r="8" fill="rgba(30,30,30,0.8)" />
        </g>
        <text
          x="330"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.6)"
          fontSize="11"
          fontFamily="monospace"
        >
          I = 4
        </text>

        <defs>
          <marker id="conArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(80,80,80,0.5)" />
          </marker>
        </defs>
      </svg>
    ),

    unification: (
      <svg viewBox="0 0 400 100" className="w-full h-full" aria-hidden="true">
        {/* Left: Infinity in lower dimension */}
        <g transform="translate(85, 48)">
          <line x1="-50" y1="0" x2="50" y2="0" stroke="rgba(100,100,100,0.6)" strokeWidth="2" />
          <text x="-50" y="5" textAnchor="middle" fill="rgba(0,0,0,0.5)" fontSize="14">
            ∞
          </text>
          <text x="50" y="5" textAnchor="middle" fill="rgba(0,0,0,0.5)" fontSize="14">
            ∞
          </text>
        </g>
        <text
          x="85"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          lower dimension
        </text>

        {/* Arrow */}
        <path
          d="M 160 50 L 230 50"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#uniArrow)"
        />

        {/* Right: Finite in higher dimension (sphere) */}
        <g transform="translate(315, 48)">
          <ellipse
            cx="0"
            cy="0"
            rx="38"
            ry="28"
            fill="none"
            stroke="rgba(30,30,30,0.8)"
            strokeWidth="2"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="38"
            ry="10"
            fill="none"
            stroke="rgba(60,60,60,0.3)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <circle cx="0" cy="-28" r="5" fill="rgba(30,30,30,0.9)" />
          <text
            x="0"
            y="-38"
            textAnchor="middle"
            fill="rgba(0,0,0,0.5)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            ∞ meets here
          </text>
        </g>
        <text
          x="315"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="10"
          fontFamily="sans-serif"
        >
          higher dimension
        </text>

        <defs>
          <marker id="uniArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(80,80,80,0.5)" />
          </marker>
        </defs>
      </svg>
    ),

    interface: (
      <svg viewBox="0 0 400 100" className="w-full h-full" aria-hidden="true">
        {/* Left: Universe information */}
        <g transform="translate(70, 48)">
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x="0"
            y="-5"
            textAnchor="middle"
            fill="rgba(0,0,0,0.5)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            UNIVERSE
          </text>
          <text
            x="0"
            y="9"
            textAnchor="middle"
            fill="rgba(0,0,0,0.4)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            information
          </text>
        </g>

        {/* Center: Φ as interface */}
        <g transform="translate(200, 48)">
          <rect
            x="-15"
            y="-30"
            width="30"
            height="60"
            fill="none"
            stroke="rgba(30,30,30,0.8)"
            strokeWidth="2"
            rx="4"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="rgba(30,30,40,1)"
            fontSize="22"
            fontFamily="serif"
            fontStyle="italic"
          >
            Φ
          </text>
        </g>

        {/* Right: Experience */}
        <g transform="translate(330, 48)">
          <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(30,30,30,0.8)" strokeWidth="2" />
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            fill="rgba(0,0,0,0.6)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            EXPERIENCE
          </text>
          <text
            x="0"
            y="11"
            textAnchor="middle"
            fill="rgba(0,0,0,0.4)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            awareness
          </text>
        </g>

        {/* Bidirectional arrows through interface */}
        <path
          d="M 105 40 L 175 40"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#intArrow)"
        />
        <path
          d="M 225 40 L 295 40"
          stroke="rgba(80,80,80,0.4)"
          strokeWidth="1.5"
          markerEnd="url(#intArrow)"
        />
        <path
          d="M 295 56 L 225 56"
          stroke="rgba(80,80,80,0.3)"
          strokeWidth="1.5"
          markerEnd="url(#intArrow)"
        />
        <path
          d="M 175 56 L 105 56"
          stroke="rgba(80,80,80,0.3)"
          strokeWidth="1.5"
          markerEnd="url(#intArrow)"
        />

        <text
          x="200"
          y="92"
          textAnchor="middle"
          fill="rgba(0,0,0,0.5)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          two sides of one event
        </text>

        <defs>
          <marker id="intArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(80,80,80,0.5)" />
          </marker>
        </defs>
      </svg>
    ),
  };

  const labels: Record<string, string> = {
    relationality: "Reality is defined by relationships, not isolated objects",
    manifestation: "Observation makes structure lived",
    conservation: "Information is conserved through all transformations",
    unification: "Infinities resolve to finite in higher-dimensional descriptions",
    interface: "Experience is the inside of an observer's physical activity",
  };

  return (
    <figure
      className="relative w-full mt-4 mb-4 aspect-[4/1] rounded-lg border border-neutral-200 overflow-hidden bg-white"
      role="img"
      aria-label={labels[axiom]}
    >
      <figcaption className="sr-only">{labels[axiom]}</figcaption>
      {diagrams[axiom]}
    </figure>
  );
}
