import { EmitusHandler } from './emitus'

export interface ISlendr {
  // Methods
  prev (): void
  next (): void
  play (): void
  pause (): void
  move (i: number): void

  // Events
  on (type: string, func: EmitusHandler): void
  off (type: string, func: EmitusHandler): void
}

export interface IOptions {
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

export interface IOptionsRequired extends IOptions {
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

export interface IElements {
  container: HTMLElement
  slidesContainer: HTMLElement
  slides: HTMLElement[]
}

export interface IControlNav {
  controlNavClass: string
  controlNavClassActive: string
  bullets: number
  callback: Function | null
}

export type IControlNavActive = (index: number) => void
