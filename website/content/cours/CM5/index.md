---
title: "Chapitre 5 — Réseaux de Neurones (Perceptron & MLP)"
---

## 🎯 Objectifs d'apprentissage

À l'issue de ce chapitre, vous serez capable de :
- Comprendre le principe du neurone artificiel (perceptron)
- Identifier les fonctions d'activation et leur rôle
- Comprendre l'architecture d'un réseau multicouche
- Saisir l'intuition de la descente de gradient
- Connaître les grandes familles de réseaux profonds

---

## 1. Du perceptron au neurone artificiel

### 1.1 Histoire : le perceptron de Rosenblatt (1957)

Le **perceptron** est le premier modèle de neurone artificiel, inventé par Frank Rosenblatt en 1957. C'est un classifieur linéaire binaire inspiré du fonctionnement d'un neurone biologique.

### 1.2 Fonctionnement mathématique

Un perceptron prend en entrée un vecteur $\mathbf{x} = (x_1, x_2, ..., x_n)$ et calcule :

$$
y = \text{sign}(w_1 x_1 + w_2 x_2 + ... + w_n x_n + b)
$$

Ou de manière plus compacte :

$$
y = \text{sign}(\mathbf{w} \cdot \mathbf{x} + b)
$$

Où :
- $\mathbf{w} = (w_1, w_2, ..., w_n)$ : **vecteur de poids** (coefficients)
- $b$ : **biais** (bias), décalage vertical
- $\text{sign}(z)$ : fonction qui renvoie +1 si $z \geq 0$, sinon -1

**Interprétation géométrique** : Le perceptron trace une frontière linéaire (droite en 2D, plan en 3D, hyperplan en dimension supérieure) qui sépare l'espace en deux régions.

### 1.3 Visualisation interactive

<iframe class="embedded-notebook" src="/observables/perceptron/" width="100%" height="900" frameborder="0"></iframe>

**Expérimentez** :
1. Ajoutez des points bleus (classe +1) avec un clic gauche
2. Ajoutez des points roses (classe -1) avec un clic droit
3. Ajustez les poids $w_1$, $w_2$ et le biais $b$ pour séparer les classes
4. Observez comment la droite noire (frontière de décision) bouge
5. Les points mal classés sont entourés d'un cercle rouge

**Question** : Pouvez-vous séparer deux classes disposées en cercles concentriques avec un perceptron ? Pourquoi ?

---

## 2. Limitations du perceptron : le problème XOR

Le perceptron ne peut classifier que des données **linéairement séparables**. 

### Exemple : la fonction XOR

| $x_1$ | $x_2$ | XOR |
|-------|-------|-----|
| 0     | 0     | 0   |
| 0     | 1     | 1   |
| 1     | 0     | 1   |
| 1     | 1     | 0   |

Ces 4 points ne peuvent pas être séparés par une seule droite ! C'est la **crise du perceptron** des années 1970.

**Solution** : Empiler plusieurs perceptrons en couches → **réseau multicouche**.

---

## 3. Réseaux de neurones multicouches (MLP)

### 3.1 Architecture

Un **Multi-Layer Perceptron (MLP)** est composé de :
- **Couche d'entrée** : les features $x_1, x_2, ..., x_n$
- **Couches cachées** : une ou plusieurs couches de neurones
- **Couche de sortie** : la prédiction $\hat{y}$

```
Entrée     Couche cachée     Sortie
  x₁  \      🔵           \
       \    /  \           🔵  →  ŷ
  x₂  --🔵      🔵        /
       /    \  /         
  x₃  /      🔵         
```

### 3.2 Calcul dans un neurone

Chaque neurone de la couche cachée calcule :

$$
h_j = f\left(\sum_{i} w_{ji} x_i + b_j\right)
$$

Où $f$ est une **fonction d'activation** non linéaire.

---

## 4. Fonctions d'activation

Les fonctions d'activation introduisent de la **non-linéarité**, permettant au réseau d'apprendre des relations complexes.

### 4.1 Sigmoïde

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

- Sort entre 0 et 1
- Historiquement populaire
- Problème : gradients qui "s'évanouissent" pour $|z|$ grand

### 4.2 Tangente hyperbolique (tanh)

$$
\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}
$$

- Sort entre -1 et 1
- Centrée en 0 (mieux que sigmoïde)

### 4.3 ReLU (Rectified Linear Unit)

$$
\text{ReLU}(z) = \max(0, z)
$$

- **La plus utilisée** aujourd'hui
- Simple et efficace
- Résout le problème des gradients évanescents
- Variantes : Leaky ReLU, ELU, GELU

### 4.4 La Sortie : Softmax (Classification Multi-classe)

Si on veut classer une image en 3 classes (Chat, Chien, Oiseau), la couche de sortie aura 3 neurones. Ils vont sortir des scores bruts (logits), par exemple : [2.0, 1.0, 0.1].
Pour transformer ça en probabilités (qui somment à 1), on utilise la fonction **Softmax** :

$$ P(y=j) = \frac{e^{z_j}}{\sum_{k} e^{z_k}} $$

Cela "écrase" les scores pour qu'ils deviennent une distribution de probabilité (ex: [0.7, 0.2, 0.1]).

**Graphique comparatif** :

### 4.5 Visualisation Interactive

Comparez les différentes fonctions d'activation.
*   **Sigmoïde** : Écrase tout entre 0 et 1.
*   **ReLU** : Laisse passer le positif, met à zéro le négatif. C'est la plus efficace pour les réseaux profonds.

