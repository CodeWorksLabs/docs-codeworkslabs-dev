import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const sourceRef = "ae6a9884e3cada297f11c641a90082f296380bcb";
const expectedCommit = "ae6a9884e3cada297f11c641a90082f296380bcb";
const expectedVersion = "0.1.0-alpha.20";
const rootArgument = process.argv[2] === "--root" ? process.argv[3] : undefined;
if (process.argv[2] === "--root" && !rootArgument) throw new Error("Verification root is required.");
const siteRoot = rootArgument ?? process.cwd();
const suppliedSourceRoot = rootArgument ? undefined : process.argv[2];
const sourceManifestPath = join(siteRoot, "analytics-docs-source.json");
const expectedPagePaths = [
  "src/content/docs/analytics-for-astro/index.md",
  "src/content/docs/analytics-for-astro/getting-started.md",
  "src/content/docs/analytics-for-astro/configuration.md",
  "src/content/docs/analytics-for-astro/api-reference.md",
  "src/content/docs/analytics-for-astro/events.md",
  "src/content/docs/analytics-for-astro/starlight.md",
  "src/content/docs/analytics-for-astro/runtime-and-safety.md",
  "src/content/docs/analytics-for-astro/development.md",
  "src/content/docs/analytics-for-astro/versioning-and-releases.md",
  "src/content/docs/analytics-for-astro/release-notes.md",
];
const targetRoot = join(siteRoot, "src", "content", "docs", "analytics-for-astro");

if (!suppliedSourceRoot) {
  const manifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));
  if (manifest.repository !== "CodeWorksLabs/astro-analytics" ||
      manifest.ref !== sourceRef || manifest.commit !== expectedCommit ||
      manifest.version !== expectedVersion || !Array.isArray(manifest.files) ||
      manifest.files.length !== expectedPagePaths.length) {
    throw new Error("Analytics documentation source manifest identity is invalid.");
  }
  const expectedNames = expectedPagePaths.map((path) => path.slice(path.lastIndexOf("/") + 1)).sort();
  const actualEntries = readdirSync(targetRoot, { withFileTypes: true });
  const actualNames = actualEntries.map((entry) => entry.name).sort();
  if (actualEntries.some((entry) => !entry.isFile()) ||
      actualNames.length !== expectedNames.length ||
      actualNames.some((name, index) => name !== expectedNames[index])) {
    throw new Error("Analytics documentation generated page set is invalid.");
  }
  for (const [index, file] of manifest.files.entries()) {
    if (file?.path !== expectedPagePaths[index] ||
        typeof file?.sha256 !== "string" || !/^[a-f0-9]{64}$/u.test(file.sha256)) {
      throw new Error("Analytics documentation source manifest file entry is invalid.");
    }
    const content = readFileSync(join(siteRoot, file.path));
    const sha256 = createHash("sha256").update(content).digest("hex");
    if (sha256 !== file.sha256) throw new Error(`Analytics documentation drift: ${file.path}`);
  }
  console.log(`Verified ${manifest.files.length} Analytics for Astro pages from ${sourceRef}.`);
  process.exit(0);
}

const sourceRoot = suppliedSourceRoot;

const sourceObjectType = execFileSync(
  "git",
  ["-C", sourceRoot, "cat-file", "-t", sourceRef],
  { encoding: "utf8" },
).trim();

if (sourceObjectType !== "commit") {
  throw new Error(`Analytics source ${sourceRef} is not a commit.`);
}

const resolvedCommit = execFileSync(
  "git",
  ["-C", sourceRoot, "rev-parse", `${sourceRef}^{commit}`],
  { encoding: "utf8" },
).trim();

const packageVersion = JSON.parse(
  execFileSync("git", ["-C", sourceRoot, "show", `${sourceRef}:package.json`], {
    encoding: "utf8",
  }),
).version;

if (resolvedCommit !== expectedCommit) {
  throw new Error(
    `Analytics source ${sourceRef} resolved to ${resolvedCommit}, not ${expectedCommit}.`,
  );
}
if (packageVersion !== expectedVersion) {
  throw new Error(`Unexpected Analytics for Astro version ${packageVersion}.`);
}

