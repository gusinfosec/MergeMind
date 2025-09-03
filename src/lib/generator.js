import OpenAI from "openai";

/**
 * Generate a PR title & body from a unified diff.
 * Returns: { title: string, body: string }
 */
export async function generateFromDiff({ diff, openai }) {
  if (!diff || !diff.trim()) {
    return {
      title: "No changes detected",
      body: "- The diff was empty. Nothing to summarise.",
    };
  }

  // Use provided client or create one from env
  const client = openai ?? new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Ask for strict JSON so we can parse reliably
  const prompt = [
    "You are a senior reviewer. Produce a concise PR title and a markdown body from this unified diff.",
    "",
    "Rules:",
    "- Title: 6–12 words, imperative mood, no trailing period.",
    "- Body: short sections: Summary / Risk / Testing, with bullets.",
    "- Do NOT include code fences in the JSON.",
    "",
    "Output STRICT JSON ONLY:",
    `{ "title": "...", "body": "..." }`,
    "",
    "Diff starts here:",
    "----",
    diff.slice(0, 120000), // keep requests reasonable
    "----"
  ].join("\n");

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      { role: "system", content: "Return STRICT JSON with keys: title, body." },
      { role: "user", content: prompt },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content?.trim() ?? "";
  let parsed = null;

  // Try parsing the whole thing; if it failed, try to extract a JSON object
  try {
    parsed = JSON.parse(raw);
  } catch (_) {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) {
      try { parsed = JSON.parse(m[0]); } catch {}
    }
  }

  const title = parsed?.title && String(parsed.title).trim();
  const body  = parsed?.body  && String(parsed.body).trim();

  return {
    title: title || "Update code based on changes in diff",
    body:  body  || [
      "- Summary: Changes detected in the diff; auto-generated summary unavailable due to parsing.",
      "- Risk: Low unless noted in code comments.",
      "- Testing: Run unit tests and validate affected paths.",
    ].join("\n"),
  };
}

// Also expose a default for flexible imports
export default generateFromDiff;
