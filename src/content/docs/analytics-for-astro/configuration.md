---
title: Configuration reference
description: Strict provider, environment, pageview, and consent configuration.
editUrl: false
---

The default export accepts one `AstroAnalyticsConfig` object. Configuration is
strictly checked at runtime: unknown fields, symbol keys, malformed values, and
non-record objects are rejected with `TypeError`.

Fathom, Plausible, Google Analytics 4, Matomo, and Umami settings drive implemented
current adapters.

## Root configuration

| Field | Type | Default | Current behavior |
| --- | --- | --- | --- |
| `providers` | `false` or non-empty provider array | Required | `false` disables the integration; an array enables one or more independently reported providers |
| `enabled` | `boolean` | `true` | Master integration switch |
| `environments` | object | Production only | Selects Astro config-setup commands that may inject analytics |
| `events` | `boolean` | `false` | `true` enables custom-event dispatch; the client remains available for consent and status control |
| `blockedQueryParameters` | unique parameter-name array | `[]` | Defers first provider activation on matching routes, suppresses package tracking dispatch there, and screens package-supplied referrer context |
| `debug` | `boolean` | `false` | Reserved normalized setting; the current runtime emits no debug output |

Only the listed keys are accepted.

Provider order is preserved. Duplicate provider names are rejected because one
runtime adapter owns each provider identity. An empty array is rejected; use
`providers: false` to disable analytics. Simultaneous sources belong in one
`providers` array so pageview, consent, readiness, and event outcomes remain
independent and observable.

`blockedQueryParameters` accepts at most 32 non-empty, unpadded names of at
most 128 characters each. It is intended for one-time handoff tokens and other
URL state that must be excluded from this integration's tracking payloads. An
initially blocked route prevents first provider activation/load by this
integration. After activation on an allowed route, navigation to a blocked route
suppresses further package-originated pageviews and custom events and defers
provider activation. Already-loaded scripts, globals, adapters and the public
client can remain present; adapter readiness does not mean tracking is permitted
on the current route. Package-supplied document and virtual referrers are also
screened, so a clean return does not forward the blocked URL through that context.

These gates do not retract vendor code already executed or data already sent.
They do not prove the absence of autonomous provider behavior or requests.

GA4 provider-owned pageviews are intentionally incompatible with this boundary:
once Enhanced Measurement owns browser-history tracking, the package cannot
screen a client route before Google observes it. Configuration therefore rejects
`blockedQueryParameters` together with GA4 `pageviews: "provider"`. Select
`pageviews: "astro"` with `historyPageviewsDisabled: true` when this privacy
boundary is required. This is an operator assertion, not a provider setting the
package can verify. GA4 `none` is rejected.

## Environments

```ts
{
  production?: boolean;  // default true; Astro command: build
  preview?: boolean;     // default false; Astro command: preview
  development?: boolean; // default false; Astro command: dev
}
```

Each field is independent. The Astro `sync` command is always disabled.

This policy is evaluated by the integration during Astro configuration setup.
Injection becomes part of generated output; the flags are not runtime kill
switches. In particular, `astro preview` serves an existing build and does not
remove analytics that was included when that output was built.

## Consent modes

`immediate` authorizes package startup immediately. `deferred` and `external`
implement the package's basic-consent boundary: the adapter records only local
Astro route state and creates no vendor global, script, network-capable queue, or
event dispatch until the site calls `setConsent("granted")`. Calling
`setConsent("denied")` before grant keeps that zero-load state. A later grant
starts every configured adapter without reloading the page, once the current
route is allowed and navigation/prerender activation is complete.

After a loaded provider is denied, the package stops its own events and manual
pageviews. GA4 also receives `gtag("consent", "update", ...)`. Other providers
do not expose one shared equivalent, so their already-executed code cannot be
unloaded or prior transmissions retracted; their automatic pageviews remain
disabled, and the package makes no later calls while denied. Regrant resumes
from the most recently confirmed allowed route. The site owns persistence of
the user's choice and must apply it on each new document.

The coordinator retains the latest decision through provider errors and
matching bootstrap re-entry for this document. Vendor notification failure
cannot prevent local denial. Vendor recovery alone never resumes package calls.

## Pageview modes

