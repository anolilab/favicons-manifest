import { Icons, Manifest } from "../types"

export const icons: Icons = {
    // android-chrome-144x144.png
    android: [
        {
            sizes: [
                {
                    width: 144,
                    height: 144,
                },
                {
                    width: 256,
                    height: 256,
                },
                {
                    width: 384,
                    height: 384,
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
        },
        // "android-chrome-maskable-36x36.png"
        {
            sizes: [
                {
                    width: 36,
                    height: 36,
                },
                {
                    width: 48,
                    height: 48,
                },
                {
                    width: 72,
                    height: 72,
                },
                {
                    width: 96,
                    height: 96,
                },
                {
                    width: 144,
                    height: 144,
                },
                {
                    width: 192,
                    height: 192,
                },
                {
                    width: 256,
                    height: 256,
                },
                {
                    width: 384,
                    height: 384,
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
            mask: true,
            background: false,
            overlayGlow: false,
            overlayShadow: false,
        },
    ],
    appleIcon: [
        {
            //"apple-touch-icon-57x57.png"
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
        },
    ],
    // Device              Portrait size      Landscape size     Screen size        Pixel ratio
    // iPhone SE            640px × 1136px    1136px ×  640px     320px ×  568px    2
    // iPhone 8             750px × 1334px    1334px ×  750px     375px ×  667px    2
    // iPhone 7             750px × 1334px    1334px ×  750px     375px ×  667px    2
    // iPhone 6s            750px × 1334px    1334px ×  750px     375px ×  667px    2
    // iPhone XR            828px × 1792px    1792px ×  828px     414px ×  896px    2
    // iPhone XS           1125px × 2436px    2436px × 1125px     375px ×  812px    3
    // iPhone X            1125px × 2436px    2436px × 1125px     375px ×  812px    3
    // iPhone 8 Plus       1242px × 2208px    2208px × 1242px     414px ×  736px    3
    // iPhone 7 Plus       1242px × 2208px    2208px × 1242px     414px ×  736px    3
    // iPhone 6s Plus      1242px × 2208px    2208px × 1242px     414px ×  736px    3
    // iPhone XS Max       1242px × 2688px    2688px × 1242px     414px ×  896px    3
    // 9.7" iPad           1536px × 2048px    2048px × 1536px     768px × 1024px    2
    // 10.2" iPad          1620px × 2160px    2160px x 1620px     810px × 1080px    2
    // 7.9" iPad mini 4    1536px × 2048px    2048px × 1536px     768px × 1024px    2
    // 10.5" iPad Pro      1668px × 2224px    2224px × 1668px     834px × 1112px    2
    // 11" iPad Pro        1668px × 2388px    2388px × 1668px     834px × 1194px    2
    // 12.9" iPad Pro      2048px × 2732px    2732px × 2048px    1024px × 1366px    2
    appleStartup: [
        {
            // "apple-touch-startup-image-750x1334.png":
            sizes: [
                {
                    width: 640,
                    height: 1136,
                    dwidth: 320,
                    dheight: 568,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 750,
                    height: 1334,
                    dwidth: 375,
                    dheight: 667,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 828,
                    height: 1792,
                    dwidth: 414,
                    dheight: 896,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 1125,
                    height: 2436,
                    dwidth: 375,
                    dheight: 812,
                    pixelRatio: 3,
                    orientation: "portrait",
                },
                {
                    width: 1242,
                    height: 2208,
                    dwidth: 414,
                    dheight: 736,
                    pixelRatio: 3,
                    orientation: "portrait",
                },
                {
                    width: 1242,
                    height: 2688,
                    dwidth: 414,
                    dheight: 896,
                    pixelRatio: 3,
                    orientation: "portrait",
                },
                {
                    width: 1536,
                    height: 2048,
                    dwidth: 768,
                    dheight: 1024,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 1668,
                    height: 2224,
                    dwidth: 834,
                    dheight: 1112,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 1668,
                    height: 2388,
                    dwidth: 834,
                    dheight: 1194,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 2048,
                    height: 2732,
                    dwidth: 1024,
                    dheight: 1366,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    height: 2160,
                    width: 1620,
                    dwidth: 810,
                    dheight: 1080,
                    pixelRatio: 2,
                    orientation: "portrait",
                },
                {
                    width: 1136,
                    height: 640,
                    dwidth: 320,
                    dheight: 568,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 2160,
                    height: 1620,
                    dwidth: 810,
                    dheight: 1080,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 1334,
                    height: 750,
                    dwidth: 375,
                    dheight: 667,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 1792,
                    height: 828,
                    dwidth: 414,
                    dheight: 896,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 2436,
                    height: 1125,
                    dwidth: 375,
                    dheight: 812,
                    pixelRatio: 3,
                    orientation: "landscape",
                },
                {
                    width: 2208,
                    height: 1242,
                    dwidth: 414,
                    dheight: 736,
                    pixelRatio: 3,
                    orientation: "landscape",
                },
                {
                    width: 2688,
                    height: 1242,
                    dwidth: 414,
                    dheight: 896,
                    pixelRatio: 3,
                    orientation: "landscape",
                },
                {
                    width: 2048,
                    height: 1536,
                    dwidth: 768,
                    dheight: 1024,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 2224,
                    height: 1668,
                    dwidth: 834,
                    dheight: 1112,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 2388,
                    height: 1668,
                    dwidth: 834,
                    dheight: 1194,
                    pixelRatio: 2,
                    orientation: "landscape",
                },
                {
                    width: 2732,
                    height: 2048,
                    dwidth: 1024,
                    dheight: 1366,
                    pixelRatio: 2,
                    orientation: "landscape",
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
        },
        {
            sizes: [
                {
                    width: 16,
                    height: 16,
                },
                {
                    width: 24,
                    height: 24,
                },
                {
                    width: 32,
                    height: 32,
                },
                {
                    width: 48,
                    height: 48,
                },
                {
                    width: 64,
                    height: 64,
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
        },
    ],
    windows: [
        {
            // "mstile-70x70.png"
            sizes: [
                {
                    width: 70,
                    height: 70,
                },
                {
                    width: 144,
                    height: 144,
                },
                {
                    width: 150,
                    height: 150,
                },
                {
                    width: 310,
                    height: 150,
                },
                {
                    width: 310,
                    height: 310,
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
        },
    ],
}

export const manifest: Partial<Manifest> = {
    dir: "auto",
    crossOrigin: "use-credentials",
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    apple_status_bar_style: "black-translucent",
}
