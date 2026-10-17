---
title: Fix a problem
description: Find missing links, apply saved changes, fix placement and restore inherited colors.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/troubleshooting.md
---

## The component does not appear

Check that **Enabled?** is on and Brand Navigation is attached to the theme you are actually viewing. On a preview theme, reopen its Preview. Add a usable navigation item or visible brand name/logo, then refresh the page.

On mobile, `mobile_mode` `hidden` hides all Brand Navigation surfaces. Brand Navigation is also intentionally absent from supported embedded discussions.

## I saved a change but the forum looks the same

Select **Save Changes** in `navigation_items`, then refresh the forum or preview tab. An already-open page can keep its old navigation settings. Confirm you edited the component attached to the theme you are viewing.

For new-tab behavior, **Target** `_blank` opens a new tab; `_self` uses the same tab. Save and refresh before testing either choice.

## Section does not move my header link

**Section** controls left/right placement in the brand bar. For a link with **Surface** `site_header`, use **Site-header alignment**: `left` beside the logo or `right` before the header controls. Both positions precede Sign Up and Log In. Save and refresh.

## A link or submenu is missing

Check its **Audience**, **Device visibility** and URL. Every child needs a label and URL. An item can be hidden by its own rule even when its parent is visible.

A `site_header` item must be a direct link: no children and no `group` behavior. Text-only links use **Site-header presentation** `label_only` and do not need an icon. For `icon_only`, check the icon name and `custom_font_awesome_icons`; an unavailable icon hides that link. Keep a meaningful Label for every presentation.

## Changing icon colors does not change the text

**Core-header icon** and **Core-header icon hover** change only Brand Navigation's header icons, not link text, Discourse's own controls or brand-bar icons. Hover also applies to keyboard focus. To apply an override, turn on its **Custom** checkbox and select **Save colors**.

To follow the theme again, turn Custom off for that row and save. **Inherit all** clears and saves all seven appearance overrides. Check light and dark palettes; a custom color remains fixed in both.

## Mobile controls feel crowded

Use `mobile_mode` `menu`, shorten labels and show fewer header links on phones. Move lower-priority destinations into a submenu or set them desktop-only. Long text can be truncated and logos compact; the header still needs room for Discourse's own controls.

## A bundle will not import

Use a `.json` file exported by Brand Navigation and read the validation message before changing any values. It should contain the complete bundle, not just the navigation array. Upload logos separately; their identifiers do not transfer between sites.

If the import response was interrupted, reload the component settings and inspect the saved values before trying again. See [Back up or move settings](../configuration-bundles/) for the complete workflow and limits.

## Ask for help

The [administrator reference](/brand-navigation/source/administrator-guide/#troubleshooting) has more detail. When [reporting a problem](https://github.com/CodeWorksLabs/brand-navigation/issues), include your component version or commit, Discourse version, active theme, browser/device, sign-in state, expected result and steps to reproduce. Share only sanitized settings or console output.

For ordinary defects, compatibility problems, and documentation corrections, use [Brand Navigation GitHub Issues](https://github.com/CodeWorksLabs/brand-navigation/issues). Do not report an undisclosed vulnerability in a public issue; use the [private security-reporting route](/brand-navigation/security/) instead.
