'use babel'

import mapValues from 'lodash.mapvalues'
import selectors from './selectors'

/**
 * This function will map all the mixin selectors defined and build all the
 * mixin functions to be used for PostCSS mixin plugin.
 *
 * @param {string[]} colors - Array of color codes, hex or rgba format.
 *
 * @returns {object} Contains all selectors for all icons specified under the
 * `mixin` property.
 */
const makeMixinsConfig = colors => ({
  mixins: {
    ...mapValues(selectors, selector => selector(colors)),
  },
})

export default makeMixinsConfig
