'use babel'

export default {
  editorconfig: {
    config: {
      description: '.editorconfig',
      icons: [ 'EditorConfig' ],
      title: 'EditorConfig',
    },
    match: [ '.editorconfig' ],
  },
  packagejson: {
    config: {
      description: 'package.json',
      icons: [ 'npm', 'npmAlt' ],
      title: 'npm',
    },
    match: [ 'package.json' ],
  },
  travisyml: {
    config: {
      description: '.travis.yml',
      icons: [ 'Travis' ],
      title: 'Travis-CI',
    },
    match: [ '.travis.yml' ],
  },
}
