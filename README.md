tee README.md > /dev/null <<'MD'
# MergeMind

**AI-powered PR titles & descriptions.**  
Save time writing pull requests — get clear, professional summaries auto-generated from your diffs.  
Configurable style & risk analysis, perfect for teams who want faster reviews and better documentation.

---

## ✨ Features
- 🤖 Auto-generates **PR titles & bodies** from code diffs
- 📝 Configurable via `.pr-describer.yml` (style, length, thresholds)
- 🔍 Includes risk/impact notes and testing steps
- ⚡ GitHub Actions automation; zero-click once installed

---

## 🚀 Quick Start (Local)
```bash
cd ~/dev/pr-copilot-extension
npm install
export OPENAI_API_KEY="sk-..."
node src/index.js
