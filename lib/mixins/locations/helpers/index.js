/**
 * Namespace for settings in Atom.
 */
export const ns = 'flexicons'

/**
 * Converts color to RGBa string with default 70% alpha channel.
 *
 * @todo Add configuration option for alpha instead of hardcoded to 70%.
 *
 * @param {string} color - Color to convert to RGBa.
 *
 * @returns {string} RGBa CSS string.
 */
const toRGBA = color =>
  /^rgba/.test(color) ? color : `rgba(${color}, .7)`

/**
 * This function is used to apply the overlay colors to icons. Sets the
 * `background` CSS property using a linear-gradient.
 *
 * @param {string} color - Color of the overlay to apply to the icon.
 *
 * @param {string} url - Path to the icon.
 *
 * @returns {object} Contains the styles to apply color overlay.
 */
export const applyColor = ( color, url ) => ({
  background: `
    linear-gradient(${toRGBA(color)}, ${toRGBA(color)}),
    ${url}`,
  backgroundSize: 'contain',
})
