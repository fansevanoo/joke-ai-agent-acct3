// joke-ai-agent-acct3 — The joke the reviewer laughs at.
// One-line joke about working beside an AI coding agent.
// The program assembles the joke from a setup and a punchline,
// then writes exactly one line to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const setup =
  "The agent called it a minor fix \u2014 38 files, 4,000 lines changed, and the one line that actually fixes the bug";
const punchline = "is hiding in the middle like it knows what it did.";
// The setup carries the reviewer's true observation (the "minor fix"
// that rewrites the world); the punchline lands on the one guilty line.

function buildJoke(): string {
  return `${setup} ${punchline}`;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(outDir, { recursive: true });
  const joke = buildJoke();
  // The gate: exactly one line, 1-280 Unicode characters, not blank.
  if (joke.length < 1 || joke.length > 280 || joke.includes("\n")) {
    throw new Error(`joke must be one line of 1-280 characters, got ${joke.length}`);
  }
  writeFileSync(join(outDir, "entry.txt"), joke + "\n", "utf8");
}

main();
