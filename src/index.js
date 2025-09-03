import fs from "node:fs";
import { generateFromDiff } from "./lib/generator.js";

const diff = fs.readFileSync("./sample.diff", "utf8");
const out = await generateFromDiff({
  diff, repo: "your/repo", author: "gusinfosec"
});
console.log(out);
