---
title: Operator guide
description: Start a discussion, refresh replies and maintain a public Bluesky comment thread.
editUrl: false
---

The operator manages the discussion on Bluesky. The site editor connects its
post reference to an Astro page and publishes updated builds. One person can
hold both roles; neither role needs to put Bluesky login credentials in the site.

## Start a discussion for a page

1. Publish the article or choose its intended public URL.
2. From the account you control, create a public Bluesky post describing the
   article and linking to it.
3. Copy the individual post URL and give it to the site editor. Prefer a
   DID-based AT URI when the editor has verified the account's DID.
4. Set that reference for the page and publish a build.
5. Follow **View the discussion on Bluesky** from the website to verify the
   mapping before inviting replies.

The mapping is manual. The package does not watch an account's feed, create
posts, match posts to articles or merge several discussions. Use a deliberate
post-to-page mapping so readers join the intended conversation.

Creating the original post does not create a displayed comment. By default,
the site shows its replies and leaves the original post out. **No replies to
display.** is expected until somebody replies and the site is refreshed.

## What a visitor does

A visitor can read rendered replies on your site without signing into Bluesky.
To participate, they follow the discussion link and reply through Bluesky using
their own account. There is no reply form or sign-in flow supplied by this
component on the Astro page.

## Refresh replies on a static site

1. Check the public thread on Bluesky for the new or changed reply.
2. Ask the site operator to run the normal build and deployment.
3. Open the public page and verify the expected text and reply permalink.

New replies, deletions, moderation changes and engagement counts remain at the
last successful render until an updated build is deployed. Reloading the
browser, clearing its cache or rebuilding without deployment does not replace
the published snapshot. The package installs no timer, webhook or scheduler.

An on-demand Astro route fetches when the server renders it; host caching may
still affect freshness. Changing a static route to on-demand rendering needs
the site's own server adapter and operational design.

## Moderate the public discussion

Use the discussion account and Bluesky's moderation tools. The anonymous site
renderer applies the post/account labels and hidden-reply information supplied
by the public response when it next fetches the thread. It does not reproduce
your account's complete signed-in moderation preferences.

Default behavior:

- Mandatory `!hide` and `!no-unauthenticated` restrictions omit the affected
  post and its reply branch.
- Supported sensitive labels put text behind a warning disclosure.
- Blocked or unavailable posts use text placeholders when reported that way
  by the upstream response.

A warning is a display disclosure: the text is still in the generated HTML.
If sensitive text must be omitted, the site integrator can use
`moderation={{ warned: 'omit' }}` on the core component. See
[Configuration](/astro-bluesky-comments/configuration/#moderation).

After a moderation action, rebuild and deploy, then verify the actual page.
Deleting or hiding a post on Bluesky does not retroactively remove its text
from HTML that was already published. If an old snapshot must be removed
immediately, disable the page's discussion block and publish that change using
your site's normal process; do not wait for a browser reload to remove it.

## Change or stop a discussion

To move a page to a different post, update its reference, rebuild and deploy.
Existing replies are not copied or moved between Bluesky threads. Explain the
new discussion location to readers when that matters.

To stop displaying comments, remove the component or remove the page's opt-in
frontmatter where its layout supports that choice, then rebuild and deploy.
This removes the site's rendered block; it does not delete the Bluesky thread.

## Day-to-day settings

Keep avatars off unless you deliberately want author-image requests in visitor
browsers. Keep the conservative warning policy unless your site has chosen a
different supported policy. Neither decision changes the account's settings
on Bluesky.

Keep a record of each page's post reference, the source version installed and
the last published build. When a build shows the fallback, use
[Verification and troubleshooting](/astro-bluesky-comments/troubleshooting/)
before changing the discussion mapping.
