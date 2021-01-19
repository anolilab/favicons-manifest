const testMatch = ["**/*.(test|spec).ts"]
const moduleFileExtensions = ["ts", "js"]

module.exports = {
    projects: [
        {
            displayName: "test",
            moduleFileExtensions,
            transform: {
                "^.+\\.ts$": "ts-jest",
            },
            testMatch,
            coveragePathIgnorePatterns: ["/node_modules/", "/fixtures/"],
            snapshotSerializers: ["jest-snapshot-serializer-raw"],
            coverageReporters: ["json", "lcov", "text", "html"],
            // coverageThreshold: {
            //     global: {
            //         statements: 90,
            //         branches: 75,
            //         functions: 85,
            //         lines: 90,
            //     },
            // },
        },
        {
            displayName: "lint",
            runner: "jest-runner-eslint",
            testMatch,
            watchPlugins: ["jest-runner-eslint/watch-fix"],
            moduleFileExtensions,
        },
        {
            displayName: "prettier",
            runner: "jest-runner-write-prettier",
            testMatch: testMatch,
            moduleFileExtensions,
        },
    ],
}
