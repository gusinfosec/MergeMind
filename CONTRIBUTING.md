# Contributing to MergeMind

Thanks for jumping in — contributions make this project better for everyone.

## 🧭 Ways to Contribute
- Fix bugs or improve stability
- Add config options or styles (e.g., different PR formats)
- Improve docs (README, examples, screenshots)
- File issues with clear repro steps

## 🛠 Local Setup
```bash
git clone https://github.com/gusinfosec/MergeMind.git
cd MergeMind
npm install
# run local diff summarizer
export OPENAI_API_KEY="sk-..."    # your key (do not commit)
node src/local-run.js sample.diff || node src/index.js
```
Node 20+ required.

## 🌳 Branching & PRs
- Create a feature branch: `feat/short-description` or `fix/short-description`
- Use **Conventional Commits** for messages:
  - `feat: add overwrite mode`
  - `fix: handle empty diff input`
  - `docs: improve README`
- Open a PR with:
  - What & Why
  - Screenshots (if UI/log output)
  - Checklist below

## ✅ PR Checklist
- [ ] Linted / self-reviewed
- [ ] Includes tests or manual test notes
- [ ] Updates docs if needed
- [ ] Does not leak secrets in logs or code

## 🔒 Security & Secrets
- Never commit keys/tokens.
- The GitHub Action reads `OPENAI_API_KEY` from GitHub Secrets.

## 🧪 Testing the Action
- Use a test branch and open a PR to trigger the workflow.
- Check the _Actions_ tab for logs.

## 📝 Code of Conduct
Be kind. Assume good intent. No harassment or discrimination.

## 📦 Releases
We will cut releases as tagged versions when the Action stabilizes.
