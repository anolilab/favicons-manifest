export const directory = (path: string) => {
    return path.substr(-1) === "/" ? path : `${path}/`
}

export const relative = (path: string, basePath?: string, relativeToPath = false) => {
    const url = new URL(path, (!relativeToPath && basePath && directory(basePath)) || "")

    return url.href
}
