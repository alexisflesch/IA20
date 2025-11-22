---
title: "Chapitre 1 — Introduction et Représentation des données"
---

## 🎯 Objectifs d'apprentissage

- **Comprendre** ce qu'est l'IA, son histoire et ses grandes familles (Symbolique vs Connexionniste).
- **Savoir numériser** le monde réel : comment transformer une image, un texte ou un son en un vecteur de nombres.
- **Maîtriser** la notion de dimension et d'espace vectoriel.
- **Calculer** une distance entre deux données pour évaluer leur similarité.
- **Comprendre** l'importance cruciale de la normalisation des données.

---

## 1. Qu'est-ce que l'IA ?

### 1.1 Définition et Nuances

L'Intelligence Artificielle (IA) est un domaine vaste et parfois mal défini. Une définition pragmatique serait :
> "L'ensemble des théories et des techniques mises en œuvre en vue de réaliser des machines capables de simuler l'intelligence."

Il faut distinguer deux concepts souvent confondus :
*   **IA Faible (Weak AI)** : Une machine capable de résoudre **un** problème spécifique mieux qu'un humain (ex: jouer aux échecs, reconnaître un cancer sur une radio). C'est l'IA d'aujourd'hui.
*   **IA Forte (Strong AI / AGI)** : Une machine dotée de conscience, capable d'apprendre n'importe quelle tâche et de raisonner comme un humain. C'est l'IA de la science-fiction (pour l'instant).

### 1.2 Une brève histoire de l'IA

L'IA n'est pas née avec ChatGPT. C'est une discipline qui a connu des cycles d'euphorie ("Printemps de l'IA") et de désillusion ("Hivers de l'IA").

*   **1950 — Le Test de Turing** : Alan Turing propose un test : si un humain ne peut pas distinguer une machine d'un autre humain lors d'une conversation textuelle, la machine est "intelligente".
*   **1956 — Conférence de Dartmouth** : Naissance officielle du terme "Intelligence Artificielle".
*   **1950-1980 — L'Âge d'Or de l'IA Symbolique** : On pensait pouvoir tout résoudre avec de la logique formelle ("Si... Alors...").
    *   *Succès* : Les systèmes experts (médecine, échecs).
    *   *Échec* : Incapacité à gérer le flou, l'ambiguïté du langage ou la vision (reconnaître un chat est impossible avec des règles "Si... Alors...").
*   **1990-2010 — L'Ère du Machine Learning (Statistique)** : Changement de paradigme. On arrête de dicter les règles à la machine, on lui donne des **données** pour qu'elle trouve les règles elle-même.
*   **2012 — La Révolution Deep Learning** : Le retour des réseaux de neurones (inventés bien plus tôt) grâce à la puissance de calcul (cartes graphiques GPU) et aux mégadonnées (Big Data). AlexNet écrase la concurrence en reconnaissance d'image.
*   **2022 — L'Ère Générative** : ChatGPT, Midjourney. L'IA ne se contente plus de classer, elle crée.

### 1.3 Les trois paradigmes en résumé

| Paradigme | Période | Principe | Exemple |
| :--- | :--- | :--- | :--- |
| **Symbolique** | 1950-1990 | Règles logiques écrites par des humains. | "Si fièvre > 38°C et toux, alors grippe." |
| **Machine Learning** | 1990-2010 | Algorithmes statistiques apprenant sur des données structurées. | Prédire le prix d'une maison selon sa surface. |
| **Deep Learning** | 2010-... | Réseaux de neurones profonds apprenant des représentations complexes. | Reconnaître un visage, traduire un texte. |

---

## 2. Représentation des données : Tout est vecteur

Pour qu'un ordinateur puisse traiter une information (une image, une phrase, un son), cette information doit être convertie en une liste de nombres. C'est l'étape de **numérisation** ou d'**encodage**.

En mathématiques, une liste ordonnée de nombres s'appelle un **vecteur**.

### 2.1 Données Tabulaires (Structurées)

C'est le cas le plus simple. Imaginez un fichier Excel décrivant des appartements. Chaque ligne est un **exemple** (ou *sample*), chaque colonne est une **caractéristique** (ou *feature*).

| Surface ($m^2$) | Pièces | Étage | Prix (€) |
| :---: | :---: | :---: | :---: |
| 45 | 2 | 1 | 200 000 |
| 80 | 4 | 3 | 350 000 |

L'appartement n°1 est représenté par le vecteur $\mathbf{x}^{(1)}$ :
$$ \mathbf{x}^{(1)} = \begin{pmatrix} 45 \\ 2 \\ 1 \end{pmatrix} $$

Ici, notre espace est de **dimension 3** ($d=3$). Chaque appartement est un point dans un espace 3D.

### 2.2 Images (Non structurées)

Une image numérique est une grille de pixels.
*   **Noir et Blanc** : Chaque pixel est un nombre entre 0 (noir) et 255 (blanc).
    *   Une image de $28 \times 28$ pixels contient $28 \times 28 = 784$ nombres.
    *   Pour l'IA, on "aplatit" cette grille pour en faire un vecteur géant de dimension 784.
*   **Couleur (RGB)** : Chaque pixel a 3 valeurs (Rouge, Vert, Bleu).
    *   Une image $28 \times 28$ couleur est un vecteur de dimension $28 \times 28 \times 3 = 2352$.

> **Intuition** : Pour l'ordinateur, une photo de chat n'est pas une "image", c'est une liste de 2352 nombres. Si on change un pixel, on déplace légèrement le point dans cet espace gigantesque.

### 2.3 Texte (NLP)

Comment transformer "Le chat mange" en nombres ?
Une méthode simple est le **Bag of Words** (Sac de mots) :
1.  On définit un vocabulaire (ex: 10 000 mots).
2.  On compte la présence de chaque mot.

Phrase : "Le chat mange le poisson"
Vecteur : `[chat: 1, chien: 0, le: 2, mange: 1, poisson: 1, ...]`

C'est un vecteur très **creux** (beaucoup de zéros) et de très grande dimension.

---

## 3. Notion de Distance et Similarité

Une fois que nos données sont des points dans un espace vectoriel, on peut mesurer à quel point elles sont proches.
**En IA, la proximité géométrique signifie souvent une similarité sémantique.**
*   Deux appartements proches dans l'espace vectoriel ont des prix similaires.
*   Deux images proches (pixel par pixel) se ressemblent visuellement.

<iframe class="embedded-notebook" src="/observables/distances/index.html" width="100%" height="750px" style="border:none;"></iframe>

### 3.1 La Distance Euclidienne ($L_2$)

C'est la distance "à vol d'oiseau", celle que vous mesurez avec une règle. Elle découle du théorème de Pythagore.

Pour deux points $A$ et $B$ en 2 dimensions :
$$ d(A, B) = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2} $$

