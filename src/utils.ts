export function child (element: HTMLElement | null, selector: string): HTMLElement | null {
  if (!element || !selector) return null

  return element.querySelector(selector) as HTMLElement
}

export function children (selector: string, parent?: HTMLElement | null): HTMLElement[] {
  if (!parent) {
    parent = document.body
  }

  return Array.prototype.slice.call(parent.querySelectorAll(selector))
}

export function onClick (element: HTMLElement, func: Function): void {
  if (!element || !func) return

  element.addEventListener(
    'click',
    (e) => {
      e.preventDefault()
      func(e)
    },
    false
  )
}

export function transform (element: HTMLElement, value: string): void {
  if (!element) return

  element.style.setProperty('-webkit-transform', value)
  element.style.setProperty('-moz-transform', value)
  element.style.setProperty('transform', value)
}

export function translateX (element: HTMLElement, x: string = '0px'): void {
  transform(element, `translateX(${x.toString()})`)
}

export function cleanClass (className: string): string {
  return className.replace(/^\./g, '')
}
