# AWS Study Buddy — Spec

## Goal
A one-page flashcard app for learning AWS services. Each card shows a service name. Pressing "Show answer" reveals one plain sentence on what the service does, a short category, and a link to its official AWS documentation. A "Shuffle" button puts the cards in a random order.

## Constraints
- Plain HTML, CSS and JavaScript. No frameworks, no npm packages, no build step.
- It opens by double-clicking `index.html` (a `file://` URL). No server and no installs.
- Because of that, `cards.js` is loaded with a classic `<script src="cards.js">`, not an ES module, since browsers block modules over `file://`.

## Files
| File | Purpose |
|---|---|
| `index.html` | Page markup. Loads `style.css`, `cards.js`, then `app.js`. |
| `style.css` | Styling. |
| `app.js` | Card display, navigation and shuffle logic. |
| `cards.js` | The card data, and nothing else. |
| `check.js` | Data validator, run with `node check.js`. |

## Card data (`cards.js`)
- Declares one global array: `const CARDS = [ ... ];`
- Ends with `if (typeof module !== "undefined") module.exports = CARDS;` so Node can `require` it. Browsers ignore this line.
- Each card is an object with exactly these fields, all strings:
  - `service`: the service name, e.g. "Amazon ECS"
  - `answer`: one plain sentence saying what the service does
  - `category`: a short free-text label, e.g. "Containers"
  - `docsUrl`: the official docs page, starting with `https://docs.aws.amazon.com/`
- Cards, in this order:

| # | service | category | docsUrl |
|---|---|---|---|
| 1 | Amazon ECS | Containers | `https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html` |
| 2 | AWS IAM | Security | `https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html` |
| 3 | Amazon Bedrock | AI / Machine Learning | `https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html` |
| 4 | Amazon S3 | Storage | `https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html` |
| 5 | Amazon DynamoDB | Databases | `https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html` |
| 6 | Amazon CloudWatch | Monitoring | `https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html` |
| 7 | Amazon Cognito | Security | `https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html` |
| 8 | Amazon CloudFront | Networking | `https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html` |
| 9 | AWS Fargate | Containers | `https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html` |
| 10 | Amazon Bedrock AgentCore | AI / Machine Learning | `https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html` |

## App behaviour
- On load, the page shows the first card's service name with the answer hidden.
- **Show answer** reveals the sentence, the category and a docs link. The link opens in a new tab (`target="_blank" rel="noopener"`).
- **Next** and **Previous** move through the cards in their current order. Next on the last card goes to the first, and Previous on the first card goes to the last.
- Changing cards hides the answer again.
- A position indicator shows where you are, e.g. "Card 2 of 3".
- **Shuffle** puts the cards in a new random order, jumps to the first card of that order, and hides the answer. Every card still appears exactly once. Next and Previous then follow the shuffled order. The shuffle does not change `cards.js`.
- Until Shuffle is pressed, the order is the `cards.js` order. Reloading the page returns to that order.
- Shuffle uses the Fisher-Yates algorithm with `Math.random()`, so every ordering is equally likely. Pressing Shuffle twice may give the same order by chance; that is fine.
- If `CARDS` is missing or empty, the page says "No cards found" instead of breaking.

## Check script (`check.js`)
Run with `node check.js`. It loads `./cards.js` with `require` and checks:
1. `cards.js` loads without error and exports an array.
2. Every card has all four fields: `service`, `answer`, `category` and `docsUrl`. A field only counts as missing when its key is absent or its value is not a string.
3. No service name appears twice. The comparison ignores case, trims the ends and collapses inner whitespace, so "Amazon S3" and " amazon  s3" count as the same.
4. Every `docsUrl` starts with `https://docs.aws.amazon.com/`.

Output:
- If everything passes, it prints `PASS` and exits with code `0`.
- Otherwise it prints `FAIL`, then one line per problem naming the card (index and service name, where known) and what is wrong, and exits with code `2`. It reports every problem, not just the first one.

## Done when
- [ ] Double-clicking `index.html` in Chrome, Safari or Firefox shows the first card, with no console errors.
- [ ] Show answer reveals the sentence, the category and a working docs link for all cards.
- [ ] Next and Previous cycle through all cards and wrap at both ends. The answer hides again on each move.
- [ ] Shuffle changes the order, lands on card 1 of the new order with the answer hidden, and Next then visits every card exactly once before wrapping. Reloading restores the `cards.js` order.
- [ ] `node check.js` on the starter data prints `PASS` and exits `0`.
- [ ] Each of the following prints `FAIL` plus the specific problem and exits `2`: removing a field from a card, adding a second "amazon ecs", and changing a docsUrl to `http://example.com`.
- [ ] Several problems at once are all listed.
- [ ] The project has no `package.json` and no `node_modules`, and makes no network calls except the docs links the user clicks.

## Not now
- Spaced repetition
- Scoring, progress tracking, or "I knew it / I didn't" buttons
- Saving state between visits (localStorage), including the shuffled order
- Search, filters, or browsing by category
- Keyboard shortcuts and flip animations
- Rejecting blank-string fields, unknown extra fields, or categories outside a fixed list
- Checking that docs links actually resolve (no network calls in check.js)
- Hosting, deployment, and automated browser tests
