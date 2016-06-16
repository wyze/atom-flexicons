import { tab } from '../../../../lib/mixins/locations'
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
  marginRight: 6,
  marginTop: -2,
  background: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
  backgroundSize: 'contain',
}

test('returns empty object when disabled', t => {
  const config = {
    disabled: true,
  }

  global.atom = makeConfig(config)

  const actual = tab(colors)
  const expected = {}

  t.deepEqual(actual, expected, 'did not return empty object')
})

test('works with no options', t => {
  const config = {
    icon: 'JavaScript',
    overlay: {},
  }

  global.atom = makeConfig(config)

  const actual = tab(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
  }

  t.deepEqual(actual, expected, 'did not return base styles')
})

test('works with muted enabled', t => {
  const config = {
    icon: 'JavaScript',
    muted: true,
    overlay: {},
  }

  global.atom = makeConfig(config)

  const actual = tab(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    WebkitMask: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
    WebkitMaskSize: 'contain',
    background: `
    linear-gradient(rgba(#aaa, .7), rgba(#aaa, .7)),
    url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat`,
    backgroundSize: 'contain',
  }

  t.deepEqual(actual, expected, 'did not apply muted color')
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

  const actual = tab(colors, 'JavaScript')
  const expected = {
    ...baseStyles,
    WebkitMask: 'url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat',
    WebkitMaskSize: 'contain',
    background: `
    linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)),
    url(\'atom://flexicons/lib/icons/JavaScript.png\') 0 0 no-repeat`,
    backgroundSize: 'contain',
  }

  t.deepEqual(actual, expected, 'did not apply overlay color')
})

test.todo('muted setting has higher presedence than overlay')
