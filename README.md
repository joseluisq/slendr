**DEPRECATION NOTICE:** This repository was moved https://git.joseluisq.net/joseluisq/slendr

---

# Slendr [![npm](https://img.shields.io/npm/v/slendr.svg)](https://www.npmjs.com/package/slendr) [![npm](https://img.shields.io/npm/dt/slendr.svg)](https://www.npmjs.com/package/slendr) [![Build Status](https://travis-ci.org/joseluisq/slendr.svg?branch=master)](https://travis-ci.org/joseluisq/slendr) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> A responsive & lightweight slider for modern browsers.

## Features

- Written and tested entirely using [Typescript](http://www.typescriptlang.org/).
- Lightweight (just 2KB gzipped UMD)
- Responsive (desktop and mobile) by default.
- Modern browsers only. No more legacy browsers like IE10 or IE11 (but you can find it on v1.3 release).
- High performance by [Lighthouse](https://github.com/GoogleChrome/lighthouse) audit.
- [CSS3 Hardware Acceleration](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
- 60fps animation.
- Progressive images loading.
- Highly customizable.
- SASS support.

:tada: View demo on [Codepen](http://codepen.io/joseluisq/full/wGXaKx/).

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add slendr
```

[NPM](https://www.npmjs.com/)

```sh
npm install slendr --save
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
    <section class="slendr-slide" data-slide-src="slide1.jpg"></section>
    <section class="slendr-slide" data-slide-src="slide2.jpg"></section>
    <section class="slendr-slide" data-slide-src="slide3.jpg"></section>
  </div>
</div>
```

Create the slider:

```js
import { Slendr } from 'slendr'

const myslider = new Slendr({
  slideshow: true
})

myslider.on('move', (direction, index, element) => console.log(direction))
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
__slideVisibleClass__ | String | `.slendr-visible` | Class name used for show the current slide.
__slideActiveClass__ | String | `.slendr-active` | Class name used when some slide is active.
__slideshow__ | Boolean | `true` | If slider should work like a slideshow.
__slideshowSpeed__ | Int | `4000` | The slideshow speed (in milliseconds).
__keyboard__ | Boolean | `false` | Activate the keyboard arrow navigation.
__controlNavs__ | Boolean | `true` | Display the control navigation.
__controlNavClass__ | Boolean | `.slendr-control` | Class name of control navigation.
__controlNavClassActive__ | Boolean | `.slendr-control-active` | Class name for active control navigation.

__Animation speed:__ It's defined via the animation class at `style.scss`. Feel free to use your own [CSS timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function).

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

### Attributes

#### On demand attributes

These attributes can be created manually.

__`data-slide-src`__: Set the image source URL. After image loading, Slendr will place it as slide background via css `background-image`.

Slender doesn't depend on images necessarily to working. It can omit this attribute in any case.

```html
<div class="slendr-slides">
  <section class="slendr-slide" data-slide-src="image1.jpg"></section>
  <section class="slendr-slide"></section>
  <section class="slendr-slide" data-slide-src="image2.jpg"></section>
</div>
```

#### Runtime attributes

These attributes are created by Slendr.

__`data-slides-length`__: Contains the length of slides.

```html
<div class="slendr" data-slides-length="1000">...</div>
```

__`data-slide-index`__: Contains the slide index.

```html
<section class="slendr-slide" data-slide-index="0" data-slide-src="image1.jpg">...</section>
<section class="slendr-slide" data-slide-index="1" data-slide-src="image2.jpg">...</section>
```

## Browser support

- Firefox
- Chrome
- Edge
- Safari, iOS Safari

## Development

```sh
yarn start
```

## Contributions

[Pull requests](https://github.com/joseluisq/slendr/pulls) or [issues](https://github.com/joseluisq/slendr/issues) are very appreciated.

## License
MIT license

© 2018 [José Luis Quintana](http://git.io/joseluisq)
