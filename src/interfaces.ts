import { EmitusListener as Listener } from 'emitus'

// Events
export type Event = 'move' | 'next' | 'prev' | 'play' | 'pause'

export interface Slendr {
  // Methods
  prev (): void
  next (): void
  play (): void
  pause (): void
  move (i: number): void

  // Events
  on (eventName: Event, listener: Listener): void
  off (eventName: Event, listener?: Listener): void
}

export interface Options {
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

export interface OptionsRequired extends Options {
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

export interface Elements {
  container: HTMLElement
  slidesContainer: HTMLElement
  slides: HTMLElement[]
}

export interface ControlNav {
  controlNavClass: string
  controlNavClassActive: string
  bullets: number
  callback: Function | null
}

export type ControlNavActive = (index: number) => void
