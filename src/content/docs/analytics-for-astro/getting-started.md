---
title: Getting started
description: Requirements and setup for the commit-pinned Analytics for Astro candidate.
editUrl: false
---

Analytics for Astro is currently `0.1.0-alpha.25` and is not published to npm.
Use an authorized local package artifact or workspace dependency.

## Requirements

- Node.js 22.18.0 or later
- Astro 7.3.2 or later within Astro 7
- Starlight 0.41.11 through 0.42 when using the Starlight entry point

These are manifest eligibility ranges, not a claim that every matching version
has been tested. The package ships Astro-native TypeScript source and should be
loaded through Astro or another TypeScript-aware build pipeline.

## Configure Astro

```js
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [
    analytics({
      providers: [
        { name: "fathom", siteId: "YOUR-SITE-ID" },
      ],
      events: true,
    }),
  ],
});
```

Production builds are enabled by default. Development and preview setup are
disabled unless selected through `environments`.

```js
analytics({
  providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
  environments: { development: true },
  events: true,
});
```

## Use the client helper

```ts
import { configuredProviders, consentStatuses, providerStatuses, setConsent, track }
  from "@codeworkslabs/astro-analytics/client";

// Invoke after the site has obtained the visitor's grant.
setConsent("granted");
const result = track("purchase", { value: 25 });
console.log(result.providers);
console.log(configuredProviders(), consentStatuses(), providerStatuses());
```

Before an adapter is ready, its result is `adapter-not-loaded`. Deferred and
external consent configurations return `consent-pending` and load no vendor
until `setConsent("granted")`; denial before grant remains zero-load.

For ordinary GA4 setup, provide the Measurement ID and leave `pageviews` at its
default `"provider"`; Google owns its normal config and Enhanced Measurement
pageviews. Select `pageviews: "astro"` only when the site deliberately wants
manual Astro lifecycle ownership and has disabled GA history-based page changes.
That mode requires `historyPageviewsDisabled: true` as an explicit operator
assertion; the package cannot inspect the provider setting. GA4 `none` is not
supported. Use `providers: false` for completely disabled analytics.

## Self-hosted providers

Matomo requires its public `trackerUrl`, numeric `siteId`, and an event category.
Umami requires its public website UUID and tracker script URL; `hostUrl` is
optional. These are browser tracking values, not administrative credentials.
Umami 3.2.0 or later is required for package-owned pageviews.

Continue with [Configuration](/analytics-for-astro/configuration/), [Event client](/analytics-for-astro/events/), and
[Runtime behavior](/analytics-for-astro/runtime-and-safety/).
