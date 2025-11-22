#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content');
const outputDir = path.join(__dirname, '../public/slides');

// Template Reveal.js
const revealTemplate = (title, sections) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Cours IA Slides</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reset.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/serif.css">
  <!-- Custom styles -->
  <link rel="stylesheet" href="../../assets/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    .reveal {
      font-size: 32px;
      color: #000000;
    }
    .reveal h1, .reveal h2, .reveal h3 {
      text-transform: none;
      color: #000000;
    }
    .reveal .slides {
      text-align: left;
    }
    .reveal .slides section {
      padding: 20px;
      color: #000000;
    }
    .reveal .controls {
      bottom: 16px;
      right: 16px;
    }
    .reveal .progress {
      height: 4px;
      background: #007acc;
    }
    .reveal code {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 3px;
      color: #000000;
    }
    .reveal .slide-number {
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">
${sections}
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/markdown/markdown.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/math/math.min.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      controls: true,
      progress: true,
      slideNumber: true,
      transition: 'slide',
      math: {
        mathjax: null,
        local: null
      },
      plugins: [ RevealMarkdown, RevealMath.KaTeX ],
      katex: {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\\\(', right: '\\\\)', display: false},
          {left: '\\\\[', right: '\\\\]', display: true}
        ]
      }
    });
  </script>
</body>
</html>`;

async function findMarkdownFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);

  if (match) {
    const frontmatter = {};
    const lines = match[1].split('\n');
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        frontmatter[key.trim()] = valueParts.join(':').trim();
      }
    }
    return {
      frontmatter,
      content: content.substring(match[0].length)
    };
  }

  return { frontmatter: {}, content };
}

async function generateSlides() {
  console.log('[slides] Generating Reveal.js slides from content...');

  // Créer le dossier de sortie
  await fs.mkdir(outputDir, { recursive: true });

  // Trouver tous les fichiers markdown
  const mdFiles = await findMarkdownFiles(contentDir);

  for (const mdFile of mdFiles) {
    // Ignorer index.md
    if (mdFile.endsWith('index.md')) continue;

    const content = await fs.readFile(mdFile, 'utf-8');
    const { frontmatter, content: mainContent } = extractFrontmatter(content);

    const title = frontmatter.title || path.basename(mdFile, '.md');

    // Séparer par <!-- SLIDE -->
    const slides = mainContent.split(/<!--\s*SLIDE\s*-->/gi);

    // Générer les sections HTML
    const sections = slides
      .map(slide => slide.trim())
      .filter(slide => slide.length > 0)
      .map(slide => `      <section data-markdown>
        <textarea data-template>
${slide}
        </textarea>
      </section>`)
      .join('\n');

    // Générer le HTML
    const html = revealTemplate(title, sections);

    // Déterminer le chemin de sortie - génère toujours index.html
    // Si le fichier est dans content/theme/theme.md -> slides/theme/
    const relativePath = path.relative(contentDir, path.dirname(mdFile));
    const dirPath = path.join(outputDir, relativePath);
    const outputPath = path.join(dirPath, 'index.html');

    // Créer les dossiers nécessaires
    await fs.mkdir(dirPath, { recursive: true });

    // Écrire le fichier
    await fs.writeFile(outputPath, html);

    console.log(`[slides] Generated ${path.relative(__dirname, outputPath)}`);
  }

  console.log('[slides] Done!');
}

generateSlides().catch(console.error);
