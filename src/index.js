import emitus from 'emitus'
import { child, children, transform, translateX, cleanClass } from './utils'
import defaults from './options'
import { directionNavs, controlNavs } from './navs'
import background from './background'
import keyboard from './keyboard'

export default function slendr (options = {}) {
  let current = 0
  let timeout = 0
  let slide = null
  let paused = true
  let animating = false

  const opts = Object.assign(defaults, options)

  const container =
    typeof opts.container === 'string'
      ? child(document, opts.container)
      : opts.container

  if (!container) return

  const selectorContainer = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer = child(container, selectorContainer)
  const slides = children(opts.selector, slidesContainer)
  let containerWidth = container.offsetWidth
  let controlNavActive = container.offsetWidth

  opts.animationClass = cleanClass(opts.animationClass)
  opts.slideActiveClass = cleanClass(opts.slideActiveClass)
  opts.slideVisibleClass = cleanClass(opts.slideVisibleClass)
  opts.controlNavClass = cleanClass(opts.controlNavClass)
  opts.controlNavClassActive = cleanClass(opts.controlNavClassActive)

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
    bindEvents()

    if (opts.controlNavs) {
      controlNavActive = controlNavs(container, {
        controlNavs: opts.controlNavClass,
        controlNavClassActive: opts.controlNavClassActive,
        bullets: slides.length,
        callback: goTo
      }).controlNavActive

      controlNavActive(0)
    }

    if (opts.directionNavs) {
      directionNavs(
        container,
        opts.directionNavPrev,
        opts.directionNavNext,
        prev,
        next
      )
    } else opts.directionNavs = false

    if (opts.keyboard) keyboard(prev, next)

    slideshow()
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

    controlNavActive(current)

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
      moveTo(current - i < 0 ? 'next' : 'prev', i)
    }
  }

  function slideshow () {
    if (opts.slideshow) {
      paused = false
      timeout = setTimeout(next, opts.slideshowSpeed)
    }
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

  function displayByIndex (i) {
    slides.forEach((el, n) => display(el, i === n, i === n))
    container.setAttribute('data-slendr-length', slides.length)
  }

  function display (el, yes = true, cls = false) {
    if (yes) el.classList.add(opts.slideVisibleClass)
    else el.classList.remove(opts.slideVisibleClass)

    if (cls) el.classList.add(opts.slideActiveClass)
    else el.classList.remove(opts.slideActiveClass)
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
}
