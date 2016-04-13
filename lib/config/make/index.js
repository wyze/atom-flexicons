'use babel'

import mapValues from 'lodash.mapvalues'

/**
 * This function constructs the Atom specific config for an icon.
 *
 * @param {string} title - Title for the icon.
 *
 * @param {string} description - Description that shows how the icon will be
 * matched.
 *
 * @param {array} enums - Array of icons that can be applied.
 *
 * @returns {object} An icon config schema for Atom.
 */
export const makeConfig = ( title, description, enums ) => ({
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

export const makeEnds = ({ description, icons, title }) =>
  makeConfig(title, `Extensions: ${description}`, icons)

export const makeStarts = ({ description, icons, title }) =>
  makeConfig(title, `File starts with: ${description}`, icons)

export const makePath = ({ description, icons, title }) =>
  makeConfig(title, `Path contains: ${description}`, icons)

export const makeIs = ({ description, icons, title }) =>
  makeConfig(title, `File name is: ${description}`, icons)

export const makeIcons = icons =>
  mapValues(icons, ({ config, type }) => {
    switch ( type ) {
      case 'ends':
        return makeEnds(config)
      case 'is':
        return makeIs(config)
      case 'path':
        return makePath(config)
      case 'starts':
        return makeStarts(config)
      default:
        return {}
    }
  })

export const make = icons => ({
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
    properties: makeIcons(icons),
    type: 'object',
  },
})

export default make
