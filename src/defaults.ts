import { Options } from './interfaces'

export const defaults: Options = {
  // Selectors
  container: '.slendr',
  selector: '.slendr-slides > .slendr-slide',
  // Animation
  animationClass: '.slendr-animate',
  // Direction navs
  directionNavs: true,
  directionNavPrev: '.slendr-prev',
  directionNavNext: '.slendr-next',
  // Control navs
  controlNavs: true,
  controlNavClass: '.slendr-control',
  controlNavClassActive: '.slendr-control-active',
  // Slide
  slideVisibleClass: '.slendr-visible',
  slideActiveClass: '.slendr-active',
  // Slideshow
  slideshow: true,
  slideshowSpeed: 4000,
  // Keyboard
  keyboard: false
}
