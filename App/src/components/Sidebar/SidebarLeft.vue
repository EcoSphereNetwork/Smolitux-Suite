<template>
  <nav
    class="sidebar-left"
    aria-label="AI Tools Sidebar"
  >
    <ul>
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
      <li
        role="button"
        tabindex="0"
        aria-label="Open Task Scripting"
        @click="navigateToTaskScripting"
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
      this.plugins = this.$plugins; // Assuming you have a plugin system
      this.aiTools = this.$aiTools; // Assuming you have AI tools available globally
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
        this.$router.push('/task-scripting');
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar-left {
    width: 200px;
    background-color: #eee;
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
  