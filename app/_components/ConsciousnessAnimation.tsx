"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { seededRandom } from "@/lib/seeded-random";

interface ConsciousnessAnimationProps {
  isPDF?: boolean;
}

export default function ConsciousnessAnimation({ isPDF = false }: ConsciousnessAnimationProps) {
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
    const seaCircles = svg.querySelectorAll(".sea-circle") as NodeListOf<SVGCircleElement>;
    const clusterCircles = svg.querySelectorAll(".cluster-circle") as NodeListOf<SVGCircleElement>;
    const connectionLines = svg.querySelectorAll(".connection-line") as NodeListOf<SVGLineElement>;
    const phiSymbol = svg.querySelector("#phi-symbol") as SVGTextElement;
    const realizedShape = svg.querySelector("#realized-shape") as SVGPathElement;
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const feedbackRing = svg.querySelector("#feedback-ring") as SVGCircleElement;
    const phiLabel = svg.querySelector("#phi-label") as SVGTextElement;
    const universeGrid = svg.querySelectorAll(".universe-point") as NodeListOf<SVGCircleElement>;

    // Center position
    const centerX = 280;
    const centerY = 145;

    // Initial state
    gsap.set(seaCircles, { opacity: 0 });
    gsap.set(clusterCircles, { opacity: 0 });
    gsap.set(connectionLines, { opacity: 0, strokeDashoffset: 100 });
    gsap.set(phiSymbol, { opacity: 0 });
    gsap.set(realizedShape, { opacity: 0, scale: 0.5, transformOrigin: "center center" });
    gsap.set(caption, { opacity: 0 });
    gsap.set(feedbackRing, { opacity: 0, scale: 0.5, transformOrigin: "center center" });
    gsap.set(phiLabel, { opacity: 0 });
    gsap.set(universeGrid, { opacity: 0.15 });

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    timelineRef.current = tl;

    // Phase 1: Fundamental Capacity - sea of dashed circles pulsing
    tl.add("capacity").to(
      seaCircles,
      {
        opacity: 0.5,
        duration: 0.8,
        stagger: {
          each: 0.03,
          from: "random",
        },
      },
      "capacity"
    );

    // Random pulsing of sea circles
    seaCircles.forEach((circle, i) => {
      tl.to(
        circle,
        {
          scale: 1 + Math.random() * 0.3,
          opacity: 0.2 + Math.random() * 0.3,
          duration: 0.3 + Math.random() * 0.3,
          repeat: 3,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center center",
        },
        `capacity+=${0.5 + i * 0.05}`
      );
    });

    // Hold capacity state
    tl.to({}, { duration: 1 });

    // Phase 2: Integration - cluster forms
    tl.add("integration").to(
      clusterCircles,
      {
        opacity: 0.8,
        duration: 0.5,
        stagger: 0.05,
      },
      "integration"
    );

    // Move cluster circles toward center
    clusterCircles.forEach((circle) => {
      const currentX = Number(circle.getAttribute("cx"));
      const currentY = Number(circle.getAttribute("cy"));
      const targetX = centerX + (currentX - centerX) * 0.4;
      const targetY = centerY + (currentY - centerY) * 0.4;

      tl.to(
        circle,
        {
          attr: { cx: targetX, cy: targetY },
          duration: 1,
          ease: "power2.inOut",
        },
        "integration+=0.3"
      );
    });

    // Connection lines appear
    tl.to(
      connectionLines,
      {
        opacity: 0.6,
        duration: 0.5,
        stagger: 0.1,
      },
      "integration+=0.8"
    );

    // Phi symbol appears
    tl.to(
      phiSymbol,
      {
        opacity: 1,
        duration: 0.4,
      },
      "integration+=1"
    );

    // Phi label
    tl.to(
      phiLabel,
      {
        opacity: 0.6,
        duration: 0.3,
      },
      "integration+=1.2"
    );

    // Connection lines "circulate" - animate stroke dash
    tl.to(
      connectionLines,
      {
        strokeDashoffset: -100,
        duration: 2,
        ease: "linear",
        repeat: 2,
      },
      "integration+=1"
    );

    // Phase 3: Realization - threshold crossed
    tl.add("realization")
      .to(
        seaCircles,
        {
          opacity: 0.08,
          duration: 0.8,
        },
        "realization"
      )
      .to(
        clusterCircles,
        {
          opacity: 0,
          duration: 0.3,
        },
        "realization+=0.3"
      )
      .to(
        connectionLines,
        {
          opacity: 0,
          duration: 0.3,
        },
        "realization+=0.3"
      )
      .to(
        realizedShape,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        "realization+=0.5"
      )
      .to(
        caption,
        {
          opacity: 0.7,
          duration: 0.5,
        },
        "realization+=0.8"
      );

    // Phase 4: Feedback - universe responds
    tl.add("feedback")
      .to(
        feedbackRing,
        {
          opacity: 0.4,
          scale: 3,
          duration: 0.8,
          ease: "power2.out",
        },
        "feedback"
      )
      .to(
        feedbackRing,
        {
          opacity: 0,
          scale: 5,
          duration: 0.6,
          ease: "power2.out",
        },
        "feedback+=0.6"
      )
      .to(
        universeGrid,
        {
          opacity: 0.5,
          duration: 0.3,
        },
        "feedback+=0.3"
      )
      .to(
        universeGrid,
        {
          opacity: 0.15,
          duration: 0.5,
        },
        "feedback+=0.8"
      );

    // Hold realized state
    tl.to({}, { duration: 2 });

    // Reset
    tl.add("reset")
      .to(
        [realizedShape, caption, phiSymbol, phiLabel],
        {
          opacity: 0,
          duration: 0.5,
        },
        "reset"
      )
      .to(
        seaCircles,
        {
          opacity: 0,
          duration: 0.3,
        },
        "reset"
      )
      .add(() => {
        // Reset cluster positions
        clusterCircles.forEach((circle) => {
          const origX = circle.dataset.origX;
          const origY = circle.dataset.origY;
          if (origX && origY) {
            gsap.set(circle, { attr: { cx: origX, cy: origY } });
          }
        });
        gsap.set(realizedShape, { scale: 0.5 });
        gsap.set(feedbackRing, { scale: 0.5 });
        gsap.set(connectionLines, { strokeDashoffset: 100 });
      });

    return () => {
      tl.kill();
    };
  }, [isPDF, prefersReducedMotion]);

  // Seeded so server and client render the same coordinates
  const rand = seededRandom(0xc047c105);

  // Generate sea of circles
  const seaCircles: Array<{ x: number; y: number; r: number; key: string }> = [];
  for (let i = 0; i < 40; i++) {
    const x = 50 + rand() * 460;
    const y = 60 + rand() * 180;
    const r = 4 + rand() * 6;
    seaCircles.push({ x, y, r, key: `sea-${i}` });
  }

  // Generate cluster circles (around center)
  const centerX = 280;
  const centerY = 145;
  const clusterCircles: Array<{ x: number; y: number; origX: number; origY: number; key: string }> =
    [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 35 + rand() * 20;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    clusterCircles.push({ x, y, origX: x, origY: y, key: `cluster-${i}` });
  }

  // Generate universe grid points
  const universePoints: Array<{ x: number; y: number; key: string }> = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 14; col++) {
      universePoints.push({
        x: 50 + col * 35,
        y: 50 + row * 30,
        key: `grid-${row}-${col}`,
      });
    }
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
          <em style={{ fontSize: "1.1em" }}>
            Consciousness: Fundamental in Capacity, Emergent in Complexity
          </em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            Intrinsic Capacity (disorganized) → Integration (Φ ≥ Φc) → Realized Event
          </p>
          <p style={{ margin: "0.5em 0" }}>
            Like electromagnetism organized into a circuit, consciousness emerges through
            integration.
          </p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic" }}>
            Intrinsic capacity scales into self-awareness through integration
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
      aria-label="Animation showing consciousness emerging through integration of fundamental capacity"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        Consciousness: Fundamental in Capacity, Emergent in Complexity. This animation shows how
        disorganized intrinsic capacity (represented by pulsing dashed circles) becomes organized
        through integration. As circles cluster and connect, they cross the integration threshold (Φ
        ≥ Φc) where the Phi symbol appears. The cluster then snaps into a realized shape,
        demonstrating how consciousness emerges not as a separate substance but as a specific
        organization of the existing field.
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
          Consciousness: Fundamental in Capacity, Emergent in Complexity
        </text>

        {/* Universe grid (background field) */}
        {universePoints.map((point) => (
          <circle
            key={point.key}
            className="universe-point"
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill="rgba(0, 0, 0, 0.15)"
          />
        ))}

        {/* Sea of dashed circles (intrinsic capacity) */}
        {seaCircles.map((circle) => (
          <circle
            key={circle.key}
            className="sea-circle"
            cx={circle.x}
            cy={circle.y}
            r={circle.r}
            fill="none"
            stroke="rgba(120, 120, 120, 0.5)"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0"
          />
        ))}

        {/* Connection lines between cluster circles */}
        {clusterCircles.map((circle, i) => {
          const next = clusterCircles[(i + 1) % clusterCircles.length];
          const toCenter = i % 2 === 0;
          return (
            <line
              key={`line-${i}`}
              className="connection-line"
              x1={circle.x}
              y1={circle.y}
              x2={toCenter ? centerX : next.x}
              y2={toCenter ? centerY : next.y}
              stroke="rgba(60, 60, 60, 0.7)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0"
            />
          );
        })}

        {/* Cluster circles (integration) */}
        {clusterCircles.map((circle) => (
          <circle
            key={circle.key}
            className="cluster-circle"
            cx={circle.x}
            cy={circle.y}
            r="6"
            fill="none"
            stroke="rgba(50, 50, 50, 0.8)"
            strokeWidth="2"
            data-orig-x={circle.origX}
            data-orig-y={circle.origY}
            opacity="0"
          />
        ))}

        {/* Phi symbol (integration threshold) */}
        <text
          id="phi-symbol"
          x={centerX}
          y={centerY + 6}
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.8)"
          fontSize="22"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Φ
        </text>

        {/* Phi threshold label */}
        <text
          id="phi-label"
          x={centerX}
          y={centerY + 55}
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0"
        >
          Φ ≥ Φc (Integration Threshold)
        </text>

        {/* Realized shape (complex integrated form) */}
        <path
          id="realized-shape"
          d={`M${centerX},${centerY - 25} 
              L${centerX + 22},${centerY - 8} 
              L${centerX + 22},${centerY + 12} 
              L${centerX},${centerY + 25} 
              L${centerX - 22},${centerY + 12} 
              L${centerX - 22},${centerY - 8} Z`}
          fill="none"
          stroke="rgba(20, 20, 20, 1)"
          strokeWidth="3"
          strokeLinejoin="round"
          opacity="0"
        />

        {/* Feedback ring */}
        <circle
          id="feedback-ring"
          cx={centerX}
          cy={centerY}
          r="30"
          fill="none"
          stroke="rgba(0, 0, 0, 0.3)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Caption */}
        <text
          id="caption"
          x="280"
          y="275"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Mechanism → Realized Event
        </text>

        {/* Bottom label */}
        <text
          x="280"
          y="295"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.4)"
          fontSize="10"
          fontFamily="monospace"
        >
          Intrinsic capacity scales into self-awareness through integration
        </text>
      </svg>
    </figure>
  );
}
