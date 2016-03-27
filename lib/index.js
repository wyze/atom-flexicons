'use babel'

import { join } from 'path'
import hexrgba from 'postcss-hexrgba'
import mixins from 'postcss-mixins'
import mixinsConfig from './mixins'
import nested from 'postcss-nested'
import postcss from 'postcss'
import url from 'postcss-url'

export const getStatusColors = () => {
  const styles = atom.styles.styleElementsBySourcePath
  const style = Object.keys(styles)
    .filter(path => /\/flexicons\/.+\/variables\.less$/.test(path))
    .map(key => styles[key].innerHTML)
    .pop()

  return style ?
    style
      .split('\n')
      .filter(line => /\-\-/.test(line))
      .map(line =>
        line
          .split(':')
          .slice(1)
          .pop()
          .slice(1, -1)
      ) :
    []
}

export const write = ( inputFile, outputFile, callbackFn ) => () =>
  postcss([
    mixins(mixinsConfig(getStatusColors())),
    nested(),
    url({ basePath: '../images', maxSize: 1024, url: 'inline' }),
    hexrgba(),
  ])
    .process(inputFile.readSync(), { from: inputFile.path })
    .then(result => outputFile.writeSync(result.css))
    .then(() => callbackFn && callbackFn())

export { default as config } from './config'

export const activate = ( obj, get = require ) => {
  const { File } = get('atom')
  const styles = join(__dirname, '..', 'styles')
  const inputFile = new File(join(__dirname, '..', 'css', 'index.css'))
  const outputFile = new File(join(styles, 'flexicons.css'))
  const reload = () =>
    atom.packages.getLoadedPackage('flexicons').reloadStylesheets()

  atom.packages.onDidActivateInitialPackages(write(inputFile, outputFile))
  atom.config.onDidChange('flexicons', write(inputFile, outputFile, reload))
}
