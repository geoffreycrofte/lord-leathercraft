# Plan — Site de contenu lord.crofte.fr

> Document de passation, tenu à jour par Claude Code au fil du travail : cases à cocher, décisions et notes.

## 1. Contexte

- **Marque** : Lord Leathercraft. Elle vend des patrons de maroquinerie en PDF, avec instructions, fichiers AI et vidéos de fabrication, ainsi que quelques articles faits main en stock.
- **Boutique** : https://shop.crofte.fr, sur **Payhip** (domaine personnalisé), en anglais.
- **lord.crofte.fr** : c'était une page de liens vers les réseaux sociaux, servie par un VPS. Elle devient le site de contenu.
- **Statut** : Lord Leathercraft est une association de fait (non déclarée) qui aide les débutants. Elle est tenue par Geoffrey Crofte, designer numérique et expert en accessibilité. La qualité et l'accessibilité ne sont pas négociables.

## 2. Problème

Payhip est très limité pour le contenu et le SEO :

- on ne peut pas y construire un vrai réseau d'articles ;
- son API ne couvre que les coupons et les licences ;
- son thème impose des défauts, comme `maximum-scale=1` qui bloque le zoom.

## 3. Décision

- **On ne migre pas la boutique.** Payhip reste la caisse : paiement, TVA OSS, livraison des fichiers, licences, avis, liste e-mail.
- **On construit un site de contenu séparé sur lord.crofte.fr**. C'est un site statique, bilingue EN et FR, hébergé sur GitHub Pages. Il publie des articles et des guides qui renvoient vers le shop et vers des liens affiliés.
- Pas de nouveau domaine pour l'instant.

## 4. Choix techniques

- **Astro 7**, contenu en MDX, i18n natif, sortie statique.
- **GitHub Actions vers GitHub Pages**, avec `public/CNAME`. Le guide DNS est dans [docs/deploiement.md](docs/deploiement.md).
- **Pas de backend ni de panier** : les boutons renvoient vers les URL Payhip.
- **Pas de mesure d'audience**, pas de cookies.
- Polices auto-hébergées avec Fontsource : **Fraunces** pour les titres, **Poppins** pour le texte.

## 5. Exigences

### Accessibilité (WCAG 2.2 AA minimum)

- HTML sémantique, landmarks, un seul `h1`, hiérarchie de titres propre.
- Zoom non bloqué, contrastes AA, focus visible, navigation clavier complète.
- `alt` pertinents, et un nom accessible pour les liens d'image et les icônes sociales.
- `lang` correct sur chaque page, et sur les passages dans l'autre langue.
- Respect de `prefers-reduced-motion`. Le thème sombre est à décider (voir le journal).

### SEO

- `hreflang` FR et EN plus `x-default`, URL canoniques, sitemap, robots.txt.
- Meta descriptions écrites à la main, de 70 à 160 caractères (vérifié au build).
- Données structurées `Article`, `HowTo` (optionnel) et `BreadcrumbList`.
- Maillage interne, et liens vers les collections du shop.
- Jamais de « + » dans les titres (vérifié au build).

### Liens affiliés

- `rel="sponsored noopener"`, mention visible dans le lien et avertissement en haut de page, ajoutés automatiquement (voir le README).
- Une page dédiée en FR et en EN.
- Lien Payhip : `https://payhip.com/?fp_ref=geoffrey91`.

## 6. Contenus existants

- **Notion (EN)** : `geoffreycrofte.notion.site/Lord-Leathercraft-…`, accessible par le connecteur Notion. Les pages « catalogue produits » ne sont pas migrées pour l'instant. Les autres pages ont été inventoriées :
  - [x] Leather VS Vegan Leather → `leather-vs-vegan-leather` / `cuir-ou-cuir-vegan`
  - [x] Caring for your leather → `how-to-care-for-leather` / `entretenir-le-cuir`
  - [x] Consortium Manifesto → `tuscan-vegetable-tanned-leather` / `cuir-tannage-vegetal-toscane`
  - [x] Leathercraft Design Process → `leather-pattern-design-process` / `conception-patron-maroquinerie`
  - [ ] Gift ideas - Guide : écrit pour la vente sur commande, à réécrire avant de le publier
  - [ ] The price of my work : même remarque
  - [ ] Types of leather, Thread colours, Belt Buckles : bases Notion, pourraient nourrir un guide « choisir son cuir »
  - Contact Me et Products : non repris (commandes sur mesure et catalogue)
- **Guides Payhip** : https://shop.crofte.fr/tips-and-tricks, à reprendre. Ce domaine est bloqué par le réseau des sessions Claude Code : il faut l'autoriser, ou coller le contenu.
- **Collections Payhip** : dans `src/data/site.ts`.
- **Réseaux** : Instagram, YouTube, TikTok, Facebook, Pinterest, Bluesky et Reddit. Plus de X ni de LinkedIn.

## 7. Phases

### Phase 1 — Socle

