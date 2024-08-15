<template>
  <div class="home">
    <h1>{{ $t('welcome_message') }}</h1>
    <p>{{ $t('home_description') }}</p>

    <div class="quick-links">
      <button @click="navigateToTaskScripting">{{ $t('task_scripting') }}</button>
      <button @click="navigateToAdminDashboard">{{ $t('admin_dashboard') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    navigateToTaskScripting() {
      this.$router.push({ name: 'TaskScripting' });
    },
    navigateToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

.quick-links {
  margin-top: 20px;
}

.quick-links button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.quick-links button:hover {
  background-color: #0056b3;
}
</style>
