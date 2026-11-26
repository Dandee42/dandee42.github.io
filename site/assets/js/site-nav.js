// Full-screen mobile menu (site-header.html): opens from the menu button, closes with its close
// button, a link inside it, Escape, or when the window grows to the desktop layout.
(function () {
  var menu = document.querySelector("[data-mobile-menu]");
  var openButton = document.querySelector("[data-menu-open]");
  if (!menu || !openButton) return;

  var desktop = window.matchMedia("(min-width: 1024px)");

  function focusables() {
    return menu.querySelectorAll("a[href], button");
  }

  function open() {
    menu.hidden = false;
    document.body.classList.add("menu-open");
    openButton.setAttribute("aria-expanded", "true");
    var first = focusables()[0];
    if (first) first.focus();
  }

  function close(returnFocus) {
    if (menu.hidden) return;
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    openButton.setAttribute("aria-expanded", "false");
    if (returnFocus) openButton.focus();
  }

  openButton.addEventListener("click", open);

  // A link closes the menu before the browser follows it, so an anchor like #contact-form can scroll
  menu.addEventListener("click", function (event) {
    if (event.target.closest("[data-menu-close]")) close(true);
    else if (event.target.closest("a")) close(false);
  });

  document.addEventListener("keydown", function (event) {
    if (menu.hidden) return;
    if (event.key === "Escape") {
      close(true);
    } else if (event.key === "Tab") {
      // Keep the focus inside the open menu
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  desktop.addEventListener("change", function (event) {
    if (event.matches) close(false);
  });
})();
