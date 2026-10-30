---
title: Configuration reference
description: Strict provider, environment, pageview, and consent configuration.
editUrl: false
---

Choose your provider below and copy its example into `astro.config.mjs`. Replace
the IDs and addresses with the public tracking values from your account. Never
put account passwords or administrative API keys in site configuration.

Using Starlight? Pass these same options to [`starlightAnalytics()`](/analytics-for-astro/starlight/).

## Fathom

You need the site ID from your Fathom account.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
    events: true,
  })],
});
```

| Option | Use |
| --- | --- |
| `siteId` | Required Fathom site ID |
| `scriptSrc` | Optional HTTPS script URL; defaults to `https://cdn.usefathom.com/script.js` |
| `honorDnt` | Set `true` to ask Fathom to honor Do Not Track |
| `canonical` | Set `false` to ask Fathom not to use the canonical URL |

The integration disables Fathom's automatic pageviews and sends pageviews after
Astro finishes loading each page. Do not install a separate Fathom snippet.

## Plausible

Copy the site-specific script URL from your Plausible installation instructions.
Replace the example URL below with that complete URL.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{
      name: "plausible",
      scriptSrc: "https://plausible.io/js/pa-YOUR-SCRIPT-ID.js",
    }],
    events: true,
  })],
});
```

| Option | Use |
| --- | --- |
| `scriptSrc` | Required HTTPS script URL |
| `endpoint` | Optional HTTPS event endpoint, if your installation needs one |
| `captureOnLocalhost` | Optional boolean; use `true` when deliberately testing local traffic |

The integration initializes Plausible with automatic pageviews disabled and sends
pageviews after Astro navigation completes. Do not also paste Plausible's embed
into your layout. To see custom events as dashboard conversions, first create
[matching goals](/analytics-for-astro/verification-and-troubleshooting/#prepare-plausible-custom-event-reporting).

## Google Analytics 4

Create a web stream in GA4 and copy its Measurement ID, beginning with `G-`.
GA4 requires an explicit consent mode in this package.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{
      name: "google-analytics",
      measurementId: "G-EXAMPLE123",
      consent: { mode: "immediate" },
    }],
    events: true,
  })],
});
```

This example loads Google's tag immediately. Choose `deferred` or `external`
instead if the site must [wait for a visitor's grant](/analytics-for-astro/runtime-and-safety/#wait-for-consent).

By default, Google handles pageviews, including history changes observed by
Enhanced Measurement. You do not need to change GA4's history setting for this
default. Do not install another Google tag for this stream through a layout or
tag manager alongside this integration.

### Let Astro send GA4 pageviews

Use this alternative to tie pageviews to completed Astro navigation, or when
you use `blockedQueryParameters`:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{
      name: "google-analytics",
      measurementId: "G-EXAMPLE123",
      consent: { mode: "deferred" },
      pageviews: "astro",
      historyPageviewsDisabled: true,
    }],
    events: true,
    blockedQueryParameters: ["handoff_token"],
  })],
});
```

Before using it, turn off **Page changes based on browser history events** in
this stream's Enhanced Measurement pageview settings. The overall Enhanced
Measurement switch can stay on. Follow the
[saved-setting check](/analytics-for-astro/verification-and-troubleshooting/#avoid-duplicate-ga4-pageviews).

`historyPageviewsDisabled: true` records your confirmation; it does not change
or inspect GA4 settings. This mode disables Google's initial config pageview
and sends manual `page_view` events. The example still needs a consent grant.

| Other GA4 option | Use |
| --- | --- |
| `config` | Optional Google configuration values: strings, finite numbers or booleans. `send_page_view` is reserved for the integration |
| `scriptSrc` | Optional HTTPS override for the Google tag script |
| `consent.initial` | Optional Google consent defaults. If supplied, `analyticsStorage` is required; `adStorage`, `adUserData` and `adPersonalization` are optional. Values are `"granted"` or `"denied"` |

For example, use this `consent` value inside a GA4 provider to wait for a grant
and supply explicit Google defaults:

```js
const consent = {
  mode: "deferred",
  initial: {
    analyticsStorage: "denied",
    adStorage: "denied",
    adUserData: "denied",
    adPersonalization: "denied",
  },
};
```

With immediate loading, denied Google defaults do not mean zero network
requests: the loaded tag can make consent-aware requests. Use deferred or
external mode when scripts must not load before grant.

## Matomo

Add your website in Matomo. Copy its numeric site ID and tracking address, then
choose an event category to group your site's custom events.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{
      name: "matomo",
      trackerUrl: "https://analytics.example.com/matomo.php",
      siteId: "1",
      eventCategory: "Website",
    }],
    events: true,
  })],
});
```

