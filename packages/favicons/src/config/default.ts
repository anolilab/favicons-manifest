import { Options } from "../types"

const config: Partial<Options> = {
    pixelArt: false,
    crossOrigin: "anonymous",
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
    },
    manifest: {
        name: null,
        short_name: null,
        description: null,
        developer_name: null,
        developer_url: null,
        dir: "auto",
        lang: "en-US",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        apple_status_bar_style: "black-translucent",
        display: "standalone",
        orientation: "any",
        prefer_related_applications: false,
    },
    generators: {
        html: true,
        browserConfig: true,
        manifest: true,
    },
}

export default config
