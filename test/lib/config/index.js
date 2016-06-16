import { types } from '../../../lib/config'
import isObject from 'lodash.isobject'
import isString from 'lodash.isstring'
import test from 'ava'

test('types', t => {
  const options = [
    'ends',
    'is',
    'path',
    'starts',
  ]

  t.truthy(isObject(types), 'types is not an object')

  Object.keys(types).forEach(key => {
    const config = types[key]

    t.truthy(isObject(config), 'config is not an object')
    t.truthy(isString(config.type), 'type is not a string')
    t.truthy(~options.indexOf(config.type), 'type is not in options')
  })
})
