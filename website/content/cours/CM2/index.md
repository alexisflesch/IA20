---
title: "Chapitre 2 — Apprentissage Supervisé : Régression, KNN et Arbres"
---

## 🎯 Objectifs d'apprentissage

- **Comprendre** la différence fondamentale entre Régression et Classification.
- **Maîtriser** le concept de Régression Linéaire Simple (droite des moindres carrés).
- **Comprendre** l'algorithme des K-Plus Proches Voisins (KNN) étape par étape.
- **Découvrir** les Arbres de Décision et leur logique de partitionnement.
- **Saisir** l'impact des hyperparamètres (comme K ou la profondeur de l'arbre).

---

## 1. L'Apprentissage Supervisé : Le Paradigme Dominant

L'apprentissage supervisé est aujourd'hui la forme d'IA la plus répandue dans l'industrie.
Son principe est simple : **Apprendre par l'exemple**.

On fournit à l'algorithme un jeu de données d'entraînement (Dataset) contenant des couples :
$$ (\text{Entrée}, \text{Sortie Attendue}) $$

L'objectif de la machine est de trouver une fonction mathématique $f$ telle que pour toute nouvelle entrée $x$, $f(x)$ soit une bonne prédiction de la sortie $y$.

### 1.1 Les deux grandes familles de problèmes

Tout dépend de la nature de la sortie $y$ (la "target") :

1.  **Régression** : La sortie est une valeur **continue** (un nombre).
    *   *Exemples* : Prédire le prix d'une maison, la température de demain, le chiffre d'affaires du mois prochain.
2.  **Classification** : La sortie est une valeur **discrète** (une catégorie ou "classe").
    *   *Exemples* : Prédire si un email est "Spam" ou "Non-Spam", si une image contient un "Chat" ou un "Chien".

---

## 2. La Régression Linéaire

C'est l'algorithme le plus simple et le plus ancien (Gauss, Legendre, début XIXe siècle), mais il reste la base de tout.

### 2.1 L'intuition

Imaginez que vous avez des données sur la taille et le poids de plusieurs personnes. Si vous placez ces points sur un graphique, ils forment un nuage allongé.
La régression linéaire consiste à tracer **la droite qui passe "au milieu" du nuage**, celle qui résume le mieux la tendance générale.

### 2.2 Le Modèle Mathématique

Pour une seule variable d'entrée $x$ (ex: taille), on cherche une droite d'équation :
$$ y = ax + b $$
*   $a$ (ou $w$) : La **pente** (poids/weight). Elle indique à quel point $y$ augmente quand $x$ augmente.
*   $b$ : L'**ordonnée à l'origine** (biais/bias). C'est la valeur de base quand $x=0$.

### 2.3 Visualisation Interactive

Essayez de placer des points pour voir comment la droite s'ajuste automatiquement pour minimiser l'erreur (MSE).
Remarquez comment un seul point aberrant (outlier) peut "tirer" la droite vers lui.

<iframe class="embedded-notebook" src="/observables/linear-regression/" width="100%" height="800" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;"></iframe>

### 2.4 Minimiser l'erreur

On cherche $a$ et $b$ qui minimisent la somme des carrés des erreurs (Moindres Carrés) :

$$ MSE = \frac{1}{N} \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 $$
*   $y_i$ : La vraie valeur.
*   $\hat{y}_i$ : La valeur prédite par la droite ($ax_i + b$).

> **Note** : C'est pour cela qu'on parle de la méthode des "Moindres Carrés".

### 2.5 Comment trouver a et b ? (Descente de Gradient)

Pour trouver la meilleure droite, on ne teste pas toutes les combinaisons au hasard. On utilise la **Descente de Gradient**.
Imaginez que vous êtes en haut d'une montagne (l'erreur est haute) et que vous voulez descendre dans la vallée (erreur minimale) les yeux bandés.
1.  Vous tâtez le sol pour sentir la pente.
2.  Vous faites un petit pas dans le sens de la descente.
3.  Vous recommencez.

Mathématiquement, on utilise la **dérivée**.
> **Intuition** : La dérivée nous donne la pente de la tangente. Si la pente est positive (ça monte), on doit aller à gauche (diminuer $a$). Si la pente est négative (ça descend), on doit aller à droite (augmenter $a$).

