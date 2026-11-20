---
title: Bluesky Comments for Astro
description: Display public Bluesky replies in an Astro page and operate the discussion on Bluesky.
editUrl: false
---

Display a public Bluesky discussion inside an Astro page. You choose the post
that starts the discussion; visitors follow its Bluesky link to reply. Astro
fetches the public thread and renders the replies into the page.

**Current availability:** experimental private preview,
`@codeworkslabs/astro-bluesky-comments@0.0.0`. There is no public npm release
yet. The installation guide describes the source-copy method used by the live
demo. See [Versions and availability](/astro-bluesky-comments/availability/).

## Start here

- **Installing it in an Astro site?** Follow [Getting started](/astro-bluesky-comments/getting-started/).
- **Running the discussion?** Read the [Operator guide](/astro-bluesky-comments/operator-guide/).
- **Choosing what appears?** Use [Configuration](/astro-bluesky-comments/configuration/).
- **Using Starlight?** Follow [Starlight integration](/astro-bluesky-comments/starlight/).
- **A reply is missing or the page is stale?** Use [Verification and troubleshooting](/astro-bluesky-comments/troubleshooting/).

## How it works

1. An operator creates a public post on Bluesky, usually linking to the article.
2. A site editor puts that post's URL or DID-based AT URI in the page settings.
3. Astro fetches the thread when it renders the page. A static build publishes
   a snapshot that remains until the next build and deployment.
4. Visitors read replies on the site and use **View the discussion on Bluesky**
   to join the conversation there.

The account is needed to create and manage the discussion. The website reads
public replies anonymously: it needs the post reference, not the account's
password, app password, access token or visitor login.

## What appears

Replies appear first, including replies by the original author. The original
post is hidden by default; you can include it with `showRoot`. A new post with
no replies displays **No replies to display.** That is a valid empty discussion.

Text and supported links, mentions and hashtags are rendered as HTML. Avatars
are off by default. Sensitive content uses a warning disclosure; mandatory
hidden restrictions are omitted. Quote posts, link cards and other embeds are
not rendered.

The component adds no browser script for fetching or refreshing comments. It
does not create posts, provide a reply form, schedule builds or store comments
in a site database. Your existing Analytics, comments and layout integrations
remain separate.

## Try the live demo

The [plain Astro demo](https://astro.demo.discussionbridge.dev/bluesky-comments/)
uses a public test post from
[codeworks360.bsky.social](https://bsky.app/profile/codeworks360.bsky.social).
Its discussion is a build snapshot with avatars off. This is a bounded live
trial, not a public package release or proof that every host configuration has
been qualified.
