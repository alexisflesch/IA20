---
title: "TD 1 — Vecteurs, Distances et Normalisation"
---

## 🎯 Objectifs

- Savoir représenter des objets réels (fruits, images) sous forme de vecteurs.
- Maîtriser le calcul de distances (Euclidienne, Manhattan, Cosinus).
- Comprendre l'importance de la normalisation.
- Appréhender la "Malédiction de la Dimension".

---

## Exercice 1 : Vectorisation du Monde

On souhaite créer une IA capable de distinguer des fruits. Pour cela, on doit transformer chaque fruit en un vecteur de nombres.
On choisit 3 caractéristiques (features) :
1.  **Poids** (en grammes)
2.  **Rougeur** (note de 0 à 10)
3.  **Rugosité** (note de 0 à 10)

Voici notre dataset :
*   **Pomme A** : 150g, Rougeur 8, Rugosité 2
*   **Orange B** : 160g, Rougeur 2, Rugosité 8
*   **Citron C** : 100g, Rougeur 1, Rugosité 6

**Questions :**
1.  Écrivez les vecteurs $\vec{A}$, $\vec{B}$ et $\vec{C}$ correspondant à ces fruits.
2.  Quelle est la dimension de l'espace vectoriel dans lequel nous travaillons ?
3.  Imaginez une 4ème caractéristique pertinente pour distinguer ces fruits.

---

## Exercice 2 : Calcul de Distances

On veut savoir quel fruit ressemble le plus à la **Pomme A**.

**Questions :**
1.  Rappelez la formule de la **Distance Euclidienne** ($d_2$) entre deux vecteurs $\vec{u}$ et $\vec{v}$ de dimension 3.
2.  Calculez la distance entre la Pomme A et l'Orange B : $d(\vec{A}, \vec{B})$.
3.  Calculez la distance entre la Pomme A et le Citron C : $d(\vec{A}, \vec{C})$.
4.  Selon ce calcul, quel fruit est le plus proche de la Pomme A ? Ce résultat vous semble-t-il logique ? Pourquoi ?

---

## Exercice 3 : Le Problème des Échelles (Normalisation)

Dans l'exercice précédent, le poids (autour de 150) est beaucoup plus grand que la rougeur (autour de 5).
Cela signifie que le poids "écrase" les autres variables dans le calcul de distance. Une différence de 10g compte autant qu'une différence de 10 points de rougeur (ce qui est énorme sur une échelle de 10).

On va utiliser la **Normalisation Min-Max** pour ramener toutes les valeurs entre 0 et 1.
La formule pour une valeur $x$ est :
$$ x_{norm} = \frac{x - \min}{\max - \min} $$

On vous donne les min et max observés sur tout le verger :
*   Poids : Min = 50g, Max = 250g
*   Rougeur : Min = 0, Max = 10
*   Rugosité : Min = 0, Max = 10

**Questions :**
1.  Normalisez le vecteur de la **Pomme A**.
    *   *Aide* : Pour le poids, $x_{norm} = (150 - 50) / (250 - 50) = 100 / 200 = 0.5$.
2.  Normalisez le vecteur de l'**Orange B**.
3.  Normalisez le vecteur du **Citron C**.
4.  Recalculez les distances $d(\vec{A}_{norm}, \vec{B}_{norm})$ et $d(\vec{A}_{norm}, \vec{C}_{norm})$ avec ces nouvelles valeurs.
5.  La conclusion a-t-elle changé ? L'Orange est-elle toujours plus proche de la Pomme que le Citron ?

---

## Exercice 4 : Distance de Manhattan

Parfois, la ligne droite n'est pas le meilleur chemin (ex: dans une ville avec des rues quadrillées).
La **Distance de Manhattan** ($d_1$) est la somme des valeurs absolues des différences.

$$ d_1(\vec{u}, \vec{v}) = \sum |u_i - v_i| $$

**Questions :**
1.  Calculez la distance de Manhattan entre la Pomme A et l'Orange B (sur les données brutes).
2.  Comparez avec la distance Euclidienne calculée à l'exercice 2. Laquelle est plus grande ? Est-ce toujours le cas ? (Inégalité triangulaire).

---

## Exercice 5 : Similarité Cosinus (Analyse de Texte)

On analyse deux phrases courtes. On utilise un vocabulaire de 3 mots : **[Chat, Mange, Dort]**.
*   Phrase 1 : "Le chat mange" $\rightarrow \vec{u} = [1, 1, 0]$
*   Phrase 2 : "Le chat mange le chat mange" $\rightarrow \vec{v} = [2, 2, 0]$
*   Phrase 3 : "Le chat dort" $\rightarrow \vec{w} = [1, 0, 1]$

**Questions :**
1.  Calculez la distance Euclidienne entre $\vec{u}$ et $\vec{v}$. Est-elle nulle ? Pourtant les phrases ont le même sens.
2.  Calculez la **Similarité Cosinus** entre $\vec{u}$ et $\vec{v}$.
    *   Rappel : $Cos(\vec{u}, \vec{v}) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}$
    *   Produit scalaire $\vec{u} \cdot \vec{v} = x_u x_v + y_u y_v + z_u z_v$.
    *   Norme $\|\vec{u}\| = \sqrt{x^2 + y^2 + z^2}$.
3.  Calculez la Similarité Cosinus entre $\vec{u}$ et $\vec{w}$.
4.  Concluez : Pourquoi le Cosinus est-il souvent préféré pour le texte ?

---

## Exercice 6 : La Malédiction de la Dimension (Curse of Dimensionality)

C'est une expérience de pensée pour comprendre pourquoi l'intuition géométrique 3D ne marche plus en 1000D.

Imaginez un hypercube de côté $c=1$. Son volume est $1^d = 1$.
À l'intérieur, on met une hypersphère de rayon $r=0.5$ (qui touche les bords).

*   En 2D (Carré) : Aire Carré = 1. Aire Cercle = $\pi r^2 = \pi \times 0.25 \approx 0.78$.
    *   Le cercle occupe 78% du carré.
*   En 3D (Cube) : Volume Cube = 1. Volume Sphère = $\frac{4}{3} \pi r^3 \approx 0.52$.
    *   La sphère occupe 52% du cube.

**Question :**
En dimension $d$ très grande, le volume de l'hypersphère tend vers 0.
Cela signifie que presque tout le volume de l'hypercube se trouve dans les **coins**.
Si vos données sont réparties uniformément, où se trouvent la majorité d'entre elles ? Au centre ou sur les bords ?
Quel impact cela a-t-il sur la notion de "voisin proche" ?
