---
title: Release notes
description: Complete pre-release history for Analytics for Astro.
editUrl: false
---

Analytics for Astro follows [Semantic Versioning](https://semver.org/). The
package is not currently published to npm.

## 0.1.0-alpha.25

- Accept valid Umami decimals such as 0.07 and 0.0003 while rejecting values
  with more than four decimal places without rounding the outgoing payload.
- Reject contradictory imported event summaries and consent-success states;
  preserve valid independent provider outcomes.
- Correct Matomo recovery/referrer, Umami ownership and exported blocked-query
  descriptions to match the implemented boundaries.

## 0.1.0-alpha.24

- Add an operator verification guide covering provider-side evidence,
  Plausible custom-event goals, the GA4 history-pageview prerequisite,
  synchronous event acceptance and separate lifecycle/privacy qualification.
- Refresh the development qualification graph to Astro 7.3.3 and corrected
  compatible transitives. Runtime API and declared peer ranges are unchanged.

## 0.1.0-alpha.23

- Clarify initial blocked-route activation versus later package tracking
  suppression, retained vendor/client state and autonomous-provider limits.
  Align every current GA4 mode description with the public rejection of `none`.

- Gate every provider activation on the current allowed route and document
  activation; retain a grant until an allowed completed route can start it.
- Apply denial locally even if vendor notification fails, and retain the
  latest document decision across provider failure and matching re-entry.
- Reject GA4 `pageviews: "none"`; require `historyPageviewsDisabled: true` as an
  explicit, unverified operator assertion for advanced Astro-owned pageviews.
  Provider-owned GA4 remains the ordinary default; `providers: false` remains
  the fully-off configuration.
- Reject forged event-property prototypes borrowing the native Object
  constructor while preserving genuine cross-realm and null-prototype records.

## 0.1.0-alpha.22

- Add synchronous runtime consent inspection and grant/deny transitions for
  plain Astro and Starlight, including zero-load basic consent, withdrawal,
  regrant, idempotence, and provider-specific limits.
- Make GA4 provider-owned config and Enhanced Measurement pageviews the ordinary
  default. Retain manual Astro-owned pageviews as an explicit mode and prevent
  silent dual ownership through configuration validation and documentation.
- Reject GA4 provider-owned pageviews when blocked-query privacy is configured,
  because native history tracking cannot honor the package route boundary.

## 0.1.0-alpha.21

- Enforce one exact event-property record boundary for both the imported client
  helper and direct browser client. Symbol-keyed, non-enumerable, accessor, and
  branded property bags now fail closed instead of being accepted or silently
  reduced.

## 0.1.0-alpha.20

- Remove the unused `AnalyticsAdapter`, `AnalyticsEvent`, and
  `AdapterRuntimePlan` exports.
- Remove the unpublished singular `provider` and object-shaped `events`
  compatibility inputs; `providers` and boolean `events` now define the
  configuration contract.
- Replace five duplicated browser runtime state machines with shared lifecycle,
  route, consent, script, cleanup, and event coordination plus provider-specific
  adapters.
- Retain Fathom, Plausible, GA4, Matomo, and Umami, simultaneous-provider
  operation, ClientRouter completion tracking, blocked-query privacy, bounded
  events, provider status reporting, and the Starlight wrapper.
- Replace internal process chronology in public documentation with current
  behavior, limitations, compatibility, installation, and version facts.

## Earlier alpha development

Earlier alpha versions established the five provider integrations,
simultaneous-provider results, bounded custom events, Astro and ClientRouter
pageview lifecycles, virtual referrers, blocked-query privacy, Starlight support,
and reproducible package metadata. Those versions were development artifacts;
consult Git history when implementation-level provenance is required.
