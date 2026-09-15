import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cp, copyFile, mkdir, mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

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

test("fixture contains exactly the ten generated files claimed by the manifest", async () => {
  const manifest = JSON.parse(await readFile(path.join(siteRoot, manifestName), "utf8"));
  const names = (await readdir(path.join(siteRoot, generatedDirectory))).sort();
  const claimed = manifest.files.map(({ path: filePath }) => path.basename(filePath)).sort();
  assert.equal(names.length, 10);
  assert.deepEqual(names, claimed);
});
