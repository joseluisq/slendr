/* global module */

import Emitus from 'emitus'

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
    keyboard: false,
    controlNavs: true,
    controlNavClass: '.slendr-control',
    controlNavClassActive: '.slendr-control-active'
  }, options)

  const container = document.querySelector(opts.container)
  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = container.querySelector(selectorContainer)
  const slides = getElements(opts.selector, slidesContainer)
  const controlNavList = []
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

    /* istanbul ignore if */
    if (slides.length < 2) {
      return
    }

    displayByIndex(current)
    controlNavs()
    controlNavActiveItem(current)
    slideshow()
    bindEvents()
    directionNavs()
    keyboard()
  }

  /* istanbul ignore next */
  function prev () {
    if (animating) return

    moveBy('prev')
  }

  /* istanbul ignore next */
  function next () {
    if (animating) return

    moveBy('next')
  }

  /* istanbul ignore next */
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
      moveBy((current - i < 0 ? 'next' : 'prev'), i)
    }
  }

  /* istanbul ignore next */
  function slideshow () {
    if (opts.slideshow) {
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
    if (!opts.controlNavs) {
      return
    }

    const control = container.querySelector(opts.controlNavClass)

    /* istanbul ignore if */
    if (!control) {
      opts.controlNavs = false
      return
    }

    let el
    const ul = document.createElement('ul')

    empty(control)

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
    if (!opts.keyboard) {
      return
    }

    /* istanbul ignore next */
    document.addEventListener('keyup', evnt => {
      if (evnt.which === 37) {
        prev()
      }

      if (evnt.which === 39) {
        next()
      }
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

  function getElements (selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  }

  /* istanbul ignore next */
  function empty (el = null) {
    while (el && el.firstChild) el.removeChild(el.firstChild)
  }
}
