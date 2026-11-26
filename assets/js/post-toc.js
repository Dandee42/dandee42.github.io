// Table of contents of a post. The post's own kramdown TOC (#markdown-toc) becomes a collapsible
// block in the text, and a copy goes into the sticky aside (post-toc-aside.html), where the
// section being read is highlighted. From 1200 px, CSS shows only the aside copy.
(function () {
  var content = document.querySelector(".post-content");
  var toc = content && content.querySelector("#markdown-toc");
  var card = document.querySelector("[data-post-toc]");
  if (!toc) return;

  var title = card ? card.querySelector(".toc-card__title").textContent : "";

  // In the text: a <details> with the TOC, closed by default
  var details = document.createElement("details");
  details.className = "toc-inline";
  var summary = document.createElement("summary");
  summary.textContent = title;
  toc.parentNode.insertBefore(details, toc);
  details.appendChild(summary);
  details.appendChild(toc);

  if (!card) return;

  // In the aside: a copy without the ids, which would otherwise be duplicated
  var list = toc.cloneNode(true);
  list.removeAttribute("id");
  list.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
  list.className = "toc-card__list";
  card.appendChild(list);
  card.hidden = false;
  var article = content.closest("[data-post-article]");
  if (article) article.classList.add("has-aside-toc");

  var links = {};
  list.querySelectorAll('a[href^="#"]').forEach(function (link) {
    links[decodeURIComponent(link.getAttribute("href").slice(1))] = link;
  });
  var headings = Array.prototype.filter.call(
    content.querySelectorAll("h2[id], h3[id]"),
    function (heading) { return links[heading.id]; }
  );
  if (!headings.length) return;

  var current = null;
  var scheduled = false;

  // The current section is the last heading above the top third of the window
  function update() {
    scheduled = false;
    var line = window.innerHeight * 0.3;
    var active = headings[0];
    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top < line) active = heading;
    });
    if (active === current) return;
    if (current) {
      links[current.id].classList.remove("is-active");
      links[current.id].removeAttribute("aria-current");
    }
    links[active.id].classList.add("is-active");
    links[active.id].setAttribute("aria-current", "location");
    current = active;

    // Keep the highlighted item in view when the list is shorter than its content and scrolls
    // (the list itself, not the page)
    var listBox = list.getBoundingClientRect();
    var linkBox = links[active.id].getBoundingClientRect();
    if (linkBox.top < listBox.top || linkBox.bottom > listBox.bottom) {
      list.scrollTop += linkBox.top - listBox.top - (list.clientHeight - linkBox.height) / 2;
    }
  }

  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
})();
