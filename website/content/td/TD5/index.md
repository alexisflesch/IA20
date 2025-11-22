---
title: "TD 5 — Réseaux de Neurones (Calculs Manuels)"
---

## 🎯 Objectifs

- Comprendre le fonctionnement interne d'un neurone.
- Calculer une "Forward Pass" complète.
- Comprendre la logique des portes logiques.
- Calculer une sortie Softmax.
- Intuition de la Rétropropagation.

---

## Exercice 1 : Le Perceptron Logique

Un perceptron calcule $y = 1$ si $w_1 x_1 + w_2 x_2 + b \geq 0$, et $0$ sinon.
On veut créer une porte **ET (AND)**.
Table de vérité :
*   (0, 0) -> 0
*   (0, 1) -> 0
*   (1, 0) -> 0
*   (1, 1) -> 1

**Questions :**
1.  Essayez les poids $w_1 = 1, w_2 = 1$.
2.  Trouvez une valeur de biais $b$ qui permet de satisfaire les 4 conditions.
    *   *Indice* : Il faut que $1 \times 1 + 1 \times 1 + b \geq 0$ (pour le cas 1,1)
    *   Et que $1 \times 0 + 1 \times 1 + b < 0$ (pour les autres).
3.  Dessinez la droite de séparation correspondante dans le plan $(x_1, x_2)$.

---

## Exercice 2 : Forward Pass (Réseau de Neurones)

On considère un petit réseau de neurones :
*   **Entrée** : $x = 2$
*   **Couche Cachée** : 2 neurones ($N_1, N_2$) avec fonction d'activation **ReLU**.
*   **Sortie** : 1 neurone ($N_{out}$) avec fonction **Identité** (pas d'activation).

**Poids :**
*   Vers $N_1$ : $w_{1} = 3, b_{1} = -1$
*   Vers $N_2$ : $w_{2} = -2, b_{2} = 1$
*   Vers $N_{out}$ : $w_{out1} = 2$ (venant de $N_1$), $w_{out2} = 1$ (venant de $N_2$), $b_{out} = 0$

**Questions :**
1.  Calculez l'entrée pré-activation de $N_1$ : $z_1 = w_1 x + b_1$.
2.  Calculez la sortie de $N_1$ : $h_1 = ReLU(z_1)$. Rappel : $ReLU(z) = \max(0, z)$.
3.  Calculez l'entrée pré-activation de $N_2$ : $z_2 = w_2 x + b_2$.
4.  Calculez la sortie de $N_2$ : $h_2 = ReLU(z_2)$.
5.  Calculez la sortie finale du réseau : $y = w_{out1} h_1 + w_{out2} h_2 + b_{out}$.

---

## Exercice 3 : Nombre de Paramètres

Les modèles modernes comme GPT-4 ont des milliards de paramètres. Calculons ceux d'un petit réseau.

Architecture :
*   Couche d'entrée : 10 neurones (features).
*   Couche cachée 1 : 50 neurones.
*   Couche cachée 2 : 20 neurones.
*   Couche de sortie : 1 neurone.

**Questions :**
1.  Combien de poids ($w$) y a-t-il entre l'entrée et la couche 1 ? (Chaque entrée est connectée à chaque neurone caché).
2.  Combien de biais ($b$) y a-t-il dans la couche 1 ?
3.  Calculez le nombre total de paramètres du réseau (Poids + Biais pour toutes les couches).

---

## Exercice 4 : Softmax (Classification Multi-classe)

Votre réseau doit classer une image en 3 classes : [Chat, Chien, Oiseau].
La couche de sortie produit les scores bruts (logits) suivants : $z = [2.0, 1.0, 0.1]$.

On applique la fonction Softmax : $P_i = \frac{e^{z_i}}{\sum e^{z_k}}$.

**Questions :**
1.  Calculez $e^{2.0}$, $e^{1.0}$ et $e^{0.1}$ (valeurs approx : 7.4, 2.7, 1.1).
2.  Calculez la somme totale.
3.  Calculez les probabilités pour chaque classe. La somme fait-elle bien 1 ?
4.  Quelle est la classe prédite ?

---

## Exercice 5 : Intuition de la Rétropropagation

On a un réseau ultra-simple : $x \xrightarrow{w} y$.
$y = w \cdot x$.
L'erreur est $E = (y - y_{vrai})^2$.

On veut savoir comment changer $w$ pour baisser l'erreur. C'est la dérivée $\frac{\partial E}{\partial w}$.
On utilise la règle de la chaîne (Chain Rule) :
$$ \frac{\partial E}{\partial w} = \frac{\partial E}{\partial y} \times \frac{\partial y}{\partial w} $$

**Données :** $x=2$, $w=3$, $y_{vrai}=10$.

**Questions :**
1.  Calculez $y$ actuel.
2.  Calculez le terme d'erreur $\frac{\partial E}{\partial y} = 2(y - y_{vrai})$.
3.  Calculez le terme d'activation $\frac{\partial y}{\partial w} = x$.
4.  Multipliez les deux pour obtenir le gradient final.
5.  Le gradient est-il positif ou négatif ? Faut-il augmenter ou diminuer $w$ ?
