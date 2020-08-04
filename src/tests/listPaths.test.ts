import mock from 'mock-fs'

//const listPaths = require('../listPaths')
import listPaths from '../listPaths'

describe('Check that array of paths to ignore is created', () => {
    beforeAll(() => {
        mock({
            '.git': {
                hooks: {},
                info: {},
                logs: {},
                objects: {},
                refs: {}
            },
            node_modules: {
                bin: {},
                build: {},
                node_modules: {},
                'package.json': '...',
                'README.md': '...'
            },
            '.gitignore': 'coverage\r\nreports',
            'package-lock.json': '...',
            'package.json': '...',
            src: {
                helpers: {
                    'ignorePaths.ts': '...'
                },
                'listPaths.ts': '...',
                tests: {
                    'ignorePaths.test.ts': '...',
                    'listPaths.test.ts': '...'
                },
                'tsconfig.json': '...'
            },
            coverage: {},
            reports: {}
        })
    })

    afterAll(() => {
        mock.restore()
    })

    test('should return no files and all directories excluding .git, node_modules & anything in .gitignore when called with no args', () => {
        const noArgs = ['./', './src/', './src/helpers/', './src/tests/']
        expect(listPaths()).toEqual(noArgs)
        expect(listPaths().length).toEqual(4)
        expect(Array.isArray(listPaths())).toBeTruthy()
    })

    test('should return no files and all directories in specified path excluding .git, node_modules & anything in .gitignore', () => {
        const pathOnly = ['./src/', './src/helpers/', './src/tests/']
        const path = './src'
        expect(listPaths(path)).toEqual(pathOnly)
        expect(listPaths(path).length).toEqual(3)
        expect(Array.isArray(listPaths(path))).toBeTruthy()
    })

    test('should return no files and all directories excluding .git & anything in .gitignore BUT including node_modules', () => {
        const incNodeModules = [
            './',
            './node_modules/',
            './node_modules/bin/',
            './node_modules/build/',
            './node_modules/node_modules/',
            './src/',
            './src/helpers/',
            './src/tests/'
        ]
        expect(listPaths('.', { ignoreNodeModules: false })).toEqual(
            incNodeModules
        )
        expect(listPaths('.', { ignoreNodeModules: false }).length).toEqual(8)
        expect(
            Array.isArray(listPaths('.', { ignoreNodeModules: false }))
        ).toBeTruthy()
    })

    test('should return no files and all directories excluding node_modules & anything in .gitignore BUT including .git', () => {
        const incGit = [
            './',
            './.git/',
            './.git/hooks/',
            './.git/info/',
            './.git/logs/',
            './.git/objects/',
            './.git/refs/',
            './src/',
            './src/helpers/',
            './src/tests/'
        ]
        expect(listPaths('.', { ignoreGit: false })).toEqual(incGit)
        expect(listPaths('.', { ignoreGit: false }).length).toEqual(10)
        expect(Array.isArray(listPaths('.', { ignoreGit: false }))).toBeTruthy()
    })

    test('should return no files and all directories excluding .git & node_modules BUT including anything in .gitignore', () => {
        const incGitIgnore = [
            './',
            './coverage/',
            './reports/',
            './src/',
            './src/helpers/',
            './src/tests/'
        ]
        expect(listPaths('.', { useGitIgnore: false })).toEqual(incGitIgnore)
        expect(listPaths('.', { useGitIgnore: false }).length).toEqual(6)
        expect(
            Array.isArray(listPaths('.', { useGitIgnore: false }))
        ).toBeTruthy()
    })

    test('should return all files and all directories', () => {
        const incAll = [
            './',
            './.git/',
            './.git/hooks/',
            './.git/info/',
            './.git/logs/',
            './.git/objects/',
            './.git/refs/',
            './.gitignore',
            './coverage/',
            './node_modules/',
            './node_modules/README.md',
            './node_modules/bin/',
            './node_modules/build/',
            './node_modules/node_modules/',
            './node_modules/package.json',
            './package-lock.json',
            './package.json',
            './reports/',
            './src/',
            './src/helpers/',
            './src/helpers/ignorePaths.ts',
            './src/listPaths.ts',
            './src/tests/',
            './src/tests/ignorePaths.test.ts',
            './src/tests/listPaths.test.ts',
            './src/tsconfig.json'
        ]
        expect(
            listPaths('.', {
                ignoreNodeModules: false,
                ignoreGit: false,
                useGitIgnore: false,
                includeFiles: true
            })
        ).toEqual(incAll)
        expect(
            listPaths('.', {
                ignoreNodeModules: false,
                ignoreGit: false,
                useGitIgnore: false,
                includeFiles: true
            }).length
        ).toEqual(26)
        expect(
            Array.isArray(
                listPaths('.', {
                    ignoreNodeModules: false,
                    ignoreGit: false,
                    useGitIgnore: false,
                    includeFiles: true
                })
            )
        ).toBeTruthy()
    })
})
