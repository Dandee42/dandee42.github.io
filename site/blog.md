---
layout: page
page_id: blog
lang: cs
title: Blog
permalink: /blog/
description: "Blog Daniela Hladíka. Zápisky ze stavění produktů s AI: vlastní projekty, návody a zkušenosti z vývoje a automatizace."
lead: "Zápisky ze stavění produktů s AI: vlastní projekty, návody a zkušenosti z vývoje a automatizace."
width: wide
pagination:
  enabled: true
  offset: 1 # the newest post is the large card on page 1 (post-list.html featured=true)
published: true
---
{% assign trans = site.data[site.active_lang].blog %}

<div class="page-head page-head--split">
  <div class="page-head__text">
    <h1>Blog</h1>
    <p class="page-lead">{{ page.lead }}</p>
  </div>
  {% include search-input.html %}
</div>
{% if site.posts.size > 0 %}
  {% include post-list.html slider=true featured=true %}
  {% include pagination.html %}
{% else %}
  <p>{{ trans.empty_blog }}</p>
{% endif %}
