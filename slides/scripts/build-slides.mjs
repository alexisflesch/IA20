#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content');
const outputDir = path.join(__dirname, '../public');
const observablesSource = path.join(__dirname, '../../observables');
const observablesDest = path.join(outputDir, 'observables');

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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    .reveal { font-size: 32px; color: #000; }
    .reveal h1, .reveal h2, .reveal h3 { text-transform: none; color: #000; }
    .reveal .slides { text-align: left; }
    .reveal .slides section { padding: 20px; color: #000; }
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
      plugins: [ RevealMarkdown, RevealMath.KaTeX ],
      katex: {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ]
      }
    });
  </script>
</body>
</html>`;

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

async function generateSlides() {
    console.log('[slides] Generating Reveal.js slides...');

    await fs.mkdir(outputDir, { recursive: true });

    // Copy observables
    try {
        await copyDir(observablesSource, observablesDest);
        console.log('[slides] Copied observables');
    } catch (err) {
        console.warn('[slides] Could not copy observables:', err.message);
    }

    const files = await fs.readdir(contentDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const file of mdFiles) {
        const content = await fs.readFile(path.join(contentDir, file), 'utf-8');

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
        let title = path.basename(file, '.md');
        let mainContent = content;

        if (frontmatterMatch) {
            const fm = frontmatterMatch[1];
            const titleMatch = fm.match(/title:\s*(.+)/);
            if (titleMatch) title = titleMatch[1];
            mainContent = content.substring(frontmatterMatch[0].length);
        }

        // Split by <!-- SLIDE -->
        const slides = mainContent.split(/<!--\s*SLIDE\s*-->/gi);
        const sections = slides
            .map(slide => slide.trim())
            .filter(slide => slide.length > 0)
            .map(slide => `      <section data-markdown>
        <textarea data-template>
${slide}
        </textarea>
      </section>`)
            .join('\n');

        const html = revealTemplate(title, sections);
        const outputPath = path.join(outputDir, file.replace('.md', '.html'));
        await fs.writeFile(outputPath, html);
        console.log(`[slides] Generated ${path.basename(outputPath)}`);
    }

    // Generate index
    const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slides IA20</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 2rem auto; padding: 1rem; }
    h1 { color: #284b63; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { color: #284b63; text-decoration: none; font-size: 1.2rem; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>📊 Slides du cours IA20</h1>
  <ul>
${mdFiles.map(f => `    <li><a href="${f.replace('.md', '.html')}">${f.replace('.md', '')}</a></li>`).join('\n')}
  </ul>
</body>
</html>`;

    await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml);
    console.log('[slides] Generated index.html');
    console.log('[slides] Done!');
}

generateSlides().catch(console.error);
