---
title: Versions and availability
description: Check package availability, supported versions and upgrade steps.
editUrl: false
---

## Current availability

The stable release is `@codeworkslabs/astro-analytics@0.1.0`. Install it in your
site with:

```sh
npm install --save-exact @codeworkslabs/astro-analytics@0.1.0
```

The npm `latest` tag points to the stable release. Pinning the exact version
and committing your lockfile makes later builds reproducible. The
[GitHub release](https://github.com/CodeWorksLabs/astro-analytics/releases/tag/v0.1.0)
also provides the package tarball and its checksum. See
[Getting started](/analytics-for-astro/getting-started/) for the complete setup.

## Supported versions

| Software | Accepted version |
| --- | --- |
| Node.js | 22.18.0 or later, also meeting your Astro version's requirements |
| Astro | `>=7.3.2 <8` |
| Starlight, when used | `>=0.41.11 <0.43` |
| Umami tracker, when used | 3.2.0 or later |

Starlight is not required for plain Astro sites. Accepted ranges describe what
the package allows; they do not mean every combination has been tested. The
[contributor guide](/analytics-for-astro/development/) lists the versions used for source checks.

## What the version means

Analytics for Astro uses [Semantic Versioning](https://semver.org/). Version
`0.1.0` is the first stable package release. It is still before `1.0.0`, so read
the release notes for configuration changes before upgrading to a new minor
version. Patch releases are intended for compatible fixes.

A suffix such as `alpha.25` identifies a preview. An `rc.1` suffix identifies a
release candidate for validation before the matching stable release. Preview
APIs may change. Astro and Starlight compatibility is listed separately from
the package version.

## Upgrade an existing installation

1. Read the [release notes](/analytics-for-astro/release-notes/).
2. Run `npm install --save-exact @codeworkslabs/astro-analytics@0.1.0` in your site.
3. If replacing a vendored alpha or release candidate, keep its rollback copy
   and remove the obsolete tarball only after checking for other references.
4. Commit the updated package and lock files together.
5. Build and test before deploying. Confirm pageviews and custom events again.

RC.1 users do not need to change their configuration for 0.1.0. Early-alpha
users should also check the migration notes in the changelog. Keep the previous
site revision and package available for rollback. Published versions and
release tags are never reused for different contents.

## For release maintainers

Qualify the exact package tarball in both Astro and Starlight before publishing.
Run source checks and consumer checks as described in
[Development and verification](/analytics-for-astro/development/), then complete the provider
checks in the [verification guide](/analytics-for-astro/verification-and-troubleshooting/).

The version in `package.json`, the immutable annotated tag `v<VERSION>`, the
GitHub Release and the npm package must agree. Publish the same tarball bytes
you qualified, with an explicit distribution tag and access level.

For a stable release, first inspect a dry run:

```sh
npm publish ./codeworkslabs-astro-analytics-0.1.0.tgz --dry-run --tag latest --access public --ignore-scripts --registry=https://registry.npmjs.org/
```

Confirm the package name, version, included files, checksum, **tag latest** and
**public access**, then publish those same bytes:

```sh
npm publish ./codeworkslabs-astro-analytics-0.1.0.tgz --tag latest --access public --ignore-scripts --registry=https://registry.npmjs.org/
```

For a release candidate, use its exact prerelease version and `--tag rc` in both
commands. Other previews need an appropriate prerelease tag. Always pass the
tag explicitly rather than relying on a default.

After publication, compare the registry's package integrity with the qualified
tarball, confirm the distribution tags, and test a clean registry installation.
For 0.1.0, `latest` must point to `0.1.0`; the older `rc` tag can continue to
identify RC.1. Publish the matching GitHub Release and update the documentation
from the released source commit before rolling the package out to sites.
