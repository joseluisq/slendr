import test from 'tape'
import markup from './markup'
import slendr from '../src'

markup.init()

test('next(), play() and pause() event tests', t => {
  t.plan(2)

  const slider = slendr({ slideshow: false })

  slider.on('next', () => setTimeout(() => slider.play(), 1000))

  slider.on('play', i => {
    t.equal(i, 1, 'equal param index')

    slider.pause()
  })

  slider.on('pause', i => {
    t.equal(i, 1, 'equal param index pause')
  })

  slider.next()
})
