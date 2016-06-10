'use babel'

import { ends, is, path, starts } from './selectors'
import make from './make'
import mapValues from 'lodash.mapvalues'

/**
 * Object that contains the type property to each icon to be used when building
 * the dynamic settings in Atom.
 */
export const types = {
  ...mapValues(ends, item => ({ ...item, type: 'ends' })),
  ...mapValues(is, item => ({ ...item, type: 'is' })),
  ...mapValues(path, item => ({ ...item, type: 'path' })),
  ...mapValues(starts, item => ({ ...item, type: 'starts' })),
}

export default make(types)
