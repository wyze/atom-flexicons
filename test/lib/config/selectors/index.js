import { ends, is, path, starts } from '../../../../lib/config/selectors'
import isArray from 'lodash.isarray'
import isObject from 'lodash.isobject'
import isString from 'lodash.isstring'
import test from 'ava'

test('ends is valid', t => {
  Object.keys(ends).forEach(key => {
    const item = ends[key]

    t.ok(isObject(item.config), 'config is not an object')
    t.ok(isString(item.config.description), 'description is not a string')
    t.ok(item.config.description.length, 'description must not be empty')
    t.ok(isArray(item.config.icons), 'icons is not an array')
    t.ok(item.config.icons.length, 'icons must not be empty')
    t.ok(isString(item.config.title), 'title is not a string')
    t.ok(item.config.title.length, 'title must not be empty')
    t.ok(isArray(item.match), 'match must be an array')
    t.ok(item.match, 'match must not be empty')
  })
})

test('is is valid', t => {
  Object.keys(is).forEach(key => {
    const item = is[key]

    t.ok(isObject(item.config), 'config is not an object')
    t.ok(isString(item.config.description), 'description is not a string')
    t.ok(item.config.description.length, 'description must not be empty')
    t.ok(isArray(item.config.icons), 'icons is not an array')
    t.ok(item.config.icons.length, 'icons must not be empty')
    t.ok(isString(item.config.title), 'title is not a string')
    t.ok(item.config.title.length, 'title must not be empty')
    t.ok(isArray(item.match), 'match must be an array')
    t.ok(item.match, 'match must not be empty')
  })
})

test('path is valid', t => {
  Object.keys(path).forEach(key => {
    const item = path[key]

    t.ok(isObject(item.config), 'config is not an object')
    t.ok(isString(item.config.description), 'description is not a string')
    t.ok(item.config.description.length, 'description must not be empty')
    t.ok(isArray(item.config.icons), 'icons is not an array')
    t.ok(item.config.icons.length, 'icons must not be empty')
    t.ok(isString(item.config.title), 'title is not a string')
    t.ok(item.config.title.length, 'title must not be empty')
    t.ok(isArray(item.match), 'match must be an array')
    t.ok(item.match, 'match must not be empty')
  })
})

test('starts is valid', t => {
  Object.keys(starts).forEach(key => {
    const item = starts[key]

    t.ok(isObject(item.config), 'config is not an object')
    t.ok(isString(item.config.description), 'description is not a string')
    t.ok(item.config.description.length, 'description must not be empty')
    t.ok(isArray(item.config.icons), 'icons is not an array')
    t.ok(item.config.icons.length, 'icons must not be empty')
    t.ok(isString(item.config.title), 'title is not a string')
    t.ok(item.config.title.length, 'title must not be empty')
    t.ok(isArray(item.match), 'match must be an array')
    t.ok(item.match, 'match must not be empty')
  })
})
