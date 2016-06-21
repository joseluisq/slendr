import Slendr from '../src/slendr'

const sledr = Slendr({
  slideshow: true,
  keyboard: true
})

sledr.on('move', (dir, i, el) => {
  // console.log(dir, i, el)
})

sledr.on('next', (i, el) => {
  // console.log(i, el)
})

sledr.on('prev', (i, el) => {
  // console.log(i, el)
})
