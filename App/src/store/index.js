import { createStore } from 'vuex';

export default createStore({
  state: {
    tabs: [],
    currentTab: null,
    messages: [],
    workflows: {
      savedWorkflows: [], // This will store the workflows
    },
  },
  mutations: {
    // Tab Management Mutations
    openTab(state, tool) {
      let tab = state.tabs.find(t => t.name === tool.name);
      if (!tab) {
        tab = { name: tool.name, component: tool.component };
        state.tabs.push(tab);
      }
      state.currentTab = tab;
    },
    closeTab(state, index) {
      state.tabs.splice(index, 1);
      if (state.tabs.length > 0) {
        state.currentTab = state.tabs[Math.max(index - 1, 0)];
      } else {
        state.currentTab = null;
      }
    },

    // Message Management Mutations
    sendMessage(state, message) {
      state.messages.push({ id: Date.now(), text: message });
    },

    // Workflow Management Mutations
    saveWorkflow(state, workflow) {
      state.workflows.savedWorkflows.push(workflow);
    },
    renameWorkflow(state, { index, newName }) {
      state.workflows.savedWorkflows[index].name = newName;
    },
    deleteWorkflow(state, index) {
      state.workflows.savedWorkflows.splice(index, 1);
    },
    loadWorkflow(state, workflows) {
      state.workflows.savedWorkflows = workflows;
    },
  },
  actions: {
    // Tab Management Actions
    openTab({ commit }, tool) {
      commit('openTab', tool);
    },
    closeTab({ commit }, index) {
      commit('closeTab', index);
    },

    // Message Management Actions
    sendMessage({ commit }, message) {
      commit('sendMessage', message);
    },

    // Workflow Management Actions
    saveWorkflow({ commit }, workflow) {
      commit('saveWorkflow', workflow);
    },
    renameWorkflow({ commit }, payload) {
      commit('renameWorkflow', payload);
    },
    deleteWorkflow({ commit }, index) {
      commit('deleteWorkflow', index);
    },
    loadWorkflow({ commit }, workflows) {
      commit('loadWorkflow', workflows);
    },
  },
  getters: {
    // Getter for saved workflows
    savedWorkflows: (state) => state.workflows.savedWorkflows,

    // Getter for messages
    messages: (state) => state.messages,

    // Getter for the current tab
    currentTab: (state) => state.currentTab,
  },
});
