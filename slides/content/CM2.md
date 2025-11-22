---
title: CM2 - Apprentissage Supervisé : Régression et KNN
---

# CM2 : Apprentissage Supervisé

---

<!-- SLIDE -->

## 1. Apprentissage Supervisé

On donne à la machine des exemples :
$$ (x, y) $$
*   $x$ : Les données (features).
*   $y$ : La réponse attendue (label/target).

**But** : Trouver une fonction $f$ telle que $f(x) \approx y$.

<!-- SLIDE -->

## Régression vs Classification

*   **Régression** : $y$ est un nombre continu.
    *   *Prix d'une maison, Température.*
*   **Classification** : $y$ est une catégorie (classe).
    *   *Spam/Non-Spam, Chat/Chien.*

---

<!-- SLIDE -->

## 2. Régression Linéaire

On cherche une droite qui passe au milieu des points.
$$ y = ax + b $$

<iframe class="embedded-notebook" src="/observables/linear-regression/index.html" width="100%" height="600px"></iframe>

<!-- SLIDE -->

## L'Erreur (MSE)

On veut minimiser la somme des erreurs au carré.

$$ MSE = \frac{1}{N} \sum (y_{vrai} - y_{predit})^2 $$

<!-- SLIDE -->

## Descente de Gradient

Comment trouver le meilleur $a$ et $b$ ?
On descend la pente de l'erreur petit à petit.

1.  Calculer la pente (dérivée).
2.  Faire un pas vers le bas.
3.  Répéter.

---

<!-- SLIDE -->

## 3. K-Nearest Neighbors (KNN)

"Dis-moi qui sont tes voisins, je te dirai qui tu es."

Algorithme :
1.  Calculer la distance avec tous les points connus.
2.  Prendre les **K** plus proches.
3.  Vote majoritaire.

<!-- SLIDE -->

## Démo KNN

<iframe class="embedded-notebook" src="/observables/knn/index.html" width="100%" height="600px"></iframe>

<!-- SLIDE -->

## L'Hyperparamètre K

*   **K petit (1)** : Sensible au bruit (Overfitting). Frontières très découpées.
*   **K grand (100)** : Moyenne globale (Underfitting). Frontières lisses.

---

<!-- SLIDE -->

## 4. Arbres de Décision

On pose une série de questions binaires (Oui/Non).
"Est-il rouge ?", "Est-il grand ?"...

<iframe class="embedded-notebook" src="/observables/decision-tree/index.html" width="100%" height="600px"></iframe>

<!-- SLIDE -->

## Avantages / Inconvénients

*   **KNN** : Simple mais lent (doit tout recalculer).
*   **Arbre** : Interprétable ("White Box") mais instable.
