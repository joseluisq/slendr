import Slendr from '../src/slendr'

const sledr = Slendr({
  slideshow: false
})

document.addEventListener('keyup', event => {
  if (event.which === 37) sledr.prev()
  if (event.which === 39) sledr.next()
}, false)

document.querySelector('.slendr-prev').addEventListener('click', sledr.prev, false)
document.querySelector('.slendr-next').addEventListener('click', sledr.next, false)

sledr.on('move', (dir, i, el) => {
  console.log(dir, i, el)
})

sledr.on('next', (i, el) => {
  console.log(i, el)
})

sledr.on('prev', (i, el) => {
  console.log(i, el)
})
