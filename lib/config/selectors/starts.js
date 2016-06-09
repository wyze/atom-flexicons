'use babel'

/**
 * Icon config for icons that utilize the `starts` mixin. Each key is an object,
 * where the key name matches the CSS file where the mixin is used. The value
 * is an object with 2 properties, `config` and `match`. The `config` property
 * is used to construct the settings you see in Atom. The `match` property is
 * used by the mixin to build out the correct CSS selectors.
 */
export default {
  eslintrc: {
    config: {
      description: '.eslint',
      icons: [ 'ESLint' ],
      title: 'ESLint',
    },
    match: [ '.eslint' ],
  },
  git: {
    config: {
      description: '.git',
      icons: [ 'Git', 'GitHub', 'GitHubAlt' ],
      title: 'Git',
    },
    match: [ '.git' ],
  },
  license: {
    config: {
      description: 'license',
      icons: [ 'OSI', 'MIT' ],
      title: 'License',
    },
    match: [ 'license' ],
  },
  npm: {
    config: {
      description: '.npm',
      icons: [ 'npm', 'npmAlt' ],
      title: 'npm',
    },
    match: [ '.npm' ],
  },
}
