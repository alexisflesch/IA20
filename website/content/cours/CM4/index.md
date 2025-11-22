---
title: "Chapitre 4 — Apprentissage Non Supervisé"
---

## 🎯 Objectifs d'apprentissage

- **Comprendre** la différence avec le supervisé : l'absence d'étiquettes.
- **Maîtriser** l'algorithme de Clustering K-Means.
- **Savoir choisir** le nombre de clusters (méthode du coude).
- **Comprendre** le principe de la Réduction de Dimension (PCA) et son utilité.

---

## 1. L'Apprentissage Non Supervisé : Explorer l'Inconnu

Dans l'apprentissage supervisé (Chapitre 2), on avait un "professeur" qui donnait la bonne réponse ($y$).
Ici, **il n'y a pas de réponse attendue**. On donne au modèle un tas de données brutes et on lui dit :
> "Débrouille-toi pour trouver une structure, des motifs ou des groupes là-dedans."

C'est beaucoup plus difficile, mais c'est essentiel car la majorité des données dans le monde ne sont pas étiquetées.

### Applications types
1.  **Clustering (Regroupement)** : Segmenter ses clients en groupes de consommation (Marketing).
2.  **Réduction de dimension** : Simplifier des données trop complexes pour les visualiser.
3.  **Détection d'anomalies** : Repérer une fraude bancaire car elle ne ressemble pas aux autres transactions.

---

## 2. Le Clustering avec K-Means

C'est l'algorithme roi du clustering. Son but est de partitionner les données en **K** groupes (clusters) de sorte que les points d'un même groupe soient proches les uns des autres.

### 2.1 L'Algorithme des Centres Mobiles

C'est un algorithme itératif qui cherche à minimiser l'**Inertie Intra-Classe** (la somme des carrés des distances entre chaque point et le centre de son cluster).

$$ J = \sum_{j=1}^{K} \sum_{x_i \in C_j} ||x_i - \mu_j||^2 $$

1.  **Initialisation** : On place **K** points au hasard dans l'espace. Ce sont nos "Centres" (ou Centroïdes) provisoires.
2.  **Affectation** : Pour chaque point de données, on regarde quel est le Centre le plus proche et on lui attribue sa couleur.
3.  **Mise à jour** : On calcule la **moyenne** de la position de tous les points rouges. Le Centre rouge se déplace vers cette moyenne (le centre de gravité du groupe). Idem pour les bleus, verts, etc.
4.  **Répétition** : On recommence les étapes 2 et 3 jusqu'à ce que les centres ne bougent plus (convergence).

### 2.2 Visualisation Interactive

Expérimentez par vous-même !
1.  Choisissez le nombre de clusters **K**.
2.  Cliquez sur **"Initialiser"** pour placer les centres au hasard.
3.  Avancez pas à pas avec **"Étape +1"** ou lancez **"Auto"**.
4.  *Bonus* : Cliquez n'importe où pour ajouter des points en temps réel.

<iframe class="embedded-notebook" src="/observables/kmeans/" width="100%" height="800" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;"></iframe>

### 2.3 Comment choisir K ? (La méthode du Coude)

L'algorithme a besoin qu'on lui dise combien de groupes chercher ($K$). Mais souvent, on ne le sait pas !

Pour choisir, on trace la courbe de l'**Inertie** (la somme des distances entre les points et leur centre) en fonction de $K$.
*   Plus $K$ augmente, plus l'inertie baisse (avec $K=N$, l'inertie est nulle, chaque point est son propre groupe).
*   On cherche le point d'inflexion, le **"Coude"** (Elbow), où le gain de performance commence à devenir négligeable par rapport à la complexité ajoutée.

> **Visualisation Mentale** :
> Imaginez un bras plié.
> *   L'épaule (K=1) : Inertie très haute.
> *   Le coude (K=3) : L'inertie a beaucoup baissé, le bras change de direction.
> *   Le poignet (K=10) : L'inertie continue de baisser mais doucement.
>
> On choisit le **coude**.

---

## 3. Le Clustering Hiérarchique

Contrairement au K-Means où l'on doit choisir K à l'avance, le Clustering Hiérarchique construit une structure d'arbre (un **Dendrogramme**) qui contient toutes les solutions possibles, de 1 à N clusters.

### 3.1 L'Approche Agglomérative (Bottom-Up)

1.  Au départ, chaque point est un cluster à lui tout seul.
2.  On cherche les deux clusters les plus proches et on les fusionne.
3.  On répète jusqu'à ce qu'il ne reste qu'un seul gros cluster contenant tout le monde.

### 3.2 Le Dendrogramme

C'est le graphique qui résume l'histoire des fusions.
*   En coupant l'arbre en haut, on obtient 2 gros clusters.
*   En coupant plus bas, on obtient 5, 10, 20 petits clusters.

C'est très utile en biologie (phylogénétique) pour classer les espèces animales.

---

## 4. La Réduction de Dimension : PCA

Travailler avec des données en 2D ou 3D est facile. Mais en IA, on a souvent 1000 ou 10 000 dimensions (variables).
C'est la **Malédiction de la Dimension** (Curse of Dimensionality) : l'espace devient vide, les distances ne veulent plus rien dire.

L'Analyse en Composantes Principales (PCA) permet de "résumer" ces données en gardant le maximum d'information.

### 4.1 L'Intuition de l'Ombre

Imaginez une théière (objet 3D). Vous voulez la prendre en photo (projection 2D) pour qu'on la reconnaisse le mieux possible.
*   Si vous la prenez du dessus, on voit juste un rond (le couvercle). On a perdu l'info "anse" et "bec". C'est une mauvaise projection.
*   Si vous la prenez de profil, on voit bien sa forme étalée. C'est une bonne projection.

La PCA cherche mathématiquement cet "angle de vue" optimal. Elle cherche les axes où les données sont les plus **étalées** (là où la **variance** est maximale).

### 4.2 Le Coin des Matheux : Diagonalisation

Pour ceux qui ont fait de l'algèbre linéaire, la PCA n'est rien d'autre qu'une **diagonalisation de la matrice de covariance**.
1.  On centre les données (moyenne nulle).
2.  On calcule la matrice de covariance $\Sigma = \frac{1}{N} X^T X$.
3.  On cherche ses **valeurs propres** ($\lambda$) et **vecteurs propres** ($v$) tels que $\Sigma v = \lambda v$.
4.  Les vecteurs propres sont les "Axes Principaux" (la direction de la théière).
5.  Les valeurs propres indiquent la quantité d'information (variance) portée par chaque axe.
    *   La proportion de variance expliquée par l'axe $k$ est $\frac{\lambda_k}{\sum \lambda_i}$.
6.  On garde les $k$ vecteurs associés aux plus grandes valeurs propres.

C'est une application directe de la réduction d'endomorphisme !

### 4.3 À quoi ça sert ?

1.  **Visualisation** : On ne peut pas dessiner un graphique en 100 dimensions. On utilise la PCA pour projeter les données en 2D ou 3D et voir s'il y a des groupes.
2.  **Compression** : On garde 95% de l'information avec 10 fois moins de stockage.
3.  **Pré-traitement** : Enlever le bruit et les variables inutiles avant de lancer un algorithme d'apprentissage (ça accélère le calcul).

---

**Prochain chapitre** : [Chapitre 5 — Réseaux de Neurones (Perceptron & MLP)](/cours/CM5/)
