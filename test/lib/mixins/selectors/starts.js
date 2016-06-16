import { finder, tab, tree } from '../../../../lib/mixins/locations'
import starts from '../../../../lib/mixins/selectors/starts'
import test from 'ava'

test('works', t => {
  const colors = [
    '#fff',
    '#fff',
    '#fff',
    '#fff',
  ]
  const key = 'git'

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
          icon: 'Git',
          overlay: {
            enabled: false,
          },
        }),
    },
  }

  const actual = starts(colors)(null, key)
  const expected = {
    '.name.icon[data-name^=".git"]': {
      '&.icon-file-text,&.icon-file-media,&.icon-book': {
        '&:before': tree(colors, key),
      },
    },
    [
    `tabs-bar tabs-tab .title[data-name^=".git"],
        .tab-bar .tab .title[data-name^=".git"]
        `
    ]: {
      '&:before': tab(colors, key),
    },
    '.fuzzy-finder .icon[data-name^=".git"]': {
      '&:before': finder(colors, key),
    },
  }

  t.deepEqual(actual, expected, 'styles are not correct')
})
