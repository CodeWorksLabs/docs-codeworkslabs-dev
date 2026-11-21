---
title: Getting started
description: Install the preview once and connect the automated discussion workflow to an Astro release.
editUrl: false
---

This is the intended one-time setup for automatic discussions. For documentation
sites, also follow [Starlight integration](/astro-bluesky-comments/starlight/).

> **Preview instructions:** The local candidate is implemented; real-account
> validation is planned for **22 November 2026**. Hosting and account setup remain
> to be qualified. See [availability](/astro-bluesky-comments/availability/).

## Before you begin

Use an existing Astro 7 site and a Node version supported by that Astro release.
You need the supplied private package archive, the publishing account's verified
DID, and a trusted release runner with durable private filesystem storage.

A disposable CI checkout or an unreliable cache is not durable state. The build,
publisher and recovery job must use the same authoritative state file. Preview
access is arranged through [CodeWorksLabs support](https://codeworkslabs.dev/support/)
or your existing preview arrangement. There is no public registry installation yet.

## 1. Install the supplied package

Place the exact supplied archive in your chosen package-input location, then
install it using the site's package manager. For example:

```sh
npm install ./packages/codeworkslabs-astro-bluesky-comments-0.0.0.tgz
```

Record the supplied archive integrity and retain the site's lockfile. The version
`0.0.0` alone does not identify unchanged contents. This archive includes compiled
publisher/CLI modules and Astro components; the earlier manual source-copy recipe
is not the installation method for automation.

The commands below use `npx --no-install` to select the installed CLI without
fetching a different package.

## 2. Initialize durable state once

Choose a private path outside public assets, build output and your content
collection. Replace these example values with your site and account DID:

```sh
npx --no-install bluesky-comments init --state-file /private/site/bluesky-state.json \
  --site https://site.example/ --account-did did:plc:example
```

Run this only during initial setup, before the first automated publication.
Retain and back up that state. **Do not run init in routine release jobs.** Missing
state stops the workflow instead of silently allocating replacement threads.
Restoration must preserve current bindings; an incomplete or stale backup needs
reconciliation before publishing again.

Set `BLUESKY_COMMENTS_STATE_FILE` to the same path for builds and publishing.
No account password or token belongs in the state file.

## 3. Configure the integration

Merge this into your existing `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import blueskyComments from '@codeworkslabs/astro-bluesky-comments/integration';

export default defineConfig({
  site: 'https://site.example/',
  integrations: [
    blueskyComments({
      accountDid: 'did:plc:example',
      stateFile: process.env.BLUESKY_COMMENTS_STATE_FILE,
      production: process.env.BLUESKY_COMMENTS_PRODUCTION === '1',
    }),
    // Preserve your other integrations.
  ],
});
```

The production release job sets `BLUESKY_COMMENTS_PRODUCTION=1`. Leave it unset
for local development and preview builds. Planning is enabled only for an Astro
build with that explicit production flag; a normal preview does not create
publication work or post to Bluesky.

## 4. Add comments to the selected layout once

In the shared layout that already receives your article's `entry`, compose:

```astro
---
import AutomatedComments from '@codeworkslabs/astro-bluesky-comments/AutomatedComments.astro';
const { entry } = Astro.props;
---
<article><slot /></article>
<AutomatedComments
  pageId={entry.id}
  title={entry.data.title}
  draft={entry.data.draft ?? false}
  published={entry.data.published ?? true}
/>
```

Adapt the entry variable to your route's existing props. Preserve the site's
layout, footer, Analytics and DiscussionBridge components. Selecting this layout
for a collection makes its eligible articles automatic; it does not require a
new post URL in every article.

For a standalone page, supply a stable `pageId` and `title` directly.
`enabled={false}`, `draft`, or `published={false}` excludes a page.
An explicit `uri` connects an existing post without creating one.

## 5. Connect the protected publisher

Store these in the trusted runner's protected environment or secret manager:

| Value | Purpose |
| --- | --- |
| `BLUESKY_COMMENTS_STATE_FILE` | The same durable private state used by builds |
| `BLUESKY_COMMENTS_IDENTIFIER` | Publishing account identifier |
| `BLUESKY_COMMENTS_APP_PASSWORD` | A dedicated account app password |
| `BLUESKY_COMMENTS_PDS_URL` | HTTPS account service origin; default `https://bsky.social` |

Do not use `PUBLIC_` variables, commit secret values, or expose them to browser
code. The authenticated DID must match the configured account DID. Interactive
OAuth onboarding is not implemented in this preview.

After the site's normal deployment command succeeds, the release job runs:

```sh
npx --no-install bluesky-comments publish --manifest dist/bluesky-comments.publication.json
```

Use the actual output directory if customized. The publisher checks production
page markers before any account write. A successful local build alone is not a
completed publication and must not trigger account posting.

Configure the same protected runner once for periodic recovery, for example
every 15 minutes:

```sh
npx --no-install bluesky-comments publish --site https://site.example/
```

This reads the deployed plan, resumes pending work and skips published posts.
The package does not install a scheduler for you.

## 6. Check the first complete workflow

Follow the [verification checklist](/astro-bluesky-comments/troubleshooting/#planned-account-trial).
Verify one new article, one unchanged rebuild and one new reply. A reserved
thread may be temporarily unavailable before the publisher finishes or Bluesky
indexes it; no second site build should be needed to connect it.

Live reads require browser JavaScript and a CSP allowing the site's script and
`https://public.api.bsky.app` in `connect-src`. Avatars remain off.

After setup, operators should publish articles normally. The
[Operator guide](/astro-bluesky-comments/operator-guide/) covers ongoing use.
