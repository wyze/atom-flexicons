'use babel'

import { join } from 'path'
import { writeFile } from 'fs'
import filter from 'lodash.filter'
import icons from './icons'

const styles = join(__dirname, '..', 'styles')
const mainFile = join(styles, 'flexicons.less')
const settingsFile = join(styles, '_settings.less')

const lower = str => (str || '').toLowerCase()
const strip = str => str.replace(/[^a-z]/gi, '')

const makeBuildSelector = ( config, use, key ) => ( selector = key ) => {
  const iconConfig = config.icons[strip(key)]
  const { enabled, color } = iconConfig.overlay
  const overlay = enabled ? `, ${color.toRGBAString()}` : ''

  if ( iconConfig.disabled ) {
    return ''
  }

  return `.${use}('${selector}', @${lower(iconConfig.icon)}${overlay});`
}

const makeBuildContents = config => ({ alias, key, use }) => {
  const selector = makeBuildSelector(config, use, key)()

  if ( alias ) {
    return [
      selector,
      ...alias.map(makeBuildSelector(config, use, key)),
    ].join('\n')
  }

  return selector
}

const write = config => {
  const imports = '@import "_mixins";\n@import "_icons";\n\n'
  const contents = filter(
    icons.map(makeBuildContents(config)),
    content => content
  )
  const settings = Object.keys(config.global).map(setting =>
    `@${lower(setting)}: ${config.global[setting]};`
  )

  writeFile(settingsFile, settings.join('\n'), settingsErr => {
    if ( settingsErr ) {
      throw settingsErr
    }

    writeFile(mainFile, imports + contents.join('\n'), mainErr => {
      if ( mainErr ) {
        throw mainErr
      }
    })
  })
}

export { default as config } from './config'

export const activate = () => {
  atom.config.observe('flexicons', config => write(config)) // eslint-disable-line no-undef, max-len
}
