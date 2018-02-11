# Slendr [![Build Status](https://travis-ci.org/joseluisq/slendr.svg?branch=master)](https://travis-ci.org/joseluisq/slendr) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> A responsive & lightweight slider for modern browsers.

Built on the top of [ES6](https://babeljs.io/docs/learn-es2015/) with minimum Javascript (1.9KB gzipped) and [CSS3 Hardware Acceleration](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) performance in mind.

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

The [UMD](https://github.com/umdjs/umd) and style builds are also available on [unpkg](https://unpkg.com).

```html
<link rel="stylesheet" href="https://unpkg.com/slendr/dist/slendr.min.css">
<script src="https://unpkg.com/slendr/dist/slendr.min.js"></script>
```

You can use the component via `window.slendr`

## Usage

Include the base styles:

```html
<link rel="stylesheet" href="https://unpkg.com/slendr/dist/slendr.min.css">
```

__Styles:__ It can customize the bases styles via the SCSS file at [`slendr/dist/slendr.scss`](https://unpkg.com/slendr/dist/slendr.scss).

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
import { slendr } from 'slendr'

const myslider = slendr({
  slideshow: true
})

myslider.on('move', (direction, index, element) => console.log(direction))
```

**Typescript:**

```js
import { slendr, ISlendr } from 'slendr'

const myslider: ISlendr  = slendr({
  container: '.slendr',
  selector: '.slendr-slides > .slendr-slide',
  slideshow: false
})

myslider.on('move', (direction, index, element) => console.log(direction))
```

For more detail check out [test.spec.ts](./test/test.spec.ts) file.

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
__slideVisibleClass__ | String | `.slendr-visible` | Class name used for show the current slide.
__slideActiveClass__ | String | `.slendr-active` | Class name used when some slide is active.
__slideshow__ | Boolean | `true` | If slider should work like a slideshow.
__slideshowSpeed__ | Int | `4000` | The slideshow speed (in milliseconds).
__keyboard__ | Boolean | `false` | Activate the keyboard arrow navigation.
__controlNavs__ | Boolean | `true` | Display the control navigation.
__controlNavClass__ | Boolean | `.slendr-control` | Class name of control navigation.
__controlNavClassActive__ | Boolean | `.slendr-control-active` | Class name for active control navigation.

__Animation speed:__ It's defined via the animation class at `style.scss`. Feel free to customize your [CSS animation timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function).

### Methods

Name | Usage | Description
--- | --- | ---
__prev__ | `slendr.prev()` | Move to previous slide.
__next__ | `slendr.next()` | Move to next slide.
__move__ | `slendr.move(index)` | Move the slider by index.
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

## Browser support

- Firefox
- Chrome
- IE10, IE11, Edge
- Safari, iOS Safari

__Note:__ Slendr requires [`window.requestAnimationFrame`](https://caniuse.com/#search=requestAnimationFrame).

## Development

```sh
yarn start
```

## Contributions

[Pull requests](https://github.com/joseluisq/slendr/pulls) or [issues](https://github.com/joseluisq/slendr/issues) are very appreciated.

## License
MIT license

© 2018 [José Luis Quintana](http://git.io/joseluisq)
