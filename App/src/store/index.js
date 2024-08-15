import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabs: [],
    currentTab: null,
    messages: []
  },
  mutations: {
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
    sendMessage(state, message) {
      state.messages.push({ id: Date.now(), text: message });
    }
  },
  actions: {
    openTab({ commit }, tool) {
      commit('openTab', tool);
    },
    closeTab({ commit }, index) {
      commit('closeTab', index);
    },
    sendMessage({ commit }, message) {
      commit('sendMessage', message);
    }
  },
  modules: {}
});
