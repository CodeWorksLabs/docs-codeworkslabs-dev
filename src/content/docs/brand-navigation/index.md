---
title: Brand Navigation
description: Add your brand, menus and useful header links to a Discourse community.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/index.md
---

Give visitors an easy way to find your community's website, resources and social links. Brand Navigation adds an optional branded navigation bar to Discourse and can also put text or icon links beside the forum logo or before the header controls.

[Install and preview](./install/) · [Add links and menus](./configure/) · [See live examples](https://github.com/CodeWorksLabs/brand-navigation#preview)

## Two places for your links

- **The brand bar:** show your logo or name, direct links and one level of dropdown menus.
- **The Discourse header:** add a text link, an icon, or both. Place it beside the logo or before the header controls, ahead of Sign Up and Log In.

For example, keep Community and Resources in the brand bar and add a short Versions & Status link to the Discourse header. You choose who sees each link and whether it appears on desktop, mobile or both.

![Example Brand Navigation bar on RVing Community, with Community, Resources and RVing Network menus](/images/brand-navigation/rving-community-header.png)

An existing configuration, not a guarantee of the site's current component version. [More examples](https://github.com/CodeWorksLabs/brand-navigation#preview).

## Start with one useful link

1. [Install on a preview theme](./install/) before changing your visitors' navigation.
2. [Add your first link](./configure/#add-your-first-link), then build a submenu if you need one.
3. [Choose header links and colors](./configure/#add-a-text-link-to-the-discourse-header), and check the result on a phone.
4. [Export a backup](./configuration-bundles/) once you are happy with the configuration.

## Versions and updates

Installing from the repository follows its latest compatible Git code, which can be newer than a tagged release. The current `main` branch includes the RC2 text-link, alignment and icon-color improvements. Check [GitHub Releases](https://github.com/CodeWorksLabs/brand-navigation/releases) for published downloads and whether each is marked as a prerelease.

See [What's new](./release-notes/) for the difference between the current branch and tagged releases, or [Update Brand Navigation](./updates-and-compatibility/) for the normal Discourse update process.

## Need help?

Start with [Fix a problem](./troubleshooting/). The [complete administrator reference](./source/administrator-guide/) covers the full settings and procedures, while [technical records](./source/testing-record/) contain the detailed test evidence and limits.

Brand Navigation is independently maintained by CodeWorksLabs, not an official Discourse product. It adds navigation; it does not replace Discourse's login, topic controls or composer, and it stays out of supported embedded discussions.
