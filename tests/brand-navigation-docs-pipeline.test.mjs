import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cp, copyFile, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import test from "node:test";
import { manifestFilename, members } from "../scripts/brand-navigation-docs-lib.mjs";
import {
  maxAggregateBytes,
  maxMemberBytes,
  proveExactCommit,
  prepareBrandNavigationCandidate,
} from "../scripts/brand-navigation-refresh-lib.mjs";
import { admittedCommit, createMockFetch } from "./brand-navigation-refresh-test-support.mjs";

const siteRoot = process.cwd();
const verifier = path.join(siteRoot, "scripts/verify-brand-navigation-docs.mjs");
const denyNetwork = path.join(siteRoot, "tests/deny-network.cjs");
const refreshChild = path.join(siteRoot, "tests/brand-navigation-refresh-child.mjs");
const sourceDirectory = path.join(siteRoot, "src/content/docs/brand-navigation/source");

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function estateSnapshot(root = siteRoot) {
  const paths = [manifestFilename, ...members.map(({ generatedPath }) => generatedPath)];
  return Object.fromEntries(await Promise.all(paths.map(async (relativePath) => [
    relativePath,
    hash(await readFile(path.join(root, relativePath))),
  ])));
}

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "brand-navigation-docs-test-"));
  await cp(sourceDirectory, path.join(root, "src/content/docs/brand-navigation/source"), { recursive: true });
  await copyFile(path.join(siteRoot, manifestFilename), path.join(root, manifestFilename));
  return root;
}

function runVerifier(root) {
  return spawnSync(process.execPath, [verifier, "--root", root], {
    cwd: siteRoot,
    encoding: "utf8",
  });
}

