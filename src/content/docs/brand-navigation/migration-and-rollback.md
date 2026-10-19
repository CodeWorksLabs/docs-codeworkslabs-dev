---
title: Replace another component
description: Move existing navigation into Brand Navigation and keep a way back.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/migration-and-rollback.md
---

If you already use Brand Header, Header Submenus or Custom Header Links, prepare the replacement on a non-default theme before changing the live one.

1. Keep the existing components and record or export their settings.
2. [Install Brand Navigation on a preview theme](../install/).
3. Recreate the links and menus in Brand Navigation. Its JSON import accepts Brand Navigation bundles, not another component's settings format.
4. Detach the overlapping old components from the test theme so you can check for duplicate bars, menus or icons. Do not globally disable a shared component still used by your live theme, and keep the original components and saved settings.
5. Verify destinations, audiences, mobile layout and colors before making the same switch on the visitor-facing theme.

If the replacement is not satisfactory, detach Brand Navigation from the affected theme and restore that theme's previous components. Turning off **Enabled?** stops Brand Navigation on every theme using the component; it does not undo the replacement on just one theme. Keep the old components until the new navigation has passed your checks.
