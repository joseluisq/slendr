# Slendr [![Build Status](https://travis-ci.org/joseluisq/slendr.svg?branch=master)](https://travis-ci.org/joseluisq/slendr) [![Coverage Status](https://coveralls.io/repos/github/joseluisq/slendr/badge.svg?branch=master)](https://coveralls.io/github/joseluisq/slendr?branch=master) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Lightweight (1.8KB gzipped) and responsive slider for modern browsers.

Built on the top of [ES6](https://babeljs.io/docs/learn-es2015/) with minimum Javascript and [CSS3 Hardware Acceleration](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) performance in mind.

:tada: View demo on [Codepen](http://codepen.io/joseluisq/full/wGXaKx/).

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add slendr --dev
```

[NPM](https://www.npmjs.com/)

```sh
npm install slendr --save-dev
```

The [UMD](https://github.com/umdjs/umd) and style build are also available on [unpkg](https://unpkg.com).

```html
<link rel="stylesheet" href="https://unpkg.com/slendr/dist/slendr.min.css">
<script src="https://unpkg.com/slendr/dist/slendr.min.js"></script>
```

You can use the library via `window.Slendr`

## Usage

Include the base styles:

```html
<link rel="stylesheet" href="https://unpkg.com/slendr/dist/slendr.min.css">
```

_You can customize the styles editing the `slendr.scss` file._

Define the markup:

```html
<div class="slendr">
  <nav class="slendr-direction">
    <a href="#" class="slendr-prev"><i class="fa fa-angle-left"></i></a>
    <a href="#" class="slendr-next"><i class="fa fa-angle-right"></i></a>
  </nav>

  <nav class="slendr-control"></nav>

  <div class="slendr-slides">
    <section class="slendr-slide" data-src="slide1.jpg"></section>
    <section class="slendr-slide" data-src="slide2.jpg"></section>
    <section class="slendr-slide" data-src="slide3.jpg"></section>
  </div>
</div>
```

Create the slider:

```js
import Slendr from 'slendr'

const slider = Slendr({
  slideshow: true
})

slider.on('move', (direction, index, element) => console.log(direction))
```

## API

### Options

Name | Type | Default | Description
--- | --- | --- | ---
__container__ | String | `.slendr` | The container supports string query selector or HTMLElement.
__selector__ | String | `.slendr-slides > .slendr-slide` | Query selector for slides.
__animationClass__ | String | `.slendr-animate` | Class name for animation used in slider translation.
__directionNavs__ | Boolean | `true` | Display the direction navs (arrow buttons).
__directionNavPrev__ | String | `.slendr-prev` | Class name for previous arrow button.
__directionNavNext__ | String | `.slendr-next` | Class name for next arrow button.
__slideShowClass__ | String | `.slendr-show` | Class name used for show the current slide.
__slideActiveClass__ | String | `.slendr-active` | Class name used when some slide is active.
__animationSpeed__ | Int | `900` | The animation speed (in milliseconds).
__slideshow__ | Boolean | `true` | If slider should work like a slideshow.
__slideshowSpeed__ | Int | `4000` | The slideshow speed (in milliseconds).
__keyboard__ | Boolean | `false` | Activate the keyboard arrow navigation.
__controlNavs__ | Boolean | `true` | Display the control navigation.
__controlNavClass__ | Boolean | `.slendr-control` | Class name of control navigation.
__controlNavClassActive__ | Boolean | `.slendr-control-active` | Class name for active control navigation.

### Methods

Name | Usage | Description
--- | --- | ---
__prev__ | `slendr.prev()` | Move to previous slide.
__next__ | `slendr.next()` | Move to next slide.
__move__ | `slendr.move(2)` | Move the slider by index.
__play__ | `slendr.play()` | Play the slideshow.
__pause__ | `slendr.pause()` | Pause the slideshow.

### Events

Name | Usage | Description
--- | --- | ---
__move__ | `slendr.on('move', (direction, index, element) => {})` | Trigger when slider moves to previous or next slide.
__prev__ | `slendr.on('prev', (index, element) => {})` | Trigger when slider moves to previous slide.
__next__ | `slendr.on('next', (index, element) => {})` | Trigger when slider moves to next slide.
__play__ | `slendr.on('play', (index) => {})` | Trigger when play the slideshow.
__pause__ | `slendr.on('pause', (index) => {})` | Trigger when pause the slideshow.

## Development

```sh
yarn start
```

## Contributions

[Pull requests](https://github.com/joseluisq/slendr/pulls) and [issues](https://github.com/joseluisq/slendr/issues) are very appreciated.

## License
MIT license

© 2017 [José Luis Quintana](http://git.io/joseluisq)
