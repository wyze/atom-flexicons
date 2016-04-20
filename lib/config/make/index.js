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

/**
 * Small helper function to set the proper information in the Atom settings for
 * icons using the `ends` mixin.
 *
 * @param {Object} config - Icon configuration settings.
 *
 * @param {string} config.description - The extensions the mixin applies to.
 *
 * @param {string[]} config.icons - Name of icons from `/images` folder.
 *
 * @param {string} config.title - Icon name, used as a header in settings.
 *
 * @returns {Object} Config object for the icon.
 */
export const makeEnds = ({ description, icons, title }) =>
  makeConfig(title, `Extensions: ${description}`, icons)


/**
 * Small helper function to set the proper information in the Atom settings for
 * icons using the `starts` mixin.
 *
 * @param {Object} config - Icon configuration settings.
 *
 * @param {string} config.description - The letters the files start with.
 *
 * @param {string[]} config.icons - Name of icons from `/images` folder.
 *
 * @param {string} config.title - Icon name, used as a header in settings.
 *
 * @returns {Object} Config object for the icon.
 */
export const makeStarts = ({ description, icons, title }) =>
  makeConfig(title, `File starts with: ${description}`, icons)

/**
 * Small helper function to set the proper information in the Atom settings for
 * icons using the `path` mixin.
 *
 * @param {Object} config - Icon configuration settings.
 *
 * @param {string} config.description - Characters contained in the path.
 *
 * @param {string[]} config.icons - Name of icons from `/images` folder.
 *
 * @param {string} config.title - Icon name, used as a header in settings.
 *
 * @returns {Object} Config object for the icon.
 */
export const makePath = ({ description, icons, title }) =>
  makeConfig(title, `Path contains: ${description}`, icons)

/**
 * Small helper function to set the proper information in the Atom settings for
 * icons using the `is` mixin.
 *
 * @param {Object} config - Icon configuration settings.
 *
 * @param {string} config.description - The characters to match exactly.
 *
 * @param {string[]} config.icons - Name of icons from `/images` folder.
 *
 * @param {string} config.title - Icon name, used as a header in settings.
 *
 * @returns {Object} Config object for the icon.
 */
export const makeIs = ({ description, icons, title }) =>
  makeConfig(title, `File name is: ${description}`, icons)

/**
 * Maps over all icon values and calls above helper function for each icon
 * appropriately.
 *
 * @param {Object[]} icons - All the icon metadata used for configuration.
 *
 * @returns {Object[]} Config to be used in Atom settings.
 */
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

/**
 * Makes all the configuration necessary for Atom settings, which includes the
 * global options as well.
 *
 * @param {Object[]} icons - All the icon metadata used for configuration.
 *
 * @returns {Object[]} Config to be used in Atom settings.
 */
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
