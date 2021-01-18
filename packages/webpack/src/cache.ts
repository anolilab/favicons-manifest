import path from "path"
import { getContentHash, replaceContentHash, resolvePublicPath } from "./hash"
import { InternalPluginOptions } from "./options"
import { CompilationResult, FaviconsGenerator } from "./types"
import { PLUGIN_NAME } from "./const"
import { createSnapshot, isSnapShotValid } from "./file-watcher-api"

const snapshots: WeakMap<any, Promise<any>> = new WeakMap()
const faviconCache: WeakMap<any, Promise<CompilationResult>> = new WeakMap()

/**
 * Executes the generator function and caches the result in memory
 * The cache will be invalidated after the logo source file was modified
 */
export const runCached = (
    faviconOptions: InternalPluginOptions,
    context: string,
    compilation: any,
    pluginInstance: any,
    generator: FaviconsGenerator
): Promise<CompilationResult> => {
    const { logo } = faviconOptions

    const latestSnapShot = snapshots.get(pluginInstance)
    const cachedFavicons = latestSnapShot && faviconCache.get(latestSnapShot)

    if (latestSnapShot && cachedFavicons) {
        return isSnapShotValid(latestSnapShot, compilation).then((isValid: boolean) => {
            // If the source files have changed clear all caches
            // and try again
            if (!isValid) {
                faviconCache.delete(latestSnapShot)

                return runCached(faviconOptions, context, compilation, pluginInstance, generator)
            }
            // If the cache is valid return the result directly from cache
            return cachedFavicons
        })
    }

    // Store a snapshot of the filesystem
    // to find out if the logo was changed
    snapshots.set(
        pluginInstance,
        createSnapshot(
            {
                fileDependencies: [logo],
                contextDependencies: [],
                missingDependencies: [],
            },
            compilation,
            new Date().getTime()
        )
    )

    // Start generating the icons
    const faviconsGenerationsPromise = runWithFileCache(faviconOptions, context, compilation, generator)

    // Store the promise of the favicon compilation in cache
    faviconCache.set(snapshots.get(pluginInstance) || latestSnapShot, faviconsGenerationsPromise)

    return faviconsGenerationsPromise
}

/**
 * Executes the generator function and stores it in the webpack file cache
 */
async function runWithFileCache(
    faviconOptions: InternalPluginOptions,
    context: string,
    compilation: any,
    generator: FaviconsGenerator
): Promise<CompilationResult> {
    const { logo } = faviconOptions

    const logoSource: string | Buffer = await new Promise((resolve, reject) =>
        // @ts-ignore
        compilation.inputFileSystem.readFile(path.resolve(context, logo), (error, fileBuffer) => {
            if (error) {
                reject(error)
            } else {
                resolve(fileBuffer as string | Buffer)
            }
        })
    )

    const compilationOutputPath = compilation.outputOptions.path || ""
    /**
     * the relative output path to the folder where the favicon files should be generated to
     * it might include tokens like [fullhash] or [contenthash]
     */
    const relativeOutputPath = faviconOptions.outputPath
        ? path.relative(compilationOutputPath, path.resolve(compilationOutputPath, faviconOptions.outputPath))
        : faviconOptions.prefix

    const logoContentHash = getContentHash(logoSource)
    const executeGenerator = () => {
        const outputPath = replaceContentHash(compilation, relativeOutputPath, logoContentHash)
        const resolvedPublicPath = replaceContentHash(
            compilation,
            resolvePublicPath(
                compilation,
                faviconOptions.publicPath || compilation.outputOptions.publicPath,
                faviconOptions.prefix
            ),
            logoContentHash
        )

        return generator(logoSource, compilation, resolvedPublicPath, outputPath)
    }

    if (!faviconOptions.cache) {
        return executeGenerator()
    }

    const webpackCache = compilation.getCache(PLUGIN_NAME)

    // Cache invalidation token
    const eTag = [
        JSON.stringify(faviconOptions.publicPath),
        JSON.stringify(faviconOptions.mode),
        // Recompile filesystem cache if the user change the favicon options
        JSON.stringify(faviconOptions.favicons),
        // Recompile filesystem cache if the logo source changes:
        logoContentHash,
    ].join("\n")

    // Use the webpack cache which supports filesystem caching to improve build speed
    // See also https://webpack.js.org/configuration/other-options/#cache
    // Create one cache for every output target
    return webpackCache.providePromise(relativeOutputPath, eTag, executeGenerator)
}
