---
layout: page
page_id: blog
lang: en
title: Blog EN
permalink: /blog/
description: EN description
pagination:
  enabled: true
published: true
---

{% include side-images.html %}
<h1>Blog EN</h1>
{% if site.posts.size > 0 %}
  {% include search-input.html %}
  {% include post-list.html %}
  {% include pagination.html %}
{% else %}
  <p>V tuto chvíli tu není nic, co by stálo za čtení. Zkuste později!</p>
{% endif %}