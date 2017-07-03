export default (prev, next) => {
  document.addEventListener(
    'keyup',
    ({ which }) => {
      if (which === 37) prev()
      if (which === 39) next()
    },
    false
  )
}
