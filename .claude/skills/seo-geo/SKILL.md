---
name: seo-geo
description: Search engine optimisation (SEO) and generative engine optimisation (GEO, being cited by ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews) for any website. Use when writing or reviewing a page, article or product page; choosing titles, meta descriptions, slugs or internal links; planning a topic cluster or semantic cocoon; setting up or checking canonical, hreflang, Open Graph, structured data (JSON-LD), sitemaps, robots.txt, llms.txt, IndexNow or AI crawler rules; or auditing a site's SEO and AI visibility.
---

# SEO and GEO

Reference skill for making a website findable in search engines and citable by generative engines, without trading away accessibility, performance or reader trust.

Guiding principle: **one page = one search intent = one clear, first-hand, sourced answer.** What serves readers serves Google, Bing and AI assistants.

## 0. Before you start

1. **Read the project's own SEO notes** if they exist: `docs/seo.md`, a `## SEO` section in `CLAUDE.md` or `README.md`. They record what is already in place (where the head tags, JSON-LD and sitemap live), the site's topic map and its constraints. Project notes override the generic advice below.
2. **No notes yet?** Run the audit (§10) first, then create `docs/seo.md` with: the stack, where each SEO element is generated, the content constraints, the topic map (§4), and the decisions taken (e.g. the AI crawler policy). Keep it updated after each change.
3. **Check for newer practices** (§11) when the work is more than a small edit, or when this skill's "last reviewed" date is more than about six months old.

## 1. Workflow

1. **Audit**: what exists, what is missing, what is broken (§10).
2. **Plan**: rank the fixes by impact. In order: indexability and crawl errors first, then duplicate or missing titles and descriptions, then internal linking and structure, then content gaps, then enhancements (structured data, llms.txt, social).
3. **Implement**: generate SEO elements from data (layouts, content schemas, build scripts) instead of writing them by hand on each page, so they never drift.
4. **Verify**: build, rerun the audit, check one page of each type in the browser, test the social preview, validate the structured data.
5. **Record**: update the project notes and the topic map.

## 2. Technical foundations (every page)

- **Title** `<title>`: unique, about 50–60 characters (cut at about 600 px in results). Main topic first, then the brand: `Topic · Brand`.
- **Meta description**: unique, about 120–160 characters. A promise of what the page answers, not a keyword list. It is also the default social description.
- **Canonical**: absolute URL, self-referencing, with the site's trailing-slash convention applied consistently everywhere (links, sitemap, canonical).
- **Indexing**: `noindex` only on pages that must stay out (search results, thank-you pages, drafts). Never block in `robots.txt` a page you want deindexed: the crawler cannot see the `noindex`.
- **Headings**: one `h1`, then `h2` and `h3` without skipping levels. They form the outline that both readers and models use.
- **Language**: `<html lang>` correct on every page.
- **URLs**: short, lowercase, hyphenated, readable, translated on multilingual sites. **Never change a published URL without a redirect**: use a 301 on servers that support it, or a `meta refresh` page with a canonical to the new URL on static hosts without redirects.
- **Images**: descriptive `alt` (or `alt=""` when decorative), explicit `width` and `height`, modern formats, lazy-loading below the fold, and no important information only inside an image.
- **Performance**: Core Web Vitals at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Self-host fonts, keep third-party scripts to a minimum, compress images in the build or in CI.
- **Accessibility overlaps SEO**: descriptive link text, a sound heading structure, alt text and a valid `lang` help both. Never sacrifice WCAG for an SEO trick.

### Multilingual sites

- One URL per language, never language switching by cookie or IP alone.
- `hreflang` on every version, listing all the versions **including itself**, plus `x-default`. The links must be reciprocal, otherwise they are ignored.
- Translate slugs, titles and descriptions, and adapt the content rather than translating it word for word. Point internal links to the same-language versions, and say so when a destination exists only in another language.
- Make the build fail when a translation is missing, so the language versions never go out of step.

### Discovery

- **XML sitemap**: only canonical, indexable URLs, with `hreflang` alternates when relevant. Referenced in `robots.txt` and submitted in Google Search Console and Bing Webmaster Tools. A sitemap index that points to sub-sitemaps is normal.
- **Search Console**: prefer a *Domain* property, verified by a DNS TXT record at the apex. A subdomain that is a CNAME cannot hold a TXT record, so use the apex or an HTML-file or meta-tag verification instead.
- **IndexNow** (Bing, Yandex, Seznam, Naver…): host a key file `/<key>.txt` whose content is the key, then POST changed URLs to `https://api.indexnow.org/indexnow`. On static sites, hash the built pages, compare them with the live manifest, and submit only new or changed URLs **after** the deploy. A submission error must never block a deploy.
- **Bing Webmaster Tools** can import a Search Console property without verifying the domain again.

## 3. Content that ranks and gets cited

