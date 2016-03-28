import Slidr from '../src/slidr'

const slidr = Slidr({
  container: '.slidr-container',
  list: '.slidr-list',
  item: '.slidr-item',
  effect: 'slidr-animate',
  duration: 900
})

setInterval(() => slidr.next(), 4000)
