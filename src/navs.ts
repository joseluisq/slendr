import { ControlNav, ControlNavActive } from './interfaces'
import { child, onClick } from './utils'

export function directionNavs (
  container: HTMLElement,
  directionNavPrev: string,
  directionNavNext: string,
  prev: Function,
  next: Function
) {
  const prevNav: HTMLElement | null = child(container, directionNavPrev)
  const nextNav: HTMLElement | null = child(container, directionNavNext)

  if (prevNav) {
    onClick(prevNav, prev)
  }

  if (nextNav) {
    onClick(nextNav, next)
  }
}

export function controlNavs (container: HTMLElement, options: ControlNav): ControlNavActive | null {
  const defaults: ControlNav = {
    controlNavClass: 'slendr-control',
    controlNavClassActive: 'slendr-control-active',
    bullets: 0,
    callback: null
  }

  const opts: ControlNav = { ...defaults, ...options }

  const control: HTMLElement | null = child(container, `.${opts.controlNavClass}`)

  if (!control) {
    return null
  }

  while (control.firstChild) {
    control.removeChild(control.firstChild)
  }

  const controlNavList: HTMLElement[] = []
  const ul: HTMLElement = document.createElement('ul')

  for (let i: number = 0; i < opts.bullets; i++) {
    const el: HTMLElement | null = createBullet(i, opts.callback)

    if (el) {
      controlNavList.push(el)
    }
  }

  control.appendChild(ul)

  return controlNavActive

  function controlNavActive (index: number = 0): void {
    if (opts.bullets > 1) {
      controlNavList.forEach((_, n) => {
        controlNavList[n].classList.remove(opts.controlNavClassActive)
      })

      controlNavList[index].classList.add(opts.controlNavClassActive)
    }
  }

  function createBullet (i: number, func: Function | null): HTMLElement | null {
    let a: HTMLElement | null = null

    if (func) {
      a = document.createElement('a')
      onClick(a, () => func(i))
      ul.appendChild(a)
    }

    return a
  }
}
