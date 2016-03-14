'use babel'

// `key` property needs to match a config key from './config'
// `key` will have all non-letters stripped away before performing a lookup
// this file here is to define the order to apply the icons

const ends = [
  { key: '.css' },
  { key: '.elm', alias: [ '.emlx' ] },
  { key: '.html' },
  { key: '.js', alias: [ '.es6' ] },
  { key: '.json' },
  { key: '.jsx' },
  { key: '.less' },
  { key: '.md', alias: [ '.markdown' ] },
  { key: '.sass', alias: [ '.scss' ] },
]

const path = [
  { key: '/test/' },
]

const is = [
  { key: '.editorconfig' },
  { key: '.travis' },
]

const starts = [
  { key: '.git' },
]

export default [
  ...ends.map(item => ({ ...item, use: 'ends-with' })),
  ...path.map(item => ({ ...item, use: 'in-path' })),
  ...is.map(item => ({ ...item, use: 'is' })),
  ...starts.map(item => ({ ...item, use: 'starts-with' })),
]
