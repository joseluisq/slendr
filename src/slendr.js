const Emitus = require('emitus')

module.exports = (options = {}) => {
  let animating = false
  let current = 0
  let timeout = 0
  let slide = null

  const opts = Object.assign({
    container: '.slendr',
    selector: '.slendr-slides > .slendr-slide',
    animationClass: '.slendr-animate',
    directionNavPrev: '.slendr-prev',
    directionNavNext: '.slendr-next',
    slideActive: '.slendr-active',
    slideShowClass: '.slendr-show',
    animationSpeed: 900,
    slideshow: true,
    slideshowSpeed: 4000,
    directionNavs: true,
    controlNavs: true,
    controlNavClass: '.slendr-control',
    keyboard: false
  }, options)

  const container = document.querySelector(opts.container)
  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = container.querySelector(selectorContainer)
  const slides = getElements(opts.selector, slidesContainer)
  let containerWidth = container.offsetWidth

  opts.animationClass = opts.animationClass.replace(/^\./g, '')

  init()

  const emitr = Emitus({
    prev: prev,
    next: next,
    move: i => goTo(i)
  })

  return emitr

  function init () {
    slides.forEach(slide => background(slide))
    displayBy(current)

    if (slides.length < 2) {
      return
    }

    slideshow()
    bindEvents()
    directionNavs()
    keyboard()
    controlNavs()
  }

  function prev () {
    if (animating) return

    moveBy('prev')
  }

  function next () {
    if (animating) return

    moveBy('next')
  }

  function moveBy (direction, indx = -1) {
    animating = true
    clearTimeout(timeout)

    display(slides[current])

    if (indx !== -1) {
      current = indx
    } else {
      current = (direction === 'next') ? current + 1 : current - 1

      if (current > slides.length - 1) {
        current = 0
      }

      if (current < 0) {
        current = slides.length - 1
      }
    }

    slide = slides[current]

    display(slide)

    slidesContainer.classList.add(opts.animationClass)

    translateX(slidesContainer, (direction === 'next') ? `-${containerWidth}px` : `${containerWidth}px`)
    translateX(slides[current], (direction === 'next') ? `${containerWidth}px` : `-${containerWidth}px`)

    setTimeout(() => {
      animating = false
      slidesContainer.classList.remove(opts.animationClass)

      transform(slidesContainer, 'none')
      transform(slides[current], 'none')
      displayBy(current)

      emitr.emit('move', [direction, current, slide])
      emitr.emit(direction, [current, slide])

      slideshow()
    }, opts.animationSpeed + 260)
  }

  function goTo (i) {
    if (!animating && current !== i && (i >= 0 && i < slides.length)) {
      moveBy((current - i < 0 ? 'next' : 'prev'), i)
    }
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
    transform(elem, `translateX(${x})`)
  }

  function transform (elem, val) {
    elem.style.setProperty('-webkit-transform', val)
    elem.style.setProperty('-moz-transform', val)
    elem.style.setProperty('transform', val)
  }

  function bindEvents () {
    window.addEventListener('resize', () => {
      containerWidth = container.offsetWidth
    }, false)
  }

  function controlNavs () {
    if (!opts.controlNavs) {
      return
    }

    const control = container.querySelector(opts.controlNavClass)

    if (!control) {
      opts.controlNavs = false
      return
    }

    let el
    const ul = document.createElement('ul')

    empty(control)

    for (let i = 0; i < slides.length; i++) {
      el = document.createElement('a')
      el.addEventListener('click', (evnt) => {
        goTo(i)
        evnt.preventDefault()
      }, false)
      ul.appendChild(el)
    }

    control.appendChild(ul)
  }

  function directionNavs () {
    if (!opts.directionNavs) {
      return
    }

    const prevNav = container.querySelector(opts.directionNavPrev)
    const nextNav = container.querySelector(opts.directionNavNext)

    if (prevNav && nextNav) {
      prevNav.addEventListener('click', (evnt) => {
        evnt.preventDefault()
        prev()
      }, false)
      nextNav.addEventListener('click', (evnt) => {
        evnt.preventDefault()
        next()
      }, false)
    }
  }

  function keyboard () {
    if (!opts.keyboard) {
      return
    }

    document.addEventListener('keyup', evnt => {
      if (evnt.which === 37) {
        prev()
      }

      if (evnt.which === 39) {
        next()
      }
    }, false)
  }

  function displayBy (i) {
    slides.forEach((elem, a) => {
      display(elem, i === a, i === a)
    })

    container.setAttribute('data-slendr-length', slides.length)
  }

  function display (elem, yes = true, cls = false) {
    const active = opts.slideActive.replace(/^\./g, '')
    const show = opts.slideShowClass.replace(/^\./g, '')

    if (!yes) {
      elem.classList.remove(show)
    } else {
      elem.classList.add(show)
    }

    if (cls) {
      elem.classList.add(active)
    } else {
      elem.classList.remove(active)
    }
  }

  function getElements (selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  }

  function empty (el = null) {
    while (el && el.firstChild) el.removeChild(el.firstChild)
  }
}
