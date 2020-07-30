interface Options {
    ignoreNodeModules?: boolean;
    ignoreGit?: boolean;
    useGitIgnore?: boolean;
    includeFiles?: boolean;
}
declare const listPaths: (path?: string, { ignoreNodeModules, ignoreGit, useGitIgnore, includeFiles }?: Options) => string[];
export { listPaths };
//# sourceMappingURL=listPaths.d.ts.map