"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ignorePaths = (ignoreNodeModules, ignoreGit, useGitIgnore) => {
    const ignoreNM = 'node_modules';
    const ignoreG = '.git';
    const gitIgnoreArray = fs_1.default.existsSync('.gitignore')
        ? fs_1.default
            .readFileSync('.gitignore', 'utf8')
            .split('\r\n')
            .filter((path) => {
            return (path !== '' &&
                !path.includes('#') &&
                path !== 'node_modules' &&
                path !== '.git');
        })
        : [];
    const ignoreList = [
        ignoreNodeModules ? ignoreNM : null,
        ignoreGit ? ignoreG : null,
        ...(useGitIgnore ? gitIgnoreArray : [])
    ].filter((path) => {
        return path !== null;
    });
    return ignoreList;
};
module.exports = ignorePaths;
//# sourceMappingURL=ignorePaths.js.map