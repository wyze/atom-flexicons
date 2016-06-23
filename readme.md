# Flexicons

[![Build Status][travis-image]][travis-url]
[![apm][apm-image]][apm-url]
[![devDependencies][depsdev-image]][depsdev-url]
[![Codecov.io][codecov-image]][codecov-url]

> A flexible full-color icon package for use in Atom.

## Screenshot

![Examples](.github/media/examples-1.png)

## Install

```shell
$ apm install flexicons
```

## Develop

```shell
$ git clone https://github.com/wyze/atom-flexicons.git
$ cd atom-flexicons
$ npm install
$ apm link -d
$ atom . -d
```

## Settings

### Global

| Name | Type | Default | Description |
|---|---|---|---|
| Muted | Boolean | false | Applies grey overlay to icons. |
| Git Status Colors | Boolean | true | Shows colors related to git status. |

### Icons

> Each icon has the following settings

| Name | Type | Default | Description |
|---|---|---|---|
| Disable Icon | Boolean | false | Disables rendering the icon. |
| Icon | Dropdown (String) | Varies | Choose which icon should render. |
| Overlay Color | Color | (Disabled) | Would use chosen color for icon overlay. |
| Overlay Enabled | Boolean | false | Enable/Disable icon color overlay. |

## Change Log

[Full Change Log](changelog.md)

### [v1.0.3](https://github.com/wyze/atom-flexicons/compare/v1.0.2...v1.0.3) (2016-06-22)

* Update dependencies ([52f3b46](https://github.com/wyze/atom-flexicons/commit/52f3b46))
* Add documentation on icon settings to readme ([bd500f9](https://github.com/wyze/atom-flexicons/commit/bd500f9))
* Add global settings info to readme ([b0d39c2](https://github.com/wyze/atom-flexicons/commit/b0d39c2))

## License

Copyright © 2016 [Neil Kistner](//github.com/wyze)

Released under the MIT license. See [license](license) for details.

[apm-image]: https://img.shields.io/apm/v/flexicons.svg?style=flat-square
[apm-url]: https://atom.io/packages/flexicons

[travis-image]: https://img.shields.io/travis/wyze/atom-flexicons.svg?style=flat-square
[travis-url]: https://travis-ci.org/wyze/atom-flexicons

[depsdev-image]: https://img.shields.io/david/dev/wyze/atom-flexicons.svg?style=flat-square
[depsdev-url]: https://david-dm.org/wyze/atom-flexicons#info=devDependencies

[codecov-image]: https://img.shields.io/codecov/c/github/wyze/atom-flexicons.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wyze/atom-flexicons
