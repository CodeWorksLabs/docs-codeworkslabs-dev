---
title: Replace another component
description: Move existing navigation into Brand Navigation and keep a way back.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/migration-and-rollback.md
---

If you already use Brand Header, Header Submenus or Custom Header Links, prepare the replacement on a non-default theme before changing the live one.

1. Keep the existing components and record or export their settings.
2. [Install Brand Navigation on a preview theme](../install/).
3. Recreate the links and menus in Brand Navigation. Its JSON import accepts Brand Navigation bundles, not another component's settings format.
4. Detach the overlapping old components from the test theme so you can check for duplicate bars, menus or icons. Do not globally disable a shared component still used by your live theme, and keep your recovery copy.
5. Verify destinations, audiences, mobile layout and colors before making the same switch on the visitor-facing theme.

If the replacement is not satisfactory, detach Brand Navigation from the affected theme and restore that theme's previous components. **Enabled?** off is a global stop for every theme using the component, not a theme-local undo. Keep the old components until the new navigation has passed your checks.

## Restore an earlier Brand Navigation version

Back up the settings before changing versions. Test the earlier version on a separate component copy or staging site; older code may not accept your current settings.

The complete downgrade-and-return workflow has not yet been fully verified. Use the [detailed recovery procedure](/brand-navigation/source/migration-record/#roll-back-brand-navigation-to-a-release-tag), and keep the working component and settings backup until recovery is confirmed.