Every provider accepts an optional `pageviews` field:

| Value | Intended ownership |
| --- | --- |
| `"provider"` | Provider-native ownership where the adapter supports it; the default. GA4 uses its normal config pageview and Enhanced Measurement history behavior |
| `"astro"` | Package-owned pageviews after confirmed Astro/ClientRouter completion |
| `"none"` | No package pageviews for non-GA providers; unsupported for GA4 |

Providers are not behaviorally identical.
For GA4, `"provider"` is native ownership and `"astro"` is manual ownership.
Fathom, Plausible, Matomo, and Umami continue to disable their eager automation
and use the package's confirmed-route lifecycle for both `"provider"` and
`"astro"`; this avoids inventing unsupported native SPA guarantees.
For Matomo, `"none"` still maintains the last completed Astro route's URL,
title, and virtual-referrer context so custom events are attributed correctly;
it never calls `trackPageView`.

## Google Analytics 4

```js
analytics({
  providers: [
    {
      name: "google-analytics",
      measurementId: "G-EXAMPLE123",
      consent: {
        mode: "deferred",
        initial: {
          analyticsStorage: "denied",
          adStorage: "denied",
          adUserData: "denied",
          adPersonalization: "denied",
        },
      },
      pageviews: "provider",
    },
  ],
});
```

| Field | Requirement |
| --- | --- |
| `name` | Exactly `"google-analytics"` |
| `measurementId` | Required non-empty `G-` identifier containing letters or digits |
| `consent.mode` | Required: `"immediate"`, `"deferred"`, or `"external"` |
| `consent.initial.analyticsStorage` | Required when `initial` is present; `"granted"` or `"denied"` |
| Other initial consent fields | Optional `"granted"` or `"denied"` values |
| `scriptSrc` | Optional absolute HTTPS URL without credentials; defaults to the GA4 gtag URL |
| `config` | Optional plain record of strings, finite numbers, and booleans; `send_page_view` is rejected because `pageviews` owns that decision |
| `pageviews` | Optional pageview mode; default `"provider"` |
| `historyPageviewsDisabled` | Literal `true` required for GA4 Astro ownership; rejected with provider ownership. Operator assertion, not a setting verified by this package |

With `consent.mode: "immediate"`, the adapter creates package-owned `gtag` and
`dataLayer` globals, emits any configured Google consent default before
`config`, and loads gtag.js. This is immediate or advanced Consent Mode behavior,
not basic preauthorization blocking. `deferred` and `external` start pending and
load no Google code or script until `setConsent("granted")`; that grant occurs
without a reload. Later denial sends a Google Consent Mode update and blocks
package event/manual-pageview dispatch. Google may still send consent-aware,
cookieless measurements after a loaded tag is denied; already sent data cannot
be withdrawn.

The default `pageviews: "provider"` leaves `send_page_view` at Google's normal
default. The initial config pageview and Enhanced Measurement own subsequent
history-based page changes; the package never adds manual `page_view` events in
this mode. This is the ordinary Measurement-ID-only setup and requires no
special GA Admin change. Because Google owns the route observation, package
virtual-referrer and blocked-query guarantees do not apply to those native
pageviews.

`pageviews: "astro"` forces `send_page_view: false` and sends manual
`page_view` events after `astro:page-load`, including the current location,
title, and preceding allowed virtual URL. In this advanced mode, disable **Page
changes based on browser history events** under GA4 Enhanced Measurement so the
two owners are not combined, then set `historyPageviewsDisabled: true` to assert
that prerequisite. The package cannot inspect GA Admin or enforce that setting.
The overall **Enhanced measurement** switch may remain enabled; it is the
specific history-change checkbox that must be off for Astro ownership. Other
measurement options are separate operator choices. See the
[verification guide](/analytics-for-astro/verification-and-troubleshooting/) for the saved-setting
check and provider reporting procedure.
GA4 `pageviews: "none"` is unsupported: `send_page_view: false` does not disable
Enhanced Measurement history tracking. Events without any GA pageviews are not
a supported guarantee. `providers: false` is the canonical fully-off state and
injects no package runtime, provider script, global, request, event, or pageview.

Custom events accept at most 25 properties. `send_to` is reserved and rejected
in caller properties because the adapter supplies the configured Measurement ID.

