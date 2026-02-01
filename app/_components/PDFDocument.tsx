import { sections } from "../../lib/navigation";
import Citations from "./Citations";
import Content from "./Content";
import Defense from "./Defense";
import Definition from "./Definition";
import Logic from "./Logic";
import Predictions from "./Predictions";
import Trajectory from "./Trajectory";

export default function PDFDocument() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Holos: A Scientific Interpretive Framework for Explaining Reality</title>
        <style>{`
          @font-face {
            font-family: 'Bitter';
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/bitter/v39/IYem_q_KI0L5BLkFptrK8NY9jBME_0V8tBh_P4a.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2192, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Bitter';
            font-style: italic;
            font-weight: 100 900;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/bitter/v39/wk_30c2dR5Y2hBo1CzFmDGK-xza6iXKz4l3gBwZE.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2192, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @page {
            margin: 2cm;
            size: letter;
          }
          html {
            font-size: 14px;
          }
          html, body {
            font-family: 'Bitter', serif !important;
            line-height: 1.6;
            color: #000;
          }
          /* Use Times New Roman for the ⊛ symbol for better rendering */
          .holos-symbol {
            font-family: 'Times New Roman', Times, serif !important;
          }
          /* Style all instances of ⊛ to use Times New Roman */
          * {
            font-feature-settings: normal;
          }
          body {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-size: 1rem;
            text-wrap: pretty;
          }
          *:not(.katex):not(.katex *) {
            font-family: inherit;
          }
          /* Ensure KaTeX uses its own fonts */
          .katex, .katex * {
            font-family: KaTeX_Main, Times New Roman, serif !important;
          }
          h1, h2, h3, h4 {
            text-wrap: balance;
          }
          h1 {
            font-size: 2.5em;
            font-weight: 300;
            margin-top: 0.75em;
            margin-bottom: 0.35em;
            page-break-after: avoid;
          }
          h2 {
            font-size: 2em;
            font-weight: 300;
            margin-top: 1em;
            margin-bottom: 0.35em;
            page-break-after: avoid;
          }
          h3 {
            font-size: 1.5em;
            font-weight: 600;
            margin-top: 0.75em;
            margin-bottom: 0.35em;
            page-break-after: avoid;
          }
          h4 {
            font-size: 1.2em;
            font-weight: 600;
            margin-top: 0.6em;
            margin-bottom: 0.3em;
            page-break-after: avoid;
          }
          p {
            margin-bottom: 0.7em;
            line-height: 1.7;
            text-wrap: pretty;
          }
          ul, ol {
            margin-bottom: 0.7em;
            padding-left: 2em;
            margin-top: 0;
          }
          /* Flex layout (used in footnotes and elsewhere) */
          .flex {
            display: flex;
          }
          .flex-col {
            flex-direction: column;
          }
          /* Citations: sup + ul side by side */
          .flex:not(.flex-col) > sup {
            flex-shrink: 0;
            align-self: flex-start;
            position: relative;
            top: -4px;
            padding-right: 0.5rem;
          }
          .flex:not(.flex-col) > ul {
            flex: 1;
            margin-top: 0;
            padding-left: 0;
            list-style-type: disc;
            list-style-position: inside;
          }
          li {
            margin-bottom: 0.35em;
          }
          blockquote {
            border-left: 2px solid #ccc;
            padding-left: 1em;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #666;
          }
          .section-break {
            page-break-before: always;
            margin-top: 1.25em;
          }
          .math-display {
            margin: 1em 0;
            padding: 1em;
            background: #f5f5f5;
            border-left: 2px solid #ccc;
            text-align: center;
            overflow-x: auto;
          }
          .math-inline {
            display: inline;
          }
          strong {
            font-weight: 600;
          }
          em {
            font-style: italic;
          }
          a {
            color: #000;
            text-decoration: underline;
          }
          hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 2em 0;
          }
          .title-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
          }
          .title-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 1em;
            display: block;
          }
          .title-main {
            font-size: 3em;
            font-weight: 200;
            line-height: 1.2;
            margin: 0;
            max-width: 90%;
            text-align: center;
          }
          .title-main sup {
            font-size: 0.4em;
            font-weight: 200;
            position: relative;
            top: -0.3em;
            margin-right: 0.1em;
          }
          .title-main .tracking-wide {
            letter-spacing: 0.05em;
          }
          .toc-page {
            padding-top: 1em;
          }
          .toc-page h1 {
            font-size: 1.5em;
            font-weight: 300;
            margin-bottom: 1em;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            padding-bottom: 0.25em;
          }
          .toc-columns {
            column-count: 2;
            column-gap: 2em;
            font-size: 0.75em;
          }
          .toc-section {
            break-inside: avoid;
            margin-bottom: 0.75em;
          }
          .toc-section-title {
            font-size: 1.1em;
            font-weight: 600;
            margin-bottom: 0.2em;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .toc-section-title a {
            text-decoration: none;
            color: #000;
          }
          .toc-page-num {
            font-weight: 400;
            color: rgba(0,0,0,0.6);
            margin-left: 0.5em;
          }
          .toc-subsections {
            list-style: none;
            padding-left: 0.75em;
            margin: 0;
          }
          .toc-subsections li {
            margin-bottom: 0.15em;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .toc-subsections a {
            text-decoration: none;
            color: rgba(0,0,0,0.8);
          }
          .toc-subsections .toc-page-num {
            font-size: 0.9em;
          }
        `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/katex.min.css"
        />
      </head>
      <body>
        <div className="section-break title-page">
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3em" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5em",
                fontSize: "1.2em",
                color: "rgba(0, 0, 0, 0.6)",
                fontWeight: 300,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                style={{ width: "14px", height: "14px", display: "inline-block" }}
                aria-label="Holos"
              >
                <title>Holos</title>
                <circle
                  cx="192"
                  cy="256"
                  r="230"
                  stroke="rgba(0, 0, 0, 0.6)"
                  strokeWidth="24"
                  fill="none"
                />
                <g transform="scale(0.75) translate(64, 85)">
                  <path
                    fill="rgba(0, 0, 0, 0.6)"
                    d="M192 32c17.7 0 32 14.3 32 32V199.5l111.5-66.9c15.2-9.1 34.8-4.2 43.9 11s4.2 34.8-11 43.9L254.2 256l114.3 68.6c15.2 9.1 20.1 28.7 11 43.9s-28.7 20.1-43.9 11L224 312.5V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V312.5L48.5 379.4c-15.2 9.1-34.8 4.2-43.9-11s-4.2-34.8 11-43.9L129.8 256 15.5 187.4c-15.2-9.1-20.1-28.7-11-43.9s28.7-20.1 43.9-11L160 199.5V64c0-17.7 14.3-32 32-32z"
                  />
                </g>
              </svg>
              <span>Holos</span>
            </div>
            <h1 className="title-main">
              Holos: A Scientific Interpretive Framework for Explaining Reality
            </h1>
          </div>
        </div>

        <div className="section-break toc-page">
          <h1>Table of Contents</h1>
          <div className="toc-columns">
            {sections.map((section) => (
              <div key={section.id} className="toc-section">
                <div className="toc-section-title">
                  <a href={`#${section.id}`}>{section.title}</a>
                  <span className="toc-page-num" data-toc-target={section.id} />
                </div>
                <ul className="toc-subsections">
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <a href={`#${sub.id}`}>{sub.title}</a>
                      <span className="toc-page-num" data-toc-target={sub.id} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div id="overview" className="section-break">
          <Content isPDF={true} />
        </div>

        <div id="logic" className="section-break">
          <h1>Logic</h1>
          <Logic />
        </div>

        <div id="definition" className="section-break">
          <Definition />
        </div>

        <div id="defense" className="section-break">
          <Defense />
        </div>

        <div id="predictions" className="section-break">
          <h1>Predictions</h1>
          <Predictions />
        </div>

        <div id="trajectory" className="section-break">
          <Trajectory />
        </div>

        <div id="citations" className="section-break">
          <h1>Citations</h1>
          <Citations />
        </div>
      </body>
    </html>
  );
}
