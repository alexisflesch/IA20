---
title: "IA20 - Intelligence Artificielle"
---

<div class="landing-container">
  <div class="hero">
    <h1>IA20 - Intelligence Artificielle</h1>
    <p class="subtitle">Bienvenue sur le site du cours d'Intelligence Artificielle (L2). Ce portail regroupe l'ensemble des ressources pédagogiques.</p>
  </div>

  <div class="grid-cards">
    <a href="cours/" class="card">
      <div class="card-icon">📚</div>
      <div class="card-content">
        <h3>Le Cours</h3>
        <p>Accéder aux chapitres du cours magistral (CM1 à CM7).</p>
      </div>
    </a>
    <a href="td/" class="card">
      <div class="card-icon">📝</div>
      <div class="card-content">
        <h3>Travaux Dirigés</h3>
        <p>Exercices et corrections des TD.</p>
      </div>
    </a>
    <a href="tp/" class="card">
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
</div>

<style>
/* Hide default elements if they leak through */
.page-header, .popover-hint {
  display: none !important;
}

.landing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}
.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(120deg, var(--secondary), var(--tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}
.subtitle {
  font-size: 1.4rem;
  color: var(--gray);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  width: 100%;
}
.card {
  display: flex;
  align-items: center;
  padding: 2rem;
  border: 1px solid var(--lightgray);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  background: var(--light);
  gap: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: var(--secondary);
}
.card-icon {
  font-size: 3rem;
  line-height: 1;
  padding: 1.2rem;
  background: var(--lightgray);
  border-radius: 16px;
  transition: background 0.3s;
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
  font-size: 1.4rem;
  font-weight: 700;
}
.card p {
  margin: 0;
  color: var(--gray);
  font-size: 1rem;
  line-height: 1.5;
}
</style>