**Généralisation en dimension $d$** :
Pour deux vecteurs $\mathbf{u} = (u_1, ..., u_d)$ et $\mathbf{v} = (v_1, ..., v_d)$ :

$$ d(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{i=1}^{d} (u_i - v_i)^2} $$

> **Exercice mental** :
> *   Appartement A : 30m², 1 pièce. Vecteur $\mathbf{a} = (30, 1)$
> *   Appartement B : 32m², 2 pièces. Vecteur $\mathbf{b} = (32, 2)$
>
> Distance au carré : $(32-30)^2 + (2-1)^2 = 2^2 + 1^2 = 4 + 1 = 5$.
> Distance : $\sqrt{5} \approx 2.23$.

### 3.2 La Distance de Manhattan ($L_1$)

C'est la distance "taxi". Dans une ville quadrillée comme New York, on ne peut pas traverser les immeubles. On doit longer les rues.
$$ d(\mathbf{u}, \mathbf{v}) = \sum_{i=1}^{d} |u_i - v_i| $$
Dans l'exemple précédent : $|32-30| + |2-1| = 2 + 1 = 3$.

### 3.3 La Similarité Cosinus

Parfois, la magnitude (la longueur) du vecteur n'importe pas, seule sa **direction** compte.
*Exemple : Analyse de texte.*
*   Texte A : "Le chat mange." (Vecteur : [1, 1, 1])
*   Texte B : "Le chat mange. Le chat mange." (Vecteur : [2, 2, 2])

