/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
    files: ['./src/**/*.ts', './tsconfig.json'],
    mutate: ['./src/helpers/*.ts', './src/listPaths.ts'],
    packageManager: 'npm',
    reporters: ['html', 'progress', 'dashboard'],
    testRunner: 'jest',
    tempDirName: 'stryker-tmp',
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutator: 'typescript',
    transpilers: ['typescript'],
    timeoutMS: 10000,
    maxConcurrentTestRunners: 2,
    dashboard: {
        project: 'github.com/MeanBoyCousin/list-paths',
        version: 'master',
        baseUrl: 'https://dashboard.stryker-mutator.io/api/reports',
        reportType: 'full'
    }
}
