export type RelativeFunction = (path: string) => string

export interface FaviconImage {
    name: string
    contents: Buffer
}

export interface FaviconFile {
    name: string
    contents: string
}

export interface FaviconResponse {
    images: FaviconImage[]
    files: FaviconFile[]
    html: string[]
}

export interface IconSettings {
    width: number
    height: number
    transparent: boolean
    rotate: boolean
    /** @see https://web.dev/maskable-icon/ */
    purpose?: "any" | "maskable"
    /** This is only needed for apple icons */
    dwidth?: number
    dheight?: number
    pixelRatio?: number
    orientation?: "portrait" | "landscape"
}

export interface IconOptions {
    /** Offset in percentage */
    offset?: number

    /** Set background_color color for the specified icons, hex code for a specific color, undefined for default browser color behavior and "inherit" for force use of default browser color */
    background?: string

    /** Apply mask in order to create circle icon (applied by default for firefox) */
    mask?: boolean

    /** Apply glow effect after mask has been applied (applied by default for firefox) */
    overlayGlow?: boolean

    /** Apply drop shadow after mask has been applied */
    overlayShadow?: boolean

    /** Generates icons defined in this list, use to the name of a icon found in preset/recommended or generate new sizes with the object. */
    icons?: string[] | IconSettings[]
}

export interface Icons {
    /* Create Android homescreen icon. */
    android: boolean | IconOptions
    /* Create Apple touch icons. */
    appleIcon: boolean | IconOptions
    /* Create Apple startup assets. */
    appleStartup: boolean | IconOptions
    /* Create regular icons. */
    favicons: boolean | IconOptions
    /* Create Windows 8 tile icons. */
    windows: boolean | IconOptions
}

/** More info can be found on https://web.dev/add-manifest/ */
export interface Manifest {
    /**
     * The name member is a string that represents the name of the web application as it is usually displayed to the user
     * (e.g., amongst a list of other applications, or as a label for an icon). name is directionality-capable,
     * which means it can be displayed left-to-right or right-to-left based on the values of the dir and lang manifest members.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/lang
     *
     * The 30 character limit is used in order to be consistent
     * with the native OSes/app stores limits/recommendations.
     *
     * @see https://developer.apple.com/app-store/product-page/
     * @see https://support.google.com/googleplay/android-developer/answer/113469#store_listing
     */
    name: string

    /**
     * The short_name member is a string that represents the name of the web application displayed to the user
     * if there is not enough space to display name (e.g., as a label for an icon on the phone home screen).
     * short_name is directionality-capable, which means it can be displayed left-to-right or right-to-left
     * based on the value of the dir and lang manifest members.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name
     *
     * The 12 character limit is used to ensure that for most
     * cases the value won't be truncated. However depending
     * on other things such as:
     *
     *  * what font the user is using
     *  * what characters the web site/app name includes
     *    (e.g. `i` occupies less space then `W`)
     *
     *  the text may still be truncated even if it's under
     *  12 characters.
     *
     *  Note: This is also consistent with what the Chrome team
     *  used to, and still recommends.
     *
     *  @see https://developer.chrome.com/apps/manifest/name#short_name
     */
    short_name: string

    /**
     * The description member is a string in which developers can explain what the application does.
     * description is directionality-capable, which means it can be displayed left to right or
     * right to left based on the values of the dir and lang manifest members.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/description
     */
    description: string

    /**
     * Add a cross-origin attribute to the manifest <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" /> link tag.
     */
    crossOrigin: "use-credentials" | "anonymous"

    /**
     * The start_url member is a string that represents the start URL of the web application — the preferred URL that should be loaded
     * when the user launches the web application
     * (e.g., when the user taps on the web application's icon from a device's application menu or homescreen).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url
     */
    start_url: string

    /**
     * The lang member is a string containing a single language tag.
     * It specifies the primary language for the values of the manifest's directionality-capable members,
     * and together with dir determines their directionality.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/lang
     */
    lang: string

    /**
     * The display member is a string that determines the developers’ preferred display mode for the website.
     * The display mode changes how much of browser UI is shown to the user and can range from browser (when the full browser window is shown)
     * to fullscreen (when the app is full-screened).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/display
     */
    display: "fullscreen" | "standalone" | "minimal-ui" | "browser"

