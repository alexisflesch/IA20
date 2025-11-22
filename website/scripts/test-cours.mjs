#!/usr/bin/env node

import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")

const pathsToCheck = [
    "public/index.html",
    "public/cours/index.html",
    "public/cours/CM1/index.html",
    "public/cours/CM2/index.html",
    "public/cours/CM3/index.html",
    "public/cours/CM4/index.html",
    "public/cours/CM5/index.html",
    "public/cours/CM6/index.html",
    "public/cours/CM7/index.html",
    "public/observables/knn/index.html",
    "public/observables/distances/index.html",
]

async function checkExists(relPath) {
    const fullPath = path.join(projectRoot, relPath)
    try {
        await fs.access(fullPath)
        console.log(`✔ ${relPath}`)
        return true
    } catch {
        console.error(`✖ Missing: ${relPath}`)
        return false
    }
}

async function main() {
    console.log("Testing cours site build...")

    const results = await Promise.all(pathsToCheck.map(checkExists))
    if (!results.every(Boolean)) {
        throw new Error("Some expected pages are missing")
    }

    console.log("All cours site pages are present.")
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
