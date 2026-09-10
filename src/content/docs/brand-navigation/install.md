---
title: Install
description: Install and prepare Brand Navigation safely on a staging theme.
editUrl: https://github.com/CodeWorksLabs/brand-navigation/edit/main/docs/USER_GUIDE.md
---

In Discourse, open **Admin → Appearance → Themes & components**, select **Components**, choose **Install → From a git repository**, and enter:

```text
https://github.com/CodeWorksLabs/brand-navigation.git
```

## Prepare before publishing

1. Attach the enabled component only to a non-default staging theme.
2. Open that theme through Discourse theme preview.
3. Configure the brand and sample navigation, or import a validated configuration bundle.
4. Verify desktop, mobile, anonymous, authenticated, and theme-color behavior.
5. Attach it to a visitor-facing theme only when the configuration is ready.

Discourse’s component-level **Enabled?** control is the single activation switch. Brand Navigation has no second enable setting.

The [full administrator guide](/brand-navigation/source/administrator-guide/) continues from installation into configuration, bundle migration, updates, rollback, and troubleshooting.
