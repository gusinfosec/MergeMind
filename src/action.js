tee src/action.js > /dev/null <<'JS'
import { Octokit } from "@octokit/rest";
import { generateFromDiff } from "./lib/generator.js";
import fs from "fs";

// Env vars provided by GitHub Actions
const {
  GITHUB_TOKEN,
  REPO_FULL,
  PR_NUMBER,
  OPENAI_API_KEY
} = process.env;

if (!GITHUB_TOKEN || !REPO_FULL || !PR_NUMBER || !OPENAI_API_KEY) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

(async () => {
  try {
    const [owner, repo] = REPO_FULL.split("/");
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 1. Get PR diff
    const { data: pr } = await octokit.pulls.get({
      owner,
      repo,
      pull_number: PR_NUMBER,
      mediaType: { format: "diff" },
    });

    const diff = pr; // raw diff string
    const result = await generateFromDiff(diff);

    // 2. Post as PR comment
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: PR_NUMBER,
      body: `🤖 **MergeMind PR Summary**\n\n${result}`,
    });

    console.log("✅ Posted PR summary via MergeMind.");
  } catch (err) {
    console.error("❌ Action failed:", err);
    process.exit(1);
  }
})();
JS

