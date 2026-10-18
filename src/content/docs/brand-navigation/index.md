---
title: Brand Navigation
description: Add your brand, menus and useful header links to a Discourse community.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/index.md
---

Give your Discourse forum its own identity and a clear way to get around. Brand Navigation adds your logo or name, useful links and dropdown menus in a bar above or below the forum header.

Brand Navigation is independently maintained by CodeWorksLabs, not an official Discourse product. It adds navigation; it does not replace Discourse's login, topic controls or composer.

[Install](./install/) · [Add links and menus](./configure/) · [See live examples](https://github.com/CodeWorksLabs/brand-navigation#header-and-navigation-examples)

## Two places for your links

- **The brand bar is your main navigation area.** Link to your website, community resources and other destinations. Group related links into one-level dropdown menus, with optional icons and descriptions. Use separate light/dark logos and inherit your forum's palette or choose custom colors.
- **The Discourse header can hold optional extra links.** Add a short text link, an icon, or both beside the forum logo or before the header controls.

Choose which items signed-in and signed-out visitors see, and whether they appear on desktop, mobile or both. On phones, use a compact menu, a wrapping bar, or hide the component. Edit the settings in Discourse and export a backup when the navigation is ready.

![The Bridge: Brand Navigation menus above the Discourse header, with a Versions & Status text link and icons beside the header controls](/images/brand-navigation/the-bridge-header.jpg)

An existing configuration, not a guarantee of the site's current component version. [More examples](https://github.com/CodeWorksLabs/brand-navigation#header-and-navigation-examples).

## Start with one useful link

1. [Install on a preview theme](./install/) before changing your visitors' navigation.
2. [Add your first link](./configure/#add-your-first-link), then build a submenu if you need one.
3. [Choose your colors](./configure/#palette-and-custom-colors), and check your navigation on a phone.
4. [Export a backup](./configuration-bundles/) once you are happy with the configuration.

## Versions and updates

Use Discourse's component updater to check for updates. Back up your settings first and try changes on a separate test copy before updating the navigation your visitors use.

See [What's new](./release-notes/) for changes and versioned downloads, or [Update Brand Navigation](./updates-and-compatibility/) for the update steps.
