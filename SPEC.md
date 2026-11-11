# AWS Study Buddy — Spec

## Goal
A one-page flashcard app for learning AWS services. Each card shows a service name. Pressing "Show answer" reveals one plain sentence on what the service does, a short category, and a link to its official AWS documentation. A "Shuffle" button puts the cards in a random order. A "Quiz me" mode asks multiple-choice questions built from the same cards, shows the right answer after each pick, and keeps a running score for the session.

## Constraints
- Plain HTML, CSS and JavaScript. No frameworks, no npm packages, no build step.
- It opens by double-clicking `index.html` (a `file://` URL). No server and no installs.
- Because of that, `cards.js` is loaded with a classic `<script src="cards.js">`, not an ES module, since browsers block modules over `file://`.

## Files
| File | Purpose |
|---|---|
| `index.html` | Page markup, including the mode toggle and the quiz markup. Loads `style.css`, `cards.js`, then `app.js`. |
| `style.css` | Styling. |
| `app.js` | Flashcard display, navigation, shuffle, and quiz logic. |
| `cards.js` | The card data, and nothing else. |
| `check.js` | Data validator, run with `node check.js`. |

## Card data (`cards.js`)
- Declares one global array: `const CARDS = [ ... ];`
- Ends with `if (typeof module !== "undefined") module.exports = CARDS;` so Node can `require` it. Browsers ignore this line.
- Each card is an object with exactly these fields, all strings:
  - `service`: the service name, e.g. "Amazon ECS"
  - `answer`: one plain sentence saying what the service does. It always starts with the service name, e.g. "Amazon S3 stores...". The quiz relies on this to hide the name.
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
| 11 | AWS Lambda | Compute | `https://docs.aws.amazon.com/lambda/latest/dg/welcome.html` |
| 12 | Amazon GuardDuty | Security | `https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html` |
| 13 | AWS Security Hub | Security | `https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub-v2.html` |
| 14 | Amazon Lightsail | Compute | `https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html` |
| 15 | Amazon EKS | Containers | `https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html` |
| 16 | Amazon ECR | Containers | `https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html` |
| 17 | Amazon SageMaker AI | AI / Machine Learning | `https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html` |
| 18 | Amazon Rekognition | AI / Machine Learning | `https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html` |
| 19 | Amazon EC2 | Compute | `https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html` |
| 20 | AWS Elastic Beanstalk | Compute | `https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html` |
| 21 | Amazon EBS | Storage | `https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html` |
| 22 | Amazon EFS | Storage | `https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html` |
| 23 | AWS Backup | Storage | `https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html` |
| 24 | Amazon RDS | Databases | `https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html` |
| 25 | Amazon Aurora | Databases | `https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html` |
| 26 | Amazon ElastiCache | Databases | `https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html` |
| 27 | AWS CloudTrail | Monitoring | `https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html` |
| 28 | AWS X-Ray | Monitoring | `https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html` |
| 29 | AWS Config | Monitoring | `https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html` |
| 30 | Amazon VPC | Networking | `https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html` |
| 31 | Amazon Route 53 | Networking | `https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html` |
| 32 | Elastic Load Balancing | Networking | `https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html` |

## App behaviour

### Modes
- Two buttons above the card switch between **Flashcards** and **Quiz me**. The active one is visually marked and has `aria-pressed="true"`.
- The page opens in Flashcards mode.
- Switching to Quiz me starts a new quiz round.
- Switching back to Flashcards shows the flashcard deck at its current position and order. The quiz round and score are thrown away. Clicking the mode button that is already active does nothing.
- Quiz me needs at least 4 cards. With fewer, the Quiz me button is disabled and its `title` says "Quiz needs at least 4 cards".
- If `CARDS` is missing or empty, the page says "No cards found" instead of breaking, and both mode buttons are disabled.

### Flashcards mode
- On load, the page shows the first card's service name with the answer hidden.
- **Show answer** reveals the sentence, the category and a docs link. The link opens in a new tab (`target="_blank" rel="noopener"`).
- **Next** and **Previous** move through the cards in their current order. Next on the last card goes to the first, and Previous on the first card goes to the last.
- Changing cards hides the answer again.
- A position indicator shows where you are, e.g. "Card 2 of 3".
- **Shuffle** puts the cards in a new random order, jumps to the first card of that order, and hides the answer. Every card still appears exactly once. Next and Previous then follow the shuffled order. The shuffle does not change `cards.js`.
- Until Shuffle is pressed, the order is the `cards.js` order. Reloading the page returns to that order.
- Shuffle uses the Fisher-Yates algorithm with `Math.random()`, so every ordering is equally likely. Pressing Shuffle twice may give the same order by chance; that is fine.

### Quiz me mode
- A **Category** dropdown sits above the quiz card. Its first choice is "All categories" with the card count, then every category found in `cards.js` in alphabetical order, each with its card count, e.g. "Security (4)". It starts on All categories. The list is built from the cards, so a new category appears on its own.
- Changing the category starts a new round built only from cards in that category. The score resets.
- A **round** is a shuffled copy of the chosen cards (all of them, or one category), made with the same Fisher-Yates shuffle as the Shuffle button. Each question uses the next card in that order as the correct card, so every card is asked exactly once per round. The round does not change the flashcard order.
- Questions come in two types that alternate strictly. Question 1 is type A, question 2 is type B, question 3 is type A, and so on.
  - **Type A, "Name the service":** the prompt is the correct card's `answer` with the service name at the start replaced by "This service", e.g. "This service stores files...". If the sentence does not start with the service name, it is shown unchanged. The four options are service names.
  - **Type B, "What does it do?":** the prompt is "What does {service} do?", using the correct card's name. The four options are `answer` sentences from four cards, each with its leading service name replaced by "This service" in the same way, so the name does not give the answer away.
