document.addEventListener("DOMContentLoaded", function() {
  const headings = document.querySelectorAll("h2, h3, h4");

  headings.forEach(heading => {
    if (heading.id) {
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.className = "heading-link";
      link.innerHTML = `<img src="/assets/files/images/link-45deg.svg" alt="Odkaz na nadpis" width="16" height="16">`; // může být i SVG ikonka

      link.addEventListener("click", function(e) {
        e.preventDefault();
        const url = window.location.origin + window.location.pathname + `#${heading.id}`;
        navigator.clipboard.writeText(url).then(() => {
          // volitelně můžeš ukázat tooltip nebo alert
          console.log("Zkopírováno: " + url);
        });
      });

      heading.appendChild(link);
    }
  });
});
