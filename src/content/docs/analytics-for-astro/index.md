---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes the commit-pinned
> candidate `0.1.0-alpha.13` at product commit `561f1a2f2e59a310a4516572a0457e9aa609eb89`
> before any release tag. The package is not yet published to npm.

These documents describe the npm-unpublished
`0.1.0-alpha.13` Milestone 2 correction candidate of
`@codeworkslabs/astro-analytics`.

Milestone 2 provides real Fathom, Plausible, Google Analytics 4, Matomo, and Umami adapters for
pageviews and bounded custom events. The runtime provides simultaneous-provider
coordination, exact per-provider outcomes, and provider readiness diagnostics.
No event queue or runtime consent-transition API is implemented.

All five accepted first-stable providers have implementations. The first
doctrine-complete alpha.12 freeze found remaining runtime provenance,
observation-gap, sandbox-receipt, CI, and documentation defects. Alpha.13 is
the bounded correction candidate. An RC disposition requires exact-package
consumer qualification and simultaneous internal/external review.

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

The source repository is private. The npm package is currently unpublished and
retains its publication safeguard. Installation, release, site integration, and
deployment remain separate authorized activities.
