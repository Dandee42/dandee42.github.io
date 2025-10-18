---
layout: page
page_id: blog
lang: en
title: Blog
permalink: /blog/
description: "Practical tips, inspiration, and advice from the world of technology, productivity, and personal development—for anyone who wants to improve their skills and lifestyle."
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