- [x] Projet Astro, i18n : EN à la racine, FR sous `/fr/`, slugs traduits
- [x] Mise en page accessible : lien d'évitement, en-tête, navigation, sélecteur de langue, pied de page avec réseaux et liens légaux
- [x] Page d'accueil plus riche, avec les liens réseaux dans le pied de page
- [x] Gabarit d'article : fil d'Ariane, dates, couverture, bloc « patrons pour ce projet » vers Payhip, données structurées
- [x] Composants : `Figure`, `YouTube` (façade sans cookies, chargée au clic)
- [x] Liens affiliés détectés et marqués automatiquement, avec avertissement
- [x] Pages légales : mentions légales, confidentialité, liens affiliés (FR et EN) et 404 bilingue
- [x] Workflow GitHub Actions, CNAME, sitemap, robots.txt
- [x] 4 premiers articles issus de Notion, en EN et FR, avec photos optimisées et métadonnées EXIF retirées
- [x] Audit axe (WCAG 2.2 AA et bonnes pratiques) : 0 violation sur les 19 pages, à 1280 px et à 320 px, sans défilement horizontal
- [ ] Relecture des traductions et des textes légaux par Geoffrey
- [ ] Bascule DNS et activation de GitHub Pages ([docs/deploiement.md](docs/deploiement.md))
- [ ] Phase Claude Design : affiner la direction visuelle à partir de ce socle (voir le journal)

### Phase 2 — Contenu

- [ ] Plan éditorial complet
- [ ] Reprise des guides Payhip (tips-and-tricks)
- [ ] Liens affiliés Amazon et AliExpress, et codes promo partenaires, repris des listes d'outils du shop
- [ ] Pages piliers par type d'objet (portefeuilles, porte-cartes, sacs…) vers les collections
- [ ] Présentation des produits sur le site, à concevoir avec le design
- [ ] Newsletter (voir le journal)

### Phase 3 — Plus tard

- Domaine dédié éventuel.
- Migration éventuelle de la boutique hors de Payhip (non souhaitée).

## 8. Questions ouvertes

- **Newsletter** : la liste Mailchimp (http://eepurl.com/hQmtLP) dépasse la limite gratuite de 250 contacts. Il faut choisir : liste e-mail Payhip, Brevo, Buttondown, Kit… Aucun formulaire n'est intégré en attendant.
- **Thème sombre** : oui ou non ? Les couleurs sont déjà en variables, l'ajout sera simple.
- **Adresse de contact** affichée sur les pages légales : celle de l'ancienne page Notion est reprise (`geoffrey.crofte+leathercraft@gmail.com`). À confirmer.
- **Mentions légales et activité commerciale** : la vente de patrons et l'affiliation sont des activités commerciales. Une association de fait n'a pas de personnalité juridique, donc l'éditeur est la personne physique. Faire vérifier si un statut (micro-entreprise, par exemple) est requis et si les mentions doivent être complétées.
- **Facebook** : URL supposée `facebook.com/lordleathercraft`, à confirmer.

## 9. Journal des décisions

| Date | Décision |
|------|----------|
| 2026-10-29 | Générateur : **Astro** (dernière version, 7.x). |
| 2026-10-29 | Déploiement : GitHub Actions vers GitHub Pages. Le DNS `lord` passe du VPS à un CNAME vers `geoffreycrofte.github.io`. Guide dans `docs/deploiement.md`. |
| 2026-10-29 | Travail sur une branche, fusion dans `main` quand la phase 1 est complète. |
| 2026-10-29 | Ancienne page de liens, color picker et config Jekyll supprimés. L'historique Git sert d'archive (dernier commit de l'ancien site : `0fdc22e`). Le logo, les favicons, l’image Open Graph et la palette sont conservés. Les anciennes icônes sont remplacées par Simple Icons. |
| 2026-10-29 | La page d'accueil devient une vraie page d'accueil. Les liens réseaux passent dans le pied de page. |
| 2026-10-29 | **EN par défaut** : anglais à la racine (`/`), français sous `/fr/`. `x-default` pointe vers l'anglais. |
| 2026-10-29 | Identité visuelle conservée (palette cuir, logo). Titres en **Fraunces**, texte en **Poppins**, polices auto-hébergées. Une phase Claude Design viendra affiner le rendu. |
| 2026-10-29 | Pas de thème sombre pour l'instant (décision reportée). |
| 2026-10-29 | Chaque article est publié **systématiquement dans les deux langues**, et le build échoue sinon. Claude traduit, Geoffrey relit. |
| 2026-10-29 | Slugs traduits. |
| 2026-10-29 | Photos depuis Notion. YouTube intégré en mode sans cookies, chargé au clic, sans miniature distante. |
| 2026-10-29 | Affiliation : Payhip, Amazon, AliExpress et codes promo partenaires. Détection automatique par domaine ou paramètre d'URL. |
| 2026-10-29 | Réseaux : Instagram, YouTube, TikTok, Facebook, Pinterest, Bluesky et Reddit. X retiré. |
| 2026-10-29 | Pas de mesure d'audience. |
| 2026-10-29 | Catalogues produits Notion non migrés pour l'instant, faute de présentation arrêtée. Les articles renvoient vers les collections Payhip. |
| 2026-10-29 | Manifeste du consortium : résumé dans nos propres mots avec un lien vers l'original, plutôt que copié. Le logo de la marque du consortium n'est pas repris. |
