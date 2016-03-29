'use babel'

import { finder, tab, tree } from '../locations'
import { is as mappings } from '../../config/type'

const is = color => ( rule, key ) => ({
  ...mappings[key].reduce(
    ( prev, { match }) => ({
      ...prev,
      [`.name.icon[data-name="${match}"]`]: {
        '&.icon-file-text,&.icon-file-media,&.icon-book': {
          '&:before': tree(color, key),
        },
      },
      [
        `tabs-bar tabs-tab .title[data-name="${match}"],
        .tab-bar .tab .title[data-name="${match}"]
        `
      ]: {
        '&:before': tab(color, key),
      },
      [`.fuzzy-finder .icon[data-name="${match}"]`]: {
        '&:before': finder(color, key),
      },
    }),
  {}),
})

export default is
