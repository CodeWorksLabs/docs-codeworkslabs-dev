---
title: Getting started
description: Install the package, connect a provider and check your first pageview.
editUrl: false
---

This guide adds pageview tracking to an existing Astro site using Fathom. You
can [choose a different provider](/analytics-for-astro/configuration/) without changing your pages.
For a documentation site, use the [Starlight guide](/analytics-for-astro/starlight/) instead.

## Before you begin

You need an Astro 7 site, Node.js 22.18 or later, and a Fathom site ID. Your Astro
version may require a newer Node release. The package accepts Astro versions
from 7.3.2 up to, but not including, 8.

This preview is not available from the npm registry yet. Obtain a prerelease
`.tgz` package from the maintainer before continuing. The public repository may
lag this documentation preview; use the supplied package for this trial.
See [Versions and availability](/analytics-for-astro/versioning-and-releases/).

## 1. Install the package

Put the supplied tarball in a `vendor` directory inside your site. From the
directory containing your site's `package.json`, run:

```sh
npm install ./vendor/codeworkslabs-astro-analytics-0.1.0-alpha.25.tgz
```

Use the actual filename if your supplied package has a different name. Keep the
tarball, `package.json` and `package-lock.json` in your site's repository so a
clean checkout can install the same package. The examples below assume npm.

## 2. Connect Fathom

Replace `YOUR-SITE-ID` with the ID from your Fathom site settings. Add the
integration to `astro.config.mjs`, preserving any integrations you already use:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import analytics from "@codeworkslabs/astro-analytics";

export default defineConfig({
  integrations: [
    analytics({
      providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
      events: true,
    }),
  ],
});
```

This example starts tracking as soon as the provider loads. If your site needs
to wait for consent, use the [consent example](/analytics-for-astro/runtime-and-safety/#wait-for-consent)
before testing. `events: true` enables custom events; omit it for pageviews only.

Remove any Fathom embed for the same site that you added separately. Let one
installation handle tracking to avoid duplicate pageviews and competing scripts.
Do not add a second copy of this integration.

## 3. Build and open your site

```sh
npm run build
npm run preview
```

Open the address Astro prints, then visit another page. Look for those paths in
the correct Fathom site's dashboard. Browser privacy settings and provider
filtering can affect a local test; confirm again on your deployed test site.

Analytics is included in production builds by default. `npm run dev` does not
include it unless you explicitly enable development tracking. Previewing a
production build still runs the tracking included in that build.

If nothing appears, follow [Verify tracking and troubleshoot](/analytics-for-astro/verification-and-troubleshooting/).

## 4. Try a custom event

Create `src/pages/analytics-test.astro` with this complete page:

```astro
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Analytics test</title></head>
  <body>
    <h1>Try a custom event</h1>
    <button id="analytics-test" type="button">Send test event</button>
    <p id="analytics-result" role="status"></p>
    <script>
      import { providerStatuses, track } from "@codeworkslabs/astro-analytics/client";

      function connectButton() {
        const button = document.querySelector<HTMLButtonElement>("#analytics-test");
        const message = document.querySelector<HTMLParagraphElement>("#analytics-result");
        if (!button || !message) return;

        button.onclick = () => {
          if (providerStatuses().fathom !== "ready") {
            message.textContent = "Fathom is not ready. Check consent or try again after it loads.";
            return;
          }
          const result = track("analytics_test");
          message.textContent = result.ok
            ? "Fathom accepted the event. Check the Fathom dashboard for delivery."
            : `Event not accepted: ${JSON.stringify(result.providers)}`;
        };
      }

      connectButton();
      document.addEventListener("astro:page-load", connectButton);
    </script>
  </body>
</html>
```

Rebuild, preview and open `/analytics-test/`. Click the button after the tracker
loads and check for `analytics_test` in Fathom. The readiness check does not send
probe events. The handler also reconnects the button after ClientRouter visits.

## Where to go next

Connect [Plausible, GA4, Matomo or Umami](/analytics-for-astro/configuration/), add
[custom events](/analytics-for-astro/events/), or learn how to [wait for consent](/analytics-for-astro/runtime-and-safety/).
