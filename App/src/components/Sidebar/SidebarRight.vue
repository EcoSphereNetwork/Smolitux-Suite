<template>
  <aside class="sidebar-right">
    <h3>{{ $t('smolit_chat') }}</h3>
    <div class="chat-window">
      <div
        v-for="(message, index) in chatHistory"
        :key="index"
        class="chat-message"
      >
        <p><strong>{{ message.sender }}:</strong> {{ message.text }}</p>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="userInput"
        :placeholder="$t('type_message')"
        aria-label="Chat input"
        @keyup.enter="sendMessage"
      >
      <button @click="sendMessage">
        {{ $t('send') }}
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      chatHistory: [],
      userInput: '',
      smolitResponse: {
        sender: 'Smolit',
        text: 'This is a simulated response from Smolit.'
      }
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() !== '') {
        const userMessage = { sender: 'User', text: this.userInput };
        this.chatHistory.push(userMessage);

        this.$emit('sendMessage', this.userInput);
        this.userInput = '';

        // Simulating Smolit's response
        setTimeout(() => {
          this.chatHistory.push(this.smolitsResponse);
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
.sidebar-right {
  width: 300px;
  background-color: #f8f9fa;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.chat-window {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  margin-bottom: 10px;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>
