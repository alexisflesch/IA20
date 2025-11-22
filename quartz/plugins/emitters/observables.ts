import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import { glob } from "../../util/glob"
import path from "path"

const OBSERVABLES_SOURCE = "observables"

async function copyDir(src: string, dest: string) {
    await fs.promises.mkdir(dest, { recursive: true })
    const entries = await fs.promises.readdir(src, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        const destPath = path.join(dest, entry.name)

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath)
        } else {
            await fs.promises.mkdir(path.dirname(destPath), { recursive: true })
            await fs.promises.copyFile(srcPath, destPath)
        }
    }
}

export const Observables: QuartzEmitterPlugin = () => ({
    name: "Observables",
    async *emit({ argv, cfg }) {
        const observablesPath = path.join(process.cwd(), OBSERVABLES_SOURCE)

        // Check if observables directory exists
        if (!fs.existsSync(observablesPath)) {
            return
        }

        const outputEmbedsPath = joinSegments(argv.output, "observables")
        await fs.promises.mkdir(outputEmbedsPath, { recursive: true })

        // Get all notebook directories
        const notebooks = await fs.promises.readdir(observablesPath, { withFileTypes: true })

        for (const notebook of notebooks) {
            if (!notebook.isDirectory()) continue

            const srcDir = path.join(observablesPath, notebook.name)
            const destDir = path.join(outputEmbedsPath, notebook.name)

            await copyDir(srcDir, destDir)

            // Yield the destination path
            yield destDir as FilePath
        }
    },
    async *partialEmit() {
        // For dev mode, we could implement incremental updates here
        // For now, keeping it simple - full rebuild is fast enough for a few notebooks
    },
})
