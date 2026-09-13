import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const sourceRef = "v0.1.0-alpha.10";
const expectedCommit = "06d8e3f4185a2509f1cdf155ae2d6b91b2ed245d";
const expectedVersion = "0.1.0-alpha.10";
const sourceRepository = "https://github.com/CodeWorksLabs/astro-analytics.git";
const qualificationState = "live-qualified";
const suppliedSourceRoot = process.argv[2];
const temporaryRoot = suppliedSourceRoot
  ? undefined
  : mkdtempSync(join(tmpdir(), "codeworkslabs-astro-analytics-docs-"));
const sourceRoot = suppliedSourceRoot ?? join(temporaryRoot, "source");

if (temporaryRoot) {
  process.on("exit", () => rmSync(temporaryRoot, { force: true, recursive: true }));
}

if (!suppliedSourceRoot) {
  execFileSync(
    "git",
    ["clone", "--quiet", "--no-checkout", sourceRepository, sourceRoot],
    { stdio: "inherit" },
  );
}

const sourceObjectType = execFileSync(
  "git",
  ["-C", sourceRoot, "cat-file", "-t", sourceRef],
  { encoding: "utf8" },
).trim();

if (sourceObjectType !== "tag") {
  throw new Error(`Analytics source ${sourceRef} is not an annotated tag.`);
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
    description: "Requirements and setup for the source-tagged Analytics for Astro candidate.",
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

const targetRoot = join(
  process.cwd(),
  "src",
  "content",
  "docs",
  "analytics-for-astro",
);

const rewriteLinks = (body) => body
  .replaceAll("(../CHANGELOG.md)", "(/analytics-for-astro/release-notes/)")
  .replace(/\((?:\.\/)?([a-z0-9-]+)\.md\)/giu, "(/analytics-for-astro/$1/)");

const replaceRequired = (body, before, after, source) => {
  if (!body.includes(before)) {
    throw new Error(`${source} is missing a required live-qualification status passage.`);
  }
  return body.replace(before, after);
};

const applyLiveQualification = (body, source) => {
  if (source === "docs/events.md") {
    return replaceRequired(
      body,
      "Milestone 2 connects the client to Fathom's `trackEvent()`, Plausible's\n`plausible()`, Google Analytics 4's `gtag()`, and Matomo's `_paq` APIs. Calls made before an\nintegration's script load is verified return `adapter-not-loaded`; they are not\nqueued or retried. Unrelated preexisting vendor globals are not treated as\npackage readiness.",
      "Milestone 2 connects the client to Fathom's `trackEvent()`, Plausible's\n`plausible()`, Google Analytics 4's `gtag()`, Matomo's `_paq`, and Umami's\n`track()` APIs. Calls made before an integration's script load is verified return\n`adapter-not-loaded`; they are not queued or retried. Unrelated preexisting\nvendor globals are not treated as package readiness.",
      source,
    );
  }
  if (source === "docs/README.md") {
    return replaceRequired(
      body,
      "Alpha.10 corrects that behavior and must repeat the applicable deployment and\nlive gates before it replaces alpha.9. Its R4 artifact passed clean Astro and\nStarlight consumer qualification and localized documentation closure review on\nSeptember 13, 2026. R5 and later documentation-only archives inherit only the\nunchanged-runtime relevance of that evidence; the exact source-tag archive must\nstill be installed by the repository-driven sandboxes.",
      "Alpha.10 corrects that behavior and replaces alpha.9. Its exact public\nsource-tag archive completed repository-driven deployment to the stock Astro and\nStarlight sandboxes plus browser-runtime and provider-side live qualification on\nSeptember 13, 2026. The live harnesses at\n[astro.sandbox.codeworkslabs.dev](https://astro.sandbox.codeworkslabs.dev/analytics/)\nand [stockstarlight.sandbox.codeworkslabs.dev](https://stockstarlight.sandbox.codeworkslabs.dev/analytics/)\neach recorded its landing pageview, explicit journey event, and destination\npageview in a distinct self-hosted Umami website record.",
      source,
    );
  }
  if (source === "docs/versioning-and-releases.md") {
    body = replaceRequired(
      body,
      "- `.10` identifies the correction for consecutive post-readiness ClientRouter\n  completions at the same URL. Its R4 artifact passed clean consumer\n  qualification and localized documentation closure review. Later\n  documentation-only archives retain only the unchanged-runtime relevance of\n  that evidence; exact source-tag archive installation, repository-driven\n  sandbox deployment, and provider-side live qualification remain pending.",
      "- `.10` identifies the source-tagged correction for consecutive\n  post-readiness ClientRouter completions at the same URL. Its exact public tag\n  archive completed repository-driven stock Astro and Starlight deployment,\n  browser-runtime verification, and provider-side live qualification on\n  September 13, 2026.",
      source,
    );
    return replaceRequired(
      body,
      "qualification on September 13, 2026. Umami alpha.9 subsequently completed the\nsame gates, but a later full committed review found its same-URL ClientRouter\ndeduplication defect. Alpha.10 is the working correction and must repeat the\napplicable gates. The line may advance to an RC only after those gates close and\nthe feature set is believed complete.",
      "qualification on September 13, 2026. Umami alpha.10 completed the applicable\nindependent review, exact source-tag package-consumer, repository-driven\nsandbox, browser-runtime, and provider-side live gates on September 13, 2026.\nAll five accepted first-stable provider adapters have now closed those gates;\nRC readiness is the next product decision.",
      source,
    );
  }
  if (source === "CHANGELOG.md") {
    return replaceRequired(
      body,
      "- Attribute a same-URL completion to the immediately preceding completed URL,\n  retaining an exact virtual route edge rather than an older referrer.",
      "- Attribute a same-URL completion to the immediately preceding completed URL,\n  retaining an exact virtual route edge rather than an older referrer.\n- Complete independent review, exact source-tag package-consumer qualification,\n  repository-driven stock Astro and Starlight deployment, browser-runtime\n  verification, and provider-side live qualification against distinct\n  self-hosted Umami website records for `astro.sandbox.codeworkslabs.dev` and\n  `stockstarlight.sandbox.codeworkslabs.dev`.",
      source,
    );
  }
  return body;
};

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
  if (qualificationState === "live-qualified") {
    body = applyLiveQualification(body, page.source);
  }
  if (page.banner) {
    body = [
      `> **Pre-release documentation** · This public snapshot describes public-source`,
      `> candidate \`${packageVersion}\` at product commit \`${expectedCommit}\``,
      `> and annotated tag \`${sourceRef}\`. The package is not yet published to npm.`,
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

console.log(`Synchronized ${pages.length} Analytics for Astro pages from ${sourceRef} (${resolvedCommit}).`);
