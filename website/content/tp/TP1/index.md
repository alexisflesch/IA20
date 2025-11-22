---
title: "TP 1 — Introduction à Python pour la Data Science"
---

## 🎯 Objectifs

- Prendre en main l'environnement **Jupyter Notebook**.
- Manipuler des vecteurs et matrices avec **NumPy**.
- Charger et explorer des données structurées avec **Pandas**.
- Visualiser des données avec **Matplotlib**.

---

## 1. Préparation de l'environnement

Lancez Jupyter Notebook ou Jupyter Lab. Créez un nouveau notebook nommé `TP1_Nom_Prenom.ipynb`.

Importez les bibliothèques classiques :
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

---

## 2. NumPy : Le moteur de calcul

### Exercice 2.1 : Création de tableaux
1.  Créez un vecteur `v` contenant les entiers de 1 à 10.
2.  Créez une matrice `M` de taille $3 \times 3$ remplie de zéros.
3.  Créez une matrice `R` de taille $3 \times 3$ avec des nombres aléatoires entre 0 et 1.

### Exercice 2.2 : Opérations
1.  Calculez la somme des éléments de `v`.
2.  Multipliez tous les éléments de `M` par 5 (broadcasting).
3.  Effectuez le produit matriciel entre `R` et sa transposée $R^T$.

---

## 3. Pandas : Manipulation de données

Nous allons utiliser le célèbre dataset **Iris** (ou un équivalent simple).

### Exercice 3.1 : Chargement
Chargez le fichier CSV (fourni ou via URL) dans un DataFrame `df`.
```python
url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
df = pd.read_csv(url)
```

### Exercice 3.2 : Exploration
1.  Affichez les 5 premières lignes (`head`).
2.  Affichez les dimensions du dataset (`shape`).
3.  Affichez les statistiques descriptives (`describe`).
4.  Quels sont les noms des colonnes ?

### Exercice 3.3 : Filtrage
1.  Créez un nouveau DataFrame `df_setosa` ne contenant que les fleurs de l'espèce "setosa".
2.  Combien y a-t-il de fleurs dont la longueur de sépale (`sepal_length`) est supérieure à 6 ?

---

## 4. Matplotlib : Visualisation

### Exercice 4.1 : Nuage de points (Scatter Plot)
Tracez un nuage de points montrant la relation entre `petal_length` (axe X) et `petal_width` (axe Y).
*   Ajoutez un titre "Relation Longueur/Largeur des Pétales".
*   Nommez les axes.

### Exercice 4.2 : Histogramme
Tracez l'histogramme de la distribution de `sepal_length`.

### Exercice 4.3 : Couleurs par classe (Bonus)
Refaites le scatter plot de l'exercice 4.1, mais en coloriant les points selon l'espèce de la fleur.
*Indice : Utilisez `c=df['species'].map({'setosa':0, 'versicolor':1, 'virginica':2})` ou la librairie `seaborn`.*

---

## 5. Rendu

Exportez votre notebook au format HTML ou PDF et déposez-le sur la plateforme.
