import { child, children, transform, translateX, cleanClass } from './utils'
import { defaults } from './defaults'
import background from './background'
import keyboard from './keyboard'
import { directionNavs, controlNavs } from './navs'
import { ISlendr, IElements, IOptions } from './interfaces'
import { emitus, Emitus } from './emitus'

const emitter: Emitus = emitus()

export default function slendr (options?: IOptions): ISlendr | null {
  const opts: IOptions = { ...defaults, ...options }

  if (!opts.container) return null

  let container: HTMLElement

  if (typeof opts.container === 'string') {
    let childContainer: HTMLElement | null = child(document.body, opts.container)

    if (!childContainer) {
      return null
    }

    container = childContainer
  } else {
    container = opts.container
  }

  const selectorContainer: string = opts.selector.substr(0, opts.selector.search(' '))
  const slidesContainer: HTMLElement | null = child(container, selectorContainer)

  let api: ISlendr | null = null

  if (slidesContainer) {
    const slides: HTMLElement[] = children(opts.selector, slidesContainer)

    if (!slides.length) {
      return null
    }

    const els: IElements = { container, slidesContainer, slides }

    api = getSlendr(els, opts)
  }

  return api
}

function getSlendr ({ container, slidesContainer, slides }: IElements, opts: IOptions): ISlendr {
  let current: number = 0
  let timeout: number = 0
  let slide: HTMLElement
  let paused: boolean = true
  let animating: boolean = false
  let containerWidth: number = container.offsetWidth
  let controlNavActive: Function | null = null

  opts.animationClass = cleanClass(opts.animationClass)
  opts.slideActiveClass = cleanClass(opts.slideActiveClass)
  opts.slideVisibleClass = cleanClass(opts.slideVisibleClass)
  opts.controlNavClass = cleanClass(opts.controlNavClass)
  opts.controlNavClassActive = cleanClass(opts.controlNavClassActive)

  const api: ISlendr = {
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
    moveTo('prev')
  }

  function next (): void {
    if (animating) return
    moveTo('next')
  }

  function moveTo (direction: string, index: number = -1): void {
    animating = true
    window.clearTimeout(timeout)

    display(slides[current])

    if (index !== -1) {
      current = index
    } else {
      current = direction === 'next' ? current + 1 : current - 1

      if (current > slides.length - 1) current = 0
      if (current < 0) current = slides.length - 1
    }

    slide = slides[current]

    display(slide)

    slidesContainer.classList.add(opts.animationClass)

    translateX(slidesContainer, direction === 'next' ? `-${containerWidth}px` : `${containerWidth}px`)
    translateX(slide, direction === 'next' ? `${containerWidth}px` : `-${containerWidth}px`)

    if (controlNavActive) {
      controlNavActive(current)
    }

    window.setTimeout(() => {
      animating = false
      slidesContainer.classList.remove(opts.animationClass)

      transform(slidesContainer, 'none')
      transform(slides[current], 'none')
      displayByIndex(current)

      emitter.emit('move', [ direction, current, slide ])
      emitter.emit(direction, [ current, slide ])

      slideshow()
    }, opts.animationSpeed + 260)
  }

  function goTo (i: number): void {
    if (!animating && current !== i && (i >= 0 && i < slides.length)) {
      moveTo(current - i < 0 ? 'next' : 'prev', i)
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

  function display (el: HTMLElement, yes: boolean = true, cls: boolean = false): void {
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
