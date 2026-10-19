---
title: Back up or move settings
description: Save a settings backup or copy your navigation to another Discourse site.
editUrl: https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/src/content/docs/brand-navigation/configuration-bundles.md
---

Save a settings file before a large change, or use one to recreate your navigation on another site. Brand Navigation calls this file a **configuration bundle**. It contains your portable settings in JSON format; you do not need to write the JSON yourself.

## Find the backup controls

Open Brand Navigation's administration page and find **Configuration bundles**, above the Preview/Export/Disable controls. If the panel is missing, make sure the component is enabled and attached to the theme you are viewing. For a new installation, follow [Install](../install/) first: keep the component on a non-default preview theme while preparing it.

## Save a backup

1. Select **Export settings**.
2. Keep the downloaded `.json` file somewhere you can find it again, with a note of the site and date.
3. Make a separate copy of any uploaded logos and note which themes use the component.

Export does not change the current configuration.

## Restore a backup or copy it to another site

1. Prepare Brand Navigation on the destination's non-default preview theme. Use a separate test copy if the existing component is already used by a live theme: attached themes share the component's settings. Export the destination's current settings first if you might want them back.
2. Select **Choose bundle** and open your saved `.json` file. You can also paste the complete file into **Or paste bundle JSON**.
3. Read any validation messages, then select **Import settings** when the file is valid. Import applies the configuration; it is not just a preview.
4. Reload the component settings and forum preview. Check links, colors, audience rules and mobile layout.
5. Upload logos separately and attach the component to a visitor-facing theme only when you are ready.

The importer checks the complete bundle before sending the settings in one Discourse update. If the browser loses the response, reload and inspect the saved settings before retrying; do not assume the import failed.

## What moves

Bundles include your navigation and appearance settings, including menus, links, visibility rules, colors and sizes. They do **not** transfer uploaded logos, theme attachments, credentials or the component's enabled state. The source theme's ID/name and the export date are reference information, not settings applied to the destination.

## File limits

Exports are limited to **1,000,000 bytes**, and serialized navigation data must remain within Discourse’s **524,288-byte** per-object setting limit. An export that would exceed either matching import boundary is refused.

For the full schema and advanced details, see the [administrator reference](../source/administrator-guide/#move-settings-with-a-configuration-bundle).
