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

> **Définition Mathématique** :
> La convolution discrète en 2D d'une image $I$ par un noyau $K$ est donnée par :
> $$ (I * K)(x, y) = \sum_{i} \sum_{j} I(x-i, y-j) \cdot K(i, j) $$
> C'est une somme pondérée des pixels voisins.

<div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; margin: 20px 0;">
  <div style="text-align: center;">
    <p style="margin-bottom: 5px;"><strong>Image (5x5)</strong></p>
    <svg width="150" height="150" viewBox="0 0 150 150" style="background: white;">
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="white" stroke="#ccc" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="150" height="150" fill="url(#grid)" stroke="black" stroke-width="2"/>
      <rect x="0" y="0" width="90" height="90" fill="red" fill-opacity="0.2" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>
    </svg>
  </div>
  <div style="font-size: 24px; text-align: center;">➜</div>
  <div style="text-align: center;">
    <p style="margin-bottom: 5px;"><strong>Feature Map (3x3)</strong></p>
    <svg width="90" height="90" viewBox="0 0 90 90" style="background: white;">
      <defs>
        <pattern id="grid3" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="#e0f7fa" stroke="#006064" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="90" height="90" fill="url(#grid3)" stroke="black" stroke-width="2"/>
      <rect x="0" y="0" width="30" height="30" fill="#00bcd4" stroke="black" stroke-width="2"/>
    </svg>
  </div>
</div>

On fait glisser ce filtre sur toute l'image.
*   Un filtre peut être spécialisé pour détecter les **lignes verticales**.
*   Un autre pour les **lignes horizontales**.
*   Un autre pour les **coins**.

> **Visualisation : Le Filtre Glissant**
> Imaginez que vous regardez un grand tableau à travers un petit cadre en carton (3x3 cm).
> Vous déplacez ce cadre case par case. À chaque position, vous notez si ce que vous voyez ressemble au motif que vous cherchez (ex: une ligne verticale).
> Vous obtenez une nouvelle grille (la "Feature Map") qui indique où se trouvent les lignes verticales dans l'image.

### 1.2 L'Observable Interactif

Pour bien comprendre, rien de mieux que de manipuler soi-même les pixels.
Ci-dessous, vous pouvez voir comment le calcul se fait (partie 1) et l'effet des différents filtres sur une vraie image (partie 2).

<iframe src="/observables/convolution/index.html" width="100%" height="600px" style="border: none; background: #f9f9f9; border-radius: 8px;"></iframe>

### 1.3 Padding et Stride

Deux concepts clés pour contrôler la taille de sortie :
*   **Padding (Rembourrage)** : Ajouter des zéros autour de l'image avant de passer le filtre. Cela permet de garder la même taille d'image en sortie (sinon elle rétrécit à chaque couche).
*   **Stride (Pas)** : De combien de pixels on décale le filtre à chaque fois.
    *   Stride = 1 : On glisse pixel par pixel (précis).
    *   Stride = 2 : On saute un pixel sur deux (réduit la taille de sortie par 2).

### 1.4 La Non-Linéarité (ReLU)

Après chaque convolution, on applique une fonction d'activation. La plus courante est **ReLU (Rectified Linear Unit)**.
$$ f(x) = \max(0, x) $$
Concrètement, elle remplace toutes les valeurs négatives par zéro.
*   **Pourquoi ?** Pour casser la linéarité (sinon empiler des convolutions revient à faire une seule grosse convolution).
*   **Effet visuel** : Elle garde les caractéristiques détectées (positives) et supprime le "bruit" ou les anti-caractéristiques (négatives).

### 1.5 Le Pooling (Sous-échantillonnage)

Pour réduire la taille de l'image (et donc le nombre de calculs) et rendre l'IA invariante aux petites translations, on utilise le **Pooling**.
Le plus connu est le **Max Pooling**.
*   On prend une fenêtre (ex: 2x2).
*   On ne garde que la **valeur maximale** de cette fenêtre.
*   On jette les 3 autres pixels.

> **Analogie** : Si vous cherchez "Où est Charlie ?", peu importe qu'il soit au pixel (10,10) ou (11,11). L'important est de savoir qu'il est dans la zone "en haut à gauche". Le Pooling résume l'information : "Oui, il y a un motif intéressant dans cette zone".

### 1.6 La Classification Finale (Fully Connected)

Une fois que les couches de convolution et de pooling ont extrait les caractéristiques (oreilles, moustaches, queue...), on obtient une série de petites cartes (Feature Maps).
1.  **Flattening (Aplatissement)** : On transforme toutes ces cartes 2D en un long vecteur 1D.
2.  **Fully Connected (Dense)** : On connecte ce vecteur à un réseau de neurones classique (MLP).
3.  **Softmax** : La dernière couche donne les probabilités (ex: Chat 80%, Chien 20%).

---

## 2. Architectures Célèbres

L'histoire du Deep Learning est pavée de modèles légendaires qui ont gagné le concours ImageNet.

*   **LeNet-5 (1998)** : Yann LeCun. Pour lire les chèques (chiffres manuscrits). Très simple (2 convolutions).
*   **AlexNet (2012)** : Le "Big Bang". Premier CNN profond sur GPU. A écrasé la concurrence.
*   **VGG (2014)** : Très profond, utilise uniquement des petits filtres 3x3.
*   **ResNet (2015)** : Introduit les "connexions résiduelles" (skip connections) pour entraîner des réseaux ultra-profonds (152 couches) sans perdre le signal.

---

**Prochain chapitre** : [Chapitre 7 — Éthique, Limites et Société](/cours/CM7/)

