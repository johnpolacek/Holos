"use client";

import { useRef } from "react";

interface InfiniteWrapAnimationProps {
  isPDF?: boolean;
}

export default function InfiniteWrapAnimation({ isPDF = false }: InfiniteWrapAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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
          <em style={{ fontSize: "1.1em" }}>Encapsulating Infinity: Two Perspectives</em>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            color: "rgba(0,0,0,0.7)",
            fontSize: "0.9em",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0.5em 0", fontWeight: "bold" }}>3D Perspective</p>
            <p style={{ margin: "0.5em 0" }}>Grid extends infinitely</p>
            <p style={{ margin: "0.5em 0" }}>→ ∞ in all directions</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0.5em 0", fontWeight: "bold" }}>Higher-Dimensional View</p>
            <p style={{ margin: "0.5em 0" }}>Grid wrapped into sphere</p>
            <p style={{ margin: "0.5em 0" }}>Point at Infinity</p>
          </div>
        </div>
        <p style={{ textAlign: "center", margin: "1em 0", fontStyle: "italic" }}>
          Infinite space in 3D = Finite structure from higher dimension
        </p>
      </div>
    );
  }

  return (
    <figure
      ref={containerRef}
      className="relative w-full mt-8 aspect-video rounded-lg border border-black/10 overflow-hidden bg-white opacity-80"
      role="img"
      aria-label="Side-by-side comparison showing how an infinite grid in 3D perspective becomes a finite sphere when viewed from a higher dimension, with all infinite directions meeting at a single Point at Infinity"
    >
      <figcaption className="sr-only">
        This graphic shows two perspectives side by side. On the left, a grid extends infinitely in
        all directions from our 3D perspective. On the right, the same grid is shown wrapped into a
        sphere from a higher-dimensional viewpoint, where all the infinite directions converge at a
        single Point at Infinity.
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
          y="22"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
        >
          Encapsulating Infinity: Two Perspectives
        </text>

        {/* Divider line */}
        <line
          x1="280"
          y1="35"
          x2="280"
          y2="285"
          stroke="rgba(0, 0, 0, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />

        {/* Left side label */}
        <text
          x="140"
          y="45"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="10"
          fontFamily="monospace"
        >
          3D PERSPECTIVE
        </text>

        {/* Right side label */}
        <text
          x="420"
          y="45"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="10"
          fontFamily="monospace"
        >
          HIGHER-DIMENSIONAL VIEW
        </text>

        {/* === LEFT SIDE: Infinite Grid === */}
        <g>
          {/* Perspective grid lines - horizontal */}
          <line x1="20" y1="120" x2="260" y2="120" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
          <line x1="20" y1="150" x2="260" y2="150" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
          <line x1="20" y1="180" x2="260" y2="180" stroke="rgba(80,80,80,0.6)" strokeWidth="1.5" />
          <line x1="20" y1="210" x2="260" y2="210" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
          <line x1="20" y1="240" x2="260" y2="240" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />

          {/* Perspective grid lines - vertical */}
          <line x1="60" y1="80" x2="60" y2="270" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
          <line x1="100" y1="80" x2="100" y2="270" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
          <line x1="140" y1="80" x2="140" y2="270" stroke="rgba(80,80,80,0.6)" strokeWidth="1.5" />
          <line x1="180" y1="80" x2="180" y2="270" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
          <line x1="220" y1="80" x2="220" y2="270" stroke="rgba(80,80,80,0.5)" strokeWidth="1" />
        </g>

        {/* Infinity arrows pointing outward */}
        <path
          d="M 25,180 L 10,180 M 15,175 L 10,180 L 15,185"
          fill="none"
          stroke="rgba(60,60,60,0.7)"
          strokeWidth="1.5"
        />
        <path
          d="M 255,180 L 270,180 M 265,175 L 270,180 L 265,185"
          fill="none"
          stroke="rgba(60,60,60,0.7)"
          strokeWidth="1.5"
        />
        <path
          d="M 140,85 L 140,70 M 135,75 L 140,70 L 145,75"
          fill="none"
          stroke="rgba(60,60,60,0.7)"
          strokeWidth="1.5"
        />
        <path
          d="M 140,265 L 140,280 M 135,275 L 140,280 L 145,275"
          fill="none"
          stroke="rgba(60,60,60,0.7)"
          strokeWidth="1.5"
        />

        {/* Infinity labels */}
        <text x="8" y="195" fill="rgba(0,0,0,0.5)" fontSize="12" fontFamily="serif">
          ∞
        </text>
        <text x="262" y="195" fill="rgba(0,0,0,0.5)" fontSize="12" fontFamily="serif">
          ∞
        </text>
        <text x="133" y="65" fill="rgba(0,0,0,0.5)" fontSize="12" fontFamily="serif">
          ∞
        </text>
        <text x="133" y="295" fill="rgba(0,0,0,0.5)" fontSize="12" fontFamily="serif">
          ∞
        </text>

        {/* === RIGHT SIDE: Wrapped Sphere === */}
        <g>
          {/* Sphere outline */}
          <circle
            cx="420"
            cy="165"
            r="85"
            fill="none"
            stroke="rgba(40, 40, 40, 0.8)"
            strokeWidth="2"
          />

          {/* Grid lines on sphere - horizontal (latitude) */}
          <ellipse
            cx="420"
            cy="115"
            rx="75"
            ry="15"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
          <ellipse
            cx="420"
            cy="140"
            rx="82"
            ry="20"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
          <ellipse
            cx="420"
            cy="165"
            rx="85"
            ry="22"
            fill="none"
            stroke="rgba(80,80,80,0.5)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="420"
            cy="190"
            rx="82"
            ry="20"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
          <ellipse
            cx="420"
            cy="215"
            rx="75"
            ry="15"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />

          {/* Grid lines on sphere - vertical (longitude) */}
          <path
            d="M 420,80 Q 350,165 420,250"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
          <path
            d="M 420,80 Q 380,165 420,250"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
          <line x1="420" y1="80" x2="420" y2="250" stroke="rgba(80,80,80,0.5)" strokeWidth="1.5" />
          <path
            d="M 420,80 Q 460,165 420,250"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
          <path
            d="M 420,80 Q 490,165 420,250"
            fill="none"
            stroke="rgba(80,80,80,0.4)"
            strokeWidth="1"
          />
        </g>

        {/* Point at Infinity (top of sphere) */}
        <circle
          cx="420"
          cy="80"
          r="8"
          fill="rgba(20, 20, 20, 1)"
          stroke="rgba(50, 50, 50, 1)"
          strokeWidth="2"
        />

        {/* ∞ symbol at Point at Infinity */}
        <text
          x="420"
          y="65"
          textAnchor="middle"
          fill="rgba(30, 30, 40, 1)"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
        >
          ∞
        </text>

        {/* Finite label */}
        <text
          x="420"
          y="270"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="9"
          fontFamily="sans-serif"
        >
          All infinities meet here
        </text>

        {/* Mapping lines (connecting left to right) */}
        <path
          d="M 270,180 Q 290,165 335,120"
          fill="none"
          stroke="rgba(100,100,100,0.4)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <path
          d="M 10,180 Q 200,100 410,80"
          fill="none"
          stroke="rgba(100,100,100,0.4)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <path
          d="M 140,70 Q 280,60 420,80"
          fill="none"
          stroke="rgba(100,100,100,0.4)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* Caption */}
        <text
          x="280"
          y="305"
          textAnchor="middle"
          fill="rgba(30, 30, 50, 0.8)"
          fontSize="10"
          fontFamily="serif"
          fontStyle="italic"
        >
          Infinite space in 3D = Finite structure from higher dimension
        </text>
      </svg>
    </figure>
  );
}
