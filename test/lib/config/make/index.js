import {
  make,
  makeConfig,
  makeEnds,
  makeIcons,
  makeIs,
  makePath,
  makeStarts,
} from '../../../../lib/config/make'
import isArray from 'lodash.isarray'
import isObject from 'lodash.isobject'
import isString from 'lodash.isstring'
import test from 'ava'

const makeIconConfig = ( description, icons, title ) => ({
  description,
  icons,
  title,
})

const jsConfig = makeIconConfig('.js', [ 'JavaScript' ], 'JavaScript')

test('make works', t => {
  const icons = {
    js: {
      config: jsConfig,
      type: 'ends',
    },
  }
  const config = make(icons)

  t.ok(isObject(config), 'config is not an object')
  t.ok(isObject(config.global), 'global is not an object')
  t.ok(isObject(config.icons), 'icons is not an object')
  t.ok(isObject(config.icons.properties.js), 'js is not an object')
})

test('makeConfig works', t => {
  const title = 'JavaScript'
  const description = '.js'
  const enums = [ 'JavaScript', 'ES6' ]
  const config = makeConfig(title, description, enums)

  t.ok(isObject(config), 'config is not an object')
  t.ok(isArray(config.properties.icon.enum), 'enum is not an array')
  t.same(
    config.properties.icon.enum,
    [ 'JavaScript', 'ES6' ],
    'enum is not correct'
  )
  t.ok(isString(config.properties.icon.default), 'default is not a string')
  t.ok(
    config.properties.icon.default === 'JavaScript', 'default is not correct'
  )
  t.ok(
    isString(config.properties.icon.description),
    'description is not a string'
  )
  t.ok(
    config.properties.icon.description === '.js',
    'description is not correct'
  )
  t.ok(isString(config.properties.overlay.title), 'title is not a string')
  t.ok(
    config.properties.overlay.title === 'JavaScript Overlay',
    'overlay title is not correct'
  )
  t.ok(isString(config.title), 'title is not a string')
  t.ok(config.title === 'JavaScript', 'title is not correct')
})

test('makeEnds works', t => {
  const icon = jsConfig
  const config = makeEnds(icon)

  t.ok(isObject(config), 'config is not an object')
  t.ok(config.properties.icon.description === 'Extensions: .js')
})

test('makeIcons works with ends type', t => {
  const icons = {
    js: {
      config: jsConfig,
      type: 'ends',
    },
  }
  const result = makeIcons(icons)

  t.ok(isObject(result), 'did not return an object')
  t.ok(
    result.js.properties.icon.description === 'Extensions: .js',
    'description not set properly for ends'
  )
})

test('makeIcons works with is type', t => {
  const icons = {
    travis: {
      config: makeIconConfig('.travis.yml', [ 'Travis' ], 'Travis-CI'),
      type: 'is',
    },
  }
  const result = makeIcons(icons)

  t.ok(isObject(result), 'did not return an object')
  t.ok(
    result.travis.properties.icon.description === 'File name is: .travis.yml',
    'description not set properly for is'
  )
})

test('makeIcons works with path type', t => {
  const icons = {
    test: {
      config: makeIconConfig('/test/', [ 'AVA' ], 'Test Files'),
      type: 'path',
    },
  }
  const result = makeIcons(icons)

  t.ok(isObject(result), 'did not return an object')
  t.ok(
    result.test.properties.icon.description === 'Path contains: /test/',
    'description not set properly for path'
  )
})

test('makeIcons works with starts type', t => {
  const icons = {
    eslint: {
      config: makeIconConfig('.eslint', [ 'ESLint' ], 'ESLint'),
      type: 'starts',
    },
  }
  const result = makeIcons(icons)

  t.ok(isObject(result), 'did not return an object')
  t.ok(
    result.eslint.properties.icon.description === 'File starts with: .eslint',
    'description not set properly for starts'
  )
})

test('makeIcons returns empty object without type', t => {
  const icons = {
    js: {
      config: jsConfig,
    },
  }
  const result = makeIcons(icons)

  t.same(result, { js: {} }, 'did not return empty object')
})

test('makeIs', t => {
  const icon = makeIconConfig('.travis.yml', [ 'Travis' ], 'Travis-CI')
  const config = makeIs(icon)

  t.ok(isObject(config), 'config is not an object')
  t.ok(config.properties.icon.description === 'File name is: .travis.yml')
})

test('makePath', t => {
  const icon = makeIconConfig('/test/', [ 'AVA' ], 'Test Files')
  const config = makePath(icon)

  t.ok(isObject(config), 'config is not an object')
  t.ok(config.properties.icon.description === 'Path contains: /test/')
})

test('makeStarts', t => {
  const icon = makeIconConfig('.eslint', [ 'ESLint' ], 'ESLint')
  const config = makeStarts(icon)

  t.ok(isObject(config), 'config is not an object')
  t.ok(config.properties.icon.description === 'File starts with: .eslint')
})
