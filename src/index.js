const emitus = require('emitus')
const utils = require('./utils')
const defaults = require('./options')

module.exports = (options = {}) => {
  let current = 0
  let timeout = 0
  let slide = null
  let paused = true
  let animating = false

  const opts = Object.assign(defaults, options)

  const container = typeof opts.container === 'string'
    ? utils.child(document, opts.container)
    : opts.container

  if (!container) return

  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = utils.child(container, selectorContainer)
  const slides = utils.children(opts.selector, slidesContainer)
  const controlNavList = []
  let containerWidth = container.offsetWidth

  opts.animationClass = opts.animationClass.replace(/^\./g, '')

  const emitr = emitus({ prev, next, play, pause, move: i => goTo(i) })

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

  function moveTo (direction, index = -1) {
    animating = true
    clearTimeout(timeout)

    display(slides[current])

    if (index !== -1) current = index
    else {
      current = direction === 'next' ? current + 1 : current - 1

      if (current > slides.length - 1) current = 0
      if (current < 0) current = slides.length - 1
    }

    slide = slides[current]

    display(slide)

    slidesContainer.classList.add(opts.animationClass)

    translateX(
      slidesContainer,
      direction === 'next' ? `-${containerWidth}px` : `${containerWidth}px`
    )
    translateX(
      slide,
      direction === 'next' ? `${containerWidth}px` : `-${containerWidth}px`
    )

    controlNavActiveItem(current)

    setTimeout(
      () => {
        animating = false
        slidesContainer.classList.remove(opts.animationClass)

        transform(slidesContainer, 'none')
        transform(slides[current], 'none')
        displayByIndex(current)

        emitr.emit('move', [ direction, current, slide ])
        emitr.emit(direction, [ current, slide ])

        slideshow()
      },
      opts.animationSpeed + 260
    )
  }

  function goTo (i) {
    if (!animating && current !== i && (i >= 0 && i < slides.length)) {
      moveTo(current - i < 0 ? 'next' : 'prev', i)
    }
  }

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

  function bindEvents () {
    window.addEventListener(
      'resize',
      () => {
        containerWidth = container.offsetWidth
      },
      false
    )
  }

  function controlNavs () {
    if (!opts.controlNavs) return

    const control = utils.child(container, opts.controlNavClass)

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

    for (let i = 0; i < slides.length; i++) {
      el = document.createElement('a')
      utils.onClick(el, () => goTo(i))

      ul.appendChild(el)
      controlNavList.push(el)
    }

    control.appendChild(ul)
  }

  function directionNavs () {
    if (!opts.directionNavs) return

    const prevNav = utils.child(container, opts.directionNavPrev)
    const nextNav = utils.child(container, opts.directionNavNext)

    if (prevNav && nextNav) {
      utils.onClick(prevNav, prev)
      utils.onClick(nextNav, next)
      return
    }

    opts.directionNavs = false
  }

  function keyboard () {
    if (!opts.keyboard) return

    utils.onKeyup(document, event => {
      if (event.which === 37) prev()
      if (event.which === 39) next()
    })
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
    const active = opts.slideActiveClass.replace(/^\./g, '')
    const show = opts.slideVisibleClass.replace(/^\./g, '')

    if (yes) el.classList.add(show)
    else el.classList.remove(show)

    if (cls) el.classList.add(active)
    else el.classList.remove(active)
  }

  function play () {
    if (!paused) return

    opts.slideshow = true
    slideshow()

    emitr.emit('play', [ current ])
  }

  function pause () {
    if (!opts.slideshow) return

    clearTimeout(timeout)
    paused = true
    animating = false
    opts.slideshow = false

    emitr.emit('pause', [ current ])
  }
}
