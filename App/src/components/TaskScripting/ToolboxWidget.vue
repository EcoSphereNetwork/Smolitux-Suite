<template>
    <div class="toolbox-widget">
      <h3>Available Tools</h3>
      <ul>
        <li
          v-for="(tool, index) in aiTools"
          :key="index"
          draggable="true"
          @dragstart="onDragStart(tool)"
        >
          {{ tool.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      aiTools: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      onDragStart(tool, event) {
        event.dataTransfer.setData('tool', JSON.stringify(tool));
      },
    },
  };
  </script>
  
  <style scoped>
  .toolbox-widget {
    padding: 10px;
    background-color: #f0f0f0;
    border-right: 1px solid #ddd;
  }
  
  .toolbox-widget ul {
    list-style: none;
    padding: 0;
  }
  
  .toolbox-widget li {
    padding: 5px;
    margin: 5px 0;
    background-color: #007bff;
    color: white;
    cursor: grab;
  }
  
  .toolbox-widget li:hover {
    background-color: #0056b3;
  }
  </style>
  