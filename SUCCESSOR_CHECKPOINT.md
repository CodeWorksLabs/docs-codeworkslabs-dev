# Successor checkpoint

Updated: 2026-09-10

## Current state

- Site: `https://docs.codeworkslabs.dev/`
- Repository: `https://github.com/CodeWorksLabs/docs-codeworkslabs-dev`
- Branch: `main`
- Cloudflare Worker configuration: `docs-codeworkslabs-dev`
- Cloudflare Workers Builds is connected to this repository and deploys pushes
  to `main` with `npm run build` followed by `npx wrangler deploy`.
- Non-production branch builds are disabled.
- The site source is self-contained within this repository root.

## Verification contract

Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run`.

## Boundaries

Brand Navigation source records are synchronized during build. Deterministic verification pins `BRAND_NAVIGATION_DOCS_REF=ed1640b049763c37694f8c3bb5f9f69cbd21f658`; ordinary builds intentionally default to `main`.

## Analytics for Astro publication — 2026-09-12

Phil authorized production documentation publication at
`https://docs.codeworkslabs.dev/analytics-for-astro/`. The published section is
a self-contained public documentation snapshot of private Analytics for Astro
product commit `454893359f8588a71d35d51d1a5e0d16bf355c63`
(`0.1.0-alpha.7`). It documents implemented Fathom, Plausible, and Google
Analytics 4 behavior and clearly labels Matomo and Umami as planned providers
that alpha.7 does not accept or load. No private package tarball or product
source was added to this public repository.

Docs commit `1052ccaaa967fb79edc5b341092e27720e95eab9` added the nine-page
section, navigation, home-page entry, and a compatibility handoff at the old
`/astro-analytics/` route. The first repository check exposed an existing
unauthenticated GitHub API-rate-limit defect in the Brand Navigation prebuild.
Commit `921644211f59c433767e962cc0c1177238ef5c86` corrected the sync script
so an already pinned 40-character commit bypasses the redundant API lookup.
GitHub Actions run `34713005898` then passed `npm ci`, the production dependency
audit, the Starlight build, and the Wrangler dry-run.

Cloudflare Workers Builds deployed Worker version
`b59030fb-e16a-4e17-a9c0-35c8a2efa7c1`. Live checks returned 200 for
`/analytics-for-astro/`, `/analytics-for-astro/configuration/`, and the legacy
`/astro-analytics/` handoff; the new pages contained the expected product title
and planned-provider labels. This publication was built from GitHub, not from a
local Wrangler deployment.

Treat the checked-out \`main\` commit as the exact source identity. Verify it with
\`git rev-parse HEAD\` and confirm it matches \`origin/main\` before release work.
