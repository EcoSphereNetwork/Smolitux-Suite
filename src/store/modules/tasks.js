const state = {
    tasks: []
  };
  
  const mutations = {
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, { index, updatedTask }) {
      Vue.set(state.tasks, index, updatedTask);
    },
    removeTask(state, index) {
      state.tasks.splice(index, 1);
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    clearTasks(state) {
      state.tasks = [];
    }
  };
  
  const actions = {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    updateTask({ commit }, payload) {
      commit('updateTask', payload);
    },
    removeTask({ commit }, index) {
      commit('removeTask', index);
    },
    setTasks({ commit }, tasks) {
      commit('setTasks', tasks);
    },
    clearTasks({ commit }) {
      commit('clearTasks');
    },
    loadTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      commit('setTasks', tasks);
    },
    saveTasks({ state }) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  };
  
  const getters = {
    getTasks: (state) => state.tasks,
    getTaskByIndex: (state) => (index) => state.tasks[index],
    getTaskCount: (state) => state.tasks.length
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  