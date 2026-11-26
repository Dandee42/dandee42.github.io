// Tags of a post card stay on one row (post-card.html with tags=true): the tags that don't fit are
// hidden behind a "+N" chip, and the chip shows them all. Without JS the tags simply wrap.
(function () {
  var rows = document.querySelectorAll("[data-tag-overflow]");
  if (!rows.length) return;

  function top(el) {
    return el.getBoundingClientRect().top;
  }

  function fit(row) {
    if (row.classList.contains("is-expanded")) return;
    var tags = row.querySelectorAll("a.tag-chip");
    var more = row.querySelector("[data-tag-more]");
    var count = more.querySelector("[data-tag-count]");
    tags.forEach(function (tag) { tag.hidden = false; });
    more.hidden = true;

    var firstRow = top(tags[0]) + 2;
    if (top(tags[tags.length - 1]) <= firstRow) return;

    // Hide tags from the end until the "+N" chip fits on the first row
    more.hidden = false;
    for (var i = tags.length - 1; i > 0; i--) {
      tags[i].hidden = true;
      count.textContent = "+" + (tags.length - i);
      if (top(more) <= firstRow) break;
    }
  }

  function fitAll() {
    rows.forEach(fit);
  }

  rows.forEach(function (row) {
    var more = row.querySelector("[data-tag-more]");
    more.addEventListener("click", function () {
      var firstHidden = row.querySelector("a.tag-chip[hidden]");
      row.classList.add("is-expanded");
      row.querySelectorAll("a.tag-chip").forEach(function (tag) { tag.hidden = false; });
      more.hidden = true;
      if (firstHidden) firstHidden.focus();
    });
  });

  fitAll();
  if (document.fonts) document.fonts.ready.then(fitAll);

  var frame = 0;
  window.addEventListener("resize", function () {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitAll);
  });
})();
