import { sources } from "webpack"
import { Source } from "@anolilab/favicons-manifest"

export type CompilationResult = {
    assets: { name: string; contents: sources.RawSource }[]
    tags: string[]
}

export type FaviconsGenerator = (
    logoSource: Source,
    compilation: any,
    resolvedPublicPath: string,
    outputPath: string
) => Promise<CompilationResult>
