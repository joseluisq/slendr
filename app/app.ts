import '../src/style.scss'
import Slendr from '../src'

const sl = Slendr({
  container: '.slendr',
  selector: '.slendr-slides > .slendr-slide',
  slideshow: false,
  slideshowSpeed: 2000,
  keyboard: true
})

sl.on('move', console.log)
sl.on('next', () => setTimeout(() => sl.play(), 2000))
sl.on('prev', console.log)
sl.on('play', console.log)
sl.on('pause', console.log)

window.sl = sl
