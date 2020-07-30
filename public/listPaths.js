"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const ignorePaths = require('./helpers/ignorePaths');
const listPaths = (path = '.', { ignoreNodeModules = true, ignoreGit = true, useGitIgnore = true, includeFiles = false }) => {
    return [
        `${path}/`,
        fs
            .readdirSync(path)
            .reduce((pathList, subPath) => {
            if (ignorePaths(ignoreNodeModules, ignoreGit, useGitIgnore).indexOf(subPath) === -1) {
                const fullPath = `${path}/${subPath}`;
                if (fs.statSync(fullPath).isDirectory()) {
                    pathList.push(...listPaths(fullPath, {
                        ignoreNodeModules,
                        ignoreGit,
                        useGitIgnore,
                        includeFiles
                    }));
                }
                if (includeFiles && fs.statSync(fullPath).isFile())
                    pathList.push(fullPath);
            }
            return pathList;
        }, [])
            .flat()
    ].flat();
};
//# sourceMappingURL=listPaths.js.map