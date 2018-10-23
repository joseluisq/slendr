import { Slendr } from '../src'

const slider = new Slendr({
  container: '.slendr',
  selector: '.slendr-slides > .slendr-slide',
  slideshow: false,
  keyboard: true
})

slider.on('move', console.log)
slider.on('image:load', console.log)
