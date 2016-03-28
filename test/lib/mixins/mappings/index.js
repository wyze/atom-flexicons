import { ends, is, path, starts } from '../../../../lib/mixins/mappings'
import isArray from 'lodash.isarray'
import test from 'ava'

test('ends is valid', t => {
  Object.keys(ends).forEach(key => {
    t.ok(isArray(ends[key]), 'ends is not an array')
    t.ok(ends[key].length, 'ends must have at least one entry')
  })
})

test('starts is valid', t => {
  Object.keys(starts).forEach(key => {
    t.ok(isArray(starts[key]), 'starts is not an array')
    t.ok(starts[key].length, 'starts must have at least one entry')
  })
})

test('path is valid', t => {
  Object.keys(path).forEach(key => {
    t.ok(isArray(path[key]), 'path is not an array')
    t.ok(path[key].length, 'path must have at least one entry')
  })
})

test('is is valid', t => {
  Object.keys(is).forEach(key => {
    t.ok(isArray(is[key]), 'is is not an array')
    t.ok(is[key].length, 'is must have at least one entry')
  })
})
