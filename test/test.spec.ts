import markup from './markup'
import { slendr, Slendr } from '../src'

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
      expect(typeof slendr).toEqual('function')
    })

    it('should return an object', () => {
      expect(typeof slider).toEqual('object')
    })

    it('should contain an `on` function', () => {
      expect(typeof slider.on).toEqual('function')
    })

    it('should contain an `off` function', () => {
      expect(typeof slider.off).toEqual('function')
    })

    it('should contain a `move` function', () => {
      expect(typeof slider.move).toEqual('function')
    })

    it('should contain a `prev` function', () => {
      expect(typeof slider.prev).toEqual('function')
    })

    it('should contain a `next` function', () => {
      expect(typeof slider.next).toEqual('function')
    })

    it('should contain a `play` function', () => {
      expect(typeof slider.play).toEqual('function')
    })

    it('should contain a `pause` function', () => {
      expect(typeof slider.pause).toEqual('function')
    })
  })

  describe('on', () => {
    let onSpy: jasmine.Spy
    const onEvent = () => console.log('ok!')

    describe('`move` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('move', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.move).toEqual('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('move', onEvent)
      })

      it('should contain the given arguments (`move` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toEqual('move')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`next` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('next', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.next).toEqual('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('next', onEvent)
      })

      it('should contain the given arguments (`next` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toEqual('next')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`prev` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('prev', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.prev).toEqual('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('prev', onEvent)
      })

      it('should contain the given arguments (`prev` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toEqual('prev')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`play` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('play', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.play).toEqual('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('play', onEvent)
      })

      it('should contain the given arguments (`play` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toEqual('play')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`pause` event', () => {
      beforeEach(() => {
        onSpy = spyOn(slider, 'on')

        slider.on('pause', onEvent)
      })

      it('should be a function', () => {
        expect(typeof slider.pause).toEqual('function')
      })

      it('should be called', () => {
        expect(slider.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(slider.on).toHaveBeenCalledWith('pause', onEvent)
      })

      it('should contain the given arguments (`pause` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toEqual('pause')
        expect(args).toEqual(onEvent)
      })
    })
  })
})
