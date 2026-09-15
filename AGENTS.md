# Repository instructions

This repository owns the source for `docs.codeworkslabs.dev` and nothing outside this repository root.

- Use the `main` branch.
- Keep the source self-contained; do not import files from parent or sibling site roots.
- Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run` before proposing release.
- Deployment, DNS, Worker, route, and provider changes require separate explicit authorization.
- Never store passwords, API keys, tokens, credentials, private account values, or production secrets.
- Preserve the exact public ownership wording: `© 2026 CodeWorksLabs, a WebSynergetics property.`
- Public repository access does not grant rights to artwork unless a file explicitly says otherwise.

Brand Navigation source records are committed build inputs. Ordinary local,
CI, and Cloudflare builds run `npm run verify:brand-navigation`, which is
read-only and offline. They must never fetch or rewrite Brand Navigation
content.

`npm run sync:brand-navigation -- <exact-40-character-commit>` is an explicit
maintainer refresh operation. It accepts no branch, tag, short SHA, default, or
fallback. Coordinate the source commit and provenance constraints with Brand
Navigation ownership before refreshing, then review and commit the complete
generated-page set together with the colocated
`src/content/docs/brand-navigation/source/brand-navigation-docs-source.json`.
The refresh command writes only a transaction-unique advisory candidate under
the operating-system temporary directory. It never changes the tracked mirror
or Git. Applying a candidate is a separate, explicitly authorized Git change.
