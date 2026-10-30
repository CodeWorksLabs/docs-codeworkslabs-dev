---
title: Versions and availability
description: Check package availability, supported versions and upgrade steps.
editUrl: false
---

## Current availability

The current release candidate is `@codeworkslabs/astro-analytics@0.1.0-rc.1`.
Install it in your site with:

```sh
npm install @codeworkslabs/astro-analytics@0.1.0-rc.1
```

The npm distribution tag is `rc`. Pin the exact version for a reproducible
trial. The [GitHub release](https://github.com/CodeWorksLabs/astro-analytics/releases/tag/v0.1.0-rc.1)
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
[contributor guide](/analytics-for-astro/development/) lists the versions used for the current
source checks.

## What the version means

Analytics for Astro uses [Semantic Versioning](https://semver.org/). A suffix
such as `alpha.25` identifies a prerelease. An `rc.1` suffix identifies a
release candidate intended for final validation before the matching stable
version. A preview's API can still change; read the release notes before upgrading.

After 1.0.0, patch versions are for compatible fixes, minor versions add
compatible functionality, and major versions can change the public contract.
Astro and Starlight compatibility is listed separately from the package version.

## Upgrade an existing installation

1. Read the [release notes](/analytics-for-astro/release-notes/) for configuration or behavior changes.
2. Run `npm install @codeworkslabs/astro-analytics@0.1.0-rc.1` in your site.
3. If replacing a vendored alpha, remove its obsolete tarball only after checking
   that nothing else references it and retaining your rollback copy.
4. Commit the updated package and lock files together.
5. Build and test before deploying. Confirm pageviews and custom events again.

Keep the previous site revision and package available if you need to roll back.
Do not reuse a published package version for different contents.

## For release maintainers

Version numbers, source tags and package publication are separate steps. A
release uses an immutable annotated Git tag `v<VERSION>` and a matching GitHub
Release. An npm release, when published, uses that same version. Prereleases
belong on a prerelease distribution tag rather than `latest`.

The package publishes publicly with the `rc` tag for this prerelease. Qualify the
exact tarball in Astro and Starlight before publishing; see
[Contributing and testing](/analytics-for-astro/development/).

### Publish a release candidate safely

Publish the exact tarball you qualified, using an explicit distribution tag and
access level. From the directory containing that tarball, first check the command:

```sh
npm publish ./codeworkslabs-astro-analytics-0.1.0-rc.1.tgz --dry-run --tag rc --access public --ignore-scripts --registry=https://registry.npmjs.org/
```

Confirm that the output names the expected package, version and checksum and
reports **tag rc** and **public access**. Then publish those same bytes:

```sh
npm publish ./codeworkslabs-astro-analytics-0.1.0-rc.1.tgz --tag rc --access public --ignore-scripts --registry=https://registry.npmjs.org/
```

Do not use a bare `npm publish` for a release candidate. The pinned npm CLI can
select `latest` even when a package declares `publishConfig.tag`; that metadata
is not a reliable safeguard. An unqualified dry-run that selects `latest` is an
unsafe command, not approval to proceed. Always include the explicit flags above.

After publishing, check the registry's package digest and distribution tags:
`rc` must point to `0.1.0-rc.1`, and `latest` must not point to the release
candidate. Confirm a registry installation works before publishing availability
claims or rolling it out to sites.
