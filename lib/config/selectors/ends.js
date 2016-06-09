'use babel'

/**
 * Icon config for icons that utilize the `ends` mixin. Each key is an object,
 * where the key name matches the CSS file where the mixin is used. The value
 * is an object with 2 properties, `config` and `match`. The `config` property
 * is used to construct the settings you see in Atom. The `match` property is
 * used by the mixin to build out the correct CSS selectors.
 */
export default {
  css: {
    config: {
      description: '.css',
      icons: [ 'CSS3' ],
      title: 'CSS',
    },
    match: [ '.css' ],
  },
  elm: {
    config: {
      description: '.elm, .elmx',
      icons: [ 'Elm', 'Elmcast' ],
      title: 'Elm',
    },
    match: [ '.elm', '.elmx' ],
  },
  go: {
    config: {
      description: '.go',
      icons: [ 'Go' ],
      title: 'Go',
    },
    match: [ '.go' ],
  },
  hs: {
    config: {
      description: '.hs',
      icons: [ 'Haskell', 'HaskellAlt' ],
      title: 'Haskell',
    },
    match: [ '.hs' ],
  },
  html: {
    config: {
      description: '.html',
      icons: [ 'HTML5' ],
      title: 'HTML',
    },
    match: [ '.html' ],
  },
  js: {
    config: {
      description: '.js, .es6',
      icons: [ 'JavaScript', 'ES6' ],
      title: 'JavaScript',
    },
    match: [ '.js', '.es6' ],
  },
  json: {
    config: {
      description: '.json',
      icons: [ 'JSON' ],
      title: 'JSON',
    },
    match: [ '.json' ],
  },
  jsx: {
    config: {
      description: '.jsx',
      icons: [ 'React' ],
      title: 'JSX',
    },
    match: [ '.jsx' ],
  },
  less: {
    config: {
      description: '.less',
      icons: [ 'Less', 'CSS3' ],
      title: 'Less',
    },
    match: [ '.less' ],
  },
  ls: {
    config: {
      description: '.ls',
      icons: [ 'LiveScript' ],
      title: 'LiveScript',
    },
    match: [ '.ls' ],
  },
  md: {
    config: {
      description: '.md, .markdown',
      icons: [ 'Markdown', 'MarkdownAlt' ],
      title: 'Markdown',
    },
    match: [ '.md', '.markdown' ],
  },
  php: {
    config: {
      description: '.php, .php.inc, .php4, .php5',
      icons: [ 'PHP', 'PHPAlt', 'Laravel', 'LaravelAlt' ],
      title: 'PHP',
    },
    match: [ '.php', '.php.inc', '.php4', '.php5' ],
  },
  py: {
    config: {
      description: '.py',
      icons: [ 'Python' ],
      title: 'Python',
    },
    match: [ '.py' ],
  },
  rb: {
    config: {
      description: '.rb',
      icons: [ 'Ruby' ],
      title: 'Ruby',
    },
    match: [ '.rb' ],
  },
  rs: {
    config: {
      description: '.rs',
      icons: [ 'Rust' ],
      title: 'Rust',
    },
    match: [ '.rs' ],
  },
  sass: {
    config: {
      description: '.sass, .scss',
      icons: [ 'Sass', 'SassAlt', 'CSS3' ],
      title: 'Sass',
    },
    match: [ '.sass', '.scss' ],
  },
  sh: {
    config: {
      description: '.sh, .zsh',
      icons: [ 'Shell' ],
      title: 'Shell',
    },
    match: [ '.sh', '.zsh' ],
  },
  styl: {
    config: {
      description: '.styl',
      icons: [ 'Stylus' ],
      title: 'Stylus',
    },
    match: [ '.styl' ],
  },
  swift: {
    config: {
      description: '.swift',
      icons: [ 'Swift', 'SwiftAlt' ],
      title: 'Swift',
    },
    match: [ '.swift' ],
  },
  ts: {
    config: {
      description: '.ts, .tsx',
      icons: [ 'TypeScript' ],
      title: 'TypeScript',
    },
    match: [ '.ts', '.tsx' ],
  },
  handlebars: {
    config: {
      description: '.hbs, .handlebars',
      icons: [ 'Handlebars' ],
      title: 'Handlebars',
    },
    match: [ '.hbs', '.handlebars' ],
  },
}
