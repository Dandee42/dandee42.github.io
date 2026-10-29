---
layout: page
page_id: blog
lang: cs
title: Blog
permalink: /blog/
description: "Blog Daniela Hladíka. Zápisky ze stavění produktů s AI: vlastní projekty, návody a zkušenosti z vývoje a automatizace."
pagination:
  enabled: true
published: true
---
{% assign trans = site.data[site.active_lang].blog %}

<h1>Blog</h1>
{% if site.posts.size > 0 %}
  {% include search-input.html %}
  {% include post-list.html %}
  {% include pagination.html %}
{% else %}
  <p>{{ trans.empty_blog }}</p>
{% endif %}