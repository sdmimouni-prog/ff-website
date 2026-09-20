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

`translations/en-film-titles.json` contient uniquement les titres anglais documentés, leur source et les éventuelles variantes de catalogue. Le titre original reste principal ; le complément anglais apparaît dans les cartes et les fiches et devient recherchable. Les sources sont consultables dans les fiches. Les variantes de festival sont identifiées comme telles. `translations/en-content.css` règle leur présentation secondaire. Les introductions de presse sont traduites, mais les URL et la langue des articles externes sont conservées.

## Langues, référencement et partage

Chaque page anglaise possède son URL sous `/en/`, son titre, sa description et ses textes alternatifs traduits. Les balises Google, Open Graph (partage WhatsApp) et Twitter sont présentes directement dans le HTML. Le portrait de partage est commun aux deux langues et ne contient aucun texte ; son alternative est traduite. Les titres et descriptions anglais se modifient dans `translations/en.json`.

Les liens `hreflang` réciproques relient les six paires FR/EN et indiquent le français par défaut. Le domaine canonique reste `https://ff-website-henna.vercel.app/` ; GitHub Pages est un miroir. Le build génère `sitemap.xml` et `robots.txt` et vérifie les métadonnées via `scripts/check-seo.py`. Les URLs de partage anglaises sont celles sous `/en/`, sans avoir besoin d’exécuter JavaScript.

Le sélecteur mémorise la langue dans le navigateur et la restaure à l’entrée générale du site. Une URL anglaise partagée conserve sa langue, même si le visiteur avait choisi le français précédemment. Le choix explicite FR/EN reste prioritaire ; les paramètres et ancres sont conservés.

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
