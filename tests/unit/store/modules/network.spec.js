import network from '@/store/modules/network'

describe('network store module', () => {
  let state
  let commit
  let dispatch

  beforeEach(() => {
    state = {
      nodes: [],
      connections: [],
      selectedNode: null,
      isConnected: false,
      error: null
    }
    commit = jest.fn()
    dispatch = jest.fn()
  })

  describe('mutations', () => {
    it('SET_NODES sets nodes array', () => {
      const nodes = [{ id: 1 }, { id: 2 }]
      network.mutations.SET_NODES(state, nodes)
      expect(state.nodes).toBe(nodes)
    })

    it('ADD_NODE adds a node', () => {
      const node = { id: 1 }
      network.mutations.ADD_NODE(state, node)
      expect(state.nodes).toContain(node)
    })

    it('UPDATE_NODE updates existing node', () => {
      state.nodes = [{ id: 1, label: 'old' }]
      network.mutations.UPDATE_NODE(state, { id: 1, updates: { label: 'new' } })
      expect(state.nodes[0].label).toBe('new')
    })

    it('REMOVE_NODE removes a node', () => {
      state.nodes = [{ id: 1 }, { id: 2 }]
      network.mutations.REMOVE_NODE(state, 1)
      expect(state.nodes).toHaveLength(1)
      expect(state.nodes[0].id).toBe(2)
    })

    it('SET_CONNECTIONS sets connections array', () => {
      const connections = [{ from: { id: 1 }, to: { id: 2 } }]
      network.mutations.SET_CONNECTIONS(state, connections)
      expect(state.connections).toBe(connections)
    })

    it('ADD_CONNECTION adds a connection', () => {
      const connection = { from: { id: 1 }, to: { id: 2 } }
      network.mutations.ADD_CONNECTION(state, connection)
      expect(state.connections).toContain(connection)
    })

    it('REMOVE_CONNECTION removes a connection', () => {
      state.connections = [
        { from: { id: 1 }, to: { id: 2 } },
        { from: { id: 2 }, to: { id: 3 } }
      ]
      network.mutations.REMOVE_CONNECTION(state, { fromId: 1, toId: 2 })
      expect(state.connections).toHaveLength(1)
      expect(state.connections[0].from.id).toBe(2)
    })

    it('SET_SELECTED_NODE sets selected node', () => {
      const node = { id: 1 }
      network.mutations.SET_SELECTED_NODE(state, node)
      expect(state.selectedNode).toBe(node)
    })

    it('SET_CONNECTED sets connection status', () => {
      network.mutations.SET_CONNECTED(state, true)
      expect(state.isConnected).toBe(true)
    })

    it('SET_ERROR sets error state', () => {
      const error = new Error('test')
      network.mutations.SET_ERROR(state, error)
      expect(state.error).toBe(error)
    })
  })

  describe('getters', () => {
    beforeEach(() => {
      state.nodes = [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' }
      ]
      state.connections = [
        { from: { id: 1 }, to: { id: 2 } },
        { from: { id: 2 }, to: { id: 3 } }
      ]
    })

    it('getNodeById returns correct node', () => {
      const node = network.getters.getNodeById(state)(1)
      expect(node.label).toBe('Node 1')
    })

    it('getConnectionsByNodeId returns correct connections', () => {
      const connections = network.getters.getConnectionsByNodeId(state)(1)
      expect(connections).toHaveLength(1)
      expect(connections[0].from.id).toBe(1)
    })

    it('isConnected returns connection status', () => {
      state.isConnected = true
      expect(network.getters.isConnected(state)).toBe(true)
    })

    it('selectedNode returns selected node', () => {
      state.selectedNode = { id: 1 }
      expect(network.getters.selectedNode(state)).toEqual({ id: 1 })
    })

    it('error returns error state', () => {
      state.error = new Error('test')
      expect(network.getters.error(state)).toBeInstanceOf(Error)
    })
  })
})
