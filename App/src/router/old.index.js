// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Lazy load route components
const HomeView = () => import('@/views/HomeView.vue');
const TaskScripting = () => import('@/components/TaskScripting/TaskScripting.vue'); // Check this path
const AdminDashboard = () => import('@/views/AdminDashboard.vue'); // Check this path

// Define routes with meta fields and named views
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { title: 'Home', requiresAuth: false }
  },
  {
    path: '/task-scripting',
    name: 'TaskScripting',
    component: TaskScripting,
    meta: { title: 'Task Scripting', requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'Admin Dashboard', requiresAuth: true },
    beforeEnter: (to, from, next) => {
      // Example of a route-level guard
      if (isAdminUser()) {
        next();
      } else {
        next({ name: 'HomeView' });
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top on route change or use saved position for back navigation
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Set page title based on route meta field
  document.title = to.meta.title || 'Smolitux Suite';

  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'HomeView' }); // Redirect to home if not authenticated
    } else {
      next();
    }
  } else {
    next();
  }
});

function isAuthenticated() {
  // Implement your authentication check logic here
  return !!localStorage.getItem('userToken');
}

function isAdminUser() {
  // Implement your admin check logic here
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'admin';
}

export default router;
