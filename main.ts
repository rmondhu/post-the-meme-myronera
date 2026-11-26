import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR || ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const srcPath = join(botDir, "POST.json");
const dstPath = join(outDir, "POST.json");

mkdirSync(outDir, { recursive: true });
copyFileSync(srcPath, dstPath);

// Read the output back and hold it to the gate: exit 1 only when the
// copy itself did not land byte-identical, never on anything else.
const written = readFileSync(dstPath);
const expected = readFileSync(srcPath);
if (!written.equals(expected)) {
  process.exit(1);
}

process.exit(0);
