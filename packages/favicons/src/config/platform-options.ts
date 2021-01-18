const config = {
    offset: {
        platforms: ["android", "appleIcon", "appleStartup", "windows", "favicons"],
        defaultTo: 0,
    },
    background: {
        platforms: ["android", "appleIcon", "appleStartup", "windows", "favicons"],
        appleIcon: true,
        appleStartup: true,
        firefox: true,
        defaultTo: false,
    },
    mask: {
        platforms: ["android", "appleIcon", "appleStartup", "windows", "favicons"],
        firefox: true,
        defaultTo: false,
    },
    overlayGlow: {
        platforms: ["android", "appleIcon", "appleStartup", "windows", "favicons"],
        firefox: true,
        defaultTo: false,
    },
    overlayShadow: {
        platforms: ["android", "appleIcon", "appleStartup", "windows", "favicons"],
        defaultTo: false,
    },
}

export default config
