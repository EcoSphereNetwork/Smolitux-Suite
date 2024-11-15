import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Suite from '@/views/Suite.vue'
import SmolituxAnimation from '@/components/Smolitux/Canvas/Animation.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Suite.vue', () => {
  let wrapper
  let store
  let actions
  let state
  let getters
  let mutations

  beforeEach(() => {
    state = {
      selectedNode: null,
      error: null
    }

    actions = {
      updateNode: jest.fn(),
      removeNode: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn()
    }

    getters = {
      isConnected: () => true
    }

    mutations = {
      SET_SELECTED_NODE: (state, node) => {
        state.selectedNode = node
      }
    }

    store = new Vuex.Store({
      modules: {
        network: {
          namespaced: true,
          state,
          actions,
          getters,
          mutations
        }
      }
    })

    wrapper = shallowMount(Suite, {
      store,
      localVue,
      stubs: {
        SmolituxAnimation
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  it('renders animation component', () => {
    expect(wrapper.findComponent(SmolituxAnimation).exists()).toBe(true)
  })

  it('shows connection status', () => {
    const status = wrapper.find('.connection-status')
    expect(status.exists()).toBe(true)
    expect(status.text()).toContain('Connected')
  })

  it('does not show chat and config panels when no node selected', () => {
    expect(wrapper.find('.mini-chat').exists()).toBe(false)
    expect(wrapper.find('.config-panel').exists()).toBe(false)
  })

  it('shows chat and config panels when node selected', async () => {
    const node = { id: 1, label: 'Test Node', status: 'active' }
    store.commit('network/SET_SELECTED_NODE', node)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.mini-chat').exists()).toBe(true)
    expect(wrapper.find('.config-panel').exists()).toBe(true)
  })

  it('updates node configuration', async () => {
    const node = { id: 1, label: 'Test Node', type: 'chatbot', status: 'active' }
    store.commit('network/SET_SELECTED_NODE', node)
    await wrapper.vm.$nextTick()

    await wrapper.vm.updateSelectedNode()
    expect(actions.updateNode).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        id: node.id,
        updates: expect.objectContaining({
          label: node.label,
          type: node.type,
          status: node.status
        })
      })
    )
  })

  it('removes selected node', async () => {
    const node = { id: 1, label: 'Test Node' }
    store.commit('network/SET_SELECTED_NODE', node)
    await wrapper.vm.$nextTick()

    await wrapper.vm.removeSelectedNode()
    expect(actions.removeNode).toHaveBeenCalledWith(expect.anything(), node.id)
    store.commit('network/SET_SELECTED_NODE', null)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedNode).toBeNull()
  })

  it('sends chat message', async () => {
    const node = { id: 1, label: 'Test Node', status: 'active', messages: [] }
    store.commit('network/SET_SELECTED_NODE', node)
    await wrapper.vm.$nextTick()

    wrapper.setData({ newMessage: 'Test message' })
    await wrapper.vm.sendMessage()
    expect(node.messages).toContain('Test message')
    expect(wrapper.vm.newMessage).toBe('')
    expect(actions.updateNode).toHaveBeenCalled()
  })

  it('disables chat input when node is inactive', async () => {
    const node = { id: 1, label: 'Test Node', status: 'inactive' }
    store.commit('network/SET_SELECTED_NODE', node)
    await wrapper.vm.$nextTick()

    const input = wrapper.find('.chat-input input')
    expect(input.attributes('disabled')).toBeTruthy()
  })

  it('shows error message when error exists', async () => {
    const error = 'Test error'
    store.state.network.error = error

    await wrapper.vm.$nextTick()
    const errorMsg = wrapper.find('.error-message')
    expect(errorMsg.exists()).toBe(true)
    expect(errorMsg.text()).toContain(error)
  })
})

