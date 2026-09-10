---
title: Configure
description: Configure brand identity, navigation, visibility, colors, icons, and mobile behavior.
editUrl: https://github.com/CodeWorksLabs/brand-navigation/edit/main/docs/USER_GUIDE.md
---

## Brand identity

Set an optional name, destination, logo, and light/dark logo pairing. If you show a brand, provide a meaningful accessible name and verify both active color schemes.

## Navigation items

Each top-level item can be:

- a direct link with a URL and no children;
- a submenu trigger with children and no URL; or
- a linked parent with both a URL and a separate submenu caret.

Only one child level is supported. Visibility can be **everyone**, **anonymous**, or **authenticated**. Device visibility is controlled separately for desktop and mobile.

## Palette and custom colors

The **Appearance** panel controls bar background, bar text and icons, hover/highlight background, submenu background, and submenu text and icons. Leave **Custom** off to inherit the active Discourse light or dark palette. Turn it on only for colors you need to override, then select **Save colors**. **Inherit all** clears all five overrides.

Colors accept six-digit values with or without `#` and are normalized to `#RRGGBB`. Appearance overrides are included in configuration bundles.

## Discourse core-header icons

Set a direct icon link’s `surface` to `site_header` to place it with Discourse’s core header controls instead of in the Brand Navigation bar. These entries require a URL and icon and cannot have children. Their label remains the accessible name; the title is an optional tooltip. If the icon is unavailable in Discourse’s active icon set, the header item is omitted instead of rendering an empty control.

Core-header space is limited on phones. Use per-item device visibility and keep a mobile-accessible Social submenu when the complete destination set will not fit.

## Mobile presentation

Choose the compact menu, full wrapping bar, or no Brand Navigation mobile surface. Dense core-header icon sets can crowd Discourse controls on narrow screens, so reserve mobile capacity through per-item device visibility.
