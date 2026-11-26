# frozen_string_literal: true

# Per-language URLs on top of jekyll-polyglot: Czech URLs on the Czech site, English ones on the
# English site. The section paths live in _data/urls.yml.
module Jekyll
  module LocalizedUrls
    # jekyll-datapage-generator output dir (page_gen in _config.yml) => _data/urls.yml section
    DATA_SECTIONS = {
      'services' => 'services',
      'use-cases' => 'use_cases',
      'glossary' => 'glossary'
    }.freeze

    # Path of a data record (services.yml, use_cases.yml, glossary.yml) in a language, without the
    # language prefix: the section path from _data/urls.yml plus the record's slug, or its Czech
    # slug (lang.cs.slug) where it has one.
    def self.record_path(site, record, section, lang)
      slug = record.dig('lang', lang, 'slug') || record['slug']
      "#{site.data['urls'][section][lang]}#{slug}/"
    end
  end

  # Data pages: jekyll-datapage-generator writes every record to the same dir in both builds
  # (services/<slug>/) and runs after polyglot has paired the pages, so it is done here. Each data
  # page gets its URL in the build's language and permalink_lang for the lang_url filter. In the
  # Czech build the old URL redirects to the new one (/services/<slug>/ -> /sluzby/<czech-slug>/).
  class LocalizedDataPages < Generator
    priority :lowest

    def generate(site)
      lang = site.active_lang
      redirects = []
      site.pages.each do |page|
        next unless page.is_a?(DataPage)

        dir = page.dir.split('/').reject(&:empty?).first
        section = LocalizedUrls::DATA_SECTIONS[dir]
        next unless section

        paths = site.languages.to_h do |l|
          [l, LocalizedUrls.record_path(site, page.data, section, l)]
        end
        page.data['permalink_lang'] = paths
        page.data['permalink'] = paths[lang]
        page.instance_variable_set(:@url, nil)

        old_path = "/#{dir}/#{page.data['slug']}/"
        if lang == site.default_lang && old_path != paths[lang]
          redirects << JekyllRedirectFrom::RedirectPage.redirect_from(page, old_path)
        end
      end
      site.pages.concat(redirects)
    end
  end

  # Czech post URLs from _data/post_slugs.yml (page_id => slug). The Czech Markdown keeps the slug
  # it shares with its English translation, because n8n translates every change to a Czech post
  # again. Runs before polyglot pairs the posts, so the pairing sees the Czech permalink.
  Hooks.register :site, :post_read, priority: :high do |site|
    slugs = site.data['post_slugs'] || {}
    blog_path = site.data['urls']['blog'][site.default_lang]
    site.posts.docs.each do |post|
      next unless post.data['lang'] == site.default_lang

      slug = slugs[post.data['page_id']]
      next unless slug

      post.data['permalink'] = "#{blog_path}#{slug}/"
      post.instance_variable_set(:@url, nil)
    end
  end

  # Pages and posts: the Czech and the English file share a page_id and set their own permalink.
  # After reading the site, polyglot gives each one permalink_lang and a redirect_from with the
  # other language's permalink. In the Czech build that redirect is exactly the old Czech URL
  # (/contact/ -> /kontakt/). In the English build it would add pages like /en/kontakt/ that send
  # visitors to the Czech site and never existed, so they are dropped there.
  Hooks.register :site, :post_read, priority: :low do |site|
    next if site.active_lang == site.default_lang

    (site.pages + site.posts.docs).each do |doc|
      doc.data.delete('redirect_from') if doc.data['page_id']
    end
  end
end
