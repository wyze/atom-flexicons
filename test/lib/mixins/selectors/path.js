import { finder, tab, tree } from '../../../../lib/mixins/locations'
import path from '../../../../lib/mixins/selectors/path'
import test from 'ava'

test('works', t => {
  const colors = [
    '#fff',
    '#fff',
    '#fff',
    '#fff',
  ]
  const key = 'test'

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
          icon: 'AVA',
          overlay: {
            enabled: false,
          },
        }),
    },
  }

  const actual = path(colors)(null, key)
  const expected = {
    '.name.icon[data-path*="/test/"]': {
      '&.icon-file-text,&.icon-file-media,&.icon-book': {
        '&:before': tree(colors, key),
      },
    },
    [
    `tabs-bar tabs-tab .title[data-path*="/test/"],
        .tab-bar .tab .title[data-path*="/test/"]
        `
    ]: {
      '&:before': tab(colors, key),
    },
    '.fuzzy-finder .icon[data-path*="/test/"]': {
      '&:before': finder(colors, key),
    },
  }

  t.deepEqual(actual, expected, 'styles are not correct')
})
