# Farah El Fassi

Site statique en HTML, CSS et JavaScript natif.

## Démarrer localement

```sh
python3 -m http.server 8080
```

Ouvrir http://localhost:8080. Aucun outil de compilation nécessaire.

## Pages

Accueil, À propos, Filmographie (15 œuvres documentées), Galerie (34 photos fournies), Presse (15 publications) et Contact. Les six versions anglaises sont disponibles sous `/en/`, avec le même header, le même footer, les mêmes styles et les mêmes médias.

Les pages anglaises sont générées depuis les pages françaises par `scripts/build-english.py`. Modifier `translations/en.json` pour les textes HTML et `translations/en-runtime.json` pour les textes JavaScript. Les titres originaux des films, les noms propres et les liens des sources sont conservés. Le build régénère les versions anglaises et signale toute nouvelle chaîne HTML sans traduction. Ne pas modifier directement les fichiers générés dans `en/`.

`translations/en-blocks.json` contient les blocs éditoriaux dont l’ordre des mots change en anglais. `translations/en-form-validation.js` garantit des erreurs de formulaire en anglais, quelle que soit la langue du navigateur. Les compteurs de recherche gèrent également zéro, un et plusieurs résultats.

## Déploiement

Le workflow `.github/workflows/pages.yml` vérifie les ressources et le JavaScript, prépare `_site`, puis publie sur GitHub Pages à chaque push sur `main`. Dans Settings → Pages, choisir « GitHub Actions ».

```sh
python3 scripts/build-site.py
```

Seuls les pages, styles, scripts et médias nécessaires sont exportés.

## Configuration

`SITE_CONFIG`, au début de `script.js`, contient l’adresse de contact, Instagram, Facebook et l’emplacement futur de la bande démo. La newsletter est supprimée. YouTube et TikTok restent absents en attendant leurs liens officiels.

Le formulaire prépare un e-mail dans la messagerie du visiteur ; il ne transmet pas de message côté serveur. La bande démo et le kit média restent à fournir.

Les portraits, affiches et publications Instagram sont des fichiers locaux. Les photos Instagram ne sont pas synchronisées automatiquement. Les sources éditoriales sont liées depuis les pages et les fiches des œuvres.
