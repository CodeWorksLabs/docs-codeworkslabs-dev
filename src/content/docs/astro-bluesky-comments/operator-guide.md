---
title: Operator guide
description: Publish normally while the integration creates discussions and refreshes public replies.
editUrl: false
---

After one-time setup, your routine jobs are publishing articles and moderating
the discussion. The release workflow should create and connect eligible pages'
Bluesky posts; visitors' browsers should keep replies current.

> **Experimental workflow:** This describes the intended operation of the local
> automation candidate. Real-account testing is planned for **22 November 2026**.

## Publish an article

1. Publish an eligible article through the site's normal process.
2. The production build reserves its discussion reference.
3. After deployment succeeds, the trusted publisher verifies the actual page
   and creates the Bluesky post with the article link.
4. The page's live reader loads that discussion as it becomes available.

No recurring manual post creation or copying of post references should be needed.
The original post is not a displayed reply; an empty new discussion is normal.
Bluesky indexing and caching may delay first visibility.

## Edit or rebuild an article

Later releases reuse the stored discussion. An unchanged rebuild, retry or
interrupted job should not create another post. Editing an article does not
rewrite its original Bluesky post or move its replies.

Keep each page's ID stable. Changing a stored page's canonical URL stops for
reconciliation and preserves the original binding. Do not invent a new ID or
delete state just to clear that error.

## Replies update automatically

Visitors receive a public read on page load, followed by a refresh about every
60 seconds while the page is visible. Hidden-page polling pauses; failures back
off. New replies, deletions and moderation changes do not normally require the
operator to rebuild or redeploy the site.

During a network failure, previously loaded replies may remain with a visible
stale-status message. They are replaced on a successful refresh. Upstream caching
can delay changes, so this is not a promise of immediate synchronization.

Visitors follow **View the discussion on Bluesky** to participate using their own
accounts. The site supplies no visitor sign-in or reply form.

## Moderate on Bluesky

Use the account's normal Bluesky tools. The reader applies the restrictions and
hydrated labels supplied by the public response; it does not reproduce all
signed-in moderation preferences or fetch labelers independently.

- Mandatory hidden restrictions omit the affected post and branch.
- Supported sensitive labels use a warning disclosure by default.
- Reported blocked or unavailable posts use placeholders.

A disclosure is not access control: its text remains in the live DOM. Choose
`moderation={{ warned: 'omit' }}` through a composed component if that text must
be omitted. Automatic mode embeds no old comment text in the initial page HTML.

Previously visible browser content can remain until a successful refresh. For an
urgent incident, the site owner can disable the block and deploy that change.
Snapshot mode has a different freshness model: its old HTML remains until rebuilt
and deployed.

## Handle exceptional failures

The publisher retries transient errors within a job. The configured recovery job
can later resume the deployed plan without a new site build. Inspect local counts:

```sh
npx --no-install bluesky-comments status
```

This uses `BLUESKY_COMMENTS_STATE_FILE`; an explicit `--state-file` is also
accepted. Keep the state and exact deployed plan when investigating a failure.

| Situation | Operator action |
| --- | --- |
| Temporary API outage | Let retries/recovery run; check runner status if it persists |
| Revoked or invalid account authorization | Repair the protected runner configuration |
| Missing or stale state | Stop publishing and restore/reconcile authoritative bindings; never reinitialize a routine job |
| Conflicting post or canonical URL move | Preserve the binding and request reconciliation |
| A deleted original Bluesky post | Decide deliberately how to replace or retire the discussion; the publisher will not silently recreate it |

## Choose or stop an existing discussion

An explicit `uri` override uses an existing post and skips automatic creation for
that page. It does not migrate replies or grant ownership of somebody else's
post. Turning the override off returns to any retained automatic binding.

Excluding a page or removing the component removes the site block when that site
change is deployed. It does not delete the Bluesky post or its replies.

Keep avatars off unless the site deliberately enables them. Live public API
reads still contact Bluesky from the visitor's browser with credentials omitted;
avatar settings do not remove that network path.
