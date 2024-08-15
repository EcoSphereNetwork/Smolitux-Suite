<template>
  <div class="task-scripting">
    <ToolboxWidget :ai-tools="aiTools" />
    <TaskCanvas
      :tasks="tasks"
      @addTask="addTask"
      @removeTask="removeTask"
    />
  
    <div class="workflow-actions">
      <button @click="saveWorkflow">
        {{ $t('save_workflow') }}
      </button>
      <button
        v-if="selectedWorkflow !== null"
        @click="renameWorkflow"
      >
        {{ $t('rename_workflow') }}
      </button>
      <select
        v-model="selectedWorkflow"
        @change="loadWorkflow"
      >
        <option
          v-for="(workflow, index) in savedWorkflows"
          :key="index"
          :value="index"
        >
          {{ workflow.name }}
        </option>
      </select>
      <button
        v-if="selectedWorkflow !== null"
        @click="deleteWorkflow"
      >
        {{ $t('delete_workflow') }}
      </button>
      <button @click="exportWorkflows">
        {{ $t('export_workflows') }}
      </button>
      <input
        type="file"
        @change="importWorkflows"
      >
    </div>
  
    <div v-if="output">
      <h3>{{ $t('output') }}</h3>
      <p>{{ output }}</p>
    </div>
  </div>
</template>
  
  <script>

import ToolboxWidget from './ToolboxWidget.vue';
import TaskCanvas from './TaskCanvas.vue';
  
  export default {
    components: {
      ToolboxWidget,
      TaskCanvas
    },
    data() {
      return {
        aiTools: [],  // This should be populated with your AI tools
        tasks: [],
        output: null,
        savedWorkflows: [],
        selectedWorkflow: null
      };
    },
    created() {
      this.aiTools = this.$aiTools;
      this.savedWorkflows = this.$store.state.workflows.savedWorkflows;
    },
    methods: {
      addTask(toolMetadata) {
        const tool = this.aiTools.find(aiTool => aiTool.getMetadata().name === toolMetadata.name);
        if (tool) {
          this.tasks.push(tool);
        }
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
      },
      runTasks() {
        let input = prompt(this.$t('enter_initial_input'));
        this.output = input;
  
        for (const task of this.tasks) {
          this.output = task.execute(this.output);
        }
      },
      saveWorkflow() {
        const workflowName = prompt(this.$t('enter_name_for_workflow'));
        const workflowDescription = prompt(this.$t('enter_description_for_workflow'));
        if (workflowName) {
          const workflow = {
            name: workflowName,
            description: workflowDescription || '',
            tasks: this.tasks.map(task => task.getMetadata().name)
          };
          this.$store.dispatch('workflows/saveWorkflow', workflow);
          this.savedWorkflows = this.$store.state.workflows.savedWorkflows;
        }
      },
      renameWorkflow() {
        const newName = prompt(this.$t('enter_new_name_for_workflow'), this.savedWorkflows[this.selectedWorkflow].name);
        if (newName) {
          this.$store.dispatch('workflows/renameWorkflow', { index: this.selectedWorkflow, newName });
          this.savedWorkflows = this.$store.state.workflows.savedWorkflows;
        }
      },
      loadWorkflow() {
        const workflow = this.savedWorkflows[this.selectedWorkflow];
        this.tasks = workflow.tasks.map(taskName =>
          this.aiTools.find(tool => tool.getMetadata().name === taskName)
        );
      },
      deleteWorkflow() {
        this.$store.dispatch('workflows/deleteWorkflow', this.selectedWorkflow);
        this.savedWorkflows = this.$store.state.workflows.savedWorkflows;
        this.selectedWorkflow = null;
        this.tasks = [];
      },
      exportWorkflows() {
        const blob = new Blob([JSON.stringify(this.savedWorkflows, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflows.json';
        a.click();
        URL.revokeObjectURL(url);
      },
      importWorkflows(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const importedWorkflows = JSON.parse(e.target.result);
          this.$store.dispatch('workflows/loadWorkflow', importedWorkflows);
          this.savedWorkflows = this.$store.state.workflows.savedWorkflows;
        };
        reader.readAsText(file);
      }
    }
  };
  </script>
  
  <style scoped>
  .task-scripting {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .workflow-actions {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .workflow-actions button {
    margin: 5px 0;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .workflow-actions button:hover {
    background-color: #218838;
  }
  
  .workflow-actions select {
    margin: 5px 0;
    padding: 8px;
  }
  
  .workflow-actions input[type="file"] {
    margin-top: 10px;
  }
  
  .output {
    margin-top: 20px;
    font-size: 1.2em;
  }
  </style>
  