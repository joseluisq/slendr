import test from 'tape'
import markup from './markup'
import Slendr from '../src'

markup.init()

test('move() event tests', t => {
  t.plan(5)

  const slider = Slendr({ slideshow: false })

  slider.on('move', (dir, i, el) => {
    t.equal(dir, 'next', 'equal param direction')
    t.equal(i, 2, 'equal param index')
    t.equal(typeof el, 'object', 'should be a object')
  })

  slider.on('next', (i, el) => {
    t.equal(i, 2, 'equal param index')
    t.equal(typeof el, 'object', 'should be a object')
  })

  slider.move(2)
})
