<template>
    <nav
      class="sidebar-left"
      aria-label="AI Tools Sidebar"
    >
      <ul>
        <!-- Loop through general tools -->
        <li
          v-for="tool in tools"
          :key="tool.name"
          role="button"
          tabindex="0"
          aria-label="Open AI Tool"
          @click="openTool(tool)"
          @keydown.enter.space="openTool(tool)"
        >
          {{ tool.name }}
        </li>
  
        <!-- Loop through plugins -->
        <li
          v-for="plugin in plugins"
          :key="plugin.getMetadata().name"
          role="button"
          tabindex="0"
          aria-label="Open Plugin"
          @click="openPlugin(plugin)"
          @keydown.enter.space="openPlugin(plugin)"
        >
          {{ plugin.getMetadata().name }}
        </li>
  
        <!-- Loop through AI tools -->
        <li
          v-for="aiTool in aiTools"
          :key="aiTool.getMetadata().name"
          role="button"
          tabindex="0"
          aria-label="Open AI Tool"
          @click="openAITool(aiTool)"
          @keydown.enter.space="openAITool(aiTool)"
        >
          {{ aiTool.getMetadata().name }}
        </li>
  
        <!-- Navigation to Task Scripting -->
        <li
          role="button"
          tabindex="0"
          aria-label="Open Task Scripting"
          @click="navigateToTaskScripting"
          @keydown.enter.space="navigateToTaskScripting"
        >
          {{ $t('task_scripting') }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      tools: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        plugins: [],
        aiTools: []
      };
    },
    created() {
      // Placeholder for plugin and AI tool systems
      this.plugins = this.$plugins || []; // Assuming you have a plugin system
      this.aiTools = this.$aiTools || []; // Assuming you have AI tools available globally
    },
    methods: {
      openTool(tool) {
        this.$emit('openTool', tool);
      },
      openPlugin(plugin) {
        const metadata = plugin.getMetadata();
        this.$emit('openTool', {
          name: metadata.name,
          component: plugin.getComponent()
        });
      },
      openAITool(aiTool) {
        const metadata = aiTool.getMetadata();
        this.$emit('openTool', {
          name: metadata.name,
          component: aiTool.getComponent()
        });
      },
      navigateToTaskScripting() {
        this.$emit('navigateToTaskScripting');
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar-left {
    width: 200px;
    background-color: #72bce6;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar-left ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-left li {
    margin: 5px 0;
    padding: 10px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: space-between;
  }
  
  .sidebar-left li:hover,
  .sidebar-left li:focus {
    background-color: #0056b3;
  }
  </style>
  