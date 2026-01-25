(function () {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  const bodyLang = document.body.dataset.lang; // doporučené
  const path = window.location.pathname;
  const lang = bodyLang || (path.startsWith("/en/") ? "en" : "cs");

  const translations = {
    cs: {
      successRedirect: "https://daniel-hladik.cz/form-success/",
      errorSend: "Odeslání formuláře selhalo. Zkuste to prosím znovu.",
      errorConnection: "Něco se nepovedlo! Zkontrolujte Vaše připojení k internetu a zkuste to prosím později."
    },
    en: {
      successRedirect: "https://daniel-hladik.cz/en/form-success/",
      errorSend: "Form submission failed. Please try again.",
      errorConnection: "Something went wrong! Check your internet connection and try again later."
    }
  };

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.querySelectorAll(":invalid")[0].focus();
        } else {
          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              if (response.status == 200) {
                window.location.href = translations[lang].successRedirect;
              } else {
                console.log(response);
                alert(translations[lang].errorSend);
              }
            })
            .catch((error) => {
              console.log(error);
              alert(translations[lang].errorConnection);
            })
            .finally(() => {
              form.reset();
              form.classList.remove("was-validated");
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();