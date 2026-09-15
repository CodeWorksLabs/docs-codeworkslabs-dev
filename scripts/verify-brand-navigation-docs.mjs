import path from "node:path";
import { verifySnapshot } from "./brand-navigation-docs-lib.mjs";

const args = process.argv.slice(2);
let siteRoot = process.cwd();
if (args.length > 0) {
  if (args.length !== 2 || args[0] !== "--root") {
    throw new Error("Usage: node scripts/verify-brand-navigation-docs.mjs [--root <site-root>]");
  }
  siteRoot = path.resolve(args[1]);
}

const manifest = await verifySnapshot(siteRoot);
console.log(`Verified ${manifest.memberCount} committed Brand Navigation pages from ${manifest.sourceCommit}.`);