- **Search intent first**: write down the question the page answers before writing it. Check that no other page already answers it, to avoid cannibalisation.
- **E-E-A-T**: show first-hand Experience (tests, mistakes, photos, measurements, "I have used this since…", "I have not tested this one"), Expertise, Authoritativeness (consistent author identity, links from and to recognised sources) and Trust (transparency on affiliate links, accurate dates, contact details).
- **Answer first**: the first sentence under each heading answers that heading on its own, in one to three lines. Details come after.
- **Precision**: real numbers with their units (and the common conversions), named brands, models and standards. Cite the source when a figure is not from your own practice.
- **Useful formats**: comparison tables, step-by-step lists, short definitions, FAQ blocks built from real reader questions.
- **Freshness**: show publication and update dates, and update `dateModified` only for substantial changes.
- **Affiliate links**: `rel="sponsored"` on each one, a visible disclosure near the top of the page, and real first-hand content around them.
- **Do not**: produce mass AI or paraphrased content without first-hand input, near-duplicate pages that change only a keyword, keyword stuffing, hidden text or links, fake reviews.

## 4. Site structure: topic clusters and the semantic cocoon

The semantic cocoon (a method formalised by Laurent Bourrelly), like topic clusters, organises pages as a tree: a **parent page** covers a broad topic, and each **child page** covers one precise intent. Links follow the tree, which gives meaning to search engines and a path to readers.

- **Up**: every child links to its parent, with an anchor that names the parent's topic.
- **Down**: the parent links to each child, with an anchor that names the child's intent.
- **Sideways**: siblings link to each other when the reader needs it ("next, read…"), not through generic sitewide blocks.
- **Across clusters**: go through the parent or the pillar page, except when the intent really justifies a direct link.
- **Anchors**: descriptive and varied; never "click here" or a bare URL.
- **Depth**: every important page is at most three clicks from the home page.
- **Orphans**: every page receives at least one contextual internal link.
- **Map**: keep an ASCII tree of the clusters in the project notes, and update it whenever a page is added. Use it to spot gaps, which are the next pieces of content to write.

## 5. Generative engine optimisation (GEO)

Generative engines retrieve short, self-contained passages and cite the sources that look reliable. In *GEO: Generative Engine Optimization* (Aggarwal et al., 2023), adding **source citations, statistics and quotations** raised visibility in generated answers the most, while keyword stuffing did not help.

- Write **quotable passages**: one clear sentence per definition or fact, which still makes sense if lifted out of the page.
- Use the **answer-first** structure, question-like headings and FAQ blocks.
- Keep **entities consistent**: the same spelling of the brand and author everywhere, matching the `Organization` and `Person` JSON-LD and `sameAs` profiles.
- Back claims with **sources and data**, and show **first-hand experience**, which models cannot invent.
- Make the content **available as text** in the HTML: not only in images or video, and not only rendered by client-side JavaScript.
- Check that **AI crawlers are allowed** (§7), and offer an `llms.txt` (§6).
- **Measure**: ask the main assistants the target questions, note whether and how the site is cited, and repeat after changes. AI referrals show up in analytics as `chatgpt.com`, `perplexity.ai` and similar.

## 6. llms.txt

