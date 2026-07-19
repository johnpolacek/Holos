"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface HolographicSingularityAnimationProps {
  isPDF?: boolean;
}

export default function HolographicSingularityAnimation({
  isPDF = false,
}: HolographicSingularityAnimationProps) {
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
    const singularity = svg.querySelector("#singularity") as SVGCircleElement;
    const singularityLabel = svg.querySelector("#singularity-label") as SVGTextElement;
    const eventHorizon = svg.querySelector("#event-horizon") as SVGCircleElement;
    const horizonLabel = svg.querySelector("#horizon-label") as SVGTextElement;
    const packets = Array.from(svg.querySelectorAll(".info-packet"));
    const bits = Array.from(svg.querySelectorAll(".horizon-bit"));
    const phiSymbol = svg.querySelector("#phi-symbol") as SVGTextElement;
    const phiLabel = svg.querySelector("#phi-label") as SVGTextElement;
    const scannerBeams = Array.from(svg.querySelectorAll(".scanner-beam"));
    const caption = svg.querySelector("#caption") as SVGTextElement;
    const reconstructionLines = Array.from(svg.querySelectorAll(".reconstruction-line"));
    const reconstructedShapes = Array.from(svg.querySelectorAll(".reconstructed-shape"));
    const reconstructionLabelGroup = svg.querySelector(
      "#reconstruction-label-group"
    ) as SVGGElement;

    // Initial states
    gsap.set(title, { opacity: 0 });
    gsap.set(singularity, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(singularityLabel, { opacity: 0 });
    gsap.set(eventHorizon, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(horizonLabel, { opacity: 0 });
    gsap.set(packets, { opacity: 0 });
    gsap.set(bits, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set([phiSymbol, phiLabel], { opacity: 0 });
    gsap.set(scannerBeams, { opacity: 0 });
    gsap.set(caption, { opacity: 0 });
    gsap.set(reconstructionLines, { opacity: 0 });
    gsap.set(reconstructedShapes, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(reconstructionLabelGroup, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    timelineRef.current = tl;

    // Phase 1: Show title and singularity
    tl.add("start")
      .to(title, { opacity: 0.7, duration: 0.5 }, "start")
      .to(
        singularity,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "start+=0.3"
      )
      .to(singularityLabel, { opacity: 0.6, duration: 0.4 }, "start+=0.6");

    // Phase 2: Draw event horizon
    tl.add("horizon", "+=0.3")
      .to(
        eventHorizon,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "horizon"
      )
      .to(horizonLabel, { opacity: 0.6, duration: 0.4 }, "horizon+=0.5");

    // Phase 3: Information packets appear and fall
    tl.add("infall", "+=0.5");

    // Animate each packet falling and flattening
    const packetData = [
      { packet: "#packet-1", bit: "#bit-1", delay: 0 },
      { packet: "#packet-2", bit: "#bit-2", delay: 0.4 },
      { packet: "#packet-3", bit: "#bit-3", delay: 0.8 },
      { packet: "#packet-4", bit: "#bit-4", delay: 1.2 },
    ];

    packetData.forEach(({ packet, bit, delay }) => {
      const packetEl = svg.querySelector(packet) as SVGGElement;
      const bitEl = svg.querySelector(bit) as SVGElement;

      if (packetEl && bitEl) {
        // Show packet
        tl.to(
          packetEl,
          {
            opacity: 1,
            duration: 0.3,
          },
          `infall+=${delay}`
        );

        // Move packet toward center
        tl.to(
          packetEl,
          {
            x: 0,
            y: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.in",
          },
          `infall+=${delay + 0.2}`
        );

        // Flatten packet (disappear) and show bit on horizon
        tl.to(
          packetEl,
          {
            opacity: 0,
            scale: 0,
            duration: 0.2,
          },
          `infall+=${delay + 1.1}`
        );

        tl.to(
          bitEl,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          `infall+=${delay + 1.2}`
        );
      }
    });

    // Phase 4: Show Φ observer
    tl.add("observer", "+=0.5")
      .to(phiSymbol, { opacity: 0.8, duration: 0.4 }, "observer")
      .to(phiLabel, { opacity: 0.5, duration: 0.3 }, "observer+=0.2");

    // Phase 5: Scanner beams
    tl.add("scan", "+=0.3").to(
      scannerBeams,
      {
        opacity: 0.5,
        duration: 0.5,
        stagger: 0.1,
      },
      "scan"
    );

    // Phase 6: Bits pulse and reconstruction happens
    tl.add("reconstruct", "+=0.3")
      // Pulse the bits
      .to(
        bits,
        {
          scale: 1.5,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        },
        "reconstruct"
      )
      .to(
        bits,
        {
          scale: 1,
          duration: 0.2,
          stagger: 0.1,
        },
        "reconstruct+=0.4"
      )
      // Show reconstruction lines
      .to(
        reconstructionLines,
        {
          opacity: 0.6,
          duration: 0.4,
          stagger: 0.1,
        },
        "reconstruct+=0.5"
      )
      // Show reconstructed shapes inside
      .to(
        reconstructedShapes,
        {
          opacity: 0.5,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        "reconstruct+=0.8"
      )
      // Show reconstruction label
      .to(
        reconstructionLabelGroup,
        {
          opacity: 0.7,
          duration: 0.4,
        },
        "reconstruct+=1.2"
      );

    // Phase 7: Show caption
    tl.add("caption", "+=0.3").to(caption, { opacity: 0.8, duration: 0.5 }, "caption");

    // Hold
    tl.to({}, { duration: 2.5 });

    // Reset
    tl.add("reset")
      .to(
        [
          title,
          singularity,
          singularityLabel,
          eventHorizon,
          horizonLabel,
          ...packets,
          ...bits,
          phiSymbol,
          phiLabel,
          ...scannerBeams,
          caption,
          ...reconstructionLines,
          ...reconstructedShapes,
          reconstructionLabelGroup,
        ],
        { opacity: 0, duration: 0.5 },
        "reset"
      )
      .set([singularity, eventHorizon], { scale: 0 })
      .set(bits, { scale: 0 })
      .set(reconstructedShapes, { scale: 0 })
      .set(packets, { x: 0, y: 0, scale: 1 });

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
          <em style={{ fontSize: "1.1em" }}>The Holographic Event Horizon</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Singularity:</strong> Wrapped Infinity (center point)
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Event Horizon:</strong> 2D boundary surface
          </p>
          <p style={{ margin: "0.5em 0" }}>
            3D information packets → Flattened to 2D bits on horizon
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Φ (Higher-Dimensional Observer):</strong> Reconstructs information from boundary
          </p>
          <p style={{ margin: "1em 0", fontStyle: "italic" }}>
            Information is preserved, not lost.
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
      aria-label="Animation showing how 3D information falling into a black hole is preserved on the 2D event horizon surface and can be reconstructed by a higher-dimensional observer, demonstrating the Holographic Principle"
    >
      <figcaption className="sr-only">
        The Holographic Event Horizon animation shows a black hole with a singularity at the center
        and an event horizon circle around it. 3D information packets (cubes and spheres) fall
        toward the singularity but are flattened into 2D bits that attach to the event horizon
        surface. A Φ symbol represents a higher-dimensional observer who scans the horizon, causing
        the bits to pulse and project inward, revealing ghostly reconstructions of the original
        shapes inside the circle.
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
          y="22"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          The Holographic Event Horizon
        </text>

        {/* Event Horizon circle */}
        <circle
          id="event-horizon"
          cx="280"
          cy="165"
          r="100"
          fill="none"
          stroke="rgba(30, 30, 30, 0.9)"
          strokeWidth="2.5"
          opacity="0"
        />

        {/* Horizon label */}
        <text
          id="horizon-label"
          x="280"
          y="285"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="9"
          fontFamily="monospace"
          opacity="0"
        >
          2D EVENT HORIZON
        </text>

        {/* Singularity point */}
        <circle
          id="singularity"
          cx="280"
          cy="165"
          r="8"
          fill="rgba(10, 10, 10, 1)"
          stroke="rgba(30, 30, 30, 1)"
          strokeWidth="2"
          opacity="0"
        />

        {/* Singularity label */}
        <text
          id="singularity-label"
          x="280"
          y="185"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="8"
          fontFamily="sans-serif"
          opacity="0"
        >
          Singularity: Wrapped ∞
        </text>

        {/* Information Packets (3D shapes falling in) */}
        {/* Packet 1 - cube from top-left */}
        <g id="packet-1" className="info-packet" transform="translate(-120, -80)" opacity="0">
          <rect
            x="270"
            y="155"
            width="20"
            height="20"
            fill="none"
            stroke="rgba(60, 60, 60, 0.8)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <line
            x1="275"
            y1="160"
            x2="285"
            y2="150"
            stroke="rgba(60, 60, 60, 0.6)"
            strokeWidth="1"
          />
          <line
            x1="285"
            y1="160"
            x2="295"
            y2="150"
            stroke="rgba(60, 60, 60, 0.6)"
            strokeWidth="1"
          />
        </g>

        {/* Packet 2 - sphere from top-right */}
        <g id="packet-2" className="info-packet" transform="translate(120, -80)" opacity="0">
          <circle
            cx="280"
            cy="165"
            r="12"
            fill="none"
            stroke="rgba(60, 60, 60, 0.8)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        </g>

        {/* Packet 3 - cube from bottom-left */}
        <g id="packet-3" className="info-packet" transform="translate(-120, 80)" opacity="0">
          <rect
            x="270"
            y="155"
            width="20"
            height="20"
            fill="none"
            stroke="rgba(60, 60, 60, 0.8)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        </g>

        {/* Packet 4 - sphere from bottom-right */}
        <g id="packet-4" className="info-packet" transform="translate(120, 80)" opacity="0">
          <circle
            cx="280"
            cy="165"
            r="10"
            fill="none"
            stroke="rgba(60, 60, 60, 0.8)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        </g>

        {/* Horizon bits (flattened 2D information) - positioned on the circle */}
        <rect
          id="bit-1"
          className="horizon-bit"
          x="205"
          y="95"
          width="10"
          height="5"
          fill="rgba(20, 20, 20, 1)"
          transform="rotate(-45, 210, 97)"
          opacity="0"
        />
        <rect
          id="bit-2"
          className="horizon-bit"
          x="345"
          y="95"
          width="10"
          height="5"
          fill="rgba(20, 20, 20, 1)"
          transform="rotate(45, 350, 97)"
          opacity="0"
        />
        <rect
          id="bit-3"
          className="horizon-bit"
          x="205"
          y="228"
          width="10"
          height="5"
          fill="rgba(20, 20, 20, 1)"
          transform="rotate(45, 210, 230)"
          opacity="0"
        />
        <rect
          id="bit-4"
          className="horizon-bit"
          x="345"
          y="228"
          width="10"
          height="5"
          fill="rgba(20, 20, 20, 1)"
          transform="rotate(-45, 350, 230)"
          opacity="0"
        />

        {/* Reconstruction lines from bits to inner shapes */}
        <line
          className="reconstruction-line"
          x1="210"
          y1="97"
          x2="240"
          y2="130"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />
        <line
          className="reconstruction-line"
          x1="350"
          y1="97"
          x2="320"
          y2="130"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />
        <line
          className="reconstruction-line"
          x1="210"
          y1="230"
          x2="240"
          y2="200"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />
        <line
          className="reconstruction-line"
          x1="350"
          y1="230"
          x2="320"
          y2="200"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0"
        />

        {/* Reconstructed shapes inside the horizon (ghostly versions) */}
        {/* Reconstructed cube 1 - top left inside */}
        <g className="reconstructed-shape" opacity="0">
          <rect
            x="230"
            y="120"
            width="16"
            height="16"
            fill="none"
            stroke="rgba(60, 60, 60, 0.4)"
            strokeWidth="1"
          />
          <line
            x1="233"
            y1="123"
            x2="240"
            y2="116"
            stroke="rgba(60, 60, 60, 0.3)"
            strokeWidth="0.5"
          />
          <line
            x1="240"
            y1="123"
            x2="247"
            y2="116"
            stroke="rgba(60, 60, 60, 0.3)"
            strokeWidth="0.5"
          />
        </g>

        {/* Reconstructed sphere 2 - top right inside */}
        <circle
          className="reconstructed-shape"
          cx="320"
          cy="128"
          r="10"
          fill="none"
          stroke="rgba(60, 60, 60, 0.4)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Reconstructed cube 3 - bottom left inside */}
        <rect
          className="reconstructed-shape"
          x="230"
          y="190"
          width="16"
          height="16"
          fill="none"
          stroke="rgba(60, 60, 60, 0.4)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Reconstructed sphere 4 - bottom right inside */}
        <circle
          className="reconstructed-shape"
          cx="320"
          cy="198"
          r="8"
          fill="none"
          stroke="rgba(60, 60, 60, 0.4)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Reconstruction label */}
        <g id="reconstruction-label-group" opacity="0">
          <text
            x="100"
            y="165"
            textAnchor="middle"
            fill="rgba(50, 50, 60, 0.8)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            Information
          </text>
          <text
            x="100"
            y="178"
            textAnchor="middle"
            fill="rgba(50, 50, 60, 0.8)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            reconstructed
          </text>
        </g>

        {/* Φ Symbol (Higher-Dimensional Observer) */}
        <text
          id="phi-symbol"
          x="480"
          y="165"
          textAnchor="middle"
          fill="rgba(30, 30, 40, 1)"
          fontSize="24"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Φ
        </text>
        <text
          id="phi-label"
          x="480"
          y="185"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="8"
          fontFamily="sans-serif"
          opacity="0"
        >
          Higher-D Observer
        </text>

        {/* Scanner beams from Φ through horizon */}
        <line
          className="scanner-beam"
          x1="460"
          y1="150"
          x2="380"
          y2="130"
          stroke="rgba(100, 100, 100, 0.4)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <line
          className="scanner-beam"
          x1="460"
          y1="165"
          x2="380"
          y2="165"
          stroke="rgba(100, 100, 100, 0.4)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />
        <line
          className="scanner-beam"
          x1="460"
          y1="180"
          x2="380"
          y2="200"
          stroke="rgba(100, 100, 100, 0.4)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0"
        />

        {/* Caption */}
        <text
          id="caption"
          x="280"
          y="305"
          textAnchor="middle"
          fill="rgba(30, 30, 50, 0.85)"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Information is preserved, not lost.
        </text>
      </svg>
    </figure>
  );
}
