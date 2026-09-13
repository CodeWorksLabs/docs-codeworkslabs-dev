---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes public-source
> candidate `0.1.0-alpha.10` at product commit `06d8e3f4185a2509f1cdf155ae2d6b91b2ed245d`
> and annotated tag `v0.1.0-alpha.10`. The package is not yet published to npm.

These documents describe the public-source, npm-unpublished
`0.1.0-alpha.10` Milestone 2 correction candidate of
`@codeworkslabs/astro-analytics`.

Milestone 2 provides real Fathom, Plausible, Google Analytics 4, Matomo, and Umami adapters for
pageviews and bounded custom events. The runtime provides simultaneous-provider
coordination, exact per-provider outcomes, and provider readiness diagnostics.
No event queue or runtime consent-transition API is implemented.

All five accepted first-stable providers have implementations. Alpha.9 passed
its package, repository-driven sandbox, browser-runtime, and provider-side live
gates, but a later full committed review found that Umami suppressed a genuine
ClientRouter completion when its URL matched the preceding completion.
Alpha.10 corrects that behavior and replaces alpha.9. Its exact public
source-tag archive completed repository-driven deployment to the stock Astro and
Starlight sandboxes plus browser-runtime and provider-side live qualification on
September 13, 2026. The live harnesses at
[astro.sandbox.codeworkslabs.dev](https://astro.sandbox.codeworkslabs.dev/analytics/)
and [stockstarlight.sandbox.codeworkslabs.dev](https://stockstarlight.sandbox.codeworkslabs.dev/analytics/)
each recorded its landing pageview, explicit journey event, and destination
pageview in a distinct self-hosted Umami website record.

## Guides

1. [Getting started](/analytics-for-astro/getting-started/)
2. [Configuration reference](/analytics-for-astro/configuration/)
3. [API reference](/analytics-for-astro/api-reference/)
4. [Event client](/analytics-for-astro/events/)
5. [Starlight integration](/analytics-for-astro/starlight/)
6. [Runtime and safety model](/analytics-for-astro/runtime-and-safety/)
7. [Development and verification](/analytics-for-astro/development/)
8. [Versioning and releases](/analytics-for-astro/versioning-and-releases/)
9. [Changelog](/analytics-for-astro/release-notes/)

## Package entry points

| Entry point | Purpose |
| --- | --- |
| `@codeworkslabs/astro-analytics` | Astro integration and configuration types |
| `@codeworkslabs/astro-analytics/client` | Browser-safe `track()` helper and event types |
| `@codeworkslabs/astro-analytics/starlight` | Starlight plugin wrapper |

The source repository is public. The npm package is currently unpublished and
retains its publication safeguard. Installation, release, site integration, and
deployment remain separate authorized activities.
