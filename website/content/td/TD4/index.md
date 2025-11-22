---
title: "TD 4 — Clustering K-Means"
---

## 🎯 Objectifs

- Dérouler l'algorithme K-Means manuellement.
- Comprendre la convergence.
- Interpréter la méthode du coude.
- Découvrir le Clustering Hiérarchique.

---

## Exercice 1 : K-Means à la main

On dispose de 4 points sur une droite (1D) :
*   A = 2
*   B = 3
*   C = 10
*   D = 11

On veut faire un clustering avec **K=2**.

**Initialisation :**
On choisit au hasard deux centres :
*   $C_1 = 2$ (sur le point A)
*   $C_2 = 10$ (sur le point C)

**Itération 1 :**
1.  **Affectation** : Pour chaque point (A, B, C, D), calculez sa distance à $C_1$ et $C_2$. Attribuez le point au centre le plus proche.
    *   Quels points sont dans le Cluster 1 ?
    *   Quels points sont dans le Cluster 2 ?
2.  **Mise à jour** : Calculez la nouvelle position des centres.
    *   Nouveau $C_1$ = Moyenne des points du Cluster 1.
    *   Nouveau $C_2$ = Moyenne des points du Cluster 2.

**Itération 2 :**
3.  **Affectation** : Recalculez les distances avec les nouveaux centres. Les groupes changent-ils ?
4.  **Mise à jour** : Recalculez les centres.

**Conclusion :**
L'algorithme a-t-il convergé ? Les groupes (2,3) et (10,11) vous semblent-ils logiques ?

---

## Exercice 2 : La Méthode du Coude (Elbow Method)

On a exécuté K-Means pour différentes valeurs de K sur un dataset complexe.
Voici l'évolution de l'**Inertie Intra-Classe** (somme des distances carrées points-centres) :

*   K=1 : Inertie = 5000
*   K=2 : Inertie = 1500
*   K=3 : Inertie = 400
*   K=4 : Inertie = 350
*   K=5 : Inertie = 320

**Questions :**
1.  Tracez grossièrement la courbe Inertie = f(K).
2.  Pourquoi l'inertie diminue-t-elle toujours quand K augmente ?
3.  Où se situe le "coude" ?
4.  Quel est le nombre optimal de clusters selon vous ? Pourquoi ne pas choisir K=5 ?

---

## Exercice 3 : Problèmes potentiels

K-Means utilise la moyenne.
Imaginez un cluster avec 99 points regroupés autour de 0, et 1 point aberrant (outlier) situé à 1000.

**Questions :**
1.  Où sera le centre de ce cluster ?
2.  Est-ce représentatif de la majorité des points ?
3.  Quelle métrique de centralité serait plus robuste que la moyenne ? (Indice : Médiane).

---

## Exercice 4 : Clustering Hiérarchique (Single Linkage)

On reprend nos 4 points : A=2, B=3, C=10, D=11.
On veut construire un dendrogramme avec l'approche "Single Linkage" (distance entre clusters = distance entre les deux points les plus proches).

**Étapes :**
1.  Au départ, on a 4 clusters : {A}, {B}, {C}, {D}.
2.  Quels sont les 2 clusters les plus proches ? Fusionnez-les. Quelle est la distance de fusion ?
3.  Il reste 3 clusters. Quels sont les plus proches ? (Attention, distance {AB} vers {C} = min(dist(A,C), dist(B,C))).
4.  Continuez jusqu'à n'avoir qu'un seul cluster.
5.  Dessinez le dendrogramme (Arbre des fusions).
