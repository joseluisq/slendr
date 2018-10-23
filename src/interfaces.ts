import { EmitusListener } from 'emitus'

// Events
export type SlendrEvent = 'move' | 'next' | 'prev' | 'play' | 'pause' | 'image:load' | 'image:completed'

export interface SlendrInterface {
  // Methods
  prev (): void
  next (): void
  play (): void
  pause (): void
  move (i: number): void

  // Events
  on (eventName: SlendrEvent, listener: EmitusListener): void
  off (eventName: SlendrEvent, listener?: EmitusListener): void
}

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

export interface OptionsRequired extends SlendrOptions {
  // Animation
  animationClass: string
  // Direction navs
  directionNavs: boolean
  directionNavPrev: string
  directionNavNext: string
  // Control navs
  controlNavs: boolean
  controlNavClass: string
  controlNavClassActive: string
  // Slide
  slideVisibleClass: string
  slideActiveClass: string
  // Slideshow
  slideshow: boolean
  slideshowSpeed: number
  // Keyboard
  keyboard: boolean
}
