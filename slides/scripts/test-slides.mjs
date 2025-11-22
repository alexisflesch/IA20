#!/usr/bin/env node

import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.resolve(__dirname, "../public")

const requiredFiles = [
    "index.html",
    "CM1.html",
]

async function test() {
    console.log("Testing slides build...")

    const results = []
    for (const file of requiredFiles) {
        const fullPath = path.join(publicDir, file)
        try {
            await fs.access(fullPath)
            console.log(`✔ ${file}`)
            results.push(true)
        } catch {
            console.error(`✖ Missing: ${file}`)
            results.push(false)
        }
    }

    if (results.every(Boolean)) {
        console.log("All slides tests passed!")
        process.exit(0)
    } else {
        console.error("Some slides are missing")
        process.exit(1)
    }
}

test().catch((err) => {
    console.error(err)
    process.exit(1)
})
