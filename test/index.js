import {
  activate,
  config,
  write,
} from '../lib'
import test from 'ava'

test('has config', t => {
  t.ok(typeof config === 'object', 'Package does not export a config')
})

test('will activate', t => {
  t.ok(typeof activate === 'function', 'Package does not export a config')
})

test.todo('getStatusColors')

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

    write = content => { this.content = content }
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
      onDidActivateInitialPackages: callbackFn => callbackFn(),
    },
    styles: {
      styleElementsBySourcePath: {},
    },
  }

  // Mock `apm test`
  global.atom = atom

  activate(null, () => ({ File }))

  t.pass()
})
