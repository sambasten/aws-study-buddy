// PostToolUse hook: runs check.js only when cards.js or check.js was edited.
// Reads the hook JSON from stdin. Exits 0 (silently) for every other file,
// for empty or unreadable input, so unrelated edits are never blocked.

const path = require("path");
const { spawnSync } = require("child_process");

const WATCHED = new Set(["cards.js", "check.js"]);

let input = "";
try {
  input = require("fs").readFileSync(0, "utf8");
} catch {
  process.exit(0);
}

let filePath;
try {
  filePath = JSON.parse(input).tool_input.file_path;
} catch {
  process.exit(0);
}

if (typeof filePath !== "string" || !WATCHED.has(path.basename(filePath))) {
  process.exit(0);
}

const root = process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, "..", "..");
const result = spawnSync(process.execPath, [path.join(root, "check.js")], { stdio: "inherit" });
process.exit(result.status === null ? 1 : result.status);
