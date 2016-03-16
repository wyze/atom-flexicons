'use babel'

import { join } from 'path'
import filter from 'lodash.filter'
import icons from './icons'

export const lower = str => (str || '').toLowerCase()
export const strip = str => (str || '').replace(/[^a-z]/gi, '')

export const makeBuildSelector = ( config, use, key ) => ( selector = key ) => {
  const iconConfig = config.icons[strip(key)]
  const { enabled, color } = iconConfig.overlay
  const overlay = enabled ? `, ${color.toRGBAString()}` : ''

  if ( iconConfig.disabled ) {
    return ''
  }

  return `.${use}('${selector}', @${lower(iconConfig.icon)}${overlay});`
}

export const makeBuildContents = config => ({ alias, key, use }) => {
  if ( !config.icons[strip(key)] ) {
    return ''
  }

  const selector = makeBuildSelector(config, use, key)()

  if ( alias ) {
    return [
      selector,
      ...alias.map(makeBuildSelector(config, use, key)),
    ].join('\n')
  }

  return selector
}

export const write = ( config, file ) => {
  const imports = '@import "../less/_mixins";\n@import "../less/_icons";'
  const iconSettings = filter(
    icons.map(makeBuildContents(config)),
    content => content
  )
  const globalSettings = Object.keys(config.global).map(setting =>
    `@${lower(setting)}: ${config.global[setting]};`
  )
  const contents = [
    imports,
    globalSettings.join('\n'),
    iconSettings.join('\n'),
  ]

  file.write(contents.join('\n\n'))
}

export { default as config } from './config'

export const activate = ( obj, get = require ) => {
  const { File } = get('atom')
  const styles = join(__dirname, '..', 'styles')
  const settingsFile = new File(join(styles, '_settings.less'))
  const mainFile = new File(join(styles, 'flexicons.less'))

  settingsFile.create().then(
    value => {
      if ( value ) {
        write(atom.config.defaultSettings.flexicons, settingsFile)
      }

      // Load the theme on our terms, not Atom's.
      mainFile.create().then(
        () => mainFile.write('@import "_settings";\n')
      )
    }
  )

  atom.config.onDidChange('flexicons', ({ newValue }) => {
    write(newValue, settingsFile) // eslint-disable-line no-undef
  })
}
