import Emitus from 'emitus'

export default (options = {}) => {
  let current = 0
  let animating = false
  let timeout = 0

  const opts = Object.assign({
    container: '.slendr',
    selector: '.slendr-slides > .slendr-slide',
    animationClass: '.slendr-animate',
    directionNavPrev: '.slendr-prev',
    directionNavNext: '.slendr-next',
    slideActive: '.slendr-active',
    animationSpeed: 900,
    slideshow: true,
    slideshowSpeed: 4000,
    directionNavs: true,
    keyboard: false
  }, options)

  const container = document.querySelector(opts.container)
  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = container.querySelector(selectorContainer)
  const slides = getElements(opts.selector, slidesContainer)

  opts.animationClass = opts.animationClass.replace(/^\./g, '')

  init()

  const emitr = Emitus({prev, next})
  return emitr

  function init () {
    slides.forEach(slide => background(slide))
    displayBy(current)
    slideshow()
    bindEvents()
  }

  function prev () {
    if (animating) return
    move('prev')
  }

  function next () {
    if (animating) return
    move('next')
  }

  function move (direction) {
    animating = true
    clearTimeout(timeout)

    display(slides[current])

    current = (direction === 'next') ? current + 1 : current - 1

    if (current > slides.length - 1) {
      current = 0
    }

    if (current < 0) {
      current = slides.length - 1
    }

    const slide = slides[current]

    display(slide)

    slidesContainer.classList.add(opts.animationClass)

    translateX(slidesContainer, (direction === 'next') ? `-100%` : `100%`)
    translateX(slides[current], (direction === 'next') ? `100%` : `-100%`)

    setTimeout(() => {
      animating = false
      slidesContainer.classList.remove(opts.animationClass)

      transform(slidesContainer, 'none')
      transform(slides[current], 'none')
      displayBy(current)

      emitr.emit('move', [direction, current, slide])
      emitr.emit(direction, [current, slide])

      slideshow()
    }, opts.animationSpeed)
  }

  function slideshow () {
    if (opts.slideshow) {
      timeout = setTimeout(next, opts.slideshowSpeed)
    }
  }

  function background (slide) {
    const src = slide.getAttribute('data-src')
    slide.style.setProperty('background-image', `url('${src}')`)
  }

  function translateX (elem, x = 0) {
    transform(elem, `translate3d(${x},0,0)`)
  }

  function transform (elem, val) {
    elem.style.setProperty('-webkit-transform', val)
    elem.style.setProperty('-moz-transform', val)
    elem.style.setProperty('transform', val)
  }

  function bindEvents () {
    if (opts.keyboard) {
      keyboard()
    }

    if (opts.directionNavs) {
      directionNavs()
    }
  }

  function directionNavs () {
    const slendrPrev = container.querySelector(opts.directionNavPrev)
    const slendrNext = container.querySelector(opts.directionNavNext)

    if (slendrPrev && slendrNext) {
      slendrPrev.addEventListener('click', (evnt) => {
        evnt.preventDefault()
        prev()
      }, false)
      slendrNext.addEventListener('click', (evnt) => {
        evnt.preventDefault()
        next()
      }, false)
    }
  }

  function keyboard () {
    document.addEventListener('keyup', evnt => {
      if (evnt.which === 37) {
        prev()
      }

      if (evnt.which === 39) {
        next()
      }
    }, false)
  }

  function display (elem, val = true , cls = false) {
    const active = opts.slideActive.replace(/^\./g, '')
    elem.style.setProperty('display', val ? 'block' : 'none')

    if (cls) {
      elem.classList.add(active)
    } else {
      elem.classList.remove(active)
    }
  }

  function displayBy (i) {
    slides.forEach((elem, a) => {
      display(elem, i === a, i === a)
    })
  }

  function getElements (selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  }
}
