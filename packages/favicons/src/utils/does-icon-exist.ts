import * as fs from "fs"

const doesIconExist = (srcIcon: string) => {
    try {
        return fs.statSync(srcIcon).isFile()
    } catch (e) {
        if (e.code !== `ENOENT`) {
            throw e
        }

        return false
    }
}

export default doesIconExist
