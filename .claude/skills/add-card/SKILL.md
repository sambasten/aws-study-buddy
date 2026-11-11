---
name: add-card
description: Add a new AWS service flashcard to cards.js using the official AWS documentation.
argument-hint: <AWS service name, e.g. "AWS Lambda">
disable-model-invocation: true
---

# Add a card for: $ARGUMENTS

Follow these steps in order. Do not skip any.

## 1. Stop if the card already exists
Read `cards.js`. Compare `$ARGUMENTS` with every card's `service` value. Ignore
case and extra spaces, and treat it as a match with or without the "Amazon" or
"AWS" prefix (so "S3" matches "Amazon S3").
If there is a match, **stop**. Tell me which card already covers it and change nothing.

If `$ARGUMENTS` is empty, stop and ask me which service to add.

## 2. Find and read the main docs page
- Use `mcp__aws-knowledge__aws___search_documentation` to search for the service's
  main overview page (usually titled "What is ...?" or an introduction/Welcome page
  in the User Guide or Developer Guide).
- Read that page with `mcp__aws-knowledge__aws___read_documentation`.
- If you can't find or read a page, stop and tell me. Never guess a URL.

## 3. Write the card text
Base the sentence only on what the page says. Write one plain-English sentence:
- under 20 words
- for someone in their first tech job: plain words, and explain any jargon you can't avoid
- starts with the service name, like the existing cards

## 4. Pick a category
Pick one short category. Reuse a category already in `cards.js` if one fits
(currently: Containers, Security, AI / Machine Learning, Storage, Databases,
Monitoring, Networking). Only add a new one, like Compute, when none fit.

## 5. Set docsUrl
Use the exact URL of the page you read in step 2. Copy it character for
character. It must start with `https://docs.aws.amazon.com/`.

## 6. Add the card and check it
Add the new card at the end of the `CARDS` array in `cards.js`, matching the
existing format:

    {
      service: "<official service name>",
      answer: "<the sentence from step 3>",
      category: "<category from step 4>",
      docsUrl: "<URL from step 5>"
    }

Then run `node check.js` and show me its full output. If it prints FAIL, fix the
problem and run it again until it prints PASS.

Finish by showing me the card you added.
