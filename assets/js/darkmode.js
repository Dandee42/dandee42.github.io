var moon =
  '<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
var sun =
  '<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 11.507a9.493 9.493 0 0018 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 003 11.507z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

// Pages without the toggle (bare pages) still get the theme from the inline script in head.html
function setToggleIcon(icon) {
  var toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.innerHTML = icon;
}

let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)");
let theme = sessionStorage.getItem("theme");

if (systemInitiatedDark.matches) {
  setToggleIcon(sun);
} else {
  setToggleIcon(moon);
}

function prefersColorTest(systemInitiatedDark) {
  if (systemInitiatedDark.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    setToggleIcon(sun);
    sessionStorage.setItem("theme", "");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    setToggleIcon(moon);
    sessionStorage.setItem("theme", "");
  }
}
systemInitiatedDark.addEventListener("change", function (event) {
  prefersColorTest(event.target);
});

function modeSwitcher() {
  let theme = sessionStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    sessionStorage.setItem("theme", "light");
    setToggleIcon(moon);
  } else if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    sessionStorage.setItem("theme", "dark");
    setToggleIcon(sun);
  } else if (systemInitiatedDark.matches) {
    document.documentElement.setAttribute("data-theme", "light");
    sessionStorage.setItem("theme", "light");
    setToggleIcon(moon);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    sessionStorage.setItem("theme", "dark");
    setToggleIcon(sun);
  }
}

if (theme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  sessionStorage.setItem("theme", "dark");
  setToggleIcon(sun);
} else if (theme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  sessionStorage.setItem("theme", "light");
  setToggleIcon(moon);
}
