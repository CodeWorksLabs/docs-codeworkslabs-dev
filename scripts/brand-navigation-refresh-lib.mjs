import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  createManifest,
  manifestFilename,
  members,
  renderPage,
  repository,
  sha256,
  verifySnapshot,
} from "./brand-navigation-docs-lib.mjs";

export const maxMemberBytes = 2 * 1024 * 1024;
export const maxAggregateBytes = 8 * 1024 * 1024;

function fault(options, point) {
  if (options.crashAt === point) process.exit(86);
  if (options.faultAt === point) throw new Error(`Injected candidate preparation failure: ${point}`);
}

async function validateResponse(response, requestedUrl, label) {
  if (response.url !== requestedUrl || response.redirected === true) {
    throw new Error(`${label} repository identity or redirect mismatch.`);
  }
  if (!response.ok) throw new Error(`${label}: ${response.status} ${response.statusText}`);
}

async function getJson(fetchImpl, url, label) {
  const response = await fetchImpl(url, {
    redirect: "error",
    headers: {
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
      "user-agent": "CodeWorksLabs-docs-maintainer-refresh",
    },
  });
  await validateResponse(response, url, label);
  try {
    return await response.json();
  } catch (error) {
    throw new Error(`${label} returned malformed JSON: ${error.message}`);
  }
}

export async function proveExactCommit(sourceCommit, fetchImpl = fetch) {
  if (!/^[0-9a-f]{40}$/u.test(sourceCommit)) throw new Error(`Invalid exact source commit: ${sourceCommit}`);
  const apiRoot = `https://api.github.com/repos/${repository}`;
  const commitUrl = `${apiRoot}/git/commits/${sourceCommit}`;
  const commit = await getJson(fetchImpl, commitUrl, "Unable to prove Brand Navigation commit object");
  if (commit?.sha !== sourceCommit || commit?.url !== commitUrl || typeof commit?.tree?.sha !== "string") {
    throw new Error("GitHub commit-object identity does not match the requested Brand Navigation commit.");
  }
  for (const namespace of ["heads", "tags"]) {
    const refUrl = `${apiRoot}/git/matching-refs/${namespace}/${sourceCommit}`;
    const refs = await getJson(fetchImpl, refUrl, `Unable to exclude SHA-shaped ${namespace}`);
    if (!Array.isArray(refs) || refs.some((entry) => entry?.ref === `refs/${namespace}/${sourceCommit}`)) {
      throw new Error(`Requested commit is also a SHA-shaped moving ${namespace} ref.`);
    }
  }
}

async function readBoundedSource(response, member, aggregate) {
  const lengthValue = response.headers?.get?.("content-length");
  if (lengthValue !== null && lengthValue !== undefined) {
    const declared = Number(lengthValue);
    if (!Number.isSafeInteger(declared) || declared < 0 || declared > maxMemberBytes) {
      throw new Error(`${member.sourcePath} has an invalid or oversized declared length.`);
    }
  }
  if (!response.body?.getReader) throw new Error(`${member.sourcePath} has no readable response body.`);
  const chunks = [];
  let memberBytes = 0;
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    memberBytes += value.byteLength;
    aggregate.bytes += value.byteLength;
    if (memberBytes > maxMemberBytes || aggregate.bytes > maxAggregateBytes) {
      await reader.cancel().catch(() => {});
      throw new Error(`${member.sourcePath} exceeds Brand Navigation refresh size limits.`);
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks, memberBytes);
}

async function fetchMember(member, index, sourceCommit, aggregate, fetchImpl, options) {
  fault(options, `before-fetch-${index}`);
  const rawUrl = `https://raw.githubusercontent.com/${repository}/${sourceCommit}/${member.sourcePath}`;
  const response = await fetchImpl(rawUrl, {
    redirect: "error",
    headers: { "user-agent": "CodeWorksLabs-docs-maintainer-refresh" },
  });
  await validateResponse(response, rawUrl, `Unable to pull ${member.sourcePath} at ${sourceCommit}`);
  const sourceBytes = await readBoundedSource(response, member, aggregate);
  const rawSource = new TextDecoder("utf-8", { fatal: true }).decode(sourceBytes);
  if (rawSource.length === 0 || rawSource.includes("\u0000")) throw new Error(`${member.sourcePath} is empty or malformed.`);
  const content = renderPage(rawSource, member, sourceCommit);
  fault(options, `after-fetch-${index}`);
  return { member, content, sourceSha256: sha256(sourceBytes), generatedSha256: sha256(Buffer.from(content, "utf8")) };
}

export async function prepareBrandNavigationCandidate(sourceCommit, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const candidateParent = path.resolve(options.candidateParent ?? os.tmpdir());
  await proveExactCommit(sourceCommit, fetchImpl);
  fault(options, "after-commit-proof");

  const aggregate = { bytes: 0 };
  const renderedMembers = [];
  for (const [index, member] of members.entries()) {
    renderedMembers.push(await fetchMember(member, index, sourceCommit, aggregate, fetchImpl, options));
  }
  const manifest = createManifest(sourceCommit, renderedMembers);
  const candidateRoot = await mkdtemp(path.join(candidateParent, `codeworkslabs-brand-navigation-${sourceCommit.slice(0, 12)}-`));

  try {
    fault(options, "after-candidate-create");
    for (const [index, rendered] of renderedMembers.entries()) {
      fault(options, `before-write-${index}`);
      const target = path.join(candidateRoot, rendered.member.generatedPath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, rendered.content, "utf8");
      fault(options, `after-write-${index}`);
    }
    fault(options, "before-manifest-write");
    const manifestPath = path.join(candidateRoot, manifestFilename);
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    fault(options, "after-manifest-write");
    fault(options, "before-candidate-verify");
    await verifySnapshot(candidateRoot);
    fault(options, "after-candidate-verify");
    return { candidateRoot, manifest };
  } catch (error) {
    await rm(candidateRoot, { recursive: true, force: true });
    throw error;
  }
}
