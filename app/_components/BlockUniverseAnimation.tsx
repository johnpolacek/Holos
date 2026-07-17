"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface BlockUniverseAnimationProps {
  isPDF?: boolean;
}

export default function BlockUniverseAnimation({ isPDF = false }: BlockUniverseAnimationProps) {
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
    const phiSymbol = svg.querySelector("#phi-observer") as SVGTextElement;
    const phiRing = svg.querySelector("#phi-ring") as SVGCircleElement;
    const ghostLines = svg.querySelectorAll(".ghost-line") as NodeListOf<SVGLineElement>;
    const ghostPoints = svg.querySelectorAll(".ghost-point") as NodeListOf<SVGCircleElement>;
    const solidLines = svg.querySelectorAll(".solid-line") as NodeListOf<SVGLineElement>;
    const solidPoints = svg.querySelectorAll(".solid-point") as NodeListOf<SVGCircleElement>;
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const t0Label = svg.querySelector("#t0-label") as SVGTextElement;
    const tnowLabel = svg.querySelector("#tnow-label") as SVGTextElement;

    // Initial state
    gsap.set(solidLines, { opacity: 0 });
    gsap.set(solidPoints, { opacity: 0 });
    gsap.set(ghostLines, { opacity: 0.4 });
    gsap.set(ghostPoints, { opacity: 0.3 });
    gsap.set(caption, { opacity: 0 });
    gsap.set(phiSymbol, { opacity: 0.6 });
    gsap.set(phiRing, { opacity: 0 });

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    timelineRef.current = tl;

    // Phase 1: Initial state - the block as structure alone (C)
    tl.to(ghostLines, {
      opacity: 0.5,
      duration: 0.8,
      stagger: 0.05,
    })
      .to(
        ghostPoints,
        {
          opacity: 0.4,
          duration: 0.6,
          stagger: 0.03,
        },
        "-=0.4"
      )
      .to([t0Label, tnowLabel], {
        opacity: 0.6,
        duration: 0.4,
      });

    // Phase 2: Phi observer pulses
    tl.add("observe")
      .to(
        phiSymbol,
        {
          opacity: 1,
          duration: 0.3,
        },
        "observe"
      )
      .to(
        phiRing,
        {
          opacity: 0.8,
          attr: { r: 20 },
          duration: 0.3,
          ease: "power2.out",
        },
        "observe"
      )
      .to(
        phiRing,
        {
          opacity: 0,
          attr: { r: 30 },
          duration: 0.5,
          ease: "power2.out",
        },
        "observe+=0.3"
      );

    // Phase 3: The whole block is realized at once. No wave, no direction, no
    // propagation — the ghost/solid contrast compares two descriptions of the
    // same tenseless block (structure alone vs. structure closed by
    // observation), so the crossfade must be simultaneous everywhere.
    tl.add("realize")
      .to(
        ghostLines,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "realize"
      )
      .to(
        ghostPoints,
        {
          opacity: 0,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "realize"
      )
      .to(
        solidLines,
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "realize"
      )
      .to(
        solidPoints,
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "realize"
      );

    // Show caption
    tl.to(
      caption,
      {
        opacity: 0.7,
        duration: 0.5,
      },
      "realize+=0.8"
    );

    // Hold the realized state
    tl.to({}, { duration: 2 });

    // Reset for next cycle
    tl.add("reset")
      .to(
        [solidLines, solidPoints, caption],
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .to(
        phiSymbol,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "reset"
      )
      .set(ghostLines, { opacity: 0 })
      .set(ghostPoints, { opacity: 0 });

    return () => {
      tl.kill();
    };
  }, [isPDF, prefersReducedMotion]);

  // Generate ghost/solid line positions
  const linePositions = [];
  const blockLeft = 60;
  const blockRight = 500;
  const blockTop = 120;
  const blockBottom = 180;
  const lineSpacing = 25;

  for (let x = blockLeft + 20; x < blockRight - 60; x += lineSpacing) {
    const height = 15 + Math.random() * 25;
    const y1 = blockTop + 10 + Math.random() * 10;
    const y2 = y1 + height;
    linePositions.push({ x, y1, y2 });
  }

  // Generate ghost/solid point positions
  const pointPositions = [];
  for (let i = 0; i < 30; i++) {
    const x = blockLeft + 30 + Math.random() * (blockRight - blockLeft - 100);
    const y = blockTop + 15 + Math.random() * (blockBottom - blockTop - 30);
    pointPositions.push({ x, y });
  }

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
          <em style={{ fontSize: "1.1em" }}>Global Closure in the Block Universe</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>[ t₀ (Big Bang) ····· Φ (observer) ····· t_now ]</p>
          <p style={{ margin: "0.5em 0" }}>
            A block that contains an observer is realized as a whole.
          </p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic" }}>
            Realization is a tenseless constraint, not a process in time.
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
      aria-label="Animation comparing a block universe described as structure alone with the same block realized as a whole because it contains an observer"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        Global Closure in the Block Universe: In an eternalist view, the spacetime block contains
        all moments tenselessly. The animation first shows the block in a faint, dashed style, then
        shows the same block in solid form once the observer (Φ) it contains is highlighted. The
        crossfade is simultaneous across the whole block: nothing travels backward and nothing
        changes within the block. The two styles compare two descriptions of the same tenseless
        structure — physical structure alone, and structure realized as experienced history because
        it contains registration. Realization is a global constraint, not a process in time.
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
          y="35"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
        >
          Global Closure in the Block Universe
        </text>

        {/* The Spacetime Block - outline */}
        <rect
          x="60"
          y="120"
          width="440"
          height="60"
          fill="none"
          stroke="rgba(0, 0, 0, 0.3)"
          strokeWidth="1.5"
          rx="2"
        />

        {/* Time arrow */}
        <line
          x1="60"
          y1="200"
          x2="500"
          y2="200"
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth="1"
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0, 0, 0, 0.2)" />
          </marker>
        </defs>

        {/* Ghost lines (dashed - potential past) */}
        {linePositions.map((pos, i) => (
          <line
            key={`ghost-${i}`}
            className="ghost-line"
            x1={pos.x}
            y1={pos.y1}
            x2={pos.x}
            y2={pos.y2}
            stroke="rgba(150, 150, 150, 0.6)"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0"
          />
        ))}

        {/* Ghost points (faint - potential events) */}
        {pointPositions.map((pos, i) => (
          <circle
            key={`ghost-point-${i}`}
            className="ghost-point"
            cx={pos.x}
            cy={pos.y}
            r="2"
            fill="none"
            stroke="rgba(150, 150, 150, 0.5)"
            strokeWidth="1"
            strokeDasharray="1 1"
            opacity="0"
          />
        ))}

        {/* Solid lines (realized past) */}
        {linePositions.map((pos, i) => (
          <line
            key={`solid-${i}`}
            className="solid-line"
            x1={pos.x}
            y1={pos.y1}
            x2={pos.x}
            y2={pos.y2}
            stroke="rgba(30, 30, 30, 1)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0"
          />
        ))}

        {/* Solid points (realized events) */}
        {pointPositions.map((pos, i) => (
          <circle
            key={`solid-point-${i}`}
            className="solid-point"
            cx={pos.x}
            cy={pos.y}
            r="2.5"
            fill="rgba(30, 30, 30, 1)"
            opacity="0"
          />
        ))}

        {/* Phi observer ring (pulse effect) — inside the block: observers are
            part of the structure, not outside it */}
        <circle
          id="phi-ring"
          cx="470"
          cy="150"
          r="15"
          fill="none"
          stroke="rgba(0, 0, 0, 0.4)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Phi observer symbol */}
        <text
          id="phi-observer"
          x="470"
          y="157"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.8)"
          fontSize="20"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0.6"
        >
          Φ
        </text>

        {/* Time labels */}
        <text
          id="t0-label"
          x="60"
          y="215"
          textAnchor="start"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          t₀ (Big Bang)
        </text>
        <text
          id="tnow-label"
          x="500"
          y="215"
          textAnchor="end"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          t_now (Observer)
        </text>

        {/* Caption */}
        <text
          id="caption"
          x="280"
          y="260"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          A block that contains an observer is realized as a whole
        </text>

        {/* Tenseless constraint note */}
        <text
          x="280"
          y="285"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.4)"
          fontSize="10"
          fontFamily="monospace"
        >
          a tenseless constraint, not a process in time
        </text>
      </svg>
    </figure>
  );
}
