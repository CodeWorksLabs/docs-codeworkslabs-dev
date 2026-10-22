# RC5 documentation publication checkpoint — October 22, 2026

Phil authorized publishing RC5 and updating the CWL release notes/testing record,
with existing product GitHub CI only. No additional product testing is authorized.
RC5 is published as a GitHub prerelease at v1.0.0-rc.5, exact product source
c6997595bd55c7b814840352841c6979b3299fec. Its documentation-only release follow-up
follows tested candidate 676cc4ae2982093551c2b46f66abecd5b93e74cb.

CI: configuration 45/45; lint and four backend jobs passed; four system lanes each 53 examples,
zero failures; four frontend lanes each 49 tests, 42 passes, seven same failed assertions. Theme CI
failed overall. E01 and the prior testing-execution failure remain unresolved;
the prior campaign stays closed. ESR policy is adopted for subsequent releases/
prereleases; completed schedule catch-up or clean compatibility is not claimed.

Applied the complete generated nine-page Brand Navigation mirror plus colocated
manifest from that exact published product commit, using the existing explicit
refresh command and advisory candidate. Curated release-notes.md now records the
published RC5 identity, actual CI failures, remaining limits and future ESR policy.
Ordinary builds must continue to verify committed mirror files offline.

npm ci succeeded. Required npm audit --omit=dev reported nine findings (four moderate/five high).
No dependency fixes or package changes were made. Offline mirror verification
passed; the 34-page build and 140-asset deployment dry run passed. The build
emitted i18n/404-content warnings. Site commit/push, authorized deployment and
read-back of the two requested live URLs are next. Provider, DNS and route
configuration and unrelated product docs remain outside this change.

The earlier checkpoint below is historical and does not describe this update.
# CodeWorksLabs Documentation Site Handoff

Updated: 2026-09-14

## Current boundary

- This repository owns `docs.codeworkslabs.dev`.
- Brand Navigation's accepted offline documentation pipeline remains the
  controlling Brand Navigation boundary. Ordinary builds verify committed
  generated pages without network access; explicit refresh produces only an
  advisory temporary candidate.
- The Brand Navigation mirror now contains nine canonical pages plus its
  colocated manifest from public source commit
  `8cd82e099fd181e0b3403ea2181190d12abcf037`.
- The Analytics documentation reflects Analytics for Astro
  `0.1.0-alpha.20` from public product commit
  `ae6a9884e3cada297f11c641a90082f296380bcb`.
- The exact ten-page generated mirror and manifest are committed build inputs.
- Brand Navigation content and its offline verification pipeline were not
  changed by the Analytics refresh.

## Live state

- The live Cloudflare Worker version is
  `9b0092d1-3dcf-49b8-8e2f-bd358dfa4837`.
- It deploys documentation source commit
  `85ceeb1053d9ce9f0397d3cd0964e615a4d6c1dc`, tree
  `4e6eac803252ba7a32da82cf0864b11b4a226d49`.
- All ten public `/analytics-for-astro/` routes returned HTTP 200 after
  deployment. Their combined output contains Alpha.20 and its exact source
  commit, with zero Alpha.19 or `doctrine-complete` matches.
- The deployment publishes the accepted Brand Navigation correction, including
  the direct GitHub Issues route for ordinary support and the separate private
  security-reporting route.

## Verification state

- Fresh verification passed: clean install; production audit with zero
  vulnerabilities; 26 Brand Navigation pipeline tests; Astro diagnostics with
  zero findings; offline Brand Navigation verification; 33-page production
  build; and 129-asset Wrangler deployment dry run.
- Live verification returned HTTP 200 for the Brand Navigation landing,
  administrator guide, migration record, troubleshooting, and both security
  pages. The sitemap contains all 19 Brand Navigation routes, and live source
  pages identify exact source commit `8cd82e0`.
- The Analytics refresh removed 911 stale lines while adding 222 current lines.
  The generated pages contain no Alpha.19 identity or obsolete review-cycle
  status narrative.

## Recovery and next action

- The complete pre-cleanup local history is preserved in
  `C:\CodeProjects\Archives\Astro Analytics Recovery\2026-09-14\docs-site-before-cleanup.bundle`.
- Brand Navigation is closed and must not be reopened as Analytics repair work.
- The Analytics Alpha.20 and Brand Navigation documentation updates are pushed,
  deployed, and publicly verified. Future product or documentation changes
  require a new bounded update.
