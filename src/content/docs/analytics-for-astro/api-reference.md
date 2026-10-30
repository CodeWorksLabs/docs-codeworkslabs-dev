---
title: API reference
description: Public package entry points, exports, and browser helpers.
editUrl: false
---

Use the main entry point in your Astro configuration, the client entry point in
browser code, and the Starlight entry point for a Starlight plugin.

| Import path | Use it for |
| --- | --- |
| `@codeworkslabs/astro-analytics` | Configuring the Astro integration |
| `@codeworkslabs/astro-analytics/client` | Sending events, applying consent and checking readiness |
| `@codeworkslabs/astro-analytics/starlight` | Configuring the Starlight plugin |

For complete working examples, start with [Getting started](/analytics-for-astro/getting-started/),
[Custom events](/analytics-for-astro/events/) or [Starlight](/analytics-for-astro/starlight/).

## `analytics(config)`

```ts
import analytics, { type AstroAnalyticsConfig }
  from "@codeworkslabs/astro-analytics";

const config: AstroAnalyticsConfig = {
  providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
};
const integration = analytics(config);
```

The default export returns an Astro integration. Add it to `integrations` in
your Astro config. Invalid options throw `TypeError` when you create it; see the
[configuration reference](/analytics-for-astro/configuration/) for provider and shared options.

## `track(name, properties?)`

```ts
import { track } from "@codeworkslabs/astro-analytics/client";

const result = track("plan_selected", { plan: "starter" });
console.log(result.providers);
```

Returns a synchronous `TrackResult`. `ok` is true only if every configured
provider accepts the event locally. It does not confirm network delivery.
Properties contain strings, finite numbers or booleans. See [event limits and
results](/analytics-for-astro/events/) for provider-specific rules and partial failures.

```ts
type TrackResult =
  | { ok: true; providers: ProviderTrackResults }
  | { ok: false; providers: ProviderTrackResults; reason?: TrackFailureReason };
```

`TrackFailureReason` is `disabled`, `adapter-not-loaded`, `consent-pending`,
`consent-denied` or `invalid-event`. Per-provider reasons exclude `disabled`.
`ProviderTrackResults` maps provider names to `{ ok: true }` or
`{ ok: false; reason: ProviderTrackFailureReason }`.

## `configuredProviders()`

Returns the ordered, read-only provider names for the current usable client, or
an empty array when no usable client exists. It does not choose a provider or
start tracking.

## `providerStatuses()`

Returns a read-only map of configured providers to `ready`, `adapter-not-loaded`,
`consent-pending` or `consent-denied`. Use it for readiness feedback without
sending events. No usable client produces an empty map. Readiness does not
override a blocked route or establish server availability.

## `consentStatuses()`

Returns each configured provider's current package consent state: `pending`,
`granted` or `denied`. No usable client produces an empty map.

## `setConsent(decision)`

```ts
import { setConsent } from "@codeworkslabs/astro-analytics/client";

const result = setConsent("granted"); // or "denied"
console.log(result.ok, result.providers);
```

Applies the site decision to all configured providers. Returns immediately:

```ts
type ConsentUpdateResult =
  | { ok: true; providers: ProviderConsentStates }
  | {
      ok: false;
      providers: ProviderConsentStates;
      reason: "adapter-not-loaded" | "disabled" | "invalid-consent";
    };
```

An accepted grant can start scripts loading; it does not mean they are ready.
The site must remember and restore the choice across full page loads. See the
[complete consent example](/analytics-for-astro/runtime-and-safety/#wait-for-consent).

## `starlightAnalytics(config)`

```ts
import { starlightAnalytics } from "@codeworkslabs/astro-analytics/starlight";

const plugin = starlightAnalytics({
  providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
});
```

Returns a Starlight plugin. Add it to Starlight's `plugins` array. It accepts
the same `AstroAnalyticsConfig` as `analytics()`.

## Helpers for configuration tools

Most sites do not need these two main-entry-point exports:

- `normalizeConfig(value: unknown): NormalizedAstroAnalyticsConfig` validates,
  copies and fills in defaults. Invalid values throw `TypeError`.
- `isEnabledForCommand(config, command): boolean` checks a normalized config for
  the Astro `dev`, `build`, `preview` or `sync` command. It cannot change tracking
  in an already built page.

## Types and validation constants

The main entry point exports `AstroAnalyticsConfig`, `AnalyticsProvider`, the
five provider types (`FathomProvider`, `PlausibleProvider`,
`GoogleAnalyticsProvider`, `MatomoProvider`, `UmamiProvider`),
`GoogleConsentConfig`, `ConsentMode`, `ConsentState`, `PageviewMode`,
`AnalyticsEnvironments`, `AnalyticsCommand`, `NormalizedAnalyticsProvider` and
`NormalizedAstroAnalyticsConfig`.

The client entry point exports `EventProperties`, `ProviderName`, `TrackResult`,
`TrackFailureReason`, `ProviderTrackResult`, `ProviderTrackResults`,
`ProviderTrackFailureReason`, `ProviderRuntimeStatus`, `ProviderRuntimeStatuses`,
`ConsentDecision`, `ConsentUpdateResult`, `ProviderConsentState`,
`ProviderConsentStates` and `AstroAnalyticsClient`.

For form validation, the client also exports `EVENT_NAME_MAX_LENGTH` (128),
`EVENT_PROPERTY_COUNT_MAX` (100), `EVENT_PROPERTY_KEY_MAX_LENGTH` (128) and
`EVENT_PROPERTY_STRING_MAX_LENGTH` (1,024). Provider limits can be lower.

## Browser global

When injected, `window.astroAnalytics` exposes `providers`, `track()`, `status()`,
`consent()` and `setConsent()`. Prefer the imported helpers: they also handle
missing or unusable browser clients. The global is frozen, but it is not a
security boundary against other JavaScript on the page.
