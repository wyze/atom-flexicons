import mock from 'mock-require'

class File {
  constructor( location ) {
    this.content = ''
    this.path = location
  }

  create = () => new Promise(resolve => resolve(true))

  readSync = () => this.content

  writeSync = content => { this.content = content }
}

class CompositeDisposable {
  add = () => {}

  dispose = () => {}
}

mock('atom', { CompositeDisposable, File })
