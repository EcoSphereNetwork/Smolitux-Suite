const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

// Store network state
const state = {
  nodes: [],
  connections: []
};

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');

  // Send current state to new client
  ws.send(JSON.stringify({
    type: 'state',
    payload: state
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'add_node':
          state.nodes.push(data.payload);
          break;
        case 'update_node':
          const nodeIndex = state.nodes.findIndex(n => n.id === data.payload.id);
          if (nodeIndex >= 0) {
            state.nodes[nodeIndex] = {
              ...state.nodes[nodeIndex],
              ...data.payload.updates
            };
          }
          break;
        case 'remove_node':
          state.nodes = state.nodes.filter(n => n.id !== data.payload);
          state.connections = state.connections.filter(c => 
            c.from.id !== data.payload && c.to.id !== data.payload
          );
          break;
        case 'add_connection':
          state.connections.push(data.payload);
          break;
        case 'remove_connection':
          state.connections = state.connections.filter(c => 
            !(c.from.id === data.payload.fromId && c.to.id === data.payload.toId)
          );
          break;
      }

      // Broadcast update to all clients
      const update = JSON.stringify({
        type: data.type,
        payload: data.payload
      });

      clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(update);
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 8080');
