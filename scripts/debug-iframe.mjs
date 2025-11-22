#!/usr/bin/env node
// Comprehensive iframe height debugging script
// This will test different height calculation methods and find the correct one

import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function debugIframeHeight() {
    console.log('🔍 Deep Debugging Iframe Height Calculation\n')

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
        const page = await browser.newPage()

        // Test with different viewport sizes to simulate real conditions
        const viewports = [
            { width: 1200, height: 800, name: 'Desktop' },
            { width: 1920, height: 1080, name: 'Large Desktop' },
            { width: 768, height: 1024, name: 'Tablet' }
        ]

        for (const viewport of viewports) {
            console.log(`\n📱 Testing with ${viewport.name} (${viewport.width}x${viewport.height})`)
            console.log('='.repeat(60))

            await page.setViewport({ width: viewport.width, height: viewport.height })

            const observablePath = path.join(root, 'public/observables/convolution/index.html')
            await page.goto(`file://${observablePath}`, { waitUntil: 'networkidle0' })
            await page.waitForSelector('.container', { timeout: 5000 })

            // Wait for any dynamic content
            await new Promise(resolve => setTimeout(resolve, 2000))

            const measurements = await page.evaluate(() => {
                const container = document.querySelector('.container')
                const body = document.body
                const html = document.documentElement

                // Get bounding rect of container
                const containerRect = container.getBoundingClientRect()
                const bodyRect = body.getBoundingClientRect()

                return {
                    // Different height measurements
                    scrollingElementScrollHeight: document.scrollingElement.scrollHeight,
                    bodyScrollHeight: body.scrollHeight,
                    bodyOffsetHeight: body.offsetHeight,
                    bodyClientHeight: body.clientHeight,
                    htmlScrollHeight: html.scrollHeight,
                    htmlOffsetHeight: html.offsetHeight,
                    htmlClientHeight: html.clientHeight,

                    // Container measurements
                    containerScrollHeight: container.scrollHeight,
                    containerOffsetHeight: container.offsetHeight,
                    containerClientHeight: container.clientHeight,
                    containerBoundingHeight: containerRect.height,
                    containerBoundingBottom: containerRect.bottom,

                    // Body bounding
                    bodyBoundingHeight: bodyRect.height,
                    bodyBoundingBottom: bodyRect.bottom,

                    // Viewport
                    viewportHeight: window.innerHeight,
                    visualViewportHeight: window.visualViewport?.height || 0,

                    // Computed styles
                    bodyPaddingTop: parseInt(getComputedStyle(body).paddingTop),
                    bodyPaddingBottom: parseInt(getComputedStyle(body).paddingBottom),
                    bodyMarginTop: parseInt(getComputedStyle(body).marginTop),
                    bodyMarginBottom: parseInt(getComputedStyle(body).marginBottom),

                    // Actual bottom position of last element
                    lastElementBottom: (() => {
                        const allElements = Array.from(document.body.querySelectorAll('*'))
                        let maxBottom = 0
                        allElements.forEach(el => {
                            const rect = el.getBoundingClientRect()
                            maxBottom = Math.max(maxBottom, rect.bottom)
                        })
                        return maxBottom
                    })(),
                }
            })

            // Calculate what height each method would give
            const methods = [
                {
                    name: 'scrollingElement.scrollHeight',
                    value: measurements.scrollingElementScrollHeight
                },
                {
                    name: 'body.scrollHeight',
                    value: measurements.bodyScrollHeight
                },
                {
                    name: 'body.offsetHeight',
                    value: measurements.bodyOffsetHeight
                },
                {
                    name: 'html.scrollHeight',
                    value: measurements.htmlScrollHeight
                },
                {
                    name: 'container.offsetHeight + padding',
                    value: measurements.containerOffsetHeight + measurements.bodyPaddingTop + measurements.bodyPaddingBottom
                },
                {
                    name: 'lastElementBottom (bounding)',
                    value: Math.ceil(measurements.lastElementBottom)
                },
                {
                    name: 'Max(body methods)',
                    value: Math.max(
                        measurements.bodyScrollHeight,
                        measurements.bodyOffsetHeight,
                        measurements.htmlScrollHeight,
                        measurements.htmlOffsetHeight
                    )
                },
            ]

            console.log('\n📏 Height Measurements:')
            methods.forEach(m => {
                console.log(`   ${m.name.padEnd(40)}: ${m.value}px`)
            })

            console.log(`\n   ${'viewport height'.padEnd(40)}: ${measurements.viewportHeight}px`)
            console.log(`   ${'actual content bottom'.padEnd(40)}: ${Math.ceil(measurements.lastElementBottom)}px`)

            // The CORRECT height is the actual bottom of the last element
            const correctHeight = Math.ceil(measurements.lastElementBottom)
            const currentFormula = Math.max(
                measurements.bodyScrollHeight,
                measurements.bodyOffsetHeight,
                measurements.htmlScrollHeight,
                measurements.htmlOffsetHeight
            )

            console.log(`\n✅ Analysis:`)
            console.log(`   Actual content height needed: ${correctHeight}px`)
            console.log(`   Current formula gives: ${currentFormula}px`)
            console.log(`   Difference: ${currentFormula - correctHeight}px`)

            if (currentFormula < correctHeight) {
                console.log(`   ❌ CONTENT WILL BE CROPPED by ${correctHeight - currentFormula}px`)
            } else if (currentFormula > correctHeight + 100) {
                console.log(`   ⚠️  TOO MUCH SPACE: ${currentFormula - correctHeight}px extra`)
            } else {
                console.log(`   ✅ Acceptable range`)
            }
        }

        // Now determine the best formula
        console.log('\n\n' + '='.repeat(60))
        console.log('💡 RECOMMENDED SOLUTION:')
        console.log('='.repeat(60))
        console.log(`
Use this formula in the iframe:

function sendHeight() {
    // Method 1: Calculate actual content bottom
    const allElements = Array.from(document.body.querySelectorAll('*'));
    let maxBottom = 0;
    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        maxBottom = Math.max(maxBottom, rect.bottom);
    });
    const height = Math.ceil(maxBottom) + 20; // Small safety margin
    window.parent.postMessage({ type: 'resize', height: height }, '*');
}

This measures the actual bottom position of all elements in the page.
`)

    } catch (error) {
        console.error('❌ Error:', error)
        throw error
    } finally {
        await browser.close()
    }
}

debugIframeHeight().catch(err => {
    console.error(err)
    process.exit(1)
})
