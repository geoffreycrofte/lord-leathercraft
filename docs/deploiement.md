# Mise en ligne sur GitHub Pages avec lord.crofte.fr

Aujourd'hui, `lord.crofte.fr` pointe vers ton VPS. Ce guide le fait pointer vers GitHub Pages sans coupure : tant que le DNS n'a pas changé, le VPS continue de servir l'ancienne page.

Durée : environ 15 minutes, plus le temps de propagation DNS (de quelques minutes à quelques heures).

## 1. Préparer GitHub Pages (avant la fusion)

1. Sur GitHub, ouvre le dépôt `geoffreycrofte/lord-leathercraft`, puis **Settings → Pages**.
2. Dans **Build and deployment → Source**, choisis **GitHub Actions** à la place de « Deploy from a branch ».
   Le site n'est alors plus construit par Jekyll : c'est le workflow `.github/workflows/deploy.yml` qui s'en charge.

## 2. Fusionner la branche dans `main`

Une fois la branche fusionnée, le workflow « Deploy to GitHub Pages » se lance. Dans l'onglet **Actions**, vérifie qu'il est vert. Le site est alors en ligne à l'adresse `https://geoffreycrofte.github.io/lord-leathercraft/`, mais les liens internes et les styles ne fonctionneront correctement qu'avec le domaine personnalisé. C'est normal.

## 3. Vérifier le domaine sur ton compte GitHub (recommandé)

Cette étape empêche qu'un autre compte GitHub récupère `lord.crofte.fr` si ton site est un jour désactivé.

1. Ouvre **ton profil → Settings → Pages** (les réglages du compte, pas ceux du dépôt).
2. Clique sur **Add a domain** et saisis `crofte.fr`.
3. GitHub te donne un enregistrement **TXT** à créer, de la forme `_github-pages-challenge-geoffreycrofte.crofte.fr` avec une valeur aléatoire.
4. Crée cet enregistrement TXT chez ton registraire, attends quelques minutes, puis clique sur **Verify**.

## 4. Changer le DNS de `lord`

Chez ton registraire (zone DNS de `crofte.fr`) :

1. **Optionnel, la veille** : baisse le TTL de l'enregistrement `lord` actuel à 300 secondes. Le changement se propagera plus vite.
2. **Supprime** l'enregistrement actuel de `lord`. C'est probablement un enregistrement `A`, et peut-être un `AAAA`, qui pointe vers l'IP de ton VPS.
3. **Crée** un enregistrement `CNAME` :

   | Nom    | Type  | Valeur                       |
   |--------|-------|------------------------------|
   | `lord` | CNAME | `geoffreycrofte.github.io.`  |

   Le point final de la valeur est attendu par certains registraires et refusé par d'autres. Suis ce que propose l'interface.

Un sous-domaine ne peut pas avoir à la fois un CNAME et un autre enregistrement, d'où la suppression des `A`/`AAAA` à l'étape 2.

## 5. Déclarer le domaine dans le dépôt

1. Retourne dans **Settings → Pages** du dépôt.
2. Dans **Custom domain**, saisis `lord.crofte.fr` et enregistre. Le fichier `public/CNAME` du projet contient déjà cette valeur.
3. GitHub vérifie le DNS. Quand la vérification passe au vert, coche **Enforce HTTPS**. Le certificat peut mettre jusqu'à une heure à être émis.

## 6. Vérifier

- `dig lord.crofte.fr +short` doit renvoyer `geoffreycrofte.github.io.` suivi des IP de GitHub.
- `https://lord.crofte.fr/` affiche la nouvelle page d'accueil.
- `https://lord.crofte.fr/fr/` affiche la version française.
- `https://lord.crofte.fr/sitemap-index.xml` répond.

Ensuite, déclare le site et le sitemap dans Google Search Console et Bing Webmaster Tools.

## Après la bascule

- Le VPS ne sert plus `lord.crofte.fr`. Tu peux retirer son virtual host quand tout fonctionne.
- L'ancienne URL `/leather-color-picker/` renverra une 404, comme convenu (outil archivé).
- Chaque push sur `main` redéploie automatiquement le site.
