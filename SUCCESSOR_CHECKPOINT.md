# Successor checkpoint

Updated: 2026-09-13

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

## Analytics for Astro alpha.8 documentation — 2026-09-13

The nine-page public documentation section is synchronized to public product
commit `f480c3ce152c49637efcfea6dc38c7577fa28d82` and annotated tag
`v0.1.0-alpha.8`. It now documents Matomo as an implemented provider, including
strict tracker/site configuration, pageview and event mapping, consent and
failure behavior, Astro/Starlight use, package API boundaries, and the current
versioning status. Umami remains explicitly planned and unsupported.

The status material records that alpha.8 passed independent review, clean stock
Astro and Starlight package-consumer testing, repository-driven deployment to
both dedicated CodeWorksLabs sandboxes, and provider-side live qualification
against self-hosted Matomo site IDs `2` and `3`. The npm package remains
unpublished and retains its publication safeguard.

Commits `644bd96d86bd25bcd351e0595fca878ae9361377` and
`e357c27d6184291e7318222c9eeca1eae81131d1` published the alpha.8 documentation
and aligned its candidate/source-tag wording. GitHub Actions passed, and the
first commit deployed successfully through Cloudflare Workers Builds. The
second Cloudflare build failed before Astro ran because GitHub's anonymous API
returned `403 rate limit exceeded` while resolving Brand Navigation `main`.

Commit `2cb656461b632aac3188e09ef041cbfe33affcb4` retains ordinary live
resolution of Brand Navigation `main`, but falls back on transient API failures
to the exact commit already recorded in the synchronized source pages. Invalid
refs still fail. GitHub Actions run `34769258552` passed, and Cloudflare build
`5bc65995-ef0d-40a6-aac1-3c813f9ace85` deployed successfully from the repository.

The full local contract passed: production audit reported zero vulnerabilities,
32 pages built, Pagefind and sitemap completed, and Wrangler dry-run passed.
Live verification confirmed the release notes contain `0.1.0-alpha.8`, the
getting-started page identifies the package as source-tagged, and the section
documents Matomo while retaining Umami as planned.

## Analytics for Astro alpha.9 documentation — 2026-09-13

The public documentation section is synchronized to immutable public product
commit `43473be89dd9e29144c92f3ac0f6e6ab0776f104` and annotated tag
`v0.1.0-alpha.9`. A new fail-closed synchronization script verifies that the
tag resolves to the declared commit, reads the ten source pages directly from
Git, preserves Starlight frontmatter, rewrites internal links, and applies the
separately established live-qualification status. The previously omitted
development and verification guide is now included in the public section and
Astro menu.

The content documents Umami Cloud/self-hosted configuration, UUID and HTTPS
validation, automatic-pageview suppression, MPA and ClientRouter lifecycle,
completed-route event context, readiness/failure behavior, provider limits,
and the alpha.9 release record. It records that the exact tag passed independent
review, clean Astro and Starlight consumer qualification, repository-driven
deployment, and provider-side live qualification on the two dedicated sandbox
hosts. npm publication and a GitHub Release remain absent.

The preliminary local documentation gate passed: clean install, zero production
dependency vulnerabilities, 33-page Starlight build including all ten Analytics
for Astro pages, Pagefind/sitemap generation, Wrangler dry-run, and diff
validation. The full dependency audit still reports three high-severity issues
confined to development dependencies; the required production audit is clean.
The final synchronized gate also passed the same clean install, zero-vulnerability
production audit, 33-page build, Pagefind/sitemap generation, Wrangler dry-run,
and diff validation. Repository commit/push, Cloudflare Workers Builds
deployment, and live-page verification remain pending.

## Analytics for Astro alpha.10 documentation — 2026-09-13

The prepared alpha.9 publication was superseded before repository publication
after a later full committed product review found a same-URL ClientRouter
pageview defect. Preserve the alpha.9 section above as its dated preparation
record; alpha.10 is the current documentation source.

The public section is now deterministically synchronized from the immutable public
product tag `v0.1.0-alpha.10` at commit
`06d8e3f4185a2509f1cdf155ae2d6b91b2ed245d`. The synchronization script requires
version `0.1.0-alpha.10`, clones the pinned public repository when no optional
local source is supplied, proves the source ref is an annotated tag resolving to
that exact commit, reads all ten source pages from Git, and applies the separately
established live-qualification record. A clean clone of this repository can
therefore reproduce the pages without any parent or sibling checkout. The source
package remains unpublished to npm and has no GitHub Release.

The exact tag archive was deployed by the two repository-driven stock sandbox
repositories. GitHub verification runs `34783356819` and `34783361990` passed.
Cloudflare serves Astro Worker version
`0cfba6c1-dbe7-4b17-b96b-8d2cc7f9e23b` and Starlight Worker version
`6683e6fa-357d-43fa-acf8-6f3c19c7fac2`, each at 100 percent. Both live browser
harnesses reported Umami ready, accepted the explicit journey event, and
advanced to the destination. Their distinct self-hosted Umami records displayed
the new `/analytics/` pageview, named journey event, and `/analytics/next/`
pageview sequence.

The final documentation review first identified three P2 defects: writes could
occur before all source pages were validated, the sync depended on a
caller-supplied external checkout and did not prove that its ref was an annotated
tag, and the event-client provider summary omitted Umami. All were corrected.
Regression checks proved failure atomicity, rejected a deliberately substituted
lightweight tag, and reproduced all ten pages from the pinned public repository.
The final internal review reported no actionable defect.

The local release gate passed: fresh `npm ci`, production audit with zero
vulnerabilities, 33-page Starlight build, Pagefind and sitemap generation,
Wrangler dry-run, and `git diff --check`. The full dependency audit's three high
findings remain confined to development dependencies.

Commit `e1bb02b4a3d7bac262afea1a00a94d4ac5b89caf` published the alpha.10
documentation from this repository's `main`. GitHub verification run
`34785042143` passed, and the repository-driven Cloudflare build deployed Worker
version `9b94a90d-5b84-429a-abeb-155a60864a76` at 100 percent. Live browser
verification confirmed the overview's exact alpha.10 tag/commit identity,
five-provider and npm-unpublished status, both sandbox qualification links, the
complete ten-page menu, and the required ownership wording. The versioning page
identifies RC readiness as the next product decision, and the release notes show
the alpha.10 same-URL correction and provider-side Umami qualification record.
