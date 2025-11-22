#!/usr/bin/env node

import chokidar from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const contentDir = path.join(rootDir, 'content');
const publicDir = path.join(rootDir, 'public');

console.log('[watch-slides] Watching content/ for changes...');

let isBuilding = false;

const contentWatcher = chokidar.watch(`${contentDir}/**/*.md`, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

async function rebuildSlides(filePath) {
    if (isBuilding) return;

    isBuilding = true;
    const relativePath = path.relative(contentDir, filePath);
    console.log(`\n[watch-slides] ${relativePath} changed, rebuilding slides...`);

    try {
        const { stdout, stderr } = await execAsync('npm run build:slides', {
            cwd: rootDir
        });

        if (stdout) console.log(stdout.trim());
        if (stderr) console.error(stderr.trim());

        console.log('[watch-slides] ✓ Slides rebuilt successfully');
    } catch (error) {
        console.error('[watch-slides] ✗ Error rebuilding slides:', error.message);
    } finally {
        isBuilding = false;
    }
}

contentWatcher
    .on('change', rebuildSlides)
    .on('add', rebuildSlides)
    .on('unlink', rebuildSlides);

// Also watch Quartz public rebuilds and ensure slides are present afterwards.
// Quartz dev server rebuilds content into public/, which may wipe or override the folder.
// When we detect a rebuild (changes under public/ excluding slides/), we regenerate slides.
const publicWatcher = chokidar.watch([
    `${publicDir}/**/*`,
    `!${publicDir}/slides/**`
], {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

publicWatcher.on('all', (event, filePath) => {
    // Debounce frequent events by reusing the same rebuildSlides guard
    rebuildSlides(filePath);
});

// Run an initial slides build shortly after startup to populate /slides/*
setTimeout(() => {
    console.log('[watch-slides] Initial build of slides...');
    rebuildSlides(path.join(contentDir, 'index.md'));
}, 500);

console.log('[watch-slides] Ready! Edit any .md file in content/ or wait for Quartz rebuilds to trigger slides.');
