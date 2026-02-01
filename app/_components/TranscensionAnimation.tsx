"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface TranscensionAnimationProps {
  isPDF?: boolean;
}

export default function TranscensionAnimation({ isPDF = false }: TranscensionAnimationProps) {
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
    const title = svg.querySelector("#title") as SVGTextElement;
    const grid3D = svg.querySelector("#grid-3d") as SVGGElement;
    const gridLabel = svg.querySelector("#grid-label") as SVGTextElement;
    const civilizationCluster = svg.querySelector("#civilization-cluster") as SVGGElement;
    const expansionRing = svg.querySelector("#expansion-ring") as SVGCircleElement;
    const expansionLabel = svg.querySelector("#expansion-label") as SVGGElement;
    const phiSymbol = svg.querySelector("#phi-symbol") as SVGTextElement;
    const transcendedManifold = svg.querySelector("#transcended-manifold") as SVGGElement;
    const gravityWells = svg.querySelector("#gravity-wells") as SVGGElement;
    const darkMatterLabel = svg.querySelector("#dark-matter-label") as SVGGElement;
    const bulkLabel = svg.querySelector("#bulk-label") as SVGTextElement;
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const fermiLabel = svg.querySelector("#fermi-label") as SVGTextElement;

    // Initial states
    gsap.set(title, { opacity: 0 });
    gsap.set(grid3D, { opacity: 0 });
    gsap.set(gridLabel, { opacity: 0 });
    gsap.set(civilizationCluster, { opacity: 0, scale: 0.3, transformOrigin: "center center" });
    gsap.set(expansionRing, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(expansionLabel, { opacity: 0 });
    gsap.set(phiSymbol, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(transcendedManifold, { opacity: 0, y: 50, scale: 0.5, transformOrigin: "center center" });
    gsap.set(gravityWells, { opacity: 0 });
    gsap.set(darkMatterLabel, { opacity: 0 });
    gsap.set(bulkLabel, { opacity: 0 });
    gsap.set(caption, { opacity: 0 });
    gsap.set(fermiLabel, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    timelineRef.current = tl;

    // Phase 1: Show title and 3D grid
    tl.add("start")
      .to(title, { opacity: 0.7, duration: 0.5 }, "start")
      .to(grid3D, { opacity: 1, duration: 0.8 }, "start+=0.3")
      .to(gridLabel, { opacity: 0.5, duration: 0.4 }, "start+=0.8");

    // Phase 2: Show civilization cluster and expansion
    tl.add("expand", "+=0.5")
      .to(civilizationCluster, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        ease: "back.out(1.5)" 
      }, "expand")
      .to(expansionRing, { 
        opacity: 0.6, 
        scale: 1, 
        duration: 1.5, 
        ease: "power1.out" 
      }, "expand+=0.3")
      .to(expansionLabel, { opacity: 0.6, duration: 0.4 }, "expand+=1");

    // Phase 3: Φ appears and transcension begins
    tl.add("transcend", "+=0.8")
      .to(phiSymbol, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      }, "transcend")
      // Fade out expansion ring and label
      .to([expansionRing, expansionLabel], { 
        opacity: 0, 
        duration: 0.5 
      }, "transcend+=0.5")
      // Civilization cluster rotates upward and fades
      .to(civilizationCluster, { 
        opacity: 0, 
        y: -40, 
        scale: 0.5, 
        duration: 1, 
        ease: "power2.in" 
      }, "transcend+=0.6")
      .to(phiSymbol, { 
        opacity: 0, 
        y: -50, 
        duration: 0.8, 
        ease: "power2.in" 
      }, "transcend+=0.8");

    // Phase 4: Transcended manifold appears in the bulk
    tl.add("manifold", "+=0.3")
      .to(transcendedManifold, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "manifold")
      .to(bulkLabel, { opacity: 0.5, duration: 0.4 }, "manifold+=0.5");

    // Phase 5: Gravity wells appear on the 3D plane
    tl.add("gravity", "+=0.4")
      .to(gravityWells, { 
        opacity: 0.7, 
        duration: 0.6 
      }, "gravity")
      .to(darkMatterLabel, { opacity: 0.6, duration: 0.4 }, "gravity+=0.4");

    // Phase 6: Show Fermi paradox label and caption
    tl.add("result", "+=0.5")
      .to(fermiLabel, { opacity: 0.6, duration: 0.4 }, "result")
      .to(caption, { opacity: 0.8, duration: 0.5 }, "result+=0.3");

    // Hold
    tl.to({}, { duration: 2.5 });

    // Reset
    tl.add("reset")
      .to(
        [title, grid3D, gridLabel, civilizationCluster, expansionRing, expansionLabel,
         phiSymbol, transcendedManifold, gravityWells, darkMatterLabel, bulkLabel,
         caption, fermiLabel],
        { opacity: 0, duration: 0.5 },
        "reset"
      )
      .set(civilizationCluster, { y: 0, scale: 0.3 })
      .set(phiSymbol, { y: 0, scale: 0 })
      .set(expansionRing, { scale: 0 })
      .set(transcendedManifold, { y: 50, scale: 0.5 });

    return () => {
      tl.kill();
    };
  }, [isPDF, prefersReducedMotion]);

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
          <em style={{ fontSize: "1.1em" }}>Geometric Rotation: The Transcension Hypothesis</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>3D Observable Universe:</strong> Flat grid plane
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Biological Expansion:</strong> Limited by speed of light (horizontal)
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Transcension:</strong> Φ rotates civilization orthogonally into higher-dimensional bulk
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Result:</strong> 3D plane appears silent (Fermi Paradox), but bulk contains structured information
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Ordered Dark Matter:</strong> The gravitational signature of post-baryonic systems that have achieved high informational integration.
          </p>
          <p style={{ margin: "1em 0", fontStyle: "italic" }}>
            Civilization has rotated out of the 3D shadow.
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
      aria-label="Animation showing how advanced civilizations may transcend into higher dimensions, leaving behind only gravitational signatures we observe as dark matter"
    >
      <figcaption className="sr-only">
        The Geometric Rotation animation illustrates the Transcension Hypothesis. A civilization
        cluster on a 3D grid first expands outward (limited by light speed), then rotates
        orthogonally into higher-dimensional space. The civilization fades from the 3D plane
        but appears as a complex manifold in the bulk above. Gravity wells appear on the grid
        below, representing dark matter - the gravitational signature of transcended civilizations.
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
          id="title"
          x="280"
          y="20"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Geometric Rotation: The Transcension Hypothesis
        </text>

        {/* 3D Grid (observable universe) - isometric perspective */}
        <g id="grid-3d" opacity="0">
          {/* Horizontal grid lines */}
          <line x1="140" y1="220" x2="420" y2="220" stroke="rgba(80, 80, 80, 0.4)" strokeWidth="1" />
          <line x1="160" y1="235" x2="400" y2="235" stroke="rgba(80, 80, 80, 0.3)" strokeWidth="1" />
          <line x1="180" y1="250" x2="380" y2="250" stroke="rgba(80, 80, 80, 0.2)" strokeWidth="1" />
          <line x1="120" y1="205" x2="440" y2="205" stroke="rgba(80, 80, 80, 0.5)" strokeWidth="1" />
          <line x1="100" y1="190" x2="460" y2="190" stroke="rgba(80, 80, 80, 0.6)" strokeWidth="1" />
          
          {/* Vertical grid lines (perspective) */}
          <line x1="200" y1="180" x2="200" y2="260" stroke="rgba(80, 80, 80, 0.3)" strokeWidth="1" />
          <line x1="280" y1="175" x2="280" y2="265" stroke="rgba(80, 80, 80, 0.4)" strokeWidth="1" />
          <line x1="360" y1="180" x2="360" y2="260" stroke="rgba(80, 80, 80, 0.3)" strokeWidth="1" />
          
          {/* Diagonal perspective lines */}
          <line x1="140" y1="175" x2="200" y2="260" stroke="rgba(80, 80, 80, 0.2)" strokeWidth="1" />
          <line x1="420" y1="175" x2="360" y2="260" stroke="rgba(80, 80, 80, 0.2)" strokeWidth="1" />
        </g>

        {/* Grid label */}
        <text
          id="grid-label"
          x="280"
          y="278"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="9"
          fontFamily="monospace"
          opacity="0"
        >
          3D OBSERVABLE UNIVERSE
        </text>

        {/* Civilization cluster (points on the grid) */}
        <g id="civilization-cluster" opacity="0">
          <circle cx="280" cy="205" r="3" fill="rgba(30, 30, 30, 0.9)" />
          <circle cx="270" cy="200" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle cx="290" cy="200" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle cx="275" cy="210" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle cx="285" cy="210" r="2" fill="rgba(50, 50, 50, 0.8)" />
          <circle cx="265" cy="205" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
          <circle cx="295" cy="205" r="1.5" fill="rgba(60, 60, 60, 0.7)" />
        </g>

        {/* Expansion ring (limited by light speed) */}
        <circle
          id="expansion-ring"
          cx="280"
          cy="205"
          r="50"
          fill="none"
          stroke="rgba(100, 100, 100, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* Expansion label */}
        <g id="expansion-label" opacity="0">
          <text
            x="345"
            y="175"
            textAnchor="start"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            Biological Expansion
          </text>
          <text
            x="345"
            y="185"
            textAnchor="start"
            fill="rgba(0, 0, 0, 0.4)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            (limited by c)
          </text>
        </g>

        {/* Φ Symbol (transcension trigger) */}
        <text
          id="phi-symbol"
          x="280"
          y="210"
          textAnchor="middle"
          fill="rgba(20, 20, 30, 1)"
          fontSize="16"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Φ
        </text>

        {/* Transcended manifold (in the bulk) */}
        <g id="transcended-manifold" opacity="0">
          {/* Complex geometric structure floating above */}
          <ellipse cx="280" cy="80" rx="60" ry="25" fill="none" stroke="rgba(30, 30, 30, 0.8)" strokeWidth="1.5" />
          <ellipse cx="280" cy="80" rx="40" ry="16" fill="none" stroke="rgba(40, 40, 40, 0.6)" strokeWidth="1" />
          <ellipse cx="280" cy="80" rx="20" ry="8" fill="none" stroke="rgba(50, 50, 50, 0.5)" strokeWidth="1" />
          
          {/* Vertical structure lines */}
          <line x1="250" y1="65" x2="250" y2="95" stroke="rgba(40, 40, 40, 0.5)" strokeWidth="1" />
          <line x1="280" y1="55" x2="280" y2="105" stroke="rgba(30, 30, 30, 0.6)" strokeWidth="1" />
          <line x1="310" y1="65" x2="310" y2="95" stroke="rgba(40, 40, 40, 0.5)" strokeWidth="1" />
          
          {/* Dense information points */}
          <circle cx="260" cy="75" r="2" fill="rgba(30, 30, 30, 0.8)" />
          <circle cx="280" cy="70" r="2.5" fill="rgba(20, 20, 20, 0.9)" />
          <circle cx="300" cy="75" r="2" fill="rgba(30, 30, 30, 0.8)" />
          <circle cx="270" cy="85" r="1.5" fill="rgba(40, 40, 40, 0.7)" />
          <circle cx="290" cy="85" r="1.5" fill="rgba(40, 40, 40, 0.7)" />
          
          {/* Φ in the manifold */}
          <text
            x="280"
            y="83"
            textAnchor="middle"
            fill="rgba(20, 20, 30, 0.9)"
            fontSize="10"
            fontFamily="serif"
            fontStyle="italic"
          >
            Φ
          </text>
        </g>

        {/* Bulk label */}
        <text
          id="bulk-label"
          x="380"
          y="80"
          textAnchor="start"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="8"
          fontFamily="monospace"
          opacity="0"
        >
          HIGHER-D BULK
        </text>

        {/* Gravity wells on the 3D plane (dark matter signature) */}
        <g id="gravity-wells" opacity="0">
          {/* Curved downward lines indicating gravitational pull */}
          <path
            d="M 240 205 Q 250 215 260 205"
            fill="none"
            stroke="rgba(60, 60, 60, 0.6)"
            strokeWidth="1"
          />
          <path
            d="M 260 205 Q 280 220 300 205"
            fill="none"
            stroke="rgba(50, 50, 50, 0.7)"
            strokeWidth="1.5"
          />
          <path
            d="M 300 205 Q 310 215 320 205"
            fill="none"
            stroke="rgba(60, 60, 60, 0.6)"
            strokeWidth="1"
          />
          
          {/* Vertical dashed lines connecting manifold to gravity wells */}
          <line
            x1="280"
            y1="105"
            x2="280"
            y2="190"
            stroke="rgba(80, 80, 80, 0.3)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <line
            x1="250"
            y1="95"
            x2="250"
            y2="205"
            stroke="rgba(80, 80, 80, 0.2)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <line
            x1="310"
            y1="95"
            x2="310"
            y2="205"
            stroke="rgba(80, 80, 80, 0.2)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        </g>

        {/* Dark matter label */}
        <g id="dark-matter-label" opacity="0">
          <text
            x="115"
            y="200"
            textAnchor="start"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            Gravitational
          </text>
          <text
            x="115"
            y="210"
            textAnchor="start"
            fill="rgba(0, 0, 0, 0.5)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            Anomalies
          </text>
          <text
            x="115"
            y="222"
            textAnchor="start"
            fill="rgba(0, 0, 0, 0.4)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            (Dark Matter)
          </text>
        </g>

        {/* Fermi Paradox label */}
        <text
          id="fermi-label"
          x="420"
          y="250"
          textAnchor="start"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="8"
          fontFamily="sans-serif"
          opacity="0"
        >
          3D plane: Silent
        </text>

        {/* Caption */}
        <text
          id="caption"
          x="280"
          y="300"
          textAnchor="middle"
          fill="rgba(30, 30, 50, 0.85)"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Civilization has rotated out of the 3D shadow.
        </text>
      </svg>
    </figure>
  );
}
