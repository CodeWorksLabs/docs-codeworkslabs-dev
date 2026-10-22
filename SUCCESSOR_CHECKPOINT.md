# Seven-forum RC5 installation follow-up ready to deploy — October 22, 2026

The user reported the final DiscussionBridge Forum update completed and authorized
read-only revision/version/updater verification followed by concise docs publication.
All seven installations reported local/remote component revision
412448fc5e5abc396c4f668f1fe76eb31e239b1b, zero commits behind, matching main at
their recorded observation times. DB Forum: Discourse 2026.10.0-latest+142; R744:
2026.7.2+14. Five earlier current Discourse versions were not collected and are
explicitly marked Not recorded. Default-branch vs explicit-main updater wording
is explained without changing forum settings.

Product docs/TESTING.md adds a concise dated table and brief limits before the
preserved October 17 history; public copy contains no personal/internal directions.
Published product source: 3a7eb19d7c4d520f52b71fc5518b9a5e574cf146 [skip ci].
The user additionally directed consistency with Discourse norms. Canonical and
concise CWL guidance now clarify blank Git Branch for native compatibility,
explicit main for deliberate branch-head tracking (including sandbox), and
release tags as fixed identities. No forum source settings were changed.
The complete nine-page mirror and manifest were applied from its advisory candidate.
No product tests, new CI, forum updates, or product/source configuration changes.
Known CI failures, E01 and testing-execution failure remain unresolved. RC5 tag
and release notes are unchanged. Same-day dependency installation/audit results
below remain applicable; dependency files are unchanged.

Offline mirror verification passed for the exact source above. The final 34-page
docs build and 140-asset deployment dry run passed. Existing i18n/404 warnings
remain unchanged. No product tests or CI ran.

Next: commit/push this documentation-only change, then authorized deployment and
one focused live read-back of the new rollout section and update guidance.

Earlier checkpoints below are historical.

# Public testing record and RC1 formatting deployed — October 22, 2026

Canonical TESTING.md was cleaned and pushed as product commit
81499e6356394386c2bc5396fcfb0496f1a81690 with [skip ci]. Personal references,
internal instructions and task attribution were removed; actual results, dates,
versions/hashes/counts, failed CI, unresolved E01/testing-execution failure and
October 17 seven-forum heading/history remain. The full generated nine-page
mirror and colocated manifest were applied from that exact public source.

RC1's three release/reference links are now a separate paragraph divided by
middle dots, rather than continuing its Highlights bullet list. Wording, dates,
URLs and other release sections are unchanged. No product tests, new CI,
product changes, forum updates or new verification results were introduced.

The existing offline mirror verifier passed. The 34-page docs build and normal
140-asset deployment dry run passed. Memory pressure caused shell-start failures;
a restricted direct build also encountered an EPERM cache write. The successful
build ran in the approved owner context via cmd and the installed Astro CLI,
with RAYON_NUM_THREADS=1, UV_THREADPOOL_SIZE=1, GOMAXPROCS=1,
GOMEMLIMIT=64MiB and Node --max-old-space-size=256. No system settings or
repository build scripts changed. Existing i18n/404 warnings remain; unchanged
dependency files retain the previously recorded installation/audit results.

Docs source d2b41cb7ee96848675cd52d148335a8687acbdc1 was committed/pushed
and deployed successfully as Worker version 9c660f11-067c-4a81-84a9-db860a74054e.
The app interrupted the first live read-back, so after resuming both URLs were
read again and returned HTTP 200. The testing record has no personal references
or internal directions; its exact source link, actual CI failures, unresolved
E01/testing-execution failure and October17 seven-forum anchor are present.
RC1 reference links render as a separate paragraph with three links.

The requested documentation work is complete. This checkpoint-only follow-up
does not change deployed content or require another build/deploy. The RC5 tag
is unchanged. Continue with the one-forum-at-a-time boundary below.

Seven-forum next phase: the user performs each update, one forum at a time;
this task verifies installed revision/native updater status after each update
signal. Do not update forums or run regression tests. No current forum update
has been reported yet. The October 17 entry remains historical.

The earlier checkpoints below are historical.

# CWL What's new copy correction complete — October 22, 2026

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

Only release-notes.md and this checkpoint were committed/pushed with [skip ci]
as bbabf42f4d8fd49cfc7f2a1ba418bfc492e7658f, tree
e2eb8239300884776593a4605e5c1853f876adbd. Authorized deployment succeeded:
Worker version 1bbe5c74-1ac8-477e-b3c2-8ee46d1cd131.
https://docs.codeworkslabs.dev/brand-navigation/release-notes/ returned HTTP 200.
Read-back confirmed product changes, future release policy and both reference
links, with no personal references or removed process sections. This final
checkpoint-only follow-up does not change deployed page content.

The request is complete. The RC5 release tag remains unchanged. No new product
testing, review, dependency changes or source-record refresh occurred. Further
product testing remains closed/on hold under the existing boundary.

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
