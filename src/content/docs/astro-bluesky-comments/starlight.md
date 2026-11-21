---
title: Starlight integration
description: Configure the automatic footer once so eligible documentation pages receive Bluesky discussions.
editUrl: false
---

Use the automation integration and automatic Starlight footer to connect ordinary
documentation pages without assigning a post reference to each page.

> **Experimental preview:** The local Starlight build is verified; real-account
> end-to-end testing is planned for **22 November 2026**. Setup may change.

## 1. Complete the common setup

Install the supplied private package archive and initialize authoritative durable
state once. Configure the protected publisher and successful-deployment hook
from [Getting started](/astro-bluesky-comments/getting-started/).

Preserve your installed Starlight, existing collections and other integrations.
This guide does not install a second theme or change unrelated comments systems.

## 2. Extend the docs schema

In the existing `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { automatedBlueskyCommentsSchema } from '@codeworkslabs/astro-bluesky-comments/starlight';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: automatedBlueskyCommentsSchema }),
  }),
};
```

Preserve other collections. Merge existing schema extensions instead of replacing
them. For an existing compatible Zod object, use
`existingExtension.merge(automatedBlueskyCommentsSchema)`; preserve the arguments
of function-based extensions and merge inside the existing function.

## 3. Compose the footer

If the site uses the stock footer, create `src/components/BlueskyFooter.astro`:

```astro
---
import Footer from '@codeworkslabs/astro-bluesky-comments/starlight/AutomatedFooter.astro';
---
<Footer><slot /></Footer>
```

Keep Starlight and add the Bluesky integration in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import blueskyComments from '@codeworkslabs/astro-bluesky-comments/integration';

export default defineConfig({
  site: 'https://docs.example/',
  integrations: [
    blueskyComments({
      accountDid: 'did:plc:example',
      stateFile: process.env.BLUESKY_COMMENTS_STATE_FILE,
      production: process.env.BLUESKY_COMMENTS_PRODUCTION === '1',
    }),
    starlight({
      title: 'Your documentation',
      components: { Footer: './src/components/BlueskyFooter.astro' },
    }),
  ],
});
```

Merge these settings into the existing configuration. Preserve Analytics,
DiscussionBridge, navigation and other component overrides.

An existing custom footer should compose `AutomatedComments` after its existing
content, using `Astro.locals.starlightRoute.entry.id` and the entry's title.
Do not replace a custom footer with the stock-footer wrapper.

## 4. Set page policy once, with exceptions

Ordinary documentation pages are automatic; they need no
`blueskyComments.uri`. The automatic footer excludes splash and draft pages.

To exclude another page:

```yaml
blueskyComments: false
```

To adjust a page:

```yaml
blueskyComments:
  heading: Discussion
  depth: 3
  showAvatars: false
  refreshIntervalMs: 60000
```

To keep an existing discussion, add its verified individual post reference:

```yaml
blueskyComments:
  uri: at://did:plc:example/app.bsky.feed.post/example
```

That override does not create or edit a post. Advanced moderation, locale,
timeout and HTML ID settings require a composed component; they are not
automatic frontmatter fields.

## 5. Verify the release path

Check an ordinary doc, an excluded doc and a splash page. The native/custom
footer must remain. Production builds should plan only eligible automatic
pages; normal previews must not create account posts.

After the normal deployment succeeds, the protected publisher verifies the
deployed page markers and creates the discussion. Confirm a reply appears without
another build, avatars remain off, and keyboard access to the discussion link
and warning disclosures still works.

## Retained manual footer

The earlier `blueskyCommentsSchema` and `/starlight/Footer.astro` export remain
available for explicitly configured per-page `uri` values. That footer does not
create discussions; its default rendering is a snapshot unless a live mode is
selected. Use the automatic schema/footer pair for the set-and-forget workflow.
