# Slendr

> Lightweight and responsive slider for modern browsers.

Built on the top of [ES6](https://babeljs.io/docs/learn-es2015/) with minimum Javascript and [CSS3 Hardware Acceleration](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) performance in mind.

## Install

```sh
$ npm install slendr --save-dev
```

## Usage

Include the base style:

```html
<link rel="stylesheet" href="dist/slendr.min.css">
```

Define markup:

```html
<div class="slendr">
  <nav class="slendr-nav">
    <a href="#" class="slendr-prev"><i class="fa fa-angle-left"></i></a>
    <a href="#" class="slendr-next"><i class="fa fa-angle-right"></i></a>
  </nav>

  <div class="slendr-slides">
    <section class="slendr-slide" data-src="slide1.jpg"></section>
    <section class="slendr-slide" data-src="slide2.jpg"></section>
    <section class="slendr-slide" data-src="slide3.jpg"></section>
  </div>
</div>
```

Import the module and instantiate:

```js
import Slendr from 'slendr'

const slidr = Slendr({
  slideshow: true
})
```

For more complete example check out `/examples` dir.

## Options

```js
{
  selector: '.slendr-slides > .slendr-slide',
  animationClass: '.slendr-animate',
  animationSpeed: 900,
  slideshow: true,
  slideshowSpeed: 4000
}
```

## Methods

### prev()
Move to previous slide.

### next()
Move to next slide.

## Events
Work in progress..

## Contributions

[Pull requests](https://github.com/joseluisq/slendr/pulls) and [issues](https://github.com/joseluisq/slendr/issues) are welcome.

### Development
If you can to contribute or simply play with the source try:

Install packages

```sh
$ npm install
```

Run development server

```sh
$ npm start
```

Or build dist files

```sh
$ npm run build
```

For more details, check out `scripts` in `packages.json`.


## License
MIT license

© 2016 [José Luis Quintana](http://git.io/joseluisq)
