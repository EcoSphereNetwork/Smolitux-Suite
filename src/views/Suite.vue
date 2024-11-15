<template>
  <div class="suite-container">
    <smolitux-animation
      ref="animation"
      class="network-visualization"
    />
    <div class="mini-chat" v-if="selectedNode">
      <div class="chat-header">
        {{ selectedNode.label }}
        <button @click="selectedNode = null">×</button>
      </div>
      <div class="chat-messages">
        <div v-for="(msg, i) in selectedNode.messages" :key="i" class="message">
          {{ msg }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message...">
      </div>
    </div>
    <div class="config-panel" v-if="selectedNode">
      <div class="config-header">
        Configuration: {{ selectedNode.label }}
        <button @click="selectedNode = null">×</button>
      </div>
      <div class="config-content">
        <div class="config-item">
          <label>Label:</label>
          <input v-model="selectedNode.label">
        </div>
        <div class="config-item">
          <label>Type:</label>
          <select v-model="selectedNode.type">
            <option value="chatbot">Chatbot</option>
            <option value="llm">LLM Server</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div class="config-item">
          <label>Status:</label>
          <select v-model="selectedNode.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmolituxAnimation from '@/components/Smolitux/Canvas/Animation.vue'

export default {
  name: 'Suite',
  components: {
    SmolituxAnimation
  },
  data() {
    return {
      selectedNode: null,
      newMessage: '',
      demoNodes: [
        { id: 1, label: 'Chatbot 1', type: 'chatbot', x: 100, y: 100, status: 'active', messages: [] },
        { id: 2, label: 'LLM Server', type: 'llm', x: 300, y: 100, status: 'active', messages: [] },
        { id: 3, label: 'Database', type: 'database', x: 200, y: 300, status: 'active', messages: [] }
      ],
      demoConnections: [
        { from: { x: 100, y: 100 }, to: { x: 300, y: 100 } },
        { from: { x: 300, y: 100 }, to: { x: 200, y: 300 } }
      ]
    }
  },
  mounted() {
    this.initializeDemo()
  },
  methods: {
    initializeDemo() {
      const animation = this.$refs.animation
      if (!animation) return

      this.demoNodes.forEach(node => {
        animation.addNode(node)
      })

      this.demoConnections.forEach(connection => {
        animation.addConnection(connection)
      })
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedNode) return
      this.selectedNode.messages.push(this.newMessage)
      this.newMessage = ''
    }
  }
}
</script>

<style scoped>
.suite-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #1e1e1e;
}

.network-visualization {
  width: 100%;
  height: 100%;
}

.mini-chat {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 300px;
  height: 400px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px;
  background: #42b983;
  color: white;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-input {
  padding: 10px;
  border-top: 1px solid #eee;
}

.chat-input input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.config-panel {
  position: absolute;
  right: 340px;
  bottom: 20px;
  width: 300px;
  background: #fff;
  border-radius: 8px;
  padding-bottom: 10px;
}

.config-header {
  padding: 10px;
  background: #42b983;
  color: white;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
}

.config-content {
  padding: 10px;
}

.config-item {
  margin-bottom: 10px;
}

.config-item label {
  display: block;
  margin-bottom: 5px;
}

.config-item input,
.config-item select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
