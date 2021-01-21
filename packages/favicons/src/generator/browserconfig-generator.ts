import { FaviconFile, InternalOptions, Logger, RelativeFunction } from "../types"
import getIconName from "../utils/get-icon-name"

const generator = (options: InternalOptions, relative: RelativeFunction, logger: Logger): FaviconFile | null => {
    const browserConfigLogger = logger("browserconfig")

    if (options.manifest === undefined) {
        browserConfigLogger.log("No manifest configuration was found.")

        return null
    }

    if (options.icons.windows === undefined) {
        browserConfigLogger.log("No windows icons was found.")

        return null
    }

    const icons: string[] = []

    options.icons.windows.forEach((settings) => {
        settings.sizes.forEach((size) => {
            const src = relative(
                `${getIconName("windows")}${settings.purpose !== "any" ? `-${settings.purpose}` : ""}-${size.width}x${
                    size.height
                }${size.fingerprint ? `.${size.fingerprint}` : ""}.${settings.type}`
            )

            icons.push(`<${size.format}${size.width}x${size.height}logo src="${src}" />`)
        })
    })

    if (options.manifest.background_color === undefined) {
        throw new Error(`Background color is needed for "TileColor"`)
    }

    if (icons.length === 0) {
        throw new Error(`No icons found for the browserconfig.xml`)
    }

    browserConfigLogger.log("Creating browserconfig.xml")

    return {
        name: "browserconfig.xml",
        contents: `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
   <msapplication>
     <tile>
        ${icons.join("\n")}
        <TileColor>${options.manifest.background_color}</TileColor>
     </tile>
   </msapplication>
</browserconfig>
`,
    }
}

export default generator
