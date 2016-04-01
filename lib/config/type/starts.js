'use babel'

export default {
  git: {
    config: {
      description: '.git',
      icons: [ 'Git', 'GitHub', 'GitHubAlt' ],
      title: 'Git',
    },
    match: [ '.git' ],
  },
  eslintrc: {
    config: {
      description: '.eslint',
      icons: [ 'ESLint' ],
      title: 'ESLint',
    },
    match: [ '.eslint' ],
  },
  license: {
    config: {
      description: 'license',
      icons: [ 'OSI', 'MIT' ],
      title: 'License',
    },
    match: [ 'license' ],
  },
}
