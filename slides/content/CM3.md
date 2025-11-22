---
title: CM3 - Évaluation et Validation
---

# CM3 : Évaluation et Validation

---

<!-- SLIDE -->

## 1. Le Danger du "Par Cœur"

Si on teste le modèle sur les données qu'il a déjà vues, il triche (mémoire).
Il faut tester sa capacité à **généraliser**.

<!-- SLIDE -->

## Train / Test Split

On coupe les données en deux :
1.  **Train Set (80%)** : Pour l'entraînement.
2.  **Test Set (20%)** : Pour l'examen final (données jamais vues).

> **Jamais** d'entraînement sur le Test Set !

---

<!-- SLIDE -->

## 2. Sur-apprentissage (Overfitting)

Le modèle apprend "trop bien" le Train Set (y compris le bruit), mais échoue sur le Test Set.
*   *Analogie* : L'étudiant qui apprend les exos par cœur mais rate l'examen si on change les chiffres.

<iframe class="embedded-notebook" src="/observables/overfitting/index.html" width="100%" height="600px"></iframe>

<!-- SLIDE -->

## Sous-apprentissage (Underfitting)

Le modèle est trop simple pour capturer la logique des données.
*   *Exemple* : Utiliser une droite pour prédire une trajectoire courbe.

---

<!-- SLIDE -->

## 3. Métriques de Classification

L'Accuracy (Taux de réussite) ne suffit pas, surtout si les classes sont déséquilibrées.

*   **Matrice de Confusion** : Qui est confondu avec qui ?
*   **Précision** : Quand il dit "Oui", a-t-il raison ?
*   **Rappel (Recall)** : Trouve-t-il tous les "Oui" ?

<!-- SLIDE -->

## F1-Score

Moyenne harmonique de la Précision et du Rappel.
$$ F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall} $$

Utile pour chercher un compromis.

---

<!-- SLIDE -->

## 4. Validation Croisée (Cross-Validation)

Pour éviter le hasard d'une seule découpe Train/Test.
On découpe en K parties (Folds).
On entraîne K fois en changeant la partie de test.

> Plus robuste, mais plus long à calculer.
