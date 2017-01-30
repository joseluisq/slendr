/* eslint-disable */
/**
 * This is the development entry app
 * > try: npm start
 */

import style from '../scss/slendr.scss'
import Slendr from '../src/slendr'

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