const pages = [
  {
    source: "docs/README.md",
    target: "index.md",
    sourceTitle: "Analytics for Astro documentation",
    title: "Analytics for Astro",
    description: "Configure privacy-conscious, multi-provider analytics for Astro and Starlight.",
    banner: true,
  },
  {
    source: "docs/getting-started.md",
    target: "getting-started.md",
    title: "Getting started",
    description: "Requirements and setup for the commit-pinned Analytics for Astro candidate.",
  },
  {
    source: "docs/configuration.md",
    target: "configuration.md",
    title: "Configuration reference",
    description: "Strict provider, environment, pageview, and consent configuration.",
  },
  {
    source: "docs/api-reference.md",
    target: "api-reference.md",
    title: "API reference",
    description: "Public package entry points, exports, and browser helpers.",
  },
  {
    source: "docs/events.md",
    target: "events.md",
    title: "Event client",
    description: "Bounded multi-provider custom events and exact result handling.",
  },
  {
    source: "docs/starlight.md",
    target: "starlight.md",
    title: "Starlight integration",
    description: "Add Analytics for Astro through Starlight's plugin interface.",
  },
  {
    source: "docs/runtime-and-safety.md",
    target: "runtime-and-safety.md",
    sourceTitle: "Runtime behavior and safety",
    title: "Runtime and safety model",
    description: "Browser ownership, lifecycle, failure isolation, and privacy boundaries.",
  },
  {
    source: "docs/development.md",
    target: "development.md",
    title: "Development and verification",
    description: "Repository layout, local gates, package inspection, and consumer qualification.",
  },
  {
    source: "docs/versioning-and-releases.md",
    target: "versioning-and-releases.md",
    title: "Versioning and releases",
    description: "Semantic versioning, compatibility evidence, and release gates.",
  },
  {
    source: "CHANGELOG.md",
    target: "release-notes.md",
    sourceTitle: "Changelog",
    title: "Release notes",
    description: "Complete pre-release history for Analytics for Astro.",
  },
];

const rewriteLinks = (body) => body
  .replaceAll("(../CHANGELOG.md)", "(/analytics-for-astro/release-notes/)")
  .replace(/\((?:\.\/)?([a-z0-9-]+)\.md\)/giu, "(/analytics-for-astro/$1/)");

const renderedPages = [];

for (const page of pages) {
  const source = execFileSync(
    "git",
    ["-C", sourceRoot, "show", `${sourceRef}:${page.source}`],
    { encoding: "utf8", maxBuffer: 2_000_000 },
  ).replaceAll("\r\n", "\n");
  const heading = `# ${page.sourceTitle ?? page.title}`;
  if (!source.startsWith(`${heading}\n`)) {
    throw new Error(`${page.source} does not begin with the expected ${heading}.`);
  }

  let body = rewriteLinks(source.slice(heading.length + 1).trimStart());
  if (page.banner) {
    body = [
      `> **Pre-release documentation** · This public snapshot describes the commit-pinned`,
      `> candidate \`${packageVersion}\` at product commit \`${expectedCommit}\``,
      `> before any release tag. The package is not yet published to npm.`,
      "",
      body,
    ].join("\n");
  }

  const frontmatter = [
    "---",
    `title: ${page.title}`,
    `description: ${page.description}`,
    "editUrl: false",
    "---",
    "",
    "",
  ].join("\n");
  const target = join(targetRoot, page.target);
  renderedPages.push({
    content: `${frontmatter}${body.trimEnd()}\n`,
    target,
  });
}

for (const page of renderedPages) {
  mkdirSync(dirname(page.target), { recursive: true });
  writeFileSync(page.target, page.content, "utf8");
}

writeFileSync(sourceManifestPath, `${JSON.stringify({
  repository: "CodeWorksLabs/astro-analytics",
  ref: sourceRef,
  commit: expectedCommit,
  version: expectedVersion,
  files: renderedPages.map((page) => ({
    path: page.target.slice(siteRoot.length + 1).replaceAll("\\", "/"),
    sha256: createHash("sha256").update(page.content).digest("hex"),
  })),
}, null, 2)}\n`, "utf8");

console.log(`Synchronized ${pages.length} Analytics for Astro pages from ${sourceRef} (${resolvedCommit}).`);
