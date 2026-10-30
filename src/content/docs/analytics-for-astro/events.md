---
title: Custom events
description: Track button clicks and other actions, and understand each provider result.
editUrl: false
---

Use custom events to measure actions a pageview does not explain: a signup, a
download or a click on a pricing button. Set `events: true` in your integration
configuration first.

Choose names you can recognize in reports, such as `pricing_opened`. Do not put
email addresses, access tokens or other sensitive values in event names or data.

## Track a button click

Create `src/components/PricingButton.astro`:

```astro
<button id="pricing-button" type="button">I'm interested in pricing</button>
<p id="pricing-feedback" role="status"></p>

<script>
  import { configuredProviders, providerStatuses, track }
    from "@codeworkslabs/astro-analytics/client";

  function connectPricingButton() {
    const button = document.querySelector<HTMLButtonElement>("#pricing-button");
    const feedback = document.querySelector<HTMLParagraphElement>("#pricing-feedback");
    if (!button || !feedback) return;

    button.onclick = () => {
      const providers = configuredProviders();
      const statuses = providerStatuses();
      if (providers.length === 0 || providers.some((name) => statuses[name] !== "ready")) {
        feedback.textContent = "Analytics is not ready. Check consent and tracker loading.";
        return;
      }

      const result = track("pricing_opened", { plan: "starter" });
      feedback.textContent = result.ok
        ? "The configured adapters accepted the event."
        : `Some adapters did not accept it: ${JSON.stringify(result.providers)}`;
    };
  }

  connectPricingButton();
  document.addEventListener("astro:page-load", connectPricingButton);
</script>
```

Include it once in a page or layout:

```astro
---
import PricingButton from "../components/PricingButton.astro";
---
<PricingButton />
```

This component waits for all configured providers to be ready before offering
the event. That is a choice made by this example: `track()` itself can attempt
several providers and report partial success. No probe events or automatic
retries are needed. The component's fixed IDs assume one instance per page.

Keep analytics separate from essential behavior: a failed analytics call should
not prevent a visitor from buying, downloading or navigating.

## Read the result

`track(name, properties?)` returns immediately. For a site using Fathom and
Plausible, a result can look like this:

```json
{
  "ok": false,
  "providers": {
    "fathom": { "ok": true },
    "plausible": { "ok": false, "reason": "adapter-not-loaded" }
  }
}
```

Fathom accepted this call; Plausible did not. Do not retry the entire call
automatically: that could count the Fathom event twice.

| Result | Meaning and next step |
| --- | --- |
| `ok: true` | Every configured provider accepted the call locally. Check dashboards to confirm delivery |
| `adapter-not-loaded` | A tracker is not ready, failed to load or has an unusable API |
| `consent-pending` | Your consent interface has not supplied a grant |
| `consent-denied` | The visitor's current decision denies tracking |
| `invalid-event` | Check the name, data and provider limits below |
| `disabled` | There is no usable browser client, for example during server rendering or when injection is off |

For mixed outcomes, read `result.providers`. A top-level `reason` is supplied
for general failures or when every provider fails for the same reason; it is
omitted for mixed results. Malformed input returns `invalid-event` even when
tracking is otherwise disabled. The helper handles unusable clients or adapter
results without throwing them into your UI.

An accepted call is **not a delivery receipt**. There is no event queue, retry,
flush operation or delivery promise. In particular, starting a full page
navigation immediately after `track()` can interrupt vendor transport. Test
your actual interaction using the [verification guide](/analytics-for-astro/verification-and-troubleshooting/).

## What data can I send?

Pass an ordinary object containing strings, finite numbers or booleans:

```ts
import { track } from "@codeworkslabs/astro-analytics/client";

const result = track("plan_selected", {
  plan: "starter",
  monthly_price: 12.5,
  annual: false,
});
console.log(result.providers);
```

Call this from browser code, such as a component's `<script>`, not Astro's
server-rendered frontmatter. Arrays, nested objects, `null` and functions are not
accepted. Objects with getters, symbol keys or hidden properties are also rejected.

The shared limits are 128 characters for a trimmed, non-empty event name,
100 properties, 128 characters per non-empty key and 1,024 characters per string.
Providers can impose narrower limits:

| Provider | Data sent by this adapter |
| --- | --- |
| Fathom | Event name and optional `_value` in cents, a non-negative safe integer. Other valid properties are not forwarded |
| Plausible | Up to 30 properties. Numbers and booleans are converted to strings |
| GA4 | Up to 25 event parameters. `send_to` is reserved for the integration's Measurement ID |
| Matomo | The configured category and event name as the action. Optional `_name` must be a non-empty string; `_value` must be a finite number. Other valid properties are not forwarded |
| Umami | Name up to 50 characters, up to 50 properties, strings up to 500 characters and numbers with at most four decimal places |

For example, this browser call supplies a value Fathom can use:

```ts
import { track } from "@codeworkslabs/astro-analytics/client";

const result = track("purchase", { _value: 2500 }); // Fathom: 2,500 cents
console.log(result.providers);
```

`_value` has different meanings across providers. Matomo uses its numeric event
value without a cents conversion; Plausible and GA4 receive it as a property.
Decide whether that meaning fits your reports before sharing one event.

## Check readiness without tracking

```ts
import { configuredProviders, consentStatuses, providerStatuses }
  from "@codeworkslabs/astro-analytics/client";

console.log(configuredProviders()); // e.g. ["fathom", "plausible"]
console.log(providerStatuses());    // ready, adapter-not-loaded, consent-pending or consent-denied
console.log(consentStatuses());     // pending, granted or denied
```

These functions do not send events. `ready` describes the adapter, not whether
the current route permits tracking or whether the provider's server is reachable.
See [consent and sensitive URLs](/analytics-for-astro/runtime-and-safety/) for those separate rules.

For all types and function signatures, see [API reference](/analytics-for-astro/api-reference/).
