import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://docs.codeworkslabs.dev",
  integrations: [
    starlight({
      title: "CodeWorksLabs Docs",
      lastUpdated: true,
      customCss: ["./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
      },
      head: [
        { tag: "meta", attrs: { name: "twitter:card", content: "summary" } },
      ],
      social: [
        { icon: "blueSky", label: "CodeWorksLabs on Bluesky", href: "https://bsky.app/profile/codeworkslabs.bsky.social" },
        { icon: "discord", label: "CodeWorksLabs on Discord", href: "https://discord.gg/MuddQ27tME" },
        { icon: "github", label: "CodeWorksLabs on GitHub", href: "https://github.com/CodeWorksLabs" },
        { icon: "mastodon", label: "CodeWorksLabs on Mastodon", href: "https://mastodon.social/@CodeWorksLabs" },
        { icon: "reddit", label: "CodeWorksLabs on Reddit", href: "https://www.reddit.com/r/CodeWorksLabs/" },
        { icon: "x.com", label: "CodeWorksLabs on X", href: "https://x.com/codeworkslabs" },
        { icon: "youtube", label: "CodeWorksLabs on YouTube", href: "https://www.youtube.com/@codeworkslabs" },
      ],
      sidebar: [
        {
          label: "CodeWorksLabs",
          items: [
            { label: "Documentation home", slug: "index" },
            { label: "Products", link: "https://codeworkslabs.dev/products/" },
            { label: "Platforms", link: "https://codeworkslabs.dev/platforms/" },
            { label: "Demos", link: "https://demo.codeworkslabs.dev/" },
            { label: "Blog", link: "https://codeworkslabs.dev/blog/" },
            { label: "Support", link: "https://codeworkslabs.dev/support/" },
            { label: "Forum", link: "https://forum.codeworkslabs.dev/" },
          ],
        },
        {
          label: "Discourse",
          collapsed: true,
          items: [
            {
              label: "Brand Navigation",
              collapsed: true,
              items: [
                { label: "Overview", slug: "brand-navigation" },
                { label: "Install", slug: "brand-navigation/install" },
                { label: "Configure", slug: "brand-navigation/configure" },
                { label: "Configuration bundles", slug: "brand-navigation/configuration-bundles" },
                { label: "Updates & compatibility", slug: "brand-navigation/updates-and-compatibility" },
                { label: "Migration & rollback", slug: "brand-navigation/migration-and-rollback" },
                { label: "Troubleshooting", slug: "brand-navigation/troubleshooting" },
                { label: "Release notes", slug: "brand-navigation/release-notes" },
                { label: "Security", slug: "brand-navigation/security" },
                { label: "Attribution & license", slug: "brand-navigation/attribution-and-license" },
                {
                  label: "Source records",
                  collapsed: true,
                  items: [
                    { label: "Administrator guide", slug: "brand-navigation/source/administrator-guide" },
                    { label: "Product scope", slug: "brand-navigation/source/product-scope" },
                    { label: "Architecture", slug: "brand-navigation/source/architecture" },
                    { label: "Testing record", slug: "brand-navigation/source/testing-record" },
                    { label: "Migration record", slug: "brand-navigation/source/migration-record" },
                    { label: "Complete changelog", slug: "brand-navigation/source/complete-changelog" },
                    { label: "Security policy", slug: "brand-navigation/source/security-policy" },
                    { label: "Attribution", slug: "brand-navigation/source/attribution" },
                    { label: "Provenance", slug: "brand-navigation/source/provenance" },
                  ],
                },
              ],
            },
            { label: "DiscussionBridge docs", link: "https://docs.discussionbridge.dev/" },
          ],
        },
        {
          label: "Astro",
          collapsed: true,
          items: [
            { label: "Astro Analytics", slug: "astro-analytics" },
            { label: "Astro Bluesky Comments", slug: "astro-bluesky-comments" },
          ],
        },
      ],
      editLink: {
        baseUrl: "https://github.com/CodeWorksLabs/brand-navigation/edit/main/",
      },
    }),
  ],
});
