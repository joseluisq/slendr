import '../src/style.scss'
import Slendr from '../src'

const sl = Slendr({
  slideshow: false,
  keyboard: true
})

sl.on('move', console.log)
sl.on('next', () => setTimeout(() => sl.play(), 1000))
sl.on('prev', console.log)
sl.on('play', console.log)
sl.on('pause', console.log)

window.sl = sl
