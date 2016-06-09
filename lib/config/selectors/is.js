'use babel'

/**
 * Icon config for icons that utilize the `is` mixin. Each key is an object,
 * where the key name matches the CSS file where the mixin is used. The value
 * is an object with 2 properties, `config` and `match`. The `config` property
 * is used to construct the settings you see in Atom. The `match` property is
 * used by the mixin to build out the correct CSS selectors.
 */
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
