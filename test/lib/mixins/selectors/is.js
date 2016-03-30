import { finder, tab, tree } from '../../../../lib/mixins/locations'
import is from '../../../../lib/mixins/selectors/is'
import test from 'ava'

test('works', t => {
  const colors = [
    '#fff',
    '#fff',
    '#fff',
    '#fff',
  ]
  const key = 'travisyml'

  // mock `apm test`
  global.atom = {
    config: {
      get: setting => /global$/.test(setting) ?
        ({
          muted: false,
          status: true,
        }) :
        ({
          disabled: false,
          icon: 'Travis',
          overlay: {
            enabled: false,
          },
        }),
    },
  }

  const actual = is(colors)(null, key)
  const expected = {
    '.name.icon[data-name=".travis.yml"]': {
      '&.icon-file-text,&.icon-file-media,&.icon-book': {
        '&:before': tree(colors, key),
      },
    },
    [
    `tabs-bar tabs-tab .title[data-name=".travis.yml"],
        .tab-bar .tab .title[data-name=".travis.yml"]
        `
    ]: {
      '&:before': tab(colors, key),
    },
    '.fuzzy-finder .icon[data-name=".travis.yml"]': {
      '&:before': finder(colors, key),
    },
  }

  t.same(actual, expected, 'styles are not correct')
})
