export default (prev: Function, next: Function) => {
  document.addEventListener(
    'keyup',
    ({ which }) => {
      if (which === 37) prev()
      if (which === 39) next()
    },
    false
  )
}
