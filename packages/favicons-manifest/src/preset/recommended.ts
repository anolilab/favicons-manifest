import { Icons, Manifest } from "../types"

export const icons: Icons = {
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
        {
            /* android-chrome-maskable-36x36.png */
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
            mask: true,
            background: false,
            overlayGlow: false,
            overlayShadow: false,
            purpose: "maskable",
        },
    ],
    appleIcon: [
        {
            /* apple-touch-icon-widthxheight.png */
            sizes: [
                /**
                 * See webhint explanation on why a single 180x180 touch icon might be the best solution: [https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/](https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/):
                 *
                 * Over time as Apple released different size displays for their devices, the requirements for the size of the touch icon have changed quite a bit \[...\]. Declaring one 180×180px PNG image, e.g.:
                 *
                 * ```html
                 *   <link rel="apple-touch-icon" href="apple-touch-icon.png">
                 * ```
                 *
                 * in the <head> of the page is enough, and including all the different sizes is not recommended as:
                 *
                 * - It will increase the size of the pages with very little to no real benefit (most users will probably not add the site to their home screens).
                 *
                 * - Most sizes will probably never be used as iOS devices get upgraded quickly, so [most iOS users will be on the latest 2 versions of iOS]app store stats and using newer devices.
                 *
                 * - The 180×180px image, if needed, [will be automatically downscaled by Safari, and the result of the scaling is generally ok][icon scaling].
                 *
                 * The only downside to using one icon is that some users will load a larger image, while a much smaller file would have worked just as well. But the chance of that happening decreases with every day as users upgrade their devices and their iOS version.
                 */
                {
                    width: 180,
                    height: 180,
                },
                {
                    width: 192,
                    height: 192,
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
            /* apple-touch-startup-image-widthxheight.png */
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
            purpose: "any",
            darkMode: false,
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
    windows: [
        {
            /**
             * There are 4 pictures, named ms-square70x70logo, ms-square150x150logo, ms-square310x310logo and ms-wide310x150logo.
             * They should be 70x70, 150x150, 310x310 and 310x150 right? Almost.
             * In fact Microsoft recommends to use larger pictures.
             * This is to present high resolution pictures to the user even when the desktop is scaled up.
             * Therefore the recommended sizes are 128x128, 270x270, 558x558 and 558x270.
             *
             * @see http://msdn.microsoft.com/en-us/library/ie/dn455106(v=vs.85).aspx
             *
             * Since all tiles are declared in browserconfig.xml, why not mstile-144x144.png?
             * mstile-144x144.png was defined for Windows 8.0, whereas browserconfig.xml was introduced by Windows 8.1. mstile-144x144.png is somehow deprecated.
             */
            sizes: [
                {
                    name: "ms-70x70",
                    width: 128,
                    height: 128,
                    format: "square",
                },
                {
                    name: "ms-150x150",
                    width: 270,
                    height: 270,
                    format: "square",
                },
                {
                    name: "ms-310x310",
                    width: 558,
                    height: 558,
                    format: "square",
                },
                {
                    name: "ms-310x150",
                    width: 558,
                    height: 270,
                    format: "wide",
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

export const manifest: Partial<Manifest> = {
    dir: "auto",
    crossOrigin: "use-credentials",
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    apple: {
        statusBarStyle: "black-translucent",
        webAppCapable: true,
    },
}
