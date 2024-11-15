import { shallowMount } from '@vue/test-utils'
import Canvas from '@/components/Smolitux/Canvas/Canvas.vue'

// Mock canvas context
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  fillText: jest.fn()
}

// Mock canvas element
HTMLCanvasElement.prototype.getContext = () => mockContext

describe('Canvas.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Canvas)
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  it('emits mouse events correctly', async () => {
    const events = [
      { original: 'mousewheel', emitted: 'mouse-wheel' },
      { original: 'mousedown', emitted: 'mouse-down' },
      { original: 'mouseup', emitted: 'mouse-up' },
      { original: 'mousemove', emitted: 'mouse-move' },
      { original: 'click', emitted: 'mouse-click' },
      { original: 'dblclick', emitted: 'double-click' },
      { original: 'mouseout', emitted: 'mouse-out' }
    ]

    for (const event of events) {
      const mockEvent = { preventDefault: jest.fn() }
      await wrapper.find('canvas').trigger(event.original, mockEvent)
      expect(wrapper.emitted()[event.emitted]).toBeTruthy()
    }
  })

  it('initializes canvas context on mount', () => {
    const canvas = wrapper.find('canvas').element
    expect(canvas.getContext('2d')).toBeTruthy()
  })

  it('updates canvas size on browser resize', async () => {
    global.innerWidth = 1024
    global.innerHeight = 768
    
    await wrapper.vm.browserResized()
    
    const canvas = wrapper.find('canvas').element
    expect(canvas.width).toBe(1024)
    expect(canvas.height).toBe(768)
  })

  it('cleans up event listeners on destroy', () => {
    const removeEventListenerSpy = jest.spyOn(wrapper.find('canvas').element, 'removeEventListener')
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalled()
  })
})

