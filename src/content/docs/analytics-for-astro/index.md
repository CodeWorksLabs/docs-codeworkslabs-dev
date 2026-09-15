---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

> **Pre-release documentation** · This public snapshot describes the commit-pinned
> candidate `0.1.0-alpha.20` at product commit `ae6a9884e3cada297f11c641a90082f296380bcb`
> before any release tag. The package is not yet published to npm.

These documents describe the npm-unpublished `0.1.0-alpha.20` source of
`@codeworkslabs/astro-analytics`.

The package provides Fathom, Plausible, Google Analytics 4, Matomo, and Umami
adapters for completed-page lifecycle tracking and bounded custom events. It
supports simultaneous providers, per-provider outcomes, blocked-query privacy,
and a Starlight wrapper. It does not provide event queueing or runtime consent
activation.

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

## Package entry points

| Entry point | Purpose |
| --- | --- |
| `@codeworkslabs/astro-analytics` | Astro integration and configuration types |
| `@codeworkslabs/astro-analytics/client` | Browser-safe event and status helpers |
| `@codeworkslabs/astro-analytics/starlight` | Starlight plugin wrapper |

The source repository is public. The npm package is unpublished and retains its
publication safeguard.
