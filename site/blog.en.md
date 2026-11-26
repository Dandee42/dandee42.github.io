---
layout: page
page_id: blog
lang: en
title: Blog
permalink: /blog/
description: "Daniel Hladik's blog. Notes from building products with AI: my own projects, how-to guides and lessons from development and automation."
lead: "Notes from building products with AI: my own projects, how-to guides and lessons from development and automation."
width: wide
pagination:
  enabled: true
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
