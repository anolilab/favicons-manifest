module.exports = {
    "dryRun": true,
    "extends": "semantic-release-monorepo",
    "plugins": [
        [
            "@semantic-release/commit-analyzer",
            {
                "preset": "conventionalcommits",
            },
        ],
        [
            "@google/semantic-release-replace-plugin",
            {
                "replacements": [
                    // {
                    //     "files": [
                    //         "README.md",
                    //     ],
                    //     "from": "@v.*/mod.ts",
                    //     "to": "@v${nextRelease.version}/mod.ts",
                    //     "results": [
                    //         {
                    //             "file": "README.md",
                    //             "hasChanged": true,
                    //             "numMatches": 1,
                    //             "numReplacements": 1,
                    //         },
                    //     ],
                    //     "countMatches": true,
                    // },
                ],
            },
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                "preset": "conventionalcommits",
            },
        ],
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/github",
        [
            "@semantic-release/git",
            {
                "assets": [
                    "package.json",
                    "dist/*",
                    "README.md",
                    "UPGRADE.md",
                    "LICENSE.md.md",
                    "CHANGELOG.md",
                ],
            },
        ],
    ],
};
