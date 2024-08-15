const state = {
    savedWorkflows: JSON.parse(localStorage.getItem('workflows')) || []
  };
  
  const mutations = {
    saveWorkflow(state, workflow) {
      const existingWorkflow = state.savedWorkflows.find(w => w.name === workflow.name);
      if (existingWorkflow) {
        existingWorkflow.versions.push({
          version: existingWorkflow.versions.length + 1,
          tasks: workflow.tasks,
          timestamp: new Date().toISOString()
        });
      } else {
        workflow.versions = [{
          version: 1,
          tasks: workflow.tasks,
          timestamp: new Date().toISOString()
        }];
        state.savedWorkflows.push(workflow);
      }
      localStorage.setItem('workflows', JSON.stringify(state.savedWorkflows));
    },
    renameWorkflow(state, { index, newName }) {
      state.savedWorkflows[index].name = newName;
      localStorage.setItem('workflows', JSON.stringify(state.savedWorkflows));
    },
    deleteWorkflow(state, index) {
      state.savedWorkflows.splice(index, 1);
      localStorage.setItem('workflows', JSON.stringify(state.savedWorkflows));
    },
    loadWorkflows(state, workflows) {
      state.savedWorkflows = workflows;
      localStorage.setItem('workflows', JSON.stringify(workflows));
    },
    clearWorkflows(state) {
      state.savedWorkflows = [];
      localStorage.removeItem('workflows');
    }
  };
  
  const actions = {
    saveWorkflow({ commit }, workflow) {
      commit('saveWorkflow', workflow);
    },
    renameWorkflow({ commit }, payload) {
      commit('renameWorkflow', payload);
    },
    deleteWorkflow({ commit }, index) {
      commit('deleteWorkflow', index);
    },
    loadWorkflows({ commit }) {
      const workflows = JSON.parse(localStorage.getItem('workflows')) || [];
      commit('loadWorkflows', workflows);
    },
    clearWorkflows({ commit }) {
      commit('clearWorkflows');
    }
  };
  
  const getters = {
    getWorkflows: (state) => {
      return state.savedWorkflows;
    },
    getWorkflowByName: (state) => (name) => {
      return state.savedWorkflows.find(workflow => workflow.name === name);
    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  