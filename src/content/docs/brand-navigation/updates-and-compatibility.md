---
title: Update Brand Navigation
description: Update Brand Navigation in Discourse, keep a backup and check compatibility.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/updates-and-compatibility.md
---

If you installed Brand Navigation from GitHub, use Discourse's normal component updater. A downloaded ZIP or local copy is not connected to the repository and will not receive the same Git update checks.

## Check for an update

1. Read [What's new](../release-notes/) and [export a settings backup](../configuration-bundles/).
2. Open Brand Navigation under **Admin → Appearance → Themes & components**.
3. Select **Check for updates**. If a newer revision is available, Discourse offers **Update to latest**.
4. Try the update on a staging site or a separate test copy attached only to a preview theme. Updating a component also updates its code for every theme using that same component record. Check links, menus, signed-in/signed-out visibility, mobile layout and both color schemes.
5. Update the visitor-facing component when the test is satisfactory, then repeat those checks.

Discourse normally keeps your settings when updating the component's code. Keep the backup anyway, especially before a settings-schema change. Automatic updates depend on your Discourse installation's update options.

## Which version should I use?

For the normal GitHub installation, leave **Git Branch** at its default and use Discourse's updater. Discourse selects a compatible branch when one is available for your version. You do not normally need to choose a branch yourself.

If you need a specific version for testing or recovery, use the version notes in [GitHub Releases](https://github.com/CodeWorksLabs/brand-navigation/releases). A downloaded ZIP is a fixed copy; reinstall or replace it to change versions.

## Compatibility

Brand Navigation has recorded manual, automated, and native-update evidence across Discourse 2026.7 ESR, 2026.8, and 2026.9 installations. These records are evidence points—not a declared minimum version and not a claim that every feature was tested on every site.

Review exact builds, commits, refs, contexts, and open checks in the [canonical testing record](/brand-navigation/source/testing-record/).

## If something goes wrong

For a theme-local rollback, detach Brand Navigation from that theme and restore its previous setup. Turn off the component's **Enabled?** control only to stop it rendering on every attached theme; this does not delete its settings. Keep your backup and report the component revision, Discourse version and problem. Do not patch a Git-installed remote component locally.

For replacement-component recovery or release-tag pinning, follow [Migration and rollback](../migration-and-rollback/), including its staging precautions.
