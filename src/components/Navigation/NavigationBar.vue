<template>
    <nav class="navigation-bar">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="switchTab(index)"
          @keydown.enter.space="switchTab(index)"
          role="tab"
          tabindex="0"
          aria-selected="activeTab === index"
          aria-controls="tabpanel"
        >
          {{ tab.name }}
          <button @click.stop="closeTab(index)" aria-label="Close tab">×</button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      tabs: {
        type: Array,
        required: true
      },
      activeTab: {
        type: Number,
        required: true
      }
    },
    methods: {
      switchTab(index) {
        this.$emit('switchTab', index);
      },
      closeTab(index) {
        this.$emit('closeTab', index);
      }
    }
  };
  </script>
  
  <style scoped>
  .navigation-bar {
    background-color: #007bff;
    padding: 10px;
  }
  
  .navigation-bar ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }
  
  .navigation-bar li {
    padding: 10px 15px;
    margin-right: 5px;
    background-color: #0056b3;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  
  .navigation-bar li.active {
    background-color: #ffffff;
    color: #007bff;
    font-weight: bold;
  }
  
  .navigation-bar li button {
    margin-left: 10px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2em;
  }
  
  .navigation-bar li button:hover {
    color: #ff6b6b;
  }
  </style>
  