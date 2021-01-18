export const appleIconSizes: number[] = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180, 1024]

export const appleStartupItems: {
    dwidth: number
    dheight: number
    pixelRatio: number
    orientation: string
    width: number
    height: number
}[] = [
    //
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
    {
        dwidth: 320,
        dheight: 568,
        pixelRatio: 2,
        orientation: "portrait",
        width: 640,
        height: 1136,
    },
    {
        dwidth: 375,
        dheight: 667,
        pixelRatio: 2,
        orientation: "portrait",
        width: 750,
        height: 1334,
    },
    {
        dwidth: 414,
        dheight: 896,
        pixelRatio: 2,
        orientation: "portrait",
        width: 828,
        height: 1792,
    },
    {
        dwidth: 375,
        dheight: 812,
        pixelRatio: 3,
        orientation: "portrait",
        width: 1125,
        height: 2436,
    },
    {
        dwidth: 414,
        dheight: 736,
        pixelRatio: 3,
        orientation: "portrait",
        width: 1242,
        height: 2208,
    },
    {
        dwidth: 414,
        dheight: 896,
        pixelRatio: 3,
        orientation: "portrait",
        width: 1242,
        height: 2688,
    },
    {
        dwidth: 768,
        dheight: 1024,
        pixelRatio: 2,
        orientation: "portrait",
        width: 1536,
        height: 2048,
    },
    {
        dwidth: 834,
        dheight: 1112,
        pixelRatio: 2,
        orientation: "portrait",
        width: 1668,
        height: 2224,
    },
    {
        dwidth: 834,
        dheight: 1194,
        pixelRatio: 2,
        orientation: "portrait",
        width: 1668,
        height: 2388,
    },
    {
        dwidth: 1024,
        dheight: 1366,
        pixelRatio: 2,
        orientation: "portrait",
        width: 2048,
        height: 2732,
    },
    {
        dwidth: 810,
        dheight: 1080,
        pixelRatio: 2,
        orientation: "portrait",
        width: 1620,
        height: 2160,
    },

    {
        dwidth: 320,
        dheight: 568,
        pixelRatio: 2,
        orientation: "landscape",
        width: 1136,
        height: 640,
    },
    {
        dwidth: 375,
        dheight: 667,
        pixelRatio: 2,
        orientation: "landscape",
        width: 1334,
        height: 750,
    },
    {
        dwidth: 414,
        dheight: 896,
        pixelRatio: 2,
        orientation: "landscape",
        width: 1792,
        height: 828,
    },
    {
        dwidth: 375,
        dheight: 812,
        pixelRatio: 3,
        orientation: "landscape",
        width: 2436,
        height: 1125,
    },
    {
        dwidth: 414,
        dheight: 736,
        pixelRatio: 3,
        orientation: "landscape",
        width: 2208,
        height: 1242,
    },
    {
        dwidth: 414,
        dheight: 896,
        pixelRatio: 3,
        orientation: "landscape",
        width: 2688,
        height: 1242,
    },
    {
        dwidth: 768,
        dheight: 1024,
        pixelRatio: 2,
        orientation: "landscape",
        width: 2048,
        height: 1536,
    },
    {
        dwidth: 834,
        dheight: 1112,
        pixelRatio: 2,
        orientation: "landscape",
        width: 2224,
        height: 1668,
    },
    {
        dwidth: 834,
        dheight: 1194,
        pixelRatio: 2,
        orientation: "landscape",
        width: 2388,
        height: 1668,
    },
    {
        dwidth: 1024,
        dheight: 1366,
        pixelRatio: 2,
        orientation: "landscape",
        width: 2732,
        height: 2048,
    },
    {
        dwidth: 810,
        dheight: 1080,
        pixelRatio: 2,
        orientation: "landscape",
        width: 2160,
        height: 1620,
    },
]

export const faviconSizes: number[] = [16, 32, 48]
