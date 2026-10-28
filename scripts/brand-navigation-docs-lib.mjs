import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const repository = "CodeWorksLabs/brand-navigation";
export const sourceChannel = "main";
export const manifestFilename = "src/content/docs/brand-navigation/source/brand-navigation-docs-source.json";
export const generator = "codeworkslabs-brand-navigation-mirror";
export const transformVersion = 4;
export const docsRepository = "CodeWorksLabs/docs-codeworkslabs-dev";

function docsEditUrl(generatedPath) {
  return `https://github.com/${docsRepository}/edit/main/${generatedPath}`;
}

export const members = [
  { sourcePath: "docs/USER_GUIDE.md", generatedPath: "src/content/docs/brand-navigation/source/administrator-guide.md", title: "Administrator guide", description: "The complete administrator workflow from the Brand Navigation repository." },
  { sourcePath: "docs/SCOPE.md", generatedPath: "src/content/docs/brand-navigation/source/product-scope.md", title: "Product scope", description: "The accepted Brand Navigation product scope and explicit exclusions." },
  { sourcePath: "docs/ARCHITECTURE.md", generatedPath: "src/content/docs/brand-navigation/source/architecture.md", title: "Architecture", description: "The canonical Brand Navigation rendering and integration architecture." },
  { sourcePath: "docs/TESTING.md", generatedPath: "src/content/docs/brand-navigation/source/testing-record.md", title: "Testing record", description: "Exact compatibility, automated, and manual evidence for Brand Navigation." },
  { sourcePath: "docs/MIGRATION.md", generatedPath: "src/content/docs/brand-navigation/source/migration-record.md", title: "Migration and rollback record", description: "The complete canonical migration and rollback procedure." },
  { sourcePath: "CHANGELOG.md", generatedPath: "src/content/docs/brand-navigation/source/complete-changelog.md", title: "Complete changelog", description: "The complete Brand Navigation version history from the repository." },
  { sourcePath: "SECURITY.md", generatedPath: "src/content/docs/brand-navigation/source/security-policy.md", title: "Security policy", description: "The canonical Brand Navigation security and supported-version policy." },
  { sourcePath: "docs/ATTRIBUTION.md", generatedPath: "src/content/docs/brand-navigation/source/attribution.md", title: "Attribution", description: "The complete Brand Navigation attribution record." },
  { sourcePath: "docs/PROVENANCE.md", generatedPath: "src/content/docs/brand-navigation/source/provenance.md", title: "Provenance", description: "The complete Brand Navigation authorship and source-provenance record." },
];

const publishedRoutes = new Map(
  members.map(({ sourcePath, generatedPath }) => [
    sourcePath,
    `/brand-navigation/source/${path.posix.basename(generatedPath, ".md")}/`,
  ]),
);

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function assertRelativePath(value, label) {
  if (typeof value !== "string" || value.length === 0 || path.isAbsolute(value) ||
      value.includes("\\") || value.split("/").includes("..") ||
      path.posix.normalize(value) !== value) {
    throw new Error(`${label} is not a canonical repository-relative path: ${value}`);
  }
}

function stripFrontmatter(markdown, sourcePath) {
  if (!markdown.startsWith("---\n") && !markdown.startsWith("---\r\n")) return markdown;
  const stripped = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  if (stripped === markdown) throw new Error(`${sourcePath} has malformed frontmatter.`);
  return stripped;
}

