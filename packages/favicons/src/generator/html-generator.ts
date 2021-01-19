import escapeHtml from "escape-html"
import { InternalOptions, RelativeFunction } from "../types"

const generators: {
    [key: string]: ((options: InternalOptions, relative: RelativeFunction) => string)[]
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
        (options, relative) =>
            options.icons.appleIcon
                .map((settings) => {
                    const icons: string[] = []

                    settings.sizes.forEach((icon) => {
                        icons.push(
                            `<link rel="apple-touch-icon" sizes="${icon.width}x${icon.height}" href="${relative(
                                `apple-touch-icon-${icon.width}x${icon.height}${
                                    settings.fingerprint ? `.${settings.fingerprint}` : ""
                                }.${settings.type}`
                            )}" />`
                        )
                    })

                    return icons.join("\n")
                })
                .join(""),
        (options) => (options.manifest ? `<meta name="apple-mobile-web-app-capable" content="yes" />` : ""),
        (options) => {
            if (options.manifest === undefined) {
                return ""
            }

            if (options.manifest.apple_status_bar_style) {
                return `<meta name="apple-mobile-web-app-status-bar-style" content="${escapeHtml(
                    options.manifest.apple_status_bar_style
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
        (options, relative) =>
            options.icons.appleStartup
                .map((settings): string => {
                    let icons: string[] = []

                    settings.sizes.forEach((icon) => {
                        icons.push(
                            `<link rel="apple-touch-startup-image" media="(width: ${icon.dwidth}px) and (height: ${
                                icon.dheight
                            }px) and (-webkit-device-pixel-ratio: ${icon.pixelRatio}) and (orientation: ${
                                icon.orientation
                            })" href="${relative(
                                `apple-touch-startup-image-${icon.width}x${icon.height}${
                                    settings.fingerprint ? `.${settings.fingerprint}` : ""
                                }.${settings.type}`
                            )}" />`
                        )
                    })

                    return icons.join("\n")
                })
                .join(""),
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
        (options, relative) =>
            options.icons.favicons
                .map((settings) => {
                    const icons: string[] = []

                    if (settings.type === "png") {
                        settings.sizes.forEach((icon) => {
                            icons.push(
                                `<link rel="icon" type="image/${settings.type}" sizes="${icon.width}x${
                                    icon.height
                                }" href="${relative(
                                    `favicon-${icon.width}x${icon.height}${
                                        settings.fingerprint ? `.${settings.fingerprint}` : ""
                                    }.${settings.type}`
                                )}" />`
                            )
                        })
                    }

                    return icons.join("\n")
                })
                .join(""),
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
        (options, relative: RelativeFunction) => {
            let hasIcon = false
            let fingerprint

            options.icons.windows.forEach((icon) => {
                icon.sizes.forEach((size) => {
                    if (!hasIcon && size.height === 144 && size.width === 144) {
                        hasIcon = true
                        fingerprint = icon.fingerprint || undefined
                    }
                })
            })

            if (hasIcon) {
                return `<meta name="msapplication-TileImage" content="${relative(
                    `mstile-144x144${fingerprint ? `.${fingerprint}` : ""}.png`
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

const generator = (options: InternalOptions, relative: RelativeFunction): string => {
    let html: string[] = []

    Object.keys(options.icons).forEach((platform) => {
        if (options.icons[platform] && generators[platform] !== undefined) {
            html = html.concat(generators[platform].map((f) => f(options, relative)))
        }
    })

    return html.filter((h) => h !== "").join("\n")
}

export default generator
