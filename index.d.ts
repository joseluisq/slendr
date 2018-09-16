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
  constructor (options?: SlendrOptions);

  /**
   * Moves the current slider to the previous slide
   */
  prev (): void

  /**
   * Moves the current slider to the next slide
   */
  next (): void

  /**
   * Plays the current slider
   */
  play (): void

  /**
   * Pauses the current slider
   */
  pause (): void

  /**
   * Moves the current slider by index
   */
  move (index: number): void

  /**
   * Adds some event listener
   *
   * @param eventName SlendrEvent like 'move' | 'next' | 'prev' | 'play' | 'pause'
   * @param listener EmitusListener
   */
  on (eventName: SlendrEvent, listener: EmitusListener): void

  /**
   * Removes some event listener
   *
   * @param eventName SlendrEvent like 'move' | 'next' | 'prev' | 'play' | 'pause'
   * @param listener EmitusListener
   */
  off (eventName: SlendrEvent, listener?: EmitusListener): void
}
