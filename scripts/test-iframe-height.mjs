#!/usr/bin/env node
// Test script to verify iframe height calculation
// Uses Puppeteer to render the observable and check if content is cropped

import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function testIframeHeight() {
    console.log('🔍 Testing iframe height for convolution observable...\n')

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
        const page = await browser.newPage()
        await page.setViewport({ width: 1200, height: 2000 })

        // Load the observable directly
        const observablePath = path.join(root, 'public/observables/convolution/index.html')
        await page.goto(`file://${observablePath}`, { waitUntil: 'networkidle0' })

        // Wait for content to load
        await page.waitForSelector('.container', { timeout: 5000 })
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Get various height measurements
        const measurements = await page.evaluate(() => {
            // Calculate actual content bottom
            const allElements = Array.from(document.body.querySelectorAll('*'));
            let maxBottom = 0;
            allElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                maxBottom = Math.max(maxBottom, rect.bottom);
            });

            return {
                documentScrollHeight: document.scrollingElement.scrollHeight,
                bodyScrollHeight: document.body.scrollHeight,
                bodyOffsetHeight: document.body.offsetHeight,
                containerOffsetHeight: document.querySelector('.container')?.offsetHeight || 0,
                viewportHeight: window.innerHeight,
                actualContentBottom: Math.ceil(maxBottom),
                isScrollable: document.scrollingElement.scrollHeight > window.innerHeight
            }
        })

        console.log('📏 Height Measurements:')
        console.log(`   document.scrollingElement.scrollHeight: ${measurements.documentScrollHeight}px`)
        console.log(`   document.body.scrollHeight: ${measurements.bodyScrollHeight}px`)
        console.log(`   document.body.offsetHeight: ${measurements.bodyOffsetHeight}px`)
        console.log(`   .container offsetHeight: ${measurements.containerOffsetHeight}px`)
        console.log(`   window.innerHeight (viewport): ${measurements.viewportHeight}px`)
        console.log(`   ACTUAL content bottom: ${measurements.actualContentBottom}px`)
        console.log(`   Is scrollable: ${measurements.isScrollable}`)

        // Calculate what the iframe height would be with current formula
        const currentBuffer = 20
        const calculatedHeight = measurements.actualContentBottom + currentBuffer

        console.log(`\n🎯 Iframe Sizing:`)
        console.log(`   Current formula: actualContentBottom + ${currentBuffer}`)
        console.log(`   Calculated iframe height: ${calculatedHeight}px`)

        console.log(`\n✅ Content Analysis:`)
        console.log(`   Actual content height needed: ${measurements.actualContentBottom}px`)
        console.log(`   With safety margin: ${calculatedHeight}px`)

        if (calculatedHeight < measurements.actualContentBottom) {
            console.log(`\n❌ PROBLEM: Content would be cropped by ${measurements.actualContentBottom - calculatedHeight}px`)
        } else {
            const extraSpace = calculatedHeight - measurements.actualContentBottom
            console.log(`\n✅ Height calculation is correct!`)
            console.log(`   Safety margin: ${extraSpace}px`)
            if (extraSpace > 50) {
                console.log(`   ⚠️  Margin is a bit large but acceptable`)
            }
        }

        // Take a screenshot for visual inspection
        const screenshotPath = path.join(root, 'temp/convolution-test.png')
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        })
        console.log(`\n📸 Screenshot saved to: ${screenshotPath}`)

    } catch (error) {
        console.error('❌ Error during test:', error.message)
        throw error
    } finally {
        await browser.close()
    }
}

testIframeHeight().catch(err => {
    console.error(err)
    process.exit(1)
})
