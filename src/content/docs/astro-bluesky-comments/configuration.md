---
title: Configuration reference
description: Choose the thread, depth, presentation and moderation options for the Astro component.
editUrl: false
---

Pass settings to the Astro component. This is a per-page component; it does not
need an integration entry in `astro.config.mjs` for ordinary Astro use.

## Component options

| Option | Default | Use |
| --- | --- | --- |
| `uri` | Required | Individual HTTPS `bsky.app` post URL or post AT URI |
| `heading` | `Discussion` | Discussion heading and region name |
| `id` | Unset | Unique HTML identifier; supplies the heading anchor |
| `depth` | `3` | Reply depth, integer from `0` to `20` |
| `showRoot` | `false` | Include the original post before replies |
| `showMetrics` | `true` | Show reply, repost, like and quote counts |
| `showAvatars` | `false` | Allow author images for posts without a warning |
| `fallbackText` | `The discussion could not be loaded here.` | Public message when the thread cannot be displayed |
| `timeoutMs` | `8000` | Request/body timeout; integer from `100` to `60000` |
| `locale` | Runtime locale | Date formatting and request language preference |
| `moderation` | Conservative policy | Blocked, unavailable and warned-post handling |
| `fetcher` | Server `fetch` | Trusted server-side fetch implementation for caching or tests |

Use a different `id` for each discussion block on the same page. An explicit
ID must begin with a letter and contain only letters, digits, `_`, `:`, `.`,
or `-`.

`depth={0}` hides replies; use `showRoot` as well if you want the original post
at that depth. The option limits nesting, not an operator-selected total
comment count. Raising depth does not bypass the fixed response/work limits.

## References and identity

Use an individual post reference, for example:

```text
https://bsky.app/profile/codeworks360.bsky.social/post/3n2oynrepuk2m
at://did:plc:3spld5by3w3ivohvdm3o2rep/app.bsky.feed.post/3n2oynrepuk2m
```

A profile URL is insufficient. Remove query strings or fragments from shared
post links. DID references survive handle changes; the record key identifies
the exact post. The component rejects a returned thread whose root cannot be
matched to the configured reference.

Syntax validation does not resolve a DID or guarantee every DID method is
supported by the public service. Use a reference verified against the public
AppView, such as the demo's `did:plc` identity.

## Moderation

The core component accepts:

```astro
<BlueskyComments
  uri="at://did:plc:3spld5by3w3ivohvdm3o2rep/app.bsky.feed.post/3n2oynrepuk2m"
  showAvatars={false}
  moderation={{
    blocked: 'placeholder',
    unavailable: 'placeholder',
    warned: 'omit',
  }}
/>
```

| Setting | Choices | Default |
| --- | --- | --- |
| `blocked` | `omit`, `placeholder` | `placeholder` |
| `unavailable` | `omit`, `placeholder` | `placeholder` |
| `warned` | `omit`, `warn`, `show` | `warn` |

Omitted or `undefined` settings retain defaults. Mandatory hidden restrictions
are still omitted regardless of these choices. Supported warning labels are
`!warn`, `porn`, `sexual`, `graphic-media` and `nudity`, including labels on
the hydrated author. A warning disclosure retains text in HTML; `omit` excludes
it. `show` deliberately displays warned text without the disclosure.

Labels come from AppView or your trusted fetcher. The package does not query
labelers independently or verify label signatures, and cannot enforce a
restriction that the response does not supply.

## Markdown and MDX collections

An integrator can add an optional field to an existing collection schema:

```ts
import { z } from 'astro/zod';

// Merge this into your collection's existing schema.
const discussionField = z.object({
  blueskyComments: z.object({ uri: z.string() }).optional(),
});
```

Opt a content entry in with:

```yaml
blueskyComments:
  uri: at://did:plc:3spld5by3w3ivohvdm3o2rep/app.bsky.feed.post/3n2oynrepuk2m
```

In the route that renders the entry, pass `post.data.blueskyComments` to the
article layout as its `blueskyComments` prop. In that existing layout:

```astro
---
import BlueskyComments from '../../vendor/astro-bluesky-comments/src/components/BlueskyComments.astro';

interface Props {
  blueskyComments?: { uri: string };
}
const { blueskyComments } = Astro.props;
---
<article><slot /></article>
{blueskyComments && (
  <BlueskyComments uri={blueskyComments.uri} showAvatars={false} />
)}
```

That import assumes a file directly under `src/layouts`. Adjust it for the
chosen source-copy directory. Frontmatter alone does not render a component;
the route/layout must pass and use the field. MDX also needs your site's MDX
integration. Preserve the collection's loader, existing fields and layout.

## Styling

The component inherits the surrounding font and text color. Override these
CSS custom properties on a containing element:

```css
.article-discussion {
  --bsky-comments-border: #64748b;
  --bsky-comments-surface: transparent;
  --bsky-comments-muted: #475569;
  --bsky-comments-warning: #9a6700;
}
```

Choose values appropriate to both themes your site offers and retain visible
keyboard focus. The package supplies no theme selector.

## Fetching and limits

One public thread request is made per component render. The timeout covers
request and response-body reading; redirects are rejected and credentials are
omitted. Decoded responses are bounded at 2 MiB, normalization at 1000 visited
nodes and 1000 hidden-reply entries. A limit failure shows the fallback rather
than silently truncating the accepted discussion.

Custom `fetcher` functions run on the server/build host. They must preserve the
destination/credential policy and supply the real hydrated thread identity and
labels. There is no built-in cache or retry; the host owns any caching policy.
