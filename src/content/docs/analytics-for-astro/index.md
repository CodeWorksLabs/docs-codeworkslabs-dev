---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes private
> candidate `0.1.0-alpha.7` at product commit `454893359f8588a71d35d51d1a5e0d16bf355c63`.
> The package is not yet published to npm.

These documents describe the private `0.1.0-alpha.7` Milestone 2 candidate of
`@codeworkslabs/astro-analytics`.

Milestone 2 provides real Fathom, Plausible, and Google Analytics 4 adapters for
pageviews and bounded custom events. The runtime provides simultaneous-provider
coordination, exact per-provider outcomes, and provider readiness diagnostics.
No event queue or runtime consent-transition API is implemented.

Matomo and Umami are approved roadmap providers for the first stable release.
They are placeholders only in alpha.7: neither provider is accepted by the
configuration schema, injected into a page, or exposed by the event client.

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

The package is private and unpublished. Installation, release, site integration,
and deployment remain separate authorized activities.
