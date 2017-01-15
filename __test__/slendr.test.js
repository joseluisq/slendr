/* global global, document, window, test, expect */

import { jsdom } from 'jsdom'
import Slendr from '../src/slendr'

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

test('Test suite', () => {
  const slider = Slendr({
    slideshow: false
  })

  slider.move(1)

  slider.on('move', (dir, i, el) => {
    expect(dir).toEqual('next')
    expect(i).toEqual(1)
    expect(typeof el).toEqual('object')
  })

  slider.on('next', (dir, i, el) => {
    expect(dir).toEqual('next')
    expect(i).toEqual(1)
    expect(typeof el).toEqual('object')
  })
})
