---
title: CM1 - Introduction et Représentation des données
---

# CM1 : Introduction et Représentation des données

---

<!-- SLIDE -->

## 1. Qu'est-ce que l'IA ?

> "Ensemble des techniques permettant à des machines de simuler l'intelligence."

### Les deux visages de l'IA
*   **IA Faible (Weak AI)** :
    *   Spécialisée sur une tâche unique.
    *   Exemples : Jouer aux échecs (Deep Blue), GPS, Reconnaissance faciale.
    *   *C'est l'IA d'aujourd'hui.*
*   **IA Forte (AGI)** :
    *   Conscience, sensibilité, raisonnement général.
    *   Capable d'apprendre n'importe quelle tâche intellectuelle humaine.
    *   *C'est l'IA de la science-fiction (pour l'instant).*

<!-- SLIDE -->

## Une brève histoire de l'IA

L'IA a connu des cycles d'euphorie ("Printemps") et de déception ("Hivers").

*   **1950** : **Test de Turing**. Une machine peut-elle tromper un humain ?
*   **1956** : **Conférence de Dartmouth**. Naissance officielle du terme "Intelligence Artificielle".
*   **1980s** : **Systèmes Experts**. L'âge d'or du symbolique (Règles "Si... Alors...").
*   **1997** : **Deep Blue** bat Kasparov. La force brute triomphe.
*   **2012** : **Révolution Deep Learning**. AlexNet écrase la compétition en vision grâce aux GPU.
*   **2022+** : **IA Générative**. ChatGPT, Midjourney. L'IA devient créative.

<!-- SLIDE -->

## Les 3 Paradigmes Historiques

Comprendre l'évolution des approches :

1.  **Symbolique (1950-1990)** :
    *   On code les règles à la main.
    *   *Logique formelle, Systèmes experts.*
    *   Limites : Ne gère pas le flou ou l'inconnu.
2.  **Machine Learning (1990-2010)** :
    *   L'ordinateur apprend les règles à partir de données structurées.
    *   *Statistiques, SVM, Forêts aléatoires.*
3.  **Deep Learning (2010-...)** :
    *   Réseaux de neurones profonds inspirés du cerveau.
    *   Apprend ses propres représentations (features) à partir de données brutes (images, son).

---

<!-- SLIDE -->

## 2. Tout est Vecteur

Pour qu'un algorithme traite le monde réel, il faut le **numériser**.

### Données Tabulaires
Un tableau Excel classique.
*   Chaque ligne est un **exemple** (individu).
*   Chaque colonne est une **feature** (caractéristique).
*   Exemple Appartement : `[Surface=45, Pièces=2, Étage=1]`

### Données Non Structurées
*   **Image** : Grille de pixels. Une image $28 \times 28$ devient un vecteur de dimension 784.
*   **Texte** : "Le chat mange" $\rightarrow$ Vecteur de fréquence (Bag of Words) ou Embedding sémantique.

<!-- SLIDE -->

## L'Espace Vectoriel

Chaque donnée est un **point** dans un espace mathématique.

*   **Dimension $d$** : Le nombre de caractéristiques.
*   Si $d=2$ : On peut dessiner les points sur une feuille.
*   Si $d=3$ : On peut les visualiser dans un cube.
*   Si $d=1000$ : C'est un hyper-espace. Notre intuition géométrique ne marche plus ("Malédiction de la dimension").

> **Analogie** : Deux appartements similaires sont deux points "proches" dans cet espace.

---

<!-- SLIDE -->

## 3. Distances et Similarité

Mesurer la ressemblance entre deux objets revient à mesurer la distance entre deux points.

<iframe class="embedded-notebook" src="/observables/distances/index.html" width="100%" height="450px" style="border:none;"></iframe>

<!-- SLIDE -->

## A. Distance Euclidienne ($L_2$)

C'est la distance "naturelle", celle de la règle graduée.

$$ d(A, B) = \sqrt{\sum_{i=1}^{d} (x_i - y_i)^2} $$

*   **Avantage** : Intuitive, correspond à notre vision physique.
*   **Inconvénient** : Très sensible aux grandes différences sur une seule dimension (les carrés amplifient les écarts).

<!-- SLIDE -->

## B. Distance de Manhattan ($L_1$)

On se déplace uniquement le long des axes (comme un taxi dans les rues de New York).

$$ d(A, B) = \sum_{i=1}^{d} |x_i - y_i| $$

*   **Avantage** : Moins sensible aux valeurs extrêmes (outliers) que la $L_2$.
*   **Usage** : Souvent préférée en très haute dimension.

<!-- SLIDE -->

## C. Similarité Cosinus

On mesure l'**angle** $\theta$ entre les deux vecteurs, peu importe leur longueur.

$$ \cos(\theta) = \frac{A \cdot B}{\|A\| \|B\|} $$

*   **Principe** : Deux vecteurs colinéaires (même direction) ont une similarité de 1. Orthogonaux = 0. Opposés = -1.
*   **Usage** : Incontournable en **NLP** (Analyse de texte).
    *   *Exemple* : Un article court et un article long sur le même sujet auront des vecteurs de longueurs différentes, mais de même direction.

---

<!-- SLIDE -->

## 4. Normalisation des Données

Pourquoi est-ce critique ?

Imaginez un dataset avec :
1.  **Salaire** : 2000 à 5000 €.
2.  **Âge** : 20 à 60 ans.

Calcul de distance : Une différence de 1000€ de salaire (écart=1000) va écraser une différence de 40 ans d'âge (écart=40). L'algorithme ne regardera que le salaire !

<!-- SLIDE -->

## Méthodes de Scaling

Il faut ramener toutes les variables sur une échelle comparable.

### 1. Min-Max Scaling
On compresse tout l'intervalle entre 0 et 1.
$$ x' = \frac{x - min}{max - min} $$
*   *Simple, mais sensible aux valeurs aberrantes.*

### 2. Standardisation (Z-Score)
On centre sur la moyenne ($\mu=0$) et on réduit l'écart-type ($\sigma=1$).
$$ x' = \frac{x - \mu}{\sigma} $$
*   *Plus robuste, méthode préférée des statisticiens.*

> **Règle d'or** : Toujours normaliser avant d'utiliser un algo basé sur les distances (KNN, K-Means, SVM).
