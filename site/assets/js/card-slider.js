// Cards in one row that scrolls sideways (swipe, trackpad or the arrow buttons), such as the related
// posts under a post. The arrows show only where there is more to scroll to, and move by one card.
(function () {
  document.querySelectorAll("[data-card-slider]").forEach(function (root) {
    var track = root.querySelector("[data-slider-track]");
    var prev = root.querySelector("[data-slider-prev]");
    var next = root.querySelector("[data-slider-next]");
    if (!track || !prev || !next) return;

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.hidden = !(track.scrollLeft > 1);
      next.hidden = !(max > 1 && track.scrollLeft < max - 1);
    }

    function step(direction) {
      var card = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
    }

    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();
