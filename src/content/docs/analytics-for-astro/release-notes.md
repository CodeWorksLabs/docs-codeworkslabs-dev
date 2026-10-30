---
title: Release notes
description: Changes and upgrade notes for Analytics for Astro.
editUrl: false
---

This page records changes to Analytics for Astro. For installation and current
availability, see [Versions and availability](/analytics-for-astro/versioning-and-releases/).

## 0.1.0-alpha.25

- Fix Umami events with valid decimal values such as `0.07` and `0.0003`.
  Values with more than four decimal places are still rejected rather than rounded.
- Make event and consent helpers reject contradictory client results while
  preserving valid results from other providers.
- Clarify Matomo referrers after recovery, Umami script readiness and tracking
  on URLs with blocked query parameters.

## 0.1.0-alpha.24

- Add a guide to checking provider dashboards and troubleshooting missing data,
  including Plausible goals and GA4 history-change pageviews.
- Update the development test dependencies to Astro 7.3.3 and compatible security
  fixes. Supported configuration and peer ranges are unchanged.

## 0.1.0-alpha.23

- Wait to start trackers until the current route is allowed and navigation has
  completed. Keep a consent grant until tracking can safely start.
- Stop package tracking on denial even if a provider notification fails. A
  failed provider's recovery does not silently grant consent again.
- Require `historyPageviewsDisabled: true` for Astro-owned GA4 pageviews. Reject
  GA4 `pageviews: "none"`, which cannot disable all native history pageviews.
- Tighten event-property validation while accepting ordinary objects from other
  browser contexts and objects without a prototype.
- Clarify that blocking a later route suppresses package calls but does not
  uninstall scripts already loaded on an allowed route.

## 0.1.0-alpha.22

- Add runtime consent controls for Astro and Starlight: grant, denial,
  withdrawal and regrant without a page reload.
- Make Google-owned pageviews the GA4 default. Keep Astro-owned pageviews as an
  explicit alternative with a required provider-setting confirmation.
- Reject GA4's default pageview mode when blocked query parameters are configured.

## 0.1.0-alpha.21

- Apply the same event-property validation to the imported helper and browser
  global. Reject hidden properties, getters, symbol keys and unsupported objects.

## 0.1.0-alpha.20

- Standardize configuration on the `providers` array and boolean `events` option.
  Remove the earlier singular `provider` and object-shaped `events` inputs.
- Remove unused `AnalyticsAdapter`, `AnalyticsEvent` and `AdapterRuntimePlan`
  exports. Applications should use the documented configuration and client types.
- Share navigation, consent and script-handling behavior across the five providers.
- Retain simultaneous providers, custom events, ClientRouter pageviews,
  blocked-query handling and the Starlight plugin.

## Earlier alpha development

Earlier test versions introduced the Fathom, Plausible, GA4, Matomo and Umami
adapters, multiple-provider events, pageview handling and Starlight support.
These were development packages; consult repository history for older changes.
