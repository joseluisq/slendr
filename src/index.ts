import { child, children, cleanClass, transform, translateX } from './utils'
import { defaults } from './defaults'
import background from './background'
import keyboard from './keyboard'
import { controlNavs, directionNavs } from './navs'
import { Elements, Options, OptionsRequired, Slendr } from './interfaces'
import { emitus, Emitus } from 'emitus'

const emitter: Emitus = emitus()

export function slendr (options?: Options): Slendr {
  const opts: OptionsRequired = { ...defaults, ...options } as OptionsRequired

  let container: HTMLElement

  if (typeof opts.container === 'string') {
    const childContainer: HTMLElement | null = child(document.body, opts.container)

    if (!childContainer) {
      throw new Error('No container found')
    }

    container = childContainer
  } else {
    container = opts.container
  }

  const selectorContainer: string = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer: HTMLElement | null = child(container, selectorContainer)

  if (!slidesContainer) {
    throw new Error('No slides container found')
  }

  const slides: HTMLElement[] = children(opts.selector, slidesContainer)
  const api: Slendr = getSlendr({ container, slidesContainer, slides }, opts)

  return api
}

export { Slendr, Options, Emitus }

function getSlendr ({ container, slidesContainer, slides }: Elements, opts: OptionsRequired): Slendr {
  let current = 0
  let timeout = 0
  let slide: HTMLElement
  let paused = true
  let animating = false
  let containerWidth: number = container.offsetWidth
  let controlNavActive: Function | null = null
  let translationDir: number

  opts.animationClass = cleanClass(opts.animationClass)
  opts.slideActiveClass = cleanClass(opts.slideActiveClass)
  opts.slideVisibleClass = cleanClass(opts.slideVisibleClass)
  opts.controlNavClass = cleanClass(opts.controlNavClass)
  opts.controlNavClassActive = cleanClass(opts.controlNavClassActive)

  const api: Slendr = {
    // Methods
    prev,
    next,
    play,
    pause,
    move: goTo,

    // Events
    on: emitter.on,
    off: emitter.off
  }

  init()

  return api

  function init (): void {
    if (slides.length < 2) {
      if (slides.length === 1) {
        background(slides[0])
        displayByIndex(0)
      }

      return
    }

    slides.forEach((slide) => background(slide))

    displayByIndex(0)
    bindEvents()

    if (opts.controlNavs) {
      controlNavActive = controlNavs(container, {
        controlNavClass: opts.controlNavClass,
        controlNavClassActive: opts.controlNavClassActive,
        bullets: slides.length,
        callback: goTo
      })

      if (controlNavActive) {
        controlNavActive(0)
      }
    }

    if (opts.directionNavs) {
      directionNavs(container, opts.directionNavPrev, opts.directionNavNext, prev, next)
    } else {
      opts.directionNavs = false
    }

    if (opts.keyboard) {
      keyboard(prev, next)
    }

    slideshow()
  }

  function prev (): void {
    if (animating) return
    moveTo(0)
  }

  function next (): void {
    if (animating) return
    moveTo(0)
  }

  function moveTo (direction: number, index = -1): void {
    animating = true
    window.clearTimeout(timeout)

    display(slides[current])

    if (index !== -1) {
      current = index
    } else {
      current = direction === 1 ? current + 1 : current - 1

      if (current > slides.length - 1) current = 0
      if (current < 0) current = slides.length - 1
    }

    slide = slides[current]

    display(slide)

    slidesContainer.classList.add(opts.animationClass)
    translateX(slidesContainer, direction === 1 ? `-${containerWidth}px` : `${containerWidth}px`)
    translateX(slide, direction === 1 ? `${containerWidth}px` : `-${containerWidth}px`)

    window.requestAnimationFrame(() => {
      if (controlNavActive) {
        controlNavActive(current)
      }

      translationDir = direction

      slidesContainer.addEventListener('transitionend', onTransitionEnd, false)
    })
  }

  function onTransitionEnd () {
    animating = false
    slidesContainer.classList.remove(opts.animationClass)

    transform(slidesContainer, 'none')
    transform(slides[current], 'none')
    displayByIndex(current)

    emitter.emit('move', [ translationDir, current, slide ])
    emitter.emit(translationDir ? 'next' : 'prev', [ current, slide ])

    slidesContainer.removeEventListener('transitionend', onTransitionEnd, false)

    slideshow()
  }

  function goTo (i: number): void {
    if (!animating && current !== i && (i >= 0 && i < slides.length)) {
      moveTo(current - i < 0 ? 1 : 0, i)
    }
  }

  function slideshow (): void {
    if (opts.slideshow) {
      paused = false
      timeout = window.setTimeout(next, opts.slideshowSpeed)
    }
  }

  function bindEvents (): void {
    window.addEventListener(
      'resize',
      () => {
        containerWidth = container.offsetWidth
      },
      false
    )
  }

  function displayByIndex (i: number): void {
    slides.forEach((el, n) => display(el, i === n, i === n))
    container.setAttribute('data-slendr-length', slides.length.toString())
  }

  function display (el: HTMLElement, yes = true, cls = false): void {
    if (yes) {
      el.classList.add(opts.slideVisibleClass)
    } else {
      el.classList.remove(opts.slideVisibleClass)
    }

    if (cls) {
      el.classList.add(opts.slideActiveClass)
    } else {
      el.classList.remove(opts.slideActiveClass)
    }
  }

  function play (): void {
    if (!paused) return

    opts.slideshow = true
    slideshow()

    emitter.emit('play', [ current ])
  }

  function pause (): void {
    if (!opts.slideshow) return

    clearTimeout(timeout)

    paused = true
    animating = false
    opts.slideshow = false

    emitter.emit('pause', [ current ])
  }
}
