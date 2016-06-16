import { File } from './helpers'
import {
  activate,
  config,
  deactivate,
  getStatusColors,
  write,
} from '../lib'
import { join } from 'path'
import test from 'ava'

test('has config', t => {
  t.truthy(typeof config === 'object', 'package does not export config')
})

test('will activate', t => {
  t.truthy(typeof activate === 'function', 'package does not export activate')
})

test('will deactivate', t => {
  t.truthy(
    typeof deactivate === 'function',
    'package does not export deactivate'
  )
})

test('getStatusColors works', t => {
  const atom = {
    config: {
      get: () => ({ overlay: {} }),
    },
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

  t.deepEqual(actual, expected, 'proper colors were not returned')
})

test('write works when results are same', t => {
  const path = join(__dirname, '..', 'css', 'index.css')
  const inputFile = new File(path, 'a { color: #fff }')
  const outputFile = new File('/', 'a { color: #fff }')

  const atom = {
    config: {
      get: () => ({ overlay: {} }),
    },
    styles: {
      styleElementsBySourcePath: {},
    },
  }

  // Mock `apm test`
  global.atom = atom

  const expected = 'a { color: #fff }'

  const assert = () =>
    t.truthy(
      outputFile.readSync() === expected,
      'write did not output correctly'
    )

  write(inputFile, outputFile, assert)()
})

test('write works when results differ', t => {
  const path = join(__dirname, '..', 'css', 'index.css')
  const inputFile = new File(path, 'a { color: #fff }')
  const outputFile = new File('/')

  const atom = {
    config: {
      get: () => ({ overlay: {} }),
    },
    styles: {
      styleElementsBySourcePath: {},
    },
  }

  // Mock `apm test`
  global.atom = atom

  const expected = 'a { color: #fff }'

  const assert = () =>
    t.truthy(
      outputFile.readSync() === expected,
      'write did not output correctly'
    )

  write(inputFile, outputFile, assert)()
})

test('activate works', t => {
  const atom = {
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
      get: () => ({ overlay: {} }),
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
