<template>
    <div id="app">
      <!-- Navigation Bar -->
      <NavigationBar
        :tabs="tabs"
        :active-tab="activeTab"
        @switchTab="switchTab"
        @closeTab="closeTab"
      />
  
      <div class="main-container">
        <!-- Left Sidebar with tools, plugins, AI tools, and Task Scripting navigation -->
        <SidebarLeft 
          :tools="tools"
          @openTool="openTool" 
          @openPlugin="openTool" 
          @openAITool="openTool" 
          @navigateToTaskScripting="openTaskScripting"
        />
  
        <!-- Main Content Area -->
        <div class="content-area">
          <component :is="currentComponent" v-if="currentComponent" />
        </div>
  
        <!-- Right Sidebar -->
        <SidebarRight />
      </div>
    </div>
  </template>
  
  <script>
  import TaskScripting from '@/components/TaskScripting/TaskScripting.vue';
  import NavigationBar from './components/Navigation/NavigationBar.vue';
  import SidebarLeft from './components/Sidebar/SidebarLeft.vue';
  import SidebarRight from './components/Sidebar/SidebarRight.vue';
  
  export default {
    name: 'App',
    components: {
      NavigationBar,
      SidebarLeft,
      SidebarRight,
      TaskScripting
    },
    data() {
      return {
        tabs: [],
        activeTab: null, // Start as null to indicate no active tab
        tools: [
          { name: 'Tool 1', component: 'ToolComponent1' },
          { name: 'Tool 2', component: 'ToolComponent2' },
          { name: 'Tool 3', component: 'ToolComponent2' },
          { name: 'Tool 4', component: 'ToolComponent2' },
          { name: 'Tool 5', component: 'ToolComponent2' },
        ],
      };
    },
    computed: {
      currentComponent() {
        return this.activeTab !== null ? this.tabs[this.activeTab]?.component || null : null;
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
        if (index >= 0 && index < this.tabs.length) {
          this.activeTab = index;
        }
      },
      closeTab(index) {
        if (index >= 0 && index < this.tabs.length) {
          this.tabs.splice(index, 1);
          if (this.activeTab >= this.tabs.length) {
            this.activeTab = this.tabs.length - 1;
          }
          if (this.tabs.length === 0) {
            this.activeTab = null; // No tabs left
          }
        }
      },
      openTaskScripting() {
        const taskScriptingTool = {
          name: 'Task Scripting',
          component: TaskScripting
        };
        this.openTool(taskScriptingTool);
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
    margin-top: 50px; /* Adjust to the height of the NavigationBar */
  }
  
  .content-area {
    flex-grow: 1;
    background-color: #efe11c;
    padding: 0;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width: calc(100% - 500px); /* Subtract sidebar widths */
  }
  
  .navigation-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  
  .sidebar-left {
    width: 180px;
    background-color: #72bce6;
  }
  
  .sidebar-right {
    width: 180px;
    background-color: #ff00ff;
  }
  </style>
  