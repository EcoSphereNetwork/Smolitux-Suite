import { createRouter, createWebHistory } from 'vue-router';

// Import or Lazy load route components
const HomeView = () => import('@/views/HomeView.vue');
const TaskScripting = () => import('@/components/TaskScripting/TaskScripting.vue');
const AdminDashboard = () => import('@/views/AdminDashboard.vue');

// Define routes with meta fields
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { title: 'HomeView' }
  },
  {
    path: '/',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'AdminDashboard' }
  },
  {
    path: '/task-scripting',
    name: 'TaskScripting',
    component: TaskScripting,
    meta: { title: 'Task Scripting' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Set page title based on route meta title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Smolitux Suite';
  next();
});

export default router;
