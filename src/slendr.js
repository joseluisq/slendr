export default (options = {}) => {

  let current = 0
  let animating = false

  const opts = Object.assign({
    selector: '.slendr-slides > .slendr-slide',
    animationClass: '.slendr-animate',
    animationSpeed: 900,
    slideshow: true,
    slideshowSpeed: 4000
  }, options)

  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = document.querySelector(selectorContainer)
  const slides = getElements(opts.selector, slidesContainer)

  opts.animationClass = opts.animationClass.replace(/^\./g, '')

  init()

  return {
    next,
    prev
  }

  function init() {
    slides.forEach(slide => background(slide))
    displayBy(current)
    slideshow()
  }

  function prev() {
    if (!animating && current > 0) {
      move('prev')
    }
  }

  function next() {
    if (!animating && current < slides.length - 1) {
      move('next')
    }
  }

  function move(dir) {
    animating = true

    display(slides[current])
    current = (dir === 'next') ? current + 1 : current - 1
    display(slides[current])

    slidesContainer.classList.add(opts.animationClass)

    translateX(slidesContainer, (dir === 'next') ? '-100%' : '100%')
    translateX(slides[current], (dir === 'next') ? '100%' : '-100%')

    setTimeout(() => {
      animating = false
      slidesContainer.classList.remove(opts.animationClass)
      transform(slidesContainer, 'none')
      transform(slides[current], 'none')
      displayBy(current)
    }, opts.animationSpeed)
  }

  function slideshow() {
    if (opts.slideshow) {
      setInterval(next, opts.slideshowSpeed)
    }
  }

  function background(slide) {
    const src = slide.getAttribute('data-src')
    slide.style.setProperty('background-image', `url('${src}')`)
  }

  function translateX(el, x = 0) {
    transform(el, `translate3d(${x},0,0)`)
  }

  function transform(el, val) {
    el.style.setProperty('-webkit-transform', val)
    el.style.setProperty('-moz-transform', val)
    el.style.setProperty('transform', val)
  }

  function display(el, val = true) {
    el.style.setProperty('display', val ? 'block' : 'none')
  }

  function displayBy(i) {
    slides.forEach((el, a) => display(el, i === a))
  }

  function getElements(selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  }

}
