#!/usr/bin/env node
// Watch observables/ (and optionally temp/ sources) and keep public/embeds/* up-to-date during dev
import chokidar from 'chokidar'
import { spawn } from 'node:child_process'
import fs from 'fs/promises'
import path from 'path'

const root = process.cwd()
const publicIndex = path.join(root, 'public', 'index.html')

function runBuild() {
    const p = spawn('node', ['./scripts/build-observables.mjs'], { stdio: 'inherit' })
    p.on('exit', (code) => {
        if (code !== 0) {
            console.error(`[watch:observables] build failed with code ${code}`)
        }
    })
}

async function waitForPublic() {
    for (let i = 0; i < 50; i++) {
        try {
            await fs.access(publicIndex)
            return
        } catch {
            await new Promise((r) => setTimeout(r, 200))
        }
    }
}

let timer = null
function trigger() {
    clearTimeout(timer)
    timer = setTimeout(runBuild, 150)
}

(async function main() {
    await waitForPublic()
    runBuild()

    const watcher = chokidar.watch([
        'observables/**',
        'temp/**', // optional bootstrap sources
    ], { ignoreInitial: true })

    watcher
        .on('add', trigger)
        .on('change', trigger)
        .on('unlink', trigger)

    // also watch for Quartz cleaning/rebuilding index.html at startup
    const publicWatcher = chokidar.watch(['public/index.html'], { ignoreInitial: true })
    publicWatcher.on('add', trigger).on('change', trigger)
})()
