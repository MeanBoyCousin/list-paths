import fs from 'fs'

import { ignorePaths } from './helpers/ignorePaths'

interface Options {
    ignoreNodeModules?: boolean
    ignoreGit?: boolean
    useGitIgnore?: boolean
    includeFiles?: boolean
}

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

export { listPaths }
