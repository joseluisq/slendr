import { child, onClick } from './utils'

export function directionNavs (
  container,
  directionNavPrev,
  directionNavNext,
  prev,
  next
) {
  const prevNav = child(container, directionNavPrev)
  const nextNav = child(container, directionNavNext)

  if (prevNav && nextNav) {
    onClick(prevNav, prev)
    onClick(nextNav, next)
  }
}

export function controlNavs (container, options = {}) {
  const opts = Object.assign(
    {
      controlNavClass: 'slendr-control',
      controlNavClassActive: 'slendr-control-active',
      bullets: 0,
      callback: null
    },
    options
  )

  const control = child(container, `.${opts.controlNavClass}`)

  if (!control) return

  while (control.firstChild) control.removeChild(control.firstChild)

  let el
  const controlNavList = []
  const ul = document.createElement('ul')

  for (let i = 0; i < opts.bullets; i++) {
    el = createBullet(i, ul, opts.callback)
    controlNavList.push(el)
  }

  control.appendChild(ul)

  return { controlNavActive }

  function controlNavActive (i = 0) {
    if (opts.controlNavs && opts.bullets > 1) {
      controlNavList.forEach((item, n) => {
        controlNavList[n].classList.remove(opts.controlNavClassActive)
      })

      controlNavList[i].classList.add(opts.controlNavClassActive)
    }
  }

  function createBullet (i, el, cb) {
    if (el && cb) {
      el = document.createElement('a')
      onClick(el, () => cb(i))
      ul.appendChild(el)
      return el
    }
  }
}
