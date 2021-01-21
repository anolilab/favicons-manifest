import path from "path"
import { wrap } from "jest-snapshot-serializer-raw"
import imageGenerator from "../../src/generator/image-generator"
import { InternalOptions } from "../../src/types"
import NullLogger from "../../src/logger/null-logger"

const manifest = {
    name: "test",
    short_name: "__tests__-2",
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
}

describe("image-generator", () => {
    it("generate image list based on logo.png", async () => {
        expect.assertions(1)

        const data = await imageGenerator(
            path.join(__dirname, "..", "fixtures", "logo.png"),
            {
                manifest,
                icons: {
                    android: [
                        {
                            /* android-chrome-widthxheight.png */
                            sizes: [
                                {
                                    width: 192,
                                    height: 192,
                                },
                                {
                                    width: 512,
                                    height: 512,
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
                    favicons: [
                        {
                            sizes: [
                                {
                                    width: 16,
                                    height: 16,
                                },
                                {
                                    width: 32,
                                    height: 32,
                                },
                                {
                                    width: 48,
                                    height: 48,
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
                        {
                            sizes: [
                                {
                                    width: 16,
                                    height: 16,
                                },
                                {
                                    width: 32,
                                    height: 32,
                                },
                                {
                                    width: 48,
                                    height: 48,
                                },
                            ],
                            type: "ico",
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
                },
            } as InternalOptions,
            NullLogger
        )

        expect(wrap(JSON.stringify(data, null, 2))).toMatchSnapshot()
    })
})
