import Jimp from "jimp"
import sharp from "sharp"
import { parseColor } from "../utils/color"
import { ensureSize, svgtool } from "../utils/image"
import { IconSetting } from "../types"

export const create = (properties: IconSetting, background: string): Promise<Jimp> => {
    // log(
    //     "Image:create",
    //     `Creating empty ${properties.width}x${
    //         properties.height
    //     } canvas with ${
    //         properties.transparent ? "transparent" : properties.background
    //     } background`
    // );

    return Jimp.create(properties.width, properties.height, properties.transparent ? 0 : parseColor(background))
}

export const render = (sourceset, properties, offset) => {
    // log(
    //     "Image:render",
    //     `Find nearest icon to ${properties.width}x${properties.height} with offset ${offset}`
    // );

    const width = properties.width - offset * 2
    const height = properties.height - offset * 2
    const svgSource = sourceset.find((source) => source.size.type === "svg")

    let promise

    if (svgSource) {
        const background = { r: 0, g: 0, b: 0, alpha: 0 }

        // log("Image:render", `Rendering SVG to ${width}x${height}`);
        promise = ensureSize(svgSource, width, height)
            .then((svg: string | Buffer) =>
                sharp(svg)
                    .resize({
                        background,
                        width,
                        height,
                        fit: sharp.fit.contain,
                    })
                    .toBuffer()
            )
            .then(Jimp.read)
            .catch((error: Error) => {
                throw error
            })
    } else {
        const sideSize = Math.max(width, height)

        let nearestIcon = sourceset[0]
        let nearestSideSize = Math.max(nearestIcon.size.width, nearestIcon.size.height)

        for (const icon of sourceset) {
            const max = Math.max(icon.size.width, icon.size.height)

            if ((nearestSideSize > max || nearestSideSize < sideSize) && max >= sideSize) {
                nearestIcon = icon
                nearestSideSize = max
            }
        }

        // log("Images:render", `Resizing PNG to ${width}x${height}`);

        promise = Jimp.read(nearestIcon.file).then((image: Jimp) =>
            image.contain(
                width,
                height,
                Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
                options.pixel_art && width >= image.bitmap.width && height >= image.bitmap.height
                    ? Jimp.RESIZE_NEAREST_NEIGHBOR
                    : null
            )
        )
    }

    return promise.then((image) => image)
}
