const fs = require('fs')

const ignorePaths = (
    ignoreNodeModules: boolean,
    ignoreGit: boolean,
    useGitIgnore: boolean
): string[] => {
    const ignoreNM: string = 'node_modules'
    const ignoreG: string = '.git'
    const gitIgnoreArray: string[] = fs
        .readFileSync('.gitignore', 'utf8')
        .split('\r\n')
        .filter((path: string) => {
            return (
                path !== '' && // Remove white-space
                !path.includes('#') && // Remove comments
                path !== 'node_modules' &&
                path !== '.git'
            )
        })

    const ignoreList: string[] = [
        ignoreNodeModules ? ignoreNM : null,
        ignoreGit ? ignoreG : null,
        ...(useGitIgnore ? gitIgnoreArray : [])
    ].filter((path): path is string => {
        return typeof path !== null
    })

    return ignoreList
}

module.exports = ignorePaths
