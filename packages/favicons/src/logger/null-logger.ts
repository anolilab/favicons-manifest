import { Logger } from "../types"

const logger: Logger = () => {
    const nullFunction = () => {}

    return {
        raw: nullFunction,
        log: nullFunction,
        warn: nullFunction,
        trace: nullFunction,
        error: nullFunction,
        success: nullFunction,
    };
}

export default logger;
