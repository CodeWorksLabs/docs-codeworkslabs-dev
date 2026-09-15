---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes the commit-pinned
> candidate `0.1.0-alpha.19` at product commit `b7f81f7da106229dfa9112b8851788b69f46b88e`
> before any release tag. The package is not yet published to npm.

These documents describe the npm-unpublished
`0.1.0-alpha.19` Milestone 2 correction candidate of
`@codeworkslabs/astro-analytics`.

Milestone 2 provides real Fathom, Plausible, Google Analytics 4, Matomo, and Umami adapters for
pageviews and bounded custom events. The runtime provides simultaneous-provider
coordination, exact per-provider outcomes, and provider readiness diagnostics.
No event queue or runtime consent-transition API is implemented.

All five accepted first-stable providers have implementations. The first
doctrine-complete alpha.12 freeze found remaining runtime provenance,
observation-gap, sandbox-receipt, CI, and documentation defects. Alpha.13
closed the product-runtime findings, while its complete-family review found a
GA4 reserved-key serialization defect and remaining sandbox journey defects.
Alpha.14 closed the package serialization defect, while F4 confirmed that the
package runtime and artifact gates passed and identified remaining sandbox and
operative-record defects. Alpha.15 corrected the shipped current-state record,
but its F5 archive was not byte-derived from canonical Git content. Alpha.16
rebuilds that immutable package identity from Git-tree bytes; its runtime is
unchanged from alpha.14. An RC disposition requires exact-package
consumer qualification and simultaneous internal/external review of the complete family.

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
