# IA20 — Cours d'Intelligence Artificielle (Travail en cours)

Site public : https://ia20.alexisfles.ch/

Attention : ce dépôt est un dépôt de travail (WIP). Le contenu est en cours d'écriture et n'a pas été relu ni validé. Utilisez-le comme support de travail et pas comme une version finale.

Résumé
- Contenu du cours et observables interactifs pour un cours d'IA (L2).
- Observables (notebooks/embeds) live dans le dossier `observables/`.
- Site statique généré dans `website/public/` (build via Quartz).

Prérequis
- Node.js >= 22
- npm

Installer

```bash
# à la racine du dépôt
npm install
```

Développement (serve)

```bash
# Démarrer le site de développement + slides (concurrently)
npm run dev
```

Notes:
- `npm run dev` lance `dev:website` et `dev:slides` (Quartz pour le site, Reveal pour les slides).
- Le serveur de développement rebuild automatiquement le contenu (SPA) ; si vous modifiez des observables situés dans `observables/`, il peut être nécessaire de lancer `npm run build:observables` si les changements ne sont pas pris en compte.

Construire le site (production)

```bash
# Reconstruire uniquement les observables (embeds -> public/observables)
npm run build:observables

# Construire le site (website)
npm run build:website

# Tout construire
npm run build:all
```

Tests de l'intégration iframe (automatisés)

Des scripts de test (Puppeteer) sont fournis pour vérifier le dimensionnement des iframes :

- `scripts/test-iframe-height.mjs` : mesure différentes hauteurs dans l'observable (dev). 
- `scripts/test-cm6-iframe.mjs` : lance un petit serveur local (`website/public`) et vérifie l'iframe sur la page CM6.

Exécution d'un test (exemples) :

```bash
# rebuild avant de lancer les tests
npm run build:observables
npm run build:website

# puis lancer un test
node scripts/test-cm6-iframe.mjs
# ou
node scripts/test-iframe-height.mjs
```

Remarques pratiques
- Les tests utilisent Puppeteer ; si vous exécutez dans un environnement restreint (CI), vous pourriez avoir besoin des flags `--no-sandbox --disable-setuid-sandbox` ou d'une installation spécifique du navigateur.
- Les observables exportés vont dans `website/public/observables/<slug>/` — c'est la version utilisée par la page HTML générée.

Contribuer
- Éditez les fichiers Markdown sous `website/content/` pour le site.
- Les observables interactifs sont dans `observables/`.
- Si vous modifiez `quartz` (layout / components), rebuild du site (`npm run build:website`) nécessaire.

Licence & Disclaimer
- Ce dépôt contient du matériel pédagogique en cours d'élaboration. Il n'est pas destiné à un usage de production tel quel.

---
*Fichier généré automatiquement par l'outil d'administration du dépôt.*
