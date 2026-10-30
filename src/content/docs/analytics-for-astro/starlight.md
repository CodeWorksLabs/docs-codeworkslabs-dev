---
title: Starlight integration
description: Add Analytics for Astro through Starlight's plugin interface.
editUrl: false
---

The Starlight entry point wraps the core Astro integration as a Starlight plugin.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import {
  starlightAnalytics,
} from "@codeworkslabs/astro-analytics/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "My documentation",
      plugins: [
        starlightAnalytics({
          providers: [
            {
              name: "fathom",
              siteId: "YOUR-SITE-ID",
            },
          ],
          events: true,
        }),
      ],
    }),
  ],
});
```

Place `starlightAnalytics()` in Starlight's `plugins` array, not Astro's top-level
`integrations` array. The wrapper calls Starlight's `addIntegration()` with the
core Analytics for Astro integration and does not override Starlight components.

The same [configuration reference](/analytics-for-astro/configuration/) applies to Astro and
Starlight.
Use the shared [verification guide](/analytics-for-astro/verification-and-troubleshooting/) to
check provider-side reporting, consent transitions and navigation separately.

The current package supports the same consent transitions and provider-specific
pageview ownership in Starlight as in plain Astro. GA4 provider-owned pageviews
remain the default; explicit Astro ownership follows Starlight's post-swap
`astro:page-load` lifecycle. Deferred and external consent load no vendor until
the shared client receives a grant.

Matomo and Umami use this same wrapper and configuration contract. Umami's
tracker attributes and browser runtime are injected by the core Astro
integration; the Starlight wrapper adds no provider-specific component override.
