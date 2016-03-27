'use babel'

import mapValues from 'lodash.mapvalues'
import selectors from './selectors'

const makeMixinsConfig = colors => ({
  mixins: {
    ...mapValues(selectors, selector => selector(colors)),
  },
})

export default makeMixinsConfig
