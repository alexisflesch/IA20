---
title: "TD 3 — Évaluation de Modèles"
---

## 🎯 Objectifs

- Construire une Matrice de Confusion.
- Calculer Précision, Rappel, Accuracy, F1.
- Tracer une courbe ROC manuellement.
- Analyser des cas d'usage réels.

---

## Exercice 1 : La Matrice de Confusion

Vous avez entraîné un modèle pour détecter des chats sur des photos.
Vous testez votre modèle sur 10 photos. Voici les résultats :

| Photo | Vraie Classe | Prédiction du Modèle |
| :--- | :--- | :--- |
| 1 | Chat | Chat |
| 2 | Chat | Chien |
| 3 | Chien | Chien |
| 4 | Chien | Chat |
| 5 | Chat | Chat |
| 6 | Chat | Chat |
| 7 | Chien | Chien |
| 8 | Chien | Chien |
| 9 | Chat | Chien |
| 10 | Chien | Chien |

**Questions :**
1.  Combien y a-t-il de **Vrais Positifs (VP)** ? (Vrai = Chat, Prédit = Chat)
2.  Combien y a-t-il de **Faux Négatifs (FN)** ? (Vrai = Chat, Prédit = Chien)
3.  Combien y a-t-il de **Faux Positifs (FP)** ? (Vrai = Chien, Prédit = Chat)
4.  Combien y a-t-il de **Vrais Négatifs (VN)** ? (Vrai = Chien, Prédit = Chien)
5.  Dessinez la Matrice de Confusion.

---

## Exercice 2 : Calcul des Métriques

À partir de la matrice de l'exercice 1 :

**Questions :**
1.  Calculez l'**Accuracy** (Taux de réussite global).
    *   Formule : $(VP + VN) / Total$
2.  Calculez la **Précision**.
    *   Formule : $VP / (VP + FP)$
    *   *Interprétation* : Quand le modèle dit "C'est un chat", a-t-il souvent raison ?
3.  Calculez le **Rappel** (Recall).
    *   Formule : $VP / (VP + FN)$
    *   *Interprétation* : A-t-il trouvé tous les chats qui existaient ?
4.  Calculez le **F1-Score**.
    *   Formule : $2 \times \frac{P \times R}{P + R}$

---

## Exercice 3 : Courbe ROC et Seuil

Un modèle ne sort pas juste "Chat" ou "Chien", mais une probabilité d'être un Chat.
Voici les probabilités prédites pour 5 images (les 3 premières sont des Chats, les 2 dernières des Chiens).

*   Img 1 (Chat) : 0.9
*   Img 2 (Chat) : 0.6
*   Img 3 (Chat) : 0.4 (Erreur potentielle)
*   Img 4 (Chien) : 0.7 (Erreur potentielle)
*   Img 5 (Chien) : 0.1

On doit choisir un **seuil** de décision. Si Proba > Seuil, on dit "Chat".

**Questions :**
1.  **Seuil = 0.5** : Quelles sont les prédictions ? Calculez le Taux de Vrais Positifs (TPR = Rappel) et le Taux de Faux Positifs (FPR = FP / Total Négatifs).
    *   *Rappel* : TPR = VP / (VP+FN). FPR = FP / (FP+VN).
2.  **Seuil = 0.8** : Le modèle devient plus sévère. Recalculez TPR et FPR.
3.  **Seuil = 0.2** : Le modèle devient plus laxiste. Recalculez TPR et FPR.
4.  Placez ces 3 points sur un graphique (Axe X = FPR, Axe Y = TPR). Reliez-les pour esquisser la courbe ROC.
5.  L'AUC (Aire sous la courbe) est-elle proche de 1 ou de 0.5 ?

---

## Exercice 4 : Analyse de Scénarios

Dans la vraie vie, on ne cherche pas toujours à maximiser l'Accuracy.

**Cas A : Détection de fraude bancaire**
*   La fraude est rare (0.1% des transactions).
*   Si on rate une fraude (Faux Négatif), la banque perd de l'argent.
*   Si on bloque une carte pour rien (Faux Positif), le client est juste un peu agacé.

**Cas B : Filtre Anti-Spam**
*   Si on laisse passer un spam (Faux Négatif), c'est gênant.
*   Si on met un mail important (offre d'emploi) dans les spams (Faux Positif), c'est catastrophique.

**Questions :**
1.  Dans le Cas A (Fraude), doit-on privilégier la Précision ou le Rappel ? Pourquoi ?
2.  Dans le Cas B (Spam), doit-on privilégier la Précision ou le Rappel ? Pourquoi ?
3.  Un modèle qui prédit "Pas Fraude" pour toutes les transactions aura une Accuracy de 99.9%. Est-il utile ? Qu'est-ce que cela nous apprend sur l'Accuracy ?
