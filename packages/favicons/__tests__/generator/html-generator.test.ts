import { wrap } from "jest-snapshot-serializer-raw"
import htmlGenerator from "../../src/generator/html-generator"
import { icons } from "../../src/preset/recommended"
import { relative } from "../../src/utils/path"
import { InternalOptions, Manifest } from "../../src/types"

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
    apple_status_bar_style: "black-translucent",
}

describe("html-generator", () => {
    it("generate full html file with local path", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "http://example.com",
                manifest,
                icons: icons,
                favicon: true,
                generators: {
                    html: true,
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/")
        )

        expect(wrap(output)).toMatchSnapshot()
    })

    it("generate full html file with url", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "http://example.com",
                manifest,
                icons: icons,
                favicon: true,
                generators: {
                    html: true,
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "http://example.com")
        )

        expect(wrap(output)).toMatchSnapshot()
    })

    it("generate full html file without short_name", () => {
        expect.assertions(1)

        const m = manifest

        delete m.short_name

        const output = htmlGenerator(
            {
                path: "http://example.com",
                manifest: m,
                icons: icons,
                favicon: true,
                generators: {
                    html: true,
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/")
        )

        expect(wrap(output)).toMatchSnapshot()
    })

    it("generate full html file with favicon string", () => {
        expect.assertions(1)

        const m = manifest

        delete m.short_name

        const output = htmlGenerator(
            {
                path: "http://example.com",
                manifest: m,
                icons: icons,
                favicon: "favicon.test.ico",
                generators: {
                    html: true,
                    manifest: true,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "/")
        )

        expect(wrap(output)).toMatchSnapshot()
    })

    it("generate html file without manifest", () => {
        expect.assertions(1)

        const output = htmlGenerator(
            {
                path: "http://example.com",
                manifest: undefined,
                icons: icons,
                generators: {
                    html: true,
                    manifest: false,
                    browserconfig: true,
                },
            } as InternalOptions,
            (path) => relative(path, "http://example.com")
        )

        expect(wrap(output)).toMatchSnapshot()
    })
})
