---
title: Getting started
description: Add the private source preview to an Astro site and connect a public discussion.
editUrl: false
---

This guide connects one public Bluesky post to one ordinary Astro page.
For a documentation site, use the [Starlight guide](/astro-bluesky-comments/starlight/).

## Before you begin

You need an existing Astro 7 site, access to the exact private preview source,
and a public Bluesky post to use as the discussion. The live trial used Astro
7.4.2 and Node.js 24.22.1. Use a Node version supported by your installed Astro
version; the package's own lower Node requirement does not replace Astro's.

There is no public npm release yet. Obtain the preview source through
[CodeWorksLabs support](https://codeworkslabs.dev/support/) or your existing
preview arrangement. These instructions do not require publishing the package.

## 1. Add an exact source copy

The currently demonstrated installation keeps the reusable source inside the
site repository, under `vendor/astro-bluesky-comments/`:

```text
your-site/
  vendor/astro-bluesky-comments/
    src/
    package.json
    LICENSE
  src/pages/bluesky-example.astro
```

Copy the candidate's complete `src` directory, `package.json` and `LICENSE`.
Record which source revision or file hashes you received. Preserve the license
and keep the copy self-contained so another checkout can build the site.
The private preview does not require adding a registry dependency for this
method.

For a local Windows checkout, edit both paths before running:

```powershell
$previewSource = 'C:\path\to\astro-bluesky-comments'
$siteRoot = 'C:\path\to\your-site'
$destination = Join-Path $siteRoot 'vendor\astro-bluesky-comments'

if (Test-Path -LiteralPath $destination) {
  throw 'Destination exists. Keep its rollback copy and plan an explicit update.'
}
New-Item -ItemType Directory -Path $destination -Force | Out-Null
foreach ($entry in @('src', 'package.json', 'LICENSE')) {
  Copy-Item -LiteralPath (Join-Path $previewSource $entry) `
    -Destination (Join-Path $destination $entry) -Recurse
}
```

The copy uses your site's existing Astro installation. Starlight is optional
for an ordinary Astro page. Do not copy the product's `node_modules`, test
fixtures or generated output into your site.

If your maintainer instead supplies a package-manager installation, use its
exact source/artifact and lockfile instructions. The exported component path
is `@codeworkslabs/astro-bluesky-comments/astro`; that name alone is not a
currently available public npm installation command.

## 2. Choose a post, not a profile

Create a public post from the account that will host the discussion and copy
the individual post link. A profile URL does not identify a discussion.

Accepted example:

```text
https://bsky.app/profile/codeworks360.bsky.social/post/3n2oynrepuk2m
```

For a durable configuration, use the account's DID instead of its changeable
handle. The live test post's equivalent reference is:

```text
at://did:plc:3spld5by3w3ivohvdm3o2rep/app.bsky.feed.post/3n2oynrepuk2m
```

These are the shared demo thread. Replace the reference with your own post for
an independent discussion. Account lookup and post creation happen outside
this component; it does not automatically discover or create an article's post.

## 3. Render the component

For the directory structure above, create `src/pages/bluesky-example.astro`:

```astro
---
import BlueskyComments from '../../vendor/astro-bluesky-comments/src/components/BlueskyComments.astro';
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bluesky discussion example</title>
  </head>
  <body>
    <main>
      <h1>Bluesky discussion example</h1>
      <p>Follow the discussion link to reply on Bluesky.</p>
      <BlueskyComments
        id="article-discussion"
        uri="at://did:plc:3spld5by3w3ivohvdm3o2rep/app.bsky.feed.post/3n2oynrepuk2m"
        showAvatars={false}
      />
    </main>
  </body>
</html>
```

On an existing article, put the component in its layout after the article
content. Preserve the layout, footer and any other discussion component the
site already uses. Adjust the relative import for that file's directory.

## 4. Build and check

Use your site's existing toolchain:

```sh
npm run build
npm run preview
```

The build host needs outbound HTTPS access to `public.api.bsky.app`.
Open the page at the preview address. Check that the discussion link opens
the intended post and that no avatar appears. A post with no replies should
show the empty message, not the unavailable-discussion fallback.

Publish through your site's existing deployment process. A local build or
preview does not update the public website.

## 5. Verify the first reply

Add a public reply on Bluesky, then rebuild and deploy the site. Confirm the
reply on the published page and follow its timestamp link to the correct
Bluesky reply. A browser reload alone does not refresh a static snapshot.

Continue with the [Operator guide](/astro-bluesky-comments/operator-guide/)
for routine refreshes, moderation and removal.
