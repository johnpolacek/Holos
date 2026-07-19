"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface QuantumEraserAnimationProps {
  isPDF?: boolean;
}

// Deterministic screen-hit positions (y values along the screen). The total
// pattern must read as a structureless smear — interference never appears in
// the total, only in record-sorted subsets. Hardcoded so server and client
// render identical SVG.
const TOTAL_HITS = [
  86, 194, 132, 158, 110, 176, 98, 210, 144, 122, 188, 170, 104, 152, 216, 92, 138, 200, 164, 116,
  182, 146, 126, 206,
];

// Subset panel bands. Which-path sorting yields two clumps (one per slit).
const CLUMP_BANDS = [
  { y1: 96, y2: 102 },
  { y1: 106, y2: 114 },
  { y1: 118, y2: 124 },
  { y1: 174, y2: 180 },
  { y1: 184, y2: 192 },
  { y1: 196, y2: 202 },
];

// Erasure sorting yields fringes across the same range.
const FRINGE_BANDS = [
  { y1: 82, y2: 88 },
  { y1: 98, y2: 106 },
  { y1: 116, y2: 126 },
  { y1: 134, y2: 146 },
  { y1: 154, y2: 164 },
  { y1: 172, y2: 180 },
  { y1: 190, y2: 196 },
  { y1: 206, y2: 212 },
];

