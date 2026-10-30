---
title: Runtime and safety model
description: Browser ownership, lifecycle, failure isolation, and privacy boundaries.
editUrl: false
---

The browser runtime has three layers: one location policy, one shared event
coordinator, and a small provider adapter for each configured service. Provider
adapters share script loading, consent handling, Astro lifecycle observation,
route context, error cleanup, and registration logic.

## Page lifecycle

On an ordinary document, an adapter records the current URL, title, and allowed
document referrer and sends the initial pageview after its vendor becomes ready.
With Astro ClientRouter, it waits for `astro:page-load`, which occurs after the
new document has been swapped into place. `astro:before-preparation` marks a
navigation as in flight so vendor readiness cannot send the destination early.

Each completed ClientRouter navigation is a pageview, including consecutive
completions with the same URL. If several pages complete before a vendor is
ready, only the most recent completed route is retained. A prerendered page is
held until `prerenderingchange` confirms activation.

For GA4, `pageviews: "provider"` leaves the normal Google config pageview and
Enhanced Measurement history tracking in control; the package sends no manual
pageviews. `pageviews: "astro"` disables the config pageview and uses the
package lifecycle above. Operators selecting that advanced mode must disable
GA history-based page changes so ownership is not duplicated. Other providers
continue to use the package lifecycle for both labels because their adapters do
not claim an equivalent native SPA guarantee. Non-GA providers support
`pageviews: "none"` to suppress package pageviews. GA4 rejects that mode because
it cannot suppress native Enhanced Measurement history pageviews. Use
`providers: false` to disable the integration completely.

## Blocked query parameters

`blockedQueryParameters` is a fail-closed privacy boundary for the package. A
matching initial URL starts neither the shared client nor any adapter. On
ClientRouter navigation, the package suppresses pageview and custom-event
dispatch for matching routes and defers first provider activation. Already-loaded
scripts, globals, adapters and the public client can remain present. A blocked
URL is excluded from package-supplied document and virtual referrer context, so
a clean return does not forward that URL in those package tracking payloads.

This boundary controls package activation and tracking dispatch. It does not
retract vendor code already executed or data already sent, and does not prove
the absence of autonomous provider behavior. Other scripts on the page can
still read browser state or send requests.

Provider-owned GA4 history tracking is also outside this boundary after Google
has loaded. Configuration rejects that ownership mode when
`blockedQueryParameters` is non-empty; use Astro-owned mode with the explicit
`historyPageviewsDisabled: true` operator assertion. That assertion is required
for every GA4 Astro-owned configuration and is not verified by the package.

## Consent

Immediate consent permits vendor loading. Deferred and external consent modes
implement basic consent: they begin `pending`, create no vendor script/global,
and dispatch nothing. `setConsent("denied")` preserves that zero-load state;
`setConsent("granted")` starts providers without a reload. Repeated decisions
are idempotent. Activation also waits for an allowed route outside navigation
and prerendering. A retained grant starts the vendor on a later allowed
completion; granting on a blocked route creates no vendor script or global.

Withdrawal changes provider state to `denied`, blocks package events and manual
pageviews, and retains only the latest allowed route for a possible later
regrant. GA4 receives an `analytics_storage` Consent Mode update. Its already
loaded tag may send consent-aware cookieless measurements under Google's
advanced behavior, especially when GA owns Enhanced Measurement pageviews.
Other vendor code already executed cannot be uninstalled generically. No
provider can retract transmissions made before withdrawal. The site—not this
package—persists the user's choice between documents. Within a document, the
coordinator retains the decision across script failure and matching re-entry.
Local denial remains effective even if vendor notification fails; restoration
of a vendor global alone cannot reauthorize package calls.

## Script ownership and collisions

Each adapter creates one identifiable script element. If its preferred DOM ID
is occupied, it chooses a package-prefixed suffix instead of changing the
existing element. Matching runtime reentry is idempotent. Conflicting runtime
configuration is ignored rather than replacing an active adapter.

Provider globals that the package must initialize—Plausible, GA4, and Matomo—are
not overwritten when already present. Script failures remove only the element
and globals created by that adapter and allow a later clean initialization
attempt. Exceptions are contained so analytics cannot break the host page.

These checks provide ordinary collision avoidance and cleanup. They are not a
security boundary against arbitrary same-origin JavaScript, which can inspect or
replace any browser global.

## Event behavior

The optional event coordinator preserves configured provider order and returns
one result per provider. A ready adapter accepts synchronously; vendor network
delivery remains outside the return contract. Provider-specific limits are
documented in [Event client](/analytics-for-astro/events/).

`providerStatuses()` is intended for operator feedback. It reports `ready`,
`adapter-not-loaded`, `consent-pending`, or `consent-denied` for each provider.
`consentStatuses()` reports the separate package authorization state.

## Provider notes

- Fathom uses `trackPageview()` and `trackEvent()` with automatic pageviews off.
- Plausible initializes with `autoCapturePageviews: false` and sends explicit
  pageviews and event props.
- GA4 initializes consent before configuration. Provider-owned mode leaves the
  ordinary config pageview enabled; explicit Astro ownership forces
  `send_page_view: false` and requires the unverified operator assertion.
  Public GA4 `pageviews: "none"` is rejected. Events route to the configured
  Measurement ID.
- Matomo initializes its queue with tracker URL and site ID, then maintains
  route context with `setCustomUrl`, `setDocumentTitle`, and `setReferrerUrl`.
- Umami sets `data-auto-pageview="false"` and uses payload factories so pageview
  and event metadata come from the same completed route.
