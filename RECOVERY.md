# Recovery

## Source recovery

1. Clone `https://github.com/CodeWorksLabs/docs-codeworkslabs-dev.git`.
2. Check out the required commit on `main`.
3. Run `npm ci` with Node.js 22 or later.
4. Run the repository verification sequence in `README.md`.

Generated directories (`node_modules`, `dist`, `.astro`, and `.wrangler`) are intentionally untracked and must be regenerated.

## Runtime recovery

The built static assets target the Worker configuration `docs-codeworkslabs-dev`. Recreating or rolling back a Cloudflare deployment is a separate provider mutation and requires explicit authorization plus the intended version identity. Do not infer deployment authority from this document.

Synchronized Brand Navigation records default to exact commit
`ed1640b049763c37694f8c3bb5f9f69cbd21f658`. Set
`BRAND_NAVIGATION_DOCS_REF` only when intentionally recovering or verifying a
different source ref.

Analytics for Astro pages are imported locally from the exact private product
commit recorded in `analytics-docs-source.json`. CI has no product-repository
credential: it verifies the committed public documentation snapshot and its
per-file hashes, then requires a clean generated-doc diff.
