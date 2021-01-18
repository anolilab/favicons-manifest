import { DefinedError } from "ajv"
import ajv from "./../ajv"
import { get as parseColor, ColorDescriptor } from "color-string"
import bcp47 from "bcp-47"
import { ucs2 } from "punycode/"
import WebManifestSchema from "../schema/web-manifest"
import { InternalOptions } from "../types"

const isNotSupportedColorValue = (color: ColorDescriptor, normalizedColorValue: string): boolean => {
    const hexWithAlphaRegex = /^#([0-9a-fA-F]{4}){1,2}$/

    /**
     * `theme-color` can accept any CSS `<color>`:
     *
     * @see https://html.spec.whatwg.org/multipage/semantics.html#meta-theme-color
     * @see https://drafts.csswg.org/css-color/#typedef-color
     *
     * However, `HWB` and `hex with alpha` values are not
     * supported everywhere `theme-color` is. Also, values
     * such as `currentcolor` don't make sense, but they
     * will be catched by the above check.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Browser_compatibility
     * @see https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/graphics/Color.cpp?rcl=6263bcf0ec9f112b5f0d84fc059c759302bd8c67
     */
    return (
        (color.model === "rgb" && hexWithAlphaRegex.test(normalizedColorValue)) ||
        // `HWB` is not supported anywhere (?).
        color.model === "hwb"
    )
}

const validateColor = (property: string, colorValue: string) => {
    if (colorValue === "") {
        throw new Error(`Found a empty value on "${property}".`)
    }

    const color = parseColor(colorValue)

    if (color === null) {
        return
    }

    if (isNotSupportedColorValue(color, colorValue)) {
        throw new Error(`Found a unsupported value on "${property}" with value "${colorValue}".`)
    }
}

const validateLang = (langValue: string) => {
    if (langValue === "") {
        throw new Error(`Found a empty value on "lang".`)
    }

    const lang = bcp47.parse(langValue)

    if (lang.language === null) {
        throw new Error(`Found a unsupported value on "lang" with value ${langValue}.`)
    }
}

const checkShortNameIsRequired = (name: string): boolean => {
    return name.trim() !== "" && ucs2.decode(name).length > 12
}

const generator = (
    options: InternalOptions
): {
    name: string
    content: string
}[] => {
    if (options.manifest === undefined) {
        return []
    }

    const validate = ajv.compile(WebManifestSchema)

    const manifest = options.manifest
    const localize = manifest.localize || []

    delete manifest.crossOrigin
    delete manifest.apple_status_bar_style
    delete manifest.localize

    const manifests: {
        name: string
        content: string
    }[] = []

    if (manifest.background_color) {
        validateColor("background_color", manifest.background_color)
    }

    if (manifest.theme_color) {
        validateColor("theme_color", manifest.theme_color)
    }

    if (manifest.lang) {
        validateLang(manifest.lang)
    }

    if (manifest.name && checkShortNameIsRequired(manifest.name) && !manifest.short_name) {
        throw new Error(`You must provide at least the "short_name" or "name" property.`)
    }

    if (validate(manifest)) {
        manifests.push({
            name: "manifest.webmanifest",
            content: JSON.stringify(manifest, null, 2),
        })
    } else {
        for (const err of validate.errors as DefinedError[]) {
            throw new Error(`${err.propertyName}: ${err.message}`)
        }
    }

    localize.forEach((m) => {
        const extendedManifest = {
            ...manifest,
            ...m,
        }

        if (manifest.lang === extendedManifest.lang) {
            throw new Error(
                `Localized manifest has the same lang "${extendedManifest.lang}" as the main manifest "${manifest.lang}".`
            )
        }

        if (extendedManifest.background_color) {
            validateColor("background_color", extendedManifest.background_color)
        }

        if (extendedManifest.theme_color) {
            validateColor("theme_color", extendedManifest.theme_color)
        }

        if (extendedManifest.lang) {
            validateLang(extendedManifest.lang)
        }

        if (validate(extendedManifest)) {
            manifests.push({
                name: `manifest_${extendedManifest.lang}.webmanifest`,
                content: JSON.stringify(extendedManifest, null, 2),
            })
        } else {
            for (const err of validate.errors as DefinedError[]) {
                throw new Error(`${err.propertyName}: ${err.message}`)
            }
        }
    })

    return manifests
}

export default generator
