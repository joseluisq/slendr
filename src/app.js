/* eslint-disable */
/**
 * This is the development entry app
 * > try: npm start
 */

import style from '../scss/slendr.scss'
import Slendr from '../src/slendr'

const slendr = Slendr({
  slideshow: true,
  keyboard: true
})

slendr.on('move', console.log)
slendr.on('next', console.log)
slendr.on('prev', console.log)
slendr.on('play', console.log)
slendr.on('pause', console.log)

window.sl = slendr
