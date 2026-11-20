---
title: Versions and availability
description: Understand the private preview, compatible toolchain and source-copy update process.
editUrl: false
---

## Current availability

As verified from the product source on 2026-11-19,
`@codeworkslabs/astro-bluesky-comments` is an experimental private candidate,
version `0.0.0`, with `private: true`. There is no public npm release or public
release artifact qualified by these instructions. A live demo does not change
that distribution status.

The [getting-started guide](/astro-bluesky-comments/getting-started/) describes
the source-copy installation used by the actual plain Astro demo. Preview
access is arranged through CodeWorksLabs. There is no installable public
version to pin in a registry command today.

## Compatibility and verification

| Software | Declared requirement | Verified preview setup |
| --- | --- | --- |
| Node.js | Package requires `>=22.18.0`; also meet Astro's requirements | `24.22.1` |
| Astro | `^7.0.0` | `7.4.2` |
| Starlight, optional | `^0.42.7` | `0.42.7` in the integration fixture |

Astro 7.4.2 itself requires Node `>=22.23.4`. The package's lower engine floor
does not make older Node versions suitable for that Astro release. Accepted
ranges are declarations, not evidence that every version combination has
been exercised.

The plain Astro public demo was built and checked with an existing toolchain,
public DID thread reads, no avatars and preserved site integrations. The
Starlight behavior was checked in an isolated real-build fixture; it has not
been presented here as a public Starlight site rollout.

## What is supported by this preview

Manually configured public post references, anonymous server/build fetching,
replies-first rendering, optional original post, conservative public-web
moderation, text/rich-text facets, fallback and optional Starlight composition.

The package does not supply account authentication, posting, a site reply form,
automatic post creation, automatic refresh scheduling, media/link-card embeds
or a site comment database. Product behavior may change before a public alpha.

## Update a source-copy installation

1. Keep the previous source copy and a known working site artifact.
2. Obtain an explicitly identified new preview, preserving its license and
   provenance. Do not identify uncommitted source solely by its base commit.
3. Replace the intended source copy as a coherent unit; preserve your page
   references, layouts and other integrations.
4. Build and check the emitted page, original permalink, moderation/fallback
   behavior and existing site paths.
5. Publish through the site's normal process and verify the public result.

If rollback is needed, use the exact prior site/source artifact according to
the site's deployment procedure. Do not silently combine files from different
preview candidates or assume that a package version of `0.0.0` identifies
unchanged contents.

## License and source access

The reusable code is MIT-licensed; preserve its supplied `LICENSE` when copying
it. Private preview distribution and public release readiness are separate
from the license. These docs do not grant rights to unrelated artwork or site
assets.

For preview access and current release status, use
[CodeWorksLabs support](https://codeworkslabs.dev/support/).
