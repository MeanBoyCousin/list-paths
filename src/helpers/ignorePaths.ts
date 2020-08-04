import fs from 'fs'

/**
 * A function that lists all paths that should be ignored.
 *
 * @param ignoreNodeModules If true, 'node_modules' will be added to the list of paths to ignore.
 * @param ignoreGit If true, '.git' will be added to the list of paths to ignore.
 * @param useGitIgnore If true, paths will be extracted from '.gitignore' and added to the list of paths to ignore.
 *
 * @returns An array of strings matching paths to be ignored.
 */
const ignorePaths = (
    ignoreNodeModules: boolean,
    ignoreGit: boolean,
    useGitIgnore: boolean
): string[] => {
    const ignoreNM: string = 'node_modules'
    const ignoreG: string = '.git'
    const gitIgnoreArray: string[] = fs.existsSync('.gitignore')
        ? fs
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
        : []

    const ignoreList: string[] = [
        ignoreNodeModules ? ignoreNM : null,
        ignoreGit ? ignoreG : null,
        ...(useGitIgnore ? gitIgnoreArray : [])
    ].filter((path): path is string => {
        return path !== null
    })

    return ignoreList
}

export = ignorePaths
