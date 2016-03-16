import {
  activate,
  config,
  lower,
  makeBuildContents,
  makeBuildSelector,
  strip,
  write,
} from '../lib'
import test from 'ava'

// Can't use import here and not sure why. :(

test('has config', t => {
  t.ok(typeof config === 'object', 'Package does not export a config')
})

test('will activate', t => {
  t.ok(typeof activate === 'function', 'Package does not export a config')
})

test('lower', t => {
  const lower1 = 'LOWER'
  const lower2 = null

  t.ok(lower(lower1) === 'lower', 'lower does not lowercase')
  t.ok(lower(lower2) === '', 'lower does not handle nulls')
})

test('strip', t => {
  const strip1 = '.How 4re you?'
  const strip2 = null

  t.ok(strip(strip1) === 'Howreyou', 'strip did not remove all non-letters')
  t.ok(strip(strip2) === '', 'strip does not handle nulls')
})

test('makeBuildSelector works', t => {
  const iconConfig = {
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
  }
  const use = 'ends-with'
  const key = '.js'
  const expected = '.ends-with(\'.js\', @javascript);'

  t.ok(
    makeBuildSelector(iconConfig, use, key)() === expected,
    'makeBuildSelector does not return correct mixin'
  )
})

test('makeBuildSelector works when icon disabled', t => {
  const iconConfig = {
    icons: {
      js: {
        disabled: true,
        icon: 'JavaScript',
        overlay: {
          enabled: false,
          color: 'transparent',
        },
      },
    },
  }
  const use = 'ends-with'
  const key = '.js'
  const expected = ''

  t.ok(
    makeBuildSelector(iconConfig, use, key)() === expected,
    'makeBuildSelector does not return correct mixin'
  )
})

test('makeBuildSelector works with overlay', t => {
  const color = {
    toRGBAString: () => 'rgba(0, 0, 0, 1)',
  }
  const iconConfig = {
    icons: {
      js: {
        disabled: false,
        icon: 'JavaScript',
        overlay: {
          enabled: true,
          color,
        },
      },
    },
  }
  const use = 'ends-with'
  const key = '.js'
  const expected = '.ends-with(\'.js\', @javascript, rgba(0, 0, 0, 1));'

  t.ok(
    makeBuildSelector(iconConfig, use, key)() === expected,
    'makeBuildSelector does not return correct mixin'
  )
})

test('makeBuildContents works', t => {
  const iconConfig = {
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
  }
  const iconDef = {
    key: '.js',
    use: 'ends-with',
  }
  const expected = '.ends-with(\'.js\', @javascript);'

  t.ok(
    makeBuildContents(iconConfig)(iconDef) === expected,
    'makeBuildContents does not return correct mixin'
  )
})

test('makeBuildContents works with alias', t => {
  const iconConfig = {
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
  }
  const iconDef = {
    alias: [ '.es6' ],
    key: '.js',
    use: 'ends-with',
  }
  const expected = [
    '.ends-with(\'.js\', @javascript);',
    '.ends-with(\'.es6\', @javascript);',
  ].join('\n')

  t.ok(
    makeBuildContents(iconConfig)(iconDef) === expected,
    'makeBuildContents does not return correct mixin'
  )
})

test('write works', t => {
  // Emulate a file
  class File {
    constructor() {
      this.content = ''
    }

    write = content => { this.content = content }
  }
  const file = new File()
  const iconConfig = {
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
  }
  const expected = `@import "../less/_mixins";
@import "../less/_icons";

@muted: false;
@status: true;

.ends-with('.js', @javascript);
.ends-with('.es6', @javascript);`

  write(iconConfig, file)

  t.ok(file.content === expected, 'write did not output correctly')
})

test('activate works', t => {
  class File {
    constructor( location ) {
      this.content = ''
      this.path = location
    }

    create = () => new Promise(resolve => resolve(true))

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
  }

  // Mock `apm test`
  global.atom = atom

  activate(null, () => ({ File }))

  t.pass()
})
