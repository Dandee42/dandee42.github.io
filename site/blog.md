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
{% assign trans = site.data[site.active_lang].blog %}

{% include side-images.html %}
<h1>Blog</h1>
{% if site.posts.size > 0 %}
  {% include search-input.html %}
  {% include post-list.html %}
  {% include pagination.html %}
{% else %}
  <p>{{ trans.empty_blog }}</p>
{% endif %}