## Plausible

```js
analytics({
  providers: [
    {
      name: "plausible",
      scriptSrc: "https://analytics.example.com/js/script.js",
      endpoint: "https://analytics.example.com/api/event",
      consent: { mode: "immediate" },
      captureOnLocalhost: false,
      pageviews: "provider",
    },
  ],
});
```

`scriptSrc` is required. `scriptSrc` and `endpoint` must be absolute HTTPS URLs
without embedded credentials. `captureOnLocalhost` must be boolean. Consent, when
present, contains only `mode`. The script URL is Plausible's current
site-specific snippet URL, such as `https://plausible.io/js/pa-XXXXX.js`.

The adapter calls `plausible.init()` before loading the script with
`autoCapturePageviews: false`, the configured endpoint when present, and the
configured localhost policy. Astro owns initial and client-navigation
pageviews, including consecutive observed completions at the same URL. A missing
Astro page-load observer keeps the adapter not loaded. Omit consent or use
`immediate` to load Plausible. `deferred` and `external` remain zero-load until
the shared client receives a grant; withdrawal stops later package calls but
cannot remove Plausible code that already executed.

Plausible custom events need a matching **Custom event** goal in the correct
site to appear as dashboard conversions. Use the exact `track()` event name,
including case, spaces and underscores. Create the goal before testing and
trigger a fresh event afterward. A missing goal does not imply failed delivery;
see [provider-side verification](/analytics-for-astro/verification-and-troubleshooting/).

## Fathom

```js
analytics({
  providers: [
    {
      name: "fathom",
      siteId: "YOUR-SITE-ID",
      consent: { mode: "external" },
      honorDnt: true,
      canonical: true,
      pageviews: "provider",
    },
  ],
});
```

`siteId` is required and is trimmed. `scriptSrc` is optional and defaults to
`https://cdn.usefathom.com/script.js`. `honorDnt` and `canonical` must be boolean.
Consent, when present, contains only `mode`. Omit consent or use `immediate` to
load Fathom. `deferred` and `external` create no vendor script until grant.
Withdrawal stops later package pageview and event calls; it cannot retract data
already accepted by Fathom.

For Fathom, `honorDnt: true` emits `data-honor-dnt="true"` and
`canonical: false` emits `data-canonical="false"`. The default
`pageviews: "provider"` disables Fathom's eager automation and invokes Fathom
after Astro's `astro:page-load` event so canonical content has already swapped
on client navigation, including browser history traversal. Initial script
readiness sends the initial document only when no navigation is in flight. If a
post-swap page-load arrives before Fathom is ready, it is retained and sent once
the vendor loads; a load during an in-flight navigation waits for the post-swap
signal. `pageviews: "astro"` currently selects the same behavior explicitly.
Every observed completion is distinct even when the browser URL is unchanged.
If the Astro page-load observer cannot be installed, Fathom remains not loaded
and recovery waits for a later observed completion rather than inferring one
across the gap. `pageviews: "none"` sends no pageviews.

## Disabled configuration

```js
analytics({ providers: false });
```

This disables injection even if `events: true` or an environment flag is true.

## Matomo

```js
analytics({
  providers: [
    {
      name: "matomo",
      trackerUrl: "https://analytics.example.com/matomo.php",
      siteId: "1",
      eventCategory: "Website",
      consent: { mode: "immediate" },
      pageviews: "provider",
    },
  ],
  events: true,
});
```

| Field | Requirement |
| --- | --- |
| `name` | Exactly `"matomo"` |
| `trackerUrl` | Required absolute HTTPS URL ending in `/matomo.php`, without credentials, query, or fragment |
| `siteId` | Required positive integer string |
| `eventCategory` | Required non-empty string of at most 128 characters |
| `scriptSrc` | Optional absolute HTTPS URL; defaults to `matomo.js` beside `trackerUrl` |
| `consent.mode` | Optional: `"immediate"`, `"deferred"`, or `"external"`; omitted means immediate |
| `pageviews` | Optional pageview mode; default `"provider"` |

