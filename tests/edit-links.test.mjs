import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const docsEditBase = "https://github.com/CodeWorksLabs/docs-codeworkslabs-dev/edit/main/";
const { sourceCommit } = JSON.parse(await readFile(new URL(
  "../src/content/docs/brand-navigation/source/brand-navigation-docs-source.json",
  import.meta.url,
), "utf8"));

async function builtPage(route) {
  return readFile(new URL(`../dist/${route}index.html`, import.meta.url), "utf8");
}

function editLinks(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gu)]
    .filter(([, , contents]) => contents.replace(/<[^>]*>/gu, "").trim() === "Edit page")
    .map(([, href]) => href);
}

for (const [route, sourcePath] of [
  ["analytics-trial/", "src/content/docs/analytics-trial.mdx"],
  ["analytics-trial/next/", "src/content/docs/analytics-trial/next.md"],
  ["brand-navigation/", "src/content/docs/brand-navigation/index.md"],
]) {
  test(`${route} edits the exact local docs source`, async () => {
    assert.deepEqual(editLinks(await builtPage(route)), [docsEditBase + sourcePath]);
  });
}

// Current v4 copies are maintained in the docs repository. Their imported
// source notices retain the upstream paths, including renamed/root files.
for (const [slug, upstreamPath] of [
  ["administrator-guide", "docs/USER_GUIDE.md"],
  ["product-scope", "docs/SCOPE.md"],
  ["architecture", "docs/ARCHITECTURE.md"],
  ["testing-record", "docs/TESTING.md"],
  ["migration-record", "docs/MIGRATION.md"],
  ["complete-changelog", "CHANGELOG.md"],
  ["security-policy", "SECURITY.md"],
  ["attribution", "docs/ATTRIBUTION.md"],
  ["provenance", "docs/PROVENANCE.md"],
]) {
  test(`Brand Navigation ${slug} preserves its edit and provenance destinations`, async () => {
    const html = await builtPage(`brand-navigation/source/${slug}/`);
    assert.deepEqual(editLinks(html), [
      `${docsEditBase}src/content/docs/brand-navigation/source/${slug}.md`,
    ]);
    assert.ok(html.includes(`href="https://github.com/CodeWorksLabs/brand-navigation/blob/${sourceCommit}/${upstreamPath}"`));
  });
}

for (const route of [
  "",
  "astro-analytics/",
  "astro-bluesky-comments/",
  "analytics-for-astro/",
  ...[
    "getting-started", "configuration", "api-reference", "events",
    "verification-and-troubleshooting", "starlight", "runtime-and-safety",
    "development", "versioning-and-releases", "release-notes",
  ].map((slug) => `analytics-for-astro/${slug}/`),
]) {
  test(`${route || "/"} keeps editing disabled by frontmatter`, async () => {
    assert.deepEqual(editLinks(await builtPage(route)), []);
  });
}
