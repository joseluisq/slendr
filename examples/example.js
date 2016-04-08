import Slendr from '../src/slendr'

const slidr = Slendr({
  slideshow: false
})

document.addEventListener('keyup', event => {
  if (event.which === 37) slidr.prev()
  if (event.which === 39) slidr.next()
}, false)

document.querySelector('.slendr-prev').addEventListener('click', slidr.prev, false)
document.querySelector('.slendr-next').addEventListener('click', slidr.next, false)
