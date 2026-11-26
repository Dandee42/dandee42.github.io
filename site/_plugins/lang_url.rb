# frozen_string_literal: true

# Language-aware URLs for jekyll-polyglot, where a page can have a different permalink per
# language (Czech URLs on the Czech site, English ones on the English site).
#
#   {{ page | lang_url: "en" }}       => "/en/contact/"   the page in English
#   {{ page | lang_url: "cs" }}       => "/kontakt/"      the page in Czech
#   {{ "/sluzby/" | lang_url: "cs" }} => "/sluzby/"       a path, prefixed for non-default languages
#
# For a page it takes the language's permalink from permalink_lang. Polyglot fills it for pages
# and posts that share a page_id, and _plugins/localized_urls.rb for the data pages. Pages
# without it (blog pagination, tag pages, 404) have the same path in every language.
#
# The result is a site-relative path. In the English build polyglot rewrites href="/..." to
# href="/en/...", so a Czech URL written into an href there needs protecting (see
# language-switcher.html); absolute URLs in canonical and hreflang="cs" links are left alone.
module Jekyll
  module LangUrlFilter
    def lang_url(input, lang)
      site = @context.registers[:site]
      lang = lang.to_s
      path =
        if input.is_a?(String)
          input
        else
          links = input['permalink_lang']
          (links.is_a?(Hash) && links[lang]) || input['url']
        end
      path = path.to_s.sub(%r{index\.html\z}, '')
      path = "/#{path}" unless path.start_with?('/')
      lang == site.default_lang ? path : "/#{lang}#{path}"
    end

    # URL of a data record's page (services.yml, use_cases.yml, glossary.yml) in a language, with
    # the Czech slug on the Czech site: {{ service | record_url: "services", lang }}.
    def record_url(record, section, lang)
      site = @context.registers[:site]
      lang_url(LocalizedUrls.record_path(site, record, section.to_s, lang.to_s), lang)
    end
  end
end

Liquid::Template.register_filter(Jekyll::LangUrlFilter)
