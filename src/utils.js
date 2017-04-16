module.exports = {
  child (el, selector) {
    return el.querySelector(selector)
  },
  children (selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  },
  onClick (el, fn) {
    el.addEventListener(
      'click',
      event => {
        event.preventDefault()
        fn(event)
      },
      false
    )
  },
  onKeyup (el, fn) {
    el.addEventListener('keyup', fn, false)
  }
}
