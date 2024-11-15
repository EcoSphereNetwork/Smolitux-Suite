import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Animation from '@/components/Smolitux/Canvas/Animation.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Animation.vue', () => {
  let wrapper
  let store
  let actions
  let state

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

    store = new Vuex.Store({
      modules: {
        network: {
          namespaced: true,
          state,
          actions
        }
      }
    })

    wrapper = shallowMount(Animation, {
      store,
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
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

  it('connects to WebSocket on mount', () => {
    expect(actions.connect).toHaveBeenCalled()
  })

  it('disconnects from WebSocket on destroy', () => {
    wrapper.destroy()
    expect(actions.disconnect).toHaveBeenCalled()
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
      clientX: 150,
      clientY: 150,
      movementX: 50,
      movementY: 50
    }

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
      clientY: 200
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
