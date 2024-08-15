<template>
    <div class="canvas" @dragover.prevent @drop="onDrop">
      <h3>{{ $t('drop_tools') }}</h3>
      <div v-for="(task, index) in tasks" :key="index" class="task">
        <p>{{ task.name }}</p>
        <button @click="removeTask(index)">{{ $t('remove') }}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true
      }
    },
    methods: {
      onDrop(event) {
        const toolMetadata = JSON.parse(event.dataTransfer.getData('tool'));
        this.$emit('addTask', toolMetadata);
      },
      removeTask(index) {
        this.$emit('removeTask', index);
      }
    }
  };
  </script>
  
  <style scoped>
  .canvas {
    padding: 10px;
    border: 2px dashed #ccc;
    background-color: #f9f9f9;
    min-height: 200px;
  }
  
  .task {
    padding: 8px;
    margin-bottom: 10px;
    background-color: #007bff;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .task button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .task button:hover {
    background-color: #c82333;
  }
  </style>
  