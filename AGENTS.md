# Repository instructions

This repository owns the source for `docs.codeworkslabs.dev` and nothing outside this repository root.

- Use the `main` branch.
- Keep the source self-contained; do not import files from parent or sibling site roots.
- Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run` before proposing release.
- Deployment, DNS, Worker, route, and provider changes require separate explicit authorization.
- Never store passwords, API keys, tokens, credentials, private account values, or production secrets.
- Preserve the exact public ownership wording: `© 2026 CodeWorksLabs, a WebSynergetics property.`
- Public repository access does not grant rights to artwork unless a file explicitly says otherwise.

Brand Navigation source records are synchronized during build. Deterministic verification pins `BRAND_NAVIGATION_DOCS_REF=ed1640b049763c37694f8c3bb5f9f69cbd21f658`; ordinary builds intentionally default to `main`.
