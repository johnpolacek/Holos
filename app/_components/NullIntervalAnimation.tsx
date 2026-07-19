"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface NullIntervalAnimationProps {
  isPDF?: boolean;
}

export default function NullIntervalAnimation({ isPDF = false }: NullIntervalAnimationProps) {
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
    const gridLines = svg.querySelectorAll(".grid-line") as NodeListOf<SVGLineElement>;
    const pointA = svg.querySelector("#point-a") as SVGCircleElement;
    const pointB = svg.querySelector("#point-b") as SVGCircleElement;
    const labelA = svg.querySelector("#label-a") as SVGTextElement;
    const labelB = svg.querySelector("#label-b") as SVGTextElement;
    const particle = svg.querySelector("#particle") as SVGCircleElement;
    const particlePath = svg.querySelector("#particle-path") as SVGPathElement;
    const seam = svg.querySelector("#seam") as SVGLineElement;
    const lowerDimLabel = svg.querySelector("#lower-dim-label") as SVGTextElement;
    const higherDimLabel = svg.querySelector("#higher-dim-label") as SVGTextElement;
    const nullIntervalLabel = svg.querySelector("#null-interval-label") as SVGTextElement;

    // Point positions
    const pointAX = 100;
    const pointAY = 200;
    const pointBX = 460;
    const pointBY = 100;

    // Initial states
    gsap.set(gridLines, { opacity: 0 });
    gsap.set([pointA, pointB], { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set([labelA, labelB], { opacity: 0 });
    gsap.set(particle, { opacity: 0, cx: pointAX, cy: pointAY });
    gsap.set(particlePath, { opacity: 0, strokeDashoffset: 500 });
    gsap.set(seam, { opacity: 0, attr: { x1: pointAX, y1: pointAY, x2: pointAX, y2: pointAY } });
    gsap.set([lowerDimLabel, higherDimLabel, nullIntervalLabel], { opacity: 0 });

    // Store original grid positions for pinch effect
    const gridPositions: {
      line: SVGLineElement;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[] = [];
    gridLines.forEach((line) => {
      gridPositions.push({
        line,
        x1: Number.parseFloat(line.getAttribute("x1") || "0"),
        y1: Number.parseFloat(line.getAttribute("y1") || "0"),
        x2: Number.parseFloat(line.getAttribute("x2") || "0"),
        y2: Number.parseFloat(line.getAttribute("y2") || "0"),
      });
    });

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });
    timelineRef.current = tl;

    // Phase 1: Show the spacetime grid
    tl.add("start").to(gridLines, {
      opacity: 0.3,
      duration: 0.8,
      stagger: 0.02,
      ease: "power2.out",
    });

    // Phase 2: Show emission and absorption points
    tl.add("points", "+=0.3")
      .to(
        pointA,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "points"
      )
      .to(
        labelA,
        {
          opacity: 0.7,
          duration: 0.3,
        },
        "points+=0.2"
      )
      .to(
        pointB,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "points+=0.3"
      )
      .to(
        labelB,
        {
          opacity: 0.7,
          duration: 0.3,
        },
        "points+=0.5"
      );

    // Phase 3: Lower-dimensional perception - particle travels
    tl.add("lowerDim", "+=0.5")
      .to(
        lowerDimLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "lowerDim"
      )
      .to(
        particle,
        {
          opacity: 1,
          duration: 0.2,
        },
        "lowerDim"
      )
      .to(
        particlePath,
        {
          opacity: 0.5,
          duration: 0.2,
        },
        "lowerDim"
      );

    // Animate particle along path (slow travel representing our perception of time)
    const pathLength = particlePath.getTotalLength ? particlePath.getTotalLength() : 500;
    gsap.set(particlePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    tl.to(
      particlePath,
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: "none",
      },
      "lowerDim+=0.3"
    );

    // Move particle along the path
    tl.to(
      particle,
      {
        motionPath: {
          path: particlePath,
          align: particlePath,
          alignOrigin: [0.5, 0.5],
        },
        duration: 3,
        ease: "none",
      },
      "lowerDim+=0.3"
    );

    // Phase 4: Higher-dimensional revelation - the seam appears
    tl.add("higherDim", "+=0.5")
      .to(
        lowerDimLabel,
        {
          opacity: 0,
          duration: 0.3,
        },
        "higherDim"
      )
      .to(
        [particle, particlePath],
        {
          opacity: 0.2,
          duration: 0.3,
        },
        "higherDim"
      )
      .to(
        higherDimLabel,
        {
          opacity: 0.6,
          duration: 0.3,
        },
        "higherDim+=0.2"
      );

    // The seam "zips" from A to B
    tl.to(
      seam,
      {
        opacity: 1,
        duration: 0.1,
      },
      "higherDim+=0.4"
    ).to(
      seam,
      {
        attr: { x2: pointBX, y2: pointBY },
        duration: 0.4,
        ease: "power3.in",
      },
      "higherDim+=0.5"
    );

    // Grid pinches toward the seam
    tl.add("pinch", "-=0.2");

    // Calculate pinch effect for each grid line
    gridPositions.forEach(({ line, x1, y1, x2, y2 }) => {
      // Calculate distance to the seam line for pinch effect
      const seamMidX = (pointAX + pointBX) / 2;
      const seamMidY = (pointAY + pointBY) / 2;

      // Calculate pinch factor based on distance to seam
      const distToSeam1 = Math.sqrt((x1 - seamMidX) ** 2 + (y1 - seamMidY) ** 2);
      const distToSeam2 = Math.sqrt((x2 - seamMidX) ** 2 + (y2 - seamMidY) ** 2);

      const pinchFactor1 = Math.max(0, 1 - distToSeam1 / 300) * 15;
      const pinchFactor2 = Math.max(0, 1 - distToSeam2 / 300) * 15;

      // Direction toward seam
      const angle1 = Math.atan2(seamMidY - y1, seamMidX - x1);
      const angle2 = Math.atan2(seamMidY - y2, seamMidX - x2);

      const newX1 = x1 + Math.cos(angle1) * pinchFactor1;
      const newY1 = y1 + Math.sin(angle1) * pinchFactor1;
      const newX2 = x2 + Math.cos(angle2) * pinchFactor2;
      const newY2 = y2 + Math.sin(angle2) * pinchFactor2;

      tl.to(
        line,
        {
          attr: { x1: newX1, y1: newY1, x2: newX2, y2: newY2 },
          duration: 0.6,
          ease: "power2.out",
        },
        "pinch"
      );
    });

    // Phase 5: Show null interval label - the completed circuit
    tl.add("complete", "+=0.3")
      .to(
        higherDimLabel,
        {
          opacity: 0,
          duration: 0.3,
        },
        "complete"
      )
      .to(
        nullIntervalLabel,
        {
          opacity: 0.8,
          duration: 0.5,
        },
        "complete+=0.2"
      )
      .to(
        seam,
        {
          strokeWidth: 3,
          duration: 0.3,
        },
        "complete+=0.2"
      );

    // Pulse the seam to emphasize static structure
    tl.to(seam, {
      strokeWidth: 2.5,
      duration: 0.5,
      repeat: 2,
      yoyo: true,
    });

    // Hold complete state
    tl.to({}, { duration: 3 });

    // Reset
    tl.add("reset")
      .to(
        [
          gridLines,
          pointA,
          pointB,
          labelA,
          labelB,
          particle,
          particlePath,
          seam,
          nullIntervalLabel,
        ],
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .set(particle, { cx: pointAX, cy: pointAY })
      .set(particlePath, { strokeDashoffset: pathLength })
      .set(seam, { attr: { x1: pointAX, y1: pointAY, x2: pointAX, y2: pointAY }, strokeWidth: 2 })
      .set([pointA, pointB], { scale: 0 });

    // Reset grid lines to original positions
    gridPositions.forEach(({ line, x1, y1, x2, y2 }) => {
      tl.set(line, { attr: { x1, y1, x2, y2 } });
    });

    return () => {
      tl.kill();
    };
  }, [isPDF, prefersReducedMotion]);

  // Point positions for SVG
  const pointAX = 100;
  const pointAY = 200;
  const pointBX = 460;
  const pointBY = 100;

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
          <em style={{ fontSize: "1.1em" }}>The Null Interval: The Photon Seam</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>The Photon as a Static Geometric Structure:</strong>
          </p>
          <p style={{ margin: "0.5em 0" }}>
            Point A (Emission) ←————— Null Geodesic ——————→ Point B (Absorption)
          </p>
          <p style={{ margin: "0.5em 0" }}>
            Lower-dimensional view: A particle traveling through time
          </p>
          <p style={{ margin: "0.5em 0" }}>
            Higher-dimensional view: A static seam connecting two spacetime events
          </p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic", marginTop: "1em" }}>
            Null Interval: Spacetime distance = 0
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
      aria-label="Animation showing the null interval concept where a photon exists as a static geometric seam connecting emission and absorption points with zero spacetime distance"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        The Null Interval: The Photon Seam. This animation visualizes the photon not as a particle
        moving through time, but as a static geometric structure that connects two points in
        spacetime like a seam. In our lower-dimensional perception, we see a particle traveling from
        emission (Point A) to absorption (Point B). From a higher-dimensional perspective, these two
        events are connected by a null geodesic, a permanent seam where the spacetime distance is
        zero. The grid pinches toward this seam, illustrating how distance collapses for photons.
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
          The Null Interval: The Photon Seam
        </text>

        {/* Spacetime grid - horizontal lines */}
        <line
          className="grid-line"
          x1="50"
          y1="60"
          x2="510"
          y2="60"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="50"
          y1="100"
          x2="510"
          y2="100"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="50"
          y1="140"
          x2="510"
          y2="140"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="50"
          y1="180"
          x2="510"
          y2="180"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="50"
          y1="220"
          x2="510"
          y2="220"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="50"
          y1="260"
          x2="510"
          y2="260"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />

        {/* Spacetime grid - vertical lines */}
        <line
          className="grid-line"
          x1="90"
          y1="50"
          x2="90"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="150"
          y1="50"
          x2="150"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="210"
          y1="50"
          x2="210"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="270"
          y1="50"
          x2="270"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="330"
          y1="50"
          x2="330"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="390"
          y1="50"
          x2="390"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />
        <line
          className="grid-line"
          x1="450"
          y1="50"
          x2="450"
          y2="270"
          stroke="rgba(150, 150, 150, 0.5)"
          strokeWidth="1"
        />

        {/* Particle path (dashed, showing the perceived journey) */}
        <path
          id="particle-path"
          d={`M${pointAX},${pointAY} Q280,150 ${pointBX},${pointBY}`}
          fill="none"
          stroke="rgba(100, 100, 100, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* The Seam (null geodesic - bold solid line) */}
        <line
          id="seam"
          x1={pointAX}
          y1={pointAY}
          x2={pointAX}
          y2={pointAY}
          stroke="rgba(20, 20, 20, 1)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Point A - Emission */}
        <circle
          id="point-a"
          cx={pointAX}
          cy={pointAY}
          r="8"
          fill="none"
          stroke="rgba(20, 20, 20, 1)"
          strokeWidth="2"
          opacity="0"
        />
        <text
          id="label-a"
          x={pointAX}
          y={pointAY + 25}
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          A: Emission
        </text>

        {/* Point B - Absorption */}
        <circle
          id="point-b"
          cx={pointBX}
          cy={pointBY}
          r="8"
          fill="none"
          stroke="rgba(20, 20, 20, 1)"
          strokeWidth="2"
          opacity="0"
        />
        <text
          id="label-b"
          x={pointBX}
          y={pointBY - 15}
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          B: Absorption
        </text>

        {/* The traveling particle (our perception) */}
        <circle
          id="particle"
          cx={pointAX}
          cy={pointAY}
          r="5"
          fill="none"
          stroke="rgba(50, 50, 50, 0.9)"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0"
        />

        {/* Labels for different perspectives */}
        <text
          id="lower-dim-label"
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Lower-dimensional view: Particle traveling through time
        </text>

        <text
          id="higher-dim-label"
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Higher-dimensional view: Static seam in spacetime
        </text>

        {/* Final null interval label */}
        <text
          id="null-interval-label"
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Null Interval: Spacetime distance = 0
        </text>

        {/* Axis indicators */}
        <text x="530" y="160" fill="rgba(0, 0, 0, 0.3)" fontSize="9" fontFamily="monospace">
          Space
        </text>
        <text
          x="30"
          y="50"
          fill="rgba(0, 0, 0, 0.3)"
          fontSize="9"
          fontFamily="monospace"
          transform="rotate(-90, 30, 50)"
        >
          Time
        </text>
      </svg>
    </figure>
  );
}
