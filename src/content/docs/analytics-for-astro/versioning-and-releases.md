---
title: Versions and availability
description: Check package availability, supported versions and upgrade steps.
editUrl: false
---

## Current availability

The current test package is `@codeworkslabs/astro-analytics` version
`0.1.0-alpha.25`. It is a preview, not RC.1, and is not published to npm yet.
Ask the maintainer for the prerelease tarball if you are taking part in a trial,
then follow [Getting started](/analytics-for-astro/getting-started/).

The public source repository may lag this documentation preview. There is no
public registry installation command for this candidate. Do not substitute an
unrelated package with a similar name.

## Supported versions

| Software | Accepted version |
| --- | --- |
| Node.js | 22.18.0 or later, also meeting your Astro version's requirements |
| Astro | `>=7.3.2 <8` |
| Starlight, when used | `>=0.41.11 <0.43` |
| Umami tracker, when used | 3.2.0 or later |

Starlight is not required for plain Astro sites. Accepted ranges describe what
the package allows; they do not mean every combination has been tested. The
[contributor guide](/analytics-for-astro/development/) lists the versions used for the current
source checks.

## What the version means

Analytics for Astro uses [Semantic Versioning](https://semver.org/). A suffix
such as `alpha.25` identifies a prerelease. An `rc.1` suffix will identify a
release candidate intended for final validation before the matching stable
version. A preview's API can still change; read the release notes before upgrading.

After 1.0.0, patch versions are for compatible fixes, minor versions add
compatible functionality, and major versions can change the public contract.
Astro and Starlight compatibility is listed separately from the package version.

## Upgrade a test installation

1. Read the [release notes](/analytics-for-astro/release-notes/) for configuration or behavior changes.
2. Obtain the new tarball and put it in your site's `vendor` directory.
3. Run `npm install ./vendor/NEW-PACKAGE-FILENAME.tgz`, using its actual filename.
4. Commit the tarball and updated package/lock files together.
5. Build and test before deploying. Confirm pageviews and custom events again.

Keep the previous site revision and package available if you need to roll back.
Do not reuse a published package version for different contents.

## For release maintainers

Version numbers, source tags and package publication are separate steps. A
release uses an immutable annotated Git tag `v<VERSION>` and a matching GitHub
Release. An npm release, when published, uses that same version. Prereleases
belong on a prerelease distribution tag rather than `latest`.

The package's `private: true` safeguard currently prevents accidental npm
publication. Removing it is part of a deliberate release, not installation or
documentation editing. Qualify the exact tarball in Astro and Starlight before
publishing; see [Contributing and testing](/analytics-for-astro/development/).
