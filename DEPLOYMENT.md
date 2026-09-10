# Deployment

This repository builds a static Astro site for `https://docs.codeworkslabs.dev/`. Wrangler reads `wrangler.jsonc` and targets the Cloudflare Worker configuration named `docs-codeworkslabs-dev`.

## Release gate

1. Start from a clean, current `main` checkout.
2. Run `npm ci`.
3. Run `npm audit --omit=dev` and resolve any production vulnerability before release.
4. Run `npm run build`.
5. Run `npm run deploy:dry-run`.

No release-gate command above deploys.

## Production source

Cloudflare Workers Builds is connected directly to
`CodeWorksLabs/docs-codeworkslabs-dev`. A push to `main` runs `npm run build`
and then `npx wrangler deploy` from the repository root. Non-production branch
builds are disabled. This repository/branch is the production source of truth;
routine production releases must not be deployed from ignored parent folders or
uncommitted local source.

Manual `npm run deploy` remains a recovery operation requiring separate
authorization. A deployment does not authorize DNS, route, domain, or other
provider changes.
