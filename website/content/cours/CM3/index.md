---
title: "Chapitre 3 — Évaluation et Validation"
---

## 🎯 Objectifs d'apprentissage

- **Comprendre** pourquoi on ne teste jamais sur les données d'entraînement.
- **Maîtriser** le protocole de validation (Train / Test Split).
- **Savoir lire** une Matrice de Confusion.
- **Calculer et interpréter** les métriques clés : Précision, Rappel, F1-Score.
- **Diagnostiquer** le sur-apprentissage (Overfitting) et le sous-apprentissage (Underfitting).

---

## 1. Le Protocole d'Évaluation

Comment savoir si notre IA est "intelligente" ou si elle a juste appris par cœur ?

### 1.1 L'analogie de l'examen

Imaginez un professeur qui donne 100 exercices à ses élèves pour s'entraîner.
*   **Cas A** : L'examen final est composé de 10 exercices tirés *exactement* des 100 exercices d'entraînement.
    *   *Résultat* : Un élève qui a appris les réponses par cœur aura 20/20 sans rien comprendre.
*   **Cas B** : L'examen final est composé de 10 *nouveaux* exercices, jamais vus, mais du même type.
    *   *Résultat* : Seul l'élève qui a compris la logique réussira.

En Machine Learning, on veut éviter le Cas A. On veut tester la capacité de **généralisation**.

### 1.2 Train / Test Split

La règle d'or est de diviser nos données disponibles en deux ensembles disjoints **avant** de commencer quoi que ce soit.

1.  **Jeu d'Entraînement (Train Set)** : Environ **80%** des données. C'est le manuel scolaire. Le modèle l'utilise pour ajuster ses paramètres (trouver la droite, les voisins, etc.).
2.  **Jeu de Test (Test Set)** : Environ **20%** des données. C'est l'examen final. On le cache au modèle pendant l'entraînement. On ne l'utilise qu'à la toute fin pour mesurer la performance.

> **Attention** : Il est strictement interdit d'entraîner le modèle sur le Test Set. Sinon, c'est de la triche (Data Leakage).

### 1.3 La Validation Croisée (Cross-Validation)

Le problème du Train/Test Split simple, c'est que le résultat peut dépendre du hasard du découpage. Si vous avez de la chance, le Test Set est "facile". Si vous n'avez pas de chance, il est "difficile".

Pour avoir une estimation plus robuste, on utilise la **K-Fold Cross-Validation** :
1.  On coupe les données en **K** parts égales (ex: K=5).
2.  On entraîne sur 4 parts et on teste sur la 5ème.
3.  On recommence en changeant la part de test.
4.  On fait ça 5 fois.
5.  On fait la **moyenne** des 5 scores obtenus.

C'est la méthode standard quand on a peu de données (< 10 000 exemples).

---

## 2. Métriques de Classification

Dire "mon modèle a 90% de réussite" (Accuracy) ne suffit pas, surtout si les classes sont déséquilibrées.
*Exemple : Dans un dataset de détection de cancer où 99% des patients sont sains, un modèle qui dit "Tout le monde est sain" a 99% de réussite... mais il est inutile.*

### 2.1 La Matrice de Confusion

C'est l'outil fondamental pour disséquer les erreurs. C'est un tableau croisé entre la réalité et la prédiction.

Prenons un classifieur binaire (Chat vs Non-Chat) :

