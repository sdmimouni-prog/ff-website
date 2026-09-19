# Farah El Fassi

Site statique en HTML, CSS et JavaScript natif.

## Démarrer localement

```sh
python3 -m http.server 8080
```

Ouvrir http://localhost:8080. Aucun outil de compilation nécessaire.

## Pages

Accueil, À propos, Filmographie (15 œuvres documentées), Galerie (34 photos fournies), Presse (15 publications) et Contact. Header et footer harmonisés, navigation en français.

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