On met à jour les paramètres petit à petit dans la direction opposée à la pente.

> **Coin des Matheux : Solution Analytique vs Itérative**
>
> Pour la Régression Linéaire, il existe en fait une formule exacte pour trouver le minimum directement, sans itérer. C'est l'**Équation Normale** :
> $$ \theta = (X^T X)^{-1} X^T y $$
> Cela revient à résoudre le système linéaire $\nabla E(\theta) = 0$.
>
> **Pourquoi utiliser la Descente de Gradient alors ?**
> *   L'inversion de matrice $(X^T X)^{-1}$ est très coûteuse en calcul ($O(n^3)$) si on a des millions de données.
> *   Pour les réseaux de neurones (non-linéaires), il n'existe **pas** de solution analytique fermée. La Descente de Gradient est la seule méthode universelle.

---

## 3. K-Nearest Neighbors (KNN) : La Classification Intuitive

Le KNN (K-Plus Proches Voisins) est un algorithme de classification (il peut aussi faire de la régression) qui n'a pas besoin d'entraînement complexe. Son principe est sociologique :
> "Dis-moi qui sont tes voisins, je te dirai qui tu es."

### 3.1 L'Algorithme pas à pas

Imaginons qu'on veuille classer un nouveau point mystère (un fruit inconnu) en "Pomme" ou "Poire" selon son poids et sa couleur.