    /**
     * The base direction in which to display direction-capable members of the manifest.
     * Together with the lang member, it helps to correctly display right-to-left languages.
     *
     * The directionality-capable members are:
     * - name
     * - short_name
     * - description
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/dir
     */
    dir: "auto" | "left" | "right"

    /**
     * Therefore background_color should match the background_color-color CSS property in the site’s stylesheet
     * for a smooth transition between launching the web application and loading the site's content.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/background_color
     */
    background_color: string

    /**
     * The theme_color member is a string that defines the default theme color for the application.
     * This sometimes affects how the OS displays the site (e.g., on Android's task switcher, the theme color surrounds the site).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color
     */
    theme_color: string

    /**
     * The orientation member defines the default orientation for all the website's top-level
     *
     * orientation and/or its specific values might not be supported by a user agent on various display modes because
     * supporting them does not make sense for the particular context.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation
     */
    orientation:
        | "any"
        | "natural"
        | "landscape"
        | "landscape-primary"
        | "landscape-secondary"
        | "portrait"
        | "portrait-primary"
        | "portrait-secondary"

    /**
     * The prefer_related_applications member is a boolean value that specifies that applications listed in related_applications
     * should be preferred over the web application. If the prefer_related_applications member is set to true,
     * the user agent might suggest installing one of the related applications instead of this web app.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/prefer_related_applications
     */
    prefer_related_applications: boolean

    /**
     * The related_applications field is an array of objects specifying native applications that are installable by, or accessible to,
     * the underlying platform — for example, a native Android application obtainable through the Google Play Store.
     * Such applications are intended to be alternatives to the manifest's website that provides similar/equivalent
     * functionality — like the native app equivalent.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/related_applications
     */
    related_applications: {
        platform: string
        url: string
        id?: string
    }[]

    /**
     * The scope member is a string that defines the navigation scope of this web application's application context.
     * It restricts what web pages can be viewed while the manifest is applied. If the user navigates outside the scope,
     * it reverts to a normal web page inside a browser tab or window.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/scope
     */
    scope: string

    /**
     * The categories member is an array of strings defining the names of categories that the application supposedly belongs to.
     *
     * categories are used only as hints for catalogs or stores listing web applications.
     * Like search engines and meta keywords, catalogs and stores are free to ignore them.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/categories
     * @see https://github.com/w3c/manifest/wiki/Categories
     */
    categories: string[]

    /**
     * The iarc_rating_id member is a string that represents the International Age Rating Coalition (IARC) certification code of the web application.
     * It is intended to be used to determine which ages the web application is appropriate for.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/iarc_rating_id
     * @see https://www.globalratings.com/
     */
    iarc_rating_id: string

    /**
     * The screenshots member defines an array of screenshots intended to showcase the application.
     * These images are intended to be used by progressive web app stores.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/screenshots
     */
    screenshots: {
        src: string
        sizes: string
        type: string
    }[]

    /**
     * The shortcuts member defines an array of shortcuts or links to key tasks or pages within a web app.
     * A user agent can use these values to assemble a context menu to be displayed by the operating system
     * when a user engages with the web app's icon. When user invokes a shortcut, the user agent will navigate
     * to the address given by shortcut's url member.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest/shortcuts
     */
    shortcuts: {
        name: string
        short_name?: string
        description?: string
        url: string
        icons?: {
            src: string
            type: string
            purpose: "monochrome" | "maskable" | "any"
        }[]
    }[]

    /**
     * Style for Apple status bar @default 'black-translucent'
     */
    apple_status_bar_style: "black-translucent" | "default" | "black"
}

export interface LocalizeManifest extends Manifest {
    localize: Manifest[]
}

export interface Options {
    /** our source logo - can be png or svg (required) */
    logo: string

    /**
     * Use nearest neighbor resampling to preserve hard edges on pixel art @default false
     * */
    pixelArt?: boolean

    /** Option to overwrite the  */
    favicon?: string

    /**
     * Favicons configuration option
     */
    icons?: Partial<Icons>

    /**
     * Manifest configuration option
     */
    manifest?: Partial<LocalizeManifest>

    generators?: Partial<{
        html: boolean
        /** @see https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)?redirectedfrom=MSDN */
        manifest: boolean
    }>
}

export interface InternalOptions extends Options {
    icons: Icons
}

export type PresetValue = {
    [key: string]: { [key: string]: number | string | boolean | { width: number; height: number }[] }
}

export interface PresetConfig {
    [key: string]: PresetValue
}
