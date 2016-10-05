const test = require('tape')
const jsdom = require('jsdom').jsdom
const Slendr = require('../src/slendr')

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

const tmpl = `
  <div class="slendr">
    <nav class="slendr-control"></nav>
    <div class="slendr-slides">
      <div class="slendr-slide" data-src="https://c1.staticflickr.com/1/742/20508368953_9f318453e6_k.jpg"></div>
      <div class="slendr-slide" data-src="https://c1.staticflickr.com/1/587/21562390566_60f8c82957_k.jpg">
      </div>
    </div>
  </div>
`

document.body.innerHTML = tmpl

test('Test suite', t => {
  t.plan(3)

  const slider = Slendr({
    slideshow: false
  })

  slider.move(1)

  slider.on('move', (dir, i, el) => {
    t.ok(dir === 'next', 'when it moves to the right.')
    t.ok(i === 1, 'when index equals to 1.')
    t.ok(typeof el === 'object', 'when element is present')
  })
})
