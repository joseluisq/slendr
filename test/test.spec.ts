import markup from './markup'
import { slendr, Slendr, Listener } from '../src'

markup.init()

describe('Slendr', () => {
  let slider: Slendr

  beforeEach(() => {
    slider = slendr({
      container: '.slendr',
      selector: '.slendr-slides > .slendr-slide',
      slideshow: false
    })
  })

  describe('api', () => {
    it('should be a function', () => {
      expect(typeof slendr).toBe('function')
    })

    it('should return an object', () => {
      expect(typeof slider).toBe('object')
    })

    it('should contain an `on` function', () => {
      expect(typeof slider.on).toBe('function')
    })

    it('should contain an `off` function', () => {
      expect(typeof slider.off).toBe('function')
    })

    it('should contain a `move` function', () => {
      expect(typeof slider.move).toBe('function')
    })

    it('should contain a `prev` function', () => {
      expect(typeof slider.prev).toBe('function')
    })

    it('should contain a `next` function', () => {
      expect(typeof slider.next).toBe('function')
    })

    it('should contain a `play` function', () => {
      expect(typeof slider.play).toBe('function')
    })

    it('should contain a `pause` function', () => {
      expect(typeof slider.pause).toBe('function')
    })
  })

  describe('on', () => {
    let onSpy: jasmine.Spy
    const onEvent: Listener = () => console.log('ok!')

    describe('`move` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('move', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.move).toBe('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('move', onEvent)
      })

      it('should contain the given arguments (`move` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('move')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`next` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('next', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.next).toBe('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('next', onEvent)
      })

      it('should contain the given arguments (`next` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('next')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`prev` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('prev', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.prev).toBe('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('prev', onEvent)
      })

      it('should contain the given arguments (`prev` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('prev')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`play` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('play', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.play).toBe('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('play', onEvent)
      })

      it('should contain the given arguments (`play` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('play')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`pause` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('pause', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.pause).toBe('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('pause', onEvent)
      })

      it('should contain the given arguments (`pause` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('pause')
        expect(args).toEqual(onEvent)
      })
    })
  })
})
