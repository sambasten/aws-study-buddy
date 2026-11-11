(function () {
  const cards = typeof CARDS !== "undefined" && Array.isArray(CARDS) ? CARDS : [];

  const OPTION_COUNT = 4;          // options per quiz question; keep equal to MIN_CARDS in check.js
  const MIN_QUIZ_CARDS = OPTION_COUNT;

  const $ = (id) => document.getElementById(id);
  const el = {
    modeFlash: $("mode-flash"),
    modeQuiz: $("mode-quiz"),
    flashcards: $("flashcards"),
    quiz: $("quiz"),

    position: $("position"),
    service: $("service"),
    answer: $("answer"),
    category: $("category"),
    sentence: $("sentence"),
    docs: $("docs"),
    prev: $("prev"),
    show: $("show"),
    next: $("next"),
    shuffle: $("shuffle"),

    quizCategory: $("quiz-category"),
    quizProgress: $("quiz-progress"),
    quizQuestion: $("quiz-question"),
    quizPrompt: $("quiz-prompt"),
    quizOptions: $("quiz-options"),
    quizResult: $("quiz-result"),
    quizAnswer: $("quiz-answer"),
    quizAnswerCategory: $("quiz-answer-category"),
    quizAnswerSentence: $("quiz-answer-sentence"),
    quizAnswerDocs: $("quiz-answer-docs"),
    quizSummary: $("quiz-summary"),
    quizScore: $("quiz-score"),
    quizNext: $("quiz-next"),
    quizAgain: $("quiz-again")
  };

  // Fisher-Yates on a copy: every ordering is equally likely. The input is never changed.
  function shuffled(list) {
    const next = list.slice();
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  if (cards.length === 0) {
    el.service.textContent = "No cards found";
    el.position.textContent = "";
    [el.prev, el.show, el.next, el.shuffle, el.modeFlash, el.modeQuiz].forEach(function (button) {
      button.disabled = true;
    });
    return;
  }

  // ---------- Flashcards mode ----------

  // The order shown on screen. Starts as cards.js order; Shuffle replaces it.
  // CARDS itself is never changed.
  let deck = cards.slice();
  let index = 0;

  // Fills an answer panel (category pill, sentence, docs link) from a card.
  function fillAnswer(panel, card) {
    panel.category.textContent = card.category;
    panel.sentence.textContent = card.answer;
    panel.docs.href = card.docsUrl;
  }

  function render() {
    const card = deck[index];
    el.position.textContent = `Card ${index + 1} of ${deck.length}`;
    el.service.textContent = card.service;
    fillAnswer({ category: el.category, sentence: el.sentence, docs: el.docs }, card);
    el.answer.hidden = true;
    el.show.disabled = false;
  }

  function go(step) {
    index = (index + step + deck.length) % deck.length;
    render();
  }

  function shuffle() {
    deck = shuffled(cards);
    index = 0;
    render();
  }

  el.show.addEventListener("click", function () {
    el.answer.hidden = false;
    el.show.disabled = true;
  });
  el.prev.addEventListener("click", function () { go(-1); });
  el.next.addEventListener("click", function () { go(1); });
  el.shuffle.addEventListener("click", shuffle);

  // ---------- Quiz me mode ----------

  // pool: the cards the round is built from (all cards, or one category).
  // round: a shuffled copy of the pool; each question asks about the next card.
  const quiz = { pool: [], round: [], at: 0, score: 0, options: [], answered: false };

  function fillCategoryFilter() {
    const counts = new Map();
    cards.forEach(function (card) {
      counts.set(card.category, (counts.get(card.category) || 0) + 1);
    });
    const names = Array.from(counts.keys()).sort(function (a, b) { return a.localeCompare(b); });

    el.quizCategory.innerHTML = "";
    el.quizCategory.add(new Option(`All categories (${cards.length})`, ""));
    names.forEach(function (name) {
      el.quizCategory.add(new Option(`${name} (${counts.get(name)})`, name));
    });
  }

  // "Amazon S3 stores..." -> "This service stores..." so the prompt does not give the name away.
  function maskName(card) {
    if (card.answer.startsWith(card.service)) {
      return "This service" + card.answer.slice(card.service.length);
    }
    return card.answer;
  }

  // The correct card plus three distractors, in random order. Distractors come from the
  // chosen category when it has enough cards, otherwise from the whole deck.
  function pickOptions(correct) {
    const source = quiz.pool.length >= OPTION_COUNT ? quiz.pool : cards;
    const others = source.filter(function (card) { return card !== correct; });
    const distractors = shuffled(others).slice(0, OPTION_COUNT - 1);
    return shuffled([correct].concat(distractors));
  }

  function startRound() {
    const chosen = el.quizCategory.value;
    quiz.pool = chosen ? cards.filter(function (card) { return card.category === chosen; }) : cards;
    quiz.round = shuffled(quiz.pool);
    quiz.at = 0;
    quiz.score = 0;
    el.quizSummary.hidden = true;
    el.quizAgain.hidden = true;
    el.quizQuestion.hidden = false;
    showQuestion();
  }

  function renderProgress() {
    el.quizProgress.textContent =
      `Question ${quiz.at + 1} of ${quiz.round.length} · ${quiz.score} correct so far`;
  }

  function showQuestion() {
    const card = quiz.round[quiz.at];
    const nameTheService = quiz.at % 2 === 0;   // type A on even questions, type B on odd
    const last = quiz.at === quiz.round.length - 1;

    quiz.answered = false;
    quiz.options = [];

    renderProgress();
    el.quizPrompt.textContent = nameTheService ? maskName(card) : `What does ${card.service} do?`;

    el.quizOptions.innerHTML = "";
    pickOptions(card).forEach(function (option) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.textContent = nameTheService ? option.service : maskName(option);
      button.addEventListener("click", function () { answerWith(option); });
      el.quizOptions.appendChild(button);
      quiz.options.push({ card: option, button: button });
    });

    el.quizResult.hidden = true;
    el.quizResult.className = "result";
    el.quizAnswer.hidden = true;
    el.quizNext.hidden = true;
    el.quizNext.textContent = last ? "See results" : "Next question";
  }

  function answerWith(picked) {
    if (quiz.answered) return;
    quiz.answered = true;

    const correct = quiz.round[quiz.at];
    const right = picked === correct;
    if (right) quiz.score += 1;

    quiz.options.forEach(function (entry) {
      entry.button.disabled = true;
      if (entry.card === correct) entry.button.classList.add("correct");
      else if (entry.card === picked) entry.button.classList.add("wrong");
    });

    renderProgress();
    el.quizResult.textContent = right ? "Correct!" : `Not quite. The answer is ${correct.service}.`;
    el.quizResult.classList.add(right ? "correct" : "wrong");
    el.quizResult.hidden = false;

    fillAnswer({ category: el.quizAnswerCategory, sentence: el.quizAnswerSentence, docs: el.quizAnswerDocs }, correct);
    el.quizAnswer.hidden = false;

    el.quizNext.hidden = false;
    el.quizNext.focus();
  }

  function showSummary() {
    el.quizQuestion.hidden = true;
    el.quizNext.hidden = true;
    el.quizProgress.textContent = "Round over";
    el.quizScore.textContent = `You got ${quiz.score} of ${quiz.round.length} correct`;
    el.quizSummary.hidden = false;
    el.quizAgain.hidden = false;
    el.quizAgain.focus();
  }

  el.quizNext.addEventListener("click", function () {
    if (!quiz.answered) return;
    if (quiz.at === quiz.round.length - 1) {
      showSummary();
    } else {
      quiz.at += 1;
      showQuestion();
    }
  });
  el.quizAgain.addEventListener("click", startRound);
  el.quizCategory.addEventListener("change", startRound);

  // ---------- Mode toggle ----------

  function setMode(mode) {
    const isQuiz = mode === "quiz";
    const entering = isQuiz && el.quiz.hidden;   // only start a round when actually switching in
    el.flashcards.hidden = isQuiz;
    el.quiz.hidden = !isQuiz;
    el.modeFlash.setAttribute("aria-pressed", String(!isQuiz));
    el.modeQuiz.setAttribute("aria-pressed", String(isQuiz));
    if (entering) startRound();
  }

  el.modeFlash.addEventListener("click", function () { setMode("flashcards"); });
  el.modeQuiz.addEventListener("click", function () { setMode("quiz"); });

  if (cards.length < MIN_QUIZ_CARDS) {
    el.modeQuiz.disabled = true;
    el.modeQuiz.title = `Quiz needs at least ${MIN_QUIZ_CARDS} cards`;
  }

  fillCategoryFilter();
  render();
})();
