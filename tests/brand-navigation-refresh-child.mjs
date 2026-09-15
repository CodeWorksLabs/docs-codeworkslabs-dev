import { prepareBrandNavigationCandidate } from "../scripts/brand-navigation-refresh-lib.mjs";
import { admittedCommit, createMockFetch } from "./brand-navigation-refresh-test-support.mjs";

const commit = process.env.BN_TEST_COMMIT ?? admittedCommit;
const candidateParent = process.env.BN_TEST_CANDIDATE_PARENT;
if (!candidateParent) throw new Error("BN_TEST_CANDIDATE_PARENT is required.");
const { candidateRoot } = await prepareBrandNavigationCandidate(commit, {
  candidateParent,
  crashAt: process.env.BN_TEST_CRASH_AT,
  fetchImpl: createMockFetch({ commit }),
});
console.log(candidateRoot);
