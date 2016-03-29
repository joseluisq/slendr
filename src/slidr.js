export default (options = {}) => {
  const container = document.querySelector(options.container)
  const list = container.querySelector(options.list)
  const items = getElements(options.item, list)
  let current = 0
  let animation = false

  items.forEach(slide => situate(slide));
  displayIndex(current)

  return {
    next,
    prev
  };

  function situate(slide) {
    background(slide)
  }

  function prev() {
    if (!animation && current > 0) {
      move('prev');
    }
  }

  function next() {
    if (!animation && current < items.length - 1) {
      move('next');
    }
  }

  function move(dir) {
    animation = true;

    display(items[current]);
    current = (dir === 'next') ? current + 1 : current - 1;
    display(items[current]);

    list.classList.add(options.effect);
    translateX(list, (dir === 'next') ? '-100%' : '100%');
    translateX(items[current], (dir === 'next') ? '100%' : '-100%');

    setTimeout(function() {
      animation = false;
      list.classList.remove(options.effect);
      transform(list, 'none');
      transform(items[current], 'none');
      displayIndex(current);
    }, options.duration);
  }

  function background(slide) {
    const src = slide.getAttribute('data-src')
    slide.style.setProperty('background-image', `url('${src}')`)
  }

  function translateX(el, x = 0) {
    transform(el, `translateX(${x})`);
  }

  function transform(el, val) {
    el.style.setProperty('-webkit-transform', val)
    el.style.setProperty('-moz-transform', val)
    el.style.setProperty('transform', val)
  }

  function display(el, val = true) {
    el.style.setProperty('display', val ? 'block' : 'none')
  }

  function displayIndex(i) {
    items.forEach((el, z) => {
      display(el, i === z)
    });
  }

  function getElements(selector, parent = document) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector))
  }
};
