(function () {
    "use strict";
  
    const forms = document.querySelectorAll(".needs-validation");
  
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.querySelectorAll(":invalid")[0].focus();
          } else {
            // Zpracování odeslání formuláře přes fetch()
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
                  // Přesměrování na specifikovanou stránku po úspěšném odeslání
                  window.location.href = "https://daniel-hladik.cz/form-success/";
                } else {
                  console.log(response);
                  alert("Odeslání formuláře selhalo. Zkuste to prosím znovu.");
                }
              })
              .catch((error) => {
                console.log(error);
                alert("Něco se nepovedlo! Zkuste to prosím později.");
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