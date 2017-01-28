/* eslint-disable */

import style from '../scss/slendr.scss'
import Slendr from '../src/slendr'

const slendr = Slendr({
  slideshow: true,
  keyboard: true
})

// slendr.on('move', console.log)
// slendr.on('next', console.log)
// slendr.on('prev', console.log)

window.sl = slendr
