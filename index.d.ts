import { EmitusListener as Listener } from 'emitus'

// Events
type Event = 'move' | 'next' | 'prev' | 'play' | 'pause'

interface Slendr {
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

interface Options {
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

declare function slendr (options?: Options): Slendr | null

export default slendr
export { slendr, Slendr, Options, Listener, Event }
