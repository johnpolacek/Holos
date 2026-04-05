# Holos Project Wiki Guide

## Purpose

This `wiki/` directory is the deep documentation layer for the Holos project repo at [`../`](../).

Use it for durable, project-specific knowledge that helps future work inside this repository. Keep it grounded in inspected evidence from the repo and update it as the project changes.

## What Belongs Here

- architecture notes for the site and its major subsystems
- content structure and information architecture notes
- publishing and export flows such as PDF generation
- implementation decisions and technical tradeoffs
- project-specific investigations, findings, and operating notes
- maintained answers that will stay useful for future repo work

## What Does Not Belong Here

- high-level project summaries that mainly help hub navigation
- cross-project synthesis or personal planning context
- copied root README material
- speculative roadmap, workflow, or ownership detail not supported by the repo
- raw scratch notes that are unlikely to stay useful

## Boundary With `/Wiki`

Keep deep Holos knowledge here.

Keep summary-only, navigation, and cross-project context in the personal hub at [`../../../Wiki/`](../../../Wiki/) and the Holos hub summary at [`../../../Wiki/projects/holos.md`](../../../Wiki/projects/holos.md).

When detail exists here, summarize upward rather than duplicating it in `/Wiki`.

## Core Files

- [`index.md`](index.md) is the first page to read and the catalog of durable pages in this project wiki.
- [`log.md`](log.md) is the append-only record of bootstrap, ingest, query, lint, and major update work.
- `AGENTS.md` is the standing maintenance contract for future agents working in this repo.

## Canonical Operations

### `ingest`

Use `ingest` when durable project knowledge should be added here.

Standard flow:

1. Inspect the relevant repo files first.
2. Create or update the smallest useful maintained note.
3. Update [`index.md`](index.md) if the durable page set changed.
4. Append a concise entry to [`log.md`](log.md).

### `query`

Use `query` when answering questions about Holos.

Standard flow:

1. Read [`index.md`](index.md) first.
2. Read the smallest useful set of project-wiki pages.
3. Fall back to repo files when the wiki does not yet contain the answer.
4. If the answer creates a durable artifact, file it back into this wiki.

### `lint`

Use `lint` for lightweight maintenance.

Check for:

- stale architecture notes
- orphan pages not linked from [`index.md`](index.md)
- thin notes that should be merged or expanded
- contradictions between deep docs and the actual repo
- details that belong in the hub instead of this project wiki

When linting:

- fix small structural issues directly
- keep markdown plain and readable
- append a concise log entry when the pass materially changes the wiki

## Writing Conventions

- prefer plain markdown
- prefer relative links where practical
- keep sections short and readable in raw text
- be specific about uncertainty when evidence is thin
- do not invent implementation detail that has not been inspected
