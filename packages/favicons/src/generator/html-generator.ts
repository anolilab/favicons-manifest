import escapeHtml from "escape-html"
import { appleIconSizes, appleStartupItems, faviconSizes } from "../config/html"
import { IconOptions, InternalOptions, RelativeFunction, IconSettings, Icons } from "../types"

function ctxHasIcons(icons: boolean | IconOptions, icon: string): boolean {
    if (typeof icons === "object" && Array.isArray(icons.icons)) {
        let hasIcon = false

        icons.icons.forEach((value: string | object) => {
            if (!hasIcon && value === icon) {
                hasIcon = true
            }
        })

        return hasIcon
    }

    if (typeof icons === "boolean") {
        return icons
    }

    return false
}

const appleIconGen = (width: number, height: number, options: InternalOptions, relative: RelativeFunction): string => {
    const iconName = `apple-touch-icon-${width}x${height}.png`

    return !ctxHasIcons(options.icons.appleIcon, iconName)
        ? ""
        : `<link rel="apple-touch-icon" sizes="${width}x${height}" href="${relative(iconName)}" />`
}

const appleStartupGen = (
    {
        width,
        height,
        dwidth,
        dheight,
        pixelRatio,
        orientation,
    }: {
        dwidth: number
        dheight: number
        pixelRatio: number
        orientation: string
        width: number
        height: number
    },
    options: InternalOptions,
    relative: RelativeFunction
) => {
    const iconName = `apple-touch-startup-image-${width}x${height}.png`

    return !ctxHasIcons(options.icons.appleStartup, iconName)
        ? ""
        : `<link rel="apple-touch-startup-image" media="(width: ${dwidth}px) and (height: ${dheight}px) and (-webkit-device-pixel-ratio: ${pixelRatio}) and (orientation: ${orientation})" href="${relative(
              iconName
          )}" />`
}

const faviconGen = (width: number, height: number, options: InternalOptions, relative: RelativeFunction) => {
    const iconName = `favicon-${width}x${height}.png`

    return !ctxHasIcons(options.icons.favicons, iconName)
        ? ""
        : `<link rel="icon" type="image/png" sizes="${width}x${height}" href="${relative(iconName)}" />`
}

const generators: {
    [key: string]: ((options: InternalOptions, relative: RelativeFunction) => string)[]
} = {
    android: [
        (options, relative: RelativeFunction) => {
            if (options.manifest === undefined) {
                return ""
            }

            return `<link rel="manifest" href="${relative("manifest.json")}"${
                options.manifest.crossOrigin && ` crossOrigin="${escapeHtml(options.manifest.crossOrigin)}"`
            } />`
        },
        (options) => (options.manifest ? `<meta name="mobile-web-app-capable" content="yes">` : ""),
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.theme_color) {
                return `<meta name="theme-color" content="${escapeHtml(options.manifest.theme_color)}" />`
            } else if (options.manifest.background_color) {
                return `<meta name="theme-color" content="${escapeHtml(options.manifest.background_color)}" />`
            }

            return ""
        },
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.name) {
                return `<meta name="application-name" content="${escapeHtml(options.manifest.name)}" />`
            }

            return `<meta name="application-name" />`
        },
    ],
    appleIcon: [
        ...appleIconSizes.map((size) => (options: InternalOptions, relative: RelativeFunction) =>
            appleIconGen(size, size, options, relative)
        ),
        (options) => (options.manifest ? `<meta name="apple-mobile-web-app-capable" content="yes" />` : ""),
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.apple_status_bar_style) {
                return `<meta name="apple-mobile-web-app-status-bar-style" content="${options.manifest.apple_status_bar_style}" />`
            }

            return ""
        },
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.short_name) {
                return `<meta name="apple-mobile-web-app-title" content="${escapeHtml(options.manifest.short_name)} />`
            } else if (options.manifest.name) {
                return `<meta name="apple-mobile-web-app-title" content="${escapeHtml(options.manifest.name)} />`
            }

            return `<meta name="apple-mobile-web-app-title" />`
        },
    ],
    appleStartup: appleStartupItems.map((item) => (options: InternalOptions, relative: RelativeFunction) =>
        appleStartupGen(item, options, relative)
    ),
    favicons: [
        (options, relative: RelativeFunction) =>
            !ctxHasIcons(options.icons.favicons, "favicon.ico")
                ? ""
                : `<link rel="shortcut icon" href="${relative("favicon.ico")}" />`,
        ...faviconSizes.map((size) => (options: InternalOptions, relative: RelativeFunction) =>
            faviconGen(size, size, options, relative)
        ),
    ],
    windows: [
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.background_color) {
                return `<meta name="msapplication-TileColor" content="${escapeHtml(
                    options.manifest.background_color
                )}" />`
            }

            return ""
        },
        (options, relative: RelativeFunction) =>
            !ctxHasIcons(options.icons.windows, "mstile-144x144.png")
                ? ""
                : `<meta name="msapplication-TileImage" content="${escapeHtml(relative("mstile-144x144.png"))} /">`,
        (_, relative: RelativeFunction) =>
            `<meta name="msapplication-config" content="${escapeHtml(relative("browserconfig.xml"))} /">`,
    ],
}

const generator = (platform: keyof Icons, options: InternalOptions, relative: RelativeFunction): string => {
    if (generators[platform] !== undefined) {
        let html = [...generators[platform].map((f) => f(options, relative))]

        if (typeof options.icons[platform] === "object") {
            let icons: IconSettings[] = []

            ;(options.icons[platform] as IconOptions).icons?.forEach((value: string | IconSettings) => {
                if (typeof value === "object") {
                    icons.push(value)
                }
            })

            if (icons.length !== 0 && platform === "appleIcon") {
                html = [
                    ...html,
                    ...icons.map(
                        (settings) =>
                            `<link rel="apple-touch-icon" sizes="${settings.width}x${settings.height}" href="${relative(
                                `apple-touch-icon-${settings.width}x${settings.height}.png`
                            )}" />`
                    ),
                ]
            } else if (icons.length !== 0 && platform === "appleStartup") {
                html = [
                    ...html,
                    ...icons.map(
                        (settings) =>
                            `<link rel="apple-touch-startup-image" media="(width: ${settings.dwidth}px) and (height: ${
                                settings.dheight
                            }px) and (-webkit-device-pixel-ratio: ${settings.pixelRatio}) and (orientation: ${
                                settings.orientation
                            })" href="${relative(
                                `apple-touch-startup-image-${settings.width}x${settings.height}.png`
                            )}" />`
                    ),
                ]
            } else if (icons.length !== 0 && platform === "favicons") {
                html = [
                    ...html,
                    ...icons.map(
                        (settings) =>
                            `<link rel="icon" type="image/png" sizes="${settings.width}x${
                                settings.height
                            }" href="${relative(`favicon-${settings.width}x${settings.height}.png`)}" />`
                    ),
                ]
            }
        }

        return html.join("\r\n")
    }

    return ""
}

export default generator
