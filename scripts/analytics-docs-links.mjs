// Convert package Markdown links to public documentation routes.
export const rewriteLinks = (body) => body
  .replace(/\((?:\.\.\/)?CHANGELOG\.md(#[^)]*)?\)/gu, "(/analytics-for-astro/release-notes/$1)")
  .replace(/\((?:\.\/)?(?:docs\/)?([a-z0-9-]+)\.md(#[^)]*)?\)/giu, "(/analytics-for-astro/$1/$2)");
