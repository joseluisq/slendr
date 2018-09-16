import { emitus, Emitus, EmitusListener } from 'emitus'
import {
  OptionsRequired,
  SlendrEvent,
  SlendrInterface,
  SlendrOptions } from './interfaces'
import {
  child,
  children,
  cleanClass,
  onClick,
  transform,
  translateX } from './utils'

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

/**
 * Slendr is a responsive & lightweight slider for modern browsers.
 */
export class Slendr implements SlendrInterface {
  private readonly opts: OptionsRequired
  private readonly container: HTMLElement
  private readonly slidesContainer: HTMLElement
  private readonly slides: HTMLElement[]
  private readonly slidesLength: number = 0
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

      if (!childContainer) throw new Error('No container found')

      this.container = childContainer
    } else this.container = this.opts.container

    const selectorContainer = this.opts.selector.substr(0, this.opts.selector.search(' '))
    const slidesContainer = child(this.container, selectorContainer)

    if (!slidesContainer) throw new Error('No slides container found')

    this.slidesContainer = slidesContainer
    this.slides = children(this.opts.selector, slidesContainer)
    this.slidesLength = this.slides.length
    this.containerWidth = this.container.offsetWidth
    this.opts.animationClass = cleanClass(this.opts.animationClass)
    this.opts.slideActiveClass = cleanClass(this.opts.slideActiveClass)
    this.opts.slideVisibleClass = cleanClass(this.opts.slideVisibleClass)
    this.opts.controlNavClass = cleanClass(this.opts.controlNavClass)
    this.opts.controlNavClassActive = cleanClass(this.opts.controlNavClassActive)

    this.emitter = emitus()

    this.initialize()
  }

  /**
   * Moves the current slider to the previous slide
   */
  prev () {
    if (!this.animating) this.moveTo(0)
  }

  /**
   * Moves the current slider to the next slide
   */
  next () {
    if (!this.animating) this.moveTo(1)
  }

  /**
   * Plays the current slider
   */
  play () {
    if (!this.paused) return

    this.opts.slideshow = true
    this.slideshow()

    this.emitter.emit('play', [ this.current ])
  }

  /**
   * Pauses the current slider
   */
  pause () {
    if (!this.opts.slideshow) return

    clearTimeout(this.timeout)

    this.paused = true
    this.animating = false
    this.opts.slideshow = false

    this.emitter.emit('pause', [ this.current ])
  }

  /**
   * Moves the current slider by index
   */
  move (index: number) {
    this.goTo(index)
  }

  /**
   * Adds some event listener
   * Events supported: 'move' | 'next' | 'prev' | 'play' | 'pause'
   *
   * @param eventName SlendrEvent
   * @param listener EmitusListener
   */
  on (eventName: SlendrEvent, listener: EmitusListener) {
    this.emitter.on(eventName, listener)
  }

  /**
   * Removes some event listener
   *
   * @param eventName SlendrEvent like 'move' | 'next' | 'prev' | 'play' | 'pause'
   * @param listener EmitusListener
   */
  off (eventName: SlendrEvent, listener?: EmitusListener) {
    this.emitter.off(eventName, listener)
  }

  private initialize () {
    if (this.slidesLength < 2) {
      if (this.slidesLength === 1) {
        this.background(this.slides[0], 0)
        this.displayByIndex(0)
      }

      return
    }

    this.container.setAttribute('data-length', this.slidesLength.toString())

    for (let i = 0; i < this.slidesLength; i++) this.background(this.slides[i], i)

    this.displayByIndex(0)
    this.bindEvents()

    if (this.opts.controlNavs) {
      this.controlNavActive = this.controlNavs()

      if (this.controlNavActive) this.controlNavActive(0)
    }

    if (this.opts.directionNavs) this.directionNavs()
    else this.opts.directionNavs = false

    if (this.opts.keyboard) this.keyboard()

    this.slideshow()
  }

  private goTo (i: number) {
    if (!this.animating && this.current !== i && (i >= 0 && i < this.slidesLength)) {
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

      if (this.current > this.slidesLength - 1) this.current = 0
      if (this.current < 0) this.current = this.slidesLength - 1
    }

    this.slide = this.slides[this.current]

    this.display(this.slide)

    this.slidesContainer.classList.add(this.opts.animationClass)

    translateX(this.slidesContainer, (direction === 1 ? '-' : '') + this.containerWidth + 'px')
    translateX(this.slide, (direction === 1 ? '' : '-') + this.containerWidth + 'px')

    window.requestAnimationFrame(() => {
      if (this.controlNavActive) this.controlNavActive(this.current)

      this.translationDir = direction
      this.slidesContainer.addEventListener('transitionend', () => this.onTransitionEnd(), false)
    })
  }

  private slideshow () {
    if (this.opts.slideshow) {
      this.paused = false
      window.clearTimeout(this.timeout)
      this.timeout = window.setTimeout(() => this.next(), this.opts.slideshowSpeed)
    }
  }

  private displayByIndex (i: number) {
    for (let n = 0; n < this.slidesLength; n++) this.display(this.slides[n], i === n, i === n)
  }

  private display (el: HTMLElement, yes = true, cls = false) {
    if (yes) el.classList.add(this.opts.slideVisibleClass)
    else el.classList.remove(this.opts.slideVisibleClass)

    if (cls) el.classList.add(this.opts.slideActiveClass)
    else el.classList.remove(this.opts.slideActiveClass)
  }

  private background (slide: HTMLElement, index: number) {
    const src = slide.getAttribute('data-src')

    slide.setAttribute('data-slide', index.toString())

    if (src) {
      slide.style.setProperty('background-image', `url('${src}')`)
      slide.removeAttribute('data-src')
    }
  }

  private keyboard () {
    document.addEventListener('keyup', ({ which }) => {
      if (which === 37) this.prev()
      if (which === 39) this.next()
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

    this.slidesContainer.removeEventListener('transitionend', () => this.onTransitionEnd(), false)

    this.slideshow()
  }

  private bindEvents () {
    window.addEventListener('resize', () => this.containerWidth = this.container.offsetWidth, false)
  }

  private directionNavs () {
    const prevNav: HTMLElement | null = child(this.container, this.opts.directionNavPrev)
    const nextNav: HTMLElement | null = child(this.container, this.opts.directionNavNext)

    if (prevNav) onClick(prevNav, () => this.prev())
    if (nextNav) onClick(nextNav, () => this.next())
  }

  private controlNavs (): Function | null {
    const control: HTMLElement | null = child(this.container, `.${this.opts.controlNavClass}`)

    if (!control) return null

    while (control.firstChild) control.removeChild(control.firstChild)

    const controlNavList: HTMLElement[] = []
    const ul: HTMLElement = document.createElement('ul')

    let i = 0

    while (i < this.slidesLength) {
      const el: HTMLElement | null = this.createBullet(ul, i++)

      if (el) controlNavList.push(el)
    }

    control.appendChild(ul)

    const controlNavActive = (index: number) => {
      if (this.slidesLength > 1) {
        let n = 0

        while (n < controlNavList.length) {
          controlNavList[n++].classList.remove(this.opts.controlNavClassActive)
        }

        controlNavList[index || 0].classList.add(this.opts.controlNavClassActive)
      }
    }

    return controlNavActive
  }

  private createBullet (ul: HTMLElement, i: number): HTMLElement | null {
    const a: HTMLElement = document.createElement('a')

    onClick(a, () => this.goTo(i))
    ul.appendChild(a)

    return a
  }
}