async function expectRejected(mutator, messagePattern) {
  const root = await fixture();
  try {
    await mutator(root);
    const result = runVerifier(root);
    assert.notEqual(result.status, 0, `verifier unexpectedly succeeded:\n${result.stdout}`);
    assert.match(`${result.stdout}\n${result.stderr}`, messagePattern);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("ordinary build is offline and leaves Brand Navigation committed inputs unchanged", { timeout: 120_000 }, async () => {
  const before = await estateSnapshot();
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const existingNodeOptions = process.env.NODE_OPTIONS ? `${process.env.NODE_OPTIONS} ` : "";
  const result = spawnSync(npmCommand, ["run", "build"], {
    cwd: siteRoot,
    encoding: "utf8",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      NODE_OPTIONS: `${existingNodeOptions}--require=${denyNetwork}`,
    },
    timeout: 120_000,
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.deepEqual(await estateSnapshot(), before);
});

test("offline verifier rejects tampered, missing, extra, and mismatched members", async (t) => {
  await t.test("tampered generated page", async () => {
    await expectRejected(async (root) => {
      const target = path.join(root, members[0].generatedPath);
      await writeFile(target, `${await readFile(target, "utf8")}tampered\n`, "utf8");
    }, /generated hash mismatch/u);
  });

  await t.test("missing generated page", async () => {
    await expectRejected(
      (root) => rm(path.join(root, members[0].generatedPath)),
      /Unable to read/u,
    );
  });

  await t.test("extra generated page", async () => {
    await expectRejected(
      (root) => writeFile(path.join(root, "src/content/docs/brand-navigation/source/extra.md"), "extra\n"),
      /member set/u,
    );
  });

  await t.test("manifest identity mismatch", async () => {
    await expectRejected(async (root) => {
      const target = path.join(root, manifestFilename);
      const manifest = JSON.parse(await readFile(target, "utf8"));
      manifest.repository = "example/incorrect";
      await writeFile(target, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    }, /manifest identity/u);
  });

  await t.test("provenance mismatch even with a matching generated hash", async () => {
    await expectRejected(async (root) => {
      const generated = path.join(root, members[0].generatedPath);
      const content = (await readFile(generated, "utf8")).replace(
        "from editable source channel",
        "from source channel",
      );
      await writeFile(generated, content, "utf8");
      const manifestPath = path.join(root, manifestFilename);
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      manifest.members[0].generatedSha256 = hash(content);
      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    }, /provenance wrapper mismatch/u);
  });

  await t.test("malformed UTF-8 even with a matching raw-byte hash", async () => {
    await expectRejected(async (root) => {
      const generated = path.join(root, members[0].generatedPath);
      const bytes = Buffer.concat([await readFile(generated), Buffer.from([0xff])]);
      await writeFile(generated, bytes);
      const manifestPath = path.join(root, manifestFilename);
      const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
      manifest.members[0].generatedSha256 = hash(bytes);
      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    }, /Unable to read/u);
  });
});

test("refresh proves exact repository commit identity and rejects moving or mismatched identity", async (t) => {
  await proveExactCommit(admittedCommit, createMockFetch());
  const rejected = [
    ["SHA-shaped branch", { refNamespace: "heads" }],
    ["SHA-shaped tag", { refNamespace: "tags" }],
    ["mismatched commit", { resolvedSha: "1".repeat(40) }],
    ["commit object repository mismatch", { commitObjectUrl: "https://api.github.com/repos/example/wrong/git/commits/x" }],
    ["redirect", { responseUrl: "https://api.github.com/repositories/1/git/commits/x", redirected: true }],
    ["403", { apiStatus: 403 }],
    ["429", { apiStatus: 429 }],
    ["500", { apiStatus: 500 }],
    ["malformed response", { malformedJson: true }],
  ];
  for (const [label, options] of rejected) {
    await t.test(label, async () => {
      const root = await fixture();
      try {
        const before = await estateSnapshot(root);
        await assert.rejects(prepareBrandNavigationCandidate(admittedCommit, {
          candidateParent: root,
          fetchImpl: createMockFetch(options),
        }));
        assert.deepEqual(await estateSnapshot(root), before);
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    });
  }
});

test("refresh enforces per-member and aggregate byte limits", async (t) => {
  const oversized = Buffer.alloc(maxMemberBytes + 1, 97);
  oversized.write("# Oversized\n\n", 0, "utf8");
  const cases = [
    ["declared oversize", createMockFetch({ declaredLength: (_member, index) => index === 0 ? maxMemberBytes + 1 : null })],
    ["streamed oversize", createMockFetch({ memberBytes: (_member, index, original) => index === 0 ? oversized : original, chunkSize: 64 * 1024 })],
    ["aggregate oversize", createMockFetch({ memberBytes: (member) => {
      const prefix = Buffer.from(`# ${member.title}\n\n`, "utf8");
      return Buffer.concat([prefix, Buffer.alloc(Math.ceil(maxAggregateBytes / members.length), 97)]);
    }, chunkSize: 64 * 1024 })],
  ];
  for (const [label, mockFetch] of cases) {
    await t.test(label, async () => {
      const root = await fixture();
      try {
        const before = await estateSnapshot(root);
        await assert.rejects(prepareBrandNavigationCandidate(admittedCommit, {
          candidateParent: root,
          fetchImpl: mockFetch,
        }), /size|length/u);
        assert.deepEqual(await estateSnapshot(root), before);
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    });
  }

  await t.test("exact per-member boundary succeeds", async () => {
    const root = await fixture();
    try {
      const mockFetch = createMockFetch({ memberBytes: (member, index, original) => {
        if (index !== 0) return original;
        const prefix = Buffer.from(`# ${member.title}\n\n`, "utf8");
        return Buffer.concat([prefix, Buffer.alloc(maxMemberBytes - prefix.length, 97)]);
      }, chunkSize: 64 * 1024 });
      const { candidateRoot } = await prepareBrandNavigationCandidate(admittedCommit, {
        candidateParent: root,
        fetchImpl: mockFetch,
      });
      assert.equal(runVerifier(candidateRoot).status, 0);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});

function runRefreshChild(candidateParent, commit, crashAt) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [refreshChild], {
      cwd: siteRoot,
      env: {
        ...process.env,
        BN_TEST_CANDIDATE_PARENT: candidateParent,
        BN_TEST_COMMIT: commit,
        ...(crashAt ? { BN_TEST_CRASH_AT: crashAt } : {}),
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (status) => resolve({ status, stdout, stderr }));
  });
}

test("simultaneous refresh processes create disjoint verified advisory candidates", { timeout: 120_000 }, async () => {
  const candidateParent = await mkdtemp(path.join(os.tmpdir(), "brand-navigation-concurrent-test-"));
  const secondCommit = "a".repeat(40);
  const before = await estateSnapshot();
  try {
    const [first, second] = await Promise.all([
      runRefreshChild(candidateParent, admittedCommit),
      runRefreshChild(candidateParent, secondCommit),
    ]);
    assert.equal(first.status, 0, `${first.stdout}\n${first.stderr}`);
    assert.equal(second.status, 0, `${second.stdout}\n${second.stderr}`);
    const roots = [first.stdout.trim(), second.stdout.trim()];
    assert.notEqual(roots[0], roots[1]);
    for (const [index, root] of roots.entries()) {
      assert.equal(runVerifier(root).status, 0);
      const manifest = JSON.parse(await readFile(path.join(root, manifestFilename), "utf8"));
      assert.equal(manifest.sourceCommit, index === 0 ? admittedCommit : secondCommit);
    }
    assert.deepEqual(await estateSnapshot(), before);
    assert.equal((await readdir(candidateParent)).length, 2);
  } finally {
    await rm(candidateParent, { recursive: true, force: true });
  }
});

test("every fetch, write, and verification failure leaves tracked estate and other candidates untouched", { timeout: 120_000 }, async () => {
  const points = ["after-commit-proof", "after-candidate-create", "before-manifest-write", "after-manifest-write", "before-candidate-verify", "after-candidate-verify"];
  for (const index of members.keys()) points.push(`before-fetch-${index}`, `after-fetch-${index}`, `before-write-${index}`, `after-write-${index}`);
  const before = await estateSnapshot();
  for (const point of points) {
    const candidateParent = await mkdtemp(path.join(os.tmpdir(), "brand-navigation-failure-test-"));
    const sentinel = path.join(candidateParent, "other-candidate");
    await mkdir(sentinel);
    await writeFile(path.join(sentinel, "keep.txt"), "unrelated candidate\n");
    try {
      await assert.rejects(prepareBrandNavigationCandidate(admittedCommit, {
        candidateParent,
        faultAt: point,
        fetchImpl: createMockFetch(),
      }), /Injected candidate preparation failure/u);
      assert.deepEqual(await estateSnapshot(), before, point);
      assert.deepEqual(await readdir(candidateParent), ["other-candidate"], point);
      assert.equal(await readFile(path.join(sentinel, "keep.txt"), "utf8"), "unrelated candidate\n");
    } finally {
      await rm(candidateParent, { recursive: true, force: true });
    }
  }
});

test("abrupt interruption can strand only its isolated candidate", { timeout: 120_000 }, async () => {
  const candidateParent = await mkdtemp(path.join(os.tmpdir(), "brand-navigation-interruption-test-"));
  const before = await estateSnapshot();
  try {
    const interrupted = await runRefreshChild(candidateParent, admittedCommit, "after-write-4");
    assert.equal(interrupted.status, 86);
    const stranded = await readdir(candidateParent);
    assert.equal(stranded.length, 1);
    assert.deepEqual(await estateSnapshot(), before);

    const completed = await runRefreshChild(candidateParent, "a".repeat(40));
    assert.equal(completed.status, 0, `${completed.stdout}\n${completed.stderr}`);
    const completedRoot = completed.stdout.trim();
    assert.equal(runVerifier(completedRoot).status, 0);
    assert.equal((await readdir(candidateParent)).length, 2);
    assert.deepEqual(await estateSnapshot(), before);
  } finally {
    await rm(candidateParent, { recursive: true, force: true });
  }
});
