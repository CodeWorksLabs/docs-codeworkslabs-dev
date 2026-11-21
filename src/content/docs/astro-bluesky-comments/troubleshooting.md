---
title: Verify and troubleshoot
description: Verify automatic posting, thread reuse and live reply updates, and recover without duplicate discussions.
editUrl: false
---

> **Preview acceptance:** The checklist below is for the real-account trial
> planned for **22 November 2026**. Local fixture results are recorded in
> [availability](/astro-bluesky-comments/availability/); the account trial has
> not yet been reported as passed.

## Planned account trial

1. Configure one publishing account and durable private state for one demo.
   Preserve Analytics, DiscussionBridge and existing layouts; keep avatars off.
2. Build and successfully publish one eligible article. Confirm the publisher
   checks its deployed marker and creates exactly one matching Bluesky post.
3. Verify the account DID, article link, discussion permalink and empty state.
4. Rebuild the same article unchanged. Confirm no second post is created.
5. Add a public reply through Bluesky. Confirm it appears without rebuilding
   or redeploying the site.
6. Delete or restrict a test reply. Confirm a successful refresh removes or
   changes the displayed content under the moderation policy.
7. Exercise a temporary failure and recovery. Check stale/unavailable status,
   then restored live replies.
8. Retry interrupted publishing with the same state and plan. Confirm the same
   post identity is reconciled rather than replaced.
9. Confirm draft, disabled, preview and failed-release cases create no posts.
10. Check keyboard navigation, warning disclosures, narrow layouts and supported
    themes. With JavaScript disabled, the discussion link must remain usable.

Record the actual outcome and change these guides where testing shows a
difference. A local build or controlled API fixture is not a real account test.

## Common symptoms

| What you see | What to check |
| --- | --- |
| No automatic block in a normal preview | Expected when there is no existing-post override: previews do not allocate publication work. Check the selected layout and production configuration for the real release path. |
| A production page has no discussion post | Check the post-deployment job, explicit production flag, page eligibility, durable state and exact deployed manifest/marker. A successful build is not a completed account publication. |
| New post is temporarily unavailable | The publisher may still be running or the public service may not have indexed it. Check job/state status; no second build should be needed. |
| **No replies to display.** | A successful read has no displayable replies. The root post is hidden by default. Add a reply to the connected thread. |
| New replies do not appear | In live mode, check JavaScript, CSP, public API access, page visibility, backoff, correct thread and upstream caching. In explicit snapshot mode, rebuild and deploy. |
| Last loaded replies remain during failure | The live reader labels them stale. A successful refresh should replace them; do not assume the old view is current. |
| Deleted/restricted text remains | Wait for a successful live refresh and check upstream labels/cache. Snapshot HTML remains until republished. For an urgent incident, disable the block and deploy. |
| **Some replies could not be loaded.** | Valid siblings remain while malformed branches are omitted. Check fresh upstream data; the result is partial. |
| State is missing or conflicts | Stop and restore/reconcile authoritative state. Do not delete it, reinitialize a routine job or change IDs to force a replacement thread. |
| Account authorization fails | Check protected identifier/app-password/PDS settings and exact account DID. Never put secrets in public config or support messages. |
| Production marker verification fails | Confirm that the exact build was actually deployed at its canonical HTTPS URL and caches have caught up. The publisher must not bypass this check. |
| Starlight comments are missing | Check the automatic schema/footer pair, ordinary versus splash/draft page, exclusions and preserved custom footer. |
| Original post is absent | Expected with `showRoot={false}`. The replies-first display does not mean the thread is disconnected. |

## Inspect and recover

```sh
npx --no-install bluesky-comments status
npx --no-install bluesky-comments publish --site https://site.example/
```

The runner must use its configured protected environment and authoritative
`BLUESKY_COMMENTS_STATE_FILE`. Recovery reads the currently deployed plan and
skips published posts. Preserve pending intents after an interrupted request.
A conflicting record or URL move needs reconciliation; a deleted original post
is not silently recreated.

## Network and privacy

Live reads come from the visitor's browser to `https://public.api.bsky.app`
with credentials omitted. Check the page's JavaScript and `connect-src` CSP.
Avatars off prevents author image requests, not the public thread request.

Account posting is a separate trusted-runner operation to the account service.
It never belongs in browser JavaScript. Snapshot reads instead happen during
server/build rendering and have their own freshness behavior.

Other integrations have separate network paths. Diagnose the actual failing
request; an unrelated forum-refresh failure is not a reason to change the
Bluesky thread or weaken its checks.

## Support information

Provide the page URL, public thread reference, candidate/archive identity,
Astro/Node/Starlight versions, live versus snapshot mode, visible state, deployment
time and whether the publisher/recovery job completed. Include non-secret status
counts and whether the durable state is intact.

Do not send passwords, app passwords, tokens, private environment files or raw
private journals. [Contact CodeWorksLabs support](https://codeworkslabs.dev/support/).