1.  **Stocker** : On garde en mémoire tous les exemples connus (le dataset d'entraînement).
2.  **Mesurer** : Quand le nouveau point arrive, on calcule la **distance** (Euclidienne, voir CM1) entre ce point et *tous* les autres points connus.
3.  **Trier** : On garde les **K** points les plus proches (les voisins).
4.  **Voter** : On regarde la classe majoritaire parmi ces K voisins.
5.  **Décider** : On attribue cette classe au nouveau point.

### 3.2 Exemple Concret

On a 5 points connus et on cherche à classer le point $X$ (le rond noir).
Prenons $K=3$.

*   Voisin 1 : Bleu (Distance 1.2)
*   Voisin 2 : Bleu (Distance 1.5)
*   Voisin 3 : Rouge (Distance 2.1)

**Résultat du vote** : 2 Bleus contre 1 Rouge.
**Décision** : Le point $X$ est classé **Bleu**.

### 3.3 L'Hyperparamètre K

Le choix de **K** est crucial. C'est un "hyperparamètre" (un réglage que l'humain doit choisir avant de lancer l'algo).

*   **Si K = 1** : On copie simplement le voisin le plus proche.
    *   *Risque* : Très sensible au bruit. Si le voisin le plus proche est une erreur (un point rouge égaré chez les bleus), on se trompe. C'est du **Sur-apprentissage (Overfitting)**.
*   **Si K est très grand** (ex: K = 100) : On regarde très loin.
    *   *Risque* : On finit par toujours prédire la classe majoritaire globale, on perd les détails locaux. C'est du **Sous-apprentissage (Underfitting)**.

> **Règle empirique** : On choisit souvent un K impair (3, 5, 7) pour éviter les égalités lors du vote (ex: 2 Bleus vs 2 Rouges).

### 3.6 Variante : KNN Pondéré (Weighted KNN)

Dans le KNN classique, tous les voisins ont le même poids de vote.
*   Problème : Un voisin très proche compte autant qu'un voisin à la limite de la zone.
*   Solution : Donner plus de poids aux voisins proches. Souvent, le poids est l'inverse de la distance ($1/d$). Ainsi, un voisin collé au point mystère aura un vote décisif.

### 3.4 Avantages et Inconvénients

| Avantages | Inconvénients |
| :--- | :--- |
| Très simple à comprendre et à coder. | **Lent** si beaucoup de données (doit calculer toutes les distances à chaque fois). |
| Pas d'entraînement (Lazy Learning). | Sensible aux données non normalisées (voir Chapitre 1). |
| Marche bien pour des frontières complexes. | Souffre de la "Malédiction de la dimension". |

> **La Malédiction de la Dimension (Curse of Dimensionality)** :
> Plus on ajoute de variables (colonnes), plus l'espace devient "vaste" et vide. En très haute dimension (ex: 1000 variables), tous les points deviennent très éloignés les uns des autres. La notion de "voisin proche" perd de son sens, car tout le monde est loin de tout le monde !

### 3.5 Visualisation Interactive

<iframe class="embedded-notebook" src="/observables/knn/" width="100%" height="800" frameborder="0"></iframe>

---

## 4. Les Arbres de Décision

Contrairement au KNN qui est basé sur la distance, les Arbres de Décision sont basés sur des **règles logiques**. C'est l'algorithme qui ressemble le plus au raisonnement humain.

### 4.1 Le Principe : "Diviser pour mieux régner"

L'idée est de découper l'espace des données en rectangles de plus en plus petits, en posant une série de questions binaires (Oui/Non).

*Exemple : Prédire si un client va acheter un produit.*
1.  **Question 1** : A-t-il moins de 30 ans ?
    *   *Si OUI* : **Question 2** : Est-il étudiant ?
        *   *Si OUI* : **ACHÈTE**
        *   *Si NON* : **N'ACHÈTE PAS**
    *   *Si NON* : **Question 3** : A-t-il un bon salaire ?
        *   ...

### 4.2 Construction de l'arbre (Algorithme CART)

Comment l'ordinateur choisit-il les questions ? Il cherche la question qui sépare le mieux les classes, c'est-à-dire qui maximise la **pureté** des groupes créés.

#### A. L'Indice de Gini (Impureté)

C'est la mesure standard utilisée par l'algorithme CART (Classification And Regression Trees).
Pour un groupe contenant des éléments de $C$ classes, l'indice de Gini est :

$$ G = 1 - \sum_{i=1}^{C} p_i^2 $$

Où $p_i$ est la proportion d'éléments de la classe $i$ dans le groupe.

*   **Gini = 0** : Le groupe est pur (ex: 100% de Bleus). $1 - (1^2 + 0^2) = 0$.
*   **Gini = 0.5** : Le groupe est parfaitement mélangé (50% Bleus, 50% Rouges). $1 - (0.5^2 + 0.5^2) = 1 - 0.5 = 0.5$.

#### B. L'Entropie de Shannon (Désordre)

Une autre mesure très utilisée (notamment dans l'algorithme C4.5) est l'**Entropie**, issue de la théorie de l'information.

$$ H = - \sum_{i=1}^{C} p_i \log_2(p_i) $$

*   **Entropie = 0** : Ordre parfait (groupe pur).
*   **Entropie = 1** : Désordre maximal (mélange 50/50).

#### C. Le Gain d'Information

Pour choisir la meilleure question (le meilleur "split"), l'algorithme calcule le **Gain d'Information** : c'est la différence entre l'impureté avant la coupure et l'impureté moyenne après la coupure.

$$ \text{Gain} = \text{Impureté}_{\text{Parent}} - \sum \frac{N_{\text{Enfant}}}{N_{\text{Total}}} \times \text{Impureté}_{\text{Enfant}} $$

On choisit la coupure qui maximise ce gain (c'est-à-dire qui réduit le plus le désordre).

### 4.3 Visualisation Interactive

Observez comment l'arbre découpe l'espace.
*   **Profondeur 1** : Une seule coupure (une ligne droite). C'est un "Decision Stump".
*   **Profondeur élevée** : L'arbre crée des rectangles très fins pour isoler chaque point. Attention au sur-apprentissage !

<iframe class="embedded-notebook" src="/observables/decision-tree/" width="100%" height="800" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;"></iframe>

### 4.4 Avantages et Inconvénients

| Avantages | Inconvénients |
| :--- | :--- |
| **Interprétable** (White Box) : on peut dessiner l'arbre et expliquer la décision. | Très instable : changer un seul point peut changer tout l'arbre. |
| Gère bien les données mixtes (numériques et catégorielles). | Tendance facile au sur-apprentissage (si on ne limite pas la profondeur). |
| Pas besoin de normaliser les données. | Les frontières sont toujours orthogonales aux axes (en escalier). |

> **Note** : Pour pallier l'instabilité, on utilise des **Forêts Aléatoires** (Random Forests), qui sont simplement une collection de centaines d'arbres qui votent ensemble.

---

**Prochain chapitre** : [Chapitre 3 — Évaluation et Validation](/cours/CM3/)
