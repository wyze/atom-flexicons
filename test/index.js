import test from 'ava'

// Can't use import here and not sure why. :(
const pkg = require('../lib')

test('has config', t => {
  t.ok(typeof pkg.config === 'object', 'Package does not export a config')
})

test('will activate', t => {
  t.ok(typeof pkg.activate === 'function', 'Package does not export a config')
})
