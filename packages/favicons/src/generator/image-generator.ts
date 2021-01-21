import Jimp from "jimp"
import sharp from "sharp"
import imageSize from "image-size"
import path from "path"
import * as fs from "fs"
import pngToIco from "png-to-ico"
import { parseColor } from "../utils/color"
import { ensureSize } from "../utils/image"
import getIconName from "../utils/get-icon-name"
import getFingerprint from "../utils/fingerprint"
import {
    AppleStartupSetting,
    FaviconImage,
    Icons,
    IconSetting,
    InternalOptions,
    Logger,
    LoggerFunction,
    Source,
    SourceObject,
} from "../types"

type Options = {
    width: number
    height: number
    pixelArt: boolean
    platform: string
    offset: number
    transparent: boolean
    background: boolean | string
    type: string
    mask: boolean
    overlayGlow: boolean
    overlayShadow: boolean
    rotate: boolean | number
    fingerprint: boolean
}

const create = async (
    width: number,
    height: number,
    transparent: boolean,
    background: string,
    logger: LoggerFunction
): Promise<Jimp> => {
    logger.log(`Creating empty ${width}x${height} canvas with ${transparent ? "transparent" : background} background`)

    return Jimp.create(width, height, transparent ? 0 : parseColor(background))
}

const render = async (source: SourceObject, options: Options, logger: LoggerFunction): Promise<Jimp> => {
    options.width = options.width - options.offset * 2
    options.height = options.height - options.offset * 2

    let promise

    if (options.type === "svg") {
        const background = { r: 0, g: 0, b: 0, alpha: 0 }

        logger.log(`Rendering SVG to ${options.width}x${options.height}`)

        promise = ensureSize(source, options.width, options.height)
            .then((svg: string | Buffer) =>
                sharp(svg)
                    .resize({
                        background,
                        width: options.width,
                        height: options.height,
                        fit: sharp.fit.contain,
                    })
                    .toBuffer()
            )
            .then(Jimp.read)
            .catch((error: Error) => {
                throw error
            })
    } else {
        logger.log(`Resizing PNG to ${options.width}x${options.height}`)

        promise = Jimp.read(source.file).then((image: Jimp) =>
            image.contain(
                options.width,
                options.height,
                Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
                options.pixelArt && options.width >= image.bitmap.width && options.height >= image.bitmap.height
                    ? Jimp.RESIZE_NEAREST_NEIGHBOR
                    : undefined
            )
        )
    }

    return promise.then((image) => image)
}

const mask = Jimp.read(path.join(__dirname, "..", "assets", "mask.png"))
const overlayGlow = Jimp.read(path.join(__dirname, "..", "assets", "overlay-glow.png"))
// Gimp drop shadow filter: input: mask.png, config: X: 2, Y: 5, Offset: 5, Color: black, Opacity: 20
const overlayShadow = Jimp.read(path.join(__dirname, "..", "assets", "overlay-shadow.png"))

const composite = async (
    canvas: Jimp,
    image: Jimp,
    options: {
        max: number
    } & Options,
    logger: LoggerFunction
): Promise<Buffer> => {
    if (options.mask) {
        logger.log("Masking composite image on circle")

        return Promise.all([mask, overlayGlow, overlayShadow]).then(([mask, glow, shadow]) => {
            canvas.mask(mask.clone().resize(options.max, Jimp.AUTO), 0, 0)

            if (options.overlayGlow) {
                canvas.composite(glow.clone().resize(options.max, Jimp.AUTO), 0, 0)
            }

            if (options.overlayShadow) {
                canvas.composite(shadow.clone().resize(options.max, Jimp.AUTO), 0, 0)
            }

            options = Object.assign({}, options, {
                mask: false,
            })

            return composite(canvas, image, options, logger)
        })
    }

    logger.log(`Compositing favicon on ${options.width}x${options.height} canvas with offset ${options.offset}`)

    canvas.composite(image, options.offset, options.offset)

    if (options.rotate) {
        const degrees = typeof options.rotate === "number" ? options.rotate : 90

        logger.log(`Rotating image by ${degrees}`)

        canvas.rotate(degrees, false)
    }

    return canvas.getBufferAsync(Jimp.MIME_PNG)
}

