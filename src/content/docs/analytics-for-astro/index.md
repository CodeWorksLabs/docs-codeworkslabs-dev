---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes public-source
> candidate `0.1.0-alpha.8` at product commit `f480c3ce152c49637efcfea6dc38c7577fa28d82`.
> The package is not yet published to npm.

These documents describe the public-source `0.1.0-alpha.8` Milestone 2 candidate of
`@codeworkslabs/astro-analytics`.

Milestone 2 provides real Fathom, Plausible, Google Analytics 4, and Matomo adapters for
pageviews and bounded custom events. The runtime provides simultaneous-provider
coordination, exact per-provider outcomes, and provider readiness diagnostics.
No event queue or runtime consent-transition API is implemented.

Matomo completed independent review, stock Astro and Starlight consumer testing,
repository-driven sandbox deployment, and provider-side qualification. Umami is
the remaining approved roadmap provider for the first stable release. It is a
placeholder only in alpha.8 and is not accepted by the configuration schema.

## Guides

1. [Getting started](/analytics-for-astro/getting-started/)
2. [Configuration reference](/analytics-for-astro/configuration/)
3. [API reference](/analytics-for-astro/api-reference/)
4. [Event client](/analytics-for-astro/events/)
5. [Starlight integration](/analytics-for-astro/starlight/)
6. [Runtime and safety model](/analytics-for-astro/runtime-and-safety/)
7. [Versioning and releases](/analytics-for-astro/versioning-and-releases/)
8. [Release notes](/analytics-for-astro/release-notes/)

## Package entry points

| Entry point | Purpose |
| --- | --- |
| `@codeworkslabs/astro-analytics` | Astro integration and configuration types |
| `@codeworkslabs/astro-analytics/client` | Browser-safe `track()` helper and event types |
| `@codeworkslabs/astro-analytics/starlight` | Starlight plugin wrapper |

The source repository is public. The npm package is currently unpublished and
retains its publication safeguard. Installation, release, site integration, and
deployment remain separate authorized activities.
