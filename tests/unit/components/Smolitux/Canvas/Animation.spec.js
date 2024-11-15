import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Animation from '@/components/Smolitux/Canvas/Animation.vue'

// Mock canvas context
const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  fillText: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn()
}

// Mock canvas element
const mockCanvas = {
  getContext: () => mockContext,
  getBoundingClientRect: () => ({
    left: 0,
    top: 0,
    width: 800,
    height: 600
  }),
  style: {
    cursor: 'default'
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Animation.vue', () => {
  let wrapper
  let store
  let actions
  let state
  let getters

  beforeEach(() => {
    state = {
      nodes: [
        { id: 1, x: 100, y: 100, type: 'chatbot', label: 'Test Node', status: 'active' }
      ],
      connections: [
        { from: { id: 1 }, to: { id: 2 } }
      ],
      selectedNode: null
    }

    actions = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      addNode: jest.fn(),
      updateNode: jest.fn(),
      removeNode: jest.fn(),
      addConnection: jest.fn(),
      removeConnection: jest.fn(),
      selectNode: jest.fn()
    }

    getters = {
      nodes: state => state.nodes,
      connections: state => state.connections
    }

    store = new Vuex.Store({
      modules: {
        network: {
          namespaced: true,
          state,
          actions,
          getters
        }
      }
    })

    wrapper = shallowMount(Animation, {
      store,
      localVue,
      data() {
        return {
          scale: 1,
          offset: { x: 0, y: 0 }
        }
      },
      computed: {
        canvas() {
          return mockCanvas
        }
      }
    })

    // Mock $refs
    wrapper.vm.$refs = {
      canvas: {
        $refs: {
          canvas: mockCanvas
        }
      }
    }
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
    mockCanvas.style.cursor = 'default'
  })

  it('starts animation loop on mount', () => {
    expect(wrapper.vm.isRunning).toBe(true)
    expect(wrapper.vm.animationLoop).toBeTruthy()
  })

  it('stops animation loop on destroy', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    wrapper.destroy()
    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(wrapper.vm.isRunning).toBe(false)
  })

  it('handles mouse wheel zoom', async () => {
    const event = { deltaY: -100, preventDefault: jest.fn() }
    await wrapper.vm.onMouseWheel(event)
    expect(wrapper.vm.scale).toBeGreaterThan(1)

    event.deltaY = 100
    await wrapper.vm.onMouseWheel(event)
    expect(wrapper.vm.scale).toBeLessThan(1.1)
  })

  it('handles node dragging', async () => {
    const node = state.nodes[0]
    const event = {
      clientX: 100,  // Match node.x
      clientY: 100,  // Match node.y
      movementX: 50,
      movementY: 50,
      preventDefault: jest.fn()
    }

    // Mock the node finding logic
    wrapper.setData({
      nodes: [node],
      draggedNode: null
    })

    await wrapper.vm.onMouseDown(event)
    expect(wrapper.vm.draggedNode).toBe(node)
    expect(actions.selectNode).toHaveBeenCalledWith(expect.anything(), node)

    await wrapper.vm.onMouseMove(event)
    expect(actions.updateNode).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        id: node.id,
        updates: expect.any(Object)
      })
    )

    await wrapper.vm.onMouseUp(event)
    expect(wrapper.vm.draggedNode).toBeNull()
  })

  it('creates new node on double click', async () => {
    const event = {
      clientX: 200,
      clientY: 200,
      preventDefault: jest.fn()
    }

    await wrapper.vm.onDoubleClick(event)
    expect(actions.addNode).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
        type: 'chatbot',
        status: 'inactive'
      })
    )
  })
})


