// Reading progress of a post, shown as a bar at the bottom edge of the sticky header
// (site-header.html). It measures the post's text (.post-content), not the whole page.
(function () {
  var bar = document.querySelector("[data-reading-progress]");
  var content = document.querySelector(".post-content");
  if (!bar || !content) return;

  var scheduled = false;

  function update() {
    scheduled = false;
    var rect = content.getBoundingClientRect();
    var total = rect.height - window.innerHeight * 0.6;
    var read = -rect.top + window.innerHeight * 0.2;
    var progress = total > 0 ? Math.min(Math.max(read / total, 0), 1) : 1;
    bar.style.transform = "scaleX(" + progress + ")";
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
