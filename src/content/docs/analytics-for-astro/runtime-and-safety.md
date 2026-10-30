---
title: Pageviews and privacy
description: Understand pageviews, add consent controls and exclude sensitive URLs.
editUrl: false
---

This guide explains when tracking starts, how to connect a consent interface,
and what happens during navigation or on sensitive URLs.

## How pageviews work

On an ordinary Astro page, tracking waits until the page and provider are ready.
With ClientRouter, package-owned pageviews wait for Astro's `astro:page-load`
event, after the destination content has replaced the previous page.

Back and Forward navigation count as completed visits too. Two completed visits
to the same URL can count separately. If a tracker is slow to load, only the
latest completed page is retained; the package does not replay a visitor's full
history after the tracker becomes ready. Prerendered documents wait for activation.

GA4 is different by default: Google's tag owns its pageviews. If you want Astro
to send them, follow [GA4 pageview setup](/analytics-for-astro/configuration/#let-astro-send-ga4-pageviews)
and disable Google's history-change pageviews first.

## Wait for consent

Set `consent: { mode: "deferred" }` for every provider that should wait. This
complete configuration uses Fathom:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{
      name: "fathom",
      siteId: "YOUR-SITE-ID",
      consent: { mode: "deferred" },
    }],
    events: true,
  })],
});
```

Before grant, deferred providers load no vendor script, create no vendor global
and send no tracking calls. `external` has the same waiting behavior; use that
name when your own consent manager supplies the choice. Neither mode detects
your consent manager automatically.

Your site calls `setConsent("granted")` or `setConsent("denied")`. One call
applies the choice to all configured providers. Granting starts asynchronous
script loading; it does not make an adapter ready immediately.

### A complete consent component

Create `src/components/AnalyticsConsent.astro`. Include it once in your shared
layout so visitors can change their decision later. This small example stores
only the analytics choice in local storage; adapt the copy and persistence to
your site's consent design.

```astro
<section aria-label="Analytics preference">
  <p>May we use analytics to understand how this site is used?</p>
  <button id="analytics-allow" type="button">Allow analytics</button>
  <button id="analytics-deny" type="button">Do not allow analytics</button>
  <p id="analytics-choice" role="status"></p>
</section>

<script>
  import { setConsent, type ConsentDecision }
    from "@codeworkslabs/astro-analytics/client";

  const storageKey = "site-analytics-choice";

  function connectConsent() {
    const allow = document.querySelector<HTMLButtonElement>("#analytics-allow");
    const deny = document.querySelector<HTMLButtonElement>("#analytics-deny");
    const message = document.querySelector<HTMLParagraphElement>("#analytics-choice");
    if (!allow || !deny || !message) return;

    function apply(decision: ConsentDecision, remember: boolean) {
      let saved = true;
      if (remember) {
        try { localStorage.setItem(storageKey, decision); }
        catch { saved = false; }
      }
      const result = setConsent(decision);
      if (!message) return;
      message.textContent = result.ok
        ? decision === "granted"
          ? "Analytics is allowed. Trackers may still be loading."
          : "Analytics is turned off for package tracking."
        : "Your choice could not be applied to all adapters. Check analytics setup.";
      if (!saved) message.textContent += " This browser could not save your choice.";
    }

    try {
      const previous = localStorage.getItem(storageKey);
      if (previous === "granted" || previous === "denied") apply(previous, false);
    } catch {
      message.textContent = "Choose a preference. This browser may not remember it.";
    }

    allow.onclick = () => apply("granted", true);
    deny.onclick = () => apply("denied", true);
  }

  connectConsent();
  document.addEventListener("astro:page-load", connectConsent);
</script>
```

For a layout at `src/layouts/Layout.astro`, import and render it like this:

```astro
---
import AnalyticsConsent from "../components/AnalyticsConsent.astro";
---
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>My website</title></head>
  <body>
    <AnalyticsConsent />
    <main><slot /></main>
  </body>
</html>
```

The package remembers the latest decision within the current document. Your
site must restore it on each full page load, as this example does. Repeating
the same decision does not duplicate tracker scripts or pageviews. A consent
manager can call the same API from its choice-change callback instead of using
this component.

## What withdrawal does

Denial stops subsequent package events and manual pageviews, even if notifying
a vendor fails. A later grant resumes from the current allowed page. Recovering
a failed tracker never grants consent on its own.

Already executed vendor scripts stay loaded, and data already sent cannot be
taken back. GA4 also receives a Google Consent Mode update; a loaded Google tag
may still make consent-aware, cookieless requests. Other vendor automation can
also act independently of this package. Withdrawal controls package calls; it
does not promise to erase data or silence every script on the page.

## Exclude sensitive URLs

If a site uses a query parameter for a temporary token, add its name to
`blockedQueryParameters`:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [analytics({
    providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
    blockedQueryParameters: ["handoff_token"],
  })],
});
```

Opening `/welcome?handoff_token=example` directly starts neither the package's
client nor its providers. After analytics has started on another page, navigating
to a blocked URL suppresses package pageviews and custom events there. Previously
loaded scripts and the client can remain present. A return to an allowed page
does not forward the blocked URL as the package-supplied referrer.

This protects the package's activation and tracking calls. It does not hide a
URL from other JavaScript or prevent autonomous activity by an already loaded
vendor. GA4's default provider-owned history tracking cannot respect this route
check, so configuration rejects that combination. Use
[Astro-owned GA4 pageviews](/analytics-for-astro/configuration/#let-astro-send-ga4-pageviews) instead.

## When a tracker fails or another script is present

A failing provider does not stop other providers. Use
[`providerStatuses()`](/analytics-for-astro/events/#check-readiness-without-tracking) to inspect
readiness. Do not assume that an unrelated existing vendor global is a working
installation: the adapters require their own startup conditions.

The package avoids overwriting occupied globals it needs to initialize and
cleans up its own failed startup state. It cannot protect browser globals from
other scripts on the same page. Use one installation per provider.

Recovery cannot reconstruct navigation missed while a provider was inactive.
For example, Matomo can fall back to an allowed original `document.referrer`
when there is no preceding observed route. That may differ from the visitor's
last virtual page. Keep this in mind when investigating attribution gaps.