function stripLeadingH1(markdown, sourcePath) {
  const match = markdown.match(/^\s*#\s+[^\r\n]+(?:\r?\n|$)/);
  if (!match) throw new Error(`${sourcePath} does not begin with a single H1.`);
  return markdown.slice(match[0].length);
}

function repositoryUrl(sourcePath, action, revision) {
  return `https://github.com/${repository}/${action}/${revision}/${sourcePath}`;
}

function rewriteRelativeLinks(markdown, sourcePath, sourceCommit) {
  const sourceDirectory = path.posix.dirname(sourcePath);
  return markdown.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (match, label, target) => {
    if (/^(?:https?:|mailto:|#)/i.test(target)) return match;
    const [pathname, anchor = ""] = target.split("#", 2);
    if (!pathname) return match;
    const resolved = path.posix.normalize(path.posix.join(sourceDirectory, pathname));
    const publishedRoute = publishedRoutes.get(resolved);
    if (publishedRoute) return `${label}(${publishedRoute}${anchor ? `#${anchor}` : ""})`;
    return `${label}(${repositoryUrl(resolved, "blob", sourceCommit)}${anchor ? `#${anchor}` : ""})`;
  });
}

export function sourceNotice(sourcePath, sourceCommit) {
  return `[Source on GitHub](${repositoryUrl(sourcePath, "blob", sourceCommit)})`;
}

export function renderPage(rawSource, member, sourceCommit) {
  if (!/^[0-9a-f]{40}$/u.test(sourceCommit)) throw new Error(`Invalid source commit: ${sourceCommit}`);
  const withoutFrontmatter = stripFrontmatter(rawSource, member.sourcePath);
  const source = rewriteRelativeLinks(stripLeadingH1(withoutFrontmatter, member.sourcePath), member.sourcePath, sourceCommit);
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(member.title)}`,
    `description: ${JSON.stringify(member.description)}`,
    `editUrl: ${docsEditUrl(member.generatedPath)}`,
    "---",
    "",
  ].join("\n");
  return `${frontmatter}${source.trim()}\n\n---\n\n${sourceNotice(member.sourcePath, sourceCommit)}\n`;
}

export function createManifest(sourceCommit, renderedMembers) {
  return {
    schemaVersion: 1,
    generator,
    transformVersion,
    maintenanceMode: "docs-repository",
    repository,
    sourceCommit,
    sourceChannel,
    memberCount: members.length,
    members: renderedMembers.map(({ member, sourceSha256, generatedSha256 }) => ({
      sourcePath: member.sourcePath,
      generatedPath: member.generatedPath,
      sourceSha256,
      importedPageSha256: generatedSha256,
    })),
  };
}

export async function verifySnapshot(siteRoot) {
  const manifestPath = path.join(siteRoot, manifestFilename);
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read ${manifestFilename}: ${error.message}`);
  }
  const maintainedCopy = manifest?.maintenanceMode === "docs-repository";
  const legacySnapshot = manifest?.maintenanceMode === undefined;
  if (manifest?.schemaVersion !== 1 || manifest?.generator !== generator ||
      (!maintainedCopy && !legacySnapshot) ||
      manifest?.transformVersion !== (maintainedCopy ? transformVersion : 3) || manifest?.repository !== repository ||
      manifest?.sourceChannel !== sourceChannel || manifest?.memberCount !== members.length ||
      !/^[0-9a-f]{40}$/u.test(manifest?.sourceCommit ?? "") ||
      !Array.isArray(manifest?.members) || manifest.members.length !== members.length) {
    throw new Error("Brand Navigation provenance manifest identity is invalid.");
  }

  const expectedGeneratedPaths = new Set([
    ...members.map(({ generatedPath }) => generatedPath),
    manifestFilename,
  ]);
  const seenSourcePaths = new Set();
  const seenGeneratedPaths = new Set();
  for (const [index, expected] of members.entries()) {
    const recorded = manifest.members[index];
    assertRelativePath(recorded?.sourcePath, "sourcePath");
    assertRelativePath(recorded?.generatedPath, "generatedPath");
    if (recorded.sourcePath !== expected.sourcePath || recorded.generatedPath !== expected.generatedPath ||
        seenSourcePaths.has(recorded.sourcePath) || seenGeneratedPaths.has(recorded.generatedPath) ||
        !/^[0-9a-f]{64}$/u.test(recorded?.sourceSha256 ?? "") ||
        !/^[0-9a-f]{64}$/u.test((maintainedCopy ? recorded?.importedPageSha256 : recorded?.generatedSha256) ?? "")) {
      throw new Error(`Brand Navigation manifest member ${index + 1} is invalid.`);
    }
    seenSourcePaths.add(recorded.sourcePath);
    seenGeneratedPaths.add(recorded.generatedPath);

    const generatedFile = path.join(siteRoot, recorded.generatedPath);
    let content;
    try {
      const bytes = await readFile(generatedFile);
      // Maintained copies retain their original import hash as provenance.
      // Body edits in the docs repository do not claim to reproduce that import.
      if (!maintainedCopy && sha256(bytes) !== recorded.generatedSha256) {
        throw new Error(`Brand Navigation generated hash mismatch: ${recorded.generatedPath}`);
      }
      content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch (error) {
      throw new Error(`Unable to read ${recorded.generatedPath}: ${error.message}`);
    }
    const editUrl = `editUrl: ${maintainedCopy ? docsEditUrl(recorded.generatedPath) : repositoryUrl(recorded.sourcePath, "edit", sourceChannel)}`;
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u);
    const editLines = frontmatter?.[1].split(/\r?\n/u).filter((line) => /^editUrl\s*:/u.test(line)) ?? [];
    if (editLines.length !== 1 || editLines[0] !== editUrl ||
        !content.endsWith(`${sourceNotice(recorded.sourcePath, manifest.sourceCommit)}\n`)) {
      throw new Error(`Brand Navigation provenance wrapper mismatch: ${recorded.generatedPath}`);
    }
  }

  const generatedDirectory = path.join(siteRoot, "src/content/docs/brand-navigation/source");
  const entries = await readdir(generatedDirectory, { withFileTypes: true });
  const actualGeneratedPaths = new Set(entries.map((entry) => {
    if (!entry.isFile()) throw new Error(`Unexpected directory in Brand Navigation generated estate: ${entry.name}`);
    return path.posix.join("src/content/docs/brand-navigation/source", entry.name);
  }));
  if (actualGeneratedPaths.size !== expectedGeneratedPaths.size ||
      [...actualGeneratedPaths].some((entry) => !expectedGeneratedPaths.has(entry))) {
    throw new Error("Brand Navigation generated member set does not match the manifest contract.");
  }
  return manifest;
}