<iframe class="embedded-notebook" src="/observables/activation-functions/" width="100%" height="500" frameborder="0" style="border: 1px solid #eee; border-radius: 8px;"></iframe>

---

## 5. Apprentissage : la descente de gradient

### 5.1 Fonction de coût

Pour entraîner le réseau, on définit une **fonction de coût** $E$ qui mesure l'erreur :

$$
E(\mathbf{w}) = \frac{1}{N} \sum_{i=1}^{N} (\hat{y}_i - y_i)^2
$$

(Erreur quadratique moyenne pour la régression)

### 5.2 Principe de la descente de gradient

On cherche les poids $\mathbf{w}$ qui **minimisent** $E$. Pour cela :

1. Calculer le **gradient** $\nabla E = \frac{\partial E}{\partial \mathbf{w}}$ (direction de plus forte montée)
2. Mettre à jour les poids dans la **direction opposée** :

$$
w \leftarrow w - \eta \frac{\partial E}{\partial w}
$$

Où $\eta$ est le **taux d'apprentissage** (learning rate), petit nombre comme 0.01.

### 5.3 Métaphore visuelle

Imaginez que vous êtes dans le brouillard au sommet d'une montagne (erreur élevée). Vous voulez descendre dans la vallée (erreur minimale). À chaque pas :
- Vous sentez la pente sous vos pieds (gradient)
- Vous faites un pas dans la direction de descente
- Vous recommencez jusqu'à atteindre le fond

**Rétropropagation** (backpropagation) : algorithme efficace pour calculer les gradients en propageant l'erreur de la sortie vers l'entrée.

> **Note pour les matheux** : La rétropropagation n'est rien d'autre qu'une application récursive du **théorème de dérivation des fonctions composées** (Chain Rule).
> Si $y = f(g(x))$, alors $\frac{dy}{dx} = f'(g(x)) \times g'(x)$.
> Dans un réseau, l'erreur est une fonction composée de milliers de couches : $E = L(f_n(...f_1(x)...))$. On remonte la chaîne des dérivées de la fin vers le début.

---

## 6. Architectures modernes

### 6.1 Réseaux convolutifs (CNN)

**Usage** : Vision par ordinateur, images

- **Convolutions** : détection de motifs locaux (bords, textures, formes)
- **Pooling** : réduction de dimension
- Exemples : AlexNet, VGG, ResNet

### 6.2 Réseaux récurrents (RNN, LSTM)

**Usage** : Séquences, texte, séries temporelles

- **Mémoire** : prise en compte du contexte passé
- LSTM (Long Short-Term Memory) : résout le problème des gradients évanescents
- Applications : traduction, reconnaissance vocale

### 6.3 Transformers

**Usage** : Traitement du langage (GPT, BERT), vision (ViT)

- **Attention** : pondération de l'importance des différents éléments
- Parallélisable (plus rapide que RNN)
- Base des LLM (Large Language Models) comme ChatGPT

### 6.4 Réseaux génératifs

- **GAN** (Generative Adversarial Networks) : génération d'images réalistes
- **Diffusion Models** : DALL·E, Stable Diffusion
- **VAE** (Variational Autoencoders) : compression et génération

---

## 7. En pratique

### 7.1 Frameworks populaires

- **PyTorch** : très utilisé en recherche
- **TensorFlow / Keras** : écosystème complet, bon pour la production
- **JAX** : calcul différentiable haute performance

### 7.2 Exemple simple en PyTorch

```python
import torch
import torch.nn as nn

# Définir un MLP simple
class SimpleMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(10, 64)  # 10 entrées → 64 neurones
        self.layer2 = nn.Linear(64, 32)  # 64 → 32
        self.layer3 = nn.Linear(32, 1)   # 32 → 1 sortie
        
    def forward(self, x):
        x = torch.relu(self.layer1(x))   # ReLU activation
        x = torch.relu(self.layer2(x))
        x = self.layer3(x)               # Pas d'activation en sortie
        return x

# Créer le modèle
model = SimpleMLP()

# Définir la fonction de coût et l'optimiseur
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Boucle d'entraînement (simplifié)
for epoch in range(100):
    # Forward pass
    predictions = model(X_train)
    loss = criterion(predictions, y_train)
    
    # Backward pass
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

---

## 8. Points clés à retenir

- Un **perceptron** est un classifieur linéaire simple : $y = \text{sign}(\mathbf{w} \cdot \mathbf{x} + b)$
- Les perceptrons seuls ne peuvent résoudre que des problèmes **linéairement séparables**
- Les **réseaux multicouches** (MLP) ajoutent des couches cachées avec activation non linéaire
- Les fonctions d'activation (ReLU, sigmoïde, tanh) apportent la **non-linéarité**
- L'apprentissage se fait par **descente de gradient** : ajuster les poids pour minimiser l'erreur
- Les architectures modernes (CNN, RNN, Transformers) sont des réseaux profonds spécialisés

---

## 🔗 Pour aller plus loin

- **3Blue1Brown** : [série vidéo sur les réseaux de neurones](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) (excellente visualisation)
- **Distill.pub** : [articles interactifs sur le deep learning](https://distill.pub/)
- **Cours Stanford CS231n** : [vision par ordinateur et CNN](http://cs231n.stanford.edu/)
- **The Neural Network Zoo** : [panorama des architectures](https://www.asimovinstitute.org/neural-network-zoo/)

---

**Prochain chapitre** : [Chapitre 6 — Deep Learning et IA Générative](/cours/CM6/)
