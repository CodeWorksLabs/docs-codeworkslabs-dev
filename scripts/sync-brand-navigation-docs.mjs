import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const repository = "CodeWorksLabs/brand-navigation";
const ref = process.env.BRAND_NAVIGATION_DOCS_REF || "main";
const outputDirectory = path.resolve("src/content/docs/brand-navigation/source");
let resolvedCommit;

const documents = [
  ["docs/USER_GUIDE.md", "administrator-guide.md", "Administrator guide", "The complete administrator workflow from the Brand Navigation repository."],
  ["docs/SCOPE.md", "product-scope.md", "Product scope", "The accepted Brand Navigation product scope and explicit exclusions."],
  ["docs/ARCHITECTURE.md", "architecture.md", "Architecture", "The canonical Brand Navigation rendering and integration architecture."],
  ["docs/TESTING.md", "testing-record.md", "Testing record", "Exact compatibility, automated, and manual evidence for Brand Navigation."],
  ["docs/MIGRATION.md", "migration-record.md", "Migration and rollback record", "The complete canonical migration and rollback procedure."],
  ["CHANGELOG.md", "complete-changelog.md", "Complete changelog", "The complete Brand Navigation version history from the repository."],
  ["SECURITY.md", "security-policy.md", "Security policy", "The canonical Brand Navigation security and supported-version policy."],
  ["docs/ATTRIBUTION.md", "attribution.md", "Attribution", "The complete Brand Navigation attribution record."],
  ["docs/PROVENANCE.md", "provenance.md", "Provenance", "The complete Brand Navigation authorship and source-provenance record."],
];

const publishedRoutes = new Map(
  documents.map(([sourcePath, filename]) => [
    sourcePath,
    `/brand-navigation/source/${filename.replace(/\.md$/, "")}/`,
  ]),
);

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function stripLeadingH1(markdown) {
  return markdown.replace(/^\s*#\s+[^\r\n]+(?:\r?\n|$)/, "");
}

function repositoryUrl(sourcePath, action = "blob", revision) {
  const targetRevision = revision || (action === "edit" ? ref : resolvedCommit || ref);
  return `https://github.com/${repository}/${action}/${targetRevision}/${sourcePath}`;
}

function rewriteRelativeLinks(markdown, sourcePath) {
  const sourceDirectory = path.posix.dirname(sourcePath);
  return markdown.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (match, label, target) => {
    if (/^(?:https?:|mailto:|#)/i.test(target)) return match;
    const [pathname, anchor = ""] = target.split("#", 2);
    if (!pathname) return match;
    const resolved = path.posix.normalize(path.posix.join(sourceDirectory, pathname));
    const publishedRoute = publishedRoutes.get(resolved);
    if (publishedRoute) {
      return `${label}(${publishedRoute}${anchor ? `#${anchor}` : ""})`;
    }
    return `${label}(${repositoryUrl(resolved)}${anchor ? `#${anchor}` : ""})`;
  });
}

await mkdir(outputDirectory, { recursive: true });

const commitResponse = await fetch(
  `https://api.github.com/repos/${repository}/commits/${encodeURIComponent(ref)}`,
  {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": "CodeWorksLabs-docs-build",
    },
  },
);
if (!commitResponse.ok) {
  throw new Error(`Unable to resolve ${ref} to an exact commit: ${commitResponse.status} ${commitResponse.statusText}`);
}
resolvedCommit = (await commitResponse.json()).sha;
if (!/^[0-9a-f]{40}$/.test(resolvedCommit)) {
  throw new Error(`GitHub returned an invalid commit identity for ${ref}`);
}
console.log(`Resolved ${repository}@${ref} -> ${resolvedCommit}`);

for (const [sourcePath, filename, title, description] of documents) {
  const rawUrl = `https://raw.githubusercontent.com/${repository}/${resolvedCommit}/${sourcePath}`;
  const response = await fetch(rawUrl, {
    headers: { "user-agent": "CodeWorksLabs-docs-build" },
  });
  if (!response.ok) {
    throw new Error(`Unable to pull ${sourcePath} at ${resolvedCommit}: ${response.status} ${response.statusText}`);
  }

  const source = rewriteRelativeLinks(
    stripLeadingH1(stripFrontmatter(await response.text())),
    sourcePath,
  );
  const shortCommit = resolvedCommit.slice(0, 12);
  const sourceNotice = `> **Canonical GitHub source** · Pulled from [\`${sourcePath}\`](${repositoryUrl(sourcePath)}) at commit [\`${shortCommit}\`](https://github.com/${repository}/commit/${resolvedCommit}) from source channel [\`${ref}\`](https://github.com/${repository}/tree/${ref}) during this site build. Use **Edit this page** below to suggest a correction at the source.`;
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `editUrl: ${repositoryUrl(sourcePath, "edit")}`,
    "---",
    "",
  ].join("\n");

  await writeFile(
    path.join(outputDirectory, filename),
    `${frontmatter}${source.trim()}\n\n---\n\n${sourceNotice}\n`,
    "utf8",
  );
  console.log(`Synced ${sourcePath} -> ${filename}`);
}
