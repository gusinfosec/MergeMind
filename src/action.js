cd ~/dev/pr-copilot-extension

tee src/action.js >/dev/null <<'JS'
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import generateFromDiff from "./lib/generator.js";

async function main() {
  try {
    const {
      OPENAI_API_KEY,
      GITHUB_TOKEN,
      REPO_FULL,
      PR_NUMBER
    } = process.env;

    if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
    if (!GITHUB_TOKEN) throw new Error("Missing GITHUB_TOKEN");
    if (!REPO_FULL) throw new Error("Missing REPO_FULL (e.g. owner/repo)");
    if (!PR_NUMBER) throw new Error("Missing PR_NUMBER");

    const [owner, repo] = REPO_FULL.split("/");
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // Fetch the PR patch as unified diff
    const diffResp = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner,
        repo,
        pull_number: PR_NUMBER,
        headers: { accept: "application/vnd.github.v3.diff" }
      }
    );
    const diffText = diffResp.data;

    // Generate title/body using your local generator
    const { title, body } = await generateFromDiff({
      diff: diffText,
      openai: new OpenAI({ apiKey: OPENAI_API_KEY })
    });

    // Compose a nice comment
    const commentBody = [
      "### 🤖 Suggested PR Title & Description",
      "",
      `**TITLE:** ${title}`,
      "",
      "**BODY:**",
      body
    ].join("\n");

    // Post comment on the PR
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: Number(PR_NUMBER),
      body: commentBody
    });

    console.log("Posted MergeMind suggestion successfully.");
  } catch (err) {
    console.error("MergeMind action failed:", err?.message || err);
    // Fail the job with non-zero exit so it shows as failed with logs
    process.exit(1);
  }
}

main();
JS