- Options: the correct card plus 3 **distractors** picked at random from the other cards, with no card used twice. The four are then shuffled with Fisher-Yates so the correct one lands in a random position. Distractors come from the chosen category when it has at least 4 cards (every category does today). Otherwise, and when All categories is chosen, they come from the whole deck.
- All options come from `cards.js`. The quiz never makes up service names or sentences.
- A progress line shows where you are and how you are doing, e.g. "Question 3 of 14 · 2 correct so far".
- Picking an option:
  - All four options become disabled, so only one pick per question counts.
  - The correct option is marked correct (green tint and a "✓"). If the pick was wrong, the picked option is also marked wrong (red tint and a "✗").
  - A result line says "Correct!" or "Not quite. The answer is {service}."
  - Under the result line, the page shows the correct card's category pill, its full `answer` sentence, and its docs link (`target="_blank" rel="noopener"`), using the same styling as the flashcard answer.
  - A **Next question** button appears. It is hidden until an option is picked.
  - The score goes up by one only when the pick was correct.
- On the last question, the Next question button is labelled **See results** instead. It shows "You got X of N correct" and a **Play again** button, which starts a new round with a fresh shuffle and the score back at 0.
- The score lives only in memory. Reloading the page or switching modes resets it. Nothing is written to `cards.js` or localStorage.
- Colours for correct and wrong use CSS variables with light and dark values, following the existing `prefers-color-scheme` setup.

## Check script (`check.js`)
Run with `node check.js`. It loads `./cards.js` with `require` and checks:
1. `cards.js` loads without error and exports an array.
2. Every card has all four fields: `service`, `answer`, `category` and `docsUrl`. A field only counts as missing when its key is absent or its value is not a string.
3. No service name appears twice. The comparison ignores case, trims the ends and collapses inner whitespace, so "Amazon S3" and " amazon  s3" count as the same.
4. Every `docsUrl` starts with `https://docs.aws.amazon.com/`.
5. There are at least 4 cards, because the quiz needs four options. The problem line reads "cards.js has N cards; the quiz needs at least 4".
6. Every `answer` starts with its card's `service` name, because the quiz hides the name by removing it from the front of the sentence.

Output:
- If everything passes, it prints `PASS` and exits with code `0`.
- Otherwise it prints `FAIL`, then one line per problem naming the card (index and service name, where known) and what is wrong, and exits with code `2`. It reports every problem, not just the first one.

## Done when
- [ ] Double-clicking `index.html` in Chrome, Safari or Firefox shows the first card, with no console errors.
- [ ] Show answer reveals the sentence, the category and a working docs link for all cards.
- [ ] Next and Previous cycle through all cards and wrap at both ends. The answer hides again on each move.
- [ ] Shuffle changes the order, lands on card 1 of the new order with the answer hidden, and Next then visits every card exactly once before wrapping. Reloading restores the `cards.js` order.
- [ ] Quiz me shows a prompt and four options. Exactly one option belongs to the correct card, and all four come from `cards.js`.
- [ ] Question types alternate: question 1 hides the name and offers four service names, question 2 shows a name and offers four sentences with their names hidden.
- [ ] The Category dropdown lists every category in `cards.js` with its count. Choosing "Security (4)" starts a round of 4 questions where all four options are Security cards.
- [ ] Picking an option disables all four, marks the correct one, marks a wrong pick, and shows the result line, the category, the sentence, a working docs link, and the Next question button.
- [ ] The progress line and score update after each pick. A full round asks every card exactly once and ends with a results screen. Play again restarts at 0.
- [ ] Switching Flashcards → Quiz me → Flashcards shows the flashcards again, with no console errors.
- [ ] `node check.js` on the starter data prints `PASS` and exits `0`.
- [ ] Each of the following prints `FAIL` plus the specific problem and exits `2`: removing a field from a card, adding a second "amazon ecs", changing a docsUrl to `http://example.com`, and an answer that does not start with its service name.
- [ ] Several problems at once are all listed.
- [ ] With `cards.js` cut down to 3 cards, `node check.js` prints `FAIL` with the card-count problem and exits `2`.
- [ ] The project has no `package.json` and no `node_modules`, and makes no network calls except the docs links the user clicks.

## Not now
- Spaced repetition
- Progress tracking across visits, or "I knew it / I didn't" buttons
- Saving state between visits (localStorage), including the shuffled order and the quiz score
- Timed questions
- Quiz questions about categories or docs URLs
- Search, or filtering and browsing by category in Flashcards mode
- Keyboard shortcuts and flip animations
- Rejecting blank-string fields, unknown extra fields, or categories outside a fixed list
- Checking that docs links actually resolve (no network calls in check.js)
- Hosting, deployment, and automated browser tests
