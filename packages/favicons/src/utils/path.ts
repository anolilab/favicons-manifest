import path from "path"
import { fullFormats } from "ajv-formats/dist/formats"
import { URL } from "url"

export const relative = (srcPath: string, base: string, relativeToPath = false) => {
    const directory = (p: string) => {
        return p.substr(-1) === "/" ? p : `${p}/`
    }

    if (relativeToPath) {
        return srcPath
    }

    if ((fullFormats.uri as Function)(base)) {
        return new URL(srcPath, base).toString()
    }

    return path.join(directory(base), srcPath)
}
