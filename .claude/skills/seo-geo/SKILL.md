---
name: seo-geo
description: Référencement naturel (SEO) et visibilité dans les moteurs génératifs (GEO : ChatGPT, Perplexity, Claude, Google AI Overviews) pour lord.crofte.fr. À utiliser pour écrire ou relire un guide, un article de blog, une fiche matériel ou une page ; choisir un titre, une description, un slug ou des liens internes ; organiser le cocon sémantique ; toucher aux balises Open Graph, au JSON-LD, au sitemap, à robots.txt, à llms.txt ou à IndexNow ; ou auditer le SEO du site.
---

# SEO et GEO pour lord.crofte.fr

Ce skill décrit comment le site est déjà optimisé, et les règles à suivre pour tout nouveau contenu. Le but : être trouvé sur Google et Bing, et être cité par les moteurs génératifs, sans jamais sacrifier l'accessibilité (WCAG 2.2 AA) ni la confiance des lecteurs.

Principe directeur : **une page = une intention de recherche = une réponse claire, vécue et sourcée**. Ce qui sert les lecteurs sert aussi Google et les IA.

## 1. Ce qui est déjà en place (ne pas le casser)

| Élément | Où | Détail |
|---|---|---|
| `<title>`, description, canonical | `src/layouts/BaseLayout.astro` | Titre `Titre · Lord Leathercraft`. Canonical absolu, avec la barre finale (`trailingSlash: 'always'`). |
| hreflang | `BaseLayout.astro` | Un `<link rel="alternate">` par langue, plus `x-default` vers l'anglais. Fourni par la prop `alternates`. |
| Open Graph et Twitter | `BaseLayout.astro` | `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` (`en_GB` / `fr_FR`), `og:image`, `twitter:card=summary_large_image`. Image par défaut : `public/open-graph.jpg`. Pour un article, l'image est la couverture, réduite à 1200 px en JPEG (`ArticleView.astro`). |
| JSON-LD | `ArticleView.astro`, `PostView.astro`, `HomeView.astro` | `Article`, `BreadcrumbList`, `HowTo` (si `howTo` dans le frontmatter), `BlogPosting`, `WebSite`, `Organization`. |
| Sitemap | `astro.config.mjs` (`@astrojs/sitemap`) | `sitemap-index.xml`, qui pointe vers `sitemap-0.xml`, avec les alternates i18n. Déclaré dans Search Console (propriété Domaine `crofte.fr`) et dans Bing. |
| robots.txt | `public/robots.txt` | Tout est autorisé, et le fichier indique le sitemap. |
| IndexNow | `scripts/indexnow.mjs` et le workflow de déploiement | À chaque déploiement, les pages nouvelles ou modifiées sont envoyées à Bing, Yandex, Seznam et Naver. Clé : `public/97422bae69f8220c117c7617ebb0e6f1.txt`, à ne pas supprimer. |
| Liens affiliés | `src/lib/remark-affiliate-links.mjs` | `rel="sponsored noopener"` automatique, plus un avertissement en haut de page. Pour les liens générés par des composants, mettre `sponsored: true` dans le frontmatter. |
| Performance | `scripts/optimize-images.mjs`, polices auto-hébergées | Images de 1200 px maximum et 300 Ko maximum, sans métadonnées (contrôlé en CI). Aucun script tiers ni traceur. Vidéos YouTube en façade, chargées au clic. |
| Contraintes de contenu | `src/content.config.ts` | Titre de 70 caractères maximum, sans « + » (Payhip le transforme en espace). Description de 70 à 160 caractères. Le build échoue si la traduction manque. |

## 2. Checklist d'un nouveau guide ou article

