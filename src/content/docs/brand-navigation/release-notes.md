---
title: What's new
description: Improvements on the current branch and links to published Brand Navigation releases.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/release-notes.md
---

## Current code on main

The RC2 work is merged into `main`. Git installations following the current compatible branch can receive newer code than the last tagged download.

The header and administration improvements include:

- **Text links in the Discourse header:** choose text, an icon, or both.
- **Header alignment:** put each link beside the logo or before the header controls, ahead of Sign Up and Log In.
- **Separate icon colors:** set normal and hover/keyboard-focus colors, or inherit the theme's defaults.
- **Friendlier editing:** Menu item and Submenu item labels, with the editor staying open after saving.
- **Small-screen fixes:** improved mixed-link layouts and minimized-topic behavior, with finite space and text truncation still worth checking on your own theme.

See [Add links, menus and colors](../configure/) to use these options and the [complete changelog](../source/complete-changelog/) for the full history.

## Published downloads

[GitHub Releases](https://github.com/CodeWorksLabs/brand-navigation/releases) is the record of published snapshots. Check the version, prerelease label and notes there before choosing a download. Do not assume a release download contains every option described for `main`.

### v1.0.0-rc.1

The first stable-track release candidate was published on 2026-09-08 as a GitHub prerelease.

Highlights include:

- one native Discourse **Enabled?** switch, with a documented staging-theme preparation and bundle-import workflow;
- protection against an older asynchronous bundle-file read replacing a newer file selection or pasted configuration;
- corrected mobile flow for linked-parent submenu children;
- adoption of Discourse’s `d-compat/<YYYY>.<M>` compatibility-branch convention; and
- refreshed release, migration, testing, and provenance records.

- [GitHub Release](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.1)
- [Complete changelog](/brand-navigation/source/complete-changelog/)
- [All releases](https://github.com/CodeWorksLabs/brand-navigation/releases)

## Release status and limits

Known-working Discourse builds are tested examples, not a minimum-version promise. Full human screen-reader and RTL acceptance remain open, and release-tag rollback retains the precautions in [Migration and rollback](../migration-and-rollback/).
