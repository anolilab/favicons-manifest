import { sources } from "webpack"

export type CompilationResult = {
    assets: { name: string; contents: sources.RawSource }[]
    tags: string[]
}

export type FaviconsGenerator = (
    logoSource: Buffer | string,
    compilation: any,
    resolvedPublicPath: string,
    outputPath: string
) => Promise<CompilationResult>
