'use babel'

import { ends, is, path, starts } from './type'
import make from './make'
import mapValues from 'lodash.mapvalues'

export const types = {
  ...mapValues(ends, item => ({ ...item, type: 'ends' })),
  ...mapValues(is, item => ({ ...item, type: 'is' })),
  ...mapValues(path, item => ({ ...item, type: 'path' })),
  ...mapValues(starts, item => ({ ...item, type: 'starts' })),
}

export default make(types)
