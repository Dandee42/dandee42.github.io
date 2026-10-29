---
layout: page
page_id: blog
lang: en
title: Blog
permalink: /blog/
description: "Daniel Hladik's blog. Notes from building products with AI: my own projects, how-to guides and lessons from development and automation."
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