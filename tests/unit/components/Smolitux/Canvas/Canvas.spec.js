import { shallowMount } from '@vue/test-utils'
import Canvas from '@/components/Smolitux/Canvas/Canvas.vue'

describe('Canvas.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Canvas)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('emits mouse events correctly', async () => {
    const events = [
      'mousewheel',
      'mousedown',
      'mouseup',
      'mousemove',
      'click',
      'dblclick',
      'mouseout',
      'dragenter',
      'dragleave',
      'dragover',
      'drop'
    ]

    for (const event of events) {
      const mockEvent = { preventDefault: jest.fn() }
      await wrapper.find('canvas').trigger(event, mockEvent)
      expect(wrapper.emitted()[event.replace('mouse', 'mouse-')]).toBeTruthy()
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
