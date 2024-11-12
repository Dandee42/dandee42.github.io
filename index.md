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

Pokud Vás zaujala má cesta nebo máte zájem o spolupráci, neváhejte mě kontaktovat.

<section class="contact-section">
  <div class="contact-intro">
    <h2 class="contact-title">Get in Touch</h2>
    <p class="contact-description">
      Fill out the form below and we'll get back to you as soon as possible.
    </p>
  </div>

  <form class="contact-form" action="https://api.web3forms.com/submit" method="POST">

    <input type="hidden" name="access_key" value="9cc9bff3-11a1-41eb-be20-521101ac2e1f" />
    <input type="hidden" name="subject" value="New Contact Form Submission from Web3Forms" />
    <input type="hidden" name="from_name" value="My Website" />
    <!-- More custom ization options available in the docs: https://docs.web3forms.com -->

    <div class="form-group-container">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input id="name" name="name" class="form-input" placeholder="Your name" type="text" />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input id="email" name="email" class="form-input" placeholder="Your email" type="email" />
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">Phone</label>
        <input id="phone" name="phone" class="form-input" placeholder="+1 (234) 56789" type="text" />
      </div>
      <div class="form-group">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-textarea" id="message" name="message" placeholder="Your message"></textarea>
      </div>
    </div>
    <button class="form-submit" type="submit">Send Message</button>
  </form>

</section>


<form action="https://api.web3forms.com/submit" method="POST">

  <!-- REQUIRED: Your Access key here. Don't worry this can be public -->
  <input type="hidden" name="access_key" value="9cc9bff3-11a1-41eb-be20-521101ac2e1f">

  <!-- Optional: Subject an be prefilled using type="hidden"
       or type="text" for normal user submitted input -->
  <input type="hidden" name="subject" value="Nová zpráva">

  <!-- Optional: From Name you want to see in the email
       Default is "Notifications". you can overwrite here -->
  <input type="hidden" name="from_name" value="daniel-hladik.cz">

  <!-- Optional: Custom Redirection or Thank you Page
       Make sure you add full URL including https:// -->
  <input type="hidden" name="redirect" value="{{ site.url }}/form-success/">

  <!-- Optional: But Recommended: To Prevent SPAM Submission.
       Make sure its hidden by default -->
  <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
  
   <!-- hCaptcha: Recommended for Advanced Spam Protection. -->
  <div class="h-captcha" data-captcha="true"></div>

  <!-- Custom Form Data: Form data you wish to receive in email. -->
  <input type="email" name="Email" required>
  <input type="text" name="Jméno" required>
  <textarea name="Zpráva" required></textarea>

  <button type="submit">Odeslat</button>

</form>



<form
  action="https://formspree.io/f/xkgnbbwo"
  method="POST"
>
  <label>
    Váš email:
    <input type="email" name="email">
  </label>
  <label>
    Zpráva:
    <textarea name="message"></textarea>
  </label>
  <!-- your other form fields go here -->
  <input type="hidden" name="_redirect" value="{{ site.url }}/form-success/">
  <button type="submit">Odeslat</button>
</form>

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
