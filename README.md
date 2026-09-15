# docs.codeworkslabs.dev

The production CodeWorksLabs Astro Starlight documentation site.

Production URL: https://docs.codeworkslabs.dev/
Cloudflare Worker configuration name: `docs-codeworkslabs-dev`

## Local verification

```sh
npm ci
npm audit --omit=dev
npm run sync:astro-analytics
npm run test:brand-navigation
npm run check
npm run build
git diff --exit-code
npm run deploy:dry-run
```

The dry run does not publish. Deployment is deliberately separate and requires explicit authorization.

## Brand Navigation mirror

The nine Brand Navigation source-record pages and their colocated
`source/brand-navigation-docs-source.json` manifest are committed,
self-contained build inputs.
`npm run build` verifies their exact member set, hashes, repository/commit
identity, and embedded provenance entirely offline; it never refreshes them.

After Brand Navigation ownership admits an exact source commit, a maintainer may
prepare a coherent refresh with:

```sh
npm run sync:brand-navigation -- <exact-lowercase-40-character-commit>
```

The refresh accepts no moving ref or fallback. It produces a verified advisory
candidate without changing the tracked files. Applying its manifest and all
nine generated pages is a separate, explicitly authorized Git change; after
application, run `npm run verify:brand-navigation` and commit them together.
Refreshing does not authorize application or deployment.
It proves the exact GitHub commit object, rejects an identically named branch or
tag and any redirect/repository mismatch, and limits each source to 2 MiB and
the complete refresh to 8 MiB.
The command writes a complete, verified, transaction-unique advisory candidate
under the operating-system temporary directory and prints its path. It never
changes the tracked mirror or Git. Concurrent runs have disjoint output. If a
run is interrupted, delete only that run's isolated candidate or rerun it; the
tracked committed estate remains authoritative. Applying a candidate is a
separate, explicitly authorized Git change followed by offline verification.

## Rights

Site software and content carry no repository-wide license unless a file explicitly states one. Artwork is not open licensed by publication or repository access. The public ownership wording is `© 2026 CodeWorksLabs, a WebSynergetics property.`
