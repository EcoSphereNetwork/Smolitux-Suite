<template>
    <div
      class="task-canvas"
      @dragover.prevent
      @drop="onDrop"
    >
      <h3>Drop Tools Here to Create a Task</h3>
      <div v-for="(task, index) in tasks" :key="index" class="task-item">
        {{ task.name }}
        <button @click="removeTask(index)">Remove</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tasks: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      onDrop(event) {
        const tool = JSON.parse(event.dataTransfer.getData('tool'));
        this.$emit('addTask', tool);
      },
      removeTask(index) {
        this.$emit('removeTask', index);
      },
    },
  };
  </script>
  
  <style scoped>
  .task-canvas {
    padding: 10px;
    background-color: #fff;
    border: 1px dashed #999;
    min-height: 200px;
  }
  
  .task-item {
    background-color: #e7e7e7;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
  }
  </style>
  