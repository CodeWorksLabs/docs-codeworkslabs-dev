import { members } from "../scripts/brand-navigation-docs-lib.mjs";

export const admittedCommit = "ed1640b049763c37694f8c3bb5f9f69cbd21f658";

function byteStream(bytes, chunkSize = bytes.length || 1) {
  let offset = 0;
  return {
    getReader() {
      return {
        async read() {
          if (offset >= bytes.length) return { done: true, value: undefined };
          const value = bytes.subarray(offset, Math.min(bytes.length, offset + chunkSize));
          offset += value.length;
          return { done: false, value };
        },
        async cancel() {},
      };
    },
  };
}

function response(url, { status = 200, json, bytes, responseUrl = url, redirected = false, declaredLength, chunkSize } = {}) {
  const bodyBytes = bytes ?? Buffer.from(JSON.stringify(json ?? {}));
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Mock failure",
    url: responseUrl,
    redirected,
    headers: { get: (name) => name.toLowerCase() === "content-length" ? (declaredLength ?? null) : null },
    body: byteStream(bodyBytes, chunkSize),
    async json() {
      if (json instanceof Error) throw json;
      return json ?? JSON.parse(bodyBytes.toString("utf8"));
    },
  };
}

export function createMockFetch(options = {}) {
  const commitIdentity = options.commit ?? admittedCommit;
  return async (url) => {
    const apiRoot = "https://api.github.com/repos/CodeWorksLabs/brand-navigation";
    if (url === `${apiRoot}/git/commits/${commitIdentity}`) {
      return response(url, {
        status: options.apiStatus ?? 200,
        responseUrl: options.responseUrl ?? url,
        redirected: options.redirected ?? false,
        json: options.malformedJson ? new Error("malformed JSON") : {
          sha: options.resolvedSha ?? commitIdentity,
          url: options.commitObjectUrl ?? url,
          tree: { sha: "1".repeat(40) },
        },
      });
    }
    for (const namespace of ["heads", "tags"]) {
      if (url === `${apiRoot}/git/matching-refs/${namespace}/${commitIdentity}`) {
        const exact = options.refNamespace === namespace
          ? [{ ref: `refs/${namespace}/${commitIdentity}` }]
          : [];
        return response(url, { status: options.refStatus ?? 200, json: exact });
      }
    }
    const memberIndex = members.findIndex(({ sourcePath }) => url.endsWith(`/${sourcePath}`));
    if (memberIndex >= 0) {
      const member = members[memberIndex];
      let bytes = Buffer.from(`# ${member.title}\n\nSynthetic ${member.sourcePath}.\n`, "utf8");
      if (options.memberBytes) bytes = options.memberBytes(member, memberIndex, bytes);
      return response(url, {
        status: options.sourceStatus ?? 200,
        responseUrl: options.sourceResponseUrl ? options.sourceResponseUrl(url) : url,
        redirected: options.sourceRedirected ?? false,
        bytes,
        declaredLength: options.declaredLength?.(member, memberIndex, bytes),
        chunkSize: options.chunkSize,
      });
    }
    throw new Error(`Unexpected mock URL: ${url}`);
  };
}
