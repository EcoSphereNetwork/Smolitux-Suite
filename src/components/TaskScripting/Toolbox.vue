<template>
    <div class="toolbox">
      <h3>{{ $t('available_tools') }}</h3>
      <ul>
        <li
          v-for="aiTool in aiTools"
          :key="aiTool.getMetadata().name"
          draggable="true"
          @dragstart="onDragStart(aiTool)"
        >
          {{ aiTool.getMetadata().name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      aiTools: {
        type: Array,
        required: true
      }
    },
    methods: {
      onDragStart(aiTool) {
        event.dataTransfer.setData('tool', JSON.stringify(aiTool.getMetadata()));
      }
    }
  };
  </script>
  
  <style scoped>
  .toolbox {
    padding: 10px;
    border: 2px dashed #ccc;
    background-color: #f9f9f9;
  }
  
  .toolbox h3 {
    margin-top: 0;
  }
  
  .toolbox ul {
    list-style-type: none;
    padding: 0;
  }
  
  .toolbox li {
    padding: 8px;
    margin-bottom: 5px;
    background-color: #007bff;
    color: white;
    cursor: grab;
  }
  
  .toolbox li:hover {
    background-color: #0056b3;
  }
  </style>
  