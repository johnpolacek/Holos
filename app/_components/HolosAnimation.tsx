"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface HolosAnimationProps {
  isPDF?: boolean;
}

export default function HolosAnimation({ isPDF = false }: HolosAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [stateLabel, setStateLabel] = useState("s₀");
  const [cycleCount, setCycleCount] = useState(0);
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
    const centerX = 280;
    const centerY = 140;

    // Create particle elements
    const particleGroup = svg.querySelector("#particles") as SVGGElement;
    const centralNode = svg.querySelector("#central-node") as SVGCircleElement;
    const centralRing = svg.querySelector("#central-ring") as SVGCircleElement;
    const resultNode = svg.querySelector("#result-node") as SVGCircleElement;
    const resultRing = svg.querySelector("#result-ring") as SVGCircleElement;
    const operatorSymbol = svg.querySelector("#operator") as SVGTextElement;
    const creationLabel = svg.querySelector("#creation-label") as SVGTextElement;
    const observationLabel = svg.querySelector("#observation-label") as SVGTextElement;
    const phiSymbol = svg.querySelector("#phi-symbol") as SVGTextElement;

    // Generate particle positions (power set visualization)
    const particleCount = 24;
    const particles: SVGCircleElement[] = [];
    const paths: SVGPathElement[] = [];

    // Clear existing particles
    while (particleGroup.firstChild) {
      particleGroup.removeChild(particleGroup.firstChild);
    }

    // Create particles in a manifold pattern
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radiusVariation = 50 + Math.random() * 35;

      // Create path from center to particle
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const endX = centerX + Math.cos(angle) * radiusVariation;
      const endY = centerY + Math.sin(angle) * radiusVariation;
      const controlX =
        centerX + Math.cos(angle) * (radiusVariation * 0.5) + (Math.random() - 0.5) * 25;
      const controlY =
        centerY + Math.sin(angle) * (radiusVariation * 0.5) + (Math.random() - 0.5) * 25;

      path.setAttribute("d", `M${centerX},${centerY} Q${controlX},${controlY} ${endX},${endY}`);
      path.setAttribute("stroke", "rgba(120, 120, 120, 0.4)");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("stroke-dasharray", "2 2");
      path.setAttribute("fill", "none");
      path.setAttribute("opacity", "0");
      particleGroup.appendChild(path);
      paths.push(path);

      // Create particle (outline circle)
      const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      particle.setAttribute("cx", String(centerX));
      particle.setAttribute("cy", String(centerY));
      particle.setAttribute("r", String(3 + Math.random() * 2));
      particle.setAttribute("fill", "none");
      particle.setAttribute("stroke", "rgba(80, 80, 80, 0.6)");
      particle.setAttribute("stroke-width", "1");
      particle.setAttribute("opacity", "0");
      particle.dataset.targetX = String(endX);
      particle.dataset.targetY = String(endY);
      particle.dataset.angle = String(angle);
      particleGroup.appendChild(particle);
      particles.push(particle);
    }

    // Select one "chosen" particle
    const chosenIndex = Math.floor(Math.random() * particleCount);

    // Create main timeline
    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        setCycleCount((prev) => {
          const next = prev + 1;
          setStateLabel(`s${subscript(next)}`);
          return next;
        });
      },
    });

    // Phase 1: Initial state - central node with ring
    tl.set([centralNode, centralRing], { opacity: 1 })
      .set([resultNode, resultRing], { opacity: 0 })
      .set(operatorSymbol, { opacity: 0.3 })
      .set([creationLabel, observationLabel], { opacity: 0 })
      .set(phiSymbol, { opacity: 0 })
      .to(centralRing, {
        attr: { r: 16 },
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        centralRing,
        {
          attr: { r: 12 },
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.in",
        },
        "+=0.2"
      );

    // Phase 2: Creation - expand into manifold
    tl.add("creation")
      .to(
        creationLabel,
        {
          opacity: 1,
          duration: 0.3,
        },
        "creation"
      )
      .to(
        operatorSymbol,
        {
          opacity: 1,
          duration: 0.3,
        },
        "creation"
      )
      .to(
        centralNode,
        {
          attr: { r: 4 },
          opacity: 0.4,
          duration: 0.8,
          ease: "power2.out",
        },
        "creation"
      )
      .to(
        centralRing,
        {
          attr: { r: 22 },
          opacity: 0.2,
          duration: 0.8,
          ease: "power2.out",
        },
        "creation"
      );

    // Expand particles outward
    particles.forEach((particle, i) => {
      const targetX = Number(particle.dataset.targetX);
      const targetY = Number(particle.dataset.targetY);

      tl.to(
        particle,
        {
          attr: { cx: targetX, cy: targetY },
          opacity: 0.8,
          duration: 0.8,
          ease: "power2.out",
        },
        "creation+=0.1"
      );

      tl.to(
        paths[i],
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "creation+=0.2"
      );
    });

    // Hold the manifold state
    tl.to({}, { duration: 0.8 });

    // Phase 3: Observation - collapse to selected path
    tl.add("observation")
      .to(
        creationLabel,
        {
          opacity: 0,
          duration: 0.2,
        },
        "observation"
      )
      .to(
        observationLabel,
        {
          opacity: 1,
          duration: 0.3,
        },
        "observation"
      )
      .to(
        phiSymbol,
        {
          opacity: 0.7,
          duration: 0.3,
        },
        "observation+=0.2"
      );

    // Fade non-selected particles and highlight chosen one
    particles.forEach((particle, i) => {
      if (i === chosenIndex) {
        tl.to(
          particle,
          {
            attr: { r: 5 },
            stroke: "rgba(30, 30, 30, 1)",
            strokeWidth: 2,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "observation+=0.1"
        );
        tl.to(
          paths[i],
          {
            stroke: "rgba(50, 50, 50, 0.9)",
            strokeWidth: 1.5,
            strokeDasharray: "none",
            duration: 0.5,
            ease: "power2.out",
          },
          "observation+=0.1"
        );
      } else {
        tl.to(
          particle,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "observation+=0.1"
        );
        tl.to(
          paths[i],
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          "observation+=0.1"
        );
      }
    });

    // Hold observation state
    tl.to({}, { duration: 0.5 });

    // Phase 4: Collapse to new result state
    tl.add("collapse")
      .to(
        observationLabel,
        {
          opacity: 0,
          duration: 0.3,
        },
        "collapse"
      )
      .to(
        phiSymbol,
        {
          opacity: 0,
          duration: 0.3,
        },
        "collapse"
      )
      .to(
        operatorSymbol,
        {
          opacity: 0.3,
          duration: 0.3,
        },
        "collapse"
      );

    // Move chosen particle to result position and transform
    const chosenParticle = particles[chosenIndex];
    const chosenPath = paths[chosenIndex];

    tl.to(
      chosenParticle,
      {
        attr: { cx: centerX + 70, cy: centerY },
        duration: 0.6,
        ease: "power2.inOut",
      },
      "collapse"
    )
      .to(
        chosenPath,
        {
          opacity: 0,
          duration: 0.4,
        },
        "collapse"
      )
      .to(
        [resultNode, resultRing],
        {
          opacity: 1,
          duration: 0.4,
        },
        "collapse+=0.3"
      )
      .to(
        chosenParticle,
        {
          opacity: 0,
          duration: 0.3,
        },
        "collapse+=0.4"
      )
      .to(
        resultRing,
        {
          attr: { r: 16 },
          opacity: 0.8,
          duration: 0.4,
          ease: "power2.out",
        },
        "collapse+=0.5"
      )
      .to(
        resultRing,
        {
          attr: { r: 12 },
          opacity: 0.5,
          duration: 0.3,
        },
        "collapse+=0.9"
      );

    // Phase 5: Recursion - move result back to center
    tl.add("recursion")
      .to(
        [centralNode, centralRing],
        {
          opacity: 0,
          duration: 0.3,
        },
        "recursion"
      )
      .to(
        resultNode,
        {
          attr: { cx: centerX },
          duration: 0.8,
          ease: "power2.inOut",
        },
        "recursion+=0.2"
      )
      .to(
        resultRing,
        {
          attr: { cx: centerX },
          duration: 0.8,
          ease: "power2.inOut",
        },
        "recursion+=0.2"
      );

    // Reset particles for next cycle
    tl.add(() => {
      particles.forEach((particle) => {
        gsap.set(particle, {
          attr: { cx: centerX, cy: centerY, r: 3 + Math.random() * 2 },
          stroke: "rgba(80, 80, 80, 0.6)",
          strokeWidth: 1,
          opacity: 0,
        });
      });
      paths.forEach((path) => {
        gsap.set(path, {
          stroke: "rgba(120, 120, 120, 0.4)",
          strokeWidth: 1,
          strokeDasharray: "2 2",
          opacity: 0,
        });
      });
    });

    // Swap result back to central
    tl.set(centralNode, { attr: { cx: centerX, cy: centerY, r: 6 } })
      .set(centralRing, { attr: { cx: centerX, cy: centerY, r: 12 } })
      .to([centralNode, centralRing], { opacity: 1, duration: 0.01 })
      .to([resultNode, resultRing], { opacity: 0, duration: 0.01 })
      .set(resultNode, { attr: { cx: centerX + 70 } })
      .set(resultRing, { attr: { cx: centerX + 70 } });

    // Hold before next cycle
    tl.to({}, { duration: 0.5 });

    timelineRef.current = tl;

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
          <em style={{ fontSize: "1.1em" }}>R = C ⊛ O</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>The Holos Recursive Loop</strong>
          </p>
          <p style={{ margin: "0.5em 0" }}>Creation (C) generates a manifold of possibilities →</p>
          <p style={{ margin: "0.5em 0" }}>Observation (O) selects one path →</p>
          <p style={{ margin: "0.5em 0" }}>Result becomes input for next cycle</p>
          <p style={{ margin: "0.5em 0", fontStyle: "italic" }}>
            sₙ → sₙ₊₁ (recursive state transition)
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
      aria-label="Animation showing the Holos recursive loop equation R = C ⊛ O, where Creation generates possibilities and Observation selects one path"
    >
      {/* Screen reader description */}
      <figcaption className="sr-only">
        The Holos Recursive Loop: R = C ⊛ O. Creation (C) generates a manifold of possibilities from
        an initial state. Observation (O) selects one path, collapsing possibilities into a new
        realized state. The result becomes input for the next cycle, representing recursive state
        transitions from sₙ to sₙ₊₁.
      </figcaption>
      <svg
        ref={svgRef}
        viewBox="0 0 560 315"
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(0, 0, 0, 0.04)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="560" height="315" fill="url(#grid)" />

        {/* Equation display */}
        <text
          x="280"
          y="28"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
        >
          R = C ⊛ O
        </text>

        {/* Particle container */}
        <g id="particles" />

        {/* Central node (initial state) - outlined */}
        <circle
          id="central-ring"
          cx="280"
          cy="140"
          r="12"
          fill="none"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />
        <circle
          id="central-node"
          cx="280"
          cy="140"
          r="6"
          fill="none"
          stroke="rgba(50, 50, 50, 1)"
          strokeWidth="2"
          opacity="0"
        />

        {/* Result node (new state) - outlined */}
        <circle
          id="result-ring"
          cx="350"
          cy="140"
          r="12"
          fill="none"
          stroke="rgba(60, 60, 60, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />
        <circle
          id="result-node"
          cx="350"
          cy="140"
          r="6"
          fill="none"
          stroke="rgba(30, 30, 30, 1)"
          strokeWidth="2"
          opacity="0"
        />

        {/* Operator symbol */}
        <text
          id="operator"
          x="280"
          y="272"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.4)"
          fontSize="20"
          fontFamily="serif"
          opacity="0.3"
        >
          ⊛
        </text>

        {/* Phase labels */}
        <text
          id="creation-label"
          x="280"
          y="245"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="11"
          fontFamily="monospace"
          opacity="0"
        >
          Creation (C): manifold of possibilities
        </text>
        <text
          id="observation-label"
          x="280"
          y="245"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="11"
          fontFamily="monospace"
          opacity="0"
        >
          Observation (O): selection
        </text>

        {/* Phi symbol - plain, no effects */}
        <text
          id="phi-symbol"
          x="280"
          y="200"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="18"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Φ
        </text>

        {/* State label */}
        <text
          x="280"
          y="290"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
        >
          {stateLabel} → s{subscript(cycleCount + 1)}
        </text>
      </svg>
    </figure>
  );
}

// Helper to convert numbers to subscript
function subscript(n: number): string {
  const subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
  return String(n)
    .split("")
    .map((d) => subscripts[Number.parseInt(d, 10)])
    .join("");
}
