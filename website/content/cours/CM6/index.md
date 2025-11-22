---
title: "Chapitre 6 — Deep Learning et IA Générative"
---

## 🎯 Objectifs d'apprentissage

- **Comprendre** les architectures spécialisées du Deep Learning.
- **Démystifier** la Vision par Ordinateur (CNN) et le Traitement du Langage (Transformers).
- **Saisir** le fonctionnement des IA Génératives modernes (LLM, Diffusion).

---

## 1. Vision par Ordinateur : Les CNN

Comment une IA reconnaît-elle un chat dans une image ? Pas en regardant les pixels un par un (ça ne marche pas si le chat bouge d'un centimètre). Elle utilise des **Réseaux de Neurones Convolutifs (CNN)**.

### 1.1 Le principe de la Convolution

L'idée est inspirée du cortex visuel animal. Au lieu de connecter tous les neurones à tous les pixels, on utilise des **filtres** (ou noyaux) de petite taille (ex: 3x3 pixels).

On fait glisser ce filtre sur toute l'image.
*   Un filtre peut être spécialisé pour détecter les **lignes verticales**.
*   Un autre pour les **lignes horizontales**.
*   Un autre pour les **coins**.

### 1.2 Padding et Stride

Deux concepts clés pour contrôler la taille de sortie :
*   **Padding (Rembourrage)** : Ajouter des zéros autour de l'image avant de passer le filtre. Cela permet de garder la même taille d'image en sortie (sinon elle rétrécit à chaque couche).
*   **Stride (Pas)** : De combien de pixels on décale le filtre à chaque fois.
    *   Stride = 1 : On glisse pixel par pixel (précis).
    *   Stride = 2 : On saute un pixel sur deux (réduit la taille de sortie par 2).

### 1.3 L'architecture en couches

C'est un assemblage hiérarchique :
1.  **Premières couches** : Détectent des formes simples (bords, textures).
2.  **Couches moyennes** : Assemblent ces formes (œil, oreille, roue).
3.  **Dernières couches** : Reconnaissent des objets entiers (visage, voiture).

C'est ce qu'on appelle l'**extraction de caractéristiques** (Feature Extraction) automatique. Avant le Deep Learning, les humains devaient coder ces règles à la main !

---

## 2. Traitement du Langage (NLP) : Les Transformers

Jusqu'en 2017, les IA lisaient le texte mot à mot (de gauche à droite), comme nous. Elles oubliaient souvent le début de la phrase quand elles arrivaient à la fin.
Puis est arrivé l'article "Attention Is All You Need" (Google), introduisant les **Transformers**.

### 2.1 Le Mécanisme d'Attention

Le Transformer lit toute la phrase **d'un coup** (en parallèle).
Pour chaque mot, il calcule son lien avec *tous* les autres mots de la phrase. C'est l'**Attention**.

*Exemple* : "L'animal ne traverse pas la rue car **il** est trop fatigué."
*   Pour comprendre le mot "**il**", le modèle porte une forte "attention" au mot "**animal**" et une faible attention au mot "rue".
*   Si la phrase était "...car **elle** est trop large", l'attention de "**elle**" se porterait sur "**rue**".

C'est cette capacité à saisir le contexte (Contextual Embedding) qui a tout changé.

---

## 3. L'IA Générative

L'IA classique (Discriminative) sert à **classer** (Chat ou Chien ?).
L'IA Générative sert à **créer** de nouvelles données qui ressemblent aux données d'entraînement.

### 3.1 Les LLM (Large Language Models)

GPT (Generative Pre-trained Transformer) est un Transformer géant entraîné sur une tâche simple : **Prédire le mot suivant**.

*   *Entraînement* : On lui donne des milliards de textes internet. On cache la fin des phrases et on lui demande de deviner. S'il se trompe, on corrige ses poids (Backpropagation).
*   *Résultat* : À force de jouer à ce jeu, il finit par apprendre la grammaire, les faits historiques, le raisonnement logique, et même le code informatique.
*   *Température* : C'est un paramètre qui contrôle la créativité.
    *   Température 0 : Il choisit toujours le mot le plus probable (réponse robotique).
    *   Température 1 : Il prend des risques (réponse créative mais parfois incohérente).

### 3.2 La Génération d'Images (Modèles de Diffusion)

C'est la technologie derrière Midjourney ou DALL-E.

*   **Principe** : On prend une image de chat et on ajoute progressivement du "bruit" (de la neige télévisuelle) jusqu'à ce qu'elle soit méconnaissable.
*   **Apprentissage** : On entraîne un réseau de neurones à faire l'inverse : partir du bruit et **retrouver l'image originale** (Denoising).
*   **Génération** : Pour créer une image, on part d'un bruit totalement aléatoire et on demande au réseau de le "nettoyer" en le guidant avec une description textuelle ("Un chat dans l'espace").

---

**Prochain chapitre** : [Chapitre 7 — Éthique, Limites et Société](/cours/CM7/)
