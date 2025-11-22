---
title: CM5 - Réseaux de Neurones
---

# CM5 : Réseaux de Neurones

---

<!-- SLIDE -->

## 1. Le Neurone Artificiel

Inspiré de la biologie (dendrites, axone, synapse).

Modèle mathématique (Perceptron) :
1.  **Entrées** pondérées ($x_i \cdot w_i$).
2.  **Somme** ($z = \sum x_i w_i + b$).
3.  **Activation** ($y = f(z)$).

<iframe class="embedded-notebook" src="/observables/perceptron/index.html" width="100%" height="400px"></iframe>

<!-- SLIDE -->

## Fonctions d'Activation

C'est ce qui introduit la **non-linéarité**. Sans elles, un réseau de neurones n'est qu'une grosse régression linéaire.

*   **Sigmoid** : $0 \to 1$ (Probabilité).
*   **ReLU** : $max(0, x)$ (Standard actuel).

<iframe class="embedded-notebook" src="/observables/activation-functions/index.html" width="100%" height="300px"></iframe>

---

<!-- SLIDE -->

## 2. Perceptron Multi-Couches (MLP)

Un seul neurone ne peut résoudre que des problèmes linéaires.
En les empilant en **couches**, on peut modéliser n'importe quelle fonction complexe.

*   Couche d'Entrée.
*   Couches Cachées (Hidden Layers).
*   Couche de Sortie.

<!-- SLIDE -->

## Théorème d'Approximation Universelle

> "Un réseau de neurones avec une seule couche cachée (assez grande) peut approximer n'importe quelle fonction continue."

C'est une machine à apprendre universelle.

---

<!-- SLIDE -->

## 3. Rétropropagation (Backpropagation)

Comment entraîner ce monstre ?
L'erreur commise en sortie est "renvoyée" vers l'arrière pour corriger les poids de chaque couche.

C'est une application de la **Règle de la Chaîne** (dérivées composées).
$$ \frac{\partial E}{\partial w} = \frac{\partial E}{\partial y} \times \frac{\partial y}{\partial z} \times \frac{\partial z}{\partial w} $$
