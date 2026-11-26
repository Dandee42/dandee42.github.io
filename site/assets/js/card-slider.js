// A row of cards that scrolls sideways (_card-slider.scss): swipe, trackpad, keyboard or the arrows
// next to the title, which move by the cards in view. The arrows show only when the row overflows;
// at either end an arrow is dimmed (aria-disabled) instead of removed, so nothing shifts and the
// focus stays on it.
(function () {
  document.querySelectorAll("[data-card-slider]").forEach(function (root) {
    var track = root.querySelector("[data-slider-track]");
    var nav = root.querySelector("[data-slider-nav]");
    var prev = root.querySelector("[data-slider-prev]");
    var next = root.querySelector("[data-slider-next]");
    if (!track || !nav || !prev || !next) return;

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      nav.hidden = max <= 1;
      prev.setAttribute("aria-disabled", track.scrollLeft <= 1 ? "true" : "false");
      next.setAttribute("aria-disabled", track.scrollLeft >= max - 1 ? "true" : "false");
    }

    // By as many cards as fit in view, at least one. The target is clamped to the ends: with
    // mandatory snapping, Chrome ignores a smooth scroll that would go past the end.
    function step(direction) {
      var style = getComputedStyle(track);
      var gap = parseFloat(style.columnGap) || 0;
      var view = track.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      var card = track.firstElementChild.getBoundingClientRect().width + gap;
      var perView = Math.max(1, Math.floor((view + gap) / card + 0.01));
      var max = track.scrollWidth - track.clientWidth;
      var target = Math.min(max, Math.max(0, track.scrollLeft + direction * perView * card));
      track.scrollTo({ left: target, behavior: "smooth" });
    }

    prev.addEventListener("click", function () {
      if (prev.getAttribute("aria-disabled") !== "true") step(-1);
    });
    next.addEventListener("click", function () {
      if (next.getAttribute("aria-disabled") !== "true") step(1);
    });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();
