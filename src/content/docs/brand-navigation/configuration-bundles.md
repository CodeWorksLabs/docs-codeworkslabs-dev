---
title: Configuration bundles
description: Export and import versioned Brand Navigation JSON bundles.
editUrl: https://github.com/CodeWorksLabs/brand-navigation/edit/main/docs/USER_GUIDE.md
---

Brand Navigation can export and import validated, versioned JSON configuration bundles through the administrator browser workflow. Bundles support backup, staging, and repeatable multi-site preparation without re-entering every row.

## Export and import

The bundle controls are available when Brand Navigation is enabled and attached to the resolved theme. For a new installation, attach it only to a non-default staging theme, turn Discourse’s component-level **Enabled?** control on, and open that theme in Preview before working with a bundle.

1. Select **Export settings** to download the current portable configuration.
2. On the staging destination, select **Choose bundle** and open the `.json` file, or paste its contents into **Or paste bundle JSON**.
3. Review any validation errors, then select **Import settings**.
4. Verify the result in staging before attaching the component to a visitor-facing theme.

The importer validates the complete bundle before sending all settings in one Discourse theme update; it does not intentionally save a partial bundle. If the response is interrupted, reload the settings and confirm the displayed values before retrying.

## What moves

Bundles include portable theme settings, appearance overrides, and non-functional export metadata. They do **not** include API credentials, uploaded-logo identifiers, theme attachments, or an instruction to enable the component. Upload light and dark logos separately because Discourse upload identifiers are site-specific.

Exports are limited to **1,000,000 bytes**, and serialized navigation data must remain within Discourse’s **524,288-byte** per-object setting limit. An export that would exceed either matching import boundary is refused.
