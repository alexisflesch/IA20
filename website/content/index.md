---
title: "IA20 - Intelligence Artificielle"
---

<div class="hero">
  <h1>IA20 - Intelligence Artificielle</h1>
  <p class="subtitle">Bienvenue sur le site du cours d'Intelligence Artificielle (L2). Ce portail regroupe l'ensemble des ressources pédagogiques.</p>
</div>

<div class="grid-cards">
  <a href="cours/CM1/" class="card">
    <div class="card-icon">📚</div>
    <div class="card-content">
      <h3>Le Cours</h3>
      <p>Accéder aux chapitres du cours magistral (CM1 à CM7).</p>
    </div>
  </a>
  <a href="td/TD1/" class="card">
    <div class="card-icon">📝</div>
    <div class="card-content">
      <h3>Travaux Dirigés</h3>
      <p>Exercices et corrections des TD.</p>
    </div>
  </a>
  <a href="tp/TP1/" class="card">
    <div class="card-icon">💻</div>
    <div class="card-content">
      <h3>Travaux Pratiques</h3>
      <p>Sujets de TP et notebooks Python.</p>
    </div>
  </a>
  <a href="slides/" class="card external">
    <div class="card-icon">📽️</div>
    <div class="card-content">
      <h3>Slides</h3>
      <p>Supports de présentation interactifs (Reveal.js).</p>
    </div>
  </a>
</div>

## 📚 Programme Détaillé

### Cours Magistraux
- [Chapitre 1 — Introduction et Représentation des données](cours/CM1/)
- [Chapitre 2 — Apprentissage Supervisé : Régression et KNN](cours/CM2/)
- [Chapitre 3 — Évaluation et Validation](cours/CM3/)
- [Chapitre 4 — Apprentissage Non Supervisé](cours/CM4/)
- [Chapitre 5 — Réseaux de Neurones (Perceptron & MLP)](cours/CM5/)
- [Chapitre 6 — Deep Learning et IA Générative](cours/CM6/)
- [Chapitre 7 — Éthique, Limites et Société](cours/CM7/)

### Travaux Dirigés
- [TD 1 — Vecteurs, Distances et Normalisation](td/TD1/)
- [TD 2 — Régression Linéaire et KNN](td/TD2/)
- [TD 3 — Évaluation de Modèles](td/TD3/)
- [TD 4 — Clustering K-Means](td/TD4/)
- [TD 5 — Réseaux de Neurones (Calculs Manuels)](td/TD5/)
- [TD 6 — Convolution et Deep Learning](td/TD6/)
- [TD 7 — Analyse Critique et Éthique](td/TD7/)

### Travaux Pratiques
- [TP 1 — Introduction à Python pour la Data Science](tp/TP1/)
- [TP 2 — Régression Linéaire](tp/TP2/)
- [TP 3 — Classification KNN](tp/TP3/)
- [TP 4 — Clustering K-Means](tp/TP4/)
- [TP 5 — Réseaux de Neurones (MLP)](tp/TP5/)
- [TP 6 — Mini-Projet](tp/TP6/)

<style>
.hero {
  text-align: center;
  margin-bottom: 3rem;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, var(--secondary), var(--tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid var(--lightgray);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  background: var(--light);
  gap: 1.5rem;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border-color: var(--secondary);
}
.card-icon {
  font-size: 2.5rem;
  line-height: 1;
  padding: 1rem;
  background: var(--lightgray);
  border-radius: 12px;
  transition: background 0.2s;
}
.card:hover .card-icon {
  background: var(--highlight);
}
.card-content {
  flex: 1;
}
.card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--dark);
  font-size: 1.2rem;
}
.card p {
  margin: 0;
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.4;
}
</style>