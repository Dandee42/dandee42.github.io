const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Vytvoření objektu s hodnotami formuláře
  const formData = new FormData(form);
  let isEmpty = false;  // Kontrola, zda jsou pole prázdná
  var object = {};

  formData.forEach((value, key) => {
    object[key] = value;
    // Pokud je hodnota prázdná, nastavíme isEmpty na true
    if (!value.trim()) {
      isEmpty = true;
    }
  });

  if (isEmpty) {
    result.innerHTML = "Prosím, vyplňte všechna pole.";  // Zpráva o prázdných polích
    result.classList.remove("text-green-500");
    result.classList.add("text-red-500");
    return;  // Zastavení odesílání, pokud je pole prázdné
  }

  // Převod dat do JSON formátu
  const json = JSON.stringify(object);
  result.innerHTML = "Odesílám...";

  // Odeslání dat na server
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500", "text-red-500");
        result.classList.add("text-green-500");
      } else {
        console.log("Response error:", response);
        result.innerHTML = json.message || "Došlo k chybě.";
        result.classList.remove("text-gray-500", "text-green-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      result.innerHTML = "Něco se pokazilo! Zkuste to prosím znovu.";
      result.classList.remove("text-gray-500", "text-green-500");
      result.classList.add("text-red-500");
    })
    .finally(() => {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});