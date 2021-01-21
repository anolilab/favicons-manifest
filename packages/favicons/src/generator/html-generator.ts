import escapeHtml from "escape-html"
import getIconName from "../utils/get-icon-name"
import { InternalOptions, Logger, RelativeFunction } from "../types"

const generators: {
    [key: string]: ((options: InternalOptions, relative: RelativeFunction, platform: string) => string | string[])[]
} = {
    android: [
        (options, relative: RelativeFunction) => {
            if (options.manifest === undefined) {
                return ""
            }

            return `<link rel="manifest" href="${relative("manifest.json")}"${
                options.manifest.crossOrigin ? ` crossOrigin="${escapeHtml(options.manifest.crossOrigin)}"` : ""
            } />`
        },
        (options) => (options.manifest ? `<meta name="mobile-web-app-capable" content="yes">` : ""),
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.theme_color) {
                return `<meta name="theme-color" content="${escapeHtml(options.manifest.theme_color)}" />`
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

            return ""
        },
    ],
    appleIcon: [
        (options, relative, platform) => {
            const icons: string[] = []

            options.icons.appleIcon.forEach((settings) => {
                settings.sizes.forEach((size) => {
                    icons.push(
                        `<link rel="apple-touch-icon" sizes="${size.width}x${size.height}" href="${relative(
                            `${getIconName(platform)}-${size.width}x${size.height}${
                                size.fingerprint ? `.${size.fingerprint}` : ""
                            }.${settings.type}`
                        )}" />`
                    )
                })
            })

            return icons
        },
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.apple?.webAppCapable !== undefined) {
                return `<meta name="apple-mobile-web-app-capable" content="${
                    options.manifest.apple.webAppCapable ? "yes" : "no"
                }" />`
            }

            return ""
        },
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.apple?.statusBarStyle) {
                return `<meta name="apple-mobile-web-app-status-bar-style" content="${escapeHtml(
                    options.manifest.apple?.statusBarStyle
                )}" />`
            }

            return ""
        },
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.short_name) {
                return `<meta name="apple-mobile-web-app-title" content="${escapeHtml(options.manifest.short_name)}" />`
            } else if (options.manifest.name) {
                return `<meta name="apple-mobile-web-app-title" content="${escapeHtml(options.manifest.name)}" />`
            }

            return ""
        },
    ],
    appleStartup: [
        (options, relative, platform) => {
            if (
                options.manifest === undefined ||
                (options.manifest &&
                    options.manifest.apple?.webAppCapable !== undefined &&
                    options.manifest.apple?.webAppCapable === false)
            ) {
                return ""
            }

            const icons: string[] = []

            options.icons.appleStartup.forEach((settings) => {
                settings.sizes.forEach((size) => {
                    icons.push(
                        `<link rel="apple-touch-startup-image" media="(device-width: ${
                            size.dwidth
                        }px) and (device-height: ${size.dheight}px) and (-webkit-device-pixel-ratio: ${
                            size.pixelRatio
                        }) and (orientation: ${size.orientation})" href="${relative(
                            `${getIconName(platform)}}-${size.width}x${size.height}${
                                size.fingerprint ? `.${size.fingerprint}` : ""
                            }.${settings.type}`
                        )}" />`
                    )
                })
            })

            return icons
        },
    ],
    favicons: [
        (options, relative: RelativeFunction) => {
            let hasIcon = false

            options.icons.favicons.forEach((icon) => {
                if (!hasIcon && icon.type === "ico") {
                    hasIcon = true
                }
            })

            if (hasIcon && typeof options.favicon === "boolean" && options.favicon) {
                return `<link rel="shortcut icon" href="${relative("favicon.ico")}" />`
            } else if (hasIcon && typeof options.favicon === "string" && options.favicon !== "") {
                return `<link rel="shortcut icon" href="${escapeHtml(options.favicon)}" />`
            }

            return ""
        },
        (options, relative, platform) => {
            const icons: string[] = []

            options.icons.favicons.forEach((settings) => {
                if (settings.type === "png") {
                    settings.sizes.forEach((size) => {
                        icons.push(
                            `<link rel="icon" type="image/${settings.type}" sizes="${size.width}x${
                                size.height
                            }" href="${relative(
                                `${getIconName(platform)}-${size.width}x${size.height}${
                                    size.fingerprint ? `.${size.fingerprint}` : ""
                                }.png`
                            )}" />`
                        )
                    })
                }
            })

            return icons
        },
    ],
    windows: [
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.theme_color) {
                return `<meta name="msapplication-TileColor" content="${escapeHtml(options.manifest.theme_color)}" />`
            }

            return ""
        },
        (options, relative: RelativeFunction, platform) => {
            let hasIcon = false
            let fingerprint

            options.icons.windows.forEach((icon) => {
                icon.sizes.forEach((size) => {
                    if (!hasIcon && size.height === 144 && size.width === 144) {
                        hasIcon = true
                        fingerprint = size.fingerprint || undefined
                    }
                })
            })

            if (hasIcon) {
                return `<meta name="msapplication-TileImage" content="${relative(
                    `${getIconName(platform)}-144x144${fingerprint ? `.${fingerprint}` : ""}.png`
                )} /">`
            }

            return ""
        },
        (options, relative: RelativeFunction) =>
            options.generators.browserconfig
                ? `<meta name="msapplication-config" content="${relative("browserconfig.xml")} /">`
                : "",
    ],
}

const generator = (options: InternalOptions, relative: RelativeFunction, logger: Logger): string[] => {
    let html: string[] = []

    const htmlLogger = logger("html")

    htmlLogger.log("Creating html content")

    Object.keys(options.icons).forEach((platform: string) => {
        // @ts-ignore
        if (typeof options.generators.html === "object" && options.generators.html[platform] === false) {
            return
        }

        if (options.icons[platform] && generators[platform] !== undefined) {
            const response = generators[platform].map((f) => f(options, relative, platform))

            if (Array.isArray(response)) {
                response.forEach((r) => {
                    if (Array.isArray(r)) {
                        html = html.concat(r)
                    } else {
                        html.push(r)
                    }
                })
            } else {
                html.push(response)
            }
        }
    })

    return html.filter((h) => h !== "")
}

export default generator
