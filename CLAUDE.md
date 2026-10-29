# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Bilingual (Czech default, English secondary) Jekyll personal/business site for Daniel Hladík, served at https://daniel-hladik.cz. There is no test suite or linter. The only automated check is html-proofer in CI (internal links and images). Otherwise, "verifying" a change means building the site and checking the output in both languages.

## Commands

The config lives at the repo root, but `_config.yml` sets `source: site`. All content, layouts, includes, data and assets are under `site/`, and the root `_posts/` directory is **not** built (it only holds a template).

```bash
# Local dev via Docker (Ruby is not installed on this machine). Serves http://localhost:4000
docker compose up

# With Ruby/Bundler installed (CI uses Ruby 4.0 like the Docker image; Bundler 2.5.22 from the lockfile)
bundle install
bundle exec jekyll serve      # dev server
bundle exec jekyll build      # output to _site/

# Link check exactly as CI runs it: production build into /tmp, then html-proofer.
# The Docker image lacks libcurl (html-proofer needs it), so install it once per container.
docker compose exec cvless sh -c "apt-get update -qq && apt-get install -y -qq libcurl4t64"
docker compose exec -e JEKYLL_ENV=production cvless sh -c "bundle exec jekyll build -d /tmp/prodbuild && bundle exec htmlproofer /tmp/prodbuild --disable-external --allow-missing-href --swap-urls '^https\://daniel-hladik\.cz:'"
```

Don't build into `/site/_site` inside the container while the dev server is running, because it serves from there.

`parallel_localization` must stay `false`, because it does not work on Windows.

`Gemfile.lock` is committed and locked for both `x64-mingw-ucrt` and `x86_64-linux`. `wdm` is restricted with `platforms:` rather than `if Gem.win_platform?`, so the lock stays identical across Windows, Docker and CI. If `bundle install` in the container changes it, the Gemfile has drifted. Fix the cause (or re-run `bundle lock --add-platform x86_64-linux`) instead of committing a platform-specific lock. CI installs in frozen (deployment) mode, so a lock missing `x86_64-linux` breaks the build.

html-proofer runs with `--allow-missing-href` because the dark-mode toggle and the EN Calendly button are intentionally `<a>` elements without a real `href`. Elements that are filled in by JS, such as the lightbox `<img>`, carry `data-proofer-ignore`.

CI checks out the full commit history (`fetch-depth: 0`, `filter: blob:none`). `jekyll-last-modified-at` reads each file's last commit date from git for the sitemap `<lastmod>` and the posts' JSON-LD `dateModified`. With a shallow checkout, every page would get the date of the latest commit.

`docker compose up` stays in the foreground after `Server running...` and reports each auto-regeneration once per language. That is normal, not a loop. Use `docker compose up -d` plus `docker compose logs -f` to run it in the background.

## Hosting constraints

- **GitHub Pages serves the site as purely static files.** That means no server-side code, no custom HTTP headers, and no server-side redirects (`redirect_from` only generates meta-refresh pages).
- **Anything dynamic goes through external services:**
  - contact form: Web3Forms (`api.web3forms.com`)
  - chat: n8n webhook (`n8n.daniel-hladik.cz`)
  - booking: zapti.me (CS) and Calendly (EN)
  - analytics: GA4
- **The site is built in GitHub Actions, not by GitHub Pages' built-in Jekyll.** The Pages plugin whitelist therefore doesn't apply. That's why polyglot and the datapage generator work at all. Any gem in the Gemfile, a custom plugin in `site/_plugins/`, or an extra CI step (link checking, image optimisation) is fine, as long as it runs on Ruby 4.0 (CI and the Docker image).
- **GitHub Pages serves only one branch per repository**, normally `production-gh-pages`. To preview `develop`, the owner temporarily switches the Pages source to `develop-gh-pages` (Settings → Pages), checks it, and switches back. While switched, the public domain serves the develop build to real visitors.

## Branches and deployment

| Branch | Role |
|---|---|
| `develop` | Development branch. All work is committed here. A push runs `.github/workflows/build_deploy.yml` (production build plus html-proofer) and deploys the result to `develop-gh-pages`. |
| `production` | Production branch. Never commit to it directly; it only receives merges from `develop`. A push runs the same build and check, then deploys `_site` to `production-gh-pages`, which is the live site (`site/CNAME`). |
| `automated-translations` | Written only by the n8n translation workflow (see below). Never commit to it by hand. |
| `main` | Stale since 2025-10 and unused. |
| `production-gh-pages` | CI build output. This is the normal GitHub Pages source. Never edit. |
| `develop-gh-pages` | CI build output used as a preview (see Hosting constraints). Never edit. |

How a change gets to production (this pattern is consistent throughout the git history):

1. Commit on `develop` and push. The CI run on `develop` (build plus link check) is the gate, so if it fails, don't merge. Optionally preview it by switching the Pages source to `develop-gh-pages`, and switch it back to `production-gh-pages` afterwards.
2. If a Czech blog post changed, wait for the n8n translation. Then run `git fetch` and `git merge origin/automated-translations` while on `develop`, and push.
3. `git checkout production && git merge develop`. This creates a merge commit `Merge branch 'develop' into production`; don't fast-forward, rebase or cherry-pick. Push, and CI deploys the site.
4. Switch back to `develop`.

### Automatic translation of blog posts (n8n)

- Posts are written in Czech (`*-cs.md`). After a push that adds or changes a Czech post, an external n8n workflow translates it and commits the English counterpart (`site/_posts/<same date-name>-en.md`) to `automated-translations` through the GitHub API. In the history it lands about 20 s after the push.
- Commit messages: `Added new translated post: <file>-en.md`. An update arrives as a pair: `Deleted translated post: …` followed by `Updated translated post: …`. Commits are authored as Dandee42, the same as manual commits.
- The workflow lives in n8n, not in this repo.
- A re-translation replaces the whole English file. Make manual fixes to an English post, such as adding images, only after the translation has been merged into `develop` (e.g. `3410bfeb`). Otherwise the next translation run overwrites them or they conflict on merge.

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
- Use relative URLs (`'/path/' | relative_url`) for internal links and assets. Keep `site.url` / `absolute_url` for canonical, OG, JSON-LD, the sitemap and the feed. Under `jekyll serve` in Docker, `site.url` becomes `http://0.0.0.0:4000`, which a browser on Windows can't open.
- Third-party embeds: an n8n chat widget on every page (`n8n-chat.html`, per-language config), GA4 (`google_analytics` in config; it loads only when `jekyll.environment == "production"`, so it's absent locally), and booking links (zapti.me for CS, Calendly for EN) hardcoded in `service.html`, `use-case.html` and `schedule-meeting-link.html`.
- The site-wide alert banner is toggled in `_config.yml` (`alert:`). Its text lives in `_data/<lang>/general.yml` under `alert.message`.
