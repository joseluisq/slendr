import '../src/style.scss'
import slendr from '../src'

const sl = slendr({ slideshow: false, keyboard: true })

sl.on('move', console.log)
sl.on('next', () => setTimeout(() => sl.play(), 1000))
sl.on('prev', console.log)
sl.on('play', console.log)
sl.on('pause', console.log)

window.sl = sl
