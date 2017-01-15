/* eslint-disable no-console */

import Slendr from '../src/slendr'

const slendr = Slendr({
  slideshow: true,
  keyboard: true
})

slendr.on('move', (dir, i, el) => console.log(dir, i, el))
slendr.on('next', (i, el) => console.log(i, el))
slendr.on('prev', (i, el) => console.log(i, el))
