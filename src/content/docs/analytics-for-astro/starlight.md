---
title: Starlight integration
description: Add Analytics for Astro through Starlight's plugin interface.
editUrl: false
---

Add analytics to a Starlight documentation site through its `plugins` array.
The plugin handles the Astro integration for you, including pageviews when
visitors follow documentation links.

## 1. Install the package

Obtain the preview tarball and install it in your Starlight project using the
[installation instructions](/analytics-for-astro/getting-started/#1-install-the-package).
Supported Starlight versions are `>=0.41.11 <0.43`, with Astro `>=7.3.2 <8`.
Use a Node version supported by your installed Astro version.

## 2. Add the Starlight plugin

This complete configuration uses Fathom. Replace `YOUR-SITE-ID` with your own ID
and preserve your existing Starlight title, sidebar and other options:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { starlightAnalytics } from "@codeworkslabs/astro-analytics/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "My documentation",
      plugins: [
        starlightAnalytics({
          providers: [{ name: "fathom", siteId: "YOUR-SITE-ID" }],
          events: true,
        }),
      ],
    }),
  ],
});
```

Use `starlightAnalytics()` in Starlight's `plugins`, not Astro's top-level
`integrations`. Do not also add `analytics()` to the top-level array or paste a
second vendor tracking snippet into the site.

To use Plausible, GA4, Matomo, Umami or several providers, replace `providers`
with the corresponding [provider configuration](/analytics-for-astro/configuration/). The options
are the same as for plain Astro. The wrapper does not replace your Starlight
components or change your documentation design.

## 3. Check a production build

```sh
npm run build
npm run preview
```

Visit the home page and a documentation page. Confirm both paths in the correct
provider dashboard, then repeat on your deployed test site. Development mode
does not inject analytics by default. See [troubleshooting](/analytics-for-astro/verification-and-troubleshooting/)
if a tracker fails to appear or reports duplicate pageviews.

## Add an event to an MDX page

With `events: true`, create the reusable
[`PricingButton.astro` component](/analytics-for-astro/events/#track-a-button-click), then use it
from `src/content/docs/analytics-example.mdx`:

```mdx
---
title: Analytics example
description: Try a custom analytics event.
---

import PricingButton from '../../components/PricingButton.astro';

Click the button below, then check for `pricing_opened` in your provider.

<PricingButton />
```

The blank lines around the import and component matter in MDX. For Plausible,
add a custom-event goal named `pricing_opened` before checking conversions.

## Use your site's consent interface

Configure each provider with `consent: { mode: "deferred" }` if it should wait
for a grant. Your site's consent component or consent manager calls the same
[`setConsent()` API](/analytics-for-astro/runtime-and-safety/#wait-for-consent) used by plain Astro.
Include it through your chosen Starlight layout/component customization; this
plugin does not install a consent banner for you.
