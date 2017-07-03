import { JSDOM } from 'jsdom'

const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
module.exports.init = () => {
  global.window = window
  global.document = window.document

  const tmpl = `
  <div class="slendr">
    <nav class="slendr-control"></nav>
    <div class="slendr-slides">
      <div class="slendr-slide" data-src="https://c1.staticflickr.com/1/742/20508368953_9f318453e6_k.jpg"></div>
      <div class="slendr-slide" data-src="https://c1.staticflickr.com/1/587/21562390566_60f8c82957_k.jpg">
      </div>
      <div class="slendr-slide" data-src="https://c1.staticflickr.com/1/587/21562390566_60f8c82957_k.jpg">
      </div>
    </div>
  </div>
`

  document.body.innerHTML = tmpl
}
