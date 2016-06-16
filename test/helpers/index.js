import mock from 'mock-require'

export class File {
  constructor( location, content = '' ) {
    this.content = content
    this.path = location
  }

  create = () => new Promise(resolve => resolve(true))

  existsSync = () => false

  readSync = () => this.content

  writeSync = content => { this.content = content }
}

class CompositeDisposable {
  add = () => {}

  dispose = () => {}
}

mock('atom', { CompositeDisposable, File })
