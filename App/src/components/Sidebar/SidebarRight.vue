<template>
  <aside class="sidebar-right">
    <Chatbot title="Smolit Assistant" />
  </aside>
</template>

<script>
import Chatbot from '../../../../../Smolit-Assistant/chatbot_project/chatbot-gui/dist/Chatbot.umd.js';

export default {
  components: {
    Chatbot
  }
};
</script>

<style scoped>
.sidebar-right {
  width: 300px;
  background-color: #e720d3;
  padding: 10px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
</style>
