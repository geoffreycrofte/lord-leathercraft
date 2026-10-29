# lord.crofte.fr

Site de contenu de **Lord Leathercraft** : guides et tutos de maroquinerie, en anglais et en français, qui renvoient vers la boutique de patrons [shop.crofte.fr](https://shop.crofte.fr) (Payhip).

Site statique construit avec [Astro](https://astro.build), déployé sur GitHub Pages. Le plan du projet et le journal des décisions sont dans [PLAN.md](PLAN.md).

## Développer

Il faut Node 24 (voir `.nvmrc`).

```sh
npm install
npm run dev      # serveur local sur http://localhost:4321
npm run check    # vérification des types et du contenu
npm run build    # site statique dans dist/
```

## Structure

```
src/
  content/articles/en/   articles en anglais (.mdx)
  content/articles/fr/   articles en français (.mdx)
  assets/articles/       photos des articles (optimisées au build)
  data/site.ts           URL de la boutique, collections Payhip, réseaux sociaux, contact
  i18n/ui.ts             textes d'interface et URL traduites des pages fixes
  components/            en-tête, pied de page, figure, vidéo YouTube, etc.
  views/                 gabarits partagés entre les deux langues
  pages/                 routes : / et /guides/ en anglais, /fr/ et /fr/guides/ en français
  lib/remark-affiliate-links.mjs  détection et marquage des liens affiliés
public/                  favicons, CNAME, robots.txt, image Open Graph
docs/deploiement.md      guide DNS et GitHub Pages
```

## Écrire un article

Chaque article existe **dans les deux langues**. Le build échoue si une traduction manque.

1. Crée `src/content/articles/en/mon-article.mdx` et `src/content/articles/fr/mon-article.mdx`.
2. Renseigne l'en-tête (frontmatter) :

```yaml
---
title: 'Titre sans signe plus, 70 caractères maximum'
description: 'Meta description rédigée à la main, entre 70 et 160 caractères.'
lang: fr                       # en ou fr
slug: entretenir-le-cuir       # URL traduite : /fr/guides/entretenir-le-cuir/
translationKey: leather-care   # identique dans les deux versions
pubDate: 2026-10-29
updatedDate: 2026-11-15        # optionnel
cover: ../../../assets/articles/photo.jpg   # optionnel
coverAlt: 'Description de la photo'          # obligatoire si cover
collections: [wallets, cardholders]          # collections Payhip liées (voir src/data/site.ts)
howTo:                                       # optionnel : données structurées HowTo
  steps:
    - name: Étape
      text: Ce qu'il faut faire.
---
```

3. Pour une image avec légende :

```mdx
import Figure from '../../../components/Figure.astro';
import photo from '../../../assets/articles/photo.jpg';

<Figure src={photo} alt="Ce que montre la photo">Légende visible.</Figure>
```

4. Pour une vidéo YouTube, chargée seulement au clic, sans cookies :

```mdx
<YouTube id="VIDEO_ID" title="Titre de la vidéo" lang="fr" />
```

### Liens affiliés

Colle simplement le lien en Markdown. Les liens Amazon (avec `tag=` ou `amzn.to`), AliExpress (`s.click.aliexpress.com`) et Payhip (`fp_ref=`) sont détectés automatiquement. Ils reçoivent alors :

- `rel="sponsored noopener"` ;
- la mention visible « (lien affilié) » ou « (affiliate link) » ;
- l'avertissement de transparence en haut de l'article.

Pour un nouveau programme, ajoute son domaine ou son paramètre dans `src/lib/remark-affiliate-links.mjs`.

## Accessibilité

Le site vise le niveau WCAG 2.2 AA. Les contrastes de la palette sont documentés en tête de `src/styles/global.css`.
