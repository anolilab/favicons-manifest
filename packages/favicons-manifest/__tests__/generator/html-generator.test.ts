import { wrap } from "jest-snapshot-serializer-raw"
import htmlGenerator from "../../src/generator/html-generator"
import { icons as recommendedIcons } from "../../src/preset/recommended"
import { relative } from "../../src/utils/path"
import { InternalOptions, Manifest } from "../../src/types"
import NullLogger from "../../src/logger/null-logger"

const manifest: Manifest = {
    name: "test",
    short_name: "__tests__",
    description: "description",
    start_url: "./",
    lang: "de-DE",
    display: "browser",
    dir: "auto",
    background_color: "#fff",
    theme_color: "#fff",
    orientation: "any",
    prefer_related_applications: true,
    related_applications: [
        {
            platform: "play",
            url: "https://play.google.com/store/apps/details?id=com.example.app1",
            id: "com.example.app1",
        },
        {
            platform: "itunes",
            url: "https://itunes.apple.com/app/example-app1/id123456789",
        },
    ],
    scope: "/app/",
    categories: ["books", "education", "medical"],
    iarc_rating_id: "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7",
    screenshots: [
        {
            src: "screenshot1.webp",
            sizes: "1280x720",
            type: "image/webp",
        },
        {
            src: "screenshot2.webp",
            sizes: "1280x720",
            type: "image/webp",
        },
    ],
    shortcuts: [
        {
            name: "Today's agenda",
            url: "/today",
            description: "List of events planned for today",
        },
        {
            name: "New event",
            url: "/create/event",
        },
        {
            name: "New reminder",
            url: "/create/reminder",
        },
    ],
    apple: {
        statusBarStyle: "black-translucent",
        webAppCapable: true,
    },
}

const iosIcons = {
    ...recommendedIcons,
    /* apple-touch-icon-57x57.png */
    appleIcon: [
        {
            sizes: [
                {
                    width: 57,
                    height: 57,
                },
                {
                    width: 60,
                    height: 60,
                },
                {
                    width: 72,
                    height: 72,
                },
                {
                    width: 76,
                    height: 76,
                },
                {
                    width: 114,
                    height: 114,
                },
                {
                    width: 120,
                    height: 120,
                },
                {
                    width: 144,
                    height: 144,
                },
                {
                    width: 152,
                    height: 152,
                },
                {
                    width: 167,
                    height: 167,
                },
                {
                    width: 180,
                    height: 180,
                },
                {
                    width: 1024,
                    height: 1024,
                },
            ],
            type: "png",
            transparent: true,
            rotate: false,
            offset: 0,
            mask: false,
            background: false,
            overlayGlow: false,
            overlayShadow: false,
            purpose: "any",
        },
    ],
}

describe("html-generator", () => {
    it("generate full html file with local path", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "/",
                manifest,
                icons: recommendedIcons,
                favicon: true,
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate full html file with local path and full apple icon list", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "/",
                manifest,
                icons: iosIcons,
                favicon: true,
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate full html file with url", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "/",
                manifest,
                icons: recommendedIcons,
                favicon: true,
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "http://example.com"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate full html file without short_name", () => {
        expect.assertions(1)

        const m = manifest

        delete m.short_name

        const output = htmlGenerator(
            {
                path: "/",
                manifest: m,
                icons: recommendedIcons,
                favicon: true,
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate full html file with favicon string", () => {
        expect.assertions(1)

        const m = manifest

        delete m.short_name

        const output = htmlGenerator(
            {
                path: "/",
                manifest: m,
                icons: recommendedIcons,
                favicon: "favicon.test.ico",
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate html file without manifest", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "/",
                manifest: undefined,
                icons: recommendedIcons,
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: false,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "http://example.com"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate full html file with local path and without apple statusbar and capable", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "/",
                manifest: {
                    ...manifest,
                    apple: {
                        statusBarStyle: undefined,
                        webAppCapable: undefined,
                    },
                },
                icons: iosIcons,
                favicon: true,
                generators: {
                    html: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        favicons: true,
                        window: true,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })

    it("generate full html file with full false list on html generator", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "/",
                manifest: {
                    ...manifest,
                    apple: {
                        statusBarStyle: undefined,
                        webAppCapable: undefined,
                    },
                },
                icons: iosIcons,
                favicon: true,
                generators: {
                    html: {
                        android: false,
                        appleIcon: false,
                        appleStartup: false,
                        favicons: false,
                        window: false,
                    },
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/"),
            NullLogger
        )

        expect(wrap(output.join("\n"))).toMatchSnapshot()
    })
})
