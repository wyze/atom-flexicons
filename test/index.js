import './helpers'
import {
  activate,
  config,
  deactivate,
  getStatusColors,
  write,
} from '../lib'
import test from 'ava'

test('has config', t => {
  t.ok(typeof config === 'object', 'package does not export config')
})

test('will activate', t => {
  t.ok(typeof activate === 'function', 'package does not export activate')
})

test('will deactivate', t => {
  t.ok(typeof deactivate === 'function', 'package does not export deactivate')
})

test('getStatusColors works', t => {
  const atom = {
    styles: {
      styleElementsBySourcePath: {
        '~/atom/packages/flexicons/styles/variables.less': {
          innerHTML: `
:root {
  --color: #ffffff;
}`,
        },
      },
    },
  }

  // Mock `apm test`
  global.atom = atom

  const actual = getStatusColors()
  const expected = [ '#ffffff' ]

  t.same(actual, expected, 'proper colors were not returned')
})

test('write works', t => {
  // Emulate a file
  class File {
    constructor() {
      this.content = ''
    }

    write = content => { this.content = content }
  }
  const inputFile = new File()
  const outputFile = new File()

  inputFile.write('@mixin ends js;')

  const expected = ''

  write(inputFile, outputFile)

  t.ok(outputFile.content === expected, 'write did not output correctly')
})

test('activate works', t => {
  class File {
    constructor( location ) {
      this.content = ''
      this.path = location
    }

    create = () => new Promise(resolve => resolve(true))

    readSync = () => this.content

    writeSync = content => { this.content = content }
  }

  const atom = {
    File,
    config: {
      defaultSettings: {
        flexicons: {
          global: {
            muted: false,
            status: true,
          },
          icons: {
            js: {
              disabled: false,
              icon: 'JavaScript',
              overlay: {
                enabled: false,
                color: 'transparent',
              },
            },
          },
        },
      },
      onDidChange: ( scope, callbackFn ) =>
        callbackFn({ newValue: atom.config.defaultSettings.flexicons }),
    },
    packages: {
      getLoadedPackage: () => ({
        reloadStylesheets: () => {},
      }),
      onDidActivateInitialPackages: callbackFn => callbackFn(),
    },
    styles: {
      styleElementsBySourcePath: {},
    },
  }

  // Mock `apm test`
  global.atom = atom

  activate()

  t.pass()
})

test('deactivate works', t => {
  const actual = deactivate()
  const expected = undefined

  t.is(actual, expected, 'deactivate did not return expected')
})
