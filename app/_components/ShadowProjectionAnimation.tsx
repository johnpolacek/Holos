"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface ShadowProjectionAnimationProps {
  isPDF?: boolean;
}

export default function ShadowProjectionAnimation({
  isPDF = false,
}: ShadowProjectionAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && timelineRef.current) {
        timelineRef.current.pause();
      } else if (!e.matches && timelineRef.current) {
        timelineRef.current.play();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Skip animation setup in PDF mode or if user prefers reduced motion
    if (isPDF || prefersReducedMotion) return;
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;

    // Get elements
    const tesseract = svg.querySelector("#tesseract") as SVGGElement;
    const tesseractOuter = svg.querySelector("#tesseract-outer") as SVGPathElement;
    const tesseractInner = svg.querySelector("#tesseract-inner") as SVGPathElement;
    const tesseractConnections = svg.querySelectorAll(
      ".tesseract-connection"
    ) as NodeListOf<SVGLineElement>;
    const shadowGrid = svg.querySelector("#shadow-grid") as SVGGElement;
    const shadowA = svg.querySelector("#shadow-a") as SVGPathElement;
    const shadowB = svg.querySelector("#shadow-b") as SVGPathElement;
    const projectionLines = svg.querySelectorAll(".projection-line") as NodeListOf<SVGLineElement>;
    const upperLabel = svg.querySelector("#upper-label") as SVGTextElement;
    const lowerLabel = svg.querySelector("#lower-label") as SVGTextElement;
    const gravityLabel = svg.querySelector("#gravity-label") as SVGTextElement;
    const emLabel = svg.querySelector("#em-label") as SVGTextElement;
    const compactPoint = svg.querySelector("#compact-point") as SVGCircleElement;
    const compactLabel = svg.querySelector("#compact-label") as SVGTextElement;
    const syncLabel = svg.querySelector("#sync-label") as SVGTextElement;

    // Initial states
    gsap.set(tesseract, { opacity: 0 });
    gsap.set([tesseractOuter, tesseractInner], { opacity: 0 });
    gsap.set(tesseractConnections, { opacity: 0 });
    gsap.set(shadowGrid, { opacity: 0 });
    gsap.set([shadowA, shadowB], { opacity: 0 });
    gsap.set(projectionLines, { opacity: 0 });
    gsap.set([upperLabel, lowerLabel, gravityLabel, emLabel], { opacity: 0 });
    gsap.set(compactPoint, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set([compactLabel, syncLabel], { opacity: 0 });

    // Tesseract rotation angle (controls the projection)
    const rotationState = { angle: 0 };

    // Function to update tesseract geometry based on rotation
    const updateTesseract = (angle: number) => {
      const rad = (angle * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      // 4D to 3D to 2D projection simulation
      const scale = 0.8 + 0.2 * cos;
      const offset = 20 * sin;

      // Outer cube vertices (simplified 4D projection)
      const outerSize = 50 * scale;
      const innerSize = 30 * scale;
      const cx = 280;
      const cy = 100;

      // Outer cube path
      const outerPath = `
        M${cx - outerSize + offset},${cy - outerSize}
        L${cx + outerSize + offset},${cy - outerSize}
        L${cx + outerSize - offset},${cy + outerSize}
        L${cx - outerSize - offset},${cy + outerSize}
        Z
      `;

      // Inner cube path (rotated differently)
      const innerOffset = -offset * 0.6;
      const innerPath = `
        M${cx - innerSize + innerOffset},${cy - innerSize * 0.8}
        L${cx + innerSize + innerOffset},${cy - innerSize * 0.8}
        L${cx + innerSize - innerOffset},${cy + innerSize * 0.8}
        L${cx - innerSize - innerOffset},${cy + innerSize * 0.8}
        Z
      `;

      tesseractOuter.setAttribute("d", outerPath);
      tesseractInner.setAttribute("d", innerPath);

      // Update connections between cubes
      const connections = [
        {
          x1: cx - outerSize + offset,
          y1: cy - outerSize,
          x2: cx - innerSize + innerOffset,
          y2: cy - innerSize * 0.8,
        },
        {
          x1: cx + outerSize + offset,
          y1: cy - outerSize,
          x2: cx + innerSize + innerOffset,
          y2: cy - innerSize * 0.8,
        },
        {
          x1: cx + outerSize - offset,
          y1: cy + outerSize,
          x2: cx + innerSize - innerOffset,
          y2: cy + innerSize * 0.8,
        },
        {
          x1: cx - outerSize - offset,
          y1: cy + outerSize,
          x2: cx - innerSize - innerOffset,
          y2: cy + innerSize * 0.8,
        },
      ];

      tesseractConnections.forEach((line, i) => {
        if (connections[i]) {
          line.setAttribute("x1", String(connections[i].x1));
          line.setAttribute("y1", String(connections[i].y1));
          line.setAttribute("x2", String(connections[i].x2));
          line.setAttribute("y2", String(connections[i].y2));
        }
      });

      // Update shadow projections (the "separate" forces)
      const shadowOffset = offset * 1.5;

      // Shadow A (represents Gravity)
      const shadowAPath = `
        M${160 + shadowOffset * 0.5},${240}
        L${200 + shadowOffset},${240}
        L${200 + shadowOffset * 0.3},${260}
        L${160 + shadowOffset * 0.8},${260}
        Z
      `;

      // Shadow B (represents EM)
      const shadowBPath = `
        M${360 - shadowOffset * 0.5},${240}
        L${400 - shadowOffset},${240}
        L${400 - shadowOffset * 0.3},${260}
        L${360 - shadowOffset * 0.8},${260}
        Z
      `;

      shadowA.setAttribute("d", shadowAPath);
      shadowB.setAttribute("d", shadowBPath);

      // Update projection lines
      projectionLines.forEach((line, i) => {
        const startX =
          i < 2 ? cx - outerSize * (i === 0 ? 1 : -1) + (i === 0 ? offset : -offset) : cx;
        const startY = cy + outerSize;
        const endX = i < 2 ? (i === 0 ? 180 + shadowOffset * 0.6 : 380 - shadowOffset * 0.6) : 280;
        const endY = 240;

        line.setAttribute("x1", String(startX));
        line.setAttribute("y1", String(startY));
        line.setAttribute("x2", String(endX));
        line.setAttribute("y2", String(endY));
      });
    };

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    timelineRef.current = tl;

    // Phase 1: Show shadow grid (lower dimension)
    tl.add("start")
      .to(shadowGrid, {
        opacity: 0.3,
        duration: 0.5,
      })
      .to(
        lowerLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "-=0.2"
      );

    // Phase 2: Show the "separate" shadows first
    tl.add("shadows", "+=0.3")
      .to([shadowA, shadowB], {
        opacity: 0.7,
        duration: 0.4,
        stagger: 0.2,
      })
      .to(
        [gravityLabel, emLabel],
        {
          opacity: 0.5,
          duration: 0.3,
        },
        "-=0.2"
      );

    // Phase 3: Reveal the higher-dimensional source
    tl.add("reveal", "+=0.5")
      .to(
        upperLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "reveal"
      )
      .to(
        tesseract,
        {
          opacity: 1,
          duration: 0.3,
        },
        "reveal"
      )
      .to(
        [tesseractOuter, tesseractInner],
        {
          opacity: 0.8,
          duration: 0.5,
        },
        "reveal+=0.2"
      )
      .to(
        tesseractConnections,
        {
          opacity: 0.4,
          duration: 0.4,
          stagger: 0.05,
        },
        "reveal+=0.3"
      );

    // Show projection lines
    tl.to(
      projectionLines,
      {
        opacity: 0.3,
        duration: 0.4,
        stagger: 0.1,
      },
      "-=0.2"
    );

    // Phase 4: Rotate the tesseract and show synchronized shadows
    tl.add("rotate", "+=0.3").to(
      syncLabel,
      {
        opacity: 0.6,
        duration: 0.3,
      },
      "rotate"
    );

    // Continuous rotation showing unification
    tl.to(
      rotationState,
      {
        angle: 360,
        duration: 6,
        ease: "none",
        onUpdate: () => updateTesseract(rotationState.angle),
      },
      "rotate+=0.3"
    );

    // Phase 5: Compactification
    tl.add("compact", "-=1")
      .to(
        syncLabel,
        {
          opacity: 0,
          duration: 0.2,
        },
        "compact"
      )
      .to(
        compactLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "compact+=0.2"
      )
      .to(
        tesseract,
        {
          scale: 0.1,
          transformOrigin: "280px 100px",
          duration: 1.5,
          ease: "power2.in",
        },
        "compact+=0.5"
      )
      .to(
        compactPoint,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        },
        "-=0.3"
      )
      .to(
        [tesseractOuter, tesseractInner, tesseractConnections],
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.3"
      );

    // Show that shadows still respond even when compactified
    tl.to(rotationState, {
      angle: 540,
      duration: 2,
      ease: "none",
      onUpdate: () => updateTesseract(rotationState.angle),
    });

    // Pulse the compact point
    tl.to(
      compactPoint,
      {
        attr: { r: 8 },
        duration: 0.3,
        repeat: 3,
        yoyo: true,
      },
      "-=2"
    );

    // Hold complete state
    tl.to({}, { duration: 2 });

    // Reset
    tl.add("reset")
      .to(
        [
          tesseract,
          shadowGrid,
          shadowA,
          shadowB,
          projectionLines,
          upperLabel,
          lowerLabel,
          gravityLabel,
          emLabel,
          compactPoint,
          compactLabel,
          syncLabel,
        ],
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .set(tesseract, { scale: 1 })
      .set(compactPoint, { scale: 0 })
      .set(rotationState, { angle: 0 })
      .add(() => updateTesseract(0));

    // Initialize tesseract
    updateTesseract(0);

    return () => {
      tl.kill();
    };
  }, [isPDF, prefersReducedMotion]);

  // Static PDF version
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
          <em style={{ fontSize: "1.1em" }}>The Shadow Projection: Geometric Unification</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Higher Dimension:</strong> Unified Geometry (Tesseract / Calabi-Yau)
          </p>
          <p style={{ margin: "0.5em 0" }}>↓ Projection ↓</p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Lower Dimension:</strong> Perceived Separate Fields
          </p>
          <p style={{ margin: "0.5em 0" }}>[Gravity] ← Single Source → [Electromagnetism]</p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic", marginTop: "1em" }}>
            What appears as separate forces are shadows of unified higher geometry
          </p>
          <p style={{ margin: "0.5em 0", fontSize: "0.85em" }}>
            Compactification: Higher dimensions curl up into invisible scales while still
            influencing our reality
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure
      ref={containerRef}
      className="relative w-full mt-8 aspect-video rounded-lg border border-black/10 overflow-hidden bg-white"
      role="img"
      aria-label="Animation showing how our 3D reality might be a shadow projection of higher-dimensional unified geometry, where separate forces like gravity and electromagnetism are actually different aspects of one structure"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        The Shadow Projection: Geometric Unification. This animation visualizes how our perceived
        separate forces (gravity and electromagnetism) might actually be projections of a single
        unified geometry in higher dimensions. A rotating tesseract in the upper portion casts two
        separate shadows onto a lower grid. As the higher shape rotates, both shadows move in
        perfect synchronization, revealing their common source. The animation also demonstrates
        compactification, where the higher-dimensional structure curls up into an invisible point
        while still influencing the lower-dimensional shadows.
      </figcaption>
      <svg
        ref={svgRef}
        viewBox="0 0 560 315"
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* Title */}
        <text
          x="280"
          y="24"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
        >
          The Shadow Projection: Geometric Unification
        </text>

        {/* Dividing line between dimensions */}
        <line
          x1="80"
          y1="190"
          x2="480"
          y2="190"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="1"
          strokeDasharray="8 4"
        />

        {/* Upper label */}
        <text
          id="upper-label"
          x="280"
          y="45"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Unified Higher Geometry (n+1 Dimensions)
        </text>

        {/* Tesseract (4D hypercube projection) */}
        <g id="tesseract">
          {/* Outer cube */}
          <path
            id="tesseract-outer"
            d="M230,50 L330,50 L330,150 L230,150 Z"
            fill="none"
            stroke="rgba(80, 80, 80, 0.7)"
            strokeWidth="1.5"
            opacity="0"
          />
          {/* Inner cube */}
          <path
            id="tesseract-inner"
            d="M250,70 L310,70 L310,130 L250,130 Z"
            fill="none"
            stroke="rgba(100, 100, 100, 0.6)"
            strokeWidth="1"
            opacity="0"
          />
          {/* Connections between cubes (4D edges) */}
          <line
            className="tesseract-connection"
            x1="230"
            y1="50"
            x2="250"
            y2="70"
            stroke="rgba(120, 120, 120, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <line
            className="tesseract-connection"
            x1="330"
            y1="50"
            x2="310"
            y2="70"
            stroke="rgba(120, 120, 120, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <line
            className="tesseract-connection"
            x1="330"
            y1="150"
            x2="310"
            y2="130"
            stroke="rgba(120, 120, 120, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <line
            className="tesseract-connection"
            x1="230"
            y1="150"
            x2="250"
            y2="130"
            stroke="rgba(120, 120, 120, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        </g>

        {/* Compact point (appears during compactification) */}
        <circle
          id="compact-point"
          cx="280"
          cy="100"
          r="5"
          fill="none"
          stroke="rgba(40, 40, 40, 0.9)"
          strokeWidth="2"
          opacity="0"
        />

        {/* Projection lines */}
        <line
          className="projection-line"
          x1="230"
          y1="150"
          x2="180"
          y2="240"
          stroke="rgba(100, 100, 100, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <line
          className="projection-line"
          x1="330"
          y1="150"
          x2="380"
          y2="240"
          stroke="rgba(100, 100, 100, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* Shadow/Projection Grid (Lower Dimension) */}
        <g id="shadow-grid" opacity="0">
          {/* Grid lines */}
          <line
            x1="100"
            y1="220"
            x2="460"
            y2="220"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="240"
            x2="460"
            y2="240"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="260"
            x2="460"
            y2="260"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="280"
            x2="460"
            y2="280"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="140"
            y1="210"
            x2="140"
            y2="285"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="200"
            y1="210"
            x2="200"
            y2="285"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="280"
            y1="210"
            x2="280"
            y2="285"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="360"
            y1="210"
            x2="360"
            y2="285"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="420"
            y1="210"
            x2="420"
            y2="285"
            stroke="rgba(150, 150, 150, 0.4)"
            strokeWidth="1"
          />
        </g>

        {/* Shadow A (Gravity) */}
        <path
          id="shadow-a"
          d="M160,240 L200,240 L200,260 L160,260 Z"
          fill="none"
          stroke="rgba(50, 50, 50, 0.8)"
          strokeWidth="2"
          opacity="0"
        />

        {/* Shadow B (Electromagnetism) */}
        <path
          id="shadow-b"
          d="M360,240 L400,240 L400,260 L360,260 Z"
          fill="none"
          stroke="rgba(50, 50, 50, 0.8)"
          strokeWidth="2"
          opacity="0"
        />

        {/* Lower label */}
        <text
          id="lower-label"
          x="280"
          y="205"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Perceived Separate Fields (3D Reality)
        </text>

        {/* Field labels */}
        <text
          id="gravity-label"
          x="180"
          y="278"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="9"
          fontFamily="monospace"
          opacity="0"
        >
          Gravity
        </text>
        <text
          id="em-label"
          x="380"
          y="278"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="9"
          fontFamily="monospace"
          opacity="0"
        >
          Electromagnetism
        </text>

        {/* Sync label */}
        <text
          id="sync-label"
          x="280"
          y="300"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="10"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Single rotation → Synchronized shadows
        </text>

        {/* Compactification label */}
        <text
          id="compact-label"
          x="280"
          y="300"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="10"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Compactified: Higher dimensions curl up, still influence reality
        </text>

        {/* Dimension labels on sides */}
        <text
          x="60"
          y="100"
          fill="rgba(0, 0, 0, 0.3)"
          fontSize="9"
          fontFamily="monospace"
          transform="rotate(-90, 60, 100)"
        >
          n+1 Dim
        </text>
        <text
          x="60"
          y="250"
          fill="rgba(0, 0, 0, 0.3)"
          fontSize="9"
          fontFamily="monospace"
          transform="rotate(-90, 60, 250)"
        >
          n Dim
        </text>
      </svg>
    </figure>
  );
}