Ces deux textes ont le même sens, mais le vecteur B est deux fois plus long. La distance Euclidienne serait grande.
La **Similarité Cosinus** mesure l'angle $\theta$ entre les deux vecteurs.

$$ \text{Cosinus}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|} $$

*   Si $\cos(\theta) = 1$ : Angle de $0$ rad (Vecteurs colinéaires, sens identique).
*   Si $\cos(\theta) = 0$ : Angle de $\frac{\pi}{2}$ rad (Vecteurs orthogonaux, rien à voir).
*   Si $\cos(\theta) = -1$ : Angle de $\pi$ rad (Vecteurs opposés).

---

## 4. L'importance cruciale de la Normalisation

Regardons notre exemple immobilier :
*   Surface : varie de 10 à 200 (m²).
*   Nombre de pièces : varie de 1 à 5.

Si on calcule la distance entre deux appartements :
*   Différence de surface : 10 m² $\rightarrow$ contribution de $10^2 = 100$ à la distance.
*   Différence de pièces : 2 pièces $\rightarrow$ contribution de $2^2 = 4$ à la distance.

**Problème** : La variable "Surface" écrase complètement la variable "Pièces" juste parce que ses chiffres sont plus grands. L'algorithme va penser que le nombre de pièces n'a aucune importance !

### 4.1 La solution : Mise à l'échelle (Scaling)

Il faut ramener toutes les variables sur une échelle comparable. Il existe deux méthodes principales :

#### A. Normalisation Min-Max
On ramène tout entre 0 et 1. C'est simple mais sensible aux valeurs extrêmes (outliers).
$$ x_{norm} = \frac{x - x_{min}}{x_{max} - x_{min}} $$

#### B. Standardisation (Z-Score)
C'est la méthode préférée des statisticiens. On centre la distribution sur 0 et on réduit l'écart-type à 1.
$$ x_{std} = \frac{x - \mu}{\sigma} $$
*   $\mu$ (mu) : la moyenne.
*   $\sigma$ (sigma) : l'écart-type.

> **Note** : Si vos données suivent une loi Normale (Gaussienne), la Standardisation est bien plus robuste que le Min-Max.

**Exemple Min-Max** :
*   Surface min = 20, max = 120.
*   Mon appart fait 70m².
*   $x_{norm} = \frac{70 - 20}{120 - 20} = \frac{50}{100} = 0.5$.

Maintenant, la surface vaut 0.5 et le nombre de pièces (s'il est aussi normalisé) vaudra peut-être 0.4. Les deux variables ont désormais le même "poids" dans le calcul de distance.

---

## 5. Résumé du cours

1.  **L'IA** a évolué des règles logiques (Symbolique) vers l'apprentissage par l'exemple (Machine Learning).
2.  **Tout est vecteur** : Pour traiter le monde réel, on le transforme en listes de nombres.
3.  **L'espace vectoriel** : Chaque donnée est un point. La dimension de l'espace est le nombre de caractéristiques.
4.  **La distance** (Euclidienne) permet de mesurer la similarité entre deux données.
5.  **Normaliser** est obligatoire : Il ne faut jamais mélanger des unités différentes (mètres, kilos, euros) sans les mettre à la même échelle.

---

**Prochain chapitre** : [Chapitre 2 — Apprentissage Supervisé : Régression et KNN](/cours/CM2/)
