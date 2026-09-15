# Recovery

## Source recovery

1. Clone `https://github.com/CodeWorksLabs/docs-codeworkslabs-dev.git`.
2. Check out the required commit on `main`.
3. Run `npm ci` with Node.js 22 or later.
4. Run the repository verification sequence in `README.md`.

Generated directories (`node_modules`, `dist`, `.astro`, and `.wrangler`) are intentionally untracked and must be regenerated.

## Runtime recovery

The built static assets target the Worker configuration `docs-codeworkslabs-dev`. Recreating or rolling back a Cloudflare deployment is a separate provider mutation and requires explicit authorization plus the intended version identity. Do not infer deployment authority from this document.

Brand Navigation records and their colocated
`source/brand-navigation-docs-source.json` manifest are committed recovery
inputs. Ordinary verification and builds are read-only and offline;
run `npm run verify:brand-navigation` to prove the exact member set, generated
hashes, repository/commit identity, and embedded provenance. Do not run a
refresh merely to rebuild or recover this site.

If a Brand Navigation source update is separately admitted by its owner, run
`npm run sync:brand-navigation -- <exact-lowercase-40-character-commit>` with
network access. The command fetches and validates all nine source documents
before writing the complete generated set and manifest to an isolated advisory
candidate. It rejects branches, tags, short SHAs, defaults, and fallbacks.
Applying and committing that candidate is a separate authorized Git change and
must precede any separately authorized publication.
Commit-object resolution, same-named branch/tag exclusion, redirect identity,
and 2 MiB per-source/8 MiB aggregate limits all fail closed before admission.

The refresh never replaces the tracked estate. It writes one complete advisory
candidate to a transaction-unique operating-system temporary directory. An
interrupted or failed run cannot change the accepted tracked pages or manifest;
delete only the isolated candidate owned by that run, or rerun the command.
Concurrent candidates are independent. Applying candidate bytes is a separate
source-control operation under separate authority. If tracked files are ever
changed manually, `npm run verify:brand-navigation` and Git status expose drift;
recover them through the ordinary authorized Git workflow.

Analytics for Astro pages are imported locally from the exact public product
commit recorded in `analytics-docs-source.json`. CI has no product-repository
credential: it verifies the committed public documentation snapshot and its
per-file hashes, then requires a clean generated-doc diff.
