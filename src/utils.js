export function child (el, selector) {
  if (!el) return
  return el.querySelector(selector)
}

export function children (selector, parent = document) {
  return Array.prototype.slice.call(parent.querySelectorAll(selector))
}

export function onClick (el, fn) {
  if (!el) return
  el.addEventListener(
    'click',
    e => {
      e.preventDefault()
      fn(e)
    },
    false
  )
}

export function transform (el, val) {
  if (!el) return
  el.style.setProperty('-webkit-transform', val)
  el.style.setProperty('-moz-transform', val)
  el.style.setProperty('transform', val)
}

export function translateX (el, x = 0) {
  transform(el, `translateX(${x})`)
}

export function cleanClass (className) {
  return className.replace(/^\./g, '')
}
