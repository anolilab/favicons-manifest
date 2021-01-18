import FaviconsManifestWebpackPlugin from "@anolilab/favicons-manifest-webpack-plugin"

export const withFaviconsManifest = (nextConfig: {}) => {
    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            config.plugins.push(new FaviconsManifestWebpackPlugin({}))
        },
    })
}
