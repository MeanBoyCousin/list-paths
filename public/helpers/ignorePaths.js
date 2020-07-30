"use strict";
const fs = require('fs');
const ignorePaths = (ignoreNodeModules, ignoreGit, useGitIgnore) => {
    const ignoreNM = 'node_modules';
    const ignoreG = '.git';
    const gitIgnoreArray = fs
        .readFileSync('.gitignore', 'utf8')
        .split('\r\n')
        .filter((path) => {
        return (path !== '' &&
            !path.includes('#') &&
            path !== 'node_modules' &&
            path !== '.git');
    });
    const ignoreList = [
        ignoreNodeModules ? ignoreNM : null,
        ignoreGit ? ignoreG : null,
        ...(useGitIgnore ? gitIgnoreArray : [])
    ].filter((path) => {
        return typeof path !== null;
    });
    return ignoreList;
};
module.exports = ignorePaths;
//# sourceMappingURL=ignorePaths.js.map