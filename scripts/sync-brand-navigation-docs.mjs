import { prepareBrandNavigationCandidate } from "./brand-navigation-refresh-lib.mjs";

const args = process.argv.slice(2);
if (args.length !== 1 || !/^[0-9a-f]{40}$/u.test(args[0])) {
  throw new Error("Usage: npm run sync:brand-navigation -- <exact-lowercase-40-character-commit>");
}

const { candidateRoot, manifest } = await prepareBrandNavigationCandidate(args[0]);
console.log(`Prepared ${manifest.memberCount} Brand Navigation pages from proven commit ${manifest.sourceCommit}.`);
console.log(`Advisory candidate: ${candidateRoot}`);
console.log("The tracked docs estate was not changed. Review and apply this candidate through a separately authorized Git change.");
