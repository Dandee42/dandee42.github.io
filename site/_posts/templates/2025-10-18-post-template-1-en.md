---
layout: post
lang: en
page_id: template-post
title: Template post EN
description: A short post to demonstrate the layout description.
lead: A short post to demonstrate the layout.
slug: /template-post-slug
reading_time: 8 min
image: /assets/files/photo.png
category: 
tags: [jekyll, template-tag, tips]
published: false
---

Insert HERO images in ratio 16:9 (1600×900 px) - 400–600 KB

LinkedIn feed images in ratio 1.91:1 (1200 × 627px) - ≤300 KB

Facebook feed images in ratio 1.91:1 (1200 × 630px) - ≤300 KB

- toc
{: toc }


This is a Jekyll (Liquid) comment that is not generated at all.

## Typography examples:
Introductory paragraph of text. Here you can write in normal Czech, **fat**, _cursive_.

## Links 
[Click here](https://example.com).

---

## Subtitle (level 2)
### Subtitle (level 3)

Here you can continue the text. For example, a list:

- First entry
- Second item
- Third item

Or a numbered list:

1. Step One
2. Step two
3. Step three

---

## Abbreviation

**<abbr title="Retrieval-Augmented Generation – metoda dodávající AI vaše data.">RAG</abbr>**

## Quotes and alerts

> "_This is a sample quote._"

> **Pozor**
> _Tohle je varování pro čtenáře._
{: .alert .alert-warning }

> **Info**
> _Nějaká doplňující informace._
{: .alert .alert-info }

> **Nápad**
> _Zajímavý tip nebo myšlenka._
{: .alert .alert-idea }


> **Úspěch**
> _Něco se povedlo._
{: .alert .alert-success }

> **Chyba**
> _Tohle je chyba._
{: .alert .alert-error }

---

## Images

- Insert post images in ratio 4:3 - width 800–1200px - 100–300 KB

This is image with light box effect.
![Image caption](/assets/files/photo.png){: .post-image }

This is image without light box effect.
![Image caption](/assets/files/photo.png)
---

## Inline code
The text contains `short_code`.

## Code block
<pre><code>
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
</code></pre>