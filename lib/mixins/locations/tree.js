'use babel'

import { applyColor, ns } from './helpers'
import { tree as overrides } from '../overrides'

/**
 * This function constructs the styles used by the tree-view module. It
 * optionally will apply muted, git status, and overlay styles if the settings
 * are enabled.
 *
 * @param {array[]} colors - Array of colors from the theme.
 *
 * @param {string} key - Icon key to look up icon config.
 *
 * @returns {object} Styles configuration for the specific icon.
 */
const tree = ( [ added, ignored, modified, text ], key ) => {
  const { muted, status } = atom.config.get(`${ns}.global`)
  const { disabled, icon, overlay } = atom.config.get(`${ns}.icons.${key}`)
  const url = `url('${icon}.png') 0 0 no-repeat`

  if ( disabled ) {
    return {}
  }

  let styles = {
    content: '"" !important',
    width: 14,
    height: 14,
    float: 'left',
    margin: '4px 8px 0 0',
    background: url,
    backgroundSize: 'contain',
    ...overrides[icon],
  }

  if ( muted || overlay.enabled ) {
    styles = {
      ...styles,
      WebkitMask: url,
      WebkitMaskSize: 'contain',
    }
  }

  if ( overlay.enabled ) {
    styles = {
      ...styles,
      ...applyColor(overlay.color.toRGBAString(), url),
    }
  }

  if ( muted ) {
    styles = {
      ...styles,
      ...applyColor(text, url),
    }
  }

  if ( status ) {
    styles = {
      ...styles,
      '.file.status-added &,.file.status-modified &,.file.status-ignored &': {
        WebkitMask: url,
        WebkitMaskSize: 'contain',
      },
      '.file.status-added &': applyColor(added, url),
      '.file.status-ignored &': applyColor(ignored, url),
      '.file.status-modified &': applyColor(modified, url),
    }
  }

  return styles
}

export default tree