`trackerUrl` must end in `/matomo.php`, with no query string or fragment.
`siteId` is a positive integer written as a string. `eventCategory` is a
non-empty string, at most 128 characters long.

The script defaults to `matomo.js` beside your tracking address. Set `scriptSrc`
to an HTTPS URL if it lives elsewhere. The integration keeps the URL, page title
and referrer up to date. It does not enable Matomo's automatic link tracking;
use [custom events](/analytics-for-astro/events/) for actions you want to measure.

## Umami

Add a website in Umami, then copy its website UUID and script URL. Use an Umami
3.2.0-or-later tracker; earlier trackers cannot disable automatic pageviews in
the way this integration needs.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{
      name: "umami",
      websiteId: "e676c9b4-11e4-4ef1-a4d7-87001773e9f2",
      scriptSrc: "https://analytics.example.com/script.js",
    }],
    events: true,
  })],
});
```

Replace both example values. The adapter supports self-hosted Umami and Umami
Cloud. If the script sends data to a different collection host, add `hostUrl`,
such as `https://collect.example.com`. It must be HTTPS, with no query or fragment.

The integration disables Umami's automatic pageviews and supplies the completed
page's URL, title and referrer for pageviews and events. Avoid another script
that initializes `window.umami`: a preexisting global prevents startup. The
readiness check cannot prove which script assigned that global during loading
or verify its collection host.

## Use several providers together

Add providers to one array. This complete example uses Fathom and Plausible:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [
      { name: "fathom", siteId: "YOUR-SITE-ID" },
      { name: "plausible", scriptSrc: "https://plausible.io/js/pa-YOUR-SCRIPT-ID.js" },
    ],
    events: true,
  })],
});
```

Each provider name can appear once. A failure in one does not prevent another
from accepting an event. There is no active-provider selector: `track()` attempts
every configured provider. See [event results](/analytics-for-astro/events/#read-the-result).

## Shared options

| Option | Default | What it does |
| --- | --- | --- |
| `providers` | Required | A non-empty provider array, or `false` to turn the integration off |
| `events` | `false` | Allows custom events when `true`; not needed for pageviews or consent controls |
| `enabled` | `true` | Turns injection on or off at build/configuration time |
| `environments` | Production builds only | Enables injection for Astro build, dev or preview setup |
| `blockedQueryParameters` | `[]` | Suppresses package tracking on URLs with any named query parameter |
| `debug` | `false` | Reserved; currently produces no debug output |

Unknown fields and malformed values cause a `TypeError`. Script and endpoint
URLs must be absolute HTTPS URLs without embedded credentials.

### Consent

Each provider accepts `consent: { mode: "immediate" | "deferred" | "external" }`.
GA4 requires this option; the other four default to immediate loading. Deferred
and external both wait for `setConsent("granted")`. Neither connects to a consent
manager automatically. See the [complete consent example](/analytics-for-astro/runtime-and-safety/#wait-for-consent).

### Pageviews

| `pageviews` | Behavior |
| --- | --- |
| `"provider"` (default) | GA4 uses Google's native tracking; the other four providers use completed Astro pages |
| `"astro"` | All five use completed Astro pages. GA4 also requires the history setting described above |
| `"none"` | Disables package pageviews for non-GA providers; custom events can still be enabled |

GA4 does not support `"none"`: suppressing its config pageview does not turn off
Enhanced Measurement history tracking. Use `providers: false` to disable the
entire integration.

### Development and production builds

Add `environments: { development: true }` to include analytics in `astro dev` as
well as production builds. Use test properties to avoid mixing test traffic with
real visitors.

`production`, `development` and `preview` are independent booleans; omitted
values are `true`, `false` and `false` respectively. They control injection when
Astro sets up configuration, not an already built site. In particular, `astro
preview` still serves analytics included by `astro build`. Astro's `sync` command
never injects analytics.

### Sensitive query parameters

Add `blockedQueryParameters: ["handoff_token"]` to suppress package tracking on
URLs containing that parameter. Names are case-sensitive; supply up to 32 unique,
unpadded names, each 1–128 characters. Read [sensitive URLs](/analytics-for-astro/runtime-and-safety/#exclude-sensitive-urls)
before relying on this option. It cannot be combined with GA4 provider-owned
pageviews.

### Turn analytics off

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({ providers: false })],
});
```

Rebuild and redeploy for this change to take effect. It does not remove scripts
from pages visitors already have open.
