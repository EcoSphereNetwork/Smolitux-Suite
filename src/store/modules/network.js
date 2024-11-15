import WebSocketService from '@/services/WebSocketService'

const state = {
  nodes: [],
  connections: [],
  selectedNode: null,
  isConnected: false,
  error: null
}

const mutations = {
  SET_NODES(state, nodes) {
    state.nodes = nodes
  },
  ADD_NODE(state, node) {
    state.nodes.push(node)
  },
  UPDATE_NODE(state, { id, updates }) {
    const node = state.nodes.find(n => n.id === id)
    if (node) {
      Object.assign(node, updates)
    }
  },
  REMOVE_NODE(state, id) {
    state.nodes = state.nodes.filter(n => n.id !== id)
  },
  SET_CONNECTIONS(state, connections) {
    state.connections = connections
  },
  ADD_CONNECTION(state, connection) {
    state.connections.push(connection)
  },
  REMOVE_CONNECTION(state, { fromId, toId }) {
    state.connections = state.connections.filter(c => 
      !(c.from.id === fromId && c.to.id === toId)
    )
  },
  SET_SELECTED_NODE(state, node) {
    state.selectedNode = node
  },
  SET_CONNECTED(state, isConnected) {
    state.isConnected = isConnected
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  connect({ commit }) {
    WebSocketService.connect()
    WebSocketService.on('connected', isConnected => {
      commit('SET_CONNECTED', isConnected)
    })
    WebSocketService.on('error', error => {
      commit('SET_ERROR', error)
    })
    WebSocketService.on('nodes', nodes => {
      commit('SET_NODES', nodes)
    })
    WebSocketService.on('node_added', node => {
      commit('ADD_NODE', node)
    })
    WebSocketService.on('node_updated', update => {
      commit('UPDATE_NODE', update)
    })
    WebSocketService.on('node_removed', id => {
      commit('REMOVE_NODE', id)
    })
    WebSocketService.on('connections', connections => {
      commit('SET_CONNECTIONS', connections)
    })
    WebSocketService.on('connection_added', connection => {
      commit('ADD_CONNECTION', connection)
    })
    WebSocketService.on('connection_removed', connection => {
      commit('REMOVE_CONNECTION', connection)
    })
  },
  disconnect({ commit }) {
    WebSocketService.disconnect()
    commit('SET_CONNECTED', false)
  },
  addNode({ commit }, node) {
    WebSocketService.send('add_node', node)
  },
  updateNode({ commit }, update) {
    WebSocketService.send('update_node', update)
  },
  removeNode({ commit }, id) {
    WebSocketService.send('remove_node', id)
  },
  addConnection({ commit }, connection) {
    WebSocketService.send('add_connection', connection)
  },
  removeConnection({ commit }, connection) {
    WebSocketService.send('remove_connection', connection)
  },
  selectNode({ commit }, node) {
    commit('SET_SELECTED_NODE', node)
  }
}

const getters = {
  getNodeById: state => id => state.nodes.find(n => n.id === id),
  getConnectionsByNodeId: state => id => state.connections.filter(c => 
    c.from.id === id || c.to.id === id
  ),
  isConnected: state => state.isConnected,
  selectedNode: state => state.selectedNode,
  error: state => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
