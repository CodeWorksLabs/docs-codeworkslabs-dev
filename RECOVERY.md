# Recovery

## Source recovery

1. Clone `https://github.com/CodeWorksLabs/docs-codeworkslabs-dev.git`.
2. Check out the required commit on `main`.
3. Run `npm ci` with Node.js 22 or later.
4. Run the repository verification sequence in `README.md`.

Generated directories (`node_modules`, `dist`, `.astro`, and `.wrangler`) are intentionally untracked and must be regenerated.

## Runtime recovery

The built static assets target the Worker configuration `docs-codeworkslabs-dev`. Recreating or rolling back a Cloudflare deployment is a separate provider mutation and requires explicit authorization plus the intended version identity. Do not infer deployment authority from this document.

For deterministic recovery of synchronized Brand Navigation records, set `BRAND_NAVIGATION_DOCS_REF=ed1640b049763c37694f8c3bb5f9f69cbd21f658` before building. The ordinary unpinned build follows the configured source channel (`main`).
