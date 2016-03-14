import { appendFile, readFile, readdir, writeFile } from 'fs'
import { join } from 'path'

const images = join(__dirname, '..', 'images')
const less = join(__dirname, '..', 'styles', '_icons.less')

readdir(images, ( dirErr, files ) => {
  if ( dirErr ) {
    throw dirErr
  }

  // Empty file for rewrite
  writeFile(less, '', writeErr => {
    if ( writeErr ) {
      throw writeErr
    }
  })

  files
    .filter(file => /^[^\.]/.test(file))
    .forEach(file => {
      readFile(join(images, file), ( fileErr, buffer ) => {
        if ( fileErr ) {
          throw fileErr
        }

        const base64 = buffer.toString('base64')
        const prefix = 'data:image/png;base64,'
        const variable = file.toLowerCase().slice(0, -4)

        appendFile(less, `@${variable}: '${prefix}${base64}';\n`, appendErr => {
          if ( appendErr ) {
            throw appendErr
          }
        })
      })
    })
})
