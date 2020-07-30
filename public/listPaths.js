"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPaths = void 0;
const fs_1 = __importDefault(require("fs"));
const ignorePaths_1 = require("./helpers/ignorePaths");
const listPaths = (path = '.', { ignoreNodeModules = true, ignoreGit = true, useGitIgnore = true, includeFiles = false } = {}) => {
    return [
        `${path}/`,
        fs_1.default
            .readdirSync(path)
            .reduce((pathList, subPath) => {
            if (ignorePaths_1.ignorePaths(ignoreNodeModules, ignoreGit, useGitIgnore).indexOf(subPath) === -1) {
                const fullPath = `${path}/${subPath}`;
                if (fs_1.default.statSync(fullPath).isDirectory()) {
                    pathList.push(...listPaths(fullPath, {
                        ignoreNodeModules,
                        ignoreGit,
                        useGitIgnore,
                        includeFiles
                    }));
                }
                if (includeFiles && fs_1.default.statSync(fullPath).isFile()) {
                    pathList.push(fullPath);
                }
            }
            return pathList;
        }, [])
            .flat()
    ].flat();
};
exports.listPaths = listPaths;
//# sourceMappingURL=listPaths.js.map