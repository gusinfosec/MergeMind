import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import * as gen from "./lib/generator.js";

// Support both default and named exports
const generateFromDiff =
  gen.default ??
  gen.generateFromDiff ??
  gen.run ??
  gen.generator;

if (!generateFromDiff) {
  throw new Error(
    "Could not find a generator export. Expected default export or a named export like { generateFromDiff }."
  );
}

async function main() {
  const {
    OPENAI_API_KEY,
    GITHUB_TOKEN,
    REPO_FULL,
    PR_NUMBER,
  } = process.env;

  if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  if (!GITHUB_TOKEN) throw new Error("Missing GITHUB_TOKEN");
  if (!REPO_FULL)     throw new Error("Missing REPO_FULL (e.g. owner/repo)");
  if (!PR_NUMBER)     throw new Error("Missing PR_NUMBER");

  const [owner, repo] = REPO_FULL.split("/");
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  // Fetch unified diff for this PR
  const diffResp = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner,
      repo,
      pull_number: PR_NUMBER,
      headers: { accept: "application/vnd.github.v3.diff" },
    }
  );
  const diffText = diffResp.data;

  // Generate PR title/body via your generator
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const { title, body } = await generateFromDiff({ diff: diffText, openai });

  const commentBody = [
    "### 🤖 Suggested PR Title & Description",
    "",
    `**TITLE:** ${title}`,
    "",
    "**BODY:**",
    body,
  ].join("\n");

  // Post back to the PR
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: Number(PR_NUMBER),
    body: commentBody,
  });

  console.log("Posted MergeMind suggestion successfully.");
}

main().catch((err) => {
  console.error("MergeMind action failed:", err?.stack || err?.message || err);
  process.exit(1);
});
