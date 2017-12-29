export default (slide: HTMLElement | null) => {
  if (!slide) return

  const src = slide.getAttribute('data-src')
  slide.style.setProperty('background-image', `url('${src}')`)
}
