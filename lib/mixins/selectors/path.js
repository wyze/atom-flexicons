'use babel'

import { finder, tab, tree } from '../locations'
import { path as mappings } from '../mappings'

const path = color => ( rule, key ) => ({
  ...mappings[key].reduce(
    ( prev, match ) => ({
      ...prev,
      [`.name.icon[data-path*="${match}"]`]: {
        '&.icon-file-text,&.icon-file-media,&.icon-book': {
          '&:before': tree(color, key),
        },
      },
      [
        `tabs-bar tabs-tab .title[data-path*="${match}"],
        .tab-bar .tab .title[data-path*="${match}"]
        `
      ]: {
        '&:before': tab(color, key),
      },
      [`.fuzzy-finder .icon[data-path*="${match}"]`]: {
        '&:before': finder(color, key),
      },
    }),
  {}),
})

export default path
