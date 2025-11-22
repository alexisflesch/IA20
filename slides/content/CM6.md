---
title: CM6 - Deep Learning
---

# CM6 : Deep Learning

---

<!-- SLIDE -->

## 1. Pourquoi "Deep" ?

Avant 2010, on n'arrivait pas à entraîner des réseaux profonds (> 3 couches).
Révolution :
*   **Big Data** (Internet).
*   **GPU** (Calcul parallèle).
*   **Algorithmes** (ReLU, Adam, Dropout).

Maintenant : des centaines de couches !

---

<!-- SLIDE -->

## 2. Vision par Ordinateur (CNN)

Traiter une image pixel par pixel ne marche pas (trop de connexions, pas d'invariance spatiale).

**Convolution** : On passe des filtres (kernels) sur l'image.
*   Détecte les bords, puis les formes, puis les objets.
*   Inspiré du cortex visuel.

<!-- SLIDE -->

## Architecture CNN

1.  **Convolution** : Extraction de features.
2.  **Pooling** : Réduction de taille (résumé).
3.  **Fully Connected** : Classification finale.

---

<!-- SLIDE -->

## 3. Traitement du Langage (NLP)

Comprendre le texte, la traduction, le résumé.

**Révolution Transformer (2017)** :
*   Mécanisme d'**Attention** : Le modèle regarde toute la phrase d'un coup et comprend les liens entre les mots ("il" fait référence à "animal").
*   Parallélisable (contrairement aux RNN).

---

<!-- SLIDE -->

## 4. IA Générative

*   **LLM (GPT)** : Prédire le mot suivant. Entraîné sur tout Internet.
*   **Diffusion (DALL-E, Midjourney)** : Apprendre à débruiter une image pour générer du contenu à partir de bruit pur.
