<template>
  <div class="suite-container">
    <smolitux-animation
      ref="animation"
      class="network-visualization"
      @configure-node="selectedNode = $event"
    />
    <div class="connection-status" :class="{ connected: isConnected }">
      {{ isConnected ? 'Connected' : 'Disconnected' }}
    </div>
    <div class="mini-chat" v-if="selectedNode">
      <div class="chat-header">
        {{ selectedNode.label }}
        <button @click="selectedNode = null">×</button>
      </div>
      <div class="chat-messages" ref="messages">
        <div v-for="(msg, i) in selectedNode.messages" :key="i" class="message">
          {{ msg }}
        </div>
      </div>
      <div class="chat-input">
        <input 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          placeholder="Type a message..."
          :disabled="!isConnected || selectedNode.status !== 'active'"
        >
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
          <input v-model="selectedNode.label" @change="updateSelectedNode">
        </div>
        <div class="config-item">
          <label>Type:</label>
          <select v-model="selectedNode.type" @change="updateSelectedNode">
            <option value="chatbot">Chatbot</option>
            <option value="llm">LLM Server</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div class="config-item">
          <label>Status:</label>
          <select v-model="selectedNode.status" @change="updateSelectedNode">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div class="config-actions">
          <button class="danger" @click="removeSelectedNode">Delete Node</button>
        </div>
      </div>
    </div>
    <div class="error-message" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SmolituxAnimation from '@/components/Smolitux/Canvas/Animation.vue'

export default {
  name: 'Suite',
  components: {
    SmolituxAnimation
  },
  data() {
    return {
      newMessage: ''
    }
  },
  computed: {
    ...mapState('network', ['selectedNode', 'error']),
    ...mapGetters('network', ['isConnected'])
  },
  watch: {
    'selectedNode.messages': {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.messages) {
            this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
          }
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('network', [
      'updateNode',
      'removeNode'
    ]),
    updateSelectedNode() {
      if (!this.selectedNode) return
      this.updateNode({
        id: this.selectedNode.id,
        updates: {
          label: this.selectedNode.label,
          type: this.selectedNode.type,
          status: this.selectedNode.status
        }
      })
    },
    removeSelectedNode() {
      if (!this.selectedNode) return
      this.removeNode(this.selectedNode.id)
      this.selectedNode = null
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedNode) return
      if (!this.selectedNode.messages) {
        this.$set(this.selectedNode, 'messages', [])
      }
      this.selectedNode.messages.push(this.newMessage)
      this.updateSelectedNode()
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

.connection-status {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  background: #e74c3c;
  color: white;
}

.connection-status.connected {
  background: #2ecc71;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

.message {
  margin-bottom: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
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

.chat-input input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.config-panel {
  position: absolute;
  right: 340px;
  bottom: 20px;
  width: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  color: #2c3e50;
}

.config-item input,
.config-item select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.config-actions {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #42b983;
  color: white;
}

button.danger {
  background: #e74c3c;
}

.error-message {
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 10px;
  background: #e74c3c;
  color: white;
  border-radius: 4px;
  max-width: 300px;
}
</style>

