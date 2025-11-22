---
title: "TD 2 — Régression Linéaire et KNN"
---

## 🎯 Objectifs

- Comprendre la méthode des moindres carrés.
- Exécuter l'algorithme KNN à la main.
- Comprendre l'impact de K et la pondération.
- Effectuer une itération de Descente de Gradient.

---

## Exercice 1 : Régression Linéaire Simple

On cherche à prédire la note d'un étudiant ($y$) en fonction de son temps de révision en heures ($x$).
On a 3 points de données :
*   A : (1h, 2/20)
*   B : (2h, 4/20)
*   C : (4h, 8/20)

On cherche une droite modèle $y = ax$. (On suppose $b=0$ pour simplifier, la droite passe par l'origine).

**Questions :**
1.  Tracez ces 3 points sur un graphique.
2.  Tracez la droite $y = 1.5x$.
3.  Calculez l'erreur pour chaque point avec ce modèle. L'erreur est la différence $(y_{vrai} - y_{prédit})$.
4.  Calculez la **MSE** (Mean Squared Error) de ce modèle.
    *   $MSE = \frac{1}{3} \sum (y_i - \hat{y}_i)^2$
5.  Essayez avec le modèle $y = 2x$. La MSE est-elle meilleure ?
6.  Intuitivement, quel est le meilleur $a$ ?

---

## Exercice 2 : K-Nearest Neighbors (KNN)

On veut prédire si un client va acheter un produit (Classe 1 : Achat, Classe 0 : Pas Achat) en fonction de son Âge et de son Revenu (normalisés).

**Dataset connu :**
*   P1 (Âge=20, Rev=20) : **Non** (0)
*   P2 (Âge=25, Rev=25) : **Non** (0)
*   P3 (Âge=40, Rev=60) : **Oui** (1)
*   P4 (Âge=50, Rev=50) : **Oui** (1)
*   P5 (Âge=30, Rev=40) : **Non** (0)

**Nouveau client X** : (Âge=35, Rev=35).

**Questions :**
1.  Placez approximativement les points sur un graphique 2D.
2.  Calculez la distance Euclidienne au carré ($d^2$) entre X et chaque point P1...P5.
    *   *Rappel* : $d^2 = (x_A - x_B)^2 + (y_A - y_B)^2$. Pas besoin de la racine carrée pour comparer.
3.  Quels sont les **3 plus proches voisins** (K=3) de X ?
4.  Quelle est la classe majoritaire parmi ces 3 voisins ?
5.  Quelle est la prédiction pour X ?

---

## Exercice 3 : L'impact de K

Reprenons l'exercice précédent.

**Questions :**
1.  Si on choisit **K=1**, quelle est la prédiction ? Quel est le voisin considéré ?
2.  Si on choisit **K=5** (tous les points), quelle est la prédiction ?
3.  Imaginez que P5 (le voisin le plus proche) soit une erreur de saisie (un "outlier"). Quel impact cela a-t-il si K=1 ? Et si K=3 ?
4.  Concluez sur le rôle de K dans le lissage de la décision.

---

## Exercice 4 : Descente de Gradient (Manuelle)

On reprend l'exercice 1 avec le modèle $y = ax$.
On veut trouver le meilleur $a$ sans deviner, en utilisant la dérivée.
La fonction de coût pour un seul point $(x, y)$ est $E(a) = (ax - y)^2$.
La dérivée de l'erreur par rapport à $a$ est : $\frac{\partial E}{\partial a} = 2x(ax - y)$.

Prenons le point C (4h, 8/20).
On initialise $a = 1$ (pente trop faible).

**Questions :**
1.  Calculez la prédiction $\hat{y} = 1 \times 4 = 4$.
2.  Calculez l'erreur $e = 4 - 8 = -4$.
3.  Calculez le gradient (la pente de l'erreur) : $Grad = 2 \times 4 \times (-4) = -32$.
    *   Le gradient est négatif, cela veut dire qu'il faut augmenter $a$.
4.  Mettez à jour $a$ avec un taux d'apprentissage $\eta = 0.01$.
    *   $a_{new} = a - \eta \times Grad$.
5.  Quelle est la nouvelle valeur de $a$ ? Est-on plus proche de la solution idéale ($a=2$) ?

---

## Exercice 5 : KNN Pondéré (Weighted KNN)

Dans l'exercice 2, les 3 voisins étaient P5 (très proche), P2 (moyen) et P3 (loin).
Pourtant, P3 a autant de poids que P5 dans le vote.

On décide de pondérer le vote par l'inverse de la distance carrée : $w = 1/d^2$.

**Données (Distances carrées fictives pour simplifier) :**
*   $d^2(X, P5) = 50$ (Classe 0)
*   $d^2(X, P2) = 200$ (Classe 0)
*   $d^2(X, P3) = 400$ (Classe 1)

**Questions :**
1.  Calculez le poids de chaque voisin ($1/50, 1/200, 1/400$).
2.  Faites la somme des poids pour la Classe 0.
3.  Faites la somme des poids pour la Classe 1.
4.  Qui gagne ? Est-ce différent du vote majoritaire simple ?
