'use babel'

import { finder, tab, tree } from '../locations'
import { ends as mappings } from '../../config/selectors'

/**
 * This function will tranform the mixin `ends` into the proper styles for the
 * tree-view, tabs, and fuzzy finder.
 *
 * @param {string[]} color - Array of color codes, hex or rgba format.
 *
 * @returns {object} Contains all selectors for all icons specified.
 */
const ends = color => ( rule, key ) => ({
  ...mappings[key].match.reduce(
    ( prev, match ) => ({
      ...prev,
      [`.name.icon[data-name$="${match}"]`]: {
        '&.icon-file-text,&.icon-file-media,&.icon-book': {
          '&:before': tree(color, key),
        },
      },
      [
        `tabs-bar tabs-tab .title[data-name$="${match}"],
        .tab-bar .tab .title[data-name$="${match}"]
        `
      ]: {
        '&:before': tab(color, key),
      },
      [`.fuzzy-finder .icon[data-name$="${match}"]`]: {
        '&:before': finder(color, key),
      },
    }),
  {}),
})

export default ends
