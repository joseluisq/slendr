import { EmitusListener } from 'emitus'

/**
 * Slendr available events
 */
export type SlendrEvent = 'move' | 'next' | 'prev' | 'play' | 'pause'

/**
 * Slendr valid options
 */
export interface SlendrOptions {
  // Selectors
  container: HTMLElement | string
  selector: string
  // Animation
  animationClass?: string
  // Direction navs
  directionNavs?: boolean
  directionNavPrev?: string
  directionNavNext?: string
  // Control navs
  controlNavs?: boolean
  controlNavClass?: string
  controlNavClassActive?: string
  // Slide
  slideVisibleClass?: string
  slideActiveClass?: string
  // Slideshow
  slideshow?: boolean
  slideshowSpeed?: number
  // Keyboard
  keyboard?: boolean
}

/**
 * Slendr is a responsive & lightweight slider for modern browsers.
 */
export class Slendr {
  constructor (options?: SlendrOptions)

  /**
   * Moves the current slider to the previous slide
   */
  prev (): void

  /**
   * Moves the current slider to the next slide
   */
  next (): void

  /**
   * Starts slideshow timer mode for the current slider
   */
  play (): void

  /**
   * Pauses slideshow timer for the current slider
   */
  pause (): void

  /**
   * Moves the current slider by slide index
   *
   * @param index Slide index to move
   */
  move (index: number): void

  /**
   * Adds an event listener to the current slider
   *
   * @param eventName SlendrEvent ('move', 'next', 'prev', 'play' or 'pause')
   * @param listener EmitusListener
   */
  on<T> (eventName: SlendrEvent, listener: EmitusListener<T>): void

  /**
   * Removes a registered event listener
   *
   * @param eventName SlendrEvent ('move', 'next', 'prev', 'play' or 'pause')
   * @param listener EmitusListener
   */
  off (eventName: SlendrEvent, listener: EmitusListener): void
}
