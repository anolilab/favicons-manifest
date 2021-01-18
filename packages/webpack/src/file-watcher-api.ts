import { Compilation } from "webpack"

/**
 * Returns true if the files inside this snapshot
 * have not been changed
 */
export const isSnapShotValid = (snapshotPromise: Promise<any>, compilation: Compilation): Promise<boolean> => {
    return snapshotPromise.then(
        (snapshot) =>
            new Promise((resolve, reject) => {
                compilation.fileSystemInfo.checkSnapshotValid(snapshot, (err, isValid) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(Boolean(isValid))
                })
            })
    )
}

export const createSnapshot = (
    fileDependencies: { fileDependencies: string[]; contextDependencies: string[]; missingDependencies: string[] },
    compilation: Compilation,
    startTime: number
): Promise<any> => {
    return new Promise((resolve, reject) => {
        compilation.fileSystemInfo.createSnapshot(
            startTime,
            fileDependencies.fileDependencies,
            fileDependencies.contextDependencies,
            fileDependencies.missingDependencies,
            {},
            (err, snapshot) => {
                if (err) {
                    return reject(err)
                }

                resolve(snapshot)
            }
        )
    })
}
