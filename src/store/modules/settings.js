const state = {
    theme: localStorage.getItem('theme') || 'light',
    language: localStorage.getItem('language') || 'en',
    notificationsEnabled: JSON.parse(localStorage.getItem('notificationsEnabled')) || true
  };
  
  const mutations = {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    },
    setLanguage(state, language) {
      state.language = language;
      localStorage.setItem('language', language);
    },
    setNotificationsEnabled(state, enabled) {
      state.notificationsEnabled = enabled;
      localStorage.setItem('notificationsEnabled', JSON.stringify(enabled));
    }
  };
  
  const actions = {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      commit('setTheme', newTheme);
    },
    applyTheme({ commit }) {
      const theme = localStorage.getItem('theme') || 'light';
      commit('setTheme', theme);
    },
    changeLanguage({ commit }, language) {
      commit('setLanguage', language);
    },
    toggleNotifications({ commit, state }) {
      const newStatus = !state.notificationsEnabled;
      commit('setNotificationsEnabled', newStatus);
    },
    loadSettings({ commit }) {
      const theme = localStorage.getItem('theme') || 'light';
      const language = localStorage.getItem('language') || 'en';
      const notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) || true;
  
      commit('setTheme', theme);
      commit('setLanguage', language);
      commit('setNotificationsEnabled', notificationsEnabled);
    }
  };
  
  const getters = {
    getTheme: (state) => state.theme,
    getLanguage: (state) => state.language,
    areNotificationsEnabled: (state) => state.notificationsEnabled
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  