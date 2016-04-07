'use babel'

import { finder, tab, tree } from '../locations'
import { path as mappings } from '../../config/type'

/**
 * This function will tranform the mixin `path` into the proper styles for the
 * tree-view, tabs, and fuzzy finder.
 *
 * @param {string[]} color - Array of color codes, hex or rgba format.
 *
 * @returns {object} Contains all selectors for all icons specified.
 */
const path = color => ( rule, key ) => ({
  ...mappings[key].match.reduce(
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
