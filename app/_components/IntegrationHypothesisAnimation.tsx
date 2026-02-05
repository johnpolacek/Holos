"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface IntegrationHypothesisAnimationProps {
  isPDF?: boolean;
}

export default function IntegrationHypothesisAnimation({
  isPDF = false,
}: IntegrationHypothesisAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    if (isPDF || prefersReducedMotion) return;
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;

    // Get elements
    const grid = svg.querySelector("#grid") as SVGGElement;
    const habitatPatch = svg.querySelector("#habitatPatch") as SVGEllipseElement;
    const particlesEarly = svg.querySelector("#particlesEarly") as SVGGElement;
    const broadcastRings = Array.from(svg.querySelectorAll(".broadcast-ring"));
    const tetherLines = svg.querySelector("#tetherLines") as SVGGElement;
    const phiSymbol = svg.querySelector("#phiSymbol") as SVGTextElement;
    const core = svg.querySelector("#core") as SVGGElement;
    const beams = Array.from(svg.querySelectorAll(".beam"));
    const gravityWarp = svg.querySelector("#gravityWarp") as SVGGElement;
    const lensingArcs = svg.querySelector("#lensingArcs") as SVGGElement;
    const label = svg.querySelector("#label") as SVGTextElement;
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const particles = Array.from(svg.querySelectorAll(".particle"));

    // Initial states
    gsap.set(grid, { opacity: 0 });
    gsap.set(habitatPatch, { opacity: 0, scale: 0.3, transformOrigin: "center center" });
    gsap.set(particlesEarly, { opacity: 0 });
    gsap.set(broadcastRings, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(tetherLines, { opacity: 0 });
    gsap.set(phiSymbol, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(core, { opacity: 0, scale: 0.5, transformOrigin: "center center" });
    gsap.set(beams, { opacity: 0 });
    gsap.set(gravityWarp, { opacity: 0 });
    gsap.set(lensingArcs, { opacity: 0 });
    gsap.set(label, { opacity: 0 });
    gsap.set(caption, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });
    timelineRef.current = tl;

    // === SCENE 1: Early Phase (noisy, leaky, visible) ===
    tl.add("earlyPhase")
      .to(grid, { opacity: 0.8, duration: 0.6 }, "earlyPhase")
      .to(
        habitatPatch,
        {
          opacity: 0.4,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "earlyPhase+=0.3"
      )
      .to(particlesEarly, { opacity: 1, duration: 0.5 }, "earlyPhase+=0.8");

    // Animate particles chaotically
    particles.forEach((particle, i) => {
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 15;
      tl.to(
        particle,
        {
          x: randomX,
          y: randomY,
          duration: 0.8 + Math.random() * 0.5,
          repeat: 3,
          yoyo: true,
          ease: "sine.inOut",
        },
        `earlyPhase+=${0.8 + i * 0.1}`
      );
    });

    // Broadcast rings expanding
    tl.to(
      broadcastRings[0],
      {
        opacity: 0.5,
        scale: 1,
        duration: 1.5,
        ease: "power1.out",
      },
      "earlyPhase+=1"
    )
      .to(
        broadcastRings[1],
        {
          opacity: 0.4,
          scale: 1.3,
          duration: 1.8,
          ease: "power1.out",
        },
        "earlyPhase+=1.3"
      )
      .to(
        broadcastRings[2],
        {
          opacity: 0.3,
          scale: 1.6,
          duration: 2,
          ease: "power1.out",
        },
        "earlyPhase+=1.6"
      );

    // Show label
    tl.set(label, { textContent: "Early phase: high emission" }, "earlyPhase+=1.2").to(
      label,
      { opacity: 0.6, duration: 0.4 },
      "earlyPhase+=1.2"
    );

    // === SCENE 2: Expansion hits latency and loss ===
    tl.add("latency", "+=1")
      // Change label
      .to(label, { opacity: 0, duration: 0.3 }, "latency")
      .set(label, { textContent: "Scale increases, coordination costs rise" }, "latency+=0.3")
      .to(label, { opacity: 0.6, duration: 0.3 }, "latency+=0.3")
      // Habitat edge wobbles
      .to(
        habitatPatch,
        {
          scale: 1.15,
          duration: 0.6,
          ease: "power1.out",
        },
        "latency"
      )
      .to(
        habitatPatch,
        {
          scale: 1.08,
          duration: 0.4,
          ease: "power1.inOut",
        },
        "latency+=0.6"
      )
      // Tether lines appear and phase-shift
      .to(tetherLines, { opacity: 0.4, duration: 0.5 }, "latency+=0.3");

    // Animate tether line dash offset (lag effect)
    const tetherPaths = Array.from(svg.querySelectorAll(".tether-line"));
    tetherPaths.forEach((tether, i) => {
      tl.to(
        tether,
        {
          strokeDashoffset: -30,
          duration: 2,
          ease: "none",
        },
        `latency+=${0.5 + i * 0.2}`
      );
    });

    // Broadcast rings become noisy (wobble)
    broadcastRings.forEach((ring, i) => {
      tl.to(
        ring,
        {
          scale: 1.1 + i * 0.2 + (Math.random() - 0.5) * 0.1,
          opacity: 0.2,
          duration: 0.8,
          ease: "rough({ strength: 1, points: 10 })",
        },
        `latency+=${0.8 + i * 0.3}`
      );
    });

    // === SCENE 3: Integration threshold (phase change) ===
    tl.add("integrate", "+=1.5")
      // Change label
      .to(label, { opacity: 0, duration: 0.3 }, "integrate")
      // Φ symbol appears
      .to(
        phiSymbol,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "integrate+=0.2"
      )
      .set(label, { textContent: "Integration increases (Φ ≥ Φc)" }, "integrate+=0.5")
      .to(label, { opacity: 0.6, duration: 0.3 }, "integrate+=0.5")
      // Φ fades out after brief appearance
      .to(
        phiSymbol,
        {
          opacity: 0,
          duration: 0.6,
        },
        "integrate+=1.5"
      )
      // Stop expansion - begin contraction
      .to(
        habitatPatch,
        {
          scale: 0.6,
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.in",
        },
        "integrate+=0.8"
      )
      // Dampen chaotic motion
      .to(
        particles,
        {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "integrate+=1"
      )
      // Broadcast rings collapse inward
      .to(
        broadcastRings,
        {
          scale: 0.3,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        "integrate+=1"
      )
      // Tether lines fade
      .to(tetherLines, { opacity: 0, duration: 0.8 }, "integrate+=1.2");

    // === SCENE 4: Compaction (quiet maturity) ===
    tl.add("compact", "+=0.5")
      // Change label
      .to(label, { opacity: 0, duration: 0.3 }, "compact")
      .set(label, { textContent: "Quiet phase: low emission" }, "compact+=0.3")
      .to(label, { opacity: 0.6, duration: 0.3 }, "compact+=0.3")
      // Fade out early particles and habitat
      .to(
        [particlesEarly, habitatPatch],
        {
          opacity: 0,
          duration: 0.6,
        },
        "compact"
      )
      // Show compact core
      .to(
        core,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "compact+=0.3"
      );

    // Directional beams flash briefly (clearly visible)
    beams.forEach((beam, i) => {
      tl.to(
        beam,
        {
          opacity: 1,
          duration: 0.25,
        },
        `compact+=${1.5 + i * 0.8}`
      ).to(
        beam,
        {
          opacity: 0,
          duration: 0.2,
        },
        `compact+=${1.75 + i * 0.8}`
      );
    });

    // === SCENE 5: Two footprints (EM fades, gravity remains) ===
    tl.add("footprint", "+=1")
      // Change label
      .to(label, { opacity: 0, duration: 0.3 }, "footprint")
      .set(label, { textContent: "What remains: gravitational structure" }, "footprint+=0.3")
      .to(label, { opacity: 0.6, duration: 0.3 }, "footprint+=0.3")
      // Core fades further
      .to(
        core,
        {
          opacity: 0.25,
          duration: 1.5,
        },
        "footprint"
      )
      // Grid warps subtly
      .to(
        gravityWarp,
        {
          opacity: 0.7,
          duration: 1,
        },
        "footprint+=0.5"
      )
      // Lensing arcs appear and drift
      .to(
        lensingArcs,
        {
          opacity: 0.5,
          duration: 1.2,
        },
        "footprint+=0.8"
      );

    // Animate lensing arc drift
    const arcs = Array.from(svg.querySelectorAll(".lensing-arc"));
    arcs.forEach((arc, i) => {
      tl.to(
        arc,
        {
          x: (i % 2 === 0 ? 1 : -1) * 8,
          duration: 3,
          ease: "sine.inOut",
        },
        "footprint+=1"
      );
    });

    // === SCENE 6: Ending caption (the punchline) ===
    tl.add("ending", "+=2")
      // Fade out label
      .to(label, { opacity: 0, duration: 0.5 }, "ending")
      // Zoom out effect (scale down grid slightly)
      .to(
        grid,
        {
          scale: 0.95,
          transformOrigin: "center center",
          duration: 1,
        },
        "ending"
      )
      // Final caption appears
      .to(
        caption,
        {
          opacity: 0.9,
          duration: 0.8,
        },
        "ending+=0.5"
      );

    // Hold
    tl.to({}, { duration: 2.5 });

    // === RESET ===
    tl.add("reset")
      .to(
        [
          grid,
          habitatPatch,
          particlesEarly,
          ...broadcastRings,
          tetherLines,
          phiSymbol,
          core,
          ...beams,
          gravityWarp,
          lensingArcs,
          label,
          caption,
        ],
        { opacity: 0, duration: 0.6 },
        "reset"
      )
      .set(habitatPatch, { scale: 0.3 })
      .set(broadcastRings, { scale: 0 })
      .set(phiSymbol, { scale: 0 })
      .set(core, { scale: 0.5 })
      .set(grid, { scale: 1 })
      .set(particles, { x: 0, y: 0 })
      .set(arcs, { x: 0 })
      .set(tetherPaths, { strokeDashoffset: 0 });

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
          <em style={{ fontSize: "1.1em" }}>One Civilization, Two Footprints</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Early Phase:</strong> High emission, chaotic expansion, broadcast leakage
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Coordination Costs:</strong> Scale increases strain (light-speed constraint)
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Integration Threshold:</strong> Φ ≥ Φc triggers compaction
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Quiet Phase:</strong> Dense core, directed beams, low emission
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>What Remains:</strong> Gravitational structure (observable), EM silence
          </p>
          <p style={{ margin: "1em 0", fontStyle: "italic" }}>
            It did not disappear. It became quiet.
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
      aria-label="Animation showing how a single civilization evolves from a high-emission, sprawling early phase to a compact, integrated quiet phase. As integration increases, electromagnetic emissions collapse while gravitational structure remains detectable. The Fermi paradox is explained by visibility collapse through integration."
    >
      <figcaption className="sr-only">
        One Civilization, Two Footprints animation. A civilization on a grid plane starts in an
        early noisy phase with chaotic particles, expanding boundaries, and broadcast radiation
        rings. As scale increases, coordination costs rise (shown via lagging tether lines). When
        integration exceeds a threshold (Φ ≥ Φc), the system contracts into a compact core with
        suppressed emissions. Only rare directional beams appear. Finally, the electromagnetic
        signature fades, leaving only gravitational structure visible as warped grid lines and
        lensing arcs. The civilization did not disappear—it became quiet.
      </figcaption>
      <svg
        ref={svgRef}
        viewBox="0 0 560 315"
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <defs>
          {/* Gradient for habitat patch */}
          <radialGradient id="habitatGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(60, 60, 60, 0.4)" />
            <stop offset="70%" stopColor="rgba(40, 40, 40, 0.25)" />
            <stop offset="100%" stopColor="rgba(20, 20, 20, 0.08)" />
          </radialGradient>

          {/* Blur filter for soft patch */}
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/* Glow filter for core */}
          <filter id="coreGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Isometric Grid (spacetime / observable footprint) */}
        <g id="grid" opacity="0">
          {/* Horizontal grid lines - isometric perspective */}
          {Array.from({ length: 9 }, (_, i) => {
            const y = 160 + i * 18;
            const xOffset = i * 12;
            const alpha = Math.max(0.15, 0.4 - i * 0.03);
            return (
              <line
                key={`h-${i}`}
                x1={80 + xOffset}
                y1={y}
                x2={480 - xOffset}
                y2={y}
                stroke={`rgba(50, 50, 50, ${alpha})`}
                strokeWidth="0.5"
              />
            );
          })}

          {/* Vertical grid lines - converging perspective */}
          {Array.from({ length: 13 }, (_, i) => {
            const baseX = 120 + i * 30;
            const topY = 160;
            const bottomY = 300;
            const convergeFactor = (i - 6) * 3;
            return (
              <line
                key={`v-${i}`}
                x1={baseX}
                y1={topY}
                x2={baseX + convergeFactor}
                y2={bottomY}
                stroke="rgba(50, 50, 50, 0.25)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Subtle cross-hatch for depth */}
          <line
            x1="140"
            y1="160"
            x2="280"
            y2="280"
            stroke="rgba(40, 40, 40, 0.15)"
            strokeWidth="0.5"
          />
          <line
            x1="420"
            y1="160"
            x2="280"
            y2="280"
            stroke="rgba(40, 40, 40, 0.15)"
            strokeWidth="0.5"
          />
        </g>

        {/* Gravity Warp (warped grid lines) - shown late in animation */}
        <g id="gravityWarp" opacity="0">
          {/* Warped horizontal lines around core */}
          <path
            d="M 180 195 Q 230 200 280 210 Q 330 200 380 195"
            fill="none"
            stroke="rgba(40, 40, 40, 0.5)"
            strokeWidth="0.8"
          />
          <path
            d="M 190 210 Q 235 218 280 225 Q 325 218 370 210"
            fill="none"
            stroke="rgba(35, 35, 35, 0.4)"
            strokeWidth="0.8"
          />
          <path
            d="M 200 225 Q 240 235 280 240 Q 320 235 360 225"
            fill="none"
            stroke="rgba(30, 30, 30, 0.35)"
            strokeWidth="0.8"
          />
        </g>

        {/* Lensing Arcs */}
        <g id="lensingArcs" opacity="0">
          <path
            className="lensing-arc"
            d="M 240 175 Q 260 168 280 172 Q 300 168 320 175"
            fill="none"
            stroke="rgba(40, 40, 40, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            className="lensing-arc"
            d="M 250 255 Q 265 262 280 258 Q 295 262 310 255"
            fill="none"
            stroke="rgba(35, 35, 35, 0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <ellipse
            className="lensing-arc"
            cx="320"
            cy="210"
            rx="15"
            ry="8"
            fill="none"
            stroke="rgba(30, 30, 30, 0.3)"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          <ellipse
            className="lensing-arc"
            cx="240"
            cy="215"
            rx="12"
            ry="6"
            fill="none"
            stroke="rgba(30, 30, 30, 0.3)"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
        </g>

        {/* Habitat Patch (soft circular region) */}
        <ellipse
          id="habitatPatch"
          cx="280"
          cy="210"
          rx="90"
          ry="50"
          fill="url(#habitatGradient)"
          filter="url(#softBlur)"
          opacity="0"
        />

        {/* Early Phase Particles */}
        <g id="particlesEarly" opacity="0">
          {/* Central cluster */}
          <circle className="particle" cx="280" cy="210" r="3" fill="rgba(40, 40, 40, 0.9)" />
          <circle className="particle" cx="265" cy="205" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle className="particle" cx="295" cy="205" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle className="particle" cx="270" cy="218" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle className="particle" cx="290" cy="218" r="2" fill="rgba(50, 50, 50, 0.8)" />

          {/* Outer scattered particles */}
          <circle className="particle" cx="250" cy="200" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle className="particle" cx="310" cy="200" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle className="particle" cx="245" cy="215" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle className="particle" cx="315" cy="215" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle className="particle" cx="255" cy="225" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle className="particle" cx="305" cy="225" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle className="particle" cx="230" cy="210" r="1" fill="rgba(70, 70, 70, 0.6)" />
          <circle className="particle" cx="330" cy="210" r="1" fill="rgba(70, 70, 70, 0.6)" />
          <circle className="particle" cx="260" cy="195" r="1" fill="rgba(70, 70, 70, 0.6)" />
          <circle className="particle" cx="300" cy="195" r="1" fill="rgba(70, 70, 70, 0.6)" />

          {/* Radial ripples (waste heat + leakage) */}
          <circle
            cx="280"
            cy="210"
            r="25"
            fill="none"
            stroke="rgba(50, 50, 50, 0.25)"
            strokeWidth="1"
          />
          <circle
            cx="280"
            cy="210"
            r="40"
            fill="none"
            stroke="rgba(40, 40, 40, 0.2)"
            strokeWidth="0.8"
          />
        </g>

        {/* Broadcast Rings (expanding "to space" pulses) */}
        <ellipse
          className="broadcast-ring"
          cx="280"
          cy="210"
          rx="60"
          ry="35"
          fill="none"
          stroke="rgba(50, 50, 50, 0.5)"
          strokeWidth="1"
          strokeDasharray="5 4"
          opacity="0"
        />
        <ellipse
          className="broadcast-ring"
          cx="280"
          cy="210"
          rx="80"
          ry="45"
          fill="none"
          stroke="rgba(45, 45, 45, 0.4)"
          strokeWidth="0.8"
          strokeDasharray="5 4"
          opacity="0"
        />
        <ellipse
          className="broadcast-ring"
          cx="280"
          cy="210"
          rx="100"
          ry="55"
          fill="none"
          stroke="rgba(40, 40, 40, 0.3)"
          strokeWidth="0.6"
          strokeDasharray="5 4"
          opacity="0"
        />

        {/* Tether Lines (coordination links with lag) */}
        <g id="tetherLines" opacity="0">
          <line
            className="tether-line"
            x1="250"
            y1="200"
            x2="200"
            y2="190"
            stroke="rgba(50, 50, 50, 0.45)"
            strokeWidth="0.8"
            strokeDasharray="3 6"
          />
          <line
            className="tether-line"
            x1="310"
            y1="200"
            x2="360"
            y2="190"
            stroke="rgba(50, 50, 50, 0.45)"
            strokeWidth="0.8"
            strokeDasharray="3 6"
          />
          <line
            className="tether-line"
            x1="260"
            y1="225"
            x2="220"
            y2="245"
            stroke="rgba(50, 50, 50, 0.45)"
            strokeWidth="0.8"
            strokeDasharray="3 6"
          />
          <line
            className="tether-line"
            x1="300"
            y1="225"
            x2="340"
            y2="245"
            stroke="rgba(50, 50, 50, 0.45)"
            strokeWidth="0.8"
            strokeDasharray="3 6"
          />
        </g>

        {/* Φ Symbol (integration trigger) */}
        <text
          id="phiSymbol"
          x="280"
          y="215"
          textAnchor="middle"
          fill="rgba(30, 30, 30, 1)"
          fontSize="24"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Φ
        </text>

        {/* Compact Core (quiet maturity) */}
        <g id="core" opacity="0" filter="url(#coreGlow)">
          {/* Outer glow ring */}
          <ellipse
            cx="280"
            cy="210"
            rx="20"
            ry="12"
            fill="none"
            stroke="rgba(50, 50, 50, 0.25)"
            strokeWidth="1"
          />

          {/* Dense inner structure */}
          <ellipse cx="280" cy="210" rx="12" ry="7" fill="rgba(60, 60, 60, 0.35)" />
          <ellipse cx="280" cy="210" rx="8" ry="5" fill="rgba(45, 45, 45, 0.5)" />
          <ellipse cx="280" cy="210" rx="4" ry="2.5" fill="rgba(25, 25, 25, 0.85)" />

          {/* Ordered core particles */}
          <circle
            className="core-particle"
            cx="275"
            cy="208"
            r="1.2"
            fill="rgba(35, 35, 35, 0.9)"
          />
          <circle
            className="core-particle"
            cx="285"
            cy="208"
            r="1.2"
            fill="rgba(35, 35, 35, 0.9)"
          />
          <circle
            className="core-particle"
            cx="280"
            cy="213"
            r="1.2"
            fill="rgba(35, 35, 35, 0.9)"
          />
          <circle className="core-particle" cx="272" cy="211" r="1" fill="rgba(45, 45, 45, 0.8)" />
          <circle className="core-particle" cx="288" cy="211" r="1" fill="rgba(45, 45, 45, 0.8)" />
          <circle className="core-particle" cx="278" cy="206" r="1" fill="rgba(45, 45, 45, 0.8)" />
          <circle className="core-particle" cx="282" cy="206" r="1" fill="rgba(45, 45, 45, 0.8)" />
        </g>

        {/* Directional Beams (rare, narrow, targeted) */}
        <line
          className="beam"
          x1="290"
          y1="205"
          x2="400"
          y2="150"
          stroke="rgba(15, 15, 15, 0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0"
        />
        <line
          className="beam"
          x1="270"
          y1="205"
          x2="150"
          y2="140"
          stroke="rgba(15, 15, 15, 0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0"
        />
        <line
          className="beam"
          x1="285"
          y1="215"
          x2="420"
          y2="260"
          stroke="rgba(15, 15, 15, 0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Phase Label */}
        <text
          id="label"
          x="280"
          y="35"
          textAnchor="middle"
          fill="rgba(40, 40, 40, 0.85)"
          fontSize="12"
          fontFamily="sans-serif"
          opacity="0"
        >
          Early phase: high emission
        </text>

        {/* Final Caption */}
        <text
          id="caption"
          x="280"
          y="140"
          textAnchor="middle"
          fill="rgba(25, 25, 25, 0.95)"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          It did not disappear. It became quiet.
        </text>
      </svg>
    </figure>
  );
}
