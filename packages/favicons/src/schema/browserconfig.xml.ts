const schema = {
    type: "object",
    properties: {
        browserconfig: {
            type: "object",
            properties: {
                msapplication: {
                    type: "object",
                    properties: {
                        tile: {
                            type: "object",
                            properties: {
                                square70x70logo: {
                                    type: "object",
                                    properties: {
                                        src: {
                                            type: "string",
                                        },
                                    },
                                    required: ["src"],
                                },
                                square150x150logo: {
                                    type: "object",
                                    properties: {
                                        src: {
                                            type: "string",
                                        },
                                    },
                                    required: ["src"],
                                },
                                wide310x150logo: {
                                    type: "object",
                                    properties: {
                                        src: {
                                            type: "string",
                                        },
                                    },
                                    required: ["src"],
                                },
                                square310x310logo: {
                                    type: "object",
                                    properties: {
                                        src: {
                                            type: "string",
                                        },
                                    },
                                    required: ["src"],
                                },
                                TileColor: {
                                    type: "string",
                                },
                            },
                            required: [
                                "square70x70logo",
                                "square150x150logo",
                                "wide310x150logo",
                                "square310x310logo",
                                "TileColor",
                            ],
                        },
                    },
                    required: ["tile"],
                },
            },
            required: ["msapplication"],
        },
    },
    required: ["browserconfig"],
}

export default schema
