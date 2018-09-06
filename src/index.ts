import { emitus, Emitus, EmitusListener } from 'emitus'
import { controlNavs, directionNavs } from './navs'
import { OptionsRequired, SlendrEvent, SlendrInterface, SlendrOptions } from './interfaces'
import { child, children, cleanClass, transform, translateX } from './utils'

const defaults: SlendrOptions = {
  // Selectors
  container: '.slendr',
  selector: '.slendr-slides > .slendr-slide',
  // Animation
  animationClass: '.slendr-animate',
  // Direction navs
  directionNavs: true,
  directionNavPrev: '.slendr-prev',
  directionNavNext: '.slendr-next',
  // Control navs
  controlNavs: true,
  controlNavClass: '.slendr-control',
  controlNavClassActive: '.slendr-control-active',
  // Slide
  slideVisibleClass: '.slendr-visible',
  slideActiveClass: '.slendr-active',
  // Slideshow
  slideshow: true,
  slideshowSpeed: 4000,
  // Keyboard
  keyboard: false
}

export { SlendrOptions }

export class Slendr implements SlendrInterface {
  private readonly opts: OptionsRequired
  private readonly container: HTMLElement
  private readonly slidesContainer: HTMLElement
  private readonly slides: HTMLElement[]
  private readonly emitter: Emitus

  private current = 0
  private timeout = 0
  private paused = true
  private animating = false
  private containerWidth = 0
  private translationDir = 0
  private slide: HTMLElement | null = null
  private controlNavActive: Function | null = null

  constructor (private readonly options?: SlendrOptions) {
    this.opts = { ...defaults, ...this.options } as OptionsRequired

    if (typeof this.opts.container === 'string') {
      const childContainer = child(document.body, this.opts.container)

      if (!childContainer) {
        throw new Error('No container found')
      }

      this.container = childContainer
    } else {
      this.container = this.opts.container
    }

    const selectorContainer = this.opts.selector.substr(0, this.opts.selector.search(' '))
    const slidesContainer = child(this.container, selectorContainer)

    if (!slidesContainer) {
      throw new Error('No slides container found')
    }

    this.slidesContainer = slidesContainer
    this.slides = children(this.opts.selector, slidesContainer)
    this.containerWidth = this.container.offsetWidth
    this.opts.animationClass = cleanClass(this.opts.animationClass)
    this.opts.slideActiveClass = cleanClass(this.opts.slideActiveClass)
    this.opts.slideVisibleClass = cleanClass(this.opts.slideVisibleClass)
    this.opts.controlNavClass = cleanClass(this.opts.controlNavClass)
    this.opts.controlNavClassActive = cleanClass(this.opts.controlNavClassActive)

    this.emitter = emitus()

    this.initialize()
  }

  prev () {
    if (!this.animating) this.moveTo(0)
  }

  next () {
    if (!this.animating) this.moveTo(1)
  }

  play () {
    if (!this.paused) return

    this.opts.slideshow = true
    this.slideshow()

    this.emitter.emit('play', [ this.current ])
  }

  pause () {
    if (!this.opts.slideshow) return

    clearTimeout(this.timeout)

    this.paused = true
    this.animating = false
    this.opts.slideshow = false

    this.emitter.emit('pause', [ this.current ])
  }

  move (index: number) {
    this.goTo(index)
  }

  on (eventName: SlendrEvent, listener: EmitusListener) {
    this.emitter.on(eventName, listener)
  }

  off (eventName: SlendrEvent, listener?: EmitusListener) {
    this.emitter.off(eventName, listener)
  }

