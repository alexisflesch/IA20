#!/usr/bin/env node

import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")

const pathsToCheck = [
  "public/index.html",
  "public/slides.html",
  "public/slides/cours/CM1/index.html",
  "public/slides/cours/CM2/index.html",
  "public/slides/cours/CM3/index.html",
  "public/slides/cours/CM4/index.html",
  "public/slides/cours/CM5/index.html",
  "public/slides/cours/CM6/index.html",
  "public/slides/cours/CM7/index.html",
  "public/cours/index.html",
  "public/cours/CM1/index.html",
  "public/cours/CM2/index.html",
  "public/cours/CM3/index.html",
  "public/cours/CM4/index.html",
  "public/cours/CM5/index.html",
  "public/cours/CM6/index.html",
  "public/cours/CM7/index.html",
  "public/observables/knn/index.html",
]

async function validateSlideLinks() {
  const slidesIndex = path.join(projectRoot, "public/slides.html")
  let html = ""
  try {
    html = await fs.readFile(slidesIndex, "utf-8")
  } catch {
    console.error("✖ Missing: public/slides.html")
    throw new Error("Slides index not found")
  }

  const badLinks = [...html.matchAll(/href="(slides\/[^"]*)"/g)].map((m) => m[1])
  if (badLinks.length > 0) {
    console.error("✖ Found relative slide links (should start with /):", badLinks.join(", "))
    throw new Error("Invalid slide links detected")
  }
}

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
  console.log("Running Quartz smoke test…")

  // Ensure site is built
  // We assume `npm run build` has been executed before this script.

  const results = await Promise.all(pathsToCheck.map(checkExists))
  if (!results.every(Boolean)) {
    throw new Error("Some expected pages are missing")
  }

  await validateSlideLinks()

  console.log("All expected pages and slide links are valid.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
