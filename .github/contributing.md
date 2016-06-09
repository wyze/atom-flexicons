# Adding New Icon

1. Place new `32 x 32` `JPG` file in the [`lib/icons`](../lib/icons) directory. Please try to be consistent with naming like the existing icons (e.g. no spaces).

2. Determine which selector the icon will be applied with.

  - [`ends`](../lib/config/selectors/ends.js) - Applies to the end of the file name, usually the extension. (e.g. `.js`, `.go`)
  - [`is`](../lib/config/selectors/is.js) - Applies an exact match of the filename. (e.g. `.editorconfig`, `.travis.yml`)
  - [`path`](../lib/config/selectors/path.js) - Applies to any path of a file or directory. (e.g. `/test/`)
  - [`starts`](../lib/config/selectors/starts.js) - Applies to the beginning of the file name. (e.g. `.eslint`, `.git`)

3. After determining the correct selector you will need to modify the linked file above.

  - **New Selector**
    1. Create a new key in the exported object that is similar to the existing properties.
    2. Add an entry to the [`index.css`](../lib/css/index.css) file with the mixin name used from step 2 above, along with the key you used in step 1.
  - **Existing Selector**
    1. Find the existing config object and modify the following properties: `config.description`, `config.icons`, `match`
