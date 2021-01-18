import crypto from "crypto"
import url from "url"

/**
 * Replaces [contenthash] and [fullhash] inside the given publicPath and assetPath
 */
export const resolvePublicPath = (
    compilation: any,
    publicPath: string | Function | undefined,
    assetPath: string
): string => {
    const publicPathString =
        publicPath && typeof publicPath === "function"
            ? compilation.getAssetPath(compilation.outputOptions.publicPath || "auto", { hash: compilation.hash })
            : publicPath

    return url.resolve(appendSlash(publicPathString || "auto"), assetPath)
}

const appendSlash = (url: string): string => {
    return url && url.length && url.substr(-1, 1) !== "/" ? url + "/" : url
}

/**
 * Replaces [contenthash] and [fullhash] inside the given publicPath and assetPath
 */
export const replaceContentHash = (compilation: any, assetPath: string, hash: string): string => {
    return compilation.getAssetPath(assetPath, {
        hash: compilation.hash || hash,
        chunk: {
            id: "1",
            hash,
        },
        contentHash: hash,
    })
}

export const getContentHash = (file: Buffer | string): string => {
    return crypto.createHash("sha256").update(file.toString("utf8")).digest("hex")
}
