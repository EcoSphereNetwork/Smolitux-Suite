<template>
  <div id="app">
    <NavigationBar
      :tabs="tabs"
      :active-tab="activeTab"
      @switchTab="switchTab"
      @closeTab="closeTab"
    />
    <div class="main-container">
      <SidebarLeft @openTool="openTool" />
      <div class="content-area">
        <component :is="currentComponent" />
      </div>
      <SidebarRight @sendMessage="handleMessage" />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/Navigation/NavigationBar.vue';
import SidebarLeft from './components/Sidebar/SidebarLeft.vue';
import SidebarRight from './components/Sidebar/SidebarRight.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
    SidebarLeft,
    SidebarRight
  },
  data() {
    return {
      tabs: [],
      activeTab: 0,
    };
  },
  computed: {
    currentComponent() {
      return this.tabs[this.activeTab]?.component || null;
    }
  },
  methods: {
    openTool(tool) {
      const existingTabIndex = this.tabs.findIndex(tab => tab.name === tool.name);
      if (existingTabIndex !== -1) {
        this.activeTab = existingTabIndex;
      } else {
        this.tabs.push(tool);
        this.activeTab = this.tabs.length - 1;
      }
    },
    switchTab(index) {
      this.activeTab = index;
    },
    closeTab(index) {
      this.tabs.splice(index, 1);
      if (this.activeTab >= this.tabs.length) {
        this.activeTab = this.tabs.length - 1;
      }
    },
    handleMessage(message) {
      // Handle the message from SidebarRight's chat interface
      console.log('Message from user:', message);
      // Example: respond with a simple echo for demonstration
      const response = `Echo: ${message}`;
      this.$emit('sendResponse', response);
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f0f0;
  overflow-y: auto;
}
</style>
