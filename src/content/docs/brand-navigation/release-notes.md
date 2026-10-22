---
title: What's new
description: What's new in Brand Navigation RC5 and earlier releases.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/release-notes.md
---

## v1.0.0-rc.5 — 2026-10-22

RC5 was published on 2026-10-22 as a GitHub prerelease from source commit `c6997595bd55c7b814840352841c6979b3299fec`. It includes the changes and unresolved limits below.

[Read the RC5 release notes and download](https://github.com/CodeWorksLabs/brand-navigation/releases/tag/v1.0.0-rc.5).

### Implemented changes

- **Safer Appearance saves:** saving one color submits only the colors explicitly edited, preserving untouched saved values in the corrected sequence. A no-change **Inherit all** action clears its empty drafts.
- **Custom color controls:** each checkbox has a purpose-specific accessible name, and Space toggles retain checkbox focus.
- **Compact-menu keyboard entry:** group-only submenu controls can receive keyboard focus.
- **Long mobile labels:** a linked parent label can truncate while its submenu caret stays within the mobile bar.
- **Empty navigation:** the compact trigger is omitted when there is no renderable brand or visible navigation content.
- **Label-only entries:** navigation items that cannot show icons avoid unnecessary icon-loading subscriptions.
- **Clearer guidance:** documentation distinguishes shared-component settings from separate-copy staging and explains disabling, detaching, and Escape/focus behavior.

### Recorded results and remaining limits

Focused Chrome checks verified the long-label mobile-bar correction, the empty compact trigger/popup correction, and the Custom-checkbox focus correction. Tested English/Arabic, light/dark, Foundation/Horizon compact keyboard sequences showed no issue in the actual desktop-Chrome mobile-view contexts. These observations do not establish every browser, native-phone, or accessibility result.

**E01 remains unresolved:** immediately after a native color save, the native field and Appearance picker can display the old color. Saved values persisted through the corrected Appearance-save/reload sequence, but the cause of the stale display remains unknown.

The previous testing execution failed to produce a clear overall answer, despite surfacing reproducible issues that were fixed and verified. That is a testing-process failure, not evidence of additional product bugs. Phil closed that effort; its execution failure remains unresolved and will have a resolution. This release work used only the standard GitHub workflows Phil authorized for RC5. Further testing is on hold pending his protocol and testing-task management work and explicit direction. Incomplete coverage remains missing coverage.

### Standard GitHub CI for the RC5 candidate

The corrected source candidate is [`676cc4ae2982093551c2b46f66abecd5b93e74cb`](https://github.com/CodeWorksLabs/brand-navigation/commit/676cc4ae2982093551c2b46f66abecd5b93e74cb). The final release follow-up changes only documentation after that tested candidate. Completed results:

- [Configuration workflow](https://github.com/CodeWorksLabs/brand-navigation/actions/runs/39743682475): 45 tests passed, zero failed or skipped, including the lint-coverage guard.
- [Discourse Theme workflow](https://github.com/CodeWorksLabs/brand-navigation/actions/runs/39743682761): lint and all four backend jobs passed; all four system lanes passed 53 examples each with zero failures. Every frontend lane ran 49 tests: 42 passed and the same seven administrator-bundle assertions failed. The workflow failed overall. Four conditional job skips are not counted as passes.

The candidate is not recorded as having passed the complete standard CI run. The frontend failures are recorded as CI failures without an established cause here; this page does not turn them into additional claimed product defects. Earlier results belong to their recorded candidates and do not clear these failures.

See the [testing record](/brand-navigation/source/testing-record/) and [current known issues](https://github.com/CodeWorksLabs/brand-navigation/blob/main/docs/KNOWN_ISSUES.md) for the evidence, unresolved items, and limits.

### Supported-release policy

Phil adopted a move to following Discourse's ESR schedule in subsequent releases or prereleases. The policy targets supported ESR lines at their latest released patches, including the oldest supported ESR and both ESRs during an overlap, alongside supported monthly releases and separate development `latest` coverage. Brand Navigation is currently behind that schedule; committed pins alone do not establish completed adoption or schedule compliance. The configured workflow targets are 2026.7.3 ESR, 2026.8.1, 2026.9.0, and development `latest`. The RC5 run exercised these targets with the failed frontend checks recorded above. The policy is in place; failed checks prevent a clean compatibility or completed schedule-catchup claim. Subsequent releases and prereleases follow the then-current support schedule.

## v1.0.0-rc.4

RC4 was published on 2026-10-18 as a GitHub prerelease.

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
