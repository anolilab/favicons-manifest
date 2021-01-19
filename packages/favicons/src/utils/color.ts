import color from "tinycolor2"
import Jimp from "jimp"

export const parseColor = (hex: string): number => {
    const { r, g, b, a } = color(hex).toRgb()

    return Jimp.rgbaToInt(r, g, b, a * 255)
}
