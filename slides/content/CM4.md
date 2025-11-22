---
title: CM4 - Apprentissage Non Supervisé
---

# CM4 : Apprentissage Non Supervisé

---

<!-- SLIDE -->

## 1. Données sans étiquettes

Ici, on a seulement $x$. Pas de $y$.
Personne ne donne la réponse.
La machine doit trouver des **structures** cachées dans les données.

*   **Clustering** : Faire des groupes.
*   **Réduction de dimension** : Simplifier les données.

---

<!-- SLIDE -->

## 2. K-Means Clustering

L'algorithme le plus célèbre.
But : Diviser les données en **K** groupes (clusters).

1.  Placer K centres au hasard.
2.  Attribuer chaque point au centre le plus proche.
3.  Déplacer les centres vers la moyenne de leur groupe.
4.  Répéter.

<!-- SLIDE -->

## Démo K-Means

<iframe class="embedded-notebook" src="/observables/kmeans/index.html" width="100%" height="600px"></iframe>

<!-- SLIDE -->

## Limites de K-Means

*   Il faut choisir K à l'avance.
*   Sensible à l'initialisation (aléatoire).
*   Suppose des clusters ronds (sphériques).

---

<!-- SLIDE -->

## 3. Clustering Hiérarchique (CAH)

On construit un arbre (Dendrogramme).
*   Au début, chaque point est un groupe.
*   On fusionne les deux groupes les plus proches.
*   On continue jusqu'à n'avoir qu'un seul groupe.

> Pas besoin de choisir K au début ! On coupe l'arbre où on veut.

---

<!-- SLIDE -->

## 4. Réduction de Dimension (PCA)

**Problème** : Impossible de visualiser des données en dimension 100.
**Solution** : Projeter les données sur un plan (2D) en gardant le maximum d'information (variance).

**PCA (Analyse en Composantes Principales)** :
Trouve les axes qui "étalent" le plus les données.
