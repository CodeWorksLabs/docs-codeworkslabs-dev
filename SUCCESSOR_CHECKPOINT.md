# CWL What's new copy correction ready — October 22, 2026

The public RC5 What's new section now contains the published date/download link,
implemented product changes, a brief neutral forward-looking release policy and
links to known issues/testing results. Personal references, internal directions,
candidate/workflow details and the testing-process narrative were removed.
RC4/older history and the generated source records were not changed. The
underlying CI failures, E01 and testing-process failure retain their prior
unresolved status in their records. No product tests or investigation ran.

Offline mirror verification passed for the unchanged nine-page RC5 mirror.
The first docs build failed Rust memory allocation; a one-worker retry failed
esbuild memory allocation. Available Windows commit memory was below 1 GB.
A bounded build succeeded with RAYON_NUM_THREADS=1, UV_THREADPOOL_SIZE=1,
GOMAXPROCS=1, GOMEMLIMIT=64MiB and NODE_OPTIONS=--max-old-space-size=256.
These were per-process environment settings, not repository/system changes.
The 34-page build and required 140-asset deployment dry run passed; prior
existing i18n/404 warnings remain. Dependency files are unchanged, so the
installation/audit results already recorded below remain applicable.

Only release-notes.md and this checkpoint are being committed/pushed with
[skip ci]. Normal authorized deployment and a focused read-back of the public
release-notes URL are next. The RC5 release tag remains unchanged. No new
product testing, review, dependency changes or source-record refresh is in scope.

The earlier checkpoints below are historical.
# RC5 documentation publication complete — October 22, 2026

Phil authorized RC5 publication and the CWL release-notes/testing-record update,
with existing product GitHub CI only. That work is complete. Further product
testing remains on hold pending his protocol/testing-task management work and
new explicit instruction. Do not start more testing, review or investigation.

RC5 is published as a GitHub prerelease at v1.0.0-rc.5, exact product source
c6997595bd55c7b814840352841c6979b3299fec. This documentation-only follow-up
follows tested candidate 676cc4ae2982093551c2b46f66abecd5b93e74cb.
CI: configuration 45/45 passed; lint and four backend jobs passed; four system
lanes each passed 53 examples; four frontend lanes each passed 42/49 with the
same seven failed assertions. Theme CI failed overall. E01, those failed checks
and the prior testing-execution failure remain unresolved. The prior campaign
stays closed. ESR policy is in place for subsequent releases/prereleases;
completed schedule catch-up or clean compatibility is not claimed.

The complete generated nine-page Brand Navigation mirror and colocated manifest
were applied from that exact published product commit through the existing
explicit refresh. Curated release notes and the testing record disclose actual
CI failures and limits. Site source was committed/pushed as
87ccb96b1be57b010e5bfd544b9d55b1819db6da, tree
1c0cb49c216171e5f9380300dc2534cf3e356923.

Normal authorized deployment succeeded: Worker version
d37d4cbb-42aa-4542-8c1f-f06cdaf691eb. Both requested live URLs returned HTTP 200:
https://docs.codeworkslabs.dev/brand-navigation/release-notes/
https://docs.codeworkslabs.dev/brand-navigation/source/testing-record/
Read-back confirmed RC5 release/exact source links, CI failures, unresolved E01,
process-failure/hold wording and the adopted ESR policy. This checkpoint-only
follow-up does not change the deployed content or require another build/deploy.

Required npm ci succeeded; offline mirror verification, the 34-page build and
140-asset Wrangler deployment dry run passed. Required production dependency
audit reported nine findings (four moderate/five high). Build emitted i18n/404
content warnings. No dependencies or provider/DNS/route configuration changed,
and no extra product tests or local product suites were run. Unrelated content
and dependency remediation remain outside this completed request.

The checkpoint below is historical and does not describe this update.
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
