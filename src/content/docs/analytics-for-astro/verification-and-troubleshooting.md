---
title: Verify tracking and troubleshoot
description: Provider evidence, GA4 pageview ownership, Plausible goals and missing-event diagnosis.
editUrl: false
---

A working installation should show the pages you visit and the custom events
you send in the right provider account. Start with a short, recognizable test
instead of repeatedly clicking and trying to interpret a growing counter.

## Check a short journey

1. Build your site with `npm run build` and open it with `npm run preview`, or
   visit your deployed test site. Analytics is off in development by default.
2. Make the required consent choice. Wait for your providers to load; use
   [`providerStatuses()`](/analytics-for-astro/events/#check-readiness-without-tracking) to check.
3. Visit one known page. Find its path in the correct provider dashboard.
4. Send one named event, such as `analytics_test`, using the
   [test page](/analytics-for-astro/getting-started/#4-try-a-custom-event). Inspect each provider's
   result, then look for that event in the dashboard.
5. Visit a second page and confirm its path too.

Keep the browser on the event page while checking the first event. Then test
your real button or link separately. Leaving a page immediately after a
`track()` call can interrupt the vendor's request; `track()` does not wait for
delivery or provide a flush operation.

Use a reporting period that includes your test and check the dashboard's
timezone. Reporting can take time, and browsers or providers can filter traffic.
Two sites can share `/` and `/pricing/`, so check the hostname or site selection,
not just the path. With several providers, inspect each one separately.

## Where to look

| Provider | Pageviews | Custom events |
| --- | --- | --- |
| Fathom | Your site's page paths | Exact event name and completion count |
| Plausible | The selected site's page paths | Matching custom-event goal conversion |
| GA4 | Page locations in the correct property/stream, including hostname | Exact event name in Realtime or processed event reports |
| Matomo | Page actions in the selected site's visit log | Your configured event category and event name as Event Action |
| Umami | Pageview records for the selected website | Exact event name in its events |

An adapter's `{ ok: true }` means it accepted the call locally. Only provider
evidence confirms that the server received it. Counts need not match across
different services because their reporting and filtering differ.

## Prepare Plausible custom-event reporting

Pageviews do not need a custom-event goal. For custom events, open the correct
Plausible site's settings and add a **Custom event** goal whose event name
exactly matches your call. For `track("analytics_test")`, enter `analytics_test`.
Case, spaces and underscores matter.

Check for an existing goal first. After creating one, send a fresh event and
look for its conversion. A missing goal can explain an empty Goals panel even
when the script is working. Plausible may also show received event names while
you create a goal; that is evidence of receipt, not an existing goal conversion.
See [Plausible's goal instructions](https://plausible.io/docs/custom-event-goals).

## Avoid duplicate GA4 pageviews

First check `pageviews` in your provider configuration:

- **Omitted or `"provider"`:** Google owns pageviews. The package does not add
  manual ones. Google's normal history tracking can stay enabled.
- **`"astro"`:** the package owns pageviews. Google's history-change pageviews
  must be disabled to avoid two trackers counting the same navigation.

For Astro-owned pageviews, check the saved setting in the correct stream:

1. Open **Admin → Data streams → your web stream** in GA4.
2. Open the **Enhanced measurement** configuration.
3. Under **Page views**, expand the advanced settings.
4. Turn off **Page changes based on browser history events** and save.
5. Reopen the settings to confirm the change persisted. Then set
   `historyPageviewsDisabled: true` in your integration configuration.

The overall Enhanced Measurement switch may stay enabled. Scrolls, outbound
clicks and other measurements are separate choices. The package cannot read or
change these settings. See [Google's Enhanced Measurement reference](https://support.google.com/analytics/answer/9216061).

Also check for a second embed or tag-manager installation of the same tracker.
For non-GA providers, this integration already disables automatic pageviews and
sends its own completed-page calls.

## Something is missing

| What you see | What to check |
| --- | --- |
| No analytics in `npm run dev` | Expected by default. Test a production build or explicitly enable development tracking |
| `disabled` | Confirm the integration is enabled and called from browser code, not Astro frontmatter. A directly opened blocked-query URL also omits the client |
| `consent-pending` | Has the consent interface actually called `setConsent("granted")`? |
| `consent-denied` | Respect the visitor's choice. Test with your own explicit grant if appropriate |
| `adapter-not-loaded` | Check the browser console/network panel for a failed script, an occupied vendor global, or an invalid script address |
| `invalid-event` | Compare the event with the [shared and provider limits](/analytics-for-astro/events/#what-data-can-i-send) |
| Accepted locally, absent in reports | Check site/property, hostname, period, timezone, reporting delay, filtering and Plausible goals |
| One browser works, another does not | Compare console/network errors and existing extension or privacy policy; do not assume the cause |
| Missing page after a slow tracker load | Only the most recent completed page is retained before readiness; earlier visits are not replayed |

Do not disable browser protections or change provider IDs just to turn a test
green. Record what the affected browser reports so you can identify the actual
cause. A blocked script may be expected under that browser's policy.

## Before relying on privacy or navigation behavior

After the basic journey works, test the interactions your site uses: ordinary
links, ClientRouter links, Back and Forward, a slow or failed tracker, and
consent withdrawal and regrant. If using blocked query parameters, test direct
entry to a sensitive URL and navigation there after tracking has already started.

Check both the URL and referrer in the evidence you can inspect. These checks
answer different questions from a dashboard conversion. See
[Pageviews and privacy](/analytics-for-astro/runtime-and-safety/) for the behavior to expect.
