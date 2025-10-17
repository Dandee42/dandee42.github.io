---
layout: page
page_id: blog
lang: cs
title: Blog
permalink: /blog/
description: CS description
pagination:
  enabled: true
published: true
---

{% include side-images.html %}
<h1>Blog</h1>
{% if site.posts.size > 0 %}
  {% include search-input.html %}
  {% include post-list.html %}
  {% include pagination.html %}
{% else %}
  <p>V tuto chvíli tu není nic, co by stálo za čtení. Zkuste později!</p>
{% endif %}