'use babel'

import { applyColor, ns } from './helpers'
import { finder as overrides } from '../overrides'

const finder = ( [ , , , text ], key ) => {
  const { muted } = atom.config.get(`${ns}.global`)
  const { disabled, icon, overlay } = atom.config.get(`${ns}.icons.${key}`)
  const url = `url('${icon}.png') 0 0 no-repeat`

  if ( disabled ) {
    return {}
  }

  let styles = {
    content: '"" !important',
    width: 14,
    height: 14,
    display: 'inline-flex',
    verticalAlign: 'middle',
    marginTop: -2,
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

  return styles
}

export default finder
