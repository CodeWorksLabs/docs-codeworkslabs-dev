---
title: What's new
description: What's new in Brand Navigation RC3 and links to published releases.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/release-notes.md
---

## v1.0.0-rc.3

RC3 was published on 2026-10-17 as a GitHub prerelease.

[Read the RC3 release notes and download](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.3).

- **Header sizes:** choose separate desktop and mobile sizes for Brand Navigation's header icons and link text, or keep the theme defaults.
- **Header colors:** set link-text colors and a shared link/icon hover background separately from icon colors.
- **Dropdown contrast:** choose a separate submenu text/icon color for hover and keyboard focus.
- **Configuration backups:** the new size and color settings are included in exported bundles.

Git-installed components also receive the subsequent settings-description and ordering-help updates through Discourse's updater. The published RC3 download remains a fixed release.

## v1.0.0-rc.2

RC2 was published on 2026-10-17 as a GitHub prerelease.

[Read the RC2 release notes and download](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.2).

The header and administration improvements include:

- **Text links in the Discourse header:** choose text, an icon, or both.
- **Header alignment:** put each link beside the logo or before the header controls, ahead of Sign Up and Log In.
- **Separate icon colors:** set normal and hover/keyboard-focus colors, or inherit the theme's defaults.
- **Friendlier editing:** Menu item and Submenu item labels, with the editor staying open after saving.
- **Small-screen fixes:** improved mixed-link layouts and minimized-topic behavior, with finite space and text truncation still worth checking on your own theme.
- **Clearer color controls:** consistently aligned Appearance rows, without changing their save/reset behavior.

See [Add links, menus and colors](../configure/) to use these options and the [complete changelog](../source/complete-changelog/) for the full history.

## Published downloads

[GitHub Releases](https://github.com/CodeWorksLabs/brand-navigation/releases) lists published versions. RC3 is the newest published release candidate. Check its notes and back up your settings before updating. The source records linked from these docs mirror the identified source revision and retain dated preparation and testing history.

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
