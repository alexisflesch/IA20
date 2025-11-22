---
title: "TP 4 — Clustering avec K-Means"
---

## 🎯 Objectifs

- Comprendre l'apprentissage **non supervisé**.
- Appliquer l'algorithme **K-Means**.
- Utiliser la méthode du **Coude (Elbow Method)** pour choisir le nombre de clusters.

---

## 1. Génération de données

Nous allons créer des données artificielles pour bien visualiser les groupes.

```python
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# Génère 300 points répartis en 4 groupes (centers=4)
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)

plt.scatter(X[:, 0], X[:, 1], s=50)
```
Imaginez que vous ne connaissez pas `y_true`. L'algo doit retrouver les groupes tout seul.

---

## 2. Algorithme K-Means

1.  Importez `KMeans` depuis `sklearn.cluster`.
2.  Instanciez le modèle avec `n_clusters=4`.
3.  Entraînez-le sur $X$ (pas de $y$ ici !).
4.  Récupérez les étiquettes prédites (`labels_`) et les coordonnées des centres (`cluster_centers_`).

```python
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=4)
kmeans.fit(X)
y_kmeans = kmeans.predict(X)
```

---

## 3. Visualisation des résultats

Tracez les points en les coloriant selon leur cluster prédit, et ajoutez les centres en rouge.

```python
plt.scatter(X[:, 0], X[:, 1], c=y_kmeans, s=50, cmap='viridis')
centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='red', s=200, alpha=0.7, marker='X')
```

---

## 4. Comment choisir K ? (Méthode du Coude)

Souvent, on ne sait pas combien de groupes il y a.
L'inertie (Inertia) mesure la somme des distances au carré entre chaque point et son centre. Plus elle est basse, plus les clusters sont compacts.

1.  Calculez l'inertie pour K allant de 1 à 10.
2.  Tracez la courbe.

```python
inertias = []
K_range = range(1, 11)

for k in K_range:
    model = KMeans(n_clusters=k)
    model.fit(X)
    inertias.append(model.inertia_)

plt.plot(K_range, inertias, marker='o')
plt.xlabel('Nombre de clusters K')
plt.ylabel('Inertie')
```

Repérez le "coude" (le point où la courbe arrête de descendre brutalement). Est-ce bien 4 ?

---

## 5. Application : Compression d'image (Bonus)

Une image est un ensemble de pixels (points en 3D : R, G, B).
1.  Chargez une image couleur.
2.  Transformez-la en une matrice de pixels $(N, 3)$.
3.  Appliquez K-Means avec $K=16$ (on veut réduire l'image à 16 couleurs).
4.  Remplacez chaque pixel par la couleur de son centre.
5.  Reconstruisez et affichez l'image compressée.
