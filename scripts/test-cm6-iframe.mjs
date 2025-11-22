#!/usr/bin/env node
import http from "http"
import handler from "serve-handler"
import path from "path"
import { fileURLToPath } from "url"
import puppeteer from "puppeteer"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const websitePublic = path.join(root, "website", "public")
const port = 43210

async function withServer(fn) {
    const server = http.createServer((request, response) => {
        return handler(request, response, { public: websitePublic })
    })

    await new Promise((resolve) => server.listen(port, resolve))
    try {
        return await fn()
    } finally {
        await new Promise((resolve) => server.close(resolve))
    }
}

async function testCm6Iframe() {
    console.log("🧪 Testing CM6 iframe integration...\n")

    await withServer(async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        })

        try {
            const page = await browser.newPage()
            await page.setViewport({ width: 1400, height: 900 })
            await page.goto(`http://localhost:${port}/cours/CM6/`, { waitUntil: "networkidle2" })

            // Wait for iframe to be sized by the resizer script
            const iframeSelector = 'iframe[src*="observables/convolution"]'
            await page.waitForSelector(iframeSelector, { timeout: 10000 })
            await page.waitForFunction(
                (selector) => {
                    const iframe = document.querySelector(selector)
                    if (!iframe) return false
                    const height = parseFloat(getComputedStyle(iframe).height)
                    return height > 800
                },
                { timeout: 10000 },
                iframeSelector
            )

            // Give the ResizeObserver time to fire
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const iframeHandle = await page.$(iframeSelector)
            const frame = await iframeHandle.contentFrame()

            const iframeInfo = await page.evaluate((iframe) => {
                const rect = iframe.getBoundingClientRect()
                return {
                    clientHeight: iframe.clientHeight,
                    offsetHeight: iframe.offsetHeight,
                    cssHeight: parseFloat(getComputedStyle(iframe).height),
                    bboxHeight: rect.height,
                }
            }, iframeHandle)

            const innerInfo = await frame.evaluate(() => {
                const allElements = Array.from(document.body.querySelectorAll("*"))
                let maxBottom = 0
                for (const el of allElements) {
                    const rect = el.getBoundingClientRect()
                    maxBottom = Math.max(maxBottom, rect.bottom)
                }
                return {
                    actualBottom: Math.ceil(maxBottom),
                    scrollHeight: document.body.scrollHeight,
                    offsetHeight: document.body.offsetHeight,
                    docScrollHeight: document.scrollingElement.scrollHeight,
                }
            })

            const margin = Math.round(iframeInfo.cssHeight - innerInfo.actualBottom)
            const scrollVisible = await page.evaluate((selector) => {
                const iframe = document.querySelector(selector)
                if (!iframe) return false
                return iframe.scrollHeight > iframe.clientHeight
            }, iframeSelector)

            console.log("Parent iframe metrics:", iframeInfo)
            console.log("Inner document metrics:", innerInfo)
            console.log(`Margin (iframe height - content): ${margin}px`)
            console.log(`Scrollbars visible (parent iframe): ${scrollVisible}`)

            if (iframeInfo.cssHeight < innerInfo.actualBottom) {
                console.error("❌ FAIL: iframe height shorter than content -> cropped")
                process.exitCode = 1
            } else if (margin > 150) {
                console.warn("⚠️  WARNING: margin is large, expect extra whitespace")
            } else {
                console.log("✅ PASS: iframe height matches content with acceptable margin")
            }
        } finally {
            await browser.close()
        }
    })
}

testCm6Iframe().catch((err) => {
    console.error("❌ Test errored:", err)
    process.exit(1)
})
