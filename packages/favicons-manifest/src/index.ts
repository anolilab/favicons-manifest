import { Icons, InternalOptions, Logger, Options, Response, Source } from "./types"
import { icons, manifest } from "./preset/recommended"
import NullLogger from "./logger/null-logger"
import htmlGenerator from "./generator/html-generator"
import manifestGenerator from "./generator/manifest-generator"
import imageGenerator from "./generator/image-generator"
import browserConfigGenerator from "./generator/browserconfig-generator"
import { relative } from "./utils/path"

export { htmlGenerator, manifestGenerator, imageGenerator, browserConfigGenerator }
export { Logger, LocalizeManifest, Icons, IconSetting, AppleStartupSetting, WindowsSetting, Response, Source } from "./types"

type Callback = (error: Error | null, response?: Promise<Response>) => void

const favicons = async (
    source: Source,
    options: Options,
    callback: Callback | undefined = undefined,
    logger: Logger = NullLogger
): Promise<Response | void> => {
    if (!source) {
        throw Error("Please specify a file path as a source")
    }

    let config: InternalOptions = Object.assign(
        {
            path: "/",
            pixelArt: false,
            fingerprints: true,
            icons: icons,
            manifest: undefined,
            generators: {
                html: true,
                manifest: false,
                browserconfig: false,
            },
        },
        options
    ) as InternalOptions

    if (config.manifest === undefined) {
        config.generators.manifest = false
        config.generators.browserconfig = false
    } else {
        config = Object.assign(
            {
                manifest: manifest,
            },
            config
        )
    }

    const defaultHtmlGeneratorConfig = {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        window: false,
    }

    if (config.generators.html === true) {
        config.generators.html = defaultHtmlGeneratorConfig
    } else if (typeof config.generators.html === "object") {
        config.generators.html = Object.assign(defaultHtmlGeneratorConfig, config.generators.html)
    }

    if (typeof options.icons === "object") {
        const optionsIcons = options.icons as Partial<Icons>

        Object.keys(optionsIcons).forEach((platform) => {
            if (typeof optionsIcons[platform] === "boolean") {
                config.icons[platform] = []
            }
        })
    }

    const data: Response = {
        images: [],
        html: [],
        files: [],
    }

    data.images = await imageGenerator(source, config, logger)

    if (config.generators.html) {
        data.html = htmlGenerator(config, (path: string) => relative(path, config.path), logger)
    }

    if (config.generators.manifest) {
        data.files = manifestGenerator(config, (path: string) => relative(path, config.path, true), logger)
    }

    if (config.generators.browserconfig) {
        const file = browserConfigGenerator(config, (path: string) => relative(path, config.path, true), logger)

        if (file !== null) {
            data.files.push(file)
        }
    }

    if (callback) {
        new Promise((resolve) => {
            resolve(data)
        })
            .then((response) => callback(null, response as Promise<Response>))
            .catch(callback)
    } else {
        return data
    }
}

export default favicons
