---
title: Contributing and testing
description: Set up a checkout, run tests and try your changes in a website.
editUrl: false
---

Use this guide to work on the package itself. To add it to a website, follow
[Getting started](/analytics-for-astro/getting-started/) instead.

## Set up a checkout

You need Node.js and npm, Git, and a checkout containing the version you are
working on. To reproduce RC.1, check out the `v0.1.0-rc.1` tag in the public
repository. Use a working branch for changes rather than editing the release tag.

From the package repository root, install its locked dependencies and run its
source checks:

```sh
npm ci
npm run verify
```

`verify` runs TypeScript checking and the test suite. The checks cover
configuration, browser helpers, provider behavior, consent, navigation and the
Astro/Starlight integration types.

The RC.1 checks used Node 22.22.2, npm 11.12.1, Astro 7.3.3, Starlight 0.42.0
and TypeScript 5.9.3. These are tested versions, not a promise that every version
in the peer ranges has been exercised.

## Find the code you need

| Location | Contents |
| --- | --- |
| `src/index.ts` | Astro integration |
| `src/config.ts` | Configuration types, defaults and validation |
| `src/events.ts` | Browser event, readiness and consent helpers |
| `src/runtime.ts` | Shared browser behavior and provider adapters |
| `src/starlight/` | Starlight wrapper |
| `docs/` | User and contributor guides |
| `test/` | Source tests and supporting fixtures |

## Try a change in a real site

From the package checkout, inspect the files npm would include:

```sh
npm pack --dry-run
```

For a reproducible test package, first commit your intended changes, then export
that exact commit into a new directory. This example uses a POSIX-compatible
shell and assumes the new directory does not exist:

```sh
git archive --format=tar --output=../analytics-source.tar HEAD
mkdir ../analytics-package
tar -xf ../analytics-source.tar -C ../analytics-package
cd ../analytics-package
npm pack
```

Run `npm pack` in the export, not a working copy with uncommitted changes or
platform-converted line endings. The repository uses LF for text. Keep the
resulting tarball intact and record its checksum when sharing test results.

Install it in a separate Astro site using the
[installation steps](/analytics-for-astro/getting-started/#1-install-the-package), choosing the local
tarball rather than the published package for your change. Check a
plain Astro site and a Starlight site. For each site run its clean install,
type checks, production build and production dependency audit. Test the real
navigation and consent interactions described in the
[verification guide](/analytics-for-astro/verification-and-troubleshooting/).

For Cloudflare sites, also run the site's Wrangler deployment dry-run before an
actual deployment. A successful dry-run checks packaging; it does not prove
live provider delivery.

## What belongs in the package?

The package includes TypeScript source, user docs, release notes and standard
package metadata. It is loaded by Astro's build pipeline; directly importing it
from plain Node.js 22 is outside the supported usage.

Keep tests, local websites, credentials and internal handoff records out of the
tarball. A source test passing is useful, but it does not replace building the
exact package in a consumer site or checking provider-side results.

## Report a useful issue

Include the package version, Node/Astro/Starlight versions, provider name,
relevant configuration with sensitive values removed, reproduction steps,
expected behavior and actual browser errors. Say whether the result was seen
in a local build, a deployed site or a provider dashboard. A short reproducible
example is more helpful than repeated dashboard screenshots without context.
