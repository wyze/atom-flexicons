import { finder, tab, tree } from '../../../../lib/mixins/locations'
import ends from '../../../../lib/mixins/selectors/ends'
import test from 'ava'

test('works', t => {
  const colors = [
    '#fff',
    '#fff',
    '#fff',
    '#fff',
  ]
  const key = 'hs'

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
          icon: 'JavaScript',
          overlay: {
            enabled: false,
          },
        }),
    },
  }

  const actual = ends(colors)(null, key)
  const expected = {
    '.name.icon[data-name$=".hs"]': {
      '&.icon-file-text,&.icon-file-media,&.icon-book': {
        '&:before': tree(colors, key),
      },
    },
    [
    `tabs-bar tabs-tab .title[data-name$=".hs"],
        .tab-bar .tab .title[data-name$=".hs"]
        `
    ]: {
      '&:before': tab(colors, key),
    },
    '.fuzzy-finder .icon[data-name$=".hs"]': {
      '&:before': finder(colors, key),
    },
  }

  t.deepEqual(actual, expected, 'styles are not correct')
})
