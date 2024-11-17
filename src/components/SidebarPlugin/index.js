import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink";
import { reactive } from 'vue'

const SidebarStore = reactive({
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  },
});

const SidebarPlugin = {
  install(app) {
    app.config.globalProperties.$sidebar = SidebarStore;
    app.provide('$sidebar', SidebarStore);
    app.component("side-bar", Sidebar);
    app.component("sidebar-link", SidebarLink);
  },
};

export default SidebarPlugin;

