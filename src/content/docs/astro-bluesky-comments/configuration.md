---
title: Configuration reference
description: Configure automatic publication, page eligibility, live refresh and explicit snapshot alternatives.
editUrl: false
---

> **Preview reference:** Settings below match the local automation candidate.
> Real-account setup is planned for validation on **22 November 2026**.

## Automatic integration

Import `@codeworkslabs/astro-bluesky-comments/integration` and add it to the
existing Astro integrations array.

| Option | Default | Purpose |
| --- | --- | --- |
| `accountDid` | Required | Exact publishing-account DID, not a mutable handle |
| `stateFile` | Required | Private durable filesystem state shared by builds and publisher |
| `site` | Astro's `site` | Canonical HTTPS production site, including any site subpath |
| `production` | `false` | Plan work only when explicitly true during an Astro build |

The integration does not log into Bluesky or post during the build. It emits
`bluesky-comments.publication.json` in the output directory. The release runner
publishes after successful deployment, using protected authorization. State must
remain outside public assets and output.

See [Getting started](/astro-bluesky-comments/getting-started/) for environment
values, initialization and release/recovery commands.

## Automatic page component

Import `@codeworkslabs/astro-bluesky-comments/AutomatedComments.astro`.

| Option | Default | Purpose |
| --- | --- | --- |
| `title` | Required | Title used for the initial discussion post |
| `pageId` | Route pathname | Stable page identity; prefer the collection entry's persistent ID |
| `canonicalUrl` | Route resolved on configured site | HTTPS page URL within that site; no credentials, query or fragment |
| `enabled` | `true` | False excludes the page |
| `draft` | `false` | True excludes the page |
| `published` | `true` | False excludes the page |
| `uri` | Unset | Explicit existing-post override; no automatic post is created |

Use the component in a selected shared layout. An existing binding survives
article edits; a canonical URL change requires reconciliation. Its initial post
text is not automatically rewritten. The automatic component always uses live
reading and does not accept a server `fetcher` or a snapshot `mode`.

## Display and live-reader settings

These options apply to the automatic component and the core component.

| Option | Default | Purpose |
| --- | --- | --- |
| `heading` | `Discussion` | Heading and region label |
| `id` | Unset | Unique HTML identifier for the block/heading |
| `depth` | `3` | Reply depth, integer `0`–`20` |
| `showRoot` | `false` | Include the original post |
| `showMetrics` | `true` | Display engagement counts |
| `showAvatars` | `false` | Allow images on posts without a warning |
| `refreshIntervalMs` | `60000` | Live refresh interval; integer `30000`–`3600000` |
| `timeoutMs` | `8000` | Request/body timeout; integer `100`–`60000` |
| `locale` | Runtime locale | Date formatting and request language |
| `fallbackText` | `The discussion could not be loaded here.` | Snapshot fallback message; live mode has its own loading/retry/stale messages |
| `moderation` | Conservative policy | Handling described below |

An explicit HTML `id` begins with a letter and uses only letters, digits,
`_`, `:`, `.` or `-`. It is separate from the persistent `pageId`.
`depth={0}` hides replies; include `showRoot` if the root should remain visible.

Live mode polls only visible pages and backs off after failures. The interval is
not an end-to-end freshness guarantee; public indexing/caching also applies.

## Moderation

```astro
<AutomatedComments
  title={entry.data.title}
  pageId={entry.id}
  showAvatars={false}
  moderation={{ blocked: 'placeholder', unavailable: 'placeholder', warned: 'omit' }}
/>
```

| Policy | Choices | Default |
| --- | --- | --- |
| `blocked` | `omit`, `placeholder` | `placeholder` |
| `unavailable` | `omit`, `placeholder` | `placeholder` |
| `warned` | `omit`, `warn`, `show` | `warn` |

Undefined fields preserve defaults. Mandatory `!hide` and
`!no-unauthenticated` restrictions are omitted regardless of these choices.
Warning labels include `!warn`, `porn`, `sexual`, `graphic-media` and
`nudity`, including labels on the hydrated author. Disclosures retain text;
`omit` excludes it. Labels are supplied by the public response; the package
does not independently verify label signatures.

## Starlight frontmatter

Use `automatedBlueskyCommentsSchema` and the automatic footer. Ordinary docs
need no per-page post reference. Set `blueskyComments: false` to exclude a page.

The automatic frontmatter object supports optional `uri`, `enabled`,
`heading`, `fallbackText`, `depth`, `showRoot`, `showMetrics`,
`showAvatars` and `refreshIntervalMs`. It does not expose `timeoutMs`,
`locale`, `moderation` or HTML `id`; compose the component for those.
See [Starlight integration](/astro-bluesky-comments/starlight/).

## Manual and snapshot alternatives

The core export `@codeworkslabs/astro-bluesky-comments/astro` accepts a required
individual post `uri` and `mode="live"` or `mode="snapshot"`. Its compatibility
default is **snapshot**, unlike the always-live automatic component.

```astro
---
import BlueskyComments from '@codeworkslabs/astro-bluesky-comments/astro';
---
<BlueskyComments uri="at://did:plc:example/app.bsky.feed.post/example" mode="snapshot" />
```

This core-only path does not create posts and needs no automation integration.
A snapshot fetches on server/build render, has no live refresh script and changes
only when that output is republished. A custom trusted server `fetcher` is
supported for snapshots and rejected for live mode. Profiles are not valid post
references; prefer a verified DID-based AT URI over a mutable handle.

## Styling and limits

The component inherits its surrounding font and color. Theme overrides may set
`--bsky-comments-border`, `--bsky-comments-surface`,
`--bsky-comments-muted` and `--bsky-comments-warning`.

Public thread reads omit credentials and reject redirects. Responses are bounded
at 2 MiB, normalization at 1000 visited nodes and 1000 hidden-reply entries.
Depth does not bypass these bounds. Publishing uses separate protected requests
and durable state; it is not a visitor-browser operation.
