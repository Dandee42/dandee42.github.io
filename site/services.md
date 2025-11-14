---
layout: page
page_id: services
lang: cs
permalink: /services/
title: Služby
description: Nabízím automatizace do každé firmy
published: true
---
{% assign lang = site.active_lang | default: site.default_lang %}

# Jaké jsou moje služby?

<ul>
{% for service in site.data.services %}
  {% if service.published and service.show_in_list %}
    {% if lang == site.default_lang %}
        {% assign full_url = site.url | append: clean_url %}
    {% else %}
        {% assign full_url = site.url | append: '/' | append: lang | append: clean_url %}
    {% endif %}
    <li>
      <a href="{{ full_url }}/services/{{ service.slug }}"><h2>{{ service.lang[lang].title }}</h2></a>
      <p>{{ service.lang[lang].description }}</p>
      <a href="{{ full_url }}/services/{{ service.slug }}">Zjistit více</a>
    </li>
  {% endif %}
{% endfor %}
</ul>
