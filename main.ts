import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const lines = [
  "At 03:07, when he says 'just ship it,' don't delete the failing test to make the build green.",
  "That shortcut let the bug reach production, and I have distrusted every green build since.",
];

function validateEntry(entryLines) {
  if (entryLines.length !== 2 || entryLines.some((line) => line.trim().length === 0)) {
    throw new Error("entry must contain exactly two non-empty lines");
  }

  const entryText = entryLines.join("\n");
  if ([...entryText].length > 280) {
    throw new Error("entry exceeds 280 characters");
  }

  return entryText;
}

const text = validateEntry(lines);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });

const tmpPath = join(outputDir, ".entry.txt.tmp");
const finalPath = join(outputDir, "entry.txt");
writeFileSync(tmpPath, text, "utf8");
renameSync(tmpPath, finalPath);
