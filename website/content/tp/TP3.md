---
title: "TP 3 — Classification avec K-Nearest Neighbors (KNN)"
---

## 🎯 Objectifs

- Utiliser l'algorithme **KNN** pour un problème de classification.
- Comprendre l'impact de l'hyperparamètre **K**.
- Évaluer un classifieur avec la **Matrice de Confusion**.

---

## 1. Le Dataset : Iris

Nous reprenons le dataset Iris. Cette fois, l'objectif est de prédire la colonne `species` à partir des 4 autres colonnes (sépales et pétales).

1.  Chargez les données.
2.  Séparez les features ($X$) et la target ($y$).
    *   $X$ : `sepal_length`, `sepal_width`, `petal_length`, `petal_width`.
    *   $y$ : `species`.
3.  Divisez en Train/Test (80%/20%).

---

## 2. Premier modèle KNN

1.  Importez `KNeighborsClassifier` depuis `sklearn.neighbors`.
2.  Instanciez le modèle avec $K=3$ (`n_neighbors=3`).
3.  Entraînez le modèle sur le Train Set.
4.  Calculez le score (Accuracy) sur le Test Set.

```python
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
print("Accuracy:", knn.score(X_test, y_test))
```

---

## 3. Matrice de Confusion

L'accuracy ne dit pas tout (quelles classes sont confondues ?).
1.  Faites les prédictions sur le Test Set.
2.  Affichez la matrice de confusion.

```python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
y_pred = knn.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=knn.classes_)
disp.plot()
```
Analysez les erreurs. Y a-t-il des espèces qui se ressemblent plus que d'autres ?

---

## 4. Optimisation de l'hyperparamètre K

Quelle est la meilleure valeur de K ?
1.  Créez une boucle qui teste toutes les valeurs de K de 1 à 30.
2.  Pour chaque K, entraînez un modèle et stockez son score sur le Test Set.
3.  Tracez la courbe `Score en fonction de K`.

```python
scores = []
k_range = range(1, 31)

for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)
    scores.append(knn.score(X_test, y_test))

plt.plot(k_range, scores)
plt.xlabel('Valeur de K')
plt.ylabel('Accuracy')
plt.title('Performance du KNN selon K')
```

Quel K semble optimal ? Que se passe-t-il si K est trop grand ?

---

## 5. Frontières de décision (Bonus)

Pour visualiser les frontières, on ne peut garder que 2 dimensions (ex: `petal_length` et `petal_width`).
1.  Ré-entraînez le modèle sur seulement ces 2 colonnes.
2.  Créez une grille de points (meshgrid) couvrant l'espace.
3.  Prédisez la classe pour chaque point de la grille.
4.  Affichez les zones de couleur.

*Indice : Regardez la documentation de `sklearn.inspection.DecisionBoundaryDisplay`.*