The adapter creates the standard `_paq` startup queue and, after validated
script readiness, adopts Matomo's replacement command proxy. It configures the
exact tracker URL and site ID and loads `matomo.js`. It deliberately omits Matomo's
eager `trackPageView` call. After script readiness, Astro sends the initial and
client-navigation pageviews with current URL and title plus the preceding
virtual URL as referrer. The adapter does not enable Matomo's automatic link
tracking. While its provider runtime remains active, completed routes are
observed separately from the pending send. Delayed readiness coalesces pending
routes to the latest observed completion. With
`pageviews: "none"`, the same completed-route context is applied for custom events
without emitting automatic pageviews.

Each provider runtime owns its navigation listeners; the shared client
coordinator retains consent decisions, not a document-wide navigation history.
A failed runtime removes its listeners and state. Matching re-entry therefore
cannot reconstruct routes completed during that gap. When it establishes a
route without a preceding observed route, it falls back to the allowed
`document.referrer`, or an empty string if that referrer is absent or blocked.
That can be the document's original external referrer rather than the last
virtual route. Later observed completions use the preceding observed URL.
Do not rely on recovery to reconstruct attribution across an unobserved gap.

Immediate consent loads Matomo. Deferred and external modes create neither
`_paq` nor the tracker script until grant. Withdrawal stops later package queue
commands but cannot erase Matomo code or data already sent.

## Umami

```js
analytics({
  providers: [
    {
      name: "umami",
      websiteId: "e676c9b4-11e4-4ef1-a4d7-87001773e9f2",
      scriptSrc: "https://analytics.example.com/script.js",
      hostUrl: "https://analytics.example.com",
      consent: { mode: "immediate" },
      pageviews: "provider",
    },
  ],
  events: true,
});
```

| Field | Requirement |
| --- | --- |
| `name` | Exactly `"umami"` |
| `websiteId` | Required UUID string from the Umami website record |
| `scriptSrc` | Required absolute HTTPS tracker-script URL without embedded credentials |
| `hostUrl` | Optional absolute HTTPS collection host URL without credentials, query, or fragment |
| `consent.mode` | Optional: `"immediate"`, `"deferred"`, or `"external"`; omitted means immediate |
| `pageviews` | Optional pageview mode; default `"provider"` |

The adapter supports Umami Cloud and self-hosted Umami. It always emits
`data-auto-pageview="false"` so Umami cannot duplicate Astro-owned pageviews,
while leaving the tracker initialized for explicit events. The optional
`hostUrl` maps to Umami's `data-host-url` setting when the script and collection
host differ. On an ordinary multi-page Astro or Starlight site, the initial
pageview is sent through `umami.track()` after DOM readiness. When Astro's
ClientRouter is present, the adapter waits for its post-swap `astro:page-load`
signal for the initial route and every client navigation. Both paths use the
current URL and title and the known preceding URL as referrer; tracker readiness
alone never manufactures a route completion. Once the tracker is ready, every
observed completion is sent even when its URL matches the preceding completion.
Before readiness, completed routes coalesce to the latest confirmed route and
superseded history is not replayed.

`data-auto-pageview` was introduced by Umami 3.2.0, so the Umami adapter requires an
Umami 3.2-or-later tracker. Earlier self-hosted trackers are not supported
because they cannot provide the package's duplicate-pageview guarantee.

Immediate consent loads Umami. Deferred and external modes create neither a
tracker script nor `window.umami` until grant. Withdrawal stops later package
calls but cannot erase Umami code or data already sent.
Initialization requires `window.umami` to be absent before script loading.
After the configured script's load event, readiness checks that the current
global has a `track` function. These timing and API-shape checks do not prove
which script assigned that object or verify its collection host. Other
same-origin code can assign the global during loading; keep initialization
exclusive and trust the configured tracker script.

Custom events use Umami's payload-factory form with the event name and data plus
the last completed Astro route's URL, title, and referrer. This prevents the
vendor's private history state from misattributing events after browser-history
traversal or delayed loading. Event-only mode still observes ordinary document
readiness or ClientRouter page-loads to maintain this context without sending
pageviews. Umami-specific validation
limits names to 50 characters, data to 50 properties, strings to 500 characters,
and numbers to four decimal places. The shared package's stricter primitive-only
event shape remains in force, so nested Umami event objects and arrays are not
accepted by the current adapter.
