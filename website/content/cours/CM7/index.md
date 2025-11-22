---
title: "Chapitre 7 — Éthique, Limites et Société"
---

## 🎯 Objectifs d'apprentissage

- **Développer** un esprit critique face au "Hype" de l'IA.
- **Comprendre** les mécanismes des biais algorithmiques et leurs conséquences sociales.
- **Connaître** les enjeux d'explicabilité (Black Box).
- **Appréhender** le cadre légal (RGPD, AI Act) et l'impact environnemental.

---

## 1. Les Biais Algorithmiques

On entend souvent : *"L'ordinateur est neutre, c'est des maths."* **C'est faux.**
Une IA est le reflet des données sur lesquelles elle a été entraînée. Si les données contiennent les préjugés de la société, l'IA va les apprendre et les amplifier.

### 1.1 Exemples célèbres
*   **Recrutement (Amazon)** : Un algo entraîné sur 10 ans de CV (majoritairement masculins dans la tech) a appris à pénaliser le mot "femme" ou les noms d'écoles féminines. Il a dû être abandonné.
*   **Justice (COMPAS)** : Un logiciel américain prédisant la récidive attribuait systématiquement un risque plus élevé aux personnes noires, à dossier égal.
*   **Reconnaissance faciale** : Les modèles marchent souvent moins bien sur les peaux foncées car les datasets d'entraînement contiennent surtout des personnes blanches.

### 1.2 D'où vient le biais ?
1.  **Biais de données** : L'échantillon n'est pas représentatif de la population.
2.  **Biais historique** : La réalité elle-même est biaisée (ex: écarts de salaire H/F), l'IA ne fait que le constater et le reproduire.

---

## 2. Sécurité et Robustesse (Attaques Adverses)

Les réseaux de neurones sont fragiles. On peut tromper une IA avec des **Exemples Adverses**.
Il suffit d'ajouter un bruit invisible à l'œil nu sur une photo de Panda pour que l'IA soit sûre à 99% que c'est un Gibbon.
Cela pose un énorme problème de sécurité : imaginez un panneau "Stop" avec un autocollant spécial qui le fait passer pour un panneau "Limitation 100" aux yeux d'une voiture autonome.

---

## 3. L'Explicabilité (XAI) et la "Boîte Noire"

Les réseaux de neurones profonds (Deep Learning) sont des **Black Boxes**.
On sait ce qui rentre (Input) et ce qui sort (Output), mais les millions de calculs intermédiaires sont illisibles pour un humain.

### Pourquoi est-ce grave ?
*   **Droit à l'explication** : Si une banque vous refuse un prêt ou si une IA médicale diagnostique un cancer, vous avez le droit de savoir **pourquoi**. "L'ordinateur a dit non" n'est pas acceptable juridiquement ni éthiquement.
*   **Débogage** : Si on ne comprend pas comment l'IA décide, on ne peut pas corriger ses erreurs (ex: une voiture autonome qui confond la lune et un feu orange).

---

## 4. Impact Environnemental

L'IA "virtuelle" a un coût physique bien réel.

*   **Entraînement** : Entraîner un modèle comme GPT-4 consomme autant d'électricité qu'une petite ville pendant des mois.
*   **Inférence** : Chaque requête à ChatGPT consomme de l'eau (pour refroidir les serveurs) et de l'électricité. Une recherche Google "IA" consomme 10x à 30x plus qu'une recherche classique.
*   **Matériel** : La fabrication des GPU nécessite des terres rares et de l'eau.

---

## 5. Cadre Légal et Régulation

L'Europe est pionnière dans la régulation de l'IA.

### 5.1 Le RGPD (2018)
L'article 22 protège les citoyens contre les décisions **entièrement automatisées** ayant un effet juridique. Un humain doit toujours pouvoir intervenir ("Human in the loop").

### 5.2 L'AI Act (2024)
C'est la première loi globale sur l'IA. Elle classe les IA par niveau de risque :
1.  **Risque Inacceptable (Interdit)** : Notation sociale (comme en Chine), manipulation subliminale, reconnaissance faciale de masse en temps réel dans l'espace public.
2.  **Haut Risque (Régulé)** : IA dans la santé, l'éducation, le recrutement, la justice. Obligation de transparence, de qualité des données et de supervision humaine.
3.  **Risque Limité** : Chatbots (doivent dire qu'ils sont des robots), Deepfakes (doivent être marqués comme tels).

---

## 6. Avenir du Travail

L'IA ne va probablement pas "remplacer" les humains, mais **les humains qui utilisent l'IA vont remplacer ceux qui ne l'utilisent pas**.
On se dirige vers une collaboration Homme-Machine (IA Augmentée) plutôt qu'un grand remplacement, même si certains métiers répétitifs ou basés sur la synthèse d'information seront fortement impactés.

---

**Fin du cours !**
