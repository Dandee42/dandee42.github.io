---
layout: post
lang: cs
page_id: template-post
title: Template post CS
description: A short post to demonstrate the layout description.
lead: A short post to demonstrate the layout.
slug: /template-post-slug
reading_time: 8 min
image: /assets/files/photo.png
category: 
tags: [jekyll, template-tag, tips]
published: false
---

Insert images in size 1200 × 630 px

- toc
{: toc }


> **Pozor**
> Tohle je varování pro čtenáře.
{: .alert .alert-warning }

> **Info**
> Nějaká doplňující informace.
{: .alert .alert-info }

> **Nápad**
> Zajímavý tip nebo myšlenka.
{: .alert .alert-idea }


> **Úspěch**
> Něco se povedlo.
{: .alert .alert-success }

> **Chyba**
> Tohle je chyba.
{: .alert .alert-error }


This is a Jekyll (Liquid) comment that is not generated at all.


Introductory paragraph of text. Here you can write in normal Czech, **fat**, _cursive_ or even [links](https://example.com).

---

## Subtitle (level 2)

Here you can continue the text. For example, a list:

- First entry
- Second item
- Third item

Or a numbered list:

1. Step One
2. Step two
3. Step three

---

## Quote

> "This is a sample quote."

---

## Image

![Image caption](/assets/files/images/photo..png)

---

### Inline code
The text contains `short_code`.

<pre>
// Funkce, která generuje náhodné číslo mezi min a max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pole jmen
const names = ["Alice", "Bob", "Charlie", "Dana", "Eli"];

// Vyber náhodné jméno a číslo
const randomName = names[getRandomNumber(0, names.length - 1)];
const randomScore = getRandomNumber(0, 100);

console.log(`Uživatel ${randomName} získal ${randomScore} bodů.`);

// Asynchronní funkce pro simulaci čekání
async function simulateWait(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

(async () => {
  console.log("Čekám 2 sekundy...");
  await simulateWait(2);
  console.log("Hotovo!");
})();
</pre>