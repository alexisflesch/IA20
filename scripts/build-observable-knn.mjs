#!/usr/bin/env node
// Build a clean iframe-ready embed for the KNN Observable notebook
// - copies minimal files from temp/live-k-nearest-neighbors-classification
// - removes inspector.css and its link
// - writes to public/observables/knn/
// Run via: node scripts/build-observable-knn.mjs

import fs from 'fs/promises'
import path from 'path'

const root = path.resolve(process.cwd())
const srcDir = path.join(root, 'temp', 'live-k-nearest-neighbors-classification')
const outDir = path.join(root, 'public', 'observables', 'knn')

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true })
}

async function fileExists(fp) {
    try { await fs.access(fp); return true } catch { return false }
}

async function read(fp) { return fs.readFile(fp, 'utf8') }
async function write(fp, data) { await ensureDir(path.dirname(fp)); await fs.writeFile(fp, data) }
async function copy(src, dest) { await ensureDir(path.dirname(dest)); await fs.copyFile(src, dest) }

function stripInspectorCssLink(html) {
    // remove <link rel="stylesheet" ...inspector.css">
    return html.replace(/\n?\s*<link[^>]*inspector\.css[^>]*>\s*/i, '')
}

async function build() {
    if (!(await fileExists(srcDir))) {
        console.error(`Source folder not found: ${srcDir}`)
        process.exit(1)
    }

    await ensureDir(outDir)

    // Minimal required files
    const needed = [
        'index.html',
        'index.js',
        'runtime.js',
        '47259f70c12a1351@288.js',
        'e93997d5089d7165@2303.js',
    ]

    for (const rel of needed) {
        const src = path.join(srcDir, rel)
        const dest = path.join(outDir, rel)
        if (!(await fileExists(src))) {
            console.warn(`[knn] Missing file in source: ${rel}`)
            continue
        }
        if (rel === 'index.html') {
            const html = await read(src)
            const cleaned = stripInspectorCssLink(html)
            await write(dest, cleaned)
        } else {
            await copy(src, dest)
        }
    }

    // Copy any required asset images referenced by inputs library (capstan.gif)
    // Observable inputs file uses FileAttachment("capstan.gif"), which expects it under files/
    const filesDir = path.join(srcDir, 'files')
    if (await fileExists(filesDir)) {
        // Copy entire files/ to preserve expected paths
        const entries = await fs.readdir(filesDir)
        if (entries.length > 0) {
            await ensureDir(path.join(outDir, 'files'))
            for (const name of entries) {
                if (name.endsWith(':Zone.Identifier')) continue
                await copy(path.join(filesDir, name), path.join(outDir, 'files', name))
            }
        }
    }

    console.log(`[knn] Embed built at ${path.relative(root, outDir)}`)
}

build().catch((err) => {
    console.error(err)
    process.exit(1)
})
