#!/usr/bin/env node

import pkg from "broken-link-checker"
const { SiteChecker } = pkg

const baseUrl = "http://localhost:8080"
const brokenLinks = []
const checkedPages = new Set()

const checker = new SiteChecker(
    {
        excludeExternalLinks: true,
        honorRobotExclusions: false,
        maxSocketsPerHost: 10,
    },
    {
        link: (result) => {
            if (result.broken) {
                brokenLinks.push({
                    page: result.base.resolved,
                    link: result.url.resolved,
                    reason: result.brokenReason,
                })
            }
        },
        page: (error, pageUrl) => {
            if (error) {
                console.error(`✖ Error checking page: ${pageUrl}`)
            } else {
                checkedPages.add(pageUrl)
            }
        },
        end: () => {
            console.log(`\nChecked ${checkedPages.size} pages\n`)

            if (brokenLinks.length === 0) {
                console.log("✅ No broken links found!")
                process.exit(0)
            } else {
                console.log(`❌ Found ${brokenLinks.length} broken link(s):\n`)
                brokenLinks.forEach(({ page, link, reason }) => {
                    console.log(`Page: ${page}`)
                    console.log(`  → Broken link: ${link}`)
                    console.log(`  → Reason: ${reason}\n`)
                })
                process.exit(1)
            }
        },
    }
)

console.log(`Checking all links starting from ${baseUrl}...\n`)
checker.enqueue(baseUrl)
