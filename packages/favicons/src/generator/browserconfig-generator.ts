import { InternalOptions } from "../types"
import { DefinedError } from "ajv"
import ajv from "./../ajv"
import parser from "fast-xml-parser"
import BrowserConfigSchema from "../schema/browserconfig.xml"

const j2xParser = parser.j2xParser

const generator = (
    options: InternalOptions,
    icons
): {
    name: string
    content: string
} | null => {
    if (options.manifest === undefined) {
        return null
    }

    const validate = ajv.compile(BrowserConfigSchema)

    const browserConfig = {
        browserconfig: {
            msapplication: {
                title: {
                    TileColor: options.manifest.background_color,
                    ...icons,
                },
            },
        },
    }

    if (validate(browserConfig)) {
        const parser = new j2xParser({ format: true })

        return {
            name: "browserconfig.xml",
            content: parser.parse(browserConfig),
        }
    }

    for (const err of validate.errors as DefinedError[]) {
        throw new Error(`${err.propertyName}: ${err.message}`)
    }

    return null
}

export default generator
