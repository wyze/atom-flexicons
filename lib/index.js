'use babel'

import { join } from 'path'
import hexrgba from 'postcss-hexrgba'
import mixins from 'postcss-mixins'
import mixinsConfig from './mixins'
import nested from 'postcss-nested'
import postcss from 'postcss'
import url from 'postcss-url'

const { CompositeDisposable } = require('atom')
const disposables = new CompositeDisposable

/**
 * Retrieves the current theme status colors from a dummy less file setup
 * by this plugin. Colors are needed for Muted setting along with the Git
 * status colors.
 *
 * @returns {string[]} 4 color values from current UI theme, hex or rgba. If the
 * stylesheet isn't found for some reason, an empty array is returned.
 */
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

/**
 * This is the meat of the plugin. It takes the input CSS file, along with the
 * plugin settings defined in Atom, and runs them through PostCSS. It leverages
 * a few PostCSS plugins and outputs to a less file that is loaded up to apply
 * the icon styles.
 *
 * @param {File} inputFile - An Atom File class that contains the mixins for
 * all of the icons.
 *
 * @param {File} outputFile - An Atom File class where the resulting CSS from
 * PostCSS is written to.
 *
 * @param {Function} [callbackFn] - An optional callback function to be called
 * if the transform completes successfully.
 */
export const write = ( inputFile, outputFile, callbackFn ) => () =>
  postcss([
    mixins(mixinsConfig(getStatusColors())),
    nested(),
    url({ basePath: '../images', maxSize: 1024, url: 'inline' }),
    hexrgba(),
  ])
    .process(inputFile.readSync(), { from: inputFile.path })
    .then(result => {
      if ( outputFile.readSync() === result.css ) {
        throw new Error('Result CSS matches output file.')
      }

      outputFile.writeSync(result.css)
    })
    .catch(() => {})
    .then(() => callbackFn && callbackFn())

export { default as config } from './config'

/**
 * Used by Atom for when the plugin is enabled or Atom is starting/reloading.
 * This function will setup instances of the input/output files. Defines the
 * function to reload the package when settings change. Sets up listeners for
 * when settings change and the initial load of Atom is complete.
 */
export const activate = () => {
  const { File } = require('atom')
  const styles = join(__dirname, '..', 'styles')
  const inputFile = new File(join(__dirname, '..', 'css', 'index.css'))
  const outputFile = new File(join(styles, 'flexicons.css'))
  const reload = () =>
    atom.packages.getLoadedPackage('flexicons').reloadStylesheets()
  const writeAndReload = () => write(inputFile, outputFile, reload)

  disposables.add(
    atom.packages.onDidActivateInitialPackages(writeAndReload())
  )
  disposables.add(
    atom.config.onDidChange('flexicons', writeAndReload())
  )
}

/**
 * Used by Atom for when the plugin is disabled or Atom is being closed. This
 * will properly dispose of the listener functions setup in the `activate`
 * method.
 */
export const deactivate = () => disposables.dispose()
