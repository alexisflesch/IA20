#!/usr/bin/env node
// Build iframe-ready embeds for ALL notebooks in observables/*
// - Optionally bootstrap from temp/ for known sources (e.g., knn)
// - Remove inspector.css link and do not copy the CSS file
// - Copy needed JS modules and files/ assets
// - Output to public/observables/<slug>/

import fs from 'fs/promises'
import path from 'path'

const root = path.resolve(process.cwd())
const observablesDir = path.join(root, 'observables')
const publicEmbedsDir = path.join(root, 'public', 'observables')
const tempDir = path.join(root, 'temp')

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true })
}
async function exists(fp) {
    try { await fs.access(fp); return true } catch { return false }
}
async function read(fp) { return fs.readFile(fp, 'utf8') }
async function write(fp, data) { await ensureDir(path.dirname(fp)); await fs.writeFile(fp, data) }
async function copy(src, dest) { await ensureDir(path.dirname(dest)); await fs.copyFile(src, dest) }
async function listDirs(dir) {
    const names = await fs.readdir(dir, { withFileTypes: true })
    return names.filter(d => d.isDirectory()).map(d => d.name)
}
async function listFiles(dir) {
    const names = await fs.readdir(dir, { withFileTypes: true })
    return names.filter(f => f.isFile()).map(f => f.name)
}

function stripInspectorCssLink(html) {
    return html.replace(/\n?\s*<link[^>]*inspector\.css[^>]*>\s*/i, '')
}

async function cleanCopyExport(srcDir, destDir) {
    await ensureDir(destDir)

    // Handle index.html (remove inspector.css link if present)
    const indexHtml = path.join(srcDir, 'index.html')
    if (await exists(indexHtml)) {
        const html = await read(indexHtml)
        await write(path.join(destDir, 'index.html'), stripInspectorCssLink(html))
    } else {
        console.warn(`[observables] Missing index.html in ${srcDir}`)
    }

    // Copy top-level JS files (runtime.js, index.js, and modules like xxxx@nnn.js)
    const srcFiles = await listFiles(srcDir)
    for (const name of srcFiles) {
        if (!name.endsWith('.js')) continue
        await copy(path.join(srcDir, name), path.join(destDir, name))
    }

    // Copy files/ assets if present (skip Zone.Identifier streams)
    const srcFilesDir = path.join(srcDir, 'files')
    if (await exists(srcFilesDir)) {
        const entries = await fs.readdir(srcFilesDir)
        if (entries.length > 0) {
            await ensureDir(path.join(destDir, 'files'))
            for (const name of entries) {
                if (name.endsWith(':Zone.Identifier')) continue
                await copy(path.join(srcFilesDir, name), path.join(destDir, 'files', name))
            }
        }
    }
}

async function bootstrapFromTemp() {
    // Example mapping for known temp sources -> observables slug
    const planned = [
        {
            tempName: 'live-k-nearest-neighbors-classification',
            slug: 'knn',
        },
    ]
    for (const { tempName, slug } of planned) {
        const srcDir = path.join(tempDir, tempName)
        const outDir = path.join(observablesDir, slug)
        if (await exists(srcDir)) {
            // Only bootstrap if target is missing or empty
            const outExists = await exists(outDir)
            const outContent = outExists ? await fs.readdir(outDir) : []
            if (!outExists || outContent.length === 0) {
                console.log(`[observables] Bootstrapping ${slug} from temp/${tempName}`)
                await cleanCopyExport(srcDir, outDir)
            }
        }
    }
}

async function buildAll() {
    // one-time bootstrap for known sources
    await bootstrapFromTemp()

    if (!(await exists(observablesDir))) {
        console.warn(`[observables] No directory found at ${observablesDir}. Skipping.`)
        return
    }

    const slugs = await listDirs(observablesDir)
    if (slugs.length === 0) {
        console.warn(`[observables] No notebooks under ${observablesDir}. Skipping.`)
        return
    }

    await ensureDir(publicEmbedsDir)
    for (const slug of slugs) {
        const srcDir = path.join(observablesDir, slug)
        const outDir = path.join(publicEmbedsDir, slug)
        console.log(`[observables] Building ${slug} -> ${path.relative(root, outDir)}`)
        await cleanCopyExport(srcDir, outDir)
    }
}

buildAll().catch((err) => {
    console.error(err)
    process.exit(1)
})
