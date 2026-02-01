"use client";

interface OntologicalAnchorAnimationProps {
  isPDF?: boolean;
}

export default function OntologicalAnchorAnimation({
  isPDF = false,
}: OntologicalAnchorAnimationProps) {
  if (isPDF) {
    return (
      <div
        style={{
          width: "100%",
          marginTop: "2em",
          marginBottom: "1em",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "1.5em",
          background: "#fafafa",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1em" }}>
          <em style={{ fontSize: "1.1em" }}>The Ontological Anchor</em>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
            <p style={{ margin: "0.5em 0", fontWeight: "bold" }}>Abstract Possibility</p>
            <p style={{ margin: "0.5em 0", fontSize: "0.8em" }}>Unobserved states</p>
            <p style={{ margin: "0.5em 0", fontSize: "0.8em" }}>(dashed, disconnected)</p>
          </div>
          <div style={{ textAlign: "center", fontSize: "2em" }}>Φ →</div>
          <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
            <p style={{ margin: "0.5em 0", fontWeight: "bold" }}>Manifested Reality</p>
            <p style={{ margin: "0.5em 0", fontSize: "0.8em" }}>Observed states</p>
            <p style={{ margin: "0.5em 0", fontSize: "0.8em" }}>(solid, connected)</p>
          </div>
        </div>
        <div
          style={{ textAlign: "center", marginTop: "1em", fontStyle: "italic", fontSize: "0.85em" }}
        >
          Consciousness is the mechanism by which possibility is selected into experienced reality.
        </div>
      </div>
    );
  }

  return (
    <figure
      className="relative w-full mt-8 aspect-video rounded-2xl border border-gray-200 overflow-hidden bg-white"
      role="img"
      aria-label="Diagram showing how consciousness (Φ) serves as the ontological anchor, transforming abstract possibility into manifested reality"
    >
      <figcaption className="sr-only">
        The Ontological Anchor diagram shows two states side by side. On the left, abstract
        possibility is represented by scattered dashed shapes. On the right, manifested reality
        shows the same shapes as solid and connected. The Φ symbol in the center represents
        consciousness as the anchor that collapses possibility into reality.
      </figcaption>
      <svg
        viewBox="0 0 560 315"
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* Title */}
        <text
          x="280"
          y="28"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
        >
          The Ontological Anchor
        </text>

        {/* Dividing line */}
        <line
          x1="280"
          y1="50"
          x2="280"
          y2="270"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* LEFT SIDE: Abstract Possibility */}
        <text
          x="140"
          y="58"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="11"
          fontFamily="monospace"
        >
          ABSTRACT POSSIBILITY
        </text>
        <text
          x="140"
          y="72"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.4)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          (unobserved)
        </text>

        {/* Dashed, disconnected shapes */}
        <circle
          cx="80"
          cy="120"
          r="14"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="180"
          cy="100"
          r="12"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="120"
          cy="180"
          r="10"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="200"
          cy="170"
          r="11"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <rect
          x="60"
          y="200"
          width="18"
          height="18"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <rect
          x="150"
          y="220"
          width="16"
          height="16"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <rect
          x="100"
          y="240"
          width="14"
          height="14"
          fill="none"
          stroke="rgba(120, 120, 120, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line
          x1="95"
          y1="135"
          x2="110"
          y2="165"
          stroke="rgba(120, 120, 120, 0.4)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="165"
          y1="115"
          x2="185"
          y2="155"
          stroke="rgba(120, 120, 120, 0.4)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* CENTER: Φ Symbol as the anchor */}
        <text
          x="280"
          y="165"
          textAnchor="middle"
          fill="rgba(20, 20, 30, 1)"
          fontSize="40"
          fontFamily="serif"
          fontStyle="italic"
        >
          Φ
        </text>
        <text
          x="280"
          y="195"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          observation
        </text>

        {/* Arrows pointing from left to Φ and from Φ to right */}
        <path
          d="M 230 157 L 250 157"
          fill="none"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1.5"
          markerEnd="url(#arrowRight)"
        />
        <path
          d="M 310 157 L 330 157"
          fill="none"
          stroke="rgba(40, 40, 40, 0.7)"
          strokeWidth="1.5"
          markerEnd="url(#arrowRight)"
        />

        {/* RIGHT SIDE: Manifested Reality */}
        <text
          x="420"
          y="58"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="11"
          fontFamily="monospace"
        >
          MANIFESTED REALITY
        </text>
        <text
          x="420"
          y="72"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.4)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          (observed)
        </text>

        {/* Solid, connected shapes */}
        <circle
          cx="360"
          cy="120"
          r="14"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />
        <circle
          cx="460"
          cy="100"
          r="12"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />
        <circle
          cx="400"
          cy="180"
          r="10"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />
        <circle
          cx="480"
          cy="170"
          r="11"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />
        <rect
          x="340"
          y="200"
          width="18"
          height="18"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />
        <rect
          x="430"
          y="220"
          width="16"
          height="16"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />
        <rect
          x="380"
          y="240"
          width="14"
          height="14"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2"
        />

        {/* Connection lines forming coherent structure */}
        <line
          x1="374"
          y1="120"
          x2="448"
          y2="100"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="367"
          y1="132"
          x2="393"
          y2="172"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="460"
          y1="112"
          x2="475"
          y2="159"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="410"
          y1="180"
          x2="469"
          y2="170"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="400"
          y1="190"
          x2="387"
          y2="240"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="358"
          y1="209"
          x2="380"
          y2="240"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="394"
          y1="247"
          x2="430"
          y2="228"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="446"
          y1="228"
          x2="480"
          y2="181"
          stroke="rgba(50, 50, 50, 0.6)"
          strokeWidth="1.5"
        />

        {/* Bottom caption */}
        <text
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(30, 30, 40, 0.85)"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
        >
          Consciousness is the mechanism by which possibility is selected into experienced reality.
        </text>

        {/* Arrow marker */}
        <defs>
          <marker id="arrowRight" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(60, 60, 60, 0.6)" />
          </marker>
        </defs>
      </svg>
    </figure>
  );
}