| | **Prédit : CHAT** (Positif) | **Prédit : NON-CHAT** (Négatif) |
| :--- | :---: | :---: |
| **Vrai : CHAT** | **Vrai Positif (VP)** <br> *(Bravo !)* | **Faux Négatif (FN)** <br> *(Loupé, c'était un chat)* |
| **Vrai : NON-CHAT** | **Faux Positif (FP)** <br> *(Fausse alerte)* | **Vrai Négatif (VN)** <br> *(Bravo !)* |

> **Exemple Numérique** :
> Sur 100 images (50 chats, 50 chiens) :
> *   **VP = 40** (40 chats bien reconnus)
> *   **FN = 10** (10 chats ratés, pris pour des chiens)
> *   **FP = 5** (5 chiens pris pour des chats)
> *   **VN = 45** (45 chiens bien reconnus)

### 2.2 Les Métriques Dérivées

À partir de ces 4 nombres, on calcule des scores plus fins :

1.  **Précision (Precision)** : La qualité de la prédiction positive.
    *   *"Quand le modèle crie 'CHAT', a-t-il raison ?"*
    *   $$ \text{Précision} = \frac{VP}{VP + FP} $$
    *   *Important pour* : Filtre anti-spam (on ne veut pas mettre un mail important en spam).

2.  **Rappel (Recall / Sensibilité)** : La capacité à trouver tous les positifs.
    *   *"Parmi tous les vrais chats qui existent, combien en a-t-il trouvé ?"*
    *   $$ \text{Rappel} = \frac{VP}{VP + FN} $$
    *   *Important pour* : Médecine (on ne veut rater aucun malade, quitte à faire des fausses alertes).

3.  **F1-Score** : La moyenne harmonique des deux.
    *   C'est un bon résumé si on veut un équilibre entre Précision et Rappel.
    *   $$ F1 = 2 \times \frac{\text{Précision} \times \text{Rappel}}{\text{Précision} + \text{Rappel}} $$

### 2.3 Courbe ROC et AUC

Quand un modèle prédit une probabilité (ex: "Il y a 70% de chances que ce soit un chat"), on doit choisir un **seuil** pour décider (ex: si > 50% alors Chat).
Mais si on bouge ce seuil, la Précision et le Rappel changent !

La **Courbe ROC** (Receiver Operating Characteristic) trace le taux de Vrais Positifs contre le taux de Faux Positifs pour **tous les seuils possibles**.

*   **AUC (Area Under Curve)** : C'est l'aire sous cette courbe.
    *   **AUC = 0.5** : Le modèle tire à pile ou face (nul).
    *   **AUC = 1.0** : Le modèle est parfait.
    *   C'est une excellente métrique pour comparer deux modèles indépendamment du seuil choisi.

---

## 3. Le Fléau du Sur-apprentissage (Overfitting)

C'est le problème n°1 en Machine Learning.

### 3.1 Définition

L'**Overfitting**, c'est quand le modèle apprend "trop bien" les données d'entraînement, y compris leur bruit et leurs anomalies, au point de perdre la vue d'ensemble.
Il devient excellent sur le Train Set, mais catastrophique sur le Test Set.

*   **Analogie** : Un costume taillé sur mesure pour une personne précise n'ira à personne d'autre. Un costume de prêt-à-porter (plus général) ira "à peu près" à tout le monde.

### 3.2 Le Sous-apprentissage (Underfitting)

C'est l'inverse. Le modèle est trop simple pour capturer la logique des données. Il est mauvais en Train ET en Test.
*   *Exemple* : Essayer de prédire la bourse avec une simple ligne droite.

### 3.3 Le Compromis Biais-Variance

En statistique, l'erreur d'un modèle se décompose en trois termes (Décomposition Biais-Variance) :

$$ E[(y - \hat{f}(x))^2] = \text{Biais}^2 + \text{Variance} + \sigma^2 $$

1.  **Biais (Bias)** : Erreur due à des hypothèses trop simplistes (ex: croire que tout est une ligne droite). Un fort biais entraîne du **Sous-apprentissage**.
2.  **Variance** : Erreur due à une trop grande sensibilité aux petites fluctuations du jeu d'entraînement. Une forte variance entraîne du **Sur-apprentissage**.
3.  **Erreur Irréductible ($\sigma^2$)** : Le bruit inhérent aux données, qu'aucun modèle ne peut prédire.

On cherche le juste milieu (le "Sweet Spot") pour minimiser la somme Biais² + Variance.

| État | Performance Train | Performance Test | Diagnostic | Solution |
| :--- | :--- | :--- | :--- | :--- |
| **Underfitting** | Mauvaise | Mauvaise | Modèle trop simple | Complexifier le modèle (plus de paramètres). |
| **Bon Modèle** | Bonne | Bonne | Équilibre trouvé | - |
| **Overfitting** | Excellente | Mauvaise | Modèle trop complexe | Simplifier, ajouter des données, régulariser. |

### 3.4 Visualisation Interactive

Jouez avec le **degré du polynôme** (la complexité du modèle).
*   **Degré 1 (Ligne droite)** : Underfitting. Le modèle est trop rigide pour suivre la courbe verte.
*   **Degré 3-4** : Bon modèle. Il capture la forme générale.
*   **Degré 10+** : Overfitting. Le modèle (rouge) passe par tous les points bleus (Train Error $\approx$ 0) mais fait n'importe quoi entre les deux (Test Error explose).

<iframe class="embedded-notebook" src="/observables/overfitting/" width="100%" height="800" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;"></iframe>

---

**Prochain chapitre** : [Chapitre 4 — Apprentissage Non Supervisé](/cours/CM4/)
