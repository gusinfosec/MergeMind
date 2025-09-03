# PR Copilot Extension

## Purpose
The extension is a GitHub Copilot plug-in that automatically writes pull-request descriptions for you.

### Problem it solves
- Developers spend ~5 min per PR writing titles and summaries.
- A 10-person team wastes ~5 hours/week, or ~$1,000/month in lost velocity.

### What it does
- Watches for new PR events (`pull_request.opened`).
- Downloads the PR diff.
- Sends it to GPT-4o-mini with a summarisation prompt.
- Pushes the result back to GitHub (comment or body edit).

**Result:**  
Consistent, concise PR descriptions. Saves ~30 min/dev/week → worth **$5 per seat per month**.

---

## Quickstart (local)
```bash
cd ~/dev/pr-copilot-extension
npm install
export OPENAI_API_KEY="sk-..."
node src/index.js
