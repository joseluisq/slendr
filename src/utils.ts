export function child (element: HTMLElement, selector: string): HTMLElement | null {
  if (!element || !selector) return null

  return element.querySelector(selector) as HTMLElement
}

export function children (selector: string, parent?: HTMLElement | null): HTMLElement[] {
  return Array.prototype.slice.call((parent || document.body).querySelectorAll(selector))
}

export function onClick (element: HTMLElement, func: Function): void {
  if (!element || !func) return

  element.addEventListener('click', (e) => {
    e.preventDefault()
    func(e)
  }, false)
}

export function transform (element: HTMLElement, value: string): void {
  if (!element) return

  element.style.setProperty('-webkit-transform', value)
  element.style.setProperty('-moz-transform', value)
  element.style.setProperty('transform', value)
}

export function translateX (element: HTMLElement | null, x = '0px'): void {
  if (element) transform(element, `translate3d(${x}, 0, 0)`)
}

export function cleanClass (className: string): string {
  return className.replace(/^\./g, '')
}
