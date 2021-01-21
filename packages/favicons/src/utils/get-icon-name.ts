import { Icons } from "../types"

const getIconName = (platform: keyof Icons): string => {
    if (platform === "favicons") {
        return "favicon"
    } else if (platform === "appleIcon") {
        return "apple-touch-icon"
    } else if (platform === "appleStartup") {
        return "apple-touch-startup-image"
    } else if (platform === "android") {
        return "android-chrome"
    } else if (platform === "windows") {
        return "ms"
    }

    return String(platform)
}

export default getIconName
