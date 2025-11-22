# Intégrer des pages Observable (procédure générique)

Ce dépôt supporte des embeds Observable autonomes, servis depuis `/observables/<slug>/` et intégrés via `<iframe>`. Le build est géré automatiquement par un emitter Quartz qui copie `observables/*` vers `public/observables/*` à chaque build.

## Étapes générales

1) Récupérer l'export Observable
- Exporter le notebook depuis observablehq.com (tgz), extraire dans `temp/<nom-source>/`.
- Vous devriez voir: `index.html`, `index.js`, `runtime.js`, des modules `xxxx@nnn.js`, éventuellement `files/`.

2) Préparer le dossier `observables/<slug>/`
- Créer le dossier: `mkdir -p observables/<slug>`
- Copier les fichiers utiles depuis `temp/<source>/`:
  - `index.html` (après avoir supprimé la balise `<link ... inspector.css>`)
  - `index.js`
  - `runtime.js`
  - Tous les modules JS (`xxxx@nnn.js`)
  - Le dossier `files/` si le notebook utilise `FileAttachment()` (ex: `capstan.gif`)
- Ne pas copier: `inspector.css`, `*.Zone.Identifier`, `package.json`

3) Build automatique
- Lancer: `npm run build` ou `npm run dev`
- L'emitter Quartz copie automatiquement `observables/<slug>/` vers `public/observables/<slug>/`
- Aucun script externe n'est nécessaire!

4) Intégration Quartz
- Dans la page Markdown concernée:
```html
<iframe src="/observables/<slug>/" width="100%" height="640" style="border:none" loading="lazy"></iframe>
```

## Comment ça marche

- Un emitter Quartz personnalisé (`quartz/plugins/emitters/observables.ts`) est enregistré dans `quartz.config.ts`
- Il s'exécute automatiquement lors de chaque build (dev ou production)
- Il copie récursivement tout le contenu de `observables/` vers `public/observables/`
- Pas de watchers externes, pas de scripts de build séparés, pas de race conditions

## Dépannage
- 404 sur un module: vérifier les `import "./<module>.js"` et copier les modules manquants dans `observables/<slug>/`
- Le dossier `observables/<slug>/` contient les sources nettoyées (pas de CSS inspector)
- `public/observables/<slug>/` est généré automatiquement à chaque build

## Personnalisation de l'affichage

Par défaut, Observable affiche tous les noms de cellules et leurs valeurs. Pour ne montrer que la visualisation et les contrôles interactifs, modifiez `index.html`:

```javascript
// Au lieu de:
const main = runtime.module(define, Inspector.into(document.body));

// Utilisez un sélecteur de cellules:
const main = runtime.module(define, (name) => {
  // Afficher les contrôles interactifs (sliders, etc.)
  if (name === "viewof numTrain" || name === "viewof k") {
    return new Inspector(document.body);
  }
  // Afficher les cellules sans nom (la visualisation principale)
  if (!name) {
    return new Inspector(document.body);
  }
  // Cacher toutes les autres cellules (variables intermédiaires)
  return true;
});
```

Ajustez les noms de cellules selon votre notebook Observable.

## Responsive et dark mode

Pour une meilleure intégration avec Quartz:

### Dans index.html de l'Observable:
```css
:root {
  color-scheme: light dark; /* Support du prefers-color-scheme */
}

body {
  margin: 0;
  padding: 1rem;
  overflow: hidden; /* Évite les scrollbars dans l'iframe */
  min-height: 100vh;
  background: transparent; /* Hérite du parent */
  color: inherit; /* Hérite de la couleur du texte */
}
```

### Dans le Markdown (iframe):
```html
<iframe
  src="/observables/<slug>/"
  width="100%"
  height="680"
  style="border: none; display: block; overflow: hidden;"
  scrolling="no"
  loading="lazy"
></iframe>
```

Ajustez la hauteur selon votre contenu pour éviter les scrollbars.
