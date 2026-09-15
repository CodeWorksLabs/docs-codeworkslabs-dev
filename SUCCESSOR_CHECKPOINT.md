# CodeWorksLabs Documentation Site Handoff

Updated: 2026-09-14

## Current boundary

- This repository owns `docs.codeworkslabs.dev`.
- Brand Navigation's accepted offline documentation pipeline remains the
  controlling Brand Navigation boundary. Ordinary builds verify committed
  generated pages without network access; explicit refresh produces only an
  advisory temporary candidate.
- The unpublished local Analytics documentation reflects Analytics for Astro
  `0.1.0-alpha.19` from product content commit
  `b7f81f7da106229dfa9112b8851788b69f46b88e`.
- The local candidate has not been pushed or deployed.

## Live state

- The live Cloudflare Worker remains
  `609a49a8-0527-463e-a581-92188099ba0f`.
- The live Analytics documentation remains the Alpha.10 generation.
- `https://docs.codeworkslabs.dev/astro-analytics/` returned HTTP 200 during
  the 2026-09-14 recovery inventory.

## Verification state

- The local docs candidate previously reported 9 Analytics assertions and 26
  Brand Navigation assertions passing, plus offline verification and build.
- The final isolated Alpha.19 docs export did not begin before the recovery
  stop.
- No F9 review was launched, and no publication acceptance exists.

## Recovery and next action

- The complete pre-cleanup local history is preserved in
  `C:\CodeProjects\Archives\Astro Analytics Recovery\2026-09-14\docs-site-before-cleanup.bundle`.
- Brand Navigation is closed and must not be reopened as Analytics repair work.
- Do not push or deploy until the Alpha.19 technical assessment and final
  bounded verification are complete and Phil authorizes the exact action.
