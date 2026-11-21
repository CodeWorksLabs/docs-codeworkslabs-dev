---
title: Versions and availability
description: Distinguish the automation preview, recorded local verification and the planned real-account trial.
editUrl: false
---

## Current status

As checked against the product source on **21 November 2026**,
`@codeworkslabs/astro-bluesky-comments` remains an experimental private
candidate, version `0.0.0`, with `private: true`. There is no public npm release.
The current automation candidate is `ABC-20261119-AUTOMATION-R1`.

These guides describe how that candidate is intended to operate after one-time
setup. They are provisional ahead of the **22 November 2026** real-account
end-to-end trial and will be adjusted to match its results.

## Implemented and still to verify

| Area | Evidence/status |
| --- | --- |
| Automatic page-to-thread planning and retained identity | Implemented; local automated tests |
| Post-deployment verification and account publisher | Implemented; controlled API fixtures, not a live account posting test |
| Retry, interruption and concurrent-publisher handling | Local automated tests |
| Browser refresh, deletion/moderation updates and failures | Built JavaScript tested with controlled browser responses |
| Astro and Starlight layouts, exclusions and previews | Real local build fixtures |
| Protected account connection and durable runner setup | Still needs the intended host/account trial |
| Actual post creation and reply refresh on that account | Planned; not yet reported passed |

The recorded 19 November candidate checks passed **62 data/automation tests**,
**10 build test results**, **11 browser regressions**, strict TypeScript checking,
CLI help/init/status smoke and package inspection. The browser fixture accelerated
its poll clock; production defaults to 60 seconds. These are recorded local
results, not checks rerun for this documentation edit.

The earlier public Astro demo used a manually selected CodeWorks360 post and a
build snapshot. It is historical evidence for that earlier trial, not proof of
automated publication. These docs do not deploy the new package to that demo.

## Distribution and compatibility

Obtain the exact private archive through the preview arrangement or
[CodeWorksLabs support](https://codeworkslabs.dev/support/). Install that supplied
artifact and retain its integrity/lockfile. A `0.0.0` filename alone does not
uniquely identify contents. Automation needs its compiled modules and dependencies;
do not substitute the older manual source-copy recipe.

| Software | Package declaration | Recorded local candidate setup |
| --- | --- | --- |
| Node.js | `>=22.18.0`, also satisfy Astro | `24.22.1` |
| Astro | `^7.0.0` | `7.4.2` |
| Starlight, optional | `^0.42.7` | `0.42.7` |

These are historical test versions, not a claim that every accepted combination
is qualified. Use a Node runtime supported by the site's installed Astro version
and its approved, maintained toolchain.

## Supported workflow and limits

The candidate supports production planning, verified post-deployment creation,
durable filesystem state, a protected CLI publisher/recovery path, automatic
live reads, conservative moderation and existing-post overrides. The operator
configures the release and periodic recovery jobs once; the package does not
provision infrastructure or install a scheduler.

Interactive OAuth onboarding and hosted KV/state adapters are not implemented.
Use the supported protected app-password runner or a compatible bearer-session
callback. A disposable CI cache is not a replacement for authoritative state.

The product does not provide visitor login/reply composition, a site comment
database, copying full articles into Bluesky, or media/embed rendering in the
reply list. Existing public discussions are not deleted when a site block is
excluded. Article edits do not rewrite the original discussion post.

## Updates and rollback

Keep the prior package, site artifact and authoritative state before an update.
Install an exactly identified preview, preserve page IDs and bindings, and verify
both publishing and reading through the normal release process.

A code rollback must not roll back accepted discussion history or reinitialize
state. An incomplete/stale state backup requires reconciliation before publishing.
Do not combine files from different candidates or assume a base Git commit
identifies uncommitted implementation bytes.

## License

The reusable code is MIT-licensed. Preserve its supplied `LICENSE`. Private
distribution, public release readiness and rights to unrelated site artwork are
separate matters.
