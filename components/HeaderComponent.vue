<template>
  <client-only>
    <header class="header">
      <h1>Text Analyzer App</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink v-if="authenticated" to="/dashboard">Dashboard</NuxtLink>
        <div class="auth-buttons">
          <LoginComponent @auth-updated="handleAuthChange" />
        </div>
      </nav>
    </header>
  </client-only>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMSAuth } from '~/composables/useMSAuth';
import LoginComponent from '~/components/LoginComponent.vue';

const { isAuthenticated } = useMSAuth();
const authenticated = ref(isAuthenticated.value);

const handleAuthChange = (status: boolean) => {
  authenticated.value = status;
};
</script>

<style scoped>
.header {
  background-color: #333;
  color: white;
  padding: 15px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  align-items: center;
}

.auth-buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
}

nav a {
  color: white;
  margin-right: 15px;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

button {
  margin: 5px;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: #005ea2;
}
</style>
