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
    next: document.getElementById("next")
  };

  if (cards.length === 0) {
    el.service.textContent = "No cards found";
    el.position.textContent = "";
    el.prev.disabled = el.show.disabled = el.next.disabled = true;
    return;
  }

  let index = 0;

  function render() {
    const card = cards[index];
    el.position.textContent = `Card ${index + 1} of ${cards.length}`;
    el.service.textContent = card.service;
    el.category.textContent = card.category;
    el.sentence.textContent = card.answer;
    el.docs.href = card.docsUrl;
    el.answer.hidden = true;
    el.show.disabled = false;
  }

  function go(step) {
    index = (index + step + cards.length) % cards.length;
    render();
  }

  el.show.addEventListener("click", function () {
    el.answer.hidden = false;
    el.show.disabled = true;
  });
  el.prev.addEventListener("click", function () { go(-1); });
  el.next.addEventListener("click", function () { go(1); });

  render();
})();
