import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cp, copyFile, mkdir, mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { rewriteLinks } from "../scripts/analytics-docs-links.mjs";

const siteRoot = process.cwd();
const verifier = path.join(siteRoot, "scripts/sync-analytics-for-astro-docs.mjs");
const manifestName = "analytics-docs-source.json";
const generatedDirectory = "src/content/docs/analytics-for-astro";

const hash = (value) => createHash("sha256").update(value).digest("hex");

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "analytics-docs-test-"));
  await mkdir(path.join(root, "src/content/docs"), { recursive: true });
  await cp(path.join(siteRoot, generatedDirectory), path.join(root, generatedDirectory), { recursive: true });
  await copyFile(path.join(siteRoot, manifestName), path.join(root, manifestName));
  return root;
}

function verify(root) {
  return spawnSync(process.execPath, [verifier, "--root", root], {
    cwd: siteRoot,
    encoding: "utf8",
  });
}

async function expectRejected(mutator, pattern) {
  const root = await fixture();
  try {
    await mutator(root);
    const result = verify(root);
    assert.notEqual(result.status, 0, `verifier unexpectedly succeeded:\n${result.stdout}`);
    assert.match(`${result.stdout}\n${result.stderr}`, pattern);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("ordinary Analytics documentation verification is read-only", async () => {
  const manifest = JSON.parse(await readFile(path.join(siteRoot, manifestName), "utf8"));
  const paths = [manifestName, ...manifest.files.map(({ path: filePath }) => filePath)];
  const before = Object.fromEntries(await Promise.all(paths.map(async (filePath) => [
    filePath,
    hash(await readFile(path.join(siteRoot, filePath))),
  ])));
  const result = verify(siteRoot);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const after = Object.fromEntries(await Promise.all(paths.map(async (filePath) => [
    filePath,
    hash(await readFile(path.join(siteRoot, filePath))),
  ])));
  assert.deepEqual(after, before);
});

test("verifier rejects extra, missing, tampered, reordered, mismatched, and malformed members", async (t) => {
  await t.test("extra generated page", () => expectRejected(
    (root) => writeFile(path.join(root, generatedDirectory, "unmanifested.md"), "# Extra\n"),
    /generated page set is invalid/,
  ));
  await t.test("missing generated page", () => expectRejected(
    (root) => unlink(path.join(root, generatedDirectory, "events.md")),
    /generated page set is invalid/,
  ));
  await t.test("tampered generated page", () => expectRejected(
    (root) => writeFile(path.join(root, generatedDirectory, "events.md"), "# Tampered\n"),
    /documentation drift/,
  ));
  await t.test("reordered manifest members", () => expectRejected(async (root) => {
    const manifestPath = path.join(root, manifestName);
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    [manifest.files[0], manifest.files[1]] = [manifest.files[1], manifest.files[0]];
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }, /manifest file entry is invalid/));
  await t.test("path-mismatched manifest member", () => expectRejected(async (root) => {
    const manifestPath = path.join(root, manifestName);
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    manifest.files[0].path = manifest.files[1].path;
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }, /manifest file entry is invalid/));
  await t.test("malformed manifest", () => expectRejected(
    (root) => writeFile(path.join(root, manifestName), "{}\n"),
    /manifest identity is invalid/,
  ));
});

test("fixture contains exactly the eleven generated files claimed by the manifest", async () => {
  const manifest = JSON.parse(await readFile(path.join(siteRoot, manifestName), "utf8"));
  const names = (await readdir(path.join(siteRoot, generatedDirectory))).sort();
  const claimed = manifest.files.map(({ path: filePath }) => path.basename(filePath)).sort();
  assert.equal(names.length, 11);
  assert.deepEqual(names, claimed);
});

test("every generated page declares its canonical upstream Edit page URL", async () => {
  for (const [filename, sourcePath] of [
    ["index.md", "docs/README.md"],
    ["getting-started.md", "docs/getting-started.md"],
    ["configuration.md", "docs/configuration.md"],
    ["api-reference.md", "docs/api-reference.md"],
    ["events.md", "docs/events.md"],
    ["verification-and-troubleshooting.md", "docs/verification-and-troubleshooting.md"],
    ["starlight.md", "docs/starlight.md"],
    ["runtime-and-safety.md", "docs/runtime-and-safety.md"],
    ["development.md", "docs/development.md"],
    ["versioning-and-releases.md", "docs/versioning-and-releases.md"],
    ["release-notes.md", "CHANGELOG.md"],
  ]) {
    const page = await readFile(path.join(siteRoot, generatedDirectory, filename), "utf8");
    const header = /^---\n([\s\S]*?)\n---\n/u.exec(page);
    assert.ok(header, filename);
    assert.deepEqual(header[1].split("\n").filter((line) => /^\s*editUrl\s*:/u.test(line)), [
      `editUrl: https://github.com/CodeWorksLabs/astro-analytics/edit/main/${sourcePath}`,
    ], filename);
  }
});

test("verifier rejects wrong edit destinations even with matching manifest hashes", async (t) => {
  for (const [name, replacement] of [
    ["disabled editing", "editUrl: false"],
    ["wrong repository", "editUrl: https://github.com/CodeWorksLabs/brand-navigation/edit/main/docs/README.md"],
    ["wrong source filename", "editUrl: https://github.com/CodeWorksLabs/astro-analytics/edit/main/docs/index.md"],
    ["pinned non-editable source view", "editUrl: https://github.com/CodeWorksLabs/astro-analytics/blob/main/docs/README.md"],
    ["missing edit field", ""],
    ["duplicate edit field", "editUrl: https://github.com/CodeWorksLabs/astro-analytics/edit/main/docs/README.md\neditUrl: false"],
  ]) {
    await t.test(name, () => expectRejected(async (root) => {
      const pagePath = path.join(root, generatedDirectory, "index.md");
      const page = (await readFile(pagePath, "utf8")).replace(/^editUrl: .*$/mu, replacement);
      await writeFile(pagePath, page);
      const manifestPath = path.join(root, manifestName);
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      manifest.files[0].sha256 = hash(page);
      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    }, /documentation edit URL is invalid/));
  }
});

test("published links retain task-guide anchors and source-relative routes", () => {
  assert.equal(rewriteLinks("[Install](getting-started.md#1-install-the-package)"), "[Install](/analytics-for-astro/getting-started/#1-install-the-package)");
  assert.equal(rewriteLinks("[Versions](docs/versioning-and-releases.md)"), "[Versions](/analytics-for-astro/versioning-and-releases/)");
  assert.equal(rewriteLinks("[Changes](../CHANGELOG.md#earlier-alpha-development)"), "[Changes](/analytics-for-astro/release-notes/#earlier-alpha-development)");
  assert.equal(rewriteLinks("[External](https://example.com/guide.md#intro)"), "[External](https://example.com/guide.md#intro)");
});
