---
agent: agent
---
# AI Coding Agent Instructions

## Project Architecture
This is a monorepo-style project composed of three main parts:
1.  **Cours Site (`cours-site/`)**: A static documentation site built with **Quartz** (Node.js/TypeScript).
2.  **Slides Site (`slides-site/`)**: A presentation site built with **Reveal.js** and custom Node.js build scripts.
3.  **Observables (`observables/`)**: Interactive HTML/JS/Canvas visualizations embedded in both sites via iframes.

## Build & Workflow
The build process is sequential. Always build observables first, as they are dependencies for the sites.

### 1. Observables (Root)
-   **Source**: `observables/<slug>/` (HTML, JS, CSS).
-   **Build Command**: `node scripts/build-observables.mjs` (from project root).
-   **Output**: `public/observables/` (Root).
-   **Key Pattern**: Observables are standalone apps but must integrate visually.

### 2. Cours Site (Quartz)
-   **Directory**: `cours-site/`.
-   **Build Command**: `npx quartz build` (inside `cours-site/`).
-   **Serve Command**: `npx quartz build --serve`.
-   **Content**: Markdown files in `cours-site/content/`.

### 3. Slides Site (Reveal.js)
-   **Directory**: `slides-site/`.
-   **Build Command**: `npm run build` (inside `slides-site/`).
-   **Content**: Markdown files in `slides-site/content/`.
-   **Output**: `slides-site/public/`.

## Development Conventions

### Interactive Embeds (Observables)
-   **Embedding**: Use `<iframe class="embedded-notebook" src="/observables/<slug>/index.html" ...></iframe>`.
-   **Styling**: The class `.embedded-notebook` (defined in `assets/style.css`) handles sizing and transparency.
-   **Dark Mode Support**:
    -   Observables **must** support dark mode transparently.
    -   Implement a `syncTheme()` function that checks `window.parent.document.documentElement.getAttribute('saved-theme')`.
    -   Listen for `MutationObserver` on the parent's `saved-theme` attribute to toggle `body.dark` or similar classes dynamically.
    -   **Example**: See `observables/linear-regression/index.html` for the reference implementation of `syncTheme`.

### Content & Math
-   **Math Notation**: Use KaTeX syntax.
    -   Inline: `$ E = mc^2 $`
    -   Block: `$$ \sum_{i=0}^n x_i $$`
-   **Slides Markdown**:
    -   Located in `slides-site/content/`.
    -   Standard Markdown with Reveal.js features.

### File Operations
-   **Pathing**: Always use **absolute paths** for terminal commands (e.g., `cd /home/aflesch/IA20/cours-site`) to avoid `ENOENT` errors in this environment.
-   **Edits**: When editing observables, remember to rebuild them (`node scripts/build-observables.mjs`) and then rebuild the sites to see changes.

## Common Tasks
-   **Fixing Embeds**: If an iframe looks wrong (white background in dark mode), check the `syncTheme` logic in the observable's `index.html` and ensure CSS handles `body.dark`.
-   **Adding Content**: Add Markdown files to `cours-site/content` for the book and `slides-site/content` for the presentation. Keep filenames synchronized (e.g., `CM1.md`).
