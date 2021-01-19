const path = require("path")

export const fixture = (uri: string) => {
    return path.resolve(__dirname, "..", "fixtures", uri)
}
