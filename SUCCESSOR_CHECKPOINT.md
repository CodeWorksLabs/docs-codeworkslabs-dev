# Successor checkpoint

Updated: 2026-09-10

## Current state

- Site: `https://docs.codeworkslabs.dev/`
- Repository: `https://github.com/CodeWorksLabs/docs-codeworkslabs-dev`
- Branch: `main`
- Cloudflare Worker configuration: `docs-codeworkslabs-dev`
- Repository establishment is a source-control correction; it does not deploy or alter the live Worker.
- The site source is self-contained within this repository root.

## Verification contract

Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run`.

## Boundaries

Brand Navigation source records are synchronized during build. Deterministic verification pins `BRAND_NAVIGATION_DOCS_REF=ed1640b049763c37694f8c3bb5f9f69cbd21f658`; ordinary builds intentionally default to `main`.

The exact commit identity and completed verification evidence will be recorded here when the initial public baseline is pushed.
