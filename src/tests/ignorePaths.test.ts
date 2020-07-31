import mock from 'mock-fs'

const ignorePaths = require('../helpers/ignorePaths')

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
                jest: {
                    bin: {},
                    build: {},
                    node_modules: {},
                    LICENSE: '...',
                    'package.json': '...',
                    'README.md': '...'
                }
            },
            '.gitignore':
                'coverage\r\nreports\r\nnode_modules\r\n.git\r\n\r\n# comment'
        })
    })

    afterAll(() => {
        mock.restore()
    })

    test('should return an empty array if no paths are ignored', () => {
        expect(ignorePaths(false, false, false)).toEqual([])
        expect(ignorePaths(false, false, false).length).toEqual(0)
        expect(Array.isArray(ignorePaths(false, false, false))).toBeTruthy()
    })

    test('should return an array containing `node_modules` if first arg is true', () => {
        expect(ignorePaths(true, false, false)).toEqual(['node_modules'])
        expect(ignorePaths(true, false, false).length).toEqual(1)
        expect(Array.isArray(ignorePaths(true, false, false))).toBeTruthy()
    })

    test('should return an array containing `.git` if second arg is true', () => {
        expect(ignorePaths(false, true, false)).toEqual(['.git'])
        expect(ignorePaths(false, true, false).length).toEqual(1)
        expect(Array.isArray(ignorePaths(false, true, false))).toBeTruthy()
    })

    test('should return an array containing all entries from .gitignore if third arg is true', () => {
        expect(ignorePaths(false, false, true)).toEqual(['coverage', 'reports'])
        expect(ignorePaths(false, false, true).length).toEqual(2)
        expect(Array.isArray(ignorePaths(false, false, true))).toBeTruthy()
    })

    test('should return an array containing all of the above is all args are true', () => {
        expect(ignorePaths(true, true, true)).toEqual([
            'node_modules',
            '.git',
            'coverage',
            'reports'
        ])
        expect(ignorePaths(true, true, true).length).toEqual(4)
        expect(Array.isArray(ignorePaths(true, true, false))).toBeTruthy()
    })
})

describe('Check that no error is thrown if no .gitignore file exists', () => {
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
                jest: {
                    bin: {},
                    build: {},
                    node_modules: {},
                    LICENSE: '...',
                    'package.json': '...',
                    'README.md': '...'
                }
            }
        })
    })

    afterAll(() => {
        mock.restore()
    })

    test('should return an empty array if no .gitignore exists', () => {
        console.log(ignorePaths(false, false, true))
        expect(ignorePaths(false, false, true).length).toEqual(0)
        expect(Array.isArray(ignorePaths(false, false, true))).toBeTruthy()
    })
})
