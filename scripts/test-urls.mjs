#!/usr/bin/env node

import http from "http"

const BASE_URL = "http://localhost:8080"

const urlsToTest = [
  "/",
  "/cours/",
  "/cours/CM1/",
  "/cours/CM2/",
  "/cours/CM3/",
  "/cours/CM4/",
  "/cours/CM5/",
  "/cours/CM6/",
  "/cours/CM7/",
  "/slides",
  "/slides/",
  "/slides/cours/CM1/",
  "/slides/cours/CM2/",
  "/slides/cours/CM3/",
  "/slides/cours/CM4/",
  "/slides/cours/CM5/",
  "/slides/cours/CM6/",
  "/slides/cours/CM7/",
  "/observables/knn/",
]

async function testUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${url}`
    http.get(fullUrl, (res) => {
      const status = res.statusCode
      const is404 = status === 404 || res.headers['content-type']?.includes('text/html') && status === 200

      if (status === 404) {
        console.error(`✖ ${url} → 404`)
        resolve(false)
      } else if (status === 200) {
        // Read body to check for "404" text
        let body = ''
        res.on('data', chunk => body += chunk)
        res.on('end', () => {
          if (body.includes('Cette page est soit privée, soit elle n\'existe pas')) {
            console.error(`✖ ${url} → soft 404`)
            resolve(false)
          } else {
            console.log(`✔ ${url} → ${status}`)
            resolve(true)
          }
        })
      } else {
        console.log(`✔ ${url} → ${status}`)
        resolve(true)
      }
    }).on('error', (err) => {
      console.error(`✖ ${url} → ERROR: ${err.message}`)
      resolve(false)
    })
  })
}

async function main() {
  console.log("Testing URLs against " + BASE_URL)
  console.log("Make sure the dev server is running (npm run dev)\n")

  const results = []
  for (const url of urlsToTest) {
    const ok = await testUrl(url)
    results.push(ok)
    await new Promise(r => setTimeout(r, 50)) // Small delay
  }

  const allOk = results.every(Boolean)
  console.log(`\n${results.filter(Boolean).length}/${results.length} URLs OK`)

  if (!allOk) {
    process.exit(1)
  }
}

main().catch(console.error)
