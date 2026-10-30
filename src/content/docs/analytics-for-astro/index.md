---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes the commit-pinned
> candidate `0.1.0-alpha.25` at product commit `725ea10b4a839e2f5a8c2959edb0c04481cbbc94`
> before any release tag. The package is not yet published to npm.

These documents describe the npm-unpublished `0.1.0-alpha.25` source of
`@codeworkslabs/astro-analytics`.

The package provides Fathom, Plausible, Google Analytics 4, Matomo, and Umami
adapters for completed-page lifecycle tracking and bounded custom events. It
supports simultaneous providers, per-provider outcomes, blocked-query privacy,
runtime consent transitions, and a Starlight wrapper. It does not provide event
queueing, a consent UI, or persistence of the site's consent decision.

## Guides

1. [Getting started](/analytics-for-astro/getting-started/)
2. [Configuration](/analytics-for-astro/configuration/)
3. [API reference](/analytics-for-astro/api-reference/)
4. [Event client](/analytics-for-astro/events/)
5. [Starlight](/analytics-for-astro/starlight/)
6. [Runtime behavior](/analytics-for-astro/runtime-and-safety/)
7. [Development](/analytics-for-astro/development/)
8. [Versioning and releases](/analytics-for-astro/versioning-and-releases/)
9. [Changelog](/analytics-for-astro/release-notes/)
10. [Verification and troubleshooting](/analytics-for-astro/verification-and-troubleshooting/)

## Package entry points

| Entry point | Purpose |
| --- | --- |
| `@codeworkslabs/astro-analytics` | Astro integration and configuration types |
| `@codeworkslabs/astro-analytics/client` | Browser-safe event and status helpers |
| `@codeworkslabs/astro-analytics/starlight` | Starlight plugin wrapper |

The source repository is public. The npm package is unpublished and retains its
publication safeguard.
