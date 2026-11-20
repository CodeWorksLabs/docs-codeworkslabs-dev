---
title: Starlight integration
description: Add optional per-page Bluesky discussions while preserving the Starlight footer.
editUrl: false
---

Starlight uses the same renderer and public-thread behavior as ordinary Astro.
The optional schema adds per-page settings, and the supplied footer wrapper
keeps Starlight's standard footer before the discussion.

The preview's declared peer range is Starlight `^0.42.7` with Astro `^7.0.0`.
The integration fixture was verified with Starlight 0.42.7 and Astro 7.4.2.
This does not imply compatibility with every older Starlight installation.

## 1. Add the source preview

Follow [Getting started](/astro-bluesky-comments/getting-started/#1-add-an-exact-source-copy)
to copy the exact preview to `vendor/astro-bluesky-comments/`. The paths below
use that self-contained copy. Do not import a sibling site's installed files.

## 2. Extend the existing docs schema

For a site with the standard collection setup, `src/content.config.ts` is:

```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { blueskyCommentsSchema } from '../vendor/astro-bluesky-comments/src/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: blueskyCommentsSchema }),
  }),
};
```

Preserve other collections. If the docs schema already has extensions, merge
the fields instead of replacing them. For an existing object extension:

```ts
schema: docsSchema({
  extend: existingExtension.merge(blueskyCommentsSchema),
}),
```

That merge example assumes `existingExtension` is a compatible Zod object.
Keep any existing function-based extension's arguments and merge inside it
according to your installed Starlight schema API.

## 3. Compose the footer

If you currently use the stock footer, create `src/components/BlueskyFooter.astro`:

```astro
---
import Footer from '../../vendor/astro-bluesky-comments/src/starlight/Footer.astro';
---
<Footer><slot /></Footer>
```

In your existing `starlight()` options in `astro.config.mjs`, add:

```js
components: {
  Footer: './src/components/BlueskyFooter.astro',
},
```

Merge with your existing component overrides. The wrapper renders the native
footer and then adds comments only for configured pages.

If you already have a custom Footer, preserve it. Compose the core comments
component into that footer using the current page's settings instead of
silently replacing your custom layout. The schema validates the frontmatter;
your custom component still needs to read and render it.

## 4. Opt a page in

Add this to one documentation page's frontmatter:

```yaml
blueskyComments:
  uri: at://did:plc:3spld5by3w3ivohvdm3o2rep/app.bsky.feed.post/3n2oynrepuk2m
  heading: Discussion
  depth: 3
  showAvatars: false
```

The schema also supports `fallbackText`, `showRoot` and `showMetrics`.
It does not expose `timeoutMs`, `locale`, `moderation`, `fetcher` or `id`
through page frontmatter. Use a composed core component if you need those
advanced options, and preserve the same validation/opt-in boundary.

## 5. Verify the result

Build and preview with your site's existing commands. Check an opted-in doc,
a splash page if your site uses one, and a page without `blueskyComments`.
The native footer should remain; unconfigured pages should have no new
discussion. Use keyboard navigation to reach the source link and any warning.

For a package-manager-installed preview, the equivalent exports are
`@codeworkslabs/astro-bluesky-comments/starlight` and
`@codeworkslabs/astro-bluesky-comments/starlight/Footer.astro`. They describe
the available API, not the availability of a public npm release.
