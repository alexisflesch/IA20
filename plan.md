# Plan du cours

## 🎯 Objectif général du module

Donner aux étudiants :
- Une compréhension intuitive et mathématique des grands principes de l’IA et du Machine Learning.
- Une capacité à utiliser quelques algorithmes simples sur des données réelles.
- Une réflexion critique sur les limites et enjeux de l’IA.


# Cours magistraux — IA : Fondements et Méthodologie (7 × 2h)

## CM1 — Introduction et Représentation des données
### Objectifs
- Définir l'IA et ses paradigmes (symbolique, statistique, connexionniste).
- Comprendre comment numériser le monde (images, textes, tableaux).
- Notion de vecteur, distance et normalisation.

### Contenu
- Histoire brève : Turing, Perceptron, Deep Learning.
- Représentation vectorielle : \( x = (x_1, ..., x_n) \).
- Distance euclidienne (intuition de la similarité).
- Préparation des données : pourquoi normaliser ?

---

## CM2 — Apprentissage Supervisé : Régression et KNN
### Objectifs
- Comprendre le principe : apprendre à partir d'exemples étiquetés.
- Intuition de la régression linéaire (prédire un nombre).
- Intuition de KNN (prédire une classe).

### Contenu
- Régression linéaire : droite \( y = ax+b \), minimiser l'erreur.
- Classification K-Nearest Neighbors : "dis-moi qui sont tes voisins...".
- Notion de frontière de décision.

---

## CM3 — Évaluation et Validation
### Objectifs
- Savoir si un modèle est "bon".
- Comprendre le danger du par cœur (sur-apprentissage).

### Contenu
- Séparation Train / Test.
- Métriques : Erreur (MSE), Précision, Rappel, Matrice de confusion.
- Le fléau du sur-apprentissage (overfitting) et le compromis biais-variance.

---

## CM4 — Apprentissage Non Supervisé
### Objectifs
- Trouver des structures cachées sans étiquettes.
- Regrouper des données similaires (Clustering).

### Contenu
- K-Means : l'algorithme des centres mobiles.
- Inertie intra-classe.
- Réduction de dimension (PCA) : l'idée de projection (l'ombre d'un objet 3D).

---

## CM5 — Réseaux de Neurones (Perceptron & MLP)
### Objectifs
- Comprendre le neurone artificiel.
- La puissance de la non-linéarité.

### Contenu
- Le Perceptron : \( y = f(w \cdot x + b) \).
- Limites (XOR).
- Le Réseau Multicouche (MLP).
- Fonctions d'activation (ReLU, Sigmoïde).
- Intuition de la descente de gradient (la montagne).

---

## CM6 — Deep Learning et IA Générative
### Objectifs
- Voir ce qui se cache derrière la vision par ordinateur et ChatGPT.
- Comprendre les architectures spécialisées.

### Contenu
- Convolution (CNN) pour les images : filtres et features.
- Séquences et Attention (Transformers) pour le texte.
- IA Générative : principe des modèles de diffusion et LLM.

---

## CM7 — Éthique, Limites et Société
### Objectifs
- Prendre du recul critique.
- Comprendre les impacts réels.

### Contenu
- Biais des données et des algorithmes.
- Explicabilité (Black box).
- Impact environnemental.
- Régulation et avenir du travail.

---

# Travaux Dirigés (7 × 2h)

1.  **TD1 : Vecteurs et Distances.** Calculs de distances entre points, normalisation min-max.
2.  **TD2 : Régression et KNN.** Ajustement graphique d'une droite, application manuelle de KNN sur 5 points.
3.  **TD3 : Évaluation.** Calcul de matrice de confusion, précision/rappel sur un cas papier.
4.  **TD4 : Clustering K-Means.** Exécution manuelle de 2 itérations de K-Means.
5.  **TD5 : Réseaux de Neurones.** Calcul "forward" dans un petit réseau à la main.
6.  **TD6 : Deep Learning & Convolution.** Application manuelle d'un filtre de convolution sur une grille de pixels.
7.  **TD7 : Analyse critique.** Étude de cas (ex: biais dans un algo de recrutement).

# Travaux Pratiques (3 × 2h)

1.  **TP1 : Découverte et Régression.** Python/Pandas. Chargement de données, stats descriptives, première régression linéaire.
2.  **TP2 : Classification Supervisée.** KNN sur le dataset Iris. Séparation train/test, matrice de confusion.
3.  **TP3 : Clustering et Ouverture.** K-Means sur des données simples. Visualisation des clusters. Introduction à un MLP simple si le temps le permet.
