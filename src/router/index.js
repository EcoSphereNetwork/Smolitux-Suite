import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

// configure router
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { top: 0 };
    }
  },
});

export default router;
