"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface InvarianceWarpAnimationProps {
  isPDF?: boolean;
}

export default function InvarianceWarpAnimation({ isPDF = false }: InvarianceWarpAnimationProps) {
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
    const observerA = svg.querySelector("#observer-a") as SVGGElement;
    const observerB = svg.querySelector("#observer-b") as SVGGElement;
    const lightBeam = svg.querySelector("#light-beam") as SVGLineElement;
    const gridLines = svg.querySelectorAll(".grid-line") as NodeListOf<SVGPathElement>;
    const timeLines = svg.querySelectorAll(".time-line") as NodeListOf<SVGPathElement>;
    const blockStructure = svg.querySelector("#block-structure") as SVGGElement;
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const observerBLabel = svg.querySelector("#observer-b-label") as SVGTextElement;
    const speedIndicator = svg.querySelector("#speed-indicator") as SVGTextElement;

    // Initial states
    gsap.set(observerA, { opacity: 0 });
    gsap.set(observerB, { opacity: 0 });
    gsap.set(lightBeam, { opacity: 0, attr: { x1: 60, x2: 60 } });
    gsap.set(gridLines, { opacity: 0 });
    gsap.set(timeLines, { opacity: 0 });
    gsap.set(blockStructure, { opacity: 0 });
    gsap.set(caption, { opacity: 0 });
    gsap.set(observerBLabel, { opacity: 0 });
    gsap.set(speedIndicator, { opacity: 0 });

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });
    timelineRef.current = tl;

    // Phase 1: Show Observer A (at rest)
    tl.add("start").to(observerA, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Phase 2: Show grid (space and time lines)
    tl.add("grid", "+=0.3")
      .to(
        gridLines,
        {
          opacity: 0.5,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "grid"
      )
      .to(
        timeLines,
        {
          opacity: 0.5,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "grid+=0.2"
      );

    // Phase 3: Show Observer B
    tl.add("observerB", "+=0.3")
      .to(
        observerB,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "observerB"
      )
      .to(
        observerBLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "observerB+=0.3"
      );

    // Phase 4: Light beam travels (constant speed - the invariant c)
    tl.add("lightBeam", "+=0.3")
      .to(
        lightBeam,
        {
          opacity: 1,
          duration: 0.2,
        },
        "lightBeam"
      )
      .to(
        lightBeam,
        {
          attr: { x1: 60, x2: 500 },
          duration: 2,
          ease: "none", // Constant speed - the invariance of c
        },
        "lightBeam+=0.2"
      );

    // Phase 5: Observer B accelerates toward speed of light
    tl.add("accelerate", "-=1.5")
      .to(
        speedIndicator,
        {
          opacity: 0.7,
          duration: 0.3,
        },
        "accelerate"
      )
      .to(
        observerB,
        {
          x: 150,
          duration: 2,
          ease: "power2.in",
        },
        "accelerate"
      );

    // Phase 6: Grid warps around Observer B
    // As Observer B approaches c, space contracts and time dilates
    tl.add("warp", "-=1.2");

    // Warp horizontal grid lines (space contracts)
    gridLines.forEach((line, i) => {
      const baseY = 80 + i * 30;
      const warpFactor = Math.abs(baseY - 170) / 100; // Distance from Observer B's path

      tl.to(
        line,
        {
          attr: {
            d: `M60,${baseY} Q280,${baseY + (1 - warpFactor) * 25 * (baseY > 170 ? 1 : -1)} 500,${baseY}`,
          },
          duration: 1.5,
          ease: "power2.inOut",
        },
        "warp"
      );
    });

    // Warp vertical grid lines (time dilates)
    timeLines.forEach((line, i) => {
      const baseX = 100 + i * 50;
      const warpFactor = Math.max(0, 1 - Math.abs(baseX - 350) / 200);

      tl.to(
        line,
        {
          attr: {
            d: `M${baseX},60 Q${baseX + warpFactor * 30},157 ${baseX},260`,
          },
          duration: 1.5,
          ease: "power2.inOut",
        },
        "warp"
      );
    });

    // Phase 7: Transition to Block structure
    tl.add("block", "+=0.5")
      .to(
        [gridLines, timeLines],
        {
          opacity: 0.2,
          duration: 0.8,
        },
        "block"
      )
      .to(
        blockStructure,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "block+=0.3"
      )
      .to(
        [observerA, observerB, observerBLabel, speedIndicator],
        {
          opacity: 0.3,
          duration: 0.5,
        },
        "block+=0.3"
      )
      .to(
        lightBeam,
        {
          opacity: 0.3,
          duration: 0.5,
        },
        "block+=0.3"
      );

    // Phase 8: Show caption
    tl.to(
      caption,
      {
        opacity: 0.8,
        duration: 0.5,
      },
      "+=0.2"
    );

    // Hold complete state
    tl.to({}, { duration: 3 });

    // Reset
    tl.add("reset")
      .to(
        [
          observerA,
          observerB,
          lightBeam,
          gridLines,
          timeLines,
          blockStructure,
          caption,
          observerBLabel,
          speedIndicator,
        ],
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .set(observerB, { x: 0 })
      .set(lightBeam, { attr: { x1: 60, x2: 60 } });

    // Reset grid lines to straight
    gridLines.forEach((line, i) => {
      const baseY = 80 + i * 30;
      tl.set(line, { attr: { d: `M60,${baseY} L500,${baseY}` } });
    });
    timeLines.forEach((line, i) => {
      const baseX = 100 + i * 50;
      tl.set(line, { attr: { d: `M${baseX},60 L${baseX},260` } });
    });

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
          <em style={{ fontSize: "1.1em" }}>One Speed of Light</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>The Logic of Invariance:</strong>
          </p>
          <p style={{ margin: "0.5em 0" }}>
            Observer A (at rest) and Observer B (moving fast) both measure the same speed of light
            (c)
          </p>
          <p style={{ margin: "0.5em 0" }}>
            To keep c the same for both, their measures of space (horizontal) and time (vertical)
            must differ: B&apos;s axes tilt relative to A&apos;s
          </p>
          <p style={{ margin: "0.5em 0" }}>
            The observers disagree about what is happening &quot;now&quot;, which ties space and
            time into a single four-dimensional block
          </p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic", marginTop: "1em" }}>
            A shared c, no shared &quot;now&quot;: this motivates the Block Universe
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
      aria-label="Animation showing how the same speed of light for all observers makes their measures of space and time tilt relative to each other, which motivates the Block Universe model"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        One Speed of Light: This animation shows that space and time are not fixed backgrounds
        shared by everyone. Two observers are shown: Observer A at rest and Observer B moving fast.
        A light beam travels at the same speed for both. As Observer B moves faster, B&apos;s grid
        of space (horizontal) and time (vertical) tilts and squeezes relative to A&apos;s. Spacetime
        itself stays flat (bending it takes gravity); what changes is how each observer slices it.
        Because the observers disagree about what is happening &quot;now&quot;, many take this as
        support for a single four-dimensional block where past, present, and future all exist. The
        same speed of light for everyone motivates the Block Universe.
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
          y="30"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
        >
          One Speed of Light
        </text>

        {/* Horizontal grid lines (Space) */}
        <path
          className="grid-line"
          d="M60,80 L500,80"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          opacity="0"
        />
        <path
          className="grid-line"
          d="M60,110 L500,110"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          opacity="0"
        />
        <path
          className="grid-line"
          d="M60,140 L500,140"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          opacity="0"
        />
        <path
          className="grid-line"
          d="M60,170 L500,170"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          opacity="0"
        />
        <path
          className="grid-line"
          d="M60,200 L500,200"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          opacity="0"
        />
        <path
          className="grid-line"
          d="M60,230 L500,230"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Vertical grid lines (Time) */}
        <path
          className="time-line"
          d="M100,60 L100,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M150,60 L150,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M200,60 L200,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M250,60 L250,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M300,60 L300,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M350,60 L350,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M400,60 L400,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <path
          className="time-line"
          d="M450,60 L450,260"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* Light beam (dashed, constant speed) */}
        <line
          id="light-beam"
          x1="60"
          y1="140"
          x2="60"
          y2="140"
          stroke="rgba(60, 60, 60, 0.9)"
          strokeWidth="2"
          strokeDasharray="8 4"
          opacity="0"
        />

        {/* Observer A (at rest) - simple stick figure outline */}
        <g id="observer-a" opacity="0">
          {/* Head */}
          <circle
            cx="80"
            cy="100"
            r="8"
            fill="none"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Body */}
          <line
            x1="80"
            y1="108"
            x2="80"
            y2="130"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Arms */}
          <line
            x1="80"
            y1="115"
            x2="68"
            y2="122"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          <line
            x1="80"
            y1="115"
            x2="92"
            y2="122"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Legs */}
          <line
            x1="80"
            y1="130"
            x2="72"
            y2="145"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          <line
            x1="80"
            y1="130"
            x2="88"
            y2="145"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Label */}
          <text
            x="80"
            y="160"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.6)"
            fontSize="9"
            fontFamily="monospace"
          >
            A (rest)
          </text>
        </g>

        {/* Observer B (moving) - simple stick figure outline */}
        <g id="observer-b" opacity="0">
          {/* Head */}
          <circle
            cx="200"
            cy="180"
            r="8"
            fill="none"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Body - leaning forward */}
          <line
            x1="200"
            y1="188"
            x2="205"
            y2="210"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Arms - reaching forward */}
          <line
            x1="203"
            y1="195"
            x2="215"
            y2="190"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          <line
            x1="203"
            y1="195"
            x2="190"
            y2="200"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Legs - running pose */}
          <line
            x1="205"
            y1="210"
            x2="195"
            y2="228"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          <line
            x1="205"
            y1="210"
            x2="218"
            y2="222"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="1.5"
          />
          {/* Motion lines */}
          <line
            x1="180"
            y1="185"
            x2="170"
            y2="185"
            stroke="rgba(100, 100, 100, 0.5)"
            strokeWidth="1"
          />
          <line
            x1="180"
            y1="195"
            x2="165"
            y2="195"
            stroke="rgba(100, 100, 100, 0.5)"
            strokeWidth="1"
          />
          <line
            x1="180"
            y1="205"
            x2="170"
            y2="205"
            stroke="rgba(100, 100, 100, 0.5)"
            strokeWidth="1"
          />
        </g>

        {/* Observer B Label */}
        <text
          id="observer-b-label"
          x="200"
          y="248"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="9"
          fontFamily="monospace"
          opacity="0"
        >
          B (v → c)
        </text>

        {/* Speed indicator */}
        <text
          id="speed-indicator"
          x="280"
          y="55"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          c = constant (speed of light)
        </text>

        {/* 4D Block Structure (appears after warp) */}
        <g id="block-structure" opacity="0">
          {/* Tilted 3D box representing the 4D block */}
          {/* Front face */}
          <polygon
            points="150,100 400,80 420,200 170,220"
            fill="none"
            stroke="rgba(40, 40, 40, 0.7)"
            strokeWidth="1.5"
          />
          {/* Top face */}
          <polygon
            points="150,100 170,70 420,50 400,80"
            fill="none"
            stroke="rgba(60, 60, 60, 0.5)"
            strokeWidth="1"
          />
          {/* Side face */}
          <polygon
            points="400,80 420,50 440,170 420,200"
            fill="none"
            stroke="rgba(60, 60, 60, 0.5)"
            strokeWidth="1"
          />

          {/* Internal worldlines showing integrated structure */}
          <path
            d="M160,110 Q280,130 410,95"
            fill="none"
            stroke="rgba(80, 80, 80, 0.6)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <path
            d="M165,150 Q290,145 415,140"
            fill="none"
            stroke="rgba(80, 80, 80, 0.6)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <path
            d="M170,190 Q300,170 418,180"
            fill="none"
            stroke="rgba(80, 80, 80, 0.6)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />

          {/* Labels on block */}
          <text
            x="160"
            y="240"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="serif"
            fontStyle="italic"
          >
            Past
          </text>
          <text
            x="280"
            y="245"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="serif"
            fontStyle="italic"
          >
            Present
          </text>
          <text
            x="400"
            y="235"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="9"
            fontFamily="serif"
            fontStyle="italic"
          >
            Future
          </text>
        </g>

        {/* Caption */}
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
          A shared c, no shared &quot;now&quot;: this motivates the Block Universe
        </text>

        {/* Axis labels */}
        <text x="530" y="143" fill="rgba(0, 0, 0, 0.4)" fontSize="9" fontFamily="monospace">
          Space
        </text>
        <text
          x="55"
          y="55"
          fill="rgba(0, 0, 0, 0.4)"
          fontSize="9"
          fontFamily="monospace"
          transform="rotate(-90, 55, 55)"
        >
          Time
        </text>
      </svg>
    </figure>
  );
}
