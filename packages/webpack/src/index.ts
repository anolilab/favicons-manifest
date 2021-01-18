import assert from "assert"
import parse5 from "parse5"
import path from "path"
import { Compiler } from "webpack"
import * as fs from "fs"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { InternalPluginOptions, PluginOptions } from "./options"
import { runCached } from "./cache"
import Oracle from "./oracle"
import { CompilationResult } from "./types"
import { PLUGIN_NAME } from "./const"

const faviconCompilations: WeakMap<any, Promise<CompilationResult>> = new WeakMap()

class FaviconsManifestWebpackPlugin {
    private options: InternalPluginOptions

    constructor(options: PluginOptions) {
        this.options = {
            cache: true,
            inject: true,
            favicons: {},
            prefix: "assets/",
            loadManifestWithCredentials: true,
            pixelArt: false,
            manifest: {},
            ...options,
        }
    }

    apply(compiler: Compiler) {
        compiler.hooks.initialize.tap(PLUGIN_NAME, () => {
            this.hookIntoCompiler(compiler)
        })
    }

    hookIntoCompiler(compiler: Compiler) {
        const oracle = new Oracle(compiler.context)

        {
            const {
                appName = oracle.guessAppName(),
                appDescription = oracle.guessDescription(),
                version = oracle.guessVersion(),
                developerName = oracle.guessDeveloperName(),
                developerURL = oracle.guessDeveloperURL(),
            } = this.options.manifest

            Object.assign(this.options.manifest, {
                appName,
                appDescription,
                version,
                developerName,
                developerURL,
            })
        }

        if (this.options.logo === undefined) {
            const defaultLogo = path.resolve(compiler.context, "logo.png")

            try {
                fs.statSync(defaultLogo)

                this.options.logo = defaultLogo
            } catch (e) {}
            // @ts-ignore
            assert(typeof this.options.logo === "string", "Could not find `logo.png` for the current webpack context")
        }

        // Hook into the webpack compilation
        // to start the favicon generation
        compiler.hooks.make.tapPromise(PLUGIN_NAME, async (compilation) => {
            const faviconCompilation = runCached(
                this.options,
                compiler.context,
                compilation,
                this,
                this.generateFavicons.bind(this)
            )

            // Watch for changes to the logo
            compilation.fileDependencies.add(this.options.logo)

            this.hookWebpackHtmlPlugin(compiler, compilation, faviconCompilation)

            // Save the promise and execute the callback immediately to not block
            // the webpack build see the `afterCompile` FaviconsWebpackPlugin hook
            // implementation where the promise is picked up again
            faviconCompilations.set(compilation, faviconCompilation)
        })

        const webpack = compiler.webpack
        const WebpackCompilation = webpack.Compilation

        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            // @ts-ignore
            compilation.hooks.processAssets.tapPromise(
                {
                    name: PLUGIN_NAME,
                    stage: WebpackCompilation.PROCESS_ASSETS_STAGE_ADDITIONS,
                },
                async () => {
                    const faviconCompilation = faviconCompilations.get(compilation)

                    if (!faviconCompilation) {
                        return
                    }

                    const faviconAssets = (await faviconCompilation).assets

                    faviconAssets.forEach(({ name, contents }) => {
                        // @ts-ignore
                        compilation.emitAsset(name, contents)
                    })
                }
            )
        })

        // Make sure that the build waits for the favicon generation to complete
        compiler.hooks.afterCompile.tapPromise(PLUGIN_NAME, async (compilation) => {
            const faviconCompilation = faviconCompilations.get(compilation) || Promise.resolve()

            faviconCompilations.delete(compilation)

            await faviconCompilation
        })
    }

    generateFavicons(
        logoSource: Buffer | string,
        compilation: any,
        resolvedPublicPath: string,
        outputPath: string
    ): Promise<CompilationResult> {
        switch (this.getCurrentCompilationMode(compilation.compiler)) {
            case "light":
                if (!this.options.mode) {
                    compilation.logger.info(
                        "icons-webpack-plugin - generate only a single favicon for fast compilation time in development mode. This behaviour can be changed by setting the favicon mode option."
                    )
                }

                return this.generateFaviconsLight(logoSource, compilation, resolvedPublicPath, outputPath)
            case "webapp":
            default:
                return this.generateFaviconsWebapp(logoSource, compilation, resolvedPublicPath, outputPath)
        }
    }

    /**
     * The light mode will only add a favicon
     * this is very fast but also very limited
     * it is the default mode for development
     */
    async generateFaviconsLight(
        logoSource: Buffer | string,
        compilation: any,
        resolvedPublicPath: string,
        outputPath: string
    ): Promise<CompilationResult> {
        const faviconExt = path.extname(this.options.logo)
        const faviconName = "/favicon" + faviconExt
        const RawSource = compilation.compiler.webpack.sources.RawSource

        return {
            assets: [
                {
                    name: path.join(outputPath, faviconName),
                    contents: new RawSource(logoSource, false),
                },
            ],
            tags: [`<link rel="icon" href="${path.join(resolvedPublicPath, faviconName)}">`],
        }
    }

    /**
     * The webapp mode will add a variety of icons
     * this is not as fast as the light mode but
     * supports all common browsers and devices
     */
    async generateFaviconsWebapp(
        logoSource: Buffer | string,
        compilation: any,
        resolvedPublicPath: string,
        outputPath: string
    ): Promise<CompilationResult> {
        const RawSource = compilation.compiler.webpack.sources.RawSource
        const favicons = loadFaviconsLibrary()

        // Generate icons using the npm icons library
        const { html: tags, images, files } = await favicons(
            logoSource,
            Object.assign(
                {},
                this.options.favicons,
                { ...this.options.manifest },
                {
                    path: resolvedPublicPath,
                    pixel_art: this.options.pixelArt,
                    loadManifestWithCredentials: this.options.loadManifestWithCredentials,
                }
            )
        )

        // We enrich the manifest.json with custom values from options.appConfig
        // if they are not supported in the icons plugin
        const {
            scope = undefined,
            prefer_related_applications = undefined,
            related_applications = undefined,
        } = this.options.manifest

        if (scope || prefer_related_applications || related_applications) {
            const manifestIndex = files.findIndex(({ name }: { name: string }) => name === "manifest.json")
            const manifestContent = JSON.parse(files[manifestIndex].contents)

            files[manifestIndex].contents = Buffer.from(
                JSON.stringify(
                    {
                        ...manifestContent,
                        ...{ scope },
                        ...(prefer_related_applications &&
                        (!related_applications || (related_applications && related_applications.length === 0))
                            ? { prefer_related_applications }
                            : { prefer_related_applications, related_applications }),
                    },
                    null,
                    4
                )
            )
        }

        const assets = [...images, ...files].map(({ name, contents }) => ({
            name: outputPath ? path.join(outputPath, name) : (name as string),
            contents: new RawSource(contents, false),
        }))

        return { assets, tags }
    }

    /**
     * Returns wether the plugin should generate a light version or a full webapp
     */
    getCurrentCompilationMode(compiler: Compiler) {
        // From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
        const isProductionLikeMode = compiler.options.mode === "production" || !compiler.options.mode
        // Read the current `mode` and `devMode` option
        const faviconDefaultMode = isProductionLikeMode ? "webapp" : "light"

        return isProductionLikeMode
            ? this.options.mode || faviconDefaultMode
            : this.options.devMode || this.options.mode || faviconDefaultMode
    }

    hookWebpackHtmlPlugin(compiler: Compiler, compilation: any, faviconCompilation: Promise<CompilationResult>) {
        // Hook into the html-webpack-plugin processing and add the html
        // @ts-ignore
        const htmlWebpackPlugin = compiler.options.plugins
            .map(({ constructor }) => constructor)
            .find(
                /**
                 * Find only HtmlWebpkackPlugin constructors
                 * @type {(constructor: Function) => constructor is typeof import('html-webpack-plugin')}
                 */
                (constructor) => constructor && constructor.name === "HtmlWebpackPlugin"
            ) as HtmlWebpackPlugin | undefined

        if (htmlWebpackPlugin && this.options.inject) {
            // @ts-ignore
            if (htmlWebpackPlugin.version <= 5) {
                compilation.errors.push(
                    new Error(
                        `${
                            PLUGIN_NAME +
                            "- This FaviconsWebpackPlugin version is not compatible with your current HtmlWebpackPlugin version.\n" +
                            "Please upgrade to HtmlWebpackPlugin >= 5"
                        }${getHtmlWebpackPluginVersion()}`
                    )
                )
                return
            }

            htmlWebpackPlugin
                // @ts-ignore
                .getHooks(compilation)
                // @ts-ignore
                .alterAssetTags.tapAsync(PLUGIN_NAME, (htmlPluginData, htmlWebpackPluginCallback) => {
                    // Skip if a custom injectFunction returns false or if
                    // the htmlWebpackPlugin optuons includes a `icons: false` flag
                    const isInjectionAllowed =
                        typeof this.options.inject === "function"
                            ? this.options.inject(htmlPluginData.plugin)
                            : this.options.inject &&
                              htmlPluginData.plugin.userOptions.favicon !== false &&
                              htmlPluginData.plugin.userOptions.favicons !== false

                    if (!isInjectionAllowed) {
                        return htmlWebpackPluginCallback(null, htmlPluginData)
                    }

                    faviconCompilation
                        .then((result) => {
                            htmlPluginData.assetTags.meta.push(
                                ...result.tags
                                    .map((tag) => parse5.parseFragment(tag).childNodes[0])
                                    // @ts-ignore
                                    .map(({ tagName, attrs }) => ({
                                        tagName,
                                        voidTag: true,
                                        attributes: attrs.reduce(
                                            // @ts-ignore
                                            (obj, { name, value }) => Object.assign(obj, { [name]: value }),
                                            {}
                                        ),
                                    }))
                            )

                            htmlWebpackPluginCallback(null, htmlPluginData)
                        })
                        .catch(htmlWebpackPluginCallback)
                })
        }
    }
}

/** Return the currently used html-webpack-plugin location */
function getHtmlWebpackPluginVersion() {
    try {
        const location = require.resolve("html-webpack-plugin/package.json")
        const version = require(location).version

        return `found html-webpack-plugin ${version} at ${location}`
    } catch (e) {
        return "html-webpack-plugin not found"
    }
}

/**
 * Try to load favicon for the full favicon generation
 *
 * As favicon turned from a direct dependency to a peerDependency a detailed error message is shown
 * to resolve the breaking change
 */
const loadFaviconsLibrary = () => {
    try {
        return require("icons")
    } catch (e) {
        throw new Error(
            'Could not find the npm peerDependency "icons".\nPlease run:\nnpm i icons\n - or -\nyarn add icons\n\n' +
                String(e)
        )
    }
}

export default FaviconsManifestWebpackPlugin
