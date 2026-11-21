---
title: Bluesky Comments for Astro
description: Connect published Astro pages to Bluesky discussions automatically and keep replies current.
editUrl: false
---

Configure the integration once, then publish your articles normally. The intended
workflow creates and connects a Bluesky discussion for each eligible page, reuses
that discussion on later releases, and refreshes replies in the visitor's browser.

> **Experimental automation preview:** These guides describe the implemented local
> candidate and its intended operation. Real-account end-to-end testing is planned
> for **22 November 2026**; instructions may change after that test. There is no
> public npm release. See [Versions and availability](/astro-bluesky-comments/availability/).

## How it should work

1. Install the supplied preview package and configure the account, selected
   layouts and protected publishing runner once.
2. Publish an eligible article through your site's normal release process.
3. After deployment succeeds, the publisher verifies that page and creates its
   Bluesky post, retaining the page-to-thread binding.
4. Later builds and retries reuse the discussion. Visitors get current replies
   without an operator rebuilding the site for each new comment.

Your routine work is publishing content and moderating the discussion. Creating
posts, copying post references into every new page, and deploying to refresh
replies should not be recurring operator jobs.

## Start here

- [Getting started](/astro-bluesky-comments/getting-started/): one-time installation and release setup.
- [Operator guide](/astro-bluesky-comments/operator-guide/): normal publishing, moderation and exceptions.
- [Configuration](/astro-bluesky-comments/configuration/): account, eligibility and display settings.
- [Starlight integration](/astro-bluesky-comments/starlight/): automatic documentation-page discussions.
- [Verify and troubleshoot](/astro-bluesky-comments/troubleshooting/): acceptance checks and recovery.
- [Versions and availability](/astro-bluesky-comments/availability/): implemented versus live-tested behavior.

## What is automatic

The build reserves a durable DID-based thread reference without posting to the
account. A separate trusted publisher runs after successful production deployment,
verifies the page's binding, and creates the post. Retained state and reconciliation
allow retries and interrupted jobs to reuse the same post identity.

Comments load on a visit and refresh about every **60 seconds** while the page is
visible, with backoff during failures. Bluesky indexing and caching can add delay.
This refresh does not require another site deployment.

## What still needs an operator

One-time setup includes account authorization, durable private state, the
post-deployment job and a periodic recovery job. The package does not provision
hosting or schedule these jobs by itself. Account revocation, lost state, conflicting
bindings and URL moves may need attention.

Visitors read replies without logging in. They follow **View the discussion on
Bluesky** to reply using their own accounts; the site supplies no visitor login or
reply form. The publishing account's credentials stay on the protected runner.

## What appears on the page

Replies appear first. The root post is hidden by default, and a new discussion
can correctly show **No replies to display.** Avatars are off by default. Text,
safe links, mentions and hashtags are supported; reply embeds and media cards
are not rendered. Sensitive content uses a warning disclosure, while mandatory
hidden restrictions omit the affected branch.

Live mode needs browser JavaScript and access to Bluesky's public API. Without
JavaScript, readers use the discussion link. Manual existing-post references and
explicit build snapshots remain available as alternatives.

## Current public demo

The [plain Astro demo](https://astro.demo.discussionbridge.dev/bluesky-comments/)
was previously deployed with a manually selected CodeWorks360 thread and avatars
off. That earlier snapshot trial is not evidence that the new automated publishing
workflow is deployed or has passed the planned account test.
