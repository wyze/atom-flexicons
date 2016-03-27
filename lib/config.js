'use babel'

const makeConfig = ( title, description, enums ) => ({
  properties: {
    disabled: {
      default: false,
      title: 'Disable Icon',
      type: 'boolean',
    },
    icon: {
      enum: enums,
      default: enums[0],
      description,
      title: 'Icon',
      type: 'string',
    },
    overlay: {
      properties: {
        enabled: {
          default: false,
          title: 'Overlay Enabled',
          type: 'boolean',
        },
        color: {
          default: 'transparent',
          title: 'Overlay Color',
          type: 'color',
        },
      },
      title: `${title} Overlay`,
      type: 'object',
    },
  },
  title,
  type: 'object',
})

const makeEndsWith = ( title, extensions, enums ) =>
  makeConfig(title, `Extensions: ${extensions}`, enums)

const makeStartsWith = ( title, text, enums ) =>
  makeConfig(title, `File starts with: ${text}`, enums)

const makeInPath = ( title, path, enums ) =>
  makeConfig(title, `Path contains: ${path}`, enums)

const makeIs = ( title, file, enums ) =>
  makeConfig(title, `File name is: ${file}`, enums)

export default {
  global: {
    properties: {
      status: {
        default: true,
        title: 'Git Status Colors',
        type: 'boolean',
      },
      muted: {
        default: false,
        description: 'Overlays default text color.',
        title: 'Muted',
        type: 'boolean',
      },
    },
    type: 'object',
  },
  icons: {
    properties: {
      css: makeEndsWith('CSS', '.css', [ 'CSS3' ]),
      editorconfig: makeIs('EditorConfig', '.editorconfig', [ 'EditorConfig' ]),
      elm: makeEndsWith('Elm', '.elm, .elmx', [ 'Elm', 'Elmcast' ]),
      git: makeStartsWith('Git', '.git', [ 'Git', 'GitHub', 'GitHubAlt' ]),
      html: makeEndsWith('HTML', '.html', [ 'HTML5' ]),
      js: makeEndsWith('JavaScript', '.js, .es6', [ 'JavaScript', 'ES6' ]),
      json: makeEndsWith('JSON', '.json', [ 'JSON' ]),
      jsx: makeEndsWith('JSX', '.jsx', [ 'React' ]),
      less: makeEndsWith('Less', '.less', [ 'Less', 'CSS3' ]),
      md: makeEndsWith(
        'Markdown', '.md, .markdown', [ 'Markdown', 'MarkdownAlt' ]
      ),
      packagejson: makeIs('npm', 'package.json', [ 'npm', 'npmAlt' ]),
      sass: makeEndsWith('Sass', '.sass, .scss', [ 'Sass', 'SassAlt', 'CSS3' ]),
      test: makeInPath('Test Files', '/test/', [ 'AVA' ]),
      travisyml: makeIs('Travis-CI', '.travis.yml', [ 'Travis' ]),
    },
    type: 'object',
  },
}
