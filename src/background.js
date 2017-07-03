export default slide => {
  if (!slide) return
  const src = slide.getAttribute('data-src')
  slide.style.setProperty('background-image', `url('${src}')`)
}
