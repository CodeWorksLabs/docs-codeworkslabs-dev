---
title: What's new
description: What's new in Brand Navigation RC4 and earlier releases.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/release-notes.md
---

## v1.0.0-rc.4

RC4 is the latest published release candidate. It was published on 2026-10-18 as a GitHub prerelease.

[Read the RC4 release notes and download](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.4).

- **Clearer setting descriptions:** find out what each control changes, including direct color entry and when a setting uses the active theme's colors.
- **Appearance color pickers:** updated guidance explains how to use the color pickers or enter color values directly, and how to return to theme colors.
- **Menu ordering:** help text explains how the up/down arrows change the order of items within the same Surface. The controls now have **Move up** and **Move down** tooltips.
- **Administrator guide:** a detailed settings reference covers the component's options, including Theme translations, colors, sizes and configuration bundles.
- **Examples and screenshots:** updated header examples and compact, click-to-enlarge settings screenshots show the navigation and administration interface.
- **Support and community:** support links lead to the CodeWorksLabs community Support category. The README also lists public installations and explains how to request a listing.

RC4 also includes the header size and color controls introduced in RC3, described below.

## v1.0.0-rc.3

RC3 was published on 2026-10-17 as a GitHub prerelease.

[Read the RC3 release notes and download](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.3).

- **Header sizes:** choose separate desktop and mobile sizes for Brand Navigation's header icons and link text, or keep the theme defaults.
- **Header colors:** set link-text colors and a shared link/icon hover background separately from icon colors.
- **Dropdown contrast:** choose a separate submenu text/icon color for hover and keyboard focus.
- **Configuration backups:** the new size and color settings are included in exported bundles.

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

## v1.0.0-rc.1

RC1 was published on 2026-09-08 as a GitHub prerelease.

Highlights include:

- one native Discourse **Enabled?** switch, with a documented staging-theme preparation and bundle-import workflow;
- protection against an older asynchronous bundle-file read replacing a newer file selection or pasted configuration;
- corrected mobile flow for linked-parent submenu children;
- adoption of Discourse’s `d-compat/<YYYY>.<M>` compatibility-branch convention; and
- updated installation, migration and testing documentation.

- [GitHub Release](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.1)
- [Complete changelog](/brand-navigation/source/complete-changelog/)
- [All releases](https://github.com/CodeWorksLabs/brand-navigation/releases)

## Release status and limits

Brand Navigation remains a prerelease. Before updating, read the notes for your chosen version, back up your settings and check [Updates and compatibility](../updates-and-compatibility/).

Known-working Discourse builds are tested examples, not a minimum-version promise. Full human screen-reader and RTL acceptance remain open, and release-tag rollback retains the precautions in [Migration and rollback](../migration-and-rollback/).
