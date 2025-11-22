#!/usr/bin/env node

import http from "http"

const baseUrl = "http://localhost:8080"

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
    "/observables/knn/",
    "/CM1/",
    "/CM2/",
    "/CM3/",
    "/CM4/",
    "/CM5/",
    "/CM6/",
    "/CM7/",
]

async function testUrl(url) {
    return new Promise((resolve) => {
        const fullUrl = `${baseUrl}${url}`
        http
            .get(fullUrl, (res) => {
                const { statusCode } = res
                let body = ""
                res.on("data", (chunk) => {
                    body += chunk
                })
                res.on("end", () => {
                    // Check for soft 404s (page says "n'existe pas")
                    const isSoft404 = body.includes("page n'existe pas") || body.includes("404")
                    if (statusCode === 200 && !isSoft404) {
                        console.log(`✔ ${url} → ${statusCode}`)
                        resolve(true)
                    } else if (statusCode === 200 && isSoft404) {
                        console.error(`✖ ${url} → soft 404 (page says it doesn't exist)`)
                        resolve(false)
                    } else {
                        console.error(`✖ ${url} → ${statusCode}`)
                        resolve(false)
                    }
                })
            })
            .on("error", (err) => {
                console.error(`✖ ${url} → ERROR: ${err.message}`)
                resolve(false)
            })
    })
}

async function main() {
    console.log("Testing cours-site URLs against dev server...")
    console.log(`Base URL: ${baseUrl}\n`)

    const results = []
    for (const url of urlsToTest) {
        const result = await testUrl(url)
        results.push(result)
    }

    console.log()
    if (results.every(Boolean)) {
        console.log("✅ All URLs are accessible!")
        process.exit(0)
    } else {
        console.error("❌ Some URLs returned 404 or errors")
        process.exit(1)
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
