import fs from 'fs'

import ignorePaths from './helpers/ignorePaths'

interface Options {
    /**
     * If true, ignores 'node_modules' folder.
     * @type {boolean}
     */
    ignoreNodeModules?: boolean
    /**
     * If true, ignores '.git' folder.
     * @type {boolean}
     */
    ignoreGit?: boolean
    /**
     * If true, ignores paths in '.gitignore'.
     * @type {boolean}
     */
    useGitIgnore?: boolean
    /**
     * If true, includes file paths.
     * @type {boolean}
     */
    includeFiles?: boolean
}

/**
 * A function that lists all possible paths inside the working directory or a specified sub-directory.
 *
 * @param {string} path The directory path to searched.
 * @param {Object} options Destructed optional parameters for ignoring specific paths and including files.
 *
 * @returns An array of strings matching all possible paths in the specified directory.
 */
const listPaths = (
    path: string = '.',
    {
        ignoreNodeModules = true,
        ignoreGit = true,
        useGitIgnore = true,
        includeFiles = false
    }: Options = {}
): string[] => {
    return [
        `${path}/`,
        fs
            .readdirSync(path)
            .reduce((pathList: string[], subPath: string) => {
                if (
                    ignorePaths(
                        ignoreNodeModules,
                        ignoreGit,
                        useGitIgnore
                    ).indexOf(subPath) === -1
                ) {
                    const fullPath: string = `${path}/${subPath}`
                    if (fs.statSync(fullPath).isDirectory()) {
                        pathList.push(
                            ...listPaths(fullPath, {
                                ignoreNodeModules,
                                ignoreGit,
                                useGitIgnore,
                                includeFiles
                            })
                        )
                    }
                    if (includeFiles && fs.statSync(fullPath).isFile()) {
                        pathList.push(fullPath)
                    }
                }
                return pathList
            }, [])
            .flat()
    ].flat()
}

export = listPaths
