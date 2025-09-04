# Privacy Policy — MergeMind

_Last updated: 2025-09-03_

MergeMind is a GitHub Action that generates PR titles and descriptions from diffs.

## What data we process
- **Repository metadata** needed to fetch PR information
- **PR diffs** (unified patch of `+` / `-` lines)
- **Configuration** from `.pr-describer.yml`

## What leaves your repo
- The **PR diff** is sent to the selected LLM provider (default: OpenAI API) to generate text.
- We do **not** send repo secrets or environment variables.
- We do **not** store or log your code beyond standard GitHub Action logs (you control retention in your repo).

## Storage & Retention
- This project does not run a server or keep a database.
- Logs are stored only in your GitHub Actions run history.
- OpenAI may process inputs to provide the service. See the provider’s policy.

## Security
- You must add `OPENAI_API_KEY` as a GitHub Secret. Never commit keys to the repo.
- The Action runs with minimal required permissions (`pull-requests: write`).

## Your responsibilities
- Ensure your organization’s data policy allows sending PR diffs to your chosen LLM vendor.
- Mask or exclude sensitive files if needed (e.g., through your CI filters, labels, or future ignore config).

## Contact
Open an issue in the repo with `[privacy]` in the title for questions.
