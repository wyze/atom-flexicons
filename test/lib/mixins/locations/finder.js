import { finder } from '../../../../lib/mixins/locations'
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
  display: 'inline-flex',
  verticalAlign: 'middle',
  marginTop: -2,
  background: 'url(\'JavaScript.png\') 0 0 no-repeat',
  backgroundSize: 'contain',
}

test('returns empty object when disabled', t => {
  const config = {
    disabled: true,
  }

  global.atom = makeConfig(config)

  const actual = finder(colors)
  const expected = {}

  t.same(actual, expected, 'did not return empty object')
})

test('works with no options', t => {
  const config = {
    icon: 'JavaScript',
    overlay: {},
  }

  global.atom = makeConfig(config)

  const actual = finder(colors, 'JavaScript')
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

  const actual = finder(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    WebkitMask: 'url(\'JavaScript.png\') 0 0 no-repeat',
    WebkitMaskSize: 'contain',
    background: `
    linear-gradient(rgba(#aaa, .7), rgba(#aaa, .7)),
    url(\'JavaScript.png\') 0 0 no-repeat`,
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

  const actual = finder(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    WebkitMask: 'url(\'JavaScript.png\') 0 0 no-repeat',
    WebkitMaskSize: 'contain',
    background: `
    linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)),
    url(\'JavaScript.png\') 0 0 no-repeat`,
    backgroundSize: 'contain',
  }

  t.same(actual, expected, 'did not apply overlay color')
})

test.todo('muted setting has higher presedence than overlay')
