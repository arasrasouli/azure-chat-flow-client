<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="handleLogin(router)">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { username, password, errorMessage, handleLogin } from './login';
import { useRouter } from '#imports'; // or just useRouter (auto-imported)
import './login.css';

const router = useRouter();
useHead({
  title: 'Login',
});
</script>