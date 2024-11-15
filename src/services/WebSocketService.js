class WebSocketService {
  constructor() {
    this.socket = null
    this.listeners = new Map()
  }

  connect(url = 'ws://localhost:8080') {
    this.socket = new WebSocket(url)

    this.socket.onopen = () => {
      this.emit('connected', true)
    }

    this.socket.onclose = () => {
      this.emit('connected', false)
    }

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.emit(data.type, data.payload)
      } catch (error) {
        console.error('WebSocket message error:', error)
      }
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.emit('error', error)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  send(type, payload) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected')
      return
    }

    this.socket.send(JSON.stringify({ type, payload }))
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event).add(callback)
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback)
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data))
    }
  }
}

export default new WebSocketService()
