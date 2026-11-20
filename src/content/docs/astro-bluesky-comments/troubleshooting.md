---
title: Verify and troubleshoot
description: Check the first discussion, understand empty and fallback states, and diagnose stale replies.
editUrl: false
---

Start with the individual public post on Bluesky and the exact post reference
configured for the page. Keep a failed fetch separate from a successful thread
with no visible replies.

## Verify the first installation

1. Open **View the discussion on Bluesky** from the site. Confirm the intended
   account and post, not just a matching handle or article title.
2. Confirm the page has a useful empty state or expected replies, no unintended
   avatars, and the original discussion link.
3. Add a public reply through Bluesky, rebuild and deploy the static site, then
   check the published reply and its own permalink.
4. Tab to the source link and any warning disclosure. Open the warning from
   the keyboard. Check a narrow viewport and the themes the site supports.
5. Confirm existing footer, navigation, Analytics and other comments remain
   present where the site expects them.

The component needs no browser JavaScript to render its discussion. Other
site integrations may still add their own scripts or requests.

## Common symptoms

| What you see | What to check |
| --- | --- |
| **No replies to display.** | The thread was read, but has no displayable replies under the current depth/policy. The original post is hidden by default. Add a reply, not another root post, then refresh the published snapshot. |
| A new reply appears on Bluesky but not the site | Rebuild and deploy. Check that you deployed the new output, configured the correct post and have not retained a host cache. |
| Deleted or hidden text is still present | Old static HTML remains until replaced. Refresh the build/deployment, or disable the discussion block and deploy if immediate removal is required. |
| **The discussion could not be loaded here.** | Check public accessibility, reference syntax, AppView availability, build-host network access, timeout, limits and returned root identity. This message deliberately does not expose internal fetch details. |
| **Some replies could not be loaded.** | A malformed reply branch was omitted while valid siblings were retained. Check a fresh upstream response before treating the partial snapshot as complete. |
| The configured discussion link is missing | Check that the reference is a valid individual post URL/AT URI, rather than a profile, a link with tracking parameters, or an empty value. |
| Original post is missing but replies appear | Expected with `showRoot={false}`. Enable `showRoot` if the page should include it. |
| An account/post is absent | Check upstream restrictions, hidden replies and hydrated post/account labels, as well as your configured warning policy and depth. |
| Sensitive content is collapsed | Expected default warning behavior. The disclosure is not access control; choose `warned: 'omit'` on the core component to exclude the text from HTML. |
| No Starlight discussion appears | Confirm the collection schema, Footer composition and page opt-in. Preserve any existing Footer override. |
| Build reports an invalid setting | Check type/range requirements and Starlight frontmatter validation. Wrong types or unsupported explicit policy choices are not silently accepted. |

## Network and privacy checks

The default thread fetch is server-side to
`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread`. Ensure the build
or render host can reach it. A visitor-browser CORS workaround is not needed
for this component's server-rendered Bluesky fetch.

With avatars off, the Bluesky component inserts no author image requests.
With avatars on, visitors may request third-party author image URLs; posts
behind a warning disclosure still suppress their avatars. Evaluate that choice
with your site's image policy. Source and reply links navigate to Bluesky; the package uses
UGC/referrer protections on its links.

Other components have independent network paths. For example, a native forum
discussion's browser refresh can fail while the server-rendered Bluesky block
continues to work. Diagnose the failing component's request rather than
changing the Bluesky thread reference to repair an unrelated integration.

## What to include in a support request

Provide the page URL, public post URL/AT URI, source version or source-copy
identity, Astro/Node/Starlight versions, static versus on-demand rendering,
build/deployment time, visible message and relevant settings. Say whether a
new build was actually deployed and whether a custom fetcher/cache is used.

Do not include account passwords, app passwords, tokens, private environment
files or provider credentials. Public discussion references are sufficient
to begin investigating an anonymous-read problem.

[Contact CodeWorksLabs support](https://codeworkslabs.dev/support/).
