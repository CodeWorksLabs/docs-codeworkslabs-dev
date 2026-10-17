---
title: Installation
description: Install Brand Navigation, try it on a preview theme, then make it available to visitors.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/install.md
---

You need administrator access to your Discourse site. Start on a non-default theme so you can try the navigation without changing what visitors see.

Themes attached to the same component share its code and settings. If Brand Navigation is already used by a live theme, use a separate test copy or staging site; previewing another theme does not isolate changes to that shared component.

## Install from GitHub

Open **Admin → Appearance → Themes & components**, select **Components**, choose **Install → From a git repository**, and enter:

```text
https://github.com/CodeWorksLabs/brand-navigation.git
```

Installing from GitHub lets Discourse check for component updates. It follows the latest compatible Git code, which can be newer than the last tagged release. See [Versions and updates](../updates-and-compatibility/) if you need to understand that difference.

## Try it on a preview theme

1. Create or choose a non-default theme for testing. Attach Brand Navigation only to that theme for now.
2. Leave the component's **Enabled?** control on and open the test theme with Discourse's **Preview** control.
3. Keep that preview active while opening Brand Navigation's settings. This lets its Appearance and Configuration bundles panels load.
4. [Edit the sample Community link](../configure/#add-your-first-link), or [import a saved configuration](../configuration-bundles/).
5. Refresh the preview after saving. Check links, menus, signed-in/signed-out visibility, desktop/mobile layout and light/dark colors.

The component's **Enabled?** control is its only activation switch. Turning it off also removes its custom administration panels; keep it enabled on the isolated preview theme while configuring it.

## Make it available to visitors

Once the preview is ready, attach Brand Navigation to the theme your visitors use, then repeat the checks there. If you are replacing another navigation component, use [Replace another component](../migration-and-rollback/) to avoid duplicate menus or icons.

Need to undo the change on one theme? Detach Brand Navigation from that theme and restore its previous components. Turn off **Enabled?** only when you intend to stop Brand Navigation on every attached theme; its configuration is retained.

**Next:** [Add links, menus and colors](../configure/).