1. **Intention** : formulez en une phrase la question à laquelle la page répond. Vérifiez qu'aucune page existante n'y répond déjà, pour éviter la cannibalisation (voir la carte du cocon, §3).
2. **Titre** (70 caractères maximum) : le sujet principal en tête, sous une forme que les gens tapent vraiment. Pas de « + ». Les titres-questions marchent bien pour les guides (« Où acheter du cuir de qualité… »).
3. **Description** (70 à 160 caractères) : la promesse de la page, avec les sous-sujets traités. Elle sert de `meta description` et de texte Open Graph.
4. **Slug** : traduit, court, en minuscules, avec des tirets, sans mots vides inutiles. Un même `translationKey` relie les deux langues.
5. **Couverture** : une vraie photo (pas d'image d'illustration générique), avec un `coverAlt` qui décrit l'image. Elle sert aussi d'image Open Graph.
6. **Structure** : un seul `h1` (le titre), des `h2` qui forment un sommaire logique, des `h3` pour les sous-parties. Pas de niveau sauté.
7. **Réponse d'abord** : le premier paragraphe répond directement à la question (voir §4).
8. **Liens internes** : au moins un lien vers la page mère du cocon, et un ou deux liens vers des pages sœurs. Le guide doit aussi recevoir un lien depuis sa page mère (voir §3).
9. **Liens externes** : vers des sources qui font autorité (consortium, fabricants, normes). Les liens affiliés sont détectés automatiquement, et sinon on ajoute `sponsored: true`.
10. **Version française** : c'est une adaptation, pas une traduction mot à mot. Le slug est traduit, les liens internes pointent vers les pages `/fr/`, et l'on précise « (en anglais) » quand une destination n'existe qu'en anglais.
11. **Données structurées** : ajoutez `howTo` pour un pas-à-pas réel. Google n'affiche plus les résultats enrichis HowTo depuis 2023, mais le balisage reste utile aux autres moteurs et aux IA.
12. **Fraîcheur** : renseignez `updatedDate` à chaque mise à jour importante. Elle alimente `dateModified`, et les IA privilégient les contenus datés et récents.
13. **Vérification** : `npm run check`, `npm run build`, puis le contrôle du §8.

## 3. Le cocon sémantique

Le cocon sémantique (théorisé par Laurent Bourrelly) organise les pages en arbre : une **page mère** couvre un thème large, ses **pages filles** traitent chacune une intention précise. Les liens suivent la structure : ils donnent du sens au moteur et un chemin au lecteur.

### Règles de maillage

- **Montée** : chaque page fille renvoie vers sa page mère, avec une ancre qui décrit le thème de la mère.
- **Descente** : la page mère renvoie vers chacune de ses filles, avec une ancre qui décrit l'intention de la fille.
- **Latéral** : les sœurs se lient entre elles quand le lecteur en a besoin (« pour la suite, lisez… »). Pas de liens systématiques en pied de page.
- **Entre cocons** : on passe par la page mère ou par la page pilier, pas de fille à fille d'un autre cocon, sauf si l'intention le justifie vraiment.
- **Ancres** : descriptives et variées, jamais « cliquez ici » ni l'URL nue. L'ancre dit ce qu'on trouve derrière (c'est aussi une exigence WCAG).
- **Une intention par page** : si deux pages répondent à la même question, fusionnez-les, ou différenciez nettement leurs angles.
- **Profondeur** : toute page doit être à trois clics au plus de l'accueil.

### Carte actuelle

```
Accueil (pilier)
├── Guides (/guides/) ─ page mère « apprendre la maroquinerie »
│   ├── Matières
│   │   ├── Les types de cuir ─────────┐ mère du sous-cocon « cuir »
│   │   │   ├── Les finitions du cuir   │ (sœurs liées entre elles)
│   │   │   ├── Cuir au tannage végétal de Toscane
│   │   │   ├── Cuir ou cuir vegan
│   │   │   └── Où acheter du cuir ─────┘ (relie vers Mes outils)
│   ├── Outils
│   │   ├── Guide ceinture (outils, cuir, quincaillerie)
│   │   └── Guide portefeuille et porte-cartes
│   ├── Entretien : entretenir le cuir
│   └── Conception : du croquis au patron
├── Mes outils (/tools/) ── page mère « outillage », liée aux deux guides projet
├── Mon matériel (/materials/) ─ fiches cuirs, fils, boucles (filles = fiches)
├── Portfolio ─ pièces (filles), liées aux cuirs utilisés
└── Blog ─ actualités courtes, qui renvoient toujours vers un guide ou un patron
```

Quand vous ajoutez une page, placez-la dans cette carte, ajoutez les liens montants et descendants, et mettez la carte à jour ici.

### Idées de contenus qui complètent les cocons

