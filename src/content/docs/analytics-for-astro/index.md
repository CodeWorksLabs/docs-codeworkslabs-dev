---
title: Analytics for Astro
description: Configure privacy-conscious, multi-provider analytics for Astro and Starlight.
editUrl: false
---

Connect your Astro website to Fathom, Plausible, Google Analytics 4, Matomo or
Umami. Use one provider or several together, without adding separate tracking
snippets to your pages. Starlight sites use the same settings through a plugin.

Analytics for Astro handles pageviews and gives you one browser API for custom
events, such as a newsletter signup or a download. You can also wait for a
visitor's consent before loading tracking scripts.

## Start here

- **Adding analytics to an Astro site?** Follow [Getting started](/analytics-for-astro/getting-started/).
- **Using Starlight?** Follow [Starlight integration](/analytics-for-astro/starlight/).
- **Choosing or connecting providers?** See [Configuration](/analytics-for-astro/configuration/).
- **Tracking a button or another action?** See [Custom events](/analytics-for-astro/events/).
- **Checking whether data arrived?** Use [Verify tracking and troubleshoot](/analytics-for-astro/verification-and-troubleshooting/).

## What it handles

Pageviews work on ordinary page loads and Astro ClientRouter navigation. With
several providers configured, a single event is offered to each one and you can
inspect each result separately.

Consent controls let your site grant or withdraw permission to make tracking
calls. Your site supplies the consent interface and remembers the visitor's
choice. The package does not include a consent banner.

An event result tells you whether the local adapter accepted the call. It does
not confirm that an analytics server received it. Events are not queued or
retried; the verification guide shows how to check delivery.

## Explore further

| I want to… | Read |
| --- | --- |
| Understand pageviews, consent and sensitive URLs | [Pageviews and privacy](/analytics-for-astro/runtime-and-safety/) |
| Look up a function, result or type | [API reference](/analytics-for-astro/api-reference/) |
| Work on the package | [Contributing and testing](/analytics-for-astro/development/) |
| Check availability and version compatibility | [Versions and availability](/analytics-for-astro/versioning-and-releases/) |
| See what changed | [Release notes](/analytics-for-astro/release-notes/) |

See [Versions and availability](/analytics-for-astro/versioning-and-releases/) for the current
release and supported versions.
