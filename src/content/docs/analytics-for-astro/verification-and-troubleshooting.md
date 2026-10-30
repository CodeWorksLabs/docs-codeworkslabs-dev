---
title: Verify tracking and troubleshoot
description: Provider evidence, GA4 pageview ownership, Plausible goals and missing-event diagnosis.
editUrl: false
---

Verify the installed package in a production build of your actual Astro or
Starlight site. Development builds do not inject tracking under the default
environment policy. Use a dedicated test property when possible, and record
the package version, site commit, provider identifiers and selected consent and
pageview modes before testing. Do not put credentials in a report or repository.

## Establish one pageview owner

GA4 defaults to `pageviews: "provider"`: Google's tag owns pageviews. The
integration does not add manual pageviews in that mode.

For `pageviews: "astro"`, complete this operator prerequisite in the correct
GA4 web stream:

1. Open **Admin → Data streams → your web stream**.
2. Open the configuration for **Enhanced measurement**.
3. Under **Page views**, expand the advanced settings.
4. Disable **Page changes based on browser history events** and save.
5. Reopen the setting to confirm it persisted, then configure
   `historyPageviewsDisabled: true` in the integration.

The overall Enhanced Measurement switch can remain enabled. This prerequisite
concerns its history-change option; it does not require turning off scrolls,
outbound clicks or every other measurement. Choose those options according to
your site's requirements. The package cannot read or enforce your GA settings,
so recheck this assertion after configuration changes. Google's
[Enhanced Measurement reference](https://support.google.com/analytics/answer/9216061)
explains the individual options.

Other vendor automation can still run after its script has loaded. See
[Runtime behavior](/analytics-for-astro/runtime-and-safety/) for the limits of package-controlled
pageviews, blocked routes and consent withdrawal.

## Prepare Plausible custom-event reporting

Plausible pageviews do not need a custom-event goal. To report a custom event
sent through `track()`, add a **Custom event** goal in the correct Plausible
site, using the exact event name your code sends. Case, spaces and underscores
must match. Check for an existing goal first, and create only the intended goal.

For example, `track("journey_continued")` needs the event name
`journey_continued`; a display label does not replace the matching trigger.
Create the goal before the verification run and trigger a fresh event afterward.
An empty Goals panel alone does not establish that the tracker failed.
Plausible can expose received but unconfigured event names in its goal-creation
interface. Inspecting that evidence does not require adding every detected event.
See [Plausible custom-event goals](https://plausible.io/docs/custom-event-goals).

## Run a small, observable journey

1. Open the landing page in the browser/profile you intend to support. Confirm
   the actual consent decision and wait for the configured adapters to be ready.
2. Record the landing pageview in each provider's reporting interface.
3. Send one explicitly named event through the public client. Record every
   provider's result, including mixed outcomes.
4. Confirm the named event in each provider, then navigate to the destination
   and confirm its pageview. Keeping the event test separate from navigation
   helps distinguish event delivery from document-unload timing.
5. Test your real navigation interaction as a separate case. `track()` is
   synchronous: its return value does not wait for vendor transport to finish.
   Immediate full-document navigation can therefore require separate delivery
   qualification. No queue, retry, flush or delivery promise is provided.

Use `providerStatuses()` for readiness, rather than firing probe events. A
successful per-provider result means that adapter accepted the call locally.
It is not a provider receipt, conversion, delivery guarantee or permission to
ignore another provider's failure. See [Event client](/analytics-for-astro/events/).

With simultaneous providers, the same `track()` call attempts each configured
provider independently. Inspect `result.providers`, rather than interpreting
one successful provider or a selected UI label as success for all providers.

## Read provider-side evidence

| Provider | Pageview evidence | Custom-event evidence |
| --- | --- | --- |
| Fathom | Correct site's landing and destination paths | Exact event name and completion count |
| Plausible | Correct site's page paths | Matching goal conversion, or received-event evidence with its reporting limitation stated |
| GA4 | Correct property's page locations, including hostname | Exact event name in Realtime or the processed event report |
| Matomo | Correct site's page actions in its visit log | Configured event category and the `track()` name as Event Action |
| Umami | Correct website's pageview records | Exact event name in its event records |

Use a reporting period that includes the run and check the provider's timezone.
Two sites can share the same paths, so a path alone does not identify a GA4
stream or hostname. Record full page locations where the reporting UI provides
them. Reporting delays and vendor filtering can differ across providers; a
single common total is not the success criterion. Allow a bounded reporting
delay without generating repeated traffic to force a larger counter.

## Diagnose a missing result

| Observation | Next check |
| --- | --- |
| `consent-pending` | Has the site's consent UI/CMP supplied an explicit grant? |
| `consent-denied` | Is the current decision denied or withdrawn? Do not grant implicitly to make a test pass. |
| `adapter-not-loaded` | Production injection, script loading, occupied vendor globals, current route policy and browser console/network errors |
| `invalid-event` | Shared event validation and that provider's narrower limits |
| Adapter accepts; dashboard is empty | Correct property/site, reporting period/timezone, reporting delay, Plausible goal definition and provider filtering |
| One browser works; another fails | Compare browser console/network evidence and existing privacy/extension policy; do not assume either a package defect or an extension cause without evidence |
| Duplicate GA4 pageviews | Check which owner is selected and the saved history-change option for that exact stream |

Do not silently disable browser protections, change consent, substitute provider
IDs, add a proxy or alter account filters to obtain a passing result. Such a
change can conceal the original failure and changes what the test establishes.

## Qualify lifecycle and privacy separately

A successful landing/event/destination journey establishes basic ingestion,
not every supported lifecycle or privacy property. Before relying on those
claims, verify the applicable cases in both plain Astro and Starlight:

- full-document navigation, ClientRouter completion, back/forward traversal and
  consecutive completions at the same URL;
- direct entry to a blocked-query URL, navigation to a blocked URL after
  activation, and return to an allowed route, including supplied referrers;
- deferred/external consent before grant, explicit grant, withdrawal and
  regrant, including a new document where the host must restore its decision;
- delayed or failed provider script loading and recovery, mixed provider
  outcomes, and disabling/re-enabling the integration.

Distinguish package-originated calls from autonomous vendor activity and record
the exact evidence obtained. Browser UI receipts, network observations and
provider ingestion establish different facts. Synthetic tests remain useful,
but do not label them as executed native browser/provider qualification.
