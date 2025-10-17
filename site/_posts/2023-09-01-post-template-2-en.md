---
layout: post
lang: en
page_id: template-post-2
title: Template post EN 2
slug: template-post-slug-2
lead: A short post to demonstrate the layout.
description: A short post to demonstrate the layout description.
reading_time: 8 min
image: /assets/files/photo.png
category:
tags: [jekyll-en, blog-en, tips]
published: true
---
EN Vkládat obrázky ve velikosti 1200 × 630 px

- toc
{: toc }

<!-- Toto je HTML komentář, vygeneruje se do HTML -->

{% comment %}
Toto je Jekyll (Liquid) komentář, který se vůbec nevygeneruje.
{% endcomment %}

Úvodní odstavec textu. Tady můžeš psát normálně česky, **tučně**, _kurzíva_ nebo i [odkazy](https://example.com).

---

## Podnadpis (úroveň 2)

Tady můžeš pokračovat v textu. Například seznam:

- První položka
- Druhá položka
- Třetí položka

Nebo očíslovaný seznam:

1. Krok první
2. Krok druhý
3. Krok třetí

---

## Citace

> „Toto je ukázková citace.“

---

## Obrázek

![Popisek obrázku](/assets/files/images/photo.png)

---

### Inline kód
Text obsahuje `krátký_kód`.
