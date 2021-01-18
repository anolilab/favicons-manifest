import platformOptions from "./../config/platform-options"
import { Icons, InternalOptions } from "../types"

export const preparePlatformOptions = (platform: keyof Icons, options: InternalOptions): {} => {
    const icons = options.icons[platform]
    const parameters = typeof icons === "object" && !Array.isArray(icons) ? icons : {}

    for (const key of Object.keys(parameters)) {
        if (!(key in platformOptions) || !platformOptions[key].platforms.includes(platform)) {
            throw new Error(`Unsupported option '${key}' on platform '${platform}'`)
        }
    }

    for (const key of Object.keys(platformOptions)) {
        const platformOption = platformOptions[key]
        const { platforms, defaultTo } = platformOption

        if (!(key in parameters) && platforms.includes(platform)) {
            parameters[key] = platform in platformOption ? platformOption[platform] : defaultTo
        }
    }

    if (parameters.background === true) {
        parameters.background = options.manifest.background
    }

    return parameters
}
