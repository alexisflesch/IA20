---
title: "TP 6 — Mini-Projet : Challenge Titanic"
---

## 🎯 Objectifs

- Mener un projet de Data Science de A à Z.
- Participer (fictivement) à une compétition Kaggle.
- Appliquer toutes les notions vues en cours.

---

## 1. Le Contexte

Le naufrage du Titanic est l'un des plus célèbres de l'histoire.
Votre mission : **Créer un modèle capable de prédire quels passagers ont survécu au naufrage.**

Les données sont disponibles ici : [Titanic Dataset (Seaborn)](https://github.com/mwaskom/seaborn-data/blob/master/titanic.csv) ou sur Kaggle.

---

## 2. Cahier des Charges

Votre notebook doit contenir les sections suivantes :

### A. Analyse Exploratoire (EDA)
*   Quel est le taux de survie global ?
*   Les femmes ont-elles plus survécu que les hommes ? (Visualisez avec un barplot).
*   Les passagers de 1ère classe ont-ils plus survécu ?
*   Quel est l'impact de l'âge ?
*   Y a-t-il des valeurs manquantes ? (Indice : `Age` et `Deck` en ont souvent).

### B. Prétraitement (Preprocessing)
C'est l'étape la plus importante.
1.  **Nettoyage** : Que faire des âges manquants ? (Remplacer par la médiane ?). Supprimer la colonne `Deck` trop vide ?
2.  **Encodage** : Les algorithmes ne comprennent pas "male"/"female". Transformez-les en 0/1. Idem pour la ville d'embarquement.
3.  **Sélection** : Gardez les colonnes pertinentes (ex: `pclass`, `sex`, `age`, `fare`, `sibsp`).

### C. Modélisation
Testez au moins 3 algorithmes différents :
1.  **KNN** (Pensez à normaliser les données !).
2.  **Régression Logistique** (C'est de la classification malgré son nom).
3.  **Random Forest** (Souvent très performant sur ce dataset).

### D. Évaluation et Optimisation
1.  Utilisez la validation croisée (`cross_val_score`) pour avoir une estimation fiable.
2.  Essayez d'optimiser les hyperparamètres du meilleur modèle (ex: `n_neighbors` pour KNN, `n_estimators` pour Random Forest) avec `GridSearchCV`.

---

## 3. Critères d'évaluation

*   **Rigueur** de la démarche (Train/Test split respecté, métriques adaptées).
*   **Qualité du code** (commentaires, noms de variables clairs).
*   **Visualisation** (graphiques pertinents et titrés).
*   **Performance** (Essayez de dépasser 80% d'accuracy !).

Bonne chance ! 🚢
