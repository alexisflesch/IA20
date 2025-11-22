---
title: "TD 7 — Analyse Critique et Éthique"
---

## 🎯 Objectifs

- Développer un esprit critique face aux résultats de l'IA.
- Identifier les biais.
- Comprendre les dilemmes éthiques.
- Découvrir les failles de sécurité (Adversarial Attacks).

---

## Exercice 1 : Le Biais de Recrutement (Étude de cas Amazon)

En 2014, Amazon a tenté de créer une IA pour trier les CVs. Ils ont entraîné le modèle sur 10 ans de CVs reçus par l'entreprise.
Résultat : L'IA pénalisait systématiquement les CVs contenant le mot "Women's" (ex: "Captain of Women's Chess Club") ou venant d'universités féminines.

**Questions :**
1.  L'algorithme était-il sexiste par nature (codé pour l'être) ?
2.  D'où venait le biais ? (Analysez les données d'entraînement).
3.  Si on enlève la colonne "Sexe" du dataset, le problème est-il résolu ? (Notion de variables corrélées / proxy).
4.  Comment aurait-on pu éviter ça ?

---

## Exercice 2 : Le Dilemme du Tramway (Voiture Autonome)

Une voiture autonome perd ses freins. Elle doit choisir entre :
*   **Option A** : Continuer tout droit et écraser 5 piétons qui traversent illégalement.
*   **Option B** : Donner un coup de volant et s'écraser contre un mur, tuant le passager (vous).

**Questions :**
1.  Que doit faire la voiture ? (Sondage à main levée).
2.  Si l'Option A est "écraser 1 enfant" vs "tuer le passager", votre avis change-t-il ?
3.  Qui est responsable ? Le constructeur ? Le développeur ? Le passager ? L'État ?
4.  Est-ce à l'IA de prendre cette décision éthique ?

---

## Exercice 3 : IA et Créativité (Droit d'auteur)

Les IA génératives (Midjourney, ChatGPT) sont entraînées sur des milliards d'œuvres trouvées sur Internet, souvent sans l'accord des auteurs.

**Débat :**
*   **Groupe A (Les Artistes)** : "C'est du vol. L'IA fait du collage sophistiqué de nos œuvres. On doit être rémunérés."
*   **Groupe B (Les Techs)** : "C'est de l'inspiration. Un humain aussi regarde des œuvres pour apprendre à dessiner. L'IA crée quelque chose de nouveau."

**Questions :**
1.  Trouvez 2 arguments forts pour le Groupe A.
2.  Trouvez 2 arguments forts pour le Groupe B.
3.  Quelle solution juridique proposeriez-vous ?

---

## Exercice 4 : Empreinte Carbone

Entraîner un gros modèle comme GPT-3 consomme autant d'énergie que 120 foyers américains pendant un an (environ 190 000 kWh) et émet 85 tonnes de CO2.

**Questions :**
1.  Est-ce justifié pour faire un chatbot ?
2.  Est-ce justifié pour une IA qui découvre de nouveaux médicaments contre le cancer ?
3.  Comment concilier progrès de l'IA et urgence climatique ? (Pistes : petits modèles, énergie verte, hardware spécialisé).

---

## Exercice 5 : Attaques Adverses (Sécurité)

Des chercheurs ont montré qu'en ajoutant un bruit imperceptible à une photo de Panda, une IA très performante se met à la classer comme "Gibbon" avec 99% de confiance.

**Questions :**
1.  Pourquoi l'IA se fait-elle avoir alors que l'humain voit toujours un Panda ? (Pensez à la dimension de l'espace et aux pixels).
2.  Quelles sont les conséquences possibles pour :
    *   Une voiture autonome (panneaux de signalisation) ?
    *   La reconnaissance faciale (caméras de surveillance) ?
    *   Un filtre de contenu illégal ?
3.  Comment pourrait-on se défendre contre ces attaques ? (Idée : Entraînement contradictoire).
