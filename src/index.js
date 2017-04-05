const Emitus = require('emitus')
const defaults = require('./options')

module.exports = (options = {}) => {
  let current = 0
  let timeout = 0
  let slide = null
  let paused = true
  let animating = false

  const opts = Object.assign(defaults, options)
  const container = typeof opts.container === 'string'
    ? document.querySelector(opts.container) : opts.container

  if (!container) return

  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = container.querySelector(selectorContainer)
  const slides = getElements(opts.selector, slidesContainer)
  const controlNavList = []
  let containerWidth = container.offsetWidth

  opts.animationClass = opts.animationClass.replace(/^\./g, '')

  const emitr = Emitus({
    prev,
    next,
    play,
    pause,
    move: i => goTo(i)
  })

  init()

  return emitr

  function init () {
    if (slides.length < 2) {
      if (slides.length === 1) {
        background(slides[0])
        displayByIndex(0)
      }

      return
    }

    slides.forEach(slide => background(slide))

    displayByIndex(0)
    controlNavs()
    controlNavActiveItem(0)
    slideshow()
    bindEvents()
    directionNavs()
    keyboard()
  }

  function prev () {
    if (animating) return

    moveTo('prev')
  }

  function next () {
    if (animating) return

    moveTo('next')
  }

  /* istanbul ignore next */
  function moveTo (direction, indx = -1) {
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
    translateX(slide, (direction === 'next') ? `${containerWidth}px` : `-${containerWidth}px`)

    controlNavActiveItem(current)

    setTimeout(() => {
      animating = false
      slidesContainer.classList.remove(opts.animationClass)

      transform(slidesContainer, 'none')
      transform(slides[current], 'none')
      displayByIndex(current)

      emitr.emit('move', [direction, current, slide])
      emitr.emit(direction, [current, slide])

      slideshow()
    }, opts.animationSpeed + 260)
  }

  function goTo (i) {
    if (!animating && current !== i && (i >= 0 && i < slides.length)) {
      moveTo((current - i < 0 ? 'next' : 'prev'), i)
    }
  }

  /* istanbul ignore next */
  function slideshow () {
    if (opts.slideshow) {
      paused = false
      timeout = setTimeout(next, opts.slideshowSpeed)
    }
  }

  function background (slide) {
    const src = slide.getAttribute('data-src')
    slide.style.setProperty('background-image', `url('${src}')`)
  }

  function translateX (el, x = 0) {
    transform(el, `translateX(${x})`)
  }

  function transform (el, val) {
    el.style.setProperty('-webkit-transform', val)
    el.style.setProperty('-moz-transform', val)
    el.style.setProperty('transform', val)
  }

  /* istanbul ignore next */
  function bindEvents () {
    window.addEventListener('resize', () => {
      containerWidth = container.offsetWidth
    }, false)
  }

  function controlNavs () {
    /* istanbul ignore if */
    if (!opts.controlNavs) return

    const control = container.querySelector(opts.controlNavClass)

    if (control) {
      while (control.firstChild) {
        control.removeChild(control.firstChild)
      }
    } else {
      opts.controlNavs = false
      return
    }

    let el
    const ul = document.createElement('ul')

    /* istanbul ignore next */
    for (let i = 0; i < slides.length; i++) {
      el = document.createElement('a')
      el.addEventListener('click', evnt => {
        goTo(i)
        evnt.preventDefault()
      }, false)
      ul.appendChild(el)
      controlNavList.push(el)
    }

    control.appendChild(ul)
  }

  function directionNavs () {
    /* istanbul ignore next */
    if (!opts.directionNavs) {
      return
    }

    const prevNav = container.querySelector(opts.directionNavPrev)
    const nextNav = container.querySelector(opts.directionNavNext)

    /* istanbul ignore next */
    if (prevNav && nextNav) {
      prevNav.addEventListener('click', evnt => {
        evnt.preventDefault()
        prev()
      }, false)
      nextNav.addEventListener('click', evnt => {
        evnt.preventDefault()
        next()
      }, false)
    } else {
      opts.directionNavs = false
    }
  }

  function keyboard () {
    if (!opts.keyboard) return

    /* istanbul ignore next */
    document.addEventListener('keyup', evnt => {
      if (evnt.which === 37) prev()
      if (evnt.which === 39) next()
    }, false)
  }

  function displayByIndex (i) {
    slides.forEach((el, n) => display(el, i === n, i === n))
    container.setAttribute('data-slendr-length', slides.length)
  }

  function controlNavActiveItem (i) {
    opts.controlNavClassActive = opts.controlNavClassActive.replace(/^\./g, '')

    if (opts.controlNavs && slides.length > 1) {
      controlNavList.forEach((item, n) => {
        controlNavList[n].classList.remove(opts.controlNavClassActive)
      })

      controlNavList[i].classList.add(opts.controlNavClassActive)
    }
  }

  function display (el, yes = true, cls = false) {
    const active = opts.slideActive.replace(/^\./g, '')
    const show = opts.slideShowClass.replace(/^\./g, '')

    if (!yes) {
      el.classList.remove(show)
    } else {
      el.classList.add(show)
    }

    if (cls) {
      el.classList.add(active)
    } else {
      el.classList.remove(active)
    }
  }

  function play () {
    if (!paused) return

    opts.slideshow = true
    slideshow()

    emitr.emit('play', [current])
  }

  function pause () {
    if (!opts.slideshow) return

    clearTimeout(timeout)
    paused = true
    animating = false
    opts.slideshow = false

    emitr.emit('pause', [current])
  }

  function getElements (selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  }
}
