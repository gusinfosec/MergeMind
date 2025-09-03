import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateFromDiff({ diff, repo, author }) {
  const messages = [{
    role: "user",
    content:
`You are a PR editor. Return ONLY:
TITLE: <concise, <=80 chars>
BODY:
- Summary (2-4 bullets)
- Risk/Impact (1-2 bullets)
- Testing Steps (1-3 bullets)

Repo: ${repo}
Author: ${author}
Diff (trimmed):
${diff.slice(0, 12000)}`
  }];
  const r = await client.chat.completions.create({
    model: "gpt-4o-mini", temperature: 0.2, messages
  });
  return r.choices[0].message.content;
}
