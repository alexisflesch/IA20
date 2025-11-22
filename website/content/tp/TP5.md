---
title: "TP 5 — Réseaux de Neurones (MLP)"
---

## 🎯 Objectifs

- Manipuler des images comme des vecteurs.
- Entraîner un **Perceptron Multi-Couches (MLP)** avec Scikit-Learn.
- Comprendre l'influence de l'architecture (nombre de neurones, couches).

---

## 1. Le Dataset : MNIST

MNIST est le "Hello World" du Deep Learning. Il contient 70 000 images de chiffres manuscrits (0 à 9) en niveaux de gris de taille $28 \times 28$.

1.  Chargez les données (cela peut prendre une minute).
```python
from sklearn.datasets import fetch_openml
mnist = fetch_openml('mnist_784', version=1, as_frame=False)
X, y = mnist.data, mnist.target
```
2.  Affichez les dimensions de X. Pourquoi 784 colonnes ? ($28 \times 28$).
3.  Visualisez une image.
```python
import matplotlib.pyplot as plt
some_digit = X[0]
some_digit_image = some_digit.reshape(28, 28)
plt.imshow(some_digit_image, cmap='binary')
plt.title(f"Label: {y[0]}")
```

---

## 2. Préparation

1.  **Normalisation** : Les pixels vont de 0 à 255. Divisez X par 255 pour avoir des valeurs entre 0 et 1. C'est crucial pour les réseaux de neurones !
2.  **Split** : Gardez les 60 000 premières images pour l'entraînement et les 10 000 dernières pour le test.
```python
X_train, X_test, y_train, y_test = X[:60000], X[60000:], y[:60000], y[60000:]
```

---

## 3. Entraînement du MLP

Nous allons utiliser `MLPClassifier`.
1.  Créez un réseau avec **une couche cachée de 50 neurones**.
2.  Utilisez l'activation `relu` et l'optimiseur `adam`.
3.  Fixez `max_iter=20` pour ne pas attendre trop longtemps (MNIST est gros).

```python
from sklearn.neural_network import MLPClassifier

mlp = MLPClassifier(hidden_layer_sizes=(50,), activation='relu', solver='adam', max_iter=20, verbose=True, random_state=42)
mlp.fit(X_train, y_train)
```
Observez la courbe de perte (Loss) qui descend.

---

## 4. Évaluation

1.  Calculez l'accuracy sur le Test Set. (Vous devriez être au-dessus de 90%).
2.  Affichez la matrice de confusion. Quels chiffres sont souvent confondus ? (Le 5 et le 3 ? Le 9 et le 4 ?).

---

## 5. Jouer avec l'architecture

Essayez d'améliorer le score en modifiant :
1.  La taille de la couche cachée (ex: 100, 200).
2.  Le nombre de couches cachées (ex: `(100, 50)` pour deux couches).
3.  Attention : Plus le réseau est gros, plus c'est long !

---

## 6. Visualisation des poids (Bonus)

Les poids de la première couche connectent chaque pixel à chaque neurone caché. On peut les visualiser comme des images.
```python
fig, axes = plt.subplots(4, 4)
# On récupère les poids de la couche 1 (coefs_[0])
# Ils sont de forme (784, 50). On transpose pour avoir (50, 784)
vmin, vmax = mlp.coefs_[0].min(), mlp.coefs_[0].max()
for coef, ax in zip(mlp.coefs_[0].T, axes.ravel()):
    ax.imshow(coef.reshape(28, 28), cmap='gray', vmin=.5 * vmin, vmax=.5 * vmax)
    ax.axis('off')
```
Voyez-vous des formes apparaître (des traits, des boucles) ? C'est ce que le réseau "regarde".
