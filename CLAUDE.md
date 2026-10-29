# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Bilingual (Czech default, English secondary) Jekyll personal/business site for Daniel Hladík, served at https://daniel-hladik.cz. There is no test suite or linter; "verifying" a change means building the site and checking the output in both languages.

## Commands

The config lives at the repo root, but `_config.yml` sets `source: site`. All content, layouts, includes, data and assets are under `site/`, and the root `_posts/` directory is **not** built (it only holds a template).

```bash
# Local dev via Docker (Ruby is not installed on this machine). Serves http://localhost:4000
docker compose up

# With Ruby/Bundler installed (CI uses Ruby 3.2, Bundler 2.5.22)
bundle install
bundle exec jekyll serve      # dev server
bundle exec jekyll build      # output to _site/
```

`parallel_localization` must stay `false`, because it does not work on Windows.

The `bretfisher/jekyll-serve` image runs `bundle install` on every start, and this rewrites the tracked `Gemfile.lock`: it adds the `x86_64-linux` platform and drops `wdm`, which is Windows-only. Don't commit that diff by accident.

`docker compose up` stays in the foreground after `Server running...` and reports each auto-regeneration once per language. That is normal, not a loop. Use `docker compose up -d` plus `docker compose logs -f` to run it in the background.

## Branches and deployment

- Work happens on `develop` and is merged into `production`. Both branches build through `.github/workflows/build_deploy.yml`.
- A push to `production` deploys `_site` to the `production-gh-pages` branch (live site; `site/CNAME`). A push to `develop` deploys to `develop-gh-pages` (preview).
- `automated-translations` is a branch where machine-translated `*-en.md` posts are committed by an external process.

## Architecture

### i18n with jekyll-polyglot

- `languages: ["cs", "en"]`, `default_lang: "cs"`. Polyglot builds the site once per language. Czech is served at `/`, English at `/en/`.
- **Pages and posts come in pairs:** `foo.md` + `foo.en.md` (pages), or `YYYY-MM-DD-name-cs.md` + `YYYY-MM-DD-name-en.md` (posts). Both files share the same `page_id`, the same `permalink`/`slug`, and set `lang: cs` / `lang: en`.
- **UI strings** live in `site/_data/cs/*.yml` and `site/_data/en/*.yml` with identical key structures. Templates read them via `{% assign trans = site.data[site.active_lang] %}` and then `trans.<file>.<key>`. When you add a key, add it to both languages.
- Language-aware URLs are built by hand throughout includes. The pattern is: if `lang == site.default_lang` use the path as-is, otherwise prefix `/{{ lang }}`. Polyglot also auto-prefixes absolute `href="/..."` links in the EN build. To stop that, add a leading space inside the href (see `site/_includes/language-switcher.html`).
- `exclude_from_localization` lists assets and sitemaps, which are emitted only once.

### Data-driven pages (jekyll-datapage-generator)

Services, use cases and the AI glossary are **YAML records, not markdown files**. `page_gen` in `_config.yml` maps:

| Data file | Layout | Output dir |
|---|---|---|
| `site/_data/services.yml` | `service.html` | `/services/<slug>/` |
| `site/_data/use_cases.yml` | `use-case.html` | `/use-cases/<slug>/` |
| `site/_data/glossary.yml` | `glossary-term.html` | `/glossary/<slug>/` |

Each record has shared fields (`page_id`, `type`, `slug`, `date`, `published`, `icon`, and for services/use cases `show_in_list`, `related_posts`, `related_use_cases`). It also has a `lang:` map with `cs:` and `en:` subtrees holding `title`, `description`, `text` (raw HTML) and so on. Layouts render via `page.lang[lang].<field>`. Only `published: true` records generate pages. Glossary records also carry `term` and `categories`. Category labels come from `datapages_glossary.categories` in the per-language data files.

Inside the HTML `text`, cross-links to other glossary terms are hardcoded per language: `/glossary/<slug>/` in `cs` and `/en/glossary/<slug>/` in `en`.

The index pages (`services.md`, `use-cases.md`, `glossary.md` + `.en.md`) are thin front-matter stubs. Their layouts (`services.html`, `use-cases.html`, `glossary.html`) iterate `site.data.<collection>` directly.

`site/_includes/head-seo-lang.html` branches on `page.layout == "post"` vs `page.type` (`service` / `use-case` / `glossary`) vs everything else. It emits the canonical URL, the hreflang alternates, OG tags and JSON-LD. A new page type needs a branch there.

### Blog posts

- `permalink: /blog/:slug/`, so the front-matter `slug` determines the URL. Front matter used by the layouts: `layout: post`, `lang`, `page_id`, `title`, `description`, `lead`, `slug`, `reading_time`, `image` (1200×630, under `/assets/files/images/posts/<post-name>/`), `category`, `tags`, `published`.
- Use `- toc\n{: toc }` (kramdown) for a table of contents.
- Glossary tooltips: `<abbr title="Term: short definition" data-glossary="<glossary-slug>">Term</abbr>`. `post-abbr-tooltip.html` turns these into hover tooltips or a bottom sheet with a link to the glossary entry.
- Templates in `site/_posts/templates/` are `published: false`. Copy `2025-10-18-post-template-1-{cs,en}.md` when starting a new post.
- Autopages generate `/tag/:tag/` and `/:cat/`. jekyll-paginate-v2 paginates `/blog/` at 3 per page.
- `search-cs.json` / `search-en.json` (layout `search.html`) produce per-language post indexes for client-side search. `sitemap.xml` is an index pointing at `sitemap_cs.xml` / `sitemap_en.xml` (layout `sitemap.xml`). Set `sitemap: false` in front matter to exclude a page.

### Theme and assets

- The `cvless` gem is installed mainly for its Jekyll and plugin dependencies. All layouts, includes and SCSS used by the site are local copies under `site/`, so edit those directly.
- Styles: `site/assets/css/styles.min.scss` `@use`s the partials in `site/_sass/`. Theme colours are CSS custom properties in `_variables.scss`, switched via `html[data-theme="light"|"dark"]`. The inline script in `head.html` sets the theme and `darkmode.js` toggles it. Bootstrap and Open Color are vendored as minified CSS.
- Material Symbols icon names are used for the `icon` field on data records.
- Third-party embeds: an n8n chat widget on every page (`n8n-chat.html`, per-language config), GA4 (`google_analytics` in config), and booking links (zapti.me for CS, Calendly for EN) hardcoded in `service.html`, `use-case.html` and `schedule-meeting-link.html`.
- The site-wide alert banner is toggled in `_config.yml` (`alert:`). Its text lives in `_data/<lang>/general.yml` under `alert.message`.
