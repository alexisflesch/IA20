# 📚 IA20 - Site du Cours

Site statique généré avec [Quartz](https://quartz.jzhao.xyz/) pour le cours d'Intelligence Artificielle en L2 Informatique.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# → Site accessible sur http://localhost:8080

# Build de production
npm run build
# → Génère le site dans public/
```

## 🧪 Tests

```bash
# Vérifier que tous les fichiers attendus existent
npm test

# Tester tous les URLs du site (serveur dev requis)
npm run test:urls

# Crawler tout le site et détecter les liens morts (serveur dev requis)
npm run test:links
```

## 📁 Structure du projet

```
cours-site/
├── content/              # Contenu Markdown du cours
│   ├── index.md          # Page d'accueil
│   ├── cours/            # Cours magistraux
│   │   ├── CM1/          # CM1 - Introduction à l'IA
│   │   ├── CM2/          # CM2 - Représentation des données
│   │   ├── CM3/          # CM3 - Régression et classification
│   │   ├── CM4/          # CM4 - Clustering et PCA
│   │   ├── CM5/          # CM5 - Réseaux de neurones
│   │   ├── CM6/          # CM6 - Évaluation des modèles
│   │   └── CM7/          # CM7 - Éthique et perspectives
│   └── ...
├── observables/          # Visualisations Observable interactives
│   └── knn/              # Demo K-Nearest Neighbors
├── assets/               # CSS personnalisé
├── quartz/               # Framework Quartz (plugins, composants)
├── quartz.config.ts      # Configuration Quartz
├── quartz.layout.ts      # Layout du site
├── scripts/              # Scripts de test
│   ├── test-cours.mjs    # Test d'existence des fichiers
│   ├── test-urls.mjs     # Test HTTP des URLs
│   └── check-links.mjs   # Détection de liens morts
└── public/               # Site généré (non versionné)
```

## 📝 Ajouter du contenu

### Créer un nouveau chapitre de cours

1. Créer un dossier `content/cours/CMX/`
2. Ajouter un fichier `index.md` avec le frontmatter :

```markdown
---
title: "CMX — Titre du chapitre"
---

# CMX — Titre du chapitre

Contenu du cours...
```

### Intégrer une visualisation Observable

1. Créer le dossier `observables/ma-demo/`
2. Ajouter les fichiers Observable (index.html, index.js, runtime.js)
3. La demo sera automatiquement copiée dans `public/observables/ma-demo/`
4. Référencer dans le markdown :

```markdown
<iframe src="/observables/ma-demo/" width="100%" height="600"></iframe>
```

### Utiliser KaTeX pour les formules

```markdown
Formule inline : $E = mc^2$

Bloc de formule :
$$
\hat{y} = w_1 x_1 + w_2 x_2 + b
$$
```

## 🔧 Configuration

### Modifier le thème

Éditer `assets/style.css` pour personnaliser les couleurs, polices, etc.

### Ajouter des plugins Quartz

Modifier `quartz.config.ts` dans la section `plugins`:

```typescript
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [
    Plugin.ContentPage(),
    Plugin.Observables(), // Plugin custom pour les demos Observable
    ...
  ],
}
```

### Changer le layout

Éditer `quartz.layout.ts` pour réorganiser les composants (sidebar, header, footer).

## 📚 Contenu du cours

Le cours couvre les fondamentaux de l'IA en 7 séances :

1. **CM1** - Introduction et Représentation des données
2. **CM2** - Apprentissage Supervisé : Régression et KNN
3. **CM3** - Évaluation et Validation
4. **CM4** - Apprentissage Non Supervisé (Clustering/PCA)
5. **CM5** - Réseaux de Neurones (Perceptron & MLP)
6. **CM6** - Deep Learning et IA Générative
7. **CM7** - Éthique, Limites et Société

## 🛠️ Technologies utilisées

- **Quartz v1.0.0** - Générateur de site statique pour notes/cours
- **Node.js 22+** / **npm 10.9+**
- **TypeScript** - Plugins et configuration
- **KaTeX** - Rendu des formules mathématiques
- **Shiki** - Coloration syntaxique du code
- **D3.js** - Visualisations de données
- **Observable Runtime** - Demos interactives
- **broken-link-checker** - Validation automatique des liens

## 🎓 Public cible

Étudiants de L2 Informatique avec :
- Connaissances limitées en mathématiques
- Bases en programmation Python
- Aucun prérequis en IA/ML

Le cours privilégie l'intuition et la pratique plutôt que les démonstrations mathématiques formelles.

## 📄 Licence

Contenu du cours sous licence éducative. Le code Quartz est sous licence MIT.

## 🤝 Contribution

Pour signaler une erreur ou proposer une amélioration :
1. Vérifier que le serveur dev tourne : `npm run dev`
2. Tester les liens : `npm run test:links`
3. Proposer les modifications dans `content/`

## 📞 Support

- Documentation Quartz : https://quartz.jzhao.xyz/
- KaTeX : https://katex.org/
- Observable : https://observablehq.com/

---

**Note** : Ce site fait partie du projet IA20 qui inclut également un site de slides séparé (`slides-site/`).
