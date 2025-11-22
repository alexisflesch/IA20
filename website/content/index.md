---
title: "IA20 - Intelligence Artificielle"
---

<div class="landing-container">
  <div class="hero">
    <h1>IA20</h1>
    <p class="subtitle">Ressources pédagogiques pour le cours d'Intelligence Artificielle.</p>
  </div>

  <div class="landing-box">
    <a href="cours/" class="row">
      <span class="icon">📚</span>
      <div class="text-col">
        <span class="title">Cours magistral</span>
        <span class="desc">Chapitres CM1 à CM7</span>
      </div>
    </a>
    <a href="td/" class="row">
      <span class="icon">📝</span>
      <div class="text-col">
        <span class="title">Travaux Dirigés</span>
        <span class="desc">Feuilles d'exercices et corrections</span>
      </div>
    </a>
    <a href="tp/" class="row">
      <span class="icon">💻</span>
      <div class="text-col">
        <span class="title">Travaux Pratiques</span>
        <span class="desc">Notebooks et sujets Python</span>
      </div>
    </a>
    <a href="slides/" class="row">
      <span class="icon">📽️</span>
      <div class="text-col">
        <span class="title">Slides</span>
        <span class="desc">Présentations du cours</span>
      </div>
    </a>
  </div>
</div>

<style>
.landing-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero h1 {
  font-size: 4.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, var(--dark) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.3rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.landing-box {
  width: 100%;
  max-width: 700px;
  background: var(--lightgray);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.row:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.row + .row {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.icon {
  font-size: 2.5rem;
  min-width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.text-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--secondary);
}

.desc {
  color: var(--gray);
  font-size: 0.95rem;
}

@media (max-width: 600px) {
  .landing-container {
    padding: 2rem 1rem;
  }
  
  .hero h1 {
    font-size: 3rem;
  }
  
  .landing-box {
    padding: 1rem;
  }
  
  .row {
    padding: 1rem;
    gap: 1rem;
  }
  
  .icon {
    font-size: 1.8rem;
    min-width: 48px;
    height: 48px;
  }
}

/* Hide sidebars and center content on landing page */
#quartz-body .sidebar.left,
#quartz-body .sidebar.right {
  display: none !important;
}

@media (min-width: 800px) {
  #quartz-body {
    grid-template-columns: 1fr !important;
    grid-template-areas: 
      "grid-header"
      "grid-center"
      "grid-footer" !important;
  }
}
</style>