(function () {
  const cards = typeof CARDS !== "undefined" && Array.isArray(CARDS) ? CARDS : [];

  const el = {
    position: document.getElementById("position"),
    service: document.getElementById("service"),
    answer: document.getElementById("answer"),
    category: document.getElementById("category"),
    sentence: document.getElementById("sentence"),
    docs: document.getElementById("docs"),
    prev: document.getElementById("prev"),
    show: document.getElementById("show"),
    next: document.getElementById("next"),
    shuffle: document.getElementById("shuffle")
  };

  if (cards.length === 0) {
    el.service.textContent = "No cards found";
    el.position.textContent = "";
    el.prev.disabled = el.show.disabled = el.next.disabled = el.shuffle.disabled = true;
    return;
  }

  // The order shown on screen. Starts as cards.js order; Shuffle replaces it.
  // CARDS itself is never changed.
  let deck = cards.slice();
  let index = 0;

  function render() {
    const card = deck[index];
    el.position.textContent = `Card ${index + 1} of ${deck.length}`;
    el.service.textContent = card.service;
    el.category.textContent = card.category;
    el.sentence.textContent = card.answer;
    el.docs.href = card.docsUrl;
    el.answer.hidden = true;
    el.show.disabled = false;
  }

  function go(step) {
    index = (index + step + deck.length) % deck.length;
    render();
  }

  // Fisher-Yates: every ordering is equally likely.
  function shuffle() {
    const next = cards.slice();
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    deck = next;
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

  render();
})();
