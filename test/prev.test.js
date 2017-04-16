import test from 'tape'
import markup from './markup'
import slendr from '../src'

markup.init()

test('prev() event tests', t => {
  t.plan(2)

  const slider = slendr({ slideshow: false })

  slider.on('prev', (i, el) => {
    t.equal(i, 2, 'equal param index')
    t.equal(typeof el, 'object', 'should be a object')
  })

  slider.prev()
})
