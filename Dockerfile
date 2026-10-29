# Lokální dev server. Základ je zafixovaný na konkrétní verzi (Ruby 4.0.1, stejně jako CI).
# Při změně verze aktualizuj tag i digest a smaž volume s gemy: docker compose down -v
FROM bretfisher/jekyll-serve:stable-20260414-2a8cdc9@sha256:4577540b370ef990818075fd1b378405961b6806c1552c268f4e914c16af3a8a

# libcurl potřebuje html-proofer (kontrola odkazů)
RUN apt-get update \
 && apt-get install -y --no-install-recommends libcurl4t64 \
 && rm -rf /var/lib/apt/lists/*
