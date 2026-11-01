# SEO et GEO de lord.crofte.fr

Notes propres à ce site, lues par le skill `seo-geo` (`.claude/skills/seo-geo/SKILL.md`). Elles priment sur les conseils génériques du skill. À tenir à jour après chaque changement.

## Ce qui est en place

| Élément | Où | Détail |
|---|---|---|
| `<title>`, description, canonical | `src/layouts/BaseLayout.astro` | Titre `Titre · Lord Leathercraft`. Canonical absolu, avec la barre finale (`trailingSlash: 'always'`). |
| hreflang | `BaseLayout.astro` | Un lien par langue, plus `x-default` vers l'anglais. Fourni par la prop `alternates`. |
| Open Graph et Twitter | `BaseLayout.astro` | Image par défaut : `public/open-graph.jpg`. Pour un article, l'image est la couverture, réduite à 1200 px en JPEG (`ArticleView.astro`). |
| JSON-LD | `ArticleView.astro`, `PostView.astro`, `HomeView.astro` | `Article`, `BreadcrumbList`, `HowTo` (si `howTo` dans le frontmatter), `BlogPosting`, `WebSite`, `Organization`. |
| Sitemap | `astro.config.mjs` (`@astrojs/sitemap`) | `sitemap-index.xml`, qui pointe vers `sitemap-0.xml`, avec les alternates i18n. Déclaré dans Search Console (propriété Domaine `crofte.fr`) et dans Bing. |
| robots.txt | `public/robots.txt` | Tout est autorisé, robots IA compris. Le fichier indique le sitemap. |
| IndexNow | `scripts/indexnow.mjs` et `.github/workflows/deploy.yml` | Envoie les pages nouvelles ou modifiées après chaque déploiement. Clé : `public/97422bae69f8220c117c7617ebb0e6f1.txt`. |
| Liens affiliés | `src/lib/remark-affiliate-links.mjs` | `rel="sponsored noopener"` automatique, plus un avertissement en haut de page. Pour les liens générés par des composants, mettre `sponsored: true` dans le frontmatter. Sur les pages françaises, les liens Amazon pointent vers amazon.fr (`AMAZON_FR_TAG`). |
| Performance | `scripts/optimize-images.mjs`, polices auto-hébergées | Images de 1200 px maximum et 300 Ko maximum (contrôlé en CI). Aucun script tiers ni traceur. Vidéos YouTube en façade, avec une miniature locale. |
| Contraintes de contenu | `src/content.config.ts` | Titre de 70 caractères maximum, sans « + » (Payhip le transforme en espace). Description de 70 à 160 caractères. Le build échoue si une traduction manque. |
| llms.txt | — | Pas encore en place : à générer avec un endpoint `src/pages/llms.txt.ts` à partir des collections. |

## Décisions

- **Robots IA** : tous autorisés, pour être cité.
- **Analytics** : aucun outil de mesure, par choix. Les sources de trafic se suivent dans Search Console et Bing Webmaster Tools.
- **Hébergement** : GitHub Pages, sans redirection serveur. Ne jamais changer un slug publié ; à défaut, créer une page `meta refresh` avec un canonical vers la nouvelle adresse.

## Carte du cocon

```
Accueil (pilier)
├── Guides (/guides/) : page mère « apprendre la maroquinerie »
│   ├── Matières
│   │   ├── Les types de cuir : mère du sous-cocon « cuir »
│   │   │   ├── Les finitions du cuir
│   │   │   ├── Cuir au tannage végétal de Toscane
│   │   │   ├── Cuir ou cuir vegan
│   │   │   └── Où acheter du cuir (lien vers Mes outils)
│   ├── Outils
│   │   ├── Guide ceinture (outils, cuir, quincaillerie)
│   │   └── Guide portefeuille et porte-cartes
│   ├── Entretien : entretenir le cuir
│   └── Conception : du croquis au patron
├── Mes outils (/tools/) : page mère « outillage », liée aux deux guides projet
├── Mon matériel (/materials/) : fiches cuirs, fils et boucles
├── Portfolio : pièces, liées aux cuirs utilisés
└── Blog : actualités courtes, qui renvoient toujours vers un guide ou un patron
```

### Pistes de contenus

- **Cuir** : « Quelle épaisseur de cuir pour… », « Reconnaître un cuir de qualité », « Tannage végétal ou chrome ».
- **Outils** : « Griffes à frapper : choisir le pas », « Affûter un tranchet », « Lisser les tranches pas à pas ».
- **Projets** : un guide par famille de patrons (sacs, housses d'ordinateur, bracelets de montre), sur le modèle des guides ceinture et portefeuille.

## Exceptions connues de l'audit

- `/links/` : page statique héritée, sans hreflang.
- `/404/` : la page 404 a un lien vers elle-même, via le sélecteur de langue.
- Titres en double : les versions anglaise et française d'une pièce du portfolio ou d'une fiche matériel portent le nom du produit dans les deux langues. C'est accepté, car hreflang relie les deux pages.
