'use babel'

/**
 * Icon config for icons that utilize the `path` mixin. Each key is an object,
 * where the key name matches the CSS file where the mixin is used. The value
 * is an object with 2 properties, `config` and `match`. The `config` property
 * is used to construct the settings you see in Atom. The `match` property is
 * used by the mixin to build out the correct CSS selectors.
 */
export default {
  test: {
    config: {
      description: '/test/',
      icons: [ 'AVA' ],
      title: 'Test Files',
    },
    match: [ '/test/' ],
  },
}
