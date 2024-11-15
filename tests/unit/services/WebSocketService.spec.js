import WebSocketService from '@/services/WebSocketService'

describe('WebSocketService', () => {
  let mockWebSocket
  let mockListeners

  beforeEach(() => {
    mockListeners = new Map()
    mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocket.OPEN
    }

    global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket)
  })

  afterEach(() => {
    WebSocketService.disconnect()
    jest.clearAllMocks()
  })

  it('connects to WebSocket server', () => {
    WebSocketService.connect('ws://test.com')
    expect(global.WebSocket).toHaveBeenCalledWith('ws://test.com')
  })

  it('emits connected event on open', () => {
    const onConnected = jest.fn()
    WebSocketService.on('connected', onConnected)
    WebSocketService.connect()

    mockWebSocket.onopen()
    expect(onConnected).toHaveBeenCalledWith(true)
  })

  it('emits disconnected event on close', () => {
    const onConnected = jest.fn()
    WebSocketService.on('connected', onConnected)
    WebSocketService.connect()

    mockWebSocket.onclose()
    expect(onConnected).toHaveBeenCalledWith(false)
  })

  it('handles incoming messages', () => {
    const onMessage = jest.fn()
    WebSocketService.on('test-event', onMessage)
    WebSocketService.connect()

    mockWebSocket.onmessage({ data: JSON.stringify({ type: 'test-event', payload: 'test' }) })
    expect(onMessage).toHaveBeenCalledWith('test')
  })

  it('handles message parsing errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    WebSocketService.connect()

    mockWebSocket.onmessage({ data: 'invalid json' })
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('sends messages correctly', () => {
    WebSocketService.connect()
    WebSocketService.send('test-event', { data: 'test' })

    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ type: 'test-event', payload: { data: 'test' } })
    )
  })

  it('handles disconnection', () => {
    WebSocketService.connect()
    WebSocketService.disconnect()

    expect(mockWebSocket.close).toHaveBeenCalled()
  })

  it('handles event listeners', () => {
    const callback = jest.fn()
    WebSocketService.on('test', callback)
    WebSocketService.emit('test', 'data')

    expect(callback).toHaveBeenCalledWith('data')

    WebSocketService.off('test', callback)
    WebSocketService.emit('test', 'more data')

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
