---
title: "TD 6 — Convolution et Deep Learning"
---

## 🎯 Objectifs

- Comprendre l'opération de Convolution sur une image.
- Comprendre le Pooling, le Padding et le Stride.
- Calculer les dimensions des tenseurs dans un CNN.

---

## Exercice 1 : Convolution Manuelle

On considère une petite image 5x5 (niveaux de gris, 0=noir, 10=blanc).
On voit une ligne verticale blanche au milieu.

$$
\text{Image} = 
\begin{pmatrix}
0 & 0 & 10 & 0 & 0 \\
0 & 0 & 10 & 0 & 0 \\
0 & 0 & 10 & 0 & 0 \\
0 & 0 & 10 & 0 & 0 \\
0 & 0 & 10 & 0 & 0 
\end{pmatrix}
$$

On applique un **Filtre de détection de bord vertical** 3x3 :

$$
\text{Filtre} = 
\begin{pmatrix}
-1 & 2 & -1 \\
-1 & 2 & -1 \\
-1 & 2 & -1 
\end{pmatrix}
$$

**Questions :**
1.  Appliquez le filtre sur le pixel central de l'image (celui en position 3,3).
    *   *Méthode* : Superposez le filtre centré sur le pixel. Multipliez chaque case filtre par la case image correspondante. Sommez le tout.
2.  Appliquez le filtre sur un pixel de la zone noire (ex: position 3,2).
3.  Que remarquez-vous sur les valeurs obtenues ? Le filtre a-t-il "réagi" à la ligne verticale ?

---

## Exercice 2 : Max Pooling

Après la convolution, on réduit souvent la taille de l'image avec du **Max Pooling**.
On prend une fenêtre 2x2 et on ne garde que la valeur maximale.

Soit la Feature Map suivante (4x4) :

$$
\begin{pmatrix}
1 & 3 & 2 & 9 \\
7 & 4 & 1 & 5 \\
8 & 5 & 2 & 3 \\
2 & 1 & 0 & 1 
\end{pmatrix}
$$

**Questions :**
1.  Appliquez un Max Pooling 2x2 (avec un pas de 2, sans chevauchement).
    *   Vous devez obtenir une matrice 2x2.
2.  Quel est l'intérêt de cette opération ? (Perte d'information vs Invariance).

---

## Exercice 3 : Calcul de Dimensions (Padding & Stride)

La formule pour calculer la taille de sortie d'une convolution est :
$$ O = \frac{I - K + 2P}{S} + 1 $$
*   $I$ : Taille Entrée (Input)
*   $K$ : Taille Noyau (Kernel/Filter)
*   $P$ : Padding
*   $S$ : Stride (Pas)

**Questions :**
1.  On a une image 32x32. On applique un filtre 5x5, sans padding ($P=0$), avec un pas de 1 ($S=1$). Quelle est la taille de sortie ?
2.  On veut garder la même taille (32x32) avec un filtre 3x3 et un pas de 1. Quel Padding $P$ doit-on choisir ?
3.  On applique un filtre 3x3 avec un pas de 2 ($S=2$) et un padding de 1. Quelle est la taille de sortie ?

---

## Exercice 4 : Architecture CNN et Paramètres

On a une image d'entrée couleur RGB de taille $32 \times 32 \times 3$ (Largeur, Hauteur, Canaux).

1.  **Couche Conv1** : On applique 10 filtres de taille $3 \times 3 \times 3$.
    *   Combien de paramètres (poids) contient un seul filtre ? (N'oubliez pas qu'il a une profondeur de 3 comme l'image).
    *   Combien de paramètres au total pour les 10 filtres ? (Ajoutez 1 biais par filtre).
2.  **Couche Pool1** : Max Pooling 2x2.
    *   Combien de paramètres cette couche contient-elle ? (Piège !).
3.  **Couche Flatten** : On met tout à plat.
    *   Si la sortie de Pool1 est de taille $16 \times 16 \times 10$, quelle est la taille du vecteur aplati ?

Ce vecteur servira d'entrée à un MLP classique pour la classification finale.