`llms.txt` ([llmstxt.org](https://llmstxt.org/), proposed by Jeremy Howard in 2024) is a Markdown file at the site root that introduces the site and lists its key pages for language models. Adoption is uneven: Google has said it does not use it for ranking. It is cheap, and it can help assistants and agents that read it. It does not replace a sitemap or good content.

```markdown
# Site name

> One-paragraph summary: who you are, what the site offers, for whom, in which languages.

Optional short notes (where to buy, licence, contact).

## Guides
- [Page title](https://example.com/page/): one-line description.

## Optional
- [Blog](https://example.com/blog/): what a model can skip when short on context.
```

- One `h1` (the site name), then a `>` summary, then `h2` sections with lists of links in the form `[title](url): description`.
- `## Optional` holds what can be skipped.
- **Generate it at build time** from the content collections or CMS, never by hand, so it stays in sync.
- Optional `llms-full.txt`: the full text of the key pages in Markdown. Keep it to evergreen content.

## 7. Crawlers and AI bots

- Allow by default if the goal is to be cited. The main user agents are `GPTBot` and `OAI-SearchBot` (OpenAI), `ClaudeBot`, `Claude-SearchBot` and `Claude-User` (Anthropic), `PerplexityBot`, `Google-Extended` (Gemini training; no effect on Google Search ranking), `Applebot-Extended`, `CCBot` (Common Crawl), `Bingbot`.
- To refuse model training but stay citable, block the training bots (`GPTBot`, `Google-Extended`, `CCBot`, `Applebot-Extended`) and allow the search and retrieval bots (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`). This is the owner's decision: record it in the project notes.
- Bot names and their roles change: check the vendors' documentation (§11) before editing `robots.txt`.

## 8. Structured data (JSON-LD)

- Generate it from the same data as the page. Describe only what is visible on the page.
- Useful types: `WebSite`, `Organization` (with `logo` and `sameAs`), `Person`, `BreadcrumbList`, `Article` or `BlogPosting` (with `datePublished`, `dateModified`, `author`, `image`), `Product` with `Offer` (only if you sell on the page), `VideoObject`, `ItemList`.
- **Rich result status changes**: since 2023, Google shows FAQ rich results only for authoritative government and health sites, and no longer shows HowTo rich results. The markup still helps other engines and models understand the page. Check the current list in Google's documentation before promising a rich result.
- Validate with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).

## 9. Social sharing (Open Graph)

- On every page: `og:title`, `og:description`, `og:url` (the canonical), `og:type` (`website` or `article`), `og:image`, `og:site_name`, `og:locale` (plus `og:locale:alternate` on multilingual sites), and `twitter:card=summary_large_image`.
- Image: 1200 × 630 px (ratio 1.91:1), under about 1 MB, absolute URL, subject centred because each platform crops differently. Use the article's cover when it has one, and a branded default otherwise.
- Pinterest favours tall, legible images with descriptive `alt` text in the page. Plan for it when the niche is visual.
- Check with the platforms' debuggers (Facebook Sharing Debugger, LinkedIn Post Inspector) or by pasting the link into a draft post.

## 10. Audit

Run it on the built output when possible (static sites: the build folder; dynamic sites: crawl a staging URL with a crawler such as Screaming Frog or `wget --spider`). Example commands for a static build in `dist/`:

```bash
OUT=dist
# Images without an alt attribute (alt="" is fine for decorative images):
grep -rhoE '<img[^>]*>' $OUT --include=*.html | grep -vE ' alt(=| |>)' | head
# Pages without a canonical, a description or hreflang (multilingual sites):
for f in $(find $OUT -name '*.html'); do
  grep -q 'rel="canonical"' "$f" || echo "no canonical: $f"
  grep -q 'name="description"' "$f" || echo "no description: $f"
  grep -q 'hreflang=' "$f" || echo "no hreflang: $f"
done
# Duplicate titles (the same title on two language versions linked by hreflang is acceptable):
grep -rhoE '<title>[^<]*' $OUT --include=*.html | sort | uniq -d
# Broken internal links (root-relative):
grep -rhoE 'href="/[^"#?]*"' $OUT --include=*.html | sort -u | sed 's/href="//;s/"$//' \
  | while read p; do [ -e "$OUT$p" ] || [ -e "$OUT${p}index.html" ] || [ -e "$OUT$p.html" ] || echo "broken: $p"; done
# robots.txt, sitemap and llms.txt present:
ls $OUT/robots.txt $OUT/sitemap*.xml $OUT/llms.txt 2>&1
```

Then: accessibility (axe) and Lighthouse on one page of each template; structured data validation; social preview; Search Console *Pages* and *Core Web Vitals* reports; a spot check of how AI assistants answer the site's core questions. Record known, accepted exceptions in the project notes so they are not reported again.

## 11. Staying current

Search and AI discovery change fast; this skill is a baseline, not the last word. **Last reviewed: November 2026.**

When the task is more than a small edit, or when this date is older than about six months:

1. **Search for the latest practices** before applying anything from memory. Good sources:
   - [Google Search Central blog](https://developers.google.com/search/blog) and its [documentation updates](https://developers.google.com/search/updates), plus Google's ranking update history;
   - [Bing Webmaster blog](https://blogs.bing.com/webmaster) and Bing Webmaster guidelines;
   - [schema.org releases](https://schema.org/docs/releases.html);
   - [llmstxt.org](https://llmstxt.org/) and [indexnow.org](https://www.indexnow.org/);
   - the crawler documentation of OpenAI, Anthropic, Perplexity, Google and Apple, for bot names and opt-out rules;
   - [web.dev](https://web.dev/) for Core Web Vitals thresholds and metrics;
   - recent research on GEO and AI search visibility, and reputable industry sources (Search Engine Land, Search Engine Roundtable), cross-checked against the primary documentation.
2. **Compare** what you find with this skill. Prefer primary documentation over blogs, and dated, recent sources over undated ones.
3. **Apply** what is confirmed, and **tell the user** what changed, with the sources.
4. **Propose an update to this skill** (and its "last reviewed" date) when a practice here is outdated or a new one is well established. Do not edit the skill silently.

## Sources and inspirations

- Google Search Central: [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Search Essentials](https://developers.google.com/search/docs/essentials).
- [IndexNow](https://www.indexnow.org/), [llms.txt](https://llmstxt.org/), [web.dev Core Web Vitals](https://web.dev/articles/vitals).
- Aggarwal et al., [GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735), 2023.
- Laurent Bourrelly's semantic cocoon method.
- Community skills that inspired the scope, without copying them: [agricidaniel/claude-seo](https://claudemarketplaces.com/skills/agricidaniel/claude-seo/seo-geo) (AI crawler access, quotable passages, llms.txt) and [infrasity-labs/dev-gtm-claude-skills](https://github.com/infrasity-labs/dev-gtm-claude-skills) (AI-readiness audit).