- Cuir : « Quelle épaisseur de cuir pour… » (porte-cartes, ceinture, sac), « Reconnaître un cuir de qualité », « Tannage végétal ou chrome ».
- Outils : « Griffes à frapper : choisir le pas », « Affûter un tranchet », « Lisser les tranches pas à pas » (avec `howTo`).
- Projets : un guide par famille de patrons (sacs, housses d'ordinateur, bracelets de montre), sur le modèle des guides ceinture et portefeuille.

## 4. Écrire pour être cité par les IA (GEO)

Les moteurs génératifs extraient des passages courts et autonomes, et citent les sources qui paraissent fiables. Les travaux de recherche sur le GEO (Aggarwal et al., *GEO: Generative Engine Optimization*, 2023) montrent que trois ajouts augmentent nettement la visibilité dans les réponses générées : **des citations de sources, des statistiques et des citations d'experts**. À l'inverse, le bourrage de mots-clés ne fonctionne pas.

- **Réponse d'abord** : sous chaque `h2`, la première phrase répond seule à la question du titre, en une à trois lignes. Le détail vient ensuite.
- **Définitions nettes** : « Un cuir pull-up est un cuir aniline ou semi-aniline chargé d'huiles et de cires… ». Une phrase par notion, réutilisable telle quelle.
- **Faits chiffrés et vérifiables** : épaisseurs en mm (et en oz), pas de griffe (3,85 mm), grains de papier (300, 900, 2000), tailles d'aiguilles. Citez la source quand le chiffre n'est pas issu de votre pratique.
- **Expérience vécue** (le premier E de E-E-A-T) : à la première personne, avec des essais, des erreurs, des préférences (« J'utilise… depuis 2021 », « Je ne l'ai pas testée moi-même »). C'est ce que les IA ne peuvent pas inventer, et ce que Google valorise.
- **Questions-réponses** : un bloc `<details>` en fin de guide, avec les vraies questions des lecteurs (Instagram, commentaires YouTube, e-mails).
- **Tableaux comparatifs** : par exemple finition, aspect, résistance, patine. Les IA les reprennent volontiers.
- **Entités cohérentes** : écrivez toujours « Lord Leathercraft » et « Geoffrey Crofte » de la même façon, et nommez précisément marques, tanneries et produits (Badalassi Carlo, Tokonole, John James). Le JSON-LD `Organization` et `Person` doit rester aligné.
- **Pas de texte dans les images** pour une information importante : elle doit exister en texte, ce qui sert à la fois l'accessibilité et les IA.

## 5. llms.txt

`llms.txt` est une convention proposée en 2024 par Jeremy Howard ([llmstxt.org](https://llmstxt.org/)) : un fichier Markdown à la racine du site, qui présente le site et liste ses pages clés pour les modèles de langage. Son adoption reste inégale : Google a indiqué ne pas s'en servir pour son classement. Il coûte peu et peut aider les assistants qui le lisent. Il ne remplace ni le sitemap ni un bon contenu.

Format attendu :

```markdown
# Lord Leathercraft

> Patrons PDF de maroquinerie, guides et tutoriels par Geoffrey Crofte, artisan en France. Site bilingue anglais et français.

Les patrons sont vendus sur shop.crofte.fr. Les guides sont gratuits.

## Guides
- [Types of leather explained](https://lord.crofte.fr/guides/types-of-leather/): full grain, corrected grain, split, thickness.
- …

## Outils et matériel
- [My tools](https://lord.crofte.fr/tools/): …

## Optional
- [Blog](https://lord.crofte.fr/blog/): …
```

Règles :
- Un seul `h1` (le nom du site), puis une citation `>` qui résume le site, puis des sections `h2` de listes de liens au format `[titre](url): description`.
- La section `## Optional` regroupe ce qu'un modèle peut ignorer s'il manque de contexte.
- **Générez le fichier, ne l'écrivez pas à la main** : un endpoint Astro `src/pages/llms.txt.ts`, qui lit les collections `articles` et `posts` (anglais, avec un lien vers la version française), garde le fichier à jour à chaque build.
- Option : `llms-full.txt`, qui contient le texte intégral des guides en Markdown. À réserver aux guides, pas aux fiches produits.
- Après sa création, le fichier doit apparaître dans `robots.txt`, en commentaire ou via un lien depuis le pied de page.

## 6. Robots IA

Par défaut, tout est autorisé, ce qui permet d'être cité. Les robots concernés : `GPTBot` et `OAI-SearchBot` (OpenAI), `ClaudeBot` et `Claude-SearchBot` (Anthropic), `PerplexityBot`, `Google-Extended` (entraînement Gemini, sans effet sur le classement), `Applebot-Extended`, `CCBot` (Common Crawl).

Si un jour on veut empêcher l'entraînement tout en restant cité, on bloque les robots d'entraînement (`GPTBot`, `Google-Extended`, `CCBot`) et on laisse passer les robots de recherche (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`). C'est une décision de Geoffrey, pas un réglage par défaut.

## 7. Open Graph et partage social

- **Taille** : l'image fait 1200 × 630 px, au ratio 1,91:1. Le sujet est centré, car Pinterest, Facebook et Bluesky recadrent différemment.
- **Texte des balises** : `og:title` reprend le titre sans le nom du site, et `og:description` reprend la description.
- **Pages sans couverture** : elles utilisent `public/open-graph.jpg`. Pour une page importante, prévoyez une couverture dédiée.
- **Pinterest** est un canal fort pour la maroquinerie : préférez des photos verticales lisibles dans les articles, et des `alt` descriptifs. Pinterest les reprend.
- **Vérification** : après un déploiement, testez avec le débogueur de partage de Facebook, ou en publiant le lien dans un brouillon Bluesky.

## 8. Audit rapide après un build

```bash
npm run build
# Titres et descriptions : longueurs contrôlées par le schéma, le build échoue sinon.
# Images sans attribut alt (alt="" est correct pour une image décorative) :
grep -rhoE '<img[^>]*>' dist --include=*.html | grep -vE ' alt(=| |>)' | head
# Chaque page a un canonical et un hreflang :
for f in $(find dist -name index.html); do grep -q 'rel="canonical"' $f || echo "pas de canonical : $f"; grep -q 'hreflang=' $f || echo "pas de hreflang : $f"; done
# Liens internes cassés (chemins absolus vers des pages inexistantes) :
grep -rhoE 'href="/[^"#]*"' dist --include=*.html | sort -u | sed 's/href="//;s/"$//' \
  | while read p; do [ -e "dist${p}" ] || [ -e "dist${p}index.html" ] || echo "cassé : $p"; done
```

Exceptions connues : `/links/` (page statique héritée, sans hreflang) et le lien `/404/` de la page 404 vers elle-même.

Ensuite : audit axe (accessibilité) des pages modifiées, à 1280 et 320 px de large, et contrôle de l'aperçu Open Graph.

## 9. À éviter

- Contenu généré en masse ou paraphrasé sans expérience propre. Google le traite comme du contenu de faible valeur, et les IA ne le citent pas.
- Pages quasi identiques qui ne changent qu'un mot-clé (« portefeuille cuir marron », « portefeuille cuir noir »).
- Texte caché, liens cachés, faux avis, données structurées qui décrivent un contenu absent de la page.
- Liens affiliés sans `rel="sponsored"`, ou page affiliée sans contenu propre.
- Changer un slug publié sans redirection. Sur GitHub Pages, il n'y a pas de redirection serveur : on garde l'ancien slug, ou on crée une page de redirection `meta refresh` avec un canonical vers la nouvelle adresse.
- Scripts de suivi tiers : le site n'en a aucun, et c'est un choix assumé.

## Sources et inspirations

- Google Search Central : [Créer du contenu utile](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [données structurées](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [sites multilingues](https://developers.google.com/search/docs/specialty/international/localized-versions).
- [IndexNow](https://www.indexnow.org/) et [llms.txt](https://llmstxt.org/).
- Aggarwal et al., [GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735), 2023.
- Laurent Bourrelly, le cocon sémantique.
- Skills communautaires dont ce skill s'inspire, sans les recopier : [agricidaniel/claude-seo](https://claudemarketplaces.com/skills/agricidaniel/claude-seo/seo-geo) (accès des robots IA, passages citables, llms.txt) et [infrasity-labs/dev-gtm-claude-skills](https://github.com/infrasity-labs/dev-gtm-claude-skills) (audit de « l'AI-readiness »).
