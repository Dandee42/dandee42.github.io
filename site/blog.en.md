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
{% assign trans = site.data[site.active_lang].blog %}

{% include side-images.html %}
<h1>Blog EN</h1>
{% if site.posts.size > 0 %}
  {% include search-input.html %}
  {% include post-list.html %}
  {% include pagination.html %}
{% else %}
  <p>{{ trans.empty_blog }}</p>
{% endif %}