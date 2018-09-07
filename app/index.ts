import { Slendr } from '../src'

const slider = new Slendr({
  container: '.slendr',
  selector: '.slendr-slides > .slendr-slide',
  slideshow: true,
  keyboard: true
})

slider.on('move', (event) => console.log(event))
