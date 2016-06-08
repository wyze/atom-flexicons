import { tree } from '../../../../lib/mixins/locations'
import test from 'ava'

const makeConfig = ({ disabled, icon, muted, overlay, status }) => ({
  config: {
    get: key => /global$/.test(key) ?
      ({
        muted,
        status,
      }) :
      ({
        disabled,
        icon,
        overlay,
      }),
  },
})

const colors = [
  '#0f0',
  '#aa0',
  '#0aa',
  '#aaa',
]

const baseStyles = {
  content: '"" !important',
  width: 14,
  height: 14,
  float: 'left',
  margin: '4px 8px 0 0',
  background: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
  backgroundSize: 'contain',
}

test('returns empty object when disabled', t => {
  const config = {
    disabled: true,
  }

  global.atom = makeConfig(config)

  const actual = tree(colors)
  const expected = {}

  t.same(actual, expected, 'did not return empty object')
})

test('works with no options', t => {
  const config = {
    icon: 'JavaScript',
    overlay: {},
  }

  global.atom = makeConfig(config)

  const actual = tree(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
  }

  t.same(actual, expected, 'did not return base styles')
})

test('works with muted enabled', t => {
  const config = {
    icon: 'JavaScript',
    muted: true,
    overlay: {},
  }

  global.atom = makeConfig(config)

  const actual = tree(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    WebkitMask: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
    WebkitMaskSize: 'contain',
    background: `
    linear-gradient(rgba(#aaa, .7), rgba(#aaa, .7)),
    url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat`,
    backgroundSize: 'contain',
  }

  t.same(actual, expected, 'did not apply muted color')
})

test('works with overlay enabled', t => {
  const config = {
    icon: 'JavaScript',
    overlay: {
      color: {
        toRGBAString: () => 'rgba(0, 0, 0, 1)',
      },
      enabled: true,
    },
  }

  global.atom = makeConfig(config)

  const actual = tree(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    WebkitMask: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
    WebkitMaskSize: 'contain',
    background: `
    linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)),
    url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat`,
    backgroundSize: 'contain',
  }

  t.same(actual, expected, 'did not apply overlay color')
})

test('works with git status enabled', t => {
  const config = {
    icon: 'JavaScript',
    status: true,
    overlay: {},
  }
  const makeColor = color => ({
    background: `
    linear-gradient(${color}, ${color}),
    url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat`,
    backgroundSize: 'contain',
  })

  global.atom = makeConfig(config)

  const actual = tree(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    '.file.status-added &,.file.status-modified &,.file.status-ignored &': {
      WebkitMask: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
      WebkitMaskSize: 'contain',
    },
    '.file.status-added &': makeColor('rgba(#0f0, .7)'),
    '.file.status-ignored &': makeColor('rgba(#aa0, .7)'),
    '.file.status-modified &': makeColor('rgba(#0aa, .7)'),
  }

  t.same(actual, expected, 'did not apply git status color')
})

test.todo('git status color has highest presedence')

test.todo('muted setting has higher presedence than overlay')
