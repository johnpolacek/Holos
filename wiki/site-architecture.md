# Holos Site Architecture

## Summary

This note captures the smallest useful architectural picture visible from the repo at bootstrap. Holos is implemented as a Next.js app that presents long-form content across a small set of routes and also generates a PDF artifact for distribution.

## Route Surface

Inspected route files show these main pages:

- `/` - main overview content rendered by [`../app/page.tsx`](../app/page.tsx)
- `/logic` - logic and formal structure rendered by [`../app/logic/page.tsx`](../app/logic/page.tsx)
- `/predictions` - predictions content rendered by [`../app/predictions/page.tsx`](../app/predictions/page.tsx)
- `/citations` - citations and references rendered by [`../app/citations/page.tsx`](../app/citations/page.tsx)

Inspected redirect routes:

- `/definition` redirects to `/logic#ontology`
- `/trajectory` redirects to `/predictions#phase-0`

The layout shell is shared through [`../app/layout.tsx`](../app/layout.tsx) and [`../app/_components/PageLayout.tsx`](../app/_components/PageLayout.tsx), which provide metadata, global styles, analytics, header/footer/sidebar layout, and page transitions.

## Content Structure

The main long-form overview content lives primarily in [`../app/_components/content-data.tsx`](../app/_components/content-data.tsx).

The route and subsection information architecture is defined in [`../lib/navigation.ts`](../lib/navigation.ts), which currently organizes the site into:

- Overview
- Logic
- Predictions
- Citations

That file also defines the subsection anchor structure used for navigation within the main content areas.

The sitemap in [`../app/sitemap.ts`](../app/sitemap.ts) reflects the same overall route shape and several anchor-based overview sections.

## Publishing And Export Path

The repo contains a maintained PDF generation path:

- [`../scripts/generate-pdf.ts`](../scripts/generate-pdf.ts) renders the PDF at build time and writes `public/holos.pdf`
- [`../lib/generatePDF.ts`](../lib/generatePDF.ts) handles HTML preparation, Puppeteer launch behavior, KaTeX rendering, and PDF generation details
- [`../app/api/pdf/route.ts`](../app/api/pdf/route.ts) exposes on-demand PDF generation through `/api/pdf`
- [`../public/holos.pdf`](../public/holos.pdf) is the generated artifact currently checked into the repo

The repo also contains social image generation:

- [`../scripts/generate-images.ts`](../scripts/generate-images.ts) creates the Open Graph and Twitter image assets used by the app metadata

From inspected scripts, local PDF generation expects a dev server unless running in a Vercel environment.

## Stack And Tooling Observed

Inspected manifests and source files show:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Biome for formatting and linting
- GSAP for animation
- Puppeteer and `pdf-lib` for PDF generation
- Vercel Analytics

These are repo facts at bootstrap, not a claim about long-term architectural intent.

## Known Gaps

- The repo does not document an editorial workflow for maintaining Holos content.
- The repo does not document deployment workflow beyond the visible Vercel-oriented metadata and serverless handling in the PDF path.
- Roadmap, ownership process, and release conventions are not documented in inspected files.