export default function QuantumEraserAnimation({ isPDF = false }: QuantumEraserAnimationProps) {
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
    const source = svg.querySelector("#source") as SVGCircleElement;
    const sourceRing = svg.querySelector("#source-ring") as SVGCircleElement;
    const sourceLabel = svg.querySelector("#source-label") as SVGTextElement;
    const doubleSlit = svg.querySelector("#double-slit") as SVGGElement;
    const pathUpper = svg.querySelector("#path-upper") as SVGPathElement;
    const pathLower = svg.querySelector("#path-lower") as SVGPathElement;
    const screenGroup = svg.querySelector("#screen-group") as SVGGElement;
    const totalPattern = svg.querySelector("#total-pattern") as SVGGElement;
    const totalHits = svg.querySelectorAll(".total-hit") as NodeListOf<SVGCircleElement>;
    const idlerGroup = svg.querySelector("#idler-group") as SVGGElement;
    const sortingArrow = svg.querySelector("#sorting-arrow") as SVGGElement;
    const panelPath = svg.querySelector("#panel-path") as SVGGElement;
    const panelErased = svg.querySelector("#panel-erased") as SVGGElement;
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const stepALabel = svg.querySelector("#step-a-label") as SVGTextElement;
    const stepBLabel = svg.querySelector("#step-b-label") as SVGTextElement;

    // Path lengths for animation
    const upperPathLength = pathUpper.getTotalLength ? pathUpper.getTotalLength() : 300;

    // Initial states
    gsap.set(source, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(sourceRing, { opacity: 0 });
    gsap.set(sourceLabel, { opacity: 0 });
    gsap.set(doubleSlit, { opacity: 0 });
    gsap.set([pathUpper, pathLower], {
      opacity: 0,
      strokeDasharray: upperPathLength,
      strokeDashoffset: upperPathLength,
    });
    gsap.set(screenGroup, { opacity: 0 });
    gsap.set(totalPattern, { opacity: 1 });
    gsap.set(totalHits, { opacity: 0 });
    gsap.set(idlerGroup, { opacity: 0 });
    gsap.set(sortingArrow, { opacity: 0 });
    gsap.set([panelPath, panelErased], { opacity: 0 });
    gsap.set(caption, { opacity: 0 });
    gsap.set([stepALabel, stepBLabel], { opacity: 0 });

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });
    timelineRef.current = tl;

    // Phase 1: Source appears with pulse
    tl.add("start")
      .to(source, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      })
      .to(
        sourceRing,
        {
          opacity: 0.5,
          duration: 0.3,
        },
        "-=0.2"
      )
      .to(
        sourceLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "-=0.1"
      );

    // Pulse the source
    tl.to(sourceRing, {
      attr: { r: 18 },
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out",
    }).to(sourceRing, {
      attr: { r: 14 },
      opacity: 0.4,
      duration: 0.2,
    });

    // Phase 2: Double slit and screen appear
    tl.add("apparatus", "+=0.2")
      .to(
        doubleSlit,
        {
          opacity: 1,
          duration: 0.4,
        },
        "apparatus"
      )
      .to(
        screenGroup,
        {
          opacity: 1,
          duration: 0.4,
        },
        "apparatus+=0.2"
      );

    // Phase 3: Both paths emerge (dashed — an entangled pair, no path fact yet)
    tl.add("paths", "+=0.3")
      .to(
        [pathUpper, pathLower],
        {
          opacity: 0.5,
          duration: 0.2,
        },
        "paths"
      )
      .to(
        pathUpper,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "none",
        },
        "paths+=0.2"
      )
      .to(
        pathLower,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "none",
        },
        "paths+=0.2"
      );

    // Phase 4: Hits accumulate on the screen as a structureless smear.
    // This total never changes — that is the physical point.
    tl.add("stepA", "+=0.2")
      .to(
        stepALabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "stepA"
      )
      .to(
        totalHits,
        {
          opacity: 0.8,
          duration: 0.12,
          stagger: 0.06,
        },
        "stepA+=0.2"
      );

    // Hold the total pattern
    tl.to({}, { duration: 1.5 });

    // Phase 5: The idler record is registered (Φ) — subluminal, ordinary
    tl.add("record", "+=0.2").to(
      idlerGroup,
      {
        opacity: 1,
        duration: 0.5,
      },
      "record"
    );

    // Phase 6: Coincidence sorting — the SAME hits, sorted by the record
    tl.add("sort", "+=0.4")
      .to(
        stepALabel,
        {
          opacity: 0,
          duration: 0.2,
        },
        "sort"
      )
      .to(
        stepBLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "sort+=0.1"
      )
      .to(
        sortingArrow,
        {
          opacity: 0.7,
          duration: 0.4,
        },
        "sort+=0.1"
      )
      .to(
        panelPath,
        {
          opacity: 1,
          duration: 0.5,
        },
        "sort+=0.5"
      )
      .to(
        panelErased,
        {
          opacity: 1,
          duration: 0.5,
        },
        "sort+=1.1"
      );

    // Phase 7: Caption — the total pattern is still there, unchanged
    tl.add("caption", "+=0.6")
      .to(
        stepBLabel,
        {
          opacity: 0,
          duration: 0.2,
        },
        "caption"
      )
      .to(
        caption,
        {
          opacity: 0.8,
          duration: 0.5,
        },
        "caption+=0.2"
      );

    // Hold complete state
    tl.to({}, { duration: 3 });

    // Reset
    tl.add("reset")
      .to(
        [
          source,
          sourceRing,
          sourceLabel,
          doubleSlit,
          pathUpper,
          pathLower,
          screenGroup,
          idlerGroup,
          sortingArrow,
          panelPath,
          panelErased,
          caption,
        ],
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .to(
        totalHits,
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .set(source, { scale: 0 })
      .set([pathUpper, pathLower], { strokeDashoffset: upperPathLength })
      .set(sourceRing, { attr: { r: 14 } });

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
          <em style={{ fontSize: "1.1em" }}>The Quantum Eraser Without Retroactivity</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            Source → Double Slit → Screen: the total pattern is the same smear no matter what is
            later done with the idler.
          </p>
          <p style={{ margin: "0.5em 0" }}>
            Sorting the same hits by the idler record reveals which-path subsets (clumps) or erased
            subsets (fringes).
          </p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic", marginTop: "1em" }}>
            Nothing travels backward. Registration determines how facts can be sorted, and
            consistency is global.
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
      aria-label="Animation of the delayed-choice quantum eraser showing that the total screen pattern never changes and interference appears only in subsets sorted by the idler record"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        The Quantum Eraser Without Retroactivity. A photon source sends entangled pairs through a
        double slit. The signal photons accumulate on a screen as a structureless smear, and this
        total pattern never changes regardless of what is later done with the idler photons. When
        the idler record is registered and the same screen hits are sorted by that record, the
        subsets show structure: which-path sorting yields two clumps, erasure sorting yields
        interference fringes. The record arrives by ordinary subluminal means and nothing about the
        past changes. In the Holos reading, this illustrates that what counts as an observable fact
        depends on how information is registered, with consistency enforced globally rather than by
        any backward-in-time influence.
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
          y="28"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
        >
          The Quantum Eraser Without Retroactivity
        </text>

        {/* Source */}
        <circle
          id="source-ring"
          cx="50"
          cy="150"
          r="14"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />
        <circle
          id="source"
          cx="50"
          cy="150"
          r="8"
          fill="none"
          stroke="rgba(40, 40, 40, 0.9)"
          strokeWidth="2"
          opacity="0"
        />
        <text
          id="source-label"
          x="50"
          y="178"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Source
        </text>

        {/* Double Slit */}
        <g id="double-slit" opacity="0">
          <line x1="130" y1="75" x2="130" y2="128" stroke="rgba(60, 60, 60, 0.8)" strokeWidth="2" />
          <line
            x1="130"
            y1="143"
            x2="130"
            y2="168"
            stroke="rgba(60, 60, 60, 0.8)"
            strokeWidth="2"
          />
          <line
            x1="130"
            y1="183"
            x2="130"
            y2="230"
            stroke="rgba(60, 60, 60, 0.8)"
            strokeWidth="2"
          />
          <text
            x="130"
            y="245"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="monospace"
          >
            Double Slit
          </text>
        </g>

        {/* Both paths (dashed — no path fact is ever manifested retroactively) */}
        <path
          id="path-upper"
          d="M58,150 L130,135 L330,105"
          fill="none"
          stroke="rgba(120, 120, 120, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          id="path-lower"
          d="M58,150 L130,175 L330,195"
          fill="none"
          stroke="rgba(120, 120, 120, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* Screen with total pattern */}
        <g id="screen-group" opacity="0">
          <line x1="330" y1="70" x2="330" y2="230" stroke="rgba(80, 80, 80, 0.7)" strokeWidth="2" />
          <text
            x="330"
            y="62"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="monospace"
          >
            Screen (total)
          </text>
        </g>

        {/* Total pattern: a structureless smear that never changes */}
        <g id="total-pattern">
          {TOTAL_HITS.map((y, i) => (
            <circle
              key={`hit-${y}`}
              className="total-hit"
              cx={333 + (i % 3) * 2}
              cy={y}
              r="1.8"
              fill="rgba(60, 60, 60, 0.8)"
              opacity="0"
            />
          ))}
        </g>

        {/* Idler record: registered subluminally at an ordinary detector */}
        <g id="idler-group" opacity="0">
          <path
            d="M135,155 C160,215 180,248 202,252"
            fill="none"
            stroke="rgba(120, 120, 120, 0.5)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          <circle
            cx="212"
            cy="252"
            r="11"
            fill="none"
            stroke="rgba(60, 60, 60, 0.6)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="212"
            y="257"
            textAnchor="middle"
            fill="rgba(30, 30, 30, 1)"
            fontSize="13"
            fontFamily="serif"
            fontStyle="italic"
          >
            Φ
          </text>
          <text
            x="212"
            y="275"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="monospace"
          >
            idler record
          </text>
        </g>

        {/* Coincidence sorting: the record is the sorting key */}
        <g id="sorting-arrow" opacity="0">
          <line
            x1="230"
            y1="252"
            x2="425"
            y2="252"
            stroke="rgba(0, 0, 0, 0.35)"
            strokeWidth="1"
            strokeDasharray="4 3"
            markerEnd="url(#arrowhead)"
          />
          <text
            x="328"
            y="245"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.45)"
            fontSize="9"
            fontFamily="monospace"
          >
            coincidence sorting
          </text>
        </g>

        {/* Subset panel: sorted by which-path record → two clumps */}
        <g id="panel-path" opacity="0">
          <line
            x1="450"
            y1="70"
            x2="450"
            y2="230"
            stroke="rgba(80, 80, 80, 0.5)"
            strokeWidth="1.5"
          />
          {CLUMP_BANDS.map((b) => (
            <line
              key={`clump-${b.y1}`}
              x1="452"
              y1={b.y1}
              x2="452"
              y2={b.y2}
              stroke="rgba(90, 90, 90, 0.7)"
              strokeWidth="4"
            />
          ))}
          <text
            x="450"
            y="52"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="monospace"
          >
            by path
          </text>
        </g>

        {/* Subset panel: sorted by erasure record → fringes */}
        <g id="panel-erased" opacity="0">
          <line
            x1="515"
            y1="70"
            x2="515"
            y2="230"
            stroke="rgba(80, 80, 80, 0.5)"
            strokeWidth="1.5"
          />
          {FRINGE_BANDS.map((b) => (
            <line
              key={`fringe-${b.y1}`}
              x1="517"
              y1={b.y1}
              x2="517"
              y2={b.y2}
              stroke="rgba(90, 90, 90, 0.7)"
              strokeWidth="4"
            />
          ))}
          <text
            x="515"
            y="52"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="monospace"
          >
            erased
          </text>
        </g>

        {/* Step labels */}
        <text
          id="step-a-label"
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          The total pattern on the screen never changes
        </text>

        <text
          id="step-b-label"
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Interference appears only in subsets sorted by the idler record
        </text>

        {/* Final caption */}
        <text
          id="caption"
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Nothing travels backward; registration determines how facts sort
        </text>

        {/* Arrowhead marker */}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0, 0, 0, 0.3)" />
          </marker>
        </defs>
      </svg>
    </figure>
  );
}
