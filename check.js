// Validates cards.js. Usage: node check.js
// Prints PASS to stdout (exit 0), or FAIL plus each problem to stderr (exit 2).
// Problems go to stderr so the Claude Code hook can show them when it blocks.

const path = require("path");

const REQUIRED_FIELDS = ["service", "answer", "category", "docsUrl"];
const DOCS_PREFIX = "https://docs.aws.amazon.com/";
const MIN_CARDS = 4; // the quiz needs four options; keep equal to OPTION_COUNT in app.js

function normalize(name) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function label(card, i) {
  const name = card && typeof card.service === "string" ? ` "${card.service}"` : "";
  return `Card ${i + 1}${name}`;
}

function check(cards) {
  const problems = [];

  if (!Array.isArray(cards)) {
    problems.push("cards.js must export an array of cards");
    return problems;
  }

  if (cards.length < MIN_CARDS) {
    problems.push(`cards.js has ${cards.length} cards; the quiz needs at least ${MIN_CARDS}`);
  }

  const seen = new Map(); // normalized service -> first card index

  cards.forEach((card, i) => {
    if (card === null || typeof card !== "object" || Array.isArray(card)) {
      problems.push(`${label(null, i)}: is not an object`);
      return;
    }

    for (const field of REQUIRED_FIELDS) {
      if (typeof card[field] !== "string") {
        problems.push(`${label(card, i)}: missing field "${field}"`);
      }
    }

    if (typeof card.service === "string") {
      const key = normalize(card.service);
      if (seen.has(key)) {
        problems.push(`${label(card, i)}: duplicate service (same as card ${seen.get(key) + 1})`);
      } else {
        seen.set(key, i);
      }
    }

    if (typeof card.docsUrl === "string" && !card.docsUrl.startsWith(DOCS_PREFIX)) {
      problems.push(`${label(card, i)}: docsUrl must start with ${DOCS_PREFIX} (got "${card.docsUrl}")`);
    }

    // The quiz hides the service name by stripping it from the front of the answer.
    if (typeof card.service === "string" && typeof card.answer === "string" && !card.answer.startsWith(card.service)) {
      problems.push(`${label(card, i)}: answer must start with the service name "${card.service}"`);
    }
  });

  return problems;
}

let problems;
try {
  problems = check(require(path.join(__dirname, "cards.js")));
} catch (err) {
  problems = [`could not load cards.js: ${err.message}`];
}

if (problems.length === 0) {
  console.log("PASS");
  process.exit(0);
} else {
  console.error("FAIL");
  for (const p of problems) console.error(`- ${p}`);
  process.exit(2);
}
