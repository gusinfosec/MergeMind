tee README.md > /dev/null <<'MD'
# PR Copilot Extension

## Purpose of the Copilot Extension
The extension is a GitHub Copilot plug-in that automatically writes pull-request descriptions for you.

### Problem it solves
- Developers spend ~5 min per PR writing titles and summaries.
- A 10-person team wastes ~5 hours/week (~$1,000/month) in lost velocity.

### What it does
- Watches for new PR events (`pull_request.opened`).
- Downloads the PR diff (unified `+`/`-` patch).
- Sends it to GPT-4o-mini with: “Summarise these changes for reviewers in 80–120 words.”
- Pushes the generated text back to the PR body via the GitHub API.

**Result**
- Zero-click, consistent PR descriptions (conventional-commit style).
- ~30 min saved per dev per week — supports **$5/seat/month** paid tier.

## Quickstart (Local)
```bash
cd ~/dev/pr-copilot-extension
npm i
export OPENAI_API_KEY='sk-...'
node src/index.js
