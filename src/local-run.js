import fs from 'fs';
import OpenAI from 'openai';
import * as gen from './lib/generator.js';

const generateFromDiff = gen.default ?? gen.generateFromDiff;
if (!generateFromDiff) throw new Error("Generator export not found.");

const diffPath = process.argv[2] || 'sample.diff';
const diff = fs.readFileSync(diffPath, 'utf8');
console.log(`[local-run] Using diff file: ${diffPath} (${diff.length} bytes)`);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const run = async () => {
  const result = await generateFromDiff({ diff, openai });
  console.log("\nRAW RESULT:", result, "\n");
  console.log("TITLE:", result.title, "\n");
  console.log("BODY:\n" + result.body + "\n");
};
run().catch(e => { console.error(e); process.exit(1); });
