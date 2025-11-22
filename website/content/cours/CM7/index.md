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

> [!info] Le Coin des Matheux : Définir l'Équité (Fairness)
> Comment prouver mathématiquement qu'un algorithme est "juste" ? Il existe plusieurs définitions incompatibles entre elles.
>
> Soit $\hat{Y}$ la prédiction (ex: embauché), $Y$ la réalité (ex: compétent), et $A$ un attribut protégé (ex: Genre, $A=0$ ou $A=1$).
>
> **1. Parité Démographique (Demographic Parity)**
> On exige que le taux de sélection soit le même pour tous les groupes.
> $$ P(\hat{Y}=1 | A=0) = P(\hat{Y}=1 | A=1) $$
> *Problème* : Si le groupe $A=1$ est réellement plus compétent en moyenne (biais historique), cette règle force l'algo à être moins précis pour respecter l'égalité.
>
> **2. Égalité des Chances (Equalized Odds)**
> On exige que les taux d'erreur soient les mêmes.
> $$ P(\hat{Y}=1 | Y=y, A=0) = P(\hat{Y}=1 | Y=y, A=1) $$
> Cela signifie que le taux de Vrais Positifs (et Faux Positifs) doit être identique pour les hommes et les femmes. C'est souvent considéré comme plus "juste" méritocratiquement.
>
> **3. Calibration (Predictive Parity)**
> On exige que la probabilité prédite reflète la même probabilité réelle pour tous les groupes.
> $$ P(Y=1 | \hat{Y}=s, A=0) = P(Y=1 | \hat{Y}=s, A=1) $$
> C'est souvent ce que cherchent les banques : si l'algo dit "risque 20%", cela doit signifier "20% de défaut" que l'on soit homme ou femme.
>
> **Théorème d'Impossibilité (Chouldechova, 2017)** : Il est mathématiquement impossible de satisfaire les trois critères en même temps si les groupes de base n'ont pas le même taux de succès réel. Il faut faire un choix politique.

---

## 2. Sécurité et Robustesse (Attaques Adverses)

Les réseaux de neurones sont fragiles. On peut tromper une IA avec des **Exemples Adverses**.
Il suffit d'ajouter un bruit invisible à l'œil nu sur une photo de Panda pour que l'IA soit sûre à 99% que c'est un Gibbon.

> **Visualisation** :
> $$ \text{Image Panda} + \epsilon \times \text{Bruit (Neige)} = \text{Image Panda (pour nous)} $$
> Mais pour l'IA :
> $$ \text{Panda (57\%)} + \text{Bruit} \rightarrow \text{Gibbon (99\%)} $$

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
C'est la première loi globale sur l'IA. Elle classe les IA par niveau de risque (Pyramide des risques) :

<div style="display: flex; justify-content: center; margin: 20px 0;">
  <svg width="350" height="250" viewBox="0 0 350 250">
    <!-- Green -->
    <polygon points="20,240 330,240 280,180 70,180" fill="#4caf50" stroke="white" stroke-width="2"/>
    <text x="175" y="220" text-anchor="middle" fill="white" font-weight="bold">Risque Minimal (Libre)</text>

    <!-- Yellow -->
    <polygon points="70,180 280,180 240,120 110,120" fill="#ffeb3b" stroke="white" stroke-width="2"/>
    <text x="175" y="160" text-anchor="middle" fill="black" font-weight="bold">Risque Limité (Transparence)</text>

    <!-- Orange -->
    <polygon points="110,120 240,120 200,60 150,60" fill="#ff9800" stroke="white" stroke-width="2"/>
    <text x="175" y="100" text-anchor="middle" fill="white" font-weight="bold">Haut Risque (Régulé)</text>

    <!-- Red -->
    <polygon points="150,60 200,60 175,10" fill="#f44336" stroke="white" stroke-width="2"/>
    <text x="175" y="45" text-anchor="middle" fill="white" font-weight="bold" font-size="10">Inacceptable (Interdit)</text>
  </svg>
</div>

1.  **Risque Inacceptable (Interdit)** :
    *   Notation sociale (Social Scoring).
    *   Manipulation subliminale.
    *   Reconnaissance faciale de masse en temps réel.
2.  **Haut Risque (Régulé)** :
    *   Santé, Éducation, Recrutement, Justice, Transports.
    *   *Obligations* : Transparence, Qualité des données, Supervision humaine.
3.  **Risque Limité (Transparence)** :
    *   Chatbots (doivent dire qu'ils sont des robots).
    *   Deepfakes (doivent être marqués comme tels).
4.  **Risque Minimal (Libre)** :
    *   Jeux vidéo, filtres anti-spam.

---

## 6. Avenir du Travail

L'IA ne va probablement pas "remplacer" les humains, mais **les humains qui utilisent l'IA vont remplacer ceux qui ne l'utilisent pas**.
On se dirige vers une collaboration Homme-Machine (IA Augmentée) plutôt qu'un grand remplacement, même si certains métiers répétitifs ou basés sur la synthèse d'information seront fortement impactés.

---

**Fin du cours !**
