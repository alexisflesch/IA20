---
title: "TP 2 — Régression Linéaire"
---

## 🎯 Objectifs

- Comprendre le flux de travail en Machine Learning (Workflow).
- Utiliser **Scikit-Learn** pour entraîner un modèle de régression.
- Évaluer la qualité d'un modèle (MSE, $R^2$).

---

## 1. Le Dataset

Nous allons travailler sur un jeu de données simple : prédire le **prix d'une maison** en fonction de sa **surface**.
Si vous n'avez pas de fichier, générez des données synthétiques :

```python
import numpy as np
import matplotlib.pyplot as plt

# Génération de données aléatoires
np.random.seed(42)
X = 2 * np.random.rand(100, 1) # Surface (normalisée)
y = 4 + 3 * X + np.random.randn(100, 1) # Prix = 4 + 3*Surface + Bruit
```

---

## 2. Visualisation initiale

1.  Tracez le nuage de points $(X, y)$.
2.  Observez la tendance. Est-elle linéaire ?

---

## 3. Préparation des données

En Machine Learning, il est crucial de séparer les données en deux ensembles :
*   **Train Set** (80%) : Pour entraîner le modèle.
*   **Test Set** (20%) : Pour évaluer sa performance sur des données inconnues.

Utilisez `train_test_split` de Scikit-Learn :
```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

---

## 4. Entraînement du modèle

1.  Importez `LinearRegression` depuis `sklearn.linear_model`.
2.  Instanciez le modèle.
3.  Entraînez-le sur les données d'entraînement (`fit`).

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
```

4.  Quels sont les paramètres appris ? Affichez l'ordonnée à l'origine (`intercept_`) et le coefficient (`coef_`). Comparez-les aux valeurs théoriques (4 et 3) utilisées pour la génération.

---

## 5. Prédiction et Évaluation

1.  Utilisez le modèle pour prédire les prix du **Test Set** (`predict`). Stockez le résultat dans `y_pred`.
2.  Calculez l'erreur quadratique moyenne (**MSE**) et le coefficient de détermination (**$R^2$**).

```python
from sklearn.metrics import mean_squared_error, r2_score
print("MSE:", mean_squared_error(y_test, y_pred))
print("R2:", r2_score(y_test, y_pred))
```

---

## 6. Visualisation finale

1.  Tracez les points du Test Set en bleu.
2.  Tracez la droite de régression en rouge (sur toute la plage de X).
    *   *Astuce : Créez un vecteur X_new allant de 0 à 2, prédisez y_new, et tracez (X_new, y_new).*

---

## 7. Bonus : Régression Multivariée

Si vous avez fini, essayez d'ajouter une deuxième variable (ex: nombre de pièces) à votre génération de données et refaites l'entraînement.
$$ y = 4 + 3 \times \text{Surface} + 1.5 \times \text{Pièces} + \text{Bruit} $$
Comment visualisez-vous le résultat (plan en 3D) ?
