import path from "path"
import fs from "fs"
import through2 from "through2"
import jimp from "jimp"
import mime from "mime"
import File from "vinyl"
import { Icons, InternalOptions, Options } from "./types"
import { icons } from "./preset/recommended"

const supportedMimeTypes = [jimp.MIME_PNG, jimp.MIME_JPEG, jimp.MIME_BMP]

const createFavicons = (options: InternalOptions, buffer: Buffer, platform: keyof Icons) => {}

const favicons = (source: string, options: Options) => {
    const config: InternalOptions = Object.assign(
        {
            path: "/",
            pixelArt: false,
            fingerprints: true,
            icons,
            manifest: undefined,
            generators: {
                html: true,
                manifest: false,
                browserconfig: false,
            },
        },
        options
    ) as InternalOptions

    if (config.manifest === undefined) {
        config.generators.manifest = false
        config.generators.browserconfig = false
    } else if (config.manifest && !config.generators.manifest) {
        config.generators.manifest = true
    }

    const mimeType = mime.getType(source)

    // if (mimeType && !supportedMimeTypes.includes(mimeType as any)) {
    let buffer: Buffer

    try {
        buffer = fs.readFileSync(source)
    } catch (err) {
        throw new Error(`It was not possible to read '${source}'.`)
    }

    const platforms = Object.keys(options.icons as Icons)
        .filter((platform) => (options.icons as Icons)[platform as keyof Icons])
        .sort((a, b) => {
            if (a === "favicons") {
                return -1
            }

            if (b === "favicons") {
                return 1
            }

            return a.localeCompare(b)
        })

    const data = []

    platforms.forEach((platform) => {
        const icons = createFavicons(options, buffer, platform)

        if (options.generators?.html) {
        }
        if (options.generators?.manifest) {
        }

        if (options.generators?.browserconfig) {
        }
    })
    // }
}

export default favicons
