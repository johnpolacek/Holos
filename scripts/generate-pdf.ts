// Make React available globally before any imports that use JSX.
// PDFDocument → Content → content-data.tsx, and content-data exports JSX at module load time.
import React from "react";

if (typeof global !== "undefined" && !global.React) {
  global.React = React;
}

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generatePDF, renderPDFDocument } from "../lib/generatePDF";

const DEV_SERVER_PORT = process.env.PORT ?? "3000";
const DEV_SERVER_URL = `http://127.0.0.1:${DEV_SERVER_PORT}`;

async function isDevServerRunning(): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  try {
    const res = await fetch(DEV_SERVER_URL, { signal: controller.signal });
    return res.ok || res.status === 404;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  // Skip PDF generation if SKIP_PDF_GENERATION is set (useful for CI/CD)
  if (process.env.SKIP_PDF_GENERATION === "true") {
    console.log("Skipping PDF generation (SKIP_PDF_GENERATION=true)");
    return;
  }

  // Require dev server to be running (skip on Vercel)
  if (!process.env.VERCEL) {
    const running = await isDevServerRunning();
    if (!running) {
      console.error("Error: Dev server is not running.");
      console.error(`  PDF generation requires the dev server. Start it with: pnpm dev`);
      console.error(`  Then run: pnpm build:pdf`);
      process.exit(1);
    }
  }

  console.log("Generating PDF at build time...");
  if (process.env.DEBUG_PDF === "true") {
    console.log("  (DEBUG_PDF=true: outline enabled, extra logging)");
  }

  try {
    // Render React component to HTML string
    const html = await renderPDFDocument();
    if (process.env.DEBUG_PDF === "true") {
      console.log("  HTML length:", html.length, "chars");
    }

    // Generate PDF from HTML (with outline/TOC when --generate-pdf-document-outline is supported)
    const pdfBuffer = await generatePDF(html);

    // Ensure public directory exists
    const publicDir = join(process.cwd(), "public");
    mkdirSync(publicDir, { recursive: true });

    // Write PDF to public directory
    const pdfPath = join(publicDir, "holos.pdf");
    writeFileSync(pdfPath, pdfBuffer);

    console.log(`✓ PDF generated successfully: ${pdfPath}`);
    console.log(`  Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
    if (process.env.DEBUG_PDF !== "true") {
      console.log("  (Run with DEBUG_PDF=true for outline/options logging)");
    }
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    // On Vercel, don't fail the build if PDF generation fails
    // The PDF can be generated on-demand via the API route
    if (process.env.VERCEL) {
      console.warn(
        "⚠ PDF generation failed on Vercel. The PDF can still be generated on-demand via /api/pdf"
      );
      return;
    }
    process.exit(1);
  }
}

main();
