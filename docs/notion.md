# Contenus issus de Notion

Les pages « Mon matériel » et « Portfolio » viennent de 4 bases Notion. Chaque page Notion devient un fichier JSON dans le dépôt, qui garde son identifiant, son lien Notion et ses propriétés telles quelles. Une nouvelle importation met donc à jour les mêmes fiches sans casser les URL du site.

| Base Notion | Dossier du site | Pages du site |
|---|---|---|
| Types of leather (`b82a8bf9ee1040e0816e7a0581027cbd`) | `src/content/notion/leathers/` | `/materials/<slug>/`, `/fr/materiel/<slug>/` |
| Thread colours (`5ad3be9f75384764b94eec22421d2a27`) | `src/content/notion/threads/` | section « Fils » de « Mon matériel » |
| Belt Buckles (`a2cbd5ac9d214bff902f91d451a6b4a6`) | `src/content/notion/buckles/` | section « Boucles » de « Mon matériel » |
| Products, « Original List » (`f7ed2e88a2df4188a59cd06ef6550ae8`) | `src/content/notion/portfolio/` | `/portfolio/<slug>/`, `/fr/portfolio/<slug>/` |

Les relations Notion (cuirs et fils d'une pièce, pièces faites avec un cuir) sont conservées sous forme d'identifiants Notion. Le site les transforme en liens internes.

## Format d'une fiche

```json
{
  "notionId": "06d43575cf214a509054f795aa25c597",
  "notionUrl": "https://app.notion.com/p/06d43575cf214a509054f795aa25c597",
  "name": "Pueblo - Mosto",
  "slug": "pueblo-mosto",
  "properties": { "Tanning": "Veg-Tan", "Products made with this leather": ["bec0a2…"] },
  "createdTime": "…",
  "lastEdited": "…",
  "cover": "./06d43575cf214a509054f795aa25c597/1.jpg",
  "images": [{ "file": "./06d43575cf214a509054f795aa25c597/1.jpg", "caption": "" }],
  "contentMarkdown": "Texte de la page en anglais. {{image:1}} marque l'emplacement d'une image.",
  "contentMarkdownFr": "Traduction française.",
  "descriptionFr": "Traduction de la propriété Description (portfolio)."
}
```

- `slug` est attribué à la première importation, puis n'est plus modifié.
- Les liens internes Notion sont notés `notion:<id>` et pointent vers la fiche correspondante du site.
- Les photos sont redimensionnées (2000 px maximum) et débarrassées de leurs métadonnées EXIF et GPS.

## Mettre à jour

1. Demander à Claude, avec le connecteur Notion, d'exporter de nouveau les bases au format ci-dessus (un dossier par base : `leathers/`, `threads/`, `buckles/`, `products/`).
2. Lancer l'import :

   ```sh
   node scripts/import-notion.mjs <dossier-de-l-export>
   ```

   Le script signale les fiches qui ont disparu de Notion, sans les supprimer.
3. Relire les traductions des textes modifiés, puis vérifier avec `npm run build`.

## Ce qui ne vient pas de Notion

- **Liens fournisseurs** (cuirs, fils, boucles) : `src/data/suppliers.ts`, rangés par identifiant Notion. Ils survivent aux importations.
- **Traduction des valeurs de propriétés** (Veg-Tan, Full Grain…) : `src/lib/notion-values.ts`.
- **Familles du portfolio**, déduites des étiquettes Notion : `src/lib/portfolio.ts`.

## Propriétés non affichées

Le prix, le stock et le statut (« Available on demand »…) datent de la vente sur commande. Ils restent dans les fichiers JSON mais ne sont pas affichés sur le site.