const getSource = (src: Source): SourceObject => {
    if (Buffer.isBuffer(src)) {
        try {
            return { size: imageSize(src), file: src }
        } catch (error) {
            throw new Error("Invalid image buffer")
        }
    } else if (typeof src === "string") {
        try {
            const file = fs.readFileSync(src)

            return { size: imageSize(file), file }
        } catch (err) {
            throw new Error(`It was not possible to read '${src}'.`)
        }
    }

    throw new Error("Invalid source type provided")
}

const createFavicon = async (
    source: SourceObject,
    options: Options,
    icon: IconSetting | AppleStartupSetting,
    index: number,
    logger: LoggerFunction
): Promise<FaviconImage> => {
    const maximum = Math.max(options.width, options.height)
    const offset = Math.round((maximum / 100) * options.offset) || 0

    let background = "#ffffff"

    if (typeof options.background === "string") {
        background = options.background
    }

    options.transparent = options.background === false || options.background === "transparent"

    return Promise.all([
        create(options.width, options.height, options.transparent, background, logger),
        render(source, { ...options, offset }, logger),
    ])
        .then(([canvas, buffer]) => composite(canvas, buffer, { ...options, offset, max: maximum }, logger))
        .then((contents) => {
            let fingerprint = ""

            const name = `${getIconName(options.platform)}-${options.width}x${options.height}`

            if (options.fingerprint) {
                fingerprint = getFingerprint(name + contents.toString("utf8"))

                icon.sizes[index].fingerprint = fingerprint

                fingerprint = `.${fingerprint}`
            }

            return {
                name: `${name}${fingerprint}.${options.type}`,
                contents,
            }
        })
        .catch((error) => {
            throw error
        })
}

const getOptions = (
    width: number,
    height: number,
    platform: string,
    icon: IconSetting | AppleStartupSetting,
    options: InternalOptions
) => {
    return {
        width,
        height,
        pixelArt: options.pixelArt,
        platform,
        offset: icon.offset,
        transparent: icon.transparent,
        background: icon.background,
        type: icon.type,
        mask: icon.mask,
        overlayGlow: icon.overlayGlow,
        overlayShadow: icon.overlayShadow,
        rotate: icon.rotate,
        fingerprint: options.fingerprints,
    }
}

const generator = async (src: Source, options: InternalOptions, logger: Logger): Promise<FaviconImage[]> => {
    let source: SourceObject
    const imageLogger = logger("image-generator")

    const appleSplashScreen: {
        light?: SourceObject
        dark?: SourceObject
    } = {}

    if (Buffer.isBuffer(src) || typeof src === "string") {
        source = getSource(src)
    } else if (typeof src === "object") {
        if (!src.icon) {
            throw new Error("No source provided")
        }

        source = getSource(src.icon)

        if (typeof src.apple === "object" && src.apple.splashScreen) {
            if (Buffer.isBuffer(src.apple.splashScreen) || typeof src.apple.splashScreen === "string") {
                appleSplashScreen.light = getSource(src.apple.splashScreen)
            } else if (typeof src.apple.splashScreen === "object") {
                if (src.apple.splashScreen.light) {
                    appleSplashScreen.light = getSource(src.apple.splashScreen.light)
                }

                if (src.apple.splashScreen.dark) {
                    appleSplashScreen.dark = getSource(src.apple.splashScreen.dark)
                }
            }
        }
    } else {
        throw new Error("Invalid source type provided")
    }

    const icons: Promise<FaviconImage>[] = []

    const sortedIcons = Object.keys(options.icons as Icons)
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

    sortedIcons.forEach((platform) => {
        const settings = options.icons[platform]

        settings.forEach((icon) => {
            if (icon.type === "ico") {
                icons.push(
                    Promise.all(
                        icon.sizes.map(({ width, height }: { width: number; height: number }, index: number) =>
                            createFavicon(source, getOptions(width, height, platform, icon, options), icon, index, imageLogger)
                        )
                    ).then((results) =>
                        pngToIco(results.map(({ contents }) => contents)).then((buffer) => ({
                            name: `${getIconName(platform)}.ico`,
                            contents: buffer,
                        }))
                    )
                )
            } else {
                icon.sizes.forEach(({ width, height }: { width: number; height: number }, index: number) =>
                    icons.push(
                        createFavicon(
                            source,
                            getOptions(width, height, platform, icon, options),
                            icon,
                            index,
                            imageLogger
                        )
                    )
                )
            }
        })
    })

    return await Promise.all(icons)
}

export default generator
