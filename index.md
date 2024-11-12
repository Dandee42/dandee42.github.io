---
layout: home
title: Home
---


# Můžete mi říkat Dan.
Od začátku roku 2024 procházím intenzivním rekvalifikačním přerodem z online markeťáka do IT světa. Mým cílem je zaměřit se na pozice junior QA testera webových aplikací, junior vývojáře webových aplikací v Pythonu, nebo podobné role, kde bych mohl využít Python jako programovací jazyk. Mám již zkušenosti s testováním a vývojem e-shopu, které mi poskytly solidní základy pro tuto změnu kariéry.

## Co ovládám?
- ✅ HTML5
- ✅ CSS3
- ✅ SQL
- ✅ Python
- ✅ Základy JavaScriptu
- <div>loading<span class="dots"></span></div>

Více detailů najdete v [mém CVčku](https://flowcv.com/resume/osrniic0ww).

</br>

<section class="contact-section">
  <div class="contact-intro">
    <h2>Zanechte mi zprávu</h2>
    <p class="contact-description">
      Pokud Vás zaujala má cesta nebo máte zájem o spolupráci, neváhejte mě kontaktovat.
    </p>
  </div>

  <!-- Formulář pro odeslání zprávy -->
  <form class="contact-form needs-validation" id="form" action="https://api.web3forms.com/submit" method="POST" novalidate>
    <!-- Skryté hodnoty pro Web3Forms -->
    <input type="hidden" name="access_key" value="9cc9bff3-11a1-41eb-be20-521101ac2e1f" />
    <input type="hidden" name="subject" value="Nová zpráva přes kontaktní formulář" />
    <input type="hidden" name="from_name" value="daniel-hladik.cz" />
    <input type="hidden" name="redirect" value="{{ site.url }}/form-success/" />
    <input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

    <div class="form-group-container">
      <!-- Jméno -->
      <div class="form-group">
        <label for="name" class="form-label">Jméno</label>
        <input id="name" name="name" class="form-input" placeholder="Vaše jméno" type="text" required />
        <div class="empty-feedback invalid-feedback">
          Prosím zadejte svoje jméno, abych věděl, jak Vás příště oslovit :)
        </div>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input id="email" name="email" class="form-input" placeholder="napiste@email.cz" type="email" required />
        <div class="empty-feedback">
            Prosím vyplňte svou emailovou adresu.
        </div>
        <div class="invalid-feedback">
            Možná to byl jen překlep, ale Váš email není validní pro odeslání. Dodržte prosím formát: "email@domena.cz"
        </div>
      </div>

      <!-- Zpráva -->
      <div class="form-group">
        <label for="message" class="form-label">Zpráva</label>
        <textarea class="form-textarea" id="message" name="message" placeholder="Napište mi zprávu sem" required></textarea>
        <div class="empty-feedback invalid-feedback">
            Prosím vyplňte pole se zprávou.
        </div>
      </div>


      <!-- Tlačítko Odeslat -->
      <div class="form-group">
        <button class="form-submit" type="submit">Odeslat</button>
      </div>
    </div>

    <p class="text-center text-gray-500 mt-4" id="result"></p>
  </form>
</section>

<script src="/assets/js/contact-form.js" defer></script>


<!--
<p class="text-center">
<a href="mailto:info@daniel-hladik.cz?subject=Pozor! Tento e-mail obsahuje 100% dobré zprávy&body=Dejte mi vědět, co máte na srdci :)" class="button">Kontaktovat emailem</a>
</p>
-->
<!--
# About

<ul>
    <li><a href="{{ site.baseurl }}/about/page">Page</a></li>
    <li><a href="{{ site.baseurl }}/cv">CV</a></li>
</ul>


Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaa.

This is the home page. It can be used for a short introduction. [Click here](cv) to see the full CV, and [here](assets/files/cv.pdf) to download a print version. The theme also ships with a blog: [click here](posts) to scroll posts from the most recent. Finally, [click here](404) to see a page that can't be found.

By default, the theme only contains these few pages in order to stay lean and flexible. However, it can be easily extended to accommodate more pages, [collections](https://jekyllrb.com/docs/collections/), [categories, and tags](https://jekyllrb.com/docs/posts/#tags-and-categories).

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Below is a list of blog posts included for illustrative purposes. Make sure to delete or modify them before deploying your website.

{% include archive.html %}
-->