  private initialize () {
    if (this.slides.length < 2) {
      if (this.slides.length === 1) {
        this.background(this.slides[0])
        this.displayByIndex(0)
      }

      return
    }

    this.slides.forEach((slide) => this.background(slide))

    this.displayByIndex(0)
    this.bindEvents()

    if (this.opts.controlNavs) {
      this.controlNavActive = controlNavs(this.container, {
        controlNavClass: this.opts.controlNavClass,
        controlNavClassActive: this.opts.controlNavClassActive,
        bullets: this.slides.length,
        callback: this.goTo.bind(this)
      })

      if (this.controlNavActive) {
        this.controlNavActive(0)
      }
    }

    if (this.opts.directionNavs) {
      directionNavs(
        this.container,
        this.opts.directionNavPrev,
        this.opts.directionNavNext,
        this.prev.bind(this),
        this.next.bind(this)
      )
    } else {
      this.opts.directionNavs = false
    }

    if (this.opts.keyboard) {
      this.keyboard(this.prev.bind(this), this.next.bind(this))
    }

    this.slideshow()
  }

  private goTo (i: number) {
    if (!this.animating && this.current !== i && (i >= 0 && i < this.slides.length)) {
      this.moveTo(this.current - i < 0 ? 1 : 0, i)
    }
  }

  private moveTo (direction: number, index = -1) {
    this.animating = true
    window.clearTimeout(this.timeout)

    this.display(this.slides[this.current])

    if (index !== -1) {
      this.current = index
    } else {
      this.current = direction === 1 ? this.current + 1 : this.current - 1

      if (this.current > this.slides.length - 1) this.current = 0
      if (this.current < 0) this.current = this.slides.length - 1
    }

    this.slide = this.slides[this.current]

    this.display(this.slide)

    this.slidesContainer.classList.add(this.opts.animationClass)

    translateX(this.slidesContainer, direction === 1 ? `-${this.containerWidth}px` : `${this.containerWidth}px`)
    translateX(this.slide, direction === 1 ? `${this.containerWidth}px` : `-${this.containerWidth}px`)

    window.requestAnimationFrame(() => {
      if (this.controlNavActive) {
        this.controlNavActive(this.current)
      }

      this.translationDir = direction
      this.slidesContainer.addEventListener('transitionend', this.onTransitionEnd.bind(this), false)
    })
  }

  private slideshow () {
    if (this.opts.slideshow) {
      this.paused = false
      window.clearTimeout(this.timeout)
      this.timeout = window.setTimeout(this.next.bind(this), this.opts.slideshowSpeed)
    }
  }

  private displayByIndex (i: number) {
    this.slides.forEach((el, n) => this.display(el, i === n, i === n))
    this.container.setAttribute('data-slendr-length', this.slides.length.toString())
  }

  private display (el: HTMLElement, yes = true, cls = false) {
    if (yes) {
      el.classList.add(this.opts.slideVisibleClass)
    } else {
      el.classList.remove(this.opts.slideVisibleClass)
    }

    if (cls) {
      el.classList.add(this.opts.slideActiveClass)
    } else {
      el.classList.remove(this.opts.slideActiveClass)
    }
  }

  private background (slide: HTMLElement | null) {
    if (!slide) return

    const src = slide.getAttribute('data-src')
    slide.style.setProperty('background-image', `url('${src}')`)
  }

  private keyboard (prev: Function, next: Function) {
    document.addEventListener('keyup', ({ which }) => {
      if (which === 37) prev()
      if (which === 39) next()
    }, false)
  }

  private onTransitionEnd () {
    this.animating = false
    this.slidesContainer.classList.remove(this.opts.animationClass)

    transform(this.slidesContainer, 'none')
    transform(this.slides[this.current], 'none')

    this.displayByIndex(this.current)

    this.emitter.emit('move', [ this.translationDir, this.current, this.slide ])
    this.emitter.emit(this.translationDir ? 'next' : 'prev', [ this.current, this.slide ])

    this.slidesContainer.removeEventListener('transitionend', this.onTransitionEnd.bind(this), false)

    this.slideshow()
  }

  private bindEvents () {
    window.addEventListener('resize', () => this.containerWidth = this.container.offsetWidth, false)
  }
}
